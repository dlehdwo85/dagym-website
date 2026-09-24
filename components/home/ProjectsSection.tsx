import { getFeaturedProjects } from "@/lib/content";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export async function ProjectsSection() {
  const projects = await getFeaturedProjects(6);
  return (
    <section className="section-y border-t border-mist-200 bg-white" aria-labelledby="projects-title">
      <div className="container-x">
        <SectionHeader
          index="05"
          eyebrow="Our Projects"
          id="projects-title"
          title={"우리가 운영한 공간이\n다짐의 실력입니다."}
          description="아파트 커뮤니티, 스포츠시설, 기업 · 공공시설까지. 현장마다 다른 조건을 운영 모델로 풀어낸 사례입니다."
          align="split"
          action={<ButtonLink href="/projects" variant="outline">View all projects</ButtonLink>}
        />
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-14 flex justify-center">
          <ButtonLink href="/projects" variant="primary" size="lg">
            VIEW ALL PROJECTS
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
