import { notFound } from "next/navigation";
import { people } from "@/lib/data/people";
import { renderAuthorMarkdown } from "@/lib/markdown/render-author";

export const dynamic = "force-static";

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const md = renderAuthorMarkdown(slug);
  if (!md) notFound();
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      // Mirror of canonical HTML — keep out of search indexes to avoid
      // duplicate-content competition with /authors/{slug}.
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
