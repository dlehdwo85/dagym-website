import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { company, isVerified } from "@/data/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "이용약관",
  description: "주식회사 다짐 홈페이지 이용약관",
  path: "/terms",
});

/*
 * TODO_VERIFY: 법무 검토를 거친 최종 이용약관으로 교체하세요.
 * 아래는 회사 소개 · 운영 문의 홈페이지 기준의 기본 초안입니다.
 */
const EFFECTIVE_DATE = "2026년 9월 28일";

const sections: { title: string; body: string[] }[] = [
  {
    title: "제1조 (목적)",
    body: [
      `이 약관은 ${company.nameKo}(이하 '회사')가 운영하는 홈페이지(${company.website.replace(/^https?:\/\//, "")}, 이하 '홈페이지')의 이용 조건과 절차, 회사와 이용자의 권리 · 의무 및 책임사항을 정하는 것을 목적으로 합니다.`,
    ],
  },
  {
    title: "제2조 (정의)",
    body: [
      "① '이용자'란 이 약관에 따라 홈페이지에 접속하여 회사가 제공하는 정보를 열람하거나 문의를 남기는 모든 사람을 말합니다.",
      "② '콘텐츠'란 회사가 홈페이지에 게시한 글, 사진, 영상, 도표, 로고 등 일체의 정보를 말합니다.",
      "③ '운영 문의'란 이용자가 홈페이지의 문의 양식을 통해 회사에 상담을 요청하는 것을 말합니다.",
    ],
  },
  {
    title: "제3조 (약관의 게시와 변경)",
    body: [
      "① 회사는 이 약관을 이용자가 쉽게 확인할 수 있도록 홈페이지에 게시합니다.",
      "② 회사는 관련 법령을 위반하지 않는 범위에서 이 약관을 변경할 수 있으며, 변경 시 적용일자와 변경 사유를 명시하여 적용일 7일 전부터 홈페이지에 공지합니다.",
    ],
  },
  {
    title: "제4조 (제공하는 서비스)",
    body: [
      "회사는 홈페이지를 통해 다음의 서비스를 제공합니다.",
      "1. 회사 소개, 사업영역, 운영실적 등 회사 관련 정보 제공",
      "2. 커뮤니티 위탁운영 · HILINK 플랫폼 · 운영 컨설팅 등에 관한 운영 문의 접수",
      "3. 그 밖에 회사가 정하는 서비스",
    ],
  },
  {
    title: "제5조 (운영 문의)",
    body: [
      "① 이용자는 문의 양식에 정확한 정보를 기재해야 하며, 타인의 정보를 도용하거나 사실과 다른 정보를 입력해서는 안 됩니다.",
      "② 운영 문의는 상담 요청에 해당하며, 문의 접수만으로 회사와 이용자 사이에 위탁운영 · 공급 등 어떠한 계약도 성립하지 않습니다. 구체적인 조건은 별도의 계약으로 정합니다.",
      "③ 문의 과정에서 수집되는 개인정보는 개인정보처리방침에 따라 처리됩니다.",
    ],
  },
  {
    title: "제6조 (이용자의 의무)",
    body: [
      "이용자는 다음 행위를 해서는 안 됩니다.",
      "1. 허위 정보 입력 또는 타인의 정보 도용",
      "2. 홈페이지의 정상적인 운영을 방해하는 행위(자동화된 수단을 이용한 대량 접속 · 문의 등록 포함)",
      "3. 회사 또는 제3자의 저작권 등 지식재산권을 침해하는 행위",
      "4. 회사 또는 제3자의 명예를 훼손하거나 업무를 방해하는 행위",
      "5. 그 밖에 관련 법령에 위반되는 행위",
    ],
  },
  {
    title: "제7조 (저작권)",
    body: [
      "① 홈페이지에 게시된 콘텐츠에 대한 저작권 및 지식재산권은 회사 또는 정당한 권리자에게 있습니다.",
      "② 이용자는 회사의 사전 서면 동의 없이 콘텐츠를 복제, 배포, 전송, 2차적 저작물 작성 등의 방법으로 이용하거나 제3자에게 이용하게 해서는 안 됩니다.",
    ],
  },
  {
    title: "제8조 (서비스의 변경 및 중단)",
    body: [
      "회사는 홈페이지의 내용을 변경할 수 있으며, 설비 점검 · 교체, 통신 장애, 천재지변 등 부득이한 사유가 있는 경우 서비스 제공을 일시적으로 중단할 수 있습니다.",
    ],
  },
  {
    title: "제9조 (책임의 제한)",
    body: [
      "① 홈페이지에 게시된 정보는 일반적인 안내를 위한 것으로, 실제 운영 조건 · 범위 · 비용은 현장 확인과 개별 계약에 따라 달라질 수 있습니다.",
      "② 회사는 천재지변 또는 이에 준하는 불가항력, 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.",
      "③ 홈페이지에서 연결되는 외부 사이트의 내용과 거래에 대해서는 해당 사이트 운영자가 책임을 집니다.",
    ],
  },
  {
    title: "제10조 (준거법 및 관할)",
    body: [
      "이 약관은 대한민국 법률에 따라 해석되며, 홈페이지 이용과 관련하여 회사와 이용자 사이에 분쟁이 발생한 경우 「민사소송법」에 따른 관할 법원에서 해결합니다.",
    ],
  },
];

export default function TermsPage() {
  const contact = [
    `회사명: ${company.nameKo}`,
    ...(isVerified(company.phone) ? [`대표전화: ${company.phone}`] : []),
    ...(isVerified(company.email) ? [`이메일: ${company.email}`] : []),
  ];

  return (
    <>
      <PageHero eyebrow="이용약관" compact title="이용약관" breadcrumbs={[{ name: "이용약관", path: "/terms" }]} />
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="t-body text-body">
              {company.nameKo} 홈페이지를 이용해 주셔서 감사합니다. 홈페이지를 이용하시기 전에 아래 약관을 확인해 주세요.
            </p>
            {sections.map((s) => (
              <div key={s.title} className="mt-12 border-t border-line pt-8">
                <h2 className="t-h4">{s.title}</h2>
                {s.body.map((b) => (
                  <p key={b} className="t-body mt-3 break-keep text-body">
                    {b}
                  </p>
                ))}
              </div>
            ))}
            <div className="mt-12 border-t border-line pt-8">
              <h2 className="t-h4">문의처</h2>
              {contact.map((c) => (
                <p key={c} className="t-body mt-3 text-body">
                  {c}
                </p>
              ))}
              <p className="t-body mt-3 text-body">
                개인정보 처리에 관한 사항은{" "}
                <Link href="/privacy" className="font-semibold text-ink underline underline-offset-4">
                  개인정보처리방침
                </Link>
                을 따릅니다.
              </p>
            </div>
            <div className="mt-12 border-t border-line pt-8">
              <h2 className="t-h4">부칙</h2>
              <p className="t-body mt-3 text-body">이 약관은 {EFFECTIVE_DATE}부터 시행합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
