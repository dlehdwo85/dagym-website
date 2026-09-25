"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { PhoneScreen } from "@/components/hilink/Screens";
import type { HilinkScreen } from "@/data/hilink";
import { cn } from "@/lib/cn";

type Step = { no: string; en: string; ko: string; body: string; points: string[]; screen: HilinkScreen };

/**
 * HILINK 스크롤 스토리 01 MEMBER → 06 DATA
 * 데스크톱: 섹션 고정, 스크롤 진행에 따라 단계와 화면이 바뀜
 * 모바일: 가로 스와이프 카드
 */
export function HilinkStory({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)))));
  const s = steps[active];

  return (
    <div id="story" className="scroll-mt-20">
      {/* 데스크톱 */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: reduce ? "auto" : `${steps.length * 60 + 40}vh` }}>
        <div className={cn("flex items-center", !reduce && "sticky top-0 h-screen")}>
          <div className="container-x grid w-full grid-cols-12 items-center gap-10">
            <ol className="col-span-3 space-y-1 border-l border-line-dark" aria-label="HILINK 운영 흐름">
              {steps.map((st, i) => (
                <li key={st.no} className="relative pl-6">
                  <span className={cn("absolute -left-px top-0 h-full w-px bg-signal transition-transform duration-500 origin-top", active === i ? "scale-y-100" : "scale-y-0")} aria-hidden />
                  <p className={cn("flex items-baseline gap-3 py-2.5 transition-colors duration-500", active === i ? "text-white" : "text-white/35")}>
                    <span className="font-display text-xs">{st.no}</span>
                    <span className="eyebrow">{st.en}</span>
                  </p>
                </li>
              ))}
            </ol>
            <div className="col-span-5">
              <AnimatePresence mode="wait">
                <motion.div key={s.no} initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <p className="display text-[4.5rem] text-white/15">{s.no}</p>
                  <h3 className="t-h2 mt-2 text-white">{s.ko}</h3>
                  <p className="t-lead mt-6 text-white/65">{s.body}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="rounded-[2px] border border-white/15 px-3 py-1.5 text-sm text-white/75">
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="col-span-4 flex justify-center">
              <div className="relative w-full max-w-[17rem]">
                <AnimatePresence mode="wait">
                  <motion.div key={s.screen} initial={reduce ? false : { opacity: 0, scale: 0.96, rotateY: -12 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                    <PhoneScreen screen={s.screen} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 · 태블릿 */}
      <div className="lg:hidden">
        <ol className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-10" aria-label="HILINK 운영 흐름">
          {steps.map((st) => (
            <li key={st.no} className="w-[82vw] max-w-[22rem] shrink-0 snap-start border border-line-dark p-6">
              <p className="flex items-baseline gap-3 text-white/50">
                <span className="font-display text-xs">{st.no}</span>
                <span className="eyebrow">{st.en}</span>
              </p>
              <h3 className="t-h3 mt-4 text-white">{st.ko}</h3>
              <p className="t-small mt-3 text-white/65">{st.body}</p>
              <div className="mx-auto mt-6 w-40">
                <PhoneScreen screen={st.screen} />
              </div>
            </li>
          ))}
        </ol>
        <p className="container-x mt-3 eyebrow text-white/35">Swipe →</p>
      </div>
    </div>
  );
}
