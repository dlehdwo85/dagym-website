"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** 페이지 상단 스크롤 진행 표시 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-signal" style={{ scaleX }} />;
}
