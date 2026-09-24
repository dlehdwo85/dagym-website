import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "white" | "outline-white" | "text";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-[4px] font-semibold tracking-[-0.01em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-line-strong bg-white text-ink hover:border-ink",
  white: "bg-white text-ink hover:bg-paper",
  "outline-white": "border border-white/60 text-white hover:bg-white hover:text-ink",
  text: "!h-auto !px-0 text-brand hover:text-brand-dark",
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
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden strokeWidth={2} className="size-4 transition-transform group-hover/btn:translate-x-0.5" />}
    </Link>
  );
}
