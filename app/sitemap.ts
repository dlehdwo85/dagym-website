import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";
import { businessAreas } from "@/data/business";
import { getPosts, getProjects } from "@/lib/content";

/** 방문자에게 공개된 페이지만 포함합니다 (확인된 현장 · 게시물만) */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const staticRoutes = ["", "/company", "/business", "/hilink", "/insight", "/contact", "/privacy", ...(projects.length ? ["/projects"] : [])];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.8,
    })),
    ...businessAreas.map((b) => ({ url: `${siteConfig.url}${b.href}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...projects.map((p) => ({ url: `${siteConfig.url}/projects/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${siteConfig.url}/insight/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
