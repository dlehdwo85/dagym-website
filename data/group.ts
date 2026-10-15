import type { PhotoId } from "./photos";

/**
 * 기업형 홈 — 사업 부문 구조 (시설 운영 · 플랫폼)
 * 운영 시설 유형은 "제공 · 제안 범위"이며 실적이 아닙니다. 실적은 /projects 에서만 다룹니다.
 */

export const groupHero = {
  eyebrow: "DAGYM · 주식회사 다짐",
  title: "공간을 운영하고,\n운영을 플랫폼으로 연결합니다.",
  lead: "주식회사 다짐은 공동주택 · 오피스텔 · 호텔 · 산업단지 등 다양한 시설을 운영하고, HILINK와 워크인으로 운영과 업무의 방식을 바꿉니다.",
  image: "group-hero-district" as PhotoId,
  ctas: [
    { label: "사업 부문 보기", href: "#divisions" },
    { label: "운영 상담 문의", href: "/contact?type=operation" },
  ],
};

export type Division = {
  no: string;
  en: string;
  title: string;
  lead: string;
  units: { name: string; body: string; href?: string; status?: "live" | "coming-soon" }[];
};

/** 두 사업 부문 */
export const divisions: Division[] = [
  {
    no: "01",
    en: "Facility Operation",
    title: "시설 운영 부문",
    lead: "다양한 시설의 운영 계획부터 인력 · 프로그램 · 정산 관리까지 본사 운영체계로 맡습니다.",
    units: [
      { name: "위탁운영", body: "커뮤니티 · 피트니스 · 공용 시설 전체 또는 일부 운영", href: "/business" },
      { name: "운영 컨설팅", body: "현장 진단 · 개선안 · 입주 전 운영 준비", href: "/business/consulting" },
      { name: "시설 지원", body: "기구 보강 · 스크린골프 · 공간 환경 개선", href: "/business/equipment" },
    ],
  },
  {
    no: "02",
    en: "Platform",
    title: "플랫폼 부문",
    lead: "다짐이 보유 · 운영하는 플랫폼으로 시설 운영과 회사 업무를 연결합니다.",
    units: [
      { name: "HILINK", body: "회원 · 출입 · 예약 · 결제를 연결하는 커뮤니티 운영 플랫폼", href: "/hilink", status: "live" },
      { name: "워크인", body: "업무 · 일정 · 알림을 한 곳에서 관리하는 업무 플랫폼", status: "coming-soon" },
    ],
  },
];

/** 운영 · 제안 시설 유형 */
export const facilityTypes: { title: string; en: string; body: string; photo: PhotoId; href: string }[] = [
  { title: "공동주택", en: "Residential", body: "아파트 커뮤니티센터 전체 운영", photo: "group-apartment", href: "/business/apartment-community" },
  { title: "오피스텔 · 레지던스", en: "Residence", body: "입주자 공용 시설 · 라운지 운영", photo: "group-residence", href: "/business/community-facility" },
  { title: "호텔", en: "Hospitality", body: "피트니스 · 웰니스 · 부대시설 운영", photo: "group-hotel", href: "/business/community-facility" },
  { title: "기업 · 산업단지", en: "Corporate", body: "임직원 복지시설 · 사내 피트니스 운영", photo: "group-industrial", href: "/business/community-facility" },
];

export type Platform = {
  name: string;
  en: string;
  tagline: string;
  body: string;
  features: string[];
  status: "live" | "coming-soon";
  href?: string;
};

/** 플랫폼 — status 가 coming-soon 이면 링크 없이 "출시 예정"으로 표시 */
export const platforms: Platform[] = [
  {
    name: "HILINK",
    en: "Community Operation Platform",
    tagline: "커뮤니티 운영 플랫폼",
    body: "입주민 앱과 관리자 화면으로 회원 · 출입 · 예약 · 결제 · 운영 데이터를 한 시스템에서 관리합니다.",
    features: ["회원 · 이용권", "안면인식 출입 연동", "시설 예약", "결제 · 정산 자료"],
    status: "live",
    href: "/hilink",
  },
  {
    name: "워크인",
    en: "WORKIN",
    tagline: "업무 · 일정 · 알림 플랫폼",
    body: "업무와 일정을 한 곳에서 관리하고, 필요한 시간에 정확히 알림을 받는 업무 플랫폼입니다.",
    features: ["음성으로 업무 등록", "정확한 시간 알림", "업무 = 일정 캘린더", "AI 정리 · 요약"],
    status: "coming-soon",
  },
];
