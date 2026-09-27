import Link from "next/link";
import { company, isVerified, telHref } from "@/data/config";
import { footerNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";

/** 데스크톱 구분자 — 모바일에서는 항목마다 줄바꿈 */
function Sep() {
  return (
    <span aria-hidden className="mx-2 hidden text-white/25 sm:inline">
      |
    </span>
  );
}

/** 회사 법정정보는 data/config.ts › company 를 그대로 표시합니다. (TODO_VERIFY 값은 항목 자체를 숨김) */
export function Footer() {
  const ceo = isVerified(company.ceo) ? company.ceo : null;
  const businessNumber = isVerified(company.businessNumber) ? company.businessNumber : null;
  const address = isVerified(company.address) ? company.address : null;
  const phone = isVerified(company.phone) ? company.phone : null;
  const email = isVerified(company.email) ? company.email : null;
  const line = "flex flex-col sm:flex-row sm:flex-wrap sm:items-center";
  const contactLink = "whitespace-nowrap text-white/75 transition-colors hover:text-white hover:underline underline-offset-4";

  return (
    <footer className="bg-navy-deep text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        사이트 정보
      </h2>
      <div className="container-x">
        <div className="grid gap-14 border-b border-line-dark py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-white/75">
              아파트 · 기업 · 호텔 커뮤니티를 전문 위탁운영하고,
              <br className="hidden sm:block" />커뮤니티 운영 플랫폼 HILINK를 구축 · 공급합니다.
            </p>
          </div>
          <nav aria-label="푸터 메뉴" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((g) => (
              <div key={g.title}>
                <p className="text-sm font-semibold text-white/50">{g.title}</p>
                <ul className="mt-5 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.9375rem] text-white/75 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-7 py-9 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <address className="space-y-2 text-[0.8125rem] not-italic leading-[1.7] text-white/55 sm:space-y-1">
            <p className={line}>
              <span className="font-semibold text-white/85">{company.nameKo}</span>
              {ceo && (
                <>
                  <Sep />
                  <span>대표: {ceo}</span>
                </>
              )}
              {businessNumber && (
                <>
                  <Sep />
                  <span>사업자등록번호: {businessNumber}</span>
                </>
              )}
            </p>
            {address && <p className="break-keep">주소: {address}</p>}
            {(phone || email) && (
              <p className={line}>
                {phone && (
                  <span>
                    대표전화:{" "}
                    <a href={telHref(phone)} className={contactLink}>
                      {phone}
                    </a>
                  </span>
                )}
                {phone && email && <Sep />}
                {email && (
                  <span>
                    이메일:{" "}
                    <a href={`mailto:${email}`} className={contactLink}>
                      {email}
                    </a>
                  </span>
                )}
              </p>
            )}
          </address>
          <div className="flex shrink-0 flex-col gap-2 text-[0.8125rem] text-white/45 lg:items-end">
            <p className="flex items-center">
              <Link href="/privacy" className="font-semibold text-white/80 transition-colors hover:text-white">
                개인정보처리방침
              </Link>
              <span aria-hidden className="mx-2 text-white/25">
                |
              </span>
              <Link href="/terms" className="text-white/70 transition-colors hover:text-white">
                이용약관
              </Link>
            </p>
            <p>
              © {new Date().getFullYear()} {company.nameKo}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
