import type { PhotoId } from "./photos";
import { TODO_VERIFY, type Verifiable } from "./config";

/**
 * V3 기업 사이트 콘텐츠 (단일 소스)
 *
 * 공개 가능한 회사 구조 · 운영 방식만 담습니다. 단가 · 인건비 · 매출 · 근거 없는 수치 ·
 * 공개 승인되지 않은 현장 · 협력사 정보는 이 파일(공개 저장소)에 넣지 않습니다.
 *
 * publicationStatus
 *   PUBLIC_SAFE            — 공개 가능한 회사 · 서비스 정보
 *   VERIFY_BEFORE_PUBLISH  — 실적 · 수치 · 파트너 · 프로젝트. 확인 전에는 화면에 노출하지 않음
 *   INTERNAL_ONLY          — 입찰 단가 · 원가 · 인건비 · 수익 시뮬레이션 · 현장 내부 조건 (저장소에 넣지 않음)
 */
export type PublicationStatus = "PUBLIC_SAFE" | "VERIFY_BEFORE_PUBLISH" | "INTERNAL_ONLY";

/* ------------------------------------------------------------------
 * 회사 사실 (Company facts)
 * ---------------------------------------------------------------- */
export type CompanyFact = { key: string; label: string; value: Verifiable<string>; status: PublicationStatus; note?: string };

export const companyFacts: CompanyFact[] = [
  { key: "name", label: "회사명", value: "주식회사 다짐 (DAGYM Co., Ltd.)", status: "PUBLIC_SAFE" },
  { key: "founded", label: "설립", value: TODO_VERIFY, status: "VERIFY_BEFORE_PUBLISH", note: "등기 기준 확인 후 입력" },
  { key: "hq", label: "본사 소재지", value: TODO_VERIFY, status: "VERIFY_BEFORE_PUBLISH", note: "상세 주소 확인 후 입력" },
  { key: "sites", label: "운영 현장", value: TODO_VERIFY, status: "VERIFY_BEFORE_PUBLISH", note: "현재 운영 중 · 공개 동의 현장 수" },
  { key: "households", label: "운영 세대수", value: TODO_VERIFY, status: "VERIFY_BEFORE_PUBLISH", note: "현재 운영 현장 합계" },
  { key: "ceo", label: "대표", value: TODO_VERIFY, status: "VERIFY_BEFORE_PUBLISH", note: "대표 공개 범위 확인 필요" },
];

/** 방문자 화면에 노출 가능한 사실만 */
export function publicFacts() {
  return companyFacts.filter((f) => f.status === "PUBLIC_SAFE" && f.value !== TODO_VERIFY);
}

/* ------------------------------------------------------------------
 * HOME
 * ---------------------------------------------------------------- */
export const homeHero = {
  eyebrow: "COMMUNITY OPERATION & PLATFORM",
  title: "공간을 운영하고,\n운영을 시스템으로 연결합니다.",
  sub: "아파트 커뮤니티 전문 운영부터\n자체 플랫폼 HILINK 구축까지.",
  /** 와이드 Hero 이미지 (생성 브랜드 비주얼 — 실제 현장 아님) */
  image: "hero-community-lobby" as PhotoId,
  /** split: 텍스트 왼쪽 · 공간 사진 오른쪽 패널 / wide: 전체 배경 */
  layout: "wide" as "split" | "wide",
  tone: "light" as "light" | "dark",
  ctas: [
    { label: "커뮤니티 운영", href: "/business" },
    { label: "HILINK", href: "/hilink" },
  ],
};

/** 기업 신뢰 근거 — 구조적 사실(PUBLIC_SAFE). 실적 수치는 companyFacts 에서 확인 후 추가 */
export const proofItems = [
  { value: "2", unit: "대 핵심사업", label: "커뮤니티 위탁운영 · HILINK 플랫폼 구축", status: "PUBLIC_SAFE" as PublicationStatus },
  { value: "5", unit: "개 전문 부서", label: "본사가 운영 전 과정에 직접 참여", status: "PUBLIC_SAFE" as PublicationStatus },
  { value: "12", unit: "종 시설", label: "헬스 · 골프 · GX부터 키즈 · 카페 · 게스트하우스까지", status: "PUBLIC_SAFE" as PublicationStatus },
  { value: "자체", unit: "운영 플랫폼", label: "회원 · 출입 · 예약 · 정산 · 보고를 HILINK로", status: "PUBLIC_SAFE" as PublicationStatus },
];

/**
 * 핵심사업 2개 (Core Business)
 * 시설 개선 · 운동기구 납품 · 스크린골프 구축은 핵심사업이 아닌 보조 서비스(supportingService)로만 노출합니다.
 */
export const coreBusinesses = [
  {
    no: "01",
    en: "Community Operation",
    title: "커뮤니티 시설 전문 위탁운영",
    lead: "아파트 · 기업 · 호텔 커뮤니티와 스포츠시설을 전문 인력과 본사 관리체계로 직접 운영합니다.",
    items: ["시설별 운영 인력 채용 · 교육 · 배치", "프로그램 · 이벤트 · 입주민 활성화", "시설 · 기구 유지관리와 안전 점검", "관리사무소 · 입주자대표회의 정기 보고"],
    links: [
      { label: "공동주택 커뮤니티 위탁운영", href: "/business/apartment-community" },
      { label: "스포츠 · 피트니스 시설 운영", href: "/business/sports-fitness" },
      { label: "기업 · 호텔 · 복합시설 운영", href: "/business/community-facility" },
      { label: "운영 컨설팅 · 활성화", href: "/business/consulting" },
    ],
    cta: { label: "커뮤니티 운영 보기", href: "/business" },
    photo: "facility-fitness" as PhotoId,
  },
  {
    no: "02",
    en: "HILINK Platform",
    title: "커뮤니티 운영 플랫폼 구축 · 납품",
    lead: "회원 · 출입 · 예약 · 결제 · 정산 · 보고를 연결하는 자체 플랫폼 HILINK를 구축해 공급합니다. 다짐이 운영하는 현장에서 먼저 쓰고 다듬은 시스템입니다.",
    items: ["입주민 앱 · 관리자 CRM", "안면인식 단말기 연동 출입", "시설 예약 · 이용권 · 정산", "관리비 부과 자료 · 월간 보고"],
    links: [
      { label: "HILINK 플랫폼 소개", href: "/hilink" },
      { label: "HILINK 도입 문의", href: "/contact?type=hilink" },
    ],
    cta: { label: "HILINK 보기", href: "/hilink" },
  },
];

/** 보조 서비스 — 핵심사업과 같은 무게로 노출하지 않음 */
export const supportingService = {
  en: "Facility Support",
  title: "시설 지원",
  lead: "운영 중 필요할 때 운동기구 보강 · 교체, 스크린골프 타석 구축, 공간 환경 개선을 함께 진행합니다.",
  href: "/business/equipment",
};

/** 운영 시스템 8단계 */
export const operationSteps = [
  { no: "01", title: "현장 진단", body: "시설 · 이용 동선 · 기존 운영 방식과 민원 이력을 직접 확인합니다." },
  { no: "02", title: "운영 설계", body: "시설별 운영 시간, 인력 구성, 프로그램, 이용료 부과 방식을 설계합니다." },
  { no: "03", title: "인력 배치", body: "안내 · 트레이너 · 강사 · 골프 프로를 채용하고 교육 후 배치합니다." },
  { no: "04", title: "시설 · 프로그램 구축", body: "필요한 기구 보강과 공간 개선, 수업 · 이벤트 계획을 준비합니다." },
  { no: "05", title: "HILINK 적용", body: "회원 등록, 출입 권한, 예약 규칙, 부과 기준을 시스템에 설정합니다." },
  { no: "06", title: "운영 · 점검", body: "일 · 주 · 분기 체크리스트로 시설과 기구를 점검하며 운영합니다." },
  { no: "07", title: "보고 · 데이터 분석", body: "이용 · 정산 · 민원 데이터를 정리해 정기적으로 보고합니다." },
  { no: "08", title: "개선", body: "만족도 조사와 이용 데이터로 수업 · 시간 · 공간을 조정합니다." },
];

/* ------------------------------------------------------------------
 * 본사 운영체계
 * ---------------------------------------------------------------- */
export const hqFlow = [
  { en: "Site", ko: "현장" },
  { en: "On-site Team", ko: "현장 운영팀" },
  { en: "HQ Operation", ko: "본사 운영" },
  { en: "Data", ko: "데이터" },
  { en: "Report", ko: "보고" },
  { en: "Improvement", ko: "개선" },
];

export const hqDepartments = [
  { name: "운영기획부", role: "운영기획", items: ["신규 현장 오픈", "현장 파악 · 분석", "운영 시스템 구축"] },
  { name: "경영관리본부", role: "인사 · 노무", items: ["인사 관리", "노무 및 계약 관리", "사내 자료 통합 관리"] },
  { name: "총무회계부", role: "회계 · 정산", items: ["회계 관리", "경리 및 비용 정산", "세무 신고 및 관리"] },
  { name: "영업전략부", role: "영업 · 홍보", items: ["홍보물 기획 · 제작", "웹사이트 관리", "이벤트 · 프로모션"] },
  { name: "전략기획본부", role: "교육 · 품질", items: ["직원 역량 개발", "경영 · 기술 통합", "시설 총괄"] },
];

export const hqSupportLine = "경영지원실이 대표 직속으로 부서를 조율하고, 법률 · 노무 · 세무 전문 법인과 협업합니다.";

export const weeklyCycle = [
  { week: "1주차", title: "현장 관리", body: "시설 · 기구 상태, 청결, 안전 점검" },
  { week: "2주차", title: "직원 관리", body: "근무 상태 · 응대 품질 · 교육" },
  { week: "3주차", title: "데이터 관리", body: "이용 · 예약 · 정산 · 민원 데이터 확인" },
  { week: "4주차", title: "이벤트 관리", body: "수업 만족도, 다음 달 행사 · 프로그램" },
];

export const communication = [
  { who: "입주민", channels: ["HILINK 앱 공지 · 1:1 문의", "현장 소통함", "단지 오픈 채팅방 (단지 협의 시)"] },
  { who: "관리사무소 · 입주자대표회의", channels: ["주간 보고 (청소 · 시설 현황)", "월간 운영 보고", "HILINK 관리자 화면 열람"] },
];

export const staffTraining = ["서비스 역량 교육", "안전 교육 (CPR)", "PT · 수업 전문성 교육", "재활 · 교정 교육", "골프 프로 티칭 · 장비 관리 교육"];

/* ------------------------------------------------------------------
 * 운영 개선 (Operation Transformation) — 다짐이 현장에서 수행하는 개선 유형
 * 특정 현장명 · 결과 수치는 공개 승인 전까지 넣지 않습니다.
 * ---------------------------------------------------------------- */
export type Transformation = {
  slug: string;
  en: string;
  title: string;
  summary: string;
  facility: string;
  problem: string[];
  diagnosis: string[];
  action: string[];
  operation: string[];
  hilink?: string[];
  /** 결과 — 근거 자료 · 공개 승인 후에만 입력 */
  result: { text: string; status: PublicationStatus }[];
  /** 현장 사진 슬롯 (공개 동의된 실제 전후 사진) */
  before?: PhotoId;
  after?: PhotoId;
  business: string;
};

export const transformations: Transformation[] = [
  {
    slug: "fitness-renewal",
    en: "Fitness Renewal",
    title: "헬스장 기구 보강 · 스트레칭 존 구성",
    summary: "부족한 기구와 회복 공간을 보강해 초보자도 오래 머물 수 있는 헬스장으로 바꿉니다.",
    facility: "헬스장",
    problem: ["기구 · 소도구 부족으로 운동 선택지가 좁음", "스트레칭 · 회복 공간이 없어 체류 시간이 짧음", "초보자가 기구 사용을 어려워함"],
    diagnosis: ["정기 기구 점검으로 노후 · 고장 기구 확인", "이용 동선과 빈 공간 파악", "입주민 요청 기구 조사"],
    action: ["부족 기구와 폼롤러 · 밴드 · 덤벨 등 소도구 보강", "스트레칭 존 · 마사지 베드 구성", "기구별 사용법 QR 부착"],
    operation: ["입주민 대상 무료 OT와 운동 일지", "트레이너 배치 · PT 프로그램", "일일 청소 · 주간 점검 · 분기 AS 점검"],
    hilink: ["이용권 · 출입 기록 관리", "OT · PT 신청 관리"],
    result: [],
    business: "sports-fitness",
  },
  {
    slug: "golf-upgrade",
    en: "Golf Upgrade",
    title: "골프연습장 스크린 전환 · 타석 예약 운영",
    summary: "천막 타석을 스크린 타석으로 바꾸고, 예약부터 이용 시간 종료까지 시스템으로 관리합니다.",
    facility: "골프연습장",
    problem: ["타석별 이용 시간 제어가 되지 않음", "몰입 환경 · 장비 경쟁력 부족", "초보자 진입 장벽"],
    diagnosis: ["타석 이용 현황과 대기 민원 확인", "장비 상태 · 유지보수 이력 점검"],
    action: ["천막 타석 → 스크린 타석 업그레이드", "타석 간 커튼으로 프라이빗 공간 구성", "초보자용 공용 연습채 구비"],
    operation: ["KPGA · KLPGA 프로 레슨 (원포인트 · 그룹 · 키즈)", "입주민 스크린골프 대회 · 시상", "스크린 · 프로젝터 · 컴퓨터 정기 청소와 장비 교육"],
    hilink: ["앱 타석 예약 → 현장 QR 입장", "예약 종료 시 이용 제한 (현장 장비 구성에 따라 적용)", "세대별 이용 기록으로 정산"],
    result: [],
    business: "sports-fitness",
  },
  {
    slug: "gx-activation",
    en: "GX Activation",
    title: "GX룸 활성화 · 수업 환경 개선",
    summary: "비어 있는 GX룸에 기구 필라테스 · 스피닝 등 새 수업과 프라이빗한 수업 환경을 만듭니다.",
    facility: "GX · 필라테스",
    problem: ["수업 종류가 적어 이용이 저조함", "외부 시선에 노출된 수업 환경"],
    diagnosis: ["입주민 수요 조사", "시간대별 이용 현황 확인"],
    action: ["기구 필라테스 · 스피닝 기구 도입", "블라인드 설치로 프라이빗한 수업 환경", "조명 · 음향으로 수업 분위기 개선"],
    operation: ["분기별 수업 계획표 게시", "바레 등 신규 프로그램 도입", "수업 만족도 조사 · 강사 피드백"],
    hilink: ["수업 예약 · 정원 관리", "수강료 관리비 부과 자료"],
    result: [],
    business: "apartment-community",
  },
  {
    slug: "kids-cafe",
    en: "Kids & Cafe",
    title: "키즈 · 맘스카페와 카페 운영 개선",
    summary: "멈춰 있던 카페와 키즈 공간을 다시 쓰이는 커뮤니티 공간으로 바꿉니다.",
    facility: "키즈 · 카페",
    problem: ["운영되지 않는 카페 공간", "키즈카페 놀이 도구 부족"],
    diagnosis: ["운영 인력 구조와 비용 검토", "이용자 연령 · 시간대 확인"],
    action: ["커피 머신 도입 (무인 또는 유인 운영 선택)", "인포메이션과 카페 통합 운영 검토", "유아 맞춤 놀이 도구 보충 · 환경 개선"],
    operation: ["키즈 · 가족 프로그램 (쿠킹 클래스 · 주말 반 등)", "비품 · 재고 정기 조사", "구역별 · 시간대별 청소 체크리스트"],
    hilink: ["카페 결제 · 매출 관리", "프로그램 신청"],
    result: [],
    business: "apartment-community",
  },
  {
    slug: "study-room-access",
    en: "Study Room Access",
    title: "독서실 좌석 · 출입 관리",
    summary: "수기로 관리하던 독서실을 예약 · 결제 · 출입 인증으로 연결해 민원과 미결제 이용을 줄입니다.",
    facility: "독서실 · 작은도서관",
    problem: ["수기 좌석 관리로 운영자 개입이 잦음", "등록하지 않은 이용 · 좌석 점유 민원", "남 · 여 독서실 구분 필요"],
    diagnosis: ["좌석 운영 방식과 민원 이력 확인", "유료 · 무료 공간 구분"],
    action: ["결제 · 예약 인증 기반 개인 독서실 잠금장치", "모바일 앱 · 키오스크 좌석 예약", "월별 추첨 · 선착순 배정 규칙"],
    operation: ["이용자 교체 시 좌석 정리 · 공기 관리", "일 · 주 · 월 시설 점검 체크리스트"],
    hilink: ["좌석 예약 · 이용 횟수 제한", "출입 인증 기록 기반 세대별 부과 자료"],
    result: [],
    business: "apartment-community",
  },
  {
    slug: "multipurpose-space",
    en: "Multipurpose Space",
    title: "다목적실 영상관 · 이벤트 공간 활용",
    summary: "사용하지 않는 시간이 긴 다목적실을 영상 관람 · 동호회 · 소모임 공간으로 씁니다.",
    facility: "다목적실",
    problem: ["탁구대 외 활용이 없어 비어 있는 시간이 김"],
    diagnosis: ["다목적실 수요 조사", "시간대별 예약 현황 확인"],
    action: ["빔프로젝터를 활용한 영상 관람 환경", "예약 시스템으로 중복 없는 이용"],
    operation: ["탁구 동호회 · 주민 대회", "영화 이벤트 (스포츠 영상관 · 어린이 애니메이션 데이)", "문화 강좌 · 보드게임 등 주민 소모임"],
    hilink: ["시설 예약 · 중복 예약 방지"],
    result: [],
    business: "consulting",
  },
  {
    slug: "idle-space",
    en: "Idle Space",
    title: "유휴 공간 활성화",
    summary: "비어 있는 공간을 수요가 있는 시설로 전환합니다.",
    facility: "유휴 공간",
    problem: ["준공 후 용도가 정해지지 않았거나 쓰이지 않는 공간"],
    diagnosis: ["입주민 수요 조사", "공간 구조 · 설비 확인"],
    action: ["키즈카페 등 수요 시설로 전환 제안", "필요 기구 · 가구 구성"],
    operation: ["전환 후 운영 인력 · 프로그램 연계", "이용 데이터로 활용도 확인"],
    result: [],
    business: "consulting",
  },
];

export function getTransformation(slug: string) {
  return transformations.find((t) => t.slug === slug);
}

/* ------------------------------------------------------------------
 * 시설별 전문성
 * ---------------------------------------------------------------- */
export const facilityExpertise: { en: string; ko: string; points: string[]; photo?: PhotoId }[] = [
  { en: "Fitness", ko: "헬스장", points: ["트레이너 배치 · OT · PT", "기구 일일 청소 · 분기 AS"], photo: "facility-fitness" },
  { en: "Golf", ko: "골프연습장", points: ["프로 레슨 · 대회", "타석 예약 · 이용 시간 관리"], photo: "facility-golf" },
  { en: "GX · Pilates", ko: "GX · 필라테스", points: ["수요 조사 · 분기 수업표", "강사 채용 · 만족도 조사"], photo: "facility-gx" },
  { en: "Swimming", ko: "수영장", points: ["강습 프로그램", "이용 시간 · 인원 관리"] },
  { en: "Sauna", ko: "사우나", points: ["위생 · 안전 점검", "성별 출입 권한"] },
  { en: "Study Room", ko: "독서실", points: ["좌석 예약 · 추첨 배정", "청결 · 공기 관리"], photo: "facility-library" },
  { en: "Library", ko: "작은도서관", points: ["도서 관리", "독서 · 방과 후 프로그램"] },
  { en: "Kids", ko: "키즈카페", points: ["놀이 도구 · 안전 수칙", "키즈 · 가족 프로그램"] },
  { en: "Cafe", ko: "카페", points: ["유인 · 무인 운영", "비품 · 재고 관리"], photo: "facility-cafe" },
  { en: "Guest House", ko: "게스트하우스", points: ["앱 예약 · 결제", "청소 · 비품 관리"] },
  { en: "Multipurpose", ko: "다목적실", points: ["동호회 · 영상 이벤트", "대관 예약"] },
  { en: "Lounge", ko: "커뮤니티 라운지", points: ["안내 · 민원 응대", "공지 · 행사 운영"] },
];

/* ------------------------------------------------------------------
 * HILINK (홈 섹션)
 * ---------------------------------------------------------------- */
export const hilinkHome = {
  eyebrow: "핵심사업 02 · HILINK 플랫폼",
  title: "운영을 시스템으로\n연결합니다.",
  lead: "회원 · 출입 · 예약 · 결제 · 운영 데이터를 하나의 플랫폼으로 관리합니다.",
  features: ["회원", "출입", "예약", "결제", "관리비", "통계"],
};

/* ------------------------------------------------------------------
 * WHY DAGYM
 * ---------------------------------------------------------------- */
export const whyDagym = [
  { en: "On-site Expertise", title: "시설별 전문 운영", body: "헬스 · 골프 · GX부터 독서실 · 키즈 · 카페까지 시설마다 운영 기준과 프로그램이 다릅니다. 시설별 진단 → 구축 → 프로그램 → 관리 순서로 운영합니다." },
  { en: "HQ Control", title: "본사 직접 관리", body: "5개 전문 부서가 인사 · 노무 · 정산 · 교육 · 운영기획을 맡고, 본사 운영 담당이 매주 현장을 점검합니다." },
  { en: "Improvement", title: "운영 진단과 개선", body: "이용 데이터와 민원 이력으로 문제를 찾고, 프로그램 · 운영 시간 · 공간 활용을 조정합니다. 필요하면 시설 지원까지 연결합니다." },
  { en: "Technology", title: "HILINK 기반 데이터 운영", body: "출입 · 예약 · 정산 기록이 자동으로 쌓여 관리비 부과와 월간 보고의 근거가 됩니다." },
  { en: "Standard & Training", title: "운영 기준과 직원 교육", body: "체크리스트로 점검을 기록하고, 서비스 · 안전(CPR) · 수업 전문성 교육을 정기적으로 실시합니다." },
  { en: "Communication", title: "입주민 · 관리 주체와 소통", body: "입주민 앱과 소통 창구, 관리사무소 · 입주자대표회의 주간 · 월간 보고로 운영 현황을 공유합니다." },
];

/** 사업영역별 대표 사진 (시설 유형 예시 — 특정 현장 아님) */
export const businessPhoto: Record<string, PhotoId> = {
  "apartment-community": "visual-business-apartment",
  "sports-fitness": "visual-business-sports",
  "community-facility": "visual-business-hotel",
  consulting: "visual-business-consulting",
  equipment: "visual-business-equipment",
};

