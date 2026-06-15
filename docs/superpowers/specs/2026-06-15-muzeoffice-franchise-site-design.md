# MuzeOfficeFranchise.com — Design Spec

**Date:** 2026-06-15
**Branch:** `franchise-site`
**Status:** Approved design, pending spec review
**Owner:** Zac Young (zacyoung@muzeoffice.com)

## 1. Overview

Build a sister marketing site, **MuzeOfficeFranchise.com**, that recruits people who want to
**operate, invest in, or partner on** Muze Office shared-workspace locations. It reuses the
muzeoffice.com design system verbatim so the two sites look like one brand, but it is a
self-contained site with its own content, SEO targeting, sitemap, analytics, and lead capture.

The muzeoffice.com footer already links to `https://muzeofficefranchise.com`, so this site is
already anticipated by the main brand.

### Primary goal

**Maximize capture of high-intent traffic** — people who are actively searching to buy, open,
or invest in a coworking / flexible-workspace business — and convert them into booked discovery
calls with CRM-ready lead data.

Everything in this spec is subordinate to that goal. When a trade-off arises between breadth
(more pages, more top-of-funnel content) and depth (fewer pages that rank for and convert
bottom-of-funnel commercial-intent queries), we choose depth.

## 2. Strategic intent: high-intent first

"High intent" for a franchise/investment site means **commercial and transactional** search
intent, not informational. The visitor we most want has capital and is comparison-shopping
opportunities. We prioritize content and pages that match these queries and route them to the
discovery call in as few clicks as possible.

**Intent tiers (priority order):**

1. **Transactional / ready-to-act** (highest value): "coworking franchise cost", "buy a
   coworking franchise", "coworking franchise for sale", "office space franchise opportunity",
   "flexible workspace franchise", "how much to open a coworking space", "invest in coworking".
2. **Commercial investigation** (compare & evaluate): "best coworking franchise", "coworking
   franchise vs independent", "is coworking profitable", "coworking franchise ROI", "Muze Office
   franchise review".
3. **Informational** (top-of-funnel, Phase 2): "how does coworking make money", "coworking
   industry trends", "how to start a coworking space" (this last one straddles into commercial).

**Conversion principle:** every page has a clear, persistent path to `/discovery-call`. No
page is a dead end. High-intent visitors should never be more than one click from booking.

## 3. Physical architecture (the "local copy")

- New git branch: **`franchise-site`** (created).
- The franchise app is a **self-contained Next.js app in a `/franchise` subdirectory** of this
  repo: its own `package.json`, `app/`, `components/`, `lib/`, `public/`, `next.config.ts`,
  `globals.css`/tokens, `tsconfig.json`.
- The design system (UI primitives, layout components, `animate`, `Section`, `CTASection`,
  `FAQSection`, color tokens, fonts) is **copied** from the parent app so the look is identical.
- Local dev: `cd franchise && bun install && bun dev` on port **3001** (so it can run alongside
  the main site on 3000).
- Deploy (later, by the user): its own Vercel project, **root directory = `franchise`**, domain
  `muzeofficefranchise.com`.
- The live muzeoffice.com app is **never modified** by this work.

**Accepted trade-off:** copied components mean future muzeoffice.com look changes won't
auto-propagate. Acceptable for a marketing sister-site; revisit a shared `packages/ui` later if
drift becomes a problem.

**Rejected alternatives:** (a) transform the existing app in-place — branch diverges from master
permanently, can't merge back; (b) workspace monorepo with shared `packages/ui` — cleanest code
sharing but refactors the working production site, too risky for now.

## 4. Information architecture (v1)

| Route | Working title | Intent tier | Primary keyword target |
|-------|---------------|-------------|------------------------|
| `/` | Home — the franchise pitch | 1–2 | "coworking franchise", "Muze Office franchise opportunity" |
| `/the-opportunity` | The Opportunity | 2 | "coworking business opportunity", "is coworking profitable", market growth |
| `/the-model` | How the Muze Model Works | 1–2 | "how to start a coworking space", what franchisees get |
| `/investment` | Investment & Fees | **1** | "coworking franchise cost", "coworking franchise fees", "coworking franchise ROI" |
| `/franchisees` | Operate a Muze Office | 1 | "coworking franchise", owner-operator intent |
| `/investors` | Invest in Muze Office | 1 | "invest in coworking", "flexible workspace investment", JV |
| `/partners` | Partner With Muze (real estate) | 1–2 | "convert my office space", "coworking management partner", landlords |
| `/why-muze` | Why Muze vs. Other Franchises | **2** | "best coworking franchise", "coworking franchise comparison" |
| `/faq` | Franchise FAQ | 2 | long-tail franchise questions (FAQPage schema) |
| `/about` | About Muze Office | informational | brand story + leadership E-E-A-T |
| `/discovery-call` | Book a Discovery Call | **conversion** | "Muze Office franchise application/contact" |
| `/contact` | Contact | utility | — |
| `/privacy-policy` | Privacy Policy | utility | — |

**Notes on high-intent prioritization:**

- `/investment` and `/why-muze` are deliberately first-class pages because "cost" and "best/
  comparison" queries are the highest-converting franchise searches. They are not buried.
- Three separate audience pages (`/franchisees`, `/investors`, `/partners`) rather than one
  combined page — each targets a distinct high-intent query cluster and gives us three ranking
  surfaces. Can collapse later if they cannibalize.
- **Blog / resource library:** scaffolded (route + MDX pipeline copied) but **content deferred to
  Phase 2**. Phase 2 seeds 2–3 cornerstone commercial-intent articles (e.g., "What does it cost to
  open a coworking space in 2026", "Coworking franchise vs. independent: which is more
  profitable"). Keeps v1 focused on the money pages.

## 5. Page-by-page spec (v1)

Each page reuses the shared `Section` / `FadeIn` / `Stagger` / `CTASection` / `FAQSection`
components. Each page ends with a CTA to `/discovery-call`. Each page has unique
`title`/`description` metadata targeting its keyword and a canonical URL.

- **`/` Home** — Hero (H1 targets "coworking franchise"), three-track selector (Operate / Invest /
  Partner) routing to the audience pages, the opportunity in brief (market stat placeholders),
  "the Muze model" summary, proof/credibility strip, investment-at-a-glance teaser → `/investment`,
  FAQ excerpt, final CTA. LocalBusiness is **not** used here (this is a brand/opportunity org, not
  a location); use Organization + Service/Offer schema.
- **`/the-opportunity`** — flex-workspace market growth, demand drivers, why now, why coworking is
  a resilient business model. All market stats are **flagged placeholders** pending verified
  sources. Links to `/investment` and `/the-model`.
- **`/the-model`** — what a franchisee receives: brand + marketing, the Optix technology stack,
  operations playbook, site selection & buildout support, training, ongoing support. Qualitative;
  no invented numbers.
- **`/investment`** (high priority) — investment range, franchise/license fee, royalty structure,
  what's included, financing notes, typical timeline-to-open. **Every figure is a clearly-marked
  placeholder.** Contains the strongest "cost"/"ROI" keyword coverage. Includes the standard FTC
  disclaimer prominently.
- **`/franchisees`** — for owner-operators who want to run a location. Who it's for, the day-to-day,
  the path from inquiry to open. CTA → discovery call.
- **`/investors`** — for capital partners / JV. Passive vs. active participation, how returns work
  (qualitative + placeholders), what Muze handles operationally. CTA → discovery call.
- **`/partners`** — for landlords / existing operators with real estate to convert or contribute.
  Conversion model, management-partnership framing. CTA → discovery call.
- **`/why-muze`** — comparison/differentiation page: brand, transparent pricing, tech, support,
  multi-revenue model (coworking + virtual office + meeting/event). Honest, no disparagement of
  named competitors. Targets "best coworking franchise"/comparison intent.
- **`/faq`** — franchise-specific FAQ with FAQPage JSON-LD. Questions chosen to capture long-tail
  high-intent queries (cost, requirements, territories, timeline, support, eligibility).
- **`/about`** — brand story + leadership profiles (Person schema for E-E-A-T), adapted from the
  parent site's `people` data where applicable.
- **`/discovery-call`** — conversion page (see §6).
- **`/contact`** — lightweight general contact (reuses the franchise inquiry action or a simpler
  variant).
- **`/privacy-policy`** — adapted from the parent site.

## 6. Conversion funnel & lead capture

- **Primary CTA sitewide:** "Book a Discovery Call" → `/discovery-call`. Present in the header
  (button), every page's closing `CTASection`, and the mobile sticky CTA.
- **`/discovery-call` page** contains:
  1. A **qualification form** with CRM-ready fields:
     - name (required), email (required), phone
     - **track** (required): Franchisee / Investor / Real-estate partner / Not sure
     - **capital available** (range select)
     - **target market / city**
     - **timeline** (e.g., 0–3mo / 3–6mo / 6–12mo / exploring)
     - current role / business (free text)
     - message
  2. A **scheduling embed/link** (Calendly-style) shown as the immediate next step. URL is a
     **configurable placeholder** in brand constants until the real one is provided.
- **Server action `submit-franchise-inquiry`** mirrors the existing `submit-contact-form`:
  honeypot field + sub-3s timing trap, validation, Gmail SMTP via nodemailer (one warm
  transporter), graceful error fallback with a direct email/phone.
  - Subject tagged `[Franchise]` and includes the track.
  - Lead delivered as both a human-readable email **and a structured JSON block** so it is
    CRM-mappable.
  - **CRM extension point:** the action is written so a future `POST` to a CRM webhook can be
    added in one place (a clearly-commented seam), without reworking the form. No live CRM
    integration is built in v1.
- **Lead inbox:** "Both / CRM-ready" — email delivery now (to `franchise@muzeoffice.com` if the
  user confirms that inbox exists, otherwise `notifications@muzeoffice.com` tagged `[Franchise]`),
  plus the structured payload for later CRM piping. *Open item: confirm inbox address.*
- A lighter **"Request the franchise info kit"** secondary CTA may capture top-of-funnel leads via
  the same action with a `kit-request` track. Included if low-cost; otherwise Phase 2.

## 7. SEO strategy (geared to high-intent)

- **Keyword map** organized by intent tier (§2); money pages (`/investment`, `/why-muze`, the
  three audience pages, home) target tier-1 commercial/transactional queries. Informational
  content is Phase 2 and exists to feed internal links into the money pages.
- **Metadata:** new title template (`%s | Muze Office Franchise`), franchise-keyword default
  title/description, `metadataBase = https://muzeofficefranchise.com`, per-page canonicals, OG +
  Twitter cards (OG images adapted/placeholder).
- **Structured data (JSON-LD):**
  - `Organization` (the franchise brand) sitewide.
  - `Service` / `Offer` describing the franchise opportunity.
  - `FAQPage` on `/faq` and the home FAQ excerpt.
  - `BreadcrumbList` on interior pages.
  - `Person` on `/about` leadership.
- **Technical SEO:** `sitemap.ts`, `robots.ts`, `llms.txt` + `llms-full.txt`, all re-pointed to
  the franchise domain and content. Clean internal-linking (every money page interlinks; home
  links to all). Reciprocal link **back to muzeoffice.com** in the footer.
- **Conversion-coupled SEO:** because the goal is high-intent capture, each ranking page is paired
  with a single dominant CTA to the discovery call — ranking without a conversion path is treated
  as incomplete.
- **No fabricated trust signals.** Consistent with the parent repo's stated principle (it removed
  fabricated testimonials): no invented review counts, testimonials, or earnings numbers.

## 8. Shared design system reuse

- Same logo, fonts (Geist, Geist Mono, Plus Jakarta Sans), color tokens (gold `#EAA820`, copper
  `#C17A28`, dark `#1A1A1A`, warm neutrals).
- Same header/footer **structure**; nav swapped to the franchise IA; primary button becomes
  "Book a Discovery Call"; footer links swapped to franchise pages + reciprocal link to
  muzeoffice.com.
- Same `Section`, `animate` (FadeIn/Stagger/ScaleIn), `CTASection`, `FAQSection`, `Card`,
  `Badge`, `Button`, form primitives.
- New brand constants: `url`, `email`, social handles (reuse parent's where shared), booking/
  scheduling URLs, legal name (`Muze International Corporation`).

## 9. Content honesty & legal (must-do before launch)

- **All financial figures** (investment range, franchise/license fee, royalty, ROI, timelines)
  are **clearly-marked placeholders** the user must replace with verified numbers.
- Copy stays **qualitative**; no financial performance representations beyond what an FDD Item 19
  would permit.
- A standard **FTC-style disclaimer** appears sitewide (footer) and prominently on `/investment`:
  *"This website is for informational purposes and is not a franchise offering. A franchise
  offering is made only through a Franchise Disclosure Document (FDD) where required by law."*
- **A real legal review is required before launch.** Exact franchise vs. license structure must be
  confirmed (the user selected "all three tracks"; the registered-franchise/FDD status affects
  required disclaimers).

## 10. Out of scope (YAGNI for v1)

- Full blog/resource content library (scaffold only; Phase 2 content).
- Live CRM integration (build the extension seam, not the integration).
- Online payments, application fees, or deposits.
- Franchisee portal / authenticated area.
- Multi-language.

## 11. Open items / inputs needed from the user

These do **not** block the build (placeholders used), but are needed before launch:

1. Verified financial figures (investment range, fees, royalty, any ROI framing).
2. Real discovery-call scheduling URL (Calendly or similar).
3. Confirm lead inbox address (`franchise@muzeoffice.com` vs. tagged `notifications@`).
4. Confirm legal structure (registered franchise/FDD vs. license/partnership) + legal review.
5. Leadership bios/photos for `/about` (or reuse parent `people` data).
6. Any verified market statistics with sources (for `/the-opportunity`).
7. Confirm `GMAIL_APP_PASSWORD` (or equivalent) is available to the franchise deploy's env.

## 12. Success criteria

- Pixel-consistent look with muzeoffice.com (same header/footer/typography/color).
- All v1 routes build and render with no errors; `next build` clean.
- Every page reachable, mobile-responsive, and one click from `/discovery-call`.
- Money pages (`/investment`, `/why-muze`, audience pages, home) carry tier-1 commercial-intent
  keywords in title, H1, and body, each with a conversion CTA.
- Working qualification form that delivers a tagged, CRM-mappable lead email; honeypot + timing
  spam traps functional.
- Valid JSON-LD (Organization, Service/Offer, FAQPage, BreadcrumbList, Person).
- `sitemap.xml`, `robots.txt`, `llms.txt` present and franchise-scoped.
- No fabricated stats/testimonials; all financial numbers are visible placeholders; FTC
  disclaimer present.
- Runs locally on `:3001` independently of the main site.
