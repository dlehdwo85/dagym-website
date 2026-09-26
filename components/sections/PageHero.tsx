import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

type Crumb = { name: string; path: string };

type Props = {
  /** 한글 소제목 */
  eyebrow?: string;
  /** 보조 영문 라벨 */
  en?: string;
  title: string;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  /** 오른쪽 비주얼 */
  aside?: React.ReactNode;
  compact?: boolean;
  children?: React.ReactNode;
};

/** 서브페이지 상단 — 옅은 쿨 그레이 배경, 한글 제목 중심 */
export function PageHero({ eyebrow, en, title, description, breadcrumbs, actions, aside, compact, children }: Props) {
  const crumbs = breadcrumbs ? [{ name: "홈", path: "/" }, ...breadcrumbs] : undefined;
  return (
    <section className="border-b border-line bg-mist">
      {crumbs && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <div className={cn("container-x", compact ? "pb-12 pt-28 lg:pb-16 lg:pt-36" : "pb-16 pt-28 lg:pb-24 lg:pt-40")}>
        {crumbs && (
          <nav aria-label="현재 위치" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="hover:text-navy">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={cn(!!aside && "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center [&>*]:min-w-0")}>
          <Reveal className={cn(aside ? "lg:col-span-6" : "max-w-4xl")}>
            {(eyebrow || en) && (
              <p className="flex items-center gap-3">
                {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                {en && <span className="label-en text-steel">{en}</span>}
              </p>
            )}
            <h1 className="t-h1 mt-4 sm:whitespace-pre-line">{title}</h1>
            {description && <p className="t-lead mt-6 max-w-2xl text-body">{description}</p>}
            {actions && <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">{actions}</div>}
          </Reveal>
          {aside && <div className="lg:col-span-6">{aside}</div>}
        </div>
      </div>
      {children}
    </section>
  );
}
