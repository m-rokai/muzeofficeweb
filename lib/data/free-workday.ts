// Single source of truth for the "tour, then work here free for a day" offer.
// The popup and the city-service CTA both derive from this list so the two
// surfaces can never drift apart.
export const FREE_WORKDAY_SERVICE_IDS = [
  "coworking",
  "hot-desk",
  "dedicated-desk",
  "private-office",
] as const;

export function isFreeWorkdayService(serviceId: string): boolean {
  return (FREE_WORKDAY_SERVICE_IDS as readonly string[]).includes(serviceId);
}

/** Paths where the free-workday popup may appear (Las Vegas only). */
export const FREE_WORKDAY_PATHS = new Set<string>([
  "/",
  "/workspace-memberships",
  "/locations/las-vegas",
  ...FREE_WORKDAY_SERVICE_IDS.map((id) => `/las-vegas-${id}`),
]);
