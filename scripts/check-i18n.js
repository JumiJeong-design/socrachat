#!/usr/bin/env node
/**
 * SocraChat i18n coverage checker
 * Scans every HTML file for data-i18n / data-i18n-content keys,
 * then verifies each key exists in all three language dicts (ko / ja / en).
 * Exit 0 = clean. Exit 1 = gaps found (blocks deploy).
 */

const fs   = require('fs');
const path = require('path');

const ROOT    = path.resolve(__dirname, '..');
const LANGS   = ['ko', 'ja', 'en'];
const HTML_FILES = [
  'screens/home.html',
  'screens/landing.html',
  'screens/analyzing.html',
  'screens/followup.html',
  'screens/comparison.html',
  'screens/source.html',
  'screens/deep-chat.html',
  'storybook.html',
];

/** Extract window.__SC_I18N object by counting brace depth (handles any nesting). */
function extractI18nDict(src) {
  const marker = src.indexOf('window.__SC_I18N');
  if (marker === -1) return null;

  const objStart = src.indexOf('{', marker);
  if (objStart === -1) return null;

  let depth = 0;
  let inStr = false;
  let strCh = '';
  let i = objStart;

  while (i < src.length) {
    const ch = src[i];
    if (inStr) {
      if (ch === '\\') { i++; }
      else if (ch === strCh) { inStr = false; }
    } else {
      if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strCh = ch; }
      else if (ch === '{') { depth++; }
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          const raw = src.slice(objStart, i + 1);
          // eslint-disable-next-line no-new-func
          return Function('"use strict"; return (' + raw + ')')();
        }
      }
    }
    i++;
  }
  return null;
}

let totalGaps = 0;

for (const rel of HTML_FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { console.warn(`⚠  skipped (not found): ${rel}`); continue; }

  const src = fs.readFileSync(file, 'utf8');

  // --- 1. Collect all i18n keys used in HTML ---
  const usedKeys = new Set();
  for (const m of src.matchAll(/data-i18n(?:-content)?="([^"]+)"/g)) {
    usedKeys.add(m[1]);
  }
  if (usedKeys.size === 0) continue;

  // --- 2. Parse __SC_I18N dicts ---
  const dicts = extractI18nDict(src);
  if (!dicts) {
    console.error(`✗  ${rel}: window.__SC_I18N block not found`);
    totalGaps++;
    continue;
  }

  // --- 3. Check every key against every language ---
  const fileGaps = [];
  for (const key of [...usedKeys].sort()) {
    const missing = LANGS.filter(lang => !dicts[lang] || !(key in dicts[lang]));
    if (missing.length) fileGaps.push({ key, missing });
  }

  if (fileGaps.length === 0) {
    console.log(`✓  ${rel} (${usedKeys.size} keys — ko/ja/en all covered)`);
  } else {
    console.error(`\n✗  ${rel} — ${fileGaps.length} gap(s):`);
    for (const { key, missing } of fileGaps) {
      console.error(`     "${key}"  →  missing in: ${missing.join(', ')}`);
    }
    totalGaps += fileGaps.length;
  }
}

console.log('');
if (totalGaps === 0) {
  console.log('✅  All i18n keys covered across ko / ja / en.');
  process.exit(0);
} else {
  console.error(`❌  ${totalGaps} i18n gap(s) found. Fix before deploying.`);
  process.exit(1);
}
