/**
 * sync-from-figma.mjs
 * Figma Variables → colors_and_type.css 단방향 싱크
 *
 * 사용법:
 *   FIGMA_TOKEN=xxx node scripts/sync-from-figma.mjs
 *   FIGMA_TOKEN=xxx node scripts/sync-from-figma.mjs --dry-run
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSS_PATH = path.join(__dirname, '..', 'colors_and_type.css');
const FILE_KEY = 'HFRVQXoWTWVaxMDNW7yapS';
const DRY_RUN = process.argv.includes('--dry-run');

// Figma variable name → CSS custom property name
const FIGMA_TO_CSS = {
  // Primitives
  'cream/50': '--cream-50', 'cream/100': '--cream-100',
  'cream/200': '--cream-200', 'cream/300': '--cream-300',
  'forest/50': '--forest-50', 'forest/100': '--forest-100',
  'forest/300': '--forest-300', 'forest/500': '--forest-500',
  'forest/600': '--forest-600', 'forest/700': '--forest-700',
  'clay/100': '--clay-100', 'clay/300': '--clay-300', 'clay/500': '--clay-500',
  'stone/50': '--stone-50', 'stone/100': '--stone-100', 'stone/200': '--stone-200',
  'stone/300': '--stone-300', 'stone/400': '--stone-400', 'stone/500': '--stone-500',
  // Semantic
  'bg/default': '--bg', 'bg/sunken': '--bg-sunken', 'bg/tint': '--bg-tint',
  'bg/surface': '--surface', 'bg/hover': '--surface-hover', 'bg/elevated': '--surface-elev',
  'fg/default': '--fg', 'fg/strong': '--fg-strong', 'fg/muted': '--fg-muted',
  'fg/subtle': '--fg-subtle', 'fg/on-accent': '--fg-on-accent',
  'line/default': '--line', 'line/strong': '--line-strong',
  'accent/default': '--accent', 'accent/hover': '--accent-hover',
  'accent/soft': '--accent-soft', 'accent/fg': '--accent-fg',
  'warm/default': '--warm-accent', 'warm/soft': '--warm-soft',
  // Component
  'bubble/user-bg': '--bubble-user-bg', 'bubble/user-fg': '--bubble-user-fg',
  'bubble/ai-bg': '--bubble-ai-bg', 'bubble/ai-fg': '--bubble-ai-fg',
  'bubble/ai-border': '--bubble-ai-border',
  // AI identity
  'ai-id/claude': '--ai-claude', 'ai-id/gpt': '--ai-gpt',
  'ai-id/gemini': '--ai-gemini', 'ai-id/perplexity': '--ai-perplexity',
  'ai-id/grok': '--ai-grok', 'ai-id/deepseek': '--ai-deepseek',
  // Status
  'status/success': '--success', 'status/warn': '--warn',
  'status/error': '--error', 'status/info': '--info',
  'status/neutral': '--neutral',
  'status/warn-fg': '--warn-fg', 'status/error-fg': '--error-fg',
  // Spacing
  's-1':'--s-1','s-2':'--s-2','s-3':'--s-3','s-4':'--s-4','s-5':'--s-5',
  's-6':'--s-6','s-7':'--s-7','s-8':'--s-8','s-9':'--s-9',
  // Radius
  'r-xs':'--r-xs','r-sm':'--r-sm','r-md':'--r-md','r-lg':'--r-lg',
  'r-xl':'--r-xl','r-2xl':'--r-2xl','r-full':'--r-full',
};

function toHex({ r, g, b }) {
  return '#' + [r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0').toUpperCase()).join('');
}

function cssValue(variable, modeId) {
  const val = variable.valuesByMode[modeId];
  if (!val) return null;
  if (variable.resolvedType === 'COLOR') return toHex(val);
  if (variable.resolvedType === 'FLOAT') return `${val}px`;
  return String(val);
}

/**
 * Replace a CSS variable value inside a specific text block.
 * Handles both `--var: value;` and `--var: value; /* comment *\/` patterns.
 */
function replaceVarInBlock(block, cssVar, newValue) {
  const escaped = cssVar.replace(/[-]/g, '\\$&');
  const re = new RegExp(`(${escaped}\\s*:\\s*)([^;]+)(;)`, 'g');
  return block.replace(re, `$1${newValue}$3`);
}

async function fetchVariables() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) throw new Error('FIGMA_TOKEN 환경 변수가 필요합니다.\nexport FIGMA_TOKEN=your_personal_access_token');

  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables/local`, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) throw new Error(`Figma API error: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  console.log('Figma → CSS 싱크 시작...\n');

  const { meta } = await fetchVariables();
  const { variableCollections, variables } = meta;

  // Build mode name lookup
  const modeNames = {};
  for (const col of Object.values(variableCollections)) {
    for (const mode of col.modes) {
      modeNames[mode.modeId] = mode.name;
    }
  }

  // Collect light/dark values per CSS variable
  const lightUpdates = {};
  const darkUpdates = {};

  for (const variable of Object.values(variables)) {
    const cssVar = FIGMA_TO_CSS[variable.name];
    if (!cssVar) continue;

    for (const [modeId, val] of Object.entries(variable.valuesByMode)) {
      // Skip alias variables (type = object with 'type' = 'VARIABLE_ALIAS')
      if (val && typeof val === 'object' && val.type === 'VARIABLE_ALIAS') continue;

      const modeName = modeNames[modeId];
      let cssVal;
      if (variable.resolvedType === 'COLOR' && 'r' in val) {
        cssVal = toHex(val);
      } else if (variable.resolvedType === 'FLOAT') {
        cssVal = `${val}px`;
      } else continue;

      if (modeName === 'Light' || modeName === 'Default') {
        lightUpdates[cssVar] = cssVal;
      } else if (modeName === 'Dark') {
        darkUpdates[cssVar] = cssVal;
      }
    }
  }

  let css = fs.readFileSync(CSS_PATH, 'utf8');
  const original = css;

  // Split CSS into: before-dark-mode | dark-mode block
  const darkModeMarker = '/* ---------- DARK MODE ---------- */';
  const splitIdx = css.indexOf(darkModeMarker);
  if (splitIdx === -1) throw new Error('DARK MODE マーカーが見つかりません。CSS構造を確인してください。');

  let lightSection = css.slice(0, splitIdx);
  let darkSection = css.slice(splitIdx);

  const diffs = [];

  // Apply light/default updates
  for (const [cssVar, newVal] of Object.entries(lightUpdates)) {
    const before = lightSection;
    lightSection = replaceVarInBlock(lightSection, cssVar, newVal);
    if (lightSection !== before) diffs.push(`  light  ${cssVar}: ${newVal}`);
  }

  // Apply dark updates
  for (const [cssVar, newVal] of Object.entries(darkUpdates)) {
    const before = darkSection;
    darkSection = replaceVarInBlock(darkSection, cssVar, newVal);
    if (darkSection !== before) diffs.push(`  dark   ${cssVar}: ${newVal}`);
  }

  css = lightSection + darkSection;

  if (diffs.length === 0) {
    console.log('변경사항 없음 — CSS가 이미 최신 상태입니다.');
    return;
  }

  console.log(`변경된 변수 (${diffs.length}개):`);
  diffs.forEach(d => console.log(d));

  if (DRY_RUN) {
    console.log('\n--dry-run 모드: 파일은 변경되지 않았습니다.');
    return;
  }

  fs.writeFileSync(CSS_PATH, css, 'utf8');
  console.log(`\n✓ ${CSS_PATH} 업데이트 완료`);
}

main().catch(e => { console.error('오류:', e.message); process.exit(1); });
