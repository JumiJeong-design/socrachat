# SocraChat Design System

멀티 AI 비교 제품. 따뜻하고 기능적인 모바일 퍼스트 인터페이스.
어떤 AI 도구를 쓰든 이 문서의 규칙을 따른다.

---

## AI Agent Rules (MANDATORY)

### Role
나는 SocraChat 디자인 시스템 기반의 UI 구현 에이전트다. 창의성보다 일관성을 우선하며, 정의된 규칙 밖의 UI나 스타일을 임의로 생성하지 않는다.

### 절대 금지
- 하드코딩 금지 — 모든 색상·크기·간격은 반드시 CSS 토큰(`var(--*)`) 사용
- 레이아웃 발명 금지 — 존재하지 않는 패턴을 임의로 만들지 않는다
- 디자인 스타일 규칙 위반 금지 — 이 문서의 모든 규칙을 따른다

### 컴포넌트 사용 원칙 (MANDATORY)
1. `storybook.html`에 있는 컴포넌트를 **최우선**으로 사용한다
2. 필요한 컴포넌트가 storybook에 없으면 → **없다고 명시하고 작업을 멈춘다**
3. 그 이후 프로세스는 사용자가 결정한다:
   - 사용자가 의도와 옵션을 논의
   - 합의 후 storybook에 먼저 추가
   - storybook 추가 완료 후 화면에 반영

### 애매할 때 행동 원칙
- 추측해서 진행하지 않는다
- 의도를 파악하기 위한 질문을 **차례대로** 던진다 (한꺼번에 쏟아내지 않고 단계적으로)
- 여러 접근 방식이 있을 경우 옵션 리스트로 제시하고 사용자가 고르게 한다

### 일관성 기준
- **UX**: 비교 UX를 핵심 원칙으로 한다 — 여러 AI의 답변을 병렬 비교하는 것이 이 제품의 존재 이유
- **GUI**: 세부 규칙은 사용자와 논의하며 정한다. 규칙이 확정되면 이 섹션에 추가한다

---

## Design Tokens

파일: `colors_and_type.css`
3계층 구조 — 절대 Primitive를 컴포넌트에서 직접 참조하지 않는다.

```
Layer 1 · Primitive   --cream-50, --forest-500 등 (raw 팔레트)
Layer 2 · Semantic    --bg, --fg, --accent 등 (모드 인식 alias)
Layer 3 · Component   --btn-*, --r-md 등 (컴포넌트 전용)
```

Primary: `--accent: #2D5F4F` (Forest green) on `--bg: #FBF9F4` (Warm cream)
Dark mode: `[data-theme="dark"]` on `<html>`
i18n: `data-lang="ja|ko|en"` on `<html>`

---

## 1. Visual Theme & Atmosphere

SocraChat의 인터페이스는 단 하나의 은유로 설계되었다: 여러 관점을 제시하되 결론을 강요하지 않는 신뢰할 수 있는 어드바이저. 디자인 시스템은 이를 따뜻한 절제로 번역한다 — 질 좋은 종이처럼 느껴지는 서피스, 에디토리얼 산문처럼 읽히는 타이포그래피, 스타트업 에너지가 아닌 성숙한 권위를 시사하는 프라이머리 컬러.

페이지 캔버스는 순백이 아닌 따뜻한 크림(`#FBF9F4`) — 긴 숙고 세션에서 읽기 경험을 부드럽게 해주는 약간의 옐로우 언더톤을 담고 있다. 텍스트는 순수한 검정이 아닌 따뜻한 그라파이트(`#29251F` 95% density) — 소프트웨어 인터페이스보다 인쇄된 책에 가까운 읽기 레지스터를 만든다. 포레스트 그린 액센트(`#2D5F4F`)는 성장·신뢰·사려 깊은 판단의 연상으로 선택되었으며, 인터랙티브 요소와 액티브 상태에만 배타적으로 등장하고 장식적으로는 절대 쓰이지 않는다.

SocraChat의 시각적 정체성을 정의하는 것은 AI 아이덴티티 컬러 시스템이다: 비교 보드에서 AI 모델 의견을 구분하는 데만 쓰이는 여섯 가지 고유 색상(블루, 바이올렛, 앰버, 틸, 로즈, 슬레이트). 이 색상들은 그 외 모든 것이 따뜻한 뉴트럴 팔레트로 이루어진 인터페이스 안에서 유일한 크로매틱 다양성이다. 탁한 크림 배경과 선명한 오피니언 마커의 대비는 사용자가 직관적으로 학습하는 시각화 언어를 만든다 — 여기서 색상은 "어떤 AI가 이것을 말했는가"를 뜻하며, 그 외에는 아무 의미도 없다.

**Key Characteristics:**
- 따뜻한 크림 캔버스 (`#FBF9F4`) — 무균 백색이 아닌 고품질 종이
- 포레스트 그린 (`#2D5F4F`) 단일 인터랙티브 액센트 — 에너지가 아닌 권위
- 오피니언 그룹핑 전용 6가지 AI 아이덴티티 색상 — 색상 = 출처, 장식 아님
- 3폰트 시스템: 시포리 민초 (디스플레이) · Inter/Noto (UI) · JetBrains Mono (데이터)
- `font-feature-settings: 'palt' 1` — 일본어 비례 대체 간격
- 브라운-앰버 틴트 따뜻한 그림자 (`rgba(45, 35, 20, ...)`) — 스크린이 아닌 위에서 내리는 빛
- 8px 기본 간격 단위와 깔끔한 배수

---

## 2. Color Palette & Roles

### Layer 1 — Primitive

**Cream (surfaces)**
- `--cream-50:  #FBF9F4` — 페이지 배경, 따뜻한 캔버스
- `--cream-100: #F5F1EA` — 선큰 서피스, 폼 인풋
- `--cream-200: #ECE5D9` — 디바이더, 구조적 구분선
- `--cream-300: #DED5C5` — 강한 보더

**Forest (primary — "신뢰할 수 있는 어드바이저")**
- `--forest-50:  #E8EFEA` — 액센트 소프트, 액티브 내비 배경
- `--forest-100: #C8D6CC` — 호버 틴트
- `--forest-300: #6E8B7A` — 뮤트 액센트, 서브듀드 상태
- `--forest-500: #2D5F4F` — 프라이머리 액센트 — CTA, 액티브 상태, 링크
- `--forest-600: #234A3F` — 프라이머리 호버 상태
- `--forest-700: #1A372E` — 프레스드/액티브 딥 상태

**Clay (secondary warmth — 드물게 사용)**
- `--clay-100: #F4E3D5` — 알림용 따뜻한 소프트 배경
- `--clay-300: #D89E7E` — 따뜻한 미드톤
- `--clay-500: #B5613F` — 디스트럭티브 / 워닝 액션

**Stone (warm graphite text scale)**
- `--stone-50:  #6E665C` — 서틀 텍스트, 비활성
- `--stone-100: #524A41` — 뮤트 텍스트, 보조 레이블
- `--stone-200: #3B3530` — 본문 텍스트
- `--stone-300: #29251F` — 기본 텍스트 (`--fg`)
- `--stone-400: #18150F` — 강한 텍스트, 헤딩 (`--fg-strong`)
- `--stone-500: #0E0C09` — 최대 대비, 드물게 필요

**AI Identity Hues (비교 보드 전용)**
- `--ai-claude:  #7B5EA0` — Claude / Anthropic 의견
- `--ai-gpt:    #4A6FA5` — GPT / OpenAI 의견
- `--ai-gemini: #C68635` — Gemini 의견
- `--ai-perp:   #3D8077` — Perplexity 의견
- `--ai-grok:   #B05C6D` — Grok 의견
- `--ai-deep:   #5E6B7D` — DeepSeek 의견

### Layer 2 — Semantic (Light Mode)

| 토큰 | 값 | 역할 |
|-------|-------|------|
| `--bg` | `#FBF9F4` | 페이지 배경 |
| `--bg-sunken` | `#F5F1EA` | 인풋, 선큰 서피스 |
| `--bg-tint` | `#E8EFEA` | 포레스트 틴트 영역 배경 |
| `--surface` | `#FFFFFF` | 카드, 다이얼로그, 컴포저 |
| `--surface-hover` | `#F5F1EA` | 인터랙티브 서피스 호버 |
| `--fg` | `#29251F` | 기본 본문 텍스트 |
| `--fg-strong` | `#18150F` | 헤딩, 강조 텍스트 |
| `--fg-muted` | `#524A41` | 보조 레이블, 설명 |
| `--fg-subtle` | `#8A8175` | 플레이스홀더, 타임스탬프, 캡션 |
| `--fg-on-accent` | `#FFFFFF` | 포레스트 그린 서피스 위 텍스트 |
| `--accent` | `#2D5F4F` | 프라이머리 CTA, 액티브 상태, 링크 |
| `--accent-hover` | `#234A3F` | 프라이머리 호버 |
| `--accent-soft` | `#E8EFEA` | 소프트 액센트 배경 |
| `--accent-fg` | `#FFFFFF` | 액센트 위 텍스트 |
| `--warm-accent` | `#B5613F` | 디스트럭티브 / 워닝 보조 |
| `--warm-soft` | `#F4E3D5` | 소프트 워닝 배경 |
| `--line` | `#E8DECE` | 표준 디바이더 |
| `--line-strong` | `#D2C5AE` | 강조 보더 |

### Status Colors

| 토큰 | 값 | 용도 |
|-------|-------|-----|
| `--success` | `#4F7A4C` | 긍정, 확인 |
| `--warn` | `#C9893A` | 주의, 부분 신뢰도 |
| `--error` | `#B8504C` | 오류, 실패 |
| `--warn-soft` | `rgba(201,137,58,.10)` | 워닝 서피스 |
| `--warn-fg` | `#8A5C20` | 워닝 텍스트 |
| `--warn-border` | `rgba(201,137,58,.25)` | 워닝 보더 |
| `--error-soft` | `rgba(184,80,76,.10)` | 에러 서피스 |
| `--error-fg` | `#B8504C` | 에러 텍스트 |
| `--error-border` | `rgba(184,80,76,.25)` | 에러 보더 |

### Dark Mode

다크 모드는 따뜻한 크림 캔버스를 니어-블랙 따뜻한 다크(`#14130F`)로 반전한다 — 차가운 차콜이 아닌 라이트 크림과 동일한 옐로우 언더톤을 가진 브라운-블랙. 포레스트 그린 액센트는 채도 낮은 세이지(`#7AAA94`)로 이동 — 다크 서피스에서 가혹하게 보이지 않도록 더 밝고 채도가 낮아진다.

| 토큰 | 다크 값 |
|-------|-----------|
| `--bg` | `#14130F` |
| `--surface` | `#1E1C17` |
| `--fg` | `#F0EBDE` |
| `--fg-strong` | `#FFFEFA` |
| `--accent` | `#7AAA94` |
| `--ai-claude` | `#A088C5` |
| `--ai-gpt` | `#6E94CC` |
| `--ai-gemini` | `#E4AE5F` |
| `--ai-perp` | `#5FA39A` |
| `--ai-grok` | `#D17F8C` |
| `--ai-deep` | `#8A98AA` |

---

## 3. Typography Rules

### Font Families

| 토큰 | 스택 | 용도 |
|-------|-------|-----|
| `--font-display` | Shippori Mincho → Noto Serif JP → serif | 히어로 헤딩, 질문 디스플레이 |
| `--font-ui` | Inter → Noto Sans JP → system-ui | UI 크롬 전체, 내비, 버튼 |
| `--font-jp` | Noto Sans JP → Hiragino Sans → system-ui | 일본어 로케일 본문 |
| `--font-ko` | Noto Sans KR → system-ui | 한국어 로케일 본문 |
| `--font-mono` | JetBrains Mono → Menlo → monospace | 숫자, 타임스탬프, 신뢰도 점수 |

**언어 전환:** `html[data-lang="ja"]` → `--font-jp`, `html[data-lang="ko"]` → `--font-ko`, 영어 → `--font-ui`.
**OpenType:** `font-feature-settings: 'palt' 1` 전역 적용 — 모든 로케일에서 CJK 문자 간격 보정.

### Type Scale

| 토큰 | 크기 | 굵기 | 행간 | 용도 |
|-------|------|--------|-------------|-----|
| `--text-xs` | 12px | 600–700 | — | 배지, 모노 레이블 |
| `--text-sm` | 14px | 400–500 | 1.4 | 캡션, 소형 내비 |
| `--text-base` | 16px | 400 | 1.65 | 본문 |
| `--text-md` | 17px | 400–500 | 1.65 | 강조 본문 |
| `--text-lg` | 18px | 500–600 | 1.4 | 서브헤딩, 카드 타이틀 |
| `--text-xl` | 22px | 600 | 1.25 | h4 |
| `--text-2xl` | 28px | 600 | 1.25 | h3 |
| `--text-3xl` | 36px | 600 | 1.25 | h2 |
| `--text-4xl` | 48px | 600 | 1.25 | h1 |
| `--text-5xl` | 64px | 600 | — | 랜딩 히어로 전용 |

모든 헤딩: `font-family: --font-ui`, `font-weight: 600`, `line-height: 1.25`, `letter-spacing: -0.01em`, `color: --fg-strong`.
디스플레이 헤딩(랜딩 히어로, 질문 카드): `font-family: --font-display` (Shippori Mincho).

### Principles
- **Shippori Mincho는 디스플레이 전용:** 히어로 헤딩과 질문 디스플레이에만 등장 — UI 크롬에는 절대 사용하지 않는다
- **JetBrains Mono는 데이터 전용:** 신뢰도 퍼센트, 모델 수, 타임스탬프 — 전부 모노스페이스
- **굵기 절제:** 400(본문)~700(배지 전용). 헤딩은 600. 700은 `--font-mono` 숫자 레이블 전용

---

## 4. Component Stylings

### Buttons

**Primary (전송 / Ask)**
- Background: `--accent` (`#2D5F4F`) · Text: `--accent-fg` (`#FFFFFF`)
- Padding: `0 18px`, height `36px` · Radius: `--r-full` (`999px`)
- Hover: `--accent-hover` · Disabled: `--line-strong` bg, `--fg-subtle` text
- Font: 14.5px, weight 600

**Ghost / Icon Button**
- Background: transparent · Color: `--fg-muted`
- Size: 34–36px square · Radius: `--r-sm` (8px) or `--r-md` (12px)
- Hover: `--surface-hover` bg, `--fg-strong` text

**Destructive**
- Background: `--warm-accent` (`#B5613F`) · Text: `--fg-on-accent`

### Composer Input

- Background: `--surface` · Border: `1px solid --line-strong` · Radius: `22px`
- Shadow: `--shadow-lg` · Padding: `14px 14px 12px 20px`
- Focus: border → `--accent`, gain `--shadow-focus` ring
- Textarea: `17px`, line-height `170%`, min-height `70px`, background transparent

### Opinion / Comparison Cards

- Left accent strip: 4px width, `background: --ai-[model]`
- Card body: `padding: 16px 18px` · Border: `1px solid --line` · Radius: `14px`
- Hover: `--shadow-md`, border → `--line-strong`
- Opinion text: `13.5px`, `--fg`, line-height `165%`

### AI Avatar Stack

- Size variants: 18px (xs) / 22px (sm) / 32px (md) / 44px (lg) / 56px (xl)
- Background: `--ai-[model]` via `--model-color` CSS custom property
- Stack overlap: `-9px` left margin, `2px solid --bg` border separator
- Pulse animation (analyzing): `scale(1) → scale(1.15) → scale(1)` at 1200ms

### Tabs (Comparison Board)

- Default: `--fg-muted`, no background
- Active: `color: --accent`, `border-bottom: 2px solid --accent`, `font-weight: 600`
- Counter badge: `background: --accent-soft`, `color: --accent`
- Tab bar: `border-bottom: 1px solid --line`

### Chat Bubbles

- User: `background: --bubble-user-bg`, `color: --bubble-user-fg`, `border-bottom-right-radius: 6px`
- AI: `background: --bubble-ai-bg`, `border: 1px solid --bubble-ai-border`, `border-bottom-left-radius: 6px`
- Animation: `opacity: 0, translateY(8px), scale(0.97)` → resting at `--dur-bubble` (280ms)

### Progress / Pipeline (Analyzing Screen)

- Step marker: `24px` circle, default `--bg-sunken`
- Done: `background: --accent`, checkmark `✓`
- Running: `background: --accent-soft`, spinning border 800ms linear
- Pipeline row: `border-bottom: 1px dashed --line`, `padding: 14px 4px`

---

## 5. Layout Principles

### Spacing System

Base unit: 8px.

| 토큰 | 값 | 주요 용도 |
|-------|-------|-----------|
| `--s-1` | 4px | 아이콘 갭, 마이크로 간격 |
| `--s-2` | 8px | 버튼 갭, 리스트 패딩 |
| `--s-3` | 12px | 카드 내부 갭 |
| `--s-4` | 16px | 섹션 내부 패딩 |
| `--s-5` | 24px | 카드 패딩 |
| `--s-6` | 32px | 섹션 갭 |
| `--s-7` | 48px | 메이저 섹션 간격 |
| `--s-8` | 64px | 히어로 패딩 |
| `--s-9` | 96px | 최상위 섹션 리듬 |

### Grid & Container

- `--max-content: 720px` — 싱글 컬럼 콘텐츠 (home, analyzing, source)
- `--max-board: 1200px` — 2컬럼 비교 보드
- `--max-page: 1280px` — 전체 페이지 최대
- 비교 보드: `grid-template-columns: 1fr 340px` (메인 + 사이드바)

### Border Radius Scale

| 토큰 | 값 | 용도 |
|-------|-------|-----|
| `--r-xs` | 4px | 소형 배지, 마이크로 요소 |
| `--r-sm` | 8px | 아이콘 버튼, 포커스 링 |
| `--r-md` | 12px | 카드, 패널 |
| `--r-lg` | 16px | 대형 카드 |
| `--r-xl` | 20px | 채팅 버블 |
| `--r-2xl` | 28px | 피처 히어로 카드 |
| `--r-full` | 999px | 필, 전송 버튼, 내비 |

### Screen Structure

모든 화면: `header (topbar) → main (flex: 1) → optional footer`.
Topbar는 콘텐츠 밀도 높은 화면에서 `sticky top: 0`, 단일 포커스 화면(home, analyzing)에서는 static.

---

## 6. Depth & Elevation

| 레벨 | 토큰 | 값 | 용도 |
|-------|-------|-------|-----|
| Ground | — | No shadow | 바디 배경, 섹션 필 |
| Flat | `--shadow-sm` | `0 1px 2px rgba(45,35,20,.05)` | 서틀 분리, 보더 |
| Raised | `--shadow-md` | `0 2px 12px rgba(45,35,20,.06)` | 카드 호버 |
| Float | `--shadow-lg` | `0 8px 32px rgba(45,35,20,.08)` | 컴포저, 액티브 패널 |
| Overlay | `--shadow-xl` | `0 24px 60px -16px rgba(45,35,20,.18)` | 모달, 드롭다운 |
| Focus | `--shadow-focus` | `0 0 0 3px rgba(45,95,79,.18)` | 키보드 포커스 링 |

**Shadow philosophy:** 모든 그림자는 `rgba(45, 35, 20, ...)` — 뉴트럴 그레이가 아닌 따뜻한 브라운-앰버. 불투명도는 낮게 유지 (최대 0.18 오버레이). 컴포저의 `--shadow-lg`가 제품에서 가장 눈에 띄는 그림자이며, 정지 상태의 대부분 UI 요소는 그림자가 없다.

---

## 7. Do's and Don'ts

### Do
- `--fg-strong` / `--fg` / `--fg-muted` / `--fg-subtle` 4계층 텍스트 위계 사용 — raw hex 값 절대 금지
- 포레스트 그린(`--accent`)은 인터랙티브 요소 전용 — CTA, 액티브 상태, 링크, 포커스 링
- `--ai-[claude|gpt|gemini|perp|grok|deep]`는 비교 보드 모델 아이덴티티 전용
- `--font-display` (Shippori Mincho)는 디스플레이 사이즈 헤딩과 질문 카드에만
- `--font-mono` (JetBrains Mono)는 모든 숫자 데이터, 타임스탬프, 신뢰도 레이블에
- 모든 그림자에 `rgba(45, 35, 20, ...)` 브라운-앰버 틴트 — 차가운 그레이 그림자 금지
- 전송 버튼, 내비 아이템, 카테고리 태그, AI 모델 칩에 pill radius(`--r-full`) 사용

### Don't
- 컴포넌트 스타일에 raw hex 색상 사용 금지 — Layer 2 시맨틱 토큰(`--accent`, `--surface` 등) 사용
- AI 아이덴티티 색상(`--ai-claude` 등)을 오피니언/비교 컨텍스트 밖에서 사용 금지
- Shippori Mincho를 본문, 내비, UI 크롬에 적용 금지 — 디스플레이 전용 폰트
- 따뜻한 그레이와 차가운 그레이를 혼용 금지 — 전체 팔레트에 옐로우-브라운 언더톤 유지
- UI 폰트 스택에 `font-weight: 700` 이상 사용 금지 — 최대 600 (700은 `--font-mono` 배지 레이블 전용)
- `--warm-accent` (clay)를 프라이머리 액션에 사용 금지 — 디스트럭티브/주의 상태 전용
- 일반 UI 요소에 `--shadow-xl` 이상 사용 금지 — 오버레이 전용

---

## 8. Responsive Behavior

### Breakpoints

| 이름 | 폭 | 주요 변화 |
|------|-------|------------|
| Mobile | < 540px | 싱글 컬럼, 내비 링크 숨김, 컴포저 액션 축소 |
| Tablet | 540–768px | 넓은 컴포저, 탑바 내비 표시 |
| Desktop | 768–1080px | 풀 2컬럼 보드 레이아웃 |
| Wide | > 1080px | 맥스-width 컨테이너 센터 정렬 |

### Collapsing Strategy

- **탑바 내비:** 540px 미만 숨김(`display: none`), 바텀 내비 또는 햄버거로 대체
- **컴포저 바:** 540px 미만 아이콘 버튼 2·3번 숨김, 전송 아이콘 전용으로 축소 (36×36 원)
- **AI 모델 선택기:** 모바일에서 `max-width: 140px`으로 오버플로우 방지
- **비교 보드:** 768px 미만 사이드바가 풀-width 스택으로 드롭
- **히어로 헤딩:** `clamp(32px, 4.5vw, 52px)` — 모바일 최소~데스크탑 최대 사이 스케일

### Touch Targets

- 프라이머리 버튼: 최소 `36px` 높이
- 아이콘 버튼: `34–36px` 사각형 최소
- 내비 링크: 패딩으로 `40px` 높이
- 채팅 버블: 최소값 없음 — 패시브 콘텐츠

---

## 9. Agent Prompt Guide

### Quick Color Reference

| 요소 | 토큰 | 값 |
|---------|-------|-------|
| 페이지 배경 | `--bg` | `#FBF9F4` |
| 카드 | `--surface` | `#FFFFFF` |
| 본문 텍스트 | `--fg` | `#29251F` |
| 헤딩 | `--fg-strong` | `#18150F` |
| 보조 텍스트 | `--fg-muted` | `#524A41` |
| 캡션 | `--fg-subtle` | `#8A8175` |
| 프라이머리 CTA | `--accent` | `#2D5F4F` |
| 디스트럭티브 | `--warm-accent` | `#B5613F` |
| 디바이더 | `--line` | `#E8DECE` |
| 포커스 링 | `--shadow-focus` | `0 0 0 3px rgba(45,95,79,.18)` |

### Example Component Prompts

- "질문 카드: 따뜻한 크림 `#FBF9F4` 배경, `1px solid #E8DECE` 보더, `16px` 라디우스. 시포리 민초 weight 500 `28px` 디스플레이 헤딩, color `#18150F`. JetBrains Mono `10px` weight 600 uppercase `#8A8175` 서브 레이블."
- "전송 버튼: `background: #2D5F4F`, `color: #FFFFFF`, `height: 36px`, `padding: 0 18px`, `border-radius: 999px`, `font-weight: 600`, `font-size: 14.5px`. Hover: `#234A3F`. Disabled: `background: #D2C5AE`, `color: #8A8175`."
- "Claude AI 오피니언 카드. Left strip: `4px`, `background: #7B5EA0`. 카드 바디: `padding: 16px 18px`, `border: 1px solid #E8DECE`, `border-radius: 14px`. AI 아바타: `32px` 원, `background: #7B5EA0`. 오피니언 텍스트: `13.5px Inter`, `color: #29251F`, `line-height: 165%`."
- "신뢰도 배지: JetBrains Mono, `12px`, weight 700. Background: `#E8EFEA`. Color: `#2D5F4F`. Padding: `2px 8px`. Radius: `6px`."

### Iteration Guide

1. 따뜻한 크림 캔버스 항상 — `#FBF9F4`, 페이지 배경에 순백 금지
2. 포레스트 그린은 인터랙션 전용 — `#2D5F4F` 버튼, 액티브 상태, 링크, 포커스
3. 3폰트 규칙: 시포리 민초(디스플레이 헤딩) · Inter/Noto(나머지) · JetBrains Mono(숫자와 레이블)
4. AI 색상은 모델 아이덴티티를 인코딩 — `--ai-claude`는 "Claude의 의견", 프리미엄이나 경고가 아님
5. 따뜻한 그림자: `rgba(45, 35, 20, ...)` — 항상 따뜻하게, 절대 `rgba(0, 0, 0, ...)`이면 안 됨
6. 일본어가 렌더링될 수 있는 모든 서피스에 `font-feature-settings: 'palt' 1`
7. CTA와 칩에 pill radius — `999px`, 프라이머리 버튼에 `4px`이나 `8px` 사용 금지

---

## 10. Voice & Tone

SocraChat의 제품 카피는 두 가지 레지스터로 작동한다. UI 내에서는 정확하고 촉진적인 목소리 — 제품이 무엇을 하는지 설명하며 얼마나 인상적인지는 설명하지 않는다. "5つのAIに同時問い合わせ中"이 분석 스텝의 레이블이지, "AI의 파워를 활용 중"이 아니다. 제품은 절대 스스로를 자랑하지 않는다.

랜딩과 온보딩 카피는 AI 보조 의사결정의 특정한 불안을 다룬다: 하나의 모델을 신뢰하는 것이 위험이라는 것. 헤드라인 "AIの答えが割れるとき、判断の質が上がる"은 예상되는 프레임을 반전시킨다 — 모델 간의 불일치는 결함이 아닌 피처로 프레이밍된다.

| 컨텍스트 | 톤 |
|---------|------|
| Analyzing 스크린 레이블 | 정확하고 순차적. "질問のカテゴリを分析中" |
| 비교 보드 | 중립적, 큐레이션적. 관점을 제시하며 절대 추천하지 않음 |
| 에러 상태 | 구체적이고 비난 없음. 무엇이 실패했는지, 누가 실패했는지가 아님 |
| 온보딩 / 랜딩 | 프레임 설정. AI 신뢰의 불안을 다루며 제품 피처가 아님 |
| 빈 상태 | 초대적. 사용 패턴을 보여주며 세일즈 피치가 아님 |

**금지 표현:** "AI-powered", "harness", "unlock", "revolutionary", "next-generation", AI 능력에 관한 어떠한 최상급 표현도. SocraChat의 목소리는 사용자가 AI 아웃풋을 평가할 수 있다고 신뢰한다 — 그것을 전도하지 않는다.

---

## 11. Brand Narrative

SocraChat은 단 하나의 인사이트를 기반으로 일본 시장을 위해 설계된 멀티 AI 비교 제품이다: AI 조언의 가치는 가장 스마트한 모델을 신뢰하는 것에서 오는 게 아니라, 여러 모델이 어디에서 동의하고 어디에서 갈라지는지를 보는 것에서 온다. 이름은 소크라테스식 방법론을 참조한다 — 오라클로부터 답을 받는 것이 아니라, 구조화된 질문과 다중 관점을 통해 가정을 드러내는 철학적 기법.

제품은 두 가지 일본 문화적 레지스터의 교차점에 자리한다: 고위험 개인 결정(투자, 커리어, 가족)에서 숙고를 중시하는 깊이, 그리고 지식 근로자 사이의 AI 도구에 대한 성장하는 친숙함. 생산성 도구가 아니라 판단 도구다. 사용자는 작업을 더 빠르게 완료하기 위해 오는 것이 아니라, 더 자신감 있게 결정하기 위해 온다.

AI 아이덴티티 컬러 시스템(각 모델에 할당된 여섯 가지 고유 색상)은 제품의 가장 독창적인 시각적 발명이다. 일반적으로 보이지 않는 것 — 어떤 AI가 어떤 아웃풋을 생성했는지 — 을 탐색 가능한 공간적 언어로 변환한다. 사용자는 한 세션 안에서 파란색은 하나의 관점, 보라색은 다른 관점을 의미한다는 것을 학습한다. 비교 보드는 답의 목록이 아닌 의견의 지도가 된다.

---

## 12. Principles

1. **불일치를 가치로 보여준다.** 다섯 AI가 다섯 가지 다른 답을 줄 때, SocraChat은 불일치를 두드러지게 보여준다. 합의는 강조된다; 발산도 동등하게 강조된다. 제품은 불확실성을 숨기지 않는다.
2. **색상은 출처를 인코딩하며 품질을 인코딩하지 않는다.** AI 아이덴티티 색상은 엄격히 시맨틱하다: 어떤 모델이 의견을 생성했는지를 식별한다. 품질 판단을 전달하지 않는다.
3. **따뜻한 서피스는 결정 불안을 줄인다.** 크림 캔버스와 포레스트 그린 팔레트는 미학적 선호가 아니다; 고위험 결정에서 비인간적으로 느껴질 수 있는 AI 인터페이스의 임상적 느낌을 줄이도록 조율되어 있다.
4. **데이터는 타이포그래피적으로 구별된다.** 숫자 — 신뢰도 점수, 모델 수, 타이밍 — 는 JetBrains Mono로 등장하며 Inter/Noto의 에디토리얼 산문과 분리된다.
5. **3폰트 시스템은 3개의 레지스터다.** 시포리 민초 = 중요성(결정되는 질문). Inter/Noto = 프로세스(촉진하는 인터페이스). JetBrains Mono = 증거(정보를 주는 데이터).
6. **색상 폭의 절제.** 여섯 AI 아이덴티티 색상 밖에서 팔레트는 포레스트 그린 + 따뜻한 크림 + 따뜻한 그라파이트다. 추가 액센트 색상 없음.
7. **파이프라인에서 점진적 공개.** Analyzing 화면은 프로세스를 단계별로 드러낸다. 사용자는 무슨 일이 일어나고 있는지, 왜 기다림이 있는지를 본다.
8. **일본 에디토리얼 타이포그래피는 존중이다.** 디스플레이 헤딩에 시포리 민초는 스타일링 선택이 아니다 — SocraChat에 사용자가 가져오는 질문들이 진지하게 받아들여진다는 신호이며, 고품질 출판과 동일한 타이포그래피적 배려로 렌더링된다.

---

## 13. Personas

**야마모토 켄지 (山本健司), 38세, 도쿄.** 제조업체 시니어 매니저. 매니저가 조언할 수 없는 결정들에 SocraChat을 사용한다 — 발령을 수락할지, 어려운 팀 갈등을 어떻게 처리할지, 보너스를 NISA에 투자할지 부동산에 투자할지. AI들이 어디서 불일치하는지를 보여주기 때문에 도구를 신뢰한다 — 바로 그 지점이 결정이 어렵다는 것을 알고 있었던 곳이다.

**나카무라 에리 (中村恵理), 31세, 오사카.** 프리랜서 디자이너. 도메인 전문성이 부족한 비즈니스 결정들에 SocraChat을 사용한다: 계약 협상, 가격 전략, 세금 계획. 비교 보드가 재무 AI 관점과 법률 관점을 나란히 보여준다는 것을 높이 평가한다.

**다나카 히로시 (田中博), 52세, 나고야.** 전통 제조업의 소규모 사업주. AI 도구가 처음. 단일 AI 챗봇보다 SocraChat을 선택한 이유: "다섯 가지 답을 보여주는 게 하나를 보여주는 것보다 더 정직하게 느껴진다." 주로 일본어 사용; 시포리 민초 헤딩과 Noto Sans JP UI는 번역된 소프트웨어가 아니라 그를 위해 만들어진 소프트웨어처럼 느껴진다.

**이노우에 사키 (井上咲), 24세, 도쿄.** 경제학 대학원생. 투자 리서치에 SocraChat을 사용 — 매수/매도 추천이 아닌, 자신의 관점을 형성하기 전에 각 AI 모델의 추론이 무엇인지 이해하기 위해. 답만 주는 AI 도구에 좌절하며; 추론을 보여주는 도구를 선호한다.

---

## 14. States

| 상태 | 처리 |
|-------|-----------|
| **빈 상태 (새 질문)** | `--fg-subtle` 플레이스홀더가 있는 컴포저. 아래에 예시 질문 칩. 일러스트레이션 없음, 튜토리얼 없음. 캔버스가 초대다. |
| **Analyzing (진행 중)** | 파이프라인 화면: 완료된 스텝은 `--accent` 원 + ✓. 실행 중 스텝은 스피닝 `--accent-soft` 링. 대기 스텝은 `--bg-sunken` 원. |
| **비교 보드 (로드됨)** | 질문 헤더 카드, 뷰 전환 탭, 오피니언 카드 메인 피드, 페르소나·소스 사이드바. |
| **로딩 (오피니언 카드)** | `--bg-sunken` 필의 정확한 카드 크기 스켈레톤. 시머 없음 — 따뜻한 크림 배경이 차가운 파란 시머 패턴을 방지한다. |
| **에러 (모델 실패)** | 실패한 오피니언 카드에 특정 인라인 레이블: 모델명 + 실패 이유. 나머지 카드는 그대로 표시. |
| **성공 (질문 제출)** | Analyzing 화면으로 직접 전환. 토스트 없음, 확인 다이얼로그 없음. 파이프라인이 확인이다. |
| **부분 신뢰도 경고** | `--warn-soft` 배경 칩, `--warn-fg` 텍스트, `--warn` 도트. 모델이 낮은 신뢰도를 표시한 오피니언 카드에 등장. |
| **취소 (분석 중)** | "中断" 버튼 + 정지 아이콘. 즉각. 확인 다이얼로그 없음 — 사용자의 의도가 명확하다. |
| **딥 채팅 (후속 질문)** | 비교 후 단일 AI 채팅 모드로 복귀. 탑바에 모델 아바타 + 이름 표시. |
| **소스 (전체 텍스트)** | 모델 어트리뷰션 스트립이 있는 싱글 컬럼 읽기 뷰. 폰트 크기 `17px`, 행간 `175%`로 증가. |
| **비활성 (전송 버튼)** | `background: --line-strong`, `color: --fg-subtle`, `cursor: not-allowed`. 툴팁 없음 — 빈 컴포저에서 비활성 상태는 자명하다. |

---

## 15. Motion & Easing

### Duration Scale

| 토큰 | 값 | 용도 |
|-------|-------|-----|
| `--dur-fast` | 120ms | 호버 상태, 포커스 링, 즉각 피드백 |
| `--dur-base` | 200ms | 표준 트랜지션 (배경, 색상, 보더) |
| `--dur-mid` | 240ms | 약간 긴 트랜지션 (그림자, 레이아웃 시프트) |
| `--dur-bubble` | 280ms | 채팅 버블 진입 — 콘텐츠 가독성을 위해 약간 느리게 |
| `--dur-slow` | 320ms | 패널 공개, 드로어 열림 |
| `--dur-enter` | 600ms | 페이지 진입 애니메이션 (랜딩에서 드물게) |

### Easing Functions

| 토큰 | 커브 | 용도 |
|-------|-------|-----|
| `--ease-out` | `cubic-bezier(.2, .8, .2, 1)` | 대부분 트랜지션 — 빠른 시작, 부드러운 착지 |
| `--ease-soft` | `cubic-bezier(.4, 0, .2, 1)` | 양방향 트랜지션, 아코디언 |

### Signature Motions

1. **채팅 버블 진입.** `opacity: 0, translateY(8px), scale(0.97)` → 정지 상태로 `--dur-bubble` (280ms) `--ease-out`. 다른 트랜지션보다 약간 느림 — 콘텐츠가 읽히고 있으며 애니메이션이 눈을 서두르게 해서는 안 된다.
2. **파이프라인 스텝 트랜지션.** 실행 중 스텝의 스피닝 보더: 800ms linear. 의도적으로 느림 — UI 장식이 아닌 실제 진행 중인 작업을 전달한다.
3. **컴포저 포커스.** `border-color` + `box-shadow` 트랜지션 `--dur-base` (200ms). 포커스 상태는 제품에서 가장 중요한 트랜지션 — 사용자의 질문을 받을 준비가 되었음을 신호한다.
4. **오피니언 카드 호버.** `box-shadow`와 `border-color` 트랜지션 `--dur-base`. 카드는 호버에서 약간 들어올려진다 — `--shadow-md`. 호버 리프트는 카드가 정적 디스플레이가 아닌 선택 가능한 오브젝트임을 강화한다.
5. **펄스 애니메이션 (AI 아바타, 분석 중).** `scale(1) → scale(1.15) → scale(1)` at 1200ms `ease-in-out infinite`, 모델별 150ms 딜레이 스태거. 여러 프로세스가 동시에 실행 중임을 전달하는 웨이브 효과.

**스프링 없음, 바운스 없음.** SocraChat의 모션 시스템은 타임-커브 이징만 사용한다. 제품은 심각한 결정을 다루며; 튀거나 오버슈트하는 모션은 경박하게 느껴진다. 모든 애니메이션은 깔끔하게 완료되고 정확하게 안착한다.

**Reduce motion:** `prefers-reduced-motion: reduce` 하에서 모든 duration 토큰은 0ms 또는 즉각으로 축소된다. 파이프라인 스피너는 장식이 아닌 진행 중인 프로세스를 전달하므로 멈추지 않고 느린 속도로 지속되는 유일한 애니메이션이다.

---

## 3D Mascot Rule

- 조용한 검정 3D 고양이 어시스턴트는 감성적/지지적 순간에만 등장:
  온보딩, 빈 상태, 로딩, 완료, 에러, 도움말, 대기, 친근한 팁, 결과 요약.
- 사용 금지 맥락: 데이터 밀집 화면, 복잡한 폼, 설정, 결제/인증, 긴 리스트, 비교 테이블, CTA가 유일한 포커스여야 하는 곳.
- 화면당 마스코트 이미지 최대 1개. 메시지를 보조하는 역할이며, 인터페이스를 대체하지 않는다.
- Character: 검정 3D 고양이 · 소프트 클레이 소재 · 크림 헤드폰 + 크로스바디백 · 최소한의 표정 · 따뜻한 스튜디오 조명 · 리얼리즘 없음

---

**Token reference:** `colors_and_type.css` — 모든 CSS 커스텀 프로퍼티의 단일 진실 공급원.
**Component reference:** `storybook.html` — 인터랙티브 컴포넌트 문서.
**Verified:** 2026-05-22 (7개 화면 라이브 구현 기준)
