import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "light" | "outline-light" | "text" | "text-light";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-premium)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-navy-800",
  accent: "bg-accent text-white hover:bg-accent-strong",
  outline: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-mist-100",
  "outline-light": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink",
  text: "text-ink link-underline !px-0 !h-auto",
  "text-light": "text-white link-underline !px-0 !h-auto",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-[0.9375rem] rounded-[2px]",
  lg: "h-14 px-7 text-base rounded-[2px]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  icon?: "arrow" | "external" | "none";
};

function ButtonIcon({ icon }: { icon: Common["icon"] }) {
  if (icon === "none") return null;
  const Cmp = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <Cmp
      aria-hidden
      strokeWidth={1.75}
      className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-premium)] group-hover/btn:translate-x-1"
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon = "arrow",
  ...rest
}: Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span>{children}</span>
      <ButtonIcon icon={icon} />
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon = "arrow",
  ...rest
}: Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span>{children}</span>
      <ButtonIcon icon={icon} />
    </button>
  );
}
