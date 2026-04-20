import { BRAND } from "@/lib/utils/constants";
import { locations } from "@/lib/data/locations";
import { cityServiceData } from "@/lib/data/city-services";
import { getAllPosts } from "@/lib/blog";
import {
  renderCityServiceMarkdown,
  renderCityMarkdown,
} from "@/lib/markdown/render-city-service";
import { renderBlogPostMarkdown } from "@/lib/markdown/render-blog-post";
import {
  staticPageRenderers,
  listStaticPageSlugs,
} from "@/lib/markdown/render-static-page";

export const dynamic = "force-static";

function buildLlmsFullTxt(): string {
  const parts: string[] = [];

  // Header
  parts.push("# Muze Office — Full Content Dump");
  parts.push("");
  parts.push(
    `Generated from ${BRAND.url}. Every primary page and blog post, concatenated as markdown, for LLMs and search agents.`
  );
  parts.push("");
  parts.push("---");
  parts.push("");

  // Static pages
  const homeMd = staticPageRenderers.home ? staticPageRenderers.home() : "";
  if (homeMd) {
    parts.push(homeMd);
    parts.push("---");
    parts.push("");
  }

  for (const slug of listStaticPageSlugs()) {
    const renderer = staticPageRenderers[slug];
    if (!renderer) continue;
    parts.push(renderer());
    parts.push("---");
    parts.push("");
  }

  // Active locations
  const activeLocations = locations.filter((l) => l.status === "active");
  for (const loc of activeLocations) {
    const md = renderCityMarkdown(loc.id);
    if (md) {
      parts.push(md);
      parts.push("---");
      parts.push("");
    }
  }

  // City-service pages (only for active cities — coming-soon stay out)
  const activeCityIds = new Set(activeLocations.map((l) => l.id));
  for (const entry of Object.values(cityServiceData)) {
    if (!activeCityIds.has(entry.cityId)) continue;
    const md = renderCityServiceMarkdown(entry.slug);
    if (md) {
      parts.push(md);
      parts.push("---");
      parts.push("");
    }
  }

  // Blog posts
  for (const post of getAllPosts().filter((p) => !p.noindex)) {
    const md = renderBlogPostMarkdown(post.slug);
    if (md) {
      parts.push(md);
      parts.push("---");
      parts.push("");
    }
  }

  return parts.join("\n");
}

export function GET() {
  const body = buildLlmsFullTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
