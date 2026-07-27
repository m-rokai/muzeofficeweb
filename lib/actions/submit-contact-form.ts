"use server";

import nodemailer from "nodemailer";
import {
  discoverySourceLabels,
  interestLabels,
} from "@/lib/data/contact-interests";

interface ContactAttribution {
  landingPath?: string;
  referrerHost?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  discoverySource?: string;
  message: string;
  attribution?: ContactAttribution;
  /** Honeypot field — any value means a bot filled it. */
  honeypot?: string;
  /** Milliseconds between form render and submit, reported by the client. */
  elapsedMs?: number;
}

interface ActionResult {
  success: boolean;
  message: string;
}

// Sends from and delivers to the Gmail inbox — inquiries land in notifications@.
const GMAIL_USER = "notifications@muzeoffice.com";
const SUCCESS_MESSAGE =
  "Thank you! We'll get back to you within one business day.";

// One transporter per warm server instance — avoids a fresh TCP+TLS+AUTH
// handshake to Gmail on every submission.
let transporter: nodemailer.Transporter | null = null;
function getTransporter(appPassword: string) {
  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: appPassword },
  });
  return transporter;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult> {
  // --- Spam traps ---
  // Honeypot: hard drop, but respond with success so bots can't learn the check fired.
  if (data.honeypot && data.honeypot.trim().length > 0) {
    console.warn("[submitContactForm] honeypot filled — dropping submission");
    return { success: true, message: SUCCESS_MESSAGE };
  }
  // Sub-3s submit: suspicious, but a fast autofill user is plausible —
  // deliver the lead anyway with a flagged subject instead of dropping it.
  const suspectedSpam =
    typeof data.elapsedMs === "number" &&
    data.elapsedMs >= 0 &&
    data.elapsedMs < 3000;

  // --- Validation ---
  if (!data.name || data.name.trim().length < 2) {
    return { success: false, message: "Name is required (at least 2 characters)." };
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, message: "A valid email address is required." };
  }

  if (!data.interest) {
    return { success: false, message: "Please select what you are interested in." };
  }

  if (!data.message || data.message.trim().length < 10) {
    return { success: false, message: "Message must be at least 10 characters." };
  }

  // --- Send via Gmail SMTP ---
  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (!appPassword) {
    console.error("[submitContactForm] GMAIL_APP_PASSWORD is not configured");
    return {
      success: false,
      message:
        "Our form is temporarily unavailable. Please email us directly at access@muzeoffice.com or call (702) 370-7515.",
    };
  }

  const interestLabel = interestLabels[data.interest] ?? data.interest;
  const discoverySource = data.discoverySource
    ? discoverySourceLabels[data.discoverySource] ?? data.discoverySource
    : "Not provided";
  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone?.trim() || "Not provided";
  const company = data.company?.trim() || "Not provided";
  const message = data.message.trim();
  const attribution = data.attribution ?? {};
  const safeValue = (value?: string) =>
    value?.trim().slice(0, 500) || "none";

  try {
    await getTransporter(appPassword).sendMail({
      from: `"Muze Office" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: email,
      subject: `${suspectedSpam ? "[Suspected spam] " : ""}New inquiry from ${name} — ${interestLabel}`,
      text: [
        `New contact form submission from muzeoffice.com`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Company: ${company}`,
        `Interested in: ${interestLabel}`,
        `How they found us: ${discoverySource}`,
        ``,
        `First-touch attribution:`,
        `Landing path: ${safeValue(attribution.landingPath)}`,
        `Referrer host: ${safeValue(attribution.referrerHost)}`,
        `UTM source: ${safeValue(attribution.utmSource)}`,
        `UTM medium: ${safeValue(attribution.utmMedium)}`,
        `UTM campaign: ${safeValue(attribution.utmCampaign)}`,
        `UTM content: ${safeValue(attribution.utmContent)}`,
        `UTM term: ${safeValue(attribution.utmTerm)}`,
        `Google click ID: ${safeValue(attribution.gclid)}`,
        ``,
        `Message:`,
        message,
        ``,
        `---`,
        `Submitted at ${new Date().toISOString()}`,
      ].join("\n"),
    });

    return { success: true, message: SUCCESS_MESSAGE };
  } catch (error) {
    // Drop the cached transporter so the next attempt re-reads the env var —
    // a rotated app password would otherwise fail every send until redeploy.
    transporter = null;
    console.error("[submitContactForm] SMTP error:", error);
    return {
      success: false,
      message:
        "Something went wrong sending your message. Please email us directly at access@muzeoffice.com or call (702) 370-7515.",
    };
  }
}
