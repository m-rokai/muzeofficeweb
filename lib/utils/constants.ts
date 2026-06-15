export const BRAND = {
  name: "Muze Office",
  legalName: "Muze International Corporation",
  tagline: "Flexible workspaces in Las Vegas & Houston",
  email: "access@muzeoffice.com",
  url: "https://muzeoffice.com",
  blogUrl: "https://muzeoffice.com/blog",
  social: {
    twitter: "https://x.com/muzeoffice",
    facebook: "https://www.facebook.com/muzeoffice",
    instagram: "https://www.instagram.com/muzeoffice",
    linkedin: "https://www.linkedin.com/company/muzeoffice",
    tiktok: "https://www.tiktok.com/@muzeoffice",
  },
  apps: {
    ios: "https://apps.apple.com/us/app/muze-office/id6450022118",
    android:
      "https://play.google.com/store/apps/datasafety?id=sharedesk.net.optixapp.muzeoffice",
  },
  booking: {
    tourUrl: "https://muzeoffice.optixapp.com/book/tour/",
    signupUrl: "https://muzeoffice.optixapp.com/signup/",
  },
  // Where "Leave a review" CTAs (and /review) point. TODO: replace with the
  // one-click short link from the GBP dashboard ("Get more reviews" →
  // https://g.page/r/XXXX/review) so the review box opens directly. Until then
  // this lands the user on the verified GBP listing where they click "Write a
  // review."
  reviewUrl: "https://www.google.com/search?q=Muze+Office+Las+Vegas&kgmid=/g/11x2wpzbg_",
} as const;

/**
 * Shared Open Graph defaults. Next.js shallow-merges (replaces) the whole
 * `openGraph` object per page, so any page that sets its own `openGraph` must
 * spread these back in or it loses the site-wide image/siteName/locale.
 * `url` is intentionally omitted — set it per page to that page's canonical,
 * since Next only emits og:url when `openGraph.url` is explicitly provided.
 */
export const OG_DEFAULTS = {
  siteName: "Muze Office",
  locale: "en_US",
  images: [
    {
      url: "/images/og/default.png",
      width: 2048,
      height: 2048,
      alt: "Muze Office — Coworking, Virtual Offices & Private Offices in Las Vegas & Houston",
    },
  ],
};

export const COLORS = {
  gold: "#EAA820",
  copper: "#C17A28",
  dark: "#1A1A1A",
  offBlack: "#111111",
  warmWhite: "#FAFAF7",
  warmGray: "#F2F1ED",
  mutedText: "#74726D",
  warmBorder: "#E6E4DF",
  white: "#FFFFFF",
} as const;
