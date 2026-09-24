import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { JsonLd } from "@/components/ui/JsonLd";
import { posts, postCategoryLabel } from "@/data/insight";
import { company } from "@/data/config";
import { formatDate, getPostBySlug } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insight/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const meta = pageMetadata({ title: post.title, description: post.excerpt, path: `/insight/${post.slug}` });
  return post.verified ? meta : { ...meta, robots: { index: false, follow: true } };
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
        eyebrow={postCategoryLabel[post.category]}
        title={post.title}
        breadcrumbs={[
          { name: "INSIGHT", path: "/insight" },
          { name: postCategoryLabel[post.category], path: `/insight?tab=${post.category}` },
        ]}
        aside={
          <div className="flex items-center gap-3 text-sm text-white/60 lg:justify-end">
            <time dateTime={post.date} className="t-num">
              {formatDate(post.date)}
            </time>
            {!post.verified && <SampleBadge tone="dark" />}
          </div>
        }
      />
      <article className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            {post.body.map((para, i) => (
              <p key={i} className="t-lead mt-6 text-mist-700 first:mt-0">
                {para}
              </p>
            ))}
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 font-semibold link-underline"
              >
                {post.source ?? "원문"} 기사 보기 <ExternalLink className="size-4" aria-hidden />
              </a>
            )}
            <div className="mt-16 border-t border-mist-200 pt-8">
              <Link href="/insight" className="inline-flex items-center gap-2 text-sm font-semibold link-underline">
                <ArrowLeft className="size-4" aria-hidden /> 목록으로
              </Link>
            </div>
          </div>
        </div>
      </article>
      <CTASection />
    </>
  );
}
