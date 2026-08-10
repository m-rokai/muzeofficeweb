import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Calendar,
  MapPin,
  ShieldCheck,
  Layers,
  TrendingUp,
  Briefcase,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Available Coworking Franchise Territories | Muze Office Markets",
  description:
    "See Muze Office franchise markets — the proven Las Vegas flagship, Houston opening in 2026, protected territories, and how to request availability for your city.",
  alternates: { canonical: "/available-markets" },
};

const liveMarkets = [
  {
    icon: Building2,
    city: "Las Vegas, Nevada",
    status: "Flagship · Open now",
    open: true,
    body: "The original Muze Office and the proof the model works. A convention-driven, fast-growing metro where the full product mix — coworking, virtual office, private suites, and event space — runs live every day.",
  },
  {
    icon: Calendar,
    city: "Houston, Texas",
    status: "In development · 2026",
    open: false,
    body: "Our second market, now in development and slated to open in 2026 — the first expansion of the Muze playbook beyond Las Vegas into one of the country's largest Sun Belt business hubs.",
  },
];

const territoryFeatures = [
  {
    icon: ShieldCheck,
    title: "Protected, exclusive territory",
    body: "Each franchise is awarded a defined, exclusive territory. Within your area, you're the only Muze Office — so you're building your market, not competing with the brand next door.",
  },
  {
    icon: MapPin,
    title: "Defined by your metro market",
    body: "Territories are mapped to the metropolitan statistical area (MSA) your location serves, aligning your protected zone with how people actually search for and choose a workspace.",
  },
  {
    icon: Building2,
    title: "Single-unit path",
    body: "Most operators start with one location — a focused way to learn the model, build a team, and establish the Muze brand in your community before considering anything larger.",
  },
  {
    icon: Layers,
    title: "Multi-unit & area development",
    body: "Experienced operators and groups can pursue area-development rights to build several locations across a region on an agreed schedule — a path for those who want to scale.",
  },
];

const priorityCriteria = [
  {
    icon: TrendingUp,
    title: "Sun Belt & high-growth metros",
    body: "Fast-growing cities with strong in-migration and a steady flow of new residents and businesses tend to have the deepest, most durable demand for flexible workspace.",
  },
  {
    icon: Compass,
    title: "Convention & event-driven cities",
    body: "Las Vegas is in our DNA. Metros with major convention, trade-show, and visitor activity drive meeting-room, day-pass, and virtual-office demand on top of steady memberships.",
  },
  {
    icon: Briefcase,
    title: "High small-business formation",
    body: "Markets where new LLCs, freelancers, and micro-businesses are forming at high rates need addresses, meeting rooms, and professional space — exactly what a Muze location provides.",
  },
  {
    icon: Building2,
    title: "Underserved flexible-workspace demand",
    body: "We prioritize metros where hybrid professionals and small teams are looking for a modern, well-run alternative to a long-term lease — and the supply hasn't caught up.",
  },
];

export default function AvailableMarketsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Available Markets", path: "/available-markets" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              Available Markets
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Available Muze Office franchise markets
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[620px]">
              We&apos;re expanding from a proven Las Vegas flagship into select markets nationwide.
              Most metros are still open — with protected territory for the operator who claims them
              first. Tell us where you want to build.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="request_market"
                data-cta-location="available_markets_hero"
              >
                Request your market
              </Link>
              <Link
                href="/the-opportunity"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_opportunity"
                data-cta-location="available_markets_hero"
              >
                Why coworking
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Where Muze is today */}
      <Section variant="white" id="where-muze-is">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              On the ground today
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Where Muze is today
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              The model isn&apos;t theoretical. One flagship is open and operating now, with a second
              market already in development — and the rest of the map is open.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {liveMarkets.map((m) => {
            const Icon = m.icon;
            return (
              <StaggerItem key={m.city}>
                <Card className="h-full border-[#E6E4DF] bg-[#FAFAF7] shadow-none hover:shadow-sm transition-shadow">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                        <Icon className="h-6 w-6 text-[#EAA820]" />
                      </div>
                      {m.open ? (
                        <Badge className="bg-[#EAA820]/10 text-[#EAA820] border border-[#EAA820]/20 hover:bg-[#EAA820]/10">
                          Open
                        </Badge>
                      ) : (
                        <Badge className="bg-[#1A1A1A] text-white border-transparent hover:bg-[#1A1A1A]">
                          Coming 2026
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold text-[#1A1A1A]">
                        {m.city}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#EAA820]">{m.status}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-[#74726D]">{m.body}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* How territory works */}
      <Section variant="gray" id="how-territory-works">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Territory & rights
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              How territory works
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              Muze Office territories are protected and market-based. Whether you want a single
              location or the rights to develop several, the framework is built to give you room to
              grow without stepping on yourself.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {territoryFeatures.map((t) => {
            const Icon = t.icon;
            return (
              <StaggerItem key={t.title}>
                <div className="flex flex-col gap-3 rounded-xl border border-[#E6E4DF] bg-white p-6 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A1A1A]">
                    <Icon className="h-5 w-5 text-[#EAA820]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-[#1A1A1A]">
                    {t.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#74726D]">{t.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Markets we're prioritizing */}
      <Section variant="white" id="priority-markets">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Where we&apos;re focused
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Markets we&apos;re prioritizing
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              We&apos;re not minting a page for every city — and you won&apos;t find a list of pre-claimed
              locations here. Instead, we look for the kinds of markets where the Muze model is
              strongest. If your city fits the profile below, we want to talk.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {priorityCriteria.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.title}>
                <div className="flex gap-5 rounded-xl border border-[#E6E4DF] p-6">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAA820]/10">
                    <Icon className="h-5 w-5 text-[#EAA820]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-[#1A1A1A]">
                      {c.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#74726D]">{c.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <FadeIn>
          <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-[#E6E4DF] bg-[#F2F1ED] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[560px]">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold text-[#1A1A1A] sm:text-2xl">
                Don&apos;t see your city?
              </h3>
              <p className="mt-2 text-[#74726D] leading-relaxed">
                Most markets are still wide open. Tell us where you want to operate and we&apos;ll let
                you know what&apos;s available — and whether your metro is one we&apos;re prioritizing.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
              data-cta="request_market"
              data-cta-location="available_markets_request_block"
            >
              Request availability
            </Link>
          </div>
        </FadeIn>
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
                A market is just the starting point. The next step is understanding the business
                itself — why coworking works, what it takes to get in, and whether the Muze model is
                the right fit for you.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-opportunity"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_opportunity"
                data-cta-location="available_markets_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">The opportunity</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Why coworking, and why now</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/investment"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_investment"
                data-cta-location="available_markets_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment & fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Costs, royalties, what&apos;s included</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/who-its-for"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_who_its_for"
                data-cta-location="available_markets_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Is this right for you?</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Who the model fits best</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Let's talk about your market"
        subtitle="Tell us where you want to operate. We'll walk you through what's available in your metro, how territory works, and the path to opening — no pressure, no obligation."
        primaryLabel="Request Your Market"
        primaryHref="/contact"
        ctaName="request_market"
        ctaLocation="available_markets_bottom"
        showPhone
      />
    </>
  );
}
