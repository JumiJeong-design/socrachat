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
When asked to sync from Figma:
1. Use `mcp__plugin_figma_figma__get_variable_defs` with fileKey to read current variable values
2. Compare Theme collection (Light mode) values against `colors_and_type.css`
3. Update changed CSS variables in `colors_and_type.css`
4. Run `vercel --yes --prod` to deploy

### Code → Figma
When asked to push screens to Figma:
1. Start local server: `npx http-server . -p 3000 --cors -s &`
2. Use `mcp__plugin_figma_figma__generate_figma_design` with outputMode: 'existingFile', fileKey above
3. Open each screen URL with capture hash
4. Poll until completed

## Design tokens
Primary: `--accent: #2D5F4F` (Forest green) on `--bg: #FBF9F4` (Warm cream)
Dark mode: `[data-theme="dark"]` on root element
i18n: `data-lang="ja|ko|en"` on html element

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

