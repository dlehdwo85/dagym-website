"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskText } from "@/components/motion/MaskText";
import type { PhotoRef } from "@/lib/photos";
import { cn } from "@/lib/cn";

export type StoryItem = {
  no: string;
  href: string;
  en: string;
  title: string;
  summary: string;
  points: string[];
  image?: PhotoRef;
};

/**
 * 사업 스토리텔링 — 데스크톱: 왼쪽 고정 이미지가 스크롤 위치에 따라 바뀌고, 오른쪽에 사업 01–05가 흐름
 * 모바일: 사업마다 이미지 + 텍스트를 풀폭으로 쌓음
 */
export function BusinessStory({ items }: { items: StoryItem[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = items[active];

  return (
    <section className="section-y bg-white" aria-labelledby="business-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow text-steel lg:col-span-3 lg:pt-4">What we do</p>
          <div className="lg:col-span-9">
            <MaskText id="business-title" text={"커뮤니티가 있는 곳이라면\n어디든 운영합니다."} className="t-section" />
          </div>
        </div>

        <div className="mt-16 lg:mt-28 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* 고정 이미지 (데스크톱) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] max-h-[720px] overflow-hidden bg-mist">
                <AnimatePresence initial={false} mode="popLayout">
                  {current.image ? (
                    <motion.div
                      key={current.href}
                      className="absolute inset-0"
                      initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                      animate={{ clipPath: "inset(0% 0 0 0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: [0.77, 0, 0.18, 1] }}
                    >
                      <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
                        <Image src={current.image.src} alt={current.image.alt} fill sizes="560px" className="object-cover" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div key={current.href} className="absolute inset-0 grid place-items-center bg-charcoal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <span className="display text-[5rem] text-white/10">{current.no}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="absolute left-0 top-0 z-10 bg-white px-4 py-3 font-display text-xs tracking-[0.14em]">
                  {current.no} <span className="text-steel">/ {String(items.length).padStart(2, "0")}</span>
                </p>
              </div>
            </div>
          </div>

          {/* 사업 목록 */}
          <ol className="border-t border-ink lg:col-span-7">
            {items.map((b, i) => (
              <motion.li
                key={b.href}
                className="border-b border-line lg:flex lg:min-h-[64vh] lg:items-center"
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
              >
                <Link href={b.href} className="group block w-full py-10 lg:py-16">
                  {b.image && (
                    <div className="img-zoom relative mb-8 aspect-[4/3] overflow-hidden bg-mist lg:hidden">
                      <Image src={b.image.src} alt={b.image.alt} fill sizes="100vw" className="object-cover" />
                    </div>
                  )}
                  <p className="flex items-center gap-4">
                    <span className={cn("font-display text-sm transition-colors", active === i ? "text-ink" : "text-steel")}>{b.no}</span>
                    <span className="eyebrow text-steel">{b.en}</span>
                  </p>
                  <h3 className={cn("t-h2 mt-5 transition-colors duration-500", active === i ? "text-ink" : "lg:text-line-strong")}>{b.title}</h3>
                  <p className="t-body mt-5 max-w-xl text-body">{b.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] text-muted">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="size-1 bg-steel" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-0.5 text-[0.9375rem] font-semibold">
                    자세히 보기
                    <ArrowRight className="btn-arrow size-4" aria-hidden />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
