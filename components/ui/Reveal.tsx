"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  as?: "div" | "li" | "section" | "article";
  delay?: number;
  className?: string;
};

let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.in = "true";
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
  );
  return observer;
}

/** 스크롤 진입 시 짧은 페이드. reduced-motion · JS 비활성 환경에서는 즉시 표시됩니다. */
export function Reveal({ children, as: Tag = "div", delay = 0, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el || !io) return;
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
