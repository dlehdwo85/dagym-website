import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DemoPhone } from "@/components/hilink/DemoPhone";
import { coreBusinesses, supportingService } from "@/data/corporate";
import { photoRef } from "@/lib/photos";

/**
 * 2대 핵심사업 — Community Operation / HILINK Platform
 * 시설 지원(기구 · 스크린골프)은 하단 한 줄 보조 서비스로만 노출합니다.
 */
export function CoreBusiness({ tone = "white" }: { tone?: "white" | "mist" }) {
  const [ops, platform] = coreBusinesses;
  const opsPhoto = ops.photo ? photoRef(ops.photo) : undefined;
  return (
    <section className={tone === "mist" ? "section-y bg-mist" : "section-y bg-white"} aria-labelledby="core-title">
      <div className="container-x">
        <SectionHeader
          id="core-title"
          eyebrow="핵심사업"
          en="Core business"
          title={"커뮤니티를 운영하고,\n운영 플랫폼을 공급합니다."}
          description="다짐의 핵심사업은 두 가지입니다. 커뮤니티 시설을 직접 위탁운영하고, 그 운영에서 만든 플랫폼 HILINK를 다른 현장에도 구축 · 납품합니다."
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {[ops, platform].map((b) => {
            const isOps = b.no === "01";
            const photo = opsPhoto;
            return (
              <Reveal as="article" key={b.no} className="flex flex-col overflow-hidden rounded-[4px] border border-line bg-white" aria-labelledby={`core-${b.no}`}>
                {isOps ? (
                  photo && (
                    <ClipReveal className="aspect-[16/10] bg-mist">
                      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
                    </ClipReveal>
                  )
                ) : (
                  <div className="relative flex aspect-[16/10] items-start justify-center gap-5 overflow-hidden bg-navy px-6 pt-8 sm:gap-7">
                    <DemoPhone id="home" className="w-[36%] max-w-[12rem]" sizes="(min-width: 1024px) 190px, 36vw" />
                    <DemoPhone id="community" className="w-[36%] max-w-[12rem] translate-y-8" sizes="(min-width: 1024px) 190px, 36vw" />
                    <span className="absolute bottom-3 left-4 text-[11px] text-white/50">HILINK 공개 데모</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7 lg:p-9">
                  <p className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent">CORE {b.no}</span>
                    <span className="label-en text-steel">{b.en}</span>
                  </p>
                  <h3 id={`core-${b.no}`} className="t-h2 mt-3">
                    {b.title}
                  </h3>
                  <p className="t-body mt-4 text-body">{b.lead}</p>
                  <ul className="mt-6 grid gap-x-6 border-t border-line sm:grid-cols-2">
                    {b.items.map((it) => (
                      <li key={it} className="t-small border-b border-line py-3 text-ink">
                        {it}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-col gap-2">
                    {b.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy hover:text-accent">
                          {l.label}
                          <ArrowRight className="btn-arrow size-4" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 보조 서비스 — 한 줄 */}
        <Reveal className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-small text-body">
            <span className="mr-3 text-xs font-bold tracking-[0.08em] text-steel">SUPPORTING SERVICE</span>
            <span className="font-semibold text-ink">{supportingService.title}</span>
            <span className="mx-2 text-line-strong">|</span>
            {supportingService.lead}
          </p>
          <Link href={supportingService.href} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-steel hover:text-navy">
            시설 지원 보기 <ArrowRight className="btn-arrow size-3.5" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
