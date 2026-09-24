import { ArrowDown, ArrowRight, RotateCcw } from "lucide-react";
import { hilinkFlow } from "@/data/hilink";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * RESIDENT → HILINK APP → RESERVATION/ACCESS/PAYMENT → DAGYM OPERATION CENTER → DATA & MANAGEMENT
 * 데스크톱은 가로, 모바일은 세로 흐름.
 */
export function FlowDiagram() {
  return (
    <div>
      <ol className="grid gap-2 lg:grid-cols-[repeat(5,minmax(0,1fr))] lg:gap-0">
        {hilinkFlow.map((step, i) => {
          const isOps = step.en.startsWith("DAGYM");
          const isCore = i === 1 || i === 2;
          return (
            <Reveal as="li" key={step.en} delay={i * 90} className="relative flex flex-col items-stretch lg:flex-row lg:items-center">
              <div
                className={cn(
                  "relative flex-1 border p-6",
                  isOps
                    ? "border-accent-light/50 bg-accent/10"
                    : isCore
                      ? "border-signal/50 bg-signal/10"
                      : "border-white/12 bg-white/[0.03]",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="t-num text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <Icon name={step.icon} className={cn("size-6", isOps ? "text-accent-light" : "text-signal-light")} />
                </div>
                <p className="t-en mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white">{step.en}</p>
                <p className="mt-1 text-[0.9375rem] font-semibold text-white/85">{step.ko}</p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-white/55">{step.body}</p>
              </div>
              {i < hilinkFlow.length - 1 && (
                <div className="flex items-center justify-center py-1 text-white/35 lg:w-6 lg:py-0" aria-hidden>
                  <ArrowDown className="size-4 lg:hidden" />
                  <ArrowRight className="hidden size-4 lg:block" />
                </div>
              )}
            </Reveal>
          );
        })}
      </ol>
      <Reveal delay={400}>
        <div className="mt-6 flex items-center justify-center gap-3 border border-dashed border-white/15 py-4 text-[0.875rem] text-white/60">
          <RotateCcw className="size-4 text-accent-light" aria-hidden />
          데이터 분석 결과는 다시 현장 운영과 입주민 서비스 개선으로 돌아갑니다.
        </div>
      </Reveal>
    </div>
  );
}
