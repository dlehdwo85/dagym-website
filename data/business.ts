import type { PhotoId } from "./photos";

/**
 * 사업영역 콘텐츠
 * 다짐의 운영 방식 설명.
 * 실적 수치 · 현장명은 포함하지 않습니다.
 */

export type BusinessDetail = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** 브레드크럼 · 짧은 표기 (예: 기업 · 호텔) */
  short: string;
  /** Hero 영문 eyebrow */
  eyebrow: string;
  heroTitle: string;
  /** 1~2줄 */
  heroLead: string;
  /** Hero 이미지 — 사업을 한눈에 설명하는 사진 */
  heroImage: PhotoId;
  /** 운영 범위 옆 와이드 이미지 */
  wideImage?: PhotoId;
  /** 큰 문장 하나 + 1~2문장 */
  statement: { title: string; body: string };
  /** 운영 범위 제목 (기본: 운영 범위) */
  scopeTitle?: string;
  /** 운영 범위 — 짧은 단어 목록 */
  facilities: string[];
  /** 운영 방식 — 4개, 제목 + 1~2줄 */
  approach: { title: string; body: string }[];
  /** 운영 프로세스 4단계 표시 여부 (운영형 사업만) */
  showProcess?: boolean;
  /** HILINK 로 관리하는 것 — 한 문장 */
  system: string;
  /** 위탁 · 계약 형태 — 짧은 단어 */
  engagement: string[];
  ctaTitle: string;
  contactType: string;
};

export type BusinessArea = {
  no: string;
  slug: string;
  href: string;
  title: string;
  summary: string;
  points: string[];
  photo: PhotoId;
  detail: BusinessDetail;
};

export const businessAreas: BusinessArea[] = [
  {
    no: "01",
    slug: "apartment-community",
    href: "/business/apartment-community",
    title: "공동주택 커뮤니티 위탁운영",
    summary: "헬스장, 골프연습장, GX룸, 독서실, 카페까지 단지 커뮤니티센터 전체를 한 회사가 맡아 운영합니다.",
    points: ["인포메이션 · 트레이너 · 강사 운영", "입주민 프로그램 · 이벤트", "월간 운영 보고"],
    photo: "home-apartment",
    detail: {
      metaTitle: "아파트 커뮤니티 위탁운영",
      metaDescription:
        "아파트 커뮤니티센터 위탁운영. 헬스장 · 골프연습장 · GX룸 · 독서실 · 카페 운영 인력, 입주민 프로그램, 안면인식 출입과 예약, 월간 운영 보고까지 다짐이 맡습니다.",
      keywords: ["아파트 커뮤니티 위탁운영", "커뮤니티센터 위탁운영", "주민공동시설 위탁운영", "아파트 헬스장 위탁운영"],
      short: "아파트 커뮤니티",
      eyebrow: "CORE 01 · COMMUNITY OPERATION",
      heroTitle: "아파트 커뮤니티 위탁운영",
      heroLead: "인포메이션부터 헬스 · 골프 · GX까지,\n커뮤니티센터 운영 전체를 맡습니다.",
      heroImage: "visual-business-apartment",
      wideImage: "visual-business-apartment-wide",
      statement: {
        title: "커뮤니티센터는\n운영이 품질입니다.",
        body: "같은 시설도 누가 운영하느냐에 따라 이용률과 민원이 달라집니다. 인력 · 프로그램 · 정산 · 보고를 한 기준으로 운영합니다.",
      },
      facilities: ["헬스장", "골프연습장", "GX룸", "독서실 · 스터디룸", "작은도서관", "사우나", "수영장", "게스트하우스", "키즈카페", "카페"],
      approach: [
        { title: "인력 운영", body: "인포메이션 · 트레이너 · 강사를 배치하고, 본사가 교육과 대체 인력을 맡습니다." },
        { title: "입주민 프로그램", body: "수요 조사로 GX · 골프 레슨 · 이벤트를 편성합니다." },
        { title: "출입 · 예약 · 정산", body: "안면인식 출입, 시설 예약, 이용료 정산을 한 번에 처리합니다." },
        { title: "운영 보고", body: "매월 이용 현황 · 정산 · 민원 처리 결과를 보고합니다." },
      ],
      showProcess: true,
      system: "출입 · 예약 · 이용료 정산을 입주민 앱과 관리자 화면으로 관리합니다.",
      engagement: ["전체 위탁", "시설별 위탁", "HILINK만 도입"],
      ctaTitle: "커뮤니티 운영사를 찾고 계신가요?",
      contactType: "apartment",
    },
  },
  {
    no: "02",
    slug: "sports-fitness",
    href: "/business/sports-fitness",
    title: "스포츠 · 피트니스 시설 운영",
    summary: "헬스장, 골프연습장, 필라테스 · GX 시설을 전문 인력과 회원관리 시스템으로 운영합니다.",
    points: ["트레이너 · 골프 프로 · 강사 운영", "회원권 · 레슨 · 락커 관리", "기구 점검과 안전 교육"],
    photo: "home-sports",
    detail: {
      metaTitle: "스포츠 · 피트니스 시설 위탁운영",
      metaDescription:
        "헬스장 · 골프연습장 · 필라테스 · GX 시설 위탁운영. 트레이너 · 골프 프로 · 강사 운영, 회원권과 레슨 관리, 기구 점검과 안전 교육을 다짐이 맡습니다.",
      keywords: ["피트니스 위탁운영", "골프연습장 위탁운영", "스포츠시설 위탁운영", "헬스장 위탁운영"],
      short: "스포츠 · 피트니스",
      eyebrow: "CORE 01 · COMMUNITY OPERATION",
      heroTitle: "스포츠 · 피트니스 시설 운영",
      heroLead: "헬스 · 골프 · GX 시설의 인력과 회원,\n수업 운영을 맡습니다.",
      heroImage: "visual-business-sports",
      wideImage: "visual-business-sports-wide",
      statement: {
        title: "운영 인력이\n시설의 가치를 만듭니다.",
        body: "좋은 기구보다 중요한 건 매일의 수업과 회원 응대입니다. 트레이너 채용부터 회원 관리까지 운영을 책임집니다.",
      },
      facilities: ["헬스장", "골프연습장 · 스크린골프", "필라테스", "GX룸", "PT룸", "락커룸 · 샤워실"],
      approach: [
        { title: "인력 운영", body: "센터 매니저 · 트레이너 · 골프 프로 · 강사를 채용하고 교육합니다." },
        { title: "회원 관리", body: "이용권 · 재등록 · 상담 이력을 한 곳에서 관리합니다." },
        { title: "수업 · 레슨", body: "PT · 골프 레슨 · GX 일정과 예약을 운영합니다." },
        { title: "운영 보고", body: "매월 회원 · 매출 · 수업 현황을 보고합니다." },
      ],
      showProcess: true,
      system: "회원 · 이용권 · 출입 · 레슨 예약을 하나의 플랫폼으로 관리합니다.",
      engagement: ["전체 위탁", "인력 · 프로그램 위탁", "HILINK만 도입"],
      ctaTitle: "스포츠시설 운영을 맡길 곳이 필요하신가요?",
      contactType: "sports",
    },
  },
  {
    no: "03",
    slug: "community-facility",
    href: "/business/community-facility",
    title: "기업 · 호텔 · 복합시설 커뮤니티 운영",
    summary: "기업 사옥, 호텔, 레지던스의 피트니스 · 라운지 등 공용 시설을 운영합니다.",
    points: ["이용자 유형별 출입 권한", "공용 시설 예약 · 대관", "이용 현황 보고"],
    photo: "business-community-facility",
    detail: {
      metaTitle: "기업 · 호텔 커뮤니티 시설 운영",
      metaDescription:
        "기업 사옥 · 호텔 · 레지던스의 피트니스, 라운지, 다목적실 등 공용 시설 운영. 이용자 유형별 출입 권한, 예약 · 대관, 이용 현황 보고를 다짐이 맡습니다.",
      keywords: ["기업 피트니스 운영", "호텔 피트니스 위탁운영", "레지던스 커뮤니티 운영", "복합시설 위탁운영"],
      short: "기업 · 호텔",
      eyebrow: "CORE 01 · COMMUNITY OPERATION",
      heroTitle: "기업 · 호텔 커뮤니티 운영",
      heroLead: "피트니스 · 라운지 · 공용시설을\n전문 운영인력과 시스템으로 관리합니다.",
      heroImage: "visual-business-hotel",
      wideImage: "visual-business-corporate-wide",
      statement: {
        title: "공간에 맞는 운영이\n필요합니다.",
        body: "기업, 호텔, 레지던스는 이용자와 이용시간이 모두 다릅니다. 입주자 중심의 아파트와는 다른 출입 · 예약 · 서비스 기준이 필요합니다.",
      },
      facilities: ["피트니스", "GX", "라운지", "다목적실", "게스트룸", "카페"],
      approach: [
        { title: "인력 운영", body: "운영 매니저 · 트레이너 · 안내 인력을 배치하고 교육합니다." },
        { title: "회원 · 이용자 관리", body: "임직원 · 투숙객 · 입주자별 이용 기준을 운영합니다." },
        { title: "예약 · 출입 관리", body: "이용자 유형별 출입 권한과 시설 예약 · 대관을 관리합니다." },
        { title: "운영 보고", body: "매월 시설별 이용 현황과 운영 이슈를 보고합니다." },
      ],
      system: "출입, 예약, 이용현황을 하나의 플랫폼으로 관리합니다.",
      engagement: ["전체 위탁", "HILINK만 도입"],
      ctaTitle: "시설 운영이 필요하신가요?",
      contactType: "etc",
    },
  },
  {
    no: "04",
    slug: "consulting",
    href: "/business/consulting",
    title: "시설 운영 컨설팅 · 활성화",
    summary: "이용이 저조한 시설을 진단하고, 기구 보강 · 공간 전환 · 프로그램 개편으로 개선합니다.",
    points: ["시설 · 이용 현황 진단", "공간 전환 · 기구 보강 제안", "입주 전 운영 준비"],
    photo: "business-consulting",
    detail: {
      metaTitle: "커뮤니티 운영 컨설팅 · 시설 개선",
      metaDescription:
        "커뮤니티 시설 진단과 개선. 운동기구 보강, 천막 타석의 스크린골프 전환, 유휴 공간 활용, GX 프로그램 개편, 입주 전 운영 준비를 지원합니다.",
      keywords: ["커뮤니티 운영 컨설팅", "커뮤니티 시설 개선", "아파트 커뮤니티 활성화", "입주 전 커뮤니티 준비"],
      short: "운영 컨설팅",
      eyebrow: "CORE 01 · CONSULTING",
      heroTitle: "시설 운영 컨설팅 · 활성화",
      heroLead: "이용이 저조한 시설을 진단하고,\n다시 쓰이게 만드는 개선안을 제안합니다.",
      heroImage: "visual-business-consulting",
      wideImage: "visual-business-consulting-wide",
      statement: {
        title: "문제는 시설보다\n운영에 있는 경우가 많습니다.",
        body: "이용 데이터와 현장을 함께 보고 원인을 찾습니다. 직접 운영해 본 기준으로 실행 가능한 개선안만 제안합니다.",
      },
      scopeTitle: "진단 대상",
      facilities: ["헬스장", "골프연습장", "GX룸", "독서실", "유휴 공간", "카페"],
      approach: [
        { title: "현장 진단", body: "시설 · 설비 상태와 동선을 직접 점검합니다." },
        { title: "이용 분석", body: "시간대별 · 시설별 이용 현황과 민원을 분석합니다." },
        { title: "개선안 제안", body: "기구 보강 · 공간 전환 · 프로그램 개편안을 제시합니다." },
        { title: "실행 · 안정화", body: "개선 후 운영 전환과 이용 변화를 관리합니다." },
      ],
      system: "출입 · 예약 데이터로 개선 전후 이용 변화를 확인합니다.",
      engagement: ["진단 · 제안", "개선 실행", "위탁운영 전환"],
      ctaTitle: "시설 이용률이 고민이신가요?",
      contactType: "consulting",
    },
  },
  {
    no: "지원",
    slug: "equipment",
    href: "/business/equipment",
    title: "시설 지원 (기구 · 스크린골프)",
    summary: "보조 서비스 — 운영 중 필요할 때 헬스기구 보강 · 교체와 스크린골프 타석 구축을 운영 경험을 바탕으로 지원합니다.",
    points: ["헬스기구 구성 · 납품", "스크린골프 타석 설치", "설치 후 점검 연계"],
    photo: "business-equipment",
    detail: {
      metaTitle: "운동기구 · 스크린골프 납품",
      metaDescription:
        "아파트 커뮤니티 · 스포츠시설 헬스기구와 스크린골프 납품. 이용자 구성에 맞춘 기구 구성, 설치, 안면인식 출입 · 예약 시스템 연동과 사후 점검을 지원합니다.",
      keywords: ["아파트 헬스기구 납품", "스크린골프 납품", "커뮤니티 운동기구", "피트니스 기구 납품"],
      short: "시설 지원",
      eyebrow: "SUPPORTING SERVICE · FACILITY SUPPORT",
      heroTitle: "시설 지원 · 기구 · 스크린골프",
      heroLead: "운영 현장에서 확인한 기준으로\n운동기구와 스크린골프를 구축합니다.",
      heroImage: "visual-business-equipment",
      wideImage: "visual-business-equipment-wide",
      statement: {
        title: "운영해 본 회사가\n기구를 고릅니다.",
        body: "자주 쓰이는 기구와 고장이 잦은 기구를 현장에서 확인했습니다. 이용자 구성에 맞는 기구와 타석을 제안합니다.",
      },
      scopeTitle: "구축 범위",
      facilities: ["유산소 기구", "근력 기구", "스트레칭 존", "필라테스 · GX", "스크린골프 타석"],
      approach: [
        { title: "구성 제안", body: "공간과 이용자 연령대에 맞춰 기구 구성을 정합니다." },
        { title: "납품 · 설치", body: "일정에 맞춰 기구와 타석을 설치합니다." },
        { title: "시스템 연동", body: "필요하면 출입 · 예약 시스템을 함께 구축합니다." },
        { title: "사후 점검", body: "설치 후 정기 점검을 안내합니다." },
      ],
      system: "기구 설치와 함께 안면인식 출입 · 예약 시스템을 구축할 수 있습니다.",
      engagement: ["기구 납품 · 설치", "스크린골프 구축", "구축 + 시스템"],
      ctaTitle: "기구 교체나 타석 구축을 검토 중이신가요?",
      contactType: "equipment",
    },
  },
];

export function getBusiness(slug: string) {
  return businessAreas.find((b) => b.slug === slug);
}
