import { metrics, PENDING_LABEL } from "@/data/config";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { Reveal } from "@/components/ui/Reveal";
import { HilinkMark } from "@/components/ui/Logo";

/** 신뢰 지표 — data/config.ts 의 metrics 값을 수정하면 반영됩니다. */
export function TrustMetrics() {
  return (
    <section id="trust" className="border-b border-mist-200 bg-white" aria-labelledby="trust-title">
      <div className="container-x py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="t-eyebrow text-accent">DAGYM in Numbers</p>
            <h2 id="trust-title" className="t-h3 mt-5 max-w-sm">
              운영 인력과 운영 플랫폼을
              <br />
              함께 가진 회사.
            </h2>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mist-600">
              다짐은 현장 운영과 자체 플랫폼 HILINK를 동시에 제공하는 커뮤니티 운영 전문 기업입니다.
            </p>
          </Reveal>
          <dl className="grid grid-cols-2 gap-px bg-mist-200 lg:col-span-8 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal
                key={m.key}
                delay={i * 80}
                className="flex h-full flex-col justify-between gap-8 bg-white p-5 sm:p-6 lg:min-h-56"
              >
                  <dt>
                    <span className="t-eyebrow block !text-[0.625rem] text-mist-400">{m.label}</span>
                    <span className="mt-2 block text-sm font-semibold text-ink">{m.labelKo}</span>
                  </dt>
                  <dd>
                    {m.text ? (
                      <HilinkMark tone="dark" className="text-[1.75rem] lg:text-[2rem]" />
                    ) : m.value !== null ? (
                      <MetricCounter
                        value={m.value}
                        prefix={m.prefix}
                        suffix={m.suffix}
                        className="t-num text-[2.5rem] font-semibold leading-none text-ink lg:text-[3.25rem]"
                        suffixClassName="ml-1 text-base font-medium text-mist-500"
                      />
                    ) : (
                      <span className="block" data-todo="verify">
                        <span className="t-num block text-[2.5rem] font-semibold leading-none text-mist-300 lg:text-[3.25rem]" aria-hidden>
                          —
                        </span>
                        <span className="mt-2 block text-xs text-mist-400">{PENDING_LABEL}</span>
                      </span>
                    )}
                    <span className="mt-3 block text-[0.8125rem] text-mist-500">{m.note}</span>
                  </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
