/**
 * HOME 전용 콘텐츠.
 * heroImage / heroVideo 에 실제 커뮤니티센터 고해상도 사진·영상을 넣으면
 * 평면도 비주얼 대신 전체 화면 배경으로 노출됩니다. (저해상도 이미지는 사용하지 마세요)
 */
export const homeHero = {
  eyebrow: "DAGYM — Community Operation Company",
  title: ["공간을 운영하고", "경험을 설계합니다."],
  sub: "아파트 커뮤니티부터 스포츠시설까지\n현장 운영과 HILINK 스마트 운영 시스템을 하나로 연결합니다.",
  primary: { label: "운영 서비스 알아보기", href: "/business" },
  secondary: { label: "HILINK 알아보기", href: "/hilink" },
  heroImage: undefined as string | undefined, // 예: "/images/hero/community-center.jpg"
  heroVideo: undefined as string | undefined, // 예: "/videos/hero.mp4"
  keywords: ["Community", "Operation", "Technology", "Data", "Wellness", "Smart Management"],
};

export const whyDagym = [
  {
    key: "operation",
    en: "Operation",
    title: "현장 중심 전문 운영",
    body: "센터장 · 트레이너 · 골프 프로 · GX 강사 · 안내 인력이 한 조직으로 움직입니다. 결원이 생겨도 운영이 멈추지 않도록 대체 인력과 매뉴얼을 갖춥니다.",
    points: ["직무별 채용 · 교육 기준", "센터장 중심 단일 보고 체계", "대체 인력 운영"],
  },
  {
    key: "technology",
    en: "Technology",
    title: "HILINK 기반 스마트 운영",
    body: "출입 · 예약 · 결제 · 락커 · 공지를 자체 플랫폼 HILINK로 처리합니다. 외부 솔루션을 따로 붙이지 않아 도입과 연동이 간단합니다.",
    points: ["안면인식 출입통제", "강좌 · 타석 · 좌석 예약", "결제 · 매출 자동 집계"],
  },
  {
    key: "standardization",
    en: "Standardization",
    title: "표준화된 운영 프로세스",
    body: "오픈 · 마감 · 위생 · 안전 · 민원 대응을 체크리스트로 표준화합니다. 현장이 달라도 같은 기준으로 운영 품질을 유지합니다.",
    points: ["오픈 · 마감 체크리스트", "위생 · 안전 점검표", "민원 대응 절차"],
  },
  {
    key: "data",
    en: "Data",
    title: "데이터 기반 의사결정",
    body: "누가, 언제, 어떤 시설을 얼마나 이용했는지가 데이터로 남습니다. 입주자대표회의와 관리사무소는 수치를 근거로 운영을 결정합니다.",
    points: ["시간대 · 시설별 이용률", "매출 · 정산 리포트", "월간 운영 보고"],
  },
] as const;

export const offlineOperation = ["현장 인력", "트레이너", "골프 프로", "GX 강사", "센터장", "시설관리", "고객응대"];
export const digitalOperation = [
  "회원관리",
  "안면인식 출입",
  "수업 예약",
  "좌석 예약",
  "골프 타석 예약",
  "락커 관리",
  "결제",
  "매출 통계",
  "공지 · 알림",
  "대관",
  "시설 이용관리",
];
