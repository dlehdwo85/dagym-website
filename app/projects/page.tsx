import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { KoreaDotMap } from "@/components/visuals/KoreaDotMap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "운영 사례 · 포트폴리오",
  description:
    "다짐이 운영하는 아파트 커뮤니티, 스포츠시설, 기업 · 공공시설 프로젝트. 현장별 운영시설, 운영 범위, HILINK 적용 여부를 확인하세요.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  const located = projects.filter((p) => p.location && p.verified);
  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title={
          <>
            우리가 운영한 공간이
            <br />
            다짐의 실력입니다.
          </>
        }
        description="아파트 커뮤니티부터 스포츠시설, 기업 · 공공시설까지. 현장마다 다른 조건을 다짐의 운영 모델로 풀어낸 사례입니다."
        breadcrumbs={[{ name: "PORTFOLIO", path: "/projects" }]}
        aside={
          located.length > 0 ? (
            <div className="mx-auto max-w-[16rem]">
              <KoreaDotMap projects={located} className="w-full" />
              <p className="mt-4 text-center text-[0.8125rem] text-white/50">운영 지역</p>
            </div>
          ) : undefined
        }
      />
      <section className="bg-white pb-24 pt-12 lg:pb-32 lg:pt-16" aria-label="프로젝트 목록">
        <div className="container-x">
          <ProjectFilter projects={projects} />
        </div>
      </section>
      <section className="section-y border-t border-mist-200 bg-mist-50" aria-labelledby="proj-note-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="Your project"
            id="proj-note-title"
            title={"다음 사례는\n당신의 공간일 수 있습니다."}
            description="신축 단지의 입주 준비부터 기존 시설의 운영 전환까지, 현장 조건을 알려주시면 적합한 운영 모델을 제안해 드립니다."
            align="split"
          />
        </div>
      </section>
      <CTASection />
    </>
  );
}
