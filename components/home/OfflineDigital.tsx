import { digitalOperation, offlineOperation } from "@/data/home";
import { Reveal } from "@/components/ui/Reveal";
import { HilinkMark, Logo } from "@/components/ui/Logo";

/**
 * DAGYM 대표 브랜드 섹션 — OFFLINE OPERATION + DIGITAL OPERATION.
 * 좌측(Bronze) = 사람의 운영, 우측(Signal) = 기술의 운영, 중앙 = 두 운영의 결합.
 */
export function OfflineDigital() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white" aria-labelledby="od-title">
      <div className="bg-blueprint absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x section-y relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="t-eyebrow flex items-center justify-center gap-3 text-white/55">
              <span className="text-accent-light">Offline Operation</span>
              <span aria-hidden>+</span>
              <span className="text-signal-light">Digital Operation</span>
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="od-title" className="t-h1 mt-8">
              사람의 운영과
              <br />
              기술의 운영을 연결합니다.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-lead mx-auto mt-7 max-w-2xl text-white/60">
              현장 인력만으로는 데이터가 남지 않고, 시스템만으로는 공간이 운영되지 않습니다. 다짐은 두 가지를 한 회사에서
              함께 제공합니다.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-stretch gap-4 lg:mt-24 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          {/* OFFLINE */}
          <Reveal className="relative border border-white/10 bg-white/[0.02] p-7 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-accent" aria-hidden />
            <p className="t-eyebrow text-accent-light">Offline Operation</p>
            <h3 className="t-h3 mt-4">현장 운영</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/55">
              공간을 매일 여닫고, 입주민을 맞이하고, 수업을 진행하는 사람들.
            </p>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {offlineOperation.map((item, i) => (
                <li key={item} className="flex items-center justify-between py-3.5 text-[0.9375rem]">
                  <span className="flex items-center gap-3">
                    <span className="t-num w-6 text-xs text-white/35">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </span>
                  <span className="h-px w-6 bg-accent-light/60" aria-hidden />
                </li>
              ))}
            </ul>
          </Reveal>

          {/* CENTER */}
          <div className="relative flex items-center justify-center py-4 lg:w-56 lg:py-0" aria-hidden>
            <svg viewBox="0 0 220 400" className="hidden h-full max-h-[34rem] w-full lg:block" preserveAspectRatio="none">
              {[60, 130, 200, 270, 340].map((y) => (
                <path key={`l${y}`} d={`M0 ${y} C 70 ${y}, 80 200, 110 200`} fill="none" stroke="var(--color-accent-light)" strokeOpacity=".45" strokeWidth="1" />
              ))}
              {[60, 130, 200, 270, 340].map((y) => (
                <path key={`r${y}`} d={`M220 ${y} C 150 ${y}, 140 200, 110 200`} fill="none" stroke="var(--color-signal-light)" strokeOpacity=".5" strokeWidth="1" />
              ))}
            </svg>
            <div className="flex items-center gap-4 lg:absolute lg:inset-0 lg:justify-center">
              <span className="h-px w-10 bg-accent-light/60 lg:hidden" />
              <div className="flex size-24 flex-col items-center justify-center rounded-full border border-white/20 bg-ink text-center shadow-[0_0_0_10px_rgb(255_255_255/0.03)]">
                <Logo tone="light" className="scale-[0.62]" />
              </div>
              <span className="h-px w-10 bg-signal-light/60 lg:hidden" />
            </div>
          </div>

          {/* DIGITAL */}
          <Reveal delay={120} className="relative border border-white/10 bg-white/[0.02] p-7 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-signal" aria-hidden />
            <p className="t-eyebrow text-signal-light">Digital Operation</p>
            <h3 className="t-h3 mt-4 flex items-center gap-3">
              <HilinkMark className="text-[1.5rem]" />
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/55">
              출입부터 예약, 결제, 통계까지 운영의 모든 기록을 남기는 자체 플랫폼.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {digitalOperation.map((item) => (
                <li
                  key={item}
                  className="inline-flex h-9 items-center gap-2 border border-white/12 bg-white/[0.03] px-3 text-[0.875rem] text-white/85"
                >
                  <span className="size-1 rounded-full bg-signal-light" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <p className="t-en mx-auto mt-14 max-w-3xl text-center text-[0.8125rem] tracking-[0.18em] text-white/40 lg:mt-20">
            ONE COMPANY · ONE TEAM · ONE PLATFORM
          </p>
        </Reveal>
      </div>
    </section>
  );
}
