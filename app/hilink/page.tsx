import type { Metadata } from "next";
import { HilinkSecondHero } from "@/components/hilink/HilinkSecondHero";
import { OperatingModel } from "@/components/home/OperatingModel";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList } from "@/components/sections/FaqList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { HilinkLogo } from "@/components/ui/Logo";
import { hilinkExtensions, hilinkForWhom, hilinkFunctions, hilinkSteps } from "@/data/hilink";
import { faqs } from "@/data/insight";
import { brandAssets, company, siteConfig } from "@/data/config";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "HILINK 커뮤니티 출입 · 예약 · 회원관리 시스템",
  description:
    "HILINK는 다짐이 개발한 커뮤니티 운영 시스템입니다. 앱 얼굴 등록과 안면인식 출입, GX · 골프 타석 · 독서실 · 게스트룸 예약, 회원 · 락커 관리, 이용료 일할 계산과 매출 집계를 제공합니다.",
  path: "/hilink",
  keywords: ["커뮤니티 예약 시스템", "안면인식 출입통제", "아파트 출입관리", "커뮤니티 운영 플랫폼", "골프 타석 예약", "HILINK", "하이링크"],
});

const whoEn = ["Residents", "On-site team", "Management office"];
const stepEn = ["Site Survey", "Design", "Install & Register", "Stabilize"];

export default function HilinkPage() {
  const hilinkFaqs = faqs.filter((f) => f.group === "HILINK");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "HILINK",
          alternateName: "하이링크",
          applicationCategory: "BusinessApplication",
          operatingSystem: "iOS, Android, Web",
          description: "커뮤니티 출입 · 예약 · 회원관리 시스템",
          url: absoluteUrl("/hilink"),
          publisher: { "@type": "Organization", name: company.nameKo, url: siteConfig.url },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "HILINK", path: "/hilink" },
        ])}
      />

      <HilinkSecondHero headingLevel="h1" />

      {brandAssets.hilink && (
        <div className="container-x pt-14">
          <HilinkLogo />
        </div>
      )}

      {/* 누가 쓰나요 */}
      <section className="section-y bg-white" aria-labelledby="whom-title">
        <div className="container-x">
          <SectionHeader eyebrow="One platform, three users" id="whom-title" title={"입주민, 현장, 관리 주체가\n같은 정보를 봅니다."} />
          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-3 lg:gap-10">
            {hilinkForWhom.map((w, i) => (
              <Reveal key={w.who} delay={i * 0.1} className="border-t border-ink pt-6">
                <p className="eyebrow text-steel">{whoEn[i]}</p>
                <h3 className="t-h3 mt-3">{w.who}</h3>
                <ul className="mt-6 space-y-3 text-body">
                  {w.items.map((it) => (
                    <li key={it} className="t-small flex gap-3">
                      <span className="mt-[0.7em] size-1 shrink-0 bg-ink" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 기능 */}
      <section id="functions" className="section-y scroll-mt-20 bg-mist" aria-labelledby="functions-title">
        <div className="container-x">
          <SectionHeader eyebrow="Features" id="functions-title" title="현장 운영에 실제로 쓰는 기능" />
          <ol className="mt-16 border-t border-ink lg:mt-24">
            {hilinkFunctions.map((f, i) => (
              <li key={f.title} className="group grid gap-3 border-b border-line-strong py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
                <span className="font-display text-sm text-steel lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3 lg:col-span-4">{f.title}</h3>
                <p className="t-body text-body lg:col-span-7">{f.body}</p>
              </li>
            ))}
          </ol>
          <p className="t-small mt-8 text-body">
            <span className="eyebrow mr-3 text-ink">Extensions</span>
            {hilinkExtensions.join(" · ")} (별도 협의)
          </p>
        </div>
      </section>

      <OperatingModel
        eyebrow="Deployment"
        title={"현장 분석부터\n안정화까지 네 단계."}
        steps={hilinkSteps.map((s, i) => ({ en: stepEn[i] ?? "", ko: s.title, body: s.body }))}
      />

      {/* 도입 방식 — 분할 */}
      <section className="grid lg:grid-cols-2" aria-label="도입 방식">
        <div className="bg-charcoal px-5 py-20 text-white md:px-10 lg:px-14 lg:py-28">
          <p className="eyebrow text-white/45">With operation</p>
          <h2 className="t-h2 mt-5">위탁운영과 함께</h2>
          <p className="t-body mt-5 max-w-md text-white/65">다짐이 커뮤니티를 운영하는 현장에는 HILINK가 기본으로 적용됩니다.</p>
          <ButtonLink href="/contact?type=apartment" variant="outline-white" className="mt-10">
            위탁운영 상담
          </ButtonLink>
        </div>
        <div className="bg-fog px-5 py-20 md:px-10 lg:px-14 lg:py-28">
          <p className="eyebrow text-steel">System only</p>
          <h2 className="t-h2 mt-5">시스템만 도입</h2>
          <p className="t-body mt-5 max-w-md text-body">단지 · 시설이 직접 운영하면서 출입 · 예약 · 정산 시스템만 도입할 수 있습니다.</p>
          <ButtonLink href="/contact?type=hilink" variant="secondary" className="mt-10">
            HILINK 도입 문의
          </ButtonLink>
        </div>
      </section>

      {hilinkFaqs.length > 0 && (
        <section className="section-y bg-white" aria-labelledby="hilink-faq-title">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="FAQ" id="hilink-faq-title" title={"도입 전\n확인하세요"} size="h2" />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={hilinkFaqs} />
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Start with HILINK"
        title={"HILINK 도입,\n현장 확인부터 시작합니다."}
        description="세대수와 시설 구성, 현재 출입 · 예약 방식을 알려주시면 단말기 수량과 적용 범위를 제안해 드립니다."
        primary={{ label: "HILINK 도입 문의", href: "/contact?type=hilink" }}
        secondary={{ label: "위탁운영 알아보기", href: "/business/apartment-community" }}
      />
    </>
  );
}
