"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AdminScreen, PhoneScreen, SCREEN_NOTE } from "@/components/hilink/Screens";
import type { PhotoRef } from "@/lib/photos";

type Props = {
  /** 실제 캡처가 있으면 예시 화면 대신 사용 */
  real?: { admin?: PhotoRef; app?: PhotoRef; device?: PhotoRef };
};

/** 공간감 있는 제품 쇼케이스 — 관리자 화면 뒤, 앱 · 단말기 화면 앞. 스크롤 속도를 달리해 깊이를 만듭니다. */
export function HilinkShowcase({ real }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yLeft = useTransform(scrollYProgress, [0, 1], [160, -120]);
  const yRight = useTransform(scrollYProgress, [0, 1], [220, -180]);
  const rot = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
  const usingExample = !real?.admin || !real?.app || !real?.device;

  return (
    <div ref={ref} className="relative">
      <div className="relative mx-auto max-w-6xl px-2 pb-10 pt-6 [perspective:1600px] sm:px-8 lg:pb-24">
        <motion.div style={reduce ? undefined : { y: yBack, rotateX: rot }} className="origin-bottom">
          {real?.admin ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] border border-white/12">
              <Image src={real.admin.src} alt={real.admin.alt} fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover object-top" />
            </div>
          ) : (
            <AdminScreen className="mx-auto w-full" />
          )}
        </motion.div>

        <motion.div style={reduce ? undefined : { y: yLeft }} className="absolute -bottom-6 left-0 w-[34%] max-w-[15rem] sm:left-2 lg:-left-6">
          {real?.app ? (
            <div className="relative aspect-[9/19] overflow-hidden rounded-[8px] border border-white/12">
              <Image src={real.app.src} alt={real.app.alt} fill sizes="240px" className="object-cover object-top" />
            </div>
          ) : (
            <PhoneScreen screen="reservation" />
          )}
          <p className="eyebrow mt-3 hidden text-white/45 sm:block">Resident App</p>
        </motion.div>

        <motion.div style={reduce ? undefined : { y: yRight }} className="absolute -bottom-12 right-0 w-[30%] max-w-[13rem] sm:right-2 lg:-right-4">
          {real?.device ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-white/12">
              <Image src={real.device.src} alt={real.device.alt} fill sizes="208px" className="object-cover" />
            </div>
          ) : (
            <PhoneScreen screen="access" />
          )}
          <p className="eyebrow mt-3 hidden text-white/45 sm:block">Face Access</p>
        </motion.div>
      </div>
      {usingExample && <p className="mt-16 text-center text-xs text-white/40 lg:mt-10">{SCREEN_NOTE}</p>}
    </div>
  );
}
