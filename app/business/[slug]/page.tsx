import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FacilityMedia } from "@/components/sections/FacilityMedia";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { businessAreas, getBusiness } from "@/data/business";
import type { PhotoId } from "@/data/photos";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

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

function Block({ id, title, lead, children }: { id: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-line py-14 lg:grid lg:grid-cols-12 lg:gap-10 lg:py-20" aria-labelledby={`${id}-title`}>
      <div className="lg:col-span-4">
        <h2 id={`${id}-title`} className="t-h2">
          {title}
        </h2>
        {lead && <p className="mt-3 text-body">{lead}</p>}
      </div>
      <div className="mt-8 lg:col-span-8 lg:mt-0">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[1.0125rem] leading-relaxed text-ink">
          <span className="mt-[0.8em] h-px w-3 shrink-0 bg-brand" aria-hidden />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function BusinessDetailPage({ params }: PageProps<"/business/[slug]">) {
  const { slug } = await params;
  const b = getBusiness(slug);
  if (!b) notFound();
  const d = b.detail;
  const others = businessAreas.filter((x) => x.slug !== b.slug);
  const heroPhoto = `business-${b.slug}` as PhotoId;

  const toc = [
    { id: "targets", label: "대상 고객" },
    { id: "facilities", label: "운영 시설" },
    { id: "staffing", label: "인력 구성" },
    { id: "programs", label: "프로그램" },
    { id: "service", label: "회원 응대 · 출입 · 예약" },
    ...(d.facilityCare ? [{ id: "care", label: "시설 관리" }] : []),
    { id: "reporting", label: "운영 보고" },
    ...(d.extra ? [{ id: "extra", label: d.extra.title }] : []),
    { id: "scope", label: "위탁 범위" },
  ];

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: b.title, description: d.metaDescription, path: b.href, serviceType: d.metaTitle })} />
      <PageHero
        label={b.title}
        title={d.heroTitle}
        description={d.heroSub}
        breadcrumbs={[
          { name: "사업영역", path: "/business" },
          { name: b.title, path: b.href },
        ]}
        actions={
          <>
            <ButtonLink href={`/contact?type=${d.contactType}`} size="lg">
              운영 문의하기
            </ButtonLink>
            <ButtonLink href="#scope" variant="secondary" size="lg" arrow={false}>
              위탁 범위 보기
            </ButtonLink>
          </>
        }
      />

      <nav aria-label="페이지 목차" className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur lg:top-[4.5rem]">
        <ul className="container-x flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {toc.map((t) => (
            <li key={t.id} className="shrink-0">
              <a href={`#${t.id}`} className="inline-flex h-10 items-center rounded-[4px] px-3 text-[0.9375rem] text-body hover:bg-paper hover:text-ink">
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {b.slug === "apartment-community" && (
        <FacilityMedia
          id="apt-facility-media"
          title={"단지 커뮤니티의\n모든 시설을 맡습니다."}
          description="헬스장과 골프연습장뿐 아니라 수영장, GX룸, 카페, 작은도서관, 게스트하우스까지 운영 범위에 포함됩니다."
        />
      )}

      <div className="container-x">
        {photoVisible(heroPhoto) && <Photo id={heroPhoto} priority className="mt-10 aspect-[2/1] lg:mt-14" sizes="100vw" />}

        <Block id="targets" title="대상 고객" lead="이런 상황이라면 상담을 권합니다.">
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {d.targets.map((t) => (
              <div key={t.title} className="border-t border-line-strong py-5">
                <dt className="t-h4">{t.title}</dt>
                <dd className="mt-1.5 text-body">{t.need}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block id="facilities" title="운영 시설">
          <ul className="flex flex-wrap gap-2">
            {d.facilities.map((f) => (
              <li key={f} className="rounded-[4px] border border-line-strong bg-white px-4 py-2.5 text-[0.9875rem]">
                {f}
              </li>
            ))}
          </ul>
        </Block>

        <Block id="staffing" title="인력 구성" lead="시설 규모와 운영 시간에 맞춰 인원과 근무 시간을 정합니다.">
          <dl className="border-t border-ink">
            {d.staffing.map((s) => (
              <div key={s.role} className="grid gap-1.5 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-semibold">{s.role}</dt>
                <dd className="leading-relaxed text-body">{s.work}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block id="programs" title="프로그램 운영">
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {d.programs.map((p) => (
              <div key={p.title} className="border-t border-line-strong py-5">
                <dt className="t-h4">{p.title}</dt>
                <dd className="mt-1.5 leading-relaxed text-body">{p.body}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block id="service" title="회원 응대 · 출입 · 예약">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="t-h4 border-b border-ink pb-3">회원 응대</h3>
              <div className="mt-5">
                <BulletList items={d.memberService} />
              </div>
            </div>
            <div>
              <h3 className="t-h4 border-b border-ink pb-3">
                출입 · 예약 관리 <span className="font-normal text-muted">(HILINK)</span>
              </h3>
              <div className="mt-5">
                <BulletList items={d.accessBooking} />
              </div>
              <Link href="/hilink" className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand">
                HILINK 기능 보기 <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Block>

        {d.facilityCare && (
          <Block id="care" title="시설 관리" lead="청소 · 점검 기록은 체크리스트로 남깁니다.">
            <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
              {d.facilityCare.map((c) => (
                <div key={c.cycle} className="bg-white p-5">
                  <p className="font-semibold text-brand">{c.cycle}</p>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-body">
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
        )}

        <Block id="reporting" title="운영 보고">
          <BulletList items={d.reporting} />
        </Block>

        {d.extra && (
          <Block id="extra" title={d.extra.title} lead={d.extra.lead}>
            <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
              {d.extra.rows.map((r) => (
                <div key={r.title} className="bg-white p-5">
                  <dt className="font-semibold">{r.title}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-body">{r.body}</dd>
                </div>
              ))}
            </dl>
          </Block>
        )}

        <Block id="scope" title="위탁 범위" lead="필요한 범위만 선택할 수 있습니다.">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.scopeOptions.map((o, i) => (
              <li key={o.title} className="bg-paper p-6">
                <p className="text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")}</p>
                <p className="t-h4 mt-2">{o.title}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{o.body}</p>
              </li>
            ))}
          </ol>
          <ButtonLink href={`/contact?type=${d.contactType}`} className="mt-8">
            이 범위로 상담 요청하기
          </ButtonLink>
        </Block>
      </div>

      <nav aria-label="다른 사업영역" className="border-t border-line bg-paper">
        <div className="container-x py-12">
          <p className="font-semibold">다른 사업영역</p>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-line-strong">
                <Link href={o.href} className="group flex items-center justify-between py-4 hover:text-brand">
                  {o.title}
                  <ArrowRight className="size-4 text-muted group-hover:text-brand" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CTASection primary={{ label: "운영 문의하기", href: `/contact?type=${d.contactType}` }} />
    </>
  );
}
