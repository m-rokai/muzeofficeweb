import { getPostBySlug, type BlogPost } from "@/lib/blog";
import { BRAND } from "@/lib/utils/constants";

export function renderBlogPostMarkdown(slug: string): string | null {
  const post: BlogPost | null = getPostBySlug(slug);
  if (!post) return null;

  const lines: string[] = [];
  const canonical = `${BRAND.url}/blog/${slug}`;

  lines.push(`# ${post.title}`);
  lines.push("");
  if (post.description) {
    lines.push(`> ${post.description}`);
    lines.push("");
  }
  lines.push(`**Canonical URL:** ${canonical}`);
  lines.push(`**Author:** ${post.author}`);
  if (post.date) {
    lines.push(`**Published:** ${post.date}`);
  }
  if (post.categories.length > 0) {
    lines.push(`**Categories:** ${post.categories.join(", ")}`);
  }
  lines.push("");

  // Body: raw MDX content. Muze blog posts use markdown + pipe tables
  // (remark-gfm) + a handful of standard markdown images. No JSX
  // components are imported in any post, so the raw content is already
  // valid markdown for an LLM to consume.
  lines.push(post.content.trim());
  lines.push("");

  return lines.join("\n");
}
