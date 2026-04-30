"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Single delegated click listener that fires Vercel Analytics events for
 * tel:/mailto:/external CTA clicks. These are the dominant "false bounces"
 * on this site — single-pageview sessions that ended in a real conversion
 * (calling Muze, emailing access@, opening Maps for directions).
 */
export function EngagementTracker() {
  useEffect(() => {
    function handler(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // CTA tracking via `data-cta`. Lives on whichever element we want
      // attributed (anchor or button), and beats href-pattern matching
      // because the same href can mean different things in different slots.
      const ctaEl = target.closest?.("[data-cta]") as HTMLElement | null;
      if (ctaEl) {
        const cta = ctaEl.dataset.cta;
        const location = ctaEl.dataset.ctaLocation;
        if (cta) track("cta_click", location ? { cta, location } : { cta });
      }

      const link = target.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      if (href.startsWith("tel:")) {
        track("phone_click", { number: href.replace("tel:", "") });
        return;
      }

      if (href.startsWith("mailto:")) {
        track("email_click", { address: href.replace("mailto:", "") });
        return;
      }

      if (href.startsWith("http") && !href.includes("muzeoffice.com")) {
        try {
          const host = new URL(href).host;
          track("outbound_click", { host });
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
