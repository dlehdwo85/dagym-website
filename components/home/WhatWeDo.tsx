import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pillars } from "@/data/corporate";
import { photos } from "@/data/photos";
import { hasPhoto } from "@/lib/photos";
import { cn } from "@/lib/cn";

/** 3개 사업 축 — 사업마다 대형 에디토리얼 행 */
export function WhatWeDo() {
  return (
    <section className="section-y bg-white" aria-labelledby="what-title">
      <div className="container-x">
        <SectionHeader
          id="what-title"
          eyebrow="사업 구조"
          en="What we do"
          title={"운영 · 기술 · 공간,\n세 가지 축으로 커뮤니티를 맡습니다."}
        />
        <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
          {pillars.map((p, i) => {
            const img = hasPhoto(p.photo) ? photos[p.photo] : undefined;
            const isApp = p.photo === "hilink-app";
            const flip = i % 2 === 1;
            return (
              <article key={p.no} className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14" aria-labelledby={`pillar-${p.no}`}>
                <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
                  {img &&
                    (isApp ? (
                      <ClipReveal className="flex aspect-[4/3] items-end justify-center rounded-[4px] bg-mist pt-10">
                        <div className="relative h-full w-[42%] max-w-[15rem] overflow-hidden rounded-t-[8px] border border-b-0 border-line-strong bg-white shadow-[0_-10px_40px_-20px_rgba(15,27,45,0.35)]">
                          <Image src={img.file} alt={img.alt} fill sizes="240px" className="object-cover object-top" />
                        </div>
                      </ClipReveal>
                    ) : (
                      <ClipReveal className="aspect-[4/3] rounded-[4px] bg-mist">
                        <Image src={img.file} alt={img.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                      </ClipReveal>
                    ))}
                </div>
                <Reveal className="lg:col-span-6">
                  <p className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent">{p.no}</span>
                    <span className="label-en text-steel">{p.en}</span>
                  </p>
                  <h3 id={`pillar-${p.no}`} className="t-h2 mt-4">
                    {p.title}
                  </h3>
                  <p className="t-lead mt-5 text-body">{p.lead}</p>
                  <ul className="mt-7 grid gap-x-8 border-t border-line sm:grid-cols-2">
                    {p.items.map((it) => (
                      <li key={it} className="t-small border-b border-line py-3 text-ink">
                        {it}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-7 flex flex-col gap-2.5">
                    {p.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="group inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy hover:text-accent">
                          {l.label}
                          <ArrowRight className="btn-arrow size-4" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
