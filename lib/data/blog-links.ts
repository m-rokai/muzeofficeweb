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
  "virtual-office": [
    "nevada-llc-virtual-office",
    "virtual-office-for-llc-in-texas",
    "6-advantages-of-a-virtual-office-in-las-vegas",
    "virtual-mailboxes-in-las-vegas",
    "the-3-top-perks-of-a-virtual-business-address-in-las-vegas",
  ],
  "private-office": [
    "private-office-vs-coworking-space",
    "5-benefits-of-private-office-space-in-las-vegas",
    "how-to-choose-private-office-space-rent",
    "advantages-of-our-private-office-space",
    "private-office-for-seeking-confidentiality",
  ],
  "meeting-rooms": [
    "modern-meeting-room-near-ces-las-vegas",
    "meeting-space-near-las-vegas-airport",
    "what-to-look-for-in-conference-rooms-near-me-getting-the-best-in-las-vegas",
    "podcasting-rooms-in-las-vegas",
  ],
  "conference-rooms": [
    "what-to-look-for-in-conference-rooms-near-me-getting-the-best-in-las-vegas",
    "modern-meeting-room-near-ces-las-vegas",
    "meeting-space-near-las-vegas-airport",
    "podcasting-rooms-in-las-vegas",
  ],
  "event-space": [
    "how-to-find-the-perfect-event-space-in-las-vegas",
    "3-tips-to-organize-a-successful-event-at-small-party-venues-in-las-vegas",
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
  "convention-coworking": [
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
