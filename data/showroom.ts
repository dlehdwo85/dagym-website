import type { PhotoId } from "./photos";
import { TODO_VERIFY, type Verifiable } from "./config";

/**
 * V2 Digital Showroom 콘텐츠
 * - 문구는 다짐 제안서 · HILINK 소개서에 적힌 운영 방식을 바탕으로 새로 작성했습니다.
 * - 숫자 · 현장명 · 고객사는 확인된 값만 넣습니다. 모르면 TODO_VERIFY.
 */

export const hero = {
  eyebrow: "Community Operation & Technology",
  title: "공간을 운영하고,\n일상을 연결합니다.",
  sub: "아파트 커뮤니티부터 스포츠시설까지.\n현장 운영과 HILINK를 하나의 시스템으로 연결합니다.",
  /** 5초 안에 전달할 핵심 — 다짐이 직접 운영하는 시설 */
  facilities: ["피트니스", "골프", "GX", "수영", "사우나", "독서실", "카페", "게스트하우스"],
  /** 풀블리드 영상이 없을 때 첫 화면에서 교차 전환하는 사진 (원본 해상도 이하로만 표시) */
  slides: [
    { photo: "facility-fitness", label: "Fitness" },
    { photo: "facility-golf", label: "Golf" },
    { photo: "facility-library", label: "Study" },
  ] satisfies { photo: PhotoId; label: string }[],
};

export const statement = {
  eyebrow: "We operate the experience",
  title: "공간이 완성되는 순간은\n운영이 시작될 때입니다.",
  body: "좋은 시설도 사람이 없으면 비어 있고, 기록이 없으면 흐트러집니다. 다짐은 현장에 사람을 두고, 모든 운영을 HILINK로 기록합니다.",
  keywords: [
    { en: "Space", ko: "헬스장부터 게스트하우스까지, 단지의 모든 공용 시설" },
    { en: "People", ko: "안내 · 트레이너 · 강사 · 본사 운영 담당이 현장에" },
    { en: "Operation", ko: "주간 점검과 월간 보고로 이어지는 운영 기준" },
    { en: "Technology", ko: "출입 · 예약 · 회원 · 정산을 잇는 자체 플랫폼 HILINK" },
  ],
};

/**
 * 회사 수치 — 확인되기 전까지 TODO_VERIFY.
 * 방문자 화면에는 확인된 값만 노출됩니다. (검수 모드에서는 TODO_VERIFY 표시)
 */
export const companyMetrics: { en: string; ko: string; value: Verifiable<string>; unit: string }[] = [
  { en: "Operating Sites", ko: "운영 현장", value: TODO_VERIFY, unit: "곳" },
  { en: "Households", ko: "운영 세대", value: TODO_VERIFY, unit: "세대" },
  { en: "Facilities", ko: "운영 시설", value: TODO_VERIFY, unit: "개" },
  { en: "Years", ko: "운영 경력", value: TODO_VERIFY, unit: "년" },
];

/**
 * 운영 기준 — 제안서에 적힌 운영 방식 그대로 (실적 수치 아님).
 * 확인된 회사 수치가 없을 때 같은 자리에서 큰 타이포그래피로 보여줍니다.
 */
export const operatingStandards = [
  { big: "Weekly", ko: "본사 운영 담당 현장 방문", body: "현장 · 직원 · 데이터 · 프로그램 순으로 매주 점검" },
  { big: "Monthly", ko: "월간 운영 보고", body: "이용 현황, 정산, 민원 처리, 다음 달 계획" },
  { big: "12", ko: "운영 가능한 시설 유형", body: "헬스 · 골프 · GX · 수영 · 사우나 · 독서실 · 카페 등" },
  { big: "1", ko: "하나의 운영 플랫폼", body: "출입 · 예약 · 회원 · 정산을 HILINK 하나로" },
];

/** 사업 스토리텔링 — 사업 slug 별 영문명과 대표 이미지 */
export const businessStory: Record<string, { en: string; photo: PhotoId; line: string }> = {
  "apartment-community": { en: "Apartment Community", photo: "facility-cafe", line: "커뮤니티센터 전체를 한 회사가" },
  "sports-fitness": { en: "Sports & Fitness", photo: "facility-fitness", line: "수업 · 회원 · 시설 관리까지" },
  "community-facility": { en: "Community Facility", photo: "facility-gx", line: "기업 · 호텔 · 레지던스 공용 시설" },
  consulting: { en: "Consulting", photo: "facility-library", line: "쓰이지 않는 시설을 다시 쓰이게" },
  equipment: { en: "Equipment & Space", photo: "facility-golf", line: "운영해 본 회사가 고르는 기구" },
};

/** 아파트 커뮤니티 생태계 — 다짐이 운영하는 시설 */
export const ecosystem: { en: string; ko: string; photo?: PhotoId; note: string }[] = [
  { en: "Fitness", ko: "헬스장", photo: "facility-fitness", note: "트레이너 · OT · PT · 기구 점검" },
  { en: "Golf", ko: "골프연습장", photo: "facility-golf", note: "프로 레슨 · 타석 예약" },
  { en: "GX", ko: "GX · 필라테스", photo: "facility-gx", note: "수요 조사 · 분기 수업표" },
  { en: "Pool", ko: "수영장", note: "강습 · 자유수영 인원 관리" },
  { en: "Sauna", ko: "사우나", note: "위생 · 성별 출입 권한" },
  { en: "Library", ko: "작은도서관", note: "도서 · 독서 프로그램" },
  { en: "Study", ko: "독서실 · 스터디룸", photo: "facility-library", note: "좌석 예약 · 월별 추첨" },
  { en: "Guesthouse", ko: "게스트하우스", note: "객실 예약 · 결제 · 청소" },
  { en: "Kids", ko: "키즈카페", note: "시간제 이용 · 안전 수칙" },
  { en: "Cafe", ko: "카페", photo: "facility-cafe", note: "유인 · 무인 운영, 재고 관리" },
];

/** 운영 모델 6단계 */
export const operatingModel = [
  { en: "Site Analysis", ko: "현장 분석", body: "시설 현황, 세대수와 이용 인원, 출입 동선, 기존 운영 방식을 확인합니다." },
  { en: "Operation Design", ko: "운영 설계", body: "시설별 운영 시간, 인력 구성, 프로그램, 이용료 부과 방식을 설계합니다." },
  { en: "Staffing", ko: "인력 배치", body: "안내 · 트레이너 · 강사를 채용하고 서비스 · 안전 교육 후 배치합니다." },
  { en: "System Setup", ko: "HILINK 구축", body: "안면인식 단말기 설치, 회원 등록, 출입 권한과 예약 규칙을 설정합니다." },
  { en: "On-site Operation", ko: "현장 운영", body: "오픈 초기에는 본사 인력이 함께 상주하며 운영을 안정화합니다." },
  { en: "Data & Improvement", ko: "데이터 · 개선", body: "주간 점검과 월간 보고, 이용 데이터로 수업과 운영 시간을 조정합니다." },
];

/** PEOPLE × TECHNOLOGY — 현장 역할과 HILINK 기능의 연결 */
export const peopleTech: { person: string; personEn: string; tech: string; techEn: string; link: string }[] = [
  { person: "센터 매니저", personEn: "Manager", tech: "통계 · 운영 데이터", techEn: "Data", link: "이용 · 매출 현황을 보고 운영을 조정합니다" },
  { person: "트레이너", personEn: "Trainer", tech: "회원관리 · 이용권", techEn: "Member", link: "OT · PT 이력을 회원 정보에 남깁니다" },
  { person: "골프 프로", personEn: "Golf Pro", tech: "타석 예약 · 레슨", techEn: "Reservation", link: "타석과 레슨 시간을 앱 예약으로 운영합니다" },
  { person: "GX 강사", personEn: "Instructor", tech: "강좌 · 수업 예약", techEn: "Class", link: "정원 · 대기 순번을 시스템이 관리합니다" },
  { person: "안내데스크", personEn: "Front Desk", tech: "안면인식 · 결제 · 공지", techEn: "Access", link: "카드 없이 출입하고, 공지는 앱으로 보냅니다" },
  { person: "시설관리", personEn: "Facility", tech: "좌석 · 락커", techEn: "Seat & Locker", link: "좌석 · 락커 배정과 반납을 기록합니다" },
];
