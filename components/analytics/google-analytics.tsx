"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics/ga";

function GooglePageViewTracker({ ready }: { ready: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (
      !ready ||
      !GA_MEASUREMENT_ID ||
      typeof window.gtag !== "function"
    ) {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, ready]);

  return null;
}

export function GoogleAnalytics() {
  const [ready, setReady] = useState(false);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="muze-google-analytics"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}, { send_page_view: false });
        `}
      </Script>
      <GooglePageViewTracker ready={ready} />
    </>
  );
}
