import { notFound } from "next/navigation";
import { locations } from "@/lib/data/locations";
import { renderCityMarkdown } from "@/lib/markdown/render-city-service";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ city: string }> }
) {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);
  if (!location) notFound();
  const md = renderCityMarkdown(location.id);
  if (!md) notFound();
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
