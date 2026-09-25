import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { operationSteps } from "@/data/corporate";
import { cn } from "@/lib/cn";

/** 운영 시스템 01 – 08 */
export function OperationSystem({ tone = "mist", title }: { tone?: "mist" | "white"; title?: string }) {
  return (
    <section className={cn("section-y", tone === "mist" ? "bg-mist" : "bg-white")} aria-labelledby="system-title">
      <div className="container-x">
        <SectionHeader
          id="system-title"
          eyebrow="운영 시스템"
          en="Operation system"
          title={title ?? "현장 진단부터 개선까지,\n여덟 단계로 운영합니다."}
          description="현장이 바뀌어도 같은 순서와 기준으로 운영합니다. 각 단계는 체크리스트와 HILINK 기록으로 남습니다."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {operationSteps.map((s, i) => (
            <Reveal as="li" key={s.no} delay={(i % 4) * 0.05} className="relative bg-white p-6 lg:p-7">
              <p className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-[4px] bg-navy text-sm font-bold text-white">{s.no}</span>
                {i < operationSteps.length - 1 && <span className="h-px flex-1 bg-line-strong" aria-hidden />}
              </p>
              <h3 className="t-h4 mt-5">{s.title}</h3>
              <p className="t-small mt-2 text-body">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
