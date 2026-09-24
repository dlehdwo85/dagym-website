/**
 * 다짐이 운영할 수 있는 커뮤니티 시설 유형.
 * image 에 실제 현장 사진 경로(/public/images/facilities/...)를 넣으면 placeholder 대신 사진이 노출됩니다.
 */

export type FacilityIcon =
  | "fitness"
  | "golf"
  | "gx"
  | "pilates"
  | "swimming"
  | "sauna"
  | "study"
  | "library"
  | "guesthouse"
  | "kids"
  | "cafe"
  | "lounge"
  | "office"
  | "culture";

export type Facility = {
  key: FacilityIcon;
  en: string;
  ko: string;
  description: string;
  hilink: string[];
  image?: string;
};

export const facilities: Facility[] = [
  {
    key: "fitness",
    en: "Fitness",
    ko: "헬스장",
    description: "트레이너 배치, 입주민 OT · PT, 기구 매일 청소와 주간 점검, 스트레칭 존 운영",
    hilink: ["안면인식 출입", "이용권 관리"],
  },
  {
    key: "golf",
    en: "Golf",
    ko: "골프연습장",
    description: "골프 프로 레슨, 앱 타석 예약, 이용 시간 관리, 스크린 타석 전환 검토",
    hilink: ["타석 예약", "레슨 관리"],
  },
  {
    key: "gx",
    en: "GX",
    ko: "GX룸",
    description: "수요 조사로 수업 선정, 분기 수업 계획표 게시, 강사 채용과 만족도 조사",
    hilink: ["강좌 예약", "대기 순번"],
  },
  {
    key: "pilates",
    en: "Pilates",
    ko: "필라테스",
    description: "매트 · 기구 필라테스 소그룹 수업과 강사 관리",
    hilink: ["정원 관리", "수업 예약"],
  },
  {
    key: "swimming",
    en: "Swimming",
    ko: "수영장",
    description: "강습 프로그램 운영과 이용 시간 관리",
    hilink: ["강습 예약", "자유수영 인원"],
  },
  {
    key: "sauna",
    en: "Sauna",
    ko: "사우나",
    description: "위생 · 안전 점검과 성별 출입 권한 관리",
    hilink: ["출입 기록", "이용 통계"],
  },
  {
    key: "study",
    en: "Study Room",
    ko: "독서실 · 스터디룸",
    description: "앱 · 키오스크 좌석 예약, 선착순 또는 월별 추첨 배정, 좌석 정리와 공기 관리",
    hilink: ["좌석 예약", "자동 퇴실"],
  },
  {
    key: "library",
    en: "Library",
    ko: "작은도서관",
    description: "도서 관리와 방과 후 · 영유아 독서 프로그램",
    hilink: ["프로그램 신청", "공지"],
  },
  {
    key: "guesthouse",
    en: "Guest House",
    ko: "게스트하우스",
    description: "앱 객실 예약과 결제, 청소 · 비품 관리",
    hilink: ["객실 예약", "결제"],
  },
  {
    key: "kids",
    en: "Kids",
    ko: "키즈카페",
    description: "시간제 이용 관리와 안전 수칙 운영",
    hilink: ["시간제 예약", "출입 관리"],
  },
  {
    key: "cafe",
    en: "Cafe",
    ko: "카페",
    description: "유인 또는 무인카페 운영, 비품 · 재고 관리",
    hilink: ["매출 관리", "결제"],
  },
  {
    key: "lounge",
    en: "Community Lounge",
    ko: "다목적실 · 라운지",
    description: "동호회 · 행사 · 대관 운영",
    hilink: ["대관 신청", "추첨"],
  },
];

/** 아파트 커뮤니티 상세 페이지에서 추가로 노출하는 시설 */
export const extraFacilities: Facility[] = [
  {
    key: "office",
    en: "Shared Office",
    ko: "공유오피스",
    description: "좌석·회의실 예약과 출입 권한을 세대 단위로 관리합니다.",
    hilink: ["좌석 예약", "회의실 대관"],
  },
  {
    key: "culture",
    en: "Culture",
    ko: "문화시설",
    description: "주민 강좌와 문화 프로그램을 기획하고 운영합니다.",
    hilink: ["프로그램 신청", "추첨"],
  },
];

export function getFacility(key: FacilityIcon): Facility | undefined {
  return [...facilities, ...extraFacilities].find((f) => f.key === key);
}
