import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { categoryLabel, getProject, publishedProjects } from "@/data/projects";
import { getFacility } from "@/data/facilities";
import { isVerified } from "@/data/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";

/**
 * 운영 사례 (Case Study)
 * Hero · Overview · Location · Households · Facilities · Scope · Challenge · Solution · HILINK · Gallery · Result · Next Project
 * 공개 동의된 현장(verified: true)만 생성됩니다. 값이 없는 항목은 표시하지 않습니다.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} — 운영 사례`, description: p.summary, path: `/projects/${p.slug}` });
}

function Block({ eyebrow, title, children, id }: { eyebrow: string; title: string; children: React.ReactNode; id: string }) {
  return (
    <section className="border-t border-line py-16 lg:grid lg:grid-cols-12 lg:gap-10 lg:py-24" aria-labelledby={id}>
      <div className="lg:col-span-4">
        <p className="label-en text-steel">{eyebrow}</p>
        <h2 id={id} className="t-h2 mt-4">
          {title}
        </h2>
      </div>
      <div className="mt-8 lg:col-span-8 lg:mt-0">{children}</div>
    </section>
  );
}

function Lines({ items }: { items: string[] }) {
  return (
    <ul className="border-t border-ink">
      {items.map((t) => (
        <li key={t} className="t-body border-b border-line py-4">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectCasePage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = publishedProjects.findIndex((x) => x.slug === p.slug);
  const next = publishedProjects.length > 1 ? publishedProjects[(idx + 1) % publishedProjects.length] : undefined;
  const facilityNames = p.facilities.map((k) => getFacility(k)?.ko).filter(Boolean) as string[];

  const overview: [string, string | undefined][] = [
    ["Type", categoryLabel[p.category]],
    ["Location", isVerified(p.region) ? p.region : undefined],
    ["Households", p.households && isVerified(p.households) ? p.households : isVerified(p.scale) ? p.scale : undefined],
    ["Operation", p.operationTypes.join(" · ")],
    ["Period", p.period && isVerified(p.period) ? p.period : undefined],
    ["HILINK", p.hilink ? "적용" : undefined],
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "운영사례", path: "/projects" },
          { name: p.name, path: `/projects/${p.slug}` },
        ])}
      />
      <PageHero eyebrow={`운영실적 · ${categoryLabel[p.category]}`} title={p.name} description={p.summary}>
        {p.cover && (
          <div className="container-x pb-16">
            <ClipReveal className="aspect-[16/9] max-h-[80vh]">
              <Image src={p.cover} alt={`${p.name} 현장`} fill priority sizes="100vw" className="object-cover" />
            </ClipReveal>
          </div>
        )}
      </PageHero>

      <div className="container-x">
        <section aria-label="현장 개요" className="grid grid-cols-2 gap-x-8 py-14 md:grid-cols-3 lg:grid-cols-6">
          {overview
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="border-t border-ink py-5">
                <p className="label-en text-steel">{k}</p>
                <p className="mt-3 font-semibold">{v}</p>
              </div>
            ))}
        </section>

        {facilityNames.length > 0 && (
          <Block eyebrow="Facilities" title="운영 시설" id="pf-facilities">
            <ul className="flex flex-wrap gap-2">
              {facilityNames.map((f) => (
                <li key={f} className="rounded-[2px] border border-line-strong px-4 py-2.5">
                  {f}
                </li>
              ))}
            </ul>
          </Block>
        )}
        {p.scope.length > 0 && (
          <Block eyebrow="Scope" title="운영 범위" id="pf-scope">
            <Lines items={p.scope} />
          </Block>
        )}
        {p.challenge && p.challenge.length > 0 && (
          <Block eyebrow="Before" title="운영 전 상태" id="pf-challenge">
            <Lines items={p.challenge} />
          </Block>
        )}
        {p.diagnosis && p.diagnosis.length > 0 && (
          <Block eyebrow="Diagnosis" title="현장 진단" id="pf-diagnosis">
            <Lines items={p.diagnosis} />
          </Block>
        )}
        {p.solutions.length > 0 && (
          <Block eyebrow="Solution" title="다짐의 운영 방식" id="pf-solution">
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {p.solutions.map((s) => (
                <div key={s.title} className="border-t border-ink py-6">
                  <dt className="t-h4">{s.title}</dt>
                  <dd className="t-body mt-2 text-body">{s.body}</dd>
                </div>
              ))}
            </dl>
          </Block>
        )}
        {p.operationalChanges && p.operationalChanges.length > 0 && (
          <Block eyebrow="Operation" title="운영 변화" id="pf-operation">
            <Lines items={p.operationalChanges} />
          </Block>
        )}
        {p.facilityImprovement && p.facilityImprovement.length > 0 && (
          <Block eyebrow="Facility" title="시설 개선" id="pf-facility">
            <Lines items={p.facilityImprovement} />
          </Block>
        )}
        {p.hilink && p.hilinkScope && p.hilinkScope.length > 0 && (
          <Block eyebrow="HILINK" title="적용한 시스템" id="pf-hilink">
            <Lines items={p.hilinkScope} />
            <Link href="/hilink" className="group mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-0.5 font-semibold">
              HILINK 알아보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          </Block>
        )}
      </div>

      {p.gallery && p.gallery.length > 0 && (
        <section aria-label="현장 사진" className="bg-navy-deep py-16 lg:py-24">
          <ul className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.gallery.map((g, i) => (
              <li key={g} className={i === 0 ? "sm:col-span-2" : undefined}>
                <ClipReveal className={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}>
                  <Image src={g} alt={`${p.name} 현장 사진 ${i + 1}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </ClipReveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.result && p.result.length > 0 && (
        <div className="container-x">
          <Block eyebrow="Result" title="운영 결과" id="pf-result">
            <Lines items={p.result} />
          </Block>
        </div>
      )}

      {next && (
        <Link href={`/projects/${next.slug}`} className="group block bg-navy text-white">
          <Reveal className="container-x flex items-end justify-between gap-6 py-20 lg:py-28">
            <div>
              <p className="label-en text-white/50">Related project</p>
              <p className="t-h1 mt-4">{next.name}</p>
            </div>
            <ArrowRight className="btn-arrow size-10 shrink-0" strokeWidth={1} aria-hidden />
          </Reveal>
        </Link>
      )}

      <CTASection title={"비슷한 시설을\n운영하고 계신가요?"} />
    </>
  );
}
