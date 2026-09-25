import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { featuredProjects, publishedProjects } from "@/data/projects";
import { showPhotoSlots } from "@/lib/photos";

/**
 * 운영실적 — publicationApproved(verified) 현장만 노출.
 * 없으면 방문자에게는 섹션을 숨기고, 검수 모드에서만 안내를 표시합니다.
 */
export function TrackRecord() {
  const list = (featuredProjects.length ? featuredProjects : publishedProjects).slice(0, 6);
  if (list.length === 0) {
    if (!showPhotoSlots) return null;
    return (
      <section className="bg-white pt-16" aria-label="운영실적 (검수용)">
        <div className="container-x">
          <p className="border border-dashed border-line-strong p-5 text-sm text-muted" data-review="todo-verify">
            검수용 · TRACK RECORD — 공개 승인된 운영 현장이 없어 운영실적 섹션을 숨겼습니다. 현장 후보 목록은 저장소 밖(비공개)에서 확인 후 data/projects.ts 에
            publicationApproved 현장만 입력하세요.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="section-y bg-white" aria-labelledby="track-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader id="track-title" eyebrow="운영실적" en="Track record" title="다짐이 운영하는 현장" />
          <Link href="/projects" className="group inline-flex items-center gap-2 font-semibold text-navy">
            운영실적 전체 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
