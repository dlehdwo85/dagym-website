# DAGYM 공식 홈페이지

주식회사 다짐(DAGYM)의 B2B 기업 홈페이지입니다.
**현장 운영(OFFLINE) + 자체 플랫폼 HILINK(DIGITAL)** 를 핵심 차별점으로, 시행사 · 입주자대표회의 · 관리사무소 같은 의사결정권자가 상담을 신청하도록 설계했습니다.

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 · Framer Motion(모바일 메뉴) · Lucide Icons
- Pretendard(국문) · Inter(영문): 모두 로컬 번들이며 외부 폰트 요청이 없습니다

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드
npm run start
npm run lint
npm run typecheck
```

## 사이트 구조

| 경로 | 내용 |
| --- | --- |
| `/` | Hero · 신뢰 지표 · 사업영역 · Why DAGYM · Offline+Digital · HILINK · 운영 시설 · 프로젝트 · CTA |
| `/company` | 회사소개(존재 이유) · Brand Story · Mission/Vision · Core Values · 운영 체계 · 파트너십 · 회사 정보 |
| `/business` | 사업영역 개요 · 고객 유형 · 공통 운영 프로세스 |
| `/business/[slug]` | apartment-community · sports-fitness · community-facility · consulting · equipment |
| `/hilink` | SaaS 제품 페이지: 기능 15종 · 대시보드/앱/단말기 목업 · 운영 흐름 다이어그램 · 도입 방식 · FAQ |
| `/projects`, `/projects/[slug]` | 유형별 필터가 있는 포트폴리오 · 프로젝트 상세 |
| `/insight`, `/insight/[slug]` | NEWS · NOTICE · MEDIA · FAQ 탭(`?tab=`) · 게시물 상세 |
| `/contact` | B2B 상담 신청폼(`?type=hilink` 등으로 상담 유형 미리 선택) |
| `/privacy` | 개인정보처리방침(초안) |
| `/api/contact` | 문의 접수 API |

SEO: 페이지별 metadata · canonical · Open Graph(`/opengraph-image`) · `sitemap.xml` · `robots.txt` · JSON-LD(Organization, Service, SoftwareApplication, FAQPage, BreadcrumbList, Article).

## 콘텐츠 수정 방법

화면 문구와 데이터는 컴포넌트 안에 하드코딩하지 않고 모두 `data/` 에 있습니다.

| 파일 | 내용 |
| --- | --- |
| `data/config.ts` | 회사 기본정보 · 신뢰 지표(metrics) · 파트너 · 연혁 · 인증 |
| `data/home.ts` | 홈 Hero(사진/영상 경로 포함) · Why DAGYM · Offline/Digital 항목 |
| `data/business.ts` | 6개 사업영역과 상세 페이지 콘텐츠 전체 |
| `data/hilink.ts` | HILINK 기능 · 화면 소개 · 운영 흐름 |
| `data/facilities.ts` | 운영 가능 시설 12종(+2) |
| `data/projects.ts` | 프로젝트(운영 현장) |
| `data/insight.ts` | 뉴스 · 공지 · 미디어 · FAQ |
| `data/company.ts` | 회사소개 페이지 문구 |
| `data/navigation.ts` | 헤더 · 푸터 메뉴 |

페이지는 `lib/content.ts` 의 getter를 통해서만 프로젝트와 게시물을 읽습니다. Supabase나 Headless CMS로 옮길 때는 이 파일의 구현만 바꾸면 되고, 권장 스키마는 `data/insight.ts` 와 `data/projects.ts` 주석에 적어 두었습니다.

### 새 운영 현장 추가

1. `data/projects.ts` 의 `projects` 배열에 객체를 하나 추가합니다.
2. 사진을 `public/images/projects/<slug>/` 에 넣고 `cover` 와 `gallery` 에 경로를 적습니다.
3. `verified: true` 로 바꾸면 SAMPLE 표시가 사라지고 사이트맵과 검색 색인에 포함됩니다.
4. `location: { lat, lng }` 를 입력하면 PORTFOLIO 상단에 운영 지역 지도가 자동으로 나타납니다.

### 사진 교체

`<Media src="...">` 에 경로가 없으면 **원근 라인 드로잉 placeholder** 가 렌더링됩니다. 실제 사진 경로를 넣으면 `next/image` 로 AVIF/WebP 최적화되어 노출됩니다.
- 홈 Hero 배경: `data/home.ts` → `heroImage` / `heroVideo` (고해상도만 사용하세요)
- 사업영역 카드: `data/business.ts` → `image`
- 시설 그리드: `data/facilities.ts` → `image`
- 로고: `components/ui/Logo.tsx` (현재 임시 워드마크, 공식 SVG로 교체)

## ⚠️ TODO_VERIFY — 확인 후 입력해야 하는 항목

사실 확인이 되지 않은 정보는 **임의로 만들지 않았습니다.** 아래 값들은 `TODO_VERIFY` 로 남아 있으며, UI에서는 "업데이트 예정"으로 표시되거나 섹션이 숨겨집니다.

- [ ] `data/config.ts` › `company`: 대표이사, 사업자등록번호, 통신판매업 번호, 대표번호, 팩스, 이메일, 주소, 설립일, 상담 시간, SNS
- [ ] `data/config.ts` › `metrics`: 운영 현장 수, 관리 세대수 (`value` 에 숫자를 넣으면 Count-up 애니메이션과 함께 노출)
- [ ] `data/config.ts` › `partners`, `history`, `certifications` (비어 있으면 해당 영역이 나타나지 않음)
- [ ] `data/projects.ts`: 샘플 9건 → 실제 현장명 · 지역 · 규모 · 사진으로 교체
- [ ] `data/insight.ts`: 샘플 뉴스 · 미디어 게시물 교체 또는 삭제
- [ ] 브랜드 컬러: `app/globals.css` 의 `--color-accent`(Bronze), `--color-signal`(HILINK)을 공식 로고 컬러로 교체
- [ ] DAGYM · HILINK 공식 로고 파일
- [ ] `app/privacy/page.tsx` 와 문의폼 개인정보 안내문: 법무 검토 후 확정

## 문의폼 연동

`/api/contact` 는 서버에서도 같은 규칙으로 입력값을 검증하고(honeypot 스팸 방지 포함), `CONTACT_WEBHOOK_URL` 이 설정되어 있으면 JSON으로 전달합니다. Slack Incoming Webhook, Make, Zapier, 자체 CRM 등에 연결할 수 있습니다.

```bash
cp .env.example .env.local
# NEXT_PUBLIC_SITE_URL=https://www.dagym1.com
# CONTACT_WEBHOOK_URL=https://hooks.slack.com/services/...
```

> 웹훅이 설정되지 않은 상태에서는 문의 내용이 서버 로그에만 남습니다. **운영 배포 전에 반드시 설정하세요.**

## 디자인 시스템

- **컬러**: White · Near Black(`ink`) · Deep Navy(`navy-*`) · Cool Gray(`mist-*`)를 기본으로 씁니다. 브랜드 강조색은 **Bronze(`accent`) 하나**이며, HILINK 영역에서만 **Signal Blue(`signal`)** 를 제한적으로 씁니다. Bronze는 사람(현장 운영), Signal은 기술(디지털 운영)을 뜻합니다.
- **타이포그래피**: `t-display`(Hero, 40→88px) · `t-h1` · `t-h2` · `t-h3` · `t-h4` · `t-lead` · `t-body` · `t-eyebrow`
- **모션**: 스크롤 reveal은 IntersectionObserver와 CSS만으로 구현해 JS 번들 부담이 없습니다. `prefers-reduced-motion` 을 지원하고, JS가 꺼져 있어도 콘텐츠가 그대로 보입니다.
- **컴포넌트**: `components/ui`(Button, SectionHeader, Media, MetricCounter, Reveal …), `components/sections`(PageHero, CTASection, BusinessCard, ProjectCard, FacilityGrid, ProcessSteps, FaqList), `components/hilink`(목업, 흐름 다이어그램), `components/home`

## 배포

Vercel이나 Node.js 서버(`npm run build && npm run start`)에 배포할 수 있습니다. `/api/contact` 를 제외한 모든 페이지는 정적으로 생성됩니다.
