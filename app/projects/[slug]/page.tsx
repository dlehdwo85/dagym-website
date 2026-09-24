import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categoryLabel, getProject, publishedProjects } from "@/data/projects";
import { getFacility } from "@/data/facilities";
import { isVerified } from "@/data/config";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} — 운영사례`, description: p.summary, path: `/projects/${p.slug}` });
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const overview: [string, string | undefined][] = [
    ["유형", categoryLabel[p.category]],
    ["위치", isVerified(p.region) ? p.region : undefined],
    ["규모", isVerified(p.scale) ? p.scale : undefined],
    ["운영 형태", p.operationTypes.join(", ")],
    ["운영 기간", p.period && isVerified(p.period) ? p.period : undefined],
    ["운영 시설", p.facilities.map((k) => getFacility(k)?.ko).filter(Boolean).join(", ")],
    ["HILINK 적용", p.hilink ? "적용" : "미적용"],
  ];

  return (
    <>
      <PageHero
        label={categoryLabel[p.category]}
        title={p.name}
        description={p.summary}
        breadcrumbs={[
          { name: "운영사례", path: "/projects" },
          { name: p.name, path: `/projects/${p.slug}` },
        ]}
      />
      <div className="container-x">
        {p.cover && (
          <div className="relative mt-10 aspect-[2/1] overflow-hidden bg-paper-deep lg:mt-14">
            <Image src={p.cover} alt={`${p.name} 전경`} fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
        <section className="grid gap-10 py-14 lg:grid-cols-12 lg:py-20" aria-labelledby="ov-title">
          <div className="lg:col-span-4">
            <SectionHeader id="ov-title" title="현장 개요" />
          </div>
          <dl className="border-t border-ink lg:col-span-8">
            {overview
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
        </section>
        <section className="grid gap-10 border-t border-line py-14 lg:grid-cols-12 lg:py-20" aria-labelledby="scope-title">
          <div className="lg:col-span-4">
            <SectionHeader id="scope-title" title="운영 범위와 포인트" />
          </div>
          <div className="lg:col-span-8">
            <ul className="space-y-2.5">
              {p.scope.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="mt-[0.8em] h-px w-3 shrink-0 bg-brand" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {p.solutions.map((s) => (
                <div key={s.title} className="border-t border-line-strong py-5">
                  <dt className="t-h4">{s.title}</dt>
                  <dd className="mt-1.5 text-body">{s.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        {p.gallery && p.gallery.length > 0 && (
          <section className="border-t border-line py-14 lg:py-20" aria-label="현장 사진">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.gallery.map((src, i) => (
                <li key={src} className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                  <Image src={src} alt={`${p.name} 현장 사진 ${i + 1}`} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <CTASection title="비슷한 시설을 운영하고 계신가요?" />
    </>
  );
}
