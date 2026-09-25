import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * 버튼 — 호버 시 배경이 왼쪽에서 채워지고(background wipe) 화살표가 움직입니다.
 * radius 2px 고정.
 */
type Variant = "primary" | "secondary" | "white" | "outline-white" | "text" | "text-light";
type Size = "md" | "lg";

const base =
  "btn-wipe group inline-flex items-center justify-center gap-3 rounded-[2px] font-semibold tracking-[-0.01em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white [--wipe:var(--color-navy)]",
  secondary: "border border-ink text-ink [--wipe:var(--color-ink)] hover:text-white",
  white: "bg-white text-ink [--wipe:var(--color-fog)]",
  "outline-white": "border border-white/45 text-white [--wipe:#fff] hover:text-ink",
  text: "!h-auto !px-0 !gap-2 text-ink before:!hidden",
  "text-light": "!h-auto !px-0 !gap-2 text-white before:!hidden",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode; arrow?: boolean };

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  arrow = true,
  ...rest
}: Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const isText = variant === "text" || variant === "text-light";
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span className={cn(isText && "border-b border-current/40 pb-0.5")}>{children}</span>
      {arrow && <ArrowRight aria-hidden strokeWidth={1.75} className="btn-arrow size-4 shrink-0" />}
    </Link>
  );
}
