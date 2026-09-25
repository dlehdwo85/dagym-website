import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { OperatingModel } from "@/components/home/OperatingModel";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { businessAreas } from "@/data/business";
import { businessStory, operatingModel } from "@/data/showroom";
import { photos } from "@/data/photos";
import { hasPhoto } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "사업영역",
  description:
    "아파트 커뮤니티 위탁운영, 스포츠 · 피트니스 시설 운영, 기업 · 호텔 커뮤니티 운영, 운영 컨설팅 · 시설 개선, 운동기구 · 스크린골프 납품.",
  path: "/business",
});

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Business"
        title={"공간은 달라도\n운영의 기준은 같습니다."}
        description="아파트 커뮤니티센터, 스포츠시설, 기업 · 호텔 공용 시설까지. 사람을 배치하고, HILINK로 기록하고, 매달 보고합니다."
        breadcrumbs={[{ name: "사업영역", path: "/business" }]}
      />

      <section aria-label="사업영역 목록" className="bg-white">
        <ol>
          {businessAreas.map((b, i) => {
            const story = businessStory[b.slug];
            const img = story && hasPhoto(story.photo) ? photos[story.photo] : undefined;
            const flip = i % 2 === 1;
            return (
              <li key={b.slug} className="border-b border-line">
                <Link href={b.href} className="group container-x grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-28">
                  <div className={cn("lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
                    <p className="flex items-baseline gap-4">
                      <span className="font-display text-sm text-steel">{b.no}</span>
                      <span className="eyebrow text-steel">{story?.en}</span>
                    </p>
                    <h2 className="t-h1 mt-6 transition-colors duration-500 group-hover:text-navy">{b.title}</h2>
                    <p className="t-lead mt-6 max-w-xl text-body">{b.summary}</p>
                    <ul className="mt-8 border-t border-line">
                      {b.points.map((p) => (
                        <li key={p} className="t-small border-b border-line py-3 text-body">
                          {p}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-0.5 font-semibold">
                      자세히 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                    </span>
                  </div>
                  <div className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
                    {img ? (
                      <ClipReveal className="img-zoom aspect-[4/5] max-h-[720px] bg-mist" from={flip ? "left" : "right"}>
                        <Image src={img.file} alt={img.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                      </ClipReveal>
                    ) : (
                      <Reveal className="hidden aspect-[4/5] items-center justify-center bg-charcoal lg:flex">
                        <span className="display text-[9rem] text-white/8">{b.no}</span>
                      </Reveal>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <OperatingModel steps={operatingModel} tone="mist" />
      <CTASection />
    </>
  );
}
