# DAGYM 이미지 제작 · 사용 원칙

이미지가 부족하다고 일반 스톡 이미지를 먼저 쓰지 않습니다.

## 1. 운영실적 (12개 단지) — 실제 자료만

- 해당 단지의 **공식 조감도 · 공식 투시도 · 실제 외관 사진** 중 하나만 사용합니다.
- AI(Higgsfield 등)로 만든 조감도, 스톡 이미지, 다른 단지 이미지는 사용하지 않습니다.
- 코드에서 강제: `data/projects.ts` 의 `imageSource`(`official-rendering` · `official-perspective` · `actual-exterior`)가 지정된 단지만 이미지가 표시됩니다. 확보하지 못한 단지는 Placeholder 카드를 유지합니다.
- 추가 방법: 원본을 `<slug>.jpg` 로 모아 `node scripts/import-portfolio-images.mjs <폴더>` → `imageSource` 지정.
- 현재: 12개 모두 적용 (시공사 · 공식 분양 사이트 · 공식 갤러리 · 시공사 제공 언론 조감도, 확대 · AI 보정 없음). 출처 기록은 비공개 문서에만.

## 2. 브랜드 비주얼 — 실제 사진 → 사람 없는 실사형 공간 → 프로세스/다이어그램 순

사용 영역: 홈 Hero · 회사소개 · 사업 상세 Hero · 커뮤니티 운영 설명 · 기업 · 호텔 소개 · 운영 컨설팅 · HILINK 주변 분위기.

- 기본은 **사람 없는 실사형 공간 이미지** (건축 · 인테리어 사진처럼). 공간이 주인공.
- 사람이 꼭 필요하면 1~2명, 작게, 얼굴 · 손 클로즈업 없이. CPR · 교육 · 팀 회의 · 다수 인원 장면은 생성하지 않음.
- AI 티가 강하면 재생성보다 사람 없는 이미지 또는 프로세스 · 다이어그램으로 대체.
- 캡션 · "연출 이미지" · "시설 예시" 문구를 붙이지 않음. 이미지가 설명을 대신함 (alt 만 유지).
- 생성 전 질문: "이 이미지는 실제 회사 홈페이지 신뢰도를 높이는가?" — 사람이 많거나, 얼굴 · 손이 크거나, 연출감이 강하면 만들지 않음.
- 생성 설정: gpt_image_2_5 · quality high · resolution 2k (저품질 기본값 사용 금지).

현재 적용 (모두 생성 이미지, 사람 없음, WebP):
- `public/images/hero/hero-access-lobby-v3-21x9.webp` — 홈 Hero (왼쪽 흰 벽 · 오른쪽 데스크–게이트–유리벽으로 막힌 출입선, 오른쪽 게이트 진입부 상단 폴 거치 단말 1대, 얼굴 높이 — 실제 설치 사진 기준)
- `public/images/hero/hero-community-space.webp` — split Hero 대안 (현재 미사용)
- `public/images/operation/operations-desk.webp` — 홈 운영 방식 (운영 데스크 · 태블릿 · 유리 너머 시설)
- `public/images/company/community-atrium.webp` — 회사소개 인트로 (복층 아트리움)
- `public/images/business/*.webp` — 사업 상세 5개 페이지 전용, 페이지마다 Hero 4:3 + 와이드 21:9, 서로 중복 없음
  - apartment / apartment-wide — 복합 커뮤니티 전경 / 골프 · GX · 스터디
  - sports / sports-wide — 피트니스 · GX · 골프 전경 / 피트니스 클럽
  - hotel / corporate-wide — 호텔 라운지 · 피트니스 · 수영장 / 사옥 복지층
  - consulting / consulting-wide — 점검용 태블릿이 놓인 공간 / 개선 전 다목적실 · 체크리스트
  - equipment / equipment-wide — 설치 중인 새 기구 / 신규 스크린골프 타석
- 제거: 현장 점검 인물 사진, CPR · 직원 교육 사진 (본사 운영체계는 프로세스만으로 설명)

## 3. 생성 이미지 표기

- 생성 이미지를 "실제 DAGYM 직원 · 실제 DAGYM 현장 · 실제 운영 단지"로 표기하지 않습니다 (캡션 · alt · 문구 모두).
- 실제 운영실적을 증명해야 하는 영역(운영실적 · 운영 개선 사례의 전후 사진)에는 실제 자료만 사용합니다.

## 4. 스타일

Photorealistic · Korean corporate environment · Premium community facility · Professional operation company ·
Neutral White · Deep Navy · Graphite · Cool Gray · Natural daylight · High-end architectural photography

금지: 과도한 AI 피부 · 비현실적인 손 · 과장된 웃음 · 서양인 중심 구성 · 웜 베이지 라이프스타일 광고 · 헬스장 광고 분위기 ·
부동산 분양광고 분위기 · 과도한 블루 SaaS 이미지 · 미래형 홀로그램 · 허공에 떠 있는 UI

프롬프트: `docs/HIGGSFIELD_PROMPTS.md`

## 5. HILINK 화면

- 입주민 앱은 HILINK 공개 사이트에 실제 노출되는 공개 데모 캡처만 사용 (`public/images/hilink/demo/`, 공개 URL 접근 · 해시 일치 확인 후 복사).
- 관리자는 HILINK 공개 사이트의 AdminConcept 와 같은 개념 UI (`components/hilink/AdminConcept.tsx`, SAMPLE DATA). 보호된 실제 관리자 화면 · 내부 캡처는 넣지 않음.
- 공개 사이트에서 404 인 자산(예: 단말기 장면 이미지)은 복사하지 않음.
- `components/hilink/Screens.tsx` 의 추상 화면은 fallback 으로만 남김.
