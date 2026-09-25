import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CorporateProof } from "@/components/home/CorporateProof";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { OperationSystem } from "@/components/home/OperationSystem";
import { HqManagement } from "@/components/home/HqManagement";
import { Transformations } from "@/components/home/Transformations";
import { FacilityExpertise } from "@/components/home/FacilityExpertise";
import { HilinkSection } from "@/components/home/HilinkSection";
import { TrackRecord } from "@/components/home/TrackRecord";
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
 * HOME — Who we are → Proof → What we operate → How we operate → Cases → Technology → Track record → Contact
 * (OPERATION FIRST, TECHNOLOGY ENABLED)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CorporateProof />
      <WhatWeDo />
      <OperationSystem />
      <HqManagement />
      <Transformations />
      <FacilityExpertise />
      <HilinkSection />
      <TrackRecord />
      <WhyDagym />
      <CTASection />
    </>
  );
}
