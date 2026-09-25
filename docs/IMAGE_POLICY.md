# DAGYM 이미지 제작 · 사용 원칙

이미지가 부족하다고 일반 스톡 이미지를 먼저 쓰지 않습니다.

## 1. 운영실적 (12개 단지) — 실제 자료만

- 해당 단지의 **공식 조감도 · 공식 투시도 · 실제 외관 사진** 중 하나만 사용합니다.
- AI(Higgsfield 등)로 만든 조감도, 스톡 이미지, 다른 단지 이미지는 사용하지 않습니다.
- 코드에서 강제: `data/projects.ts` 의 `imageSource`(`official-rendering` · `official-perspective` · `actual-exterior`)가 지정된 단지만 이미지가 표시됩니다. 확보하지 못한 단지는 Placeholder 카드를 유지합니다.
- 추가 방법: 원본을 `<slug>.jpg` 로 모아 `node scripts/import-portfolio-images.mjs <폴더>` → `imageSource` 지정.

## 2. 브랜드 비주얼 — 실제 사진 우선, 없으면 생성 이미지 허용

허용 영역: 홈 Hero · 회사소개 · 커뮤니티 운영 장면 · 현장 관리 · 운영회의 · 시설점검 · 운영 데이터 확인 · 직원 교육 · B2B 비주얼.

- 슬롯: `data/photos.ts` 의 `hero-wide`, `visual-*` (provenance `"generated"`). 파일을 넣으면 자동 반영됩니다.
  - `hero-wide` 가 있으면 홈 첫 화면이 와이드 Hero 로 바뀝니다.
- 금지: 정장 악수 · 일반 회의실 · 노트북만 보는 전형적 스톡 기업 이미지. 장면에서 DAGYM의 업(커뮤니티 운영)이 보여야 합니다.

## 3. 생성 이미지 표기

- 생성 이미지를 "실제 DAGYM 직원 · 실제 DAGYM 현장 · 실제 운영 단지"로 표기하지 않습니다 (캡션 · alt · 문구 모두).
- 실제 운영실적을 증명해야 하는 영역(운영실적 · 운영 개선 사례의 전후 사진)에는 실제 자료만 사용합니다.

## 4. 스타일

Photorealistic · Korean corporate environment · Premium community facility · Professional operation company ·
Neutral White · Deep Navy · Graphite · Cool Gray · Natural daylight · High-end architectural photography

금지: 과도한 AI 피부 · 비현실적인 손 · 과장된 웃음 · 서양인 중심 구성 · 웜 베이지 라이프스타일 광고 · 헬스장 광고 분위기 ·
부동산 분양광고 분위기 · 과도한 블루 SaaS 이미지 · 미래형 홀로그램 · 허공에 떠 있는 UI

프롬프트: `docs/HIGGSFIELD_PROMPTS.md`
