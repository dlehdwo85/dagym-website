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

/** 이미지 마스크 리빌 — clip-path 로 열리며 내부 이미지는 살짝 축소됩니다 */
export function ClipReveal({ children, className, from = "bottom", delay = 0 }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: hidden[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.25, delay, ease: [0.77, 0, 0.18, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
