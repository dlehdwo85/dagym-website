/** HOME 콘텐츠 — 짧은 제목 중심. 세부 설명은 상세 페이지로 보냅니다. */

export const homeHero = {
  label: "아파트 커뮤니티 위탁운영",
  title: "아파트 커뮤니티센터,\n다짐이 운영합니다.",
  sub: "헬스장부터 카페 · 독서실까지, 현장 인력과 운영 시스템으로 맡아 관리합니다.",
  primary: { label: "운영 문의하기", href: "/contact" },
  secondary: { label: "위탁운영 범위 보기", href: "/business/apartment-community" },
};

/**
 * 홈 "운영 시설" 사진 — 기존 다짐 홈페이지에 게시된 시설 이미지.
 * 촬영 단지 · 권한이 확인되지 않았으므로 시설명만 표기하고 특정 현장 실적으로 표기하지 않습니다.
 * 첫 화면에서 쓴 카페 사진은 여기서 반복하지 않습니다.
 */
export const homeFacilities = [
  { name: "헬스장", photo: "facility-fitness" },
  { name: "필라테스 · GX", photo: "facility-gx" },
  { name: "골프연습장", photo: "facility-golf" },
  { name: "독서실", photo: "facility-library" },
] as const;

/** 운영 방식 — 한 줄씩. 인력 구성 · 관리 주기 상세는 아파트 커뮤니티 위탁운영 페이지에 있습니다. */
export const homeOperation = [
  { title: "현장 상주 인력", body: "안내 · 트레이너 · 강사", href: "/business/apartment-community#staffing" },
  { title: "시설 · 기구 관리", body: "청소와 정기 점검", href: "/business/apartment-community#care" },
  { title: "본사 점검 · 보고", body: "매주 방문, 매월 보고", href: "/business/apartment-community#reporting" },
];

// 아래 값은 다른 페이지(사업영역 등)에서 사용합니다.
export const fieldWork = [
  { role: "인포메이션", tasks: ["회원 등록과 시설 이용 안내", "민원 접수와 처리 결과 기록", "공지 발송, 카페 오픈 · 마감 지원"] },
  { role: "트레이너", tasks: ["입주민 무료 OT와 운동일지 제공", "PT 수업과 기구 안전 지도", "기구별 사용법 QR 안내"] },
  { role: "GX 강사 · 골프 프로", tasks: ["수요 조사로 정한 GX 수업 진행", "골프 레슨과 타석 운영", "분기별 수업 계획표 게시"] },
  { role: "본사 운영 담당", tasks: ["매주 현장 방문 점검", "직원 채용 · 교육, 결원 시 대체 인력", "월간 운영 보고"] },
];

export const operationProcess = [
  { title: "현장 분석", body: "시설 현황, 세대수와 이용 인원, 출입 동선, 기존 운영 방식을 확인하고 관리사무소 · 입주자대표회의 의견을 듣습니다." },
  { title: "운영안 제안", body: "시설별 운영 시간, 인력 구성, 프로그램, 이용료 부과 방식을 비교해 제안합니다." },
  { title: "인력 배치 · 교육", body: "인포메이션 · 트레이너 · 강사를 채용하고 서비스 · 안전 교육을 마친 뒤 배치합니다." },
  { title: "HILINK 설치", body: "안면인식 단말기 설치, 회원 데이터 등록, 시설별 출입 권한과 예약 규칙을 설정합니다." },
  { title: "운영 시작", body: "오픈 초기에는 본사 인력이 현장을 함께 지원합니다." },
  { title: "정기 점검 · 보고", body: "매주 본사 방문 점검과 매월 운영 보고로 운영을 개선합니다." },
];

export const weeklyVisit = [
  { week: "1주차", title: "현장 점검", body: "시설 · 기구 상태, 청결, 안전" },
  { week: "2주차", title: "직원 관리", body: "근무 상태, 응대 품질, 교육" },
  { week: "3주차", title: "데이터 점검", body: "이용 현황, 예약 · 정산, 민원" },
  { week: "4주차", title: "프로그램 · 이벤트", body: "수업 만족도, 다음 달 행사" },
];
