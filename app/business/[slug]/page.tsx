import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FacilityGrid } from "@/components/sections/FacilityGrid";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { HilinkMark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { DashboardMockup } from "@/components/hilink/Mockups";
import { businessAreas, businessDetails, getBusiness } from "@/data/business";
import { businessContactType } from "@/data/customers";
import { extraFacilities, facilities } from "@/data/facilities";
import { getProjects } from "@/lib/content";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return businessDetails.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/business/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) return {};
  return pageMetadata({
    title: b.detail.metaTitle,
    description: b.detail.metaDescription,
    path: b.href,
    keywords: b.detail.keywords,
  });
}

export default async function BusinessDetailPage({ params }: PageProps<"/business/[slug]">) {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) notFound();
  const d = b.detail;

  const allFacilities = [...facilities, ...extraFacilities];
  const serviceFacilities = [
    ...d.facilities.map((k) => allFacilities.find((f) => f.key === k)!).filter(Boolean),
    ...(d.includeExtraFacilities ? extraFacilities : []),
  ];
  const related = (await getProjects(d.projectCategory)).slice(0, 3);
  const contactType = businessContactType[b.slug] ?? "etc";
  const others = businessAreas.filter((x) => x.slug !== b.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: b.ko, description: d.metaDescription, path: b.href, serviceType: d.metaTitle })} />
      <PageHero
        eyebrow={d.heroEyebrow}
        title={
          <>
            {d.heroTitle[0]}
            <br />
            {d.heroTitle[1]}
          </>
        }
        description={d.heroSub}
        breadcrumbs={[
          { name: "BUSINESS", path: "/business" },
          { name: b.ko, path: b.href },
        ]}
        actions={
          <>
            <ButtonLink href={`/contact?type=${contactType}`} variant="accent" size="lg">
              운영 상담 신청하기
            </ButtonLink>
            <ButtonLink href="#solution" variant="outline-light" size="lg">
              운영 방식 보기
            </ButtonLink>
          </>
        }
        aside={
          <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="t-eyebrow text-white/45">For</p>
            <ul className="mt-5 space-y-3">
              {d.targets.map((t) => (
                <li key={t} className="flex items-center gap-3 text-lg font-semibold">
                  <span className="h-px w-5 bg-accent-light" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* 서비스 소개 */}
      <section className="section-y bg-white" aria-labelledby="intro-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="t-eyebrow flex items-center gap-3 text-accent">
                <span className="t-num text-mist-400">{b.no}</span>
                <span aria-hidden className="h-px w-8 bg-accent/60" />
                {b.en}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="intro-title" className="t-h2 mt-6 whitespace-pre-line">
                {d.intro.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-lead mt-7 text-mist-600">{d.intro.body}</p>
            </Reveal>
          </div>
          <Reveal variant="image" className="lg:col-span-6">
            <Media src={b.image} alt={`${b.ko} 현장`} label={b.en} tone="navy" className="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      {/* 고객이 가진 문제 */}
      <section className="section-y bg-mist-50" aria-labelledby="problem-title">
        <div className="container-x">
          <SectionHeader eyebrow="Problem" id="problem-title" title={"이런 문제를\n겪고 계신가요?"} />
          <ol className={`mt-14 grid gap-px bg-mist-200 lg:mt-16 ${d.problems.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}>
            {d.problems.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="flex flex-col bg-white p-7 lg:p-8">
                <span className="t-num text-sm text-mist-400">Q{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-10">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-600">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* DAGYM Solution */}
      <section id="solution" className="on-dark section-y scroll-mt-16 bg-navy-950 text-white" aria-labelledby="solution-title">
        <div className="container-x">
          <SectionHeader
            tone="dark"
            eyebrow="DAGYM Solution"
            id="solution-title"
            title={"현장 운영과 HILINK로\n함께 해결합니다."}
            align="split"
            description="사람이 운영하고 시스템이 기록합니다. 다짐은 두 가지를 한 번에 제공합니다."
          />
          <ul className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {d.solutions.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70} className="bg-navy-950 p-7 lg:p-8">
                <Icon name={s.icon} className={s.icon === "platform" || s.icon === "scan" ? "size-8 text-signal-light" : "size-8 text-accent-light"} />
                <h3 className="t-h4 mt-10">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">{s.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 운영 범위 */}
      <section className="section-y bg-white" aria-labelledby="scope-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="Scope of Operation"
            id="scope-title"
            title="운영 범위"
            description="필요한 범위만 선택하거나 전체를 맡길 수 있습니다."
            align="split"
          />
          <div className={`mt-14 grid gap-px bg-mist-200 sm:grid-cols-2 lg:mt-16 ${d.scope.length === 4 ? "lg:grid-cols-4" : d.scope.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
            {d.scope.map((g, i) => (
              <Reveal key={g.group} delay={i * 70} className="bg-white py-7 sm:px-7">
                <div className="flex items-center justify-between border-b border-ink pb-4">
                  <h3 className="t-h4">{g.group}</h3>
                  <span className="t-num text-sm text-mist-400">{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <ul className="mt-2 divide-y divide-mist-200">
                  {g.items.map((it) => (
                    <li key={it} className="py-3.5 text-[0.9375rem] text-mist-700">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 운영 프로세스 */}
      <section className="section-y bg-mist-50" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeader eyebrow="Process" id="process-title" title="운영 프로세스" align="split" description="현장 분석부터 데이터 기반 개선까지, 운영은 멈추지 않고 순환합니다." />
          <div className="mt-14 lg:mt-20">
            <ProcessSteps steps={d.process} />
          </div>
        </div>
      </section>

      {/* HILINK + 경쟁력 */}
      <section className="section-y bg-white" aria-labelledby="strength-title">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <SectionHeader eyebrow="DAGYM Difference" id="strength-title" title={"다짐이어야 하는\n이유."} />
            <ol className="mt-12 border-t border-mist-200">
              {d.strengths.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 70} className="grid grid-cols-[3rem_1fr] border-b border-mist-200 py-7">
                  <span className="t-num text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="t-h4">{s.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist-600">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="min-w-0 lg:col-span-7">
            <div className="on-dark relative h-full overflow-hidden bg-ink p-6 text-white sm:p-10">
              <div className="bg-blueprint absolute inset-0 opacity-60" aria-hidden />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <HilinkMark className="text-xl" />
                  <Link href="/hilink" className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                    HILINK 자세히 보기
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
                <p className="t-h3 mt-6 max-w-md">이 서비스의 모든 운영은 HILINK에 기록됩니다.</p>
                <DashboardMockup compact className="mt-8" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 운영 가능 시설 */}
      <section className="section-y bg-mist-50" aria-labelledby="facility-title">
        <div className="container-x">
          <SectionHeader eyebrow="Facilities" id="facility-title" title="운영 가능 시설" align="split" description="시설별 운영 기준과 HILINK 기능을 함께 적용합니다." />
          <div className="mt-14 lg:mt-16">
            <FacilityGrid items={serviceFacilities} variant="compact" />
          </div>
        </div>
      </section>

      {/* 관련 프로젝트 */}
      {related.length > 0 && (
        <section className="section-y bg-white" aria-labelledby="related-title">
          <div className="container-x">
            <SectionHeader
              eyebrow="Related Projects"
              id="related-title"
              title="관련 프로젝트"
              align="split"
              action={<ButtonLink href="/projects" variant="outline">전체 프로젝트 보기</ButtonLink>}
            />
            <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 80}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 다른 사업 */}
      <nav aria-label="다른 사업영역" className="border-t border-mist-200 bg-white">
        <ul className="container-x grid grid-cols-1 divide-y divide-mist-200 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={o.href} className="group flex h-full flex-col gap-2 py-6 sm:px-5">
                <span className="t-num text-xs text-mist-400">{o.no}</span>
                <span className="flex items-center justify-between gap-3 text-[0.9375rem] font-semibold">
                  {o.ko}
                  <ArrowRight className="size-4 shrink-0 text-mist-400 transition-all group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <CTASection
        title={d.ctaTitle}
        primary={{ label: "운영 상담 신청하기", href: `/contact?type=${contactType}` }}
      />
    </>
  );
}
