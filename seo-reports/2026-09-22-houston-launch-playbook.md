# Houston Launch Playbook + Las Vegas SEO Pass — 2026-09-22

Goal: Muze Office Houston (1800 Augusta Dr, Houston, TX 77057) opens with as much free search visibility as possible (Google Maps / local pack, organic results for the service pages, and AI assistants), so less of the grand-opening budget goes to paid media. Las Vegas gets a round of clean-up work at the same time.

The site is now **launch-ready behind a single switch**. Everything below is ordered by when it has to happen.

---

## 1. What changed in the site (this pass)

### Houston: launch-safe infrastructure
- `lib/data/locations.ts` has new per-location fields: `openingDate`, `usesStandardCatalog`, `booking` (tour/signup URLs), `amenities`, and `hours.display` (confirmed hours). The `TODO(launch)` comments mark every Houston value that still has to be filled in.
- **No Las Vegas facts leak onto Houston pages any more.** Before, switching Houston to `active` would have shown the Las Vegas prices, the Las Vegas Optix booking portal, the Las Vegas phone number in the mobile bar, "Open 24 hours" and "Herman Miller / gigabit" copy, the Las Vegas amenity list and `$25-$899` in LocalBusiness JSON-LD, and priced `Offer` markup. All of these are now per location:
  - `usesStandardCatalog: false` → pricing cards are replaced by a "Get Houston Pricing" quote CTA. No `offers`, `priceRange`, or `hasOfferCatalog` in JSON-LD. The generic (Las Vegas) service FAQs, service blurbs and brand-specific amenities (Herman Miller, 24/7 biometric, free parking, cafe) are hidden; only Houston-written FAQs and location-neutral inclusions show. Markdown twins say pricing is quoted by the local team.
  - No `booking` URLs → every CTA (hero, pricing, header, mobile sticky bar) falls back to `/contact?interest=…`. Pre-opening, the header and sticky bar on Houston pages say "Join Early Access" instead of opening the Las Vegas Optix portal.
  - Houston service pages list Houston/Texas and location-neutral blog posts in "Related reading", not Las Vegas posts.
  - Hours appear on the page and in JSON-LD only once `hours.display` is set.
  - The phone number (page, CTA section, mobile sticky bar, JSON-LD) appears only once `phone` is set.
  - The reviews badge renders only once the location has its own `externalProfiles.gbp`.
- Pre-opening Houston service URLs now use a **307 temporary redirect** to the hub instead of a 308 permanent one. Browsers and Google won't cache the redirect as permanent, so the URLs can become real pages at launch.
- Fixed a bug: once Houston was switched to active, the hub would still have shown the "Opening 2026" pre-launch title (metadata was keyed on the address, not on status).
- Legacy WordPress Houston URLs (`/workspace-memberships/coworking-houston-texas`, `/…/virtual-office-houston-texas`, `/locations/houston-coworking`, `/office-day-pass-in-houston-at-muzeoffice`) automatically point to the matching live service page once Houston is active. They carry the old site's Houston link equity.

### Houston: pre-opening visibility (takes effect on deploy)
- The `/locations/houston` hub gets a keyword-bearing title, "Muze Office Houston — Galleria Coworking, Opening {Month Year}", which picks up the month automatically once `openingDate` is set.
- New section on the hub: "Coworking, offices, and meeting space in the Galleria area". It gives each planned service its own heading (coworking/day passes, virtual office and business address, private offices, meeting/conference rooms, event/training space, access from across Houston). Until the service pages open, the hub is the only indexable Houston URL, so it now covers those terms.
- All 12 Houston service pages were rewritten so they contain **no unconfirmed claims** (no prices, Las Vegas tier names, 24/7 access, suite number, or "free" parking). The copy is written for opening day. Metadata no longer says "waitlist".
- The Houston providers blog post (the site's biggest Houston impression pool) has a new title and description built for click-through, pointing to the Galleria opening.

### Las Vegas
- `/locations/las-vegas` now links to all **12** Las Vegas service pages (it linked to 6). Day pass, hot desk, dedicated desk, flexible workspaces, airport coworking and convention coworking were missing from the hub.
- Hub title: "Muze Office Las Vegas — 24/7 Coworking, Hours & Directions". Before, it said "Muze Office" twice and had no service keyword.
- Retitles from the CTR queue in the 08-06 report:
  - `virtual-office-vs-po-box-in-nevada` → "Virtual Office vs PO Box in Nevada: $11 vs $39/mo". This was the only page-1 asset with a large CTR gap. Both prices appear in the post.
  - `hot-desk-vs-dedicated-desk-vs-private-office` → adds a "Costs" hook.
  - `meeting-rooms-in-las-vegas-booking-guide` gets a new description that drops the head term "meeting space in Las Vegas", which competes with the money page. Its freeze window is over.
- Internal links into the LLC cluster (the proven winner): the PO-box post and the Las Vegas setup guide now link to `/blog/virtual-office-for-llc` and `/blog/nevada-llc-virtual-office`.
- The GBP-verification guide (best new asset) now links in-body to `/las-vegas-private-office` and `/las-vegas-coworking`.
- Seasonal rotation: Black Hat was replaced by **G2E** (Sep 28–Oct 1) in the related-reading slots for meeting rooms, event space and convention coworking.
- Hero primary CTA on every service page now carries `data-cta="hero_primary"`, which fixes an attribution gap.

**Measurement note:** each retitled page starts a new 28-day freeze today (2026-09-22 → 2026-10-20). Don't touch those titles again before then.

---

## 2. Google Business Profile — Houston (the #1 lever for a free grand opening)

Most "coworking near me", "virtual office Houston" and "meeting room Galleria" demand resolves in the **Maps / local pack**, not the blue links. A verified GBP that is live *before* opening day is worth more than any on-site change.

### 2.1 Before you create it
Collect these first. The same exact values go into `lib/data/locations.ts` so name, address and phone (NAP) match character for character:

| Field | Value to decide | Notes |
|---|---|---|
| Business name | `Muze Office Houston` | Real-world name only. No keywords ("Muze Office Houston Coworking Galleria" violates GBP guidelines and gets suspended). It must match the signage. |
| Address | `1800 Augusta Dr, Suite ___, Houston, TX 77057` | Include the suite. Use the same formatting everywhere. |
| Phone | A **local 713/281/832 number that rings at the Houston location** | Not the Las Vegas line, and not a shared corporate number. A franchise needs its own. |
| Website | `https://muzeoffice.com/locations/houston?utm_source=google&utm_medium=organic&utm_campaign=gbp-houston` | The UTM separates GBP traffic from organic in analytics. The canonical tag on the page keeps SEO clean. |
| Hours | Staffed hours (and member access, if different) | GBP "regular hours" = the hours customers can walk in. |
| Opening date | Exact date | GBP supports a **pre-opening profile up to 90 days before the opening date**. |

### 2.2 Create and verify
1. The franchisee (or Muze corporate as an owner, with the franchisee as manager) creates the profile at business.google.com. Decide ownership now. **Recommended:** Muze Office corporate is the primary owner and the franchise operator is an owner/manager, so the listing survives any operator change.
2. **Primary category: `Coworking space`.** Secondary categories, only the ones actually offered at opening: `Virtual office rental`, `Office space rental agency`, `Conference center` or `Meeting room` equivalent, `Business center`, `Event venue` (only if event rentals are real).
3. Set the **opening date** in the profile. Google shows "Opening {date}" in Maps and will surface the listing before launch.
4. Verification. Google will most likely ask for a **video verification**. For a coworking/office building, be ready to show in one continuous take (see our own guide, `/blog/google-business-profile-verification-coworking-space`):
   - the exterior street number and the building,
   - **permanent Muze Office signage** at the suite (not a printed sign taped up),
   - the staffed front desk / business in operation,
   - proof of management (keys/badge opening the suite, business documents).

   Plan the signage install *before* you start verification. Missing signage is the most common reason verification fails.
5. Don't change the name, address or category during or right after verification; that can trigger re-verification.

### 2.3 Fill it out completely (ranking + conversion)
- **Services**: add each service with a short description (Coworking, Day Pass, Hot Desk, Dedicated Desk, Private Office, Virtual Office, Meeting Rooms, Conference Rooms, Event Space). Add prices only once they're final.
- **Products**: one per plan, linking to the matching `/houston-*` page once live.
- **Site photo:** `public/images/spaces/houston.jpg` is a skyline stock image, and it's also the LocalBusiness `image`. Replace it with a real exterior/interior photo of 1800 Augusta Dr before launch.
- **Photos**: at least 10 real photos (exterior with signage, entrance, front desk, coworking floor, private office, meeting room, parking). Upload more every week in the first month.
- **Description** (750 chars): first 250 chars say what, where and for whom. Mention Galleria / Uptown / Tanglewood naturally, no keyword stuffing.
- **Attributes**: Wi-Fi, wheelchair accessible, restroom, "Identifies as …" only if true.
- **Booking link / appointment URL**: `/locations/houston#waitlist` pre-opening, then the Houston tour URL.
- **Q&A**: seed 5–8 real questions (parking, day pass, mail handling, meeting-room rental without membership, opening date) and answer them from the business account.
- **Posts**: weekly "What's New" / "Event" posts. Pre-opening examples: construction progress, "Grand opening open house on {date}", founding-member offer. Posts are free visibility in the listing.

### 2.4 Reviews (the ranking factor you control most)
- Create the GBP "ask for review" short link as soon as the profile is verified. Add it to `externalProfiles.gbp` in `lib/data/locations.ts`. The reviews badge on the Houston pages turns on automatically.
- Goal: **10+ genuine reviews in the first 30 days.** Ask every founding member, tour visitor and open-house attendee. A QR code at the front desk works well. Never incentivize reviews or gate them (only asking happy customers). Both violate Google policy.
- Reply to every review within 48 hours.

---

## 3. Launch-day switch (in order)

Do this on the opening day, or the day members can actually use the space.

1. **Edit `lib/data/locations.ts` (houston entry):**
   - `status: "active"`
   - `openingDate: "YYYY-MM-DD"` (set this **as soon as the date is known**, even pre-launch. It updates the hub title and H1.)
   - `address.street: "1800 Augusta Dr, Suite ___"` (exactly as on the GBP)
   - `phone` / `phoneRaw` (exactly as on the GBP)
   - `hours.display` (plus `is24Hours`/`weekdays` if the hours change) → publishes the hours in JSON-LD
   - `amenities`: only what is really on site (e.g. add "Free Parking" if parking is free)
   - `booking.tourUrl` / `booking.signupUrl` if the franchise has its own Optix portal. Leave them out to use the contact form.
   - `externalProfiles.gbp` once verified
   - `usesStandardCatalog: true` **only** if Houston prices equal the tiers in `lib/data/services.ts`. If Houston prices differ, keep it `false` (quote path) and ask for per-location tiers to be added.
2. Replace the pre-opening sections if needed. `isHoustonLaunchPage` sections (waitlist form, planned services, planning guides) disappear automatically at `active`.
3. Update the remaining "opening 2026" strings: `app/page.tsx` (Houston feature, FAQ), `app/(marketing)/locations/page.tsx`, `components/layout/site-footer.tsx`, `app/llms.txt/route.ts`, `BRAND.tagline` in `lib/utils/constants.ts`, `houstonLocationFAQs` and the Houston line in `meetingRoomFAQs` in `lib/data/faqs.ts`, `CONTACT_INTERESTS` "Houston Waitlist" in `lib/data/contact-interests.ts`, and the Houston blog posts that say "no Houston address service is active yet".
4. Build locally (`bun run build`), then deploy and promote.
5. Verify in production (this pass was dry-run tested by building with Houston switched to `active` and scanning the HTML for Las Vegas phone numbers, prices, the Optix URL and "Herman Miller / until midnight"):
   - `/houston-coworking`, `/houston-virtual-office`, etc. return **200** and `<meta name="robots">` is absent (not noindex).
   - `/sitemap.xml` contains all 12 `/houston-*` URLs.
   - Rich Results Test on `/locations/houston` and one service page: LocalBusiness present, no errors, no Las Vegas values.
   - Mobile: the sticky bar shows the Houston phone number / CTA.
6. **Google Search Console:** submit the sitemap again, then URL Inspection → *Request Indexing* for `/locations/houston`, `/houston-coworking`, `/houston-virtual-office`, `/houston-day-pass`, `/houston-private-office`, `/houston-meeting-rooms`, `/houston-galleria-coworking` (the daily quota is about 10).
7. Update the GBP website/booking links from the waitlist anchor to the live tour/contact URL.

---

## 4. Citations and free exposure (week of launch)

Consistent NAP across these gives Maps more confidence and costs nothing:
- **Must:** Apple Business Connect (Apple Maps), Bing Places (can import from GBP), Yelp, Facebook page for Muze Office Houston (or a location page under the brand), LinkedIn location, BBB.
- **Coworking marketplaces** (these rank for "coworking Houston" themselves and send bookings): Coworker.com, CoworkingCafe, Deskpass, LiquidSpace, Peerspace (meeting/event rooms), Upsuite, Instant Offices / OfficeFinder, Davinci Virtual (for virtual office leads).
- **Local:** Greater Houston Partnership, Uptown Houston District business listing, Galleria Chamber of Commerce, and the Houston Business Journal "openings" desk (a press release about the grand opening is a legitimate local news hook).
- **Fix the old Houston footprint:** find any listing that still shows the old Houston address (Kirby Dr / South Main era) and update it to Augusta Dr or close it. Conflicting old listings split the location entity. Only after that, add Houston profiles to `externalProfiles` (the comment in `locations.ts` explains why).

---

## 5. First 60 days after launch (measurement)

- GSC: add a `houston` query filter and watch impressions and position for `/houston-*` pages weekly. Expect the service pages to take 2–6 weeks to settle.
- GBP Insights: calls, direction requests, website clicks. Compare them with any paid spend before scaling it.
- Contact form: the `interest` value plus "How did you hear about us" (Google Maps / Google Search / AI assistant) shows which channel is working.
- At day 28, retitle the weakest `/houston-*` pages that get impressions but no clicks (one per window, same rules as Las Vegas).

---

## 6. Las Vegas — remaining items (not done in this pass)

| Item | Why it's not done here | Owner / when |
|---|---|---|
| **G2E post enrichment** (Sep 28 show, T-6) | Needs firsthand logistics (drive time to Venetian Expo, rideshare, same-day day-pass experience) that only the team can supply. Don't fabricate. | Team: add 3–4 firsthand details today, set `dateModified`, then GSC *Request Indexing*. |
| AWS re:Invent (Dec) and CES (Jan) T-30 refresh | Not due yet | Enrich and request indexing by about Oct 31 / Dec 6. Rotate `blog-links.ts` to re:Invent in early October. |
| Meeting-rooms / airport-article merge decision | Needs the Ahrefs best-by-links check (overdue since about Sep 14) | Operator |
| Escalation check-2 (was due Aug 27) | Needs live GSC data | Next SEO session |
| Profile corrections (LinkedIn, CoworkingCafe, LANS, Peerspace → 24/7 hours) | Off-site | Operator |
| Image compression (`public/images/blog/co-working-conference.jpg` is 8.7 MB; several PNGs over 1.5 MB) | Perf batch, separate change | Next code pass |
| Texas-LLC blog CTA routing (gets the Las Vegas virtual-office CTA) | Business decision | Decide once Houston pricing is known |
