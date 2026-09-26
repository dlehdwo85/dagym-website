import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ConversionTracker } from "./ConversionTracker";

/** 접수 완료 — 광고 전환(Google · Meta · 네이버) 측정 기준 URL. 검색 노출 금지 · sitemap 제외 */
export const metadata: Metadata = {
  title: "문의 접수 완료",
  description: "DAGYM 운영 문의가 접수되었습니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/contact/success" },
};

export default function ContactSuccessPage() {
  return (
    <section className="bg-mist pb-24 pt-32 lg:pb-32 lg:pt-44" aria-labelledby="success-title">
      <ConversionTracker />
      <div className="container-x max-w-3xl">
        <CircleCheck className="size-12 text-brand" strokeWidth={1.6} aria-hidden />
        <p className="label-en mt-8 font-semibold tracking-[0.14em] text-accent">CONTACT</p>
        <h1 id="success-title" className="t-h1 mt-4">
          문의가 접수되었습니다.
        </h1>
        <p className="t-lead mt-5 text-body">남겨주신 내용을 확인한 뒤 담당자가 연락드리겠습니다.</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/business" size="lg">
            사업영역 보기
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary" size="lg">
            운영실적 보기
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
