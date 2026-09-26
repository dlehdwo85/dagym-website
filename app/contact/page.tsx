import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { company, isVerified } from "@/data/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "운영 문의하기",
  description:
    "커뮤니티 위탁운영, HILINK 플랫폼, 운영 진단 · 컨설팅, 기업 · 호텔 · 스포츠시설 운영, 시설지원 상담을 신청하세요.",
  path: "/contact",
});

const steps = [
  { title: "신청서 확인", body: "문의 유형과 시설 정보를 확인합니다." },
  { title: "담당자 연락", body: "현재 운영 현황을 전화로 여쭙습니다." },
  { title: "현장 확인", body: "시설과 운영 방식을 직접 확인합니다." },
  { title: "운영안 제안", body: "운영 범위와 HILINK 적용 범위를 제안합니다." },
];

export default function ContactPage() {
  const phone = isVerified(company.phone) ? company.phone : null;
  const email = isVerified(company.email) ? company.email : null;
  const hours = isVerified(company.businessHours) ? company.businessHours : null;

  return (
    <>
      <PageHero
        eyebrow="운영 문의"
        en="Contact"
        title={"운영에 필요한 범위를\n함께 확인합니다."}
        description="단지와 시설 현황을 알려주시면 운영 방식과 HILINK 적용 범위를 검토합니다."
        breadcrumbs={[{ name: "운영 문의", path: "/contact" }]}
      />
      <section className="bg-white py-14 lg:py-20" aria-label="운영 상담 신청">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-8">
            <h2 className="t-h2">운영 상담 신청</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <aside className="lg:col-span-4" aria-label="상담 안내">
            <div className="rounded-[4px] bg-mist p-7 lg:sticky lg:top-28">
              <h2 className="t-h4">상담 안내</h2>
              {(hours || phone || email) && (
                <dl className="mt-5 space-y-3 border-b border-line-strong pb-6">
                  {hours && (
                    <div>
                      <dt className="text-sm text-muted">상담 시간</dt>
                      <dd className="font-semibold">{hours}</dd>
                    </div>
                  )}
                  {phone && (
                    <div>
                      <dt className="text-sm text-muted">대표번호</dt>
                      <dd className="font-semibold">
                        <TrackedLink href={`tel:${phone}`} event="phone_click" location="contact_page">
                          {phone}
                        </TrackedLink>
                      </dd>
                    </div>
                  )}
                  {email && (
                    <div>
                      <dt className="text-sm text-muted">이메일</dt>
                      <dd className="font-semibold">
                        <TrackedLink href={`mailto:${email}`} event="email_click" location="contact_page">
                          {email}
                        </TrackedLink>
                      </dd>
                    </div>
                  )}
                </dl>
              )}
              <h3 className="mt-6 text-[0.9375rem] font-semibold">상담 절차</h3>
              <ol className="mt-4 space-y-4">
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
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
