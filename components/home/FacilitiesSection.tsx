import { facilities } from "@/data/facilities";
import { FacilityGrid } from "@/components/sections/FacilityGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FacilitiesSection() {
  return (
    <section className="section-y bg-white" aria-labelledby="facilities-title">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="Operating Facilities"
          id="facilities-title"
          title={"운동 공간부터 생활 공간까지,\n커뮤니티 전체를 운영합니다."}
          description="피트니스와 골프만이 아닙니다. 독서실, 도서관, 게스트하우스, 키즈카페, 라운지까지 단지 안의 모든 공용 공간을 같은 기준으로 운영합니다."
          align="split"
        />
        <div className="mt-14 lg:mt-20">
          <FacilityGrid items={facilities} />
        </div>
      </div>
    </section>
  );
}
