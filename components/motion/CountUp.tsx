"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * 숫자 카운트 — 확인된 값(verified)에만 사용합니다.
 * "1,200" · "35+" 처럼 숫자 뒤 기호가 있어도 숫자 부분만 셉니다.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : NaN;
  const suffix = match?.[2] ?? "";
  const [shown, setShown] = useState<string | null>(null);


  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v).toLocaleString("ko-KR") + suffix),
    });
    return () => controls.stop();
  }, [inView, reduce, target, suffix]);

  return (
    <span ref={ref} className={className}>
      {shown ?? value}
    </span>
  );
}
