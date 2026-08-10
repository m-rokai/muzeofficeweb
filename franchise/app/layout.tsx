import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCTA } from "@/components/layout/mobile-cta";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { WebsiteSchema } from "@/components/seo/website-schema";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import { Analytics } from "@vercel/analytics/next";
import { BRAND } from "@/lib/utils/constants";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Coworking & Flexible Workspace Franchise Opportunities | Muze Office Franchise",
    template: "%s | Muze Office Franchise",
  },
  description:
    "Own a flexible-workspace business with Muze Office. Franchise, invest, or partner on coworking, virtual office, and private-office locations. Book a discovery call.",
  metadataBase: new URL(BRAND.url),
  openGraph: {
    siteName: BRAND.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/og/default.png", width: 2048, height: 2048, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@muzeoffice",
    creator: "@muzeoffice",
    images: ["/images/og/default.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <OrganizationSchema />
        <WebsiteSchema />
        <SiteHeader />
        <main className="flex-1 pb-[68px] md:pb-0">{children}</main>
        <SiteFooter />
        <MobileCTA />
        <EngagementTracker />
        <Analytics />
      </body>
    </html>
  );
}
