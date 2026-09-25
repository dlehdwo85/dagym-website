import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFacilities } from "@/components/home/HomeFacilities";
import { HomeBusiness } from "@/components/home/HomeBusiness";
import { HomeFieldWork } from "@/components/home/HomeFieldWork";
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
      <HomeFacilities />
      <HomeBusiness />
      <HomeFieldWork />
      <HomeHilink />
      <CTASection title="우리 단지 커뮤니티 운영, 상담해 보세요." description="현장을 확인한 뒤 운영안을 제안해 드립니다." />
    </>
  );
}
