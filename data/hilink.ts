/**
 * HILINK 콘텐츠
 * 성과 수치(매출 증가율 · 절감액 등)는 검증 전이므로 사용하지 않습니다.
 */

export const hilinkIntro = {
  title: "HILINK는 다짐의 현장 운영을 돕는\n자체 커뮤니티 운영 시스템입니다.",
  body: "입주민 앱, 관리자 화면(CRM), 안면인식 출입 단말기가 하나로 연결됩니다. 다짐이 운영하는 현장에서 직접 사용하며, 단지가 직접 운영하는 경우에도 시스템만 도입할 수 있습니다.",
};

/** 사용자별로 무엇이 달라지는지 */
export const hilinkForWhom = [
  {
    who: "입주민",
    items: ["집에서 앱으로 얼굴 등록 후 카드 없이 출입", "GX · 골프 타석 · 독서실 · 게스트룸 · 락커 예약", "이용권 · 이용 내역 · 정산 내역 확인", "공지사항을 앱으로 바로 수신"],
  },
  {
    who: "현장 운영자",
    items: ["회원 등록부터 이용권 · 방문 이력까지 한 화면에서 관리", "예약 현황을 실시간으로 확인", "락커 배정과 반납 관리", "민원을 접수 · 해결 · 검수 단계로 기록"],
  },
  {
    who: "관리사무소 · 입주자대표회의",
    items: ["중도 가입 · 해지 이용료 일할 계산으로 관리비 정산", "기간 · 종목 · 결제 방법별 매출 집계", "이용 현황 · 운영 지표 열람", "공지 수신 여부 집계"],
  },
];

/** 주요 기능 — 실제 제공 기능 */
export const hilinkFunctions = [
  { title: "회원 · 세대", body: "세대 확인 후 가입 · 승인 · 이용권 자동 발급" },
  { title: "안면인식 출입", body: "이용권이 없거나 만료되면 출입 제한" },
  { title: "시설 예약", body: "GX · 골프 타석 · 독서실 · 게스트하우스 · 락커" },
  { title: "결제 · 정산", body: "중도 가입 · 해지 일할 계산, 결제 방법별 집계" },
  { title: "관리비 부과", body: "이용 내역으로 세대별 부과 자료 생성" },
  { title: "통계 · 보고", body: "시설별 이용률 · 매출과 월간 보고 자료" },
];

/** 도입 절차 */
export const hilinkSteps = [
  { title: "현장 분석", body: "시설 · 세대수 · 출입 동선 확인" },
  { title: "설계 · 일정", body: "단말기 위치 · 앱 구성 · 일정 확정" },
  { title: "설치 · 등록", body: "단말기 설치, 회원 등록, 직원 교육" },
  { title: "안정화", body: "오픈 지원과 정기 점검 · 업데이트" },
];

/** 확장 기능 — 별도 협의 */
export const hilinkExtensions = ["주차 등록 (서류 앱 제출 · 관리사무소 승인)", "전자투표", "블루투스 공동현관 출입"];

/* ------------------------------------------------------------------
 * V2 — HILINK 쇼케이스
 * 화면은 기능 설명용 구성 예시입니다. 실제 캡처(public/images/hilink/*)가 들어오면 교체됩니다.
 * 예시 화면에는 수치 · 실명 · 현장명을 넣지 않습니다.
 * ---------------------------------------------------------------- */

export const hilinkHero = {
  eyebrow: "The operating system for community",
  title: "커뮤니티 운영의 모든 순간을\n하나의 플랫폼으로.",
  body: "입주민 앱, 관리자 CRM, 안면인식 단말기가 하나로 연결됩니다. 다짐이 운영하는 현장에서 매일 쓰는 시스템입니다.",
};

export type HilinkScreen = "member" | "face" | "access" | "reservation" | "payment" | "data";

export const hilinkStory: { no: string; en: string; ko: string; body: string; points: string[]; screen: HilinkScreen }[] = [
  {
    no: "01",
    en: "Member",
    ko: "회원 등록",
    body: "세대 · 회원 정보와 이용권, 방문 이력, 락커를 한 화면에서 관리합니다.",
    points: ["세대 단위 회원 관리", "이용권 · 방문 이력", "락커 배정 · 반납"],
    screen: "member",
  },
  {
    no: "02",
    en: "Face",
    ko: "얼굴 등록",
    body: "입주민이 집에서 앱으로 얼굴을 등록합니다. 관리사무소 방문이나 카드 발급이 필요 없습니다.",
    points: ["앱에서 직접 등록", "카드 대여 · 공유 방지"],
    screen: "face",
  },
  {
    no: "03",
    en: "Access",
    ko: "안면인식 출입",
    body: "등록한 얼굴로 출입합니다. 이용권이 없거나 만료되면 출입이 제한되고, 성별 · 시간대 · 구역별 권한을 나눌 수 있습니다.",
    points: ["이용권 연동 출입 제한", "성별 · 시간대 · 구역 권한"],
    screen: "access",
  },
  {
    no: "04",
    en: "Reservation",
    ko: "예약",
    body: "GX 수업, 골프 타석, 독서실 좌석, 게스트룸, 락커를 앱에서 예약합니다. 좌석은 선착순 또는 월별 추첨으로 배정합니다.",
    points: ["GX · 골프 타석 · 좌석", "게스트룸 · 락커", "선착순 · 추첨 배정"],
    screen: "reservation",
  },
  {
    no: "05",
    en: "Payment",
    ko: "이용료 · 결제",
    body: "관리 정책에 맞춰 중도 가입 · 해지 이용료를 일할 계산하고, 관리비 정산 자료를 만듭니다.",
    points: ["일할 계산", "관리비 정산 연동", "결제 방법별 집계"],
    screen: "payment",
  },
  {
    no: "06",
    en: "Data",
    ko: "운영 데이터",
    body: "이용 현황과 매출을 기간 · 종목 · 결제 방법별로 집계해 관리사무소 · 입주자대표회의와 같은 화면을 봅니다.",
    points: ["기간 · 종목별 집계", "공지 수신 확인", "민원 처리 단계 기록"],
    screen: "data",
  },
];

/** 쇼케이스에 표시할 화면 이름 */
export const hilinkScreens: { key: HilinkScreen | "admin"; label: string }[] = [
  { key: "admin", label: "관리자 CRM" },
  { key: "reservation", label: "입주민 앱 · 예약" },
  { key: "access", label: "안면인식 단말기" },
];
