import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/utils/constants";
import { people } from "@/lib/data/people";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.url;
  const now = new Date();
  const routes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/the-opportunity", priority: 0.9, freq: "monthly" },
    { path: "/the-model", priority: 0.9, freq: "monthly" },
    { path: "/investment", priority: 0.9, freq: "monthly" },
    { path: "/who-its-for", priority: 0.9, freq: "monthly" },
    { path: "/available-markets", priority: 0.8, freq: "monthly" },
    { path: "/training-and-support", priority: 0.7, freq: "monthly" },
    { path: "/franchisees", priority: 0.8, freq: "monthly" },
    { path: "/investors", priority: 0.8, freq: "monthly" },
    { path: "/partners", priority: 0.8, freq: "monthly" },
    { path: "/why-muze", priority: 0.8, freq: "monthly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
    { path: "/insights", priority: 0.6, freq: "weekly" },
    { path: "/insights/coworking-franchise-cost", priority: 0.6, freq: "monthly" },
    { path: "/about", priority: 0.5, freq: "monthly" },
    { path: "/discovery-call", priority: 0.9, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.3, freq: "monthly" },
  ];
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
  const authors: MetadataRoute.Sitemap = people.map((p) => ({
    url: `${base}/about#${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));
  return [...pages, ...authors];
}
