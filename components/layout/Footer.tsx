import Link from "next/link";
import { company, isVerified } from "@/data/config";
import { footerNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";

/** 확인된 회사 정보만 표시합니다. (TODO_VERIFY 값은 줄 자체를 숨김) */
export function Footer() {
  const rows: [string, string][] = [
    ["상호", `${company.nameKo} (${company.nameEn})`],
    ["대표", company.ceo],
    ["사업자등록번호", company.businessNumber],
    ["주소", company.address],
    ["대표번호", company.phone],
    ["이메일", company.email],
  ];
  const visible = rows.filter(([, v]) => isVerified(v));

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
        <div className="flex flex-col gap-6 py-8 text-sm text-white/45 lg:flex-row lg:justify-between">
          <dl className="flex flex-wrap gap-x-6 gap-y-1.5">
            {visible.map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt>{k}</dt>
                <dd className="text-white/70">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex shrink-0 flex-col gap-1.5 lg:items-end">
            <Link href="/privacy" className="font-semibold text-white/80 hover:text-white">
              개인정보처리방침
            </Link>
            <p>© {new Date().getFullYear()} DAGYM Co., Ltd.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
