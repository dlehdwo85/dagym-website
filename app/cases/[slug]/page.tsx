import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { BeforeAfter } from "@/components/cases/BeforeAfter";
import { Reveal } from "@/components/motion/Reveal";
import { getTransformation, transformations } from "@/data/corporate";
import { getBusiness } from "@/data/business";
import { photoRef, showPhotoSlots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return transformations.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTransformation(slug);
  if (!t) return {};
  return pageMetadata({ title: `${t.title} — 운영 개선`, description: t.summary, path: `/cases/${t.slug}` });
}

const steps = [
  { key: "problem", no: "01", label: "문제", en: "Problem" },
  { key: "diagnosis", no: "02", label: "현장 진단", en: "Diagnosis" },
  { key: "action", no: "03", label: "개선", en: "Action" },
  { key: "operation", no: "04", label: "운영", en: "Operation" },
] as const;

export default async function CaseDetailPage({ params }: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const t = getTransformation(slug);
  if (!t) notFound();
  const before = t.before ? photoRef(t.before) : undefined;
  const after = t.after ? photoRef(t.after) : undefined;
  const results = t.result.filter((r) => r.status === "PUBLIC_SAFE");
  const business = getBusiness(t.business);
  const others = transformations.filter((x) => x.slug !== t.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`운영 개선 · ${t.facility}`}
        en={t.en}
        title={t.title}
        description={t.summary}
        breadcrumbs={[
          { name: "운영 개선 사례", path: "/cases" },
          { name: t.title, path: `/cases/${t.slug}` },
        ]}
      />

      {before && after ? (
        <section className="bg-white pt-14" aria-label="전후 비교">
          <div className="container-x max-w-4xl">
            <BeforeAfter before={before} after={after} label={t.title} />
          </div>
        </section>
      ) : (
        showPhotoSlots && (
          <div className="container-x pt-10">
            <p className="border border-dashed border-line-strong p-5 text-sm text-muted" data-review="image-required">
              검수용 · IMAGE_REQUIRED — 공개 동의된 실제 전후 사진 2장 (같은 구도, 긴 변 1600px 이상). data/corporate.ts › transformations › before / after
            </p>
          </div>
        )
      )}

      <section className="section-y bg-white" aria-label="개선 과정">
        <div className="container-x"><ol className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.key} delay={i * 0.05} className="bg-white p-7">
              <p className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-[4px] bg-navy text-sm font-bold text-white">{s.no}</span>
                <span className="label-en text-steel">{s.en}</span>
              </p>
              <h2 className="t-h4 mt-4">{s.label}</h2>
              <ul className="t-small mt-3 space-y-2 text-body">
                {t[s.key].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol></div>

        {t.hilink && t.hilink.length > 0 && (
          <div className="container-x mt-10">
            <div className="rounded-[4px] bg-mist p-7">
              <p className="eyebrow">HILINK 적용</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {t.hilink.map((h) => (
                  <li key={h} className="rounded-[4px] border border-line bg-white px-3 py-1.5 text-sm">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="container-x mt-10">
            <h2 className="t-h3">결과</h2>
            <ul className="t-body mt-4 space-y-2">
              {results.map((r) => (
                <li key={r.text}>{r.text}</li>
              ))}
            </ul>
          </div>
        )}

        {business && (
          <div className="container-x mt-10">
            <Link href={business.href} className="group inline-flex items-center gap-2 font-semibold text-navy">
              관련 사업영역 — {business.title} <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          </div>
        )}
      </section>

      <section className="border-t border-line bg-mist" aria-label="다른 개선 사례">
        <div className="container-x py-14">
          <p className="font-semibold">다른 개선 사례</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/cases/${o.slug}`} className="group block h-full rounded-[4px] border border-line bg-white p-5 hover:border-navy">
                  <span className="text-sm font-semibold text-accent">{o.facility}</span>
                  <span className="t-h4 mt-1 block group-hover:text-navy">{o.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection eyebrow="현장 진단" title={"비슷한 문제가 있다면,\n현장부터 진단하겠습니다."} />
    </>
  );
}
