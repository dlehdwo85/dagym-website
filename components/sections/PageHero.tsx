import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  tone?: "navy" | "ink";
  size?: "md" | "lg";
  accent?: "brand" | "signal";
};

/** 서브페이지 공통 Hero — 어두운 건축적 배경 + 대형 타이포그래피 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
  children,
  tone = "navy",
  size = "md",
  accent = "brand",
}: Props) {
  const crumbs = breadcrumbs ? [{ name: "홈", path: "/" }, ...breadcrumbs] : undefined;
  return (
    <section
      className={cn(
        "on-dark relative overflow-hidden text-white",
        tone === "navy" ? "bg-navy-950" : "bg-ink",
      )}
    >
      {crumbs && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <div className="bg-blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_95%)]" aria-hidden />
      <div
        className={cn(
          "absolute -right-40 -top-40 size-[36rem] rounded-full blur-3xl",
          accent === "signal" ? "bg-signal/15" : "bg-accent/10",
        )}
        aria-hidden
      />
      <div
        className={cn(
          "container-x relative grid gap-12 pb-16 pt-32 lg:grid-cols-12 lg:items-end lg:pb-24",
          size === "lg" ? "min-h-[88svh] lg:pt-44" : "min-h-[62svh] lg:pt-40",
        )}
      >
        <div className={cn(aside ? "lg:col-span-7" : "lg:col-span-10")}>
          {crumbs && (
            <nav aria-label="현재 위치" className="hero-in mb-10">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-white/45">
                {crumbs.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
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
          <p
            className={cn("t-eyebrow hero-in flex items-center gap-3", accent === "signal" ? "text-signal-light" : "text-accent-light")}
            style={{ "--d": "60ms" } as React.CSSProperties}
          >
            <span aria-hidden className={cn("h-px w-8", accent === "signal" ? "bg-signal-light/60" : "bg-accent-light/60")} />
            {eyebrow}
          </p>
          <h1 className="t-h1 hero-in mt-7" style={{ "--d": "120ms" } as React.CSSProperties}>
            {title}
          </h1>
          {description && (
            <p className="t-lead hero-in mt-7 max-w-2xl text-white/70" style={{ "--d": "200ms" } as React.CSSProperties}>
              {description}
            </p>
          )}
          {actions && (
            <div className="hero-in mt-10 flex flex-wrap gap-3" style={{ "--d": "280ms" } as React.CSSProperties}>
              {actions}
            </div>
          )}
        </div>
        {aside && (
          <div className="hero-in lg:col-span-5" style={{ "--d": "240ms" } as React.CSSProperties}>
            {aside}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
