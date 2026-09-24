"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 라우트 변경 시 메뉴 닫기
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
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-200",
          scrolled ? "shadow-[0_1px_0_var(--color-line)]" : "shadow-[0_1px_0_transparent]",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
        >
          본문 바로가기
        </a>
        <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link href="/" aria-label="DAGYM 다짐 홈" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="주 메뉴" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-1">
              {mainNav.map((item) => (
                <li
                  key={item.href}
                  className="relative h-full"
                  onMouseEnter={() => open(item.children ? item.label : null)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => open(item.children ? item.label : null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex h-full items-center gap-1 px-4 text-[0.9875rem] font-semibold transition-colors hover:text-brand",
                      isActive(item.href) ? "text-brand" : "text-ink",
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="size-4 text-muted" aria-hidden />}
                  </Link>
                  {item.children && (
                    <div
                      className={cn(
                        "absolute left-0 top-full min-w-64 border border-line bg-white py-2 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.18)] transition-[opacity,visibility] duration-150",
                        openMenu === item.label ? "visible opacity-100" : "invisible opacity-0",
                      )}
                    >
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className={cn(
                                "block px-5 py-2.5 text-[0.9375rem] hover:bg-paper hover:text-brand",
                                isActive(c.href) ? "text-brand" : "text-ink",
                              )}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center rounded-[4px] bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark lg:h-11 lg:px-5 lg:text-[0.9375rem]"
            >
              운영 문의하기
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
      </header>
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} isActive={isActive} />}
    </>
  );
}

function MobileMenu({ onClose, isActive }: { onClose: () => void; isActive: (href: string) => boolean }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const baseId = useId();
  useEffect(() => closeRef.current?.focus(), []);

  return (
    <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="전체 메뉴" className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
      <div className="container-x flex h-16 shrink-0 items-center justify-between border-b border-line">
        <Link href="/" onClick={onClose} aria-label="DAGYM 다짐 홈">
          <Logo />
        </Link>
        <button
          ref={closeRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center"
          aria-label="메뉴 닫기"
          onClick={onClose}
        >
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
                className={cn("flex min-h-14 items-center text-lg font-semibold", isActive(item.href) && "text-brand")}
              >
                {item.label}
              </Link>
              {item.children && (
                <ul aria-labelledby={`${baseId}-${item.label}`} className="pb-3">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={onClose} className="flex min-h-11 items-center pl-3 text-[0.9375rem] text-body">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-x shrink-0 border-t border-line py-4">
        <Link
          href="/contact"
          onClick={onClose}
          className="flex h-14 w-full items-center justify-center rounded-[4px] bg-brand text-base font-semibold text-white"
        >
          운영 문의하기
        </Link>
      </div>
    </div>
  );
}
