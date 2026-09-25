# DAGYM Visual Rebuild V2 — 디자인 메모 (2026-09-25)

## 1. 확인하지 못한 것 (그대로 기록)

- 현재 배포 사이트(`dagym-website-3532-6j07o22sg-…vercel.app`), `dagym1.com`, `spoizm.com`, `lagomsports.com` 은 작업 환경 네트워크 정책으로 모두 **403** — 열어보지 못했습니다.
- 따라서 벤치마크 사이트의 메뉴 · 하위 페이지 · 모바일 화면 · 모션은 **관찰하지 않았고**, 문구도 참고하지 않았습니다. V2는 요청서의 디자인 규칙과 저장소의 콘텐츠를 기준으로 새로 설계했습니다.
- 벤치마크 대조가 필요하면: 각 사이트 홈 · 하위 페이지 캡처(1440 / 390px)와 스크롤 화면 녹화, 또는 작업 환경 네트워크 허용(`www.dagym1.com`, `spoizm.com`, `lagomsports.com`, `static.wixstatic.com`, `video.wixstatic.com`).

## 2. 방향

사람이 운영하고 기술이 연결하는 커뮤니티 운영회사 — Digital Showroom (영업 제안서 + 운영 포트폴리오 + HILINK 제품 브로슈어).

| 항목 | V1 (폐기) | V2 |
|---|---|---|
| 색 | 흰색 · 차콜 · 연회색 | 뉴트럴 화이트 `#fff` · 딥 차콜 `#1c1e22` · 니어 블랙 `#0d0e10` · 쿨 그레이 `#8b919a` · 다크 네이비 `#0a1220`. 강조 `#6f9bdc` 는 HILINK · 진행 표시에만 |
| 타이포 | 제목 최대 60px | Hero `clamp(64px, 6vw, 110px)`(모바일 42px), 섹션 48–72px, 본문 17–20px. 영문 대문자 라벨(Inter) |
| 레이아웃 | 컨테이너 안 카드 · 목록 | 풀블리드 · 분할 · 에디토리얼 · sticky · 가로 스와이프 혼합. radius 0 / 2 / 4 / 8px |
| 모션 | 없음 | 줄 단위 마스크 리빌, clip-path 이미지 리빌, 이미지 축소, 패럴랙스, sticky 스크롤 스토리, 선 그리기, 커서 따라오는 이미지, 버튼 배경 wipe · 화살표. `prefers-reduced-motion` 에서는 모두 정지 |
| 헤더 | 흰색 고정 | 첫 화면 위 투명 → 스크롤 시 흰색 + 블러, 사업영역 · HILINK 메가 메뉴(이미지), CTA "운영문의" |

## 3. 홈 구성

1. Hero — 니어 블랙 100vh, 사진 3장 교차 전환 + 느린 줌 + 스크롤 패럴랙스, CTA: Our Business / HILINK / Scroll to explore
2. 브랜드 선언 — SPACE · PEOPLE · OPERATION · TECHNOLOGY 가 스크롤에 따라 채워짐
3. 운영 기준(숫자 자리) — 확인된 회사 수치가 2개 이상이 되면 자동으로 수치 + 카운트로 전환
4. 사업 01–05 — 왼쪽 고정 이미지가 스크롤 위치에 따라 교체
5. 아파트 커뮤니티 생태계 10개 시설 — 다크, 커서 이미지 미리보기
6. 운영 모델 01–06 — 선 그리기
7. PEOPLE × TECHNOLOGY — sticky, 역할과 HILINK 기능이 한 쌍씩 연결
8. HILINK 두 번째 Hero — 다크 네이비, 관리자 · 앱 · 단말기 화면 공간 배치, 01 MEMBER → 06 DATA 스크롤 스토리
9. 운영 시설 에디토리얼 그리드 — 비율이 다른 5개 타일
10. 포트폴리오 — 공개 동의된 현장이 있을 때만
11. CTA

## 4. 이미지 원칙 · IMAGE_REQUIRED

- 확보된 이미지는 기존 사이트 시설 사진 5장(약 950–1070 × 720px, 출처 미확인)뿐입니다. 특정 현장으로 표기하지 않고 시설 유형만 표기합니다.
- **원본 해상도보다 크게 늘리지 않습니다.** 그래서 첫 화면은 풀블리드가 아니라 최대 600 × 720px 세로 창에 사진을 보여줍니다.
  `public/images/home/hero.jpg`(2400px 이상) 또는 `public/videos/hero.mp4` 를 넣으면 자동으로 풀블리드 배경으로 바뀝니다.
- IMAGE_REQUIRED (검수 모드 `NEXT_PUBLIC_SHOW_PHOTO_SLOTS=1` 에서 표시):
  - 첫 화면용 2400px 이상 현장 사진 또는 영상
  - 수영장 · 사우나 · 게스트하우스 · 키즈카페 · 인포메이션 데스크 · 현장 직원
  - HILINK 실제 화면 캡처 (관리자 CRM, 입주민 앱, 안면인식 단말기 사진) → `public/images/hilink/`
  - 회사 · 팀 사진 → `public/images/company/team.jpg`
  - 사업영역별 대표 사진 → `public/images/business/<slug>.jpg`

## 5. HILINK 화면

- 실제 캡처가 없어 **기능 설명용 화면 구성 예시**를 코드로 그렸습니다. 수치 · 이름 · 현장명은 넣지 않고 기능 라벨과 빈 막대만 사용하며, 화면 아래에 "기능 설명을 위한 화면 구성 예시입니다" 를 표기합니다.
- 실제 캡처 파일을 `data/photos.ts` 의 `hilink-admin` · `hilink-app` · `hilink-device` 경로에 넣으면 쇼케이스가 실제 화면으로 바뀝니다.

## 6. TODO_VERIFY

| 항목 | 위치 | 방문자 화면 |
|---|---|---|
| 운영 현장 수 · 세대수 · 운영 시설 수 · 운영 연수 | `data/showroom.ts` › `companyMetrics` | 숨김 (운영 기준으로 대체) |
| 연혁 · 협력사 · 인증 | `data/config.ts` | 섹션 숨김 |
| 대표 · 사업자번호 · 주소 · 연락처 | `data/config.ts` › `company` | 줄 숨김 |
| 운영 사례(현장명 · 지역 · 세대수 · 시설 · 운영 형태) | `data/projects.ts` | 섹션 · 메뉴 숨김, `/project/[slug]` 미생성 |
| 공식 로고 | `data/config.ts` › `brandAssets` | 텍스트 워드마크 |
