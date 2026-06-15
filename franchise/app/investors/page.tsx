import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ShieldCheck,
  Layers,
  Settings,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Users,
  Repeat2,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Invest in Coworking with Muze Office",
  description:
    "Invest in the flexible-workspace model as a capital partner with Muze Office. Passive or active participation in new coworking locations while an experienced operator handles day-to-day management.",
  alternates: { canonical: "/investors" },
};

const whoItIsFor = [
  {
    icon: TrendingUp,
    headline: "Capital partners seeking real-asset exposure",
    body: "You want your investment tied to a physical business with recurring revenue — not a speculative instrument. A Muze Office location is a brick-and-mortar operation with multiple income streams and a proven operator behind it.",
  },
  {
    icon: Users,
    headline: "Investors who prefer not to manage day-to-day",
    body: "Your capital does the work; an experienced operator runs the location. Muze's franchise infrastructure — brand, technology, and playbook — provides the operating system that keeps the business on track without requiring your daily involvement.",
  },
  {
    icon: Layers,
    headline: "Existing real-estate or business investors diversifying",
    body: "If your portfolio is concentrated in a single asset class, a flexible-workspace investment offers exposure to the commercial real-estate trend of density — more revenue per square foot than traditional office leases.",
  },
  {
    icon: Repeat2,
    headline: "Long-term partners interested in multiple locations",
    body: "Investors who see the flexible-workspace trend as durable, not cyclical, sometimes prefer to back multiple Muze locations over time. The discovery call is the right place to discuss multi-location investment structures.",
  },
];

const muzeHandles = [
  "Brand standards and marketing systems — so the location competes on arrival",
  "Optix technology platform — bookings, billing, and member management are automated",
  "Operations playbook — pricing, staffing, and member experience are defined, not improvised",
  "Training the operating franchisee before and after opening",
  "Ongoing operational support, check-ins, and playbook updates",
  "Site-selection framework and buildout standards to protect the physical investment",
];

const participationHighlights = [
  {
    icon: ShieldCheck,
    title: "Defined structure",
    body: "Participation terms are established at the outset. There are no informal handshakes — the structure, return mechanics, and operator responsibilities are documented. Terms are presented in the disclosure process.",
  },
  {
    icon: BarChart3,
    title: "Multiple revenue lines",
    body: "A Muze Office location earns revenue from coworking memberships, virtual office plans, private offices, meeting-room bookings, and event-space hire. Diversification across revenue types reduces dependence on any single product.",
  },
  {
    icon: Settings,
    title: "Technology visibility",
    body: "The Optix platform provides real-time reporting on occupancy, revenue, and member activity. Investor access to performance data — and the cadence for reporting — is agreed at the outset.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Investors", path: "/investors" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              For Investors
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Invest in the flexible-workspace model
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              Capital partners back new Muze Office locations while an experienced operator — guided
              by Muze&apos;s brand, technology, and playbook — handles day-to-day management.
              You participate in a real business with recurring revenue, not a speculative asset.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/discovery-call"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="book_discovery_call"
                data-cta-location="investors_hero"
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/the-opportunity"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_the_opportunity"
                data-cta-location="investors_hero"
              >
                See the opportunity
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Who it's for */}
      <Section variant="gray" id="who-its-for">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            Who it&apos;s for
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl mb-3 max-w-[600px]">
            Capital partners, not day-to-day operators
          </h2>
          <p className="text-[#74726D] leading-relaxed max-w-[600px] mb-10">
            The investor path is for people who want exposure to a growing physical-business sector
            without running a location themselves. Whether you&apos;re a passive capital partner or a
            joint-venture participant, the structure is built around that distinction.
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2">
          {whoItIsFor.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.headline}>
                <Card className="h-full border-[#E6E4DF] bg-white">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAA820]/10">
                      <Icon className="h-5 w-5 text-[#EAA820]" />
                    </div>
                    <h3 className="font-semibold text-[#1A1A1A] text-base leading-snug">
                      {item.headline}
                    </h3>
                    <p className="text-sm text-[#74726D] leading-relaxed">{item.body}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* How participation works */}
      <Section variant="white" id="how-it-works">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            How it works
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl mb-3 max-w-[580px]">
            Participation structures for capital partners
          </h2>
          <p className="text-[#74726D] leading-relaxed max-w-[620px] mb-10">
            Muze works with investors across a range of participation models. The right structure
            depends on your capital position, your relationship with the operating franchisee, and
            your preferred level of involvement. Specific terms — including return mechanics,
            distributions, and governance — are disclosed during the formal discovery process.
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-5 lg:grid-cols-3">
          {participationHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="flex flex-col gap-4 rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] p-6 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAA820]/10">
                    <Icon className="h-5 w-5 text-[#EAA820]" />
                  </div>
                  <h3 className="font-semibold text-[#1A1A1A] text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-[#74726D] leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Placeholder callout */}
        <FadeIn>
          <div className="mt-8 rounded-xl border border-[#EAA820]/30 bg-[#EAA820]/5 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
              Investor terms
            </p>
            <p className="text-sm text-[#1A1A1A] leading-relaxed">
              Specific investment structures, minimum commitments, return mechanics, and governance
              terms are covered during the discovery process:{" "}
              <span className="font-mono font-semibold text-[#C17A28]">{"{{INVESTOR_TERMS}}"}</span>.
              Book a discovery call to receive the full disclosure package.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Image break */}
      <div className="relative w-full h-[260px] sm:h-[340px] overflow-hidden">
        <Image
          src="/images/spaces/boardroom.jpg"
          alt="Muze Office boardroom and private meeting space"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent" />
      </div>

      {/* What Muze handles operationally */}
      <Section variant="dark" id="what-muze-handles">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            What Muze handles
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl mb-3 max-w-[560px]">
            The operating infrastructure is already built
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-[600px] mb-10">
            Your capital backs a location that plugs into a complete operating system — not a
            startup figuring things out from scratch. Here&apos;s what Muze provides to every
            location in the network.
          </p>
        </FadeIn>
        <div className="rounded-xl overflow-hidden border border-white/10">
          {muzeHandles.map((item, i) => (
            <FadeIn key={item} delay={i * 0.04}>
              <div
                className={`flex items-start gap-4 px-6 py-4 border-b last:border-b-0 border-white/10 ${
                  i % 2 === 0 ? "bg-white/5" : "bg-white/[0.03]"
                }`}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Risk and transparency */}
      <Section variant="gray" id="risk-transparency">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[700px]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D]">
                Honest disclosure
              </p>
            </div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
              What you should know before investing
            </h2>
            <div className="flex flex-col gap-4 text-sm text-[#74726D] leading-relaxed">
              <p>
                Any new business location carries risk. Opening costs, ramp-up time to profitability,
                local market conditions, and the individual operator&apos;s execution all influence
                outcomes. Muze&apos;s brand, technology, and playbook reduce execution risk — they do
                not eliminate business risk.
              </p>
              <p>
                No earnings claims are made on this site. Financial projections, if any are provided
                during the disclosure process, are illustrative only and are not a guarantee of
                performance.
              </p>
              <p>
                Muze is committed to transparency throughout the discovery and qualification process.
                If a market or structure isn&apos;t a good fit, we&apos;ll say so directly — not
                after you&apos;ve committed capital.
              </p>
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
                Understand the opportunity and the numbers
              </h2>
              <p className="mt-3 text-[#74726D] leading-relaxed">
                The opportunity page covers the market tailwinds behind flexible workspace. The
                investment page details what it costs to open a location.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-opportunity"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_the_opportunity"
                data-cta-location="investors_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">The opportunity</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Why flexible workspace, why now</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/investment"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_investment"
                data-cta-location="investors_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment &amp; fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Location costs and fee structure</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Interested in backing a Muze Office location?"
        subtitle="Book a discovery call to discuss your capital position, target markets, and the participation structures available to investors."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="investors_bottom"
        showPhone
      />
    </>
  );
}
