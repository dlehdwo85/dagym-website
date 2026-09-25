import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

type Crumb = { name: string; path: string };

type Props = {
  /** 영문 대문자 라벨 */
  eyebrow?: string;
  /** 큰 영문 디스플레이 (선택) */
  display?: string;
  title: string;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  /** 오른쪽 또는 하단 비주얼 */
  aside?: React.ReactNode;
  tone?: "night" | "navy";
  compact?: boolean;
  children?: React.ReactNode;
};

/** 서브페이지 상단 — 어두운 배경 · 큰 제목 (헤더가 투명 상태로 겹침) */
export function PageHero({ eyebrow, display, title, description, breadcrumbs, actions, aside, tone = "night", compact, children }: Props) {
  const crumbs = breadcrumbs ? [{ name: "홈", path: "/" }, ...breadcrumbs] : undefined;
  return (
    <section className={cn("relative overflow-hidden text-white", tone === "navy" ? "bg-navy-deep" : "bg-night")}>
      {crumbs && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <div className={cn("container-x relative", compact ? "pb-16 pt-32 lg:pb-20 lg:pt-44" : "pb-20 pt-36 lg:pb-28 lg:pt-52")}>
        {crumbs && (
          <nav aria-label="현재 위치" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-display text-xs uppercase tracking-[0.14em] text-white/40">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-white/75">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="hover:text-white">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={cn(!!aside && "grid gap-14 lg:grid-cols-12 lg:items-end")}>
          <div className={cn(!!aside && "lg:col-span-7")}>
            {eyebrow && <p className="eyebrow text-signal">{eyebrow}</p>}
            {display && <p className="display mt-6 whitespace-pre-line text-[3rem] text-white/95 sm:text-[5rem] lg:text-[7.5rem]" aria-hidden>{display}</p>}
            <MaskText as="h1" immediate text={title} className={cn("t-h1", display ? "mt-8" : "mt-6")} />
            {description && (
              <Reveal delay={0.25}>
                <p className="t-lead mt-8 max-w-2xl text-white/70">{description}</p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.35}>
                <div className="mt-10 flex flex-col gap-3 xs:flex-row">{actions}</div>
              </Reveal>
            )}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
      {children}
    </section>
  );
}
