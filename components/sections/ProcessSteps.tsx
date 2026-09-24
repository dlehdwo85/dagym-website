import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Step = { title: string; body: string };

/** 운영 프로세스 — 데스크톱은 가로 타임라인, 모바일은 세로 타임라인 */
export function ProcessSteps({ steps, tone = "light" }: { steps: Step[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const cols = steps.length >= 6 ? "lg:grid-cols-6" : steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <ol className={cn("relative grid gap-0 sm:grid-cols-2", cols)}>
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 70} className="relative">
          <div
            className={cn(
              "relative h-full border-l py-2 pb-10 pl-8 sm:border-l-0 sm:border-t sm:pl-0 sm:pr-6 sm:pt-8",
              dark ? "border-white/15" : "border-mist-200",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute -left-[5px] top-3 size-[9px] rounded-full sm:-top-[5px] sm:left-0",
                i === steps.length - 1 ? "bg-accent" : dark ? "bg-white" : "bg-ink",
              )}
            />
            <p className={cn("t-num text-sm font-semibold", dark ? "text-accent-light" : "text-accent")}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className={cn("t-h4 mt-3", dark ? "text-white" : "text-ink")}>{step.title}</h3>
            <p className={cn("mt-3 text-[0.9375rem] leading-relaxed", dark ? "text-white/60" : "text-mist-600")}>
              {step.body}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
