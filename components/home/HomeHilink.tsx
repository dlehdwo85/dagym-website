import { hilinkFunctions } from "@/data/hilink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** HILINK 가 현장 운영을 어떻게 지원하는지 — 실제 앱 화면이 있을 때만 화면을 보여줍니다 */
export function HomeHilink() {
  const showPhoto = photoVisible("hilink-app");
  const items = hilinkFunctions.slice(0, 4);
  return (
    <section className="section-y border-t border-line bg-white" aria-labelledby="home-hilink-title">
      <div className={cn("container-x grid gap-12", showPhoto && "lg:grid-cols-12 lg:gap-16")}>
        <div className={cn(showPhoto && "lg:col-span-7")}>
          <SectionHeader
            label="HILINK"
            id="home-hilink-title"
            title={"현장 운영을 돕는\n다짐의 출입 · 예약 · 회원관리 시스템"}
            description="HILINK는 다짐이 직접 만들어 운영 현장에서 쓰는 시스템입니다. 입주민은 앱으로 얼굴을 등록하고 시설을 예약하며, 관리사무소는 이용료 정산과 이용 현황을 한 화면에서 확인합니다."
          />
          <dl className={cn("mt-12 grid gap-x-10 border-t border-ink", !showPhoto && "sm:grid-cols-2")}>
            {items.map((f) => (
              <div key={f.title} className="border-b border-line py-5">
                <dt className="font-semibold">{f.title}</dt>
                <dd className="mt-1 text-[0.9375rem] leading-relaxed text-body">{f.body}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href="/hilink" variant="secondary" className="mt-10">
            HILINK 기능 자세히 보기
          </ButtonLink>
        </div>
        {showPhoto && (
          <div className="lg:col-span-5">
            <Photo id="hilink-app" className="mx-auto aspect-[9/19] w-full max-w-[20rem]" sizes="320px" />
          </div>
        )}
      </div>
    </section>
  );
}
