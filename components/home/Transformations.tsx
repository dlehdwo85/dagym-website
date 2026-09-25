import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { transformations } from "@/data/corporate";

/** 운영 개선 사례 유형 — Problem → Diagnosis → Action → Operation */
export function Transformations({ limit = 4 }: { limit?: number }) {
  const list = transformations.slice(0, limit);
  return (
    <section className="section-y bg-mist" aria-labelledby="tf-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            id="tf-title"
            eyebrow="운영 개선"
            en="Operation transformation"
            title={"운영하며 찾은 문제를\n시설과 프로그램으로 바꿉니다."}
            description="다짐이 현장에서 반복해 온 개선 방식입니다. 현장명 · 전후 사진 · 결과 수치는 공개 동의와 근거 확인 후 게재합니다."
          />
          <ButtonLink href="/cases" variant="secondary" className="shrink-0">
            개선 사례 전체 보기
          </ButtonLink>
        </div>
        <ul className="mt-14 space-y-4 lg:mt-16">
          {list.map((t, i) => (
            <Reveal as="li" key={t.slug} delay={i * 0.05}>
              <Link href={`/cases/${t.slug}`} className="group grid gap-6 rounded-[4px] border border-line bg-white p-6 transition-colors hover:border-navy lg:grid-cols-12 lg:gap-8 lg:p-8">
                <div className="lg:col-span-4">
                  <p className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-accent">{t.facility}</span>
                    <span className="label-en text-steel">{t.en}</span>
                  </p>
                  <h3 className="t-h3 mt-2 group-hover:text-navy">{t.title}</h3>
                  <p className="t-small mt-2 text-body">{t.summary}</p>
                </div>
                <dl className="grid gap-5 sm:grid-cols-3 lg:col-span-7">
                  {(
                    [
                      ["문제", t.problem[0]],
                      ["진단", t.diagnosis[0]],
                      ["개선", t.action[0]],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="border-t border-line-strong pt-3">
                      <dt className="text-xs font-bold text-steel">{k}</dt>
                      <dd className="t-small mt-1.5 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <span className="hidden items-center justify-end lg:col-span-1 lg:flex">
                  <ArrowRight className="btn-arrow size-5 text-navy" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
