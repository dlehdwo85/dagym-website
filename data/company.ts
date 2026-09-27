/** COMPANY 페이지 콘텐츠 */

/** 브랜드 문장 — 다짐(DAGYM)이라는 이름의 의미 */
export const brandMotto = "좋은 마음가짐으로 미래를 결정하자.";

export const companyHero = {
  eyebrow: "ABOUT DAGYM",
  title: "좋은 마음가짐으로\n미래를 결정합니다.",
  lead: "다짐은 공간을 운영하는 기술보다, 그 공간과 사람을 대하는 마음가짐이 먼저라고 생각합니다. 오늘의 운영을 더 나은 기준으로 바꾸는 것이 더 나은 미래를 만든다고 믿습니다.",
};

/** WHY DAGYM — 이름의 의미를 3단계로 */
export const whyDagym = {
  title: "다짐이라는 이름에\n우리가 일하는 이유를 담았습니다.",
  steps: [
    { en: "Good Mindset", ko: "좋은 마음가짐", body: "사람과 공간을 책임 있게 대하는 태도에서 운영이 시작됩니다." },
    { en: "Better Standard", ko: "더 나은 기준", body: "경험에만 의존하지 않고 기록과 기준으로 운영합니다." },
    { en: "Better Future", ko: "더 나은 미래", body: "오늘의 작은 개선이 더 좋은 커뮤니티의 내일을 만든다고 믿습니다." },
  ],
};

/** WHAT WE DO — 두 핵심사업만 (상세는 /business · /hilink) */
export const whatWeDo = {
  title: "공간을 운영하고,\n운영을 시스템으로 연결합니다.",
  items: [
    {
      no: "01",
      en: "Community Operation",
      title: "커뮤니티 시설 전문 위탁운영",
      body: "아파트 · 기업 · 호텔의 커뮤니티 시설을 전문 인력과 본사 운영체계로 운영합니다.",
      cta: { label: "사업영역 보기", href: "/business" },
    },
    {
      no: "02",
      en: "HILINK Platform",
      title: "커뮤니티 운영 플랫폼",
      body: "회원 · 출입 · 예약 · 결제 · 운영 데이터를 하나의 시스템으로 연결합니다.",
      cta: { label: "HILINK 보기", href: "/hilink" },
    },
  ],
};

/** OUR PRINCIPLES — 다짐이 지키는 기준 */
export const principles = {
  title: "다짐이 지키는 기준",
  lead: "경험에만 의존하지 않고, 기준과 데이터로 운영합니다.",
  items: [
    { title: "좋은 태도", body: "시설보다 먼저 사람을 생각하고, 작은 요청도 운영의 중요한 신호로 봅니다." },
    { title: "책임 있는 운영", body: "현장에 맡기고 끝내지 않고 본사가 운영 과정에 함께 참여합니다." },
    { title: "기록과 기준", body: "경험에만 의존하지 않고 점검 · 이용 · 운영 기록을 기준으로 판단합니다." },
    { title: "지속적인 개선", body: "현재 방식에 머무르지 않고 이용자 의견과 운영 데이터를 바탕으로 계속 조정합니다." },
  ],
};

/** 회사 개요 — 주요 사업 표기 */
export const mainBusinessLine = "커뮤니티 시설 전문 위탁운영 · 커뮤니티 운영 플랫폼(HILINK) 구축 · 납품";

export const companyCta = {
  eyebrow: "다짐과 함께",
  title: "좋은 운영은\n좋은 마음가짐에서 시작합니다.",
  description: "다짐은 공간을 맡는 것에서 끝나지 않고, 더 나은 운영 기준을 함께 만들어갑니다.",
};

/** 본사 지원 조직 — 역할 중심 */
export const hqSupport = [
  { title: "운영기획", body: "신규 현장 분석, 운영 시스템 구축, 오픈 준비" },
  { title: "인사 · 교육", body: "채용, 계약 · 노무 관리, 직원 역량 교육" },
  { title: "회계 · 정산", body: "비용 정산, 세무 신고, 이용료 정산 지원" },
  { title: "HILINK", body: "시스템 개발 · 설치 · 기술 지원" },
];
