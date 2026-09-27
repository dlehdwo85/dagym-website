@AGENTS.md

# 운영 절차 (주식회사 다짐 웹사이트)

별도 지시가 없는 한 모든 작업은 이 절차를 따른다.
기본 원칙 (2026-09-27 사용자 지시): **수정 → 검증 → main push → 운영 확인 → 필요 시 즉시 재수정.**
Preview는 필수 승인 절차가 아니며, 사용자 승인을 기다리며 멈추지 않는다. 이전 지시서의 "승인 후 main 병합" 문구보다 이 원칙이 우선한다.

- 저장소: `dlehdwo85/dagym-website` · Production 기준 브랜치: `main`
- Vercel 프로젝트: `dagym-website-3532` (구형 `dagym-website` 프로젝트는 건드리지 않음)
- 공식 운영 도메인: `www.dagym-in.co.kr` (대표) · `dagym-in.co.kr`

## 절차

1. 최신 `main`에서 작업한다 (작업 브랜치를 쓰면 검증 직후 곧바로 main에 merge — 장기간 대기하지 않는다).
2. 수정한다. Preview는 대규모 구조 변경 · 빌드 실패 조사 · 복구가 어려운 변경 등 내부 검증이 꼭 필요할 때만 쓴다.
3. 검증: typecheck (`npx tsc --noEmit`) · lint (`npx eslint .`) · production build (`npx next build`) ·
   주요 route · 이미지 404 · 콘솔 / hydration 오류 · 모바일(390) / 태블릿(768) / PC(1280 · 1440) 주요 화면.
4. 검증이 하나라도 실패하면 `main`에 merge하지 않는다.
5. 통과하면 최신 `main`과 동기화하고, 충돌이 없으면 `main`에 merge한다.
   충돌 시 최신 작업 의도를 보존해 해결하고 전체 검증을 다시 한다.
6. `main`을 origin에 push한다.
7. Vercel이 `main` push로 Production Deployment를 만들었는지, `Ready`인지 확인하고 Production URL을 확인한다.
   공식 도메인 연결 후에는 `www.dagym-in.co.kr` 최신 반영까지 확인한다.
8. Production이 자동 생성되지 않으면 원인을 확인하고, 도구 / 권한이 있으면 직접 배포,
   없으면 필요한 수동 조치만 정확히 보고한다.
9. 운영 사이트에서 문제가 발견되면 코드 수정 → build → main push → 재배포 (후속 commit으로 즉시 수정).

## main에 자동 반영하지 않는 경우

- 사용자가 "이번 건은 Preview까지만"이라고 요청한 경우
- 빌드 또는 주요 화면 검증이 실패한 경우 (고친 뒤 다시 검증하고 반영)

오래된 브랜치나 Vercel 프로젝트는 임의로 삭제하지 않는다.

## 완료 기준과 보고

완료 = 수정 → 검증 → main push → Vercel Production Ready → 운영 도메인 최신 반영 · 확인. "승인 대기"를 기본 상태로 두지 않는다.

완료 보고 항목: 작업 브랜치 · 최종 commit SHA · 검증 결과 · main merge 여부 · main push 여부 ·
Vercel Production 생성 여부 · Production 상태 · Production URL · 공식 도메인 최신 반영 여부 · 별도 수동 조치 필요 여부
