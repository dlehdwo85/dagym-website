import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { company, isVerified, PENDING_LABEL } from "@/data/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "운영 상담 신청 · 문의하기",
  description:
    "아파트 커뮤니티 위탁운영, 스포츠시설 위탁운영, HILINK 도입, 신규 커뮤니티 구축, 운영 컨설팅, 기구 납품 상담을 신청하세요.",
  path: "/contact",
});

const steps = [
  { title: "상담 접수", body: "문의 내용과 시설 정보 확인" },
  { title: "담당자 연락", body: "현황 파악을 위한 1차 상담" },
  { title: "현장 방문", body: "시설 · 운영 현황 실사" },
  { title: "운영 제안", body: "운영 모델 · 인력 · HILINK 제안서" },
];

function ContactInfo({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  href?: string;
}) {
  const pending = !isVerified(value);
  return (
    <div className="flex gap-4 border-b border-white/10 py-5">
      <Icon className="mt-0.5 size-5 shrink-0 text-accent-light" aria-hidden />
      <div>
        <p className="text-[0.8125rem] text-white/45">{label}</p>
        {pending ? (
          <p className="mt-1 text-white/35" data-todo="verify">
            {PENDING_LABEL}
          </p>
        ) : href ? (
          <a href={href} className="mt-1 block text-lg font-semibold hover:text-accent-light">
            {value}
          </a>
        ) : (
          <p className="mt-1 font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            공간의 조건을 알려주시면
            <br />
            운영을 설계해 드립니다.
          </>
        }
        description="상담 유형과 시설 정보를 남겨주시면 담당자가 확인 후 연락드립니다. 입주 전 단지, 운영 전환을 검토 중인 단지 모두 상담 가능합니다."
        breadcrumbs={[{ name: "CONTACT", path: "/contact" }]}
      />

      <section className="bg-white py-16 lg:py-24" aria-label="운영 상담 신청">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-8">
            <h2 className="t-h3">운영 상담 신청서</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-4" aria-label="연락처 및 상담 절차">
            <div className="on-dark bg-navy-950 p-7 text-white lg:sticky lg:top-28 lg:p-8">
              <p className="t-eyebrow text-accent-light">Direct Contact</p>
              <p className="t-h4 mt-4">전화 · 이메일 문의</p>
              <div className="mt-4">
                <ContactInfo icon={Phone} label="대표번호" value={company.phone} href={isVerified(company.phone) ? `tel:${company.phone}` : undefined} />
                <ContactInfo icon={Mail} label="이메일" value={company.email} href={isVerified(company.email) ? `mailto:${company.email}` : undefined} />
                <ContactInfo icon={Clock} label="상담 시간" value={company.businessHours} />
                <ContactInfo icon={MapPin} label="주소" value={company.address} />
              </div>
              <p className="t-eyebrow mt-10 text-white/45">Process</p>
              <ol className="mt-4 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_1fr]">
                    <span className="t-num text-sm text-accent-light">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-[0.8125rem] text-white/55">{s.body}</p>
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
