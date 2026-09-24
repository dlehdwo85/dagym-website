import { cn } from "@/lib/cn";

/**
 * DAGYM 워드마크 (임시 — 텍스트).
 * TODO_VERIFY: 공식 로고 파일을 public/images/brand/dagym-logo.svg 로 넣고 <Image> 로 교체하세요.
 */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", tone === "light" ? "text-white" : "text-ink", className)}>
      <span className="text-[1.25rem] font-extrabold tracking-[0.06em]">DAGYM</span>
      <span className={cn("text-[0.8125rem] font-medium", tone === "light" ? "text-white/70" : "text-muted")}>다짐</span>
    </span>
  );
}
