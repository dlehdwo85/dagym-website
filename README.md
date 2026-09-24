# DAGYM 공식 홈페이지

주식회사 다짐(DAGYM)의 기업 홈페이지입니다.
**아파트 커뮤니티와 스포츠시설을 현장 인력이 직접 운영하고, 자체 시스템 HILINK로 출입 · 예약 · 회원을 관리한다**는 점을 시행사 · 입주자대표회의 · 관리사무소가 이해하고 상담을 신청하도록 설계했습니다.

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- 밝은 배경, 한글 제목, 딥 네이비 한 가지 브랜드 컬러. 장식 그래픽 · 가상 대시보드 없음
- 사진은 `data/photos.ts` 의 경로에 파일을 넣으면 자동 노출 (없으면 숨김)
- 확인된 정보만 공개 (운영 현장 · 수치 · 연락처는 확인 후 입력)

| 문서 | 내용 |
| --- | --- |
| `docs/PHOTOS.md` | 필요한 사진 목록 · 권장 크기 · 파일 경로 |
| `docs/CONTACT_SETUP.md` | 문의 접수 설정 (구글 시트 + 메일 알림) · 검증 방법 |
| `docs/MATERIALS_NEEDED.md` | 다짐에서 확인 · 제공해야 하는 자료 |

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
| `/` | 현장 사진 첫 화면 · 사업영역 · 현장 업무와 운영 프로세스 · 운영 현장/시설 · HILINK · 상담 |
| `/company` | 회사 소개 · 일하는 방식 · 운영 체계 · 회사 개요 (연혁 · 협력사는 입력 시 노출) |
| `/business` · `/business/[slug]` | 사업영역 5개. 상세: 대상 고객 · 운영 시설 · 인력 구성 · 프로그램 · 회원 응대 · 출입/예약 · 시설 관리 · 운영 보고 · 위탁 범위 |
| `/hilink` | 사용자별 기능 · 주요 기능 · 도입 절차 · FAQ (실제 화면은 파일이 있을 때만) |
| `/projects` | 확인된 운영 현장만 노출. 없으면 운영 시설 목록 표시, 메뉴 · 사이트맵에서 제외 |
| `/insight` | 자주 묻는 질문 · 공지 |
| `/contact` | 상담 신청서. 접수 경로가 설정된 경우에만 제출 가능 |

## 콘텐츠 수정

모든 문구는 `data/` 에 있습니다 — `business.ts`(사업영역 상세), `home.ts`, `company.ts`, `hilink.ts`, `facilities.ts`, `insight.ts`(FAQ · 공지), `projects.ts`(운영 현장), `config.ts`(회사 정보), `photos.ts`(사진 목록).

사업영역 · HILINK 문구는 다짐 내부 자료(커뮤니티 운영 제안서, 하이링크 서비스 소개서)의 운영 방식 설명을 바탕으로 작성했습니다. 제안서의 성과 수치(매출 증가율, 재계약률 등)와 현장명은 확인 전이라 사용하지 않았습니다.

## 배포 체크리스트

- [ ] 문의 접수 경로 설정 후 `/api/contact` 가 `ready:true` 인지, 테스트 신청이 시트 · 메일에 도착하는지 확인 (`docs/CONTACT_SETUP.md`)
- [ ] 첫 화면 사진 등 우선순위 사진 추가 (`docs/PHOTOS.md`)
- [ ] 회사 정보 입력 (`data/config.ts`)
- [ ] 개인정보처리방침 법무 검토
- [ ] `NEXT_PUBLIC_SITE_URL` 설정
