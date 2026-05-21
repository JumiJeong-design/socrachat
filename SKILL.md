---
name: socrachat-design
description: Use this skill to generate well-branded interfaces and assets for SocraChat (ソクラチャット), a multi-AI council product for Japanese adult B2C users. Contains design guidelines, tokens, components, and 7 full product screens (interactive HTML) for prototyping or production work. Forest-on-cream palette, Japanese-first type, light + dark, KR/JA/EN i18n, responsive web + mobile.
user-invocable: true
---

Read `README.md` for the full design system + product context.

Key files:
- `colors_and_type.css` — all tokens (light/dark, type, spacing, radii, shadow, motion, AI identity hues)
- `assets/shell.js` — drop into any HTML to get floating KR/JA/EN + light/dark toolbar
- `assets/sc-ui.js` — logo + Lucide icon helpers
- `screens/` — 7 high-fidelity product screens. Copy and adapt for new flows.
- `canvas.html` — see everything at once

If creating visual artifacts (mocks, prototypes), copy `colors_and_type.css` + `assets/*.js` + relevant screen as starting point.

If the user invokes this skill without other guidance, ask:
- Which surface? (composer, comparison board, deep chat, settings…)
- New screen or variation of existing?
- Web, mobile, or both?
- Any language constraint? (default JA)

Then build as a SocraChat expert: forest primary, warm cream surfaces, opinion+conclusion structure, multi-AI weight visualization, Japanese-first copy, KR/EN i18n via `data-i18n` attrs.

**Avoid these mistakes**:
- Pure black/white surfaces (always warm cream / warm graphite)
- AI model logos used as identity (use stable hue + initial letter instead)
- Single agreement viz baked in (let user toggle bar/donut/dot/per-AI)
- Hiding model disagreement (the whole product *is* surfacing it)
- Emoji in UI chrome (only in AI-generated content)
