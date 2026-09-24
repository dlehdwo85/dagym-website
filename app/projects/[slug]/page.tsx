import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, X as XIcon } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { FacilityIcon } from "@/components/ui/FacilityIcon";
import { HilinkMark } from "@/components/ui/Logo";
import { categoryLabel, projects as allProjects } from "@/data/projects";
import { getFacility } from "@/data/facilities";
import { isVerified, PENDING_LABEL } from "@/data/config";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return {};
  const meta = pageMetadata({
    title: `${p.name} — ${categoryLabel[p.category]}`,
    description: p.summary,
    path: `/projects/${p.slug}`,
  });
  // 확인되지 않은 샘플 현장은 검색엔진 색인에서 제외
  return p.verified ? meta : { ...meta, robots: { index: false, follow: true } };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();

  const list = await getProjects();
  const idx = list.findIndex((x) => x.slug === p.slug);
  const prev = list[(idx - 1 + list.length) % list.length];
  const next = list[(idx + 1) % list.length];
  const related = list.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const facilityList = p.facilities.map((k) => getFacility(k)).filter((f) => f !== undefined);
  const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : [undefined, undefined, undefined];

  const overview: [string, string][] = [
    ["유형", categoryLabel[p.category]],
    ["위치", isVerified(p.region) ? p.region : PENDING_LABEL],
    ["규모", isVerified(p.scale) ? p.scale : PENDING_LABEL],
    ["운영 형태", p.operationTypes.join(" · ")],
    ["운영 기간", p.period && isVerified(p.period) ? p.period : PENDING_LABEL],
  ];

  return (
    <>
      <PageHero
        eyebrow={`Project · ${categoryLabel[p.category]}`}
        title={p.name}
        description={p.summary}
        breadcrumbs={[
          { name: "PORTFOLIO", path: "/projects" },
          { name: p.name, path: `/projects/${p.slug}` },
        ]}
        aside={!p.verified ? <SampleBadge tone="dark" className="lg:float-right" /> : undefined}
      />

      <section className="bg-white pt-12 lg:pt-16" aria-label="대표 이미지">
        <div className="container-x">
          <Reveal variant="image">
            <Media
              src={p.cover}
              alt={`${p.name} 대표 사진`}
              label={categoryLabel[p.category]}
              tone="navy"
              priority
              className="aspect-[16/9] lg:aspect-[21/9]"
              sizes="100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* 개요 */}
      <section className="section-y bg-white" aria-labelledby="overview-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Overview" id="overview-title" title="프로젝트 개요" />
          </div>
          <div className="lg:col-span-8">
            <dl className="grid border-t border-ink sm:grid-cols-2">
              {overview.map(([k, v]) => (
                <div key={k} className="border-b border-mist-200 py-5 sm:pr-6">
                  <dt className="text-[0.8125rem] text-mist-500">{k}</dt>
                  <dd className={v === PENDING_LABEL ? "mt-1.5 text-mist-400" : "mt-1.5 font-semibold"}>{v}</dd>
                </div>
              ))}
              <div className="border-b border-mist-200 py-5">
                <dt className="text-[0.8125rem] text-mist-500">HILINK 적용</dt>
                <dd className="mt-1.5 flex items-center gap-2 font-semibold">
                  {p.hilink ? (
                    <>
                      <Check className="size-4 text-signal" aria-hidden /> <HilinkMark tone="dark" className="text-[0.9375rem]" /> 적용
                    </>
                  ) : (
                    <>
                      <XIcon className="size-4 text-mist-400" aria-hidden /> 미적용
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 운영시설 · 운영범위 */}
      <section className="section-y bg-mist-50" aria-labelledby="scope-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Facilities & Scope" id="scope-title" title={"운영시설과\n운영범위"} />
          </div>
          <div className="grid gap-10 lg:col-span-8">
            <ul className="grid grid-cols-2 gap-px bg-mist-200 sm:grid-cols-3">
              {facilityList.map((f) => (
                <li key={f.key} className="flex items-center gap-3 bg-white p-5">
                  <FacilityIcon name={f.key} className="size-5 text-accent" />
                  <span className="font-semibold">{f.ko}</span>
                </li>
              ))}
            </ul>
            <ul className="border-t border-ink">
              {p.scope.map((s, i) => (
                <li key={s} className="grid grid-cols-[3rem_1fr] border-b border-mist-200 py-4">
                  <span className="t-num text-sm text-mist-400">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 현장 사진 */}
      <section className="section-y bg-white" aria-labelledby="gallery-title">
        <div className="container-x">
          <SectionHeader eyebrow="Gallery" id="gallery-title" title="현장 사진" />
          <ul className="mt-12 grid gap-2 sm:grid-cols-3 lg:gap-3">
            {gallery.map((src, i) => (
              <Reveal as="li" key={i} delay={i * 80} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
                <Media
                  src={src}
                  alt={`${p.name} 현장 사진 ${i + 1}`}
                  label={src ? undefined : "Photo"}
                  tone={i === 0 ? "navy" : i === 1 ? "stone" : "mist"}
                  className={i === 0 ? "aspect-[4/3] h-full" : "aspect-[4/3]"}
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 운영 솔루션 */}
      <section className="on-dark section-y bg-navy-950 text-white" aria-labelledby="solution-title">
        <div className="container-x">
          <SectionHeader tone="dark" eyebrow="Operation Solution" id="solution-title" title="운영 솔루션" />
          <ol className="mt-12 grid gap-px bg-white/10 md:grid-cols-2">
            {p.solutions.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="bg-navy-950 p-7 lg:p-9">
                <span className="t-num text-sm text-accent-light">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 mt-6">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* prev / next */}
      <nav aria-label="다른 프로젝트" className="border-b border-mist-200 bg-white">
        <div className="container-x grid grid-cols-2 divide-x divide-mist-200">
          <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-2 py-8 pr-4">
            <span className="flex items-center gap-2 text-[0.8125rem] text-mist-500">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden /> 이전 프로젝트
            </span>
            <span className="font-semibold">{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end gap-2 py-8 pl-4 text-right">
            <span className="flex items-center gap-2 text-[0.8125rem] text-mist-500">
              다음 프로젝트 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
            <span className="font-semibold">{next.name}</span>
          </Link>
        </div>
      </nav>

      {related.length > 0 && (
        <section className="section-y bg-white" aria-labelledby="related-title">
          <div className="container-x">
            <SectionHeader eyebrow="Related" id="related-title" title="같은 유형의 프로젝트" />
            <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProjectCard project={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection title={"비슷한 공간을\n운영하고 계신가요?"} />
    </>
  );
}
