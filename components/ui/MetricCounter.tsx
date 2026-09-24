"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
};

const fmt = new Intl.NumberFormat("ko-KR");

/** 화면 진입 시 0 → value 로 Count-up. reduced-motion 이면 즉시 최종값. */
export function MetricCounter({ value, prefix, suffix, duration = 1400, className, suffixClassName }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {prefix}
        {fmt.format(value)}
        {suffix}
      </span>
      <span aria-hidden>
        {prefix}
        {fmt.format(display)}
        {suffix && <span className={suffixClassName}>{suffix}</span>}
      </span>
    </span>
  );
}
