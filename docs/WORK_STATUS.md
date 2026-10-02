# WORK_STATUS — 어느 PC에서든 이 파일을 먼저 읽는다

마지막 갱신: 2026-10-02 · 사무실 PC `DESKTOP-HQKVDIC`

전역 운영 규칙(자동 sync·자동 commit/push·안전 규칙)은 `~/.claude/CLAUDE.md`,
정본은 `dazim-hilink-integration` → `docs/development/CLAUDE_GLOBAL_WORKFLOW.md`.
세션 시작 시 SessionStart 훅이 fetch·안전한 ff-only pull·이 문서 읽기를 자동 수행한다.

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
