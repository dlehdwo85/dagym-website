import Image from "next/image";
import { cn } from "@/lib/cn";

type Tone = "navy" | "ink" | "stone" | "mist";

type Props = {
  /** 실제 사진 경로. 없으면 교체용 placeholder 가 렌더링됩니다. */
  src?: string;
  alt: string;
  /** placeholder 에 표시할 공간 이름 (예: "FITNESS") */
  label?: string;
  tone?: Tone;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** 이미지 hover 확대 — 부모에 group 클래스 필요 */
  zoomOnHover?: boolean;
  /** 원근 라인 드로잉 표시 여부 */
  drawing?: boolean;
  children?: React.ReactNode;
};

const toneBg: Record<Tone, string> = {
  navy: "radial-gradient(120% 90% at 70% 10%, #2a3d63 0%, #13223f 45%, #0a1428 100%)",
  ink: "radial-gradient(120% 90% at 30% 0%, #2a2e36 0%, #15181e 50%, #0b0d12 100%)",
  stone: "radial-gradient(120% 90% at 75% 5%, #efe6dc 0%, #d9cdbf 45%, #b9aa98 100%)",
  mist: "radial-gradient(120% 90% at 70% 0%, #ffffff 0%, #e6e9ee 50%, #cdd2da 100%)",
};

const toneLine: Record<Tone, string> = {
  navy: "text-white/[0.12]",
  ink: "text-white/[0.1]",
  stone: "text-[#6b5a46]/25",
  mist: "text-navy-900/15",
};

const toneLabel: Record<Tone, string> = {
  navy: "text-white/55",
  ink: "text-white/50",
  stone: "text-[#5b4a38]/70",
  mist: "text-mist-500",
};

/**
 * 원근 인테리어 라인 드로잉 — 실제 사진이 들어오기 전까지
 * "공간" 을 암시하는 절제된 placeholder 로 사용합니다.
 */
function PerspectiveDrawing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 size-full", className)}
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8" vectorEffect="non-scaling-stroke">
        <rect x="150" y="105" width="140" height="90" />
        <path d="M0 0 L150 105 M400 0 L290 105 M0 300 L150 195 M400 300 L290 195" />
        {/* floor lines */}
        <path d="M60 300 L178 195 M130 300 L206 195 M200 300 L234 195 M270 300 L262 195 M340 300 L290 195" />
        <path d="M107 225 L333 225 M64 255 L376 255" opacity=".7" />
        {/* ceiling lights */}
        <path d="M185 60 L255 60 M195 82 L245 82 M204 96 L236 96" strokeWidth="1.4" opacity=".8" />
        {/* side window mullions */}
        <path d="M40 28 L40 272 M85 60 L85 240 M118 83 L118 218" opacity=".6" />
        <path d="M330 28 L330 272 M355 10 L355 290" opacity=".5" />
        {/* back wall details */}
        <path d="M150 165 L290 165" opacity=".5" />
        <rect x="200" y="125" width="40" height="40" opacity=".5" />
      </g>
    </svg>
  );
}

export function Media({
  src,
  alt,
  label,
  tone = "navy",
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  zoomOnHover,
  drawing = true,
  children,
}: Props) {
  const zoom = zoomOnHover
    ? "transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.035]"
    : "";

  return (
    <div className={cn("overflow-hidden", !/\b(absolute|fixed)\b/.test(className ?? "") && "relative", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", zoom)} />
      ) : (
        <div role="img" aria-label={alt} className={cn("absolute inset-0", zoom)} style={{ backgroundImage: toneBg[tone] }}>
          {drawing && <PerspectiveDrawing className={toneLine[tone]} />}
          {label && (
            <span
              className={cn(
                "t-eyebrow absolute bottom-4 left-4 !text-[0.625rem] !tracking-[0.2em]",
                toneLabel[tone],
              )}
            >
              {label}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
