# MuzeOfficeFranchise.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-contained franchise-recruitment marketing site at `/franchise` (deploys to muzeofficefranchise.com) that reuses the muzeoffice.com design system and converts high-intent operator/investor/partner traffic into booked discovery calls.

**Architecture:** A second, isolated Next.js 16 App Router app living in the `/franchise` subdirectory of this repo, on branch `franchise-site`. It copies the design system (UI primitives, tokens, fonts, layout/marketing components) verbatim, then layers franchise-specific brand constants, navigation, data, pages, lead capture, and SEO. The live muzeoffice.com app at the repo root is never modified. Local dev runs on port 3001; Vercel deploys with root directory `franchise`.

**Tech Stack:** Next.js 16.2.6 (App Router, RSC), React 19, Tailwind v4, shadcn-style UI, framer-motion, nodemailer (Gmail SMTP), Bun (package manager + built-in test runner). Spec: `docs/superpowers/specs/2026-06-15-muzeoffice-franchise-site-design.md`.

---

## Conventions & ground rules (read before any task)

- **Project rule (AGENTS.md):** This Next.js may differ from training data. Before writing framework code, consult `node_modules/next/dist/docs/`. Every page/layout/route pattern in this plan is mirrored from the *working* parent app (Next 16.2.6), so prefer the parent's actual code as the source of truth when in doubt.
- **Run all `franchise` commands from inside the `franchise/` directory** (e.g. `cd franchise && …`). Paths in tasks are relative to `franchise/` unless prefixed with `../` (the parent app).
- **Copying files:** "Copy X" means `cp ../<path> <path>` (or `cp -r`). The parent files exist in this same branch — this is concrete, not a placeholder.
- **Testing posture:** The parent repo has no test harness. We add `bun test` (built-in, zero new deps) for the *pure lead-capture logic only* — the highest-risk code. UI/pages are verified by `bun run build` (clean), `bunx tsc --noEmit`, `bun run lint`, and manual click-through on `:3001`.
- **Content honesty:** No fabricated stats, reviews, or earnings claims. All financial figures are written as visible placeholder tokens in the form `{{INVESTMENT_RANGE}}`, `{{FRANCHISE_FEE}}`, `{{ROYALTY}}`, `{{TIME_TO_OPEN}}`, `{{LEGAL_STRUCTURE}}` so the user can find-and-replace them. The FTC-style disclaimer is sitewide.
- **Conversion rule:** every page ends with a `CTASection` pointing to `/discovery-call`. No dead ends.
- **Commits:** one per task (or per logical sub-step), present-tense Conventional Commits, scope `franchise`. End every commit message body with:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- **Page-task format:** foundational/interface tasks include complete code. Content pages give exact path + full metadata code + H1 + ordered section list (component + concrete copy/bullets + keywords) + internal links + CTA + schema. At execution, write real copy inline; use placeholder tokens only for figures listed above.

---

## File structure (what gets created)

```
franchise/
  package.json, tsconfig.json, next-env.d.ts, next.config.ts,
  postcss.config.mjs, eslint.config.mjs, components.json, .gitignore
  app/
    globals.css, layout.tsx, page.tsx, error.tsx, global-error.tsx, not-found.tsx
    robots.ts, sitemap.ts
    llms.txt/route.ts
    the-opportunity/page.tsx, the-model/page.tsx, investment/page.tsx
    franchisees/page.tsx, investors/page.tsx, partners/page.tsx
    why-muze/page.tsx, faq/page.tsx, about/page.tsx
    discovery-call/page.tsx, contact/page.tsx, privacy-policy/page.tsx
    api/franchise-inquiry/  (only if a non-action endpoint is needed — default: server action, no api route)
  components/
    ui/*            (copied verbatim)
    layout/site-header.tsx, site-footer.tsx, mobile-cta.tsx, section.tsx, breadcrumbs.tsx
    marketing/animate.tsx, cta-section.tsx, faq-section.tsx, track-cards.tsx
    forms/franchise-inquiry-form.tsx
    seo/json-ld.tsx, organization-schema.tsx, service-schema.tsx, breadcrumb-schema.tsx, person-schema.tsx
    analytics/engagement-tracker.tsx  (copied)
  lib/
    utils.ts, utils/button-variants.ts, utils/constants.ts
    data/navigation.ts, tracks.ts, franchise-faqs.ts, people.ts, inquiry-options.ts
    actions/franchise-inquiry-core.ts, franchise-inquiry-core.test.ts, submit-franchise-inquiry.ts
  public/
    images/  (logo + og copied from ../public/images)
```

---

## Phase A — Scaffold the isolated app

### Task 1: Create the `/franchise` app skeleton

**Files:**
- Create: `franchise/package.json`, `franchise/tsconfig.json`, `franchise/next-env.d.ts`, `franchise/next.config.ts`, `franchise/postcss.config.mjs`, `franchise/eslint.config.mjs`, `franchise/components.json`, `franchise/.gitignore`
- Create: `franchise/app/globals.css` (copied), `franchise/app/layout.tsx` (temporary), `franchise/app/page.tsx` (temporary)
- Modify: `../.gitignore` (ignore `franchise/.next`, `franchise/node_modules`)

- [ ] **Step 1: Create `franchise/package.json`** (mirror parent deps; name + port differ)

```json
{
  "name": "muzeoffice-franchise-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "eslint",
    "test": "bun test"
  },
  "dependencies": {
    "@base-ui/react": "^1.3.0",
    "@next/font": "^14.2.15",
    "@tailwindcss/typography": "^0.5.19",
    "@vercel/analytics": "^2.0.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.7.0",
    "next": "16.2.6",
    "nodemailer": "^8.0.10",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "shadcn": "^4.1.2",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/nodemailer": "^8.0.0",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```
(Dropped vs. parent: `gray-matter`, `next-mdx-remote`, `remark-gfm` — blog deferred to Phase 2.)

- [ ] **Step 2: Copy config files from parent and trim**

```bash
cd franchise
cp ../tsconfig.json ./tsconfig.json
cp ../next-env.d.ts ./next-env.d.ts
cp ../postcss.config.mjs ./postcss.config.mjs
cp ../eslint.config.mjs ./eslint.config.mjs
cp ../components.json ./components.json
cp ../app/globals.css ./app/globals.css   # (mkdir -p app first)
```
Run `mkdir -p franchise/app franchise/components franchise/lib franchise/public` before the copies if needed.

- [ ] **Step 3: Write `franchise/next.config.ts`** (minimal — NO muzeoffice redirects/rewrites)

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
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
```

- [ ] **Step 4: Write `franchise/.gitignore`**

```
/node_modules
/.next
/out
/build
*.tsbuildinfo
.env*.local
.DS_Store
```

- [ ] **Step 5: Add franchise ignores to the parent `.gitignore`**

Append to `../.gitignore`:
```
# Franchise sister-app build artifacts
franchise/.next
franchise/node_modules
franchise/*.tsbuildinfo
```

- [ ] **Step 6: Write a temporary `app/layout.tsx`** (replaced in Task 16) — minimal so build works

```tsx
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
```

- [ ] **Step 7: Write a temporary `app/page.tsx`**

```tsx
export default function Home() {
  return <main>Muze Office Franchise — scaffold OK</main>;
}
```

- [ ] **Step 8: Install and build**

Run: `cd franchise && bun install && bun run build`
Expected: install succeeds; `next build` completes with no errors; route `/` listed.

- [ ] **Step 9: Commit**

```bash
git add franchise ../.gitignore
git commit -m "feat(franchise): scaffold isolated Next.js app on :3001"
```

---

## Phase B — Copy the design system

### Task 2: Copy UI primitives + utils

**Files:** Create `franchise/components/ui/*`, `franchise/lib/utils.ts`, `franchise/lib/utils/button-variants.ts`

- [ ] **Step 1: Copy directories**

```bash
cd franchise
mkdir -p components/ui lib/utils
cp ../components/ui/*.tsx components/ui/
cp ../lib/utils.ts lib/utils.ts
cp ../lib/utils/button-variants.ts lib/utils/button-variants.ts
```

- [ ] **Step 2: Typecheck**

Run: `cd franchise && bunx tsc --noEmit`
Expected: no errors (all `@/` imports resolve via copied tsconfig paths).

- [ ] **Step 3: Commit**

```bash
git add franchise/components/ui franchise/lib/utils.ts franchise/lib/utils/button-variants.ts
git commit -m "feat(franchise): copy shadcn UI primitives and utils"
```

### Task 3: Copy brand-agnostic layout/marketing components + assets

**Files:** Create `franchise/components/layout/section.tsx`, `franchise/components/layout/breadcrumbs.tsx`, `franchise/components/marketing/animate.tsx`, `franchise/components/marketing/faq-section.tsx`, `franchise/components/analytics/engagement-tracker.tsx`; copy `franchise/public/images/{logo.png,og/*}`

- [ ] **Step 1: Copy components that are brand-neutral as-is**

```bash
cd franchise
mkdir -p components/layout components/marketing components/analytics public/images/og
cp ../components/layout/section.tsx components/layout/
cp ../components/layout/breadcrumbs.tsx components/layout/
cp ../components/marketing/animate.tsx components/marketing/
cp ../components/marketing/faq-section.tsx components/marketing/
cp ../components/analytics/engagement-tracker.tsx components/analytics/
cp ../public/images/logo.png public/images/logo.png
cp -r ../public/images/og/* public/images/og/ 2>/dev/null || true
cp ../app/apple-icon.png app/ 2>/dev/null || true
cp ../app/icon.png app/ 2>/dev/null || true
```
Note: `faq-section.tsx` already emits FAQPage JSON-LD — no change needed.

- [ ] **Step 2: Typecheck**

Run: `cd franchise && bunx tsc --noEmit`
Expected: no errors. (`section.tsx`, `animate.tsx`, `breadcrumbs.tsx`, `faq-section.tsx`, `engagement-tracker.tsx` have no brand string deps.)

- [ ] **Step 3: Commit**

```bash
git add franchise/components franchise/public franchise/app/icon.png franchise/app/apple-icon.png
git commit -m "feat(franchise): copy brand-neutral layout/marketing components and assets"
```

---

## Phase C — Brand constants & data

### Task 4: Franchise brand constants

**Files:** Create `franchise/lib/utils/constants.ts`

- [ ] **Step 1: Write `lib/utils/constants.ts`**

```ts
export const BRAND = {
  name: "Muze Office Franchise",
  legalName: "Muze International Corporation",
  tagline: "Own a flexible-workspace business with the Muze Office model",
  email: "franchise@muzeoffice.com",
  url: "https://muzeofficefranchise.com",
  mainSiteUrl: "https://muzeoffice.com",
  phoneDisplay: "(702) 370-7515",
  phoneTel: "+17023707515",
  social: {
    twitter: "https://x.com/muzeoffice",
    facebook: "https://facebook.com/muzeoffice",
    instagram: "https://instagram.com/muzeoffice",
    linkedin: "https://linkedin.com/company/muzeoffice",
    tiktok: "https://tiktok.com/@muzeoffice",
  },
  scheduling: {
    // TODO(user): replace with the real discovery-call scheduling link.
    discoveryCallUrl: "https://calendly.com/muzeoffice/franchise-discovery-call",
  },
  // FTC-style disclaimer. Shown sitewide (footer) and prominently on /investment.
  disclaimer:
    "This website and its contents are for informational purposes only and do not constitute an offer to sell, or the solicitation of an offer to buy, a franchise. A franchise is offered only by a Franchise Disclosure Document (FDD) in jurisdictions that require registration, and only after compliance with applicable pre-sale disclosure requirements. Figures shown are illustrative placeholders and are not a guarantee of financial performance.",
} as const;

export const COLORS = {
  gold: "#EAA820",
  copper: "#C17A28",
  dark: "#1A1A1A",
  offBlack: "#111111",
  warmWhite: "#FAFAF7",
  warmGray: "#F2F1ED",
  mutedText: "#74726D",
  warmBorder: "#E6E4DF",
  white: "#FFFFFF",
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add franchise/lib/utils/constants.ts
git commit -m "feat(franchise): brand constants, scheduling URL, FTC disclaimer"
```

### Task 5: Navigation data

**Files:** Create `franchise/lib/data/navigation.ts`

- [ ] **Step 1: Write `lib/data/navigation.ts`**

```ts
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { label: "The Opportunity", href: "/the-opportunity" },
  { label: "The Model", href: "/the-model" },
  { label: "Investment", href: "/investment" },
  { label: "Who It's For", href: "/franchisees" },
  { label: "Why Muze", href: "/why-muze" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  opportunity: [
    { label: "The Opportunity", href: "/the-opportunity" },
    { label: "The Muze Model", href: "/the-model" },
    { label: "Investment & Fees", href: "/investment" },
    { label: "Why Muze", href: "/why-muze" },
  ],
  audiences: [
    { label: "Franchisees", href: "/franchisees" },
    { label: "Investors", href: "/investors" },
    { label: "Real-Estate Partners", href: "/partners" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Discovery Call", href: "/discovery-call" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/muzeoffice" },
    { label: "LinkedIn", href: "https://linkedin.com/company/muzeoffice" },
    { label: "Twitter (X)", href: "https://x.com/muzeoffice" },
    { label: "Facebook", href: "https://facebook.com/muzeoffice" },
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add franchise/lib/data/navigation.ts
git commit -m "feat(franchise): navigation data"
```

### Task 6: Audience track data

**Files:** Create `franchise/lib/data/tracks.ts`

- [ ] **Step 1: Write `lib/data/tracks.ts`**

```ts
import { Building2, TrendingUp, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Track {
  id: "franchisee" | "investor" | "partner";
  slug: string;            // route under /
  icon: LucideIcon;
  label: string;           // nav/card title
  audience: string;        // who it's for (one line)
  summary: string;         // card body
  /** Primary commercial-intent keyword the page targets. */
  keyword: string;
}

export const tracks: Track[] = [
  {
    id: "franchisee",
    slug: "franchisees",
    icon: Building2,
    label: "Operate a Location",
    audience: "Owner-operators who want to run a Muze Office",
    summary:
      "Open and run your own flexible-workspace location using Muze's brand, technology, playbook, and hands-on launch support.",
    keyword: "coworking franchise",
  },
  {
    id: "investor",
    slug: "investors",
    icon: TrendingUp,
    label: "Invest",
    audience: "Capital partners and JV investors",
    summary:
      "Put capital into new Muze Office locations while an experienced operator handles day-to-day management.",
    keyword: "invest in coworking",
  },
  {
    id: "partner",
    slug: "partners",
    icon: Handshake,
    label: "Partner Your Space",
    audience: "Landlords and operators with commercial real estate",
    summary:
      "Convert underused office or retail square footage into a branded Muze Office flexible-workspace business.",
    keyword: "convert office space to coworking",
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
```

- [ ] **Step 2: Commit**

```bash
git add franchise/lib/data/tracks.ts
git commit -m "feat(franchise): three audience tracks (operate/invest/partner)"
```

### Task 7: Franchise FAQ data

**Files:** Create `franchise/lib/data/franchise-faqs.ts`

- [ ] **Step 1: Write `lib/data/franchise-faqs.ts`** (real copy; figures as placeholder tokens)

```ts
export interface FAQ {
  question: string;
  answer: string;
}

export const franchiseFAQs: FAQ[] = [
  {
    question: "What is the Muze Office franchise opportunity?",
    answer:
      "Muze Office licenses its flexible-workspace model — coworking, virtual offices, private offices, meeting rooms, and event space — to independent operators, investors, and real-estate partners. You get the brand, the Optix-powered technology stack, an operations playbook, site-selection and buildout support, training, and ongoing marketing support.",
  },
  {
    question: "How much does it cost to open a Muze Office location?",
    answer:
      "The total estimated initial investment is {{INVESTMENT_RANGE}}, which varies with market, square footage, and buildout condition. This is an illustrative range, not a guarantee — exact figures and a full cost breakdown are provided during the discovery process and in the disclosure documents.",
  },
  {
    question: "What is the franchise fee and what does it include?",
    answer:
      "The initial fee is {{FRANCHISE_FEE}} and covers {{FRANCHISE_FEE_INCLUDES}} (brand license, training, launch support, and access to the technology stack and playbook). Ongoing royalties are {{ROYALTY}}.",
  },
  {
    question: "Do I need prior coworking or real-estate experience?",
    answer:
      "No. Many successful operators come from hospitality, services, or general business backgrounds. What matters most is local market knowledge, available capital, and a commitment to running a member-first space. Muze provides the operating system and training.",
  },
  {
    question: "What support does Muze provide?",
    answer:
      "Brand and marketing assets, the Optix member-management and booking technology, an operations and pricing playbook, site-selection guidance, buildout and design standards, pre-opening training, and ongoing operational support.",
  },
  {
    question: "What markets are available?",
    answer:
      "Muze is expanding from its Las Vegas flagship (with Houston opening in 2026) into new U.S. markets. Territory availability is confirmed during the discovery call — book one to check your market.",
  },
  {
    question: "How long does it take to open?",
    answer:
      "Typical time from signed agreement to opening is {{TIME_TO_OPEN}}, depending on site selection, permitting, and buildout. The discovery process maps a realistic timeline for your specific market and space.",
  },
  {
    question: "Can I invest without running the location day-to-day?",
    answer:
      "Yes. Our investor track is built for capital partners who want exposure to the flexible-workspace model while an experienced operator handles operations. See the Investors page and book a discovery call to discuss structures.",
  },
  {
    question: "I own commercial space — can I convert it?",
    answer:
      "Often, yes. If you control office or retail square footage, our partner track helps you evaluate converting it into a branded Muze Office. We assess the space's fit on the discovery call.",
  },
  {
    question: "Is this a registered franchise?",
    answer:
      "{{LEGAL_STRUCTURE}} This website is informational only and is not a franchise offering; a franchise is offered solely through the applicable disclosure documents where required by law.",
  },
];

/** Short subset used in the homepage FAQ excerpt. */
export const homepageFranchiseFAQs: FAQ[] = franchiseFAQs.slice(0, 5);
```

- [ ] **Step 2: Commit**

```bash
git add franchise/lib/data/franchise-faqs.ts
git commit -m "feat(franchise): franchise FAQ data with figure placeholders"
```

### Task 8: People data (leadership for /about + Person schema)

**Files:** Create `franchise/lib/data/people.ts`

- [ ] **Step 1: Copy and adapt**

```bash
cd franchise && mkdir -p lib/data
cp ../lib/data/people.ts lib/data/people.ts
```
Then edit `lib/data/people.ts`: the `schemaId` fields use `${BRAND.url}/#…`. Because franchise `BRAND.url` is the franchise domain, leave the template literal as-is (it will resolve to the franchise URL). Verify it imports `BRAND` from `@/lib/utils/constants` (the franchise constants from Task 4). Remove any people not used on `/about` if the file references data not copied; keep `ZACHARY_DEVON_DUONG` and `ROBERT_MAI` and the exported `people` array.

- [ ] **Step 2: Typecheck**

Run: `cd franchise && bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add franchise/lib/data/people.ts
git commit -m "feat(franchise): leadership people data for About + Person schema"
```

---

## Phase D — Lead capture (TDD on the core logic)

### Task 9: Inquiry select options

**Files:** Create `franchise/lib/data/inquiry-options.ts`

- [ ] **Step 1: Write `lib/data/inquiry-options.ts`**

```ts
// Single source of truth for the qualification form selects. The client form
// renders these; the server action derives labels from them so the form and
// the lead notification can never drift apart.

export const TRACK_OPTIONS = [
  { value: "franchisee", label: "Operate a location (franchisee)" },
  { value: "investor", label: "Invest (capital partner / JV)" },
  { value: "partner", label: "Partner my real estate / convert a space" },
  { value: "not-sure", label: "Not sure yet — exploring" },
] as const;

export const CAPITAL_OPTIONS = [
  { value: "under-100k", label: "Under $100k" },
  { value: "100-250k", label: "$100k – $250k" },
  { value: "250-500k", label: "$250k – $500k" },
  { value: "500k-1m", label: "$500k – $1M" },
  { value: "over-1m", label: "$1M+" },
  { value: "prefer-not", label: "Prefer not to say" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "0-3", label: "0–3 months" },
  { value: "3-6", label: "3–6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

function toLabelMap(opts: ReadonlyArray<{ value: string; label: string }>) {
  return Object.fromEntries(opts.map((o) => [o.value, o.label])) as Record<string, string>;
}

export const trackLabels = toLabelMap(TRACK_OPTIONS);
export const capitalLabels = toLabelMap(CAPITAL_OPTIONS);
export const timelineLabels = toLabelMap(TIMELINE_OPTIONS);
```

- [ ] **Step 2: Commit**

```bash
git add franchise/lib/data/inquiry-options.ts
git commit -m "feat(franchise): qualification form select options"
```

### Task 10: Inquiry core logic (TDD)

**Files:**
- Create: `franchise/lib/actions/franchise-inquiry-core.ts`
- Test: `franchise/lib/actions/franchise-inquiry-core.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// franchise/lib/actions/franchise-inquiry-core.test.ts
import { expect, test, describe } from "bun:test";
import {
  validateInquiry,
  isSuspectedSpam,
  buildLeadPayload,
  buildEmailText,
  type InquiryInput,
} from "./franchise-inquiry-core";

const valid: InquiryInput = {
  name: "Dana Operator",
  email: "dana@example.com",
  phone: "702-555-0143",
  track: "franchisee",
  capital: "250-500k",
  market: "Phoenix, AZ",
  timeline: "3-6",
  role: "Owns 2 service businesses",
  message: "Interested in opening a Muze Office in Phoenix this year.",
  honeypot: "",
  elapsedMs: 9000,
};

describe("validateInquiry", () => {
  test("passes a complete valid inquiry", () => {
    expect(validateInquiry(valid)).toEqual({});
  });
  test("requires a name of at least 2 chars", () => {
    expect(validateInquiry({ ...valid, name: "D" }).name).toBeDefined();
  });
  test("requires a valid email", () => {
    expect(validateInquiry({ ...valid, email: "nope" }).email).toBeDefined();
  });
  test("requires a track selection", () => {
    expect(validateInquiry({ ...valid, track: "" }).track).toBeDefined();
  });
  test("requires a message of at least 10 chars", () => {
    expect(validateInquiry({ ...valid, message: "hi" }).message).toBeDefined();
  });
});

describe("isSuspectedSpam", () => {
  test("flags sub-3s submissions", () => {
    expect(isSuspectedSpam({ ...valid, elapsedMs: 1200 })).toBe(true);
  });
  test("does not flag normal-speed submissions", () => {
    expect(isSuspectedSpam(valid)).toBe(false);
  });
  test("does not flag when elapsedMs is missing", () => {
    expect(isSuspectedSpam({ ...valid, elapsedMs: undefined })).toBe(false);
  });
});

describe("buildLeadPayload", () => {
  test("produces a CRM-ready object with resolved labels", () => {
    const p = buildLeadPayload(valid);
    expect(p.source).toBe("muzeofficefranchise.com");
    expect(p.track.value).toBe("franchisee");
    expect(p.track.label).toContain("Operate");
    expect(p.capital.label).toBe("$250k – $500k");
    expect(p.timeline.label).toBe("3–6 months");
    expect(p.email).toBe("dana@example.com");
  });
});

describe("buildEmailText", () => {
  test("includes a [Franchise] human summary and a JSON block", () => {
    const text = buildEmailText(valid, false);
    expect(text).toContain("Dana Operator");
    expect(text).toContain("Phoenix, AZ");
    expect(text).toContain('"track"');           // JSON block present
    expect(text).not.toContain("[Suspected spam]");
  });
  test("marks suspected spam", () => {
    expect(buildEmailText(valid, true)).toContain("[Suspected spam]");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd franchise && bun test lib/actions/franchise-inquiry-core.test.ts`
Expected: FAIL — module `./franchise-inquiry-core` not found / exports undefined.

- [ ] **Step 3: Implement `lib/actions/franchise-inquiry-core.ts`**

```ts
import { trackLabels, capitalLabels, timelineLabels } from "@/lib/data/inquiry-options";

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  track: string;        // "" until selected
  capital?: string;
  market?: string;
  timeline?: string;
  role?: string;
  message: string;
  honeypot?: string;
  elapsedMs?: number;
}

export interface InquiryErrors {
  name?: string;
  email?: string;
  track?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(d: InquiryInput): InquiryErrors {
  const errs: InquiryErrors = {};
  if (!d.name || d.name.trim().length < 2) errs.name = "Name is required (at least 2 characters).";
  if (!d.email || !EMAIL_RE.test(d.email)) errs.email = "A valid email address is required.";
  if (!d.track) errs.track = "Please tell us which path fits you best.";
  if (!d.message || d.message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
  return errs;
}

export function isSuspectedSpam(d: InquiryInput): boolean {
  return typeof d.elapsedMs === "number" && d.elapsedMs >= 0 && d.elapsedMs < 3000;
}

function labeled(map: Record<string, string>, value?: string) {
  const v = (value ?? "").trim();
  return { value: v, label: v ? (map[v] ?? v) : "" };
}

export interface LeadPayload {
  source: string;
  receivedAtIso: string;
  name: string;
  email: string;
  phone: string;
  track: { value: string; label: string };
  capital: { value: string; label: string };
  market: string;
  timeline: { value: string; label: string };
  role: string;
  message: string;
}

export function buildLeadPayload(d: InquiryInput): LeadPayload {
  return {
    source: "muzeofficefranchise.com",
    receivedAtIso: new Date().toISOString(),
    name: d.name.trim(),
    email: d.email.trim(),
    phone: (d.phone ?? "").trim() || "Not provided",
    track: labeled(trackLabels, d.track),
    capital: labeled(capitalLabels, d.capital),
    market: (d.market ?? "").trim() || "Not provided",
    timeline: labeled(timelineLabels, d.timeline),
    role: (d.role ?? "").trim() || "Not provided",
    message: d.message.trim(),
  };
}

export function buildEmailText(d: InquiryInput, suspectedSpam: boolean): string {
  const p = buildLeadPayload(d);
  return [
    `${suspectedSpam ? "[Suspected spam] " : ""}New franchise inquiry from ${p.name} — ${p.track.label || "track unspecified"}`,
    ``,
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Phone: ${p.phone}`,
    `Path: ${p.track.label || p.track.value}`,
    `Capital available: ${p.capital.label || "Not provided"}`,
    `Target market: ${p.market}`,
    `Timeline: ${p.timeline.label || "Not provided"}`,
    `Current role/business: ${p.role}`,
    ``,
    `Message:`,
    p.message,
    ``,
    `--- CRM payload (JSON) ---`,
    JSON.stringify(p, null, 2),
  ].join("\n");
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd franchise && bun test lib/actions/franchise-inquiry-core.test.ts`
Expected: PASS (all tests green).

- [ ] **Step 5: Commit**

```bash
git add franchise/lib/actions/franchise-inquiry-core.ts franchise/lib/actions/franchise-inquiry-core.test.ts
git commit -m "feat(franchise): tested inquiry validation, spam check, CRM payload"
```

### Task 11: Server action `submit-franchise-inquiry`

**Files:** Create `franchise/lib/actions/submit-franchise-inquiry.ts`

- [ ] **Step 1: Write the action** (mirrors parent's nodemailer pattern; adds CRM webhook seam)

```ts
"use server";

import nodemailer from "nodemailer";
import {
  validateInquiry,
  isSuspectedSpam,
  buildEmailText,
  buildLeadPayload,
  type InquiryInput,
} from "@/lib/actions/franchise-inquiry-core";

interface ActionResult {
  success: boolean;
  message: string;
}

// Auth + From use the working Gmail account that already holds the app password.
const GMAIL_USER = "notifications@muzeoffice.com";
// Where franchise leads are delivered. Change to a dedicated inbox/alias as needed.
const FRANCHISE_INBOX = "franchise@muzeoffice.com";
const SUCCESS_MESSAGE =
  "Thank you! We'll review your details and reach out within one business day to schedule your discovery call.";

let transporter: nodemailer.Transporter | null = null;
function getTransporter(appPassword: string) {
  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: appPassword },
  });
  return transporter;
}

export async function submitFranchiseInquiry(data: InquiryInput): Promise<ActionResult> {
  // Honeypot: silently drop, but report success so bots can't learn the trap fired.
  if (data.honeypot && data.honeypot.trim().length > 0) {
    console.warn("[submitFranchiseInquiry] honeypot filled — dropping");
    return { success: true, message: SUCCESS_MESSAGE };
  }

  const errors = validateInquiry(data);
  if (Object.keys(errors).length > 0) {
    return { success: false, message: Object.values(errors)[0] as string };
  }

  const suspectedSpam = isSuspectedSpam(data);
  const payload = buildLeadPayload(data);

  // --- CRM extension point ---------------------------------------------------
  // To pipe leads into a CRM later, POST `payload` here (guarded by an env var),
  // e.g.:
  //   if (process.env.FRANCHISE_CRM_WEBHOOK_URL) {
  //     await fetch(process.env.FRANCHISE_CRM_WEBHOOK_URL, {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify(payload),
  //     }).catch((e) => console.error("[franchise CRM webhook]", e));
  //   }
  // ---------------------------------------------------------------------------

  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (!appPassword) {
    console.error("[submitFranchiseInquiry] GMAIL_APP_PASSWORD is not configured");
    return {
      success: false,
      message:
        "Our form is temporarily unavailable. Please email franchise@muzeoffice.com or call (702) 370-7515.",
    };
  }

  try {
    await getTransporter(appPassword).sendMail({
      from: `"Muze Office Franchise" <${GMAIL_USER}>`,
      to: FRANCHISE_INBOX,
      replyTo: payload.email,
      subject: `${suspectedSpam ? "[Suspected spam] " : ""}[Franchise] ${payload.name} — ${payload.track.label || "track unspecified"}`,
      text: buildEmailText(data, suspectedSpam),
    });
    return { success: true, message: SUCCESS_MESSAGE };
  } catch (error) {
    transporter = null; // drop cache so a rotated password is re-read next attempt
    console.error("[submitFranchiseInquiry] SMTP error:", error);
    return {
      success: false,
      message:
        "Something went wrong sending your message. Please email franchise@muzeoffice.com or call (702) 370-7515.",
    };
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `cd franchise && bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add franchise/lib/actions/submit-franchise-inquiry.ts
git commit -m "feat(franchise): franchise inquiry server action with CRM seam"
```

### Task 12: Qualification form component

**Files:** Create `franchise/components/forms/franchise-inquiry-form.tsx`

- [ ] **Step 1: Write the client form** (mirror parent contact-form structure; expanded fields + honeypot `muze_extra` + timing)

```tsx
"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { submitFranchiseInquiry } from "@/lib/actions/submit-franchise-inquiry";
import { TRACK_OPTIONS, CAPITAL_OPTIONS, TIMELINE_OPTIONS } from "@/lib/data/inquiry-options";
import { validateInquiry, type InquiryErrors } from "@/lib/actions/franchise-inquiry-core";
import { BRAND } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "error";

export function FranchiseInquiryForm({ className }: { className?: string }) {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [trackValue, setTrackValue] = useState("");
  const [capital, setCapital] = useState("");
  const [timeline, setTimeline] = useState("");
  const [startedAt] = useState(() => Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: ((fd.get("name") as string) ?? "").trim(),
      email: ((fd.get("email") as string) ?? "").trim(),
      phone: ((fd.get("phone") as string) ?? "").trim(),
      track: trackValue,
      capital,
      market: ((fd.get("market") as string) ?? "").trim(),
      timeline,
      role: ((fd.get("role") as string) ?? "").trim(),
      message: ((fd.get("message") as string) ?? "").trim(),
      honeypot: ((fd.get("muze_extra") as string) ?? "").trim(),
      elapsedMs: Date.now() - startedAt,
    };

    const validation = validateInquiry(data);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setStatus("submitting");
    setServerMessage("");

    try {
      const result = await submitFranchiseInquiry(data);
      if (result.success) {
        track("franchise_inquiry_submitted", { franchiseTrack: trackValue });
        setStatus("sent");
        setServerMessage(result.message);
      } else {
        track("franchise_inquiry_error");
        setStatus("error");
        setServerMessage(result.message);
      }
    } catch {
      track("franchise_inquiry_error");
      setStatus("error");
      setServerMessage(
        "Something went wrong. Please email franchise@muzeoffice.com or call (702) 370-7515."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className={cn("flex flex-col gap-5 rounded-xl border border-[#E6E4DF] bg-[#F2F1ED] p-7", className)} role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
          <div>
            <h3 className="text-xl font-semibold text-[#1A1A1A]">Thanks — we’ve got it</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#74726D]">{serverMessage}</p>
          </div>
        </div>
        <a href={BRAND.scheduling.discoveryCallUrl} target="_blank" rel="noopener noreferrer"
           data-cta="schedule_after_submit" data-cta-location="inquiry_form"
           className="inline-flex h-11 w-fit items-center justify-center rounded-lg bg-[#EAA820] px-6 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28]">
          Pick a time now
        </a>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex flex-col gap-5", className)} noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="fr-muze-extra">Leave this field empty</label>
        <input id="fr-muze-extra" name="muze_extra" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && serverMessage && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{serverMessage}</p>
        </div>
      )}

      {/* Name */}
      <Field id="fr-name" label="Name" required error={errors.name}>
        <Input id="fr-name" name="name" type="text" autoComplete="name" placeholder="Your full name" disabled={isSubmitting} className="h-10" />
      </Field>
      {/* Email */}
      <Field id="fr-email" label="Email" required error={errors.email}>
        <Input id="fr-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" disabled={isSubmitting} className="h-10" />
      </Field>
      {/* Phone */}
      <Field id="fr-phone" label="Phone">
        <Input id="fr-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" disabled={isSubmitting} className="h-10" />
      </Field>

      {/* Track */}
      <Field id="fr-track" label="Which path fits you best?" required error={errors.track}>
        <Select value={trackValue} onValueChange={(v) => setTrackValue(v ?? "")} disabled={isSubmitting}>
          <SelectTrigger id="fr-track" className="h-10 w-full"><SelectValue placeholder="Select a path" /></SelectTrigger>
          <SelectContent>{TRACK_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
      </Field>

      {/* Capital */}
      <Field id="fr-capital" label="Capital available">
        <Select value={capital} onValueChange={(v) => setCapital(v ?? "")} disabled={isSubmitting}>
          <SelectTrigger id="fr-capital" className="h-10 w-full"><SelectValue placeholder="Select a range" /></SelectTrigger>
          <SelectContent>{CAPITAL_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
      </Field>

      {/* Market */}
      <Field id="fr-market" label="Target market / city">
        <Input id="fr-market" name="market" type="text" placeholder="e.g. Phoenix, AZ" disabled={isSubmitting} className="h-10" />
      </Field>

      {/* Timeline */}
      <Field id="fr-timeline" label="Timeline to open">
        <Select value={timeline} onValueChange={(v) => setTimeline(v ?? "")} disabled={isSubmitting}>
          <SelectTrigger id="fr-timeline" className="h-10 w-full"><SelectValue placeholder="Select a timeline" /></SelectTrigger>
          <SelectContent>{TIMELINE_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
      </Field>

      {/* Role */}
      <Field id="fr-role" label="Current role / business">
        <Input id="fr-role" name="role" type="text" placeholder="e.g. Owner, regional franchisee, investor" disabled={isSubmitting} className="h-10" />
      </Field>

      {/* Message */}
      <Field id="fr-message" label="Tell us about your goals" required error={errors.message}>
        <Textarea id="fr-message" name="message" rows={5} placeholder="What are you looking to do, and in which market?" disabled={isSubmitting} />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="h-11 rounded-lg bg-[#1A1A1A] text-white hover:bg-[#333] disabled:opacity-70">
        {isSubmitting ? (<><Loader2 className="h-4 w-4 animate-spin" />Sending…</>) : "Request my discovery call"}
      </Button>
      <p className="text-xs text-[#74726D]">
        Prefer to talk now? <a href={`tel:${BRAND.phoneTel}`} className="font-medium text-[#1A1A1A] hover:text-[#EAA820]">Call {BRAND.phoneDisplay}</a>.
      </p>
    </form>
  );
}

function Field({ id, label, required, error, children }: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}{required && <span className="text-red-500"> *</span>}</Label>
      {children}
      {error && <p role="alert" className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
```
Note: confirm the parent `Select` API (it uses `items={…}` plus children in the contact form). If the franchise `Select` requires the `items` prop, pass `items={trackLabels}` etc. from `inquiry-options`. Check `components/ui/select.tsx` at execution and match its signature exactly.

- [ ] **Step 2: Typecheck**

Run: `cd franchise && bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add franchise/components/forms/franchise-inquiry-form.tsx
git commit -m "feat(franchise): qualification form (CRM-ready fields, honeypot, timing)"
```

---

## Phase E — SEO schema components

### Task 13: JSON-LD + schema components

**Files:** Create `franchise/components/seo/json-ld.tsx`, `organization-schema.tsx`, `service-schema.tsx`, `breadcrumb-schema.tsx`, `person-schema.tsx`

- [ ] **Step 1: Copy `json-ld.tsx` and `person-schema.tsx` verbatim**

```bash
cd franchise && mkdir -p components/seo
cp ../components/seo/json-ld.tsx components/seo/json-ld.tsx
cp ../components/seo/person-schema.tsx components/seo/person-schema.tsx
```

- [ ] **Step 2: Write `components/seo/organization-schema.tsx`** (franchise org)

```tsx
import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

export function OrganizationSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: ["Muze Office Franchise", "Muze Franchise", "Muze Office Franchising"],
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: `${BRAND.url}/images/logo.png`,
    email: BRAND.email,
    description: BRAND.tagline,
    parentOrganization: { "@type": "Organization", name: "Muze Office", url: BRAND.mainSiteUrl },
    sameAs: [
      BRAND.social.twitter, BRAND.social.facebook, BRAND.social.instagram,
      BRAND.social.linkedin, BRAND.social.tiktok,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BRAND.phoneTel,
      contactType: "franchise sales",
      areaServed: ["US"],
      availableLanguage: ["English"],
    },
  };
  return <JsonLd data={data} />;
}
```

- [ ] **Step 3: Write `components/seo/service-schema.tsx`** (the franchise opportunity as a Service+Offer)

```tsx
import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

export function FranchiseServiceSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BRAND.url}/#franchise-offer`,
    serviceType: "Coworking & flexible-workspace franchise opportunity",
    provider: { "@id": `${BRAND.url}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    description:
      "Franchise, investment, and partnership opportunities to operate a Muze Office flexible-workspace location — coworking, virtual offices, private offices, meeting rooms, and event space.",
    audience: { "@type": "BusinessAudience", name: "Prospective franchisees, investors, and real-estate partners" },
    url: `${BRAND.url}/`,
  };
  return <JsonLd data={data} />;
}
```

- [ ] **Step 4: Write `components/seo/breadcrumb-schema.tsx`**

```tsx
import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BRAND.url}${it.path}`,
    })),
  };
  return <JsonLd data={data} />;
}
```

- [ ] **Step 5: Verify `person-schema.tsx` imports resolve** (it should import `JsonLd` and `Person` type). Adjust import paths if the parent used a different data source. Run `bunx tsc --noEmit`. Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add franchise/components/seo
git commit -m "feat(franchise): SEO schema components (org, service/offer, breadcrumb, person)"
```

---

## Phase F — Layout shell (header, footer, mobile CTA, layout)

### Task 14: Site header

**Files:** Create `franchise/components/layout/site-header.tsx`

- [ ] **Step 1: Write the header** (franchise nav + single "Book a Discovery Call" CTA → `/discovery-call`)

Base it on the parent `../components/layout/site-header.tsx` (same sticky bar, logo, `Sheet` mobile menu). Changes:
- Import `mainNav` from franchise `@/lib/data/navigation` and `BRAND` from franchise constants.
- Desktop right side: phone link (`BRAND.phoneTel`/`BRAND.phoneDisplay`) + ONE primary button:
  ```tsx
  <Link href="/discovery-call" data-cta="book_discovery_call" data-cta-location="header_desktop"
    className={cn(buttonVariants({ size: "sm" }), "rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]")}>
    Book a Discovery Call
  </Link>
  ```
- Mobile sheet: same nav list + the same primary button (full width) + phone.
- Logo `Link` `href="/"`, alt "Muze Office Franchise".

- [ ] **Step 2: Typecheck** — `cd franchise && bunx tsc --noEmit` → no errors.

- [ ] **Step 3: Commit**

```bash
git add franchise/components/layout/site-header.tsx
git commit -m "feat(franchise): site header with discovery-call CTA"
```

### Task 15: Site footer

**Files:** Create `franchise/components/layout/site-footer.tsx`

- [ ] **Step 1: Write the footer** based on parent structure (dark `#1A1A1A`, 4-column grid). Columns:
  1. **Brand:** logo + one-line tagline + reciprocal link **back to muzeoffice.com**: `<a href={BRAND.mainSiteUrl}>← Muze Office (main site)</a>`.
  2. **Opportunity:** map `footerNav.opportunity`.
  3. **Who it's for:** map `footerNav.audiences`.
  4. **Company + contact:** map `footerNav.company`; email `BRAND.email` (mailto); phone `BRAND.phoneTel`.
- Bottom strip: `© 2023–{year} {BRAND.legalName}. All rights reserved.` + `footerNav.socials`.
- Add a small disclaimer line above the bottom strip:
  ```tsx
  <p className="mt-10 max-w-[860px] text-xs leading-relaxed text-gray-500">{BRAND.disclaimer}</p>
  ```

- [ ] **Step 2: Typecheck** — no errors.

- [ ] **Step 3: Commit**

```bash
git add franchise/components/layout/site-footer.tsx
git commit -m "feat(franchise): footer with reciprocal link to muzeoffice.com + FTC disclaimer"
```

### Task 16: Mobile CTA + root layout

**Files:** Create `franchise/components/layout/mobile-cta.tsx`, replace `franchise/app/layout.tsx`; copy `franchise/app/error.tsx`, `global-error.tsx`, `not-found.tsx`

- [ ] **Step 1: Write `mobile-cta.tsx`** based on parent — a fixed bottom bar (visible `md:hidden`) with a phone link and a "Book a Discovery Call" link → `/discovery-call` (`data-cta="book_discovery_call"`, `data-cta-location="mobile_sticky"`).

- [ ] **Step 2: Copy error/not-found pages and de-brand copy**

```bash
cd franchise
cp ../app/error.tsx app/error.tsx
cp ../app/global-error.tsx app/global-error.tsx
cp ../app/not-found.tsx app/not-found.tsx
```
Edit each: replace muzeoffice-specific links/copy with franchise equivalents (home `/`, "Book a Discovery Call" → `/discovery-call`).

- [ ] **Step 3: Write `app/layout.tsx`** (fonts, metadata defaults, schema, chrome)

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCTA } from "@/components/layout/mobile-cta";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import { Analytics } from "@vercel/analytics/next";
import { BRAND } from "@/lib/utils/constants";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta", subsets: ["latin"], weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Coworking & Flexible Workspace Franchise Opportunities | Muze Office Franchise",
    template: "%s | Muze Office Franchise",
  },
  description:
    "Own a flexible-workspace business with Muze Office. Franchise, invest, or partner on coworking, virtual office, and private-office locations. Book a discovery call.",
  metadataBase: new URL(BRAND.url),
  openGraph: {
    siteName: BRAND.name, locale: "en_US", type: "website",
    images: [{ url: "/images/og/default.png", width: 2048, height: 2048, alt: BRAND.name }],
  },
  twitter: { card: "summary_large_image", site: "@muzeoffice", creator: "@muzeoffice", images: ["/images/og/default.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <OrganizationSchema />
        <SiteHeader />
        <main className="flex-1 pb-[68px] md:pb-0">{children}</main>
        <SiteFooter />
        <MobileCTA />
        <EngagementTracker />
        <Analytics />
      </body>
    </html>
  );
}
```
(Confirm `/images/og/default.png` exists from Task 3; if not, generate/copy a placeholder OG and note it in §Open items.)

- [ ] **Step 4: Build**

Run: `cd franchise && bun run build`
Expected: builds clean; `/` renders with the real header/footer (temporary `page.tsx` still present).

- [ ] **Step 5: Commit**

```bash
git add franchise/app/layout.tsx franchise/components/layout/mobile-cta.tsx franchise/app/error.tsx franchise/app/global-error.tsx franchise/app/not-found.tsx
git commit -m "feat(franchise): root layout, mobile CTA, error/not-found pages"
```

---

## Phase G — Pages

> All pages: reuse `Section`, `FadeIn`/`Stagger*`, `Badge`, `Card`, `CTASection`, `FAQSection`. Every page exports `metadata` with a unique `title`, `description`, and `alternates.canonical`. Every page ends with:
> ```tsx
> <CTASection heading="…" subtitle="…" primaryLabel="Book a Discovery Call" primaryHref="/discovery-call" ctaName="book_discovery_call" ctaLocation="<page>_bottom" showPhone />
> ```
> `CTASection` currently hardcodes a `tel:+17023707515` for the phone button — that number matches `BRAND.phoneTel`, so no change needed. If the phone ever diverges, parameterize it.

### Task 17: Home `/` (replace temporary page)

**Files:** Modify `franchise/app/page.tsx`

- [ ] **Step 1: Build the home page** with these sections in order:
  1. **Hero** (dark, like parent home): `Badge` "Now expanding beyond Las Vegas & Houston"; **H1: "Own a Coworking & Flexible-Workspace Franchise — the Muze Office Model"**; subhead naming the three ways in (operate, invest, partner) + month-to-month, multi-revenue model; primary CTA `/discovery-call` "Book a Discovery Call", secondary `/the-opportunity` "See the Opportunity". Use a hero image from `public/images` (reuse a parent space photo copied in Task 3; if none copied, copy one: `cp ../public/images/spaces/las-vegas.jpg public/images/spaces/` and reference it).
  2. **Three-track selector** — new `TrackCards` component (Task built inline here): map `tracks` to `Card`s linking to `/franchisees`, `/investors`, `/partners`, each with icon, `label`, `audience`, `summary`, "Learn more →".
  3. **Why coworking now** — 3–4 stat/claim cards (qualitative; market-growth stat as `{{MARKET_STAT}}` placeholder) → links to `/the-opportunity`.
  4. **The Muze model in brief** — 4 pillars (Brand, Technology/Optix, Playbook, Support) → link `/the-model`.
  5. **Investment at a glance** — teaser card with `{{INVESTMENT_RANGE}}` + "what's included" bullets → button `/investment`.
  6. **Why Muze (differentiators)** — 4 bullets (transparent pricing, multi-revenue model, proven flagship, modern tech) → `/why-muze`.
  7. **FAQ excerpt** — `<FAQSection heading="Franchise FAQs" faqs={homepageFranchiseFAQs} />`.
  8. **Final `CTASection`** → `/discovery-call`.
  Add `<FranchiseServiceSchema />` near the top of the returned fragment.
  metadata: `title: { absolute: "Coworking & Flexible Workspace Franchise Opportunities | Muze Office Franchise" }`, description as in layout default, `alternates: { canonical: "/" }`.

- [ ] **Step 2: Create the `TrackCards` component** `franchise/components/marketing/track-cards.tsx` — a small server component mapping `tracks` (from `@/lib/data/tracks`) to linked cards. Renders icon via `const Icon = t.icon; <Icon className="h-7 w-7" />`.

- [ ] **Step 3: Build** — `cd franchise && bun run build` → `/` compiles, no errors.

- [ ] **Step 4: Commit**

```bash
git add franchise/app/page.tsx franchise/components/marketing/track-cards.tsx
git commit -m "feat(franchise): home page (hero, tracks, model, investment teaser, FAQ)"
```

### Task 18: `/the-opportunity`

**Files:** Create `franchise/app/the-opportunity/page.tsx`

- [ ] **Step 1: Build.** metadata title "The Coworking Business Opportunity"; description targets "coworking business opportunity / is coworking profitable". H1: "Why coworking is one of the best business opportunities right now". Sections: market demand drivers (hybrid work, small-business formation) with `{{MARKET_STAT}}`/`{{MARKET_SOURCE}}` placeholders; why the model is resilient (multiple revenue lines: memberships + virtual office + meeting/event + day passes); who's winning (operators with brand + tech); internal links to `/the-model`, `/investment`, `/why-muze`. `BreadcrumbSchema items={[{name:"Home",path:"/"},{name:"The Opportunity",path:"/the-opportunity"}]}`. End `CTASection`.
- [ ] **Step 2: Build** → no errors. **Step 3: Commit** `feat(franchise): the-opportunity page`.

### Task 19: `/the-model`

**Files:** Create `franchise/app/the-model/page.tsx`

- [ ] **Step 1: Build.** metadata title "How the Muze Office Model Works"; description targets "how to start a coworking space / what a coworking franchise includes". H1: "The Muze Office model: everything you get to launch and run a location". Sections: (1) Brand & marketing; (2) Technology — Optix member management, bookings, payments, app; (3) Operations playbook — pricing, staffing, member experience; (4) Site selection & buildout standards; (5) Training & ongoing support; (6) The member-facing product (coworking, virtual office, private offices, meeting rooms, events) — link to muzeoffice.com as the live proof. Internal links `/investment`, `/franchisees`. Breadcrumb schema. End `CTASection`.
- [ ] **Step 2: Build** → no errors. **Step 3: Commit** `feat(franchise): the-model page`.

### Task 20: `/investment` (high-priority money page)

**Files:** Create `franchise/app/investment/page.tsx`

- [ ] **Step 1: Build.** metadata title "Investment & Fees"; description targets "coworking franchise cost / fees / ROI". H1: "What it costs to open a Muze Office". Sections:
  - Initial investment range card: `{{INVESTMENT_RANGE}}` with a bulleted breakdown (franchise fee, buildout, FF&E, working capital) — each value a placeholder token.
  - Franchise/license fee: `{{FRANCHISE_FEE}}` + what it includes.
  - Ongoing fees: royalty `{{ROYALTY}}`, marketing/brand fund `{{MARKETING_FEE}}`.
  - Revenue model overview (qualitative — NO earnings claims): the multiple revenue lines; link "see the live product economics on muzeoffice.com".
  - Financing notes (`{{FINANCING_NOTES}}`), timeline-to-open `{{TIME_TO_OPEN}}`.
  - **Prominent disclaimer block** rendering `BRAND.disclaimer` in a bordered callout.
  Breadcrumb schema. End `CTASection` ("Get exact numbers on a discovery call").
- [ ] **Step 2: Build** → no errors. **Step 3: Commit** `feat(franchise): investment & fees page`.

### Task 21: Audience pages `/franchisees`, `/investors`, `/partners`

**Files:** Create `franchise/app/franchisees/page.tsx`, `franchise/app/investors/page.tsx`, `franchise/app/partners/page.tsx`

- [ ] **Step 1: Build all three** on a shared structure (each page's content is distinct — write real copy per audience, do NOT cross-reference "same as franchisees"):
  - **`/franchisees`** — title "Operate a Muze Office (Franchise)"; targets "coworking franchise". H1 "Run your own flexible-workspace business". Sections: who it's for; a day in the life of an operator; the path inquiry→open (4 steps); what you bring vs. what Muze provides; links `/the-model`, `/investment`. Breadcrumb. CTASection.
  - **`/investors`** — title "Invest in Coworking with Muze Office"; targets "invest in coworking / flexible workspace investment". H1 "Invest in the flexible-workspace model". Sections: who it's for (passive/capital partners); how participation works (qualitative + `{{INVESTOR_TERMS}}` placeholder); what Muze handles operationally; risk/transparency note; links `/the-opportunity`, `/investment`. Breadcrumb. CTASection.
  - **`/partners`** — title "Convert Your Space into a Muze Office"; targets "convert office space to coworking / coworking management partner". H1 "Turn your real estate into a flexible-workspace business". Sections: who it's for (landlords/operators); the conversion model; what makes a space a fit (sqft, location, layout); evaluation process; links `/the-model`, `/investment`. Breadcrumb. CTASection.
- [ ] **Step 2: Build** → all three compile, no errors. **Step 3: Commit** `feat(franchise): audience pages — franchisees, investors, partners`.

### Task 22: `/why-muze` (comparison/differentiation money page)

**Files:** Create `franchise/app/why-muze/page.tsx`

- [ ] **Step 1: Build.** metadata title "Why Choose the Muze Office Franchise"; description targets "best coworking franchise / coworking franchise comparison". H1: "Why operators choose the Muze Office model". Sections: differentiators as cards (transparent pricing model; multi-revenue product mix; modern tech stack; proven flagship + brand; hands-on support; no-fluff member-first design). A neutral "how to evaluate a coworking franchise" checklist (helps comparison-intent rankings without disparaging named competitors). Internal links `/the-model`, `/investment`, `/franchisees`. Breadcrumb. End CTASection. No fabricated comparisons or competitor claims.
- [ ] **Step 2: Build** → no errors. **Step 3: Commit** `feat(franchise): why-muze comparison page`.

### Task 23: `/faq`

**Files:** Create `franchise/app/faq/page.tsx`

- [ ] **Step 1: Build.** metadata title "Franchise FAQ"; description "Answers on cost, support, territories, timeline, and how to invest in or partner with Muze Office." H1 + intro, then `<FAQSection faqs={franchiseFAQs} />` (emits FAQPage JSON-LD automatically). Breadcrumb schema. End CTASection.
- [ ] **Step 2: Build** → no errors. **Step 3: Commit** `feat(franchise): franchise FAQ page`.

### Task 24: `/about`

**Files:** Create `franchise/app/about/page.tsx`

- [ ] **Step 1: Build.** metadata title "About Muze Office"; description = brand story + leadership. H1 "The team behind Muze Office". Sections: brand origin (reuse copy themes from parent /about; keep franchise framing — "now licensing the model"); leadership cards from `people` (`ZACHARY_DEVON_DUONG`, `ROBERT_MAI`) with `jobTitle` + `shortBio`; render `<PersonSchema person={p} />` for each; link to the live muzeoffice.com flagship as proof. Breadcrumb. End CTASection.
- [ ] **Step 2: Build** → no errors. **Step 3: Commit** `feat(franchise): about page with leadership + Person schema`.

### Task 25: `/discovery-call` (conversion centerpiece)

**Files:** Create `franchise/app/discovery-call/page.tsx`

- [ ] **Step 1: Build.** metadata title "Book a Discovery Call"; description "Tell us about your goals and book a 1:1 franchise discovery call with Muze Office." H1 "Book your franchise discovery call". Two-column layout (stack on mobile):
  - Left: what to expect on the call (3–4 bullets), who it's for, and a `<a href={BRAND.scheduling.discoveryCallUrl}>` "Pick a time" button (opens scheduler) — note this is the configurable placeholder URL.
  - Right: `<FranchiseInquiryForm />` (the qualification form from Task 12).
  - This page intentionally has NO `CTASection` (it IS the conversion page) but keeps the phone fallback.
  Breadcrumb schema.
- [ ] **Step 2: Build** → no errors; form renders. **Step 3: Commit** `feat(franchise): discovery-call conversion page with qualification form`.

### Task 26: `/contact`

**Files:** Create `franchise/app/contact/page.tsx`

- [ ] **Step 1: Build.** metadata title "Contact"; description "Get in touch with the Muze Office franchise team." H1 + brief intro; reuse `<FranchiseInquiryForm />` (or a note directing general questions). Show email `BRAND.email`, phone, and a link to `/discovery-call` for serious prospects. Breadcrumb. End CTASection.
- [ ] **Step 2: Build** → no errors. **Step 3: Commit** `feat(franchise): contact page`.

### Task 27: `/privacy-policy`

**Files:** Create `franchise/app/privacy-policy/page.tsx`

- [ ] **Step 1: Build.** Copy the parent `../app/(marketing)/privacy-policy` page content as a base; swap brand name, domain, and contact email to franchise values; update "what we collect" to reflect the qualification form fields. metadata title "Privacy Policy", `robots` index true. (No CTASection needed; keep footer.)
- [ ] **Step 2: Build** → no errors. **Step 3: Commit** `feat(franchise): privacy policy`.

---

## Phase H — SEO machinery

### Task 28: sitemap + robots

**Files:** Create `franchise/app/sitemap.ts`, `franchise/app/robots.ts`

- [ ] **Step 1: Write `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/utils/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${BRAND.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: Write `app/sitemap.ts`** (static franchise routes + author pages)

```ts
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
    { path: "/franchisees", priority: 0.8, freq: "monthly" },
    { path: "/investors", priority: 0.8, freq: "monthly" },
    { path: "/partners", priority: 0.8, freq: "monthly" },
    { path: "/why-muze", priority: 0.8, freq: "monthly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
    { path: "/about", priority: 0.5, freq: "monthly" },
    { path: "/discovery-call", priority: 0.9, freq: "monthly" },
    { path: "/contact", priority: 0.5, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.3, freq: "monthly" },
  ];
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: now, changeFrequency: r.freq, priority: r.priority,
  }));
  const authors: MetadataRoute.Sitemap = people.map((p) => ({
    url: `${base}/about#${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.4,
  }));
  return [...pages, ...authors];
}
```

- [ ] **Step 3: Build** → `cd franchise && bun run build`. Expected: `sitemap.xml` and `robots.txt` generated.
- [ ] **Step 4: Commit** `feat(franchise): sitemap and robots scoped to franchise domain`.

### Task 29: llms.txt

**Files:** Create `franchise/app/llms.txt/route.ts`

- [ ] **Step 1: Write a route handler** returning a plain-text `llms.txt` summarizing the franchise site and linking the key pages (Home, The Opportunity, The Model, Investment, Franchisees, Investors, Partners, Why Muze, FAQ, Discovery Call). Use `BRAND.url`. Return `new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } })`.

```ts
import { BRAND } from "@/lib/utils/constants";
export const dynamic = "force-static";
export function GET() {
  const u = BRAND.url;
  const text = `# Muze Office Franchise

> Franchise, investment, and partnership opportunities to operate a Muze Office flexible-workspace location (coworking, virtual offices, private offices, meeting rooms, event space).

## Key pages
- [The Opportunity](${u}/the-opportunity): why coworking is a strong business opportunity
- [The Model](${u}/the-model): what a Muze Office franchise includes
- [Investment & Fees](${u}/investment): costs, fees, and what's included
- [Franchisees](${u}/franchisees): operate a location
- [Investors](${u}/investors): invest as a capital partner
- [Partners](${u}/partners): convert your real estate
- [Why Muze](${u}/why-muze): how Muze compares
- [FAQ](${u}/faq)
- [Book a Discovery Call](${u}/discovery-call)

## Contact
- Email: ${BRAND.email}
- Phone: ${BRAND.phoneDisplay}
- Main brand: ${BRAND.mainSiteUrl}
`;
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
```

- [ ] **Step 2: Build** → no errors; `/llms.txt` returns text. **Step 3: Commit** `feat(franchise): llms.txt`.

---

## Phase I — Final verification

### Task 30: Whole-site verification

- [ ] **Step 1: Typecheck + lint + unit tests + build**

```bash
cd franchise
bunx tsc --noEmit
bun run lint
bun test
bun run build
```
Expected: tsc clean; lint clean (fix warnings); `bun test` all green; build lists all 13 routes + sitemap + robots + llms.txt, no errors.

- [ ] **Step 2: Manual click-through on the dev server**

```bash
cd franchise && bun dev
```
Then verify on `http://localhost:3001`:
- Header/footer look identical to muzeoffice.com (logo, fonts, gold/dark palette).
- Every nav link resolves; every page has a working "Book a Discovery Call" path.
- `/discovery-call` form: submit empty → inline validation; submit valid → success state + "Pick a time" button (email send requires `GMAIL_APP_PASSWORD` in `franchise/.env.local`; without it, expect the graceful fallback message — that is correct behavior).
- Mobile (≤768px): sticky mobile CTA present; mobile menu opens.
- View source on `/`, `/faq`, `/investment`, `/about`: JSON-LD present (Organization, Service, FAQPage, Breadcrumb, Person).
- All financial placeholders (`{{…}}`) are visible (none accidentally left blank) and the FTC disclaimer shows in the footer + on `/investment`.

- [ ] **Step 3: Final commit**

```bash
git add -A franchise
git commit -m "chore(franchise): final verification pass — build, lint, tests green"
```

---

## Post-build (user, before launch)

These are tracked in the spec §11 and do not block the build:
1. Replace all `{{…}}` financial/legal placeholders with verified numbers.
2. Set the real `BRAND.scheduling.discoveryCallUrl`.
3. Confirm/create `franchise@muzeoffice.com` (or change `FRANCHISE_INBOX`); set `GMAIL_APP_PASSWORD` in the franchise Vercel project env.
4. Legal review of franchise structure + disclaimers.
5. Create the franchise Vercel project (root dir `franchise`), point `muzeofficefranchise.com` at it, submit `sitemap.xml` to Search Console.
6. (Optional, when CRM is chosen) wire the CRM webhook at the seam in `submit-franchise-inquiry.ts`.

---

## Self-review (completed by plan author)

- **Spec coverage:** §3 architecture → Task 1; §4/§5 IA & pages → Tasks 17–27; §6 funnel & CRM-ready capture → Tasks 9–12; §7 SEO/schema/sitemap/robots/llms → Tasks 13, 28, 29 + per-page metadata; §8 shared look → Tasks 2–3, 14–16; §9 disclaimer/honesty → Tasks 4, 15, 20; §10 YAGNI (blog deferred) → reflected in Task 1 dropped deps. No uncovered spec sections.
- **Placeholder scan:** the only `{{…}}` tokens are deliberate, user-supplied financial/legal figures (spec §9/§11); no "TBD/implement later" steps. Each code step shows complete code; each content page lists concrete sections, metadata, links, and schema.
- **Type/name consistency:** `InquiryInput`/`InquiryErrors`/`LeadPayload` defined in Task 10 and consumed unchanged in Tasks 11–12; `submitFranchiseInquiry`, `validateInquiry`, `tracks`/`getTrack`, `franchiseFAQs`/`homepageFranchiseFAQs`, `TRACK_OPTIONS`/`trackLabels` names match across tasks. `FranchiseServiceSchema`, `OrganizationSchema`, `BreadcrumbSchema`, `PersonSchema` names match their import sites.
- **Known execution checks flagged inline:** `Select` component API (Task 12), presence of `/images/og/default.png` (Tasks 3/16), and `person-schema.tsx` import paths (Task 13) — all called out to verify against the actual copied files at execution time.
