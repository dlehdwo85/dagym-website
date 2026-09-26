import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { OperationSystem } from "@/components/home/OperationSystem";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { businessAreas } from "@/data/business";
import { businessPhoto, coreBusinesses, supportingService } from "@/data/corporate";
import { DemoPhone } from "@/components/hilink/DemoPhone";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/data/photos";
import { hasPhoto } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "사업영역",
  description:
    "주식회사 다짐의 핵심사업 — 커뮤니티 시설 전문 위탁운영(공동주택 · 스포츠시설 · 기업 · 호텔)과 커뮤니티 운영 플랫폼 HILINK 구축 · 납품.",
  path: "/business",
});

export default function BusinessPage() {
  const [ops, platform] = coreBusinesses;
  const opsAreas = businessAreas.filter((b) => b.slug !== "equipment");
  const support = businessAreas.find((b) => b.slug === "equipment");
  return (
    <>
      <PageHero
        eyebrow="사업영역"
        en="Business"
        title={"커뮤니티를 운영하고,\n운영 플랫폼을 공급합니다."}
        description="다짐의 핵심사업은 커뮤니티 시설 전문 위탁운영과 커뮤니티 운영 플랫폼 HILINK 구축 · 납품, 두 가지입니다."
        breadcrumbs={[{ name: "사업영역", path: "/business" }]}
      />

      {/* CORE 01 — 커뮤니티 운영 */}
      <section aria-labelledby="core-ops-title" className="bg-white">
        <div className="container-x pt-16 lg:pt-24">
          <p className="flex items-center gap-3">
            <span className="text-sm font-bold text-accent">CORE {ops.no}</span>
            <span className="label-en text-steel">{ops.en}</span>
          </p>
          <h2 id="core-ops-title" className="t-section mt-3">
            {ops.title}
          </h2>
          <p className="t-lead mt-5 max-w-3xl text-body">{ops.lead}</p>
        </div>
        <ol className="container-x">
          {opsAreas.map((b) => {
            const pid = businessPhoto[b.slug];
            const img = pid && hasPhoto(pid) ? photos[pid] : undefined;
            return (
              <li key={b.slug} className="border-b border-line last:border-0">
                <Link href={b.href} className="group grid gap-8 py-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16">
                  <Reveal className="lg:col-span-7">
                    <p className="text-sm font-bold text-accent">{ops.no}-{b.no}</p>
                    <h3 className="t-h2 mt-2 transition-colors group-hover:text-navy">{b.title}</h3>
                    <p className="t-lead mt-4 max-w-2xl text-body">{b.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {b.points.map((p) => (
                        <li key={p} className="rounded-[4px] bg-mist px-3 py-1.5 text-sm text-body">
                          {p}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-7 inline-flex items-center gap-2 font-semibold text-navy">
                      자세히 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                    </span>
                  </Reveal>
                  <div className="lg:col-span-5">
                    {img && (
                      <ClipReveal className="img-zoom aspect-[4/3] rounded-[4px] bg-mist">
                        <Image src={img.file} alt={img.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
                      </ClipReveal>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* CORE 02 — HILINK */}
      <section aria-labelledby="core-platform-title" className="overflow-hidden bg-navy text-white">
        <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#9dbcf0]">CORE {platform.no}</span>
              <span className="label-en text-white/60">{platform.en}</span>
            </p>
            <h2 id="core-platform-title" className="t-section mt-3">
              {platform.title}
            </h2>
            <p className="t-lead mt-5 max-w-2xl text-white/80">{platform.lead}</p>
            <ul className="mt-7 grid gap-x-8 border-t border-white/15 sm:grid-cols-2">
              {platform.items.map((it) => (
                <li key={it} className="t-small border-b border-white/15 py-3 text-white/85">
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href="/hilink" variant="white">
                HILINK 플랫폼 보기
              </ButtonLink>
              <ButtonLink href="/contact?type=hilink" variant="outline-white">
                도입 문의
              </ButtonLink>
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <div className="flex justify-center gap-5">
              <DemoPhone id="home" className="w-[44%] max-w-[13rem]" sizes="(min-width: 1024px) 208px, 44vw" />
              <DemoPhone id="allServices" className="mt-10 w-[44%] max-w-[13rem]" sizes="(min-width: 1024px) 208px, 44vw" />
            </div>
            <p className="mt-4 text-xs text-white/45">HILINK 공개 데모</p>
          </div>
        </div>
      </section>

      {/* SUPPORTING SERVICE */}
      {support && (
        <section aria-label="보조 서비스" className="border-b border-line bg-mist">
          <div className="container-x flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.08em] text-steel">SUPPORTING SERVICE · {supportingService.en}</p>
              <p className="t-h4 mt-2">{supportingService.title}</p>
              <p className="t-small mt-1.5 max-w-2xl text-body">{supportingService.lead}</p>
            </div>
            <Link href={support.href} className="group inline-flex shrink-0 items-center gap-2 text-[0.9375rem] font-semibold text-navy">
              시설 지원 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          </div>
        </section>
      )}

      <OperationSystem tone="white" />
      <CTASection />
    </>
  );
}
