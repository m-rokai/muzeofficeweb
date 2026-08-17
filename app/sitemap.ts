import type { MetadataRoute } from "next";
import { locations } from "@/lib/data/locations";
import { BRAND } from "@/lib/utils/constants";
import { getAllPosts } from "@/lib/blog";
import { people } from "@/lib/data/people";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/book-a-tour`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/workspace-memberships`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/muze-cube-world`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/houston-virtual-office`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Include active locations plus Houston's substantive pre-opening hub.
  // Other future locations stay excluded until their address and launch
  // information are confirmed.
  const locationPages: MetadataRoute.Sitemap = locations
    .filter((loc) => loc.status === "active" || loc.slug === "houston")
    .map((loc) => ({
      url: `${baseUrl}/locations/${loc.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // City-service pages (e.g. /las-vegas-virtual-office)
  const cityServicePages: MetadataRoute.Sitemap = locations
    .filter((loc) => loc.status === "active")
    .flatMap((loc) =>
      loc.services.map((serviceSlug) => ({
        url: `${baseUrl}/${loc.slug}-${serviceSlug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    );

  // Blog posts — exclude noindexed posts from sitemap
  const blogPosts: MetadataRoute.Sitemap = getAllPosts()
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.dateModified
        ? new Date(post.dateModified)
        : post.date
          ? new Date(post.date)
          : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  // Author profile pages — Person entity surface for E-E-A-T signals
  const authorPages: MetadataRoute.Sitemap = people.map((p) => ({
    url: `${baseUrl}/authors/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...locationPages,
    ...cityServicePages,
    ...blogPosts,
    ...authorPages,
  ];
}
