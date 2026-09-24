import type { IconName } from "./business";

export type HilinkFeatureIcon =
  | "members"
  | "face"
  | "calendar"
  | "gx"
  | "golf"
  | "seat"
  | "locker"
  | "payment"
  | "revenue"
  | "stats"
  | "notice"
  | "push"
  | "rental"
  | "lottery"
  | "dashboard";

export type HilinkFeature = {
  key: HilinkFeatureIcon;
  title: string;
  en: string;
  body: string;
};

export const hilinkFeatures: HilinkFeature[] = [
  { key: "members", title: "회원관리", en: "Members", body: "세대 · 가족 구성원 단위 등록과 이용권 · 이용 이력을 한 화면에서." },
  { key: "face", title: "안면인식 출입통제", en: "Face Access", body: "카드 없이 얼굴로 출입. 권한 · 시간 · 시설별 출입을 통제하고 기록합니다." },
  { key: "calendar", title: "강좌 예약", en: "Class Booking", body: "정원 · 대기 · 취소 규칙이 적용되는 강좌 예약." },
  { key: "gx", title: "GX 예약", en: "GX Booking", body: "요일별 GX 시간표와 실시간 잔여석." },
  { key: "golf", title: "골프 타석 예약", en: "Golf Bay", body: "타석별 시간 예약, 세대별 한도, 노쇼 제한." },
  { key: "seat", title: "좌석 예약", en: "Seat", body: "독서실 · 스터디 좌석 배정과 자동 퇴실." },
  { key: "locker", title: "락커 관리", en: "Locker", body: "락커 배정 · 기간 · 반납을 자동으로 관리." },
  { key: "payment", title: "결제", en: "Payment", body: "이용권 · 강좌 · 대관 결제와 관리비 연계 정산." },
  { key: "revenue", title: "매출관리", en: "Revenue", body: "시설 · 상품별 매출과 정산 자료를 자동 집계." },
  { key: "stats", title: "통계", en: "Analytics", body: "시간대 · 시설 · 세대별 이용 통계." },
  { key: "notice", title: "공지", en: "Notice", body: "단지 · 시설별 공지와 운영 안내." },
  { key: "push", title: "Push · 알림", en: "Push", body: "예약 확정 · 대기 전환 · 만료 알림 자동 발송." },
  { key: "rental", title: "대관", en: "Rental", body: "라운지 · 게스트하우스 · 회의실 대관 신청과 승인." },
  { key: "lottery", title: "추첨", en: "Lottery", body: "인기 강좌 · 대관의 공정한 추첨 배정." },
  { key: "dashboard", title: "관리자 Dashboard", en: "Admin", body: "운영자 · 관리사무소를 위한 실시간 운영 현황판." },
];

/** HILINK 페이지 기능 상세 섹션 (Dashboard UI 와 함께 노출) */
export const hilinkShowcase: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  visual: "dashboard" | "access" | "booking" | "analytics";
}[] = [
  {
    id: "access",
    eyebrow: "Access Control",
    title: "카드 없이, 얼굴로.\n출입이 곧 데이터가 됩니다.",
    body: "안면인식 단말기가 세대 · 이용권 · 시설 권한을 확인하고 출입을 기록합니다. 카드 대여와 외부인 출입 문제를 구조적으로 줄입니다.",
    points: ["세대 · 시설별 출입 권한", "이용권 만료 자동 차단", "출입 이력 조회"],
    visual: "access",
  },
  {
    id: "booking",
    eyebrow: "Reservation",
    title: "강좌 · 타석 · 좌석 · 대관.\n예약은 앱 하나로.",
    body: "입주민은 앱에서 예약하고, 운영자는 정원 · 대기 · 노쇼 규칙만 설정합니다. 전화와 수기 명부가 사라집니다.",
    points: ["GX · 강좌 예약과 대기", "골프 타석 · 독서실 좌석", "대관 신청 · 추첨"],
    visual: "booking",
  },
  {
    id: "dashboard",
    eyebrow: "Admin Dashboard",
    title: "오늘의 운영 현황을\n한 화면에서.",
    body: "실시간 출입 인원, 오늘의 예약, 만료 예정 회원, 매출을 관리자 대시보드에서 확인합니다.",
    points: ["실시간 이용 인원", "회원 · 이용권 · 락커", "공지 · Push 발송"],
    visual: "dashboard",
  },
  {
    id: "analytics",
    eyebrow: "Revenue & Analytics",
    title: "감이 아니라\n데이터로 운영합니다.",
    body: "시간대별 이용률, 시설별 매출, 강좌 예약률을 자동 집계해 입주자대표회의 · 관리사무소 보고 자료로 활용합니다.",
    points: ["시설 · 상품별 매출", "시간대 · 요일별 이용률", "월간 리포트 자료"],
    visual: "analytics",
  },
];

export const hilinkFlow: { en: string; ko: string; body: string; icon: IconName }[] = [
  { en: "Resident", ko: "입주민", body: "세대 인증 후 가족 구성원 등록", icon: "users" },
  { en: "HILINK App", ko: "HILINK 앱", body: "예약 · 결제 · 공지를 한 곳에서", icon: "platform" },
  { en: "Reservation / Access / Payment", ko: "예약 · 출입 · 결제", body: "안면인식 출입과 예약 · 결제 처리", icon: "scan" },
  { en: "DAGYM Operation Center", ko: "다짐 운영센터", body: "현장 인력과 운영 매니저가 대응", icon: "headset" },
  { en: "Data & Management", ko: "데이터 · 관리", body: "통계 · 리포트로 운영 개선", icon: "chart" },
];

export const hilinkAudiences: { title: string; body: string }[] = [
  { title: "입주민", body: "앱 하나로 예약 · 결제 · 출입 · 공지 확인." },
  { title: "현장 운영자", body: "출입 · 예약 · 락커 · 회원을 한 화면에서 처리." },
  { title: "관리사무소", body: "수기 업무 대신 자동 집계된 정산 · 이용 자료." },
  { title: "입주자대표회의", body: "월간 이용 · 매출 데이터로 근거 있는 의사결정." },
];
