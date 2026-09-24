import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { companyAreas, companyIntro, hqSupport, principles } from "@/data/company";
import { certifications, company, history, isVerified, partners } from "@/data/config";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "회사소개",
  description:
    "주식회사 다짐은 아파트 · 기업 · 호텔 커뮤니티 시설을 운영하고, 회원관리 · 출입 시스템 HILINK와 헬스기구 · 스크린골프 납품을 함께 제공합니다.",
  path: "/company",
});

export default function CompanyPage() {
  const infoRows: [string, string][] = [
    ["회사명", `${company.nameKo} (${company.nameEn})`],
    ["대표", company.ceo],
    ["설립", company.founded],
    ["사업자등록번호", company.businessNumber],
    ["주요 사업", company.domains.join(", ")],
    ["주소", company.address],
    ["대표번호", company.phone],
    ["이메일", company.email],
  ];
  const visibleInfo = infoRows.filter(([, v]) => isVerified(v));
  const showTeam = photoVisible("company-team");

  return (
    <>
      <PageHero label="회사소개" title={companyIntro.title} breadcrumbs={[{ name: "회사소개", path: "/company" }]} />
      {photoVisible("company-banner") && (
        <div className="container-x pt-10 lg:pt-14">
          <Photo id="company-banner" priority className="aspect-[12/5]" sizes="100vw" />
        </div>
      )}

      <section className="section-y bg-white" aria-labelledby="about-title">
        <div className={cn("container-x grid gap-12", showTeam && "lg:grid-cols-2 lg:gap-16")}>
          <div>
            <h2 id="about-title" className="sr-only">
              다짐 소개
            </h2>
            {companyIntro.body.map((p) => (
              <p key={p} className="t-lead mt-5 max-w-3xl text-body first:mt-0">
                {p}
              </p>
            ))}
            <dl className="mt-12 border-t border-ink">
              {companyAreas.map((a) => (
                <div key={a.title} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-semibold">{a.title}</dt>
                  <dd className="text-body">{a.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          {showTeam && <Photo id="company-team" className="aspect-[16/10] lg:aspect-auto" />}
        </div>
      </section>

      <section className="section-y bg-paper" aria-labelledby="principles-title">
        <div className="container-x">
          <SectionHeader label="일하는 방식" id="principles-title" title={"현장을 맡긴 뒤에도\n본사가 함께 관리합니다."} />
          <ol className="mt-12 grid gap-x-12 border-t border-ink md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="border-b border-line-strong py-7">
                <p className="text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-2">{p.title}</h3>
                <p className="t-body mt-2 text-body">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-white" aria-labelledby="hq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              label="운영 체계"
              id="hq-title"
              title={"현장 인력과\n본사 지원 조직"}
              description="현장에는 인포메이션 · 트레이너 · 강사가 상주하고, 본사는 기획 · 인사 · 정산 · 시스템으로 현장을 지원합니다. 법률 · 노무 · 세무는 전문 법인과 협업합니다."
            />
          </div>
          <dl className="grid gap-x-10 border-t border-ink sm:grid-cols-2 lg:col-span-7">
            {hqSupport.map((h) => (
              <div key={h.title} className="border-b border-line py-6">
                <dt className="t-h4">{h.title}</dt>
                <dd className="mt-1.5 text-body">{h.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {history.length > 0 && (
        <section className="section-y border-t border-line bg-white" aria-labelledby="history-title">
          <div className="container-x">
            <SectionHeader label="연혁" id="history-title" title="다짐이 걸어온 길" />
            <ol className="mt-12 border-t border-ink">
              {history.map((h) => (
                <li key={h.year} className="grid gap-3 border-b border-line py-6 md:grid-cols-[10rem_1fr]">
                  <p className="t-h3">{h.year}</p>
                  <ul className="space-y-1.5 text-body">
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

      {(partners.length > 0 || certifications.length > 0) && (
        <section className="section-y border-t border-line bg-white" aria-labelledby="partners-title">
          <div className="container-x">
            <SectionHeader label="협력 · 인증" id="partners-title" title="함께하는 곳" />
            <ul className="mt-10 flex flex-wrap gap-3">
              {[...partners.map((p) => p.name), ...certifications.map((c) => c.title)].map((n) => (
                <li key={n} className="border border-line px-4 py-2 text-body">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="info" className="section-y scroll-mt-20 border-t border-line bg-white" aria-labelledby="info-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader label="회사 정보" id="info-title" title="회사 개요" />
          </div>
          <dl className="border-t border-ink lg:col-span-8">
            {visibleInfo.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection />
    </>
  );
}
