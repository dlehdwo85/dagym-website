import { businessAreas } from "@/data/business";
import { BusinessCard } from "@/components/sections/BusinessCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function BusinessSection() {
  return (
    <section className="section-y bg-white" aria-labelledby="business-title">
      <div className="container-x">
        <SectionHeader
          index="01"
          eyebrow="Our Business"
          id="business-title"
          title={"공간에 맞는 운영을\n설계합니다."}
          description="아파트 커뮤니티, 스포츠시설, 복합시설까지. 다짐은 공간의 유형과 이용자에 맞춰 인력 · 프로그램 · 시스템을 설계하고 직접 운영합니다."
          align="split"
          action={<ButtonLink href="/business" variant="outline">사업영역 전체 보기</ButtonLink>}
        />
        <ul className="mt-14 grid gap-2 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-3">
          {businessAreas.map((area, i) => (
            <Reveal as="li" key={area.slug} delay={(i % 3) * 80} className={cn(i === 0 && "sm:col-span-2 lg:col-span-1")}>
              <BusinessCard area={area} className="h-full lg:min-h-[28rem]" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
