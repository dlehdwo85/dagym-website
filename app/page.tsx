import type { Metadata } from "next";
import { OurOperations } from "@/components/home/OurOperations";
import { BusinessStructure, CompanyTeaser, FacilityPortfolio, GroupHero, PlatformSuite } from "@/components/group/GroupSections";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/data/config";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
};

/**
 * HOME (기업형) — 회사 · 두 사업 부문 → 사업 구조 → 시설 운영 부문 → 플랫폼 부문(HILINK · 워크인) → 운영실적 → 회사 → 문의
 */
export default function HomePage() {
  return (
    <>
      <GroupHero />
      <BusinessStructure />
      <FacilityPortfolio />
      <PlatformSuite />
      <OurOperations />
      <CompanyTeaser />
      <CTASection track="cta_banner" />
    </>
  );
}
