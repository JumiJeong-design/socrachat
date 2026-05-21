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
