import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "How Much Does a Coworking Franchise Cost? (2026 Guide)",
  description:
    "What goes into the cost of a coworking franchise? A plain-English 2026 breakdown of the franchise fee, build-out, FF&E, technology, working capital, and fees.",
  alternates: { canonical: "/insights/coworking-franchise-cost" },
};

const ARTICLE_URL = `${BRAND.url}/insights/coworking-franchise-cost`;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How Much Does a Coworking Franchise Cost? (2026 Guide)",
  description:
    "An informational breakdown of the cost components behind a coworking franchise — franchise fee, build-out, FF&E, technology, working capital, ongoing royalty and marketing fees, and liquid-capital requirements.",
  datePublished: "2026-06-30",
  dateModified: "2026-06-30",
  inLanguage: "en-US",
  mainEntityOfPage: { "@type": "WebPage", "@id": ARTICLE_URL },
  author: { "@id": `${BRAND.url}/#organization` },
  publisher: { "@id": `${BRAND.url}/#organization` },
};

const costComponents = [
  {
    id: "initial-franchise-fee",
    title: "The initial franchise fee",
    body: "The franchise fee is a one-time payment to the franchisor for the right to operate under the brand and to access its system — training, the operating playbook, site-selection help, and launch support. It is paid up front and is separate from the money you spend building and opening the location itself.",
  },
  {
    id: "build-out-and-leasehold-improvements",
    title: "Build-out and leasehold improvements",
    body: "Turning a raw or second-generation suite into a finished workspace is usually the largest and most variable cost. It covers demolition, framing, flooring, lighting, HVAC, glass-front private offices, phone booths, and signage. How much you spend depends heavily on the condition of the space, its square footage, and local construction prices — which is why coworking franchises range so widely overall.",
  },
  {
    id: "furniture-fixtures-and-equipment",
    title: "Furniture, fixtures & equipment (FF&E)",
    body: "FF&E is everything that makes the space usable: desks, ergonomic chairs, lounge and reception furniture, meeting-room tables, kitchen and cafe fit-out, and decor. These items are budgeted separately from the construction build-out and scale with the number of desks, offices, and shared areas you plan to offer.",
  },
  {
    id: "technology-and-systems",
    title: "Technology and systems",
    body: "A modern coworking location runs on software and connected hardware. That means a booking and member-management platform such as Optix, keyless access control, business-grade Wi-Fi and networking, printers, security cameras, and a point-of-sale setup. Some of this is an upfront purchase and some is a recurring subscription you carry as an operating cost.",
  },
  {
    id: "working-capital-for-the-ramp-up-period",
    title: "Working capital for the ramp-up period",
    body: "Working capital is the cash you set aside to cover rent, payroll, utilities, and marketing during the ramp-up period — the opening months while a new location builds occupancy. Its job is to fund operations through that early stretch so the business is not relying on day-one demand. It is a budgeting buffer, not a projection of when, or whether, a location reaches any particular result.",
  },
  {
    id: "ongoing-royalty-and-marketing-fees",
    title: "Ongoing royalty and marketing fees",
    body: "Beyond the upfront costs, franchises charge ongoing fees. A royalty — typically calculated as a percentage of gross sales — is paid to the franchisor on a recurring basis, and most systems also collect a separate marketing-fund contribution. Treat these as recurring operating costs to plan for; they describe the fee structure, not the performance of any location.",
  },
  {
    id: "liquid-capital-and-net-worth-requirements",
    title: "Liquid capital and net-worth requirements",
    body: "Most franchisors set minimum liquid-capital and net-worth thresholds a candidate must meet to qualify. These requirements exist to confirm you can fund the full investment and the ramp-up period without overextending. They are eligibility criteria rather than a cost you pay, but they shape how much capital you need on hand before you begin.",
  },
];

export default function CoworkingFranchiseCostPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          {
            name: "How Much Does a Coworking Franchise Cost?",
            path: "/insights/coworking-franchise-cost",
          },
        ]}
      />
      <JsonLd data={articleSchema} />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[760px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              Insights
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              How much does a coworking franchise cost?
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[620px]">
              The honest answer is &ldquo;it depends&rdquo; — but it depends on a short, knowable list
              of cost components. Here is what actually drives the number, and where to find the
              specifics for a Muze Office franchise.
            </p>
            <p className="text-sm text-gray-500">Updated June 2026 · 6 min read</p>
          </div>
        </FadeIn>
      </Section>

      {/* Direct answer (snippet-bait) */}
      <Section variant="white" id="direct-answer">
        <FadeIn>
          <div className="flex flex-col gap-4 max-w-[760px]">
            <p className="text-xl leading-relaxed text-[#1A1A1A]">
              A coworking franchise&apos;s total investment covers a one-time franchise fee, build-out
              and leasehold improvements, furniture and equipment, technology, and working capital to
              fund the opening months, plus ongoing royalty and marketing-fund fees. Totals range
              widely by market, location size, and how much build-out the space needs.
            </p>
            <p className="text-[#74726D] leading-relaxed">Here&apos;s what goes into that number.</p>
          </div>
        </FadeIn>
      </Section>

      {/* Cost components */}
      <Section variant="gray" id="cost-components">
        <div className="flex flex-col gap-12 max-w-[760px]">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820]">
              What drives the cost
            </p>
          </FadeIn>
          {costComponents.map((c) => (
            <FadeIn key={c.id}>
              <div className="flex flex-col gap-3" id={c.id}>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                  {c.title}
                </h2>
                <p className="text-[#74726D] leading-relaxed">{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Muze-specific */}
      <Section variant="white" id="muze-specifically">
        <FadeIn>
          <div className="flex flex-col gap-4 max-w-[760px]">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
              What about a Muze Office franchise specifically?
            </h2>
            <p className="text-[#74726D] leading-relaxed">
              Muze Office takes a different approach to transparency. Rather than holding the numbers
              back until a sales call, Muze publishes every fee in the franchise program — including
              the royalty and marketing-fund percentages that most franchisors keep off their
              websites. You can review the full cost structure before you ever speak with us.
            </p>
            <p className="text-[#74726D] leading-relaxed">
              To see the line-by-line breakdown,{" "}
              <Link
                href="/investment"
                className="font-medium text-[#1A1A1A] underline underline-offset-4 hover:text-[#EAA820]"
              >
                see the full Muze Office franchise investment and fees
              </Link>
              . If you&apos;re weighing whether the model fits you, read about{" "}
              <Link
                href="/who-its-for"
                className="font-medium text-[#1A1A1A] underline underline-offset-4 hover:text-[#EAA820]"
              >
                who the Muze Office model is built for
              </Link>
              .
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Compliance note */}
      <Section variant="gray" id="compliance">
        <FadeIn>
          <div className="max-w-[760px] rounded-xl border border-[#E6E4DF] bg-white p-6">
            <p className="text-sm leading-relaxed text-[#74726D]">
              The components and ranges discussed above describe <strong className="text-[#1A1A1A]">costs, not earnings</strong>.
              Coworking franchise investments vary widely by market, location size, and build-out
              scope, and nothing on this page is a representation of revenue, profit, or financial
              results. Any financial-performance information about a Muze Office franchise is provided
              solely through Item 19 of our Franchise Disclosure Document (FDD).
            </p>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Want the numbers for your market?"
        subtitle="Book a no-pressure discovery call. We'll walk through the full investment, every fee, and what it takes to open in your city."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="insights_cost_bottom"
        showPhone
      />
    </>
  );
}
