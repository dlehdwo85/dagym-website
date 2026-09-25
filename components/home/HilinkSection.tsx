import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { hilinkHome } from "@/data/corporate";
import { photoRef } from "@/lib/photos";

/** HILINK — 운영을 뒷받침하는 기술 (홈에서 유일한 다크 섹션 중 하나) */
export function HilinkSection() {
  const screens = [photoRef("hilink-app"), photoRef("hilink-passes"), photoRef("hilink-store")].filter(Boolean) as NonNullable<ReturnType<typeof photoRef>>[];
  const device = photoRef("hilink-device");
  return (
    <section className="overflow-hidden bg-navy text-white" aria-labelledby="hilink-title">
      <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
        <Reveal className="lg:col-span-5">
          <p className="flex items-center gap-3">
            <span className="eyebrow !text-[#9dbcf0]">{hilinkHome.eyebrow}</span>
          </p>
          <h2 id="hilink-title" className="t-section mt-6 whitespace-pre-line">
            {hilinkHome.title}
          </h2>
          <p className="t-body mt-6 text-white/75">{hilinkHome.lead}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {hilinkHome.features.map((f) => (
              <li key={f} className="t-small flex items-center gap-2 text-white/85">
                <Check className="size-4 shrink-0 text-[#9dbcf0]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/hilink" variant="white">
              HILINK 자세히 보기
            </ButtonLink>
            <ButtonLink href="/contact?type=hilink" variant="outline-white">
              도입 문의
            </ButtonLink>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-3 items-end gap-3 sm:gap-5">
            {screens.map((s, i) => (
              <Reveal key={s.src} delay={0.1 + i * 0.1} className={i === 1 ? "sm:-translate-y-8" : undefined}>
                <div className="relative aspect-[923/2000] overflow-hidden rounded-[8px] border border-white/15 bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 220px, 30vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
          {device && (
            <Reveal delay={0.4} className="mt-6 flex items-center gap-4 rounded-[4px] border border-white/15 p-3">
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-[2px]">
                <Image src={device.src} alt={device.alt} fill sizes="64px" className="object-cover" />
              </div>
              <p className="t-small text-white/75">
                앱에서 등록한 얼굴로 출입하는 안면인식 단말기. 이용권이 없거나 만료되면 출입이 제한됩니다.
              </p>
            </Reveal>
          )}
          <p className="mt-5 text-xs text-white/50">{hilinkHome.notice}</p>
        </div>
      </div>
    </section>
  );
}
