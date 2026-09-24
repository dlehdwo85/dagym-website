import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company, isVerified, PENDING_LABEL, siteConfig } from "@/data/config";
import { footerNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";

function InfoRow({ label, value }: { label: string; value: string }) {
  const pending = value === "TODO_VERIFY";
  return (
    <div className="flex gap-3">
      <dt className="shrink-0 text-white/40">{label}</dt>
      <dd className={pending ? "text-white/30" : "text-white/70"} data-todo={pending ? "verify" : undefined}>
        {pending ? PENDING_LABEL : value}
      </dd>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        사이트 정보
      </h2>
      <div className="container-x">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-white/60">
              {siteConfig.tagline}
              <br />
              현장 운영과 HILINK 플랫폼으로 커뮤니티 공간을 운영합니다.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-semibold hover:border-accent-light"
            >
              운영 상담 신청하기
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
          <nav aria-label="푸터 메뉴" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <p className="t-eyebrow text-white/40">{group.title}</p>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[0.875rem] text-white/70 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="grid gap-8 py-10 text-[0.8125rem] leading-relaxed lg:grid-cols-12">
          <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:col-span-9">
            <InfoRow label="회사명" value={`${company.nameKo} (${company.nameEn})`} />
            <InfoRow label="대표이사" value={company.ceo} />
            <InfoRow label="사업자등록번호" value={company.businessNumber} />
            <InfoRow label="대표번호" value={company.phone} />
            <InfoRow label="이메일" value={company.email} />
            <InfoRow label="주소" value={company.address} />
          </dl>
          <div className="flex flex-col gap-3 lg:col-span-3 lg:items-end">
            <Link href="/privacy" className="font-semibold text-white hover:text-accent-light">
              개인정보처리방침
            </Link>
            {isVerified(company.social.instagram) && (
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                Instagram
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} DAGYM Co., Ltd. All rights reserved.</p>
          <p className="t-en tracking-[0.12em]">COMMUNITY · OPERATION · TECHNOLOGY</p>
        </div>
      </div>
    </footer>
  );
}
