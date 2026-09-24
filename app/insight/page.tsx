import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList } from "@/components/sections/FaqList";
import { InsightTabs } from "@/components/insight/InsightTabs";
import { getFaqs, getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "인사이트 · 뉴스 · 공지 · FAQ",
  description: "다짐의 뉴스, 공지사항, 미디어 보도, 커뮤니티 위탁운영 및 HILINK 도입 관련 자주 묻는 질문.",
  path: "/insight",
});

export default async function InsightPage() {
  const [posts, faqs] = await Promise.all([getPosts(), getFaqs()]);
  const faqSlot = <FaqList items={faqs} />;
  return (
    <>
      <PageHero
        eyebrow="Insight"
        title={
          <>
            운영 현장의 소식과
            <br />
            자주 묻는 질문.
          </>
        }
        description="다짐과 HILINK의 새로운 소식, 공지사항, 미디어 보도, 그리고 위탁운영 상담 전 많이 묻는 질문을 정리했습니다."
        breadcrumbs={[{ name: "INSIGHT", path: "/insight" }]}
      />
      <section className="bg-white pb-24 pt-10 lg:pb-32" aria-label="인사이트 목록">
        <div className="container-x">
          <InsightTabs posts={posts} faqSlot={faqSlot} />
        </div>
      </section>
      <CTASection />
    </>
  );
}
