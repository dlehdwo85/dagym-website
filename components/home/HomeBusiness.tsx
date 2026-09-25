import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { businessAreas } from "@/data/business";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const featured = [
  { area: businessAreas[0], image: "/images/facilities/cafe.jpg", alt: "기존 다짐 홈페이지의 커뮤니티 카페 영상 장면" },
  { area: businessAreas[1], image: "/images/facilities/fitness.jpg", alt: "기존 다짐 홈페이지의 피트니스 시설 영상 장면" },
];

export function HomeBusiness() {
  return (
    <section className="section-y bg-white" aria-labelledby="home-business-title">
      <div className="container-x">
        <SectionHeader label="사업영역" id="home-business-title" title="공간에 맞는 운영을 설계합니다." />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-12 lg:gap-10">
          {featured.map(({ area, image, alt }, index) => (
            <Reveal key={area.slug} delay={index * 120}>
              <Link href={area.href} className="group block" aria-label={`${area.title} 자세히 보기`}>
                <div className="visual-frame relative aspect-[4/3] overflow-hidden bg-paper-deep sm:aspect-[5/3]">
                  <Image src={image} alt={alt} fill sizes="(min-width: 768px) 48vw, 100vw" className="visual-image object-cover" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <h3 className="t-h3">{area.title}</h3>
                    <p className="mt-2 text-body">{index === 0 ? "입주민 응대부터 시설 관리와 프로그램까지" : "전문 인력과 회원 관리로 안정적인 시설 운영"}</p>
                  </div>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6 text-sm font-medium text-body">
          {businessAreas.slice(2).map((area) => (
            <Link key={area.slug} href={area.href} className="hover:text-brand">{area.title} ↗</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
