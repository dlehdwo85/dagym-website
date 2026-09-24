"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  as?: "div" | "li" | "section" | "article" | "span" | "figure";
  delay?: number;
  variant?: "fade" | "image";
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
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return observer;
}

/**
 * 스크롤 진입 시 짧은 Fade-up / Image reveal.
 * CSS transition 만 사용하므로 Framer Motion 번들을 불러오지 않고,
 * prefers-reduced-motion 과 JS 비활성 환경에서는 즉시 표시됩니다.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, variant = "fade", className }: Props) {
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
      data-reveal={variant === "image" ? "image" : ""}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
