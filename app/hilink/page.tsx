import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { DemoPhone } from "@/components/hilink/DemoPhone";
import { AdminConcept } from "@/components/hilink/AdminConcept";
import { FaceFlow } from "@/components/hilink/FaceFlow";
import { hilinkFunctions, hilinkSteps } from "@/data/hilink";
import { hilinkDemo, hilinkDemoFeatures, hilinkHeroDemos } from "@/data/hilinkDemo";
import { company, siteConfig } from "@/data/config";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "HILINK 커뮤니티 운영 플랫폼",
  description:
    "HILINK는 다짐이 개발한 커뮤니티 운영 플랫폼입니다. 입주민 앱, 안면인식 출입 연동, 시설 예약, 이용권 · 결제, 관리비 부과 자료, 이용 통계를 하나로 관리합니다.",
  path: "/hilink",
  keywords: ["커뮤니티 예약 시스템", "안면인식 출입통제", "아파트 출입관리", "커뮤니티 운영 플랫폼", "관리비 부과", "HILINK", "하이링크"],
});

/** 기존 출입 설비와의 역할 분담 (특정 설비 브랜드와 무관하게 일반화) */
const integration: [string, boolean, string][] = [
  ["출입 게이트 인증 · 보안", true, "출입 로그를 연동해 이용 통계로 활용"],
  ["입주민 세대 자격 확인", false, "세대 DB 연동, 외부인 등록 차단"],
  ["회원 등록 · 이용권 관리", false, "앱 가입 · 기간 · 잔여 횟수 관리"],
  ["시설 예약", false, "앱 예약 · 중복 예약 방지"],
  ["이용료 관리비 부과 · 정산", false, "세대별 부과 자료 · 월 정산 내역"],
];

export default function HilinkPage() {
  const heroIds = new Set(hilinkHeroDemos);
  const moreFeatures = hilinkDemoFeatures.filter((f) => !heroIds.has(f.id));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "HILINK",
          alternateName: "하이링크",
          applicationCategory: "BusinessApplication",
          operatingSystem: "iOS, Android, Web",
          description: "커뮤니티 회원 · 출입 · 예약 · 결제 · 운영 데이터 플랫폼",
          url: absoluteUrl("/hilink"),
          publisher: { "@type": "Organization", name: company.nameKo, url: siteConfig.url },
        }}
      />

      {/* HERO — 실제 공개 데모 3화면 */}
      <PageHero
        eyebrow="HILINK 운영 플랫폼"
        title={"운영을 시스템으로\n연결합니다."}
        description="입주민 앱 · 출입 · 예약 · 결제 · 운영 데이터를 하나로 관리하는 다짐의 커뮤니티 운영 플랫폼입니다."
        breadcrumbs={[{ name: "HILINK", path: "/hilink" }]}
        actions={
          <>
            <ButtonLink href="/contact?type=hilink" size="lg">
              HILINK 도입 문의
            </ButtonLink>
            <Link href="#app" className="group inline-flex items-center gap-2 self-center font-semibold text-navy">
              실제 화면 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          </>
        }
        aside={
          <div>
            <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:items-end sm:overflow-visible sm:px-0" aria-label="HILINK 입주민 앱 대표 화면">
              {hilinkHeroDemos.map((id, i) => (
                <li key={id} className={cn("w-[62vw] max-w-[16rem] shrink-0 snap-center sm:w-auto sm:max-w-none", i === 1 && "sm:-translate-y-8")}>
                  <DemoPhone id={id} priority={i === 0} sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 62vw" />
                  <p className="mt-3 text-center text-sm font-semibold text-ink">{hilinkDemo[id].label}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">HILINK 공개 데모</p>
          </div>
        }
      />

      {/* 실제 입주민 앱 — 기능별 화면 */}
      <section id="app" className="section-y scroll-mt-24 bg-white" aria-labelledby="app-title">
        <div className="container-x">
          <SectionHeader eyebrow="입주민 앱" en="Resident app" id="app-title" title={"기능마다\n실제 화면으로 보여드립니다."} />
          <ul className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:mt-14 lg:grid-cols-5">
            {moreFeatures.map((f, i) => (
              <Reveal as="li" key={f.id} delay={(i % 5) * 0.05} className="w-[58vw] max-w-[15rem] shrink-0 snap-center sm:w-auto sm:max-w-none">
                <DemoPhone id={f.id} sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 58vw" />
                <p className="mt-4 font-semibold">{f.title}</p>
                <p className="t-small mt-1 text-body">{f.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 주요 기능 */}
      <section id="functions" className="section-y scroll-mt-24 bg-mist" aria-labelledby="functions-title">
        <div className="container-x">
          <SectionHeader eyebrow="주요 기능" en="Features" id="functions-title" title="현장 운영에 실제로 쓰는 기능" />
          <dl className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {hilinkFunctions.map((f) => (
              <div key={f.title} className="border-t-2 border-navy pt-4">
                <dt className="t-h4">{f.title}</dt>
                <dd className="t-small mt-1.5 text-body">{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 관리자 Concept + 얼굴 등록 */}
      <section className="bg-navy-deep text-white" aria-labelledby="admin-title">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow !text-[#9dbcf0]">관리자 · 출입</p>
            <h2 id="admin-title" className="t-section mt-4">
              관리자와 출입까지
              <br />
              하나로 연결됩니다.
            </h2>
            <p className="t-lead mt-5 text-white/75">조치가 필요한 일을 먼저 알려주는 관리자 화면, 입주민이 직접 등록하는 안면인식 출입.</p>
            <FaceFlow className="mt-8" />
          </Reveal>
          <div className="lg:col-span-7">
            <AdminConcept />
            <p className="mt-3 text-xs text-white/45">관리자 개념 UI · 샘플 데이터</p>
          </div>
        </div>
      </section>

      {/* 기존 출입 설비와 함께 */}
      <section id="integration" className="section-y scroll-mt-24 bg-white" aria-labelledby="integration-title">
        <div className="container-x">
          <SectionHeader eyebrow="기존 설비와 함께" en="Integration" id="integration-title" title={"출입 설비는 그대로,\n운영관리는 HILINK로."} />
          <div className="mt-12 overflow-x-auto rounded-[4px] border border-line">
            <table className="w-full min-w-[36rem] text-left text-[0.9375rem]">
              <thead className="bg-navy text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    운영 기능
                  </th>
                  <th scope="col" className="w-36 px-5 py-4 text-center font-semibold">
                    기존 출입 설비
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    HILINK
                  </th>
                </tr>
              </thead>
              <tbody>
                {integration.map(([k, existing, v]) => (
                  <tr key={k} className="border-t border-line">
                    <th scope="row" className="px-5 py-4 font-semibold">
                      {k}
                    </th>
                    <td className="px-5 py-4 text-center">
                      {existing ? (
                        <span className="inline-flex items-center gap-1 text-navy">
                          <Check className="size-4" aria-hidden /> 유지
                        </span>
                      ) : (
                        <Minus className="mx-auto size-4 text-line-strong" aria-label="해당 없음" />
                      )}
                    </td>
                    <td className="px-5 py-4 text-body">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 도입 방식 */}
      <section className="section-y border-t border-line bg-white" aria-labelledby="steps-title">
        <div className="container-x">
          <SectionHeader eyebrow="도입 방식" en="Adoption" id="steps-title" title="현장 분석부터 안정화까지" />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {hilinkSteps.map((s, i) => (
              <li key={s.title}>
                <span className="grid size-8 place-items-center rounded-[4px] bg-navy text-sm font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                <p className="t-h4 mt-4">{s.title}</p>
                <p className="t-small mt-1.5 text-body">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="border-t-2 border-navy pt-5">
              <h3 className="t-h3">위탁운영과 함께</h3>
              <p className="t-small mt-2 text-body">다짐이 운영하는 현장에는 HILINK가 기본으로 적용됩니다.</p>
            </div>
            <div className="border-t-2 border-navy pt-5">
              <h3 className="t-h3">시스템만 도입</h3>
              <p className="t-small mt-2 text-body">단지가 직접 운영하면서 출입 · 예약 · 정산 시스템만 도입할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="HILINK 도입"
        title={"HILINK 도입,\n현장 확인부터 시작합니다."}
        description="세대수와 시설 구성, 현재 출입 · 예약 방식을 알려주시면 적용 범위를 제안드립니다."
        primary={{ label: "HILINK 도입 문의", href: "/contact?type=hilink" }}
        secondary={{ label: "운영 제안 문의", href: "/contact?type=proposal" }}
      />
    </>
  );
}
