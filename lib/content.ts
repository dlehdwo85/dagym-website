/**
 * 콘텐츠 접근 계층.
 * 페이지 · 컴포넌트는 data/*.ts 를 직접 import 하지 않고 이 getter 를 통해 읽습니다.
 * Supabase / Headless CMS 로 전환할 때 이 파일의 구현만 교체하면 됩니다.
 *   예) export async function getProjects() {
 *         const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
 *         return data as Project[];
 *       }
 */
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { posts, faqs, type Post, type PostCategory } from "@/data/insight";

export async function getProjects(category?: ProjectCategory): Promise<Project[]> {
  return category ? projects.filter((p) => p.category === category) : projects;
}

export async function getFeaturedProjects(limit = 8): Promise<Project[]> {
  return projects.filter((p) => p.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getPosts(category?: PostCategory): Promise<Post[]> {
  const list = category ? posts.filter((p) => p.category === category) : posts;
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}

export async function getFaqs() {
  return faqs;
}

export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}
