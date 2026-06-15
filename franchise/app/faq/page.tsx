import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { FAQSection } from "@/components/marketing/faq-section";
import { CTASection } from "@/components/marketing/cta-section";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FadeIn } from "@/components/marketing/animate";
import { franchiseFAQs } from "@/lib/data/franchise-faqs";

export const metadata: Metadata = {
  title: "Franchise FAQ",
  description:
    "Answers on cost, support, territories, timeline, and how to invest in or partner with Muze Office.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />

      <Section variant="white">
        <FadeIn>
          <div className="max-w-[720px]">
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
              Franchise FAQ
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#74726D]">
              Everything you need to know about operating, investing in, or partnering
              on a Muze Office location — from costs and territories to timeline and
              ongoing support. If your question isn&apos;t here,{" "}
              <a
                href="/contact"
                className="font-medium text-[#EAA820] hover:underline"
              >
                get in touch
              </a>{" "}
              or{" "}
              <a
                href="/discovery-call"
                className="font-medium text-[#EAA820] hover:underline"
              >
                book a discovery call
              </a>
              .
            </p>
          </div>
        </FadeIn>
      </Section>

      <FAQSection
        faqs={franchiseFAQs}
        heading="Your questions, answered"
        description="These are the questions we hear most from prospective operators, investors, and real-estate partners."
      />

      <CTASection
        heading="Ready to go deeper?"
        subtitle="A 30-minute discovery call is the fastest way to get your specific questions answered and check territory availability."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="faq_bottom"
        showPhone
      />
    </>
  );
}
