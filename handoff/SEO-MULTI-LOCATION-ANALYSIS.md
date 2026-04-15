# Multi-Location SEO Analysis: Las Vegas vs Houston

**Date:** 2026-04-11  
**Analyst:** Claude Code (Opus 4.5)  
**Site:** muzeoffice.com  
**Repo:** `/Users/robertmelodicsoul/Desktop/muzeoffice-web`

---

## Executive Summary

The site correctly handles technical SEO basics (Houston pages are noindexed, excluded from sitemap). However, there are strategic content and internal linking issues that could dilute Las Vegas ranking signals and confuse Google about the primary market.

**Key finding:** The homepage dedicates ~20% of its service links to noindexed Houston pages, sending PageRank to pages that cannot rank and signaling to Google that Houston is equally important as Las Vegas.

---

## Current Technical State

### Sitemap (`app/sitemap.ts`)
- Correctly filters out Houston: `locations.filter((loc) => loc.status === "active")`
- Only Las Vegas pages included
- **Status: CORRECT**

### Robots/Noindex
- `[cityService]/page.tsx`: Sets `robots: { index: false, follow: true }` for coming-soon locations
- `locations/[city]/page.tsx`: Sets `robots: { index: false, follow: true }` for coming-soon locations
- **Status: CORRECT**

### Houston Location Data (`lib/data/locations.ts`)
- Status: `coming-soon`
- Address: `TBD`
- 7 city-service entries in `city-services.ts`
- No long-form SEO content (unlike Las Vegas)

---

## Findings (Ordered by Severity)

### 1. CRITICAL: Excessive Houston Internal Linking Dilutes Las Vegas Authority

**What I found:**
- Homepage has a full "Houston - Coming Soon" section with 5 service cards linking to `/houston-*` pages
- Navigation includes `Houston (Coming Soon)` link
- Layout metadata: "Coworking & Virtual Office in Las Vegas **& Houston**"
- About page, blog page, contact page all mention Houston prominently
- FAQ on homepage: "coming soon to Houston"

**Files affected:**
- `app/page.tsx` (lines 227-267: Houston services section)
- `app/layout.tsx` (line 29: default title)
- `lib/data/navigation.ts` (line 15: Houston nav item)
- `app/(marketing)/about/page.tsx`
- `app/(marketing)/contact/page.tsx`
- `app/blog/page.tsx`

**Why this matters:**
Google uses internal linking patterns to understand site hierarchy and prioritization. When the homepage (highest authority page) dedicates ~20% of its service links to noindexed Houston pages:
1. PageRank flows to pages that cannot rank
2. Signals to Google that Houston is equally important as Las Vegas
3. Dilutes the "Las Vegas coworking" topical signal

**Severity: HIGH**

---

### 2. HIGH: One Off-Topic Blog Post Hurts Topical Authority

**File:** `content/blog/top-5-places-to-visit-in-texas.mdx`

**Content:** Pure travel content about The Alamo, Big Bend, San Antonio River Walk, Austin music scene, Texas Hill Country wineries. Zero mention of coworking, virtual offices, or Muze Office.

**Metadata:**
```yaml
title: "Top 5 Places to Visit in Texas"
categories: ["Texas"]
```

**Why this matters:**
- Categorized as "Texas" (not a workspace category)
- 0% topical relevance to core business
- Published under the domain, diluting "coworking/virtual office" expertise signal
- Takes up 1/70 of blog inventory with off-topic content

**Severity: HIGH** - Should be removed or heavily rewritten with a workspace angle.

---

### 3. MEDIUM: Legacy Houston-Era Content Creates Mixed Signals

**File:** `content/blog/muze-office-and-equinox-a-partnership-for-excellence.mdx`

**Content:** 2023 post announcing an Equinox partnership with embedded TikTok containing hashtags: `#houstoncoworking` `#houstonsmallbusiness` `#houston`

**Issues:**
- Implies Houston was/is the primary market
- TikTok embed text is crawlable, adding Houston signals
- No mention of Las Vegas in this post
- Partnership status unclear

**Severity: MEDIUM** - Should be audited for accuracy.

---

### 4. MEDIUM: Site-Wide Metadata Overweights Houston

**Files affected:**

| File | Current Value |
|------|---------------|
| `app/layout.tsx` | `"Muze Office - Coworking & Virtual Office in Las Vegas & Houston"` |
| `app/blog/page.tsx` | Description includes "Las Vegas and Houston" |
| `app/(marketing)/about/page.tsx` | Description includes "Las Vegas and Houston" |
| `app/(marketing)/locations/page.tsx` | Title includes "Las Vegas & Houston" |

**Why this matters:**
Sitewide metadata appears in HTML `<title>` and `<meta description>` on every page:
1. Confuses users searching for "Las Vegas coworking"
2. Dilutes click-through rate for Las Vegas queries
3. Implies multi-location scale not yet achieved

**Severity: MEDIUM**

---

### 5. LOW: WordPress Redirects Send Traffic to Noindexed Pages

**File:** `next.config.ts`

```typescript
{ source: "/workspace-memberships/coworking-houston-texas", destination: "/houston-coworking" },
{ source: "/workspace-memberships/virtual-office-houston-texas", destination: "/houston-virtual-office" },
{ source: "/office-day-pass-in-houston-at-muzeoffice", destination: "/houston-coworking" },
```

**Impact:** Old WordPress URLs redirect to noindexed Houston pages. Anyone following old links lands on a "Coming Soon" page with no concrete offering.

**Severity: LOW** - Legacy URLs with minimal traffic. Acceptable for now.

---

### 6. POSITIVE: Texas LLC Blog Post is Strategic Asset

**File:** `content/blog/virtual-office-for-llc-in-texas.mdx`

**Content:** Targets Texas LLC founders but explicitly pitches Las Vegas as an out-of-state business address option. Links to `/las-vegas-virtual-office`.

**Why this is GOOD:**
- Captures Texas search traffic
- Converts to Las Vegas service (the actual offering)
- Positions Las Vegas as a tax-advantaged alternative
- Legitimate future-market groundwork

**Recommendation: KEEP** - This is a model for how to handle pre-launch market content.

---

## Texas/Houston Content Inventory

| Content | Current State | Recommended State |
|---------|---------------|-------------------|
| `/locations/houston` | Noindexed, not in sitemap | Keep as-is |
| `/houston-virtual-office` (and 6 other city-service pages) | Noindexed, not in sitemap | Keep as-is |
| `virtual-office-for-llc-in-texas.mdx` | **Indexed, in sitemap** | **Keep indexed** - strategic |
| `top-5-places-to-visit-in-texas.mdx` | Indexed, in sitemap | **Remove or noindex** - off-topic |
| `muze-office-and-equinox-a-partnership-for-excellence.mdx` | Indexed, in sitemap | **Audit** - verify partnership active |
| Homepage Houston section | 5 service cards | **Reduce to 1 card** |
| Navigation "Houston (Coming Soon)" | Main nav | **Move to footer only** |

---

## Risk Assessment

| Risk Area | Current Issue | Impact Level |
|-----------|---------------|--------------|
| **Sitemap** | Correctly excludes Houston | None |
| **Internal linking** | Homepage links heavily to noindexed Houston pages | HIGH - PageRank dilution |
| **Canonical consolidation** | Canonicals set correctly | None |
| **Mixed LV/Houston messaging** | Layout title, hero, about page all emphasize dual-market | MEDIUM - Dilutes Las Vegas focus |
| **Off-topic blog inventory** | Texas travel post has zero workspace relevance | HIGH - Hurts topical authority |
| **Legacy blog content** | Equinox post implies Houston was primary market | LOW - Confusing signal |

---

## Recommended Strategy

### Phase 1: NOW (This Week)

1. **Remove or noindex** `top-5-places-to-visit-in-texas.mdx`
2. **Update `app/layout.tsx`** default title: remove "& Houston"
3. **Reduce homepage Houston section** to a single "Houston coming soon" card (not 5 service cards)
4. **Move Houston nav item** from main nav to footer only
5. **Audit Equinox post** - if partnership inactive, update or archive

### Phase 2: PRE-LAUNCH (When Houston Address is Confirmed)

1. Add full long-form content to Houston city-service pages (structure already exists in `city-services.ts`)
2. Publish 3-5 Houston-specific blog posts
3. Update Houston location with real address/phone in `locations.ts`
4. Keep noindex until launch day

### Phase 3: LAUNCH (Houston Grand Opening)

1. Flip Houston to `status: "active"` in `lib/data/locations.ts`
2. This automatically:
   - Adds Houston to sitemap
   - Removes noindex from Houston pages
   - Adds LocalBusinessSchema to Houston pages
3. Update sitewide metadata to include Houston
4. Submit sitemap to GSC
5. Request indexing for top Houston pages

### Phase 4: POST-LAUNCH (30 Days After)

1. Monitor GSC for Houston-specific rankings
2. Build local citations (Yelp, BBB, Coworker, etc.) for Houston
3. Publish Houston convention/event content
4. Add Houston to Google Business Profile

---

## Threshold for Indexing Houston

Only flip Houston to indexed when you have:
- [ ] Real street address (not TBD)
- [ ] Working phone number
- [ ] At least 3 Houston-specific blog posts published
- [ ] Google Business Profile ready to verify
- [ ] Long-form content added to all Houston city-service pages

---

## Immediate Action Items

| Priority | Action | File(s) |
|----------|--------|---------|
| P0 | Delete or noindex `top-5-places-to-visit-in-texas.mdx` | `content/blog/` |
| P0 | Remove "& Houston" from default title | `app/layout.tsx` |
| P1 | Reduce homepage Houston section from 5 cards to 1 mention | `app/page.tsx` |
| P1 | Move Houston from main nav to footer | `lib/data/navigation.ts` |
| P2 | Audit Equinox partnership post for accuracy | `content/blog/muze-office-and-equinox-a-partnership-for-excellence.mdx` |
| P2 | Remove "and Houston" from blog page metadata | `app/blog/page.tsx` |

---

## Summary

The Texas LLC blog post is strategic and should be kept - it captures Texas intent and converts to Las Vegas. The off-topic Texas travel post should be removed. The Houston infrastructure (noindexed pages, city-service data) is correctly staged for future launch. The main issue is excessive Houston visibility on the homepage and in sitewide metadata, which dilutes Las Vegas ranking signals during the critical early indexing period.

**Bottom line:** Minimize Houston's UI presence now while keeping the technical infrastructure ready for launch.
