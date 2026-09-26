import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { company, isVerified } from "@/data/config";
import { getDeliveryStatus } from "@/lib/contact-delivery";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "운영 문의하기",
  description:
    "아파트 커뮤니티 위탁운영, 스포츠시설 위탁운영, HILINK 도입, 신규 커뮤니티 구축, 운영 컨설팅, 기구 납품 상담을 신청하세요.",
  path: "/contact",
});

// 접수 경로(환경변수) 설정 여부를 요청 시점에 확인
export const dynamic = "force-dynamic";

const steps = [
  { title: "신청서 확인", body: "문의 내용과 시설 정보를 확인합니다." },
  { title: "담당자 연락", body: "현재 운영 현황을 전화로 여쭙습니다." },
  { title: "현장 방문", body: "시설 · 출입 동선 · 운영 방식을 직접 확인합니다." },
  { title: "운영안 제안", body: "인력 · 프로그램 · 이용료 부과 방식 · HILINK 적용 범위를 제안합니다." },
];

export default function ContactPage() {
  const { ready } = getDeliveryStatus();
  const direct = [
    { label: "대표번호", value: company.phone, href: isVerified(company.phone) ? `tel:${company.phone}` : undefined },
    { label: "이메일", value: company.email, href: isVerified(company.email) ? `mailto:${company.email}` : undefined },
    { label: "상담 시간", value: company.businessHours },
    { label: "주소", value: company.address },
  ].filter((d) => isVerified(d.value));

  return (
    <>
      <PageHero
        eyebrow="운영 문의"
        en="Contact"
        title={"운영 제안 · 현장 진단을\n요청해 주세요."}
        description="입주 전 단지, 운영사 교체를 검토 중인 단지, 일부 시설만 맡기려는 경우, 입찰을 준비하는 경우 모두 상담할 수 있습니다. 단지 · 시설 정보를 알려주시면 현장을 확인한 뒤 운영안을 제안드립니다."
        breadcrumbs={[{ name: "운영 문의", path: "/contact" }]}
      />
      <section className="bg-white py-14 lg:py-20" aria-label="운영 상담 신청">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-8">
            <h2 className="t-h2">운영 문의서</h2>
            <div className="mt-6">
              <ContactForm deliveryReady={ready} />
            </div>
          </div>
          <aside className="lg:col-span-4" aria-label="상담 절차와 연락처">
            <div className="rounded-[4px] bg-mist p-7 lg:sticky lg:top-28">
              <h2 className="t-h4">상담은 이렇게 진행됩니다</h2>
              <ol className="mt-5 space-y-5">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_1fr]">
                    <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="mt-0.5 text-[0.9375rem] text-body">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {direct.length > 0 && (
                <dl className="mt-8 border-t border-line-strong pt-6">
                  {direct.map((d) => (
                    <div key={d.label} className="mt-3 first:mt-0">
                      <dt className="text-sm text-muted">{d.label}</dt>
                      <dd className="font-semibold">{d.href ? <a href={d.href}>{d.value}</a> : d.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
