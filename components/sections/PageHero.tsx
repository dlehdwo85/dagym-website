import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

type Props = {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

/** 서브페이지 상단 — 밝은 배경, 한글 제목 */
export function PageHero({ label, title, description, breadcrumbs, actions, children }: Props) {
  const crumbs = breadcrumbs ? [{ name: "홈", path: "/" }, ...breadcrumbs] : undefined;
  return (
    <section className="border-b border-line bg-paper">
      {crumbs && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <div className="container-x pb-14 pt-28 lg:pb-20 lg:pt-36">
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
                    <Link href={c.path} className="hover:text-ink">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {label && <p className="t-label text-brand">{label}</p>}
        <h1 className="t-h1 mt-3 max-w-4xl sm:whitespace-pre-line">{title}</h1>
        {description && <p className="t-lead mt-6 max-w-3xl text-body">{description}</p>}
        {actions && <div className="mt-9 flex flex-col gap-3 xs:flex-row">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
