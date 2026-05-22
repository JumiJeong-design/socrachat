---
id: socraschat
name: SocraChat
country: JP
category: ai-product
homepage: "https://socrachat.vercel.app"
primary_color: "#2D5F4F"
verified: "2026-05-22"
omd: "0.1"
ds:
  name: SocraChat Design System
  type: custom
  description: Warm advisory UI for multi-AI comparison. Forest green on warm cream. Japanese market focus.
---

# Design System of SocraChat

## 1. Visual Theme & Atmosphere

SocraChat's interface is built on a single metaphor: a trusted advisor who presents multiple perspectives without forcing a conclusion. The design system translates this into visual language through warm restraint — surfaces that feel like quality paper, typography that reads like editorial prose, and a primary color that suggests mature authority rather than startup energy.

The page canvas is warm cream (`#FBF9F4`) rather than pure white, carrying a slight yellow undertone that softens the reading experience across long deliberation sessions. Text is not pure black but warm graphite (`#29251F` at 95% density), creating a reading register closer to a printed book than a software interface. The forest green accent (`#2D5F4F`) — chosen for its association with growth, reliability, and considered judgment — appears exclusively on interactive elements and active states, never decoratively.

What defines SocraChat's visual identity is its AI identity color system: six distinct hues (blue, violet, amber, teal, rose, slate) used only to differentiate AI model opinions on the comparison board. These colors are the only chromatic variety in an otherwise warm-neutral palette. The contrast between the muted cream backgrounds and the vivid opinion markers creates a visualization language users learn intuitively — color here means "which AI said this," nothing else.

The Japanese market context shapes the typography fundamentally. Shippori Mincho (display serif) brings the visual register of quality Japanese print publishing to the heading hierarchy. Noto Sans JP provides the utilitarian workhorse at body sizes. JetBrains Mono handles all quantitative data — confidence percentages, timestamps, model counts — treating numbers as a distinct typographic register.

**Key Characteristics:**
- Warm cream canvas (`#FBF9F4`) — quality paper over sterile white
- Forest green (`#2D5F4F`) as the singular interactive accent — authority, not energy
- Six AI identity hues used exclusively for opinion grouping — color = source, not decoration
- Three-font system: Shippori Mincho (display) · Inter/Noto (UI) · JetBrains Mono (data)
- `font-feature-settings: 'palt' 1` — proportional alternate spacing for Japanese
- Warm shadows with a brown-amber tint (`rgba(45, 35, 20, ...)`) — light from above, not from a screen
- 8px base spacing unit with clean multiples

## 2. Color Palette & Roles

### Layer 1 — Primitive

**Cream (surfaces)**
- `--cream-50:  #FBF9F4` — Page background, warm canvas
- `--cream-100: #F5F1EA` — Sunken surfaces, form inputs
- `--cream-200: #ECE5D9` — Dividers, structural separators
- `--cream-300: #DED5C5` — Strong borders

**Forest (primary — "trustworthy advisor")**
- `--forest-50:  #E8EFEA` — Accent soft, active nav background
- `--forest-100: #C8D6CC` — Hover tint
- `--forest-300: #6E8B7A` — Muted accent, subdued states
- `--forest-500: #2D5F4F` — Primary accent — CTAs, active states, links
- `--forest-600: #234A3F` — Hover state on primary
- `--forest-700: #1A372E` — Pressed/active deep state

**Clay (secondary warmth — used sparingly)**
- `--clay-100: #F4E3D5` — Warm soft background for alerts
- `--clay-300: #D89E7E` — Warm mid-tone
- `--clay-500: #B5613F` — Destructive / warm accent — delete, caution actions

**Stone (warm graphite text scale)**
- `--stone-50:  #6E665C` — Subtle text, disabled
- `--stone-100: #524A41` — Muted text, secondary labels
- `--stone-200: #3B3530` — Body text
- `--stone-300: #29251F` — Default text (`--fg`)
- `--stone-400: #18150F` — Strong text, headings (`--fg-strong`)
- `--stone-500: #0E0C09` — Maximum contrast, rarely needed

**AI Identity Hues (comparison board only)**
- `--ai-blue:   #4A6FA5` — GPT / OpenAI opinions
- `--ai-violet: #7B5EA0` — Claude / Anthropic opinions
- `--ai-amber:  #C68635` — Gemini opinions
- `--ai-teal:   #3D8077` — Perplexity opinions
- `--ai-rose:   #B05C6D` — Grok opinions
- `--ai-slate:  #5E6B7D` — DeepSeek opinions

### Layer 2 — Semantic (Light Mode)

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#FBF9F4` | Page background |
| `--bg-sunken` | `#F5F1EA` | Inputs, recessed surfaces |
| `--bg-tint` | `#E8EFEA` | Forest-tinted area backgrounds |
| `--surface` | `#FFFFFF` | Cards, dialogs, composer |
| `--surface-hover` | `#F5F1EA` | Interactive surface hover |
| `--fg` | `#29251F` | Default body text |
| `--fg-strong` | `#18150F` | Headings, emphasized text |
| `--fg-muted` | `#524A41` | Secondary labels, descriptions |
| `--fg-subtle` | `#8A8175` | Placeholders, timestamps, captions |
| `--fg-on-accent` | `#FFFFFF` | Text on forest green surfaces |
| `--accent` | `#2D5F4F` | Primary CTA, active states, links |
| `--accent-hover` | `#234A3F` | Hover on primary |
| `--accent-soft` | `#E8EFEA` | Soft accent background |
| `--accent-fg` | `#FFFFFF` | Text on accent |
| `--warm-accent` | `#B5613F` | Destructive / warm secondary |
| `--warm-soft` | `#F4E3D5` | Soft warm background |
| `--line` | `#E8DECE` | Standard divider |
| `--line-strong` | `#D2C5AE` | Emphasized border |

### Status Colors

| Token | Value | Use |
|-------|-------|-----|
| `--success` | `#4F7A4C` | Positive, confirmed |
| `--warn` | `#C9893A` | Caution, partial confidence |
| `--error` | `#B8504C` | Error, failed |
| `--warn-soft` | `rgba(201,137,58,.10)` | Warn surface |
| `--warn-fg` | `#8A5C20` | Warn text |
| `--warn-border` | `rgba(201,137,58,.25)` | Warn border |
| `--error-soft` | `rgba(184,80,76,.10)` | Error surface |
| `--error-fg` | `#B8504C` | Error text |
| `--error-border` | `rgba(184,80,76,.25)` | Error border |

### Dark Mode Adjustments

Dark mode inverts the warm cream canvas to a near-black warm dark (`#14130F`) — not cold charcoal but a brown-black with the same yellow undertone as the light cream. The forest green accent shifts to a desaturated sage (`#7AAA94`) — lighter and less saturated so it reads on dark surfaces without appearing harsh. AI identity hues are slightly lightened and desaturated to maintain differentiation without eye strain.

| Token | Dark Value | Note |
|-------|-----------|------|
| `--bg` | `#14130F` | Warm near-black |
| `--surface` | `#1E1C17` | Warm dark card |
| `--fg` | `#F0EBDE` | Warm near-white |
| `--fg-strong` | `#FFFEFA` | Maximum light |
| `--accent` | `#7AAA94` | Sage green |
| `--ai-blue` | `#6E94CC` | Desaturated |
| `--ai-violet` | `#A088C5` | Desaturated |
| `--ai-amber` | `#E4AE5F` | Desaturated |
| `--ai-teal` | `#5FA39A` | Desaturated |
| `--ai-rose` | `#D17F8C` | Desaturated |
| `--ai-slate` | `#8A98AA` | Desaturated |

## 3. Typography Rules

### Font Families

| Token | Stack | Use |
|-------|-------|-----|
| `--font-display` | Shippori Mincho → Noto Serif JP → Hiragino Mincho ProN → serif | Hero headings, question display |
| `--font-ui` | Inter → Noto Sans JP → Noto Sans KR → Hiragino Sans → system-ui | All UI chrome, navigation, buttons |
| `--font-jp` | Noto Sans JP → Hiragino Sans → Yu Gothic → system-ui | Japanese locale body text |
| `--font-ko` | Noto Sans KR → system-ui | Korean locale body text |
| `--font-mono` | JetBrains Mono → Menlo → monospace | Numbers, timestamps, confidence scores, labels |

**Language switching:** `html[data-lang="ja"]` activates `--font-jp` on `body`. `html[data-lang="ko"]` activates `--font-ko`. English uses `--font-ui` (Inter).

**OpenType:** `font-feature-settings: 'palt' 1` is applied globally — proportional alternate spacing improves CJK text at all sizes.

### Type Scale

| Token | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| `--text-xs` | 12px | 600–700 | — | Badges, mono labels |
| `--text-sm` | 14px | 400–500 | 1.4 | Captions, small nav |
| `--text-base` | 16px | 400 | 1.65 | Body text |
| `--text-md` | 17px | 400–500 | 1.65 | Emphasized body |
| `--text-lg` | 18px | 500–600 | 1.4 | Subheadings, card titles |
| `--text-xl` | 22px | 600 | 1.25 | h4 |
| `--text-2xl` | 28px | 600 | 1.25 | h3 |
| `--text-3xl` | 36px | 600 | 1.25 | h2 |
| `--text-4xl` | 48px | 600 | 1.25 | h1 |
| `--text-5xl` | 64px | 600 | — | Landing hero only |

### Heading Defaults

All headings: `font-family: --font-ui`, `font-weight: 600`, `line-height: --leading-tight (1.25)`, `letter-spacing: -0.01em`, `color: --fg-strong`.

Display headings (landing hero, question cards): `font-family: --font-display` (Shippori Mincho) for Japanese editorial warmth.

### Principles

- **Shippori Mincho for display only:** The serif appears exclusively in hero headings and question display — where it signals importance, not decoration. Never on UI chrome.
- **JetBrains Mono for data:** Confidence percentages (`68%`), model counts (`5 models`), timestamps (`0.4s`) — all monospaced. Numbers are data, not prose.
- **Weight restraint:** The scale spans 400 (body) to 700 (badges only). Headings at 600. Extra bold (700) is reserved for `--font-mono` numerical labels.
- **`palt` everywhere:** Proportional alternate spacing corrects CJK character width across all locales. Applied globally on `html, body`.
- **Letter-spacing at headings:** `-0.01em` tightens the heading scale slightly — enough to feel editorial without the compression of display-only systems.

## 4. Component Stylings

### Buttons

**Primary (Send / Ask)**
- Background: `--accent` (`#2D5F4F`)
- Text: `--accent-fg` (`#FFFFFF`)
- Padding: `0 18px`, height `36px`
- Radius: `--r-full` (`999px`) — full pill
- Hover: `--accent-hover` (`#234A3F`)
- Disabled: `--line-strong` background, `--fg-subtle` text
- Font: 14.5px, weight 600

**Ghost / Icon Button**
- Background: transparent
- Color: `--fg-muted`
- Size: 34–36px square, radius `--r-sm` (8px) or `--r-md` (12px)
- Hover: `--surface-hover` background, `--fg-strong` text

**Destructive**
- Background: `--warm-accent` (`#B5613F`)
- Text: `--fg-on-accent`
- Focus: `color-mix(in srgb, --warm-accent 25%, transparent)` ring

### Composer Input

The composer is the product's primary interaction surface — a floating card that elevates on focus.

- Background: `--surface`
- Border: `1px solid --line-strong`
- Radius: `22px`
- Shadow: `--shadow-lg`
- Padding: `14px 14px 12px 20px`
- **Focus state:** border shifts to `--accent`, gains `--shadow-focus` ring
- Textarea: `17px`, line-height `170%`, min-height `70px`, `background: transparent`

### Opinion / Comparison Cards

- Left accent strip: 4px width, `background: --ai-[model]` color
- Card body: `padding: 16px 18px`
- Border: `1px solid --line`, radius `14px`
- Hover: `--shadow-md`, border shifts to `--line-strong`
- Opinion text: `13.5px`, `--fg`, line-height `165%`

### AI Avatar Stack

- Size variants: 18px (xs), 22px (sm), 32px (md), 44px (lg), 56px (xl)
- Background: `--ai-[model]` hue via `--model-color` CSS custom property
- Logo mask: SVG mask via `mask: url(...)`, white foreground
- Stack overlap: `-9px` left margin on successive items, `2px solid --bg` border separator
- Pulse animation (analyzing state): `scale(1) → scale(1.15) → scale(1)` at 1200ms

### Tabs (Comparison Board)

- Default: `--fg-muted`, no background
- Active: `color: --accent`, `border-bottom: 2px solid --accent`, `font-weight: 600`
- Counter badge on active tab: `background: --accent-soft`, `color: --accent`
- Tab bar: `border-bottom: 1px solid --line`

### Chat Bubbles

- User: `background: --bubble-user-bg` (forest green), `color: --bubble-user-fg` (white), `border-bottom-right-radius: 6px`
- AI: `background: --bubble-ai-bg`, `border: 1px solid --bubble-ai-border`, `border-bottom-left-radius: 6px`
- Animation: `opacity: 0, translateY(8px), scale(0.97)` → resting at `--dur-bubble` (280ms)

### Progress / Pipeline (Analyzing Screen)

- Step marker: `24px` circle, default `--bg-sunken`
- Done state: `background: --accent`, checkmark `✓`
- Running state: `background: --accent-soft`, spinning border animation 800ms linear
- Pipeline row: `border-bottom: 1px dashed --line`, `padding: 14px 4px`

## 5. Layout Principles

### Spacing System

Base unit: 8px. Scale defined as `--s-1` through `--s-9`:

| Token | Value | Common use |
|-------|-------|-----------|
| `--s-1` | 4px | Icon gap, micro spacing |
| `--s-2` | 8px | Button gap, list item padding |
| `--s-3` | 12px | Card inner gap |
| `--s-4` | 16px | Section inner padding |
| `--s-5` | 24px | Card padding |
| `--s-6` | 32px | Section gap |
| `--s-7` | 48px | Major section spacing |
| `--s-8` | 64px | Hero padding |
| `--s-9` | 96px | Top-level section rhythm |

### Grid & Container

- `--max-content: 720px` — Single-column content (home, analyzing, source)
- `--max-board: 1200px` — Two-column comparison board
- `--max-page: 1280px` — Full page maximum
- Comparison board: `grid-template-columns: 1fr 340px` (main + sidebar)

### Border Radius Scale

| Token | Value | Use |
|-------|-------|-----|
| `--r-xs` | 4px | Small badges, micro elements |
| `--r-sm` | 8px | Icon buttons, focus rings |
| `--r-md` | 12px | Cards, panels |
| `--r-lg` | 16px | Large cards |
| `--r-xl` | 20px | Chat bubbles |
| `--r-2xl` | 28px | Feature hero cards |
| `--r-full` | 999px | Pills, send button, nav |

### Screen Structure

Every screen follows: `header (topbar) → main (flex: 1) → optional footer`. Topbar is `sticky top: 0` on content-heavy screens, static on single-focus screens (home, analyzing).

## 6. Depth & Elevation

| Level | Token | Value | Use |
|-------|-------|-------|-----|
| Ground | — | No shadow | Body background, section fills |
| Flat | `--shadow-sm` | `0 1px 2px rgba(45,35,20,.05)` | Subtle separation, borders |
| Raised | `--shadow-md` | `0 2px 12px rgba(45,35,20,.06)` | Cards on hover |
| Float | `--shadow-lg` | `0 8px 32px rgba(45,35,20,.08)` | Composer, active panels |
| Overlay | `--shadow-xl` | `0 24px 60px -16px rgba(45,35,20,.18)` | Modals, dropdowns |
| Focus | `--shadow-focus` | `0 0 0 3px rgba(45,95,79,.18)` | Keyboard focus ring |

**Shadow philosophy:** All shadows use `rgba(45, 35, 20, ...)` — a warm brown-amber, not neutral gray. This preserves the analog warmth against the cream canvas. Opacity is low (max 0.18 at overlay) — elevation is subtle and cumulative. The composer's `--shadow-lg` is the most visible shadow in the product; most UI elements at rest cast no shadow.

## 7. Do's and Don'ts

### Do
- Use `--fg-strong` / `--fg` / `--fg-muted` / `--fg-subtle` as the four-tier text hierarchy — never use raw hex values for text
- Apply forest green (`--accent`) exclusively to interactive elements — CTAs, active states, links, focus rings
- Use `--ai-[blue|violet|amber|teal|rose|slate]` only for model identity on the comparison board — never for decoration
- Use `--font-display` (Shippori Mincho) only on display-size headings and question cards
- Use `--font-mono` (JetBrains Mono) for all numerical data, timestamps, and confidence labels
- Apply `rgba(45, 35, 20, ...)` brown-amber tint on all shadows — never cold gray shadows
- Use pill radius (`--r-full`) on send button, navigation items, category tags, AI model chips

### Don't
- Don't use raw hex colors in component styles — use semantic tokens from Layer 2 (`--accent`, `--surface`, etc.)
- Don't use the AI identity hues (`--ai-blue`, `--ai-violet`, etc.) outside of opinion/comparison contexts
- Don't apply Shippori Mincho to body text, navigation, or UI chrome — it is a display-only font
- Don't mix warm and cool grays — the entire scale carries yellow-brown undertones; introducing `#9ca3af` or similar cool grays breaks the analog warmth
- Don't use `font-weight: 700` or higher on the UI font stack — maximum is 600 (Inter, Noto). 700 is reserved for `--font-mono` badge labels
- Don't use `--warm-accent` (clay) for primary actions — it is reserved for destructive/caution states only
- Don't use shadows larger than `--shadow-lg` on standard UI elements — `--shadow-xl` is for overlays only

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key changes |
|------|-------|------------|
| Mobile | < 540px | Single column, hidden nav links, collapsed composer actions |
| Tablet | 540–768px | Wider composer, topbar nav visible |
| Desktop | 768–1080px | Full two-column board layout |
| Wide | > 1080px | Max-width containers centered |

### Collapsing Strategy

- **Topbar nav:** Hidden below 540px (`display: none`), replaced by bottom navigation or hamburger
- **Composer bar:** At < 540px, hides icon buttons 2 and 3, collapses send to icon-only (36×36 circle)
- **AI model selector:** `max-width: 140px` on mobile to prevent overflow
- **Comparison board:** Drops sidebar to full-width stack below 768px
- **Hero heading:** `clamp(32px, 4.5vw, 52px)` — scales between mobile minimum and desktop maximum

### Touch Targets

- Primary buttons: minimum `36px` height
- Icon buttons: `34–36px` square minimum
- Nav links: `40px` height via padding
- Chat bubbles: no minimum — passive content

## 9. Agent Prompt Guide

### Quick Color Reference

| Element | Token | Value |
|---------|-------|-------|
| Page background | `--bg` | `#FBF9F4` |
| Cards | `--surface` | `#FFFFFF` |
| Body text | `--fg` | `#29251F` |
| Headings | `--fg-strong` | `#18150F` |
| Secondary text | `--fg-muted` | `#524A41` |
| Captions | `--fg-subtle` | `#8A8175` |
| Primary CTA | `--accent` | `#2D5F4F` |
| Destructive | `--warm-accent` | `#B5613F` |
| Dividers | `--line` | `#E8DECE` |
| Focus ring | `--shadow-focus` | `0 0 0 3px rgba(45,95,79,.18)` |

### Example Component Prompts

- "Create a question card: warm cream `#FBF9F4` background, `1px solid #E8DECE` border, `16px` radius. Display heading in Shippori Mincho weight 500, `28px`, color `#18150F`. Sub-label in JetBrains Mono `10px` weight 600 uppercase `#8A8175`."
- "Build a send button: `background: #2D5F4F`, `color: #FFFFFF`, `height: 36px`, `padding: 0 18px`, `border-radius: 999px`, `font-weight: 600`, `font-size: 14.5px`. Hover: `#234A3F`. Disabled: `background: #D2C5AE`, `color: #8A8175`."
- "Design an AI opinion card for Claude. Left strip: `4px wide`, `background: #7B5EA0`. Card body: `padding: 16px 18px`, `border: 1px solid #E8DECE`, `border-radius: 14px`. AI avatar: `32px` circle, `background: #7B5EA0`, white SVG mask. Opinion text: `13.5px Inter`, `color: #29251F`, `line-height: 165%`."
- "Create a confidence badge: JetBrains Mono, `12px`, weight 700. Background: `#E8EFEA`. Color: `#2D5F4F`. Padding: `2px 8px`. Radius: `6px`."
- "Build the analyzing pipeline step. Step marker: `24px` circle. Done state: `background: #2D5F4F`, white checkmark. Running state: `background: #E8EFEA`, spinning `2px solid #2D5F4F` border at 800ms linear. Label: `14px Inter weight 500`, `color: #18150F` when active."

### Iteration Guide

1. Warm cream canvas always — `#FBF9F4`, never pure white for page backgrounds
2. Forest green for interaction only — `#2D5F4F` on buttons, active states, links, focus
3. Three-font rule: Shippori Mincho (display headlines) · Inter/Noto (everything else) · JetBrains Mono (numbers and labels)
4. AI colors encode model identity, not sentiment — `--ai-violet` is "Claude's opinion," not "premium" or "warning"
5. Warm shadows: `rgba(45, 35, 20, ...)` — always warm, never `rgba(0, 0, 0, ...)`
6. `font-feature-settings: 'palt' 1` on every surface that may render Japanese
7. Pill radius on CTAs and chips — `999px`, never `4px` or `8px` for primary buttons

## 10. Voice & Tone

SocraChat's product copy operates in two registers. Within the UI, the voice is precise and facilitative — it describes what the product is doing, not how impressive it is. "5つのAIに同時問い合わせ中" (Querying 5 models in parallel) is the label for the analyzing step, not "Harnessing the power of AI." The product never celebrates itself.

The landing and onboarding copy addresses the specific anxiety of AI-assisted decision-making: that trusting a single model is a risk. The headline "AIの答えが割れるとき、判断の質が上がる" (When AIs disagree, your judgment improves) inverts the expected frame — disagreement between models is framed as a feature, not a flaw.

| Context | Tone |
|---------|------|
| Analyzing screen labels | Precise, sequential. "質問のカテゴリを分析中" not "Thinking about your question" |
| Comparison board | Neutral, curatorial. Presents views, never recommends |
| Error states | Specific and blameless. States what failed, not who failed |
| Onboarding / landing | Frame-setting. Addresses the anxiety of AI trust, not product features |
| Empty states | Invitational. Shows the pattern of use, not a sales pitch |

**Forbidden phrases:** "AI-powered," "harness," "unlock," "revolutionary," "next-generation," any superlative about AI capability. SocraChat's voice trusts users to evaluate AI output — it does not evangelize it.

## 11. Brand Narrative

SocraChat is a multi-AI comparison product designed for the Japanese market, built on a single insight: that the value of AI advice comes not from trusting the smartest model, but from seeing where multiple models agree and where they diverge. The name references Socratic method — the philosophical technique of exposing assumptions through structured questioning and multiple perspectives, not from receiving answers from an oracle.

The product is positioned at the intersection of two Japanese cultural registers: the depth of deliberation valued in high-stakes personal decisions (investment, career, family) and the growing fluency with AI tools among knowledge workers. It is not a productivity tool — it is a judgment tool. Users come not to complete tasks faster, but to decide more confidently.

The visual identity encodes this philosophy materially. Forest green reads across cultures as: growth, reliability, stability, the natural world's quiet authority. Warm cream reads as: considered, analog, crafted, not mass-produced. Together they suggest the feel of a trusted advisor's office — not a chat interface, not a dashboard, not a research tool. A place to think.

The AI identity color system (six distinct hues, each assigned to a model) is the product's most original visual invention. It transforms what is typically invisible — which AI produced which output — into a navigable spatial language. Users learn within a session that blue means one perspective, violet another. The comparison board becomes a map of opinion rather than a list of answers.

## 12. Principles

1. **Show disagreement as value.** When five AIs give five different answers, SocraChat surfaces the disagreement prominently. Consensus is highlighted; divergence is equally highlighted. The product never hides the uncertainty.
2. **Color encodes source, not quality.** The AI identity colors (`--ai-blue`, `--ai-violet`, etc.) are strictly semantic: they identify which model produced the opinion. They carry no quality judgment — violet is not better than blue.
3. **Warm surfaces reduce decision anxiety.** The cream canvas and forest green palette are not aesthetic preferences; they are calibrated to reduce the clinical feel of AI interfaces that can feel inhuman during high-stakes decisions.
4. **Data is typographically distinct.** Numbers — confidence scores, model counts, timing — appear in JetBrains Mono, separated from editorial prose in Inter/Noto. The user's eye learns which register carries quantitative information.
5. **Three-font system as three registers.** Shippori Mincho = importance (the question being decided). Inter/Noto = process (the interface facilitating). JetBrains Mono = evidence (the data informing). Each font appears only in its register.
6. **Restraint in color breadth.** Outside the six AI identity hues, the palette is forest green + warm cream + warm graphite. No additional accent colors. The six AI colors are chromatic because they need to be distinguishable; everything else is warm-neutral because it should not compete.
7. **Progressive disclosure in the pipeline.** The analyzing screen reveals process step by step. Users see what is happening and why the wait exists — not a spinner, but a named sequence. Transparency about AI process builds trust in AI output.
8. **Japanese editorial typography as respect.** Shippori Mincho for display headings is not a styling choice — it signals that the questions users bring to SocraChat are taken seriously, rendered with the same typographic care as quality publishing.

## 13. Personas

*Fictional archetypes based on the product's Japanese market positioning.*

**Kenji Yamamoto, 38, Tokyo.** Senior manager at a manufacturing company. Uses SocraChat for decisions his manager cannot advise on — whether to accept a transfer, how to handle a difficult team conflict, whether to invest his bonus in NISA or real estate. Trusts the tool because it shows him where the AIs disagree, which is exactly where he knew the decision was difficult. Would not trust a single-AI recommendation for decisions this important.

**Eri Nakamura, 31, Osaka.** Freelance designer. Uses SocraChat for business decisions she lacks domain expertise for: contract negotiation, pricing strategy, tax planning. Values that the comparison board shows the financial AI perspective alongside the legal perspective — she can see the trade-offs, not just the conclusion. Notices immediately when one AI is an outlier and asks deeper follow-up questions about that one.

**Hiroshi Tanaka, 52, Nagoya.** Small business owner in traditional manufacturing. New to AI tools. Chose SocraChat over a single-AI chatbot because "showing five answers feels more honest than showing one." Uses mostly Japanese; the Shippori Mincho headings and Noto Sans JP UI feel like software built for him rather than translated for him.

**Saki Inoue, 24, Tokyo.** Graduate student in economics. Uses SocraChat for investment research — not to get a buy/sell recommendation, but to understand what each AI model's reasoning is before forming her own view. Reads every source chip on the comparison board. Frustrated by AI tools that just give answers; prefers tools that show their reasoning.

## 14. States

| State | Treatment |
|-------|-----------|
| **Empty (new question)** | Composer with placeholder text in `--fg-subtle`. Example question chips below. No illustration, no tutorial. The canvas is the invitation. |
| **Analyzing (in progress)** | Pipeline screen: completed steps show `--accent` circle + ✓. Running step shows spinning `--accent-soft` ring. Pending steps show `--bg-sunken` circle. `aria-live="polite"` on progress text. |
| **Comparison board (loaded)** | Header card with question, tabs for view switching, main feed of opinion cards, sidebar with personas and sources. AI avatar stack in header shows participating models. |
| **Loading (opinion card)** | Skeleton with `--bg-sunken` fill at exact card dimensions. No shimmer — the warm cream background prevents the cold blue shimmer pattern. |
| **Error (model failed)** | Specific inline label on the failed opinion card: model name + failure reason. Other cards remain visible. The comparison continues with remaining models. |
| **Success (question submitted)** | Transition directly to analyzing screen. No toast, no confirmation dialog. The pipeline is the confirmation. |
| **Partial confidence warning** | `--warn-soft` background chip, `--warn-fg` text, `--warn` dot. Appears on opinion cards where the model flagged low confidence. |
| **Cancel (mid-analysis)** | "中断" button with stop icon. Immediate. No confirmation dialog — the user's intent is clear. |
| **Deep chat (follow-up)** | Returns to single-AI chat mode after comparison. Topbar shows model avatar + name. Conversation continues from context. |
| **Source (full text)** | Single-column reading view with model attribution strip. Font size increases to `17px`, line-height `175%` for comfortable reading. |
| **Disabled (send button)** | `background: --line-strong`, `color: --fg-subtle`, `cursor: not-allowed`. No tooltip — the disabled state is self-evident from empty composer. |

## 15. Motion & Easing

### Duration Scale

| Token | Value | Use |
|-------|-------|-----|
| `--dur-fast` | 120ms | Hover states, focus rings, instant feedback |
| `--dur-base` | 200ms | Standard transitions (background, color, border) |
| `--dur-mid` | 240ms | Slightly longer transitions (shadow, layout shift) |
| `--dur-bubble` | 280ms | Chat bubble entrance — slightly slower for content readability |
| `--dur-slow` | 320ms | Panel reveals, drawer openings |
| `--dur-enter` | 600ms | Page entrance animations (used sparingly on landing) |

### Easing Functions

| Token | Curve | Use |
|-------|-------|-----|
| `--ease-out` | `cubic-bezier(.2, .8, .2, 1)` | Most transitions — fast start, soft landing |
| `--ease-soft` | `cubic-bezier(.4, 0, .2, 1)` | Bidirectional transitions, accordion |

### Signature Motions

1. **Chat bubble entrance.** `opacity: 0, translateY(8px), scale(0.97)` → resting over `--dur-bubble` (280ms) `--ease-out`. Slightly slower than other transitions — the content is being read, the animation should not rush the eye.
2. **Pipeline step transition.** Running step's spinning border: `border-top-color: transparent`, rotates 360° at 800ms linear. Deliberately slow to communicate actual work in progress, not UI decoration.
3. **Composer focus.** `border-color` + `box-shadow` transition at `--dur-base` (200ms). The focus state is the most important transition in the product — it signals readiness to receive the user's question.
4. **Opinion card hover.** `box-shadow` and `border-color` transition at `--dur-base`. Cards lift slightly on hover — `--shadow-md` — then return. The hover lift reinforces that cards are selectable objects, not static displays.
5. **Pulse animation (AI avatars, analyzing).** `scale(1) → scale(1.15) → scale(1)` at 1200ms `ease-in-out infinite`, with `animation-delay` staggered 150ms per model. The stagger creates a wave effect across the avatar stack, communicating that multiple processes are running simultaneously.

**No spring, no bounce.** SocraChat's motion system uses time-curve easing exclusively. The product handles serious decisions; motion that bounces or overshoots would register as frivolous. Every animation completes cleanly and settles precisely.

**Reduce motion:** Under `prefers-reduced-motion: reduce`, all duration tokens collapse toward 0ms or instant. The pipeline spinner is the only animation that persists at reduced speed rather than stopping, as it communicates ongoing process rather than decoration.

---

**Token reference:** `colors_and_type.css` — primary source of truth for all CSS custom properties.
**Component reference:** `storybook.html` — interactive component documentation.
**Verified:** 2026-05-22 against live implementation across 7 screens.
