import { ButtonLink } from "@/components/ui/Button";
import { MaskText } from "@/components/motion/MaskText";

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** 페이지 하단 상담 안내 — 풀폭 다크, 큰 타이포그래피 */
export function CTASection({
  eyebrow = "Let's operate together",
  title = "운영을 맡길 공간이\n있으신가요?",
  description = "단지명, 세대수, 운영 중인 시설과 현재 운영 방식을 알려주시면 현장 확인 후 운영안을 제안해 드립니다.",
  primary = { label: "운영 문의하기", href: "/contact" },
  secondary = { label: "HILINK 알아보기", href: "/hilink" },
}: Props) {
  return (
    <section className="bg-charcoal text-white" aria-labelledby="cta-title">
      <div className="container-x grid gap-12 py-24 lg:grid-cols-12 lg:items-end lg:py-36">
        <div className="lg:col-span-8">
          <p className="eyebrow text-white/45">{eyebrow}</p>
          <MaskText id="cta-title" text={title} className="t-section mt-6" />
        </div>
        <div className="lg:col-span-4">
          <p className="t-body text-white/65">{description}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row lg:flex-col xl:flex-row">
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
      </div>
    </section>
  );
}
