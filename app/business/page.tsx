import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { businessAreas } from "@/data/business";
import { operationProcess } from "@/data/home";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "사업영역",
  description:
    "아파트 커뮤니티 위탁운영, 스포츠 · 피트니스 시설 운영, 기업 · 호텔 커뮤니티 운영, 운영 컨설팅 · 시설 개선, 운동기구 · 스크린골프 납품.",
  path: "/business",
});

export default function BusinessPage() {
  return (
    <>
      <PageHero
        label="사업영역"
        title={"시설과 상황에 맞춰\n운영 범위를 정합니다."}
        description="커뮤니티 전체를 맡길 수도 있고, 일부 시설이나 출입 · 예약 시스템만 도입할 수도 있습니다. 사업영역별로 대상 고객, 운영 인력, 관리 방식을 확인하세요."
        breadcrumbs={[{ name: "사업영역", path: "/business" }]}
      />

      <section className="section-y bg-white" aria-label="사업영역 목록">
        <div className="container-x space-y-16 lg:space-y-24">
          {businessAreas.map((b, i) => {
            const showPhoto = photoVisible(b.photo);
            return (
              <article
                key={b.slug}
                className={cn("grid gap-8 border-t border-ink pt-10", showPhoto ? "lg:grid-cols-2 lg:items-center lg:gap-14" : "lg:grid-cols-12")}
              >
                {showPhoto && <Photo id={b.photo} className={cn("aspect-[4/3]", i % 2 === 1 && "lg:order-2")} />}
                <div className={cn(!showPhoto && "lg:col-span-6")}>
                  <p className="text-sm font-semibold text-brand">{b.no}</p>
                  <h2 className="t-h2 mt-2">{b.title}</h2>
                  <p className="t-lead mt-4 text-body">{b.summary}</p>
                </div>
                <div className={cn(!showPhoto && "lg:col-span-5 lg:col-start-8")}>
                  <p className="text-sm font-semibold text-muted">주요 대상</p>
                  <p className="mt-1.5 text-ink">{b.detail.targets.map((t) => t.title).join(", ")}</p>
                  <p className="mt-5 text-sm font-semibold text-muted">운영 시설</p>
                  <p className="mt-1.5 text-ink">{b.detail.facilities.slice(0, 6).join(", ")}</p>
                  <Link href={b.href} className="mt-7 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-dark">
                    {b.title} 자세히 보기 <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-y bg-paper" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeader
            label="진행 방식"
            id="process-title"
            title="상담부터 정기 보고까지"
            description="모든 사업은 현장 확인에서 시작합니다. 운영이 시작된 뒤에는 본사가 매주 현장을 점검하고 매월 보고합니다."
          />
          <div className="mt-12">
            <ProcessSteps steps={operationProcess} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
