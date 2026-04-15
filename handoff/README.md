# Muze Office — Session Handoff (2026-04-08)

This document is the master transition for picking up work on `muzeoffice.com` in a fresh Claude Code session after context is cleared.

**Read this top-to-bottom before doing anything else.**

---

## TL;DR

- **muzeoffice.com is LIVE** on Vercel. Emergency migration from WordPress → Next.js 16 completed 2026-04-07.
- **73 blog posts migrated** from WordPress WXR → MDX. **68 currently on disk** (5 deleted due to duplicate / thin-content cleanup).
- **Google Search Console verified**, sitemap submitted, Googlebot indexing is in progress.
- **P0 SEO fixes ARE ON DISK but NOT YET DEPLOYED** — a TCC permission issue blocked the final deploy at the end of the previous session. See [Immediate next action](#immediate-next-action).
- **The deploy script is ready**: `/tmp/muzeoffice-deploy.sh`. Just run it from Kitty (see below).

---

## Immediate next action

The previous session made roughly two hours of P0 SEO fixes (LocalBusinessSchema wiring, canonical URLs, BlogPosting schema, author byline fix, legal entity consistency, and re-applying the Mail Holding $39 homepage copy). The build passed cleanly with all these edits. **But then Kitty's TCC permission dropped partway through, blocking the deploy.**

### Step 1 — Restore Kitty's filesystem access (one-time)

On macOS, Kitty needs explicit permission to read `~/Desktop/`. Fix:

1. **System Settings → Privacy & Security → Full Disk Access**
2. Click **+** → navigate to **Applications → kitty.app** → add it
3. Toggle Kitty **ON** in the Full Disk Access list
4. **Fully quit Kitty** (⌘Q — not just close the window)
5. Reopen Kitty
6. Relaunch Claude Code from the fresh Kitty session

Alternative (more granular): System Settings → Privacy & Security → **Files and Folders** → kitty → toggle **Desktop Folder** ON.

### Step 2 — Verify access restored

In Kitty (after restart), run:

```
ls ~/Desktop/muzeoffice-web/app/page.tsx && echo "CAN ACCESS"
```

Expected: a path followed by `CAN ACCESS`.

### Step 3 — Deploy the pending P0 fixes

Either run the existing deploy script directly in Kitty:

```
bash /tmp/muzeoffice-deploy.sh
```

(It grep-audits every edit, prompts for confirmation, then runs `npm run build` + `vercel deploy --prod --yes`.)

Or, if `/tmp/muzeoffice-deploy.sh` is gone (temp files can be cleared on reboot), use the fallback script shipped with this handoff:

```
bash ~/Desktop/muzeoffice-web/handoff/deploy-p0-fixes.sh
```

### Step 4 — Verify on the live site

After the deploy completes, check:

1. **https://muzeoffice.com** — should show new gold M logo in header, Mail Holding $39 FAQ on homepage, canonical link in HTML head
2. **https://muzeoffice.com/las-vegas-virtual-office** — 4 pricing tiers (Mail Holding, Sandstone, Opal, Diamond), LocalBusiness JSON-LD in HTML head
3. **View source** on any blog post — should have BlogPosting JSON-LD
4. **Google Search Console** — no new errors in Coverage, no warnings in Enhancements / Structured data

---

## Current state of muzeoffice.com

### Stack
- **Framework**: Next.js 16.2.1 App Router, React 19, Tailwind CSS v4
- **UI**: shadcn/ui + framer-motion + Plus Jakarta Sans
- **Blog**: `next-mdx-remote/rsc` rendering MDX files from `content/blog/`
- **Hosting**: Vercel, project `mrokais-projects/muzeoffice-web`, account `m-rokai`
- **Domain registrar**: Namecheap (DNS: `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`)
- **Project directory**: `/Users/robertmelodicsoul/Desktop/muzeoffice-web/`

### What's LIVE (already deployed)
- 102 pages total (homepage, 7 static, 14 city-service, 2 location detail, 73 blog posts, + meta routes)
- Mail Holding $39 pricing tier in `lib/data/services.ts` — shown on `/las-vegas-virtual-office` with 4 tiers
- Logo and favicon swapped to the new gold M brand marks (`public/images/logo.png`, `app/icon.png`, `app/apple-icon.png`)
- Header grew from `h-16` → `h-20` to accommodate the full lockup
- 17 explicit WordPress nested-URL redirects in `next.config.ts` (preserves SEO equity for in-body blog links)
- 10 explicit deprecated blog slug redirects (for 5 deleted duplicate/thin posts)
- Auto-generated `/{slug}` → `/blog/{slug}` redirects for the remaining 68 blog posts
- Houston location page + all 7 Houston city-service pages marked `robots: { index: false, follow: true }` (coming-soon)
- Houston removed from sitemap.xml
- Sitemap now has 84 URLs (down from 90 after cleanup)
- Google verification file `public/google19f1866605134007.html` — GSC property verified, sitemap submitted
- OG image fallback at `public/images/og/default.png` (the full brand lockup)

### What's ON DISK but NOT YET DEPLOYED (P0 SEO fixes)

These edits are in the working tree, were compiled successfully in the last local `npm run build`, but were never pushed to Vercel because Kitty's TCC permission dropped before `vercel deploy` could run.

1. **LocalBusinessSchema wired up** on:
   - `app/page.tsx` — `<LocalBusinessSchema locationId="las-vegas" />` at top of returned JSX
   - `app/(marketing)/contact/page.tsx`
   - `app/(marketing)/book-a-tour/page.tsx`
   - `app/(marketing)/locations/[city]/page.tsx` — only when `location.status === "active"`
   - `app/(marketing)/[cityService]/page.tsx` — only when `!isComingSoon`
   - Also the schema's own `description` field was improved in `components/seo/local-business-schema.tsx` to include nearby landmark + local cue context + `image` field

2. **Canonical URLs** added to every page via `alternates.canonical`:
   - `app/page.tsx` — new top-level `metadata` export with `alternates: { canonical: "/" }`
   - `app/(marketing)/about/page.tsx` → `/about`
   - `app/(marketing)/contact/page.tsx` → `/contact`
   - `app/(marketing)/book-a-tour/page.tsx` → `/book-a-tour`
   - `app/(marketing)/workspace-memberships/page.tsx` → `/workspace-memberships`
   - `app/(marketing)/locations/page.tsx` → `/locations`
   - `app/(marketing)/locations/[city]/page.tsx` → dynamic `/locations/${city}`
   - `app/(marketing)/[cityService]/page.tsx` → dynamic `/${cityService}`
   - `app/(marketing)/privacy-policy/page.tsx` → `/privacy-policy`
   - `app/blog/page.tsx` → `/blog`
   - `app/blog/[slug]/page.tsx` → dynamic `/blog/${slug}`

3. **BlogPosting JSON-LD** rendered on blog post pages:
   - `app/blog/[slug]/page.tsx` — imports `JsonLd` from `@/components/seo/json-ld` and `BRAND` from `@/lib/utils/constants`, builds a `blogPostingSchema` object with `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (Person), `publisher` (Organization with logo), `mainEntityOfPage`, `articleSection`, `keywords`, `url`. Renders `<JsonLd data={blogPostingSchema} />` at the top of the `<article>` element.

4. **Author byline bug fixed** in `lib/blog.ts`:
   - Replaced the simple `titleCase` function with `normalizeAuthor` + an `authorOverrides` map
   - Scrubs all `@alphacomarketing.com` emails and `rebecapirela0510@gmail.com` → "Muze Office Team"
   - Title-cases legitimate lowercase names like "mariano iriondo" → "Mariano Iriondo"
   - Any remaining `@` in author strings falls back to "Muze Office Team"

5. **Legal entity consistency** — "Muze International Corporation" is the sole legal name:
   - `lib/utils/constants.ts` — `legalName: "Muze International Corporation"` (was `"Muze Office LLC"`)
   - `app/(marketing)/privacy-policy/page.tsx` — two occurrences of "Muze Office LLC" updated, one in the intro paragraph and one in the contact address block
   - The `OrganizationSchema` component reads from `BRAND.legalName` so it auto-updates

6. **Homepage Mail Holding copy fixes** (these were edited TWICE because the first Edit silently reverted):
   - `app/page.tsx` line 71 (FAQ answer): now starts "Yes. Virtual office plans start at $39/month (Mail Holding)..." and mentions Sandstone $69 as the package-receiving upgrade
   - `app/page.tsx` line 322 → 329: "virtual offices from $69/mo" → "virtual offices from $39/mo"
   - The first edit attempt silently failed. The second edit was applied and the subsequent `npm run build` included this state.

---

## Remaining SEO audit backlog (after the P0 deploy)

From the in-session SEO audit agent (2026-04-07). These are not yet done.

### P1 — Next 30 days (foundation)

- **P1 #10 — Beef up city-service page content.** Commercial pages are ~300 words each; competitors run 1500+. Add a `longFormBody` section per slug in `lib/data/city-services.ts` with (a) "Why choose X at Muze Office Y", (b) "X vs adjacent service", (c) "How to get started". 6–10 hours total.
- **P1 #11 — BreadcrumbList schema + visible breadcrumbs** on commercial pages. Build `components/layout/breadcrumbs.tsx`, render on `[cityService]`, `locations/[city]`, `blog/[slug]`. 2 hours.
- **P1 #12 — Internal links from blog → commercial pages.** Once GSC shows top-20 highest-traffic blog posts, edit each to add a "Learn more" bottom callout linking to the most relevant city-service page. 4 hours (after GSC data arrives).
- **P1 #13 — Blog category taxonomy normalization.** Define `allowedCategories` in `lib/blog.ts` so related-post matching is consistent. 1 hour.
- **P1 #14 — Better image alt text** on homepage + key pages. Replace generic "Muze Office coworking space" alts with descriptive location-specific ones. 1 hour.
- **P1 #15 — Google Business Profile update.** No code; user action in https://business.google.com/ — update Las Vegas listing primary category to "Coworking space", confirm NAP, upload 10 fresh photos, write a launch Google Post. **Highest-leverage local SEO move.** 1 hour.
- **P1 #16 — Citation/directory submissions** (Coworker, Coworking.com, DesksNear.me, LiquidSpace, Yelp, BBB, LV Chamber, Bing Places, Apple Business Connect, Foursquare). No code. 4 hours over 2 weeks.
- **P1 #18 — Twitter/X card metadata expansion** — already partially done (OG image + `site: "@muzeoffice"` added in last session), but verify on the live deploy.

### P2 — Months 2-3 (growth)

- **P2 #19 — Hyperlocal service pages cluster.** Add new entries to `lib/data/services.ts` and `lib/data/city-services.ts` for `coworking-near-las-vegas-strip`, `coworking-near-summerlin`, `coworking-near-henderson`, `meeting-room-rental-near-las-vegas-convention-center`. The `[cityService]` route auto-generates them. Target longtail keywords WeWork won't compete on.
- **P2 #20 — Replace 5 weakest blog posts** with 5 strong city-service-supporting ones. Suggested topics in the SEO audit.
- **P2 #21 — Active review collection.** Post-tour email with GBP review link, front-desk QR code, contact form thank-you state with review CTA.
- **P2 #22 — Schema expansions.** Service schema on each city-service page, Event schema for tours/open houses, Product/Offer schema pulling from `services.ts` pricing tiers.

### Out-of-scope (do NOT pursue)

- Head keywords like "coworking" or "virtual office" — WeWork/Industrious/Regus own these SERPs
- Blog tag/category archive pages with fewer than 200 posts (hurts SEO)
- Paid backlinks, sponsored posts, guest post farms (Google penalizes)
- AMP, HTML sitemaps, blog post table-of-contents for rich results (2018 tactics)
- Spanish translation (not ROI-positive for an independent at this stage)
- Franchising keywords on `muzeoffice.com` (keep on `muzeofficefranchise.com`)

---

## Known issues / future cleanup

1. **Some blog posts still link to old WordPress URLs** inside their body content (e.g. `/workspace-memberships/coworking-houston-texas/`). These are now handled by the explicit redirects in `next.config.ts`, but a cleaner long-term fix is to batch-edit the MDX files to point directly at the new URLs.
2. **Cosmetic escaped periods** in ordered list headings from Turndown conversion (e.g. `## 1\.`). Low priority.
3. **42 WordPress drafts not migrated** — still available in `/Users/robertmelodicsoul/Downloads/muzeoffice.WordPress.2026-03-31.xml` if any need recovering.
4. **Missing WPvivid backup parts 4, 7, 8** — not critical (we have all 109 blog images already downloaded). Re-download from WordPress admin if a full site restore is ever needed.
5. **Unsplash placeholder images** on service pages. Replace with real Muze Office photos when available.
6. **Form webhook URLs** — the contact and book-a-tour forms exist but their webhook destinations haven't been end-to-end tested on the new deployment. Test with a live submission.
7. **Namecheap account lockdown** — verify the fired ex-colleagues have no sub-user access (Profile → Tools → Account Access Manager), enable 2FA, Domain Lock, WHOIS privacy.
8. **Vercel team scope** — project is in the personal `mrokais-projects` scope. Consider creating a "Muze Office" team in Vercel and transferring the project if multiple stakeholders need dashboard access.

---

## Reference — key paths and URLs

### Project
- **Working directory**: `/Users/robertmelodicsoul/Desktop/muzeoffice-web/`
- **Git branch**: `main`
- **Design system doc**: `DESIGN-SYSTEM.md` at project root

### Deployment
- **Vercel project**: `mrokais-projects/muzeoffice-web`
- **Vercel production alias**: https://muzeoffice-web.vercel.app
- **Production URL**: https://muzeoffice.com
- **Deploy command**: `vercel deploy --prod --yes` (from project root)

### External accounts
- **Domain registrar**: Namecheap (user account controlled by the founder)
- **DNS**: Namecheap BasicDNS, A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`
- **Google Search Console**: Verified via `public/google19f1866605134007.html`
- **Blog app**: No separate blog CMS — MDX files in `content/blog/`

### Scripts
- `scripts/migrate-wxr.mjs` — WordPress WXR → MDX migration (already used; re-runnable if needed)
- `scripts/download-blog-images.mjs` — bulk image download from old WP server IP (used; old server may be gone now)
- `scripts/blog-image-manifest.json` — 109 image URL → local path mappings

### Data files
- `lib/data/locations.ts` — locations (las-vegas active, houston coming-soon)
- `lib/data/services.ts` — services + pricing tiers (virtual-office now has 4 tiers with Mail Holding at $39)
- `lib/data/city-services.ts` — per-city-service page content (h1, hero subtitle, meta title/desc, use cases, etc.)
- `lib/data/faqs.ts` — FAQ data for service pages
- `lib/data/navigation.ts` — site nav structure

### SEO infrastructure
- `app/sitemap.ts` — dynamic sitemap (84 URLs active)
- `app/robots.ts` — robots.txt
- `components/seo/local-business-schema.tsx` — CoworkingSpace JSON-LD (now wired up on key pages, but NOT YET DEPLOYED)
- `components/seo/organization-schema.tsx` — Organization JSON-LD (globally rendered via layout)
- `components/seo/json-ld.tsx` — generic JSON-LD `<script>` injector

### WordPress migration artifacts
- **WXR export**: `/Users/robertmelodicsoul/Downloads/muzeoffice.WordPress.2026-03-31.xml`
- **WPvivid backup parts**: `/Users/robertmelodicsoul/Downloads/muzeoffice.com_wpvivid-9e001d22a2543_2026-04-08-00-53_backup_all.part001.zip` through `part013.zip` (parts 4, 7, 8 missing)
- **Old WordPress IP**: `82.180.138.231` (LiteSpeed on Hostinger) — may still be accessible via `curl --resolve muzeoffice.com:443:82.180.138.231 ...` but unreliable

---

## Session context for the next Claude

**If you are Claude Code starting a fresh session on this project, read the [Immediate next action](#immediate-next-action) section FIRST. Do not assume the P0 SEO fixes are deployed — verify via the live site with `curl` first.**

The previous session covered:

1. **Emergency migration** from WordPress → Next.js on Vercel (2026-04-07 afternoon)
2. **Blog migration** — 73 WordPress posts → MDX, 109 images downloaded from old server
3. **301 redirect strategy** — auto-generated from content/blog, plus 17 explicit WordPress nested URL mappings and 10 deleted-blog-slug redirects
4. **Google Search Console verification** (via HTML file method) + sitemap submission
5. **SEO launch audit** by a specialist agent — produced prioritized P0/P1/P2 backlog
6. **P0 404 fixes deployed** — WordPress nested redirects, deleted duplicate/thin posts, noindex Houston
7. **Mail Holding $39 tier added** to virtual-office service (new entry-level tier below Sandstone)
8. **Logo and favicon swapped** to the new gold M brand marks
9. **P0 SEO foundation fixes** — LocalBusinessSchema, canonicals, BlogPosting schema, author byline, legal entity (ALL ON DISK, NOT YET DEPLOYED — see blocker above)

**Do NOT re-do any of the above without checking current state first.** The first 8 items are live on production. Item 9 is in the working tree awaiting deploy.

---

## Recovery path if this handoff doc gets lost

If something happens to this file, the critical state is reconstructible from:

1. **Git log**: `git -C ~/Desktop/muzeoffice-web log --oneline -30`
2. **`.claude/` memory**: there's a project memory at `~/.claude/projects/-Users-robertmelodicsoul/memory/project_muzeoffice_web.md` with durable context (but it may be slightly out of date vs. the live code)
3. **Vercel deployment history**: `vercel ls` from the project root shows all prior deploys with timestamps
4. **The live site itself** — `curl https://muzeoffice.com` tells you what's actually deployed
