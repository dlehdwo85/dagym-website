import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { HqManagement } from "@/components/home/HqManagement";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brandMotto, companyCta, companyHero, mainBusinessLine, principles, whatWeDo, whyDagym } from "@/data/company";
import { certifications, company, history, isVerified, partners } from "@/data/config";
import { photoRef } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "회사소개",
  description:
    "다짐(DAGYM)은 '좋은 마음가짐으로 미래를 결정하자'는 뜻을 담은 이름입니다. 주식회사 다짐은 공동주택 · 오피스텔 · 호텔 등 커뮤니티와 피트니스 시설을 운영하고, 그 운영을 자체 플랫폼 HILINK로 연결하는 시설 운영 전문기업입니다.",
  path: "/company",
});

export default function CompanyPage() {
  // 회사 개요 — data/config.ts company (확인된 값만 표시)
  const infoRows: [string, string][] = [
    ["회사명", `${company.nameKo} (${company.nameEn})`],
    ["대표", company.ceo],
    ["사업자등록번호", company.businessNumber],
    ["주요 사업", mainBusinessLine],
    ["주소", company.address],
    ["대표전화", company.phone],
    ["이메일", company.email],
  ];
  const visibleInfo = infoRows.filter(([, v]) => isVerified(v));
  const photo = photoRef("visual-company-atrium");

  return (
    <>
      <PageHero
        eyebrow={companyHero.eyebrow}
        title={companyHero.title}
        description={companyHero.lead}
        breadcrumbs={[{ name: "회사소개", path: "/company" }]}
        aside={
          photo && (
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-fog">
                <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          )
        }
      />

      {/* WHY DAGYM — 이름의 의미 */}
      <section className="bg-white py-24 lg:py-36" aria-labelledby="why-title">
        <div className="container-x">
          <Reveal>
            <p className="flex items-center gap-3">
              <span className="eyebrow">WHY DAGYM</span>
              <span className="label-en text-steel">이름의 의미</span>
            </p>
            <h2 id="why-title" className="t-h2 mt-4 break-keep sm:whitespace-pre-line">
              {whyDagym.title}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-16 border-y border-line py-14 lg:mt-20 lg:py-20">
            <p className="text-sm font-semibold text-steel">다짐 (DAGYM)</p>
            <blockquote className="mt-4 break-keep text-[2rem] font-bold leading-[1.25] tracking-[-0.03em] text-navy sm:text-[2.75rem] lg:text-[3.75rem]">
              “{brandMotto}”
            </blockquote>
          </Reveal>

          <ol className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-0">
            {whyDagym.steps.map((s, i) => (
              <Reveal as="li" key={s.en} delay={i * 0.08} className="relative lg:pr-12">
                <div className="flex items-center gap-4">
                  <span className="label-en text-accent">{s.en}</span>
                  {i < whyDagym.steps.length - 1 && (
                    <span aria-hidden className="hidden h-px flex-1 bg-line-strong lg:block" />
                  )}
                  {i < whyDagym.steps.length - 1 && <ArrowRight aria-hidden className="hidden size-4 shrink-0 text-steel lg:block" />}
                </div>
                <h3 className="t-h3 mt-3">{s.ko}</h3>
                <p className="t-body mt-3 max-w-sm break-keep text-body">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT WE DO — 두 핵심사업 (상세는 /business · /hilink) */}
      <section className="bg-mist py-24 lg:py-32" aria-labelledby="what-title">
        <div className="container-x">
          <SectionHeader id="what-title" eyebrow="WHAT WE DO" en="우리가 하는 일" title={whatWeDo.title} size="h2" />
          <ul className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10 lg:mt-16">
            {whatWeDo.items.map((w, i) => (
              <Reveal as="li" key={w.no} delay={i * 0.06} className="border-t-2 border-navy pt-7">
                <p className="flex items-center gap-3">
                  <span className="text-sm font-bold text-accent">{w.no}</span>
                  <span className="label-en text-steel">{w.en}</span>
                </p>
                <h3 className="t-h3 mt-3">{w.title}</h3>
                <p className="t-body mt-3 max-w-md break-keep text-body">{w.body}</p>
                <Link href={w.cta.href} className="group mt-6 inline-flex items-center gap-2 font-semibold text-navy">
                  {w.cta.label} <ArrowRight className="btn-arrow size-4" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="mt-14">
            <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-steel hover:text-navy">
              다짐의 운영 현장 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* OUR PRINCIPLES — 다짐이 지키는 기준 */}
      <section className="bg-white py-24 lg:py-32" aria-labelledby="principles-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="flex items-center gap-3">
              <span className="eyebrow">OUR PRINCIPLES</span>
              <span className="label-en text-steel">기준과 철학</span>
            </p>
            <h2 id="principles-title" className="t-h2 mt-4">
              {principles.title}
            </h2>
            <p className="t-lead mt-5 max-w-md break-keep text-body">{principles.lead}</p>
          </Reveal>
          <ol className="border-t border-navy lg:col-span-7">
            {principles.items.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-7 sm:grid-cols-[4rem_1fr]">
                <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h4">{p.title}</h3>
                  <p className="t-body mt-2 break-keep text-body">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* OUR TEAM — 본사 조직 */}
      <div className="border-t border-line">
        <HqManagement variant="organization" />
      </div>

      {history.length > 0 && (
        <section className="section-y border-t border-line bg-white" aria-labelledby="history-title">
          <div className="container-x">
            <SectionHeader id="history-title" eyebrow="연혁" title="다짐이 걸어온 길" size="h2" />
            <ol className="mt-10 border-t border-navy">
              {history.map((h) => (
                <li key={h.year} className="grid gap-3 border-b border-line py-6 md:grid-cols-[10rem_1fr]">
                  <p className="t-h3">{h.year}</p>
                  <ul className="t-body space-y-1 text-body">
                    {h.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 파트너 — 공개 승인된 것만 */}
      {(partners.length > 0 || certifications.length > 0) && (
        <section className="section-y border-t border-line bg-white" aria-labelledby="partners-title">
          <div className="container-x">
            <SectionHeader id="partners-title" eyebrow="협력 · 인증" title="함께하는 곳" size="h2" />
            <ul className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
              {[...partners.map((p) => p.name), ...certifications.map((c) => c.title)].map((n) => (
                <li key={n} className="grid min-h-24 place-items-center bg-white p-5 text-center text-body">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 회사 개요 */}
      <section id="info" className="scroll-mt-24 border-t border-line bg-mist" aria-labelledby="info-title">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <p className="eyebrow">COMPANY</p>
            <h2 id="info-title" className="t-h2 mt-3">
              회사 개요
            </h2>
          </div>
          <dl className="border-t border-navy lg:col-span-8">
            {visibleInfo.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-muted">{k}</dt>
                <dd className="break-keep text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection
        eyebrow={companyCta.eyebrow}
        title={companyCta.title}
        description={companyCta.description}
        primary={{ label: "운영 제안 문의", href: "/contact?type=operation" }}
        secondary={null}
      />
    </>
  );
}
