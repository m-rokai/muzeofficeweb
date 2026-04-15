"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Phone, Loader2, AlertCircle } from "lucide-react";
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
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "access@muzeoffice.com";
const CONTACT_PHONE_DISPLAY = "(702) 370-7515";
const CONTACT_PHONE_TEL = "+17023707515";

const interestOptions = [
  { value: "virtual-office", label: "Virtual Office" },
  { value: "coworking", label: "Coworking" },
  { value: "private-office", label: "Private Office" },
  { value: "meeting-rooms", label: "Meeting Rooms" },
  { value: "event-space", label: "Event Space" },
  { value: "general", label: "General Inquiry" },
] as const;

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
      message: ((formData.get("message") as string) ?? "").trim(),
    };

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setStatus("sent");
        setServerMessage(result.message);
      } else {
        setStatus("error");
        setServerMessage(result.message);
      }
    } catch {
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
            setServerMessage("");
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
      className={cn("flex flex-col gap-5", className)}
      noValidate
    >
      {/* Server error banner */}
      {status === "error" && serverMessage && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
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
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          disabled={isSubmitting}
          className="h-10"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name}</p>
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
          placeholder="you@company.com"
          aria-invalid={!!errors.email}
          disabled={isSubmitting}
          className="h-10"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-phone">Phone</Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
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
          value={interest}
          onValueChange={(val) => setInterest(val ?? "")}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="contact-interest"
            className="h-10 w-full"
            aria-invalid={!!errors.interest}
          >
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {interestOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.interest && (
          <p className="text-xs text-red-500">{errors.interest}</p>
        )}
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
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          disabled={isSubmitting}
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
