import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "페이지를 찾을 수 없습니다", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-[80dvh] items-center overflow-hidden bg-navy-950 pt-24 text-white">
      <div className="bg-blueprint absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <p className="t-eyebrow text-accent-light">404 · Page not found</p>
        <h1 className="t-h1 mt-6">
          요청하신 페이지를
          <br />
          찾을 수 없습니다.
        </h1>
        <p className="t-lead mt-6 max-w-xl text-white/65">
          주소가 변경되었거나 삭제된 페이지입니다. 아래에서 원하시는 정보로 이동해 주세요.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="light" size="lg">홈으로</ButtonLink>
          <ButtonLink href="/business" variant="outline-light" size="lg">사업영역</ButtonLink>
          <ButtonLink href="/contact" variant="outline-light" size="lg">운영 문의하기</ButtonLink>
        </div>
      </div>
    </section>
  );
}
