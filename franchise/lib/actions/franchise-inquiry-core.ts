import { trackLabels, capitalLabels, timelineLabels } from "@/lib/data/inquiry-options";

export interface InquiryInput {
  name: string;
  email: string;
  phone?: string;
  track: string;        // "" until selected
  capital?: string;
  market?: string;
  timeline?: string;
  role?: string;
  message: string;
  honeypot?: string;
  elapsedMs?: number;
}

export interface InquiryErrors {
  name?: string;
  email?: string;
  track?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(d: InquiryInput): InquiryErrors {
  const errs: InquiryErrors = {};
  if (!d.name || d.name.trim().length < 2) errs.name = "Name is required (at least 2 characters).";
  if (!d.email || !EMAIL_RE.test(d.email)) errs.email = "A valid email address is required.";
  if (!d.track) errs.track = "Please tell us which path fits you best.";
  if (!d.message || d.message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
  return errs;
}

export function isSuspectedSpam(d: InquiryInput): boolean {
  return typeof d.elapsedMs === "number" && d.elapsedMs >= 0 && d.elapsedMs < 3000;
}

function labeled(map: Record<string, string>, value?: string) {
  const v = (value ?? "").trim();
  return { value: v, label: v ? (map[v] ?? v) : "" };
}

export interface LeadPayload {
  source: string;
  receivedAtIso: string;
  name: string;
  email: string;
  phone: string;
  track: { value: string; label: string };
  capital: { value: string; label: string };
  market: string;
  timeline: { value: string; label: string };
  role: string;
  message: string;
}

export function buildLeadPayload(d: InquiryInput): LeadPayload {
  return {
    source: "muzeofficefranchise.com",
    receivedAtIso: new Date().toISOString(),
    name: d.name.trim(),
    email: d.email.trim(),
    phone: (d.phone ?? "").trim() || "Not provided",
    track: labeled(trackLabels, d.track),
    capital: labeled(capitalLabels, d.capital),
    market: (d.market ?? "").trim() || "Not provided",
    timeline: labeled(timelineLabels, d.timeline),
    role: (d.role ?? "").trim() || "Not provided",
    message: d.message.trim(),
  };
}

export function buildEmailText(d: InquiryInput, suspectedSpam: boolean): string {
  const p = buildLeadPayload(d);
  return [
    `${suspectedSpam ? "[Suspected spam] " : ""}New franchise inquiry from ${p.name} — ${p.track.label || "track unspecified"}`,
    ``,
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Phone: ${p.phone}`,
    `Path: ${p.track.label || p.track.value}`,
    `Capital available: ${p.capital.label || "Not provided"}`,
    `Target market: ${p.market}`,
    `Timeline: ${p.timeline.label || "Not provided"}`,
    `Current role/business: ${p.role}`,
    ``,
    `Message:`,
    p.message,
    ``,
    `--- CRM payload (JSON) ---`,
    JSON.stringify(p, null, 2),
  ].join("\n");
}
