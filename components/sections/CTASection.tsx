import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import type { CtaLocation } from "@/lib/analytics/gtag";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** contact_click 이벤트의 cta_location */
  track?: CtaLocation;
};

/** 페이지 하단 문의 — 입찰 · 운영 상담 전환 */
export function CTASection({
  eyebrow = "운영 문의",
  title = "운영을 맡길 공간이 있다면,\n현장부터 확인하겠습니다.",
  description = "단지명 · 세대수 · 운영 시설과 현재 운영 방식을 알려주시면 현장을 진단하고 운영안을 제안드립니다.",
  primary = { label: "운영 상담 문의", href: "/contact?type=operation" },
  secondary = { label: "운영 진단 문의", href: "/contact?type=consulting" },
  track = "cta_banner",
}: Props) {
  return (
    <section className="bg-navy text-white" aria-labelledby="cta-title">
      <Reveal className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-7">
          <p className="eyebrow !text-[#9dbcf0]">{eyebrow}</p>
          <h2 id="cta-title" className="t-section mt-4 sm:whitespace-pre-line">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="t-body text-white/75">{description}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href={primary.href} variant="white" size="lg" track={track}>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="outline-white" size="lg" track={track}>
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
