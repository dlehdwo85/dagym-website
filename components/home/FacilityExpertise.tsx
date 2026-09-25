import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { facilityExpertise } from "@/data/corporate";
import { photos } from "@/data/photos";
import { hasPhoto, showPhotoSlots } from "@/lib/photos";

/** 시설별 운영 전문성 — 12종 */
export function FacilityExpertise() {
  const withPhoto = facilityExpertise.filter((f) => f.photo && hasPhoto(f.photo)).slice(0, 4);
  return (
    <section className="section-y bg-white" aria-labelledby="fac-title">
      <div className="container-x">
        <SectionHeader
          id="fac-title"
          eyebrow="시설별 전문성"
          en="Facility expertise"
          title={"헬스장만 운영하는 회사가 아닙니다."}
          description="운동 시설부터 독서실 · 키즈카페 · 카페 · 게스트하우스까지, 시설마다 운영 기준과 관리 주기를 따로 둡니다."
        />
        {withPhoto.length >= 3 && (
          <ul className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {withPhoto.map((f, i) => (
              <li key={f.ko}>
                <ClipReveal className="aspect-[4/3] rounded-[4px] bg-mist" delay={i * 0.06}>
                  <Image src={photos[f.photo!].file} alt={photos[f.photo!].alt} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
                </ClipReveal>
                <p className="mt-2 text-sm text-muted">{f.ko}</p>
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facilityExpertise.map((f, i) => (
            <Reveal as="li" key={f.ko} delay={(i % 4) * 0.04} className="bg-white p-6">
              <p className="label-en text-steel">{f.en}</p>
              <p className="t-h4 mt-1.5">{f.ko}</p>
              <ul className="t-small mt-3 space-y-1 text-body">
                {f.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
        {showPhotoSlots && (
          <p className="mt-6 border border-dashed border-line-strong p-4 text-sm text-muted" data-review="image-required">
            검수용 · IMAGE_REQUIRED — 수영장 · 사우나 · 키즈카페 · 게스트하우스 · 다목적실 · 인포메이션 데스크 실제 운영 사진 (긴 변 2000px 이상)
          </p>
        )}
      </div>
    </section>
  );
}
