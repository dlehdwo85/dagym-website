import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { communication, hqDepartments, hqFlow, hqSupportLine, staffTraining, weeklyCycle } from "@/data/corporate";

/** 본사 운영체계 — 조직도를 운영 모델로 재해석 */
export function HqManagement({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <section className="section-y bg-white" aria-labelledby="hq-title">
      <div className="container-x">
        {showTitle && (
          <SectionHeader
            id="hq-title"
            eyebrow="본사 운영체계"
            en="HQ management"
            title={"현장은 한 사람이 아니라,\n본사가 함께 운영합니다."}
            description="현장을 맡기면 직원 한 명이 관리하는 것이 아니라, 다짐 본사 조직과 운영 시스템 전체가 현장을 관리합니다."
          />
        )}

        {/* 운영 흐름 */}
        <Reveal className="mt-14 lg:mt-16">
          <ol className="flex flex-wrap items-center gap-2 text-[0.9375rem]" aria-label="운영 흐름">
            {hqFlow.map((f, i) => (
              <li key={f.en} className="flex items-center gap-2">
                <span className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-line-strong bg-white px-4">
                  <span className="font-semibold text-ink">{f.ko}</span>
                  <span className="label-en hidden text-steel sm:inline">{f.en}</span>
                </span>
                {i < hqFlow.length - 1 && <ArrowRight className="size-4 text-steel" aria-hidden />}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* 조직 */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h3 className="t-h3">5개 전문 부서</h3>
            <p className="t-small mt-3 text-body">{hqSupportLine}</p>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:col-span-9 lg:grid-cols-5">
            {hqDepartments.map((d, i) => (
              <Reveal as="li" key={d.name} delay={i * 0.04} className="bg-white p-6">
                <p className="text-sm font-semibold text-accent">{d.role}</p>
                <p className="t-h4 mt-1">{d.name}</p>
                <ul className="t-small mt-4 space-y-1.5 text-body">
                  {d.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* 주간 점검 · 소통 · 교육 */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h3 className="t-h3">매주 본사가 현장에 갑니다</h3>
            <p className="t-small mt-3 text-body">본사 운영 담당이 주차별 주제를 정해 현장을 점검하고, 결과를 월간 보고에 반영합니다.</p>
          </Reveal>
          <div className="lg:col-span-9">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {weeklyCycle.map((w) => (
                <li key={w.week} className="border-t-2 border-navy pt-4">
                  <p className="text-sm font-bold text-navy">{w.week}</p>
                  <p className="t-h4 mt-1">{w.title}</p>
                  <p className="t-small mt-1.5 text-body">{w.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {communication.map((c) => (
                <div key={c.who} className="rounded-[4px] bg-mist p-5">
                  <p className="font-semibold">{c.who} 소통</p>
                  <ul className="t-small mt-2 space-y-1 text-body">
                    {c.channels.map((ch) => (
                      <li key={ch}>{ch}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="rounded-[4px] bg-mist p-5">
                <p className="font-semibold">직원 정기 교육</p>
                <ul className="t-small mt-2 space-y-1 text-body">
                  {staffTraining.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
