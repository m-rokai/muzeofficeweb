"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";
import { captureFirstTouchAttribution } from "@/lib/analytics/attribution";

/**
 * Single delegated click listener that fires Vercel Analytics events for
 * tel:/mailto:/external CTA clicks. These are the dominant "false bounces"
 * on this site — single-pageview sessions that ended in a real conversion
 * (calling Muze, emailing access@, opening Maps for directions).
 */
export function EngagementTracker() {
  useEffect(() => {
    captureFirstTouchAttribution();

    function handler(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // CTA tracking via `data-cta`. Lives on whichever element we want
      // attributed (anchor or button), and beats href-pattern matching
      // because the same href can mean different things in different slots.
      const ctaEl = target.closest?.("[data-cta]") as HTMLElement | null;
      const cta = ctaEl?.dataset.cta;
      const location = ctaEl?.dataset.ctaLocation;
      if (ctaEl) {
        if (cta) track("cta_click", location ? { cta, location } : { cta });
      }

      const link = target.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      if (href.startsWith("tel:")) {
        track("tel_click", { number: href.replace("tel:", "") });
        return;
      }

      if (href.startsWith("mailto:")) {
        track("mailto_click", { address: href.replace("mailto:", "") });
        return;
      }

      if (href.startsWith("http")) {
        try {
          const url = new URL(href);
          if (url.hostname === window.location.hostname) return;
          track("outbound_click", {
            host: url.host,
            source_path: window.location.pathname,
            ...(cta ? { cta } : {}),
            ...(location ? { location } : {}),
          });
        } catch {
          // Ignore malformed URLs.
        }
      }
    }

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
