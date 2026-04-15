# SEO Rollup — 2026-04-11

**Status:** Implemented locally, pending deploy  
**Analyst:** Claude Code (Opus 4.5)  
**Site:** muzeoffice.com  
**Repo:** `/Users/robertmelodicsoul/Desktop/muzeoffice-web`

---

## Summary

This rollup implements the SEO patches agreed upon in [SEO-MULTI-LOCATION-ANALYSIS.md](./SEO-MULTI-LOCATION-ANALYSIS.md). The goal is to strengthen Las Vegas-first SEO signals while preserving strategic future Houston/Texas content.

---

## What Changed (Implemented Locally)

### A. Blog Noindex System

Added maintainable `noindex` frontmatter support:

| File | Change |
|------|--------|
| `lib/blog.ts` | Added `noindex?: boolean` to BlogPostFrontmatter interface |
| `app/blog/[slug]/page.tsx` | Applies `robots: { index: false, follow: true }` for noindexed posts |
| `app/sitemap.ts` | Excludes noindexed posts from sitemap |

### B. Blog Inventory Triage

| Post | Status | Reason |
|------|--------|--------|
| `top-5-places-to-visit-in-texas.mdx` | **NOINDEXED** | Off-topic travel content, 0% workspace relevance |
| `muze-office-and-equinox-a-partnership-for-excellence.mdx` | **NOINDEXED** | Legacy Houston content with #houstoncoworking TikTok hashtags |
| `virtual-office-for-llc-in-texas.mdx` | **KEPT INDEXED** | Strategic — captures Texas LLC intent, converts to Las Vegas |

All other 67 blog posts remain indexed.

### C. Las Vegas-First Messaging

| File | Change |
|------|--------|
| `app/layout.tsx` | Title: "Muze Office — Coworking & Virtual Office in Las Vegas" (removed "& Houston") |
| `app/layout.tsx` | Description: ends with "Houston coming soon" instead of "in Las Vegas and Houston" |
| `app/page.tsx` | Reduced Houston section from 5 service cards to 1 "Coming Soon" card |
| `app/page.tsx` | Locations heading: "Coworking in Las Vegas" (removed "& Houston") |
| `app/page.tsx` | FAQ description: Las Vegas only |
| `app/blog/page.tsx` | Metadata and subtitle: Las Vegas only |
| `app/(marketing)/about/page.tsx` | Description: Las Vegas first, "Houston coming soon" at end |
| `app/(marketing)/locations/page.tsx` | Title: "Locations — Muze Office Las Vegas" |
| `lib/data/navigation.ts` | Removed Houston from main nav dropdown (Las Vegas only) |

### D. Sitemap Cleanup

- Noindexed posts are now automatically excluded from sitemap
- Houston pages were already correctly excluded (location status filter)
- 2 posts removed from sitemap via noindex

---

## What Requires Manual Platform Action

### www → apex redirect (Host Consolidation)

The redirect from `www.muzeoffice.com` to `https://muzeoffice.com` **cannot be safely implemented in code** — it requires platform-level configuration.

**Option 1: Vercel Dashboard (Recommended)**

1. Go to Vercel Dashboard → muzeoffice.com project → Settings → Domains
2. Ensure `muzeoffice.com` is the primary domain
3. Add `www.muzeoffice.com` as a redirect to `muzeoffice.com`
4. Vercel will automatically issue SSL and handle the 301 redirect

**Option 2: Namecheap DNS**

If using Namecheap for DNS and not proxying through Vercel:
1. Create a URL redirect record for `www` subdomain
2. Target: `https://muzeoffice.com`
3. Type: Permanent (301)

**Why not in code?**

Adding a redirect in `next.config.ts` would only work for requests that reach the Next.js app. The www→apex redirect should happen at the edge/DNS level before the request hits the app, ensuring:
- Faster redirect (no cold start)
- Correct SSL handling
- Works for all paths

---

## Post-Deployment Checklist

### Immediately After Deploy

1. **Verify www redirect works**
   ```
   curl -I https://www.muzeoffice.com
   # Should return 301 to https://muzeoffice.com
   ```

2. **Verify noindexed posts have correct meta**
   - Visit `/blog/top-5-places-to-visit-in-texas`
   - Check page source for `<meta name="robots" content="noindex, follow">`

3. **Verify sitemap excludes noindexed posts**
   - Visit `/sitemap.xml`
   - Confirm `top-5-places-to-visit-in-texas` and `muze-office-and-equinox-a-partnership-for-excellence` are NOT listed

### Google Search Console (Within 24 Hours)

1. **Submit updated sitemap**
   - Go to GSC → Sitemaps → Submit `https://muzeoffice.com/sitemap.xml`

2. **Request URL removal (optional, speeds up deindexing)**
   - Go to GSC → Removals → New Request
   - Add URLs for noindexed posts if they're currently indexed
   - This is optional — the noindex tag will work, just slower

3. **Check for www/apex issues**
   - Go to GSC → Settings → verify both properties exist
   - Set `muzeoffice.com` (non-www) as preferred domain

### 7-Day Follow-Up

1. Check GSC Coverage report for any new crawl errors
2. Verify noindexed posts are no longer appearing in search results
3. Monitor Las Vegas ranking signals in GSC Performance report

---

## Files Modified

```
lib/blog.ts
app/sitemap.ts
app/blog/[slug]/page.tsx
app/layout.tsx
app/page.tsx
app/blog/page.tsx
app/(marketing)/about/page.tsx
app/(marketing)/locations/page.tsx
lib/data/navigation.ts
content/blog/top-5-places-to-visit-in-texas.mdx
content/blog/muze-office-and-equinox-a-partnership-for-excellence.mdx
```

---

## What Was NOT Changed

- `virtual-office-for-llc-in-texas.mdx` — kept indexed (strategic)
- Houston location pages — already correctly noindexed via location status
- WordPress redirects in `next.config.ts` — left as-is (legacy URL handling)
- Footer navigation — Houston link removed from main nav only, footer still links to /locations

---

## Risk Assessment

| Change | Risk | Mitigation |
|--------|------|------------|
| Noindexing 2 posts | Low | Posts have minimal traffic; one is off-topic, one has stale Houston signals |
| Removing Houston from messaging | Low | Houston is still discoverable via /locations and /locations/houston |
| www→apex left to platform | None | Documented; not a code problem |

---

## Rollback Plan

If any issues arise:

1. **Revert noindex**: Remove `noindex: true` from MDX frontmatter
2. **Revert messaging**: Git revert the commits touching layout/page/navigation files
3. **Sitemap**: Will auto-regenerate on next build

No destructive changes were made. All Houston infrastructure remains intact for future launch.
