import { FacilityIcon } from "@/components/ui/FacilityIcon";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import type { Facility } from "@/data/facilities";
import { cn } from "@/lib/cn";

/**
 * 운영 가능 시설 Visual Grid.
 * 첫 번째 · 다섯 번째 셀을 크게 배치해 masonry 느낌의 리듬을 만듭니다.
 */
export function FacilityGrid({ items, variant = "visual" }: { items: Facility[]; variant?: "visual" | "compact" }) {
  if (variant === "compact") {
    return (
      <ul className="grid grid-cols-2 gap-px overflow-hidden border border-mist-200 bg-mist-200 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((f, i) => (
          <Reveal as="li" key={f.key} delay={(i % 4) * 50} className="bg-white">
            <div className="group flex h-full flex-col p-6 transition-colors hover:bg-mist-50 lg:p-8">
              <FacilityIcon name={f.key} className="size-7 text-ink transition-colors group-hover:text-accent" />
              <p className="t-eyebrow mt-8 text-mist-400">{f.en}</p>
              <h3 className="t-h4 mt-2">{f.ko}</h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-600">{f.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    );
  }

  const tones = ["navy", "stone", "mist", "ink"] as const;
  return (
    <ul className="grid auto-rows-[12rem] grid-cols-2 gap-2 sm:auto-rows-[14rem] md:grid-cols-4 lg:auto-rows-[15rem] lg:gap-3">
      {items.map((f, i) => {
        const big = i === 0 || i === 5;
        const wide = i === 8 || i === 11;
        const tone = tones[i % tones.length];
        const dark = tone === "navy" || tone === "ink" || Boolean(f.image);
        return (
          <Reveal
            as="li"
            key={f.key}
            delay={(i % 4) * 50}
            className={cn(big && "col-span-2 row-span-2", wide && "md:col-span-2")}
          >
            <div className="group relative h-full">
              <Media
                src={f.image}
                alt={`${f.ko} 운영 공간`}
                tone={tone}
                zoomOnHover
                drawing={big}
                sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="absolute inset-0"
              />
              {f.image && <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" aria-hidden />}
              <div className={cn("relative flex h-full flex-col justify-between p-5 lg:p-6", dark ? "text-white" : "text-ink")}>
                <FacilityIcon name={f.key} className={cn("size-6", dark ? "text-white/80" : "text-ink/70")} />
                <div>
                  <p className={cn("t-en font-semibold tracking-[0.02em]", big ? "text-2xl lg:text-3xl" : "text-lg")}>
                    {f.en.toUpperCase()}
                  </p>
                  <p className={cn("mt-1 text-sm", dark ? "text-white/65" : "text-ink/60")}>{f.ko}</p>
                  {big && (
                    <p className={cn("mt-4 hidden max-w-xs text-[0.9375rem] leading-relaxed sm:block", dark ? "text-white/70" : "text-ink/70")}>
                      {f.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
