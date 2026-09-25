import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { homeHero } from "@/data/home";

/**
 * 첫 화면 — 업종(아파트 커뮤니티 위탁운영)과 문의 버튼을 먼저, 사진은 한 장만.
 * 사진: 기존 다짐 홈페이지에 게시된 커뮤니티 카페 장면 (촬영 단지 미확인 → 현장명 표기 안 함)
 */
export function HomeHero() {
  return (
    <section className="bg-white pt-16 lg:pt-[4.5rem]">
      <div className="container-x grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="t-label text-muted">{homeHero.label}</p>
          <h1 className="t-hero mt-3 whitespace-pre-line text-ink">{homeHero.title}</h1>
          <p className="t-lead mt-5 max-w-lg text-body">{homeHero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href={homeHero.primary.href} size="lg">
              {homeHero.primary.label}
            </ButtonLink>
            <ButtonLink href={homeHero.secondary.href} variant="secondary" size="lg" arrow={false}>
              {homeHero.secondary.label}
            </ButtonLink>
          </div>
        </div>
        <Photo id="facility-cafe" priority className="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
    </section>
  );
}
