import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { homeHero } from "@/data/corporate";
import { photoRef, type PhotoRef } from "@/lib/photos";

/**
 * 첫 화면 — Editorial Corporate Hero (Option A)
 * 왼쪽 대형 메시지 + 오른쪽 실제 시설 사진 3장. 사진은 원본 해상도(약 950px) 이하로만 표시합니다.
 */
export function Hero() {
  const wide = photoRef("hero-wide");
  if (wide) return <WideHero image={wide} />;
  const main = photoRef("facility-fitness");
  const sub1 = photoRef("facility-golf");
  const sub2 = photoRef("facility-cafe");
  return (
    <section className="bg-white pt-16 lg:pt-[4.75rem]" aria-labelledby="hero-title">
      <div className="container-x grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-24 lg:pt-16">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">{homeHero.eyebrow}</p>
          <h1 id="hero-title" className="t-hero mt-5 whitespace-pre-line text-navy">
            {homeHero.title}
          </h1>
          <p className="t-lead mt-7 max-w-xl text-body">{homeHero.sub}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href="/projects" size="lg">
              운영실적 보기
            </ButtonLink>
            <ButtonLink href="/business" variant="secondary" size="lg">
              사업영역 보기
            </ButtonLink>
          </div>
          <ButtonLink href="/contact?type=proposal" variant="text" className="mt-6">
            운영 제안 문의
          </ButtonLink>
        </Reveal>
        <div className="grid grid-cols-5 grid-rows-2 gap-3 lg:col-span-6 lg:gap-4">
          {main && (
            <ClipReveal className="col-span-3 row-span-2 h-full rounded-[2px] bg-mist" from="bottom">
              <Image src={main.src} alt={main.alt} fill priority sizes="(min-width: 1024px) 360px, 60vw" className="object-cover" />
            </ClipReveal>
          )}
          {[sub1, sub2].map(
              (s, i) =>
                s && (
                  <ClipReveal key={s.src} className="col-span-2 aspect-[4/5] rounded-[2px] bg-mist" from="bottom" delay={0.12 * (i + 1)}>
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 240px, 40vw" className="object-cover" />
                  </ClipReveal>
                ),
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * 와이드 Hero — 16:9 이상 전용 이미지(public/images/visual/hero-wide.jpg)가 있을 때.
 * 인물 · 주요 피사체는 오른쪽, 왼쪽 여백에 텍스트. 모바일은 이미지 위 · 텍스트 아래.
 */
function WideHero({ image }: { image: PhotoRef }) {
  return (
    <section className="bg-white pt-16 lg:pt-[4.75rem]" aria-labelledby="hero-title">
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: image.focus ?? "70% center" }} />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.75)_32%,rgba(255,255,255,0)_58%)] lg:block" aria-hidden />
        </div>
        <div className="container-x relative lg:flex lg:min-h-[min(86vh,56.25vw)] lg:items-center">
          <Reveal className="max-w-xl py-12 lg:py-24">
            <p className="eyebrow">{homeHero.eyebrow}</p>
            <h1 id="hero-title" className="t-hero mt-5 whitespace-pre-line text-navy">
              {homeHero.title}
            </h1>
            <p className="t-lead mt-7 text-body">{homeHero.sub}</p>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink href="/projects" size="lg">
                운영실적 보기
              </ButtonLink>
              <ButtonLink href="/business" variant="secondary" size="lg">
                사업영역 보기
              </ButtonLink>
            </div>
            <ButtonLink href="/contact?type=proposal" variant="text" className="mt-6">
              운영 제안 문의
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
