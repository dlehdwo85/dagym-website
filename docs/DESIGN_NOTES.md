# DAGYM 디자인 메모 — V3 Corporate (2026-09-25)


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
