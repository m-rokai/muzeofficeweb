# SEO Gap Analysis + Executed Fixes — 2026-07-08

**Scope:** weekly GSC diagnostic + DataForSEO gap pass (budget $0.20, spent ≈ $0.03). Changes executed same-session via Sonnet agents, reviewed by Fable. **Working tree changed — not yet committed** (see deploy checklist at bottom).

## Trend (Jul 1–7 vs prior 7d)

| Metric | This week | Prior | Change |
|---|---|---|---|
| Clicks | 22 | 17 | **+29%** (2nd consecutive up-week) |
| Impressions | 4,065 | 3,929 | +3.5% |
| CTR | 0.54% | 0.43% | +0.11pt |
| Avg position | 14.7 | 15.2 | improving |

## Findings

1. **`virtual-office-cost` pillar ranks pos 8–12 nationally** for "virtual office cost/costs/prices" one week after shipping — but 0.37% CTR vs 3.2% expected. Live SERP shows every page above it uses a price-anchored question title (Alliance "How Much Does a Virtual Office Cost in 2026?", iPostal1 "from $39.99/mo"). Our seoTitle was just "Virtual Office Cost (2026)". → **FIXED.**
2. **`best-virtual-office-providers-in-las-vegas` leads the LV VO cluster** (pos 11–14, 261 impr/14d, **0 clicks**) with no seoTitle at all. → **FIXED** (honest "(2026 Red Flags)" differentiator — post does NOT compare competitor prices, so no "Prices Compared" claim).
3. **LV money page early recovery signal:** DataForSEO live shows /las-vegas-virtual-office at **pos 12** for "virtual office las vegas" (LV geo); GSC last-3d shows pos 16 on that variant but still 34–44 on "virtual office in las vegas"/"las vegas virtual office". Routing fix is biting, unevenly. **No touching the VO money page or how-to-set-up-LV until the ~Jul 15–20 checkpoint.**
4. **Houston consolidation is working as designed:** the how-to post dropped on "best virtual office houston" (42→64.7) while best-providers holds 12–17 across ~15 Houston queries — Google picking one page per intent. The how-to also ranks **pos 11 nationally for "how to set up a virtual office"** (40/mo), so it stays (no merge). The two posts didn't cross-link at all. → **FIXED** (two-way links, intent-disambiguating anchors).
5. **Recrawl still pending:** Houston post last crawled **2026-06-28** — the promoted retitle/cost table (live since 7/6) is not in Google's index yet. The CTR gap (0.12% on 2,428 impr/14d, ≈35 clicks/mo recoverable) will not close until recrawl. **Zac: GSC UI → Request Indexing** for: /blog/best-virtual-office-providers-in-houston, /las-vegas-virtual-office, /las-vegas-meeting-rooms, /las-vegas-event-space (+ after next deploy: /blog/virtual-office-cost, /blog/best-virtual-office-providers-in-las-vegas).
6. **"8990 Kirby Dr Houston TX 77054" mystery (flag for Zac):** /contact ranks pos 8–10 for that address family (DataForSEO: 390/mo on two variants; GSC: ~18 impr/28d, live). The address appears **nowhere in the repo** — Google associates the domain with it from history (old citations/GBP?). Announced Houston address is 1800 Augusta Dr, 77057. If Muze once operated at Kirby: nothing to do, it will decay. If Muze still controls that suite, it's a free Alliance-style per-address asset at Houston launch. **Needs Zac's answer — do not build content on an address we don't hold.**
7. **Corporate-event post pos 6.3 with 0% CTR is NOT a title problem:** its queries are AI-assistant-style prompts ("what hidden fees should i watch for when booking an event venue…" pos 1). AI surfaces answer these without clicks. No action — it's evidence the post is AI-citable, which is fine.
8. **Local pack (LV):** won by Pacific Workplaces (4.9★/68), Woven (5.0★/35), OfficeNest (4.6★/52). The **review-count push (9 → 30+) remains the single biggest lever** and is operational, not code.

## Executed this session (4 files, build passes)

| File | Change |
|---|---|
| `content/blog/virtual-office-cost.mdx` | seoTitle → "How Much Does a Virtual Office Cost? 2026 Prices ($20-$250+)" (60 ch); description leads with the $20–$250+ answer + $39/mo. All numbers verified in body. |
| `content/blog/best-virtual-office-providers-in-las-vegas.mdx` | Added seoTitle "Best Virtual Office Providers in Las Vegas (2026 Red Flags)" (59 ch); description sharpened (red flags, Form 1583, $39/mo). H1 unchanged. |
| `content/blog/best-virtual-office-providers-in-houston.mdx` | Added contextual link → how-to post (anchor: "how to set up a virtual office in Houston"), after the evaluation checklist. |
| `content/blog/how-to-set-up-a-virtual-office-in-houston.mdx` | Added contextual link → best-providers post (anchor: "best virtual office providers in Houston"), end of Step 1. |

**Deliberately NOT done:** any edit to /las-vegas-virtual-office or how-to-set-up-LV (mid-July measurement embargo); corporate-event retitle (AI queries); homepage "muze" title change (brand-collision noise, thrash risk); new pages of any kind (virtual-mailbox 90/mo noted for backlog; podcast/salon stay closed per 7/2 decision).

## DataForSEO spend

3 × live SERP advanced (LV VO in-geo, VO cost national, Houston VO in-geo) + 1 × ranked_keywords (100 rows) ≈ **$0.03** of $0.20 cap. Account balance ≈ $0.72 remaining.

## Addendum — August lead-capture sprint (same day, commit d5bc44b)

Zac reported live Peerspace inquiries from a "hackathon convention" first week of August. Research (2 Sonnet agents, web + repo):

- **It's Hacker Summer Camp:** Black Hat USA Aug 1–6 (Mandalay Bay, ~20k in 2025) + BSides Aug 3–5 (Tuscany) + DEF CON 34 Aug 6–9 (LVCC West Hall, 25–30k in recent years). No standalone hackathon event exists in the window — the inquiry is almost certainly a DEF CON village/CTF team or vendor. Peerspace's own LV hackathon-venue category runs ~$63/hr with typical 8-hr/15-person bookings, and carries zero event-aware content. SERP check: "where to work during def con" and every variant = **uncontested, nobody publishes this**.
- **We already had the post** (`where-to-work-during-black-hat-def-con-las-vegas`, indexed since Jun 8) — the gap was wiring: routed to zero money pages; "hackathon" appeared nowhere on the site; day-pass/convention pages named only CES/SEMA/NAB/MAGIC.
- **Volume check ($0.05): all 10 hackathon/war-room/offsite phrasings = zero Google Ads volume → NO dedicated landing page** (would be a thin zero-volume URL). Enrich-and-wire instead.

Shipped in d5bc44b: post enriched +263 words (hackathon/CTF war-room section, Black Hat Business Hall private-vendor-meeting angle, press/podcast recording angle citing Black Hat's booth-only interview rule, dates sharpened in description, dateModified bumped); blog-links.ts now surfaces the post in rendered top-3 on convention-coworking (1st), meeting-rooms (1st), event-space (3rd) with a documented seasonal-rotation rule (rotate after mid-Aug, restore podcasting-rooms); city-services.ts adds Black Hat/DEF CON to day-pass + convention-coworking copy and a hackathon/CTF/sprint war-room use case + persona on event-space (all reused facts: $99/hr, 10% off 8+ hrs, Muze Cafe, free parking). tsc + full build clean.

Backlog from the audit (next sessions): 12 more convention posts (G2E, Money 20/20, HLTH, AWS re:Invent, MJBizCon…) are indexed but feed no money page — consider a convention-calendar section on /las-vegas-convention-coworking to link them all; rotate blog-links top-3 monthly per the comment in the file. Houston: VO remains the only sensible pre-launch angle — no Houston coworking/meeting content until a real address/phone exists.

**Operational (not code), highest-leverage for August:** respond fast to Peerspace hackathon inquiries and consider a flat day-rate quote template for teams; ask every August booking for a Google review afterward (11 → 30+ push); Peerspace listing could name DEF CON/Black Hat availability explicitly.

## Deploy checklist (Zac)

1. `git add content/blog && git commit` → push to master (builds preview only)
2. `printf 'y\n' | vercel promote <preview-dpl-id> --scope team_PeFsEju1eYXXiqOmX9ZeMjAE`
3. Verify live, THEN GSC UI → Request Indexing for the 6 URLs in finding #5
4. Review push 9 → 30+ (ongoing, biggest lever)
5. Mid-July checkpoint (~Jul 15–20): judge VO routing fix + Houston CTR retitle + these two new retitles
