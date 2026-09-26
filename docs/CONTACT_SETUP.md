# 운영 문의 → 공용 CRM 파이프라인

DAGYM 홈페이지 문의는 HILINK 홈페이지와 **같은 Lead 인프라**(같은 Supabase `leads` 테이블 · 같은 알림 채널 · 같은 관리자 CRM)로 들어온다.
구현은 HILINK(`dlehdwo85/hilink-website`)의 `app/contact/actions.ts` · `lib/email/notifyLead.ts` · `lib/analytics/*` 를 기준으로 하고, 화면만 DAGYM 디자인이다.

## 1. 흐름

```
CTA (/contact?type=…&org=…)
 → 문의 유형 · 소속 자동 선택 (사용자 변경 가능)
 → Server Action submitLead (app/contact/actions.ts) · Zod 검증
 → Lead ID = crypto.randomUUID()
 → ① Supabase public.leads insert (source = 'dagym-web', 8초 timeout)
   ② 알림 메일 [DAGYM 운영문의] (같은 Lead ID, CRM 저장 결과 표기)
 → 둘 중 하나라도 성공 = 접수 성공 → /contact/success → form_success 1회
 → HILINK 관리자 /admin/leads 에서 영업 관리 (DAGYM 배지)
```

| 결과 | DB | 메일 | 사용자 화면 | 로그 |
| --- | --- | --- | --- | --- |
| `LEAD_FULL_SUCCESS` | ✅ | ✅ | 접수 완료 | `[leads] LEAD_FULL_SUCCESS` |
| `LEAD_DB_ONLY` | ✅ | ❌ | 접수 완료 (CRM 에 보존) | `[leads] LEAD_DB_ONLY` |
| `LEAD_EMAIL_ONLY` | ❌ | ✅ | 접수 완료 (메일이 원본) | `[leads] LEAD_EMAIL_ONLY` |
| `LEAD_TOTAL_FAILURE` | ❌ | ❌ | 오류 안내 · 입력값 유지 | `[leads] LEAD_TOTAL_FAILURE` |

Vercel Logs 에서 `[leads]` 로 검색한다. 로그에는 Lead ID 와 회사/단지명, 처리 결과만 남긴다 (연락처 · 이메일 · 문의 내용 · 전체 JSON 금지).

## 2. CTA 문맥 (`?type=`, `?org=`)

| type | 문의 유형 | 주요 CTA |
| --- | --- | --- |
| `operation` | 커뮤니티 위탁운영 | Header 「운영 제안 문의」, 하단 배너, 아파트 커뮤니티 상세, Footer |
| `hilink` | HILINK 플랫폼 | HILINK 페이지, 홈 HILINK 섹션, 사업영역 HILINK, 메가메뉴 |
| `consulting` | 운영 진단 · 컨설팅 | 하단 배너 보조, 모바일 메뉴, 운영 컨설팅 상세, Footer |
| `corporate` | 기업 · 호텔 · 복합시설 | 기업 · 호텔 상세 |
| `sports` | 스포츠시설 운영 | 스포츠 · 피트니스 상세 |
| `facility` | 시설지원 | 시설 지원 상세 |
| `etc` | 기타 | — |

`?org=` 는 소속 사전 선택 (`입주자대표회의 · 관리사무소 · 위탁관리회사 · 건설사 · 시행사 · 기업 · 호텔 · 스포츠시설 · 기타`).
예전 주소(`?type=proposal · diagnosis · apartment · equipment …`)는 새 유형으로 자동 연결된다 (`lib/lead/constants.ts`).
각 CTA 는 클릭 시 `contact_click` + `cta_location`(header · cta_banner · business_page · hilink_page · home_hilink · project_page · footer · contact_page)을 남긴다.

## 3. 폼 항목

필수: 문의 유형 · 회사/단지명 · 지역(시·도) · 담당자명 · 연락처 · 소속 · 관심 서비스(1개 이상) · 개인정보 동의
선택: 시설 규모/세대수 · 이메일 · 현재 운영 상황 · 문의 내용(3,000자)

- 검증 실패 · 시스템 오류 모두 입력값 유지, 첫 오류 필드로 스크롤 + 포커스.
- 스팸: honeypot `company_website` 가 채워지면 저장 · 알림 없이 성공 화면 (전환 미집계). 빠른 제출은 차단하지 않고 로그만.

## 4. 환경변수 (Vercel · dagym-website-3532)

실제 값은 Vercel 에만 둔다. Git · PR · 문서 · 로그에 쓰지 않는다. 비밀값에 `NEXT_PUBLIC_` 접두사 금지.

| 변수 | 용도 | 비밀 |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | HILINK 와 **같은** Supabase 프로젝트 URL | 아니오 |
| `SUPABASE_SERVICE_ROLE_KEY` | 서버 insert 전용 | **예** |
| `LEAD_NOTIFY_EMAIL` / `LEAD_NOTIFY_EMAIL_SECONDARY` | 알림 수신 | 아니오 |
| `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` `SMTP_USER` `SMTP_PASS` `SMTP_FROM` | SMTP 채널 | `SMTP_PASS` 예 |
| `RESEND_API_KEY` + `LEAD_FROM_EMAIL` | Resend 채널 | `RESEND_API_KEY` 예 |
| `LEAD_NOTIFY_WEBHOOK_URL` | Webhook 채널 | 예 |
| `CRM_ADMIN_BASE_URL` | 메일의 「관리자에서 문의 확인」 링크 = **HILINK 관리자 도메인** (DAGYM 에는 /admin 없음) | 아니오 (서버 전용) |
| `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID` | 전환 측정 (선택) | 아니오 |

알림 채널은 하나 이상 필요하다. HILINK 프로젝트와 같은 값을 쓰면 두 사이트 문의가 같은 메일함 · 같은 CRM 으로 모인다.
전환 기간 호환: 구 변수(`CONTACT_WEBHOOK_URL`, `RESEND_API_KEY` + `CONTACT_EMAIL_FROM/TO`)만 있어도 알림은 발송된다.
환경변수를 바꾸면 반드시 Redeploy (`NEXT_PUBLIC_*` 는 빌드 시 반영).

## 5. Supabase

1. HILINK `lib/supabase/schema.sql` 이 적용된 같은 프로젝트를 사용한다 (RLS ON, anon 정책 없음, 관리자 = Auth + `admin_users` 허용목록).
2. `docs/sql/leads-dagym.sql` 을 SQL Editor 에서 실행한다 — `inquiry_type`, `facility_scale` nullable 컬럼 추가 (idempotent, 기존 행 변경 없음).
   실행 전에도 접수는 끊기지 않는다: 컬럼이 없으면 유형 · 규모를 `message` 앞에 담아 저장한다.
3. DAGYM 문의 컬럼 매핑: 회사/단지명 → `apartment_name`, 순수 세대수 → `households`, 관심 서비스 → `interested_services`, `source = 'dagym-web'`.

## 6. 관리자 CRM

HILINK 관리자(`/admin/login` → `/admin/leads`)를 그대로 쓴다. DAGYM 에 별도 관리자는 없다.
목록 · 상세에 `DAGYM` / `HI-LINK` 배지(hilink-website `feat/lead-source-badge`), CSV 에 유입(source) 열.
상태 · 담당자 · 내부메모 · 타임라인 · 보관은 HILINK 문의와 같은 방식으로 관리한다.

## 7. 완료 페이지 · 전환

- `/contact/success` — `noindex, nofollow`, sitemap 제외.
- 제출 성공 직후 sessionStorage 플래그 → 완료 페이지에서 `form_success`(+ Meta `Lead`) **1회** 발화 후 소비.
  새로고침 · 뒤로가기 · 직접 방문 · honeypot 은 전환 없음.
- 이벤트: `page_view` · `form_start` · `form_submit` · `form_success` · `contact_click` · `phone_click` · `email_click`.
  Primary 전환 = `form_success`, 보조 = `phone_click` · `email_click`.
- 최초 유입(first-touch): landing_page · referrer · utm_* · gclid · fbclid 를 세션에 보존해 Lead 와 함께 저장.

## 8. 검증 기록

로컬 E2E (production build + Supabase REST 모의 서버 + 알림 webhook 모의 서버):

| 항목 | 결과 |
| --- | --- |
| `?type=hilink&org=건설사` 자동 선택 · 기본 서비스 | PASS |
| 검증 오류: 필드별 메시지 · 첫 오류 포커스 · 입력값 유지 | PASS |
| A 정상 → DB 1행 + 메일 1통, Lead ID 동일, source=dagym-web, UTM · gclid · landing · device 저장 | PASS |
| B DB 실패 → 메일만(「저장 실패 — 이 메일이 원본」), 사용자 성공 | PASS |
| C 메일 실패 → DB 만, 사용자 성공 | PASS |
| D 모두 실패 → 오류 안내 · 입력값 유지 · 복구 후 같은 값으로 재제출 성공 | PASS |
| DB 지연(12초) → 8초 timeout 후 메일만으로 성공 | PASS |
| 새 컬럼 없는 DB → message 포함 방식으로 저장 | PASS |
| `form_success` 제출 직후 1회 · 새로고침 0 · 직접 방문 0 · honeypot 0 | PASS |
| 로그에 연락처 · 이메일 · 문의 내용 없음 | PASS |
| 클라이언트 번들에 서버 비밀값 · 서버 변수명 없음 | PASS |

실서비스 E2E(실제 Supabase · 실제 메일 · HILINK 관리자)는 환경변수 설정 후 Preview → Production 순서로 진행한다:
`/contact?type=operation&utm_source=e2e&utm_medium=test&utm_campaign=launch` 에서 회사/단지명 `DAGYM TEST PREVIEW`, 담당자 `테스트`로 제출 →
DB 행 · 메일 · 완료 페이지 · 관리자 DAGYM 배지 · 상태 NEW→CONTACTED(`contacted_at`) · 내부메모 저장 확인 후 테스트 행은 보관 처리.

## 9. 장애 복구

- `LEAD_EMAIL_ONLY`: Supabase 복구 후 메일의 Lead ID 로 수동 등록 (같은 ID 로 insert → 중복 방지).
- `LEAD_DB_ONLY`: CRM 에 저장되어 있으므로 알림 채널만 점검.
- `LEAD_TOTAL_FAILURE`: 사용자 화면에 오류 안내가 뜨고 입력값은 남아 있다. 두 채널 설정 · 상태 확인.

## 10. Production 체크리스트

- [ ] Vercel(dagym-website-3532) Production 에 Supabase 2개 + 알림 채널 1개 이상 + `CRM_ADMIN_BASE_URL` 설정 후 Redeploy
- [ ] `docs/sql/leads-dagym.sql` 실행
- [ ] hilink-website `feat/lead-source-badge` → main 반영 (관리자 DAGYM 배지)
- [ ] Preview · Production E2E (위 8절) PASS
- [ ] 모두 PASS 후 구 경로 제거 검토: `app/api/contact/route.ts`, `lib/contact-delivery.ts`, `CONTACT_*` 변수 (사용처 0 확인 후)
