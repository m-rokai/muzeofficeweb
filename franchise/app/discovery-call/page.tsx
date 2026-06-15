import type { Metadata } from "next";
import { CheckCircle2, Calendar, Users, Map, MessageSquare } from "lucide-react";
import { Section } from "@/components/layout/section";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FranchiseInquiryForm } from "@/components/forms/franchise-inquiry-form";
import { FadeIn } from "@/components/marketing/animate";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Tell us about your goals and book a 1:1 franchise discovery call with Muze Office. We cover territory availability, costs, and next steps.",
  alternates: { canonical: "/discovery-call" },
};

const whatToExpect = [
  {
    icon: Calendar,
    title: "30 minutes, no pressure",
    body: "A focused conversation — not a sales pitch. We want to understand your market, your situation, and whether the Muze model makes sense for you.",
  },
  {
    icon: Map,
    title: "Territory check",
    body: "We'll confirm whether your target market is available and walk through what we know about coworking demand in that area.",
  },
  {
    icon: MessageSquare,
    title: "Real numbers",
    body: "We'll share what we know about investment ranges, fees, and timelines so you can make an informed decision — no vague promises.",
  },
  {
    icon: Users,
    title: "Your questions first",
    body: "Bring whatever is on your mind — licensing structure, day-to-day support, investor structures, or how the Houston rollout compares to Las Vegas.",
  },
];

const whoItsFor = [
  "Owner-operators who want to run their own flexible-workspace location",
  "Capital partners or JV investors exploring the coworking sector",
  "Landlords and commercial real-estate owners considering a space conversion",
  "Multi-unit operators looking to add a workspace vertical",
];

export default function DiscoveryCallPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Book a Discovery Call", path: "/discovery-call" },
        ]}
      />

      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — context */}
          <FadeIn>
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820]">
                  Start here
                </p>
                <h1 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
                  Book your franchise discovery call
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[#74726D]">
                  The discovery call is a 30-minute conversation with the Muze Office
                  team — no scripts, no pressure. We learn about your market and goals;
                  you get real answers about costs, support, and territory availability.
                </p>
              </div>

              {/* What to expect */}
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                  What we cover
                </h2>
                <ul className="mt-4 flex flex-col gap-4">
                  {whatToExpect.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#EAA820]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#74726D]">
                          {body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who it's for */}
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                  Who should book a call
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {whoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#74726D]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct scheduler */}
              <div className="flex flex-col gap-3 rounded-xl border border-[#E6E4DF] bg-[#F2F1ED] p-6">
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Prefer to pick a time directly?
                </p>
                <p className="text-sm text-[#74726D]">
                  Skip the form and grab a slot on our calendar now.
                </p>
                <a
                  href={BRAND.scheduling.discoveryCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center rounded-lg bg-[#1A1A1A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#333]"
                >
                  Pick a time →
                </a>
                <p className="text-xs text-[#74726D]">
                  Or call us directly:{" "}
                  <a
                    href={`tel:${BRAND.phoneTel}`}
                    className="font-medium text-[#1A1A1A] hover:text-[#EAA820]"
                  >
                    {BRAND.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT — form */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold text-[#1A1A1A]">
                  Tell us about your goals
                </h2>
                <p className="mt-1 text-sm text-[#74726D]">
                  Fill this out and we&apos;ll reach out within one business day to
                  schedule your call.
                </p>
              </div>
              <FranchiseInquiryForm className="rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] p-6 md:p-8" />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
