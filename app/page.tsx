import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { HomeHero } from "@/components/home/HomeHero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { Numbers } from "@/components/home/Numbers";
import { BusinessStory, type StoryItem } from "@/components/home/BusinessStory";
import { Ecosystem } from "@/components/home/Ecosystem";
import { OperatingModel } from "@/components/home/OperatingModel";
import { PeopleTech } from "@/components/home/PeopleTech";
import { FacilityGrid } from "@/components/home/FacilityGrid";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HilinkSecondHero } from "@/components/hilink/HilinkSecondHero";
import { CTASection } from "@/components/sections/CTASection";
import { businessAreas } from "@/data/business";
import { businessStory, ecosystem, hero, operatingModel, peopleTech, statement } from "@/data/showroom";
import { siteConfig } from "@/data/config";
import { photoRef, type PhotoRef } from "@/lib/photos";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
};

/** 첫 화면 풀블리드 영상 — public/videos/hero.mp4 가 있으면 사용 */
function heroVideo() {
  const file = "/videos/hero.mp4";
  return fs.existsSync(path.join(process.cwd(), "public", file)) ? { src: file, poster: photoRef("home-hero")?.src } : undefined;
}

export default function HomePage() {
  const slides = hero.slides.map((s) => ({ ...photoRef(s.photo), label: s.label })).filter((s): s is PhotoRef & { label: string } => Boolean(s.src));
  const heroImage = photoRef("home-hero");
  const video = heroVideo();

  const story: StoryItem[] = businessAreas.map((b) => ({
    no: b.no,
    href: b.href,
    en: businessStory[b.slug]?.en ?? "",
    title: b.title,
    summary: b.summary,
    points: b.points,
    image: businessStory[b.slug] ? photoRef(businessStory[b.slug].photo) : undefined,
  }));

  const eco = ecosystem.map((e) => ({ en: e.en, ko: e.ko, note: e.note, image: e.photo ? photoRef(e.photo) : undefined }));

  return (
    <>
      <HomeHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
        facilities={hero.facilities}
        slides={slides}
        fullBleed={video || heroImage ? { video, image: heroImage } : undefined}
      />
      <BrandStatement {...statement} />
      <Numbers />
      <BusinessStory items={story} />
      <Ecosystem items={eco} />
      <OperatingModel steps={operatingModel} />
      <PeopleTech pairs={peopleTech} />
      <HilinkSecondHero />
      <FacilityGrid />
      <HomeProjects />
      <CTASection />
    </>
  );
}
