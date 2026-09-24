import { businessAreas } from "./business";

export type NavChild = { label: string; href: string; description?: string; en?: string };
export type NavItem = {
  label: string;
  href: string;
  ko: string;
  intro?: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  {
    label: "COMPANY",
    href: "/company",
    ko: "회사소개",
    intro: "공간을 이해하고 운영의 기준을 만드는 회사.",
    children: [
      { label: "회사소개", href: "/company#about", en: "About" },
      { label: "Mission & Vision", href: "/company#mission", en: "Mission" },
      { label: "핵심가치", href: "/company#values", en: "Values" },
      { label: "운영 시스템", href: "/company#system", en: "System" },
      { label: "회사 정보", href: "/company#info", en: "Information" },
    ],
  },
  {
    label: "BUSINESS",
    href: "/business",
    ko: "사업영역",
    intro: "공간에 맞는 운영을 설계합니다.",
    children: businessAreas.map((b) => ({
      label: b.ko,
      href: b.href,
      en: b.en,
      description: b.summary,
    })),
  },
  {
    label: "HILINK",
    href: "/hilink",
    ko: "HILINK",
    intro: "커뮤니티 운영을 하나의 플랫폼으로.",
    children: [
      { label: "플랫폼 개요", href: "/hilink", en: "Overview" },
      { label: "주요 기능", href: "/hilink#features", en: "Features" },
      { label: "운영 흐름", href: "/hilink#flow", en: "Flow" },
      { label: "도입 문의", href: "/contact?type=hilink", en: "Request Demo" },
    ],
  },
  { label: "PORTFOLIO", href: "/projects", ko: "운영 사례" },
  {
    label: "INSIGHT",
    href: "/insight",
    ko: "인사이트",
    children: [
      { label: "NEWS", href: "/insight?tab=news", en: "뉴스" },
      { label: "NOTICE", href: "/insight?tab=notice", en: "공지" },
      { label: "MEDIA", href: "/insight?tab=media", en: "미디어" },
      { label: "FAQ", href: "/insight?tab=faq", en: "자주 묻는 질문" },
    ],
  },
  { label: "CONTACT", href: "/contact", ko: "문의하기" },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "회사소개", href: "/company" },
      { label: "Mission & Vision", href: "/company#mission" },
      { label: "회사 정보", href: "/company#info" },
    ],
  },
  {
    title: "Business",
    links: businessAreas.map((b) => ({ label: b.ko, href: b.href })),
  },
  {
    title: "HILINK",
    links: [
      { label: "플랫폼 개요", href: "/hilink" },
      { label: "주요 기능", href: "/hilink#features" },
      { label: "도입 문의", href: "/contact?type=hilink" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "운영 사례", href: "/projects" },
      { label: "인사이트", href: "/insight" },
      { label: "FAQ", href: "/insight?tab=faq" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "운영 상담 신청", href: "/contact" },
      { label: "HILINK 도입 문의", href: "/contact?type=hilink" },
    ],
  },
];
