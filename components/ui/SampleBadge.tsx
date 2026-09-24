import { cn } from "@/lib/cn";

/** 확인되지 않은 샘플 데이터 표시 — data 파일에서 verified: true 로 바꾸면 사라집니다. */
export function SampleBadge({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      title="샘플 데이터 — 실제 정보로 교체 예정"
      className={cn(
        "t-eyebrow inline-flex h-6 items-center rounded-[2px] border px-2 !text-[0.625rem]",
        tone === "dark" ? "border-white/25 bg-ink/40 text-white/80 backdrop-blur" : "border-mist-300 bg-white/90 text-mist-600",
        className,
      )}
    >
      Sample
    </span>
  );
}
