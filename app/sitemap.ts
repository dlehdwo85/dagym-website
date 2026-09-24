import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";
import { businessDetails } from "@/data/business";
import { getPosts, getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["", "/company", "/business", "/hilink", "/projects", "/insight", "/contact", "/privacy"];
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/contact" || path === "/hilink" ? 0.9 : 0.8,
    })),
    ...businessDetails.map((b) => ({
      url: `${siteConfig.url}${b.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((p) => ({
      url: `${siteConfig.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${siteConfig.url}/insight/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
