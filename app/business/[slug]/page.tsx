import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { OperatingModel } from "@/components/home/OperatingModel";
import { FacilityGrid } from "@/components/home/FacilityGrid";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { businessAreas, getBusiness, type BusinessArea } from "@/data/business";
import { businessStory, operatingModel } from "@/data/showroom";
import { photos } from "@/data/photos";
import { publishedProjects, type ProjectCategory } from "@/data/projects";
import { hasPhoto } from "@/lib/photos";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export function generateStaticParams() {
  return businessAreas.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/business/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) return {};
  return pageMetadata({ title: b.detail.metaTitle, description: b.detail.metaDescription, path: b.href, keywords: b.detail.keywords });
}

/* ------------------------------------------------------------------
 * 섹션 구성 — 사업마다 순서와 강조를 다르게 둡니다.
 * ---------------------------------------------------------------- */
type SectionKey = "problems" | "facilities" | "solution" | "service" | "care" | "reporting" | "extra" | "scope" | "process" | "case";

const layouts: Record<string, SectionKey[]> = {
  "apartment-community": ["problems", "facilities", "solution", "service", "care", "extra", "reporting", "process", "scope", "case"],
  "sports-fitness": ["solution", "problems", "facilities", "service", "care", "reporting", "process", "scope", "case"],
  "community-facility": ["problems", "service", "solution", "facilities", "reporting", "process", "scope", "case"],
  consulting: ["problems", "process", "facilities", "solution", "service", "reporting", "scope", "case"],
  equipment: ["facilities", "process", "problems", "service", "reporting", "scope", "case"],
};

const labels: Record<SectionKey, { en: string; ko: string }> = {
  problems: { en: "Problems", ko: "이런 상황이라면" },
  facilities: { en: "Facility types", ko: "운영 시설" },
  solution: { en: "Solution", ko: "사람과 프로그램" },
  service: { en: "Member & Access", ko: "회원 응대 · 출입 · 예약" },
  care: { en: "Facility care", ko: "시설 관리" },
  reporting: { en: "Reporting", ko: "운영 보고" },
  extra: { en: "Fee model", ko: "이용료 부과 방식" },
  scope: { en: "Scope", ko: "위탁 범위" },
  process: { en: "Process", ko: "진행 과정" },
  case: { en: "Case study", ko: "운영 사례" },
};

const caseCategory: Record<string, ProjectCategory[]> = {
  "apartment-community": ["apartment"],
  "sports-fitness": ["sports"],
  "community-facility": ["corporate", "public"],
  consulting: ["apartment", "sports", "corporate", "public"],
  equipment: [],
};

function Head({ k, title, lead, dark }: { k: SectionKey; title?: string; lead?: string; dark?: boolean }) {
  return (
    <div className="lg:col-span-4">
      <p className={cn("eyebrow", dark ? "text-white/45" : "text-steel")}>{labels[k].en}</p>
      <h2 id={`${k}-title`} className="t-h2 mt-4">
        {title ?? labels[k].ko}
      </h2>
      {lead && <p className={cn("t-small mt-4", dark ? "text-white/60" : "text-body")}>{lead}</p>}
    </div>
  );
}

function Wrap({ k, children, tone = "white" }: { k: SectionKey; children: React.ReactNode; tone?: "white" | "mist" | "dark" }) {
  return (
    <section
      id={k}
      aria-labelledby={`${k}-title`}
      className={cn("scroll-mt-32", tone === "mist" && "bg-mist", tone === "dark" && "bg-charcoal text-white", tone === "white" && "bg-white")}
    >
      <div className={cn("container-x grid gap-10 py-20 lg:grid-cols-12 lg:gap-12 lg:py-32", tone === "white" && "border-t border-line")}>{children}</div>
    </section>
  );
}

function Bullets({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={cn("border-t", dark ? "border-white/30" : "border-ink")}>
      {items.map((t) => (
        <li key={t} className={cn("t-body border-b py-4", dark ? "border-line-dark text-white/80" : "border-line text-ink")}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function renderSection(k: SectionKey, b: BusinessArea) {
  const d = b.detail;
  switch (k) {
    case "problems":
      return (
        <Wrap k={k} key={k}>
          <Head k={k} lead="이런 과제가 있을 때 다짐에 상담을 요청합니다." />
          <ol className="lg:col-span-8">
            {d.targets.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.06} className="grid gap-2 border-t border-line-strong py-7 sm:grid-cols-[4rem_12rem_1fr] sm:gap-6">
                <span className="font-display text-sm text-steel">{String(i + 1).padStart(2, "0")}</span>
                <p className="t-h4">{t.title}</p>
                <p className="t-body text-body">{t.need}</p>
              </Reveal>
            ))}
          </ol>
        </Wrap>
      );
    case "facilities":
      if (b.slug === "apartment-community") {
        return (
          <div id={k} key={k} className="scroll-mt-32">
            <FacilityGrid eyebrow={labels[k].en} title={"단지의 공용 시설을\n모두 운영합니다."} />
            <div className="container-x -mt-10 pb-20 lg:pb-28">
              <ul className="flex flex-wrap gap-2">
                {d.facilities.map((f) => (
                  <li key={f} className="rounded-[2px] border border-line-strong px-4 py-2.5 text-[0.9375rem]">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }
      return (
        <Wrap k={k} key={k} tone={b.slug === "equipment" ? "white" : "mist"}>
          <Head k={k} title={b.slug === "equipment" ? "구성 · 납품 품목" : undefined} />
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
            {d.facilities.map((f, i) => (
              <li key={f} className="flex items-baseline gap-5 border-t border-line-strong py-6">
                <span className="font-display text-xs text-steel">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[1.375rem] font-semibold tracking-[-0.025em]">{f}</span>
              </li>
            ))}
          </ul>
        </Wrap>
      );
    case "solution": {
      const dark = b.slug === "sports-fitness";
      return (
        <Wrap k={k} key={k} tone={dark ? "dark" : "white"}>
          <Head k={k} dark={dark} lead="시설 규모와 운영 시간에 맞춰 인원과 근무 시간을 정합니다." />
          <div className="lg:col-span-8">
            <dl className={cn("border-t", dark ? "border-white/30" : "border-ink")}>
              {d.staffing.map((s) => (
                <div key={s.role} className={cn("grid gap-2 border-b py-6 sm:grid-cols-[13rem_1fr] sm:gap-8", dark ? "border-line-dark" : "border-line")}>
                  <dt className="t-h4">{s.role}</dt>
                  <dd className={cn("t-body", dark ? "text-white/70" : "text-body")}>{s.work}</dd>
                </div>
              ))}
            </dl>
            {b.slug !== "consulting" && b.slug !== "equipment" && (
              <>
                <p className={cn("eyebrow mt-16", dark ? "text-white/45" : "text-steel")}>Programs</p>
                <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
                  {d.programs.map((p) => (
                    <div key={p.title} className={cn("border-t py-6", dark ? "border-line-dark" : "border-line-strong")}>
                      <dt className="t-h4">{p.title}</dt>
                      <dd className={cn("t-small mt-2", dark ? "text-white/65" : "text-body")}>{p.body}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </Wrap>
      );
    }
    case "service":
      return (
        <section id={k} key={k} aria-labelledby={`${k}-title`} className="scroll-mt-32 grid lg:grid-cols-2">
          <div className="bg-white px-5 py-20 md:px-10 lg:px-14 lg:py-28">
            <p className="eyebrow text-steel">People</p>
            <h2 id={`${k}-title`} className="t-h2 mt-4">
              회원 응대
            </h2>
            <div className="mt-10">
              <Bullets items={d.memberService} />
            </div>
          </div>
          <div className="bg-navy-deep px-5 py-20 text-white md:px-10 lg:px-14 lg:py-28">
            <p className="eyebrow text-signal">Technology · HILINK</p>
            <h3 className="t-h2 mt-4">출입 · 예약 관리</h3>
            <div className="mt-10">
              <Bullets items={d.accessBooking} dark />
            </div>
            <ButtonLink href="/hilink" variant="text-light" className="mt-10">
              HILINK 기능 보기
            </ButtonLink>
          </div>
        </section>
      );
    case "care":
      if (!d.facilityCare) return null;
      return (
        <Wrap k={k} key={k}>
          <Head k={k} lead="청소 · 점검 기록은 체크리스트로 남깁니다." />
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {d.facilityCare.map((c) => (
              <div key={c.cycle} className="border-t border-ink pt-5">
                <p className="display text-[2.25rem] normal-case">{c.cycle}</p>
                <ul className="t-small mt-5 space-y-2 text-body">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Wrap>
      );
    case "reporting":
      return (
        <Wrap k={k} key={k} tone="mist">
          <Head k={k} />
          <div className="lg:col-span-8">
            <Bullets items={d.reporting} />
          </div>
        </Wrap>
      );
    case "extra":
      if (!d.extra) return null;
      return (
        <Wrap k={k} key={k}>
          <Head k={k} title={d.extra.title} lead={d.extra.lead} />
          <dl className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {d.extra.rows.map((r) => (
              <div key={r.title} className="border-t border-ink pt-5">
                <dt className="t-h4">{r.title}</dt>
                <dd className="t-small mt-3 text-body">{r.body}</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      );
    case "scope":
      return (
        <Wrap k={k} key={k}>
          <Head k={k} lead="필요한 범위만 선택할 수 있습니다." />
          <div className="lg:col-span-8">
            <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {d.scopeOptions.map((o, i) => (
                <li key={o.title} className="bg-white p-7 sm:min-h-56">
                  <p className="font-display text-sm text-steel">{String(i + 1).padStart(2, "0")}</p>
                  <p className="t-h3 mt-8">{o.title}</p>
                  <p className="t-small mt-3 text-body">{o.body}</p>
                </li>
              ))}
            </ol>
            <ButtonLink href={`/contact?type=${d.contactType}`} className="mt-10">
              이 범위로 상담 요청하기
            </ButtonLink>
          </div>
        </Wrap>
      );
    case "process":
      if (b.slug === "consulting" || b.slug === "equipment") {
        return (
          <div id={k} key={k} className="scroll-mt-32">
            <OperatingModel
              eyebrow={b.slug === "consulting" ? "Improvement" : "Build"}
              title={b.slug === "consulting" ? "진단한 뒤,\n이렇게 바꿉니다." : "운영 기준으로\n구성하고 설치합니다."}
              steps={d.programs.map((p, i) => ({ en: `Step ${i + 1}`, ko: p.title, body: p.body }))}
              tone="mist"
            />
          </div>
        );
      }
      return (
        <div id={k} key={k} className="scroll-mt-32">
          <OperatingModel steps={operatingModel} tone="mist" />
        </div>
      );
    case "case": {
      const cats = caseCategory[b.slug] ?? [];
      const list = publishedProjects.filter((p) => cats.includes(p.category)).slice(0, 3);
      if (list.length === 0) return null;
      return (
        <Wrap k={k} key={k}>
          <Head k={k} />
          <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            {list.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Wrap>
      );
    }
  }
}

export default async function BusinessDetailPage({ params }: PageProps<"/business/[slug]">) {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) notFound();
  const d = b.detail;
  const story = businessStory[b.slug];
  const img = story && hasPhoto(story.photo) ? photos[story.photo] : undefined;
  const order = layouts[b.slug] ?? layouts["apartment-community"];
  const others = businessAreas.filter((x) => x.slug !== b.slug);
  const toc = order.filter((k) => (k === "care" ? d.facilityCare : k === "extra" ? d.extra : k === "case" ? false : true));

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: b.title, description: d.metaDescription, path: b.href, serviceType: d.metaTitle })} />
      <PageHero
        eyebrow={`${b.no} · ${story?.en ?? "Business"}`}
        title={d.heroTitle}
        description={d.heroSub}
        breadcrumbs={[
          { name: "사업영역", path: "/business" },
          { name: b.title, path: b.href },
        ]}
        actions={
          <>
            <ButtonLink href={`/contact?type=${d.contactType}`} variant="white" size="lg">
              운영 문의하기
            </ButtonLink>
            <ButtonLink href="#scope" variant="outline-white" size="lg" arrow={false}>
              위탁 범위 보기
            </ButtonLink>
          </>
        }
        aside={
          img ? (
            <ClipReveal className="ml-auto aspect-[4/5] w-full max-w-[30rem]" from="right" delay={0.2}>
              <Image src={img.file} alt={img.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </ClipReveal>
          ) : undefined
        }
      />

      <nav aria-label="페이지 목차" className="sticky top-16 z-30 border-b border-line bg-white/90 backdrop-blur-xl lg:top-20">
        <ul className="no-scrollbar container-x flex gap-1 overflow-x-auto">
          {toc.map((k) => (
            <li key={k} className="shrink-0">
              <a href={`#${k}`} className="inline-flex h-12 items-center px-3 text-[0.9375rem] text-body transition-colors hover:text-ink">
                {k === "extra" && d.extra ? d.extra.title : labels[k].ko}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Summary */}
      <section aria-labelledby="summary-title" className="bg-white">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-32">
          <p className="eyebrow text-steel lg:col-span-4">Summary</p>
          <div className="lg:col-span-8">
            <MaskText id="summary-title" text={b.summary} className="t-h2" />
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-body">
              {b.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="size-1 bg-ink" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {order.map((k) => renderSection(k, b))}

      <nav aria-label="다른 사업영역" className="bg-night text-white">
        <div className="container-x py-20 lg:py-28">
          <p className="eyebrow text-white/45">Other business</p>
          <ul className="mt-8 border-t border-line-dark">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-line-dark">
                <Link href={o.href} className="group flex items-center justify-between gap-6 py-6">
                  <span className="flex items-baseline gap-5">
                    <span className="font-display text-xs text-white/40">{o.no}</span>
                    <span className="t-h3 transition-colors group-hover:text-signal">{o.title}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/hilink" className="group mt-12 inline-flex items-center gap-2 border-b border-white/30 pb-0.5 font-semibold">
            모든 사업에 쓰이는 HILINK <ArrowRight className="btn-arrow size-4" aria-hidden />
          </Link>
        </div>
      </nav>

      <CTASection primary={{ label: "운영 문의하기", href: `/contact?type=${d.contactType}` }} />
    </>
  );
}
