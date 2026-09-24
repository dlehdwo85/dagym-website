import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList } from "@/components/sections/FaqList";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { HilinkLogo } from "@/components/ui/Logo";
import { hilinkExtensions, hilinkForWhom, hilinkFunctions, hilinkIntro, hilinkSteps } from "@/data/hilink";
import { faqs } from "@/data/insight";
import { brandAssets, company, siteConfig } from "@/data/config";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "HILINK 커뮤니티 출입 · 예약 · 회원관리 시스템",
  description:
    "HILINK는 다짐이 개발한 커뮤니티 운영 시스템입니다. 앱 얼굴 등록과 안면인식 출입, GX · 골프 타석 · 독서실 · 게스트룸 예약, 회원 · 락커 관리, 이용료 일할 계산과 매출 집계를 제공합니다.",
  path: "/hilink",
  keywords: ["커뮤니티 예약 시스템", "안면인식 출입통제", "아파트 출입관리", "커뮤니티 운영 플랫폼", "골프 타석 예약", "HILINK", "하이링크"],
});

export default function HilinkPage() {
  const hilinkFaqs = faqs.filter((f) => f.group === "HILINK");
  const brandAssetsHilink = Boolean(brandAssets.hilink);
  const screens = (["hilink-app", "hilink-admin", "hilink-device"] as const).filter((id) => photoVisible(id));

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
      <PageHero
        label="HILINK"
        title={hilinkIntro.title}
        description={hilinkIntro.body}
        breadcrumbs={[{ name: "HILINK", path: "/hilink" }]}
        actions={
          <>
            <ButtonLink href="/contact?type=hilink" size="lg">
              HILINK 도입 문의
            </ButtonLink>
            <ButtonLink href="#functions" variant="secondary" size="lg" arrow={false}>
              주요 기능 보기
            </ButtonLink>
          </>
        }
      />

      {brandAssetsHilink && (
        <div className="container-x pt-12">
          <HilinkLogo />
        </div>
      )}

      {screens.length > 0 && (
        <section className="bg-white pt-14 lg:pt-20" aria-label="HILINK 실제 화면">
          <div className="container-x grid gap-6 md:grid-cols-3">
            {screens.includes("hilink-admin") && <Photo id="hilink-admin" className="aspect-[16/10] md:col-span-2" />}
            {screens.includes("hilink-app") && <Photo id="hilink-app" className="mx-auto aspect-[9/19] w-full max-w-[18rem]" sizes="288px" />}
            {screens.includes("hilink-device") && <Photo id="hilink-device" className="aspect-[4/5]" />}
          </div>
        </section>
      )}

      <section className="section-y bg-white" aria-labelledby="whom-title">
        <div className="container-x">
          <SectionHeader label="누가 쓰나요" id="whom-title" title={"입주민, 현장 운영자, 관리 주체가\n같은 정보를 봅니다."} />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {hilinkForWhom.map((w) => (
              <div key={w.who} className="border-t border-ink pt-6">
                <h3 className="t-h3">{w.who}</h3>
                <ul className="mt-4 space-y-2.5 text-body">
                  {w.items.map((it) => (
                    <li key={it} className="flex gap-3 leading-relaxed">
                      <span className="mt-[0.8em] h-px w-3 shrink-0 bg-brand" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="functions" className="section-y scroll-mt-20 bg-paper" aria-labelledby="functions-title">
        <div className="container-x">
          <SectionHeader label="주요 기능" id="functions-title" title="현장 운영에 실제로 쓰는 기능" />
          <dl className="mt-12 grid gap-x-12 border-t border-ink md:grid-cols-2">
            {hilinkFunctions.map((f) => (
              <div key={f.title} className="border-b border-line-strong py-7">
                <dt className="t-h3">{f.title}</dt>
                <dd className="t-body mt-2 text-body">{f.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-[0.9375rem] text-body">
            <span className="font-semibold text-ink">확장 기능 (별도 협의)</span> · {hilinkExtensions.join(" · ")}
          </p>
        </div>
      </section>

      <section className="section-y bg-white" aria-labelledby="steps-title">
        <div className="container-x">
          <SectionHeader label="도입 절차" id="steps-title" title="현장 분석부터 안정화까지" />
          <div className="mt-12">
            <ProcessSteps steps={hilinkSteps} columns={2} />
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <div className="bg-paper p-7">
              <h3 className="t-h3">위탁운영과 함께</h3>
              <p className="mt-2 leading-relaxed text-body">다짐이 커뮤니티를 운영하는 현장에는 HILINK가 기본으로 적용됩니다.</p>
              <ButtonLink href="/contact?type=apartment" variant="text" className="mt-5">
                위탁운영 상담
              </ButtonLink>
            </div>
            <div className="bg-paper p-7">
              <h3 className="t-h3">시스템만 도입</h3>
              <p className="mt-2 leading-relaxed text-body">단지 · 시설이 직접 운영하면서 출입 · 예약 · 정산 시스템만 도입할 수 있습니다.</p>
              <ButtonLink href="/contact?type=hilink" variant="text" className="mt-5">
                HILINK 도입 문의
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {hilinkFaqs.length > 0 && (
        <section className="section-y border-t border-line bg-white" aria-labelledby="hilink-faq-title">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader label="자주 묻는 질문" id="hilink-faq-title" title="HILINK 도입 전 확인하세요" />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={hilinkFaqs} />
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="HILINK 도입, 현장 확인부터 시작합니다."
        description="세대수와 시설 구성, 현재 출입 · 예약 방식을 알려주시면 단말기 수량과 적용 범위를 제안해 드립니다."
        primary={{ label: "HILINK 도입 문의", href: "/contact?type=hilink" }}
      />
    </>
  );
}
