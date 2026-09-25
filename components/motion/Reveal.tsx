"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  as?: "div" | "li" | "section" | "article";
  delay?: number;
  className?: string;
};

/** 섹션 요소 등장 — 16px 상승 + 투명도. 모션 최소화 설정이면 바로 표시 */
export function Reveal({ children, as = "div", delay = 0, className }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
