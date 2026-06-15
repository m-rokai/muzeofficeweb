import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CTASection } from "@/components/marketing/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/forms/contact-form";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/marketing/animate";
import { BRAND, OG_DEFAULTS } from "@/lib/utils/constants";
import { getLocation } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Contact Us — Las Vegas Workspace, Book a Tour",
  description:
    "Visit Muze Office Las Vegas at 6860 Bermuda Rd, Suite 200 — free parking, book a tour. Email access@muzeoffice.com or call (702) 370-7515, Mon–Fri 10am–5pm.",
  alternates: { canonical: "/contact" },
  openGraph: { ...OG_DEFAULTS, type: "website", url: "/contact" },
};

export default function ContactPage() {
  const lasVegas = getLocation("las-vegas");
  const houston = getLocation("houston");
  return (
    <>
      <LocalBusinessSchema locationId="las-vegas" />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      {/* Hero */}
      <Section>
        <FadeIn>
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold md:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-base text-[#74726D] md:text-lg">
              Have a question about workspace memberships, tours, or availability?
              Reach out and we&apos;ll get back to you within one business day.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Contact Info + Form */}
      <Section variant="gray">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-8">
            {/* Las Vegas — Active */}
            <FadeIn delay={0.1}>
            <Card className="border-[#E6E4DF] bg-white">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-2">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold">
                    Muze Office Las Vegas
                  </h2>
                  {lasVegas?.status === "active" ? (
                    <Badge className="bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]">
                      Open
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Coming Soon
                    </Badge>
                  )}
                </div>

                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-3 text-sm text-[#74726D]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    <span>
                      6860 Bermuda Rd, Suite 200<br />
                      Las Vegas, NV 89119
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 shrink-0 text-[#EAA820]" />
                    <a
                      href="mailto:access@muzeoffice.com"
                      className="text-[#74726D] transition-colors hover:text-[#1A1A1A]"
                    >
                      access@muzeoffice.com
                    </a>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A6000]">
                      Preferred
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 shrink-0 text-[#EAA820]" />
                    <a
                      href="tel:+17023707515"
                      className="text-[#74726D] transition-colors hover:text-[#1A1A1A]"
                    >
                      (702) 370-7515
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#74726D]">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    <span>
                      Phone: Mon&ndash;Fri, 10 am &ndash; 5 pm
                      <br />
                      Front desk: Mon&ndash;Fri, 10 am &ndash; 7 pm
                    </span>
                  </li>
                </ul>

                <Link
                  href="/locations/las-vegas"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-2 w-fit rounded-lg"
                  )}
                >
                  View Location Details
                </Link>
              </CardContent>
            </Card>
            </FadeIn>

            {/* Houston */}
            <FadeIn delay={0.2}>
            <Card className="border-[#E6E4DF] bg-white">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-2">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold">
                    Muze Office Houston
                  </h2>
                  {houston?.status === "active" ? (
                    <Badge className="bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28] text-xs">
                      Open
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Coming Soon
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-[#74726D]">
                  Inside the 610 Loop in the Galleria / Tanglewood area. Free
                  parking on-site — no Post Oak garage fees.
                </p>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-3 text-sm text-[#74726D]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    <span>1800 Augusta Dr, Houston, TX 77057</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#74726D]">
                    <Mail className="h-4 w-4 shrink-0 text-[#EAA820]" />
                    <a
                      href="mailto:access@muzeoffice.com"
                      className="transition-colors hover:text-[#1A1A1A]"
                    >
                      access@muzeoffice.com
                    </a>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A6000]">
                      Preferred
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            </FadeIn>

            {/* Map Placeholder */}
            <FadeIn delay={0.3}>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-[#E6E4DF] bg-white">
              <div className="flex flex-col items-center gap-2 text-center">
                <MapPin className="h-8 w-8 text-[#EAA820]" />
                <p className="text-sm font-medium text-[#1A1A1A]">
                  6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119
                </p>
                <a
                  href="https://www.google.com/maps/place/6860+Bermuda+Rd+Suite+200,+Las+Vegas,+NV+89119"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-[#8A6000] hover:underline"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            </FadeIn>
          </div>

          {/* Right: Contact Form */}
          <FadeIn delay={0.2}>
          <div>
            <h2 className="mb-6 font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold">
              Send us a message
            </h2>
            <ContactForm />
          </div>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        heading="Prefer to visit in person?"
        subtitle="Schedule a tour and see the space firsthand. Walk through coworking, private offices, meeting rooms, and the on-site cafe."
        primaryLabel="Book a Tour"
        primaryHref={BRAND.booking.tourUrl}
        ctaLocation="contact_bottom"
      />
    </>
  );
}
