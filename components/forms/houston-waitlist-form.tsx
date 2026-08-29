"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics/track";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitContactForm } from "@/lib/actions/submit-contact-form";
import { getFirstTouchAttribution } from "@/lib/analytics/attribution";

const WORKSPACE_OPTIONS = [
  { value: "virtual-office", label: "Virtual office / business address" },
  { value: "coworking", label: "Coworking or day passes" },
  { value: "private-office", label: "Private office" },
  { value: "meeting-event", label: "Meeting or event space" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

const TIMELINE_OPTIONS = [
  { value: "as-soon-as-open", label: "As soon as Houston opens" },
  { value: "within-3-months", label: "Within 3 months of opening" },
  { value: "later", label: "Later / researching now" },
] as const;

type Status = "idle" | "submitting" | "sent" | "error";

export function HoustonWaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [startedAt] = useState(() => Date.now());
  const startedTracking = useRef(false);

  useEffect(() => {
    track("houston_waitlist_view", { source_path: window.location.pathname });
  }, []);

  function trackStart() {
    if (startedTracking.current) return;
    startedTracking.current = true;
    track("houston_waitlist_start", { source_path: window.location.pathname });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const workspace = String(formData.get("workspace") ?? "");
    const timeline = String(formData.get("timeline") ?? "not-provided");
    const workspaceLabel =
      WORKSPACE_OPTIONS.find((option) => option.value === workspace)?.label ??
      workspace;
    const timelineLabel =
      TIMELINE_OPTIONS.find((option) => option.value === timeline)?.label ??
      "Not provided";
    const attribution = getFirstTouchAttribution();

    setStatus("submitting");
    setServerMessage("");

    try {
      const result = await submitContactForm({
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        company: String(formData.get("company") ?? "").trim(),
        interest: "houston-waitlist",
        message: [
          "Houston early-access request.",
          `Workspace interest: ${workspaceLabel}.`,
          `Expected timing: ${timelineLabel}.`,
          `Source path: ${attribution.landingPath}.`,
          `Referrer host: ${attribution.referrerHost}.`,
          `UTM source: ${attribution.utmSource || "none"}.`,
          `UTM medium: ${attribution.utmMedium || "none"}.`,
          `UTM campaign: ${attribution.utmCampaign || "none"}.`,
          `Google click ID: ${attribution.gclid || "none"}.`,
        ].join(" "),
        attribution,
        honeypot: String(formData.get("muze_extra") ?? "").trim(),
        elapsedMs: Date.now() - startedAt,
      });

      if (result.success) {
        track("houston_waitlist_submitted", {
          workspace,
          timeline,
          source_path: attribution.landingPath,
          referrer: attribution.referrerHost,
          utm_source: attribution.utmSource || "none",
          utm_medium: attribution.utmMedium || "none",
          utm_campaign: attribution.utmCampaign || "none",
        });
        setStatus("sent");
        return;
      }

      track("houston_waitlist_error");
      setStatus("error");
      setServerMessage(result.message);
    } catch {
      track("houston_waitlist_error");
      setStatus("error");
      setServerMessage(
        "We couldn't send your request. Please email access@muzeoffice.com.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-xl border border-green-200 bg-green-50 p-6"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-7 w-7 text-green-700" />
        <h3 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold text-[#1A1A1A]">
          Early-access request received
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#74726D]">
          We&apos;ll email you with Houston opening updates and next steps. No
          membership or address service is active at this location yet.
        </p>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={trackStart}
      className="flex flex-col gap-4"
    >
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="houston-muze-extra">Leave this field empty</label>
        <input
          id="houston-muze-extra"
          name="muze_extra"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && serverMessage && (
        <div
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverMessage}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="houston-name">Name</Label>
          <Input
            id="houston-name"
            name="name"
            autoComplete="name"
            minLength={2}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="houston-email">Email</Label>
          <Input
            id="houston-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="houston-company">Company (optional)</Label>
          <Input
            id="houston-company"
            name="company"
            autoComplete="organization"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="houston-phone">Phone (optional)</Label>
          <Input
            id="houston-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="houston-workspace">What are you looking for?</Label>
        <select
          id="houston-workspace"
          name="workspace"
          required
          disabled={isSubmitting}
          defaultValue=""
          className="h-10 rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        >
          <option value="" disabled>
            Select a workspace type
          </option>
          {WORKSPACE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="houston-timeline">When would you want to start?</Label>
        <select
          id="houston-timeline"
          name="timeline"
          disabled={isSubmitting}
          defaultValue=""
          className="h-10 rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
        >
          <option value="">Select a timeframe (optional)</option>
          {TIMELINE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        data-cta="houston_waitlist_submit"
        data-cta-location="houston_launch_page"
        className="mt-1 h-11 rounded-lg bg-[#1A1A1A] text-white hover:bg-[#333]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Joining…
          </>
        ) : (
          "Join Houston early access"
        )}
      </Button>
      <p className="text-xs leading-relaxed text-[#74726D]">
        By submitting, you agree that Muze Office may contact you about the
        Houston opening. No payment or membership commitment is required.
      </p>
    </form>
  );
}
