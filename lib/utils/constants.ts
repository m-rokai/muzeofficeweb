export const BRAND = {
  name: "Muze Office",
  legalName: "Muze International Corporation",
  tagline: "Flexible workspaces in Las Vegas & Houston",
  email: "access@muzeoffice.com",
  url: "https://muzeoffice.com",
  blogUrl: "https://muzeoffice.com/blog",
  social: {
    twitter: "https://x.com/muzeoffice",
    facebook: "https://facebook.com/muzeoffice",
    instagram: "https://instagram.com/muzeoffice",
    linkedin: "https://linkedin.com/company/muzeoffice",
    tiktok: "https://tiktok.com/@muzeoffice",
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
