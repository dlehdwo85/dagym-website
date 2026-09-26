import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { transformations } from "@/data/corporate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "운영 개선 사례",
  description:
    "헬스장 기구 보강, 골프연습장 스크린 전환, GX룸 활성화, 키즈 · 카페 운영 개선, 독서실 좌석 · 출입 관리, 다목적실 활용 — 다짐이 현장에서 수행하는 운영 개선 방식.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="운영 개선"
        en="Operation transformation"
        title={"문제 → 진단 → 개선 → 운영,\n다짐이 현장을 바꾸는 방식"}
        description="운영하며 찾은 문제를 시설 · 프로그램 · 시스템으로 개선합니다. 현장명 · 전후 사진 · 결과 수치는 공개 동의와 근거 확인이 끝난 사례부터 게재합니다."
        breadcrumbs={[{ name: "운영 개선 사례", path: "/cases" }]}
      />
      <section className="section-y bg-white" aria-label="운영 개선 사례 목록">
        <ul className="container-x grid gap-5 md:grid-cols-2">
          {transformations.map((t, i) => (
            <Reveal as="li" key={t.slug} delay={(i % 2) * 0.05}>
              <Link href={`/cases/${t.slug}`} className="group flex h-full flex-col rounded-[4px] border border-line p-7 transition-colors hover:border-navy lg:p-8">
                <p className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-accent">{t.facility}</span>
                  <span className="label-en text-steel">{t.en}</span>
                </p>
                <h2 className="t-h3 mt-3 group-hover:text-navy">{t.title}</h2>
                <p className="t-small mt-2 text-body">{t.summary}</p>
                <dl className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
                  {(
                    [
                      ["문제", t.problem[0]],
                      ["진단", t.diagnosis[0]],
                      ["개선", t.action[0]],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs font-bold text-steel">{k}</dt>
                      <dd className="t-small mt-1 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-navy">
                  자세히 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <CTASection eyebrow="현장 진단" title={"우리 단지에도\n개선할 곳이 있을까요?"} />
    </>
  );
}
