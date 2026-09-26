import type { CSSProperties } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { homeHero } from "@/data/corporate";
import { photoRef } from "@/lib/photos";
import { cn } from "@/lib/cn";

/**
 * 첫 화면 Hero — 텍스트는 왼쪽 (이미지 · 배치는 data/corporate.ts homeHero.image · layout)
 * split: 데스크톱에서 오른쪽 약 절반을 공간 사진 패널로 / wide: 이미지 전체 배경 + 왼쪽 그라데이션.
 * 모바일 · 태블릿: split 은 이미지 위, 텍스트 아래. wide 는 텍스트가 사진 아래쪽(바닥 영역)에 겹쳐 올라가
 * 사진과 글자가 한 덩어리로 보이게 함 — 데스크 · 게이트 · 단말은 사진 위쪽에 그대로 보임.
 * 이미지는 생성 브랜드 비주얼이므로 실제 현장 · 직원으로 표기하지 않습니다.
 */
export function Hero() {
  const image = photoRef(homeHero.image) ?? photoRef("facility-fitness");
  const dark = homeHero.tone === "dark";
  const split = homeHero.layout === "split";
  return (
    <section className={cn("pt-16 lg:pt-[4.75rem]", dark ? "bg-navy-deep" : "bg-white")} aria-labelledby="hero-title">
      <div className="relative">
        {image && (
          <div
            className={cn(
              "relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:absolute lg:aspect-auto",
              !split && "aspect-[4/5] xs:aspect-[1/1]",
              split ? "lg:inset-y-0 lg:right-0 lg:w-[50%]" : "lg:inset-0",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes={split ? "(min-width: 1024px) 50vw, 100vw" : "100vw"}
              className="object-cover [object-position:var(--focus)] lg:[object-position:var(--focus-lg)]"
              style={
                {
                  "--focus": image.focus ?? "70% center",
                  "--focus-lg": image.focusLg ?? image.focus ?? "70% center",
                } as CSSProperties
              }
            />
            {!split && (
              <div
                className={cn(
                  "absolute inset-0",
                  dark
                    ? "bg-[linear-gradient(0deg,rgba(12,34,66,1)_0%,rgba(12,34,66,0.8)_22%,rgba(12,34,66,0)_48%)] lg:bg-[linear-gradient(90deg,rgba(12,34,66,0.92)_0%,rgba(12,34,66,0.7)_34%,rgba(12,34,66,0)_60%)]"
                    : "bg-[linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.82)_22%,rgba(255,255,255,0)_48%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.72)_30%,rgba(255,255,255,0)_56%)]",
                )}
                aria-hidden
              />
            )}
          </div>
        )}
        <div className="container-x relative lg:flex lg:min-h-[min(84vh,52vw)] lg:items-center">
          <Reveal
            className={cn(
              "py-12 sm:py-14 lg:py-24",
              split ? "max-w-[36rem] lg:max-w-[44%]" : "relative -mt-20 max-w-[36rem] pt-0 sm:-mt-28 sm:pt-0 lg:mt-0 lg:pt-24",
            )}
          >
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
