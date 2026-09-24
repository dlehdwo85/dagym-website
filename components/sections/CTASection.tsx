import { ButtonLink } from "@/components/ui/Button";

type Props = {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** 페이지 하단 상담 안내 */
export function CTASection({
  title = "커뮤니티 운영, 상담으로 시작하세요.",
  description = "단지명, 세대수, 운영 중인 시설과 현재 운영 방식을 알려주시면 현장 확인 후 운영안을 제안해 드립니다.",
  primary = { label: "운영 문의하기", href: "/contact" },
  secondary,
}: Props) {
  return (
    <section className="on-dark bg-brand text-white" aria-labelledby="cta-title">
      <div className="container-x flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="t-h2 whitespace-pre-line">
            {title}
          </h2>
          <p className="t-lead mt-4 text-white/80">{description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 xs:flex-row">
          <ButtonLink href={primary.href} variant="white" size="lg">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="outline-white" size="lg">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
