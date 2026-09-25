import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { facilityExpertise } from "@/data/corporate";

const flow = [
  { no: "01", title: "현장을 운영합니다", body: "시설별 전문 인력을 배치하고 프로그램과 유지관리를 맡습니다.", href: "/business", link: "사업영역" },
  { no: "02", title: "본사가 관리합니다", body: "5개 전문 부서와 본사 운영 담당이 매주 현장을 점검합니다.", href: "/company#hq", link: "본사 운영체계" },
  { no: "03", title: "공간을 개선합니다", body: "기구 보강, 스크린골프 전환, 유휴 공간 활용으로 시설을 바꿉니다.", href: "/cases", link: "운영 개선 사례" },
  { no: "04", title: "HILINK가 기록하고 연결합니다", body: "출입 · 예약 · 정산 · 보고를 자체 플랫폼으로 관리합니다.", href: "/hilink", link: "HILINK" },
];

/** 회사 소개 문장 + 운영 → 관리 → 개선 → 기술 순서 */
export function CompanyStatement() {
  return (
    <section className="border-t border-line bg-mist" aria-labelledby="statement-title">
      <div className="container-x py-20 lg:py-28">
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3 lg:pt-2">다짐 소개</p>
          <div className="lg:col-span-9">
            <h2 id="statement-title" className="t-section text-navy sm:whitespace-pre-line">
              {"다짐은 커뮤니티 공간의 운영 전체를 맡고,\n그 운영을 자체 기술로 관리하는 전문기업입니다."}
            </h2>
            <p className="t-lead mt-6 max-w-3xl text-body">
              {facilityExpertise.map((f) => f.ko).join(" · ")}까지 — 공동주택과 기업 · 호텔의 커뮤니티 시설을 운영합니다.
            </p>
          </div>
        </Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {flow.map((f, i) => (
            <Reveal as="li" key={f.no} delay={i * 0.06} className="flex flex-col bg-white p-7">
              <p className="text-sm font-bold text-accent">{f.no}</p>
              <h3 className="t-h4 mt-2">{f.title}</h3>
              <p className="t-small mt-2 text-body">{f.body}</p>
              <Link href={f.href} className="group mt-auto inline-flex items-center gap-2 pt-5 text-[0.9375rem] font-semibold text-navy">
                {f.link} <ArrowRight className="btn-arrow size-4" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
