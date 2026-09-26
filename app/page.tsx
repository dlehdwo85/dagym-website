import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CoreBusiness } from "@/components/home/CoreBusiness";
import { OperationSystem } from "@/components/home/OperationSystem";
import { FacilityExpertise } from "@/components/home/FacilityExpertise";
import { OurOperations } from "@/components/home/OurOperations";
import { HilinkSection } from "@/components/home/HilinkSection";
import { Transformations } from "@/components/home/Transformations";
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
 * HOME — 운영회사 정체성 → 핵심사업 2개 → 실제 운영 단지 → 운영 범위 · 방식 → 플랫폼 → 개선 → 신뢰 → 문의
 * Hero → 핵심사업(커뮤니티 운영 · HILINK) → 운영실적 → 운영 범위 → 운영 방식 → HILINK → 운영 개선 → Why → 문의
 * 시설 지원(기구 · 스크린골프)은 핵심사업 하단 보조 서비스로만 노출합니다.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreBusiness tone="mist" />
      <OurOperations />
      <FacilityExpertise />
      <OperationSystem withVisuals />
      <HilinkSection />
      <Transformations />
      <WhyDagym />
      <CTASection track="cta_banner" />
    </>
  );
}
