"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Pair = { person: string; personEn: string; tech: string; techEn: string; link: string };

/**
 * PEOPLE × TECHNOLOGY
 * 데스크톱: 섹션이 화면에 고정된 동안 스크롤에 따라 현장 역할과 HILINK 기능이 한 쌍씩 연결됩니다.
 * 모바일: 연결된 쌍을 순서대로 쌓아 보여줍니다.
 */
export function PeopleTech({ pairs }: { pairs: Pair[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(pairs.length - 1, Math.max(0, Math.floor(v * pairs.length))));
  });

  const heading = (id?: string) => (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className="eyebrow text-steel">People × Technology</p>
        <h2 id={id} className="t-section mt-5">
          사람이 운영하고,
          <br />
          기술이 연결합니다.
        </h2>
      </div>
      <p className="t-body text-body lg:col-span-4">현장의 모든 역할은 HILINK의 기능과 짝을 이룹니다. 사람이 판단하고, 시스템이 기록합니다.</p>
    </div>
  );

  return (
    <section className="bg-mist" aria-labelledby="pt-title">
      {/* 데스크톱 — sticky */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: reduce ? "auto" : `${pairs.length * 55 + 60}vh` }}>
        <div className={cn("flex flex-col justify-center overflow-hidden pb-10 pt-24", !reduce && "sticky top-0 h-screen")}>
          <div className="container-x">
            {heading("pt-title")}
            <div className="mt-12 grid grid-cols-[1fr_12rem_1fr] items-stretch xl:mt-16">
              <ul className="space-y-1">
                {pairs.map((p, i) => (
                  <li
                    key={p.person}
                    className={cn(
                      "flex items-baseline justify-between border-b py-3.5 transition-all duration-500",
                      active === i ? "border-ink text-ink" : "border-line text-steel",
                    )}
                  >
                    <span className="text-2xl font-semibold tracking-[-0.03em]">{p.person}</span>
                    <span className="eyebrow">{p.personEn}</span>
                  </li>
                ))}
              </ul>

              <div className="relative" aria-hidden>
                <svg className="absolute inset-0 size-full" viewBox="0 0 100 600" preserveAspectRatio="none">
                  {pairs.map((_, i) => {
                    const yy = 600 * ((i + 0.5) / pairs.length);
                    return (
                      <motion.line
                        key={i}
                        x1="0"
                        x2="100"
                        y1={yy}
                        y2={yy}
                        stroke={active === i ? "#16181b" : "#c3c8ce"}
                        strokeWidth={active === i ? 1.5 : 0.75}
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray={active === i ? "0" : "3 5"}
                        initial={false}
                        animate={{ opacity: active === i ? 1 : 0.5 }}
                        transition={{ duration: 0.6 }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="bg-mist px-3 font-display text-4xl font-light text-ink">×</span>
                </div>
              </div>

              <ul className="space-y-1">
                {pairs.map((p, i) => (
                  <li
                    key={p.tech}
                    className={cn(
                      "flex items-baseline justify-between gap-4 border-b py-3.5 transition-all duration-500",
                      active === i ? "border-navy text-navy" : "border-line text-steel",
                    )}
                  >
                    <span className="eyebrow">{p.techEn}</span>
                    <span className="text-right text-2xl font-semibold tracking-[-0.03em]">{p.tech}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex items-center justify-between gap-6">
              <motion.p key={active} className="t-lead text-ink" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {pairs[active].link}
              </motion.p>
              <Link href="/hilink" className="group inline-flex shrink-0 items-center gap-2 border-b border-ink/30 pb-0.5 font-semibold">
                HILINK 기능 전체 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className="section-y lg:hidden">
        <div className="container-x">
          {heading()}
          <ol className="mt-12 border-t border-ink">
            {pairs.map((p) => (
              <li key={p.person} className="border-b border-line py-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold">{p.person}</span>
                  <span className="h-px flex-1 bg-line-strong" aria-hidden />
                  <span className="font-display text-sm">×</span>
                  <span className="h-px flex-1 bg-line-strong" aria-hidden />
                  <span className="text-right text-xl font-semibold text-navy">{p.tech}</span>
                </div>
                <p className="t-small mt-3 text-body">{p.link}</p>
              </li>
            ))}
          </ol>
          <Link href="/hilink" className="group mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-0.5 font-semibold">
            HILINK 기능 전체 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
