import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { TrustMetrics } from "@/components/home/TrustMetrics";
import { BusinessSection } from "@/components/home/BusinessSection";
import { WhyDagym } from "@/components/home/WhyDagym";
import { OfflineDigital } from "@/components/home/OfflineDigital";
import { HilinkSection } from "@/components/home/HilinkSection";
import { FacilitiesSection } from "@/components/home/FacilitiesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/data/config";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustMetrics />
      <BusinessSection />
      <WhyDagym />
      <OfflineDigital />
      <HilinkSection />
      <FacilitiesSection />
      <ProjectsSection />
      <CTASection />
    </>
  );
}
