import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { posts, postCategoryLabel } from "@/data/insight";
import { company } from "@/data/config";
import { formatDate, getPostBySlug } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.filter((p) => p.verified).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insight/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/insight/${post.slug}` });
}

export default async function PostPage({ params }: PageProps<"/insight/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          url: absoluteUrl(`/insight/${post.slug}`),
          publisher: { "@type": "Organization", name: company.nameKo },
        }}
      />
      <PageHero
        eyebrow={`${postCategoryLabel[post.category]} · ${formatDate(post.date)}`}
        compact
        title={post.title}
        breadcrumbs={[
          { name: "자주 묻는 질문", path: "/insight" },
          { name: post.title, path: `/insight/${post.slug}` },
        ]}
      />
      <article className="bg-white py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          {post.body.map((para, i) => (
            <p key={i} className="t-lead mt-5 text-body first:mt-0">
              {para}
            </p>
          ))}
          {post.url && (
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="link-underline mt-8 inline-flex items-center gap-2 font-semibold">
              {post.source ?? "원문"} 보기 <ExternalLink className="size-4" aria-hidden />
            </a>
          )}
          <div className="mt-14 border-t border-line pt-6">
            <Link href="/insight" className="inline-flex items-center gap-2 font-semibold text-brand">
              <ArrowLeft className="size-4" aria-hidden /> 목록으로
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
