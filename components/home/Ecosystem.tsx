"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MaskText } from "@/components/motion/MaskText";
import type { PhotoRef } from "@/lib/photos";
import { cn } from "@/lib/cn";

export type EcoItem = { en: string; ko: string; note: string; image?: PhotoRef };

/**
 * 아파트 커뮤니티 생태계 — 다크 섹션의 큰 타이포 인덱스.
 * 데스크톱에서 사진이 있는 시설 위에 올리면 커서를 따라 사진이 나타납니다.
 */
export function Ecosystem({ items }: { items: EcoItem[] }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 28 });
  const y = useSpring(my, { stiffness: 220, damping: 28 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const hovered = hover !== null ? items[hover] : null;

  return (
    <section className="section-y relative overflow-hidden bg-night text-white" aria-labelledby="eco-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow text-white/45 lg:col-span-3 lg:pt-4">Apartment community ecosystem</p>
          <div className="lg:col-span-9">
            <MaskText id="eco-title" text={"단지 안의 모든 공용 시설을\n하나의 운영 기준으로."} className="t-section" />
            <p className="t-lead mt-8 max-w-2xl text-white/60">
              시설마다 운영 방식은 다르지만, 인력 · 기록 · 보고 · 시스템의 기준은 같습니다.
            </p>
          </div>
        </div>

        <ul className="relative mt-16 grid border-t border-line-dark sm:grid-cols-2 lg:mt-24" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          {items.map((it, i) => (
            <li
              key={it.en}
              className={cn(
                "group flex items-baseline justify-between gap-4 border-b border-line-dark py-5 transition-colors duration-500 sm:odd:pr-8 sm:even:pl-8 sm:even:border-l lg:py-7",
                hover !== null && hover !== i && "text-white/30",
              )}
              onMouseEnter={() => setHover(i)}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-display text-xs text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[2.25rem] normal-case tracking-[-0.04em] lg:text-[3.75rem]">{it.en}</span>
              </span>
              <span className="text-right">
                <span className="block text-[0.9375rem] font-semibold">{it.ko}</span>
                <span className="mt-1 hidden text-[0.8125rem] text-white/45 md:block">{it.note}</span>
              </span>
            </li>
          ))}

          {!reduce && (
            <AnimatePresence>
              {hovered?.image && (
                <motion.div
                  key={hovered.en}
                  className="pointer-events-none absolute left-0 top-0 z-10 hidden aspect-[4/5] w-64 overflow-hidden lg:block"
                  style={{ x, y, translateX: "-50%", translateY: "-55%" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden
                >
                  <Image src={hovered.image.src} alt="" fill sizes="256px" className="object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </ul>
      </div>
    </section>
  );
}
