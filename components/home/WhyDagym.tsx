import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { whyDagym } from "@/data/corporate";

/** 왜 다짐인가 — 근거 중심 6가지 */
export function WhyDagym() {
  return (
    <section className="section-y bg-white" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeader id="why-title" eyebrow="왜 다짐인가" en="Why DAGYM" title={"입찰과 장기 운영을\n맡길 수 있는 이유"} />
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {whyDagym.map((w, i) => (
            <Reveal as="li" key={w.en} delay={(i % 3) * 0.06} className="border-t-2 border-navy pt-6">
              <p className="flex items-center gap-3">
                <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="label-en text-steel">{w.en}</span>
              </p>
              <h3 className="t-h3 mt-3">{w.title}</h3>
              <p className="t-small mt-3 text-body">{w.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
