import type { Metadata } from "next";
import Image from "next/image";
import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList } from "@/components/sections/FaqList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { AdminScreen, PhoneScreen } from "@/components/hilink/Screens";
import { hilinkExtensions, hilinkForWhom, hilinkFunctions, hilinkSteps } from "@/data/hilink";
import { hilinkHome } from "@/data/corporate";
import { faqs } from "@/data/insight";
import { brandAssets, company, siteConfig } from "@/data/config";
import { photoRef } from "@/lib/photos";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "HILINK 커뮤니티 운영 플랫폼",
  description:
    "HILINK는 다짐이 개발한 커뮤니티 운영 플랫폼입니다. 회원 · 세대 확인, 안면인식 출입 연동, 시설 예약, 이용권, 결제 · 정산, 관리비 부과 자료, 이용률 · 매출 통계, 공지 · 민원, 월간 보고를 하나로 관리합니다.",
  path: "/hilink",
  keywords: ["커뮤니티 예약 시스템", "안면인식 출입통제", "아파트 출입관리", "커뮤니티 운영 플랫폼", "관리비 부과", "HILINK", "하이링크"],
});

/** 기존 출입 설비와의 역할 분담 (특정 설비 브랜드와 무관하게 일반화) */
const integration: [string, boolean, string][] = [
  ["출입 게이트 인증 · 보안", true, "출입 로그를 연동해 시설별 이용 통계로 활용"],
  ["입주민 세대 자격 확인", false, "세대 DB 연동으로 입주민 · 세대원 여부 확인, 외부인 등록 차단"],
  ["회원 등록 · 이용권 관리", false, "앱 가입 · 회원권 기간 및 잔여 횟수 관리 (수기 가입서 없이)"],
  ["시설 예약 (골프 타석 · 독서실 · GX)", false, "앱 예약 · QR 입장 — 방문 없이 신청, 중복 예약 방지"],
  ["수강료 · 이용료 관리비 부과", false, "이용 내역을 집계해 세대별 관리비 부과 자료 생성 (일할 계산 포함)"],
  ["결제 · 환불 · 정산", false, "결제 · 환불 이력 기록, 월 정산 내역 산출"],
  ["이용 현황 · 매출 통계", false, "시설별 이용률 · 매출 리포트"],
  ["공지 · 민원 · 입주자대표회의 보고", false, "앱 공지 발송, 민원 접수 이력, 월간 보고 자료"],
];

export default function HilinkPage() {
  const hilinkFaqs = faqs.filter((f) => f.group === "HILINK");
  const screens = [photoRef("hilink-app"), photoRef("hilink-passes"), photoRef("hilink-store")].filter(Boolean) as NonNullable<ReturnType<typeof photoRef>>[];
  const device = photoRef("hilink-device");

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
          description: "커뮤니티 회원 · 출입 · 예약 · 정산 · 보고 운영 플랫폼",
          url: absoluteUrl("/hilink"),
          publisher: { "@type": "Organization", name: company.nameKo, url: siteConfig.url },
        }}
      />
      <PageHero
        eyebrow="HILINK 운영 플랫폼"
        title={"다짐의 현장 운영을\n기록하고 표준화합니다."}
        description="HILINK는 장식이 아니라 운영 인프라입니다. 다짐이 운영하는 현장의 이용과 운영을 기록하고, 관리비 부과와 월간 보고의 근거를 만듭니다."
        breadcrumbs={[{ name: "HILINK", path: "/hilink" }]}
        actions={
          <>
            <ButtonLink href="/contact?type=hilink" size="lg">
              HILINK 도입 문의
            </ButtonLink>
            <ButtonLink href="#functions" variant="secondary" size="lg" arrow={false}>
              주요 기능 보기
            </ButtonLink>
          </>
        }
        aside={
          <div>
            {brandAssets.hilink && (
              <span className="mb-6 inline-block rounded-[4px] bg-white px-3 py-2">
                <Image src={brandAssets.hilink.src} alt="HILINK" width={brandAssets.hilink.width} height={brandAssets.hilink.height} className="h-6 w-auto" />
              </span>
            )}
            {screens.length === 0 && (
              <div className="grid grid-cols-3 items-end gap-3">
                {(["member", "reservation", "access"] as const).map((k, i) => (
                  <div key={k} className={i === 1 ? "-translate-y-6" : undefined}>
                    <PhoneScreen screen={k} />
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-3 items-end gap-3">
              {screens.map((s, i) => (
                <div key={s.src} className={i === 1 ? "-translate-y-6" : undefined}>
                  <div className="relative aspect-[923/2000] overflow-hidden rounded-[8px] border border-line-strong bg-white shadow-[0_24px_48px_-28px_rgba(15,27,45,0.45)]">
                    <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="(min-width: 1024px) 190px, 30vw" className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">{screens.length > 0 ? hilinkHome.notice : "기능 설명을 위한 화면 구성 예시(데모 화면)입니다. 실제 화면과 다를 수 있습니다."}</p>
          </div>
        }
      />

      {/* 운영 순서 */}
      <section className="border-b border-line bg-white" aria-label="다짐의 메시지 순서">
        <div className="container-x"><ol className="grid gap-px bg-line md:grid-cols-4">
          {["실제 현장을 운영합니다", "본사와 현장 조직이 관리합니다", "시설과 프로그램을 개선합니다", "이 모든 운영을 HILINK로 기록합니다"].map((t, i) => (
            <li key={t} className="bg-white py-7 md:px-6 md:first:pl-0">
              <p className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="t-h4 mt-1">{t}</p>
            </li>
          ))}
        </ol></div>
      </section>

      {/* 누가 쓰나요 */}
      <section className="section-y bg-white" aria-labelledby="whom-title">
        <div className="container-x">
          <SectionHeader eyebrow="사용자" id="whom-title" title={"입주민, 현장 운영자, 관리 주체가\n같은 정보를 봅니다."} />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {hilinkForWhom.map((w, i) => (
              <Reveal key={w.who} delay={i * 0.06} className="border-t-2 border-navy pt-6">
                <h3 className="t-h3">{w.who}</h3>
                <ul className="mt-4 space-y-2.5">
                  {w.items.map((it) => (
                    <li key={it} className="t-small flex gap-2.5 text-body">
                      <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 기능 */}
      <section id="functions" className="section-y scroll-mt-24 bg-mist" aria-labelledby="functions-title">
        <div className="container-x">
          <SectionHeader eyebrow="주요 기능" id="functions-title" title="현장 운영에 실제로 쓰는 기능" />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {hilinkFunctions.map((f) => (
              <div key={f.title} className="bg-white p-7">
                <dt className="t-h4">{f.title}</dt>
                <dd className="t-small mt-2 text-body">{f.body}</dd>
              </div>
            ))}
          </dl>
          <p className="t-small mt-6 text-body">
            <span className="font-semibold text-ink">확장 기능 (별도 협의)</span> · {hilinkExtensions.join(" · ")}
          </p>
        </div>
      </section>

      {/* 기존 출입 설비와 함께 */}
      <section id="integration" className="section-y scroll-mt-24 bg-white" aria-labelledby="integration-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="기존 설비와 함께"
            id="integration-title"
            title={"출입 설비는 그대로,\n운영관리는 HILINK로."}
            description="이미 설치된 출입 통제 설비는 유지하고, 설비가 담당하지 못하는 운영관리 영역만 보완합니다. 연동 가능 여부는 현장 설비를 확인한 뒤 안내합니다."
          />
          <div className="mt-12 overflow-x-auto rounded-[4px] border border-line">
            <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
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
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["추가 설비 투자 최소화", "기존 출입 게이트를 그대로 쓰고 운영관리 소프트웨어를 더합니다."],
              ["안내 업무 자동화", "수기 접수 · 예약 · 부과 업무를 시스템으로 옮겨 인력 부담을 줄입니다."],
              ["검증 가능한 운영", "이용 · 매출 데이터가 자동 집계되어 월간 보고 자료가 됩니다."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-[4px] bg-mist p-6">
                <p className="t-h4">{t}</p>
                <p className="t-small mt-2 text-body">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 관리자 · 단말기 */}
      <section className="bg-navy text-white" aria-labelledby="admin-title">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow !text-[#9dbcf0]">관리자 CRM · 출입 단말기</p>
            <h2 id="admin-title" className="t-h2 mt-3">
              현장과 본사가 같은 화면을 봅니다
            </h2>
            <p className="t-body mt-5 text-white/75">
              회원 · 출입 · 예약 · 락커 · 정산 · 공지 · 민원 · 통계를 관리자 화면에서 확인합니다. 관리사무소와 입주자대표회의는 권한에 따라 이용 · 매출 현황을 열람합니다.
            </p>
            {device && (
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-32 w-[5.5rem] shrink-0 overflow-hidden rounded-[4px]">
                  <Image src={device.src} alt={device.alt} fill sizes="88px" className="object-cover" />
                </div>
                <p className="t-small text-white/70">안면인식 출입 단말기 — 앱에서 등록한 얼굴로 출입하고, 이용권이 만료되면 출입이 제한됩니다.</p>
              </div>
            )}
          </Reveal>
          <div className="lg:col-span-7">
            <div className="relative">
              <span className="absolute -top-3 left-4 z-10 rounded-[2px] bg-accent px-2 py-1 text-xs font-semibold text-white">데모 화면</span>
              <AdminScreen />
            </div>
            <p className="mt-3 text-xs text-white/50">관리자 화면은 내부 설계 보호를 위해 실제 화면 대신 개념 화면으로 보여드립니다. 데이터는 표시하지 않습니다.</p>
          </div>
        </div>
      </section>

      {/* 도입 절차 */}
      <section className="section-y bg-white" aria-labelledby="steps-title">
        <div className="container-x">
          <SectionHeader eyebrow="도입 절차" id="steps-title" title="현장 분석부터 안정화까지" />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {hilinkSteps.map((s, i) => (
              <li key={s.title} className="bg-white p-7">
                <span className="grid size-8 place-items-center rounded-[4px] bg-navy text-sm font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                <p className="t-h4 mt-4">{s.title}</p>
                <p className="t-small mt-2 text-body">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-[4px] border border-line p-7">
              <h3 className="t-h3">위탁운영과 함께</h3>
              <p className="t-small mt-2 text-body">다짐이 커뮤니티를 운영하는 현장에는 HILINK가 기본으로 적용됩니다.</p>
              <ButtonLink href="/contact?type=proposal" variant="text" className="mt-5">
                운영 제안 문의
              </ButtonLink>
            </div>
            <div className="rounded-[4px] border border-line p-7">
              <h3 className="t-h3">시스템만 도입</h3>
              <p className="t-small mt-2 text-body">단지 · 시설이 직접 운영하면서 출입 · 예약 · 정산 시스템만 도입할 수 있습니다.</p>
              <ButtonLink href="/contact?type=hilink" variant="text" className="mt-5">
                HILINK 도입 문의
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {hilinkFaqs.length > 0 && (
        <section className="section-y border-t border-line bg-white" aria-labelledby="hilink-faq-title">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="자주 묻는 질문" id="hilink-faq-title" title="HILINK 도입 전 확인하세요" size="h2" />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={hilinkFaqs} />
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="HILINK 도입"
        title={"HILINK 도입,\n현장 확인부터 시작합니다."}
        description="세대수와 시설 구성, 현재 출입 · 예약 방식을 알려주시면 단말기 수량과 적용 범위를 제안드립니다."
        primary={{ label: "HILINK 도입 문의", href: "/contact?type=hilink" }}
        secondary={{ label: "운영 제안 문의", href: "/contact?type=proposal" }}
      />
    </>
  );
}
