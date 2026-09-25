import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { portfolio, type PortfolioProject } from "@/data/projects";
import { showPhotoSlots } from "@/lib/photos";
import { cn } from "@/lib/cn";

/** 출처 유형(imageSource)이 지정되고 파일이 있을 때만 이미지 표시 */
function hasImage(p: PortfolioProject) {
  return Boolean(p.imageSource) && fs.existsSync(path.join(process.cwd(), "public", p.image));
}

/** 이미지가 아직 없을 때 — 사진처럼 보이지 않는 절제된 건축 패턴 (가짜 이미지 아님) */
const tones = ["#1d3a60", "#24456d", "#1a3456", "#2a4b73"];
/** 단지마다 다른 실루엣 (추상 패턴) */
const shapes = [
  "polygon(0 30%, 22% 30%, 22% 8%, 44% 8%, 44% 0, 64% 0, 64% 22%, 100% 22%, 100% 100%, 0 100%)",
  "polygon(0 12%, 30% 12%, 30% 34%, 58% 34%, 58% 4%, 100% 4%, 100% 100%, 0 100%)",
  "polygon(0 0, 26% 0, 26% 18%, 52% 18%, 52% 8%, 78% 8%, 78% 28%, 100% 28%, 100% 100%, 0 100%)",
  "polygon(0 20%, 40% 20%, 40% 0, 70% 0, 70% 14%, 100% 14%, 100% 100%, 0 100%)",
];

function PortfolioCard({ p, i, priority }: { p: PortfolioProject; i: number; priority?: boolean }) {
  const img = hasImage(p);
  return (
    <figure className="group">
      <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-[2px]" style={img ? undefined : { backgroundColor: tones[i % tones.length] }}>
        {img ? (
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 80vw"
            className="object-cover"
            style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-x-[14%] bottom-0 top-[24%] transition-transform duration-700 group-hover:scale-[1.03]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
                backgroundSize: "12px 11px",
                backgroundColor: "rgba(255,255,255,0.05)",
                clipPath: shapes[i % shapes.length],
              }}
            />
            {showPhotoSlots && (
              <span className="absolute left-2 top-2 rounded-[2px] bg-white/90 px-2 py-1 text-[11px] font-semibold text-muted" data-review="image-required">
                IMAGE_REQUIRED · {p.image}
              </span>
            )}
          </>
        )}
      </div>
      <figcaption className="mt-4 text-[1.125rem] font-semibold tracking-[-0.02em] text-ink lg:text-[1.1875rem]">{p.name}</figcaption>
    </figure>
  );
}

/**
 * 운영실적 — 단지 이미지 + 단지명만.
 * 데스크톱: 정적인 4열 그리드 (기업형) / 모바일: 1.2장 보이는 가로 스냅 스크롤
 */
export function OurOperations({ showLink = true, asPage = false }: { showLink?: boolean; asPage?: boolean }) {
  if (portfolio.length === 0) return null;
  return (
    <section className={cn("bg-white", asPage ? "pb-24 pt-14 lg:pb-32" : "section-y border-t border-line")} aria-labelledby={asPage ? undefined : "ops-title"} aria-label={asPage ? "운영 단지" : undefined}>
      {!asPage && (
        <div className="container-x flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <p className="flex items-center gap-3">
              <span className="eyebrow">운영실적</span>
              <span className="label-en text-steel">Our operations</span>
            </p>
            <h2 id="ops-title" className="t-section mt-4">
              다짐이 운영해 온 공간입니다.
            </h2>
            <p className="t-lead mt-5 text-body">다양한 규모와 형태의 공동주택 커뮤니티를 현장에서 운영해왔습니다.</p>
          </Reveal>
          {showLink && (
            <Link href="/projects" className="group inline-flex shrink-0 items-center gap-2 font-semibold text-navy">
              운영실적 전체 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          )}
        </div>
      )}
      <ul
        className={cn(
          "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 md:mx-auto md:grid md:max-w-[80rem] md:grid-cols-3 md:gap-x-6 md:gap-y-12 md:overflow-visible md:px-8 lg:grid-cols-4 lg:gap-x-8 xl:px-10",
          !asPage && "mt-12 lg:mt-16",
        )}
        aria-label="운영 단지 목록"
      >
        {portfolio.map((p, i) => (
          <li key={p.slug} className="w-[78vw] max-w-[22rem] shrink-0 snap-start md:w-auto md:max-w-none">
            <Reveal delay={(i % 4) * 0.05}>
              <PortfolioCard p={p} i={i} priority={asPage && i < 4} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
