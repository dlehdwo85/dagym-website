"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { mainNav, type NavItem } from "@/data/navigation";
import { company, isVerified } from "@/data/config";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 라우트 변경 시 메뉴 닫기
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenIndex(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = useCallback((i: number | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIndex(i);
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 140);
  }, []);

  const solid = scrolled || openIndex !== null;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ease-[var(--ease-premium)]",
          solid
            ? "bg-white/95 text-ink shadow-[0_1px_0_rgb(13_26_49/0.08)] backdrop-blur-md"
            : "on-dark bg-gradient-to-b from-navy-950/50 to-transparent text-white",
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
          <Link href="/" aria-label="DAGYM 홈" className="shrink-0">
            <Logo tone={solid ? "dark" : "light"} />
          </Link>

          <nav ref={navRef} aria-label="주 메뉴" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-1 xl:gap-3">
              {mainNav.map((item, i) => (
                <li
                  key={item.href}
                  className="h-full"
                  onMouseEnter={() => open(item.children ? i : null)}
                  onFocus={() => open(item.children ? i : null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    aria-haspopup={item.children ? "true" : undefined}
                    aria-expanded={item.children ? openIndex === i : undefined}
                    className={cn(
                      "t-en relative flex h-full items-center px-3 text-[0.8125rem] font-semibold tracking-[0.1em] transition-opacity",
                      "after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300",
                      (openIndex === i || isActive(item.href)) && "after:scale-x-100",
                      item.label === "HILINK" && !solid && "text-white",
                    )}
                  >
                    {item.label === "HILINK" ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                        HILINK
                      </span>
                    ) : (
                      item.label
                    )}
                  </Link>
                  {item.children && (
                    <MegaPanel item={item} visible={openIndex === i} onNavigate={() => setOpenIndex(null)} />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                "group hidden h-11 items-center gap-2 rounded-[2px] px-5 text-sm font-semibold transition-colors duration-300 sm:inline-flex",
                solid ? "bg-ink text-white hover:bg-accent" : "bg-white text-ink hover:bg-accent hover:text-white",
              )}
            >
              운영 문의하기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-10 items-center rounded-[2px] px-3.5 text-[0.8125rem] font-semibold sm:hidden",
                solid ? "bg-ink text-white" : "bg-white text-ink",
              )}
            >
              문의하기
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
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} isActive={isActive} />
    </>
  );
}

function MegaPanel({ item, visible, onNavigate }: { item: NavItem; visible: boolean; onNavigate: () => void }) {
  const isBusiness = item.label === "BUSINESS";
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full border-t border-mist-200 bg-white text-ink shadow-[0_24px_48px_-24px_rgb(13_26_49/0.25)] transition-[opacity,visibility,transform] duration-300 ease-[var(--ease-premium)]",
        visible ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
      )}
    >
      <div className="container-x grid grid-cols-12 gap-10 py-12">
        <div className="col-span-3">
          <p className="t-eyebrow text-accent">{item.label}</p>
          <p className="mt-4 text-2xl font-bold tracking-[-0.03em]">{item.ko}</p>
          {item.intro && <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-600">{item.intro}</p>}
          <Link
            href={item.href}
            onClick={onNavigate}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink link-underline"
          >
            {item.ko} 전체 보기 <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className={cn("col-span-9 grid gap-x-8", isBusiness ? "grid-cols-3 gap-y-2" : "grid-cols-3 gap-y-1")}>
          {item.children!.map((child, idx) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="group flex h-full flex-col border-t border-mist-200 py-5 transition-colors hover:border-ink"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
                    {isBusiness && <span className="t-num mr-3 text-sm text-mist-400">0{idx + 1}</span>}
                    {child.label}
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-mist-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </span>
                {child.en && <span className="t-en mt-1 text-[0.8125rem] text-mist-500">{child.en}</span>}
                {child.description && (
                  <span className="mt-3 line-clamp-2 text-[0.875rem] leading-relaxed text-mist-600">
                    {child.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);
  const baseId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          className="on-dark fixed inset-0 z-[60] flex flex-col bg-navy-950 text-white lg:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between">
            <Link href="/" onClick={onClose} aria-label="DAGYM 홈">
              <Logo tone="light" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center"
              aria-label="메뉴 닫기"
              onClick={onClose}
            >
              <X className="size-6" strokeWidth={1.5} aria-hidden />
            </button>
          </div>

          <nav aria-label="모바일 메뉴" className="container-x flex-1 overflow-y-auto pb-8 pt-4">
            <ul>
              {mainNav.map((item) => {
                const panelId = `${baseId}-${item.label}`;
                const isOpen = expanded === item.label;
                return (
                  <li key={item.href} className="border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="flex min-h-16 flex-1 items-baseline gap-3 py-4"
                      >
                        <span className="t-en text-[1.625rem] font-semibold tracking-[-0.01em]">{item.label}</span>
                        <span className="text-sm text-white/45">{item.ko}</span>
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          aria-label={`${item.ko} 하위 메뉴 ${isOpen ? "닫기" : "열기"}`}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          className="inline-flex size-12 items-center justify-center"
                        >
                          <Plus
                            className={cn("size-5 transition-transform duration-300", isOpen && "rotate-45")}
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </button>
                      )}
                    </div>
                    {item.children && (
                      <div
                        id={panelId}
                        hidden={!isOpen}
                        className="pb-5"
                      >
                        <ul className="grid gap-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="flex min-h-11 items-center justify-between py-2 text-[0.9375rem] text-white/75 hover:text-white"
                              >
                                {child.label}
                                <ArrowRight className="size-4 text-white/35" aria-hidden />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="container-x shrink-0 border-t border-white/10 py-5">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-[2px] bg-accent text-base font-semibold text-white"
            >
              운영 문의하기 <ArrowRight className="size-4" aria-hidden />
            </Link>
            {isVerified(company.phone) && (
              <a href={`tel:${company.phone}`} className="mt-3 block text-center text-sm text-white/60">
                대표번호 {company.phone}
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
