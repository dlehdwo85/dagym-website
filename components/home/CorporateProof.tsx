import { Reveal } from "@/components/motion/Reveal";
import { companyFacts, proofItems, publicFacts } from "@/data/corporate";
import { showPhotoSlots } from "@/lib/photos";

/** 기업 신뢰 근거 — 공개 가능한 구조적 사실만. 실적 수치는 확인 후 추가 */
export function CorporateProof() {
  const facts = publicFacts();
  const pending = companyFacts.filter((f) => f.status !== "PUBLIC_SAFE");
  return (
    <section className="bg-mist" aria-labelledby="proof-title">
      <div className="container-x py-16 lg:py-20">
        <h2 id="proof-title" className="sr-only">
          다짐의 운영 기반
        </h2>
        <dl className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.06} className="bg-white p-7 lg:p-8">
              <dt className="sr-only">{p.unit}</dt>
              <dd>
                <p className="flex items-baseline gap-1.5 text-navy">
                  <span className="text-[2.75rem] font-bold leading-none tracking-[-0.04em]">{p.value}</span>
                  <span className="text-lg font-bold">{p.unit}</span>
                </p>
                <p className="t-small mt-4 text-body">{p.label}</p>
              </dd>
            </Reveal>
          ))}
        </dl>
        {facts.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-body">
            {facts.map((f) => (
              <div key={f.key} className="flex gap-2">
                <dt className="text-muted">{f.label}</dt>
                <dd className="font-semibold text-ink">{String(f.value)}</dd>
              </div>
            ))}
          </dl>
        )}
        {showPhotoSlots && (
          <p className="mt-6 border border-dashed border-line-strong bg-white p-4 text-sm text-muted" data-review="todo-verify">
            검수용 · TODO_VERIFY — {pending.map((f) => f.label).join(" · ")} (data/corporate.ts › companyFacts). 확인 후 PUBLIC_SAFE 로 바꾸면 이 줄에 표시됩니다.
          </p>
        )}
      </div>
    </section>
  );
}
