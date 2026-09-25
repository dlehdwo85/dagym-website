import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CompanyStatement } from "@/components/home/CompanyStatement";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { OperationSystem } from "@/components/home/OperationSystem";
import { FacilityExpertise } from "@/components/home/FacilityExpertise";
import { OurOperations } from "@/components/home/OurOperations";
import { HilinkSection } from "@/components/home/HilinkSection";
import { WhyDagym } from "@/components/home/WhyDagym";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/data/config";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
};

/**
 * HOME — 운영회사 → 실제 현장 → 자체 기술 순서
 * Hero → 회사 소개 → 사업 → 운영 시스템 → 시설 전문성 → 운영실적 → HILINK → Why → 문의
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyStatement />
      <WhatWeDo />
      <OperationSystem />
      <FacilityExpertise />
      <OurOperations />
      <HilinkSection />
      <WhyDagym />
      <CTASection />
    </>
  );
}
