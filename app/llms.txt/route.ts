import { BRAND } from "@/lib/utils/constants";
import { locations } from "@/lib/data/locations";
import { cityServiceData } from "@/lib/data/city-services";
import { getAllPosts } from "@/lib/blog";
import { people } from "@/lib/data/people";

export const dynamic = "force-static";

// llms.txt format per https://llmstxt.org/
// Short, curated index the model can use to decide what to fetch next.
function buildLlmsTxt(): string {
  const activeLocations = locations.filter((l) => l.status === "active");
  const lines: string[] = [];

  lines.push("# Muze Office");
  lines.push("");
  lines.push(
    "> Flexible workspace in Las Vegas and Houston — coworking, virtual offices, private offices, meeting rooms, and event space. Month-to-month memberships, free parking, no long-term leases."
  );
  lines.push("");
  lines.push(
    "Muze Office runs two staffed commercial locations (Las Vegas and Houston). Every page on this site also has a plain-markdown twin at the same path with a `.md` suffix — e.g. `/las-vegas-coworking.md`. A full content dump is available at `/llms-full.txt`."
  );
  lines.push("");

  // Locations
  lines.push("## Locations");
  lines.push("");
  for (const loc of activeLocations) {
    const phone = loc.phone !== "TBD" ? ` · ${loc.phone}` : "";
    lines.push(
      `- [${loc.name}](${BRAND.url}/locations/${loc.slug}.md): ${loc.address.street}, ${loc.address.city}, ${loc.address.state} ${loc.address.zip}${phone}`
    );
  }
  lines.push("");

  // City-service pages (grouped by city)
  for (const loc of activeLocations) {
    const slugs = Object.values(cityServiceData)
      .filter((c) => c.cityId === loc.id)
      .map((c) => c.slug);
    if (slugs.length === 0) continue;
    lines.push(`## ${loc.name} Services`);
    lines.push("");
    for (const slug of slugs) {
      const entry = cityServiceData[slug];
      lines.push(
        `- [${entry.h1}](${BRAND.url}/${slug}.md): ${entry.metaDescription}`
      );
    }
    lines.push("");
  }

  // People — names the canonical Person entity behind the brand
  lines.push("## People");
  lines.push("");
  for (const person of people) {
    lines.push(
      `- [${person.name}](${BRAND.url}/authors/${person.slug}.md): ${person.jobTitle}. ${person.shortBio}`
    );
  }
  lines.push("");

  // Static pages
  lines.push("## Primary Pages");
  lines.push("");
  const staticPages: { path: string; label: string; desc: string }[] = [
    { path: "", label: "Home", desc: "Site overview and service summary." },
    {
      path: "about",
      label: "About",
      desc: "Company background, positioning, and legal entity.",
    },
    {
      path: "contact",
      label: "Contact",
      desc: "Phone, email, addresses, and hours for both locations.",
    },
    {
      path: "book-a-tour",
      label: "Book a Tour",
      desc: "Free 20–30 minute walkthrough at either location.",
    },
    {
      path: "workspace-memberships",
      label: "Workspace Memberships",
      desc: "Service comparison table (virtual office, coworking, private office, meeting rooms, conference rooms, event space).",
    },
    {
      path: "locations",
      label: "Locations Overview",
      desc: "Both Muze Office locations with address and contact details.",
    },
    { path: "blog", label: "Blog", desc: "All published blog posts." },
  ];
  for (const page of staticPages) {
    const url = page.path === "" ? `${BRAND.url}/home.md` : `${BRAND.url}/${page.path}.md`;
    lines.push(`- [${page.label}](${url}): ${page.desc}`);
  }
  lines.push("");

  // Blog posts
  const posts = getAllPosts().filter((p) => !p.noindex);
  if (posts.length > 0) {
    lines.push("## Blog Posts");
    lines.push("");
    for (const post of posts) {
      lines.push(
        `- [${post.title}](${BRAND.url}/blog/${post.slug}.md): ${post.description || ""}`
      );
    }
    lines.push("");
  }

  // Optional section
  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Full content dump](${BRAND.url}/llms-full.txt): All primary pages and blog posts concatenated as markdown.`);
  lines.push(`- [Sitemap](${BRAND.url}/sitemap.xml): XML sitemap of all canonical HTML URLs.`);
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  const body = buildLlmsTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      // Keep the LLM surfaces fetchable by agents but out of search indexes,
      // so /foo.md doesn't compete with canonical /foo for rankings.
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
