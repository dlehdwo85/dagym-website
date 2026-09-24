"use client";

import Link from "next/link";
import { replaceSearchParam, useSearchParam } from "@/lib/use-search-param";
import { ArrowUpRight } from "lucide-react";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { postCategoryLabel, type Post, type PostCategory } from "@/data/insight";
import { cn } from "@/lib/cn";

type Tab = "all" | PostCategory | "faq";
const tabs: { key: Tab; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "news", label: "NEWS" },
  { key: "notice", label: "NOTICE" },
  { key: "media", label: "MEDIA" },
  { key: "faq", label: "FAQ" },
];

function isTab(v: string | null): v is Tab {
  return tabs.some((t) => t.key === v);
}

export function InsightTabs({ posts, faqSlot }: { posts: Post[]; faqSlot: React.ReactNode }) {
  // 정적 HTML 에는 전체 목록을 렌더링하고(SEO), 하이드레이션 후 ?tab= 값을 반영합니다.
  const raw = useSearchParam("tab");
  const active: Tab = isTab(raw) ? raw : "all";
  const select = (t: Tab) => replaceSearchParam("tab", t === "all" ? null : t);

  const list = active === "all" || active === "faq" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div role="tablist" aria-label="인사이트 분류" className="scrollbar-none flex gap-1 overflow-x-auto border-b border-mist-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            id={`tab-${t.key}`}
            aria-selected={active === t.key}
            aria-controls="insight-panel"
            onClick={() => select(t.key)}
            className={cn(
              "t-en relative h-14 shrink-0 px-4 text-[0.875rem] font-semibold tracking-[0.1em] transition-colors",
              "after:absolute after:inset-x-4 after:bottom-0 after:h-[2px] after:bg-ink after:transition-transform",
              active === t.key ? "text-ink after:scale-x-100" : "text-mist-400 after:scale-x-0 hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="insight-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-4">
        {active === "faq" ? (
          <div className="pt-6">{faqSlot}</div>
        ) : list.length === 0 ? (
          <p className="py-20 text-center text-mist-500">등록된 게시물이 없습니다.</p>
        ) : (
          <ul>
            {list.map((p) => (
              <li key={p.slug} className="border-b border-mist-200">
                <Link
                  href={`/insight/${p.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[8rem_7rem_1fr_auto] md:items-baseline md:gap-8"
                >
                  <span className="t-num text-sm text-mist-500">{p.date.replaceAll("-", ".")}</span>
                  <span className="t-eyebrow flex items-center gap-2 text-accent">
                    {postCategoryLabel[p.category]}
                    {!p.verified && <SampleBadge />}
                  </span>
                  <span>
                    <span className="block text-[1.1875rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
                      {p.title}
                    </span>
                    <span className="mt-2 block text-[0.9375rem] leading-relaxed text-mist-600">{p.excerpt}</span>
                  </span>
                  <ArrowUpRight
                    className="hidden size-5 text-mist-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink md:block"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
