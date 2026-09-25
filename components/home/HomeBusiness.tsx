import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessAreas } from "@/data/business";

/** 사업영역 — 사진 없이 제목 한 줄 목록 (사진은 위 섹션에서 한 번만 사용) */
export function HomeBusiness() {
  return (
    <section className="border-t border-line bg-white py-16 lg:py-24" aria-labelledby="home-business-title">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
        <h2 id="home-business-title" className="t-h2 lg:col-span-4">
          사업영역
        </h2>
        <ul className="border-t border-ink lg:col-span-8">
          {businessAreas.map((b) => (
            <li key={b.slug} className="border-b border-line">
              <Link href={b.href} className="group flex items-center justify-between gap-6 py-5">
                <span className="t-h4">{b.title}</span>
                <ArrowRight className="size-5 shrink-0 text-muted transition-colors group-hover:text-ink" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
