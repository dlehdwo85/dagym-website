import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { OperationSystem } from "@/components/home/OperationSystem";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { businessAreas, getBusiness } from "@/data/business";
import { businessDiagnosis, businessPhoto, transformations } from "@/data/corporate";
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

const caseCategory: Record<string, ProjectCategory[]> = {
  "apartment-community": ["apartment"],
  "sports-fitness": ["sports"],
  "community-facility": ["corporate", "public"],
  consulting: ["apartment", "sports", "corporate", "public"],
  equipment: [],
};

function Part({ no, title, lead, children, tone = "white", id }: { no: string; title: string; lead?: string; children: React.ReactNode; tone?: "white" | "mist"; id: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-32", tone === "mist" ? "bg-mist" : "bg-white")}>
      <div className="container-x grid gap-10 border-t border-line py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <Reveal className="lg:col-span-4">
          <p className="text-sm font-bold text-accent">{no}</p>
          <h2 id={`${id}-title`} className="t-h2 mt-2">
            {title}
          </h2>
          {lead && <p className="t-small mt-3 text-body">{lead}</p>}
        </Reveal>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function Rows({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="border-t border-navy">
      {items.map((r) => (
        <div key={r.k} className="grid gap-1.5 border-b border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
          <dt className="font-semibold">{r.k}</dt>
          <dd className="t-small text-body">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="t-small flex gap-3 text-ink">
          <span className="mt-[0.7em] size-1.5 shrink-0 rounded-[1px] bg-accent" aria-hidden />
          {t}
        </li>
      ))}
    </ul>
  );
}

/** 사업 상세 — 고객 문제 → 현장 진단 → 운영안 → 운영 프로세스 → 사례 → 위탁 범위 → 문의 */
export default async function BusinessDetailPage({ params }: PageProps<"/business/[slug]">) {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) notFound();
  const d = b.detail;
  const pid = businessPhoto[b.slug];
  const img = pid && hasPhoto(pid) ? photos[pid] : undefined;
  const diagnosis = businessDiagnosis[b.slug] ?? [];
  const related = transformations.filter((t) => t.business === b.slug || (b.slug === "equipment" && ["fitness-renewal", "golf-upgrade"].includes(t.slug)));
  const projects = publishedProjects.filter((p) => (caseCategory[b.slug] ?? []).includes(p.category)).slice(0, 3);
  const others = businessAreas.filter((x) => x.slug !== b.slug);

  const toc = [
    { id: "problem", label: "고객 문제" },
    { id: "diagnosis", label: "현장 진단" },
    { id: "plan", label: "다짐 운영안" },
    { id: "process", label: "운영 프로세스" },
    ...(related.length || projects.length ? [{ id: "cases", label: "사례" }] : []),
    { id: "scope", label: "위탁 범위" },
  ];

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: b.title, description: d.metaDescription, path: b.href, serviceType: d.metaTitle })} />
      <PageHero
        eyebrow={`사업영역 ${b.no}`}
        title={d.heroTitle}
        description={d.heroSub}
        breadcrumbs={[
          { name: "사업영역", path: "/business" },
          { name: b.title, path: b.href },
        ]}
        actions={
          <>
            <ButtonLink href={`/contact?type=${d.contactType}`} size="lg">
              운영 제안 문의
            </ButtonLink>
            <ButtonLink href="/contact?type=diagnosis" variant="secondary" size="lg">
              현장 진단 문의
            </ButtonLink>
          </>
        }
        aside={
          img ? (
            <figure>
              <ClipReveal className="aspect-[4/3] rounded-[4px] bg-fog" from="right">
                <Image src={img.file} alt={img.alt} fill priority sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
              </ClipReveal>
              <figcaption className="mt-2 text-sm text-muted">{b.title} — 시설 예시</figcaption>
            </figure>
          ) : undefined
        }
      />

      <nav aria-label="페이지 목차" className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur lg:top-[4.75rem]">
        <ul className="no-scrollbar container-x flex gap-1 overflow-x-auto">
          {toc.map((t, i) => (
            <li key={t.id} className="shrink-0">
              <a href={`#${t.id}`} className="inline-flex h-12 items-center gap-1.5 px-3 text-[0.9375rem] text-body hover:text-navy">
                <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Part id="problem" no="01" title="이런 문제가 있을 때" lead="다짐에 운영 상담을 요청하는 고객의 대표적인 상황입니다.">
        <ul className="grid gap-4 sm:grid-cols-2">
          {d.targets.map((t) => (
            <Reveal as="li" key={t.title} className="rounded-[4px] border border-line p-6">
              <p className="t-h4">{t.title}</p>
              <p className="t-small mt-2 text-body">{t.need}</p>
            </Reveal>
          ))}
        </ul>
      </Part>

      <Part id="diagnosis" no="02" title="현장 진단" lead="제안 전에 현장을 직접 보고 확인하는 항목입니다." tone="mist">
        <ul className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2">
          {diagnosis.map((x) => (
            <li key={x} className="flex items-start gap-3 bg-white p-5">
              <Search className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span className="t-small text-ink">{x}</span>
            </li>
          ))}
        </ul>
        <p className="t-small mt-5 text-body">운영 시설: {d.facilities.join(" · ")}</p>
      </Part>

      <Part id="plan" no="03" title="다짐 운영안" lead="인력 · 프로그램 · 응대 · 시스템 · 관리 · 보고를 한 번에 설계합니다.">
        <div className="space-y-12">
          <div>
            <h3 className="t-h4">인력 구성</h3>
            <div className="mt-4">
              <Rows items={d.staffing.map((s) => ({ k: s.role, v: s.work }))} />
            </div>
          </div>
          <div>
            <h3 className="t-h4">{b.slug === "consulting" || b.slug === "equipment" ? "개선 · 구성 방식" : "프로그램 운영"}</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {d.programs.map((p) => (
                <div key={p.title} className="rounded-[4px] bg-mist p-5">
                  <dt className="font-semibold">{p.title}</dt>
                  <dd className="t-small mt-1.5 text-body">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="t-h4">회원 응대</h3>
              <div className="mt-4">
                <Bullets items={d.memberService} />
              </div>
            </div>
            <div>
              <h3 className="t-h4">
                출입 · 예약 관리 <span className="font-medium text-accent">HILINK</span>
              </h3>
              <div className="mt-4">
                <Bullets items={d.accessBooking} />
              </div>
              <Link href="/hilink" className="group mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy">
                HILINK 기능 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
              </Link>
            </div>
          </div>
          {d.facilityCare && (
            <div>
              <h3 className="t-h4">시설 관리 주기</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {d.facilityCare.map((c) => (
                  <div key={c.cycle} className="border-t-2 border-navy pt-4">
                    <p className="font-bold text-navy">{c.cycle}</p>
                    <ul className="t-small mt-2 space-y-1 text-body">
                      {c.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          {d.extra && (
            <div>
              <h3 className="t-h4">{d.extra.title}</h3>
              <p className="t-small mt-2 text-body">{d.extra.lead}</p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                {d.extra.rows.map((r) => (
                  <div key={r.title} className="rounded-[4px] border border-line p-5">
                    <dt className="font-semibold">{r.title}</dt>
                    <dd className="t-small mt-1.5 text-body">{r.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div>
            <h3 className="t-h4">운영 보고</h3>
            <div className="mt-4">
              <Bullets items={d.reporting} />
            </div>
          </div>
        </div>
      </Part>

      <div id="process" className="scroll-mt-32">
        <OperationSystem title={"진단부터 개선까지\n같은 순서로 운영합니다."} />
      </div>

      {(related.length > 0 || projects.length > 0) && (
        <Part id="cases" no="05" title="관련 사례">
          {projects.length > 0 && (
            <ul className="mb-10 grid gap-8 sm:grid-cols-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          )}
          <ul className="space-y-3">
            {related.map((t) => (
              <li key={t.slug}>
                <Link href={`/cases/${t.slug}`} className="group flex items-center justify-between gap-6 rounded-[4px] border border-line p-5 hover:border-navy">
                  <span>
                    <span className="text-sm font-semibold text-accent">{t.facility}</span>
                    <span className="t-h4 mt-1 block group-hover:text-navy">{t.title}</span>
                    <span className="t-small mt-1 block text-body">{t.summary}</span>
                  </span>
                  <ArrowRight className="btn-arrow size-5 shrink-0 text-navy" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Part>
      )}

      <Part id="scope" no={related.length || projects.length ? "06" : "05"} title="위탁 범위" lead="필요한 범위만 선택할 수 있습니다." tone="mist">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.scopeOptions.map((o, i) => (
            <li key={o.title} className="rounded-[4px] border border-line bg-white p-6">
              <p className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="t-h4 mt-2">{o.title}</p>
              <p className="t-small mt-2 text-body">{o.body}</p>
            </li>
          ))}
        </ol>
        <ButtonLink href={`/contact?type=${d.contactType}`} className="mt-8">
          이 범위로 운영 제안 받기
        </ButtonLink>
      </Part>

      <nav aria-label="다른 사업영역" className="border-t border-line bg-white">
        <div className="container-x py-14">
          <p className="font-semibold">다른 사업영역</p>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-line">
                <Link href={o.href} className="group flex items-center justify-between py-4 hover:text-navy">
                  <span>
                    <span className="mr-3 text-sm font-bold text-accent">{o.no}</span>
                    {o.title}
                  </span>
                  <ArrowRight className="btn-arrow size-4 text-steel" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CTASection primary={{ label: "운영 제안 문의", href: `/contact?type=${d.contactType}` }} />
    </>
  );
}
