# DAGYM 디자인 메모 — V5 (2026-09-25)

## V5 사업 구조
- 핵심사업 2개: **CORE 01 Community Operation** (커뮤니티 시설 전문 위탁운영) · **CORE 02 HILINK Platform** (커뮤니티 운영 플랫폼 구축 · 납품).
- **Supporting Service — Facility Support** (기구 보강 · 스크린골프 구축 · 환경 개선)는 핵심사업 하단 한 줄 · 메뉴 마지막 항목으로만 노출. Hero · 독립 대형 섹션에 쓰지 않음.
- 데이터: `data/corporate.ts` 의 `coreBusinesses` · `supportingService`.

## V5 홈 순서
Hero → 핵심사업 2개 → 운영실적(12개 단지) → 커뮤니티 운영 범위 → 운영 방식(How we operate) → HILINK → 운영 개선 사례 → Why DAGYM(회사소개 링크) → 문의

## V5 Hero
- 카피: COMMUNITY OPERATION & PLATFORM / 공간을 운영하고, 운영을 시스템으로 연결합니다. / CTA 커뮤니티 운영 · HILINK.
- 이미지: `public/images/hero/hero-access-lobby-v4-21x9.webp` (2400×1029) — 인물 없는 21:9 생성 이미지.
  왼쪽 약 40%는 흰 벽(텍스트 영역), 오른쪽에 인포메이션 데스크 · 출입 게이트 · 유리 너머 피트니스.
- 배치: `layout: "wide"` — 데스크톱은 이미지 전체 배경 + 왼쪽 흰색 그라데이션, 모바일 · 태블릿은 사진 위 · 텍스트 아래.
  크롭 중심은 모바일 `focus: "72% center"`(데스크 · 게이트), 데스크톱 `focusLg: "20% center"`(흰 벽을 텍스트 쪽에 유지).
- 대안: `hero-community-space` (세로 크롭) + `layout: "split"` — 텍스트 왼쪽 · 사진 오른쪽 절반.
- 교체: `homeHero.image` · `homeHero.layout` · `homeHero.tone`("dark" 지원).



## 토큰
| 역할 | 값 |
|---|---|
| 배경 | 흰색 `#ffffff`, 쿨 그레이 `--color-mist #f5f7fa` |
| 텍스트 | 잉크 `#0f1b2d`, 본문 `#3a4557`, 보조 `#637085` |
| 브랜드 | 딥 네이비 `--color-navy #12305a` / `#0c2242`, 슬레이트 `#3e5a80`, 스틸 `#5a6f89` |
| 강조 | DAGYM Blue `--color-accent #2c62c9` — 소제목 · 번호 · 상태에만 |
| radius | 0 / 2 / 4 / 8px |

- 타이포: Pretendard. Hero 36px(모바일) → 64px, 섹션 제목 28 → 44px, 본문 17px. 영문은 작은 보조 라벨(`.label-en`)로만.
- 다크(네이비) 섹션은 HILINK · 문의 · 푸터에만, 연속 배치하지 않음.
- 모션: 요소 등장(16px 상승), 이미지 clip 리빌, 전후 비교 슬라이더, 호버. parallax · sticky 스크롤 연출 없음. `prefers-reduced-motion` 시 정지.

## 공개 원칙
- `data/corporate.ts` 의 `publicationStatus` 로 관리. VERIFY_BEFORE_PUBLISH 항목은 방문자 화면에 나오지 않음(검수 모드 `NEXT_PUBLIC_SHOW_PHOTO_SLOTS=1` 에서만 안내).
- 공개 승인되지 않은 정보는 공개 저장소에 넣지 않음 → `docs/private/` (git 제외).

## 운영실적 (Track Record)
- 단지 이미지 + 단지명만 표시. 세대수 · 기간 · 현재/과거 구분 · 계약 정보는 표시하지 않음.
- 목록: `data/projects.ts` (publicationApproved 인 항목만 빌드에 포함).
- 이미지: 사용권이 확인된 원본을 `<slug>.jpg` 로 모아 `node scripts/import-portfolio-images.mjs <폴더>` 실행 → `public/images/projects/`.
  이미지가 없는 단지는 추상 패턴 카드로 표시됩니다 (사진처럼 보이지 않도록).
- 카드 비율 4:3, `object-position` 은 단지별 `imagePosition` 으로 조정. 오버레이 · 필터 없음, 확대 없음(1600px 이하로만 저장).
- 데스크톱: 정적 4열 그리드 / 모바일: 가로 스냅 스크롤(약 1.2장 노출).
