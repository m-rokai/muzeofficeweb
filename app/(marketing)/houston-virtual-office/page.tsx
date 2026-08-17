import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Section } from "@/components/layout/section";
import { HoustonWaitlistForm } from "@/components/forms/houston-waitlist-form";
import { OG_DEFAULTS } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Houston Virtual Office | Galleria Opening 2026",
  description:
    "Explore Muze Office Houston virtual office early access for the planned 2026 Galleria opening at 1800 Augusta Dr. Address and mail services are not active yet; join the waitlist for confirmed details.",
  alternates: { canonical: "/houston-virtual-office" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Houston Virtual Office | Galleria Opening 2026",
    description:
      "Join early access for Muze Office Houston's planned 2026 virtual office opening near the Galleria. Houston address services are not active yet.",
    type: "website",
    url: "/houston-virtual-office",
  },
  robots: { index: true, follow: true },
};

const guides = [
  {
    href: "/blog/best-virtual-office-providers-in-houston",
    title: "How to compare Houston virtual office providers",
    description: "A practical checklist for address rules, staffing, mail handling, and contract terms.",
  },
  {
    href: "/blog/how-to-set-up-a-virtual-office-in-houston",
    title: "How to set up a virtual office in Houston",
    description: "Understand Form 1583, identity review, and the questions to ask an active provider.",
  },
  {
    href: "/blog/virtual-office-vs-po-box-in-texas",
    title: "Virtual office vs. PO Box in Texas",
    description: "Compare address formats, mail, packages, and registered-agent requirements.",
  },
];

export default function HoustonVirtualOfficePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Houston", href: "/locations/houston" },
          { label: "Houston Virtual Office", href: "/houston-virtual-office" },
        ]}
      />

      <section className="bg-[#1A1A1A] px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-6">
          <span className="rounded-full bg-[#EAA820]/15 px-4 py-1 text-sm font-semibold text-[#EAA820]">
            Planned opening · 2026
          </span>
          <h1 className="text-balance font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold md:text-6xl">
            Houston Virtual Office in the Galleria
          </h1>
          <p className="max-w-[680px] text-pretty text-lg leading-relaxed text-gray-300 md:text-xl">
            Muze Office is planning a Houston virtual office and workspace at
            1800 Augusta Dr in the Galleria / Tanglewood area. Join early access
            for verified opening updates; no Houston address or mail service is
            active yet.
          </p>
          <a
            href="#early-access"
            data-cta="houston_virtual_office_waitlist"
            data-cta-location="houston_virtual_office_hero"
            className="inline-flex items-center gap-2 rounded-lg bg-[#EAA820] px-6 py-3 font-semibold text-[#1A1A1A] transition-colors hover:bg-[#C17A28]"
          >
            Join Houston early access <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-[1000px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6000]">
              What is planned
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A]">
              A commercial bridge for Houston founders planning ahead
            </h2>
            <p className="mt-5 leading-relaxed text-[#74726D]">
              The Houston location is planned for 2026 at 1800 Augusta Dr in
              Houston&apos;s Galleria / Tanglewood area. The high-level workspace
              mix may include a business address and mail services, workspace
              access, and meeting space, subject to final confirmation.
            </p>
            <ul className="mt-6 flex flex-col gap-4 text-sm text-[#74726D]">
              {[
                "Join if you are researching a Houston business address, mail service, or workspace before opening.",
                "Tell us whether you are planning for a virtual office, coworking, private office, or meeting space.",
                "We will share confirmed availability, service details, and next steps when the Houston launch is ready.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#E6E4DF] bg-[#F7F6F3] p-6 md:p-8">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#EAA820]" aria-hidden="true" />
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold">Planned Houston location</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#74726D]">1800 Augusta Dr, Houston, TX — Galleria / Tanglewood area.</p>
              </div>
            </div>
            <p className="mt-5 border-t border-[#E6E4DF] pt-5 text-sm leading-relaxed text-[#74726D]">
              This is a planning address only. It is not currently available
              for Houston mail, memberships, bookings, or business-address use.
              Pricing, mail process, staffing, suite format, features, and terms
              are not final.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="gray">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A]">Research before you choose</h2>
          <p className="mt-3 max-w-[700px] leading-relaxed text-[#74726D]">Our Houston guides explain the questions to ask active providers while Muze Office remains pre-opening.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="group rounded-xl border border-[#E6E4DF] bg-white p-6 transition-colors hover:border-[#EAA820]">
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">{guide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#74726D]">{guide.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8A6000]">Read the guide <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div id="early-access" className="mx-auto grid max-w-[1000px] scroll-mt-24 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6000]">Houston early access</p>
            <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A]">Tell us what you need when Houston opens</h2>
            <p className="mt-4 leading-relaxed text-[#74726D]">There is no payment or membership commitment. Your response helps us understand demand and lets us contact you when details are confirmed.</p>
            <Link href="/locations/houston" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8A6000] hover:underline">See the broader Houston opening hub <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded-2xl border border-[#E6E4DF] bg-white p-6 shadow-sm md:p-8"><HoustonWaitlistForm /></div>
        </div>
      </Section>
    </>
  );
}
