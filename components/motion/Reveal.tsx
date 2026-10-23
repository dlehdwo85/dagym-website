"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  as?: "div" | "li" | "section" | "article";
  delay?: number;
  className?: string;
};

/**
 * 섹션 요소 등장 — 12px 상승 + 투명도, 0.3초 ease-out.
 * 모션 최소화 설정이면 시간 0 + CSS([data-reveal])로 스크롤 전부터 표시 (서버 · 클라이언트 DOM 구조는 같게 유지 — hydration 오류 방지)
 */
export function Reveal({ children, as = "div", delay = 0, className }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
