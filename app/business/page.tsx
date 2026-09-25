import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { OperationSystem } from "@/components/home/OperationSystem";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { businessAreas } from "@/data/business";
import { businessPhoto, pillars } from "@/data/corporate";
import { photos } from "@/data/photos";
import { hasPhoto } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "사업영역",
  description:
    "공동주택 커뮤니티 위탁운영, 스포츠 · 피트니스 시설 운영, 기업 · 호텔 · 복합시설 커뮤니티 운영, 시설 운영 컨설팅 · 활성화, 시설 개선 · 운동기구 · 스크린골프.",
  path: "/business",
});

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="사업영역"
        en="Business"
        title={"커뮤니티 공간의 운영 전체를\n한 회사가 맡습니다."}
        description="커뮤니티 운영 · HILINK 운영 플랫폼 · 시설 개선의 세 축으로 공동주택, 스포츠시설, 기업 · 호텔 공용 시설을 운영합니다."
        breadcrumbs={[{ name: "사업영역", path: "/business" }]}
      />

      {/* 3개 사업 축 요약 */}
      <section className="border-b border-line bg-white" aria-label="사업 축">
        <div className="container-x"><ul className="grid gap-px bg-line md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.no} className="bg-white py-8 md:px-6 md:first:pl-0">
              <p className="text-sm font-bold text-accent">{p.no}</p>
              <p className="t-h4 mt-1">{p.title}</p>
              <p className="t-small mt-2 text-body">{p.lead}</p>
            </li>
          ))}
        </ul></div>
      </section>

      <section aria-label="사업영역 목록" className="bg-white">
        <ol className="container-x">
          {businessAreas.map((b) => {
            const pid = businessPhoto[b.slug];
            const img = pid && hasPhoto(pid) ? photos[pid] : undefined;
            return (
              <li key={b.slug} className="border-b border-line last:border-0">
                <Link href={b.href} className="group grid gap-8 py-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">
                  <Reveal className="lg:col-span-7">
                    <p className="text-sm font-bold text-accent">{b.no}</p>
                    <h2 className="t-h2 mt-2 transition-colors group-hover:text-navy">{b.title}</h2>
                    <p className="t-lead mt-4 max-w-2xl text-body">{b.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {b.points.map((p) => (
                        <li key={p} className="rounded-[4px] bg-mist px-3 py-1.5 text-sm text-body">
                          {p}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-7 inline-flex items-center gap-2 font-semibold text-navy">
                      자세히 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                    </span>
                  </Reveal>
                  <div className="lg:col-span-5">
                    {img && (
                      <ClipReveal className="img-zoom aspect-[4/3] rounded-[4px] bg-mist">
                        <Image src={img.file} alt={img.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
                      </ClipReveal>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <OperationSystem />
      <CTASection />
    </>
  );
}
