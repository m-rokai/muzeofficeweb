import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

/**
 * Read all blog post slugs from content/blog/ at build time.
 * Used to auto-generate 301 redirects from the old WordPress permalink
 * structure (/{slug}/) to the new Next.js structure (/blog/{slug}).
 */
function getBlogSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Explicit redirects from old WordPress nested URLs that blog content
 * still links to internally. Without these, Googlebot following in-body
 * links inside migrated posts hits 404s and bleeds crawl budget / equity.
 *
 * Sourced from the SEO launch audit (2026-04-07) — every entry corresponds
 * to a real `https://muzeoffice.com/...` URL that appears in at least one
 * migrated MDX file in content/blog/.
 */
const wordpressRedirects = [
  { source: "/contact-us", destination: "/contact" },
  { source: "/workspace-memberships/virtual-office-in-las-vegas", destination: "/las-vegas-virtual-office" },
  { source: "/workspace-memberships/coworking-las-vegas", destination: "/las-vegas-coworking" },
  { source: "/workspace-memberships/office-space-in-las-vegas", destination: "/las-vegas-private-office" },
  { source: "/workspace-memberships/coworking-houston-texas", destination: "/locations/houston" },
  { source: "/workspace-memberships/virtual-office-houston-texas", destination: "/locations/houston" },
  { source: "/workspace-memberships/virtual-office-houston-texas/premium-mailing-address-services-in-houston", destination: "/locations/houston" },
  { source: "/workspace-solutions-coworking-private-and-virtual-offices", destination: "/workspace-memberships" },
  { source: "/locations/las-vegas-coworking", destination: "/las-vegas-coworking" },
  { source: "/locations/houston-coworking", destination: "/locations/houston" },
  { source: "/locations/south-main-coworking", destination: "/locations/houston" },
  { source: "/events-in-las-vegas", destination: "/las-vegas-event-space" },
  { source: "/events-in-houston-and-las-vegas", destination: "/las-vegas-event-space" },
  { source: "/conference-room-near-me-where-to-book-your-next-event", destination: "/las-vegas-meeting-rooms" },
  { source: "/coworking-space-near-me-how-working-in-a-coworking-space-boosts-your-productivity", destination: "/las-vegas-coworking" },
  { source: "/office-day-pass-in-houston-at-muzeoffice", destination: "/locations/houston" },
  { source: "/tips-for-choosing-a-virtual-office-near-me", destination: "/las-vegas-virtual-office" },
  { source: "/make-the-most-out-of-your-virtual-office-space-in-las-vegas", destination: "/las-vegas-virtual-office" },
];

/**
 * Redirects for blog posts that were removed due to duplicate content
 * or thin content. Each entry redirects BOTH the old WordPress permalink
 * path (`/{slug}`) AND the new Next.js blog path (`/blog/{slug}`) to the
 * canonical destination, so indexed URLs from either era resolve cleanly.
 */
const removedBlogRedirects = [
  // Duplicate: keep coworking-for-creators-in-las-vegas, drop the others
  { source: "/coworking-for-creators-las-vegas", destination: "/blog/coworking-for-creators-in-las-vegas" },
  { source: "/blog/coworking-for-creators-las-vegas", destination: "/blog/coworking-for-creators-in-las-vegas" },
  { source: "/coworking-for-creatives", destination: "/blog/coworking-for-creators-in-las-vegas" },
  { source: "/blog/coworking-for-creatives", destination: "/blog/coworking-for-creators-in-las-vegas" },
  // Duplicate: keep virtual-mailboxes-in-las-vegas (plural), drop singular
  { source: "/virtual-mailbox-in-las-vegas", destination: "/blog/virtual-mailboxes-in-las-vegas" },
  { source: "/blog/virtual-mailbox-in-las-vegas", destination: "/blog/virtual-mailboxes-in-las-vegas" },
  // Thin stub: redirect topic to the commercial page that covers it
  { source: "/the-future-of-virtual-offices", destination: "/las-vegas-virtual-office" },
  { source: "/blog/the-future-of-virtual-offices", destination: "/las-vegas-virtual-office" },
  // Thin stub: off-topic for coworking, redirect to blog index
  { source: "/why-tiktok-is-a-great-marketing-tool-for-small-businesses", destination: "/blog" },
  { source: "/blog/why-tiktok-is-a-great-marketing-tool-for-small-businesses", destination: "/blog" },
  // Duplicate: keep modern-meeting-room-near-ces-las-vegas, drop the long-slug version
  { source: "/creating-the-future-a-modern-meeting-room-near-ces-las-vegas", destination: "/blog/modern-meeting-room-near-ces-las-vegas" },
  { source: "/blog/creating-the-future-a-modern-meeting-room-near-ces-las-vegas", destination: "/blog/modern-meeting-room-near-ces-las-vegas" },

  // Thin or stale-dated generic coworking posts → canonical service page
  { source: "/how-to-choose-the-perfect-coworking-space-for-your-business", destination: "/las-vegas-coworking" },
  { source: "/blog/how-to-choose-the-perfect-coworking-space-for-your-business", destination: "/las-vegas-coworking" },
  { source: "/how-coworking-will-change-the-way-we-work-in-2022", destination: "/las-vegas-coworking" },
  { source: "/blog/how-coworking-will-change-the-way-we-work-in-2022", destination: "/las-vegas-coworking" },
  { source: "/coworking-in-2024-embracing-the-future-with-muze-office", destination: "/las-vegas-coworking" },
  { source: "/blog/coworking-in-2024-embracing-the-future-with-muze-office", destination: "/las-vegas-coworking" },
  { source: "/coworking-networking-how-to-connect-with-other-professionals", destination: "/las-vegas-coworking" },
  { source: "/blog/coworking-networking-how-to-connect-with-other-professionals", destination: "/las-vegas-coworking" },
  { source: "/choosing-the-best-office-space-for-your-business-in-2023", destination: "/workspace-memberships" },
  { source: "/blog/choosing-the-best-office-space-for-your-business-in-2023", destination: "/workspace-memberships" },

  // Seasonal / date-stamped posts that no longer match search intent
  { source: "/the-dos-and-donts-of-planning-a-thanksgiving-business-event-for-2022", destination: "/las-vegas-event-space" },
  { source: "/blog/the-dos-and-donts-of-planning-a-thanksgiving-business-event-for-2022", destination: "/las-vegas-event-space" },
  { source: "/thanksgiving-2024", destination: "/locations/las-vegas" },
  { source: "/blog/thanksgiving-2024", destination: "/locations/las-vegas" },
  { source: "/embracing-gratitude-and-growth-this-november-at-muze-office", destination: "/locations/las-vegas" },
  { source: "/blog/embracing-gratitude-and-growth-this-november-at-muze-office", destination: "/locations/las-vegas" },

  // Off-topic tourist / stale partnership content
  { source: "/top-5-things-to-do-in-las-vegas-for-an-unforgettable-experience", destination: "/locations/las-vegas" },
  { source: "/blog/top-5-things-to-do-in-las-vegas-for-an-unforgettable-experience", destination: "/locations/las-vegas" },
  { source: "/top-5-places-to-visit-in-texas", destination: "/locations/houston" },
  { source: "/blog/top-5-places-to-visit-in-texas", destination: "/locations/houston" },
  { source: "/muze-office-and-equinox-a-partnership-for-excellence", destination: "/locations/las-vegas" },
  { source: "/blog/muze-office-and-equinox-a-partnership-for-excellence", destination: "/locations/las-vegas" },

  // Generic office-design posts that dilute topical authority — send to blog index
  { source: "/boosting-collaboration-in-the-office-essential-tips-for-effective-teamwork", destination: "/blog" },
  { source: "/blog/boosting-collaboration-in-the-office-essential-tips-for-effective-teamwork", destination: "/blog" },
  { source: "/office-lighting-design-tips-for-creating-an-illuminating-workspace", destination: "/blog" },
  { source: "/blog/office-lighting-design-tips-for-creating-an-illuminating-workspace", destination: "/blog" },
  { source: "/how-to-choose-the-right-office-furniture-for-comfort-and-functionality", destination: "/blog" },
  { source: "/blog/how-to-choose-the-right-office-furniture-for-comfort-and-functionality", destination: "/blog" },
  { source: "/the-ultimate-guide-to-office-acoustics-creating-a-sound-environment-for-work", destination: "/blog" },
  { source: "/blog/the-ultimate-guide-to-office-acoustics-creating-a-sound-environment-for-work", destination: "/blog" },

  // Consolidated duplicate / thin posts (2026-06-15 cannibalization audit) → surviving post
  { source: "/the-3-top-perks-of-a-virtual-business-address-in-las-vegas", destination: "/blog/6-advantages-of-a-virtual-office-in-las-vegas" },
  { source: "/blog/the-3-top-perks-of-a-virtual-business-address-in-las-vegas", destination: "/blog/6-advantages-of-a-virtual-office-in-las-vegas" },
  { source: "/top-benefits-of-a-virtual-office-in-vegas-for-remote-teams", destination: "/blog/6-advantages-of-a-virtual-office-in-las-vegas" },
  { source: "/blog/top-benefits-of-a-virtual-office-in-vegas-for-remote-teams", destination: "/blog/6-advantages-of-a-virtual-office-in-las-vegas" },
  { source: "/why-businesses-switch-from-physical-to-virtual-mailboxes-in-las-vegas", destination: "/blog/virtual-mailboxes-in-las-vegas" },
  { source: "/blog/why-businesses-switch-from-physical-to-virtual-mailboxes-in-las-vegas", destination: "/blog/virtual-mailboxes-in-las-vegas" },
  { source: "/advantages-of-our-private-office-space", destination: "/blog/5-benefits-of-private-office-space-in-las-vegas" },
  { source: "/blog/advantages-of-our-private-office-space", destination: "/blog/5-benefits-of-private-office-space-in-las-vegas" },
  { source: "/budgeting-for-a-successful-event", destination: "/blog/how-to-budget-a-corporate-event-in-las-vegas" },
  { source: "/blog/budgeting-for-a-successful-event", destination: "/blog/how-to-budget-a-corporate-event-in-las-vegas" },

  // Thin generic business-tips / off-topic posts retired 2026-07-01 (spam-update
  // content hardening): zero GSC clicks, no local/coworking nexus, ghost bylines.
  // Each → closest surviving service page or the blog index.
  { source: "/throwing-a-successful-event-for-your-business-tips-and-tricks", destination: "/las-vegas-event-space" },
  { source: "/blog/throwing-a-successful-event-for-your-business-tips-and-tricks", destination: "/las-vegas-event-space" },
  { source: "/5-tips-to-help-your-small-business-convert-more-leads", destination: "/blog" },
  { source: "/blog/5-tips-to-help-your-small-business-convert-more-leads", destination: "/blog" },
  { source: "/top-5-strategies-for-small-businesses-to-improve-customer-retention", destination: "/blog" },
  { source: "/blog/top-5-strategies-for-small-businesses-to-improve-customer-retention", destination: "/blog" },
  { source: "/boosting-employee-engagement-in-a-small-business", destination: "/blog" },
  { source: "/blog/boosting-employee-engagement-in-a-small-business", destination: "/blog" },
  { source: "/mastering-customer-complaint-handling-in-2024", destination: "/blog" },
  { source: "/blog/mastering-customer-complaint-handling-in-2024", destination: "/blog" },
  { source: "/creating-a-productive-morning-routine", destination: "/blog" },
  { source: "/blog/creating-a-productive-morning-routine", destination: "/blog" },
  { source: "/outsourcing-vs-in-house-which-is-the-best-choice-for-small-businesses", destination: "/blog" },
  { source: "/blog/outsourcing-vs-in-house-which-is-the-best-choice-for-small-businesses", destination: "/blog" },
  { source: "/harnessing-the-power-of-social-media-for-business-growth-in-2024", destination: "/blog" },
  { source: "/blog/harnessing-the-power-of-social-media-for-business-growth-in-2024", destination: "/blog" },
  { source: "/transitioning-from-remote-to-hybrid-work", destination: "/las-vegas-coworking" },
  { source: "/blog/transitioning-from-remote-to-hybrid-work", destination: "/las-vegas-coworking" },
  { source: "/embracing-the-future-latest-trends-in-remote-work", destination: "/las-vegas-coworking" },
  { source: "/blog/embracing-the-future-latest-trends-in-remote-work", destination: "/las-vegas-coworking" },
  { source: "/maximizing-small-office-spaces", destination: "/workspace-memberships" },
  { source: "/blog/maximizing-small-office-spaces", destination: "/workspace-memberships" },
  { source: "/ai-in-modern-workspace", destination: "/blog" },
  { source: "/blog/ai-in-modern-workspace", destination: "/blog" },
];

type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

/**
 * Preserve one-hop 301s for legacy WordPress URLs with and without trailing
 * slashes. Paired with `skipTrailingSlashRedirect: true` below so these
 * `.../` variants actually match instead of being stripped first by Next's
 * built-in trailing-slash normalization (which would otherwise produce a
 * two-hop chain: `/foo/` → `/foo` → `/destination`).
 *
 * `proxy.ts` handles the slash-stripping fallback for paths that are not in
 * the redirect table.
 */
function withTrailingSlashVariants(routes: RedirectRule[]): RedirectRule[] {
  return routes.flatMap((route) => {
    if (route.source === "/" || route.source.endsWith("/")) return [route];

    return [route, { ...route, source: `${route.source}/` }];
  });
}

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async redirects() {
    // Order matters: explicit redirects first, then the auto-generated
    // blog slug redirects. Next.js uses first-match-wins, so explicit
    // rules for removed blog slugs must be evaluated before the auto
    // rule (which only covers slugs currently present in content/blog/).
    const slugs = getBlogSlugs();
    const autoBlogRedirects = slugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/blog/${slug}`,
      permanent: true,
    }));

    return withTrailingSlashVariants([
      // NOTE: the /review review-campaign short link is handled in proxy.ts,
      // NOT here — Next.js does not apply a next.config redirect with an
      // external destination at this layer (the path falls through to the
      // [cityService] catch-all and 404s). proxy.ts redirects it to
      // BRAND.reviewUrl. Keep external-destination redirects in proxy.ts.
      ...wordpressRedirects.map((r) => ({ ...r, permanent: true })),
      ...removedBlogRedirects.map((r) => ({ ...r, permanent: true })),
      ...autoBlogRedirects,
    ]);
  },
  // LLM / markdown readiness. The `/md/...` route handlers own the
  // rendering; these rewrites let LLMs fetch the canonical `.md` URL
  // format that the llms.txt standard expects without having to expose
  // an `/md/` path to humans.
  async rewrites() {
    return [
      { source: "/blog/:slug.md", destination: "/md/blog/:slug" },
      { source: "/locations/:city.md", destination: "/md/locations/:city" },
      { source: "/authors/:slug.md", destination: "/md/authors/:slug" },
      { source: "/:slug.md", destination: "/md/:slug" },
    ];
  },
  // Low-risk security headers (defense-in-depth). Deliberately excludes a
  // Content-Security-Policy — that needs a Report-Only rollout first so it
  // doesn't break the Optix booking widget / Vercel Analytics / fonts — and
  // excludes HSTS includeSubDomains/preload to avoid forcing HTTPS on
  // sibling subdomains (member/admin apps). HSTS itself is set at the
  // platform level.
  async headers() {
    return [
      {
        source: "/pricing.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "X-Robots-Tag", value: "noindex, follow" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
