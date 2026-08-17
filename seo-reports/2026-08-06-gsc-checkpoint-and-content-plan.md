# GSC Checkpoint + Next-Stage Content & Optimisation Plan — muzeoffice.com — 2026-08-06

Read-only GSC diagnostic (MCP tools, trailing windows ending 2026-08-05; the last 1–2 days may still be incomplete per GSC lag). Baseline: `seo-reports/2026-07-29-full-diagnostic-synthesis.md`. Repo state at run time: local = origin = master `b2afde1a` (CanvasRebel link, pushed); the 7/28 recovery patch is **STILL uncommitted** and the retired VO slug still serves HTTP 200 in prod → patch **not deployed**, 8 days after being cleared SAFE-TO-COMMIT.

---

## 1. Headline: best click period on record

28d window 2026-07-09..08-05 vs prior 28d: **clicks 101 → 174 (+72%)**, impressions flat (−1.4%), CTR 0.63% → 1.10%, position 14.8 → 16.3 (worse, mix-driven — same VO-money-page-at-pos-~28 impression mix effect documented 7/29).

Weekly series (continuing the 7/29 cadence, complete weeks):

| Week | Clicks | Impr | Pos (impr-weighted approx) |
|---|---|---|---|
| 07-07..07-13 | 42 | 3,987 | 15.5 |
| 07-14..07-20 | 35 | 3,452 | 16.2 |
| 07-21..07-27 | 29 | 3,647 | 17.0 |
| **07-28..08-03** | **57** | **4,578** | **~15.9** |

57 clicks is the best complete week in tracked history (prior best 42); 2026-08-03 = 17 clicks, the best single day (prior best ~9–12). Aug 4–5 add another 20 clicks. The 4-week position-worsening series (14.7→17.0) **reversed** to ~15.9. The 7/29 "clicks flat at 126/28d plateau" reading is over — the trend broke upward starting ~07-30. Cause not attributable from GSC data alone; note the CanvasRebel founder feature (commit b2afde1a) and GBP factors as candidates, unproven.

Click sources, last 7d (07-30..08-05, 66 clicks, ~77% query-anonymized): homepage 15, /las-vegas-coworking 12 (pos 10.8, 5.2% CTR), **GBP-verification guide 9 (pos 6.9)**, airport-coworking 6 (9.8% CTR), day-pass 5, meeting-rooms 3, locations/las-vegas 3, VO money page 2, Houston providers 2, conference-rooms 2, therapists post 2.

## 2. Cohort updates vs 7/29 baselines

- **Brand-click collapse RECOVERED:** `muze office las vegas` = 6 clicks / 11 impr / 54.5% CTR / pos 1.4 in the last 7d (was 6→0 clicks over June–July, the §2.4 watch item). Homepage overall 15 clicks/7d (~60/28d pace vs 32/28d in the decay reading) — homepage decay reversed. The pending GBP-Insights investigation is now moot.
- **VO transfer: past the 45% gate (pre-deploy, informal read).** 28d trailing, head variants (virtual office in/las vegas × orderings): money page 279 impr vs setup guide 221 → **55.8% share vs guide** (7/29: 42.2%, gate 45%). On the single biggest head term `virtual office in las vegas`: money page 230 impr @ 27.9 vs guide 161 @ 33.2 — the money page now leads and out-positions the guide. Guide continues to fade (0 clicks, pos 25.3 on 159 impr/7d) — intended direction. Formal gate reading still belongs to the post-deploy window per the 7/28 plan. Money page still page 3 on head terms — routing consolidation in the undeployed patch remains the lever.
- **Coworking:** /las-vegas-coworking earns 12 clicks/7d at pos 10.8 — but visible nonbrand head terms (`coworking space las vegas` 34 impr @ 21.4, 28d) still 0 clicks; clicks are brand + anonymized long-tail. Head-term `coworking las vegas` 76 impr @ 15.4 flat vs baseline.
- **Houston pool:** still effectively zero-click but improving at the margins — houston-query clicks 1 → 8 per 28d (providers post 2; **homepage 6**, ranking #1 on scattered houston VO/coworking queries). Providers post: `houston virtual offices` 118 impr @ **10.8** (page-1 edge), `houston virtual office` 132 @ 16.0, `houston virtual address` 93 @ 16.1. The 3-way split persists (providers ≈547+ visible houston impr, /locations/houston ≈260, setup blog ≈200 — floors, top-100 rows). CTR retitle + internal-link consolidation (queue item 5) still undone.
- **Convention cluster / Black Hat: the 2026 window is LOST.** The Black Hat/DEF CON post is now "**URL is unknown to Google**" (regressed from "Discovered", never crawled); **zero** site impressions on any black-hat/def-con/hacker-summer query 07-27..08-05, mid-event. The queued "Request Indexing today" user action (7/29 item 2) was never executed. Residual: requesting today might catch the DEF CON tail (~Aug 8–9) — 2 minutes, do it anyway — but treat 2026 as a miss and institutionalize the T-30 rule (§4, Stage 2).
- **New-content signal:** the GBP-verification guide (2,301-word firsthand operator guide, published 07-27) is the site's best-performing new asset ever at 10 days old: 9 clicks / 368 impr / pos 6.9 / 2.45% CTR in 7d, almost entirely anonymized long-tail (only visible query: `google my business coworking space` 17 impr @ 13.4). This validates the substantive-firsthand-guide format over the templated convention format (0 clicks, uncrawled siblings).

## 3. Alerts triage (2 critical + 15 warnings — ALL DISMISSED)

Applying the 7/29 §2.5 impression floor (≥30 impr/28d on the pair): both criticals fail it — `virtual office with physical address` on Houston providers = 6 impr/14d; `las vegas virtual office address` on the setup guide = 9 impr/28d. Of the 15 warnings, every pair is either low-volume volatility or the setup-guide/Houston-blog sliding **in the intended de-optimization direction** while the site posts record clicks. No real decline anywhere. (The `muze office las vegas` CTR-drop warning fires on /locations/las-vegas — 3 clicks landed there anyway; the query's clicks moved to the homepage at 54.5% CTR.)

## 4. Escalation status (binding check stays 2026-08-27)

Non-binding interim on the §12 watch items (mixed but net improved): `coworking space in las vegas` 16.7 (baseline 29.4, improved), `coworking space las vegas nv` 15.1 (30.5, improved), `virtual office in las vegas` money page 27.9 (28.1, flat), `coworking space las vegas` 21.4 (16.8, worse), `coworking las vegas` 15.4 (flat). Do NOT run the frozen-cohort math early — window 07-30..08-26, evaluated ~08-27 per the pin (primary paired-median trip ≥+3.0; guard diff-of-medians ARMED at 1 of 2).

**Click-condition (a) redefinition — proposed now, to be pinned before the check:** replace the meaningless 2–3-click money-page cohort with: *sitewide clicks on LV-qualified nonbrand queries (same regex as the frozen cohort, ALL pages) drop ≥30% window-over-window AND prior window ≥15 such clicks; else the condition abstains.* Caveat honestly: this is proposed 8 days into the check window with partial visibility of strong data — record it as advisory; the position condition (b) remains the binding test.

---

## 5. Next stages — content & optimisation plan

### Stage 0 — TODAY, blocks everything else [operator]
1. **Commit + deploy the 7/28 recovery patch.** Exact commands in the 7/29 report §3.1 — `git add lib/blog-topic.ts` FIRST (build breaks without it), `git add -u` (never `-A`; .codex/ and franchise/ must not be swept), commit, push, then **manual Vercel promote**. Until this lands: prod serves the contradictory $25/$39 Meeting Room JSON-LD, the 3 retired cannibalizing VO posts stay indexed, and none of the monitoring clocks (VO 45% formal gate, meeting-rooms 21–28d failure clock) can start. 8 days late; every other stage is sequenced behind it.
2. Request Indexing (GSC UI) for the Black Hat post anyway — marginal DEF CON-tail value, 2 minutes.
3. Post-deploy verify: 3 retired slugs 308, sitemap drops to 96 URLs, $39 JSON-LD live on airport/convention pages.

### Stage 1 — this week [operator + next session]
4. GSC UI: Enhancements → Review snippets → confirm/start **Validate Fix** (still pending since June; API-inaccessible).
5. **G2E refresh NOW, not September.** G2E is Sep 28; T-30 lands ~Aug 28. The post is "Discovered – currently not indexed" as of 7/29 — enrich/differentiate it (the GBP-guide playbook: firsthand specifics, real logistics, non-template structure), then Request Indexing immediately after the patch deploy. Same treatment for aws-reinvent by ~Oct 30, CES by ~Dec 6. **Standing rule: every timed post gets inspect → enrich → Request Indexing at T-30, verified crawled by T-14.**
6. Drop from queue: GBP-Insights brand-collapse investigation (recovered, §2).

### Stage 2 — weeks 2–4 (post-deploy content & CTR work) [next sessions]
7. **Houston consolidation** (biggest lead pool, ~1,100+ visible houston impr/28d at ~0.7% CTR): reinstate a CTR-bearing seoTitle/description on the providers post on top of the compliance body, AND route the 3-way split in lib/data/blog-links.ts (setup blog links up to providers + /locations/houston). Then one full 28d freeze. Expectations tempered per the 7/29 refuted-causality note — position ~16 is the dominant constraint.
8. **CTR retitle queue, one page per window:** first /blog/virtual-office-vs-po-box-in-nevada (741 impr @ pos 9.1, 0.4% CTR vs 2.8% expected, +18 modeled clicks/mo — the only page-1 asset with a big gap); then hot-desk-vs-dedicated-desk. virtual-office-cost's Jul-8 retitle window has now run — re-read it before touching.
9. **Feed the LLC cluster (proven winner, 2,400/mo head term):** internal links from the po-box-nevada post (pos 9.1), the setup guide, and new posts into /blog/virtual-office-for-llc and /blog/nevada-llc-virtual-office (pos 14, rising). No new generic VO posts (standing rule).
10. **Content cadence — quality over volume (post-spam-update rule stands):** ~1–2 posts/mo maximum, only in the validated GBP-guide format (firsthand operator experience, real numbers, a job-to-be-done no template covers). Candidate topics from the H2 plan that fit: "Registered agent vs virtual office in Nevada" (LLC cluster), "How we run 24/7 access at a staffed-hours coworking space" (supports the day-pass claims + entry-mechanism gap), deposition/training-room niche per meeting pillar. NO new convention posts; refresh-only per the calendar. Skip VMware Explore (Aug 31, T-25, cluster's 0-click record — not worth a rushed net-new post).
11. **Perf + hygiene batch (one code pass):** `fetchPriority="high"` on the two hero images, remove logo `priority`; data-cta on the [cityService] hero primary CTA; decide the texas-LLC CTA routing; 12 unused imports; meeting-guide meta description (its freeze ends with the patch deploy + 28d); compress the 1.7MB AI-post PNG; eslint globalIgnores for .claude/** + franchise/** (or do the §6 worktree cleanup).

### Stage 3 — 2026-08-27 [binding check, next session]
12. Run escalation check-2 exactly per the pin (frozen §12 cohort, window 07-30..08-26; primary paired-median ≥+3.0; guard diff-of-medians ARMED 1-of-2; click condition per §4 proposal, advisory). Same session: formal VO 45%-gate read on the post-deploy window; meeting-rooms failure clock verdict lands ~21–28d after deploy (early Sep if Stage 0 happens now) — the Ahrefs Best-by-links check (7/29 item 10b) must be in hand BEFORE that clock expires since it gates the airport-article redirect decision.

### Stage 4 — September+ [operator-led]
13. Authority plan (7/29 item 10): correct LinkedIn/CoworkingCafe/LANS/Peerspace profiles to canonical data (incl. 24/7 hours), event-organizer/venue link outreach, Ahrefs link checks. Review volume stays off the critical path.
14. Branch/worktree cleanup (7/29 §6: 13 delete / franchise-site hold).
15. Re-measure Houston retitle freeze; revisit convention-cluster consolidation of never-indexed posts if G2E's enrichment also fails to earn a crawl.

---

## 6. Coverage caveats

Trailing MCP windows only (no complete-window re-aggregation except the weekly table, which uses exact daily rows); last 1–2 days possibly incomplete. ~77% of clicks query-anonymized — query-level counts are floors. Houston per-page impression sums are floors (top-100 rows of 190). VO share read on 4 observable head variants (the 5th, `virtual office vegas`, ≈0 impr). No DataForSEO spend, no submissions, no repo mutations beyond this report. Cause of the click surge NOT established from GSC data — candidates (CanvasRebel feature, GBP factors, seasonal) unproven.
