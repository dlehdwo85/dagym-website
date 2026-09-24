import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { FloorPlan } from "@/components/visuals/FloorPlan";
import { homeHero } from "@/data/home";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function HomeHero() {
  const hasMedia = Boolean(homeHero.heroImage || homeHero.heroVideo);
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white">
      {/* background */}
      {homeHero.heroVideo ? (
        <video
          className="absolute inset-0 -z-10 size-full object-cover"
          src={homeHero.heroVideo}
          poster={homeHero.heroImage}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : homeHero.heroImage ? (
        <Image src={homeHero.heroImage} alt="" fill priority sizes="100vw" className="hero-zoom -z-10 object-cover" />
      ) : null}
      <div
        className={
          hasMedia
            ? "absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/20"
            : "bg-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]"
        }
        aria-hidden
      />
      {!hasMedia && (
        <div className="absolute -right-32 top-1/4 -z-10 size-[40rem] rounded-full bg-signal/10 blur-[120px]" aria-hidden />
      )}

      <div className="container-x relative grid flex-1 items-center gap-10 pb-10 pt-28 lg:grid-cols-12 lg:gap-6 lg:pt-32">
        <div className="lg:col-span-7">
          <p className="t-eyebrow hero-in flex items-center gap-3 text-accent-light" style={d(0)}>
            <span aria-hidden className="h-px w-8 bg-accent-light/70" />
            {homeHero.eyebrow}
          </p>
          <h1 className="t-display hero-in mt-8" style={d(100)}>
            {homeHero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="t-lead hero-in mt-8 max-w-xl whitespace-pre-line text-white/70" style={d(220)}>
            {homeHero.sub}
          </p>
          <div className="hero-in mt-10 flex flex-col gap-3 xs:flex-row" style={d(320)}>
            <ButtonLink href={homeHero.primary.href} variant="light" size="lg">
              {homeHero.primary.label}
            </ButtonLink>
            <ButtonLink href={homeHero.secondary.href} variant="outline-light" size="lg">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                {homeHero.secondary.label}
              </span>
            </ButtonLink>
          </div>
        </div>

        {!hasMedia && (
          <div className="hero-in relative lg:col-span-5" style={d(280)}>
            <div className="relative mx-auto max-w-[34rem] lg:max-w-none">
              <div className="mb-4 flex items-center justify-between text-[0.6875rem] text-white/45">
                <span className="t-eyebrow !text-[0.625rem]">Community Center · Plan</span>
                <span className="t-eyebrow flex items-center gap-2 !text-[0.625rem] text-signal-light">
                  <span className="animate-pulse-dot size-1.5 rounded-full bg-signal-light" aria-hidden />
                  Operated by HILINK
                </span>
              </div>
              <FloorPlan />
              <div className="mt-4 grid grid-cols-2 border-t border-white/15 pt-4 text-[0.8125rem]">
                <div>
                  <p className="t-eyebrow !text-[0.625rem] text-accent-light">Offline</p>
                  <p className="mt-1.5 text-white/70">현장 운영 인력</p>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <p className="t-eyebrow !text-[0.625rem] text-signal-light">Digital</p>
                  <p className="mt-1.5 text-white/70">HILINK 운영 시스템</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container-x relative pb-8">
        <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-6">
          <ul className="t-eyebrow flex flex-wrap gap-x-6 gap-y-2 !text-[0.6875rem] text-white/45" aria-label="핵심 키워드">
            {homeHero.keywords.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
          <a href="#trust" className="group hidden shrink-0 flex-col items-center gap-3 text-white/60 sm:flex" aria-label="아래로 스크롤">
            <span className="t-eyebrow !text-[0.625rem]">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-white/15">
              <span className="animate-scroll-cue absolute inset-0 bg-white" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
