"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/cn";

/** PORTFOLIO 필터 — 전체 / 아파트 커뮤니티 / 스포츠시설 / 기업 / 공공시설 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const list = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 border-b border-mist-200 bg-white/95 px-5 backdrop-blur md:-mx-10 md:px-10 lg:top-20 xl:-mx-16 xl:px-16">
        <div role="group" aria-label="프로젝트 유형 필터" className="scrollbar-none flex gap-1 overflow-x-auto py-3">
          {projectCategories.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={active === c.key}
              onClick={() => setActive(c.key)}
              className={cn(
                "h-11 shrink-0 rounded-[2px] px-4 text-[0.9375rem] font-medium transition-colors",
                active === c.key ? "bg-ink text-white" : "text-mist-600 hover:bg-mist-100 hover:text-ink",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length}개의 프로젝트가 표시됩니다.
      </p>
      {list.length > 0 ? (
        <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} priority={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 border border-dashed border-mist-300 px-6 py-20 text-center">
          <p className="t-h4">해당 유형의 프로젝트를 준비 중입니다.</p>
          <p className="mt-2 text-[0.9375rem] text-mist-600">다른 유형을 선택하거나 운영 상담으로 문의해 주세요.</p>
        </div>
      )}
    </div>
  );
}
