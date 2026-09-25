import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { isVerified } from "@/data/config";
import { getFacility } from "@/data/facilities";
import { featuredProjects, publishedProjects, categoryLabel } from "@/data/projects";
import { showPhotoSlots } from "@/lib/photos";

/**
 * 운영 포트폴리오 — 공개 동의된 현장(verified)만 노출.
 * 없으면 방문자에게는 섹션 자체를 숨기고, 검수 모드에서만 TODO_VERIFY 안내를 표시합니다.
 */
export function HomeProjects() {
  const list = (featuredProjects.length ? featuredProjects : publishedProjects).slice(0, 4);
  if (list.length === 0) {
    if (!showPhotoSlots) return null;
    return (
      <section className="bg-white pb-20" aria-label="운영 포트폴리오 (검수용)">
        <div className="container-x">
          <div className="border border-dashed border-line-strong p-5 text-sm text-muted" data-review="todo-verify">
            <p className="font-semibold text-ink">검수용 · PORTFOLIO TODO_VERIFY (방문자에게는 보이지 않음)</p>
            <p className="mt-2">공개 동의된 운영 현장이 없어 포트폴리오 섹션을 숨겼습니다. data/projects.ts 에 verified: true 현장을 입력하면 홈 · 메뉴 · /project/[slug] 사례 페이지가 자동 생성됩니다.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="section-y bg-white" aria-labelledby="projects-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader id="projects-title" eyebrow="Portfolio" title={"다짐이 운영하는\n현장"} />
          <Link href="/projects" className="group inline-flex items-center gap-2 border-b border-ink/30 pb-0.5 font-semibold">
            전체 운영 사례 <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {list.map((p, i) => (
            <li key={p.slug} className={i % 2 === 1 ? "md:mt-24" : undefined}>
              <Link href={`/project/${p.slug}`} className="group block">
                <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-mist">
                  {p.cover && <Image src={p.cover} alt={p.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />}
                </div>
                <p className="eyebrow mt-5 text-steel">{categoryLabel[p.category]}</p>
                <h3 className="t-h3 mt-2">{p.name}</h3>
                <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="text-muted">지역</dt>
                    <dd className="mt-1">{isVerified(p.region) ? p.region : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">규모</dt>
                    <dd className="mt-1">{isVerified(p.scale) ? p.scale : "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">운영</dt>
                    <dd className="mt-1">{p.operationTypes.join(" · ")}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm text-muted">{p.facilities.map((f) => getFacility(f)?.ko).filter(Boolean).join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
