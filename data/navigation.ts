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
  { label: "운영 개선", en: "Transformation", href: "/cases" },
  { label: "HILINK", en: "Platform", href: "/hilink", mega: "hilink" },
  ...(hasProjects ? [{ label: "운영실적", en: "Track record", href: "/projects" }] : []),
  { label: "인사이트", en: "Insight", href: "/insight" },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "사업영역",
    links: businessAreas.map((b) => ({ label: b.title, href: b.href })),
  },
  {
    title: "회사",
    links: [
      { label: "회사소개", href: "/company" },
      { label: "운영 개선 사례", href: "/cases" },
      { label: "HILINK", href: "/hilink" },
      ...(hasProjects ? [{ label: "운영실적", href: "/projects" }] : []),
      { label: "공지 · 자주 묻는 질문", href: "/insight" },
    ],
  },
  {
    title: "문의",
    links: [
      { label: "운영 제안 문의", href: "/contact?type=proposal" },
      { label: "현장 진단 문의", href: "/contact?type=diagnosis" },
      { label: "HILINK 도입 문의", href: "/contact?type=hilink" },
    ],
  },
];
