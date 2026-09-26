"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * 가로 스크롤 목록 + 조작 표시 (좌우 버튼 · 진행 막대 · 현재/전체).
 * 터치는 기본 스와이프, 마우스는 끌어서 넘김. `hideFrom` 이상 너비에서는 조작 표시를 숨김(그리드로 전환될 때).
 */
export function ScrollRail({
  children,
  count,
  label,
  className,
  controlsClassName,
}: {
  children: ReactNode;
  count: number;
  label: string;
  className?: string;
  controlsClassName?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const step = useCallback(() => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    return first.offsetWidth + gap;
  }, []);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const s = step();
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    if (s > 0) setIndex(Math.min(count - 1, Math.round(el.scrollLeft / s)));
  }, [count, step]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  /* 마우스로 끌어서 넘기기 (터치는 브라우저 기본 스와이프 사용) */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
    ref.current.style.scrollSnapType = "none";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || !ref.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    ref.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const el = ref.current;
    if (!drag.current || !el) return;
    drag.current = null;
    const s = step();
    el.style.scrollSnapType = "";
    if (s > 0) el.scrollTo({ left: Math.round(el.scrollLeft / s) * s, behavior: "smooth" });
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current?.moved) e.preventDefault();
  };

  return (
    <>
      <ul
        ref={ref}
        className={cn("cursor-grab select-none active:cursor-grabbing md:cursor-auto md:select-auto", className)}
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </ul>
      <div className={cn("container-x mt-6 flex items-center gap-4", controlsClassName)}>
        <p className="shrink-0 text-sm tabular-nums text-muted" aria-live="polite">
          <span className="font-semibold text-ink">{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
        </p>
        <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-navy transition-[width] duration-150"
            style={{ width: `${Math.max(1 / count, progress) * 100}%` }}
          />
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={atStart}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-navy transition-colors hover:bg-mist disabled:opacity-30"
            aria-label="이전"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={atEnd}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-navy transition-colors hover:bg-mist disabled:opacity-30"
            aria-label="다음"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </>
  );
}
