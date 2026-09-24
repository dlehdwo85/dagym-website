import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "페이지를 찾을 수 없습니다", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="container-x flex min-h-[70dvh] flex-col justify-center pb-16 pt-32">
        <p className="t-label text-brand">404</p>
        <h1 className="t-h1 mt-3">요청하신 페이지를 찾을 수 없습니다.</h1>
        <p className="t-lead mt-5 max-w-xl text-body">주소가 바뀌었거나 삭제된 페이지입니다.</p>
        <div className="mt-9 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/" size="lg">
            홈으로
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            운영 문의하기
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
