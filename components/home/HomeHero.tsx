import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { homeHero } from "@/data/home";

/** 기존 공식 홈페이지에 게시된 커뮤니티 시설 영상의 포스터를 사용합니다. */
export function HomeHero() {
  return (
    <>
      <section className="overflow-hidden bg-[#f5f4f0] pt-20 text-ink lg:pt-24">
        <div className="container-x grid items-center gap-10 py-12 lg:min-h-[680px] lg:grid-cols-[0.96fr_1.04fr] lg:gap-16 lg:py-20">
          <div className="relative z-10 max-w-[650px]">
            <p className="mb-5 text-sm font-semibold text-brand">주식회사 다짐 · 커뮤니티 위탁운영</p>
            <h1 className="t-hero whitespace-pre-line text-ink">{homeHero.title}</h1>
            <p className="t-lead mt-6 max-w-xl text-body">{homeHero.sub}</p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href={homeHero.primary.href} size="lg">{homeHero.primary.label}</ButtonLink>
              <ButtonLink href={homeHero.secondary.href} variant="secondary" size="lg" arrow={false}>{homeHero.secondary.label}</ButtonLink>
            </div>
          </div>
          <div className="grid h-[360px] grid-cols-[1.25fr_0.75fr] gap-2.5 sm:h-[490px] lg:h-[570px] lg:gap-4" aria-label="기존 다짐 홈페이지에 게시된 커뮤니티 시설 영상 장면">
            <div className="hero-photo hero-photo-first visual-frame relative overflow-hidden bg-[#dadbd5]">
              <Image src="/images/facilities/cafe.jpg" alt="기존 홈페이지 커뮤니티 시설 영상 속 카페 공간" fill priority sizes="(min-width: 1024px) 38vw, 60vw" className="visual-image object-cover" />
            </div>
            <div className="grid min-h-0 grid-rows-2 gap-2.5 lg:gap-4">
              <div className="hero-photo hero-photo-second visual-frame relative overflow-hidden bg-[#dadbd5]">
                <Image src="/images/facilities/fitness.jpg" alt="기존 홈페이지 영상 속 피트니스 시설" fill priority sizes="(min-width: 1024px) 18vw, 35vw" className="visual-image object-cover" />
              </div>
              <div className="hero-photo hero-photo-third visual-frame relative overflow-hidden bg-[#dadbd5]">
                <Image src="/images/facilities/library.jpg" alt="기존 홈페이지 영상 속 독서실" fill sizes="(min-width: 1024px) 18vw, 35vw" className="visual-image object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
