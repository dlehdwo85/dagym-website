import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessAreas } from "@/data/business";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** 주요 사업영역 — 핵심 2개는 사진과 함께 크게, 나머지는 목록으로 */
export function HomeBusiness() {
  const [main1, main2, ...rest] = businessAreas;
  return (
    <section className="section-y bg-white" aria-labelledby="home-business-title">
      <div className="container-x">
        <SectionHeader
          label="사업영역"
          id="home-business-title"
          title={"아파트 커뮤니티와 스포츠시설을\n직접 운영합니다."}
          description="시설 운영 인력, 프로그램, 시설 관리, 출입 · 예약 시스템까지 필요한 범위를 정해 맡길 수 있습니다."
        />
        <div className="mt-14 space-y-16 lg:mt-20 lg:space-y-24">
          {[main1, main2].map((b, i) => {
            const showPhoto = photoVisible(b.photo);
            return (
              <Reveal key={b.slug}>
                <article className={cn("grid gap-8 lg:gap-14", showPhoto && "lg:grid-cols-2 lg:items-center")}>
                  {showPhoto && (
                    <Photo id={b.photo} className={cn("aspect-[4/3]", i === 1 && "lg:order-2")} />
                  )}
                  <div className={cn(!showPhoto && "grid gap-6 border-t border-ink pt-8 lg:grid-cols-2 lg:gap-14")}>
                    <div>
                      <p className="text-sm font-semibold text-brand">{b.no}</p>
                      <h3 className="t-h2 mt-2">{b.title}</h3>
                      <p className="t-lead mt-4 text-body">{b.summary}</p>
                    </div>
                    <div className={cn(showPhoto && "mt-7")}>
                      <ul className="space-y-2.5">
                        {b.points.map((p) => (
                          <li key={p} className="flex gap-3 text-[1rem] text-ink">
                            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-brand" aria-hidden />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <Link href={b.href} className="mt-7 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-dark">
                        운영 내용 자세히 보기 <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20 lg:mt-28">
          <h3 className="t-h4 text-muted">함께 제공하는 서비스</h3>
          <ul className="mt-4 border-t border-ink">
            {rest.map((b) => (
              <li key={b.slug} className="border-b border-line">
                <Link href={b.href} className="group grid gap-2 py-6 md:grid-cols-[18rem_1fr_auto] md:items-center md:gap-8">
                  <span className="t-h4 group-hover:text-brand">{b.title}</span>
                  <span className="text-[0.9875rem] text-body">{b.summary}</span>
                  <ArrowRight className="hidden size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand md:block" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
