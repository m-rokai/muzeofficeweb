"use server";

import nodemailer from "nodemailer";
import {
  validateInquiry,
  isSuspectedSpam,
  buildEmailText,
  buildLeadPayload,
  type InquiryInput,
} from "@/lib/actions/franchise-inquiry-core";

interface ActionResult {
  success: boolean;
  message: string;
}

// Auth + From use the working Gmail account that already holds the app password.
const GMAIL_USER = "notifications@muzeoffice.com";
// Where franchise leads are delivered. Change to a dedicated inbox/alias as needed.
const FRANCHISE_INBOX = "franchise@muzeoffice.com";
const SUCCESS_MESSAGE =
  "Thank you! We'll review your details and reach out within one business day to schedule your discovery call.";

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

export async function submitFranchiseInquiry(data: InquiryInput): Promise<ActionResult> {
  // Honeypot: silently drop, but report success so bots can't learn the trap fired.
  if (data.honeypot && data.honeypot.trim().length > 0) {
    console.warn("[submitFranchiseInquiry] honeypot filled — dropping");
    return { success: true, message: SUCCESS_MESSAGE };
  }

  const errors = validateInquiry(data);
  if (Object.keys(errors).length > 0) {
    return { success: false, message: Object.values(errors)[0] as string };
  }

  const suspectedSpam = isSuspectedSpam(data);
  const payload = buildLeadPayload(data);

  // --- CRM extension point ---------------------------------------------------
  // To pipe leads into a CRM later, POST `payload` here (guarded by an env var),
  // e.g.:
  //   if (process.env.FRANCHISE_CRM_WEBHOOK_URL) {
  //     await fetch(process.env.FRANCHISE_CRM_WEBHOOK_URL, {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify(payload),
  //     }).catch((e) => console.error("[franchise CRM webhook]", e));
  //   }
  // ---------------------------------------------------------------------------

  const appPassword = process.env.GMAIL_APP_PASSWORD;
  if (!appPassword) {
    console.error("[submitFranchiseInquiry] GMAIL_APP_PASSWORD is not configured");
    return {
      success: false,
      message:
        "Our form is temporarily unavailable. Please email franchise@muzeoffice.com or call (702) 370-7515.",
    };
  }

  try {
    await getTransporter(appPassword).sendMail({
      from: `"Muze Office Franchise" <${GMAIL_USER}>`,
      to: FRANCHISE_INBOX,
      replyTo: payload.email,
      subject: `${suspectedSpam ? "[Suspected spam] " : ""}[Franchise] ${payload.name} — ${payload.track.label || "track unspecified"}`,
      text: buildEmailText(data, suspectedSpam),
    });
    return { success: true, message: SUCCESS_MESSAGE };
  } catch (error) {
    transporter = null; // drop cache so a rotated password is re-read next attempt
    console.error("[submitFranchiseInquiry] SMTP error:", error);
    return {
      success: false,
      message:
        "Something went wrong sending your message. Please email franchise@muzeoffice.com or call (702) 370-7515.",
    };
  }
}
