"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  /** "\n" 으로 줄 구분 */
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** true 면 스크롤 진입이 아니라 마운트 즉시 */
  immediate?: boolean;
  id?: string;
};

/** 줄 단위 마스크 리빌 — 각 줄이 아래에서 위로 드러납니다 */
export function MaskText({ text, as = "h2", className, lineClassName, delay = 0, immediate, id }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const lines = text.split("\n");
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag id={id} className={className} initial={reduce ? false : "hide"} {...trigger} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]" aria-hidden>
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hide: { y: "108%" },
              show: { y: "0%", transition: { duration: 1.1, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
