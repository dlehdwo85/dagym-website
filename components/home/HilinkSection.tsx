import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DemoPhone } from "@/components/hilink/DemoPhone";
import { hilinkHome } from "@/data/corporate";
import { hilinkHeroDemos } from "@/data/hilinkDemo";
import { cn } from "@/lib/cn";

/** HILINK — 실제 공개 데모 입주민 앱 3화면 (홈 · 시설 이용 · 전체 서비스) */
export function HilinkSection() {
  return (
    <section className="overflow-hidden bg-navy text-white" aria-labelledby="hilink-title">
      <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-28">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow !text-[#9dbcf0]">{hilinkHome.eyebrow}</p>
          <h2 id="hilink-title" className="t-section mt-5 whitespace-pre-line">
            {hilinkHome.title}
          </h2>
          <p className="t-lead mt-5 text-white/75">{hilinkHome.lead}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {hilinkHome.features.map((f) => (
              <li key={f} className="rounded-[2px] border border-white/20 px-3 py-1.5 text-sm font-medium text-white/90">
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
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:items-end sm:gap-5 sm:overflow-visible sm:px-0" aria-label="HILINK 입주민 앱 화면">
            {hilinkHeroDemos.map((id, i) => (
              <li key={id} className={cn("w-[62vw] max-w-[16rem] shrink-0 snap-center sm:w-auto sm:max-w-none", i === 1 && "sm:-translate-y-10")}>
                <Reveal delay={0.1 + i * 0.1}>
                  <DemoPhone id={id} sizes="(min-width: 1024px) 230px, (min-width: 640px) 30vw, 62vw" />
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-white/45">HILINK 공개 데모</p>
        </div>
      </div>
    </section>
  );
}
