import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  MapPin,
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
  Handshake,
  Ruler,
  CalendarCheck,
  Search,
  FileCheck,
  Wrench,
  Rocket,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Convert Your Space into a Muze Office",
  description:
    "Turn your commercial real estate into a flexible-workspace business. Muze Office partners with landlords and property operators to convert underused office or retail space into a branded coworking location.",
  alternates: { canonical: "/partners" },
};

const whoItIsFor = [
  {
    icon: Building2,
    headline: "Landlords with underperforming office or retail space",
    body: "If you own or control commercial square footage that isn't generating its potential — whether vacant, partially leased, or carrying a single traditional tenant — converting it to a flexible-workspace model can increase yield and diversify your tenant base.",
  },
  {
    icon: Handshake,
    headline: "Property operators looking for a branded operating partner",
    body: "You have the space and the real-estate expertise. Muze provides the brand, the coworking operations playbook, and the technology to run the business. The partner model is built for people who want a professional operator alongside them.",
  },
  {
    icon: LayoutGrid,
    headline: "Mixed-use developers adding an amenity anchor",
    body: "A Muze Office location works as an amenity driver in mixed-use projects: it brings daily foot traffic, serves building tenants, and creates a community-oriented anchor that supports the broader development.",
  },
  {
    icon: MapPin,
    headline: "Operators in secondary markets with limited local alternatives",
    body: "In markets where large coworking providers haven't expanded, a Muze Office location can capture demand from remote workers, small businesses, and corporate teams that currently have no quality flexible-workspace option nearby.",
  },
];

const spaceRequirements = [
  {
    label: "Minimum square footage",
    detail: "Roughly 3,000–5,000 sq ft workable, with larger spaces accommodating a fuller product mix including private offices and event space.",
  },
  {
    label: "Location and accessibility",
    detail: "Visible from a major street or within a destination building; convenient parking or transit access for members commuting to work.",
  },
  {
    label: "Layout and ceiling height",
    detail: "Open-floor potential for coworking, divisible areas or enclosed rooms for private offices, and ceiling height that avoids a compressed feel for members working full days.",
  },
  {
    label: "HVAC and electrical",
    detail: "Capacity to support all-day occupancy at density — flexible workspace runs warmer and at higher power draw than lightly occupied traditional office.",
  },
  {
    label: "Internet infrastructure",
    detail: "Fiber availability or the ability to bring fiber in is essential. Coworking members have high and consistent connectivity expectations.",
  },
  {
    label: "Buildout condition",
    detail: "Shell, second-generation, or fully fitted spaces can all work — the difference shows up in buildout cost and timeline. Muze evaluates each space on its merits.",
  },
];

const conversionModel = [
  {
    icon: Building2,
    title: "You contribute the space",
    body: "The property — whether owned, ground-leased, or sub-leased — is the foundation. You may also contribute buildout capital, depending on the structure agreed at the outset.",
  },
  {
    icon: Handshake,
    title: "Muze contributes the operating system",
    body: "Brand, technology, operations playbook, training, and ongoing support. The Muze brand and infrastructure reduce the time from empty space to member-generating business.",
  },
  {
    icon: LayoutGrid,
    title: "Together, you run a Muze Office",
    body: "Day-to-day operations are managed by a Muze-trained operator — you, a designee, or a partner you bring — using the Muze playbook and Optix technology. The structure of your involvement is agreed at the outset.",
  },
];

const evaluationProcess = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Discovery call",
    detail:
      "Tell us about your space and your goals. We share what a Muze Office location requires and whether the partner model fits your situation. No fee, no commitment.",
  },
  {
    step: "02",
    icon: Search,
    title: "Space assessment",
    detail:
      "We evaluate your space against Muze's site criteria: square footage, layout, location, accessibility, and buildout condition. We'll tell you candidly whether it's a fit and what would need to change if it's close.",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Structure and terms",
    detail:
      "If the space qualifies, we discuss the partnership structure: who operates the location, how the economics are shared, and what each party is responsible for. Formal disclosure documents follow.",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Buildout and opening",
    detail:
      "Buildout proceeds to Muze's design standards. We provide launch support through opening day and stay close in the early months as your location builds its member base.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partners" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              For Real-Estate Partners
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Turn your real estate into a flexible-workspace business
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              If you own or control commercial office or retail square footage, the Muze Office
              partner model converts it into a branded, technology-driven flexible-workspace
              business — without you having to build the operating system from scratch.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/discovery-call"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="book_discovery_call"
                data-cta-location="partners_hero"
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/the-model"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_the_model"
                data-cta-location="partners_hero"
              >
                How the model works
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
            Property owners and operators with underused space
          </h2>
          <p className="text-[#74726D] leading-relaxed max-w-[600px] mb-10">
            The partner path is designed for real-estate principals who want to activate their
            space with a proven brand and operating system, rather than starting a coworking
            business from scratch or sitting with underperforming square footage.
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

      {/* The conversion model */}
      <Section variant="white" id="conversion-model">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            The conversion model
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl mb-3 max-w-[580px]">
            You bring the space. Muze brings the operating system.
          </h2>
          <p className="text-[#74726D] leading-relaxed max-w-[620px] mb-10">
            Converting commercial space into a coworking business requires two things: the right
            physical environment and the right operating infrastructure. The Muze partner model
            joins your real-estate asset with our brand, technology, and playbook to create both.
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-5 lg:grid-cols-3">
          {conversionModel.map((item) => {
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
      </Section>

      {/* Image break */}
      <div className="relative w-full h-[260px] sm:h-[340px] overflow-hidden">
        <Image
          src="/images/spaces/office-lobby.jpg"
          alt="Muze Office lobby and reception area"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
      </div>

      {/* What makes a space a fit */}
      <Section variant="dark" id="space-requirements">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            Space criteria
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl mb-3 max-w-[560px]">
            What makes a space a good fit for a Muze Office
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-[600px] mb-10">
            Not every commercial space becomes a great coworking location — the wrong square footage,
            layout, or infrastructure creates friction for members and limits revenue potential. Here
            are the factors we evaluate on every space.
          </p>
        </FadeIn>
        <div className="flex flex-col gap-0 rounded-xl overflow-hidden border border-white/10">
          {spaceRequirements.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.04}>
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-8 px-6 py-5 border-b last:border-b-0 border-white/10 ${
                  i % 2 === 0 ? "bg-white/5" : "bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3 sm:w-[220px] shrink-0">
                  <Ruler className="h-4 w-4 text-[#EAA820] shrink-0" />
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{item.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <p className="mt-6 text-xs text-gray-500 leading-relaxed max-w-[560px]">
            If your space doesn&apos;t tick every box, that doesn&apos;t automatically disqualify
            it. We assess each situation on its merits and will give you a direct read on the path
            forward during the discovery call.
          </p>
        </FadeIn>
      </Section>

      {/* Evaluation process */}
      <Section variant="gray" id="evaluation-process">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            The evaluation process
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl mb-3 max-w-[580px]">
            From initial conversation to open location
          </h2>
          <p className="text-[#74726D] leading-relaxed max-w-[580px] mb-10">
            We evaluate every partner space rigorously before committing to a conversion — because
            your outcome depends on getting the fundamentals right, not moving fast.
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {evaluationProcess.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.step}>
                <div className="flex flex-col gap-4 rounded-xl border border-[#E6E4DF] bg-white p-6 h-full">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAA820]/10">
                      <Icon className="h-5 w-5 text-[#EAA820]" />
                    </div>
                    <span className="text-xs font-semibold text-[#EAA820]">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-[#1A1A1A] text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-[#74726D] leading-relaxed">{item.detail}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Internal links */}
      <Section variant="white" id="next-steps">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[520px]">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                Understand the model and the economics
              </h2>
              <p className="mt-3 text-[#74726D] leading-relaxed">
                The model page covers what Muze provides to every location. The investment page
                details the capital picture — useful whether you&apos;re contributing the space,
                the capital, or both.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-model"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_the_model"
                data-cta-location="partners_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">The Muze model</p>
                  <p className="text-xs text-[#74726D] mt-0.5">What Muze provides to every location</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/investment"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_investment"
                data-cta-location="partners_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment &amp; fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Costs and economics by structure</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Have a space worth evaluating?"
        subtitle="Tell us about your property on a discovery call. We'll assess its fit for a Muze Office conversion and give you a direct read on next steps — with no obligation."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="partners_bottom"
        showPhone
      />
    </>
  );
}
