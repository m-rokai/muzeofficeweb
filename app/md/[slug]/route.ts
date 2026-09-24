import { notFound } from "next/navigation";
import { cityServiceData } from "@/lib/data/city-services";
import { locations } from "@/lib/data/locations";
import {
  renderCityServiceMarkdown,
  renderCityMarkdown,
} from "@/lib/markdown/render-city-service";
import { renderStaticPageMarkdown } from "@/lib/markdown/render-static-page";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  // Only active city-service markdown mirrors are published. Houston's
  // location hub remains available through /md/houston and /locations/houston.md.
  const activeCityIds = new Set(
    locations
      .filter((location) => location.status === "active")
      .map((location) => location.id),
  );
  const cityServiceSlugs = Object.values(cityServiceData)
    .filter((entry) => activeCityIds.has(entry.cityId))
    .map((entry) => entry.slug);
  // Static page slugs
  const staticSlugs = [
    "home",
    "about",
    "contact",
    "book-a-tour",
    "workspace-memberships",
    "locations",
    "blog",
    "privacy-policy",
  ];
  // Location slugs (served via /md/{locationSlug})
  const locationSlugs = locations.map((l) => l.slug);
  const all = new Set<string>([
    ...cityServiceSlugs,
    ...staticSlugs,
    ...locationSlugs,
  ]);
  return Array.from(all).map((slug) => ({ slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // 1) City-service markdown (e.g. /md/las-vegas-coworking)
  const cityService = cityServiceData[slug];
  if (cityService) {
    const location = locations.find((entry) => entry.id === cityService.cityId);
    if (location?.status !== "active") notFound();

    const md = renderCityServiceMarkdown(slug);
    if (md) return markdownResponse(md);
  }

  // 2) Location markdown (e.g. /md/las-vegas, /md/houston)
  const location = locations.find((l) => l.slug === slug);
  if (location) {
    const md = renderCityMarkdown(location.id);
    if (md) return markdownResponse(md);
  }

  // 3) Static page markdown
  const md = renderStaticPageMarkdown(slug);
  if (md) return markdownResponse(md);

  notFound();
}

function markdownResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      // Mirror of canonical HTML — keep out of search indexes to avoid
      // duplicate-content competition while still reachable by agents.
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
