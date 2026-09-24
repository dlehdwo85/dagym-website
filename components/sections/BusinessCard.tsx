import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import type { BusinessArea } from "@/data/business";
import { cn } from "@/lib/cn";

/** 사업영역 카드 — 이미지 미세 확대 + 화살표 이동 hover */
export function BusinessCard({ area, className, large }: { area: BusinessArea; className?: string; large?: boolean }) {
  const isHilink = area.slug === "hilink";
  return (
    <Link href={area.href} className={cn("group relative flex min-h-[22rem] flex-col overflow-hidden text-white", className)}>
      <Media
        src={area.image}
        alt={`${area.ko} 대표 이미지`}
        tone={isHilink ? "ink" : "navy"}
        zoomOnHover
        drawing
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" aria-hidden />
      {isHilink && <div className="absolute inset-x-0 top-0 h-[2px] bg-signal" aria-hidden />}
      <div className="relative flex flex-1 flex-col justify-between p-6 lg:p-8">
        <div className="flex items-start justify-between">
          <span className="t-num text-sm text-white/60">{area.no}</span>
          <Icon name={area.icon} className={cn("size-7", isHilink ? "text-signal-light" : "text-white/70")} />
        </div>
        <div>
          <p className="t-en text-[0.8125rem] font-medium tracking-[0.04em] text-white/60">{area.en}</p>
          <h3 className={cn("mt-2 font-bold tracking-[-0.025em]", large ? "text-3xl" : "text-[1.5rem] leading-snug")}>
            {area.ko}
          </h3>
          <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">{area.summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            자세히 보기
            <ArrowRight
              className="size-4 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
