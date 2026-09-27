import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { BeforeAfter } from "@/components/cases/BeforeAfter";
import { Reveal } from "@/components/motion/Reveal";
import { DemoPhone } from "@/components/hilink/DemoPhone";
import { getTransformation, transformations } from "@/data/corporate";
import { getBusiness } from "@/data/business";
import { hilinkDemo } from "@/data/hilinkDemo";
import { isActualPhoto, photoRef, showPhotoSlots } from "@/lib/photos";
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

  const cover = photoRef(t.cover);
  const detail = t.detail ? photoRef(t.detail) : undefined;
  // 전후 비교는 실제 운영 현장 사진(provenance: dagym-site)만 — 생성 이미지는 BEFORE / AFTER 로 표시하지 않음
  const hasActualBeforeAfter = !!t.before && !!t.after && isActualPhoto(t.before) && isActualPhoto(t.after);
  const before = hasActualBeforeAfter ? photoRef(t.before!) : undefined;
  const after = hasActualBeforeAfter ? photoRef(t.after!) : undefined;
  const results = t.result.filter((r) => r.status === "PUBLIC_SAFE");
  const business = getBusiness(t.business);
  const idx = transformations.findIndex((x) => x.slug === t.slug);
  const others = [1, 2, 3].map((n) => transformations[(idx + n) % transformations.length]);

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
        aside={
          cover && (
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-fog">
                <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          )
        }
      />

      {/* 문제 → 진단 → 개선 → 운영 */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="steps-title">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">개선 과정</p>
            <h2 id="steps-title" className="t-h2 mt-3">
              문제 → 진단 → 개선 → 운영
            </h2>
          </Reveal>
          <ol className="relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-line lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[15px] lg:h-px lg:w-auto" />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.key} delay={i * 0.06} className="relative grid grid-cols-[2rem_1fr] gap-4 lg:block">
                <span className="relative z-10 grid size-8 place-items-center rounded-full bg-navy text-[0.8125rem] font-bold text-white ring-8 ring-white">
                  {s.no}
                </span>
                <div className="lg:mt-6">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="t-h4">{s.label}</span>
                    <span className="label-en text-steel">{s.en}</span>
                  </p>
                  <ul className="t-small mt-3 space-y-2 text-body">
                    {t[s.key].map((x) => (
                      <li key={x} className="flex gap-2 break-keep">
                        <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-steel" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 개선 핵심 비주얼 — 실제 전후 사진이 있으면 비교, 없으면 개선 구성 예시 */}
      {hasActualBeforeAfter && before && after ? (
        <section className="bg-mist py-16 lg:py-20" aria-label="전후 비교">
          <div className="container-x max-w-4xl">
            <BeforeAfter before={before} after={after} label={t.title} />
          </div>
        </section>
      ) : detail ? (
        <section className="bg-mist py-16 lg:py-20" aria-labelledby="direction-title">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:col-span-7">
              <figure>
                <div className="relative aspect-video overflow-hidden rounded-[4px] bg-fog">
                  <Image src={detail.src} alt={detail.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-xs text-muted">개선 구성 예시 이미지 · 실제 현장 전후 사진이 아닙니다.</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="eyebrow">개선 방향</p>
              <h2 id="direction-title" className="sr-only">
                개선 방향
              </h2>
              <div className="mt-5 space-y-4">
                <div className="rounded-[4px] border border-line bg-white p-5">
                  <p className="text-xs font-bold text-steel">현재 문제</p>
                  <p className="mt-1.5 font-semibold text-ink break-keep">{t.keyProblem}</p>
                </div>
                <div aria-hidden className="flex justify-center text-steel">
                  <ArrowRight className="size-5 rotate-90" />
                </div>
                <div className="rounded-[4px] border border-navy bg-white p-5">
                  <p className="text-xs font-bold text-accent">개선 방향</p>
                  <p className="mt-1.5 font-semibold text-ink break-keep">{t.keyAction}</p>
                </div>
              </div>
            </Reveal>
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

      {/* HILINK 적용 */}
      {t.hilink && t.hilink.length > 0 && (
        <section className="bg-white py-16 lg:py-20" aria-labelledby="hilink-title">
          <div className="container-x">
            <div className="grid gap-10 overflow-hidden rounded-[4px] bg-navy-deep px-6 py-10 text-white sm:px-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-14 lg:py-14">
              <Reveal className="lg:col-span-7">
                <p className="eyebrow !text-[#9dbcf0]">HILINK 적용</p>
                <h2 id="hilink-title" className="t-h3 mt-3 break-keep">
                  {t.facility} 운영을 HILINK로 연결합니다
                </h2>
                <ul className="mt-6 space-y-3">
                  {t.hilink.map((h) => (
                    <li key={h} className="flex gap-3 break-keep text-white/85">
                      <Check className="mt-1 size-4 shrink-0 text-[#9dbcf0]" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href="/hilink" className="group mt-8 inline-flex items-center gap-2 font-semibold text-white">
                  HILINK 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                </Link>
              </Reveal>
              {t.hilinkScreen && (
                <Reveal delay={0.08} className="flex flex-col items-center lg:col-span-5">
                  <DemoPhone id={t.hilinkScreen} className="w-[48%] max-w-[12.5rem] shadow-none" sizes="(min-width: 1024px) 200px, 48vw" />
                  <p className="mt-4 text-xs text-white/55">공개 데모 화면 · {hilinkDemo[t.hilinkScreen].label}</p>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {(results.length > 0 || business) && (
        <section className="bg-white pb-16 lg:pb-20" aria-label="결과와 관련 사업영역">
          <div className="container-x">
            {results.length > 0 && (
              <div className="mb-10">
                <h2 className="t-h3">결과</h2>
                <ul className="t-body mt-4 space-y-2">
                  {results.map((r) => (
                    <li key={r.text}>{r.text}</li>
                  ))}
                </ul>
              </div>
            )}
            {business && (
              <Link href={business.href} className="group flex items-center justify-between gap-4 border-y border-line py-6 transition-colors hover:border-navy">
                <span>
                  <span className="block text-sm font-semibold text-steel">관련 사업영역</span>
                  <span className="t-h4 mt-1 block group-hover:text-navy">{business.title}</span>
                </span>
                <ArrowRight className="btn-arrow size-5 shrink-0 text-navy" aria-hidden />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* 다른 개선 사례 */}
      <section className="border-t border-line bg-mist" aria-labelledby="others-title">
        <div className="container-x py-14 lg:py-16">
          <h2 id="others-title" className="t-h4">
            다른 개선 사례
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {others.map((o) => {
              const thumb = photoRef(o.cover);
              return (
                <li key={o.slug}>
                  <Link href={`/cases/${o.slug}`} className="group block h-full overflow-hidden rounded-[4px] border border-line bg-white transition-colors hover:border-navy">
                    {thumb && (
                      <div className="relative aspect-video overflow-hidden bg-fog">
                        <Image src={thumb.src} alt={thumb.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="text-sm font-semibold text-accent">{o.facility}</span>
                      <span className="mt-1 block break-keep font-semibold text-ink group-hover:text-navy">{o.title}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-6">
            <Link href="/cases" className="group inline-flex items-center gap-2 text-sm font-semibold text-navy">
              운영 개선 사례 전체 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <CTASection eyebrow="현장 진단" title={"비슷한 문제가 있다면,\n현장부터 진단하겠습니다."} />
    </>
  );
}
