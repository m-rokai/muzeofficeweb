"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitEmailCapture } from "@/lib/actions/submit-email-capture";
import { getFirstTouchAttribution } from "@/lib/analytics/attribution";
import { track } from "@/lib/analytics/track";

type Status = "idle" | "submitting" | "success" | "error";

export function EmailCapture({ placement }: { placement: string }) {
  const inputId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [startedAt] = useState(() => Date.now());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const attribution = getFirstTouchAttribution();

    setStatus("submitting");
    setMessage("");

    const result = await submitEmailCapture({
      email: String(formData.get("email") ?? ""),
      placement,
      attribution,
      honeypot: String(formData.get("muze_website") ?? ""),
      elapsedMs: Date.now() - startedAt,
    });

    if (result.success) {
      track("email_capture_submitted", {
        form: placement,
        page_path: window.location.pathname,
        landing_path: attribution.landingPath,
        referrer: attribution.referrerHost,
        utm_source: attribution.utmSource || "none",
        utm_medium: attribution.utmMedium || "none",
        utm_campaign: attribution.utmCampaign || "none",
      });
      form.reset();
      setStatus("success");
      setMessage(result.message);
      return;
    }

    setStatus("error");
    setMessage(result.message);
  }

  return (
    <section className="border-y border-[#E6E4DF] bg-[#F2F1ED] px-6 py-10">
      <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold text-[#1A1A1A]">
            Not ready to book?
          </h2>
          <p className="mt-2 text-[#74726D]">
            Get our Las Vegas workspace guide + first-visit tips.
          </p>
        </div>

        {status === "success" ? (
          <div className="flex max-w-[520px] items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-900" role="status">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative w-full max-w-[560px]">
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor={`${inputId}-website`}>Leave this field empty</label>
              <input id={`${inputId}-website`} name="muze_website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id={inputId}
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={status === "submitting"}
                placeholder="you@company.com"
                className="h-12 min-w-0 flex-1 rounded-xl border border-[#E6E4DF] bg-white px-4 text-[#1A1A1A] outline-none transition-shadow placeholder:text-[#74726D] focus:ring-2 focus:ring-[#EAA820]"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                data-cta="email_capture_submit"
                data-cta-location={placement}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#1A1A1A] px-6 font-semibold text-white transition-colors hover:bg-[#333333] disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  "Send me the guide"
                )}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-2 text-sm text-red-700" role="alert">
                {message}
              </p>
            )}
            <p className="mt-2 text-xs leading-relaxed text-[#74726D]">
              By submitting, you agree to receive the requested guide and
              workspace tips. Unsubscribe anytime. See our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-[#1A1A1A] underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
