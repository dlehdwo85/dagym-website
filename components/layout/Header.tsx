"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export type MegaBusiness = { href: string; no: string; title: string; en: string; line: string; image?: { src: string; alt: string } };

type Props = { business: MegaBusiness[] };

/**
 * 헤더
 * - 페이지 최상단(어두운 Hero 위)에서는 투명 + 흰 글자
 * - 스크롤하거나 메가 메뉴가 열리면 흰 배경 + 블러
 */
export function Header({ business }: Props) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const [prevPath, setPrevPath] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (label: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solid = scrolled || openMenu !== null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-500",
          openMenu ? "bg-white text-ink shadow-[0_1px_0_var(--color-line)]" : solid ? "bg-white/95 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent text-white",
        )}
        onMouseLeave={scheduleClose}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          본문 바로가기
        </a>
        <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label="DAGYM 다짐 홈" className="shrink-0">
            <Logo tone={solid ? "dark" : "light"} />
          </Link>

          <nav aria-label="주 메뉴" className="hidden h-full lg:block">
            <ul className="flex h-full items-center">
              {mainNav.map((item) => (
                <li
                  key={item.href}
                  className="h-full"
                  onMouseEnter={() => open(item.mega ?? null)}
                  onFocus={() => open(item.mega ?? null)}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    aria-expanded={item.mega ? openMenu === item.mega : undefined}
                    className="group relative flex h-full items-center px-5 text-[0.9375rem] font-semibold"
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-5 bottom-[1.6rem] h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        isActive(item.href) || openMenu === item.mega ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                "btn-wipe group inline-flex h-10 items-center gap-2 rounded-[2px] px-4 text-sm font-semibold transition-colors duration-500 lg:h-11 lg:px-5",
                solid ? "bg-ink text-white [--wipe:var(--color-navy)]" : "border border-white/50 text-white [--wipe:#fff] hover:text-ink",
              )}
            >
              운영문의
              <ArrowRight className="btn-arrow hidden size-4 sm:block" aria-hidden />
            </Link>
            <button
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
              aria-label="전체 메뉴 열기"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-6" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>

        {/* 메가 메뉴 */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-white text-ink shadow-[0_30px_60px_-30px_rgba(13,14,16,0.35)] lg:block"
              onMouseEnter={() => open(openMenu)}
            >
              {openMenu === "business" && (
                <div className="container-x grid grid-cols-12 gap-10 py-10">
                  <ul className="col-span-7">
                    {business.map((b, i) => (
                      <li key={b.href} className="border-b border-line last:border-0">
                        <Link
                          href={b.href}
                          onMouseEnter={() => setPreview(i)}
                          onFocus={() => setPreview(i)}
                          className="group flex items-baseline gap-6 py-4"
                        >
                          <span className="font-display text-xs text-steel">{b.no}</span>
                          <span className="flex-1">
                            <span className="block text-lg font-semibold tracking-[-0.02em] transition-colors group-hover:text-navy">{b.title}</span>
                            <span className="eyebrow mt-1 block text-steel">{b.en}</span>
                          </span>
                          <ArrowRight className="btn-arrow size-4 self-center text-steel" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="col-span-5">
                    <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                      {business.map((b, i) =>
                        b.image ? (
                          <Image
                            key={b.href}
                            src={b.image.src}
                            alt=""
                            fill
                            sizes="480px"
                            className={cn("object-cover transition-opacity duration-500", preview === i ? "opacity-100" : "opacity-0")}
                          />
                        ) : null,
                      )}
                      <p className="absolute bottom-0 left-0 bg-white px-4 py-3 text-sm">{business[preview]?.line}</p>
                    </div>
                  </div>
                </div>
              )}
              {openMenu === "hilink" && (
                <div className="container-x grid grid-cols-12 items-center gap-10 py-10">
                  <div className="col-span-5">
                    <p className="display text-5xl">Hilink</p>
                    <p className="mt-4 text-body">커뮤니티 출입 · 예약 · 회원 · 정산을 하나로 잇는 다짐의 자체 운영 플랫폼</p>
                  </div>
                  <ul className="col-span-7 grid grid-cols-2 gap-x-10">
                    {[
                      ["플랫폼 소개", "/hilink"],
                      ["운영 흐름 01–06", "/hilink#story"],
                      ["주요 기능", "/hilink#functions"],
                      ["HILINK 도입 문의", "/contact?type=hilink"],
                    ].map(([label, href]) => (
                      <li key={href} className="border-b border-line">
                        <Link href={href} className="group flex items-center justify-between py-4 font-semibold hover:text-navy">
                          {label}
                          <ArrowUpRight className="size-4 text-steel transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} isActive={isActive} business={business} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose, isActive, business }: { onClose: () => void; isActive: (href: string) => boolean; business: MegaBusiness[] }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => closeRef.current?.focus(), []);

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="전체 메뉴"
      className="fixed inset-0 z-[70] flex flex-col bg-night text-white lg:hidden"
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
    >
      <div className="container-x flex h-16 shrink-0 items-center justify-between">
        <Link href="/" onClick={onClose} aria-label="DAGYM 다짐 홈">
          <Logo tone="light" />
        </Link>
        <button ref={closeRef} type="button" className="-mr-2 inline-flex size-11 items-center justify-center" aria-label="메뉴 닫기" onClick={onClose}>
          <X className="size-6" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
      <nav aria-label="모바일 메뉴" className="container-x flex-1 overflow-y-auto pb-6 pt-4">
        <ul>
          {mainNav.map((item) => (
            <li key={item.href} className="border-b border-line-dark">
              <Link href={item.href} onClick={onClose} aria-current={isActive(item.href) ? "page" : undefined} className="flex min-h-16 items-baseline justify-between">
                <span className="text-[1.75rem] font-semibold tracking-[-0.03em]">{item.label}</span>
                <span className="eyebrow text-white/40">{item.en}</span>
              </Link>
              {item.mega === "business" && (
                <ul className="pb-4">
                  {business.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={onClose} className="flex min-h-11 items-center gap-3 text-[0.9875rem] text-white/70">
                        <span className="font-display text-xs text-white/35">{c.no}</span>
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-x shrink-0 pb-6">
        <Link href="/contact" onClick={onClose} className="flex h-14 w-full items-center justify-between rounded-[2px] bg-white px-5 text-base font-semibold text-ink">
          운영문의
          <ArrowRight className="size-5" aria-hidden />
        </Link>
      </div>
    </motion.div>
  );
}
