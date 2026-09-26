import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { company, isVerified } from "@/data/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "개인정보처리방침",
  description: "주식회사 다짐 개인정보처리방침",
  path: "/privacy",
});

/*
 * TODO_VERIFY: 법무 검토를 거친 최종 개인정보처리방침으로 교체하세요.
 * 아래는 홈페이지 문의폼 기준의 기본 초안입니다.
 */
const sections = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: ["회사 · 단지명, 담당자명, 연락처, 이메일, 지역, 시설 정보, 문의 내용"],
  },
  { title: "2. 개인정보의 수집 · 이용 목적", body: ["운영 상담 신청 접수 및 회신, 상담 이력 관리"] },
  {
    title: "3. 보유 및 이용 기간",
    body: ["상담 완료 후 1년간 보관 후 파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다."],
  },
  {
    title: "4. 개인정보의 파기",
    body: ["보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 지체 없이 복구 불가능한 방법으로 파기합니다."],
  },
  {
    title: "5. 정보주체의 권리",
    body: ["정보주체는 언제든지 개인정보 열람, 정정, 삭제, 처리정지를 요청할 수 있으며 회사는 지체 없이 조치합니다."],
  },
  {
    title: "6. 개인정보 보호책임자",
    body: [
      `회사명: ${company.nameKo}`,
      ...(isVerified(company.phone) ? [`연락처: ${company.phone}`] : []),
      ...(isVerified(company.email) ? [`이메일: ${company.email}`] : []),
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="개인정보처리방침" compact title="개인정보처리방침" breadcrumbs={[{ name: "개인정보처리방침", path: "/privacy" }]} />
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="t-body text-body">
              {company.nameKo}(이하 &lsquo;회사&rsquo;)는 「개인정보 보호법」에 따라 정보주체의 개인정보를 보호하고 관련 고충을
              신속하게 처리하기 위하여 다음과 같이 개인정보처리방침을 수립 · 공개합니다.
            </p>
            {sections.map((s) => (
              <div key={s.title} className="mt-12 border-t border-line pt-8">
                <h2 className="t-h4">{s.title}</h2>
                {s.body.map((b) => (
                  <p key={b} className="t-body mt-3 text-body">
                    {b}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
