# AI search visibility plan (LLM SEO / GEO) — 2026-10-20

**Trigger.** Meta AI did not list Muze Office in its top 10 coworking spaces in Las Vegas. Goal: be named when people ask AI assistants (Google AI Overviews/AI Mode, ChatGPT, Perplexity, Meta AI, Copilot, Claude) anything about coworking, day passes, meeting rooms, or virtual offices in Las Vegas.

## 1. Diagnosis (evidence gathered 2026-10-20)

| Question | Answer | Evidence |
|---|---|---|
| Can AI crawlers read the site? | **Yes.** | `vercel firewall status`: Firewall not configured, Attack Mode off, Bot Protection off, **AI Bots: Allow**. robots.txt allows all. 16 crawler user agents (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, meta-externalagent, bingbot, Applebot, CCBot…) returned 200 with the full page. A burst of probes from one IP later triggered Vercel's always-on `sys_dos_mitigation` challenge; that is per-IP and temporary, and an off-network fetch got the real page. |
| Is the site already inside AI answers? | **Yes, for how-to and comparison questions.** | GSC AI-conversation exhaust (16 months): 140 conversation-shaped queries, 2,298 impressions, 1 click. Top: "do i need a private office or dedicated desk?" 341 impr @ pos 3; "what hidden fees… event venue in las vegas?" 258 @ 1.9; "is it worth paying for a meeting room in las vegas…" 104 @ 6.9; "can i book a flexible hourly meeting room in las vegas…" 100 @ 5.9. These are Google AI Mode fan-out queries landing on the guides and the meeting-rooms page. |
| Is it inside "best coworking in Las Vegas" answers? | **No.** | The roundups that answers are assembled from (Surf Office top 10, Coworking Cafe "8 best", Drop Desk, Office Hub, WeAreIndy, Holafly, StealthAgents) name Innevation Center, Regus, The Coop, Work in Progress, Pacific Workplaces, FeatherNest, Corporate Coworking, Black Fire, Bottega Exchange, Kiln, WeWork. Muze is absent from every one. |
| Third-party footprint | **Thin.** | Confirmed: Coworking Cafe property page (2 reviews, June 2026), Instant Offices, CommercialSearch. Google: 4.8 from 21 reviews, verified on Maps 2026-10-20 (the site badge had said 4.6 from 11 until tonight). Not confirmed anywhere: Yelp (listed in repo, unverified), LiquidSpace, Deskpass, Coworker, Bing Places, Apple Business Connect, Reddit mentions. |
| On-page citability | **Weak on the money pages.** | First paragraphs did not name Muze, the address, or a price ("Flexible shared workspace with hot desks and dedicated desks."). Organization schema had no address, phone, Yelp, or Google link; sameAs was five social profiles. llms.txt buried the 14 service pages under 70 blog links. |

**Root cause in one line:** AI "best of" answers are built from review counts and third-party lists, and Muze has 21 reviews and sits on none of the lists. The site itself is fine and is already cited for long-tail questions.

## 2. Shipped today (in-repo, commit after this file)

1. **Quotable lead sentence on 10 money pages** (coworking, day pass, hot desk, dedicated desk, private office, meeting rooms, conference rooms, virtual office, airport coworking, event space): name + address + airport distance + price + hours/parking in the first 40–60 words, in server HTML. This is the passage an assistant lifts.
2. **One Organization entity** with address, phone, areaServed, and sameAs covering X, Facebook, Instagram, LinkedIn, TikTok, Yelp, the Google Knowledge Graph entity link, and the Coworking Cafe listing; linked to the Las Vegas LocalBusiness record. New `directories` field on the location record so future verified listings flow into both schemas.
3. **llms.txt restructured**: key-facts blockquote (name, address, hours, every headline price, phone), Locations → Services → People → Primary Pages → Pricing → 10 featured Guides → Optional (dump, sitemap, remaining 60 posts). **llms-full.txt** gets the same key-facts block at the top so truncated reads still get the entity.
4. **`<link rel="alternate" type="text/markdown">`** in the head of every page with a markdown twin (service pages, locations, blog posts, authors, home, about, contact, tour, memberships, locations index, blog index, privacy).
5. **Lint gate restored**: eslint ignores `franchise/**`, `.claude/**`, `.codex/**`; `npm run lint` is now 0 problems.

Not done on purpose: `aggregateRating` stays out of schema (self-serving rating markup was the June GSC error); the kept branch `agent/publish-reviewed-seo-recovery` (Accept: text/markdown content negotiation, Aug 25) is reference only, it moves the homepage to the Pages Router and is 2 months stale.

## 3. Owner actions, in priority order (off-site, cannot be done from the repo)

| # | Action | Why it matters for AI answers | Effort |
|---|---|---|---|
| 1 | **Google reviews: 21 → 50+ in 90 days.** Ask every day-pass buyer and member after their first week via the existing `/review` link; ask for one sentence that says what they used (coworking, day pass, meeting room, airport layover). | Review count is the first filter every assistant applies to "best X in city". 21 reviews still trails every competitor on the lists. | Ongoing, 10 min/day |
| 2 | **Claim and verify: Bing Places, Apple Business Connect, Yelp.** Same name, address, phone, hours, categories, photos everywhere. | Meta AI, ChatGPT, and Copilot ground on Bing; Siri/Apple Intelligence on Apple Maps. Unverified = invisible there. | 2 hours once |
| 3 | **List bookable inventory on LiquidSpace, Deskpass, Coworker, Upflex** (day passes and meeting rooms). | These marketplaces are what the roundup writers and assistants crawl; they also bring their own reviews and bookings. Matches the June card-partnership finding. | 3 hours once |
| 4 | **Get onto the roundups.** Email Surf Office, Coworking Cafe (editorial "8 best"), Drop Desk, Office Hub, WeAreIndy, Holafly, plus Las Vegas Weekly / Review-Journal / Vegas Inc "best coworking" pieces. Send the key-facts paragraph, 4 of the new photos, prices, the airport angle, and the 24/7 day pass. | The lists are the source material for the answers. One inclusion on two lists changes the answer set. | 2 hours, then follow-ups |
| 5 | **Reddit presence**: answer "where can I work for a day in Vegas" threads on r/vegas, r/LasVegas, r/digitalnomad honestly as the owner, no link spam. | Reddit is weighted heavily by Google AI Mode and Perplexity. | 20 min/week |
| 6 | **Entity anchors**: create a Wikidata item (cite Coworking Cafe, press) and a Crunchbase profile; add both to `directories` in `lib/data/locations.ts`. | Disambiguates "Muze" from the gastropub and other Muze brands assistants confuse. | 1 hour once |
| 7 | **Vercel Firewall log check**: last 24h showed 3.1k denies from `sys_dos_mitigation`. Open Firewall → Logs, filter denied, and confirm none carry GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, meta-externalagent, or Applebot user agents. | Rule out collateral blocking of real crawlers by the DDoS mitigation. | 10 min |

## 4. Content plan (Q4 2026 → Q1 2027), firsthand-guide format only

The AI exhaust tells us exactly which questions already route to Muze. Feed them, do not spray.

1. **"How to choose a coworking space in Las Vegas"** with an honest comparison table of 8–10 spaces (price, day pass, 24/7, parking, airport distance) including Muze. Assistants cite comparison tables; competitors' roundups are the only ones that exist today.
2. **Refresh `hot-desk-vs-dedicated-desk-vs-private-office`** (341 AI impressions, pos 3): add a "which one for a real estate agent / consultant / two-person startup" section, since those are the fan-out variants.
3. **Meeting-room cluster**: the meeting-rooms page already answers "flexible hourly meeting room… cancellation rules" (100 impr, pos 5.9) and "worth paying for a meeting room" (104 impr). Add a cancellation-policy and hidden-fees passage to the page itself, in the same quotable style.
4. **Event budgeting guide** (258 impr, pos 1.9): add a "150-person summit" worked example, since that exact prompt recurs.
5. **Virtual office**: the money page now takes the majority of head-term impressions but ranks 14–24. One firsthand guide a month, each linking to the money page as the canonical answer; retitle the Nevada PO-box post for CTR (741 impr @ 9.1, 0.4% CTR, flagged in August).
6. **AWS re:Invent post**: inspect, enrich, Request Indexing by ~Oct 30 (T-30 rule). Decommission the convention cluster idea otherwise: 18 posts = 1 click/28d.

Cadence: 1–2 pieces a month, each written from operating the space, with a 40–60 word direct answer under every H2.

## 5. Measurement

- **Monthly AI panel** (first Monday): run the same 8 prompts in Google AI Mode, ChatGPT, Perplexity, Meta AI, Copilot: "best coworking space in Las Vegas", "coworking near Las Vegas airport", "day pass coworking Las Vegas", "meeting room rental Las Vegas by the hour", "virtual office Las Vegas address for LLC", "where to work for a day in Las Vegas", "cheapest coworking Las Vegas", "24/7 coworking Las Vegas". Record mention yes/no, position, and which source was cited. Baseline today: 0 of 8 on Meta AI.
- **GSC `genai_conversation_queries`** monthly: conversation-bucket impressions (today 1,739) and which pages absorb them.
- **Review count and rating** weekly (today 4.8 / 21); update `rating`/`reviewCount` in `lib/data/locations.ts` whenever it changes, since every badge reads from there.
- **Listing coverage** checklist: Google, Bing, Apple, Yelp, Coworking Cafe, LiquidSpace, Deskpass, Coworker, Foursquare, Wikidata, Crunchbase. Today 3 of 11 confirmed.
- DataForSEO AI-visibility checks only if the account is funded (~$0.75 left, do not spend).

## 6. Watch items

- Vercel `sys_dos_mitigation` denies ~30% of daily requests. Likely scraper traffic (the `.se`-domain "meeting rooms count" query strings in GSC point the same way), but verify per item 7 above.
- Houston blogs hold ~23% of impressions for 7 clicks. Expected while Houston is waitlist-only; do not optimise them for AI answers.
- Meeting-rooms impressions are polluted by "virtual/online meeting room" software queries; judge that page on local-intent queries only.
