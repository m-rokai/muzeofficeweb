import type { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  ReceiptText,
  Repeat2,
  Layers,
  Clock,
  CreditCard,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Info,
  Eye,
  Wallet,
  Target,
  UserCheck,
  FileText,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "How Much Does a Coworking Franchise Cost? Investment & Fees",
  description:
    "How much it costs to open a Muze Office coworking franchise: total investment range, franchise fee, royalty and brand-fund percentages, liquid capital required, financing, and timeline. We publish every fee up front. Figures are illustrative until your FDD.",
  alternates: { canonical: "/investment" },
};

// Quick-facts table — the snippet-bait "at a glance" answer. Every value is an
// illustrative Item 7 placeholder until replaced with verified FDD figures.
const quickFacts = [
  { label: "Total initial investment", token: "{{INVESTMENT_RANGE}}" },
  { label: "Initial franchise fee", token: "{{FRANCHISE_FEE}}" },
  { label: "Ongoing royalty", token: "{{ROYALTY}}", note: "of gross revenue" },
  { label: "Brand & marketing fund", token: "{{MARKETING_FEE}}", note: "of gross revenue" },
  { label: "Liquid capital required", token: "{{LIQUID_CAPITAL}}" },
  { label: "Net worth required", token: "{{NET_WORTH}}" },
];

// "Is this right for you?" qualification traits — no financial claims.
const ownerProfile = [
  {
    icon: Target,
    title: "You want a B2B, recurring-revenue business",
    body: "A Muze Office earns from memberships, virtual offices, private suites, meeting rooms, and events — recurring revenue lines, not one-off transactions.",
  },
  {
    icon: UserCheck,
    title: "You're an operator or investor — experience optional",
    body: "Owner-operators and semi-absentee investors both fit the model. Coworking experience is not required; the playbook and training fill the gap.",
  },
  {
    icon: Wallet,
    title: "You meet the capital requirements",
    body: "Opening a location requires {{LIQUID_CAPITAL}} in liquid capital and {{NET_WORTH}} in net worth. These figures are illustrative placeholders until your FDD.",
  },
  {
    icon: CheckCircle2,
    title: "You're ready to invest in your community",
    body: "The strongest operators are present in their market — building local relationships, hosting events, and growing membership in a city they know.",
  },
];

const investmentBreakdown = [
  { label: "Franchise / license fee", token: "{{FRANCHISE_FEE}}", note: "One-time, paid at signing" },
  { label: "Leasehold improvements & buildout", token: "{{BUILDOUT_COST}}", note: "Varies by space condition and size" },
  { label: "Furniture, fixtures & equipment (FF&E)", token: "{{FFE_COST}}", note: "Desks, chairs, tech, signage" },
  { label: "Working capital (3–6 months)", token: "{{WORKING_CAPITAL}}", note: "Covers pre-revenue operating costs" },
  { label: "Technology setup & onboarding", token: "{{TECH_SETUP}}", note: "Optix, hardware, software licenses" },
  { label: "Additional opening costs", token: "{{ADDITIONAL_COSTS}}", note: "Training, travel, marketing launch" },
];

const ongoingFees = [
  {
    icon: Repeat2,
    label: "Royalty fee",
    value: "{{ROYALTY}}",
    description:
      "Ongoing royalty on gross revenue. Covers continued access to the brand, playbook, technology, and support infrastructure.",
  },
  {
    icon: Layers,
    label: "Brand & marketing fund",
    value: "{{MARKETING_FEE}}",
    description:
      "Contribution to the shared marketing fund used for national brand-building, digital advertising, and creative asset development.",
  },
];

const revenueLines = [
  {
    title: "Coworking memberships",
    description:
      "Monthly hot-desk and dedicated-desk memberships are the foundation — recurring, predictable revenue that compounds as your member base grows.",
  },
  {
    title: "Virtual office plans",
    description:
      "Business address, mail handling, and phone services generate revenue with virtually no incremental space or staffing cost.",
  },
  {
    title: "Private office suites",
    description:
      "Enclosed offices for small teams command premium per-square-foot pricing and anchor your monthly revenue with longer commitment periods.",
  },
  {
    title: "Meeting room & event bookings",
    description:
      "Hourly meeting room rentals and event space hire fill calendar gaps with high per-hour revenue, often from non-members.",
  },
  {
    title: "Day passes & drop-in",
    description:
      "Walk-in access converts visitors into members over time while generating immediate revenue with zero advance commitment from the customer.",
  },
];

const openingTimeline = [
  { step: "01", title: "Discovery & qualification", detail: "Discovery call, review of disclosure documents, and mutual qualification" },
  { step: "02", title: "Agreement & market confirmation", detail: "Franchise agreement signed; territory and market confirmed" },
  { step: "03", title: "Site selection & lease", detail: "Site scoring, space evaluation, lease negotiation, and execution" },
  { step: "04", title: "Buildout & technology setup", detail: "Construction, FF&E installation, Optix configuration, staff hiring" },
  { step: "05", title: "Training & pre-opening", detail: "Operator training program, soft launch, and marketing activation" },
  { step: "06", title: "Grand opening", detail: "Public launch with Muze launch support; member acquisition begins" },
];

export default function InvestmentPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Investment & Fees", path: "/investment" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${BRAND.url}/investment#franchise-investment`,
          name: "Muze Office Coworking Franchise",
          serviceType: "Coworking & flexible-workspace franchise opportunity",
          provider: { "@id": `${BRAND.url}/#organization` },
          areaServed: { "@type": "Country", name: "United States" },
          audience: {
            "@type": "BusinessAudience",
            name: "Prospective coworking franchisees and investors",
          },
          // NOTE: add `offers.priceSpecification` (priceCurrency USD + the verified
          // Item 7 total investment range) here once real FDD figures are available.
          // Left omitted intentionally — never publish a fabricated franchise price.
          offers: {
            "@type": "Offer",
            category: "Franchise",
            priceCurrency: "USD",
            url: `${BRAND.url}/investment`,
          },
          url: `${BRAND.url}/investment`,
        }}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              Investment & Fees
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              What a Muze Office coworking franchise costs
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              Here&apos;s the full cost of opening a Muze Office — the total investment, the franchise
              fee, and the ongoing royalty and brand-fund fees most franchisors keep hidden until
              late in the process. Every figure is an illustrative placeholder until it&apos;s confirmed
              in your Franchise Disclosure Document.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/discovery-call"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="book_discovery_call"
                data-cta-location="investment_hero"
              >
                Get exact numbers on a discovery call
              </Link>
              <Link
                href="/the-model"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_model"
                data-cta-location="investment_hero"
              >
                What the model includes
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Initial investment range card */}
      <Section variant="white" id="initial-investment">
        {/* Direct-answer block (featured-snippet / AI-answer bait) */}
        <FadeIn>
          <div className="mb-12 max-w-[820px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              The short answer
            </p>
            <p className="font-[family-name:var(--font-plus-jakarta)] text-xl font-medium leading-relaxed text-[#1A1A1A] sm:text-2xl">
              A Muze Office coworking franchise has an estimated total investment of{" "}
              <span className="text-[#EAA820]">{"{{INVESTMENT_RANGE}}"}</span>, including a{" "}
              {"{{FRANCHISE_FEE}}"} initial franchise fee, with a {"{{ROYALTY}}"} ongoing royalty
              and a {"{{MARKETING_FEE}}"} brand-fund contribution. You&apos;ll typically need{" "}
              {"{{LIQUID_CAPITAL}}"} in liquid capital to open. Every figure here is an illustrative
              placeholder until it&apos;s confirmed in your Franchise Disclosure Document.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mb-10 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Initial investment
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Estimated total investment range
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              The ranges below reflect typical costs across Muze Office locations. Your actual
              investment will depend on your market, the space you select, its existing condition,
              and the scope of buildout required.
            </p>
          </div>
        </FadeIn>

        {/* Big range card */}
        <FadeIn>
          <div className="mb-10 rounded-2xl border-2 border-[#EAA820] bg-[#FAFAF7] p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D]">
                Total estimated initial investment
              </p>
              <p className="font-[family-name:var(--font-plus-jakarta)] text-5xl font-bold text-[#1A1A1A]">
                {"{{INVESTMENT_RANGE}}"}
              </p>
              <p className="text-sm text-[#74726D] max-w-[420px]">
                Illustrative range only. Actual figures are provided in the Franchise Disclosure
                Document and vary by location.
              </p>
            </div>
            <div className="flex shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAA820]/10">
                <DollarSign className="h-8 w-8 text-[#EAA820]" />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Transparency wedge + quick-facts table */}
        <FadeIn>
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#EAA820]/30 bg-[#EAA820]/5 p-5">
            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-[#EAA820]" />
            <p className="text-sm leading-relaxed text-[#1A1A1A]">
              <strong className="font-semibold">We publish every fee up front.</strong> Most
              coworking franchisors show you the total investment but hide the royalty and
              marketing-fund percentages until you&apos;re deep in their sales process. We don&apos;t — the
              numbers below are the same ones disclosed in our FDD.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mb-10 rounded-xl border border-[#E6E4DF] overflow-hidden">
            <div className="bg-[#F2F1ED] px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D]">
                The numbers at a glance (illustrative placeholders)
              </p>
            </div>
            <div className="flex flex-col divide-y divide-[#E6E4DF]">
              {quickFacts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <p className="text-sm font-medium text-[#1A1A1A]">{f.label}</p>
                  <p className="font-[family-name:var(--font-plus-jakarta)] text-base font-bold text-[#1A1A1A] whitespace-nowrap">
                    {f.token}
                    {f.note && (
                      <span className="ml-1.5 text-xs font-normal text-[#74726D]">{f.note}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Breakdown table */}
        <FadeIn>
          <div className="rounded-xl border border-[#E6E4DF] overflow-hidden">
            <div className="bg-[#F2F1ED] px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D]">
                Cost breakdown (illustrative — figures are placeholders)
              </p>
            </div>
            <div className="flex flex-col divide-y divide-[#E6E4DF]">
              {investmentBreakdown.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-[#1A1A1A]">{item.label}</p>
                    <p className="text-xs text-[#74726D]">{item.note}</p>
                  </div>
                  <p className="font-[family-name:var(--font-plus-jakarta)] text-base font-bold text-[#1A1A1A] sm:text-right whitespace-nowrap">
                    {item.token}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <p className="text-sm leading-relaxed text-blue-900">
              These cost categories are illustrative. A detailed, itemized estimate for your
              specific market and space is provided during the disclosure and discovery process —
              not before, as FTC regulations govern what we can share and how.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Franchise fee */}
      <Section variant="gray" id="franchise-fee">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                <ReceiptText className="h-6 w-6 text-[#EAA820]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
                  One-time fee
                </p>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                  Franchise fee
                </h2>
              </div>
              <p className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold text-[#1A1A1A]">
                {"{{FRANCHISE_FEE}}"}
              </p>
              <p className="text-[#74726D] leading-relaxed">
                The initial franchise fee is paid at signing and is included in the total investment
                range above. It is a one-time payment that grants you the license to operate under
                the Muze Office brand and access the full model.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-[#E6E4DF] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D] mb-5">
                What the franchise fee covers
              </p>
              <p className="text-sm text-[#74726D] leading-relaxed mb-5">
                {"{{FRANCHISE_FEE_INCLUDES}}"}
              </p>
              <Separator className="my-5 bg-[#E6E4DF]" />
              <ul className="flex flex-col gap-3">
                {[
                  "Brand license and trademark rights",
                  "Pre-opening training program",
                  "Launch support (on-site or virtual)",
                  "Full operations and marketing playbook",
                  "Optix technology setup and onboarding",
                  "Site-selection and buildout standards",
                  "Initial marketing and launch campaign support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    <span className="text-sm text-[#1A1A1A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Ongoing fees */}
      <Section variant="white" id="ongoing-fees">
        <FadeIn>
          <div className="mb-10 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Ongoing fees
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              What you pay after opening
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              Ongoing fees are calculated as a percentage of gross revenue. They cover continued
              access to the brand, support, and shared marketing — costs you&apos;d otherwise carry
              alone as an independent operator.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {ongoingFees.map((fee) => {
            const Icon = fee.icon;
            return (
              <StaggerItem key={fee.label}>
                <Card className="h-full border-[#E6E4DF] shadow-none">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAA820]/10">
                        <Icon className="h-5 w-5 text-[#EAA820]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#74726D]">{fee.label}</p>
                        <p className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A]">
                          {fee.value}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-[#74726D]">{fee.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Revenue model overview */}
      <Section variant="gray" id="revenue-model">
        <FadeIn>
          <div className="mb-10 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Revenue overview
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              How Muze Office locations generate revenue
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              A Muze Office is not a single-product business. From day one, you operate five
              distinct revenue streams — each serving a different type of member or visitor. This
              diversification is one of the model&apos;s structural advantages.
            </p>
            <p className="mt-3 text-sm text-[#74726D]">
              <strong className="text-[#1A1A1A]">Important:</strong> This section describes the
              revenue lines available to operators. It is not a representation of likely earnings,
              profitability, or financial performance. Actual results vary by location and are not
              guaranteed.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {revenueLines.map((line) => (
            <StaggerItem key={line.title}>
              <div className="flex flex-col gap-3 rounded-xl border border-[#E6E4DF] bg-white p-6 h-full">
                <CheckCircle2 className="h-5 w-5 text-[#EAA820]" />
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-[#1A1A1A]">
                  {line.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#74726D]">{line.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-[#74726D]">
              See the live product and pricing at the Las Vegas flagship:
            </p>
            <a
              href={BRAND.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] underline underline-offset-4 hover:text-[#EAA820] transition-colors"
              data-cta="view_main_site"
              data-cta-location="investment_revenue"
            >
              muzeoffice.com
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </FadeIn>
      </Section>

      {/* Is this right for you? — qualification */}
      <Section variant="white" id="qualification">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Is this right for you?
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Who the Muze Office model fits
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              A franchise is a serious commitment, and not every prospect is the right fit. The
              strongest Muze Office owners tend to share a few things in common.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {ownerProfile.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title}>
                <div className="flex gap-5 rounded-xl border border-[#E6E4DF] p-6 h-full">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAA820]/10">
                    <Icon className="h-5 w-5 text-[#EAA820]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-[#1A1A1A]">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#74726D]">{p.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <FadeIn>
          <div className="mt-8">
            <Link
              href="/who-its-for"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] underline underline-offset-4 hover:text-[#EAA820] transition-colors"
              data-cta="view_who_its_for"
              data-cta-location="investment_qualification"
            >
              See who the Muze Office franchise is for
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Financial performance / Item 19 — earnings-free placeholder */}
      <Section variant="gray" id="financial-performance">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                <FileText className="h-6 w-6 text-[#EAA820]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
                  Financial performance
                </p>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                  What a Muze Office can earn
                </h2>
              </div>
              <p className="text-[#74726D] leading-relaxed">
                The honest answer: we don&apos;t publish earnings, revenue, or profit figures on this
                website — and you should be cautious of any franchisor that does. Under the FTC
                Franchise Rule, financial-performance information may only be shared through Item 19
                of the Franchise Disclosure Document, backed by a reasonable basis and written
                substantiation.
              </p>
              <p className="text-[#74726D] leading-relaxed">
                When you request our FDD, you&apos;ll see exactly what we&apos;re able to represent about the
                model&apos;s performance — with the assumptions and context behind it.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-[#E6E4DF] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D] mb-4">
                Item 19 — financial performance representation
              </p>
              <div className="rounded-lg border border-dashed border-[#E6E4DF] bg-[#FAFAF7] p-5">
                <p className="text-sm leading-relaxed text-[#74726D]">{"{{ITEM_19_SUMMARY}}"}</p>
                <p className="mt-4 text-xs leading-relaxed text-[#74726D]">
                  {"{{ITEM_19_ADMONITION}}"} — e.g. &ldquo;Some outlets have earned this amount. Your
                  individual results may differ. There is no assurance that you&apos;ll earn as much.&rdquo;
                  Written substantiation available on reasonable request.
                </p>
              </div>
              <p className="mt-4 text-xs text-[#74726D]">
                Placeholder — drop in the verbatim Item 19 figures and required admonition from the
                current FDD before go-live, or leave routed to &ldquo;request the FDD.&rdquo; No earnings claim
                is made until then.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-[#1A1A1A] px-6 text-sm font-semibold text-white hover:bg-[#333] transition-colors"
                data-cta="request_fdd"
                data-cta-location="investment_item19"
              >
                Request the FDD
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Financing & timeline */}
      <Section variant="white" id="financing-timeline">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Financing */}
          <FadeIn>
            <div className="flex flex-col gap-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                <CreditCard className="h-6 w-6 text-[#EAA820]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
                  Financing
                </p>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                  Financing options
                </h2>
              </div>
              <p className="text-[#74726D] leading-relaxed">
                {"{{FINANCING_NOTES}}"}
              </p>
              <div className="rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] p-5">
                <p className="text-sm text-[#74726D] leading-relaxed">
                  Muze does not provide direct financing. Franchisees typically fund through a
                  combination of personal capital, SBA loans, business lines of credit, and investor
                  partners. The discovery call is the right place to discuss capital structure for
                  your situation.
                </p>
                <p className="mt-4 text-sm text-[#74726D] leading-relaxed">
                  <strong className="text-[#1A1A1A]">Plan for the ramp.</strong> Like any new
                  location, a Muze Office takes time to build membership. That&apos;s why several months
                  of working capital are built into the investment range above — so you&apos;re funded
                  through the ramp-up period, not caught short.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Timeline */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                <Clock className="h-6 w-6 text-[#EAA820]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
                  Timeline
                </p>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                  Time to open: {"{{TIME_TO_OPEN}}"}
                </h2>
              </div>
              <p className="text-[#74726D] leading-relaxed">
                From signed agreement to grand opening, most Muze Office locations open within
                {"{{TIME_TO_OPEN}}"}. The largest variables are site selection, permitting timelines,
                and buildout scope — all of which are mapped on the discovery call.
              </p>
              <div className="flex flex-col gap-3">
                {openingTimeline.map((stage) => (
                  <div key={stage.step} className="flex gap-4 items-start">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAA820]/10 text-xs font-bold text-[#EAA820]">
                      {stage.step}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-semibold text-[#1A1A1A]">{stage.title}</p>
                      <p className="text-xs text-[#74726D]">{stage.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Prominent FTC disclaimer block */}
      <Section variant="gray" id="disclaimer">
        <FadeIn>
          <div className="rounded-2xl border-2 border-[#E6E4DF] bg-white p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
                <ShieldAlert className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#1A1A1A]">
                  Important legal notice
                </h2>
                <p className="text-sm leading-relaxed text-[#74726D]">
                  {BRAND.disclaimer}
                </p>
                <Separator className="bg-[#E6E4DF]" />
                <p className="text-xs leading-relaxed text-[#74726D]">
                  All financial figures shown on this page — including investment ranges, fees, and
                  cost breakdowns — are illustrative placeholder tokens. They will be replaced with
                  verified figures before this site goes live. No figure on this site constitutes a
                  representation of likely earnings, and no earnings claim is made or implied.
                  Prospective franchisees should consult with independent legal and financial
                  advisors before making any investment decision.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Internal links */}
      <Section variant="white" id="next-steps">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[520px]">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                Questions about the numbers?
              </h2>
              <p className="mt-3 text-[#74726D] leading-relaxed">
                The fastest way to get real figures is a discovery call. If you want to understand
                the model further first, the pages below cover what you receive for your investment.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-model"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_model"
                data-cta-location="investment_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">What you get</p>
                  <p className="text-xs text-[#74726D] mt-0.5">The full model breakdown</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/the-opportunity"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_opportunity"
                data-cta-location="investment_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Why coworking</p>
                  <p className="text-xs text-[#74726D] mt-0.5">The market opportunity</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Get exact numbers on a discovery call"
        subtitle="Every figure on this page is a placeholder. Book a call and we'll walk you through real costs, fees, and what to expect for your specific market and space."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="investment_bottom"
        showPhone
      />
    </>
  );
}
