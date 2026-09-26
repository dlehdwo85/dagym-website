import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { FaqList } from "@/components/sections/FaqList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { postCategoryLabel } from "@/data/insight";
import { formatDate, getFaqs, getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "자주 묻는 질문",
  description: "커뮤니티 위탁운영과 HILINK 도입에 대해 자주 묻는 질문.",
  path: "/insight",
});

export default async function InsightPage() {
  const [posts, faqs] = await Promise.all([getPosts(), getFaqs()]);
  return (
    <>
      <PageHero
        eyebrow="인사이트"
        en="FAQ"
        title="자주 묻는 질문"
        description="위탁운영 전환, 입주 전 준비, HILINK 도입, 운영 보고 방식에 대해 자주 받는 질문입니다."
        breadcrumbs={[{ name: "자주 묻는 질문", path: "/insight" }]}
      />
      <section className="section-y bg-white" aria-label="자주 묻는 질문 목록">
        <div className="container-x max-w-4xl">
          <FaqList items={faqs} />
        </div>
      </section>
      {posts.length > 0 && (
        <section className="section-y border-t border-line bg-paper" aria-labelledby="notice-title">
          <div className="container-x">
            <SectionHeader eyebrow="공지" id="notice-title" title="공지사항" size="h2" />
            <ul className="mt-10 border-t border-ink">
              {posts.map((p) => (
                <li key={p.slug} className="border-b border-line-strong">
                  <Link href={`/insight/${p.slug}`} className="group grid gap-1 py-5 sm:grid-cols-[7rem_5rem_1fr] sm:gap-6">
                    <span className="text-sm text-muted">{formatDate(p.date)}</span>
                    <span className="text-sm font-semibold text-brand">{postCategoryLabel[p.category]}</span>
                    <span className="font-semibold group-hover:text-brand">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
