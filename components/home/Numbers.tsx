import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { isVerified } from "@/data/config";
import { companyMetrics, operatingStandards } from "@/data/showroom";
import { showPhotoSlots } from "@/lib/photos";
import { cn } from "@/lib/cn";

/**
 * 큰 숫자 타이포그래피.
 * - 확인된 회사 수치가 2개 이상이면 그 값을 카운트 애니메이션으로 표시
 * - 아니면 제안서에 적힌 "운영 기준"을 같은 형식으로 표시 (실적 수치 아님)
 * - 검수 모드에서는 미확인 수치를 TODO_VERIFY 로 표시
 */
export function Numbers({ tone = "mist" }: { tone?: "mist" | "white" }) {
  const verified = companyMetrics.filter((m) => isVerified(m.value));
  const useMetrics = verified.length >= 2;

  return (
    <section className={cn("section-y", tone === "mist" ? "bg-mist" : "bg-white")} aria-labelledby="numbers-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-steel">{useMetrics ? "By the numbers" : "Operating standard"}</p>
            <h2 id="numbers-title" className="t-h2 mt-5">
              {useMetrics ? "숫자로 보는 다짐" : "매주 가고, 매달 보고합니다."}
            </h2>
          </div>
          {!useMetrics && <p className="t-small max-w-sm text-muted">현장을 맡긴 뒤에도 본사가 정해진 주기로 점검하고 기록합니다.</p>}
        </div>

        <dl className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {useMetrics
            ? verified.map((m, i) => (
                <Reveal key={m.en} delay={i * 0.08} className="border-t border-ink pb-10 pt-6">
                  <dt className="eyebrow text-steel">{m.en}</dt>
                  <dd className="mt-8">
                    <CountUp value={String(m.value)} className="font-display text-[4.5rem] font-semibold leading-none tracking-[-0.05em] lg:text-[6rem]" />
                    <span className="ml-1 text-lg font-semibold">{m.unit}</span>
                    <p className="mt-3 text-body">{m.ko}</p>
                  </dd>
                </Reveal>
              ))
            : operatingStandards.map((s, i) => (
                <Reveal key={s.big} delay={i * 0.08} className="border-t border-ink pb-10 pt-6">
                  <dt className="t-h4">{s.ko}</dt>
                  <dd>
                    <p className="display mt-8 text-[3.5rem] normal-case lg:text-[4rem] xl:text-[5rem]">{s.big}</p>
                    <p className="t-small mt-5 text-body">{s.body}</p>
                  </dd>
                </Reveal>
              ))}
        </dl>

        {showPhotoSlots && !useMetrics && (
          <div className="mt-10 border border-dashed border-line-strong p-5 text-sm text-muted" data-review="todo-verify">
            <p className="font-semibold text-ink">검수용 · TODO_VERIFY 회사 수치 (방문자에게는 보이지 않음)</p>
            <p className="mt-2">
              {companyMetrics.map((m) => `${m.en}(${m.ko}): ${isVerified(m.value) ? m.value : "TODO_VERIFY"}`).join(" / ")} — data/showroom.ts 에서 입력하면 2개 이상 확인 시 이 섹션이 회사 수치로 바뀝니다.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
