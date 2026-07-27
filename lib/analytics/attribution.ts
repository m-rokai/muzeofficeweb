export interface FirstTouchAttribution {
  landingPath: string;
  referrerHost: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
}

const STORAGE_KEY = "muze_first_touch";

function currentAttribution(): FirstTouchAttribution {
  const url = new URL(window.location.href);
  let referrerHost = "direct";

  if (document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      referrerHost =
        referrer.hostname === window.location.hostname
          ? "internal"
          : referrer.hostname;
    } catch {
      referrerHost = "unknown";
    }
  }

  return {
    // Keep arbitrary query-string values out of analytics properties. Campaign
    // parameters are captured separately below.
    landingPath: url.pathname,
    referrerHost,
    utmSource: url.searchParams.get("utm_source") ?? "",
    utmMedium: url.searchParams.get("utm_medium") ?? "",
    utmCampaign: url.searchParams.get("utm_campaign") ?? "",
    utmContent: url.searchParams.get("utm_content") ?? "",
    utmTerm: url.searchParams.get("utm_term") ?? "",
    gclid: url.searchParams.get("gclid") ?? "",
  };
}

export function captureFirstTouchAttribution(): FirstTouchAttribution {
  const current = currentAttribution();

  try {
    const existing = window.sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing) as FirstTouchAttribution;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Storage can be unavailable in privacy-restricted browsers. The
    // current page remains a useful fallback and no form flow should fail.
  }

  return current;
}

export function getFirstTouchAttribution(): FirstTouchAttribution {
  return captureFirstTouchAttribution();
}
