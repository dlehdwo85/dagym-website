import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { heroFacts, homeHero } from "@/data/home";

/** 기존 공식 홈페이지에 게시된 커뮤니티 시설 영상의 포스터를 사용합니다. */
export function HomeHero() {
  return (
    <>
      <section className="overflow-hidden bg-[#f5f4f0] pt-20 text-ink lg:pt-24">
        <div className="container-x grid min-h-[640px] items-center gap-12 py-16 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16 lg:py-20">
          <div className="relative z-10 max-w-[650px]">
            <p className="mb-6 text-sm font-semibold tracking-[0.12em] text-brand">주식회사 다짐 · 커뮤니티 위탁운영</p>
            <h1 className="t-hero whitespace-pre-line text-ink">{homeHero.title}</h1>
            <p className="t-lead mt-7 max-w-xl text-body sm:whitespace-pre-line">{homeHero.sub}</p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href={homeHero.primary.href} size="lg">{homeHero.primary.label}</ButtonLink>
              <ButtonLink href={homeHero.secondary.href} variant="secondary" size="lg" arrow={false}>{homeHero.secondary.label}</ButtonLink>
            </div>
          </div>
          <div className="grid h-[390px] grid-cols-[1.25fr_0.75fr] gap-2.5 sm:h-[490px] lg:h-[570px] lg:gap-4" aria-label="기존 다짐 홈페이지에 게시된 커뮤니티 시설 영상 장면">
            <div className="relative overflow-hidden bg-[#dadbd5]">
              <Image src="/images/facilities/cafe.jpg" alt="기존 홈페이지 커뮤니티 시설 영상 속 카페 공간" fill priority sizes="(min-width: 1024px) 38vw, 60vw" className="object-cover" />
              <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 text-xs font-semibold text-ink">카페 · 커뮤니티 공간</span>
            </div>
            <div className="grid min-h-0 grid-rows-2 gap-2.5 lg:gap-4">
              <div className="relative overflow-hidden bg-[#dadbd5]">
                <Image src="/images/facilities/fitness.jpg" alt="기존 홈페이지 영상 속 피트니스 시설" fill priority sizes="(min-width: 1024px) 18vw, 35vw" className="object-cover" />
                <span className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 text-[11px] font-semibold text-ink">피트니스</span>
              </div>
              <div className="relative overflow-hidden bg-[#dadbd5]">
                <Image src="/images/facilities/library.jpg" alt="기존 홈페이지 영상 속 독서실" fill sizes="(min-width: 1024px) 18vw, 35vw" className="object-cover" />
                <span className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 text-[11px] font-semibold text-ink">독서실</span>
              </div>
            </div>
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
