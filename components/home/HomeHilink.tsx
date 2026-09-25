import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** HILINK — 운영을 지원하는 기술로 한 줄 소개. 기능 설명은 HILINK 페이지로. */
export function HomeHilink() {
  return (
    <section className="border-t border-line bg-white py-14 lg:py-20" aria-labelledby="home-hilink-title">
      <div className="container-x flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="t-label text-navy">HILINK</p>
          <h2 id="home-hilink-title" className="t-h3 mt-2">
            출입 · 예약 · 이용료 정산은 다짐의 운영 시스템 HILINK로 관리합니다.
          </h2>
        </div>
        <Link href="/hilink" className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-ink hover:text-muted">
          HILINK 알아보기 <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
