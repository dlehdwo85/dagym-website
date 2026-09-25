import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { homeHero } from "@/data/corporate";
import { photoRef } from "@/lib/photos";
import { cn } from "@/lib/cn";

/**
 * 첫 화면 — 와이드 Hero
 * 텍스트는 왼쪽, 인물 · 주요 피사체는 오른쪽 (이미지는 data/corporate.ts homeHero.image).
 * 데스크톱: 이미지 전체 배경 + 왼쪽 그라데이션 / 모바일 · 태블릿: 이미지 위, 텍스트 아래.
 * 이미지는 생성 브랜드 비주얼이므로 실제 현장 · 직원으로 표기하지 않습니다.
 */
export function Hero() {
  const image = photoRef(homeHero.image) ?? photoRef("facility-fitness");
  const dark = homeHero.tone === "dark";
  return (
    <section className={cn("pt-16 lg:pt-[4.75rem]", dark ? "bg-navy-deep" : "bg-white")} aria-labelledby="hero-title">
      <div className="relative">
        {image && (
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: image.focus ?? "70% center" }}
            />
            <div
              className={cn(
                "absolute inset-0 hidden lg:block",
                dark
                  ? "bg-[linear-gradient(90deg,rgba(12,34,66,0.92)_0%,rgba(12,34,66,0.7)_34%,rgba(12,34,66,0)_60%)]"
                  : "bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.72)_30%,rgba(255,255,255,0)_56%)]",
              )}
              aria-hidden
            />
          </div>
        )}
        <div className="container-x relative lg:flex lg:min-h-[min(84vh,52vw)] lg:items-center">
          <Reveal className="max-w-[36rem] py-12 sm:py-14 lg:py-24">
            <p className={cn("label-en font-semibold tracking-[0.14em]", dark ? "text-[#9fb6d8]" : "text-accent")}>{homeHero.eyebrow}</p>
            <h1 id="hero-title" className={cn("t-hero mt-5 whitespace-pre-line", dark ? "text-white" : "text-navy")}>
              {homeHero.title}
            </h1>
            <p className={cn("t-lead mt-6 whitespace-pre-line", dark ? "text-white/80" : "text-body")}>{homeHero.sub}</p>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              {homeHero.ctas.map((c, i) => (
                <ButtonLink key={c.href} href={c.href} size="lg" variant={dark ? (i === 0 ? "white" : "outline-white") : i === 0 ? "primary" : "secondary"}>
                  {c.label}
                </ButtonLink>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
