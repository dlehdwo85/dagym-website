import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { DemoPhone } from "@/components/hilink/DemoPhone";
import { ButtonLink } from "@/components/ui/Button";
import { transformations, type Transformation } from "@/data/corporate";
import type { HilinkDemoId } from "@/data/hilinkDemo";
import { photoRef } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "운영 개선 사례",
  description:
    "헬스장·골프연습장·GX룸·키즈카페·독서실·다목적실 — 다짐이 현장을 진단하고 시설·프로그램·운영을 개선하는 방식.",
  path: "/cases",
});

/** 운영 개선 4단계 — 상세페이지의 문제 · 진단 · 개선 · 운영 구조와 같은 흐름 */
const process = [
  { no: "01", title: "문제 발견", en: "Problem", body: "이용률 · 민원 · 시설 상태에서 문제를 찾습니다." },
  { no: "02", title: "현장 진단", en: "Diagnosis", body: "동선 · 기구 · 프로그램 · 운영 방식을 직접 확인합니다." },
  { no: "03", title: "개선 실행", en: "Action", body: "시설 · 프로그램 · 시스템을 현장에 맞게 조정합니다." },
  { no: "04", title: "운영 · 재점검", en: "Operation", body: "운영 데이터와 이용자 반응으로 다시 개선합니다." },
];

/** 운영 개선이 다루는 범위 — 시설 교체만이 아님 */
const scope = ["시설", "프로그램", "인력", "운영 규칙", "예약", "출입", "결제", "데이터"];

/** HILINK 섹션 — 공개 데모 화면만 (data/hilinkDemo.ts) */
const hilinkScreens: HilinkDemoId[] = ["community", "storeCategories", "passes"];
const hilinkFeatures = ["예약", "출입", "이용권", "정산", "운영 데이터"];

function CaseImage({ t, sizes, ratio, square, priority }: { t: Transformation; sizes: string; ratio: string; square?: boolean; priority?: boolean }) {
  const img = photoRef(t.cover);
  if (!img) return null;
  return (
    <div className={cn("relative overflow-hidden bg-fog", !square && "rounded-[4px]", ratio)}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}

function KeyPoints({ t, className }: { t: Transformation; className?: string }) {
  return (
    <dl className={cn("grid gap-4 border-t border-line pt-5 sm:grid-cols-2", className)}>
      <div>
        <dt className="text-xs font-bold text-steel">문제</dt>
        <dd className="t-small mt-1 text-ink">{t.keyProblem}</dd>
      </div>
      <div>
        <dt className="text-xs font-bold text-accent">개선</dt>
        <dd className="t-small mt-1 text-ink">{t.keyAction}</dd>
      </div>
    </dl>
  );
}

export default function CasesPage() {
  const hero = photoRef("case-hero-inspection");
  const featured = transformations.filter((t) => t.featured);
  const secondary = transformations.filter((t) => !t.featured);

  return (
    <>
      <PageHero
        eyebrow="운영 개선"
        en="Operation transformation"
        title={"문제를 발견하는 데서\n운영 개선이 시작됩니다."}
        description="시설 상태와 이용 데이터를 진단하고, 공간 · 프로그램 · 운영 시스템을 함께 개선합니다."
        breadcrumbs={[{ name: "운영 개선 사례", path: "/cases" }]}
        wideAside
        aside={
          hero && (
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-fog">
                <Image src={hero.src} alt={hero.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          )
        }
      />

      {/* 운영 개선 4단계 */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="process-title">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">개선 방식</p>
            <h2 id="process-title" className="t-h2 mt-3">
              현장에서 찾고, 현장에서 바꿉니다.
            </h2>
          </Reveal>
          <ol className="relative mt-12 grid gap-8 lg:mt-14 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-line lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[15px] lg:h-px lg:w-auto" />
            {process.map((p, i) => (
              <Reveal as="li" key={p.no} delay={i * 0.08} className="relative grid grid-cols-[2rem_1fr] gap-4 lg:block">
                <span className="relative z-10 grid size-8 place-items-center rounded-full bg-navy text-[0.8125rem] font-bold text-white ring-8 ring-white">
                  {p.no}
                </span>
                <div className="lg:mt-6 lg:pr-4">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="t-h4">{p.title}</span>
                    <span className="label-en text-steel">{p.en}</span>
                  </p>
                  <p className="t-small mt-2 text-body">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 대표 개선 사례 — 이미지 · 텍스트 교차 */}
      <section className="border-t border-line bg-white py-16 lg:py-24" aria-labelledby="featured-title">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">대표 개선 사례</p>
            <h2 id="featured-title" className="t-h2 mt-3">
              스포츠 시설의 운영 개선
            </h2>
          </Reveal>
          <ul className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
            {featured.map((t, i) => (
              <Reveal as="li" key={t.slug}>
                <Link href={`/cases/${t.slug}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  <div className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                    <CaseImage t={t} ratio="aspect-[16/10]" sizes="(min-width: 1024px) 56vw, 100vw" />
                  </div>
                  <div className="lg:col-span-5">
                    <p className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-accent">
                        {String(i + 1).padStart(2, "0")} · {t.facility}
                      </span>
                      <span className="label-en text-steel">{t.en}</span>
                    </p>
                    <h3 className="t-h3 mt-3 break-keep transition-colors group-hover:text-navy">{t.title}</h3>
                    <p className="t-body mt-3 break-keep text-body">{t.summary}</p>
                    <KeyPoints t={t} className="mt-7" />
                    <span className="mt-7 inline-flex items-center gap-2 font-semibold text-navy">
                      자세히 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 생활 · 공간 개선 사례 */}
      <section className="bg-mist py-16 lg:py-24" aria-labelledby="secondary-title">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">생활 · 공간 개선</p>
            <h2 id="secondary-title" className="t-h2 mt-3">
              비어 있던 공간을 다시 쓰이게
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {secondary.map((t, i) => (
              <Reveal as="li" key={t.slug} delay={(i % 2) * 0.06}>
                <Link href={`/cases/${t.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white transition-colors hover:border-navy">
                  <CaseImage t={t} ratio="aspect-video" square sizes="(min-width: 768px) 45vw, 100vw" />
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <p className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-accent">{t.facility}</span>
                      <span className="label-en text-steel">{t.en}</span>
                    </p>
                    <h3 className="t-h4 mt-2 break-keep transition-colors group-hover:text-navy">{t.summary}</h3>
                    <KeyPoints t={t} className="mt-5" />
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-navy">
                      자세히 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            사례 이미지는 개선 유형을 설명하기 위한 예시입니다. 현장명 · 전후 사진 · 결과 수치는 공개 동의와 근거 확인이 끝난 사례부터 게재합니다.
          </p>
        </div>
      </section>

      {/* 시설 교체에서 끝나지 않는 운영 개선 */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="scope-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <h2 id="scope-title" className="t-h2 break-keep sm:whitespace-pre-line">
              {"시설을 바꾸는 것에서\n운영 개선이 끝나지 않습니다."}
            </h2>
            <p className="t-body mt-5 max-w-xl break-keep text-body">
              공간을 개선하고, 프로그램을 설계하고, HILINK로 예약 · 출입 · 이용 기록을 연결합니다.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-4">
              {scope.map((s, i) => (
                <li key={s} className="bg-white px-4 py-5">
                  <span className="block text-xs font-semibold text-steel">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block font-semibold text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* HILINK 운영 시스템 연결 */}
      <section className="overflow-hidden bg-navy-deep text-white" aria-labelledby="hilink-title">
        <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow !text-[#9dbcf0]">운영에서 시스템까지</p>
            <h2 id="hilink-title" className="t-section mt-4 break-keep sm:whitespace-pre-line">
              {"개선된 공간을\n운영 시스템으로 연결합니다."}
            </h2>
            <p className="t-body mt-6 break-keep text-white/75">
              시설을 개선한 뒤에도 예약 · 출입 · 이용권 · 정산이 수기로 남아 있으면 운영 문제는 반복됩니다. 다짐은 HILINK를 통해 개선된 운영 기준을 실제 이용 흐름과 데이터로 연결합니다.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {hilinkFeatures.map((f) => (
                <li key={f} className="rounded-[4px] border border-line-dark px-3 py-1.5 text-sm font-semibold text-white/90">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/hilink" variant="outline-white">
                HILINK 보기
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="flex items-start justify-center gap-3 sm:gap-5">
              {hilinkScreens.map((id, i) => (
                <DemoPhone
                  key={id}
                  id={id}
                  className={cn("w-[31%] max-w-[13.5rem] shadow-none", i === 1 && "mt-10 sm:mt-14")}
                  sizes="(min-width: 1024px) 216px, 31vw"
                />
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-white/50">HILINK 입주민 앱 공개 데모 화면</p>
          </Reveal>
        </div>
      </section>

      <CTASection eyebrow="현장 진단" title={"우리 단지에도\n개선할 곳이 있을까요?"} />
    </>
  );
}
