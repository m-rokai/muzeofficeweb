"use client";

import { useEffect } from "react";
import { Star } from "lucide-react";
import { track } from "@/lib/analytics/track";
import { BRAND } from "@/lib/utils/constants";

export function ReviewPrompt() {
  useEffect(() => {
    track("review_prompt_shown", { page_path: window.location.pathname });
  }, []);

  const placeId = process.env.NEXT_PUBLIC_G_PLACE_ID?.trim();
  const reviewUrl = placeId
    ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
    : BRAND.reviewUrl;

  return (
    <a
      href={reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="leave_review"
      data-cta-location="thanks_page"
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#EAA820] px-7 py-3 font-semibold text-[#1A1A1A] transition-colors hover:bg-[#C17A28]"
    >
      <Star className="h-5 w-5" aria-hidden="true" />
      Leave a Google review
    </a>
  );
}
