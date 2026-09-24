# 필요한 사진 목록

사진 파일을 아래 **파일 경로** 그대로 `public/` 아래에 넣고 다시 배포하면 자동으로 사이트에 표시됩니다. 코드는 수정하지 않아도 됩니다.
전체 목록과 설명은 `data/photos.ts` 에 있습니다.

- **다짐이 실제 운영하는 현장 사진만** 사용합니다. AI 생성 이미지, 스톡 사진, 다른 회사 사진은 쓰지 않습니다.
- 입주민 얼굴이 알아볼 수 있게 나온 사진은 동의를 받은 경우에만 사용합니다.
- 앱 · 관리자 화면 캡처는 이름 · 연락처 · 동호수를 가린 뒤 사용합니다.
- 사진이 없는 동안: 첫 화면은 단색 배경, 나머지 사진 영역은 방문자에게 보이지 않습니다.
- 사진 자리를 미리 확인하려면 `npm run dev` 또는 `NEXT_PUBLIC_SHOW_PHOTO_SLOTS=1 npm run build && npm start` 로 실행합니다.

| 우선순위 | 파일 경로 (public/…) | 필요한 장면 | 권장 크기 · 비율 | 사용 위치 |
| --- | --- | --- | --- | --- |
| ★ 1 | `images/home/hero.jpg` | 운영 중인 커뮤니티 헬스장 또는 골프연습장 전경 (밝은 조명, 사람 1~2명 또는 무인) | 2400×1400 이상, 가로형. 모바일에서 세로로 잘리므로 주요 피사체를 가운데에 | 홈 첫 화면 |
| ★ 2 | `images/home/apartment-community.jpg` | 커뮤니티센터 인포메이션 데스크 또는 라운지 | 1600×1200, 4:3 | 홈 사업영역 |
| ★ 3 | `images/home/sports-facility.jpg` | 헬스장 또는 스크린골프 타석 | 1600×1200, 4:3 | 홈 사업영역 |
| ★ 4 | `images/home/field-work.jpg` | 트레이너 OT, 기구 점검, 인포메이션 응대 중 하나 | 1600×2000, 4:5 세로 | 홈 현장 업무 |
| 5 | `images/hilink/app-screen.png` | HILINK 입주민 앱 실제 화면 (예약 또는 얼굴 등록) | 휴대폰 원본 캡처 1170×2532 | 홈 HILINK · HILINK 페이지 |
| 6 | `images/hilink/admin-screen.png` | HILINK 관리자(CRM) 실제 화면 | 2560×1600, 16:10 | HILINK 페이지 |
| 7 | `images/hilink/face-device.jpg` | 현장에 설치된 안면인식 단말기 | 1600×2000, 4:5 | HILINK 페이지 |
| 8 | `images/company/team.jpg` | 직원 단체 사진 또는 본사 회의 | 2000×1250, 16:10 | 회사소개 |
| 9 | `images/business/apartment-community.jpg` | 커뮤니티센터 전경 또는 GX 수업 | 2400×1200, 2:1 | 아파트 커뮤니티 위탁운영 상세 |
| 10 | `images/business/sports-fitness.jpg` | 헬스장 · 골프연습장 전경 | 2400×1200, 2:1 | 스포츠 · 피트니스 상세 |
| 11 | `images/business/community-facility.jpg` | 기업 · 호텔 피트니스 또는 라운지 | 2400×1200, 2:1 | 기업 · 호텔 커뮤니티 상세 |
| 12 | `images/business/consulting.jpg` | 시설 개선 전후 또는 현장 실사 | 2400×1200, 2:1 | 운영 컨설팅 상세 |
| 13 | `images/business/equipment.jpg` | 설치한 운동기구 또는 스크린골프 타석 | 2400×1200, 2:1 | 기구 납품 상세 |

제안서(Google Drive)에 실제 현장 사진이 들어 있다면, 원본 사진 파일을 위 경로 이름으로 저장해 전달해 주세요.
(제안서 파일이 10MB를 넘어 이번 작업 환경에서는 사진을 추출하지 못했습니다.)

## 커뮤니티 시설 사진 · 영상 (홈 · 아파트 커뮤니티 위탁운영 "운영 시설" 갤러리)

기존 사이트(dagym1.com) 자산을 우선 사용합니다. 조사 결과와 확보 방법은 `docs/LEGACY_ASSETS.md` 를 참고하세요.
갤러리는 **실제 사진 · 영상이 3개 시설 이상**일 때만 방문자에게 표시됩니다. 한 시설에는 영상 또는 사진 하나만 쓰며, 영상이 있으면 영상을 우선합니다.

| 시설 | 사진 (public/…) | 영상 (public/…) |
| --- | --- | --- |
| 수영장 | `images/facilities/pool.jpg` | — |
| 헬스장 | `images/facilities/fitness.jpg` | `videos/fitness.mp4` + `videos/fitness.jpg` |
| 골프연습장 | `images/facilities/golf.jpg` | `videos/golf.mp4` + `videos/golf.jpg` |
| GX룸 | `images/facilities/gx.jpg` | `videos/gx.mp4` + `videos/gx.jpg` |
| 카페 | `images/facilities/cafe.jpg` | `videos/cafe.mp4` + `videos/cafe.jpg` |
| 작은도서관 | `images/facilities/library.jpg` | `videos/library.mp4` + `videos/library.jpg` |
| 게스트하우스 | `images/facilities/guesthouse.jpg` | `videos/guesthouse.mp4` + `videos/guesthouse.jpg` |

영상은 포스터 이미지(JPG)가 함께 있어야 표시됩니다. 자동재생하지 않으며, 재생 버튼을 누르기 전에는 영상 데이터를 받지 않습니다.
원본 파일 대신 YouTube 등으로 삽입하려면 `data/videos.ts` 의 `embedUrl` 에 삽입 주소를 넣고 포스터 이미지를 추가합니다.
