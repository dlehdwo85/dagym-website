# Codex ↔ Claude Code 작업 왕복 규칙 (2026-10-12 대표 지시)

> 순서: **Codex 작업지시 → Claude Code 개발 → Codex 검수 + 다음 작업지시 → Claude Code 개발 …**
> 대표는 이 대화창(Claude Code)과 Codex 대화창, 그리고 GitHub 에서 같은 내용을 본다.
> 적용 대상: Codex 와 연결된 저장소 (`AGENTS.md` 가 있는 곳) — `dazim-hilink-integration` · `hilink-website` · `dagym-website`.

## 1. 기록은 저장소 한 곳에 — 대화창은 그 기록을 보여 주는 창

| 무엇 | 어디 | 누가 쓰나 |
|---|---|---|
| 작업지시서 | `docs/agent-handoff/orders/<ID>.md` | Codex (한도 소진 시 대표 입력을 Claude 가 그대로 옮김) |
| 개발 결과 보고 | `docs/agent-handoff/REVIEW_HANDOFF.md` 최상단 + 커밋 | Claude Code |
| 검수 결과 | `docs/agent-handoff/reviews/<ID>.md` | Codex (`scripts/ops/codex-handoff.mjs review`) |
| 다음 작업지시 | 검수 파일의 `## 다음 작업지시` 절 → `orders/<다음 ID>.md` | Codex |

- ID 형식: `GUI-HANDOFF-YYYYMMDD-NN`. 응답 첫 줄은 `<ID> 수신`.
- 개발은 항상 `wip/*` 브랜치. 검수 대상은 `main...wip/*` diff.
- 비밀값·토큰·쿠키는 어느 파일에도 쓰지 않는다.

## 2. 자동 왕복 — Claude 가 Codex 를 부른다

대화창 두 개를 사람이 오가며 붙여 넣는 대신, **이 PC 의 Codex CLI 를 Claude 가 직접 호출**한다.
그러면 검수 결과가 저장소 파일로 남고, 같은 내용이 Claude 대화창에 그대로 보고된다.

```
node scripts/ops/codex-handoff.mjs review <ID> --base main --repo <저장소 경로>
```

- 읽기 전용(`sandbox read-only`)으로 실행 — Codex 는 검수 중 파일을 바꾸지 않는다.
- 결과: `reviews/<ID>.md` (판정 · 근거 · 재작업 · 다음 작업지시).
- Codex 한도 소진·오류: 같은 파일에 `상태: Codex 검수 대기` 와 오류 첫 줄을 남기고 종료코드 3.
  Claude 는 "검수 대기" 로 보고하고 **PASS 로 간주하지 않는다.**
- 검수 결과의 판정이 PASS 이고 하드 게이트(아래)에 걸리지 않으면 Claude 가 `main` 반영까지 진행한다.

## 3. 대표 승인이 필요한 지점 (자동 왕복이 멈추는 곳)

- 운영 배포가 되는 `main` 반영 중 Codex 검수가 PASS 가 아닌 것
- 외부 게시·광고 변경·결제·데이터 삭제·운영 env 변경
- 본인 인증·로그인·2단계 인증 (대표만 가능)

## 4. Codex 한도가 없을 때

1. 대표가 Claude 대화창에 지시를 직접 입력한다 → Claude 가 `orders/<ID>.md` 로 옮겨 적는다 (출처: 대표 직접 입력).
2. 개발·테스트는 그대로 진행. 검수는 `codex-handoff.mjs review` 가 "검수 대기" 를 남긴다.
3. 한도가 돌아오면 같은 명령을 다시 실행 — 밀린 검수가 순서대로 처리된다 (`reviews/` 에 대기 표시가 있는 ID).
