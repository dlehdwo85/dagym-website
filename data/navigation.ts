import { businessAreas } from "./business";
import { publishedProjects } from "./projects";

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; en: string; href: string; mega?: "business" | "hilink"; children?: NavChild[] };

/** 운영 사례는 확인된 현장이 있을 때만 메뉴에 노출 */
const hasProjects = publishedProjects.length > 0;

export const mainNav: NavItem[] = [
  { label: "회사소개", en: "Company", href: "/company" },
  {
    label: "사업영역",
    en: "Business",
    href: "/business",
    mega: "business",
    children: businessAreas.map((b) => ({ label: b.title, href: b.href })),
  },
  { label: "HILINK", en: "Platform", href: "/hilink", mega: "hilink" },
  ...(hasProjects ? [{ label: "운영사례", en: "Portfolio", href: "/projects" }] : []),
  { label: "인사이트", en: "Insight", href: "/insight" },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Business",
    links: businessAreas.map((b) => ({ label: b.title, href: b.href })),
  },
  {
    title: "Company",
    links: [
      { label: "회사소개", href: "/company" },
      { label: "HILINK", href: "/hilink" },
      ...(hasProjects ? [{ label: "운영사례", href: "/projects" }] : []),
      { label: "공지 · 자주 묻는 질문", href: "/insight" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "운영 문의하기", href: "/contact" },
      { label: "HILINK 도입 문의", href: "/contact?type=hilink" },
    ],
  },
];
