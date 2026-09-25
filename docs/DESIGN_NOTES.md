# DAGYM 디자인 메모 — V3 Corporate (2026-09-25)

자세한 분석은 `docs/dagym-redesign-audit.md`.

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
- 현장 후보 · 제안서 수치는 공개 저장소에 넣지 않음 → `docs/private/` (git 제외).
