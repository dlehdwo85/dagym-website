import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList } from "@/components/sections/FaqList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { HilinkIcon } from "@/components/ui/HilinkIcon";
import { HilinkMark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { FlowDiagram } from "@/components/hilink/FlowDiagram";
import {
  AccessMockup,
  AnalyticsMockup,
  BookingMockup,
  DashboardMockup,
  PhoneAppMockup,
} from "@/components/hilink/Mockups";
import { hilinkAudiences, hilinkFeatures, hilinkShowcase } from "@/data/hilink";
import { faqs } from "@/data/insight";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { company, siteConfig } from "@/data/config";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "HILINK 스마트 커뮤니티 운영 플랫폼",
  description:
    "HILINK는 회원관리, 안면인식 출입통제, 강좌 · GX · 골프 타석 · 좌석 예약, 락커, 결제, 매출 통계, 공지 · Push, 대관 · 추첨을 하나로 연결하는 다짐의 커뮤니티 운영 플랫폼입니다.",
  path: "/hilink",
  keywords: ["커뮤니티 운영 플랫폼", "아파트 출입관리", "안면인식 출입통제", "커뮤니티 예약 시스템", "골프 타석 예약", "HILINK"],
});

const visuals = {
  access: <AccessMockup />,
  booking: <BookingMockup />,
  dashboard: <DashboardMockup />,
  analytics: <AnalyticsMockup />,
};

const comparison = [
  { item: "출입 · 예약 · 결제 · 통계", general: "기능별로 다른 솔루션", hilink: "하나의 플랫폼" },
  { item: "현장 운영 인력", general: "별도 계약 필요", hilink: "다짐 위탁운영과 결합 가능" },
  { item: "현장 요구 반영", general: "소프트웨어 공급사 일정에 의존", hilink: "운영 현장의 요구를 직접 반영" },
  { item: "운영 리포트", general: "데이터 추출은 고객 몫", hilink: "월간 운영 리포트로 제공" },
];

export default function HilinkPage() {
  const hilinkFaqs = faqs.filter((f) => f.group === "HILINK");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "HILINK",
          applicationCategory: "BusinessApplication",
          operatingSystem: "iOS, Android, Web",
          description: "커뮤니티 통합 운영 플랫폼 — 회원관리, 안면인식 출입, 예약, 결제, 통계",
          url: absoluteUrl("/hilink"),
          publisher: { "@type": "Organization", name: company.nameKo, url: siteConfig.url },
        }}
      />
      <PageHero
        tone="ink"
        size="lg"
        accent="signal"
        eyebrow="Smart Community Platform"
        title={
          <>
            <span className="mb-6 flex"><HilinkMark className="text-[0.62em]" /></span>
            커뮤니티 운영의 모든 것을
            <br />
            하나의 플랫폼으로.
          </>
        }
        description="회원관리부터 안면인식 출입, 예약, 결제, 매출 통계까지. HILINK는 다짐이 직접 개발하고 운영 현장에서 직접 사용하는 커뮤니티 운영 플랫폼입니다."
        breadcrumbs={[{ name: "HILINK", path: "/hilink" }]}
        actions={
          <>
            <ButtonLink href="/contact?type=hilink" variant="light" size="lg">
              HILINK 도입 문의
            </ButtonLink>
            <ButtonLink href="#features" variant="outline-light" size="lg">
              주요 기능 보기
            </ButtonLink>
          </>
        }
        aside={
          <div className="relative pb-10">
            <DashboardMockup compact />
            <div className="absolute -bottom-6 right-0 hidden origin-bottom-right scale-[0.72] sm:block">
              <PhoneAppMockup />
            </div>
          </div>
        }
      />

      {/* 사용자별 */}
      <section className="border-b border-mist-200 bg-white" aria-label="HILINK 사용자">
        <div className="container-x">
        <ul className="grid grid-cols-2 gap-px bg-mist-200 lg:grid-cols-4">
          {hilinkAudiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 60} className="bg-white px-1 py-8 sm:px-6 lg:py-10">
              <p className="t-eyebrow !text-[0.625rem] text-signal">For</p>
              <h2 className="t-h4 mt-3">{a.title}</h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-600">{a.body}</p>
            </Reveal>
          ))}
        </ul>
        </div>
      </section>

      {/* 주요 기능 */}
      <section id="features" className="section-y scroll-mt-16 bg-white" aria-labelledby="features-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="Features"
            id="features-title"
            title={"커뮤니티 운영에 필요한\n15가지 기능."}
            description="입주민 앱, 관리자 웹, 안면인식 단말기가 하나의 데이터로 연결됩니다."
            align="split"
          />
          <ul className="mt-14 grid grid-cols-2 gap-px bg-mist-200 md:grid-cols-3 lg:mt-20 lg:grid-cols-5">
            {hilinkFeatures.map((f, i) => (
              <Reveal as="li" key={f.key} delay={(i % 5) * 40} className="bg-white">
                <div className="group flex h-full flex-col p-5 transition-colors hover:bg-signal-soft/50 sm:p-6">
                  <HilinkIcon name={f.key} className="size-6 text-signal" />
                  <p className="t-en mt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-mist-400">{f.en}</p>
                  <h3 className="mt-1 text-[1.0625rem] font-semibold tracking-[-0.02em]">{f.title}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist-600">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 기능 쇼케이스 */}
      <section className="on-dark bg-ink text-white" aria-label="HILINK 화면 소개">
        {hilinkShowcase.map((s, i) => (
          <div key={s.id} id={s.id} className={cn("scroll-mt-16 border-white/10", i > 0 && "border-t")}>
            <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
              <div className={cn("min-w-0 lg:col-span-5", i % 2 === 1 && "lg:order-2")}>
                <Reveal>
                  <p className="t-eyebrow flex items-center gap-3 text-signal-light">
                    <span className="t-num text-white/35">{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden className="h-px w-8 bg-signal-light/60" />
                    {s.eyebrow}
                  </p>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="t-h2 mt-6 whitespace-pre-line">{s.title}</h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="t-lead mt-6 text-white/60">{s.body}</p>
                </Reveal>
                <Reveal delay={160}>
                  <ul className="mt-8 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[0.9375rem] text-white/85">
                        <Check className="size-4 text-signal-light" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
              <Reveal delay={100} className="min-w-0 lg:col-span-7">
                {visuals[s.visual]}
              </Reveal>
            </div>
          </div>
        ))}
      </section>

      {/* 운영 흐름 */}
      <section id="flow" className="on-dark section-y scroll-mt-16 border-t border-white/10 bg-navy-950 text-white" aria-labelledby="flow-title">
        <div className="container-x">
          <SectionHeader
            tone="dark"
            eyebrow="How it works"
            id="flow-title"
            title={"입주민의 한 번의 터치가\n운영 데이터가 되기까지."}
            description="HILINK는 입주민 앱에서 시작해 다짐 운영센터와 데이터 관리로 이어지는 하나의 흐름입니다."
            align="split"
          />
          <div className="mt-14 lg:mt-20">
            <FlowDiagram />
          </div>
        </div>
      </section>

      {/* 운영사가 만든 플랫폼 */}
      <section className="section-y bg-white" aria-labelledby="why-hilink-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Why HILINK"
              id="why-hilink-title"
              title={"운영하는 회사가\n만든 플랫폼."}
              description="HILINK는 소프트웨어만 판매하는 솔루션이 아닙니다. 다짐의 현장 운영과 함께 설계되고 개선됩니다."
            />
          </div>
          <Reveal className="min-w-0 lg:col-span-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <caption className="sr-only">일반 솔루션과 HILINK 비교</caption>
                <thead>
                  <tr className="border-b border-ink">
                    <th scope="col" className="py-4 pr-4 text-[0.8125rem] font-medium text-mist-500">구분</th>
                    <th scope="col" className="py-4 pr-4 text-[0.8125rem] font-medium text-mist-500">일반 솔루션</th>
                    <th scope="col" className="bg-signal-soft/60 px-4 py-4 text-[0.8125rem] font-semibold text-ink">
                      HILINK + DAGYM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((r) => (
                    <tr key={r.item} className="border-b border-mist-200">
                      <th scope="row" className="py-5 pr-4 text-[0.9375rem] font-semibold">{r.item}</th>
                      <td className="py-5 pr-4 text-[0.9375rem] text-mist-500">
                        <span className="inline-flex items-center gap-2">
                          <Minus className="size-4 text-mist-300" aria-hidden />
                          {r.general}
                        </span>
                      </td>
                      <td className="bg-signal-soft/60 px-4 py-5 text-[0.9375rem] font-medium">
                        <span className="inline-flex items-center gap-2">
                          <Check className="size-4 text-signal" aria-hidden />
                          {r.hilink}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 도입 방식 */}
      <section className="section-y bg-mist-50" aria-labelledby="plans-title">
        <div className="container-x">
          <SectionHeader eyebrow="Deployment" id="plans-title" title="도입 방식" align="split" description="운영 상황에 맞춰 두 가지 방식으로 도입할 수 있습니다." />
          <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-2">
            <Reveal className="flex flex-col border border-mist-200 bg-white p-8 lg:p-10">
              <p className="t-eyebrow text-signal">Option A</p>
              <h3 className="t-h3 mt-4">HILINK 단독 도입</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-600">
                자체 운영 중인 단지 · 시설에 출입 · 예약 · 결제 · 통계 시스템만 도입합니다.
              </p>
              <ul className="mt-8 space-y-3 text-[0.9375rem]">
                {["안면인식 단말기 설치 · 연동", "세대 · 회원 데이터 이관", "관리자 교육 · 기술 지원"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Check className="size-4 text-signal" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/contact?type=hilink" variant="outline" className="mt-auto self-start !mt-10">
                HILINK 도입 문의
              </ButtonLink>
            </Reveal>
            <Reveal delay={100} className="on-dark flex flex-col bg-navy-950 p-8 text-white lg:p-10">
              <p className="t-eyebrow text-accent-light">Option B · Recommended</p>
              <h3 className="t-h3 mt-4">위탁운영 + HILINK</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">
                현장 운영 인력과 HILINK를 함께 제공합니다. 다짐의 운영 모델을 그대로 적용하는 방식입니다.
              </p>
              <ul className="mt-8 space-y-3 text-[0.9375rem]">
                {["센터장 · 전문 인력 운영", "HILINK 전 기능 적용", "월간 운영 리포트 · 개선 제안"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Check className="size-4 text-accent-light" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/contact?type=apartment" variant="accent" className="mt-auto self-start !mt-10">
                위탁운영 상담 신청
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-white" aria-labelledby="hilink-faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" id="hilink-faq-title" title="HILINK 자주 묻는 질문" />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={hilinkFaqs} />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="HILINK"
        title={"커뮤니티 운영,\n이제 하나의 플랫폼으로."}
        description="단지 규모와 시설 구성을 알려주시면 HILINK 적용 범위와 도입 방식을 제안해 드립니다."
        primary={{ label: "HILINK 도입 문의", href: "/contact?type=hilink" }}
        secondary={{ label: "위탁운영 상담", href: "/contact?type=apartment" }}
      />
    </>
  );
}
