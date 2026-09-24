import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeBusiness } from "@/components/home/HomeBusiness";
import { HomeFieldWork } from "@/components/home/HomeFieldWork";
import { HomeSites } from "@/components/home/HomeSites";
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
        title={"수영장부터 게스트하우스까지,\n커뮤니티 시설 전체를 운영합니다."}
        description="운동시설만이 아니라 카페, 도서관, 게스트하우스처럼 입주민이 함께 쓰는 공간을 같은 운영 기준으로 관리합니다."
      />
      <HomeSites />
      <HomeHilink />
      <CTASection
        title={"우리 단지 커뮤니티,\n운영 상담을 받아보세요."}
        description="단지명, 세대수, 운영 중인 시설과 현재 운영 방식을 알려주시면 현장 확인 후 운영 인력 · 프로그램 · 이용료 부과 방식까지 포함한 운영안을 제안해 드립니다."
      />
    </>
  );
}
