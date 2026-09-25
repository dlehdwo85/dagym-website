import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { OurOperations } from "@/components/home/OurOperations";
import { HqManagement } from "@/components/home/HqManagement";
import { OperationSystem } from "@/components/home/OperationSystem";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { companyIntro, principles } from "@/data/company";
import { pillars, publicFacts } from "@/data/corporate";
import { certifications, company, history, isVerified, partners } from "@/data/config";
import { photoRef } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "회사소개",
  description:
    "주식회사 다짐은 아파트 · 기업 · 호텔 커뮤니티 시설을 본사 운영체계로 직접 관리하고, 자체 플랫폼 HILINK와 시설 개선으로 운영의 품질을 높이는 커뮤니티 운영 전문기업입니다.",
  path: "/company",
});

export default function CompanyPage() {
  const infoRows: [string, string][] = [
    ["회사명", `${company.nameKo} (${company.nameEn})`],
    ["대표", company.ceo],
    ["설립", company.founded],
    ["사업자등록번호", company.businessNumber],
    ["주요 사업", "커뮤니티 운영 · HILINK 운영 플랫폼 · 시설 개선 및 기구 납품"],
    ["주소", company.address],
    ["대표번호", company.phone],
    ["이메일", company.email],
  ];
  const visibleInfo = infoRows.filter(([, v]) => isVerified(v));
  const facts = publicFacts();
  const meeting = photoRef("visual-ops-meeting");
  const photo = meeting ?? photoRef("facility-fitness");

  return (
    <>
      <PageHero
        eyebrow="회사소개"
        en="About DAGYM"
        title={"경험에만 의존하지 않고,\n기준과 데이터로 운영합니다."}
        description="다짐은 피트니스 회사도, 앱 회사도 아닙니다. 커뮤니티 공간의 운영 전체를 맡고, 그 운영을 자체 기술로 관리하는 커뮤니티 운영 전문기업입니다."
        breadcrumbs={[{ name: "회사소개", path: "/company" }]}
      />

      {/* 회사 소개 */}
      <section className="section-y bg-white" aria-labelledby="intro-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">회사 소개</p>
            <h2 id="intro-title" className="t-section mt-4 sm:whitespace-pre-line">
              {companyIntro.title}
            </h2>
            <div className="mt-7 space-y-4">
              {companyIntro.body.map((p, i) => (
                <p key={i} className="t-body text-body">
                  {p}
                </p>
              ))}
            </div>
            {facts.length > 0 && (
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                {facts.map((f) => (
                  <div key={f.key} className="flex gap-2">
                    <dt className="text-muted">{f.label}</dt>
                    <dd className="font-semibold">{String(f.value)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
          {photo && (
            <figure className="lg:col-span-6">
              <ClipReveal className="aspect-[4/3] rounded-[4px] bg-mist" from="right">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
              </ClipReveal>
              {!meeting && <figcaption className="mt-2 text-sm text-muted">커뮤니티 헬스장 — 시설 예시</figcaption>}
            </figure>
          )}
        </div>
      </section>

      {/* 운영 철학 */}
      <section className="section-y bg-mist" aria-labelledby="philosophy-title">
        <div className="container-x">
          <SectionHeader id="philosophy-title" eyebrow="운영 철학" en="Philosophy" title={"현장을 맡긴 뒤에도\n본사가 함께 관리합니다."} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 0.05} className="bg-white p-7 lg:p-9">
                <p className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-2">{p.title}</h3>
                <p className="t-small mt-3 text-body">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 주요 사업영역 */}
      <section className="section-y bg-white" aria-labelledby="areas-title">
        <div className="container-x">
          <SectionHeader id="areas-title" eyebrow="주요 사업영역" en="Business" title="세 가지 사업 축" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <Reveal as="li" key={p.no} className="flex flex-col border-t-2 border-navy pt-6">
                <p className="text-sm font-bold text-accent">{p.no}</p>
                <h3 className="t-h3 mt-2">{p.title}</h3>
                <p className="t-small mt-3 text-body">{p.lead}</p>
                <Link href={p.links[0].href} className="group mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy">
                  {p.links[0].label} <ArrowRight className="btn-arrow size-4" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 본사 운영체계 · 조직 */}
      <div className="border-t border-line">
        <HqManagement />
      </div>

      {/* 운영 프로세스 */}
      <OperationSystem />

      {/* 주요 이력 */}
      <OurOperations />

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
      <section id="info" className="scroll-mt-24 border-t border-line bg-white" aria-labelledby="info-title">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <p className="eyebrow">회사 개요</p>
            <h2 id="info-title" className="t-h2 mt-3">
              Company
            </h2>
          </div>
          <dl className="border-t border-navy lg:col-span-8">
            {visibleInfo.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection />
    </>
  );
}
