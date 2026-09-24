import Image from "next/image";
import Link from "next/link";
import { categoryLabel, type Project } from "@/data/projects";
import { isVerified } from "@/data/config";
import { getFacility } from "@/data/facilities";

/** 확인된 운영 현장 카드 — 사진이 있을 때만 이미지 영역을 표시 */
export function ProjectCard({ project }: { project: Project }) {
  const facilityNames = project.facilities.map((k) => getFacility(k)?.ko).filter(Boolean);
  return (
    <article>
      <Link href={`/projects/${project.slug}`} className="group block">
        {project.cover && (
          <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-paper-deep">
            <Image
              src={project.cover}
              alt={`${project.name} 현장`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <p className="text-sm text-muted">
          {categoryLabel[project.category]}
          {isVerified(project.region) && ` · ${project.region}`}
        </p>
        <h3 className="t-h4 mt-1 group-hover:text-brand">{project.name}</h3>
        <dl className="mt-3 space-y-1 text-[0.9375rem] text-body">
          {isVerified(project.scale) && (
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-muted">규모</dt>
              <dd>{project.scale}</dd>
            </div>
          )}
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 text-muted">운영시설</dt>
            <dd>{facilityNames.join(", ")}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 text-muted">운영형태</dt>
            <dd>{project.operationTypes.join(", ")}</dd>
          </div>
        </dl>
      </Link>
    </article>
  );
}
