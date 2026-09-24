import type { FacilityIcon } from "./facilities";
import { TODO_VERIFY, type Verifiable } from "./config";

/**
 * 프로젝트(운영 현장) 데이터.
 *
 * 새 현장 추가 방법:
 *   1) 아래 projects 배열에 객체 하나를 추가합니다.
 *   2) 사진은 /public/images/projects/<slug>/ 에 넣고 cover · gallery 에 경로를 입력합니다.
 *   3) verified: true 로 바꾸면 "SAMPLE" 표시가 사라집니다.
 *
 * ⚠️ 아래 항목들은 레이아웃 확인용 샘플(verified: false)입니다.
 *    실제 현장명 · 지역 · 세대수는 확인 후 입력하세요. (TODO_VERIFY)
 *    향후 Supabase / Headless CMS 로 옮길 때도 이 타입을 그대로 테이블 스키마로 사용할 수 있습니다.
 */

export type ProjectCategory = "apartment" | "sports" | "corporate" | "public";

export const projectCategories: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "apartment", label: "아파트 커뮤니티" },
  { key: "sports", label: "스포츠시설" },
  { key: "corporate", label: "기업" },
  { key: "public", label: "공공시설" },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  apartment: "아파트 커뮤니티",
  sports: "스포츠시설",
  corporate: "기업",
  public: "공공시설",
};

export type OperationType = "위탁운영" | "HILINK 도입" | "운영 컨설팅" | "시설 구축";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  region: Verifiable<string>;
  /** 세대수 또는 시설 규모 (예: "1,200세대", "연면적 2,000㎡") */
  scale: Verifiable<string>;
  facilities: FacilityIcon[];
  operationTypes: OperationType[];
  hilink: boolean;
  period?: Verifiable<string>;
  summary: string;
  scope: string[];
  solutions: { title: string; body: string }[];
  cover?: string;
  gallery?: string[];
  featured?: boolean;
  /** false 인 동안 UI 에 SAMPLE 뱃지가 표시됩니다 */
  verified: boolean;
  /**
   * 지도 UI 용 좌표 (위도 · 경도). 확인된 현장에만 입력하세요.
   * 입력된 현장이 하나 이상이면 PORTFOLIO 페이지에 운영 지역 지도가 자동으로 표시됩니다.
   */
  location?: { lat: number; lng: number };
};

export const projects: Project[] = [
  {
    slug: "sample-apartment-01",
    name: "대단지 아파트 커뮤니티센터",
    category: "apartment",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["fitness", "golf", "gx", "study", "sauna"],
    operationTypes: ["위탁운영", "HILINK 도입"],
    hilink: true,
    summary: "헬스·골프·GX·독서실·사우나를 한 운영 조직과 HILINK로 통합 운영하는 대단지 커뮤니티 모델.",
    scope: ["센터장 · 트레이너 · 골프 프로 · GX 강사 배치", "안면인식 출입 · 타석 · 좌석 예약", "월간 운영 리포트"],
    solutions: [
      { title: "통합 운영 조직", body: "시설별로 나뉘어 있던 운영을 센터장 중심 단일 조직으로 전환하는 구조입니다." },
      { title: "HILINK 출입 · 예약", body: "안면인식 출입과 골프 타석 · 독서실 좌석 예약을 앱으로 일원화합니다." },
    ],
    featured: true,
    verified: false,
  },
  {
    slug: "sample-apartment-02",
    name: "신축 단지 입주 초기 커뮤니티 오픈",
    category: "apartment",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["fitness", "gx", "library", "kids", "cafe"],
    operationTypes: ["위탁운영", "HILINK 도입"],
    hilink: true,
    summary: "입주 기간에 맞춰 운영 기준·인력·시스템을 사전 세팅하고 커뮤니티를 오픈하는 모델.",
    scope: ["입주 전 운영 기준 수립", "주민 이용 규정 · 요금 설계", "HILINK 세대 등록 · 얼굴 등록"],
    solutions: [
      { title: "오픈 리허설", body: "정식 오픈 전 리허설로 출입·예약 흐름과 인력 동선을 점검합니다." },
      { title: "세대 일괄 등록", body: "세대 정보와 얼굴 등록을 입주 동선에 맞춰 진행합니다." },
    ],
    featured: true,
    verified: false,
  },
  {
    slug: "sample-apartment-03",
    name: "골프 특화 커뮤니티 단지",
    category: "apartment",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["golf", "fitness", "lounge"],
    operationTypes: ["위탁운영"],
    hilink: true,
    summary: "타석 수요가 높은 단지를 위한 골프 레슨·타석 예약 중심 운영 모델.",
    scope: ["골프 프로 레슨 편성", "타석 예약 · 대기 관리", "레슨 매출 정산"],
    solutions: [
      { title: "타석 예약 공정성", body: "세대별 예약 한도와 노쇼 제한 규칙으로 타석 독점을 막습니다." },
      { title: "레슨 프로그램", body: "입문 · 중급 · 필드 준비 과정으로 레슨을 구성합니다." },
    ],
    featured: true,
    verified: false,
  },
  {
    slug: "sample-sports-01",
    name: "도심형 피트니스 · 필라테스 센터",
    category: "sports",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["fitness", "pilates", "gx"],
    operationTypes: ["위탁운영"],
    hilink: true,
    summary: "시설 소유주를 대신해 인력 · 프로그램 · 회원 매출을 운영하는 스포츠시설 위탁 모델.",
    scope: ["트레이너 · 강사 채용 및 교육", "PT · 필라테스 프로그램", "회원 · 매출 관리"],
    solutions: [
      { title: "인력 표준", body: "직무별 채용·교육 기준으로 서비스 품질을 유지합니다." },
      { title: "매출 가시화", body: "회원권·PT·락커 매출을 HILINK 대시보드로 확인합니다." },
    ],
    featured: true,
    verified: false,
  },
  {
    slug: "sample-sports-02",
    name: "골프연습장 위탁운영",
    category: "sports",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["golf"],
    operationTypes: ["위탁운영", "HILINK 도입"],
    hilink: true,
    summary: "타석 예약 · 레슨 · 회원권을 데이터로 관리하는 골프연습장 운영 모델.",
    scope: ["프로 배치 · 레슨 운영", "타석 예약 시스템", "회원권 · 매출 정산"],
    solutions: [
      { title: "시간대 가동률 관리", body: "시간대별 타석 가동률을 보고 요금과 레슨 시간을 조정합니다." },
    ],
    featured: true,
    verified: false,
  },
  {
    slug: "sample-corporate-01",
    name: "기업 사옥 임직원 복지시설",
    category: "corporate",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["fitness", "gx", "lounge"],
    operationTypes: ["위탁운영", "HILINK 도입"],
    hilink: true,
    summary: "임직원 피트니스·GX·라운지를 사내 권한 체계에 맞춰 운영하는 기업 복지 모델.",
    scope: ["임직원 권한 연동 출입", "GX 강좌 예약", "이용 통계 리포트"],
    solutions: [
      { title: "권한 기반 출입", body: "임직원 · 협력사 · 방문객 권한을 분리해 관리합니다." },
    ],
    featured: true,
    verified: false,
  },
  {
    slug: "sample-public-01",
    name: "공공 생활체육 복합시설",
    category: "public",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["swimming", "fitness", "gx", "library"],
    operationTypes: ["운영 컨설팅"],
    hilink: false,
    summary: "공공 복합시설의 프로그램 편성과 운영 효율을 진단하는 컨설팅 모델.",
    scope: ["이용 현황 진단", "프로그램 개편안", "운영 인력 구조 제안"],
    solutions: [
      { title: "프로그램 개편", body: "이용 데이터를 기반으로 시간대별 프로그램을 재편성합니다." },
    ],
    featured: true,
    verified: false,
  },
  {
    slug: "sample-apartment-04",
    name: "게스트하우스 · 라운지 운영",
    category: "apartment",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["guesthouse", "lounge", "cafe"],
    operationTypes: ["위탁운영", "HILINK 도입"],
    hilink: true,
    summary: "게스트하우스 예약 · 청소 · 체크인과 라운지 대관을 통합 운영하는 모델.",
    scope: ["객실 예약 · 결제", "청소 · 비품 관리", "라운지 대관 · 추첨"],
    solutions: [
      { title: "호텔식 운영 기준", body: "체크인 · 청소 · 비품 기준을 표준화합니다." },
    ],
    featured: true,
    verified: false,
  },
  {
    slug: "sample-equipment-01",
    name: "커뮤니티 피트니스 기구 구축",
    category: "apartment",
    region: TODO_VERIFY,
    scale: TODO_VERIFY,
    facilities: ["fitness", "pilates"],
    operationTypes: ["시설 구축"],
    hilink: true,
    summary: "이용자 구성을 반영한 기구 구성 · 배치와 출입 단말기 동시 구축 모델.",
    scope: ["기구 구성 · 배치안", "납품 · 설치", "안면인식 단말기 설치"],
    solutions: [
      { title: "일체형 구축", body: "공간 구축 시점에 출입 · 예약 시스템을 함께 설치합니다." },
    ],
    verified: false,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 8);
