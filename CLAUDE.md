# SocraChat Design System

## Project
HTML/CSS/JS prototype — no framework. Deployed at https://socrachat.vercel.app

Key files:
- `colors_and_type.css` — all design tokens (CSS variables)
- `screens/*.html` — 7 app screens
- `storybook.html` — interactive component storybook
- `assets/` — sc-ui.js (icons/logo), shell.js (i18n/theme), tweaks.js

## Figma sync

Figma file: https://www.figma.com/design/HFRVQXoWTWVaxMDNW7yapS
File key: `HFRVQXoWTWVaxMDNW7yapS`

### "Figma 싱크해줘" — Figma → Code
When asked to sync from Figma, use the Plugin API (MCP) approach:
1. Run this script via `use_figma` to read all variable values:
```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
function toHex(r,g,b){return '#'+[r,g,b].map(v=>Math.round(v*255).toString(16).padStart(2,'0').toUpperCase()).join('')}
const out={};
for(const col of collections){
  const vars=await Promise.all(col.variableIds.map(id=>figma.variables.getVariableByIdAsync(id)));
  const modeMap=Object.fromEntries(col.modes.map(m=>[m.modeId,m.name]));
  out[col.name]=vars.filter(Boolean).map(v=>{
    const values={};
    for(const [modeId,val] of Object.entries(v.valuesByMode)){
      const mode=modeMap[modeId];
      if(v.resolvedType==='COLOR'&&val&&'r'in val) values[mode]=toHex(val.r,val.g,val.b);
      else values[mode]=val;
    }
    return{name:v.name,type:v.resolvedType,values};
  });
}
return out;
```
2. Compare returned values against `colors_and_type.css` using this mapping:
   - Figma `bg/default` → CSS `--bg`, `bg/surface` → `--surface`, `bg/hover` → `--surface-hover`, `bg/elevated` → `--surface-elev`
   - Figma `fg/default` → `--fg`, `fg/strong` → `--fg-strong`, `fg/muted` → `--fg-muted`, `fg/subtle` → `--fg-subtle`, `fg/on-accent` → `--fg-on-accent`
   - Figma `line/default` → `--line`, `line/strong` → `--line-strong`
   - Figma `accent/default` → `--accent`, `accent/hover` → `--accent-hover`, `accent/soft` → `--accent-soft`, `accent/fg` → `--accent-fg`
   - Figma `warm/default` → `--warm-accent`, `warm/soft` → `--warm-soft`
   - Figma `bubble/*` → `--bubble-*` (same suffix)
   - Figma `ai-id/claude` → `--ai-claude`, `ai-id/gpt` → `--ai-gpt`, etc.
   - Figma `status/success` → `--success`, `status/warn` → `--warn`, `status/error` → `--error`, `status/info` → `--info`
   - Figma primitives (`cream/*`, `forest/*`, `clay/*`, `stone/*`) → `--cream-*`, `--forest-*`, etc.
   - Light mode values → `:root` block, Dark mode values → `[data-theme="dark"]` block
3. Update only the changed values in `colors_and_type.css`
4. Run `vercel --yes --prod` to deploy

Note: Figma REST API requires Professional plan. Use MCP approach above for free plan.

### Code → Figma
When asked to push screens to Figma:
1. Start local server: `npx http-server . -p 3000 --cors -s &`
2. Use `mcp__plugin_figma_figma__generate_figma_design` with outputMode: 'existingFile', fileKey above
3. Open each screen URL with capture hash
4. Poll until completed

## 작업 기록

유미님의 전체 작업 히스토리는 `~/Desktop/jumi-worklog/`에 날짜별로 쌓인다.
세션 시작 시 최근 worklog 파일을 읽어 맥락을 파악할 것.

## Design System
→ [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) 참조 (디자인 규칙, AI 행동 원칙, 토큰 구조, Visual direction, 마스코트 규칙 전부 여기)

## Deploy
```
vercel --yes --prod
```

## 수정 후 체크리스트
작업 완료 시 `/ship` 커맨드를 안내하거나 아래 순서를 따른다:
1. **i18n 자동 검사** — `node scripts/check-i18n.js` (누락 키 있으면 exit 1, 배포 차단)
2. 브라우저 확인 — SC/AP · KO/JA/EN · Light/Dark · Desktop/Mobile
3. git commit + push
4. `vercel --yes --prod` 배포 (Vercel build 단계에서 check-i18n 자동 실행됨)
5. 피그마 비교 (레이아웃 큰 변경 또는 공유 예정 시만)

## i18n 규칙
- 텍스트 요소에 `data-i18n="key"` 추가 시 반드시 ko/ja/en 딕셔너리 세 곳 모두에 키 추가
- TEXTAREA placeholder: `data-i18n="key" data-i18n-attr="placeholder"`
- TEXTAREA 입력값(pre-filled content): `data-i18n-content="key"` (별도 키 필요)
- INPUT placeholder: `data-i18n="key"` (shell.js가 자동으로 setAttribute 처리)
- 딕셔너리 문자열에 아포스트로피 포함 시 큰따옴표로 감쌀 것 (SyntaxError 방지)
