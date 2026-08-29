import { track as trackVercel } from "@vercel/analytics";
import {
  trackGoogleEvent,
  type AnalyticsProperties,
} from "@/lib/analytics/ga";

/**
 * Send one privacy-safe event to both Vercel Analytics and GA4. GA4 is a
 * graceful no-op until NEXT_PUBLIC_GA_ID is configured and gtag is ready.
 */
export function track(name: string, properties?: AnalyticsProperties) {
  trackVercel(name, properties);
  trackGoogleEvent(name, properties);
}
