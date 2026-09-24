"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  mode: "file" | "embed";
  src: string;
  poster: string;
  title: string;
  className?: string;
  sizes?: string;
};

/**
 * 시설 영상 — 자동재생 없음, 재생 버튼을 누르기 전에는 영상 데이터를 받지 않습니다.
 * file  : <video preload="none" playsInline controls>
 * embed : 포스터만 먼저 보여주고, 클릭 시 iframe 을 불러옵니다.
 */
export function VideoPlayer({ mode, src, poster, title, className, sizes = "(min-width: 1024px) 33vw, 100vw" }: Props) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    setStarted(true);
    if (mode === "file") {
      // 사용자 동작으로 시작하므로 소리와 함께 재생
      requestAnimationFrame(() => void videoRef.current?.play().catch(() => undefined));
    }
  };

  return (
    <div className={cn("relative overflow-hidden bg-ink", className)}>
      {mode === "file" && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={started}
          className="absolute inset-0 size-full object-cover"
          aria-label={title}
        />
      )}
      {mode === "embed" && started && (
        <iframe
          src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 size-full border-0"
        />
      )}
      {!started && (
        <button type="button" onClick={start} className="group absolute inset-0 text-left" aria-label={`${title} 영상 재생`}>
          {mode === "embed" && <Image src={poster} alt="" fill sizes={sizes} className="object-cover" />}
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" aria-hidden />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform group-hover:scale-105">
            <Play className="ml-1 size-6 fill-current" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
