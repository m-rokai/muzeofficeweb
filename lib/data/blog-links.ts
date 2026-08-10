/**
 * Curated blog posts to surface from each city-service page. Keyed by
 * `serviceId` (from `services.ts`), not the full city-service slug — the
 * same editorial mapping applies whether the page is Las Vegas or Houston.
 *
 * Slugs must match a file in `content/blog/` with `noindex !== true`.
 * `getRelatedBlogSlugsForService` silently drops any missing slug so a blog
 * deletion never breaks the city-service page at build time.
 *
 * Target 3–5 entries per service: the component renders at most 3, but the
 * extra slack lets us prefer freshness if one of the top picks is removed.
 */
const relatedByService: Record<string, string[]> = {
  coworking: [
    "day-pass-coworking-las-vegas",
    "hot-desk-vs-dedicated-desk-vs-private-office",
    "coworking-for-creators-in-las-vegas",
    "coworking-spaces-in-las-vegas-the-best-of-both-worlds",
    "how-to-maximize-productivity-in-your-coworking-space-in-las-vegas",
  ],
  // The indexed LV money page renders the first 3. We deliberately lead with
  // complementary decision/hub posts — NOT `how-to-set-up-a-virtual-office-in-
  // las-vegas`, which is an exact-match competitor for the money page's own
  // head term (and was demoted hard in the June 2026 update). It stays in the
  // array for long-tail value but sits below the rendered top-3.
  "virtual-office": [
    "nevada-llc-virtual-office",
    "virtual-office-for-llc",
    "virtual-office-vs-po-box-in-nevada",
    "virtual-office-cost",
    "6-advantages-of-a-virtual-office-in-las-vegas",
    "virtual-mailboxes-in-las-vegas",
    "nevada-virtual-office-for-out-of-state-founders",
    "how-to-set-up-a-virtual-office-in-las-vegas",
  ],
  "private-office": [
    "private-office-vs-coworking-space",
    "5-benefits-of-private-office-space-in-las-vegas",
    "how-to-choose-private-office-space-rent",
    "private-office-for-seeking-confidentiality",
  ],
  // Same routing rule as virtual-office below: `meeting-space-near-las-vegas-
  // airport` holds "meeting space in las vegas" (pos ~29, Jul 2026) while the
  // /las-vegas-meeting-rooms money page sits ~70 — so it stays OUT of the
  // rendered top-3 here and on conference-rooms. It keeps its top-3 slot on
  // airport-coworking, where it's on-topic rather than a head-term competitor.
  "meeting-rooms": [
    "where-to-work-during-black-hat-def-con-las-vegas",
    "modern-meeting-room-near-ces-las-vegas",
    "what-to-look-for-in-conference-rooms-near-me-getting-the-best-in-las-vegas",
    "podcasting-rooms-in-las-vegas",
  ],
  "conference-rooms": [
    "what-to-look-for-in-conference-rooms-near-me-getting-the-best-in-las-vegas",
    "modern-meeting-room-near-ces-las-vegas",
    "podcasting-rooms-in-las-vegas",
  ],
  "event-space": [
    "how-to-find-the-perfect-event-space-in-las-vegas",
    "3-tips-to-organize-a-successful-event-at-small-party-venues-in-las-vegas",
    "where-to-work-during-black-hat-def-con-las-vegas",
    "where-to-work-during-sema-show-las-vegas",
    "where-to-work-during-nab-show-las-vegas",
    "where-to-work-during-magic-las-vegas",
  ],
  "day-pass": [
    "day-pass-coworking-las-vegas",
    "day-pass-vs-coworking-membership",
    "hot-desk-vs-dedicated-desk-vs-private-office",
    "coworking-for-creators-in-las-vegas",
    "what-is-a-flexible-workspace",
  ],
  "hot-desk": [
    "hot-desk-vs-dedicated-desk-vs-private-office",
    "day-pass-vs-coworking-membership",
    "what-is-a-flexible-workspace",
    "day-pass-coworking-las-vegas",
    "how-to-maximize-productivity-in-your-coworking-space-in-las-vegas",
  ],
  "dedicated-desk": [
    "hot-desk-vs-dedicated-desk-vs-private-office",
    "enhance-desk-privacy-in-coworking-spaces",
    "private-office-vs-coworking-space",
    "day-pass-vs-coworking-membership",
  ],
  "flexible-workspaces": [
    "what-is-a-flexible-workspace",
    "hot-desk-vs-dedicated-desk-vs-private-office",
    "day-pass-vs-coworking-membership",
    "private-office-vs-coworking-space",
    "the-future-of-hybrid-work-coworking-spaces-in-las-vegas",
  ],
  "airport-coworking": [
    "coworking-near-las-vegas-airport",
    "meeting-space-near-las-vegas-airport",
    "day-pass-coworking-las-vegas",
    "where-to-work-during-magic-las-vegas",
  ],
  // Seasonal rotation: the timed convention post for the NEXT upcoming major
  // show gets a rendered top-3 slot here and on meeting-rooms/event-space.
  // Rotate during the monthly SEO session. Currently Black Hat/DEF CON
  // (Aug 1-9, 2026); after mid-August, rotate to the next show and restore
  // `podcasting-rooms-in-las-vegas` to the meeting-rooms top-3.
  "convention-coworking": [
    "where-to-work-during-black-hat-def-con-las-vegas",
    "benefits-of-coworking-near-ces-las-vegas",
    "modern-meeting-room-near-ces-las-vegas",
    "where-to-work-during-sema-show-las-vegas",
    "where-to-work-during-nab-show-las-vegas",
    "where-to-work-during-magic-las-vegas",
  ],
  // Houston-specific variants — most blog content is Las Vegas today, so
  // we lean on format comparisons and the Texas-LLC post for these.
  "galleria-coworking": [
    "virtual-office-for-llc-in-texas",
    "hot-desk-vs-dedicated-desk-vs-private-office",
    "what-is-a-flexible-workspace",
    "day-pass-vs-coworking-membership",
    "private-office-vs-coworking-space",
  ],
  "medical-center-coworking": [
    "virtual-office-for-llc-in-texas",
    "hot-desk-vs-dedicated-desk-vs-private-office",
    "what-is-a-flexible-workspace",
    "private-office-vs-coworking-space",
    "day-pass-vs-coworking-membership",
  ],
};

export function getRelatedBlogSlugsForService(serviceId: string): string[] {
  return relatedByService[serviceId] ?? [];
}
