"use server";

import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  message: string;
  /** Honeypot field — any value means a bot filled it. */
  website?: string;
  /** Milliseconds between form render and submit, reported by the client. */
  elapsedMs?: number;
}

interface ActionResult {
  success: boolean;
  message: string;
}

const interestLabels: Record<string, string> = {
  "virtual-office": "Virtual Office",
  coworking: "Coworking",
  "private-office": "Private Office",
  "meeting-rooms": "Meeting Rooms",
  "event-space": "Event Space",
  "houston-waitlist": "Houston Waitlist (opening 2026)",
  general: "General Inquiry",
};

const CONTACT_EMAIL = "access@muzeoffice.com";
const GMAIL_USER = "notifications@muzeoffice.com";
const SUCCESS_MESSAGE =
  "Thank you! We'll get back to you within one business day.";

export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult> {
  // --- Spam traps: respond with success so bots can't learn which check fired ---
  if (data.website && data.website.trim().length > 0) {
    console.warn("[submitContactForm] honeypot filled — dropping submission");
    return { success: true, message: SUCCESS_MESSAGE };
  }
  if (
    typeof data.elapsedMs === "number" &&
    data.elapsedMs >= 0 &&
    data.elapsedMs < 3000
  ) {
    console.warn("[submitContactForm] submitted in <3s — dropping submission");
    return { success: true, message: SUCCESS_MESSAGE };
  }

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

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: appPassword },
  });

  const interestLabel = interestLabels[data.interest] ?? data.interest;
  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone?.trim() || "Not provided";
  const company = data.company?.trim() || "Not provided";
  const message = data.message.trim();

  try {
    await transporter.sendMail({
      from: `"Muze Office" <${GMAIL_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name} — ${interestLabel}`,
      text: [
        `New contact form submission from muzeoffice.com`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Company: ${company}`,
        `Interested in: ${interestLabel}`,
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
    console.error("[submitContactForm] SMTP error:", error);
    return {
      success: false,
      message:
        "Something went wrong sending your message. Please email us directly at access@muzeoffice.com or call (702) 370-7515.",
    };
  }
}
