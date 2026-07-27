# Muze Office — Monthly SEO Diagnostic & Keyword Research

**Run date:** July 1, 2026 · **GSC window:** Jun 4 – Jul 1 vs May 7 – Jun 3 · **Property:** `https://muzeoffice.com/` (the only GSC property; no separate www)
**DataForSEO spend this session: ≈ $0.15 of the $0.50 cap** (itemized in §5)

---

## Monthly trend line

| Window (28d) | Clicks | Impressions | CTR | Avg pos |
|---|---|---|---|---|
| May 12 – Jun 8 (June baseline) | 133 | 13,117 | 1.01% | 14.7 |
| May 25 – Jun 21 (Jun 22 pull) | 148 | 14,935 | ~1.0% | 14.7 |
| **Jun 4 – Jul 1 (this run)** | **119** | **15,519** | **0.77%** | **14.8** |
| vs prior 28d (May 7 – Jun 3) | ±0 | +20.4% | −0.15pt | −0.3 |

---

## 1. Diagnostic summary

- **Visibility keeps growing, clicks stalled.** Impressions +20% to 15,519, clicks flat at 119. The cause is visible in the data: Google's mid-June spam update demoted the two VO blog posts that were winning the Las Vegas head terms (the "how to set up a virtual office in Las Vegas" post fell from ~16 to ~63 on "virtual office las vegas nevada"). Those posts were earning most of the non-brand clicks.
- **The counter-move already shipped (July 1)** — two VO pillars, the internal-link fix that stops the money page championing its own competitor, 12 thin posts pruned. It's ~1 day old, invisible in this data. Re-measure ~July 15–20 before touching VO content again.
- **Houston is now the site's biggest single opportunity and it earns zero clicks.** ~2,500+ impressions across 15+ Houston virtual-office queries all land on one blog post sitting at positions 12–20 with 0.14% CTR (3,681 impressions, 5 clicks). Every click it doesn't get is a lost waitlist lead.
- **Brand ambiguity costs real clicks:** "muze" gets 454 impressions at position 10.3 with 0 clicks (collides with Muse/music results). Branded "muze office" converts fine (12.4% CTR, pos 1.6).
- **Conversion plumbing is verified healthy in code** — above-the-fold Optix signup CTAs with `data-cta` tracking on money pages, `contact_form_submitted` events with interest segmentation (Vercel Analytics), blog end-of-article CTA, Ahrefs analytics. The bottleneck is clicks, not tracking.
- **Device split:** desktop carries 69% of impressions (VO/LLC research skews desktop), mobile CTR is higher (1.0% vs 0.66%). The mobile/local coworking battle is happening in the map pack, where Muze's 9 Google reviews vs competitors' 27–151 is the binding constraint — not on-page SEO.
- **Hygiene:** sitemap clean (101 URLs, 0 errors; "indexed: 0" is a known GSC API artifact), Houston money page noindexed by design pre-launch, phone (702) 370-7515 consistent across header/footer/FAQ/schema, `CoworkingSpace` (LocalBusiness subtype) schema with full NAP/geo/hours/sameAs on all money pages.

## 2. Striking-distance queries (pos 8–20, real impressions)

| Query | Pos | Impr (28d) | Landing page | Suggested fix |
|---|---|---|---|---|
| virtual office houston | 17.7 | 810 | /blog/best-virtual-office-providers-in-houston | **Retitle for CTR** (see Action #1) — pre-launch waitlist funnel |
| virtual office in las vegas | 13.7 | 485 | best-providers-LV blog leads; money page at 36–68 | Routing fix shipped 7/1 — request recrawl, re-measure mid-July |
| muze | 10.3 | 454 | homepage | Brand disambiguation in title/GBP; partial control only |
| houston virtual office | 17.8 | 226 | Houston providers blog | Same as row 1 |
| best virtual office | 18.1 | 219 | Houston providers blog | National query — grow the new virtual-office-for-llc pillar |
| coworking space las vegas | 18.9 | 181 | /las-vegas-coworking | KD only 3 — internal links from homepage + review push |
| virtual office las vegas | 17.5 | 141 | VO blogs | Routing fix, as above |
| las vegas virtual office | 17.0 | 123 | VO blogs | Routing fix, as above |
| virtual offices houston (+7 variants) | 14–20 | ~450 combined | Houston providers blog | One title fix lifts the whole cluster |
| nevada virtual office | 11.5 | 71 | /blog/virtual-office-vs-po-box-in-nevada | Healthy asset; has conversion CTA now |
| virtual business address houston | 14.9 | 64 | Houston providers blog | National volume rising (140/mo, was 320 in Jan) |
| las vegas virtual po box | 14.2 | 52 | virtual-mailboxes + vs-po-box blogs | Future /las-vegas-virtual-mailbox page candidate |

Just outside the band but the same illness: **"meeting space in las vegas" (188 impr, pos 29)** — the booking-guide *blog* holds it while `/las-vegas-meeting-rooms` sits at pos 70. Same routing fix the VO cluster got.

## 3. New keyword opportunities

Volume = Google Ads (DataForSEO, US, live). KD = DataForSEO Labs keyword difficulty (0–100 chance-of-top-10; "n/a" = not in Labs DB, not zero). Competition = advertiser competition.

### Las Vegas (primary)

| Keyword | Vol/mo | KD | Intent | Note |
|---|---|---|---|---|
| studio rental las vegas | 1,600 | n/a | Transactional | Found via competitor gap — Corporate Cowork ranks #17 with a dedicated studio page. Mostly photo/video/content-studio demand; Muze's podcast room + event space can honestly serve part of it |
| virtual office for llc | 2,400 | 20 | Commercial | Pillar shipped 7/1; already pos 13.6 on 27 impr. The compounding bet |
| event space rental las vegas | 140 | n/a | Transactional | Page exists at pos 6.2 but 0.4% CTR — title fix pending ("No F&B Minimum" never shipped) |
| conference room rental las vegas | 90 | 15 | Transactional | CPC $11.39. Page exists; blog outranks it |
| meeting room rental las vegas | 90 | 6 | Transactional | KD 6 = soft SERP; same routing play as VO |
| salon suites for rent las vegas | 50 | n/a | Transactional | Ashley's Beauty Studio angle — high advertiser comp (90), CPC $7.49, real rent-seeking intent |
| podcast studio rental las vegas | 30 (peaks 90) | n/a | Transactional | **No page exists**; site already gets impressions at pos 30.9 with zero targeting. No LV coworking rival covers it |
| corporate training venue / workshop venue las vegas | 140–170 | n/a | Commercial | Low-comp; event-space satellite angle (competitor ranks with a workshops page) |
| coworking day pass (national family) | 590–720 | n/a | Commercial | Corporate Cowork ranks 19–30 nationally; low geo-conversion for Muze — low priority |
| ~~day office / hot desk / dedicated desk / private office LV~~ | ~0–10 | — | — | Confirmed do-not-build (June pull); pages exist, no new content |

Competitor gap notes: **Alliance Virtual Offices** wins LV VO with a city page + per-address landing pages that soak up address-navigational queries (100–480/mo each) — the pattern worth copying is making `/locations/las-vegas` own "6860 bermuda rd" searches (Houston's "8990 kirby dr" already shows 430+ impr/90d in GSC). **Corporate Cowork** ranks #3 for "coworking space las vegas" on domain strength + reviews, not content depth.

### Houston (preliminary)

| Keyword | Vol/mo | KD | Intent | Note |
|---|---|---|---|---|
| coworking space houston | 1,600 | 15 | Transactional | **~2× Vegas coworking volume**, CPC $20.58 (3× Vegas). Not declining like Vegas is |
| virtual office houston | 720 | n/a | Transactional | CPC $32.50; already the site's largest impression pool pre-launch |
| virtual business address houston | 140 ↑ | n/a | Transactional | Rising (Jan 320); CPC $25.35, MED comp |
| meeting room / conference room rental houston | 140 ea | n/a | Transactional | CPC $15.42, HIGH comp |
| registered agent houston | 90 | n/a | Transactional | CPC $26.96. Muze is NOT a registered agent — honest explainer/partner angle only |
| salon suite rental houston | 40 | n/a | Transactional | Differentiators carry over to Houston |
| podcast studio rental houston | 20 | n/a | Transactional | Ditto |

**How Houston differs from Vegas (don't find-and-replace):** Houston demand is bigger and more B2B/legal-formation flavored — VO + business-address + registered-agent adjacency at $25–35 CPCs, coworking volume 2× Vegas, and GSC already shows Houston-specific intents Vegas doesn't have (Microsoft Teams rooms, meeting rooms near Hobby Airport, "private offices virtual tour houston"). Vegas skews convention/event. Houston launch pages should lead with address/LLC + coworking, offer a virtual tour, and reference Hobby/Galleria geography.

## 4. Top 5 action items (ranked by expected lead impact)

1. **Retitle `/blog/best-virtual-office-providers-in-houston` for CTR.** ~2,500+ zero-click impressions at pos 12–20 feed the only Houston monetization path (waitlist). Current 0.14% CTR vs ~1.5% expected ≈ 50 clicks/mo left on the table. Add price + year + a "Muze opening 2026 — join the waitlist" cue to title/meta. One file, no new content.
2. **Finish the LV VO money-page play:** request recrawl of `/las-vegas-virtual-office` + the VO blogs (my API submission was permission-blocked — one click in GSC UI, or grant the tool and I'll do it), then add the **all-in first-month cost comparison table** to the money page: Muze $64 all-in vs Alliance $259+, Opus $99, Davinci $200+ — no LV rival shows setup-inclusive pricing. VO is the #1 revenue priority; this converts the visitors the routing fix will recover.
3. **Apply the same routing+title fix to meeting rooms.** KD 6–15, money pages exist, but the booking-guide blog holds pos 29 while `/las-vegas-meeting-rooms` sits at pos 70 on "meeting space in las vegas" (188 impr). Retitle money page to include "Conference Room Rental," demote the blog from its RelatedReading slot, ship the pending event-space "No F&B Minimum" title. Meeting rooms are a direct booking (= lead) product.
4. **GBP review push 9 → 30+ (operational, not code).** Mobile/local coworking demand is decided in the map pack; every LV competitor with traction has 27–151 reviews. The review funnel already exists on-site — this is execution. Highest compounding lever on tours and calls.
5. **Ship the two differentiator pages: podcast/content studio + salon suites.** Verified demand (30–1,600/mo LV, 20–40 Houston), zero coworking competitors on the podcast angle, and both convert to tours/bookings rather than reads. Two pages, not a cluster — the June-update lesson stands: depth over breadth.

## 5. DataForSEO spend (this session)

| Call | Est. cost |
|---|---|
| Google Ads search volume, live — 11 LV service keywords | $0.05 |
| Google Ads search volume, live — 10 Houston keywords | $0.05 |
| Labs ranked_keywords — corporatecowork.com (40 rows) | ~$0.014 |
| Labs ranked_keywords — alliancevirtualoffices.com (40 rows) | ~$0.014 |
| Labs bulk_keyword_difficulty — 12 keywords | ~$0.011 |
| **Total** | **≈ $0.14–0.15** |

Basis: DataForSEO published rates ($0.05/live volume call; Labs $0.01/task + $0.0001/row), corroborated by this account's June 30 history ($0.10 for 2 volume calls). The MCP exposes no balance endpoint, so treat as a close estimate. **Reused, not re-bought:** the June 30 volume set (VO/LLC/coworking head terms) from project notes. No SERP or backlink calls made.

## 6. What I could not check (flagged, not glossed)

- **GBP / off-site NAP:** phone and address are consistent everywhere *on the site and in schema*, but Google Business Profile itself, citations, and review responses are outside GSC/DataForSEO scope this run. Given Action #4, a dedicated GBP/maps audit is worth a future session.
- **Manual actions & mobile usability:** this GSC MCP doesn't expose the manual-actions endpoint (no signal of one in the data), and Google retired the mobile usability API. Core Web Vitals not re-measured this run — the known open item is the 7.1s mobile LCP recheck from June.
- **GA4 is not installed — by design, not omission.** Conversion tracking runs on Vercel Analytics custom events (`contact_form_submitted` with interest, `cta_click`, `phone_click`, `email_click`) plus Ahrefs analytics. GSC can't tie clicks to leads; the click→lead view lives in the Vercel Analytics dashboard. Optix booking completions and Resend deliveries are not visible to me — closing the loop lead→member still depends on Zac's CRM work.
- **Recrawl request blocked:** my Indexing API submission for the 6 changed URLs was denied by session permissions. Submit via GSC UI (URL Inspection → Request Indexing) for `/las-vegas-virtual-office` and the two new pillars, or allow `mcp__gsc__submit_batch` and I'll do it next run.
- **KD gaps:** DataForSEO Labs had no difficulty score for several terms (shown n/a) — absence of data, not easiness. Didn't spend on live SERP calls to fill them.
- **Houston indexed presence:** intentional — `/houston-virtual-office` and Houston service pages are noindexed pre-launch; the indexed Houston blogs + waitlist capture are the designed interim funnel. Nothing broken.
