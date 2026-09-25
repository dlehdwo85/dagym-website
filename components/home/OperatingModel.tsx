"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { MaskText } from "@/components/motion/MaskText";
import { cn } from "@/lib/cn";

type Step = { en: string; ko: string; body: string };

function Dot({ progress, at, base, className }: { progress: MotionValue<number>; at: number; base: string; className?: string }) {
  const bg = useTransform(progress, [at - 0.001, at], [base, "#16181b"]);
  return <motion.span className={cn("absolute size-3 border border-ink", className)} style={{ backgroundColor: bg }} aria-hidden />;
}

/** 운영 모델 01 – 06. 스크롤에 따라 선이 그려지고 단계 표시가 채워집니다. */
export function OperatingModel({
  steps,
  eyebrow = "Operating model",
  title = "현장 분석부터 데이터 개선까지,\n여섯 단계로 운영합니다.",
  tone = "white",
}: {
  steps: Step[];
  eyebrow?: string;
  title?: string;
  tone?: "white" | "mist";
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className={cn("section-y", tone === "mist" ? "bg-mist" : "bg-white")} aria-labelledby="model-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow text-steel lg:col-span-3 lg:pt-4">{eyebrow}</p>
          <div className="lg:col-span-9">
            <MaskText id="model-title" text={title} className="t-section" />
          </div>
        </div>

        <ol ref={ref} className={cn("relative mt-16 grid gap-0 lg:mt-28 lg:gap-6", steps.length === 4 ? "lg:grid-cols-4" : steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-6")}>
          {/* 가로 선 (데스크톱) */}
          <span className="absolute left-0 right-0 top-[0.375rem] hidden h-px bg-line lg:block" aria-hidden />
          <motion.span
            className="absolute left-0 right-0 top-[0.375rem] hidden h-px origin-left bg-ink lg:block"
            style={{ scaleX: reduce ? 1 : line }}
            aria-hidden
          />
          {/* 세로 선 (모바일) */}
          <span className="absolute bottom-0 left-[0.375rem] top-0 w-px bg-line lg:hidden" aria-hidden />
          <motion.span className="absolute bottom-0 left-[0.375rem] top-0 w-px origin-top bg-ink lg:hidden" style={{ scaleY: reduce ? 1 : line }} aria-hidden />

          {steps.map((s, i) => (
            <li key={s.en} className="relative pb-12 pl-10 lg:pb-0 lg:pl-0 lg:pt-12">
              <Dot base={tone === "mist" ? "#f2f3f5" : "#ffffff"} progress={reduce ? scrollYProgress : line} at={reduce ? 0 : i / steps.length + 0.02} className="left-0 top-0.5 lg:top-0" />
              <p className="font-display text-sm text-steel">{String(i + 1).padStart(2, "0")}</p>
              <p className="eyebrow mt-3 text-ink">{s.en}</p>
              <h3 className="t-h4 mt-5">{s.ko}</h3>
              <p className="t-small mt-3 text-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
