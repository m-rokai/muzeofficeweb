"use server";

import { getDatabase } from "@/lib/db";

interface EmailCaptureAttribution {
  landingPath?: string;
  referrerHost?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
}

interface EmailCaptureData {
  email: string;
  placement: string;
  attribution?: EmailCaptureAttribution;
  honeypot?: string;
  elapsedMs?: number;
}

interface EmailCaptureResult {
  success: boolean;
  message: string;
}

const SUCCESS_MESSAGE =
  "You’re on the list. Watch your inbox for the workspace guide and first-visit tips.";

function clean(value: string | undefined, maxLength = 500) {
  return value?.trim().slice(0, maxLength) || null;
}

export async function submitEmailCapture(
  data: EmailCaptureData,
): Promise<EmailCaptureResult> {
  if (data.honeypot?.trim()) {
    return { success: true, message: SUCCESS_MESSAGE };
  }

  if (
    typeof data.elapsedMs === "number" &&
    data.elapsedMs >= 0 &&
    data.elapsedMs < 750
  ) {
    return { success: true, message: SUCCESS_MESSAGE };
  }

  const email = data.email.trim().toLowerCase();
  if (
    email.length > 320 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { success: false, message: "Enter a valid email address." };
  }

  const sql = getDatabase();
  if (!sql) {
    console.error("[submitEmailCapture] DATABASE_URL is not configured");
    return {
      success: false,
      message:
        "Email signup is temporarily unavailable. Please email access@muzeoffice.com.",
    };
  }

  const attribution = data.attribution ?? {};

  try {
    await sql`
      insert into public.email_leads (
        email,
        placement,
        landing_path,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        gclid
      ) values (
        ${email},
        ${clean(data.placement, 80) ?? "unknown"},
        ${clean(attribution.landingPath, 2048) ?? "/"},
        ${clean(attribution.referrerHost, 500) ?? "direct"},
        ${clean(attribution.utmSource)},
        ${clean(attribution.utmMedium)},
        ${clean(attribution.utmCampaign)},
        ${clean(attribution.utmContent)},
        ${clean(attribution.utmTerm)},
        ${clean(attribution.gclid)}
      )
    `;

    return { success: true, message: SUCCESS_MESSAGE };
  } catch (error) {
    console.error("[submitEmailCapture] Postgres insert failed:", error);
    return {
      success: false,
      message:
        "We couldn’t save your email. Please try again or email access@muzeoffice.com.",
    };
  }
}
