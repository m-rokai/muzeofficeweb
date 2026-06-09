import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  /** Optional ISO date of the last substantive update; emitted as
   *  schema.org dateModified when present (falls back to `date`). */
  dateModified?: string;
  author: string;
  description: string;
  image?: string;
  categories: string[];
  tags?: string[];
  seoTitle?: string;
  /** If true, the post will have noindex robots meta and be excluded from sitemap */
  noindex?: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
}

/**
 * Overrides for raw author values carried over from the WordPress migration.
 * Some legacy posts were authored by the old marketing agency (alphacomarketing.com)
 * whose emails should never be publicly attributed. Others are legitimate names
 * that were stored in lowercase and need proper capitalization.
 */
const authorOverrides: Record<string, string> = {
  // Old agency emails — scrub all of these from public bylines
  "isabela.navarro@alphacomarketing.com": "Muze Office Team",
  "rebecapirela0510@gmail.com": "Muze Office Team",
  "luis.velasquez@alphacomarketing.com": "Muze Office Team",
  "mariela.barrera@alphacomarketing.com": "Muze Office Team",
  "clara.carrera@alphacomarketing.com": "Muze Office Team",
  "ana.carrino@alphacomarketing.com": "Muze Office Team",
  "miriondo@alphacomarketing.com": "Muze Office Team",
  // Not employees / not real contributors — attribute to the team
  "mariano iriondo": "Muze Office Team",
  "ana carrino": "Muze Office Team",
};

function normalizeAuthor(raw: string | undefined): string {
  if (!raw) return "Muze Office Team";
  const trimmed = raw.trim();
  if (!trimmed) return "Muze Office Team";
  const lower = trimmed.toLowerCase();
  if (authorOverrides[lower]) return authorOverrides[lower];
  // Any remaining string containing an email-style token should not be shown
  // publicly — fall back to the team attribution.
  if (trimmed.includes("@")) return "Muze Office Team";
  // Otherwise title-case each word
  return trimmed.replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

function loadPostFile(filename: string): BlogPost {
  const fullPath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) || filename.replace(/\.mdx?$/, "");
  return {
    title: (data.title as string) || "Untitled",
    slug,
    date: (data.date as string) || "",
    dateModified: data.dateModified as string | undefined,
    author: normalizeAuthor(data.author as string | undefined),
    description: (data.description as string) || "",
    image: data.image as string | undefined,
    categories: (data.categories as string[]) || [],
    tags: (data.tags as string[]) || undefined,
    seoTitle: data.seoTitle as string | undefined,
    noindex: (data.noindex as boolean) || false,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map(loadPostFile);
  // Sort newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filename = `${slug}.mdx`;
  const fullPath = path.join(POSTS_DIR, filename);
  if (!fs.existsSync(fullPath)) return null;
  return loadPostFile(filename);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
