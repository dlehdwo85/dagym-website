import type { FacilityIcon } from "./facilities";
import type { ProjectCategory } from "./projects";

export type IconName =
  | "building"
  | "dumbbell"
  | "layers"
  | "platform"
  | "compass"
  | "package"
  | "users"
  | "cpu"
  | "workflow"
  | "chart"
  | "shield"
  | "clipboard"
  | "headset"
  | "wrench"
  | "target"
  | "trending"
  | "calendar"
  | "scan"
  | "ruler"
  | "search";

export type BusinessArea = {
  no: string;
  slug: string;
  href: string;
  en: string;
  ko: string;
  summary: string;
  icon: IconName;
  image?: string;
  /** 상세 페이지가 없는 항목(HILINK)은 detail 이 없습니다 */
  detail?: BusinessDetail;
};

export type BusinessDetail = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroEyebrow: string;
  heroTitle: string[];
  heroSub: string;
  targets: string[];
  intro: { title: string; body: string };
  problems: { title: string; body: string }[];
  solutions: { title: string; body: string; icon: IconName }[];
  scope: { group: string; items: string[] }[];
  process: { title: string; body: string }[];
  strengths: { title: string; body: string }[];
  facilities: FacilityIcon[];
  includeExtraFacilities?: boolean;
  projectCategory: ProjectCategory;
  ctaTitle: string;
};

const standardProcess = [
  { title: "현장 분석", body: "세대수·시설 구성·주민 이용 패턴·기존 운영 계약을 조사합니다." },
  { title: "운영 전략", body: "시설별 운영 시간, 프로그램, 요금 체계, 인력 기준을 설계합니다." },
  { title: "인력 구성", body: "센터장·트레이너·골프 프로·GX 강사·안내 인력을 배치합니다." },
  { title: "시스템 구축", body: "HILINK 출입·예약·결제·공지 체계를 현장에 맞게 세팅합니다." },
  { title: "운영 시작", body: "오픈 전 리허설과 주민 안내를 거쳐 정식 운영을 시작합니다." },
  { title: "데이터 분석 및 개선", body: "이용·매출·민원 데이터를 월 단위로 분석해 운영을 개선합니다." },
];

export const businessAreas: BusinessArea[] = [
  {
    no: "01",
    slug: "apartment-community",
    href: "/business/apartment-community",
    en: "Apartment Community Management",
    ko: "아파트 커뮤니티 위탁운영",
    summary: "헬스·골프·GX·독서실·게스트하우스까지, 단지 커뮤니티 전체를 하나의 운영 체계로.",
    icon: "building",
    detail: {
      metaTitle: "아파트 커뮤니티 위탁운영",
      metaDescription:
        "아파트 커뮤니티센터 위탁운영 · 주민공동시설 위탁운영. 헬스장, 골프연습장, GX, 독서실, 사우나, 게스트하우스를 현장 인력과 HILINK 스마트 운영 시스템으로 함께 운영합니다.",
      keywords: ["아파트 커뮤니티 위탁운영", "주민공동시설 위탁운영", "아파트 헬스장 위탁운영", "커뮤니티센터 위탁운영"],
      heroEyebrow: "Apartment Community Management",
      heroTitle: ["아파트 커뮤니티의", "운영 가치를 높입니다."],
      heroSub:
        "헬스장부터 골프, GX, 독서실, 사우나, 게스트하우스까지 하나의 운영 시스템으로 관리합니다.",
      targets: ["시행사 · 건설사", "입주자대표회의", "관리사무소", "위탁관리회사"],
      intro: {
        title: "커뮤니티의 가치는\n운영에서 시작됩니다.",
        body: "같은 설계, 같은 기구라도 누가 어떻게 운영하느냐에 따라 입주민 만족도와 단지 평판은 완전히 달라집니다. 다짐은 시설별로 다른 인력을 따로 계약하는 대신, 커뮤니티 전체를 하나의 운영 조직과 하나의 플랫폼으로 묶어 책임집니다.",
      },
      problems: [
        { title: "시설마다 다른 업체, 다른 계약", body: "헬스·골프·독서실 운영사가 모두 달라 책임 소재가 흩어지고 관리사무소 업무가 늘어납니다." },
        { title: "수기 장부와 엑셀 정산", body: "이용권·락커·대관이 수기로 관리되어 정산 오류와 민원이 반복됩니다." },
        { title: "출입 관리의 공백", body: "카드 대여·공유로 외부인 출입을 통제하기 어렵고 이용 기록이 남지 않습니다." },
        { title: "입주 초기 운영 공백", body: "입주 시점에 운영 기준이 없어 커뮤니티가 방치되거나 늦게 활성화됩니다." },
      ],
      solutions: [
        { title: "단일 운영 조직", body: "센터장을 중심으로 시설별 전문 인력을 한 조직으로 운영하고 하나의 창구로 보고합니다.", icon: "users" },
        { title: "HILINK 통합 시스템", body: "안면인식 출입, 예약, 결제, 락커, 공지를 한 플랫폼에서 처리합니다.", icon: "platform" },
        { title: "표준 운영 매뉴얼", body: "오픈·마감·위생·안전·민원 대응을 매뉴얼로 표준화해 현장 편차를 줄입니다.", icon: "clipboard" },
        { title: "월간 운영 리포트", body: "이용률·매출·민원 데이터를 입주자대표회의와 관리사무소에 정기 보고합니다.", icon: "chart" },
      ],
      scope: [
        { group: "운영 인력", items: ["센터장 · 매니저", "트레이너 · 골프 프로", "GX · 필라테스 강사", "안내 · 고객응대 인력"] },
        { group: "시설 운영", items: ["시설별 운영 시간 설계", "기구 · 설비 일상 점검", "위생 · 안전 관리", "프로그램 · 강좌 편성"] },
        { group: "스마트 시스템", items: ["안면인식 출입통제", "강좌 · 타석 · 좌석 예약", "이용권 · 락커 · 결제", "공지 · 알림 · 대관"] },
        { group: "관리 · 보고", items: ["월간 운영 리포트", "매출 · 정산 자료", "민원 처리 이력", "운영 개선 제안"] },
      ],
      process: standardProcess,
      strengths: [
        { title: "현장 + 플랫폼 동시 제공", body: "운영 인력과 운영 시스템을 한 회사가 책임지므로 도입·연동 비용과 책임 공백이 없습니다." },
        { title: "입주 초기부터 준비", body: "사전점검·입주 기간부터 운영 기준과 시스템을 세팅해 오픈 첫날부터 정상 운영합니다." },
        { title: "투명한 데이터 보고", body: "누가, 언제, 어떤 시설을 이용했는지 데이터로 남아 의사결정 근거가 됩니다." },
      ],
      facilities: ["fitness", "golf", "gx", "swimming", "sauna", "study", "library", "guesthouse", "kids", "cafe"],
      includeExtraFacilities: true,
      projectCategory: "apartment",
      ctaTitle: "우리 단지 커뮤니티,\n운영 진단부터 시작하세요.",
    },
  },
  {
    no: "02",
    slug: "sports-fitness",
    href: "/business/sports-fitness",
    en: "Fitness & Sports Management",
    ko: "스포츠·피트니스 시설 운영",
    summary: "피트니스, 골프, 수영, 필라테스 등 스포츠시설을 전문 인력과 운영 데이터로 운영합니다.",
    icon: "dumbbell",
    detail: {
      metaTitle: "스포츠·피트니스 시설 위탁운영",
      metaDescription:
        "피트니스 위탁운영, 골프연습장 위탁운영, 스포츠시설 위탁운영. 전문 트레이너·골프 프로·강사 운영과 HILINK 기반 회원·예약·매출 관리.",
      keywords: ["피트니스 위탁운영", "골프연습장 위탁운영", "스포츠시설 위탁운영", "아파트 헬스장 위탁운영"],
      heroEyebrow: "Fitness & Sports Management",
      heroTitle: ["스포츠시설의 수준은", "운영이 결정합니다."],
      heroSub:
        "피트니스·골프·수영·필라테스 시설을 전문 인력, 프로그램, 운영 데이터로 관리합니다.",
      targets: ["스포츠시설 소유주", "기업 복지 담당자", "호텔 · 레지던스", "공공기관"],
      intro: {
        title: "좋은 기구보다\n매일의 운영 품질.",
        body: "트레이너 이직, 강좌 공백, 기구 고장 방치는 이용률 하락으로 바로 이어집니다. 다짐은 인력 채용·교육·평가 체계와 HILINK 운영 데이터를 결합해 시설의 서비스 품질을 일정하게 유지합니다.",
      },
      problems: [
        { title: "전문 인력 수급과 이탈", body: "트레이너·골프 프로·강사 채용과 교육을 직접 하기 어렵고 잦은 교체로 품질이 흔들립니다." },
        { title: "낮은 이용률", body: "프로그램이 고정되어 있고 이용 데이터가 없어 무엇을 바꿔야 할지 알 수 없습니다." },
        { title: "매출 누수", body: "이용권·레슨·락커 매출이 분산 관리되어 누락과 정산 분쟁이 생깁니다." },
      ],
      solutions: [
        { title: "전문 인력 운영", body: "직무별 채용 기준과 교육 커리큘럼으로 인력을 배치하고 대체 인력을 운영합니다.", icon: "users" },
        { title: "프로그램 기획", body: "이용자 구성에 맞춰 PT·GX·레슨·스포츠 프로그램을 편성하고 주기적으로 개편합니다.", icon: "target" },
        { title: "HILINK 회원 · 매출 관리", body: "회원권·레슨·락커·결제를 통합 관리하고 매출을 실시간으로 확인합니다.", icon: "platform" },
        { title: "시설 · 안전 점검", body: "기구·설비 점검표와 안전 수칙으로 사고와 고장 방치를 예방합니다.", icon: "shield" },
      ],
      scope: [
        { group: "인력", items: ["센터장 · 매니저", "트레이너 · 골프 프로", "수영 · 필라테스 · GX 강사", "안전요원 · 안내 인력"] },
        { group: "프로그램", items: ["PT · OT 프로그램", "GX · 필라테스 강좌", "골프 레슨", "유소년 스포츠 프로그램"] },
        { group: "시스템", items: ["회원 · 이용권 관리", "안면인식 출입", "레슨 · 타석 예약", "매출 · 정산 통계"] },
      ],
      process: standardProcess,
      strengths: [
        { title: "직무별 인력 표준", body: "직무마다 채용·교육·평가 기준을 두고 서비스 품질을 관리합니다." },
        { title: "데이터로 보는 이용률", body: "시간대별 출입, 강좌 예약률, 레슨 매출을 HILINK에서 바로 확인합니다." },
        { title: "공백 없는 운영", body: "결원 발생 시 대체 인력과 운영 매뉴얼로 서비스 중단을 막습니다." },
      ],
      facilities: ["fitness", "golf", "gx", "pilates", "swimming", "sauna"],
      projectCategory: "sports",
      ctaTitle: "스포츠시설 운영,\n기준부터 다시 세워보세요.",
    },
  },
  {
    no: "03",
    slug: "community-facility",
    href: "/business/community-facility",
    en: "Community Facility Management",
    ko: "커뮤니티 복합시설 운영",
    summary: "기업·호텔·레지던스·공공시설의 복합 커뮤니티 공간을 통합 운영합니다.",
    icon: "layers",
    detail: {
      metaTitle: "커뮤니티 복합시설 위탁운영",
      metaDescription:
        "기업 사옥, 호텔·레지던스, 공공 복합시설의 커뮤니티 공간 위탁운영. 라운지·피트니스·도서관·게스트룸·대관 시설을 하나의 운영 체계로 관리합니다.",
      keywords: ["커뮤니티센터 위탁운영", "복합시설 위탁운영", "기업 복지시설 운영", "주민공동시설 위탁운영"],
      heroEyebrow: "Community Facility Management",
      heroTitle: ["여러 공간을", "하나의 기준으로 운영합니다."],
      heroSub: "기업 사옥, 호텔·레지던스, 공공 복합시설의 커뮤니티 공간을 통합 운영합니다.",
      targets: ["복합시설 운영사", "호텔 · 레지던스", "기업 복지 담당자", "공공기관 · 자산관리회사"],
      intro: {
        title: "공간이 많을수록\n운영 기준이 필요합니다.",
        body: "복합시설은 공간마다 이용자, 운영 시간, 요금, 권한이 다릅니다. 다짐은 공간별 운영 정책을 하나의 체계로 정리하고 HILINK로 권한·예약·정산을 통합해 운영사가 관리할 대상을 줄입니다.",
      },
      problems: [
        { title: "공간별로 다른 권한", body: "임직원·입주사·방문객 등 이용자 유형별 출입 권한을 관리하기 어렵습니다." },
        { title: "대관 · 예약 충돌", body: "회의실·라운지·게스트룸 예약이 전화와 메신저로 처리되어 충돌이 잦습니다." },
        { title: "운영 성과 측정 불가", body: "공간이 실제로 얼마나 쓰이는지 알 수 없어 투자 판단이 어렵습니다." },
      ],
      solutions: [
        { title: "공간별 운영 정책 설계", body: "이용 대상·시간·요금·권한을 공간별로 정의하고 운영 매뉴얼로 만듭니다.", icon: "clipboard" },
        { title: "권한 기반 출입", body: "HILINK 안면인식 출입으로 이용자 유형별 권한을 분리 관리합니다.", icon: "scan" },
        { title: "통합 예약 · 대관", body: "회의실·라운지·게스트룸·강좌 예약을 하나의 앱에서 처리합니다.", icon: "calendar" },
        { title: "공간 활용 리포트", body: "공간별 이용률과 시간대 데이터를 리포트로 제공합니다.", icon: "chart" },
      ],
      scope: [
        { group: "공간 운영", items: ["라운지 · 카페", "피트니스 · GX", "도서관 · 스터디", "게스트룸 · 대관 시설"] },
        { group: "서비스", items: ["컨시어지 · 안내", "프로그램 · 행사 기획", "위생 · 안전 관리", "민원 대응"] },
        { group: "시스템", items: ["이용자 유형별 권한", "통합 예약 · 대관", "결제 · 정산", "공간 활용 통계"] },
      ],
      process: standardProcess,
      strengths: [
        { title: "공간 정책 표준화", body: "공간이 늘어나도 같은 정책 틀 안에서 운영을 확장할 수 있습니다." },
        { title: "권한 · 예약 통합", body: "출입과 예약이 같은 플랫폼에 있어 이용 흐름이 끊기지 않습니다." },
        { title: "측정 가능한 운영", body: "공간 활용 데이터를 근거로 공간 구성과 운영 시간을 조정합니다." },
      ],
      facilities: ["lounge", "fitness", "gx", "library", "guesthouse", "cafe"],
      projectCategory: "corporate",
      ctaTitle: "복합시설 운영,\n하나의 창구로 정리하세요.",
    },
  },
  {
    no: "04",
    slug: "hilink",
    href: "/hilink",
    en: "HILINK Smart Platform",
    ko: "커뮤니티 통합 운영 플랫폼",
    summary: "회원관리·안면인식 출입·예약·결제·통계를 하나로 연결하는 다짐의 자체 플랫폼.",
    icon: "platform",
  },
  {
    no: "05",
    slug: "consulting",
    href: "/business/consulting",
    en: "Facility Consulting",
    ko: "운영 컨설팅 · 시설 활성화",
    summary: "신규 커뮤니티 기획부터 기존 시설 활성화까지, 운영 관점에서 진단하고 설계합니다.",
    icon: "compass",
    detail: {
      metaTitle: "커뮤니티 운영 컨설팅 · 시설 활성화",
      metaDescription:
        "신규 아파트 커뮤니티 기획 단계의 운영 컨설팅과 기존 커뮤니티 시설 활성화 진단. 시설 구성, 운영 모델, 요금 체계, 인력 계획을 설계합니다.",
      keywords: ["커뮤니티 운영 컨설팅", "피트니스 운영 컨설팅", "커뮤니티 시설 활성화", "주민공동시설 기획"],
      heroEyebrow: "Facility Consulting",
      heroTitle: ["설계 단계부터", "운영을 고려합니다."],
      heroSub: "신규 커뮤니티 기획부터 기존 시설 활성화까지, 운영하는 회사의 관점으로 진단하고 설계합니다.",
      targets: ["시행사 · 건설사", "설계사무소", "입주자대표회의", "시설 소유주"],
      intro: {
        title: "운영하는 회사가\n운영될 공간을 설계합니다.",
        body: "동선이 맞지 않는 GX룸, 수요보다 많은 타석, 관리 인력을 고려하지 않은 배치. 다짐은 실제 현장을 운영하며 얻은 기준으로 시설 구성과 운영 모델을 기획 단계에서 검토합니다.",
      },
      problems: [
        { title: "운영을 고려하지 않은 설계", body: "시설 규모와 동선이 실제 운영 인력·수요와 맞지 않아 준공 후 개선 비용이 발생합니다." },
        { title: "활성화되지 않는 시설", body: "개관 후 이용률이 낮아 관리비 부담만 남는 시설이 생깁니다." },
        { title: "근거 없는 요금 · 운영 모델", body: "요금 체계와 운영 방식이 주변 사례만 참고해 정해집니다." },
      ],
      solutions: [
        { title: "시설 구성 검토", body: "세대수·연령 구성·주변 인프라를 기준으로 시설 구성과 규모를 검토합니다.", icon: "ruler" },
        { title: "운영 모델 설계", body: "직영·위탁·혼합 운영 모델별 비용과 인력 구조를 비교 제안합니다.", icon: "workflow" },
        { title: "활성화 진단", body: "기존 시설의 이용 데이터와 민원을 분석해 개선 과제를 도출합니다.", icon: "search" },
        { title: "실행 로드맵", body: "프로그램·요금·시스템 도입 일정을 단계별 로드맵으로 정리합니다.", icon: "trending" },
      ],
      scope: [
        { group: "기획 단계", items: ["시설 구성 · 규모 검토", "동선 · 레이아웃 의견", "기구 · 설비 사양 제안", "운영 모델 설계"] },
        { group: "운영 단계", items: ["이용 현황 진단", "요금 · 이용 규정 개선", "프로그램 개편", "HILINK 도입 설계"] },
      ],
      process: [
        { title: "자료 수집", body: "도면·세대 구성·기존 운영 자료를 수집합니다." },
        { title: "현장 진단", body: "현장 실사와 이용자 인터뷰로 문제를 확인합니다." },
        { title: "대안 설계", body: "시설·운영·요금·인력 대안을 비교 설계합니다." },
        { title: "보고 · 협의", body: "의사결정권자에게 보고하고 우선순위를 정합니다." },
        { title: "실행 지원", body: "선정된 과제의 실행과 운영 전환을 지원합니다." },
      ],
      strengths: [
        { title: "운영사의 관점", body: "도면이 아니라 매일의 운영을 기준으로 판단합니다." },
        { title: "데이터 기반 진단", body: "HILINK 이용 데이터로 가설이 아닌 수치로 진단합니다." },
        { title: "운영까지 연결", body: "컨설팅 결과를 실제 위탁운영과 시스템 도입으로 이어갈 수 있습니다." },
      ],
      facilities: ["fitness", "golf", "gx", "study", "lounge", "guesthouse"],
      projectCategory: "apartment",
      ctaTitle: "기획 단계라면,\n지금이 가장 좋은 시점입니다.",
    },
  },
  {
    no: "06",
    slug: "equipment",
    href: "/business/equipment",
    en: "Equipment & Space Solution",
    ko: "운동기구 · 시설 구축",
    summary: "운영 경험을 바탕으로 운동기구 선정·납품·배치와 공간 구축을 제안합니다.",
    icon: "package",
    detail: {
      metaTitle: "운동기구 납품 · 커뮤니티 시설 구축",
      metaDescription:
        "아파트 커뮤니티·스포츠시설 운동기구 선정, 납품, 배치 설계와 공간 구축. 운영과 유지보수를 고려한 기구 구성과 출입·예약 시스템 연동.",
      keywords: ["아파트 헬스장 기구 납품", "피트니스 기구 납품", "커뮤니티 시설 구축", "골프연습장 구축"],
      heroEyebrow: "Equipment & Space Solution",
      heroTitle: ["운영을 아는 회사가", "공간을 구축합니다."],
      heroSub: "운동기구 선정·납품·배치부터 출입·예약 시스템 연동까지 운영을 전제로 구축합니다.",
      targets: ["시행사 · 건설사", "시설 소유주", "기업 · 공공기관", "입주자대표회의"],
      intro: {
        title: "기구는 한 번 사지만,\n운영은 매일 이어집니다.",
        body: "사용 빈도, 유지보수 난이도, 부품 수급, 이용자 연령대를 고려하지 않은 구성은 운영 비용으로 돌아옵니다. 다짐은 실제 운영 데이터를 기준으로 기구 구성과 공간 배치를 제안합니다.",
      },
      problems: [
        { title: "이용자와 맞지 않는 구성", body: "이용자 연령·목적과 무관한 기구 구성으로 일부 기구만 과사용됩니다." },
        { title: "유지보수 공백", body: "납품 후 점검·수리 체계가 없어 고장 기구가 방치됩니다." },
        { title: "시스템과 분리된 공간", body: "출입·예약 시스템을 나중에 붙이면서 추가 공사와 비용이 발생합니다." },
      ],
      solutions: [
        { title: "이용자 기반 구성", body: "세대 구성과 예상 이용 패턴으로 유산소·근력·기능성 비율을 설계합니다.", icon: "target" },
        { title: "배치 · 동선 설계", body: "안전 거리와 동선을 고려한 배치안을 도면 위에서 제안합니다.", icon: "ruler" },
        { title: "시스템 동시 구축", body: "안면인식 단말기와 예약 시스템을 공간 구축과 함께 설치합니다.", icon: "scan" },
        { title: "사후 관리", body: "정기 점검과 A/S 연계로 기구 상태를 유지합니다.", icon: "wrench" },
      ],
      scope: [
        { group: "기구", items: ["유산소 · 근력 기구", "기능성 · 스트레칭 존", "필라테스 기구", "골프 시뮬레이터 연계"] },
        { group: "공간", items: ["배치 · 동선 설계", "바닥 · 방진 · 거울 등 마감 협의", "락커 · 수납 구성", "사인 · 안내물"] },
        { group: "시스템", items: ["안면인식 출입 단말기", "예약 · 결제 연동", "락커 관리 연동", "정기 점검 · A/S"] },
      ],
      process: [
        { title: "요구 확인", body: "시설 규모, 예산, 이용자 구성을 확인합니다." },
        { title: "구성 제안", body: "기구 구성과 배치안을 제안합니다." },
        { title: "납품 · 설치", body: "일정에 맞춰 납품·설치하고 시운전합니다." },
        { title: "시스템 연동", body: "출입·예약·락커 시스템을 연동합니다." },
        { title: "사후 관리", body: "정기 점검과 A/S를 연계합니다." },
      ],
      strengths: [
        { title: "운영 데이터 기반", body: "실제 이용 패턴을 바탕으로 과잉·부족 구성을 피합니다." },
        { title: "구축 + 운영 연결", body: "구축한 공간을 그대로 위탁운영으로 이어갈 수 있습니다." },
        { title: "시스템 일체형", body: "HILINK 단말기와 공간 구축을 한 번에 진행합니다." },
      ],
      facilities: ["fitness", "golf", "gx", "pilates"],
      projectCategory: "apartment",
      ctaTitle: "기구 구성과 공간 구축,\n운영 관점으로 검토해 드립니다.",
    },
  },
];

export const businessDetails = businessAreas.filter(
  (b): b is BusinessArea & { detail: BusinessDetail } => Boolean(b.detail),
);

export function getBusiness(slug: string) {
  return businessDetails.find((b) => b.slug === slug);
}
