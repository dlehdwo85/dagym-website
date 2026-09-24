import { company, isVerified } from "@/data/config";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** 페이지 하단 반복 CTA — 모든 페이지가 문의로 자연스럽게 연결되도록 */
export function CTASection({
  eyebrow = "Contact",
  title = "공간의 가치를\n운영으로 완성하세요.",
  description = "시설 구성과 세대수, 현재 운영 방식을 알려주시면 운영 방향과 HILINK 적용 범위를 함께 검토해 드립니다.",
  primary = { label: "운영 상담 신청하기", href: "/contact" },
  secondary = { label: "HILINK 도입 문의", href: "/contact?type=hilink" },
}: Props) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-950 text-white" aria-labelledby="cta-title">
      <div className="bg-blueprint absolute inset-0 opacity-70" aria-hidden />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-white/5 lg:block" aria-hidden />
      <div className="container-x relative grid gap-12 py-24 lg:grid-cols-12 lg:items-end lg:py-32">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="t-eyebrow flex items-center gap-3 text-accent-light">
              <span aria-hidden className="h-px w-8 bg-accent-light/60" />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="cta-title" className="t-h1 mt-7 whitespace-pre-line">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-lead mt-7 max-w-2xl text-white/65">{description}</p>
          </Reveal>
        </div>
        <Reveal delay={160} className="lg:col-span-4">
          <div className="flex flex-col gap-3">
            <ButtonLink href={primary.href} variant="accent" size="lg" className="w-full justify-between">
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="outline-light" size="lg" className="w-full justify-between">
              {secondary.label}
            </ButtonLink>
            {isVerified(company.phone) && (
              <a href={`tel:${company.phone}`} className="mt-3 text-sm text-white/55 hover:text-white">
                전화 상담 {company.phone}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
