import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "페이지를 찾을 수 없습니다", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-navy-deep text-white">
      <div className="container-x flex min-h-[80dvh] flex-col justify-center pb-16 pt-32">
        <p className="text-[5rem] font-bold leading-none text-white/20 lg:text-[8rem]">404</p>
        <h1 className="t-h1 mt-2">요청하신 페이지를 찾을 수 없습니다.</h1>
        <p className="t-lead mt-6 max-w-xl text-white/65">주소가 바뀌었거나 삭제된 페이지입니다.</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/" variant="white" size="lg">
            홈으로
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-white" size="lg">
            운영 문의하기
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
