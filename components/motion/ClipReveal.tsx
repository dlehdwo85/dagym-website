"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 드러나는 방향 */
  from?: "bottom" | "left" | "right";
  delay?: number;
};

const hidden = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * 이미지 마스크 리빌 — clip-path 로 0.3초 ease-out 열림.
 * 모션 최소화 설정이면 시간 0 (DOM 구조는 항상 같게 — 구조가 달라지면 hydration 오류 #418)
 */
export function ClipReveal({ children, className, from = "bottom", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal=""
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: hidden[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0">{children}</div>
    </motion.div>
  );
}
