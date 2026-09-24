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
    ko: "피트니스",
    description: "트레이너 상주, 기구 점검, PT·OT 프로그램까지 한 번에 운영합니다.",
    hilink: ["안면인식 출입", "이용권 관리"],
  },
  {
    key: "golf",
    en: "Golf",
    ko: "골프연습장",
    description: "타석 예약·레슨 스케줄·프로 배치를 데이터로 관리합니다.",
    hilink: ["타석 예약", "레슨 관리"],
  },
  {
    key: "gx",
    en: "GX",
    ko: "GX룸",
    description: "요가·필라테스·줌바 등 강좌 편성과 강사 운영을 맡습니다.",
    hilink: ["강좌 예약", "대기 순번"],
  },
  {
    key: "pilates",
    en: "Pilates",
    ko: "필라테스",
    description: "기구 필라테스 소그룹 수업과 강사 품질을 관리합니다.",
    hilink: ["정원 관리", "수업 예약"],
  },
  {
    key: "swimming",
    en: "Swimming",
    ko: "수영장",
    description: "안전요원 배치, 수질 관리 협조, 강습 프로그램을 운영합니다.",
    hilink: ["강습 예약", "자유수영 인원"],
  },
  {
    key: "sauna",
    en: "Sauna",
    ko: "사우나",
    description: "위생·안전 점검 루틴과 이용 시간 운영 기준을 세웁니다.",
    hilink: ["출입 기록", "이용 통계"],
  },
  {
    key: "study",
    en: "Study Room",
    ko: "독서실",
    description: "좌석 배정과 장기 점유 관리로 공정한 이용 환경을 만듭니다.",
    hilink: ["좌석 예약", "자동 퇴실"],
  },
  {
    key: "library",
    en: "Library",
    ko: "작은도서관",
    description: "도서 관리와 주민 문화 프로그램을 함께 기획합니다.",
    hilink: ["프로그램 신청", "공지"],
  },
  {
    key: "guesthouse",
    en: "Guest House",
    ko: "게스트하우스",
    description: "예약·청소·체크인 동선까지 호텔식 기준으로 운영합니다.",
    hilink: ["객실 예약", "결제"],
  },
  {
    key: "kids",
    en: "Kids",
    ko: "키즈카페",
    description: "보호자 동반 기준과 안전 수칙 중심으로 운영합니다.",
    hilink: ["시간제 예약", "출입 관리"],
  },
  {
    key: "cafe",
    en: "Cafe",
    ko: "카페",
    description: "입주민 카페 운영과 메뉴·위생 관리를 대행합니다.",
    hilink: ["매출 관리", "결제"],
  },
  {
    key: "lounge",
    en: "Community Lounge",
    ko: "커뮤니티 라운지",
    description: "대관·모임·행사 공간으로 활용도를 높입니다.",
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
