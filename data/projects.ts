import type { FacilityIcon } from "./facilities";
import type { Verifiable } from "./config";

/**
 * 프로젝트(운영 현장) 데이터.
 *
 * 새 현장 추가 방법:
 *   1) 아래 projects 배열에 객체 하나를 추가합니다.
 *   2) 사진은 /public/images/projects/<slug>/ 에 넣고 cover · gallery 에 경로를 입력합니다.
 *   3) 계약 · 공개 동의가 확인된 현장만 verified: true 로 입력합니다.
 *      verified: true 인 현장이 하나 이상 생기면 홈 · 메뉴 · 운영사례 페이지에 자동으로 노출됩니다.
 *
 * 향후 Supabase / Headless CMS 로 옮길 때도 이 타입을 그대로 테이블 스키마로 사용할 수 있습니다.
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

/**
 * 확인된 운영 현장만 입력합니다. (verified: true 인 항목만 사이트에 노출)
 *
 * 예시)
 * {
 *   slug: "example-apartment",
 *   name: "OO 아파트 커뮤니티센터",
 *   category: "apartment",
 *   region: "인천 미추홀구",
 *   scale: "0,000세대",
 *   facilities: ["fitness", "golf", "gx", "study"],
 *   operationTypes: ["위탁운영", "HILINK 도입"],
 *   hilink: true,
 *   period: "2025.03 –",
 *   summary: "한 줄 소개",
 *   scope: ["운영 범위 1", "운영 범위 2"],
 *   solutions: [{ title: "운영 포인트", body: "설명" }],
 *   cover: "/images/projects/<slug>/cover.jpg",
 *   gallery: ["/images/projects/<slug>/1.jpg"],
 *   featured: true,
 *   verified: true,
 * }
 */
export const projects: Project[] = [];

/** 방문자에게 공개 가능한(확인된) 현장 */
export const publishedProjects = projects.filter((p) => p.verified);

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

export const featuredProjects = publishedProjects.filter((p) => p.featured).slice(0, 6);
