import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HomeHilink() {
  return (
    <section className="section-y bg-paper" aria-labelledby="home-hilink-title">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
        <div>
          <p className="t-label text-brand">HILINK</p>
          <h2 id="home-hilink-title" className="t-h2 mt-3">운영에 필요한 기술도<br />다짐이 직접 만듭니다.</h2>
          <p className="mt-5 max-w-xl text-body">출입, 예약, 이용료 정산까지 하나의 시스템으로 관리합니다.</p>
          <Link href="/hilink" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-dark">HILINK 자세히 보기 <ArrowUpRight className="size-5" aria-hidden /></Link>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4" aria-label="HILINK 주요 기능">
          {["출입", "예약", "정산"].map((name, index) => (
            <div key={name} className="flex aspect-square items-end border border-line bg-white p-4 sm:p-6">
              <span className="text-base font-semibold sm:text-xl"><span className="mb-2 block text-xs text-brand">0{index + 1}</span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
