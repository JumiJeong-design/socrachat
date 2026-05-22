import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
loadEnv(path.join(root, ".env"));

const NOTION_VERSION = "2026-03-11";
const token = process.env.NOTION_TOKEN;
const dataSourceId = normalizeNotionId(process.env.NOTION_DATA_SOURCE_ID || process.env.NOTION_DATABASE_ID);

const propertyNames = {
  title: envWithDefault("NOTION_TITLE_PROPERTY", "Name"),
  date: envWithDefault("NOTION_DATE_PROPERTY", "Date"),
  tags: envWithDefault("NOTION_TAGS_PROPERTY", "Tags"),
  status: envWithDefault("NOTION_STATUS_PROPERTY", "Status"),
};

const statusValue = process.env.NOTION_STATUS_VALUE || "Done";
const devlogDir = path.join(root, "devlog");
const targetFile = process.argv[2];

if (!token || !dataSourceId) {
  console.error("Missing NOTION_TOKEN or NOTION_DATA_SOURCE_ID. Add them to .env first.");
  process.exit(1);
}

const files = targetFile
  ? [path.resolve(root, targetFile)]
  : fs
      .readdirSync(devlogDir)
      .filter((file) => /^\d{4}-\d{2}-\d{2}\.md$/.test(file))
      .map((file) => path.join(devlogDir, file))
      .sort();

if (files.length === 0) {
  console.log("No devlog files found.");
  process.exit(0);
}

for (const filePath of files) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const fileName = path.basename(filePath);
  const date = fileName.replace(/\.md$/, "");
  const originalTitle = extractTitle(markdown);
  const title = buildTitle(originalTitle, date);
  const notionMarkdown = markdown.replace(/^#\s+.+$/m, `# ${title}`);
  const summary = extractSummary(markdown);

  const children = markdownToNotionBlocks(notionMarkdown);
  const properties = buildProperties({ title, date, summary });

  await archiveExistingPages([title, originalTitle, originalTitle ? `${originalTitle} - ${date}` : undefined]);

  const page = await notion("pages", {
    method: "POST",
    body: {
      parent: { data_source_id: dataSourceId },
      properties,
      children: children.slice(0, 100),
    },
  });

  for (const chunk of chunkArray(children.slice(100), 100)) {
    await notion(`blocks/${page.id}/children`, {
      method: "PATCH",
      body: { children: chunk },
    });
  }

  console.log(`Created ${title}`);
  console.log(page.url);
}

function buildProperties({ title, date, summary }) {
  const properties = {
    [propertyNames.title]: {
      title: [{ text: { content: title } }],
    },
  };

  if (propertyNames.date) {
    properties[propertyNames.date] = { date: { start: date } };
  }

  if (propertyNames.status && statusValue) {
    properties[propertyNames.status] = { status: { name: statusValue } };
  }

  if (propertyNames.tags) {
    properties[propertyNames.tags] = {
      multi_select: [{ name: "SocraChat" }, { name: "Devlog" }],
    };
  }

  if (process.env.NOTION_SUMMARY_PROPERTY && summary) {
    properties[process.env.NOTION_SUMMARY_PROPERTY] = {
      rich_text: [{ text: { content: summary.slice(0, 2000) } }],
    };
  }

  return properties;
}

async function findPagesByTitle(title) {
  const response = await notion(`data_sources/${dataSourceId}/query`, {
    method: "POST",
    body: {
      filter: {
        property: propertyNames.title,
        title: { equals: title },
      },
      page_size: 1,
    },
  });

  return response.results || [];
}

async function archiveExistingPages(titles) {
  const uniqueTitles = [...new Set(titles.filter(Boolean))];

  for (const title of uniqueTitles) {
    const pages = await findPagesByTitle(title);
    for (const page of pages) {
      await notion(`pages/${page.id}`, {
        method: "PATCH",
        body: { in_trash: true },
      });
    }
  }
}

function markdownToNotionBlocks(markdown) {
  const blocks = [];
  const lines = markdown.split(/\r?\n/);
  let codeFence = null;
  let codeLines = [];

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();
    const fenceMatch = line.match(/^```(\w+)?/);

    if (fenceMatch) {
      if (codeFence) {
        blocks.push(codeBlock(codeLines.join("\n"), codeFence));
        codeFence = null;
        codeLines = [];
      } else {
        codeFence = fenceMatch[1] || "plain text";
      }
      continue;
    }

    if (codeFence) {
      codeLines.push(line);
      continue;
    }

    if (isTableStart(lines, index)) {
      const tableLines = [];
      while (index < lines.length && isTableRow(lines[index])) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      index -= 1;
      blocks.push(tableBlock(tableLines));
      continue;
    }

    if (!line.trim()) continue;
    if (line.trim() === "---") {
      blocks.push({ object: "block", type: "divider", divider: {} });
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      blocks.push(textBlock(`heading_${level}`, heading[2]));
      continue;
    }

    const todo = line.match(/^-\s+\[( |x|X)\]\s+(.+)$/);
    if (todo) {
      blocks.push({
        object: "block",
        type: "to_do",
        to_do: {
          rich_text: richText(todo[2]),
          checked: todo[1].toLowerCase() === "x",
        },
      });
      continue;
    }

    const bullet = line.match(/^\s*[-*]\s+(.+)$/);
    if (bullet) {
      blocks.push(textBlock("bulleted_list_item", bullet[1]));
      continue;
    }

    const numbered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (numbered) {
      blocks.push(textBlock("numbered_list_item", numbered[1]));
      continue;
    }

    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      blocks.push(textBlock("quote", quote[1]));
      continue;
    }

    blocks.push(textBlock("paragraph", line));
  }

  if (codeFence) {
    blocks.push(codeBlock(codeLines.join("\n"), codeFence));
  }

  return blocks.length ? blocks : [textBlock("paragraph", "업무 로그 내용 없음")];
}

function textBlock(type, content) {
  return {
    object: "block",
    type,
    [type]: { rich_text: richText(content) },
  };
}

function codeBlock(content, language) {
  return {
    object: "block",
    type: "code",
    code: {
      rich_text: richText(content.slice(0, 2000)),
      language: normalizeCodeLanguage(language),
    },
  };
}

function richText(content) {
  const tokens = parseInlineMarkdown(content).filter((token) => token.text.content);
  return tokens.length ? tokens : [{ type: "text", text: { content: "" } }];
}

function parseInlineMarkdown(content) {
  const tokens = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let cursor = 0;
  let match;

  while ((match = pattern.exec(content))) {
    if (match.index > cursor) tokens.push(textToken(content.slice(cursor, match.index)));

    if (match[1] && match[2]) {
      const url = match[2];
      tokens.push(isExternalUrl(url) ? textToken(match[1], { link: { url } }) : textToken(match[1]));
    } else if (match[3]) {
      tokens.push(textToken(match[3], { annotations: { code: true } }));
    } else if (match[4]) {
      tokens.push(textToken(match[4], { annotations: { bold: true } }));
    }

    cursor = pattern.lastIndex;
  }

  if (cursor < content.length) tokens.push(textToken(content.slice(cursor)));
  return tokens.flatMap(splitLongToken);
}

function isExternalUrl(value) {
  return /^https?:\/\//.test(value);
}

function textToken(content, overrides = {}) {
  return {
    type: "text",
    text: {
      content,
      ...(overrides.link ? { link: overrides.link } : {}),
    },
    ...(overrides.annotations ? { annotations: overrides.annotations } : {}),
  };
}

function splitLongToken(token) {
  if (token.text.content.length <= 2000) return [token];
  const chunks = [];
  for (let index = 0; index < token.text.content.length; index += 2000) {
    chunks.push({
      ...token,
      text: {
        ...token.text,
        content: token.text.content.slice(index, index + 2000),
      },
    });
  }
  return chunks;
}

function tableBlock(tableLines) {
  const rows = tableLines
    .filter((line) => !/^\|\s*-+/.test(line))
    .map((line) => splitTableRow(line));
  const width = Math.max(...rows.map((row) => row.length));

  return {
    object: "block",
    type: "table",
    table: {
      table_width: width,
      has_column_header: true,
      has_row_header: false,
      children: rows.map((row) => ({
        object: "block",
        type: "table_row",
        table_row: {
          cells: Array.from({ length: width }, (_, index) => richText(row[index] || "")),
        },
      })),
    },
  };
}

function splitTableRow(line) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableStart(lines, index) {
  return isTableRow(lines[index]) && isTableDivider(lines[index + 1]);
}

function isTableRow(line = "") {
  return /^\s*\|.+\|\s*$/.test(line);
}

function isTableDivider(line = "") {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function stripMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim();
}

function buildTitle(markdownTitle, date) {
  const projectName = (markdownTitle || "SocraChat").replace(/\s*-\s*개발 로그\s*$/, "").trim();
  const baseTitle = `${projectName} 디자인 작업 로그`;
  return baseTitle.includes(date) ? baseTitle : `${baseTitle} - ${date}`;
}

function extractSummary(markdown) {
  return markdown
    .split(/\r?\n/)
    .map((line) => stripMarkdown(line))
    .find((line) => line && !line.startsWith("#") && line !== "---");
}

function normalizeNotionId(value = "") {
  return value.replace(/[^a-fA-F0-9]/g, "");
}

function normalizeCodeLanguage(language) {
  const normalized = language.toLowerCase();
  const allowed = new Set(["javascript", "typescript", "html", "css", "json", "markdown", "shell", "plain text"]);
  if (normalized === "js") return "javascript";
  if (normalized === "ts") return "typescript";
  if (normalized === "bash" || normalized === "sh" || normalized === "zsh") return "shell";
  if (allowed.has(normalized)) return normalized;
  return "plain text";
}

function chunkArray(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

async function notion(endpoint, options = {}) {
  const response = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message = data.message || response.statusText;
    throw new Error(`Notion API ${response.status}: ${message}`);
  }

  return data;
}

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
    if (!match) continue;

    const key = match[1];
    const value = match[2].replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

function envWithDefault(key, fallback) {
  return Object.prototype.hasOwnProperty.call(process.env, key) ? process.env[key] : fallback;
}
