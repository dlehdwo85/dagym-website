import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { facilityExpertise, homeHero } from "@/data/corporate";
import { photoRef } from "@/lib/photos";

/**
 * 첫 화면 — 흰 배경 기업형 레이아웃.
 * 보유한 현장 사진이 가로 약 950px 이라 풀스크린으로 늘리지 않고 오른쪽 프레임에 원본 크기 이하로 보여줍니다.
 * 고해상도 현장 사진(2400px 이상)이 확보되면 이 프레임을 넓혀 사용합니다. (IMAGE_REQUIRED)
 */
export function Hero() {
  const photo = photoRef(homeHero.photo);
  return (
    <section className="bg-white pt-16 lg:pt-[4.75rem]" aria-labelledby="hero-title">
      <div className="container-x grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-20 lg:pt-16">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">{homeHero.eyebrow}</p>
          <h1 id="hero-title" className="t-hero mt-5 whitespace-pre-line text-ink">
            {homeHero.title}
          </h1>
          <p className="t-lead mt-7 max-w-xl text-body">{homeHero.sub}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href="/business" size="lg">
              사업영역 보기
            </ButtonLink>
            <ButtonLink href="/cases" variant="secondary" size="lg">
              운영 개선 사례 보기
            </ButtonLink>
          </div>
          <ButtonLink href="/contact?type=proposal" variant="text" className="mt-6">
            운영 제안 문의
          </ButtonLink>
        </Reveal>
        {photo && (
          <figure className="lg:col-span-6">
            <ClipReveal className="aspect-[4/3] rounded-[4px] bg-mist" from="right">
              <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </ClipReveal>
            <figcaption className="mt-3 text-sm text-muted">{homeHero.photoCaption}</figcaption>
          </figure>
        )}
      </div>
      <div className="border-y border-line bg-white">
        <div className="container-x flex flex-col gap-3 py-5 text-[0.9375rem] lg:flex-row lg:items-center lg:gap-8">
          <p className="shrink-0 font-semibold text-navy">다짐이 운영하는 시설</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-body">
            {facilityExpertise.map((f) => (
              <li key={f.ko}>{f.ko}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
