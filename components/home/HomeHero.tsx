"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { MaskText } from "@/components/motion/MaskText";
import type { PhotoRef } from "@/lib/photos";
import { cn } from "@/lib/cn";

type Slide = PhotoRef & { label: string };

type Props = {
  eyebrow: string;
  title: string;
  sub: string;
  facilities: string[];
  slides: Slide[];
  /** 2400px 이상 원본 사진 또는 영상이 있을 때만 풀블리드 */
  fullBleed?: { image?: PhotoRef; video?: { src: string; poster?: string } };
};

const INTERVAL = 6000;

/**
 * 홈 첫 화면 — 니어 블랙 풀스크린.
 * 고해상도 원본이 없으므로 사진은 원본 해상도를 넘지 않는 세로 창(window)에서 교차 전환하고,
 * 제목이 창 위로 겹쳐 지나갑니다. 풀블리드 원본이 들어오면 자동으로 풀스크린 배경으로 바뀝니다.
 */
export function HomeHero({ eyebrow, title, sub, facilities, slides, fullBleed }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [reduce, slides.length]);

  const full = fullBleed?.video || fullBleed?.image;

  return (
    <section ref={ref} className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-night text-white h-[100svh]" aria-labelledby="hero-title">
      {/* 미디어 */}
      {full ? (
        <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y: mediaY }}>
          {fullBleed?.video ? (
            <video className="size-full object-cover" src={fullBleed.video.src} poster={fullBleed.video.poster} autoPlay muted loop playsInline preload="metadata" />
          ) : (
            fullBleed?.image && (
              <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 9, ease: [0.16, 1, 0.3, 1] }}>
                <Image src={fullBleed.image.src} alt={fullBleed.image.alt} fill priority sizes="100vw" className="object-cover" />
              </motion.div>
            )
          )}
          <div className="absolute inset-0 bg-night/55" />
        </motion.div>
      ) : (
        slides.length > 0 && (
          <motion.div
            className="absolute inset-0 -z-10 lg:bottom-[5.5rem] lg:left-auto lg:right-0 lg:top-20 lg:max-h-[720px] lg:w-[44vw] lg:max-w-[600px]"
            style={reduce ? undefined : { y: mediaY }}
            initial={reduce ? false : { clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.77, 0, 0.18, 1] }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={reduce ? false : { scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: INTERVAL / 1000 + 1.6, ease: "linear" }}
                >
                  <Image
                    src={slides[index].src}
                    alt={slides[index].alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            {/* 모바일: 전체 배경이므로 어둡게, 데스크톱: 왼쪽 가장자리만 살짝 */}
            <div className="absolute inset-0 bg-night/65 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgba(13,14,16,0.55),rgba(13,14,16,0)_40%)]" />
          </motion.div>
        )
      )}

      {/* 본문 */}
      <motion.div className="container-x relative flex flex-1 flex-col justify-center pt-24 lg:pt-20" style={reduce ? undefined : { y: textY, opacity: fade }}>
        <motion.p
          className="eyebrow flex items-center gap-3 text-white/60"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="font-bold text-white">DAGYM</span>
          <span className="h-px w-8 bg-white/40" aria-hidden />
          {eyebrow}
        </motion.p>
        <MaskText id="hero-title" as="h1" immediate delay={0.25} text={title} className="t-hero mt-8 max-w-[14ch] lg:max-w-none" />
        <motion.p
          className="t-lead mt-8 max-w-xl text-white/75 sm:whitespace-pre-line"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {sub}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col gap-3 xs:flex-row"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ButtonLink href="/business" variant="white" size="lg">
            Our Business
          </ButtonLink>
          <ButtonLink href="/hilink" variant="outline-white" size="lg">
            HILINK
          </ButtonLink>
        </motion.div>
      </motion.div>

      {/* 하단 바: 직접 운영 시설 · HILINK · 스크롤 */}
      <motion.div
        className="container-x relative pb-6 lg:pb-8"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <div className="grid gap-4 border-t border-white/15 pt-5 text-[0.8125rem] text-white/60 sm:grid-cols-[1fr_auto] lg:grid-cols-[1fr_1fr_auto] lg:gap-10">
          <p className="hidden sm:block">
            <span className="eyebrow mr-3 text-white">Operate</span>
            {facilities.join(" · ")}
          </p>
          <p className="hidden lg:block">
            <span className="eyebrow mr-3 text-white">Connect</span>
            HILINK 회원 · 출입 · 예약 · 결제 · 데이터
          </p>
          <Link href="#statement" className="group flex items-center gap-3 text-white/80 hover:text-white">
            <span className="eyebrow">Scroll to explore</span>
            <span className="relative block h-8 w-px overflow-hidden bg-white/20" aria-hidden>
              <span className={cn("absolute inset-x-0 top-0 h-3 bg-white", !reduce && "animate-[scrollcue_2s_ease-in-out_infinite]")} />
            </span>
            <ArrowDown className="size-3.5 sm:hidden" aria-hidden />
          </Link>
        </div>
        {!full && slides.length > 1 && (
          <div className="absolute bottom-24 right-5 hidden items-center gap-3 font-display text-xs tracking-[0.14em] text-white/80 lg:right-10 lg:flex" aria-hidden>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="relative h-px w-16 bg-white/25">
              <motion.span key={index} className="absolute inset-y-0 left-0 bg-white" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: INTERVAL / 1000, ease: "linear" }} />
            </span>
            <span className="text-white/40">{String(slides.length).padStart(2, "0")}</span>
            <span className="ml-2 uppercase">{slides[index].label}</span>
          </div>
        )}
      </motion.div>
    </section>
  );
}
