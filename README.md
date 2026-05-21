# SocraChat Design System

**SocraChat (ソクラチャット)** — a multi-AI council for Japanese adult B2C users.

Send one question to 5 top AI models simultaneously, see where they agree and where they disagree (weighted), get persona-based perspectives, dig deeper with any single AI. Built to answer the Japanese market's nagging concern: *"Can I really trust this AI's answer?"*

**Source brief**: `socrachat-spec.txt` (extracted from `uploads/socra_chat_test.pdf`)

---

## 📂 Index

| Folder | Contents |
|---|---|
| `flow.html` | **🎯 Best starting point.** Single-page walkthrough of all 6 product screens with a stepper at top, narration per step, prev/next buttons + arrow keys. Language + theme persist across the whole flow. |
| `canvas.html` | Pan/zoom canvas presenting all screens side-by-side + mobile views. Open an artboard in focus mode to interact. |
| `colors_and_type.css` | Design tokens — light/dark, fonts, spacing, radii, shadows, motion |
| `assets/shell.js` | i18n + theme runtime · auto-injects floating KR/JA/EN + light/dark toolbar |
| `assets/sc-ui.js` | Shared logo + icon helpers (Lucide subset) |
| `preview/` | 14 small cards for the Design System tab (tokens + components) |
| `screens/` | Full product screens (interactive HTML) |
| `SKILL.md` | Claude Code-compatible skill manifest |

### 7 product screens
1. **`screens/home.html`** — Composer / empty state with model selector
2. **`screens/followup.html`** — Multi-choice clarification when intent is unclear ("Tesla — stock or car?")
3. **`screens/analyzing.html`** — Step-by-step loading pipeline
4. **`screens/comparison.html`** — 🌟 **The hero**. 4 togglable agreement viz (bar / donut / dots / per-AI), opinion cards, persona panel, sources, follow-up composer
5. **`screens/source.html`** — Full text from one specific model + metadata + citations
6. **`screens/deep-chat.html`** — 1-on-1 deep conversation with a single AI, carrying prior context
7. **`screens/landing.html`** — Marketing landing page

---

## 🎨 Brand essence

> 「ひとつのAIで決めない。5つのAIに同時に聞く。」
> *Don't rely on one AI. Ask five at once.*

- **Warm but clear.** A friendly advisor, not a cold dashboard.
- **Council, not chatbot.** Visualizes disagreement instead of hiding it.
- **Japanese first, but multilingual.** Polite です/ます default, optional KR/EN for the founder's review.
- **Calm authority.** Trustworthy enough for investment-level decisions, soft enough for late-night use.

## 🖋 Content fundamentals

- **Voice**: です/ます (polite, never stiff). No corporate vagueness — say what each model said, name the disagreement.
- **Numbers as evidence.** Always show the weight (`62%`), the source count (`3 of 5 models`), the confidence (`8/10`).
- **No emoji in chrome.** Emoji allowed inside AI bubble content or category tags (📊 投資, 🏥 健康) only.
- **Disclaimers are first-class.** Investment, medical, legal categories *always* surface a non-blocking warning card.
- **Casing**: SocraChat (not SOCRA CHAT), 結論A (not 結論a). Half-width digits in Japanese text.

## 🌈 Visual foundations

| Aspect | Choice |
|---|---|
| **Primary** | Forest `#2D5F4F` — trustworthy, calm, alive (not corporate blue) |
| **Surfaces** | Warm cream `#FBF9F4` → `#FFFFFF` (light) · Warm graphite `#14130F` → `#1E1C17` (dark). Never pure black/white. |
| **AI identity hues** | 6 stable colors (`#7B5EA0` Claude, `#4A6FA5` GPT, `#C68635` Gemini, `#3D8077` Perplexity, `#B05C6D` Grok, `#5E6B7D` DeepSeek). Same model = same hue everywhere. |
| **Warm accent** | Clay `#B5613F` — used sparingly for warnings, follow-up badges. |
| **Type — UI** | Inter (Latin) · Noto Sans JP (Japanese) · Noto Sans KR (Korean fallback for review). Weight 500/600. |
| **Type — display** | Shippori Mincho — Japanese serif. Used **only** for hero / quote moments. Editorial weight. |
| **Type — mono** | JetBrains Mono — percentages, hex values, IDs, technical labels. |
| **Radii** | 8 buttons · 10 inputs · 14–18 cards · 20 chat bubbles · 999 chips |
| **Shadow** | Single warm-tinted shadow per elevation step. No layered drop-shadows. |
| **Motion** | 180ms ease-out for hover · 280ms cubic-bezier(.2,.8,.2,1) for bubble entrance · 600ms for bar/donut fill transitions. No bounce. |
| **Hover** | Bg tint shift (`--surface-hover`). Never scale, never glow. |
| **Press** | Subtle opacity 0.95 + slight bg darken. Never shrink whole element. |
| **Imagery** | Type + data-viz centric. No stock photos. No SVG illustrations of people. Persona avatars are 1-character initials on hue. |
| **Transparency/blur** | Composer bar uses `linear-gradient` fade to bg; top nav stays solid. No frosted glass. |

## 🌐 i18n + theme

Every screen includes `assets/shell.js` which:
- Auto-injects a **floating toolbar (top-right)** with KR/JA/EN segmented switcher + light/dark toggle
- Persists choice in `localStorage` (`sc-lang`, `sc-theme`)
- Re-renders any element with `data-i18n="key"` using the page's `window.__SC_I18N` dictionary
- Default language: **JA** (the production language). KR is for the user (Korean founder/reviewer).

To add a new translation: add the `key` to all three language objects in the screen's `<script>` and a matching `data-i18n="key"` to the element.

## 🎯 Iconography

- **System**: [Lucide](https://lucide.dev) — inlined SVG only, 1.75px stroke, 14–16px default size. No icon fonts.
- **Available subset**: see `window.SC_ICONS` in `assets/sc-ui.js`. Render via `window.SC_icon('name')`.
- **Emoji**: not in UI chrome. Allowed inside AI-generated content + category tags.
- **No raster icons.** Never PNG icons.

## 🧩 Design patterns the user should know

- **Agreement viz is togglable.** Don't pick one — user picks. `screens/comparison.html` has 4 styles (bar/donut/dots/per-AI) in the same conclusion-card with a small switcher.
- **Opinion cards have a colored left strip** matching the conclusion's hue. The hue groups answers from multiple models.
- **AI avatars stack with overlap** when listing models for an opinion (negative margin, white border ring).
- **Conditional/strong matches** are tagged with a small chip in the opinion header.
- **High-risk categories** (investing, medical, legal) get a soft amber warning card in the side panel — never blocks the answer.

## ⚠️ Caveats / open items

1. **Korean font fallback** uses Noto Sans KR for review purposes. Production is JA-first; if KR ever becomes a target market, retest letter-spacing and line-height for KR-specific weight.
2. **Persona avatars are 1-character.** A more polished system might use SVG illustrated avatars — currently flagged as placeholder.
3. **No actual AI backend.** Canned data shows the design intent. AI selection logic, opinion clustering algorithm, persona generation rules are out of design scope (handled by `@ai팀` per PDF).
4. **Mobile = responsive web.** Each screen reflows to ~375px; we did not build native iOS/Android shells. The canvas's mobile section shows the same screens at narrower widths.
5. **Animated viz transitions** (bar morph → donut morph) are not implemented — switcher just toggles display. Worth designing if you want it more delightful.
6. **Source PDF still has open AI-team questions** (`@ai팀` annotations) — design assumes the most user-friendly interpretation; revisit when those are resolved.

---

## ▶️ Quick tour

Open `canvas.html` for the full presentation. Or click these individually:
- **Hero screen**: `screens/comparison.html`
- **Landing**: `screens/landing.html`
- **Composer**: `screens/home.html`

In any screen, click the **KO/JA/EN** toggle (top-right) to switch language. Click the sun/moon to swap theme. Preferences persist across all screens.
