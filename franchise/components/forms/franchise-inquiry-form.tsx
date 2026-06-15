"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { submitFranchiseInquiry } from "@/lib/actions/submit-franchise-inquiry";
import { TRACK_OPTIONS, CAPITAL_OPTIONS, TIMELINE_OPTIONS } from "@/lib/data/inquiry-options";
import { validateInquiry, type InquiryErrors } from "@/lib/actions/franchise-inquiry-core";
import { BRAND } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "error";

export function FranchiseInquiryForm({ className }: { className?: string }) {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [trackValue, setTrackValue] = useState("");
  const [capital, setCapital] = useState("");
  const [timeline, setTimeline] = useState("");
  const [startedAt] = useState(() => Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: ((fd.get("name") as string) ?? "").trim(),
      email: ((fd.get("email") as string) ?? "").trim(),
      phone: ((fd.get("phone") as string) ?? "").trim(),
      track: trackValue,
      capital,
      market: ((fd.get("market") as string) ?? "").trim(),
      timeline,
      role: ((fd.get("role") as string) ?? "").trim(),
      message: ((fd.get("message") as string) ?? "").trim(),
      honeypot: ((fd.get("muze_extra") as string) ?? "").trim(),
      elapsedMs: Date.now() - startedAt,
    };

    const validation = validateInquiry(data);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setStatus("submitting");
    setServerMessage("");

    try {
      const result = await submitFranchiseInquiry(data);
      if (result.success) {
        track("franchise_inquiry_submitted", { franchiseTrack: trackValue });
        setStatus("sent");
        setServerMessage(result.message);
      } else {
        track("franchise_inquiry_error");
        setStatus("error");
        setServerMessage(result.message);
      }
    } catch {
      track("franchise_inquiry_error");
      setStatus("error");
      setServerMessage(
        "Something went wrong. Please email franchise@muzeoffice.com or call (702) 370-7515."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className={cn("flex flex-col gap-5 rounded-xl border border-[#E6E4DF] bg-[#F2F1ED] p-7", className)} role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
          <div>
            <h3 className="text-xl font-semibold text-[#1A1A1A]">Thanks — we&apos;ve got it</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#74726D]">{serverMessage}</p>
          </div>
        </div>
        <a href={BRAND.scheduling.discoveryCallUrl} target="_blank" rel="noopener noreferrer"
           data-cta="schedule_after_submit" data-cta-location="inquiry_form"
           className="inline-flex h-11 w-fit items-center justify-center rounded-lg bg-[#EAA820] px-6 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28]">
          Pick a time now
        </a>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex flex-col gap-5", className)} noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="fr-muze-extra">Leave this field empty</label>
        <input id="fr-muze-extra" name="muze_extra" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && serverMessage && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{serverMessage}</p>
        </div>
      )}

      {/* Name */}
      <Field id="fr-name" label="Name" required error={errors.name}>
        <Input id="fr-name" name="name" type="text" autoComplete="name" placeholder="Your full name" disabled={isSubmitting} className="h-10" />
      </Field>
      {/* Email */}
      <Field id="fr-email" label="Email" required error={errors.email}>
        <Input id="fr-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" disabled={isSubmitting} className="h-10" />
      </Field>
      {/* Phone */}
      <Field id="fr-phone" label="Phone">
        <Input id="fr-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" disabled={isSubmitting} className="h-10" />
      </Field>

      {/* Track */}
      <Field id="fr-track" label="Which path fits you best?" required error={errors.track}>
        <Select value={trackValue} onValueChange={(v) => setTrackValue(v ?? "")} disabled={isSubmitting}>
          <SelectTrigger id="fr-track" className="h-10 w-full"><SelectValue placeholder="Select a path" /></SelectTrigger>
          <SelectContent>{TRACK_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
      </Field>

      {/* Capital */}
      <Field id="fr-capital" label="Capital available">
        <Select value={capital} onValueChange={(v) => setCapital(v ?? "")} disabled={isSubmitting}>
          <SelectTrigger id="fr-capital" className="h-10 w-full"><SelectValue placeholder="Select a range" /></SelectTrigger>
          <SelectContent>{CAPITAL_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
      </Field>

      {/* Market */}
      <Field id="fr-market" label="Target market / city">
        <Input id="fr-market" name="market" type="text" placeholder="e.g. Phoenix, AZ" disabled={isSubmitting} className="h-10" />
      </Field>

      {/* Timeline */}
      <Field id="fr-timeline" label="Timeline to open">
        <Select value={timeline} onValueChange={(v) => setTimeline(v ?? "")} disabled={isSubmitting}>
          <SelectTrigger id="fr-timeline" className="h-10 w-full"><SelectValue placeholder="Select a timeline" /></SelectTrigger>
          <SelectContent>{TIMELINE_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
        </Select>
      </Field>

      {/* Role */}
      <Field id="fr-role" label="Current role / business">
        <Input id="fr-role" name="role" type="text" placeholder="e.g. Owner, regional franchisee, investor" disabled={isSubmitting} className="h-10" />
      </Field>

      {/* Message */}
      <Field id="fr-message" label="Tell us about your goals" required error={errors.message}>
        <Textarea id="fr-message" name="message" rows={5} placeholder="What are you looking to do, and in which market?" disabled={isSubmitting} />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="h-11 rounded-lg bg-[#1A1A1A] text-white hover:bg-[#333] disabled:opacity-70">
        {isSubmitting ? (<><Loader2 className="h-4 w-4 animate-spin" />Sending…</>) : "Request my discovery call"}
      </Button>
      <p className="text-xs text-[#74726D]">
        Prefer to talk now? <a href={`tel:${BRAND.phoneTel}`} className="font-medium text-[#1A1A1A] hover:text-[#EAA820]">Call {BRAND.phoneDisplay}</a>.
      </p>
    </form>
  );
}

function Field({ id, label, required, error, children }: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}{required && <span className="text-red-500"> *</span>}</Label>
      {children}
      {error && <p role="alert" className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
