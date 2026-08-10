# Full Diagnostic Synthesis — muzeoffice.com — 2026-07-29

Read-only diagnostic. 12 evidence tracks ran 2026-07-29; material findings were adversarially verified (verification status cited inline: CONFIRMED / REFUTED / UNVERIFIED-LOW). GSC property: `https://muzeoffice.com/`. Last complete GSC day: 2026-07-27. The working tree contains the uncommitted 2026-07-28 Codex recovery patch; prod = master tip `0be1edfc`.

---

## 1. Executive conclusion

**Escalation: DO NOT ESCALATE** (CONFIRMED). The nonbrand-LV-money-page click condition did not trip (cohort clicks 2→3, prior 2026-06-03..06-30 vs current 2026-07-01..07-28), the ≥3-position median condition trips only under one estimator (diff-of-medians +5.5/+7.7) while the typical query actually improved (paired per-query median deltas −0.7 to −1.5), and this is check 1 of the required 2 consecutive complete-window checks. Because the 7/28 rule names neither the query qualification nor the median estimator, the ~2026-08-27 re-check is now **construction-pinned before the August data exists** (§2.3 + §12 frozen 41-query cohort): primary = paired per-query median delta (trip ≥ +3.0; currently −0.7, improved), plus a **binding secondary guard** on the literal LV-qualified diff-of-medians reading, which already tripped once (+5.5) — a second guard trip in August escalates to operator review regardless of the primary. Separately, all GSC check_alerts (2 critical + 10 warning) were triaged and dismissed as low-volume volatility (§2.5) — none is a real decline.

**Uncommitted patch: SAFE TO COMMIT** (CONFIRMED) — all 9 audit claims are implemented correctly, build passes (225/225 static pages), redirects are one-hop 308s with zero chains. **One mandatory step: `git add lib/blog-topic.ts` before committing** — it is untracked while two tracked modified files import it; committing without it breaks the production build (CONFIRMED, reproduced with TS2307). Every day undeployed, the live site keeps serving the stale $25/hr Meeting Room JSON-LD the audit corrected, keeps the 3 retired VO posts indexed (one recrawled 2026-07-27), and none of the audit's monitoring clocks can start.

**Biggest lead opportunity:** the Houston zero-click pool — 2,431 Houston-query impressions / 1 click / 0.041% CTR on `/blog/best-virtual-office-providers-in-houston` (2026-06-30..07-27), ~52 modeled extra clicks/mo page-wide — plus a newly catalogued 3-way Houston cannibalization split. Caveat (one verifier REFUTED the causal framing): the July-2 price-anchor title earned 0 clicks during its own 11-day live window, so position (~16, page 2) is the dominant driver; treat the retitle as a cheap experiment, and the internal-link consolidation of the 3-way split as the structural fix. **Most time-critical item:** the Black Hat/DEF CON post has never been crawled by Google and its only demand window (Hacker Summer Camp, ~Aug 2–7; post frontmatter says Aug 1–9) starts in days — Request Indexing via GSC UI today (CONFIRMED).

**Predecessor queues reconciled:** §10 now records a disposition for every open item from the July-1 report and the 7/28 audit — done/superseded: VO cost-comparison table (its #1 revenue priority, shipped 96edc815), meeting-rooms routing/title; rejected with evidence: GBP review-volume push (superseded by the 7/28 review-independent stance; GBP quantified anyway at 11 reviews / 4.6, §4.4), the "6860 Bermuda Rd" address-nav play (zero GSC demand for the correct address); re-queued after being silently dropped: the 7/28 authority plan including the Ahrefs Best-by-links check that gates the airport-article redirect decision (§10.10). (The podcast-studio/salon-suites item briefly re-queued as §10.11 was WITHDRAWN in post-synthesis review — the operator already closed it on 2026-07-02; see the §10 table.)

---

## 2. Trend line, weekly series, escalation math

### 2.1 Monthly 28d trend (continued from the July 1 report)

| Window (28d) | Clicks | Impr | CTR | Avg pos |
|---|---|---|---|---|
| May 12 – Jun 8 (July-1 report) | 133 | 13,117 | 1.01% | 14.7 |
| Jun 4 – Jul 1 (July-1 report) | 119 | 15,519 | 0.77% | 14.8 |
| **Jun 2 – Jun 29 (prior, this run)** | **125** | **15,609** | **0.80%** | **14.72** |
| **Jun 30 – Jul 27 (current, this run)** | **126** | **15,133** | **0.83%** | **15.82** |

Clicks flat (+0.8%), impressions −3.0%, position −1.10. Exactly reproduces the 7/28 audit's 126/125 plateau reading (CONFIRMED).

### 2.2 Weekly position series (complete weeks, exact daily aggregation)

| Week | Clicks | Impr | Pos |
|---|---|---|---|
| 2026-06-16..06-22 | 24 | 4,138 | 14.49 |
| 2026-06-23..06-29 | 14 | 3,925 | 15.03 |
| 2026-06-30..07-06 | 20 | 4,047 | 14.72 |
| 2026-07-07..07-13 | 42 | 3,987 | 15.52 |
| 2026-07-14..07-20 | 35 | 3,452 | 16.22 |
| 2026-07-21..07-27 | 29 | 3,647 | 17.00 |

The audit's 4-week worsening series 14.72→15.52→16.22→17.00 is CONFIRMED exactly; it has NOT "continued" because no newer complete week exists. Weekly clicks simultaneously recovered off the late-June trough (14→20→42→35→29). The position worsening is partly mix-driven: the VO money page tripled impressions on `virtual office in las vegas` at pos ~28 (strategically positive). Partial day 2026-07-28: pos 12.8 on 822 impressions (highest impression day in 60d) — noted, not evidence.

### 2.3 Escalation-threshold math (rule: audit lines 200–204)

Rule: escalate if (a) nonbrand LV commercial clicks fall ≥15% OR (b) fixed-cohort median position worsens ≥3 — in TWO consecutive complete 28d checks.

Cohort: pages `^https://muzeoffice.com/las-vegas-`, queries excluding `(?i)(muze|houston)`. Windows tool-anchored +1 day (2026-07-01..07-28 vs derived 2026-06-03..06-30; 7/28 partial, both windows shifted equally).

| Test | Prior | Current | Trip? |
|---|---|---|---|
| (a) Cohort clicks | 2 (verifier re-derivation: 1; ≤2 either way) | 3 | NO (+1) |
| (b) Fixed cohort n=76, diff-of-medians | 32.3 | 33.8 | NO (+1.5) |
| (b) LV-qualified n=41, diff-of-medians | 23.9 | 29.4 | **YES (+5.5)** |
| (b) LV-qualified impr≥3 n=24, diff-of-medians | 21.1 | 28.8 | **YES (+7.7)** |
| (b) Paired per-query median deltas | — | −0.7 to −1.5 (IMPROVED) | NO |
| (b) Impression-weighted mean | — | +1.4 to +2.8 | NO |

Verdict (CONFIRMED): DO NOT ESCALATE — the trip is estimator-dependent (a distribution artifact: VO head terms improved from ~40s to ~30s while two coworking variants crossed the median downward), and this is check 1 of 2. **The click test is statistically meaningless as written** (CONFIRMED): the money-page cohort has only 2–3 visible nonbrand clicks per window (site-wide 127, window 2026-07-01..07-28), so a single click trips 15%. Verifier correction: the sub-claim "nonbrand LV commercial clicks mostly land on blogs" was REFUTED — all 3 visible nonbrand LV clicks landed on money pages; it holds only for the VO vertical. Redefine the click condition (include LV commercial blogs, or use impressions/position as primary) before the next check.

Yellow flags for the next check: `coworking space in las vegas` 17.7→29.4, `coworking space las vegas nv` 16.8→30.5, head `coworking space las vegas` money-page impressions 156→46 at flat position (16.9→16.8).

**Pinned construction for the ~2026-08-27 check (fixed NOW, before August data exists).** The 7/28 rule is estimator-silent — it names neither the query qualification nor the median estimator, and its own preamble ("fixed nonbrand Las Vegas query cohorts", audit lines 174–175) textually favors the LV-qualified cohort, i.e. the construction that TRIPS (+5.5). Sensitivity was independently reproduced from stored check-1 data (all four estimator/cohort combinations match the table above exactly; in the n=41 LV cohort **25 of 41 queries improved** yet diff-of-medians reads +5.5 — a median-crossing composition artifact). To stop the Aug-27 verdict being decided by post-hoc estimator choice, the check is pinned as follows:

- **Cohort:** the FROZEN 41-query LV-qualified list in §12 — pages `^https://muzeoffice\.com/las-vegas-`, queries excluding `(?i)(muze|houston)` AND matching `(?i)(vegas|nevada|\bnv\b|henderson)`. Deliberately the STRICTER audit-literal cohort (the one that tripped), so the qualification cannot be accused of being picked to avoid escalation. Baseline = per-query positions frozen from 2026-07-01..07-28 (§12); match key `query.strip().lower()[:60]`; evaluate members with ≥1 impression in the check window; add no new queries.
- **PRIMARY estimator (verdict-deciding):** median (Python `statistics.median`) of per-query position deltas vs the frozen baseline; **trip iff ≥ +3.0**. It answers "did the typical fixed-cohort query worsen" and is invariant to the composition artifact.
- **SECONDARY binding guard:** diff-of-medians on the same frozen cohort (check-window median − frozen baseline median 29.4). This estimator ALREADY TRIPPED at check 1 (+5.5); **a second trip (≥ +3.0) in August = two consecutive trips under the literal LV-qualified reading → escalate to operator review regardless of the primary.** The guard exists precisely so the primary-estimator choice cannot bury the literal reading.
- **Tertiary (context only, never verdict-deciding):** impression-weighted mean on the frozen cohort; ALL-nonbrand n=76 variants.
- **Counter:** check 1 = primary NOT tripped (−0.7, improved); guard TRIPPED (1 of 2 — **ARMED**). Expected check-2 window 2026-07-30..08-26 (complete ~2026-08-27); if tool anchoring forces a partial-day shift, shift both windows identically and say so.
- Click condition (a) remains open for redefinition as recommended above; the pin covers only the position condition (b).

### 2.4 Homepage decay (CONFIRMED)

30d periods ending 2026-07-27: 54 (04-29..05-28) → 46 (05-29..06-27) → 32 (06-28..07-27) clicks — the only 3-period-decaying page. Exact 28d: 43c/3,427i/pos 18.28 (06-02..06-29) → 31c/1,764i/pos 16.04 (06-30..07-27). **Impression-led, not ranking loss** — position improved 2.24 while impressions halved; ~330 of the lost impressions are zero-click ambiguous bare-"muze" exposure (462→134, 0 clicks both windows). Watch item (CONFIRMED): **`muze office las vegas` on the homepage went 6 clicks/37 impr/pos 2.6 → 0 clicks/38 impr/pos 3.1** — a navigational-brand CTR collapse at stable top-3 position. Not diagnosable in GSC; check GBP Insights and do one manual SERP look before the next check (the GBP profile itself was read live 2026-07-29: 11 reviews / 4.6 — quantified in §4.4). (Nuance: all 6 prior clicks came on days ranked #1–2.8; the current window has one #1 day, so there is a mild rank-mix component.)

### 2.5 GSC check_alerts triage (previously orphaned between tracks)

The indexation track surfaced **2 critical + 10 warning check_alerts** (tool window 2026-07-22..07-28) and deferred them to the decline track, which never picked them up — closed here. A fresh run (tool-fixed rolling window 2026-07-23..07-29, necessarily includes 2 incomplete days) returned 2 critical + 7 warnings; 3 of the prior day's warnings had already aged out on a 1-day window shift — itself evidence these are volatility, not trend. **Triage verdict: ALL DISMISSED — no alert survives as a real standalone decline:**

- CRITICAL "muses realm" on / (pos 18→93): **3 impressions TOTAL** in 2026-07-02..07-29, each a single-impression day (pos 69 / 18 / 93), 0 clicks. The alert compares two single-impression data points; the query is commercially irrelevant.
- CRITICAL "virtual office las vegas nevada" on /blog/6-advantages-of-a-virtual-office-in-las-vegas (34.5→83): **5 impressions/28d**, driven by 1 impression at pos 83 on 07-26. The page runs 0–12 impr/day all month with no late-July step change — directionally consistent with the already-documented spam-update VO-blog demotion, no new signal.
- 7 warnings: every pair sits at 2–71 impressions/28d where 1–2 impressions or a single click flips the metric. The most alarming-looking one — Houston providers CTR 6.25%→0% — is the loss of **one click** (71 impr / 1 click / pos 10.7 over 28d); the page itself is flat 2026-07-02..07-29 (~120–280 impr/day, pos 12–20).

The only substantive pattern the alerts brush against — the Houston zero-click pool ("virtual office houston" 634 impr / 0 clicks / pos 14.3, 2026-07-02..07-29) — is already tracked in §5.2. **Process fix:** check_alerts applies no impression floor; future audits should require a minimum impression count (e.g. ≥30 impr/28d on the query-page pair) before treating an alert as actionable. Note the tool window is rolling-7d and cannot be pinned to complete GSC days.

---

## 3. Codex work review

### 3.1 Uncommitted recovery patch — verdict: SAFE TO COMMIT (CONFIRMED)

13 modified/deleted files + new untracked `lib/blog-topic.ts` (+117/−262). `npx tsc --noEmit` exit 0; scoped eslint 0 errors; `npm run build` exit 0, 225/225 static pages (matches 7/28 baseline). GSC independently confirms the 3 retired posts had 0 clicks / 9, 7, 6 impressions (pos 9.1/19.7/32.5) over 2026-04-30..07-28 (CONFIRMED) — deletion destroys no traffic.

| # | Audit claim | Implemented? | Evidence / issues |
|---|---|---|---|
| 1 | Homepage metadata + hero refocused on LV | YES | app/page.tsx:46-49 (title/description/canonical), :113 hero; OG retained |
| 2 | 6 Houston service cards → 1 waitlist teaser | YES | app/page.tsx:238-267 → /locations/houston#waitlist |
| 3 | Houston FAQ language reduced, 1 honest answer kept | YES | app/page.tsx:77-87 |
| 4 | Homepage featured posts replaced (distinct-intent) | YES | app/page.tsx:465-474; all 3 slugs exist, none noindexed |
| 5 | Airport meeting article de-promoted from meeting/conference lists | YES | lib/data/blog-links.ts:47-57 removed; app/blog/[slug]/page.tsx:33-35 exclusions; deliberately kept on airport-coworking (on-topic) |
| 6 | Normalized blog topic classification | YES, with risk | new lib/blog-topic.ts + components/blog/blog-cta.tsx:135-140; zero harmful regressions across all 70 posts (verifier correction: 70 post-patch, not 72; 13 CTA changes are intentional, see §8) — **file is UNTRACKED, must be git-added** |
| 7 | Meeting guide retitled | YES | content/blog/meeting-rooms-in-las-vegas-booking-guide.mdx:2; minor: meta description (line 6) still opens with the de-optimized head term (UNVERIFIED-LOW; fix in a later content pass, not during the freeze) |
| 8 | Two $25/hr offers corrected to $39/hr incl. JSON-LD | YES | lib/data/services.ts:526, :578 → 39; renders via components/seo/service-schema.tsx:27-58 |
| 9 | 3 obsolete VO posts retired + permanent redirects | YES | 3 mdx deletions; next.config.ts:155-160 (6 rules) + :208 permanent:true; 12 variants all one-hop 308 in built routes-manifest.json, 0 chains among all 340 rules |

No aggregateRating reintroduced (organization-schema.tsx change is alternateName-only); no dangling references to deleted slugs; no new unverified copy claims.

**Suggested commit (commands for the user — NOT executed in this read-only run):**

```bash
# Stage the new module the patch depends on (MANDATORY — build breaks without it)
git add lib/blog-topic.ts
# Optionally track the audit report itself (currently untracked)
git add seo-reports/2026-07-28-search-decline-audit-and-recovery.md seo-reports/2026-07-29-full-diagnostic-synthesis.md
# Stage tracked modifications + deletions ONLY (do NOT `git add -A` — it would sweep .codex/ and franchise/)
git add -u
# Verify nothing unintended is staged (no .codex/, no franchise/)
git status
git commit -m "seo: land 2026-07-28 recovery patch — LV refocus, VO consolidation, price fixes

- Retire 3 zero-value VO posts (0 clicks, 9/7/6 impressions 2026-04-30..07-28) with one-hop 308s to /las-vegas-virtual-office
- Refocus homepage/layout metadata on Las Vegas; collapse Houston cards to a single waitlist teaser
- Normalize blog topic classification (lib/blog-topic.ts) with Houston waitlist CTA gating
- De-promote airport meeting article from meeting/conference related lists; retitle the meeting booking guide
- Correct two \$25/hr Meeting Room tiers to the verified \$39/hr (visible pricing + Service JSON-LD)"
git push origin master
# Push builds only a PREVIEW deployment — production needs a manual promote (verified 2026-06-09 and 2026-07-01):
printf 'y\n' | vercel promote <new-preview-dpl-id> --scope team_PeFsEju1eYXXiqOmX9ZeMjAE
```

Post-deploy: verify the 3 retired slugs 308 and drop from sitemap.xml in the same deploy, then let Google recrawl naturally (no IndexNow resubmission needed from this audit).

### 3.2 Commit-history review (July 1–28: 14 commits; the stated e39f13d5..HEAD range holds 6, not ~19)

**Day-pass 24/7 contradiction — RESOLVED, with the original framing REFUTED.** Commit `0be1edfc` ("Promote 24/7 Las Vegas day passes", 2026-07-28 12:09 PDT) does assert every dimension the audit listed as unconfirmed — `lib/data/locations.ts:68 is24Hours:true`, `components/seo/local-business-schema.tsx:19` emits `Mo-Su 00:00-23:59` on /, /contact, /book-a-tour, /locations/las-vegas and every live cityService page, visible 24/7 copy sitewide (app/(marketing)/[cityService]/page.tsx:253, app/page.tsx:81+139, lib/data/faqs.ts:80/222/387/634, site-footer.tsx:215, public/pricing.md:54), plus new amenity claims (gigabit fiber WiFi, Herman Miller furniture, bottled water). **BUT the claim that this violated the audit's hold is REFUTED:** the commit (12:09) preceded the audit report (created ~15:58); the operator personally dictated the 24/7 facts, amenities, and same-day/until-midnight rules in the 11:43 Codex session ("commit and deploy"), and the audit's hold was written afterwards as forward-looking. Residual, real risks (CONFIRMED by live checks):
1. The July-23 canonical pricing sheet / GBP / front-desk sources still conflict with the now-live 24/7 claims — if GBP still says Mon–Fri 10–7, JSON-LD contradicts GBP sitewide. Reconcile GBP + external profiles to match, or correct the site. **Update (live Maps read, 2026-07-29): the GBP listing itself already shows "Open 24 hours"** — the GBP-vs-schema mismatch is resolved on Google; the reconciliation item narrows to the other external profiles (LinkedIn/CoworkingCafe/LANS/Peerspace, §10.10) and the July-23 canonical pricing sheet / front-desk sources.
2. No page explains how a day-pass holder physically enters outside front-desk hours (Mon–Fri 10am–7pm) — 24/7 biometric access is marketed as a member feature; the day-pass purchase page hero reads "Open 24 hours, 7 days a week" (CONFIRMED, exhaustive scan found zero entry-mechanism copy). Add one line (door code on activation / usable entry window).

**Stale prices live until deploy (CONFIRMED):** HEAD still publishes Meeting Room $25/hr in visible tiers + Service JSON-LD on /las-vegas-airport-coworking and /las-vegas-convention-coworking (HEAD lib/data/services.ts:526, :578) while the same pages' FAQ JSON-LD says "from $39/hr" — internally contradictory in prod today; and the "$19-a-month plan" claim is live (HEAD content/blog/ultimate-benefit-...mdx:59). Both fixed by the patch.

**b2d098e2 perf/booking commit:** the Optix "false failure overlay" concern is REFUTED — the vendor script (optix.v1.js v1.1.2, de-minified) attaches its iframe synchronously in embed mode, so the synchronous check at components/marketing/optix-booking-widget.tsx:199-205 cannot false-fail today (fragility only if the vendor ever goes async). Conversion tracking survived the rewrite. Ahrefs script demoted to `lazyOnload` (app/layout.tsx:80) — may undercount short visits in Ahrefs analytics only (UNVERIFIED-LOW; accept or restore afterInteractive).

**New posts are not thin** (UNVERIFIED-LOW): GBP verification guide 2,301 words, firsthand case, citations; AI-booking announcement 1,321 words, promotional but original (1.7MB source PNG worth compressing; revisit if the MCP launch slips).

**Spot-checks clean** (cbb641da mobile CTAs + attribution, 1dbb8f9e images, 3cf9388c conversion values, 13017b4c Houston hub) — no broken links or tracking regressions found (UNVERIFIED-LOW).

---

## 4. Monitoring cohorts vs 7/28 baselines

All readings are PRE-PATCH (patch uncommitted/undeployed) — success/fail clocks start at deploy. Windows: PRIOR 2026-06-02..06-29 vs CURRENT 2026-06-30..07-27 unless noted. Method self-verified by reproducing five 7/28-report baselines exactly.

### 4.1 Virtual office (5 head variants; "virtual office vegas" = 0 impressions both windows, effectively 4)

| Page | PRIOR | CURRENT |
|---|---|---|
| /las-vegas-virtual-office | 0c / 83 impr / 42.6 | 0c / 231 impr / 31.0 |
| setup guide (blog) | 2c / 575 / 16.0 | 0c / 316 / 25.7 |
| best-providers-LV (blog) | 0c / 264 / 17.7 | 0c / 52 / 11.3 |
| COHORT TOTAL | 2c / 1,022 / 19.7 | 0c / 672 / 26.5 |

- **Transfer on-trajectory, incomplete** (CONFIRMED): commercial-page impression share 42.2% vs the guide (231/547; 34.4% vs all pages), up from 12.6%; median daily position 44.9→29.5 (+15.4, passes the ≥5 gate). Share is 2.8pts short of the 45% gate. No reversal → no escalation.
- **Total VO head-term visibility shrinking while ownership consolidates** (CONFIRMED, HIGH): cohort −34% impressions page-summed (verifier: −25% deduplicated property-level; direction and total click loss 2→0 hold under both), guide demoted 16.0→25.7. Consistent with continuing spam-update demotion; deploy the patch, don't add redirects.

### 4.2 Meeting rooms — unresolved pre-patch (CONFIRMED)

Exact "meeting space in las vegas", CURRENT: airport article 156 impr @ 30.4 vs /las-vegas-meeting-rooms 3 impr @ 66.3 = **1.9% share** (gate: ≥10% share OR pos <50 — both unmet). Variant set: 2.0% share (4 @ 53.0 vs 196 @ 30.0). 0 clicks on either page, both windows. Expected — the fix is in the undeployed patch; the 21–28-day failure clock (backlink check → merge → possible redirect) starts at deploy.

### 4.3 Homepage brand cohort

Brand cohort ("muze office" + "muze office las vegas"; zero muze+houston queries hit the homepage): 9c/121i @3.0 → 4c/80i @3.5. Standout (CONFIRMED): **"muze office las vegas" 6→0 clicks at flat impressions/position** (see §2.4). "muze office" exact: 3c/84i → 4c/39i. Excluded bare "muze": 458→126 impr, 0 clicks always. LV nonbrand on homepage (vegas-token queries): 127→44 impr, 0 clicks both windows (caveat: non-"vegas" nonbrand queries not captured; UNVERIFIED-LOW). Report homepage health on the brand cohort + clicks, not raw impressions.

### 4.4 Coworking

Exact "coworking space las vegas" on /las-vegas-coworking: 156 impr @ 17.0 → 45 @ 16.8 (−71% impressions, flat position, 0 clicks both windows) — **demand/eligibility loss, not rank loss** (CONFIRMED; verifier correction: the blog-split side figure is 39→17 impr, not 34→17). Monitor-only per the 7/28 plan; reviews/authority remain the lever past pos ~17.

**That residual constraint is now quantified (live GBP read 2026-07-29, Maps place page via Chrome after direct curl was CAPTCHA-blocked):** **11 Google reviews, 4.6 rating** — distribution 10×5★, 0×4★/3★/2★, 1×1★ ((10×5+1)/11 = 4.64 → displayed 4.6; the lone 1-star caps the rating). Movement since the July-1 baseline of 9: **+2 reviews**, vs competitors' 27–151 — still ~2.5–14× below the local-pack field, so the report's causal story (map-pack burial past ~pos 17; the §2.4 "muze office las vegas" brand-click collapse pinned on GBP) stands with the key quantity filled in. The hardcoded site badge matches live GBP exactly (lib/data/locations.ts:116-117, rating 4.6 / reviewCount 11, rendered by components/marketing/google-reviews-badge.tsx:56-57) — no drift; and the /review short link resolves live (307 → g.page review URL, proxy.ts:26-29, constant lib/utils/constants.ts:26). Per the 7/28 audit, review VOLUME stays off the critical path (audit lines 153/159) — the replacement authority plan is re-queued at §10.10.

---

## 5. Opportunities

### 5.1 Striking-distance diff (band pos 8–20, ≥40 impr; current tool window 2026-07-01..07-28 vs July-1 table 2026-06-04..07-01)

**LEFT the band — every high-volume LV commercial head term, all on position** (CONFIRMED; caveat: low-volume LV variants remain in band, e.g. "las vegas virtual po box" 11.2/37 — improved, "coworking space in las vegas" 18.5/29, "private office las vegas" 14.1/26):

| Query | July 1 | Now |
|---|---|---|
| virtual office in las vegas | 13.7 / 485 | 24.2 / 409 |
| best virtual office | 18.1 / 219 | 26.9 / 307 |
| coworking space las vegas | 18.9 / 181 | 22.3 / 61 (−66% impr) |
| virtual office las vegas | 17.5 / 141 | 22.9 / 88 |
| las vegas virtual office | 17.0 / 123 | 21.3 / 67 |

Band now ~58% Houston + ~35% national-generic by impressions (LV ~7%); leader: **virtual office houston 16.3 / 887 / 0 clicks**. Read as the expected mid-flight state of the VO transfer + spam-update demotion, not a new emergency; re-diff after one post-deploy window.

### 5.2 Houston zero-click pool (canonical windows)

| Cut | 06-02..06-29 | 06-30..07-27 |
|---|---|---|
| Page all queries | 3,635 impr / 6 clicks / 0.165% | 5,022 / 12 / 0.239% |
| Houston-containing queries | 2,342 / 0 / 0% | 2,431 / 1 / 0.041% |

Click growth came entirely from generic national VO queries. Repo timeline (CONFIRMED): the Jul-2 CTR retitle (96edc815: "…2026 Prices Compared" + waitlist meta) was overwritten Jul-13 (13017b4c: compliance checklist title, no hooks) — live today. ctr_opportunities models 52 potential extra clicks/mo (5,036 impr @ 0.24% vs 1.27% expected, window 07-01..07-28). **Causality caveat (one verifier REFUTED the "unfixed because overwritten" framing):** the price title earned 0 clicks on ~1,040 impressions during its own Jul 3–13 window and the sole Houston click landed Jul 16 under the new title — position ~16 (page 2) is the dominant driver, and 11 days may not have been a clean SERP test. Action: reinstate a CTR-bearing title/description on top of the compliance-safe body (they are not mutually exclusive), hold one full 28d window, and treat the modeled 52 clicks as an upper bound.

**NEW 3-way Houston cannibalization** (CONFIRMED): "virtual office houston" 1,026 impr = providers blog 651@14.3 + setup blog 278@25.2 + /locations/houston 70@33.2 (window 07-01..07-28); the setup blog trails at pos 25–73 on ≥12 Houston variants. Fix = internal-link routing (same de-optimization used on the LV VO cluster, in lib/data/blog-links.ts), no new pages pre-launch. Also inverted ownership on "nevada virtual office" (LV setup guide 75@18.5 vs the better-ranked po-box-nevada blog 27@11.0).

### 5.3 Brand ambiguity

Bare "muze": 458 impr @ 10.3 (06-02..06-29) → 126 @ 7.7 (06-30..07-27), 0 clicks always — self-resolving at zero click cost; drop from the active queue. New watchlist entry: "moz co-working spaces" 132 impr @ 17.0 / 0 clicks (07-01..07-28). Branded "muze office" healthy: 40 impr / 6 clicks / 15.0% CTR @ 3.1 (tool window).

### 5.4 CTR quick wins beyond Houston (CONFIRMED, ~62 clicks/mo modeled)

Window 07-01..07-28: /blog/how-to-budget-a-corporate-event-in-las-vegas 457@6.7/0.22% vs 5.1% expected (+22 — discount this one: impressions are majority AI-assistant-style prompts); /blog/virtual-office-cost 502@7.8/0.20% vs 4.0% (+19 — already retitled Jul 8, give it its full window); /blog/virtual-office-vs-po-box-in-nevada 508@9.0/0.39% vs 3.2% (+14); /blog/hot-desk-vs-dedicated-desk-vs-private-office 301@9.5/0.33% vs 2.8% (+7). Retitle one at a time after freeze windows expire.

---

## 6. Branch disposition

The failed `branches` track was reconstructed here with read-only git. **14 non-master local branches exist (the task brief said 11).** Summary: **0 merge / 13 delete / 1 hold.**

| Branch | Verdict | Rationale | Conflict risk w/ uncommitted patch |
|---|---|---|---|
| codex/houston-seo-growth | DELETE (local+origin) | Squash-merged as 13017b4c — `git diff` vs squash commit is empty, merge-base = 13017b4c^ (CONFIRMED in commit-review track) | None (already in master) |
| codex/las-vegas-revenue-funnel | DELETE (local+origin) | Squash-merged as 3cf9388c (PR #2) — identical trees | None |
| seo/ahrefs-remediation | DELETE | Strict ancestor of master (0 ahead / 21 behind) | None |
| seo/spam-update-content-hardening | DELETE | Strict ancestor of master (0 ahead / 14 behind) | None |
| franchise-site | **HOLD** | Active dev (25 ahead / 27 behind, worktree at ~/Desktop/muze-franchise-web); all 86 changed files live under the isolated franchise/ sub-app — zero root-level file overlap; per memory, financials are intentional placeholders | **None** — touches no root patch file |
| worktree-agent-a05a44a2 | DELETE + `git worktree remove` | Apr-19 agent experiment (Service JSON-LD) — superseded: components/seo/service-schema.tsx exists in master | None if deleted; do NOT merge |
| worktree-agent-a21c1e37 | DELETE + worktree remove | Apr-19 (remark-gfm + tier fix) — remark-gfm already in master package.json | Touches app/blog/[slug]/page.tsx if merged — do NOT merge |
| worktree-agent-a2879840 | DELETE + worktree remove | Apr-19 (homepage OG fix) — superseded | Touches app/layout.tsx if merged — do NOT merge |
| worktree-agent-a689ef8c | DELETE + worktree remove | Apr-19 (FAQ copy) — superseded | None |
| worktree-agent-a6d7bb15 | DELETE + worktree remove | Apr-19 (VO page copy) — superseded | Touches lib/data/services.ts if merged — do NOT merge |
| worktree-agent-a70bcfa2 | DELETE + worktree remove | Apr-19 (day-pass/hot-desk/dedicated-desk pages) — all three pages exist in master city-services | Touches app/page.tsx + services.ts if merged — do NOT merge |
| worktree-agent-aa4e2205 | DELETE + worktree remove | Apr-20 (flexible-workspaces page) — exists in master | Touches services.ts if merged — do NOT merge |
| worktree-agent-ab3f4660 | DELETE + worktree remove | Apr-19 (Houston slug parity) — exists in master | None |
| worktree-agent-ae7434c1 | DELETE + worktree remove | Apr-19 (conference-rooms pages) — exist in master | Touches services.ts if merged — do NOT merge |

All 9 worktree-agent-* branches are 76–88 commits behind, each 1–2 commits ahead with features independently re-landed in master; each is checked out in a registered worktree under `.claude/worktrees/` whose stale `.next/` artifacts are exactly what makes `npm run lint` fail with 4,336 errors (see §7). Cleanup commands for the user (NOT executed): `git worktree remove .claude/worktrees/agent-<id>` then `git branch -D worktree-agent-<id>`; `git branch -d seo/ahrefs-remediation seo/spam-update-content-hardening codex/houston-seo-growth codex/las-vegas-revenue-funnel`; `git push origin --delete codex/houston-seo-growth codex/las-vegas-revenue-funnel`.

---

## 7. Live production health (all live checks 2026-07-29)

- **Deploy currency:** prod = master tip 0be1edfc, proven via /pricing.md etag + 0be1edfc-only strings; recovery patch NOT deployed (live homepage title still pre-patch; 3 retired VO slugs still HTTP 200 AND in the live sitemap AND "Submitted and indexed" — maximize-your-success recrawled 2026-07-27T16:44Z) (CONFIRMED).
- **Redirects:** 4/4 required checks single-hop 308 (http→https apex; www→apex; trailing-slash /las-vegas-virtual-office/; legacy /workspace-memberships/virtual-office-in-las-vegas → /las-vegas-virtual-office). Informational: http://www is a standard 2-hop Vercel chain (UNVERIFIED-LOW, pass).
- **robots/sitemap:** robots.txt healthy; live sitemap 99 URLs (= HEAD render); GSC-registered copy 98, stale by one deploy (lastDownloaded 2026-07-27T18:43Z; a resubmission happened then — not by this diagnostic). July-1 "101 URLs" baseline is unreconstructable (older deployed build); treat **99 as the go-forward baseline** (96 post-patch). "indexed: 0" remains a known API artifact.
- **Indexation:** homepage + all 4 LV money pages "Submitted and indexed", canonicals match, crawls 2026-07-15..07-26, zero issues (UNVERIFIED-LOW). GBP-verification post (Jul 27) "Discovered – currently not indexed", never crawled — normal 2-day lag, re-inspect ~Aug 5. AI-assistants post indexed (crawled 07-22).
- **Schema:** every JSON-LD block on the 4 money pages parses; **zero aggregateRating anywhere** (June fix holding); NAP consistent (+17023707515, 6860 Bermuda Rd Suite 200, LV NV 89119); $39 Huddle Offer + UnitPriceSpecification on /las-vegas-meeting-rooms. Exception until deploy: stale $25 Meeting Room Offer JSON-LD on airport/convention coworking pages (CONFIRMED, §3.2). LocalBusiness now declares Mo-Su 00:00-23:59 (0be1edfc) — reconcile with GBP (§3.2).
- **CWV — lab (Chrome DevTools, Slow-4G/4x-CPU mobile 412x823; single runs):** LCP 1231 ms (/) and 1584 ms (/las-vegas-virtual-office), CLS 0.00 both; desktop approx 332 ms. **Field: none** — no page-level CrUX data for either page; PSI API completely unavailable (HTTP 429, keyless project quota 0, CONFIRMED) so origin-level field data and TBT/INP are blind spots. b2d098e2's <2.5s promise holds on lab evidence only (UNVERIFIED-LOW).
- **LCP fix available (CONFIRMED):** hero images are preloaded WITHOUT fetchpriority=high, costing ~580 ms queue delay = 47% of homepage mobile lab LCP. One-word fix per Next 16's bundled docs: replace bare `preload` with `fetchPriority="high"` at app/page.tsx:100 and app/(marketing)/[cityService]/page.tsx:225; also remove deprecated `priority` from the logo (components/layout/site-header.tsx:26). Secondary (UNVERIFIED-LOW): /_next/image serves cache-control max-age=0 (consider images.minimumCacheTTL); VO page has an unexplained 405 ms render delay (opacity-40 hero).
- **Render checks:** both pages pass at mobile viewport — one H1 each, zero horizontal overflow, above-fold CTAs visible (UNVERIFIED-LOW).
- **IndexNow:** key file live, HTTP 200 text/plain, correct body (UNVERIFIED-LOW). No submissions made this run.
- **Review snippets:** fix (commit 7214991) confirmed live — 0 aggregateRating occurrences on all 6 previously affected pages (CONFIRMED); the GSC API exposes no enhancement/Validate-Fix endpoint, so whether the 6 "invalid parent node" errors cleared **requires a manual GSC UI check** (Enhancements → Review snippets).
- **GBP (live Maps read 2026-07-29):** 11 reviews / 4.6 (details §4.4); listing name, NAP (6860 Bermuda Rd #200, (702) 370-7515) consistent with site schema; hours display **"Open 24 hours"** — consistent with the 0be1edfc `Mo-Su 00:00-23:59` schema, narrowing the §3.2 reconciliation to non-Google profiles + front-desk sources. Per-review dates not pulled (Reviews-tab interaction not attempted).
- **Lint gate broken by noise (CONFIRMED):** `npm run lint` (bare `eslint`) exits 1 with 82,426 problems — all 4,336 errors in generated artifacts (.claude/worktrees/*/.next 1,219 files; franchise/.next 136) because eslint.config.mjs globalIgnores covers only root `.next/**`. Real source: 0 errors, 12 unused-import warnings in 4 app/(marketing) pages. Fix: add `.claude/**` + `franchise/**` to globalIgnores (and/or do the §6 worktree cleanup). Build-env nit: stray ~/package-lock.json triggers a workspace-root warning (set turbopack.root or delete it).

---

## 8. Conversion plumbing + blog CTA routing

**Chain intact end-to-end.** Lead delivery is a Server Action → nodemailer → Gmail SMTP as notifications@muzeoffice.com (lib/actions/submit-contact-form.ts:41-56, env `GMAIL_APP_PASSWORD` with graceful fallback) — the "Resend" note in prior docs/memory is stale; app/api/contact/ is an empty leftover dir. `contact_form_submitted` fires with interest/discovery/attribution (components/forms/contact-form.tsx:113-119); Houston waitlist reuses the action with `houston-waitlist` interest + its own events. NOT verifiable read-only: GMAIL_APP_PASSWORD presence in Vercel prod env; event arrival in Vercel Analytics dashboards.

**/review short link works in prod:** HTTP/2 307 → g.page review URL (proxy.ts:25-30) — the old memory note "/review 404 = unpushed commit" is resolved.

**Blog CTA routing (patched tree, all 70 posts classified by verbatim replication of lib/blog-topic.ts):**

| Topic | Posts | CTA target |
|---|---|---|
| virtual office | 12 | /las-vegas-virtual-office |
| coworking (incl. 21 convention + 2 day-pass) | 39 | /las-vegas-coworking |
| meeting | 5 | /las-vegas-meeting-rooms |
| private office | 5 | /las-vegas-private-office |
| event | 4 | /las-vegas-event-space |
| general | 2 | /workspace-memberships |
| **Houston** | 3 | /locations/houston#waitlist |

All CTA hrefs resolve; no Houston post leaks to an LV CTA; no VO post falls to generic; the 3 deleted posts have 308 redirects and zero dangling references (CONFIRMED). **Deploy re-routes 13 posts' CTAs** (11 convention posts meeting→coworking; podcasting general→meeting; flexible-workspace private→coworking) — all intentional; watch the cta_click event mix post-deploy so it isn't misread as breakage.

**Flags:**
1. HIGH (CONFIRMED, §3.1): `lib/blog-topic.ts` untracked while blog-cta.tsx:7-11 and app/blog/[slug]/page.tsx:23-27 import it — `git add` it or the build breaks.
2. MEDIUM (CONFIRMED with corrected wording): the hero PRIMARY CTA on every [cityService] page carries no data-cta (app/(marketing)/[cityService]/page.tsx:274-282) — hero-click attribution is blind on all money pages (pre-existing, not a patch regression). Verifier correction: /las-vegas-coworking is NOT zero-tracked above the fold (header + mobile-sticky CTAs are tracked); the gap is the hero section itself. Add data-cta to the hero primary.
3. MEDIUM (CONFIRMED): `virtual-office-for-llc-in-texas` routes to the LV VO CTA while sibling `virtual-office-vs-po-box-in-texas` routes to the Houston waitlist (classifier keys only on literal "houston", lib/blog-topic.ts:24-28). Nuance: the LLC post deliberately sells the Nevada address to Texas founders, so this may be intentional — decide once: either tag it "Houston" or accept the split; document it.
4. MEDIUM (CONFIRMED): live prod still advertises Meeting Room $25/hr incl. Offer JSON-LD on 2 pages (fixed by patch — §3.2).

---

## 9. Content estate

**Spam-update recovery: NOT eased** (CONFIRMED). The enriched 18-post cohort (commit 6ba57963): 13 clicks / 3,557 impr (2026-06-02..06-29) → 6 clicks / 2,953 impr (2026-06-30..07-27) — clicks −54%. Loss concentrated in the LV VO pair: setup guide 7→1 clicks (pos 14.1→21.8), best-providers-LV 741→198 impr (pos improved 14.6→10.1 = head-term shedding). The money page did NOT pick up the clicks (3→3, pos 15.4→19.3): **net LV VO cluster 12→5 clicks** — the transfer is impression-visible but click-negative at check #1. Hold per the audit's 2-consecutive-checks rule. Bright spots: /blog/virtual-office-for-llc 1c/108 impr/pos 8.2 (from 27 impr/13.6 at Jul-1) and /blog/virtual-office-cost debut 1c/488 impr/pos 7.8 (both 06-30..07-27, UNVERIFIED-LOW) — the healthiest new assets, targeting the 2,400/mo LLC term; feed them internal links. Three enriched posts (designing-your-coworking-space, top-3-benefits, what-to-bear-in-mind) have zero impressions in both windows — dead weight to consolidate later.

**Convention cluster: 0 clicks in BOTH windows** (CONFIRMED, HIGH), impressions 67→40 (−40%); 11 of 18 posts had zero impressions across 2026-06-02..07-28; all 3 sampled zero-impression posts are unindexed and never crawled (black-hat-def-con and g2e "Discovered – currently not indexed"; aws-reinvent "URL is unknown to Google" at first inspection, "Discovered" on re-check). Google declining to crawl near-template siblings is a quality-threshold signal — differentiate or consolidate the weakest never-indexed posts instead of adding more.

**Black Hat / DEF CON — time-critical (CONFIRMED, HIGH):** Hacker Summer Camp runs ~Aug 2–7 (post frontmatter: Aug 1–9) — days away. The post is live, in the sitemap, internally linked from /las-vegas-meeting-rooms and /las-vegas-event-space (verifier correction: the homepage link exists only in the uncommitted patch, so live internal support is weaker than first reported), was enriched for exactly this window (commit d5bc44ba, 2026-07-08), yet Google has never crawled it and the site has 0 impressions on any `black hat|def con|hacker summer` query in 60 days. **Owner: GSC UI → URL Inspection → Request Indexing today**; queue g2e before Oct and aws-reinvent before Dec (T-30).

**Pruned 12 posts (Jul 1):** all sampled redirects one-hop 308 to mapped targets; residual impressions decaying 208→80 with 0 clicks both windows — clean prune (UNVERIFIED-LOW).

**New posts:** GBP verification guide (2026-07-27, 2,301 words) — genuinely substantive, only ~1 complete GSC day so 0 impressions means nothing yet; AI-booking announcement (2026-07-20, 1,321 words) — 34 impr / 0 clicks / pos 8.7 (07-20..07-28), low search value by design (UNVERIFIED-LOW).

---

## 10. Lead-ranked action queue

**Predecessor-queue dispositions (previously dropped without a record):** every forward item from the July-1 report (§4 top-5 + the §3 address play) and the 7/28 audit's authority plan now has an explicit disposition — nothing is silently dropped.

| Predecessor item | Disposition |
|---|---|
| July-1 #1: VO cost-comparison table on the money page (its stated #1 revenue priority) | **DONE** — commit 96edc815 (2026-07-02): `costComparison` data lib/data/city-services.ts:159-197 (Muze $64 vs BSSI $89 / Opus $99+ / Davinci $200+ / Alliance $259+), rendered app/(marketing)/[cityService]/page.tsx:405-473 on /las-vegas-virtual-office |
| July-1 #2: Houston providers CTR retitle | **DONE then overwritten** — 96edc815 shipped it 2026-07-02; 13017b4c (Jul 13) replaced it with the compliance title; correctly **re-queued as item 5** |
| July-1 #3: meeting-rooms internal routing + title | **DONE / SUPERSEDED** — 96edc815 demoted the airport post + "No F&B Minimum" metaTitle; the uncommitted 7/28 patch completes it (meeting retitle, $25→$39 incl. JSON-LD; audit lines 140-142); lands with item 1 |
| July-1 #4: GBP review push 9→30+ (its stated "highest compounding lever") | **REJECTED / SUPERSEDED** by the 7/28 audit ("no review-volume dependency", line 153; "Reviews are not on the critical path", line 159) in favor of its review-independent authority plan — which was itself then dropped; **re-queued as item 10**. Organic movement anyway: 9 → 11 reviews, 4.6 (§4.4) |
| July-1 #5: podcast-studio + salon-suites differentiator pages (verified demand 30–1,600/mo) | **CLOSED by the operator 2026-07-02** (session memory; the gap-fill agent lacked it and mislabeled this FORGOTTEN): do NOT build podcast or salon money pages — podcast room = amenity/serial-booking product, thin-page risk (at most a section inside meeting-rooms/convention copy); salon suites = NO rentable inventory (the space is occupied). **Item 11 withdrawn** |
| July-1 §3: "6860 Bermuda Rd" address-nav play on /locations/las-vegas | **NOT EXECUTED — now REJECTED with evidence:** the page title is "Muze Office Las Vegas — Hours & Directions" (app/(marketing)/locations/[city]/page.tsx:86); GSC 2026-07-02..07-29 (trailing tool window, 7/29 incomplete) shows only **2 bermuda-query rows, both "6590 bermuda rd" — a different building** — 4 impr / 0 clicks, landing on /las-vegas-conference-rooms and /las-vegas-convention-coworking, never /locations/las-vegas. Zero "6860 bermuda" demand; matches the neighborhood-geo verdict. Drop permanently |
| 7/28: review-independent authority plan — profile corrections (lines 164-166), event-organizer links (167-169), Ahrefs "Best by links" check (114-120) | **FORGOTTEN in this queue's first draft** — zero mentions anywhere in the synthesis; **re-queued as item 10**. Note the Ahrefs check GATES the still-held airport-article redirect decision (audit lines 108-112) |

1. **[user-trigger] Commit + deploy the recovery patch — with `git add lib/blog-topic.ts` first** (§3.1 commands). Highest lead impact: fixes the contradictory $25/$39 pricing on two live money pages, completes the VO internal-link routing that the buried money page needs, retires the cannibalizing posts, and starts every monitoring clock. Nothing else in this queue should touch metadata until this lands.
2. **[user-trigger] Request Indexing (GSC UI) for /blog/where-to-work-during-black-hat-def-con-las-vegas — today.** The only demand window is ~Aug 2–7. Then g2e (by Sep) and aws-reinvent (by Nov).
3. **[user-trigger] Operator reconciliation of the 24/7 day-pass claims:** GBP itself already shows "Open 24 hours" (verified live 2026-07-29, §7), so the remaining work is (a) the non-Google external profiles (folds into item 10's profile fixes), (b) the July-23 canonical pricing sheet / front-desk sources, and (c) approve one line of day-pass after-hours entry copy (door code / entry window) for the purchase page. Conversion + trust protection on the page that sells the $25 lead-in product.
4. **[user-trigger] Two 5-minute GSC/GBP UI checks:** (a) Enhancements → Review snippets: confirm/start Validate Fix (API-inaccessible); (b) GBP Insights for the weeks since 2026-06-30 to explain the "muze office las vegas" 6→0 brand-click collapse (§2.4).
5. **[next-session] Houston pool work (biggest lead pool, pre-launch waitlist):** reinstate a CTR-bearing seoTitle/description on the providers post (price hook + waitlist cue on top of the compliance body; expectations tempered per the refuted causality — position is the dominant driver), AND route the 3-way Houston split (make how-to-set-up-houston link up to the providers post + /locations/houston in lib/data/blog-links.ts). One 28d freeze after.
6. **[next-session] LCP fix:** `fetchPriority="high"` on the two hero images (app/page.tsx:100, app/(marketing)/[cityService]/page.tsx:225), remove logo `priority` (site-header.tsx:26). ~0.4–0.5 s lab mobile LCP cut; cheap insurance with zero field data available.
7. **[user-trigger] Branch/worktree cleanup (§6):** remove the 9 stale agent worktrees + branches, delete the 4 merged branches (2 codex local+origin, 2 seo). Also fixes most of the lint noise; alternatively/additionally [next-session] add `.claude/**` + `franchise/**` to eslint.config.mjs globalIgnores so the lint gate means something.
8. **[next-session] CTR retitles, one at a time after freeze windows:** virtual-office-vs-po-box-in-nevada (+14), hot-desk-vs-dedicated-desk (+7); let virtual-office-cost's Jul-8 retitle finish its window; discount the corporate-event page's AI-prompt-inflated +22.
9. **[next-session] Small hygiene batch (with the next code pass, not before deploy):** data-cta on the [cityService] hero primary CTA; decide the texas-LLC CTA question; 12 unused imports; meeting-guide meta description (post-freeze); compress the 1.7MB AI-post PNG; consider images.minimumCacheTTL.
10. **[user-trigger] Execute the 7/28 review-independent authority plan (re-queued — dropped from this queue's first draft):** (a) correct stale identity/pricing/hours on LinkedIn, CoworkingCafe, LANS, and Peerspace to the canonical business data (audit lines 164-166); (b) run the Ahrefs "Best by links" check for /blog/meeting-space-near-las-vegas-airport, /las-vegas-meeting-rooms, /las-vegas-virtual-office and the 3 retired VO slugs (audit lines 114-120) — **this check is the gate on the held airport-article redirect decision** (audit lines 108-112) and must be in hand before the §4.2 failure clock (21–28 days post-deploy) expires; (c) begin event-organizer/exhibitor/venue link outreach (audit lines 167-169). Review VOLUME stays off the critical path per the audit; GBP moved 9→11 organically regardless (§4.4).
11. **WITHDRAWN (post-synthesis correction).** The podcast-studio/salon-suites build decision was already made: **CLOSED by the operator on 2026-07-02** — do not re-pitch (podcast = amenity, not a search-revenue stream; salon = no rentable inventory). The gap-fill agent that re-queued it did not have access to that session memory. Numbering kept so cross-references stay valid.

---

## 11. Coverage appendix

**Failed track:** `branches` — reconstructed in §6 by this synthesis using read-only git (branch list, merge-bases, ahead/behind, tree diffs, file-overlap vs the patch). Residual gap: none material; branch count is 14 non-master vs the 11 the brief expected.

**In-track checks that could not run as specified:**
- GSC MCP tools accept only trailing `days` ending 2026-07-28 (incomplete day): sitewide/homepage/cohort headline numbers were re-aggregated onto exact complete windows from daily rows; the escalation query-cohort could not be (500-row cap), so its windows are shifted +1 day (both windows equally). GSC anonymized queries make cohort click counts floors, not totals (~104 of 127 sitewide clicks are query-anonymized).
- `verify_claim` (trailing-window-only) skipped in gsc-cohorts; exact reproduction of five 7/28 baselines used as the self-check. `cannibalization_check` used only as trailing-window cross-check.
- Review-snippets Validate-Fix status: no GSC API endpoint — manual UI check required (queued, action 4).
- July-1 "101 sitemap URLs" baseline: unreconstructable (older deployed build; no Wayback snapshot; no committed deletions since Jul 1).
- PSI/CrUX API: fully blocked (HTTP 429, keyless quota 0, retried) → no Lighthouse, no field CWV, no TBT/INP. Recommend provisioning a free Google API key for future audits.
- patch-review could not run `next build` under its constraints — covered by the build-verify track (build ran, writes confined to .next/); live curl of the 12 new redirect variants impossible pre-deploy (verified structurally + in routes-manifest instead).
- commit-history: the four Jul 2–8 commits (96edc815, 366f8730, d5bc44ba, 8329364f/add7de2b) were not deep-inspected (outside the priority list; 96edc815/13017b4c title timeline was covered by gsc-opportunities).
- content: only 3 of 11 zero-impression convention posts URL-inspected (all 3 unindexed); LLC-pillar queries ~95% privacy-masked; GBP guide has ~1 day of GSC data.
- conversion: Vercel prod env (`GMAIL_APP_PASSWORD`) and Vercel Analytics event arrival not verifiable read-only; no live send test (would email the business).
- Constraints held throughout: no DataForSEO (balance preserved), no GSC/IndexNow submissions, no repo mutations (this report is the single permitted repo file).

**Gap-fill pass (post-critic, 2026-07-29) — four gaps closed, coverage notes:**
- Predecessor-queue dispositions (§10 table): repo evidence from committed history + working tree; 1 GSC query (bermuda filter) on the trailing 28d window 2026-07-02..07-29, which necessarily includes the incomplete 7/29 (tool constraint).
- check_alerts triage (§2.5): the tool window is rolling-7d and includes incomplete days by design — it cannot be pinned to complete GSC days; 28d context windows stated inline.
- GBP review quantification (§4.4/§7): read from the rendered Google Maps place page via Chrome after direct curl to Google Search/Maps was CAPTCHA-blocked; per-review dates not pulled (would need Reviews-tab interaction, not required for the count).
- Escalation pin (§2.3/§12): recomputed entirely from stored check-1 data (cohort TSV + 56d JSON) — no new GSC pull; sensitivity table reproduced exactly before pinning.

**REFUTED findings (dead; listed because instructive):**
1. "Commit 0be1edfc was made AFTER the 7/28 audit, violating its Day-Pass hold" — REFUTED: the commit (12:09 PDT) preceded the audit (~15:58); the operator dictated the 24/7 facts and amenities at 11:43 and asked to commit/deploy. The residual risks (GBP/schema mismatch, missing entry-mechanism copy, unconfirmed-by-audit claims live in JSON-LD) are real and carried in §3.2/§10.3.
2. "Optix widget can show a false 'could not load' overlay because attach is async" — REFUTED: the vendor script attaches its iframe synchronously in embed mode; no current bug, only a fragility if Optix ever changes that.
3. Causal framing "Houston pool is unfixed BECAUSE the Jul-2 retitle was overwritten" — one verifier refuted causality (0 clicks during the price-title's own window; position is dominant); all underlying numbers stand and are used in §5.2 with the caveat.
4. Sub-claim "nearly all nonbrand LV commercial clicks land on blog pages" — REFUTED: all 3 visible nonbrand LV-commercial clicks landed on money pages (holds narrowly only for the VO vertical).

**PLAUSIBLE-UNCONFIRMED items:** none — every material finding verified out as CONFIRMED or REFUTED. Low-severity findings that received no adversarial verification are labeled UNVERIFIED-LOW inline throughout this report and should be re-checked before being load-bearing in any decision.

**Verifier data corrections adopted in this report:** post count 70 (post-patch) not 72; 13 intentional CTA changes ≠ zero CTA changes; VO cohort −34% is page-summed (−25% deduplicated); escalation prior-window cohort clicks 1–2 (derivation fragile at this magnitude); coworking blog prior impressions 39 not 34; Black Hat "homepage link" exists only in the uncommitted patch (live links: 2 money pages); aws-reinvent index state progressed to "Discovered" on re-inspection; brand-collapse evidence was the exact query "muze office las vegas", not the (?i)muze regex aggregate; enrichment commit hash d5bc44ba (not d5bc44da).

---

## 12. Appendix — FROZEN escalation cohort (binding baseline for the ~2026-08-27 check)

LV-qualified nonbrand cohort, n=41 (construction pinned in §2.3: pages `^https://muzeoffice\.com/las-vegas-`; queries excluding `(?i)(muze|houston)` AND matching `(?i)(vegas|nevada|\bnv\b|henderson)`; match key `query.strip().lower()[:60]`). **BASELINE = 2026-07-01..07-28 per-query positions below — do not re-derive.** Prior window 2026-06-03..06-30 shown for context only. Frozen summary stats: n=41 baseline median **29.4**; impr≥3-both subset n=24 median 28.8; impression-weighted mean 25.5. Check-1 results: primary (paired median delta) −0.7 = no trip; guard (diff-of-medians) +5.5 = TRIPPED, 1 of 2.

| query | prior pos/impr | BASELINE pos/impr |
|---|---|---|
| can i book a flexible hourly meeting room in las vegas, and what cancellation rules should i watch for? | 1.2/2 | 6.0/6 |
| co working space las vegas | 13.7/3 | 16.5/2 |
| coworking las vegas | 16.8/92 | 15.4/67 |
| coworking space in las vegas | 17.7/37 | 29.4/33 |
| coworking space las vegas | 16.9/156 | 16.8/46 |
| coworking space las vegas day pass | 10.8/18 | 4.7/7 |
| coworking space las vegas nv | 16.8/7 | 30.5/8 |
| coworking space las vegas strip | 14.0/2 | 30.0/1 |
| coworking space vegas | 17.7/7 | 17.0/1 |
| coworking spaces las vegas | 20.0/14 | 20.5/2 |
| hybrid event space las vegas | 31.0/2 | 43.0/1 |
| incubase las vegas | 75.9/10 | 74.3/3 |
| is it worth paying for a meeting room in las vegas, or should i use a free space? | 1.0/3 | 6.0/3 |
| las vegas co working space | 19.5/4 | 38.5/2 |
| las vegas coworking space | 18.3/19 | 15.5/4 |
| las vegas shared office space | 23.9/37 | 18.2/20 |
| las vegas virtual office | 47.4/18 | 37.1/35 |
| las vegas virtual office address | 57.5/5 | 41.3/9 |
| las vegas virtual offices | 30.6/2 | 33.8/5 |
| meeting room las vegas | 34.2/7 | 34.0/5 |
| meeting rooms las vegas | 34.6/5 | 37.5/8 |
| meeting space in las vegas | 70.3/1 | 66.3/3 |
| private office las vegas | 14.9/8 | 14.1/24 |
| private office space for rent las vegas | 13.7/3 | 17.5/20 |
| private offices for rent las vegas | 27.8/1 | 21.3/4 |
| shared office space las vegas | 15.5/33 | 14.8/8 |
| small meeting rooms in las vegas | 64.8/1 | 33.8/4 |
| small meeting rooms in las vegas vegas | 79.0/1 | 34.0/1 |
| small meeting rooms las vegas vegas | 56.1/2 | 91.0/1 |
| vegas coworking | 14.4/19 | 16.0/15 |
| vegas coworking space | 16.7/12 | 18.0/1 |
| vegas virtual office | 32.1/3 | 27.0/1 |
| virtual business address las vegas | 16.5/2 | 1.0/1 |
| virtual office in las vegas | 40.3/45 | 28.1/159 |
| virtual office in las vegas nv | 70.0/6 | 34.3/8 |
| virtual office las vegas | 37.1/20 | 31.8/33 |
| virtual office las vegas nevada | 52.0/5 | 42.8/9 |
| virtual office space las vegas | 46.7/13 | 31.9/17 |
| virtual offices las vegas | 32.6/2 | 39.0/2 |
| workspace las vegas | 18.1/11 | 18.0/4 |
| workstation setup las vegas | 42.4/5 | 36.6/5 |

---

*Detail sources: 12 track files in the session scratchpad (gsc-trendline-escalation, monitoring-cohorts, opportunity-refresh, indexation-hygiene, patch-review, commit-review, build-verification, live-prod-checks, cwv-render-checks, conversion-plumbing, content-estate) + read-only git for §6; gap-fill detail files gapfill-0..3 in the same scratchpad (predecessor dispositions, check_alerts triage, live GBP read, escalation-pin computation). Prior baselines: seo-reports/2026-07-monthly-seo-diagnostic.md (Jul 1), seo-reports/2026-07-28-search-decline-audit-and-recovery.md (Jul 28).*
