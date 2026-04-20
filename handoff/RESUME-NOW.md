---
updated: 2026-04-16
status: production-stable, GitHub-connected, CI/CD ready
---

# Resume point — post-SEO-rollup + GitHub/CI session (2026-04-15 → 2026-04-16)

## Current state

- **muzeoffice.com is LIVE** on Vercel, stable, all builds passing
- **Repo now lives on GitHub**: https://github.com/m-rokai/muzeofficeweb (private)
- **Vercel auto-deploys from master** — every `git push origin master` triggers a build
- **70 blog posts** published + 18 drafts staged in `drafts/`
- **Contact form** operational via Resend (Server Action → `access@muzeoffice.com`)
- **Vercel Analytics** enabled

## What was done in the last session (2026-04-15 → 2026-04-16)

### Codex review + bug fixes (commit a368978)

Codex reviewed the working tree diff and surfaced three issues. All three fixed and committed:

1. **Dedicated Desk price mismatch** — homepage showed $350/mo (that's the Hot Desk price per `lib/data/services.ts`). Corrected to $399/mo in two places in `app/page.tsx` (FAQ-adjacent copy + the featured pricing card).
2. **Sitewide trailing-slash canonicalization regression** — removed `skipTrailingSlashRedirect: true` from `next.config.ts`. The flag had been added to let the legacy WordPress redirect rules own slash variants, but it disabled Next.js's built-in `/foo/` → `/foo` normalization for *every* route, reintroducing duplicate crawlable URLs.
3. **Broken footer FAQ link** — footer linked to `/#faq` but the homepage `<FAQSection>` had no matching `id`. Added `id="faq"` to the `<section>` wrapper in `components/marketing/faq-section.tsx`.

### GitHub + CI/CD connection (commit 2f2e625)

Project was previously deployed via `vercel deploy` CLI only — no git-linked repo. Switched to a GitHub → Vercel integration:

1. Verified `gh` auth as `m-rokai`.
2. First attempt accidentally created a **duplicate repo** `m-rokai/muzeoffice-web` (needs manual deletion — see cleanup below). The **correct existing repo** is `m-rokai/muzeofficeweb` (created 2026-04-08).
3. Pointed local `origin` at `m-rokai/muzeofficeweb` and pushed.
4. **First push only contained the 3 recently-edited files** because everything else was untracked at the time the repo was initialized. The first Git-triggered Vercel deploy failed with 15 "Module not found" errors (missing `@/components/*`, `@/lib/*`, etc.).
5. **Second commit** (2f2e625) bulk-added all 296 untracked project files (components, lib, content, public assets). Build passes on Vercel.

GitHub did flag one oversized asset: `public/images/blog/Muze-Edited-Pic-29.png` at 64MB (GitHub's recommended max is 50MB). It was accepted but consider compressing or moving to Git LFS.

## What to do next

### Immediate (no code)

- **Confirm Vercel Git integration promotes master → production.** The push deployed as *Preview*, not Production. Check Vercel Dashboard → muzeoffice-web → Settings → Git and ensure `master` is set as the Production Branch. After that, pushes to master will auto-deploy to the live domain.
- **Delete the duplicate GitHub repo** `m-rokai/muzeoffice-web` (the `gh repo create` accident). GitHub Settings → Danger Zone → Delete repository.
- **Google Search Console**: request indexing for priority blog posts (10–20/day limit).
- **Google Business Profile**: verify address shows "6860 Bermuda Rd, Suite 200" and matches site NAP.

### Ready to publish (code needed — copy + deploy)

- **18 draft convention posts** in `drafts/`. See `drafts/README.md` for publishing instructions and inventory.

### Housekeeping

- Compress or LFS-migrate `public/images/blog/Muze-Edited-Pic-29.png` (64MB).
- The 296-file bulk commit was a one-time cleanup — future commits will be cleanly scoped.

### Future improvements (unchanged from prior session)

- Resend domain: MX record for `web.muzeoffice.com` not added (Namecheap blocks it due to Gmail mail settings). Not required for sending — only affects bounce handling.
- Per-post blog descriptions (25 posts share a generic fallback) would improve SERP CTR.
- Hyperlocal city-service slugs for GSC-identified demand — `lib/data/services.ts` + `lib/data/city-services.ts` auto-generate pages via the `[cityService]` route.

## Key paths

- **Project**: `~/Desktop/muzeoffice-web/`
- **GitHub**: `m-rokai/muzeofficeweb` (private, origin remote)
- **Vercel project**: `mrokais-projects/muzeoffice-web`
- **Production URL**: https://muzeoffice.com
- **Drafts folder**: `drafts/` (18 unpublished convention + evergreen posts)
- **Contact form action**: `lib/actions/submit-contact-form.ts`
- **City-service data**: `lib/data/city-services.ts`
- **Blog content**: `content/blog/` (70 published posts)
- **Design system**: `DESIGN-SYSTEM.md` at project root
- **Resend**: verified domain `web.muzeoffice.com`, API key in Vercel env as `RESEND_API_KEY`

## Recent commits

- `2f2e625` — Add all project files missing from initial repo push (296 files)
- `a368978` — Fix pricing mismatch, trailing-slash canonicalization, and FAQ anchor
- `f542574` — feat: initial commit
