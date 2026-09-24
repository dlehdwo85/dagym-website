import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { HilinkMark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { businessAreas } from "@/data/business";
import { customers } from "@/data/customers";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "사업영역",
  description:
    "아파트 커뮤니티 위탁운영, 스포츠 · 피트니스 시설 운영, 커뮤니티 복합시설 운영, HILINK 스마트 플랫폼, 운영 컨설팅, 운동기구 · 시설 구축까지. 다짐의 6가지 사업영역.",
  path: "/business",
});

const overviewProcess = [
  { title: "현장 분석", body: "시설 · 세대 · 이용 패턴 조사" },
  { title: "운영 전략", body: "운영 시간 · 프로그램 · 요금 설계" },
  { title: "인력 구성", body: "직무별 전문 인력 배치" },
  { title: "시스템 구축", body: "HILINK 출입 · 예약 · 결제 세팅" },
  { title: "운영 시작", body: "리허설 후 정식 운영" },
  { title: "데이터 분석 및 개선", body: "월간 리포트와 개선 제안" },
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Business"
        title={
          <>
            공간에 맞는 운영을
            <br />
            설계합니다.
          </>
        }
        description="다짐은 커뮤니티 공간의 유형과 이용자에 맞춰 인력 · 프로그램 · 시스템을 설계하고, 설계한 대로 직접 운영합니다."
        breadcrumbs={[{ name: "BUSINESS", path: "/business" }]}
        aside={
          <ul className="grid grid-cols-2 gap-px bg-white/10">
            {businessAreas.map((b) => (
              <li key={b.slug} className="bg-navy-950">
                <Link href={b.href} className="group flex h-full flex-col justify-between gap-6 p-4 hover:bg-white/[0.04]">
                  <span className="flex items-center justify-between">
                    <span className="t-num text-xs text-white/40">{b.no}</span>
                    <ArrowUpRight className="size-3.5 text-white/30 transition-colors group-hover:text-white" aria-hidden />
                  </span>
                  <span className="text-[0.875rem] font-semibold leading-snug">{b.ko}</span>
                </Link>
              </li>
            ))}
          </ul>
        }
      />

      {/* 사업영역 상세 리스트 */}
      <section className="section-y bg-white" aria-label="사업영역 목록">
        <div className="container-x space-y-20 lg:space-y-32">
          {businessAreas.map((b, i) => {
            const isHilink = b.slug === "hilink";
            const points = b.detail?.solutions.map((s) => s.title) ?? [
              "안면인식 출입통제",
              "강좌 · 타석 · 좌석 예약",
              "결제 · 매출 · 통계",
              "관리자 Dashboard",
            ];
            return (
              <article key={b.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal variant="image" className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                  <Link href={b.href} className="group block" tabIndex={-1} aria-hidden>
                    <Media
                      src={b.image}
                      alt=""
                      label={b.en}
                      tone={isHilink ? "ink" : i % 2 ? "stone" : "navy"}
                      zoomOnHover
                      className="aspect-[16/10]"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                  </Link>
                </Reveal>
                <div className="lg:col-span-5">
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="t-num text-5xl font-semibold text-mist-200 lg:text-6xl">{b.no}</span>
                      <Icon name={b.icon} className={cn("size-7", isHilink ? "text-signal" : "text-accent")} />
                    </div>
                    <p className="t-en mt-6 text-sm font-medium text-mist-500">{b.en}</p>
                    <h2 className="t-h2 mt-2">{isHilink ? <HilinkMark tone="dark" /> : b.ko}</h2>
                    {isHilink && <p className="mt-2 text-lg font-semibold">{b.ko}</p>}
                    <p className="t-lead mt-5 text-mist-600">{b.summary}</p>
                    <ul className="mt-7 grid grid-cols-2 gap-px bg-mist-200">
                      {points.map((p) => (
                        <li key={p} className="bg-white py-3 pr-3 text-[0.875rem] text-mist-700">
                          <span className={cn("mr-2 inline-block size-1.5 rounded-full align-middle", isHilink ? "bg-signal" : "bg-accent")} aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink href={b.href} variant={isHilink ? "primary" : "outline"} className="mt-9">
                      {isHilink ? "HILINK 자세히 보기" : `${b.ko} 자세히 보기`}
                    </ButtonLink>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 고객별 */}
      <section className="section-y bg-mist-50" aria-labelledby="customers-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="Who we work with"
            id="customers-title"
            title={"공간을 책임지는 분들과\n함께 일합니다."}
            description="다짐의 고객은 커뮤니티 공간의 가치를 책임지는 의사결정권자입니다. 각 고객이 가진 과제에 맞춰 서비스를 구성합니다."
            align="split"
          />
          <ul className="mt-14 grid gap-px bg-mist-200 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
            {customers.map((c, i) => (
              <Reveal as="li" key={c.title} delay={(i % 5) * 50} className="bg-white">
                <Link href={c.href} className="group flex h-full min-h-48 flex-col p-6 transition-colors hover:bg-navy-950 hover:text-white">
                  <h3 className="t-h4">{c.title}</h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-600 transition-colors group-hover:text-white/65">{c.body}</p>
                  <ArrowRight className="mt-auto size-4 pt-0 text-mist-400 transition-all group-hover:translate-x-1 group-hover:text-accent-light" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 공통 운영 프로세스 */}
      <section className="section-y bg-white" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="Operation Process"
            id="process-title"
            title={"상담부터 운영 개선까지,\n여섯 단계로 운영합니다."}
            align="split"
            description="모든 사업은 같은 운영 프로세스 위에서 움직입니다. 현장이 달라도 운영 품질이 일정한 이유입니다."
          />
          <div className="mt-14 lg:mt-20">
            <ProcessSteps steps={overviewProcess} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
