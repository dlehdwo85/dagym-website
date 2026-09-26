import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { operationSteps } from "@/data/corporate";
import { photoRef } from "@/lib/photos";
import { cn } from "@/lib/cn";

/** HOW WE OPERATE — 운영 시스템 01 – 08 (+ 사람 없는 운영 공간 이미지 1장) */
export function OperationSystem({ tone = "mist", title, withVisuals = false }: { tone?: "mist" | "white"; title?: string; withVisuals?: boolean }) {
  const visual = withVisuals ? photoRef("visual-operations-desk") : undefined;
  return (
    <section className={cn("section-y", tone === "mist" ? "bg-mist" : "bg-white")} aria-labelledby="system-title">
      <div className="container-x">
        <SectionHeader
          id="system-title"
          eyebrow="운영 방식"
          en="How we operate"
          title={title ?? "현장 진단부터 개선까지,\n여덟 단계로 운영합니다."}
          description="현장이 바뀌어도 같은 순서와 기준으로 운영합니다. 각 단계는 체크리스트와 HILINK 기록으로 남습니다."
        />
        {visual && (
          <ClipReveal className="mt-12 aspect-[16/9] rounded-[4px] bg-fog lg:mt-14 lg:aspect-[21/9]">
            <Image src={visual.src} alt={visual.alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          </ClipReveal>
        )}
        <ol className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
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
