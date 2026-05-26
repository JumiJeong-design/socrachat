---
id: ref-editorial
name: Editorial Bold (레퍼런스 테스트)
category: reference
verified: "2026-05-26"
---

# Reference Test — Editorial Bold Style

이미지 레퍼런스 기반 스타일 분석. DESIGN-SC.md와 별개로 운영.

## 핵심 무드

Bold editorial mobile — 헤드라인이 화면을 주도하고, 컬러는 한 가지만 강하게 쓴다.
잡지 레이아웃 + 앱 기능성의 교차점. 유치하지 않고 대담하게.

## 팔레트

- 배경: `#F2F2F2` — 따뜻하지 않은 쿨 라이트 그레이
- 서피스: `#FFFFFF` — 카드 배경
- 텍스트: `#0A0A0A` — 거의 블랙
- 텍스트 서브: `#6B6B6B` — 미드 그레이
- 액센트: `#E8471A` — 오렌지-레드 (단 하나의 컬러)
- 다크 서피스: `#1A1A1A` — 블랙 버튼/배지

## 타이포그래피

- 폰트: `"Helvetica Neue", Arial, sans-serif` — 시스템 그로테스크
- 디스플레이: `72–96px`, weight `700–900`, line-height `0.95–1.05`, letter-spacing `-0.03em`
- 섹션 타이틀: `40–52px`, weight `700`, line-height `1.0`
- 카드 타이틀: `22–28px`, weight `700`
- 바디/레이블: `14–16px`, weight `400–500`
- 메타/캡션: `11–12px`, weight `500`, letter-spacing `0.05em`, uppercase

## 컴포넌트 규칙

### 버튼
- Primary: background `#0A0A0A`, text `#FFFFFF`, height `48px`, radius `999px`, padding `0 24px`, font-size `15px` weight `600`
- Chip/Tag: background `#0A0A0A`, text `#FFFFFF` (active) / background `#FFFFFF`, border `1.5px solid #0A0A0A`, text `#0A0A0A` (inactive), radius `999px`, height `38px`

### 카드
- radius `20px`
- 이미지 카드: full-bleed 이미지, 텍스트 오버레이 or 하단 캡션
- 텍스트 카드: background `#FFFFFF`, padding `20px`
- 액센트 카드: background `#E8471A`, text `#FFFFFF`

### 레이아웃
- 비대칭 그리드 — 카드 크기가 다 달라야 함 (같은 크기 카드 반복 금지)
- 헤드라인은 항상 크게 — 화면 너비의 70% 이상 차지
- 여백은 넉넉하게 — padding `20–24px`
- Bottom nav: pill-shaped 탭바, active는 블랙 필

## Do / Don't

### Do
- 헤드라인을 압도적으로 크게
- 액센트 컬러는 한 화면에 한 요소에만
- 카드 크기 변주로 리듬감
- 블랙/화이트 대비를 극대화

### Don't
- 여러 컬러 사용 금지 — 오렌지 하나면 충분
- 같은 크기 카드 반복 금지
- 그라디언트 금지
- 과한 그림자 금지 — subtle 하게
- 파스텔, 글로시 효과 금지
