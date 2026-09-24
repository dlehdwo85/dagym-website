import { hilinkFeatures } from "@/data/hilink";
import { ButtonLink } from "@/components/ui/Button";
import { HilinkIcon } from "@/components/ui/HilinkIcon";
import { HilinkMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardMockup, FaceTerminalMockup, PhoneAppMockup } from "@/components/hilink/Mockups";

const highlight = ["members", "face", "calendar", "golf", "seat", "locker", "payment", "stats"] as const;

/** HOME — HILINK 제품 랜딩 섹션 */
export function HilinkSection() {
  const features = hilinkFeatures.filter((f) => (highlight as readonly string[]).includes(f.key));
  return (
    <section className="relative overflow-hidden bg-[#f3f5f9]" aria-labelledby="hilink-title">
      <div className="bg-blueprint-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="container-x section-y relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5 lg:pt-6">
            <Reveal>
              <p className="t-eyebrow flex items-center gap-3 text-signal">
                <span className="t-num text-mist-400">03</span>
                <span aria-hidden className="h-px w-8 bg-signal/60" />
                Smart Community Platform
              </p>
            </Reveal>
            <Reveal delay={60}>
              <HilinkMark tone="dark" className="mt-8 text-[2.75rem] lg:text-[3.5rem]" />
            </Reveal>
            <Reveal delay={100}>
              <h2 id="hilink-title" className="t-h2 mt-6">
                커뮤니티 운영을
                <br />
                하나의 플랫폼으로.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="t-lead mt-6 max-w-md text-mist-600">
                회원관리부터 출입, 예약, 결제, 통계까지. 다짐이 직접 개발하고 현장에서 직접 사용하는 커뮤니티 운영 플랫폼입니다.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-2">
                {features.map((f) => (
                  <li key={f.key} className="flex items-center gap-3 text-[0.9375rem] font-medium text-ink">
                    <span className="flex size-9 shrink-0 items-center justify-center border border-mist-300 bg-white">
                      <HilinkIcon name={f.key} className="size-4 text-signal" />
                    </span>
                    {f.title}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-12 flex flex-col gap-3 xs:flex-row">
                <ButtonLink href="/hilink" variant="primary" size="lg">
                  HILINK 자세히 보기
                </ButtonLink>
                <ButtonLink href="/contact?type=hilink" variant="outline" size="lg">
                  도입 문의
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* layered product composition */}
          <div className="relative min-w-0 lg:col-span-7">
            <Reveal>
              <div className="relative sm:pb-36 lg:pb-44">
                <DashboardMockup className="relative z-0 w-full" />
                <div className="absolute bottom-0 right-2 z-10 hidden sm:block lg:right-6">
                  <PhoneAppMockup />
                </div>
                <div className="absolute bottom-6 left-4 z-10 hidden sm:block lg:left-10">
                  <FaceTerminalMockup />
                </div>
              </div>
            </Reveal>
            <div className="mt-6 flex items-end justify-center gap-3 sm:hidden">
              <FaceTerminalMockup className="w-[8.5rem]" />
              <PhoneAppMockup className="w-[12.5rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
