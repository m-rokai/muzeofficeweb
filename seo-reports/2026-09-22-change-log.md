# SEO Change Log — Houston + Las Vegas — 2026-09-22

Branch: `claude/youthful-goldberg-xsenhq`. Commits `b010598` and `03db167`.
**Status: not merged, not deployed.** Production is still `master` at `67d4a8b`.

Owner inputs from this session:
- Houston pricing is **not final** and may differ from Las Vegas.
- The suite number, phone and hours were not provided.
- Houston has no Google Business Profile yet.

Every change follows one rule: nothing about Houston is published unless it is confirmed.

---

## 1. Houston: pre-opening visibility (takes effect on deploy)

| Change | Reasoning |
|---|---|
| **Hub title** is now "Muze Office Houston — Galleria Coworking, Opening {Month Year}". The month fills in from `openingDate`. The description names the services and the address. | `/locations/houston` is the only Houston page Google can index before opening. The old title ("Galleria Opening 2026") had no service keyword, so it couldn't rank for "coworking Houston Galleria" searches. |
| **New hub section**, "Coworking, offices, and meeting space in the Galleria area", with one heading per planned service. | It gives that one indexable page real coverage of the service and neighborhood terms (virtual office, private office, meeting rooms, Uptown, Post Oak) until the service pages go live. It makes no price or hours claims. |
| **Service URLs redirect temporarily (307) instead of permanently (308)** to the hub. | A permanent redirect is cached by browsers and tells Google the hub is the permanent home of `/houston-coworking` and the rest. These URLs become real pages at opening, so the redirect has to be temporary. |
| **Houston providers blog post** gets a new title and description. | It's the site's largest pool of Houston impressions (about 1,100 a month in the August report) at roughly 0.7% click-through. The new snippet is written to earn clicks and points to the Galleria opening. There's no price hook, because Houston prices aren't final. |
| **Contact page Houston text** changed from "Inside the 610 Loop… Free parking on-site" to "just off the I-610 West Loop… parking details confirmed before opening". | The old text is live and wrong: 1800 Augusta Dr is west of 610, not inside it. It also promises free parking, which isn't confirmed. The same fix was made in the location data, the hub and the markdown twins. |
| **Header and mobile sticky bar on Houston pages** show "Join Early Access" instead of the Las Vegas phone number and the Las Vegas Optix portal. | Someone researching Houston who hits "Call" or "Book a Tour" was reaching Las Vegas. That's a lost lead, and a confusing signal about which location the page is for. |

## 2. Houston: one-switch launch (takes effect when `status` becomes `"active"`)

| Change | Reasoning |
|---|---|
| **New fields in `lib/data/locations.ts`:** `openingDate`, `usesStandardCatalog`, `booking`, `amenities`, `hours.display`. `TODO(launch)` comments mark each Houston value still to fill in. | Launch becomes a data edit, not a code change, and every Houston fact lives in one place that has to match the GBP exactly. |
| **`usesStandardCatalog: false` hides Las Vegas catalog content on Houston pages:** prices (cards and JSON-LD `offers`, `priceRange`, offer catalog), generic FAQs, service blurbs and brand-specific amenities. Pricing cards become a "Get Houston Pricing" quote button. | A test build with Houston switched on showed Las Vegas content on the Houston pages: $25 day passes, "our 24/7 Las Vegas location", "Herman Miller", and the Las Vegas FAQs. Wrong prices in structured data can also cause rich-result problems and pricing complaints. |
| **Hours and phone** appear on the page and in JSON-LD only once confirmed. The reviews badge appears only once Houston has its own GBP. | The Houston hours in the data (10–7) are a placeholder. Name, address, phone and hours on the site that disagree with the GBP weaken local ranking. The reviews badge was linking to the Las Vegas reviews. |
| **Booking CTAs** fall back to the contact form when Houston has no booking portal of its own. | It's never correct to send a Houston buyer to the Las Vegas Optix signup. |
| **All 12 Houston service pages and the FAQs rewritten.** Removed: prices, Las Vegas plan names, 24/7 access, "Suite 200", free parking, "inside the Loop", drive times, waitlist wording. Added Houston-specific FAQ sets and unique titles such as "Coworking Space Houston — Galleria / Uptown". | This copy goes live at opening, so it must be accurate on day one and still rank. Without Houston FAQ sets, the pages would have fallen back to the Las Vegas FAQs. |
| **Related reading** on Houston pages shows Houston, Texas and location-neutral posts. | The pages were recommending "Book a $25 Las Vegas day pass" posts to Houston visitors. |
| **Legacy WordPress Houston URLs** (for example `/workspace-memberships/coworking-houston-texas`) redirect to the matching service page once Houston is active, and to the hub until then. | These old URLs still have backlinks. Sending them to the most relevant live page passes that value where it counts at launch. |
| **Bug fix:** the hub's pre-opening title was keyed on the address, not on the status. | After launch, Houston would have kept the "Opening 2026" title indefinitely. |
| **Launch dry run:** a production build with Houston switched on, and all 13 Houston pages scanned for Las Vegas phone numbers, prices, the Optix URL and Las Vegas copy. | This proves the switch works before it matters. The only remaining hit is the sitewide footer's labelled Las Vegas address block, which is intended. |

## 3. Las Vegas

| Change | Reasoning |
|---|---|
| **`/locations/las-vegas` links to all 12 service pages** (it linked to 6). | Day pass, hot desk, dedicated desk, flexible workspaces, airport coworking and convention coworking got no links from the location hub. Hub-to-service links spread authority and help Google see the site's structure. |
| **Hub title** is now "Muze Office Las Vegas — 24/7 Coworking, Hours & Directions". | The old title repeated "Muze Office" (because the layout adds " \| Muze Office") and had no service word. "24/7" is the Las Vegas differentiator. |
| **"Virtual Office vs PO Box in Nevada: $11 vs $39/mo"** (new title). | It was the only page-1 post with a large click-through gap (741 impressions at position 9 and 0.4% CTR, versus about 2.8% expected). Both prices already appear in the post. |
| **Hot desk comparison** gets a "Costs" hook. | Second in the report's CTR queue. The current title gives no reason to click. |
| **Meeting-room booking guide** gets a new description. | The old description contained "meeting space in Las Vegas", which competes with the `/las-vegas-meeting-rooms` money page. The freeze on this page had expired. |
| **LLC cluster links** from the PO-box post and the setup guide to `/blog/virtual-office-for-llc` and `/blog/nevada-llc-virtual-office`. | The LLC posts are the proven gainers (head term around 2,400 searches a month, rising). Links from page-1 posts push them further. |
| **The GBP-verification guide** links in-body to `/las-vegas-private-office` and `/las-vegas-coworking`. | It's the site's best-performing new post, and it had no in-body link to a money page. |
| **Related-reading rotation** swaps Black Hat (over) for G2E (Sep 28–Oct 1). | This follows the seasonal-rotation rule in `blog-links.ts`. The next swap is AWS re:Invent in early October. |
| **`data-cta="hero_primary"`** on each service page's main hero button. | The site's main conversion button wasn't tracked, so conversions couldn't be attributed. |

## 4. Documents

| File | Purpose |
|---|---|
| `seo-reports/2026-09-22-houston-launch-playbook.md` | GBP setup (pre-opening profile, categories, video verification, reviews), launch-day switch steps, citations, first-60-days measurement, and the remaining Las Vegas items |
| `seo-reports/2026-09-22-change-log.md` | This file |

## 5. Not done, and why

| Item | Reason |
|---|---|
| G2E post enrichment | Needs first-hand logistics from the team. Writing them from assumption would repeat the thin, template content the spam update penalized. |
| Houston prices, suite number, phone, hours, opening date | Not provided. The site is built to use them as soon as they're set. |
| Image compression, the airport-article merge decision, escalation check-2 | Outside this pass. They need an Ahrefs or GSC data pull, or a separate perf change. |

**Freeze:** don't retitle any page changed here before 2026-10-20 (28 days), so the effect can be measured.
