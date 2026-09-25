import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { homeFacilities } from "@/data/home";

/** 운영 시설 — 사진과 시설명만. 설명은 상세 페이지로. */
export function HomeFacilities() {
  const items = homeFacilities.filter((f) => photoVisible(f.photo));
  if (items.length === 0) return null;
  return (
    <section className="border-t border-line bg-white py-16 lg:py-24" aria-labelledby="home-facilities-title">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="home-facilities-title" className="t-h2">
            운영하는 시설
          </h2>
          <Link href="/business/apartment-community" className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-muted">
            위탁운영 범위 <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 lg:mt-10 lg:grid-cols-4 lg:gap-x-5">
          {items.map((f) => (
            <li key={f.photo}>
              <figure>
                <Photo id={f.photo} className="aspect-[4/3]" sizes="(min-width: 1024px) 25vw, 50vw" />
                <figcaption className="mt-3 text-[0.9375rem] font-semibold">{f.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
