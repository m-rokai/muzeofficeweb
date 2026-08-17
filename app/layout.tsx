import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCTA } from "@/components/layout/mobile-cta";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Muze Office — Coworking & Flexible Workspace in Las Vegas",
    template: "%s | Muze Office",
  },
  description:
    "Coworking, virtual offices, private offices, and meeting rooms in Las Vegas. Month-to-month, with a $25 day pass and virtual office plans from $39/mo. Houston opening in 2026.",
  metadataBase: new URL("https://muzeoffice.com"),
  openGraph: {
    siteName: "Muze Office",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og/default.png",
        width: 2048,
        height: 2048,
        alt: "Muze Office coworking and flexible workspace in Las Vegas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@muzeoffice",
    creator: "@muzeoffice",
    images: ["/images/og/default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <OrganizationSchema />
        <SiteHeader />
        <main className="flex-1 pb-[68px] md:pb-0">{children}</main>
        <SiteFooter />
        <MobileCTA />
        <EngagementTracker />
        <Analytics />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="m104LdR/8lGp8/edHuBYHg"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
