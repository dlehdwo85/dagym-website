import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { facilities } from "@/data/facilities";
import { categoryLabel, publishedProjects, type ProjectCategory } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

const hasProjects = publishedProjects.length > 0;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "운영사례",
    description: "다짐이 운영하는 아파트 커뮤니티 · 스포츠시설 · 기업 커뮤니티 현장과 운영 시설, 운영 범위, HILINK 적용 여부.",
    path: "/projects",
  }),
  // 확인된 현장이 없는 동안에는 검색 색인에서 제외
  ...(hasProjects ? {} : { robots: { index: false, follow: true } }),
};

export default function ProjectsPage() {
  const groups = (Object.keys(categoryLabel) as ProjectCategory[])
    .map((c) => ({ c, items: publishedProjects.filter((p) => p.category === c) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        label="운영사례"
        title={hasProjects ? "다짐이 운영하는 현장" : "다짐이 운영하는 시설"}
        description={
          hasProjects
            ? "현장별 운영 시설, 운영 범위, HILINK 적용 여부를 확인하세요."
            : "다짐은 아파트 · 기업 · 호텔 커뮤니티의 아래 시설을 운영합니다. 현장별 운영 조건은 상담 시 자세히 안내해 드립니다."
        }
        breadcrumbs={[{ name: "운영사례", path: "/projects" }]}
      />
      {hasProjects ? (
        groups.map((g) => (
          <section key={g.c} className="section-y border-b border-line bg-white" aria-labelledby={`g-${g.c}`}>
            <div className="container-x">
              <SectionHeader id={`g-${g.c}`} title={categoryLabel[g.c]} />
              <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))
      ) : (
        <section className="section-y bg-white" aria-label="운영 시설">
          <div className="container-x">
            <dl className="grid gap-x-10 border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
              {facilities.map((f) => (
                <div key={f.key} className="border-b border-line py-5">
                  <dt className="font-semibold">{f.ko}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-body">{f.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
