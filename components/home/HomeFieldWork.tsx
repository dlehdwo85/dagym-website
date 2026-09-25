import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const work = [
  { title: "상주 인력", detail: "안내 · 트레이너 · 강사" },
  { title: "시설 관리", detail: "청결 · 기구 · 안전 점검" },
  { title: "본사 관리", detail: "정기 방문 · 운영 보고" },
];

export function HomeFieldWork() {
  return (
    <section className="section-y bg-paper" aria-labelledby="fieldwork-title">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <Reveal className="visual-frame relative aspect-[4/3] overflow-hidden bg-paper-deep sm:aspect-[16/10]">
          <Image src="/images/facilities/gx.jpg" alt="기존 다짐 홈페이지의 커뮤니티 GX 시설 영상 장면" fill sizes="(min-width: 1024px) 55vw, 100vw" className="visual-image object-cover" />
        </Reveal>
        <div>
          <SectionHeader label="운영 방식" id="fieldwork-title" title={"현장은 사람이,\n운영은 기준이 지킵니다."} description="현장 직원과 본사 담당자가 함께 시설을 관리합니다." />
          <dl className="mt-9 border-t border-line-strong">
            {work.map((item) => (
              <div key={item.title} className="flex justify-between gap-6 border-b border-line py-4 text-sm sm:text-base">
                <dt className="font-semibold">{item.title}</dt><dd className="text-right text-body">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
