import fs from "node:fs";

const inputPath = process.argv[2] || "socrachat-tokens.json";
const outputPath = process.argv[3] || "figma-variable-spec.json";

const tokens = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const variables = [];

for (const [setName, setValue] of Object.entries(tokens)) {
  walk(setValue, [setName]);
}

const collections = [
  {
    name: "SocraChat / Global",
    variables: variables.filter((item) => item.set === "global"),
  },
  {
    name: "SocraChat / Theme",
    modes: ["light", "dark"],
    variables: mergeModes(["light", "dark"]),
  },
];

const spec = {
  fileKey: "HFRVQXoWTWVaxMDNW7yapS",
  source: inputPath,
  generatedAt: new Date().toISOString(),
  collections,
};

fs.writeFileSync(outputPath, `${JSON.stringify(spec, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
console.log(`${variables.length} token values mapped`);

function walk(value, path) {
  for (const [key, child] of Object.entries(value || {})) {
    if (child && typeof child === "object" && "value" in child && "type" in child) {
      const [set, ...nameParts] = [...path, key];
      variables.push({
        set,
        name: nameParts.join("/"),
        type: mapType(child.type),
        value: normalizeValue(child.value, child.type),
      });
    } else if (child && typeof child === "object") {
      walk(child, [...path, key]);
    }
  }
}

function mergeModes(modeNames) {
  const byName = new Map();

  for (const mode of modeNames) {
    for (const token of variables.filter((item) => item.set === mode)) {
      if (!byName.has(token.name)) {
        byName.set(token.name, {
          name: token.name,
          type: token.type,
          valuesByMode: {},
        });
      }
      byName.get(token.name).valuesByMode[mode] = token.value;
    }
  }

  return [...byName.values()];
}

function mapType(type) {
  if (type === "color") return "COLOR";
  if (["spacing", "borderRadius", "fontSizes", "lineHeights"].includes(type)) return "FLOAT";
  return "STRING";
}

function normalizeValue(value, type) {
  if (type === "color") return value;
  if (["spacing", "borderRadius", "fontSizes", "lineHeights"].includes(type)) return Number(value);
  return String(value);
}
