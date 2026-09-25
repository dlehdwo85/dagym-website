"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Img = { src: string; alt: string };

/** 전후 비교 슬라이더 — 키보드(←→)와 드래그 모두 지원 */
export function BeforeAfter({ before, after, label }: { before: Img; after: Img; label: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <figure>
      <div className="relative aspect-[4/3] select-none overflow-hidden rounded-[4px] bg-mist">
        <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
        </div>
        <span className="absolute left-3 top-3 rounded-[2px] bg-ink/80 px-2 py-1 text-xs font-semibold text-white">BEFORE</span>
        <span className="absolute right-3 top-3 rounded-[2px] bg-navy px-2 py-1 text-xs font-semibold text-white">AFTER</span>
        <span className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }} aria-hidden />
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${label} 전후 비교`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-2 text-sm text-muted">{label} — 슬라이더를 좌우로 움직여 비교하세요.</figcaption>
    </figure>
  );
}
