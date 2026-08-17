"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/lib/actions/submit-contact-form";
import {
  CONTACT_DISCOVERY_SOURCES,
  CONTACT_INTERESTS,
  discoverySourceLabels,
  interestLabels,
} from "@/lib/data/contact-interests";
import { getFirstTouchAttribution } from "@/lib/analytics/attribution";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "access@muzeoffice.com";
const CONTACT_PHONE_DISPLAY = "(702) 370-7515";
const CONTACT_PHONE_TEL = "+17023707515";

interface FormErrors {
  name?: string;
  email?: string;
  interest?: string;
  message?: string;
}

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm({ className }: { className?: string }) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [interest, setInterest] = useState("");
  const [discoverySource, setDiscoverySource] = useState("");
  const [startedAt] = useState(() => Date.now());
  const startedTracking = useRef(false);

  // Prefill the interest select from ?interest=… (e.g. /contact?interest=virtual-office)
  // — read client-side so the page stays fully static.
  useEffect(() => {
    track("contact_form_view", { source_path: window.location.pathname });
    const param = new URLSearchParams(window.location.search).get("interest");
    if (param && CONTACT_INTERESTS.some((i) => i.value === param)) {
      // Intentional: URL is only readable post-hydration, so a lazy useState
      // initializer would cause an SSR mismatch. One-time prefill on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInterest(param);
    }
  }, []);

  function trackStart() {
    if (startedTracking.current) return;
    startedTracking.current = true;
    track("contact_form_start", { source_path: window.location.pathname });
  }

  function validate(formData: FormData): FormErrors {
    const errs: FormErrors = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) {
      errs.name = "Name is required (at least 2 characters).";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "A valid email address is required.";
    }
    if (!interest) {
      errs.interest = "Please select what you are interested in.";
    }
    if (!message || message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setServerMessage("");

    const data = {
      name: ((formData.get("name") as string) ?? "").trim(),
      email: ((formData.get("email") as string) ?? "").trim(),
      phone: ((formData.get("phone") as string) ?? "").trim(),
      company: ((formData.get("company") as string) ?? "").trim(),
      interest,
      discoverySource,
      message: ((formData.get("message") as string) ?? "").trim(),
      attribution: getFirstTouchAttribution(),
      honeypot: ((formData.get("muze_extra") as string) ?? "").trim(),
      elapsedMs: Date.now() - startedAt,
    };

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        const attribution = getFirstTouchAttribution();
        track("contact_form_submitted", {
          interest,
          discovery_source: discoverySource || "not_provided",
          landing_path: attribution.landingPath,
          referrer: attribution.referrerHost,
          utm_source: attribution.utmSource || "none",
        });
        setStatus("sent");
        setServerMessage(result.message);
      } else {
        track("contact_form_error");
        setStatus("error");
        setServerMessage(result.message);
      }
    } catch {
      track("contact_form_error");
      setStatus("error");
      setServerMessage(
        "Something went wrong. Please email us directly at access@muzeoffice.com or call (702) 370-7515."
      );
    }
  }

  // --- Success state ---
  if (status === "sent") {
    return (
      <div
        className={cn(
          "flex flex-col gap-5 rounded-xl border border-[#E6E4DF] bg-[#F2F1ED] p-7",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
          <div>
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold text-[#1A1A1A]">
              Message sent
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#74726D]">
              {serverMessage}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-10 w-fit rounded-lg"
          onClick={() => {
            setStatus("idle");
            setInterest("");
            setDiscoverySource("");
            setServerMessage("");
            startedTracking.current = false;
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={trackStart}
      className={cn("relative flex flex-col gap-5", className)}
      noValidate
    >
      {/* Honeypot — off-screen field humans never see; bots that fill it are
          silently dropped. Named so no browser/password-manager profile
          matches it (a "website"-style name gets autofilled and would drop
          real leads). */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-muze-extra">Leave this field empty</label>
        <input
          id="contact-muze-extra"
          name="muze_extra"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {/* Server error banner */}
      {status === "error" && serverMessage && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p>{serverMessage}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium underline"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="font-medium underline"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          disabled={isSubmitting}
          className="h-10"
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="text-xs text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          disabled={isSubmitting}
          className="h-10"
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-phone">Phone</Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 123-4567"
          disabled={isSubmitting}
          className="h-10"
        />
      </div>

      {/* Company (optional) */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-company">Company (optional)</Label>
        <Input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Your company name"
          disabled={isSubmitting}
          className="h-10"
        />
      </div>

      {/* Interest */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-interest">
          I&apos;m interested in <span className="text-red-500">*</span>
        </Label>
        <Select
          items={interestLabels}
          value={interest}
          onValueChange={(val) => setInterest(val ?? "")}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="contact-interest"
            className="h-10 w-full"
            aria-invalid={!!errors.interest}
            aria-describedby={errors.interest ? "contact-interest-error" : undefined}
          >
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {CONTACT_INTERESTS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.interest && (
          <p id="contact-interest-error" role="alert" className="text-xs text-red-500">
            {errors.interest}
          </p>
        )}
      </div>

      {/* Discovery source (optional, for lead-source reconciliation) */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-discovery-source">
          How did you find us? (optional)
        </Label>
        <Select
          items={discoverySourceLabels}
          value={discoverySource}
          onValueChange={(value) => setDiscoverySource(value ?? "")}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="contact-discovery-source"
            className="h-10 w-full"
          >
            <SelectValue placeholder="Select a source" />
          </SelectTrigger>
          <SelectContent>
            {CONTACT_DISCOVERY_SOURCES.map((source) => (
              <SelectItem key={source.value} value={source.value}>
                {source.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Tell us about your workspace needs..."
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          data-cta="contact_form_submit"
          data-cta-location="contact_form"
          className="h-11 rounded-lg bg-[#1A1A1A] text-white hover:bg-[#333] disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </Button>
        <p className="text-xs text-[#74726D]">
          Prefer to talk?{" "}
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="font-medium text-[#1A1A1A] hover:text-[#EAA820]"
          >
            Call {CONTACT_PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
