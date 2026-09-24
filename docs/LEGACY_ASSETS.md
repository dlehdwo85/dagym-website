# 기존 공식 사이트(dagym1.com) 자산 조사

작성: 2026-09-24

## 1. 조사 결과 요약

| 항목 | 결과 |
| --- | --- |
| www.dagym1.com 4개 페이지 브라우저 확인 | **실패** — 작업 환경의 네트워크 정책이 `www.dagym1.com` 접속을 차단(403). WebFetch 도구도 동일하게 차단 |
| Wix 이미지 · 영상 원본 (`static.wixstatic.com`, `video.wixstatic.com`) | **실패** — 같은 이유로 차단 |
| 웹 아카이브 · YouTube 등 우회 경로 | **실패** — 차단 |
| Wix 관리자 | 접근 권한 없음 |
| Google Drive (원본 자료 폴더) | 기존 사이트 원본 · 영상 · 로고 파일 **없음**. 시설 사진 4장 발견 (아래 4절) |

따라서 **기존 사이트의 이미지 · 영상은 하나도 확보하지 못했습니다.** 아래 2절의 목록은 요청서에 적힌 항목을 기준으로 만든 "확보 대상" 목록이며, 해상도 · 원본 URL · 재생 가능 여부는 확인되지 않았습니다.

## 2. 확보 대상 목록 (요청서 기준 · 미확인)

| 페이지 | 자산 | 해상도 · 원본 URL | 확인 상태 | 리뉴얼 권장 위치 | 저장할 파일 |
| --- | --- | --- | --- | --- | --- |
| 홈 | 메인 수영장 이미지 | 미확인 | 미확보 | 해상도 2400px 이상이면 홈 첫 화면, 아니면 홈 · 아파트 상세 "운영 시설" 갤러리 | `public/images/home/hero.jpg` 또는 `public/images/facilities/pool.jpg` (둘 중 하나만 — 같은 사진 반복 금지) |
| 홈 | 수영장 운영 항목 이미지 | 미확인 | 미확보 | 운영 시설 갤러리 | `public/images/facilities/pool.jpg` |
| 홈 | 헬스장 운영 항목 이미지 | 미확인 | 미확보 | 운영 시설 갤러리 (영상이 있으면 영상 우선) | `public/images/facilities/fitness.jpg` |
| 홈 | 골프장 운영 항목 이미지 | 미확인 | 미확보 | 운영 시설 갤러리 | `public/images/facilities/golf.jpg` |
| 홈 | 게스트하우스 운영 항목 이미지 | 미확인 | 미확보 | 운영 시설 갤러리 | `public/images/facilities/guesthouse.jpg` |
| 홈 | 도서관 운영 항목 이미지 | 미확인 | 미확보 | 운영 시설 갤러리 | `public/images/facilities/library.jpg` |
| 홈 | 카페 운영 항목 이미지 | 미확인 | 미확보 | 운영 시설 갤러리 | `public/images/facilities/cafe.jpg` |
| 회사 소개 | 상단 배너 이미지 | 미확인 | 미확보 | 회사소개 상단 (현장 사진인 경우만) | `public/images/company/banner.jpg` |
| 회사 소개 | 본문 이미지 | 미확인 | 미확보 | 회사소개 본문 (직원 · 현장 사진인 경우) | `public/images/company/team.jpg` |
| 서비스 | 상단 배너 | 미확인 | 미확보 | 사업영역 상세 상단 | `public/images/business/<slug>.jpg` |
| 서비스 | DAGYM 로고 | 미확인 | 미확보 | 헤더 · 푸터 (`data/config.ts` › `brandAssets.dagym`) | `public/images/brand/dagym-logo.svg` |
| 서비스 | HILINK 로고 | 미확인 | 미확보 | HILINK 페이지 상단 (`brandAssets.hilink`) — 시설 사진과 분리 | `public/images/brand/hilink-logo.svg` |
| 서비스 | 각 서비스 이미지 | 미확인 | 미확보 | 해당 사업영역 상세 · 운영 시설 갤러리 | `public/images/business/…`, `public/images/facilities/…` |
| 피트니스 운영 사례 | 커뮤니티 채널 영상 — 헬스장 | 재생 가능 여부 미확인 | 미확보 | 운영 시설 갤러리 (헬스장 타일) | `public/videos/fitness.mp4` + `fitness.jpg`(포스터) |
| 〃 | 영상 — 골프장 | 미확인 | 미확보 | 〃 (골프 타일) | `public/videos/golf.mp4` + `golf.jpg` |
| 〃 | 영상 — GX | 미확인 | 미확보 | 〃 (GX 타일) | `public/videos/gx.mp4` + `gx.jpg` |
| 〃 | 영상 — 카페 | 미확인 | 미확보 | 〃 (카페 타일) | `public/videos/cafe.mp4` + `cafe.jpg` |
| 〃 | 영상 — 도서관 | 미확인 | 미확보 | 〃 (도서관 타일) | `public/videos/library.mp4` + `library.jpg` |
| 〃 | 영상 — 게스트하우스 | 미확인 | 미확보 | 〃 (게스트하우스 타일) | `public/videos/guesthouse.mp4` + `guesthouse.jpg` |

각 자산을 넣을 때 `data/photos.ts` · `data/videos.ts` 의 `provenance` 를 반드시 확인해 입력합니다.

| provenance | 의미 | 사이트 표기 |
| --- | --- | --- |
| `dagym-site` | 다짐이 실제 운영하는 현장 | 시설명 + (공개 동의된 경우) 현장명 |
| `stock` | 스톡 · 구매 이미지 | 시설명만. 현장 사진처럼 표기하지 않음 |
| `unknown` | 출처 미확인 (기본값) | 시설명만. 현장 사진처럼 표기하지 않음 |

## 3. 원본 확보 방법 (택 1)

1. **네트워크 허용 후 자동 수집** — 작업 환경 설정 › Network access 에 `www.dagym1.com`, `static.wixstatic.com`, `video.wixstatic.com` 을 허용하면 아래 스크립트를 실행해 원본을 받고 목록을 채웁니다.
2. **인터넷이 되는 PC에서 스크립트 실행**
   ```bash
   node scripts/import-wix-assets.mjs --dry-run   # 목록만
   node scripts/import-wix-assets.mjs             # 원본 다운로드 → public/legacy/
   ```
   결과: `docs/LEGACY_ASSETS_INVENTORY.md` (원본 URL · 해상도 · 페이지 · 대체텍스트 · 권장 위치), `docs/legacy-assets.json`
   - 이미지: Wix 주소의 크기 변환 부분(`/v1/fill/...`)을 제거해 원본 해상도로 받습니다.
   - 영상: `video.wixstatic.com` 원본(1080p → 720p → 480p 순)을 시도하고, YouTube · Vimeo 삽입이면 삽입 주소를 기록합니다.
   - **한계**: Wix Video 채널 목록은 페이지 HTML이 아닌 별도 요청으로 불러오는 경우가 있어 영상이 0개로 나올 수 있습니다. 이 경우 3번 방법으로 원본을 받아야 합니다.
   - 가짜 Wix 페이지로 동작을 시험했으며, 실제 dagym1.com HTML에서는 아직 실행해 보지 못했습니다.
3. **Wix 관리자에서 직접 내려받기** — 미디어 관리자에서 사용 중인 이미지 · 영상 원본을 내려받아 2절의 파일명으로 저장합니다. 영상은 MP4(H.264, 1080p 이하)와 대표 장면 JPG(포스터)를 함께 준비합니다.

## 4. Google Drive에서 발견한 시설 사진 (사이트 미적용)

| 파일 | 해상도 | 내용 | 판단 | 적용 |
| --- | --- | --- | --- | --- |
| 성정외부.jpg · 성정외부2.jpg | 4032×3024 | 상가 건물 외관, 개인 피트니스 브랜드 간판 | 아파트 커뮤니티 현장 아님. 브랜드 · 운영 주체 확인 필요 | 사용 안 함 |
| 성정내부.jpg · 성정내부2.jpg | 미확인 (7MB대) | 위 시설 내부로 추정 | 위와 같음 | 사용 안 함 |
| 두정내부.jpg | 4032×3024 | 커뮤니티센터 복도 (락커, 라운지 안내판, 게시물) | 실제 커뮤니티센터 사진. **다짐 운영 현장인지 · 공개 동의 여부 미확인**. 안내문 · 게시물이 보여 첫 화면용으로는 부적합 | 사용 안 함 — 확인 시 운영 시설 갤러리에 사용 가능 |
| 두정내부2.jpg · 두정외부.jpg · 두정외부2.jpg | 미확인 | 위 현장의 다른 컷으로 추정 | 위와 같음 | 사용 안 함 |

모두 2025-09-09 사업 서류와 함께 업로드된 파일입니다. 두정 · 성정 현장이 다짐 운영 현장이고 공개해도 된다면 알려 주세요. 해당 사진을 `provenance: "dagym-site"` 로 등록해 적용하겠습니다.

## 5. 원본 영상 추가 확보가 필요한 항목

6개 영상 모두 원본을 확보하지 못했습니다. 각 영상마다 다음이 필요합니다.

- MP4 원본 (H.264 · AAC, 1080p 이하, 1분 내외 권장, 파일당 20MB 이하 권장)
- 포스터 이미지 JPG (영상 대표 장면, 1600×1200 이상)
- 촬영 현장명과 공개 동의 여부 (현장명을 표기하려는 경우)
- 입주민 얼굴이 식별되는지 여부 (식별되면 동의 또는 모자이크 필요)
