import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { HilinkMark, Logo } from "@/components/ui/Logo";
import { FloorPlan } from "@/components/visuals/FloorPlan";
import { companyStory, coreValues, missionVision, operatingSystem, partnershipTypes } from "@/data/company";
import { certifications, company, history, isVerified, metrics, partners, PENDING_LABEL } from "@/data/config";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "회사소개",
  description:
    "주식회사 다짐(DAGYM)은 아파트 · 기업 · 복합시설의 커뮤니티 공간을 현장 운영 인력과 자체 플랫폼 HILINK로 운영하는 커뮤니티 운영 전문 기업입니다.",
  path: "/company",
});

const infoRows: [string, string][] = [
  ["회사명", `${company.nameKo} (${company.nameEn})`],
  ["대표이사", company.ceo],
  ["설립일", company.founded],
  ["사업자등록번호", company.businessNumber],
  ["주요 사업", company.domains.join(" · ")],
  ["자체 플랫폼", "HILINK — 커뮤니티 통합 운영 플랫폼"],
  ["대표번호", company.phone],
  ["이메일", company.email],
  ["주소", company.address],
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="About DAGYM"
        title={
          <>
            공간을 이해하고
            <br />
            운영의 기준을 만듭니다.
          </>
        }
        description="다짐은 아파트 · 주거시설 · 기업 · 복합시설의 커뮤니티 공간을 현장 운영 인력과 자체 플랫폼 HILINK로 함께 운영하는 커뮤니티 운영 전문 기업입니다."
        breadcrumbs={[{ name: "COMPANY", path: "/company" }]}
        aside={
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <FloorPlan />
          </div>
        }
      />

      {/* 회사소개 — 왜 만들어졌는가 */}
      <section id="about" className="section-y scroll-mt-20 bg-white" aria-labelledby="about-title">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="t-eyebrow flex items-center gap-3 text-accent">
                  <span aria-hidden className="h-px w-8 bg-accent/60" />
                  Why we exist
                </p>
              </Reveal>
              <Reveal delay={60}>
                <h2 id="about-title" className="t-h2 mt-6 whitespace-pre-line">
                  {companyStory.lead}
                </h2>
              </Reveal>
            </div>
            <ol className="grid gap-px bg-mist-200 lg:col-span-7">
              {companyStory.problems.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 80} className="bg-white py-8 sm:px-8">
                  <p className="t-num text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="t-h4 mt-3">{p.title}</h3>
                  <p className="t-body mt-3 text-mist-600">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal>
            <div className="mt-20 grid gap-10 border-t border-ink pt-12 lg:mt-28 lg:grid-cols-12">
              <p className="t-eyebrow text-mist-500 lg:col-span-3">Our answer</p>
              <p className="t-h3 font-semibold lg:col-span-9">{companyStory.answer}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand Story — Offline + Digital */}
      <section className="on-dark bg-ink text-white" aria-labelledby="brand-title">
        <div className="container-x section-y">
          <SectionHeader
            tone="dark"
            eyebrow="Brand Story"
            id="brand-title"
            title={"운영과 기술을 하나로."}
            description="다짐의 브랜드는 두 가지 운영이 만나는 지점에서 출발합니다. 사람이 공간을 운영하고, 기술이 그 운영을 기록하고 연결합니다."
            align="split"
          />
          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-3 lg:mt-20">
            <Reveal className="bg-ink p-8 lg:p-10">
              <p className="t-eyebrow text-accent-light">Offline</p>
              <p className="t-h3 mt-5">사람의 운영</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">
                센터장, 트레이너, 골프 프로, 강사, 안내 인력이 매일 공간을 열고 입주민을 맞이합니다.
              </p>
            </Reveal>
            <Reveal delay={80} className="bg-ink p-8 lg:p-10">
              <HilinkMark className="text-[1.25rem]" />
              <p className="t-h3 mt-5">기술의 운영</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">
                출입 · 예약 · 결제 · 통계를 자체 플랫폼으로 처리해 운영의 모든 순간을 데이터로 남깁니다.
              </p>
            </Reveal>
            <Reveal delay={160} className="bg-navy-900 p-8 lg:p-10">
              <Logo tone="light" />
              <p className="t-h3 mt-5">하나의 운영</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">
                두 운영을 한 회사가 책임지기 때문에 연동 비용도, 책임 공백도 없습니다.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="section-y scroll-mt-20 bg-white" aria-label="미션과 비전">
        <div className="container-x">
        <div className="grid gap-px bg-mist-200 lg:grid-cols-2">
          {[missionVision.mission, missionVision.vision].map((m, i) => (
            <Reveal key={m.en} delay={i * 100} className="bg-white py-10 lg:px-12 lg:py-16 lg:first:pl-0">
              <p className="t-eyebrow text-accent">{m.en}</p>
              <h2 className="t-h2 mt-6">{m.title}</h2>
              <p className="t-lead mt-6 max-w-xl text-mist-600">{m.body}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="section-y scroll-mt-20 bg-mist-50" aria-labelledby="values-title">
        <div className="container-x">
          <SectionHeader eyebrow="Core Values" id="values-title" title={"다짐이 일하는\n네 가지 기준."} />
          <ol className="mt-14 grid gap-px bg-mist-200 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {coreValues.map((v, i) => (
              <Reveal as="li" key={v.en} delay={i * 70} className="flex min-h-72 flex-col bg-white p-7 lg:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="t-num text-sm text-mist-400">{v.no}</span>
                  <span className="t-eyebrow text-accent">{v.en}</span>
                </div>
                <h3 className="t-h3 mt-auto pt-16">{v.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist-600">{v.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 운영 시스템 */}
      <section id="system" className="section-y scroll-mt-20 bg-white" aria-labelledby="system-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="Operating System"
            id="system-title"
            title={"본사가 기준을 만들고,\n현장이 실행합니다."}
            description="현장 조직은 센터장을 중심으로 움직이고, 본사는 기획 · 인력 · 품질 · 플랫폼으로 현장을 지원합니다. 고객은 하나의 창구로 보고받습니다."
            align="split"
          />
          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-[1.2fr_auto_1fr_auto_0.8fr] lg:items-stretch">
            <Reveal className="border border-mist-200 p-7">
              <p className="t-eyebrow text-mist-400">{operatingSystem.headquarters.en}</p>
              <h3 className="t-h4 mt-2">{operatingSystem.headquarters.title}</h3>
              <ul className="mt-6 grid gap-px bg-mist-200 sm:grid-cols-2">
                {operatingSystem.headquarters.units.map((u) => (
                  <li key={u.name} className="bg-white p-4">
                    <p className="text-[0.9375rem] font-semibold">
                      {u.name === "HILINK" ? <HilinkMark tone="dark" className="text-[0.9375rem]" /> : u.name}
                    </p>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-mist-600">{u.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Connector />
            <Reveal delay={80} className="bg-navy-950 p-7 text-white">
              <p className="t-eyebrow text-white/45">{operatingSystem.field.en}</p>
              <h3 className="t-h4 mt-2">{operatingSystem.field.title}</h3>
              <div className="mt-6 border border-accent-light/60 px-4 py-3 text-center font-semibold">{operatingSystem.field.lead}</div>
              <div className="mx-auto h-4 w-px bg-white/25" aria-hidden />
              <ul className="grid grid-cols-2 gap-2">
                {operatingSystem.field.roles.map((r) => (
                  <li key={r} className="border border-white/15 px-3 py-2.5 text-center text-[0.8125rem] text-white/80">
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Connector />
            <Reveal delay={160} className="border border-mist-200 bg-mist-50 p-7">
              <p className="t-eyebrow text-mist-400">{operatingSystem.client.en}</p>
              <h3 className="t-h4 mt-2">{operatingSystem.client.title}</h3>
              <ul className="mt-6 space-y-2">
                {operatingSystem.client.parties.map((p) => (
                  <li key={p} className="border-b border-mist-200 pb-2 text-[0.9375rem]">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.8125rem] leading-relaxed text-mist-600">월간 운영 리포트 · 단일 보고 창구</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 숫자 (확인된 값만) */}
      <section className="border-y border-mist-200 bg-white" aria-label="다짐 주요 지표">
        <div className="container-x">
        <dl className="grid grid-cols-2 gap-px bg-mist-200 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.key} className="bg-white px-1 py-10 sm:px-6">
              <dt className="t-eyebrow !text-[0.625rem] text-mist-400">{m.label}</dt>
              <dd className="mt-4">
                {m.text ? (
                  <HilinkMark tone="dark" className="text-[1.75rem]" />
                ) : m.value !== null ? (
                  <MetricCounter value={m.value} suffix={m.suffix} className="t-num text-[2.25rem] font-semibold" suffixClassName="ml-1 text-base text-mist-500" />
                ) : (
                  <span className="t-num text-[2.25rem] font-semibold text-mist-300" data-todo="verify">
                    —<span className="ml-2 align-middle text-xs font-normal text-mist-400">{PENDING_LABEL}</span>
                  </span>
                )}
                <span className="mt-2 block text-[0.8125rem] text-mist-500">{m.labelKo}</span>
              </dd>
            </div>
          ))}
        </dl>
        </div>
      </section>

      {/* History — 확인된 연혁이 입력된 경우에만 노출 */}
      {history.length > 0 && (
        <section id="history" className="section-y scroll-mt-20 bg-white" aria-labelledby="history-title">
          <div className="container-x">
            <SectionHeader eyebrow="History" id="history-title" title="다짐이 걸어온 길" />
            <ol className="mt-14 border-t border-mist-200">
              {history.map((h) => (
                <li key={h.year} className="grid gap-4 border-b border-mist-200 py-8 md:grid-cols-12">
                  <p className="t-num text-3xl font-semibold md:col-span-3">{h.year}</p>
                  <ul className="space-y-2 text-mist-700 md:col-span-9">
                    {h.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Partnership */}
      <section id="partners" className="section-y scroll-mt-20 bg-mist-50" aria-labelledby="partners-title">
        <div className="container-x">
          <SectionHeader
            eyebrow="Partnership"
            id="partners-title"
            title={"커뮤니티를 함께 만드는\n파트너와 협업합니다."}
            align="split"
            description="기획 단계의 시행사부터 운영 단계의 관리회사, 설비 제조사까지. 각 주체의 역할이 끊기지 않도록 다짐이 운영의 중심에서 연결합니다."
          />
          <ul className="mt-14 grid gap-px bg-mist-200 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {partnershipTypes.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="bg-white p-7">
                <h3 className="t-h4">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-600">{p.body}</p>
              </Reveal>
            ))}
          </ul>
          {partners.length > 0 && (
            <ul className="mt-10 grid grid-cols-2 gap-px bg-mist-200 sm:grid-cols-4 lg:grid-cols-6">
              {partners.map((p) => (
                <li key={p.name} className="flex h-24 items-center justify-center bg-white p-6">
                  {p.logo ? (
                    <Image src={p.logo} alt={p.name} width={140} height={48} className="h-auto max-h-10 w-auto opacity-70 grayscale" />
                  ) : (
                    <span className="text-sm font-semibold text-mist-600">{p.name}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {certifications.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-3">
              {certifications.map((c) => (
                <li key={c.title} className="border border-mist-300 bg-white px-4 py-2 text-sm">
                  {c.title}
                  {c.issuer && <span className="text-mist-500"> · {c.issuer}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 회사 기본정보 */}
      <section id="info" className="section-y scroll-mt-20 bg-white" aria-labelledby="info-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Company Information" id="info-title" title="회사 정보" />
          </div>
          <Reveal className="lg:col-span-8">
            <dl className="border-t border-ink">
              {infoRows.map(([k, v]) => {
                const pending = !isVerified(v);
                return (
                  <div key={k} className="grid gap-1 border-b border-mist-200 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-[0.875rem] text-mist-500">{k}</dt>
                    <dd className={pending ? "text-mist-400" : "text-ink"} data-todo={pending ? "verify" : undefined}>
                      {pending ? PENDING_LABEL : v}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <Link href="/contact?type=etc" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold link-underline">
              회사소개서 요청하기 <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center py-1 lg:px-1 lg:py-0" aria-hidden>
      <span className="h-6 w-px bg-mist-300 lg:h-px lg:w-8" />
    </div>
  );
}
