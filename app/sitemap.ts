import type { MetadataRoute } from "next";
import { locations } from "@/lib/data/locations";
import { BRAND } from "@/lib/utils/constants";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.url;
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/book-a-tour`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/workspace-memberships`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/muze-cube-world`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Location detail pages — only include active locations so Google
  // does not index "coming soon" pages with TBD addresses.
  const locationPages: MetadataRoute.Sitemap = locations
    .filter((loc) => loc.status === "active")
    .map((loc) => ({
      url: `${baseUrl}/locations/${loc.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // City-service pages (e.g. /las-vegas-virtual-office)
  const cityServicePages: MetadataRoute.Sitemap = locations
    .filter((loc) => loc.status === "active")
    .flatMap((loc) =>
      loc.services.map((serviceSlug) => ({
        url: `${baseUrl}/${loc.slug}-${serviceSlug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    );

  // Blog posts — exclude noindexed posts from sitemap
  const blogPosts: MetadataRoute.Sitemap = getAllPosts()
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...locationPages, ...cityServicePages, ...blogPosts];
}
