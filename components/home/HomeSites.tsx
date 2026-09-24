import { facilities } from "@/data/facilities";
import { featuredProjects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";

/**
 * 확인된 운영 현장(verified)이 있으면 현장을, 항상 운영 시설 목록을 보여줍니다.
 * 현장 정보가 없는 동안에는 실적처럼 보이는 내용을 노출하지 않습니다.
 */
export function HomeSites() {
  const hasProjects = featuredProjects.length > 0;
  return (
    <section className="section-y bg-white" aria-labelledby="sites-title">
      <div className="container-x">
        {hasProjects && (
          <div className="mb-24">
            <SectionHeader label="운영 현장" id="sites-title" title="다짐이 운영하는 현장" />
            <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
            <ButtonLink href="/projects" variant="secondary" className="mt-12">
              운영사례 전체 보기
            </ButtonLink>
          </div>
        )}
        <SectionHeader
          label="운영 시설"
          id={hasProjects ? undefined : "sites-title"}
          title="이런 시설을 운영합니다."
          description="시설마다 필요한 인력, 관리 주기, 예약 방식이 다릅니다. 시설별 기준을 정해 운영합니다."
        />
        <dl className="mt-12 grid gap-x-10 border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <div key={f.key} className="border-b border-line py-5">
              <dt className="font-semibold">{f.ko}</dt>
              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-body">{f.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
