"use client";

import { useEffect, useRef } from "react";

const OPTIX_SCRIPT_SRC = "https://muzeoffice.optixapp.com/web-plugin/optix.v1.js";

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

    const script = document.createElement("script");
    script.async = true;
    script.src = OPTIX_SCRIPT_SRC;
    document.body.appendChild(script);

    return () => {
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
