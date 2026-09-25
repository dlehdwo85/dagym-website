import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { photos, type PhotoId } from "@/data/photos";
import { hasPhoto, showPhotoSlots } from "@/lib/photos";
import { cn } from "@/lib/cn";

/**
 * 운영 시설 — 비율이 다른 에디토리얼 그리드.
 * 사진 출처가 확인되지 않았으므로 시설 유형만 표기하고 특정 현장으로 표기하지 않습니다.
 * 타일 폭은 원본 해상도(약 950–1070px)를 넘지 않도록 잡았습니다.
 */
const tiles: { id: PhotoId; en: string; ko: string; cls: string; ratio: string }[] = [
  { id: "facility-fitness", en: "Fitness", ko: "헬스장", cls: "lg:col-span-7", ratio: "aspect-[4/3]" },
  { id: "facility-golf", en: "Golf", ko: "골프연습장", cls: "lg:col-span-5 lg:mt-32", ratio: "aspect-[4/5]" },
  { id: "facility-gx", en: "Pilates · GX", ko: "필라테스 · GX", cls: "lg:col-span-4", ratio: "aspect-square" },
  { id: "facility-library", en: "Study Room", ko: "독서실", cls: "lg:col-span-4 lg:mt-24", ratio: "aspect-[3/4]" },
  { id: "facility-cafe", en: "Cafe", ko: "카페", cls: "lg:col-span-4 lg:-mt-12", ratio: "aspect-[4/5]" },
];

/** 아직 사진이 없는 시설 — 검수 모드에서만 IMAGE_REQUIRED 로 표시 */
const required = ["수영장", "사우나", "게스트하우스", "키즈카페", "인포메이션 데스크", "현장 직원"];

export function FacilityGrid({ title = "운영하는 공간", eyebrow = "Operating facilities" }: { title?: string; eyebrow?: string }) {
  const visible = tiles.filter((t) => hasPhoto(t.id));
  if (visible.length < 3 && !showPhotoSlots) return null;

  return (
    <section className="section-y bg-white" aria-labelledby="facility-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader id="facility-title" eyebrow={eyebrow} title={title} />
          <p className="t-small max-w-xs text-muted">시설 유형별 예시 사진입니다. 현장 공개 동의가 확인된 사진부터 현장명을 함께 표기합니다.</p>
        </div>
        <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
          {visible.map((t, i) => (
            <li key={t.id} className={cn("group", t.cls)}>
              <ClipReveal className={cn("img-zoom bg-mist", t.ratio)} delay={(i % 3) * 0.1}>
                <Image src={photos[t.id].file} alt={photos[t.id].alt} fill sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </ClipReveal>
              <p className="mt-4 flex items-baseline justify-between border-b border-line pb-3">
                <span className="text-lg font-semibold">{t.ko}</span>
                <span className="eyebrow text-steel">{t.en}</span>
              </p>
            </li>
          ))}
        </ul>
        {showPhotoSlots && (
          <div className="mt-16 border border-dashed border-line-strong p-5 text-sm text-muted" data-review="image-required">
            <p className="font-semibold text-ink">검수용 · IMAGE_REQUIRED (방문자에게는 보이지 않음)</p>
            <p className="mt-2">{required.join(" · ")} — 실제 운영 현장 사진, 긴 변 2000px 이상. 첫 화면용은 2400px 이상 또는 영상(public/videos/hero.mp4).</p>
          </div>
        )}
      </div>
    </section>
  );
}
