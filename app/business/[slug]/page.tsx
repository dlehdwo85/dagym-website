import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { AdminConcept } from "@/components/hilink/AdminConcept";
import { DemoPhone } from "@/components/hilink/DemoPhone";
import { businessAreas, getBusiness } from "@/data/business";
import { photoRef } from "@/lib/photos";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return businessAreas.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/business/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) return {};
  return pageMetadata({ title: b.detail.metaTitle, description: b.detail.metaDescription, path: b.href, keywords: b.detail.keywords });
}

/** 운영형 사업 공통 4단계 */
const processSteps = [
  { title: "현장 진단", body: "시설과 기존 운영 방식을 직접 확인합니다." },
  { title: "운영 제안", body: "인력 · 프로그램 · 시스템 운영안을 제안합니다." },
  { title: "오픈 준비", body: "인력 배치, HILINK 설정, 교육을 마칩니다." },
  { title: "운영 · 개선", body: "정기 점검과 보고로 운영을 개선합니다." },
];

/**
 * 사업 상세 — 사진이 먼저 사업을 설명하고 텍스트는 보완만.
 * Hero → 큰 문장 → 와이드 이미지 + 운영 범위 → 운영 방식 4 → HILINK → (프로세스 4단계) → 문의
 */
export default async function BusinessDetailPage({ params }: PageProps<"/business/[slug]">) {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) notFound();
  const d = b.detail;
  const hero = photoRef(d.heroImage);
  const wide = d.wideImage ? photoRef(d.wideImage) : undefined;
  const others = businessAreas.filter((x) => x.slug !== b.slug);
  const contactHref = `/contact?type=${d.contactType}`;

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: b.title, description: d.metaDescription, path: b.href, serviceType: d.metaTitle })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "사업영역", path: "/business" },
          { name: b.title, path: b.href },
        ])}
      />

      {/* HERO — 짧게 */}
      <section className="bg-mist" aria-labelledby="biz-title">
        <div className="container-x grid gap-10 pb-14 pt-24 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-20 lg:pt-32">
          <Reveal className="lg:col-span-5">
            <nav aria-label="현재 위치">
              <ol className="flex items-center gap-1 text-[0.8125rem] text-muted">
                <li>
                  <Link href="/business" className="hover:text-navy">
                    사업영역
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight className="size-3" aria-hidden />
                  <span aria-current="page">{d.short}</span>
                </li>
              </ol>
            </nav>
            <p className="label-en mt-8 font-semibold tracking-[0.14em] text-accent lg:mt-10">{d.eyebrow}</p>
            <h1 id="biz-title" className="t-h1 mt-4">
              {d.heroTitle}
            </h1>
            <p className="t-lead mt-5 whitespace-pre-line text-body">{d.heroLead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <ButtonLink href={contactHref} size="lg" track="business_page">
                운영 상담
              </ButtonLink>
              <TrackedLink href={contactHref} location="business_page" className="group inline-flex items-center gap-2 font-semibold text-navy">
                문의하기 <ArrowRight className="btn-arrow size-4" aria-hidden />
              </TrackedLink>
            </div>
          </Reveal>
          {hero && (
            <div className="lg:col-span-7">
              <ClipReveal className="aspect-[4/3] rounded-[4px] bg-fog" from="right">
                <Image src={hero.src} alt={hero.alt} fill priority sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
              </ClipReveal>
            </div>
          )}
        </div>
      </section>

      {/* 큰 문장 */}
      <section className="bg-white" aria-labelledby="statement-title">
        <Reveal className="container-x grid gap-6 py-20 lg:grid-cols-12 lg:gap-12 lg:py-32">
          <h2 id="statement-title" className="t-section whitespace-pre-line lg:col-span-7">
            {d.statement.title}
          </h2>
          <p className="t-lead text-body lg:col-span-5 lg:self-end">{d.statement.body}</p>
        </Reveal>
      </section>

      {/* 와이드 이미지 + 운영 범위 */}
      <section className="bg-white pb-20 lg:pb-32" aria-labelledby="scope-title">
        {wide && (
          <div className="container-x">
            <ClipReveal className="aspect-[16/9] rounded-[4px] bg-fog sm:aspect-[21/9]">
              <Image src={wide.src} alt={wide.alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
            </ClipReveal>
          </div>
        )}
        <div className="container-x mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <h2 id="scope-title" className="t-h2 lg:col-span-4">
            {d.scopeTitle ?? "운영 범위"}
          </h2>
          <ul className="grid grid-cols-2 gap-x-8 border-t border-navy sm:grid-cols-3 lg:col-span-8">
            {d.facilities.map((f) => (
              <li key={f} className="border-b border-line py-4 text-[1.0625rem] font-medium text-ink">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 운영 방식 — 4개 포인트 */}
      <section className="bg-mist" aria-labelledby="approach-title">
        <div className="container-x py-20 lg:py-28">
          <Reveal>
            <h2 id="approach-title" className="t-section">
              운영을 하나의 흐름으로 관리합니다.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {d.approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.05} className="border-t-2 border-navy pt-5">
                <p className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h4 mt-2">{a.title}</h3>
                <p className="t-small mt-2 text-body">{a.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* HILINK — Product visual */}
      <section className="bg-navy-deep text-white" aria-labelledby="hilink-title">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
          <Reveal className="lg:col-span-5">
            <p className="label-en font-semibold tracking-[0.14em] text-[#9fb6d8]">HILINK PLATFORM</p>
            <h2 id="hilink-title" className="t-section mt-4">
              HILINK로
              <br />
              운영을 연결합니다.
            </h2>
            <p className="t-lead mt-5 text-white/75">{d.system}</p>
            <Link href="/hilink" className="group mt-8 inline-flex items-center gap-2 font-semibold text-white">
              HILINK 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          </Reveal>
          <div className="relative pb-10 lg:col-span-7">
            <AdminConcept className="w-full sm:w-[86%]" />
            <DemoPhone id="community" className="absolute -bottom-2 right-0 hidden w-[27%] max-w-[12rem] sm:block" sizes="190px" />
          </div>
          <p className="text-xs text-white/45 lg:col-span-12">HILINK 공개 데모 · 관리자 개념 UI</p>
        </div>
      </section>

      {/* 운영 프로세스 4단계 (운영형 사업) */}
      {d.showProcess && (
        <section className="bg-white" aria-labelledby="process-title">
          <div className="container-x py-20 lg:py-28">
            <Reveal>
              <h2 id="process-title" className="t-section">
                운영 프로세스
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {processSteps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.05}>
                  <p className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-[4px] bg-navy text-sm font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                    {i < processSteps.length - 1 && <span className="hidden h-px flex-1 bg-line-strong lg:block" aria-hidden />}
                  </p>
                  <h3 className="t-h4 mt-4">{s.title}</h3>
                  <p className="t-small mt-1.5 text-body">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 맡기는 방식 한 줄 + 다른 사업 */}
      <section className="border-t border-line bg-white">
        <div className="container-x grid gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-semibold">맡기는 방식</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-body">
              {d.engagement.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <nav aria-label="다른 사업영역" className="lg:col-span-7">
            <p className="font-semibold">다른 사업영역</p>
            <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-line">
                  <Link href={o.href} className="group flex items-center justify-between py-3 text-[0.9375rem] hover:text-navy">
                    {o.detail.short}
                    <ArrowRight className="btn-arrow size-4 text-steel" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <CTASection
        eyebrow="운영 상담"
        title={d.ctaTitle}
        description="시설과 현재 운영 방식을 알려주시면 현장을 확인하고 운영안을 제안드립니다."
        primary={{ label: "운영 상담", href: contactHref }}
        secondary={{ label: "HILINK 도입 문의", href: "/contact?type=hilink" }}
        track="business_page"
      />
    </>
  );
}
