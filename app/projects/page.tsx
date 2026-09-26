import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { OurOperations } from "@/components/home/OurOperations";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "운영실적",
  description: "다짐이 커뮤니티를 운영해 온 공동주택 단지.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="운영실적"
        en="Track record"
        title="다짐이 운영해 온 공간입니다."
        description="다양한 규모와 형태의 공동주택 커뮤니티를 현장에서 운영해왔습니다."
        breadcrumbs={[{ name: "운영실적", path: "/projects" }]}
      />
      <OurOperations asPage />
      <CTASection />
    </>
  );
}
