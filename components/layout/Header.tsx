"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export type MegaBusiness = { href: string; no: string; title: string; en: string; line: string; image?: { src: string; alt: string } };

type Props = { business: MegaBusiness[] };

/** 헤더 — 흰 배경 고정, 사업영역 · HILINK 메가 메뉴, CTA "운영 제안 문의" */
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
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300",
          scrolled || openMenu ? "shadow-[0_1px_0_var(--color-line)]" : "shadow-[0_1px_0_transparent]",
        )}
        onMouseLeave={scheduleClose}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2">
          본문 바로가기
        </a>
        <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.75rem]">
          <Link href="/" aria-label="DAGYM 다짐 홈" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="주 메뉴" className="hidden h-full lg:block">
            <ul className="flex h-full items-center">
              {mainNav.map((item) => (
                <li key={item.href} className="h-full" onMouseEnter={() => open(item.mega ?? null)} onFocus={() => open(item.mega ?? null)}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    aria-expanded={item.mega ? openMenu === item.mega : undefined}
                    className={cn(
                      "relative flex h-full items-center gap-1 px-4 text-[0.9875rem] font-semibold transition-colors hover:text-accent xl:px-5",
                      isActive(item.href) ? "text-navy" : "text-ink",
                    )}
                  >
                    {item.label}
                    {item.mega && <ChevronDown className="size-4 text-muted" aria-hidden />}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-0 h-[2px] bg-navy transition-opacity xl:inset-x-5",
                        isActive(item.href) ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/contact?type=proposal"
              className="btn-wipe group inline-flex h-10 items-center gap-2 rounded-[4px] bg-navy px-4 text-sm font-semibold text-white [--wipe:var(--color-navy-deep)] lg:h-11 lg:px-5 lg:text-[0.9375rem]"
            >
              운영 제안 문의
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
              <Menu className="size-6" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_24px_48px_-24px_rgba(15,27,45,0.25)] lg:block"
              onMouseEnter={() => open(openMenu)}
            >
              {openMenu === "business" && (
                <div className="container-x grid grid-cols-12 gap-10 py-10">
                  <div className="col-span-3">
                    <p className="eyebrow">사업영역</p>
                    <p className="mt-3 text-[1.375rem] font-bold leading-snug tracking-[-0.02em]">커뮤니티 공간의 운영 전체를 맡습니다.</p>
                    <Link href="/business" className="group mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy">
                      사업영역 전체 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                    </Link>
                  </div>
                  <ul className="col-span-5">
                    {business.map((b, i) => (
                      <li key={b.href} className="border-b border-line last:border-0">
                        <Link
                          href={b.href}
                          onMouseEnter={() => setPreview(i)}
                          onFocus={() => setPreview(i)}
                          className="group flex items-center gap-4 py-3.5"
                        >
                          <span className="w-6 text-sm font-semibold text-steel">{b.no}</span>
                          <span className="flex-1 text-[1.0625rem] font-semibold tracking-[-0.015em] group-hover:text-accent">{b.title}</span>
                          <ArrowRight className="btn-arrow size-4 text-steel" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="col-span-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-mist">
                      {business.map((b, i) =>
                        b.image ? (
                          <Image
                            key={b.href}
                            src={b.image.src}
                            alt=""
                            fill
                            sizes="400px"
                            className={cn("object-cover transition-opacity duration-300", preview === i ? "opacity-100" : "opacity-0")}
                          />
                        ) : null,
                      )}
                    </div>
                    <p className="mt-3 text-sm text-body">{business[preview]?.line}</p>
                  </div>
                </div>
              )}
              {openMenu === "hilink" && (
                <div className="container-x grid grid-cols-12 items-start gap-10 py-10">
                  <div className="col-span-4">
                    <p className="eyebrow">HILINK</p>
                    <p className="mt-3 text-[1.375rem] font-bold leading-snug tracking-[-0.02em]">다짐의 현장 운영을 기록하고 표준화하는 자체 운영 플랫폼</p>
                  </div>
                  <ul className="col-span-8 grid grid-cols-2 gap-x-10">
                    {[
                      ["플랫폼 소개", "/hilink"],
                      ["주요 기능", "/hilink#functions"],
                      ["기존 출입 설비와 함께 쓰기", "/hilink#integration"],
                      ["HILINK 도입 문의", "/contact?type=hilink"],
                    ].map(([label, href]) => (
                      <li key={href} className="border-b border-line">
                        <Link href={href} className="group flex items-center justify-between py-4 font-semibold hover:text-accent">
                          {label}
                          <ArrowRight className="btn-arrow size-4 text-steel" aria-hidden />
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

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} isActive={isActive} business={business} />}
    </>
  );
}

function MobileMenu({ onClose, isActive, business }: { onClose: () => void; isActive: (href: string) => boolean; business: MegaBusiness[] }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus(), []);

  return (
    <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="전체 메뉴" className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden">
      <div className="container-x flex h-16 shrink-0 items-center justify-between border-b border-line">
        <Link href="/" onClick={onClose} aria-label="DAGYM 다짐 홈">
          <Logo />
        </Link>
        <button ref={closeRef} type="button" className="-mr-2 inline-flex size-11 items-center justify-center" aria-label="메뉴 닫기" onClick={onClose}>
          <X className="size-6" strokeWidth={1.75} aria-hidden />
        </button>
      </div>
      <nav aria-label="모바일 메뉴" className="container-x flex-1 overflow-y-auto py-2">
        <ul>
          {mainNav.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn("flex min-h-14 items-center text-lg font-bold", isActive(item.href) && "text-navy")}
              >
                {item.label}
              </Link>
              {item.mega === "business" && (
                <ul className="pb-3">
                  {business.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={onClose} className="flex min-h-11 items-center gap-3 pl-1 text-[0.9375rem] text-body">
                        <span className="w-5 text-xs font-semibold text-steel">{c.no}</span>
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
      <div className="container-x grid shrink-0 grid-cols-2 gap-2 border-t border-line py-4">
        <Link href="/contact?type=proposal" onClick={onClose} className="flex h-13 items-center justify-center rounded-[4px] bg-navy text-[0.9375rem] font-semibold text-white">
          운영 제안 문의
        </Link>
        <Link href="/contact?type=diagnosis" onClick={onClose} className="flex h-13 items-center justify-center rounded-[4px] border border-line-strong text-[0.9375rem] font-semibold">
          현장 진단 문의
        </Link>
      </div>
    </div>
  );
}
