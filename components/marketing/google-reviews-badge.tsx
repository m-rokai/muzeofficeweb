import { Star } from "lucide-react";

interface GoogleReviewsBadgeProps {
  /** Optional — only render stars and a rating number if the caller can
   *  verify both values against the live Google Business Profile. If
   *  omitted, the badge renders as a plain "Read reviews on Google" link. */
  rating?: number;
  /** Optional — only render a review count if the caller can verify it
   *  against the live Google Business Profile. */
  reviewCount?: number;
  /** Optional link target. Defaults to the Google Business Profile
   *  "write a review" short link, so the review box opens directly. */
  href?: string;
  className?: string;
}

const DEFAULT_HREF = "https://g.page/r/CYjtMKmRvwKKEBM/review";

export function GoogleReviewsBadge({
  rating,
  reviewCount,
  href = DEFAULT_HREF,
  className,
}: GoogleReviewsBadgeProps) {
  const hasVerifiedRating = typeof rating === "number" && rating > 0;
  const fullStars = hasVerifiedRating ? Math.floor(rating) : 0;
  const hasHalf = hasVerifiedRating && rating - fullStars >= 0.5;

  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-2xl border border-[#E6E4DF] bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-label="Google">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <div className="flex flex-col">
          {hasVerifiedRating ? (
            <>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold leading-none">{rating}</span>
                <div className="flex">
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#EAA820] text-[#EAA820]" />
                  ))}
                  {hasHalf && <Star className="h-3.5 w-3.5 fill-[#EAA820]/50 text-[#EAA820]" />}
                </div>
              </div>
              <span className="text-xs text-[#74726D]">
                {typeof reviewCount === "number" && reviewCount > 0
                  ? `${reviewCount} Google reviews`
                  : "Google reviews"}
              </span>
            </>
          ) : (
            <>
              <span className="text-sm font-semibold leading-none text-[#1A1A1A]">
                Read reviews on Google
              </span>
              <span className="mt-0.5 text-xs text-[#74726D]">
                See what members say
              </span>
            </>
          )}
        </div>
      </a>
    </div>
  );
}
