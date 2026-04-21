import { notFound } from "next/navigation";
import { getAllSlugs } from "@/lib/blog";
import { renderBlogPostMarkdown } from "@/lib/markdown/render-blog-post";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const md = renderBlogPostMarkdown(slug);
  if (!md) notFound();
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      // Mirror of canonical blog HTML, including posts the HTML side marks
      // noindex (e.g. legacy partnership posts). Blanket-noindex the mirror.
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
