import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeBusiness } from "@/components/home/HomeBusiness";
import { HomeFieldWork } from "@/components/home/HomeFieldWork";
import { FacilityMedia } from "@/components/sections/FacilityMedia";
import { HomeHilink } from "@/components/home/HomeHilink";
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
      <HomeBusiness />
      <HomeFieldWork />
      <FacilityMedia
        id="home-facility-media"
        title="일상의 공간을 함께 운영합니다."
        
      />
      <HomeHilink />
      <CTASection
        title={"우리 단지 커뮤니티,\n운영 상담을 받아보세요."}
        description="현장을 살펴보고 필요한 운영안을 제안합니다."
      />
    </>
  );
}
