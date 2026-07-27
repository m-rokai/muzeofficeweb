"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { getFirstTouchAttribution } from "@/lib/analytics/attribution";

const OPTIX_SCRIPT_SRC = "https://muzeoffice.optixapp.com/web-plugin/optix.v1.js";

const OPTIX_CONVERSION_EVENTS = new Set([
  "booking_checkout",
  "booking_confirmed",
  "tour_confirmed",
  "signup_checkout",
  "signup_completed",
  "inquiry_submitted",
]);

type OptixMessage = {
  source?: string;
  form?: string;
  event?: string;
  payload?: Record<string, unknown>;
};

function analyticsValue(value: unknown) {
  return typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
    ? value
    : undefined;
}

type OptixBookingWidgetProps = {
  venue: string;
  /** Optix dispatches on the class name: "booking" mounts the resource
   *  booking calendar, "member" mounts the plan signup flow. */
  widgetType?: "booking" | "member";
  helpText?: string;
};

export function OptixBookingWidget({
  venue,
  widgetType = "booking",
  helpText = "Need catering, a custom setup, or help choosing a room? Call",
}: OptixBookingWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    widget.innerHTML = "";
    widget.setAttribute("optix-venue", venue);
    widget.setAttribute("optix-mode", "embed");
    widget.setAttribute("optix-tracking", "1");
    widget.setAttribute("optix-tracking-origin", window.location.origin);

    const optixOrigin = `https://${venue}.optixapp.com`;
    const attribution = getFirstTouchAttribution();

    function handleOptixMessage(message: MessageEvent<unknown>) {
      if (message.origin !== optixOrigin || !message.data) return;

      const data = message.data as OptixMessage;
      if (
        data.source !== "optix-form" ||
        !data.event ||
        !OPTIX_CONVERSION_EVENTS.has(data.event)
      ) {
        return;
      }

      const payload = data.payload ?? {};
      const properties: Record<string, string | number | boolean> = {
        form: data.form ?? "unknown",
        page_path: window.location.pathname,
        landing_path: attribution.landingPath,
        referrer: attribution.referrerHost,
      };

      // Deliberately exclude user_email and opaque customer IDs. Conversion
      // analytics need the product and value, not personally identifiable data.
      const safePayloadFields = [
        "resource_name",
        "location_name",
        "plan_name",
        "pass_name",
        "subtotal",
        "total",
      ] as const;

      for (const field of safePayloadFields) {
        const value = analyticsValue(payload[field]);
        if (value !== undefined) properties[field] = value;
      }

      const campaignProperties = {
        utm_source: attribution.utmSource,
        utm_medium: attribution.utmMedium,
        utm_campaign: attribution.utmCampaign,
      };
      for (const [parameter, value] of Object.entries(campaignProperties)) {
        if (value) properties[parameter] = value;
      }

      track(`optix_${data.event}`, properties);
    }

    window.addEventListener("message", handleOptixMessage);

    const script = document.createElement("script");
    script.async = true;
    script.src = OPTIX_SCRIPT_SRC;
    document.body.appendChild(script);

    return () => {
      window.removeEventListener("message", handleOptixMessage);
      script.remove();
    };
  }, [venue]);

  return (
    <div className="rounded-2xl border border-[#E6E4DF] bg-white p-3 shadow-sm sm:p-5">
      <div
        ref={widgetRef}
        className={`optix-${widgetType}-widget min-h-[560px]`}
      />
      <p className="mt-4 text-sm text-[#74726D]">
        {helpText}{" "}
        <a
          href="tel:+17023707515"
          className="font-medium text-[#1A1A1A] underline underline-offset-2"
        >
          (702) 370-7515
        </a>
        .
      </p>
    </div>
  );
}
