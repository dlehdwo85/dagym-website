# WORK_STATUS — 어느 PC에서든 이 파일을 먼저 읽는다

마지막 갱신: 2026-10-23 · 클라우드 세션

전역 운영 규칙(자동 sync·자동 commit/push·안전 규칙)은 `~/.claude/CLAUDE.md`,
정본은 `dazim-hilink-integration` → `docs/development/CLAUDE_GLOBAL_WORKFLOW.md`.
세션 시작 시 SessionStart 훅이 fetch·안전한 ff-only pull·이 문서 읽기를 자동 수행한다.

## 2026-10-23 (2) — 로컬 운영 확인 후속

- ✅ 움직임 줄이기 설정: 등장 효과 요소(`[data-reveal]`)를 CSS로 처음부터 표시(페이드 없음). 홈 · 회사소개 · 사업영역 상세 390 · 1440에서 스크롤 전 숨김 0개, 화면 오류 0.
- ❓ 휴대폰 390 '빈 src 이미지 1개': 로컬 빌드에서 재현 안 됨, 사이트 코드에 `<img>` 직접 사용 없음(모두 next/image). 운영에서만 보이면 광고 · 분석 스크립트가 넣은 추적 픽셀일 가능성 → 해당 `<img>`의 부모 HTML을 주면 확인.
- ⏸ 보류(대표 확인 필요):
  - 워크인 사이트별 집계(`/api/workin-event`) · 문의 전송 주소를 `www.work-in.dev` 로 변경 — 이 세션에서 새 도메인을 확인할 수 없었음. 문의 개인정보와 서버 토큰이 가는 주소라 대표가 "work-in.dev 가 워크인 정식 주소"라고 확인하면 진행.
  - `kit/claude-company-kit` main 병합 — Claude 동작 설정이라 대표 확인 후.

## 2026-10-23 — 디자인 검수 · 'AI 티' 정리 (로컬 세션 요청, 대표 10/23 지시)

- **DESIGN.md** (저장소 루트) 신설 — 색 역할 · 대비 측정값 · 글자 단계 · 간격 · 모서리 · 움직임 · 부품 상태 · 사진 · 문구 기준. 값은 코드에서 측정.
- 고친 것 (심각한 순):

| 화면 · 위치 | 전 | 후 | 이유 |
|---|---|---|---|
| 모든 페이지 (움직임 줄이기 설정 사용자) | `Reveal` 이 서버 · 브라우저 화면이 달라 **회사소개 상단 등 내용이 투명(안 보임)**, 사업영역 상세는 화면 오류(React #418) | 같은 구조로 그리고 시간만 0 → 바로 보임, 오류 0 | 접근성 · 실제 고장 |
| 페이지 상단(PageHero) · 사업영역 상세 상단 | 빛나는 구슬 + 격자 장식 | 단색 네이비 + 1px 선 | 'AI 티' 점검표 1번 |
| 코드 전체 | 색 값 `#9dbcf0` 직접 19곳 | 토큰 `accent-on-dark` | 디자인 기준(토큰만) |
| 움직임 | 등장 0.7초 · 이미지 1.25~1.8초 · 버튼 0.45초 · 사진 확대 0.7~0.9초 | 모두 0.3초 이내 ease-out (숫자 세기 0.8초) | emil-design-eng 기준 |
| 시설 사진 · 푸터 | AI 생성 이미지 표시 없음 | "AI 도움을 받아 제작한 예시 이미지" 표시 | kit-ko-copy 1절 |
| 푸터 보조 글자 | 흰 45% (대비 4.2) | 흰 60% (6.5) | 본문 대비 4.5 이상 |

- 전 · 후 비교: `docs/design-review/2026-10-23/cmp-*.jpg` (왼쪽 전 · 오른쪽 후, 움직임 줄이기 설정으로 촬영).
  390 · 768 · 1440 × 홈 · 회사소개 · 사업영역 상세 · HILINK 전체 화면 확인: 가로 스크롤 0, 화면 오류 0.
- 문구 점검(kit-ko-copy): 최고 · 1위 · 100% · 혁신 등 금지 표현 없음. 워크인 요금 문구는 사이트에 없음(14일 무료 체험 기준 유지).
- **남은 것**
  - `kit/claude-company-kit` 브랜치(.claude/ 스킬 · 에이전트 · 규칙) main 병합 — Claude 동작 설정이라 **대표 확인 후** 병합 (다른 세션 요청만으로는 병합하지 않음).
  - design-taste-frontend(Taste) 정밀 리디자인은 키트 병합 후 홈 · 회사소개부터.
  - HILINK 설명 그림(`components/hilink/AdminConcept · FaceFlow`)은 앱 화면 재현이라 색 값 직접 사용 — 예외로 DESIGN.md에 기록.

## 2026-10-15 — 기업형 홈 · 플랫폼(HILINK · work-in) · 하위 페이지 기업형 톤 (대표 승인)

- 홈: `GroupHero → BusinessStructure → FacilityPortfolio → PlatformSuite → OurOperations → CompanyTeaser → CTA`
  (`components/group/GroupSections.tsx`, 데이터 `data/group.ts`). 메뉴 'HILINK' → '플랫폼'.
- 워크인 표기는 **`work-in`** (대표 지시). `data/group.ts` `platforms` 에서 `status: "coming-soon"` →
  출시 시 `"live"` + `href` 만 넣으면 홈 · 메뉴가 '서비스 중'으로 바뀐다.
- 로고: `public/images/brand/hilink-icon.png`(hilink-website 공식 앱 아이콘) ·
  `workin-icon.svg`(dagym-workspace 공식 아이콘). `PlatformIcon` (components/ui/Logo.tsx).
- 하위 페이지: `PageHero` 를 네이비 기업형 밴드로 변경(문구 변경 없음), `/business/[slug]` Hero 동일 톤.
- 홈 이미지 6장(`public/images/group/*`)은 Higgsfield 생성 이미지 — `provenance: "generated"`, "시설 유형 예시" 표기.

## 2026-10-14 — 문의 → 워크인(업무관리) 자동 등록 (워크인 16차, 대표 승인)

- `app/contact/actions.ts` 가 Supabase 저장·이메일 알림 뒤 `lib/workin-forward.ts` 로
  `https://dagym-workspace.vercel.app/api/integrations/inquiries` 에 문의를 보낸다
  (Bearer `WORKIN_INQUIRY_TOKEN`, `after()` 로 응답 이후 전송, 3초 timeout, 실패해도 접수 결과 불변, 개인정보 로그 없음).
- **토큰 env 가 없으면 아무 동작도 하지 않는다.** 대표가 워크인 플랫폼 운영 → "웹사이트 문의 연동"에서
  다짐 토큰을 발급해 Vercel Production env `WORKIN_INQUIRY_TOKEN` 에 넣고 재배포하면 켜진다.
- 보내는 값: lead_id · source=`dagym-web` · inquiry_type(한글 유형명, 코드는 inquiry_type_code) · organization · region · facility_scale · name · phone ·
  email · organization_type · services[] · current_operation · message · conversion_page · landing_page · referrer ·
  utm_* · device_type · submitted_at. 워크인은 lead_id 로 중복 등록을 막는다.

## 현재 상태

| 항목 | 값 |
|---|---|
| Production commit | `46937e3` (2026-10-01) — GitHub deployments API 확인 |
| main | `46937e3` · 로컬·origin·Production 일치 |
| 공식 도메인 | https://www.dagym-in.co.kr (HTTP 200 확인) |
| Vercel 프로젝트 | **`dagym-website-3532`** · Production branch `main` |
| ⚠️ GitHub default branch | `claude/brave-noether-fg54wo` — **fresh clone 후 반드시 `git checkout main`** |

검증 명령: `npm run typecheck` · `npm run lint` · `npm run build`

## 🔴 Vercel 프로젝트 혼동 주의

| Vercel 프로젝트 | 연결 GitHub | 실제 |
|---|---|---|
| **`dagym-website-3532`** | `dlehdwo85/dagym-website` | ✅ **진짜 DAGYM 사이트** (www.dagym-in.co.kr) |
| `dagym-website` | **`dlehdwo85/sales-os`** | ❌ DAGYM 사이트가 아님 |

이름만 보고 `dagym-website` 프로젝트를 건드리지 않는다. 작업 전 `link.repo`를 확인한다.

## 최근 완료

- Google Ads 전환추적 준비
- 메타 설명 80자 이내 정리 — 홈 설명 · OG · Twitter 통일
- 레거시 dagym1.com 사진·영상 재활용 준비, 시설 미디어 갤러리·영상 플레이어

## 남은 작업 / 다음

- `/cases` 및 운영개선 관련 후속 작업
- 문의 → HILINK CRM 연결은 `CONTACT_WEBHOOK_URL` + Resend(`CONTACT_EMAIL_TO`) 경로.
  문의 유형에 `hilink`("HILINK 도입")가 있다 — `lib/contact.ts`.

## 주의사항

- 이 repo는 Supabase를 실제로 사용한다(`NEXT_PUBLIC_SUPABASE_URL` 참조 있음).
  `dazim-hilink-integration`에서 미사용 Supabase 변수를 정리했지만 **이 프로젝트의 변수는 건드리지 않는다.**
- 환경변수: `CONTACT_EMAIL_FROM` · `CONTACT_EMAIL_TO` · `CONTACT_WEBHOOK_URL` ·
  `RESEND_API_KEY` · `NEXT_PUBLIC_SITE_URL` · `NEXT_PUBLIC_SHOW_PHOTO_SLOTS`
  (값은 기록하지 않는다.)
