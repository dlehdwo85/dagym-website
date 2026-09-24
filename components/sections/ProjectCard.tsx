import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { categoryLabel, type Project } from "@/data/projects";
import { isVerified, PENDING_LABEL } from "@/data/config";
import { getFacility } from "@/data/facilities";
import { cn } from "@/lib/cn";

export function ProjectCard({ project, priority, className }: { project: Project; priority?: boolean; className?: string }) {
  const facilityNames = project.facilities.map((k) => getFacility(k)?.ko).filter(Boolean);
  return (
    <article className={cn("group relative", className)}>
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Media
            src={project.cover}
            alt={`${project.name} 현장`}
            label={categoryLabel[project.category]}
            tone={project.category === "apartment" ? "navy" : project.category === "sports" ? "ink" : "stone"}
            zoomOnHover
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            {project.hilink && (
              <span className="t-eyebrow inline-flex h-6 items-center gap-1.5 rounded-[2px] bg-white/95 px-2 !text-[0.625rem] text-ink">
                <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                HILINK
              </span>
            )}
            {!project.verified && <SampleBadge tone="dark" />}
          </div>
          <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center bg-white text-ink opacity-0 transition-all duration-500 ease-[var(--ease-premium)] group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>
        <div className="border-b border-mist-200 pb-6 pt-5 transition-colors group-hover:border-ink">
          <p className="text-[0.8125rem] text-mist-500">
            {categoryLabel[project.category]} · {isVerified(project.region) ? project.region : `지역 ${PENDING_LABEL}`}
          </p>
          <h3 className="t-h4 mt-2 text-ink">{project.name}</h3>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.8125rem]">
            <dt className="text-mist-400">규모</dt>
            <dd className="text-mist-700">{isVerified(project.scale) ? project.scale : PENDING_LABEL}</dd>
            <dt className="text-mist-400">운영시설</dt>
            <dd className="line-clamp-1 text-mist-700">{facilityNames.join(" · ")}</dd>
            <dt className="text-mist-400">운영형태</dt>
            <dd className="text-mist-700">{project.operationTypes.join(" · ")}</dd>
          </dl>
        </div>
      </Link>
    </article>
  );
}
