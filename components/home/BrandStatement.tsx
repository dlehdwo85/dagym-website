"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  keywords: { en: string; ko: string }[];
};

function Keyword({ progress, i, total, en, ko }: { progress: MotionValue<number>; i: number; total: number; en: string; ko: string }) {
  const start = i / total;
  const end = (i + 1) / total;
  const color = useTransform(progress, [start, end], ["#dfe2e6", "#16181b"]);
  const x = useTransform(progress, [start, end], ["2.5rem", "0rem"]);
  const note = useTransform(progress, [start + 0.08, end], [0, 1]);
  return (
    <li className="grid items-end gap-3 border-b border-line py-5 md:grid-cols-[1fr_20rem] md:gap-10 md:py-7">
      <motion.span className="display block text-[3.5rem] sm:text-[6rem] lg:text-[9.5rem]" style={{ color, x }}>
        {en}
      </motion.span>
      <motion.span className="t-small pb-2 text-body md:pb-6" style={{ opacity: note }}>
        {ko}
      </motion.span>
    </li>
  );
}

/** 에디토리얼 브랜드 선언 + 스크롤에 따라 드러나는 키워드 */
export function BrandStatement({ eyebrow, title, body, keywords }: Props) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });

  return (
    <section id="statement" className="section-y scroll-mt-0 bg-white" aria-labelledby="statement-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow text-steel lg:col-span-3 lg:pt-4">{eyebrow}</p>
          <div className="lg:col-span-9">
            <MaskText id="statement-title" text={title} className="t-section" />
            <Reveal delay={0.2}>
              <p className="t-lead mt-10 max-w-2xl text-body">{body}</p>
            </Reveal>
          </div>
        </div>
        <ul ref={ref} className="mt-20 border-t border-line lg:mt-32">
          {keywords.map((k, i) =>
            reduce ? (
              <li key={k.en} className="grid items-end gap-3 border-b border-line py-5 md:grid-cols-[1fr_20rem] md:gap-10 md:py-7">
                <span className="display block text-[3.5rem] sm:text-[6rem] lg:text-[9.5rem]">{k.en}</span>
                <span className="t-small pb-2 text-body md:pb-6">{k.ko}</span>
              </li>
            ) : (
              <Keyword key={k.en} progress={scrollYProgress} i={i} total={keywords.length} en={k.en} ko={k.ko} />
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
