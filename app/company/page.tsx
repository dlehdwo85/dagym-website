import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Numbers } from "@/components/home/Numbers";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Photo, photoVisible } from "@/components/ui/Photo";
import { companyAreas, companyIntro, hqSupport, principles } from "@/data/company";
import { certifications, company, history, isVerified, partners } from "@/data/config";
import { showPhotoSlots } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "회사소개",
  description:
    "주식회사 다짐은 아파트 · 기업 · 호텔 커뮤니티 시설을 운영하고, 회원관리 · 출입 시스템 HILINK와 헬스기구 · 스크린골프 납품을 함께 제공합니다.",
  path: "/company",
});

const why = [
  { en: "People", title: "시설은 사람이 있어야 쓰입니다", body: "안내 · 트레이너 · 강사가 현장에 있어야 입주민이 시설을 편하게 이용합니다. 다짐은 운영 인력을 직접 채용하고 교육합니다." },
  { en: "Record", title: "기록이 있어야 유지됩니다", body: "민원, 청소, 비품, 근태, 이용 현황을 체크리스트와 HILINK에 남깁니다. 담당자가 바뀌어도 운영 수준이 유지되도록 합니다." },
  { en: "Report", title: "보고가 있어야 신뢰가 쌓입니다", body: "본사가 매주 현장을 점검하고 매달 운영 결과를 보고합니다. 관리 주체는 HILINK 화면으로 현황을 직접 확인합니다." },
];

const areaEn = ["Community Operation", "Technology", "Equipment"];
const principleEn = ["Headquarters", "Records", "Residents", "Training"];

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
      <PageHero
        eyebrow="About DAGYM"
        display={"Operating better\nevery day"}
        title={companyIntro.title}
        breadcrumbs={[{ name: "회사소개", path: "/company" }]}
      />

      {/* Story */}
      <section className="section-y bg-white" aria-labelledby="story-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <p className="eyebrow text-steel lg:col-span-3 lg:pt-3">Our story</p>
          <div className="lg:col-span-9">
            <MaskText id="story-title" text={"사람이 운영하고\n기술이 연결하는\n커뮤니티 운영회사."} className="t-section" />
            <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
              {companyIntro.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="t-lead text-body">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showTeam && (
        <div className="container-x bg-white pb-20">
          <Photo id="company-team" className="aspect-[16/9] max-h-[80vh]" sizes="100vw" />
        </div>
      )}

      {/* Why */}
      <section className="section-y bg-night text-white" aria-labelledby="why-title">
        <div className="container-x">
          <SectionHeader tone="dark" eyebrow="Why operation" id="why-title" title={"준공으로 끝나는 공간은 없습니다.\n매일의 운영이 가치를 만듭니다."} />
          <ol className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-3 lg:gap-10">
            {why.map((w, i) => (
              <Reveal as="li" key={w.en} delay={i * 0.1} className="border-t border-white/30 pt-6">
                <p className="display text-[3rem] normal-case text-white/90">{w.en}</p>
                <h3 className="t-h4 mt-6">{w.title}</h3>
                <p className="t-small mt-3 text-white/60">{w.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white" aria-labelledby="mission-title">
        <div className="container-x py-24 lg:py-40">
          <p className="eyebrow text-steel">Mission</p>
          <MaskText id="mission-title" text={"공간을 운영하고,\n일상을 연결합니다."} className="t-hero mt-8 text-ink" />
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-line bg-white" aria-labelledby="areas-title">
        <div className="container-x py-20 lg:py-28">
          <h2 id="areas-title" className="eyebrow text-steel">
            What we do
          </h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {companyAreas.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.08} className="border-t border-ink pt-6">
                <p className="eyebrow text-steel">{areaEn[i]}</p>
                <p className="t-h3 mt-3">{a.title}</p>
                <p className="t-small mt-3 text-body">{a.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-y bg-mist" aria-labelledby="principles-title">
        <div className="container-x">
          <SectionHeader eyebrow="Philosophy" id="principles-title" title={"현장을 맡긴 뒤에도\n본사가 함께 관리합니다."} />
          <ol className="mt-16 border-t border-ink lg:mt-24">
            {principles.map((p, i) => (
              <li key={p.title} className="grid gap-3 border-b border-line-strong py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
                <span className="font-display text-sm text-steel lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <p className="eyebrow text-steel lg:col-span-2 lg:pt-2">{principleEn[i]}</p>
                <h3 className="t-h3 lg:col-span-4">{p.title}</h3>
                <p className="t-body text-body lg:col-span-5">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Numbers tone="white" />

      {/* History */}
      {history.length > 0 ? (
        <section className="section-y border-t border-line bg-white" aria-labelledby="history-title">
          <div className="container-x">
            <SectionHeader eyebrow="History" id="history-title" title="다짐이 걸어온 길" size="h2" />
            <ol className="mt-12 border-t border-ink">
              {history.map((h) => (
                <li key={h.year} className="grid gap-3 border-b border-line py-8 md:grid-cols-[14rem_1fr]">
                  <p className="display text-[3rem]">{h.year}</p>
                  <ul className="t-body space-y-1.5 text-body">
                    {h.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : (
        showPhotoSlots && (
          <div className="container-x pb-10">
            <p className="border border-dashed border-line-strong p-5 text-sm text-muted" data-review="todo-verify">
              검수용 · HISTORY TODO_VERIFY — data/config.ts 의 history 에 확인된 연혁을 입력하면 연혁 섹션이 표시됩니다.
            </p>
          </div>
        )
      )}

      {/* Organization */}
      <section className="section-y bg-charcoal text-white" aria-labelledby="org-title">
        <div className="container-x">
          <SectionHeader tone="dark" eyebrow="Organization" id="org-title" title={"본사가 현장을\n뒷받침합니다."} size="h2" />
          <div className="mt-16 lg:mt-20">
            <div className="mx-auto w-fit border border-white/40 px-8 py-4 text-center">
              <p className="eyebrow text-white/50">Headquarters</p>
              <p className="mt-1 font-semibold">본사</p>
            </div>
            <div className="mx-auto h-10 w-px bg-white/30" aria-hidden />
            <ul className="relative grid gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
              {hqSupport.map((h) => (
                <li key={h.title} className="bg-charcoal p-6 lg:p-8">
                  <p className="t-h4">{h.title}</p>
                  <p className="t-small mt-2 text-white/60">{h.body}</p>
                </li>
              ))}
            </ul>
            <div className="mx-auto h-10 w-px bg-white/30" aria-hidden />
            <div className="mx-auto max-w-xl border border-signal/60 px-8 py-5 text-center">
              <p className="eyebrow text-signal">On-site team</p>
              <p className="mt-1 font-semibold">현장 운영팀 — 안내 · 트레이너 · 강사 · 골프 프로</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      {(partners.length > 0 || certifications.length > 0) ? (
        <section className="section-y border-t border-line bg-white" aria-labelledby="partners-title">
          <div className="container-x">
            <SectionHeader eyebrow="Partners" id="partners-title" title="함께하는 곳" size="h2" />
            <ul className="mt-10 grid gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
              {[...partners.map((p) => p.name), ...certifications.map((c) => c.title)].map((n) => (
                <li key={n} className="grid min-h-28 place-items-center bg-white p-5 text-center text-body">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        showPhotoSlots && (
          <div className="container-x py-10">
            <p className="border border-dashed border-line-strong p-5 text-sm text-muted" data-review="todo-verify">
              검수용 · PARTNERS TODO_VERIFY — data/config.ts 의 partners · certifications 에 확인된 항목을 입력하면 표시됩니다.
            </p>
          </div>
        )
      )}

      {/* Info */}
      <section id="info" className="scroll-mt-20 border-t border-line bg-white" aria-labelledby="info-title">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <p className="eyebrow text-steel">Company</p>
            <h2 id="info-title" className="t-h2 mt-4">
              회사 개요
            </h2>
            <ButtonLink href="/hilink" variant="text" className="mt-8">
              HILINK 알아보기
            </ButtonLink>
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
