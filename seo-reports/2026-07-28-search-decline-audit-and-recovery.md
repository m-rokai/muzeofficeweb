# Search Decline Audit and Recovery Patch

Date: 2026-07-28  
Measurement cutoff: 2026-07-27 (last complete Search Console day)

## Executive conclusion

The site is not yet in a confirmed sitewide traffic decline. It is on a plateau
with an early ranking warning:

| Metric | Latest 28 days | Previous 28 days | Change |
| --- | ---: | ---: | ---: |
| Clicks | 126 | 125 | +0.8% |
| Impressions | 15,133 | 15,609 | -3.05% |
| CTR | 0.83% | 0.80% | +0.03 pp |
| Average position | 15.9 | 14.7 | -1.2 positions |

The last four complete weekly position readings worsened from 14.7 to 15.5,
16.2, and 17.0. That is a warning to monitor, not enough evidence for broad
site consolidation.

The homepage is the only page with confirmed three-period content decay:
54 clicks, then 46, then 32, with rankings broadly stable. Its query mix also
contained substantial non-clicking Houston and ambiguous exposure even though
Las Vegas is the only active location.

## What the audit found

### Crawlability and indexation

- Key commercial and editorial URLs are indexed.
- User-selected and Google-selected canonicals match.
- Live robots.txt and sitemap.xml return 200.
- HTTP, www, trailing-slash, and legacy routes resolve through one-hop
  permanent redirects.
- Markdown mirrors use `X-Robots-Tag: noindex, follow`.
- No crawl or canonical emergency explains the trend.

### Query ownership

Virtual office ownership is already moving toward the commercial page, so the
transfer should not be interrupted with broad redirects:

- For `virtual office in las vegas`, the commercial page rose to 154
  impressions at position 28.8 from 39 impressions at position 40.7.
- The setup guide fell to 202 impressions at position 26.9 from 400 at
  position 16.1.
- The provider-comparison article remains the strongest informational result
  and should retain its distinct comparison intent.

Meeting-room ownership is the clearest unresolved conflict:

- `meeting space in las vegas`: airport article 156 impressions at position
  30.4; commercial meeting page 3 impressions at position 66.3.
- The airport article remains indexed because backlink/referral evidence was
  unavailable. Homepage, service-page, and automatic related-article promotion
  to it were removed instead.

Coworking loss is primarily demand/impression loss rather than a ranking loss:

- Commercial coworking page: 10 versus 17 clicks and 588 versus 1,080
  impressions.
- Average position improved from 11.7 to 10.4.
- Exact `coworking space las vegas` position was effectively flat at 16.8
  versus 16.9 while impressions fell from 156 to 45.

### Content quality

Three virtual-office posts had negligible 90-day visibility and contained
obsolete or unsupported offer claims:

| Retired post | 90-day clicks | 90-day impressions | Main risk |
| --- | ---: | ---: | --- |
| `ultimate-benefit-of-a-virtual-office-in-las-vegas` | 0 | 7 | $19 plan and obsolete package claims |
| `maximize-your-success-with-a-virtual-office-space-in-las-vegas` | 0 | 9 | Call-answering and unsupported rent claims |
| `young-workers-hub-find-a-virtual-office-in-las-vegas` | 0 | 4 | Virtual-secretary and generic package claims |

The three posts were removed and both their bare WordPress and `/blog/`
variants now permanently redirect to `/las-vegas-virtual-office`.

External backlink data could not be obtained because the configured provider
returned a payment/credit error. The redirect decision was intentionally
limited to these three factually unsafe, near-zero-demand URLs. No broader
redirects were approved.

### Ahrefs free-dashboard addendum

A 2026-07-28 Ahrefs free-account screenshot adds aggregate authority context:

| Ahrefs estimate | Value |
| --- | ---: |
| US organic traffic | 55 |
| Ranking keywords | 5 |
| Branded keywords / estimated traffic | 2 / 39 |
| Nonbranded keywords / estimated traffic | 3 / 15 |
| Followed referring domains | 45 (11.0%) |
| Nofollow referring domains | 365 (89.0%) |
| Followed backlinks | 70 (15.2%) |
| Nofollow backlinks | 390 (84.8%) |

Ahrefs intent labels overlap: all five tracked keywords are marked
informational, commercial, and local; two are also transactional. The useful
signal is not the modeled traffic total. It is that the visible keyword
footprint is extremely narrow and most estimated traffic is branded, while
most referring domains and backlinks are nofollow.

This supports the authority plan but does not prove which URLs receive the 45
followed referring domains or whether those domains are relevant and trusted.
It therefore does not change the narrow redirect decision. Permanent,
topically matched redirects preserve any useful equity from the three retired
posts, while the airport meeting article remains unredirected until a
page-level backlink/referral check is available.

The next useful Ahrefs evidence is the `Best by links` page-level table and the
backlink/referring-domain report for:

- `/blog/meeting-space-near-las-vegas-airport`
- `/las-vegas-meeting-rooms`
- `/las-vegas-virtual-office`
- the three retired virtual-office slugs

Prioritize followed links from locally or professionally relevant sites. The
aggregate count alone should not be used as a reason to keep weak pages or to
buy mass directory links.

## Changes executed

1. Refocused homepage metadata and hero copy on the active Las Vegas location.
2. Collapsed six inactive Houston service cards into one transparent planned
   location teaser linked to the indexed Houston hub.
3. Reduced repeated Houston language in homepage FAQs while retaining one
   honest Houston availability answer.
4. Replaced homepage links to head-term-competing articles with three
   distinct-intent guides.
5. Removed the airport meeting article from meeting/conference service related
   lists and from automatic related-article promotion.
6. Normalized blog topic classification for related articles and conversion
   CTAs, treating geography as geography rather than a topic.
7. Retitled the informational meeting guide to `How to Book a Meeting Room in
   Las Vegas: Size, AV & Fees`.
8. Corrected two supporting service offers from $25/hr to the verified $39/hr
   meeting-room starting price, including rendered Service JSON-LD.
9. Retired and permanently redirected only the three obsolete virtual-office
   posts listed above.

## Proposals rejected or held

- No redirect for the Las Vegas virtual-office setup guide, provider
  comparison, `6-advantages`, airport meeting article, or coworking article.
- No rewrite or title change to the main virtual-office, coworking, day-pass,
  or meeting-room commercial pages.
- No new generic service/blog pages.
- No mass citation submission and no review-volume dependency.
- No Day Pass hours edits until the operator confirms purchase, activation,
  weekend, and entry rules. Current sources conflict.

## Review-independent authority plan

Reviews are not on the critical path. The next off-site work should prioritize
entity accuracy and earned organizational links:

1. Confirm the real-world business name, public/front-desk hours, access hours,
   exact map pin, and booking prices.
2. Correct high-value owned or industry profiles first. The audit found stale
   identity, pricing, hours, or distance claims on LinkedIn, CoworkingCafe,
   LANS, and Peerspace.
3. Earn links from event organizers, exhibitors, tenant businesses,
   incubators, chambers, and venue directories through useful event pages,
   booking recaps, and permissioned mini case studies.
4. Do not invent testimonials, customer counts, or logo relationships.

## Monitoring plan

Use complete 28-day windows and fixed nonbrand Las Vegas query cohorts. Do not
judge the patch from aggregate position alone.

### Virtual office

- Track the commercial page's impression share across five head variants.
- Success: share exceeds 45% and median position improves by at least five.
- Escalate only if the transfer reverses in two consecutive checks.

### Meeting rooms

- Track the commercial page against the airport article for
  `meeting space in las vegas`.
- Success: commercial page reaches at least 10% impression share or position
  improves above 50.
- If it fails after 21–28 days, complete a manual backlink/referral check,
  merge unique airport material into the commercial page, and then reconsider
  a permanent redirect.

### Homepage

- Track `muze office`, `muze office las vegas`, and Las Vegas nonbrand queries.
- Exclude all Houston queries and ambiguous `muze` queries from the recovery
  cohort.
- Freeze homepage metadata for one full 28-day measurement window.

### Sitewide escalation threshold

Escalate only if nonbrand Las Vegas commercial clicks fall at least 15%, or the
fixed-cohort median position worsens by at least three positions, in two
consecutive complete checks.

## Verification

- Targeted ESLint: passed.
- Next.js 16.2.6 production build: passed, 225 static pages generated.
- All 12 tested removed-path variants (bare, `/blog/`, and trailing slash)
  return one-hop 308 redirects to `/las-vegas-virtual-office`.
- Deleted posts are absent from the generated sitemap.
- Desktop and mobile browser checks: page rendered, one H1, no horizontal
  overflow, no Next.js error overlay.
- Supporting airport and convention pages render `$39` meeting-room offers in
  visible content and Service JSON-LD.
- Meeting-guide related articles no longer include the airport article.
