import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** 버튼 — radius 4px, 호버 시 배경 채움 + 화살표 이동 */
type Variant = "primary" | "secondary" | "white" | "outline-white" | "text" | "text-light";
type Size = "md" | "lg";

const base =
  "btn-wipe group inline-flex items-center justify-center gap-2.5 rounded-[4px] font-semibold tracking-[-0.01em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white [--wipe:var(--color-navy-deep)]",
  secondary: "border border-line-strong bg-white text-ink [--wipe:var(--color-mist)] hover:border-navy",
  white: "bg-white text-navy [--wipe:var(--color-accent-soft)]",
  "outline-white": "border border-white/40 text-white [--wipe:rgba(255,255,255,0.1)] hover:border-white",
  text: "!h-auto !px-0 !gap-2 text-navy before:!hidden",
  "text-light": "!h-auto !px-0 !gap-2 text-white before:!hidden",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
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
      <span className={cn(isText && "border-b border-current/30 pb-0.5")}>{children}</span>
      {arrow && <ArrowRight aria-hidden strokeWidth={2} className="btn-arrow size-4 shrink-0" />}
    </Link>
  );
}
