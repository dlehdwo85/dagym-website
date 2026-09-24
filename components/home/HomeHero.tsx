import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { heroFacts, homeHero } from "@/data/home";
import { photos } from "@/data/photos";
import { hasPhoto, showPhotoSlots } from "@/lib/photos";

/**
 * 첫 화면 — 실제 운영 현장 사진 위에 사업 소개와 문의 버튼.
 * 사진(public/images/home/hero.jpg)이 없으면 단색 배경으로 표시됩니다.
 */
export function HomeHero() {
  const slot = photos["home-hero"];
  const withPhoto = hasPhoto("home-hero");
  return (
    <>
      <section className="on-dark relative isolate flex min-h-[34rem] items-end bg-hero pt-16 text-white sm:min-h-[38rem] lg:min-h-[44rem] lg:pt-[4.5rem]">
        {withPhoto && (
          <>
            <Image
              src={slot.file}
              alt={slot.alt}
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover"
              style={{ objectPosition: slot.focus }}
            />
            {/* 글자 가독성을 위한 하단 · 좌측 음영 */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/30 to-black/10" aria-hidden />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 to-transparent" aria-hidden />
          </>
        )}
        {!withPhoto && showPhotoSlots && (
          <p className="absolute right-4 top-20 max-w-xs border border-dashed border-white/40 px-3 py-2 text-xs leading-relaxed text-white/70 lg:right-8 lg:top-24">
            사진 필요 · home-hero
            <br />
            public{slot.file} · {slot.size}
          </p>
        )}
        <div className="container-x pb-14 pt-20 lg:pb-20">
          <h1 className="t-hero max-w-3xl whitespace-pre-line [text-shadow:0_1px_24px_rgb(0_0_0/0.25)]">{homeHero.title}</h1>
          <p className="t-lead mt-6 max-w-2xl text-white/85 sm:whitespace-pre-line">{homeHero.sub}</p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href={homeHero.primary.href} variant="white" size="lg">
              {homeHero.primary.label}
            </ButtonLink>
            <ButtonLink href={homeHero.secondary.href} variant="outline-white" size="lg" arrow={false}>
              {homeHero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </section>
      <section aria-label="다짐이 하는 일" className="border-b border-line bg-white">
        <ul className="container-x grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {heroFacts.map((f) => (
            <li key={f.title} className="py-6 sm:px-6 sm:first:pl-0 lg:py-8">
              <p className="font-semibold text-ink">{f.title}</p>
              <p className="mt-1 text-[0.9375rem] text-body">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
