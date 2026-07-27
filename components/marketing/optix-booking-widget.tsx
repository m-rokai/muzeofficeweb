"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { getFirstTouchAttribution } from "@/lib/analytics/attribution";

const OPTIX_SCRIPT_SRC = "https://muzeoffice.optixapp.com/web-plugin/optix.v1.js";
const OPTIX_SCRIPT_ID = "muze-optix-web-plugin";
const OPTIX_LOAD_TIMEOUT_MS = 12_000;

const OPTIX_CONVERSION_EVENTS = new Set([
  "booking_checkout",
  "booking_confirmed",
  "tour_confirmed",
  "signup_checkout",
  "signup_completed",
  "inquiry_submitted",
]);

type OptixInstance = {
  remove?: () => void;
};

type OptixController = {
  push: (command: [HTMLElement, "attach"]) => void;
  instances?: Record<string, OptixInstance>;
};

type OptixWidgetElement = HTMLDivElement & {
  optixLoaded?: boolean;
};

type OptixMessage = {
  source?: string;
  form?: string;
  event?: string;
  payload?: Record<string, unknown>;
};

declare global {
  interface Window {
    optix?: OptixController | unknown[];
  }
}

let optixScriptPromise: Promise<void> | null = null;

function getOptixController() {
  const optix = window.optix;
  return optix && !Array.isArray(optix) && typeof optix.push === "function"
    ? optix
    : null;
}

function loadOptixScript() {
  if (getOptixController()) return Promise.resolve();
  if (optixScriptPromise) return optixScriptPromise;

  optixScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${OPTIX_SCRIPT_SRC}"]`,
    );
    const script = existingScript ?? document.createElement("script");

    if (!existingScript) {
      script.id = OPTIX_SCRIPT_ID;
      script.async = true;
      script.src = OPTIX_SCRIPT_SRC;
    }

    const timeout = window.setTimeout(() => {
      cleanup();
      script?.remove();
      optixScriptPromise = null;
      reject(new Error("Optix took too long to load."));
    }, OPTIX_LOAD_TIMEOUT_MS);

    function cleanup() {
      window.clearTimeout(timeout);
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
    }

    function handleLoad() {
      cleanup();
      if (!getOptixController()) {
        script?.remove();
        optixScriptPromise = null;
        reject(new Error("Optix loaded without initializing."));
        return;
      }

      resolve();
    }

    function handleError() {
      cleanup();
      script?.remove();
      optixScriptPromise = null;
      reject(new Error("Optix could not be loaded."));
    }

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    if (!existingScript) document.body.appendChild(script);
  });

  return optixScriptPromise;
}

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
  const widgetRef = useRef<OptixWidgetElement>(null);
  const observerTargetRef = useRef<HTMLDivElement>(null);
  const widgetId = `muze-optix-${useId()}`;
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [loadState, setLoadState] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    widget.innerHTML = "";
    widget.optixLoaded = false;
    widget.setAttribute("optix-id", widgetId);
    widget.setAttribute("optix-venue", venue);
    widget.setAttribute("optix-mode", "embed");
    widget.setAttribute("optix-tracking", "1");
    widget.setAttribute("optix-tracking-origin", window.location.origin);

    return () => {
      getOptixController()?.instances?.[widgetId]?.remove?.();
      widget.innerHTML = "";
      widget.optixLoaded = false;
    };
  }, [venue, widgetId, widgetType]);

  useEffect(() => {
    const target = observerTargetRef.current;
    if (!target) return;

    if (!("IntersectionObserver" in window)) {
      setLoadAttempt(1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setLoadAttempt(1);
        observer.disconnect();
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (loadAttempt === 0) return;

    const widget = widgetRef.current;
    if (!widget) return;
    const widgetElement: OptixWidgetElement = widget;

    let cancelled = false;
    setLoadState("loading");

    async function loadWidget() {
      try {
        await loadOptixScript();
        if (cancelled) return;

        const optix = getOptixController();
        if (!optix) throw new Error("Optix is unavailable.");

        if (!widgetElement.querySelector("iframe")) {
          widgetElement.optixLoaded = false;
          optix.push([widgetElement, "attach"]);
        }
        if (!widgetElement.querySelector("iframe")) {
          throw new Error("Optix did not create its booking frame.");
        }

        setLoadState("ready");
      } catch {
        if (!cancelled) setLoadState("error");
      }
    }

    loadWidget();
    return () => {
      cancelled = true;
    };
  }, [loadAttempt, venue, widgetId, widgetType]);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;
    const widgetElement: OptixWidgetElement = widget;

    const iframeTitle =
      widgetType === "booking"
        ? "Book a room at Muze Office"
        : "Choose a Muze Office membership";

    function titleOptixFrames() {
      widgetElement
        .querySelectorAll<HTMLIFrameElement>("iframe")
        .forEach((iframe) => iframe.setAttribute("title", iframeTitle));
    }

    titleOptixFrames();
    const observer = new MutationObserver(titleOptixFrames);
    observer.observe(widgetElement, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [widgetType]);

  useEffect(() => {
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

    return () => {
      window.removeEventListener("message", handleOptixMessage);
    };
  }, [venue]);

  return (
    <div className="rounded-2xl border border-[#E6E4DF] bg-white p-3 shadow-sm sm:p-5">
      <div ref={observerTargetRef} className="relative h-[750px]">
        <div
          ref={widgetRef}
          className={`optix-${widgetType}-widget h-[750px]`}
          aria-label="Muze Office live availability"
        />
        {loadState !== "ready" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white px-6 text-center">
            <div className="max-w-sm">
              <p
                className="text-base font-medium text-[#1A1A1A]"
                role={loadState === "error" ? "alert" : undefined}
                aria-live="polite"
              >
                {loadState === "loading"
                  ? "Loading live availability…"
                  : loadState === "error"
                    ? "Live availability could not load."
                    : "See live availability and book online when you’re ready."}
              </p>
              {loadState !== "loading" ? (
                <button
                  type="button"
                  onClick={() => setLoadAttempt((attempt) => attempt + 1)}
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
                >
                  {loadState === "error"
                    ? "Try loading availability again"
                    : "Load live availability"}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
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
