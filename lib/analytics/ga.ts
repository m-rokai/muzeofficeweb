export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

/** Mark these events as key events in the GA4 property. */
export const CONVERSION_EVENTS = new Set([
  "optix_booking_confirmed",
  "optix_tour_confirmed",
  "optix_signup_completed",
  "optix_inquiry_submitted",
]);

export type AnalyticsProperties = Record<
  string,
  string | number | boolean
>;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoogleEvent(
  name: string,
  properties?: AnalyticsProperties,
) {
  if (
    !GA_MEASUREMENT_ID ||
    typeof window === "undefined" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("event", name, properties ?? {});
}
