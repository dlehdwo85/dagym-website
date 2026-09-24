import { cn } from "@/lib/cn";

/**
 * DAGYM 워드마크 (임시).
 * TODO_VERIFY: 공식 로고 파일(SVG)을 /public/images/brand/dagym-logo.svg 로 넣고
 *              이 컴포넌트에서 <Image> 로 교체하세요.
 */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={cn("inline-flex items-center gap-2.5", color, className)}>
      <svg viewBox="0 0 28 28" className="size-7 shrink-0" aria-hidden>
        <rect x="1" y="1" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="6" y="7" width="16" height="3" fill="currentColor" />
        <rect x="6" y="12.5" width="11" height="3" fill="var(--color-accent)" />
        <rect x="6" y="18" width="16" height="3" fill="currentColor" />
      </svg>
      <span className="t-en text-[1.1875rem] font-bold tracking-[0.14em]">DAGYM</span>
    </span>
  );
}

/**
 * HILINK 워드마크 (임시).
 * TODO_VERIFY: 공식 HILINK 로고로 교체.
 */
export function HilinkMark({ className, tone = "light" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2", tone === "light" ? "text-white" : "text-ink", className)}>
      <svg viewBox="0 0 24 24" className="size-[1.1em] shrink-0" aria-hidden>
        <circle cx="6" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="18" cy="12" r="4" fill="var(--color-signal)" />
        <path d="M10 12h4" stroke="currentColor" strokeWidth="2.2" />
      </svg>
      <span className="t-en font-bold tracking-[0.08em]">HILINK</span>
    </span>
  );
}
