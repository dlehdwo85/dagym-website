import { HilinkShowcase } from "@/components/hilink/HilinkShowcase";
import { HilinkStory } from "@/components/hilink/HilinkStory";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { hilinkHero, hilinkStory } from "@/data/hilink";
import { photoRef } from "@/lib/photos";

/** 홈의 두 번째 Hero — 다크 테마 HILINK 제품 섹션 */
export function HilinkSecondHero({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const real = { admin: photoRef("hilink-admin"), app: photoRef("hilink-app"), device: photoRef("hilink-device") };
  return (
    <section className="relative overflow-x-clip bg-navy-deep text-white" aria-labelledby="hilink-title">
      <div className="container-x pt-24 lg:pt-40">
        <p className="eyebrow text-signal">{hilinkHero.eyebrow}</p>
        <p className="display mt-6 text-[5.5rem] leading-[0.85] text-white sm:text-[9rem] lg:text-[15rem]" aria-hidden>
          Hilink
        </p>
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <MaskText id="hilink-title" as={headingLevel} text={hilinkHero.title} className="t-h1 lg:col-span-7" />
          <Reveal className="lg:col-span-5" delay={0.2}>
            <p className="t-lead text-white/65">{hilinkHero.body}</p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href="/hilink" variant="white">
                HILINK 자세히 보기
              </ButtonLink>
              <ButtonLink href="/contact?type=hilink" variant="outline-white">
                도입 문의
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="mt-20 lg:mt-32">
        <HilinkShowcase real={real} />
      </div>
      <div className="mt-24 border-t border-line-dark pt-16 lg:mt-32 lg:pt-0">
        <div className="container-x lg:hidden">
          <p className="eyebrow text-white/45">How it works · 01 – 06</p>
          <h3 className="t-h2 mt-4">회원 등록부터 운영 데이터까지</h3>
        </div>
        <div className="mt-10 pb-24 lg:mt-0 lg:pb-0">
          <HilinkStory steps={hilinkStory} />
        </div>
      </div>
    </section>
  );
}
