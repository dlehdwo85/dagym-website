import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AudioLines, BellRing, CalendarCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { DemoPhone } from "@/components/hilink/DemoPhone";
import { ButtonLink } from "@/components/ui/Button";
import { divisions, facilityTypes, groupHero, platforms } from "@/data/group";
import { brandMotto } from "@/data/company";
import { hqDepartments } from "@/data/corporate";
import { photoRef } from "@/lib/photos";
import { PlatformIcon } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

/** 기업형 Hero — 도시 전경 위 네이비 그라데이션, 회사명 · 두 사업 부문을 먼저 */
export function GroupHero() {
  const img = photoRef(groupHero.image);
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white" aria-labelledby="hero-title">
      {img && (
        <Image src={img.src} alt={img.alt} fill priority sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-deep/80 to-transparent" />
      <div className="container-x flex min-h-[640px] flex-col justify-end pb-16 pt-36 lg:min-h-[760px] lg:pb-24">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.08em] text-accent-on-dark">{groupHero.eyebrow}</p>
          <h1 id="hero-title" className="mt-5 break-keep text-[2.5rem] font-bold leading-[1.15] tracking-[-0.035em] sm:whitespace-pre-line lg:text-[4rem]">
            {groupHero.title}
          </h1>
          <p className="t-lead mt-6 max-w-2xl break-keep text-white/80">{groupHero.lead}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            {groupHero.ctas.map((c, i) => (
              <ButtonLink key={c.href} href={c.href} variant={i === 0 ? "white" : "outline-white"} size="lg">
                {c.label}
              </ButtonLink>
            ))}
          </div>
        </Reveal>
        {/* 사업 부문 요약 띠 */}
        <Reveal delay={0.12} className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-white/15 bg-white/15 sm:grid-cols-2 lg:mt-20">
          {divisions.map((d) => (
            <a key={d.no} href="#divisions" className="group bg-navy-deep/70 p-6 backdrop-blur-sm transition-colors hover:bg-navy-deep/90 lg:p-7">
              <p className="flex items-center gap-3 text-sm">
                <span className="font-bold text-accent-on-dark">{d.no}</span>
                <span className="label-en text-white/60">{d.en}</span>
              </p>
              <p className="mt-2 flex items-center justify-between text-xl font-bold">
                {d.title}
                <ArrowRight className="btn-arrow size-5 text-white/60" aria-hidden />
              </p>
              <p className="mt-1.5 text-sm text-white/65">{d.units.map((u) => u.name).join(" · ")}</p>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** 사업 구조 — 주식회사 다짐 아래 두 부문 */
export function BusinessStructure() {
  return (
    <section id="divisions" className="scroll-mt-20 bg-white py-24 lg:py-32" aria-labelledby="divisions-title">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">BUSINESS DIVISIONS</p>
          <h2 id="divisions-title" className="t-section mt-4 break-keep sm:whitespace-pre-line">
            {"시설 운영과 플랫폼,\n두 사업 부문으로 일합니다."}
          </h2>
        </Reveal>

        {/* 구조도 */}
        <Reveal delay={0.06} className="mt-14 lg:mt-16">
          <div className="flex justify-center">
            <span className="rounded-[4px] bg-navy px-6 py-3 text-[0.9375rem] font-bold text-white">주식회사 다짐</span>
          </div>
          <div aria-hidden className="mx-auto hidden h-6 w-px bg-line-strong md:block" />
          <div aria-hidden className="mx-auto hidden h-6 w-1/2 border-x border-t border-line-strong md:block" />
          <div className="mt-6 grid gap-6 md:mt-0 md:grid-cols-2 md:gap-0">
            {divisions.map((d) => (
              <div key={d.no} className="md:px-5">
                <div className="border-t-2 border-navy pt-7">
                  <p className="flex items-center gap-3">
                    <span className="text-sm font-bold text-accent">{d.no}</span>
                    <span className="label-en text-steel">{d.en}</span>
                  </p>
                  <h3 className="t-h3 mt-2">{d.title}</h3>
                  <p className="t-body mt-3 break-keep text-body">{d.lead}</p>
                  <ul className="mt-6 border-t border-line">
                    {d.units.map((u) => {
                      const inner = (
                        <>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 font-semibold text-ink">
                              {u.logo && <PlatformIcon src={u.logo} className="size-6" />}
                              {u.name}
                              {u.status === "coming-soon" && (
                                <span className="rounded-[2px] bg-accent-soft px-1.5 py-0.5 text-[11px] font-bold text-accent">출시 예정</span>
                              )}
                            </span>
                            <span className="t-small mt-0.5 block break-keep text-body">{u.body}</span>
                          </span>
                          {u.href && <ArrowRight className="btn-arrow size-4 shrink-0 text-steel" aria-hidden />}
                        </>
                      );
                      return (
                        <li key={u.name} className="border-b border-line">
                          {u.href ? (
                            <Link href={u.href} className="group flex items-center justify-between gap-4 py-4 hover:text-navy">
                              {inner}
                            </Link>
                          ) : (
                            <div className="flex items-center justify-between gap-4 py-4">{inner}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** 시설 운영 부문 — 운영 · 제안 시설 유형 (실적 아님) */
export function FacilityPortfolio() {
  return (
    <section className="bg-mist py-24 lg:py-32" aria-labelledby="facility-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">01 · FACILITY OPERATION</p>
            <h2 id="facility-title" className="t-section mt-4 break-keep sm:whitespace-pre-line">
              {"주거부터 호텔 · 산업단지까지,\n시설에 맞는 운영을 설계합니다."}
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-5">
            <p className="t-body break-keep text-body">
              공간의 성격과 이용자에 따라 운영 인력 · 프로그램 · 출입 기준이 달라집니다. 다짐은 시설별 운영 기준을 세우고 본사가 함께 관리합니다.
            </p>
            <Link href="/business" className="group mt-5 inline-flex items-center gap-2 font-semibold text-navy">
              사업영역 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {facilityTypes.map((f, i) => {
            const img = photoRef(f.photo);
            return (
              <Reveal as="li" key={f.title} delay={i * 0.05}>
                <Link href={f.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-fog">
                    {img && (
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    )}
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/85 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                      <p className="label-en text-white/70">{f.en}</p>
                      <p className="mt-1 text-base font-bold sm:text-xl">{f.title}</p>
                      <p className="mt-1 hidden text-sm text-white/80 sm:block">{f.body}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted">민간 피트니스센터 · 스포츠시설 운영도 함께 제안합니다. 이미지는 AI 도움을 받아 제작한 시설 유형 예시입니다.</p>
      </div>
    </section>
  );
}

const workinIcons = [AudioLines, BellRing, CalendarCheck, Sparkles];

/** 플랫폼 부문 — HILINK · work-in */
export function PlatformSuite() {
  return (
    <section className="bg-navy-deep py-24 text-white lg:py-32" aria-labelledby="platform-title">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow !text-accent-on-dark">02 · PLATFORM</p>
          <h2 id="platform-title" className="t-section mt-4 break-keep sm:whitespace-pre-line">
            {"다짐이 보유 · 운영하는\n두 개의 플랫폼."}
          </h2>
          <p className="t-body mt-5 max-w-2xl break-keep text-white/70">
            시설 운영에는 HILINK, 회사 업무에는 work-in. 운영 현장과 회사 업무를 하나의 흐름으로 연결합니다.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {platforms.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-[4px] border border-line-dark bg-white/[0.03]">
              <div className="flex flex-1 flex-col p-7 lg:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <PlatformIcon src={p.logo} className="size-14 sm:size-16" />
                    <div>
                      <p className="label-en text-white/55">{p.en}</p>
                      <h3 className="mt-1 text-[1.75rem] font-bold leading-tight tracking-[-0.02em]">{p.name}</h3>
                      <p className="mt-0.5 font-semibold text-accent-on-dark">{p.tagline}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-[2px] px-2 py-1 text-xs font-bold",
                      p.status === "live" ? "bg-white text-navy" : "border border-accent-on-dark/60 text-accent-on-dark",
                    )}
                  >
                    {p.status === "live" ? "서비스 중" : "출시 예정"}
                  </span>
                </div>
                <p className="t-body mt-5 break-keep text-white/75">{p.body}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {p.features.map((f, fi) => {
                    const Icon = p.status === "coming-soon" ? workinIcons[fi] : null;
                    return (
                      <li key={f} className="flex items-center gap-2.5 rounded-[4px] border border-line-dark px-3 py-3 text-sm font-semibold text-white/90">
                        {Icon ? <Icon className="size-4 shrink-0 text-accent-on-dark" aria-hidden /> : <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent-on-dark" />}
                        {f}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-auto pt-8">
                  {p.href ? (
                    <Link href={p.href} className="group inline-flex items-center gap-2 font-semibold text-white">
                      {p.name} 자세히 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
                    </Link>
                  ) : (
                    <p className="text-sm text-white/55">출시 소식은 이 페이지에서 안내합니다.</p>
                  )}
                </div>
              </div>
              {p.status === "live" && (
                <div className="flex justify-center gap-4 border-t border-line-dark bg-white/[0.03] px-7 pt-8">
                  <DemoPhone id="community" className="-mb-24 w-[38%] max-w-[11rem] shadow-none" sizes="180px" />
                  <DemoPhone id="passes" className="-mb-24 mt-8 w-[38%] max-w-[11rem] shadow-none" sizes="180px" />
                </div>
              )}
              {p.status === "coming-soon" && (
                <ol className="grid gap-3 border-t border-line-dark bg-white/[0.03] px-7 py-8 sm:grid-cols-3 lg:py-10" aria-label="work-in 사용 흐름">
                  {[
                    ["말하기", "“내일 3시 거래처 미팅”"],
                    ["등록", "업무와 일정에 바로 저장"],
                    ["알림", "정해진 시간에 앱 · 웹으로"],
                  ].map(([k, v], i) => (
                    <li key={k} className="rounded-[4px] border border-line-dark p-4">
                      <p className="text-xs font-bold text-accent-on-dark">
                        {String(i + 1).padStart(2, "0")} · {k}
                      </p>
                      <p className="mt-1.5 break-keep text-sm font-semibold text-white/90">{v}</p>
                    </li>
                  ))}
                </ol>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 회사 — 철학 · 본사 조직 요약 (상세는 /company) */
export function CompanyTeaser() {
  const hq = photoRef("group-headquarters");
  return (
    <section className="bg-white py-24 lg:py-32" aria-labelledby="company-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">ABOUT DAGYM</p>
          <h2 id="company-title" className="t-section mt-4 break-keep">
            “{brandMotto}”
          </h2>
          <p className="t-body mt-5 max-w-xl break-keep text-body">
            다짐(DAGYM)이라는 이름에 담은 뜻입니다. 사람과 공간을 책임 있게 대하는 태도로, 오늘의 운영을 더 나은 기준으로 바꿉니다.
          </p>
          {/* 숫자 대신 회사 구성 — 무엇을 · 무엇으로 · 누가 */}
          <dl className="mt-10 border-t border-navy">
            {[
              { k: "시설 운영", v: "공동주택 · 오피스텔 · 호텔 · 산업단지" },
              { k: "운영 플랫폼", v: platforms.map((p) => p.name).join(" · "), logos: platforms.map((p) => p.logo) },
              { k: "본사 조직", v: hqDepartments.map((d) => d.name).join(" · ") },
            ].map((r) => (
              <div key={r.k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[8.5rem_1fr] sm:items-center sm:gap-6">
                <dt className="text-sm font-bold text-accent">{r.k}</dt>
                <dd className="flex flex-wrap items-center gap-2 break-keep text-[1.0625rem] font-semibold text-ink">
                  {r.logos?.map((l) => <PlatformIcon key={l} src={l} className="size-6" />)}
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>
          <Link href="/company" className="group mt-8 inline-flex items-center gap-2 font-semibold text-navy">
            회사소개 보기 <ArrowRight className="btn-arrow size-4" aria-hidden />
          </Link>
        </Reveal>
        {hq && (
          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-fog">
              <Image src={hq.src} alt={hq.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
