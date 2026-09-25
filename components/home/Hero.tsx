import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { homeHero } from "@/data/corporate";
import { photoRef } from "@/lib/photos";

/**
 * 첫 화면 — Editorial Corporate Hero (Option A)
 * 왼쪽 대형 메시지 + 오른쪽 실제 시설 사진 3장. 사진은 원본 해상도(약 950px) 이하로만 표시합니다.
 */
export function Hero() {
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
