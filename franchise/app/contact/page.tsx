import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, CalendarDays } from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FranchiseInquiryForm } from "@/components/forms/franchise-inquiry-form";
import { FadeIn } from "@/components/marketing/animate";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Muze Office franchise team. Reach us by email, phone, or submit your details and we'll follow up within one business day.",
  alternates: { canonical: "/contact" },
};

const contactOptions = [
  {
    icon: CalendarDays,
    label: "Book a discovery call",
    value: "The fastest path if you're serious about franchising, investing, or partnering.",
    href: "/discovery-call",
    isExternal: false,
    cta: "Book a call →",
  },
  {
    icon: Mail,
    label: "Email us",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    isExternal: false,
    cta: null,
  },
  {
    icon: Phone,
    label: "Call us",
    value: BRAND.phoneDisplay,
    href: `tel:${BRAND.phoneTel}`,
    isExternal: false,
    cta: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — contact info */}
          <FadeIn>
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
                  Get in touch
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[#74726D]">
                  Whether you have a quick question or you&apos;re ready to explore the
                  Muze Office franchise in detail, we&apos;re happy to connect. The best
                  starting point for serious inquiries is a{" "}
                  <Link
                    href="/discovery-call"
                    className="font-medium text-[#EAA820] hover:underline"
                  >
                    discovery call
                  </Link>{" "}
                  — but an email or phone call works too.
                </p>
              </div>

              {/* Contact methods */}
              <div className="flex flex-col gap-4">
                {contactOptions.map(({ icon: Icon, label, value, href, cta }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2F1ED]">
                      <Icon className="h-5 w-5 text-[#EAA820]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-[#1A1A1A]">{label}</p>
                      <p className="text-sm text-[#74726D]">{value}</p>
                      {cta ? (
                        <Link
                          href={href}
                          className="mt-1 text-sm font-medium text-[#EAA820] hover:underline"
                        >
                          {cta}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="mt-1 text-sm font-medium text-[#EAA820] hover:underline"
                        >
                          {value}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Muze Office address */}
              <div className="rounded-xl border border-[#E6E4DF] bg-[#F2F1ED] p-5">
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Muze International Corporation
                </p>
                <address className="mt-2 not-italic text-sm leading-relaxed text-[#74726D]">
                  6860 Bermuda Rd, Suite 200
                  <br />
                  Las Vegas, NV 89119
                </address>
                <p className="mt-3 text-xs text-[#74726D]">
                  Franchise inquiries only. For workspace memberships, visit{" "}
                  <a
                    href={BRAND.mainSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#EAA820] hover:underline"
                  >
                    muzeoffice.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT — form */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold text-[#1A1A1A]">
                  Send us a message
                </h2>
                <p className="mt-1 text-sm text-[#74726D]">
                  We respond to all inquiries within one business day.
                </p>
              </div>
              <FranchiseInquiryForm className="rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] p-6 md:p-8" />
            </div>
          </FadeIn>
        </div>
      </Section>

      <CTASection
        heading="Ready to explore franchise ownership?"
        subtitle="A discovery call is the fastest way to get real answers about territory availability, investment, and next steps."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="contact_bottom"
        showPhone
      />
    </>
  );
}
