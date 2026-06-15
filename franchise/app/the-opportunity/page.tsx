import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  Globe,
  Layers,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "The Coworking Business Opportunity",
  description:
    "Why coworking is one of the best business opportunities right now — hybrid work, small-business formation, and the resilient multi-revenue model that makes flexible workspace profitable.",
  alternates: { canonical: "/the-opportunity" },
};

const demandDrivers = [
  {
    icon: Users,
    title: "Hybrid work is now the default",
    body: "Remote and hybrid professionals need a professional workspace without a long-term lease. Coworking fills that gap — on their terms, at a fraction of traditional office costs.",
  },
  {
    icon: Briefcase,
    title: "Small-business formation is at record highs",
    body: "New LLCs, freelancers, consultants, and micro-businesses need addresses, meeting rooms, and a place to work that isn't a kitchen table. Flexible workspace serves them out of the box.",
  },
  {
    icon: Globe,
    title: "Companies are right-sizing their real estate",
    body: "Mid-size firms shedding permanent office footprints are pivoting to coworking memberships and on-demand private offices — a higher-margin revenue line for operators.",
  },
  {
    icon: TrendingUp,
    title: "The market is still growing",
    body: "The global flexible-workspace market is projected to reach {{MARKET_STAT}} by {{MARKET_SOURCE}}. Early-mover operators in underserved markets have substantial runway ahead.",
  },
];

const revenueLines = [
  {
    icon: Building2,
    title: "Coworking memberships",
    body: "Hot desks and dedicated desks on monthly plans — recurring, predictable revenue from day-pass walkins to annual members.",
  },
  {
    icon: Briefcase,
    title: "Virtual office plans",
    body: "Business address, mail handling, and phone answering services. High-margin, zero-incremental-space, and in high demand from remote businesses needing a professional presence.",
  },
  {
    icon: Layers,
    title: "Private offices",
    body: "Long-term private suites for small teams command premium pricing and lock in months of stable income with minimal additional overhead.",
  },
  {
    icon: BarChart3,
    title: "Meeting rooms & event space",
    body: "Hourly and daily bookings for meetings, interviews, workshops, and private events fill downtime in the calendar with high per-hour revenue.",
  },
];

const winnerTraits = [
  {
    icon: ShieldCheck,
    title: "A brand people trust",
    body: "Members book with confidence when they recognize a name. A franchise brand converts traffic that an unknown independent location can't capture.",
  },
  {
    icon: Layers,
    title: "Technology that removes friction",
    body: "Operators running modern booking and member-management software — like Optix — spend less time on admin and more time growing membership.",
  },
  {
    icon: BarChart3,
    title: "Multiple revenue streams from day one",
    body: "The operators building durable businesses are not relying on a single membership tier. They open with a full product mix: coworking, virtual office, private suites, and event space.",
  },
  {
    icon: Users,
    title: "Local market knowledge + a proven playbook",
    body: "The best locations blend genuine local insight on pricing, tenant mix, and marketing with a repeatable operating playbook — not guesswork.",
  },
];

export default function TheOpportunityPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "The Opportunity", path: "/the-opportunity" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              The Opportunity
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Why coworking is one of the best business opportunities right now
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[620px]">
              Hybrid work has permanently changed how people use office space. The operators
              capitalizing on that shift — with the right brand, technology, and revenue mix —
              are building resilient, profitable businesses in cities across the country.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/the-model"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="view_model"
                data-cta-location="opportunity_hero"
              >
                See how the model works
              </Link>
              <Link
                href="/investment"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_investment"
                data-cta-location="opportunity_hero"
              >
                Review investment details
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Hero image */}
      <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden">
        <Image
          src="/images/spaces/las-vegas.jpg"
          alt="Muze Office Las Vegas coworking space"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/40 to-transparent" />
      </div>

      {/* Demand drivers */}
      <Section variant="white" id="demand">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Market dynamics
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Four forces driving demand for flexible workspace
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              The tailwinds behind coworking are structural, not cyclical. Understanding them is the
              first step toward building a business that lasts.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {demandDrivers.map((d) => {
            const Icon = d.icon;
            return (
              <StaggerItem key={d.title}>
                <Card className="h-full border-[#E6E4DF] bg-[#FAFAF7] shadow-none hover:shadow-sm transition-shadow">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                      <Icon className="h-6 w-6 text-[#EAA820]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#74726D]">{d.body}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Revenue resilience */}
      <Section variant="gray" id="revenue-model">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Resilient by design
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Why coworking is more resilient than a single-revenue business
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              Traditional office leases are binary — you're full or you're not. A well-run coworking
              location runs four distinct revenue lines simultaneously, so a dip in one category
              rarely threatens the whole.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {revenueLines.map((r) => {
            const Icon = r.icon;
            return (
              <StaggerItem key={r.title}>
                <div className="flex flex-col gap-3 rounded-xl border border-[#E6E4DF] bg-white p-6 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A1A1A]">
                    <Icon className="h-5 w-5 text-[#EAA820]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-[#1A1A1A]">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#74726D]">{r.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <FadeIn>
          <p className="mt-8 text-sm text-[#74726D]">
            See the full product mix live at{" "}
            <a
              href="https://muzeoffice.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1A1A1A] underline underline-offset-4 hover:text-[#EAA820]"
            >
              muzeoffice.com
            </a>{" "}
            — the Las Vegas flagship that proves the model works.
          </p>
        </FadeIn>
      </Section>

      {/* Who's winning */}
      <Section variant="white" id="winning">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Competitive edge
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Who's building the strongest locations
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              The gap between a thriving coworking location and a struggling one usually comes down
              to four things. Operators who get these right tend to build lasting businesses.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {winnerTraits.map((w) => {
            const Icon = w.icon;
            return (
              <StaggerItem key={w.title}>
                <div className="flex gap-5 rounded-xl border border-[#E6E4DF] p-6">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAA820]/10">
                    <Icon className="h-5 w-5 text-[#EAA820]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-[#1A1A1A]">
                      {w.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#74726D]">{w.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Internal link bridge */}
      <Section variant="gray" id="next-steps">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[520px]">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                Ready to go deeper?
              </h2>
              <p className="mt-3 text-[#74726D] leading-relaxed">
                Understanding the opportunity is step one. The next step is understanding how the
                Muze Office model is structured — what you get, how it works, and what it costs.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-model"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_model"
                data-cta-location="opportunity_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">How the model works</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Brand, tech, playbook, support</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/investment"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_investment"
                data-cta-location="opportunity_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment & fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Costs, royalties, what's included</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/why-muze"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_why_muze"
                data-cta-location="opportunity_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Why Muze</p>
                  <p className="text-xs text-[#74726D] mt-0.5">What makes this model different</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Curious if your market is ready?"
        subtitle="Book a no-pressure discovery call. We'll talk through the opportunity in your city, answer every question, and share the numbers."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="opportunity_bottom"
        showPhone
      />
    </>
  );
}
