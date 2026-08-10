import type { Metadata } from "next";
import Link from "next/link";
import {
  Repeat2,
  Layers,
  ShieldCheck,
  Clock,
  GraduationCap,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { TrackCards } from "@/components/marketing/track-cards";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Semi-Absentee Coworking Franchise — Who Muze Office Is For",
  description:
    "Is a coworking franchise right for you? Muze Office fits owner-operators and semi-absentee investors who want a B2B, recurring-revenue business — no coworking experience required. See the ownership models and what you'll need.",
  alternates: { canonical: "/who-its-for" },
};

const whyFits = [
  {
    icon: Repeat2,
    title: "Recurring, predictable revenue",
    body: "Members pay monthly. A mature location runs on recurring memberships, virtual-office plans, and private-suite agreements — not one-off sales you have to chase every month.",
  },
  {
    icon: Layers,
    title: "Multiple revenue lines",
    body: "Coworking, virtual offices, private offices, meeting rooms, day passes, and events — several ways to earn from one location means you're never dependent on a single category.",
  },
  {
    icon: ShieldCheck,
    title: "B2B and resilient",
    body: "Your customers are businesses and professionals who need workspace in good times and bad. Demand for flexible space has held up through every recent shift in how people work.",
  },
  {
    icon: Clock,
    title: "Semi-absentee friendly",
    body: "Many owners run their location with an on-site manager and stay involved part-time. Owner-operator and semi-absentee structures both work — it's your call how hands-on to be.",
  },
  {
    icon: GraduationCap,
    title: "No coworking experience required",
    body: "You don't need to have run a workspace before. The Muze playbook, technology, and training give you a proven operating system from day one.",
  },
  {
    icon: MapPin,
    title: "A real, reviewed flagship",
    body: "This isn't a concept on a slide deck. The Las Vegas flagship is open, operating, and reviewed by real members — so you can see exactly what you're buying into.",
  },
];

const idealOwner = [
  "Community-minded — you like being known in your market and building local relationships.",
  "Business-savvy — comfortable reading a P&L and making operating decisions.",
  "Brand-aligned — you want a proven system, not to reinvent everything yourself.",
  "Growth-oriented — open to a second or third location once the first is running well.",
  "Capital-ready — you meet the liquid-capital and net-worth requirements.",
  "Service-driven — you genuinely care about the member experience and retention.",
];

const requirements = [
  { label: "Liquid capital required", value: "{{LIQUID_CAPITAL}}" },
  { label: "Net worth required", value: "{{NET_WORTH}}" },
  { label: "Coworking experience", value: "Not required" },
  { label: "Ownership style", value: "Owner-operator or semi-absentee" },
];

export default function WhoItsForPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Who It's For", path: "/who-its-for" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              Who It&apos;s For
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Is a Muze Office franchise right for you?
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              Muze Office fits owner-operators and semi-absentee investors who want a B2B,
              recurring-revenue business — without building a brand, a tech stack, or an operating
              playbook from scratch. No coworking experience required.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/discovery-call"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="book_discovery_call"
                data-cta-location="who_its_for_hero"
              >
                Book a discovery call
              </Link>
              <Link
                href="/investment"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_investment"
                data-cta-location="who_its_for_hero"
              >
                See the investment
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Three ownership paths */}
      <Section variant="white" id="paths">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Three ways to own
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Pick the path that fits how you want to be involved
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              There&apos;s more than one way into the Muze Office model. Whether you want to run a
              location day-to-day, back one as a capital partner, or convert real estate you already
              control — there&apos;s a path built for you.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <TrackCards />
        </FadeIn>
      </Section>

      {/* Why the model fits investors */}
      <Section variant="gray" id="why-it-fits">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Why it fits
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Built for owners who want recurring revenue, not a second job
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              The Muze Office model is designed around the things serious investors look for: durable
              recurring income, diversified revenue, and a business that doesn&apos;t depend on the owner
              being on-site every hour.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyFits.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="flex flex-col gap-3 rounded-xl border border-[#E6E4DF] bg-white p-6 h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                    <Icon className="h-6 w-6 text-[#EAA820]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#74726D]">{item.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Ideal owner profile */}
      <Section variant="white" id="ideal-owner">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <FadeIn>
            <div className="max-w-[480px]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
                The ideal owner
              </p>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                Who tends to thrive as a Muze Office owner
              </h2>
              <p className="mt-4 text-[#74726D] leading-relaxed">
                You don&apos;t need a specific background — the best owners come from sales, real estate,
                hospitality, corporate, and first-time ownership alike. What they share is a mindset.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="flex flex-col gap-4">
              {idealOwner.map((trait) => (
                <li key={trait} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#EAA820]" />
                  <span className="text-sm leading-relaxed text-[#1A1A1A]">{trait}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* What you'll need */}
      <Section variant="gray" id="requirements">
        <FadeIn>
          <div className="mb-10 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              What you&apos;ll need
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              The basic requirements
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              These are the starting requirements to open a Muze Office. The capital figures are
              illustrative placeholders until they&apos;re confirmed in your Franchise Disclosure
              Document.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="rounded-xl border border-[#E6E4DF] bg-white overflow-hidden">
            <div className="flex flex-col divide-y divide-[#E6E4DF]">
              {requirements.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <p className="text-sm font-medium text-[#1A1A1A]">{r.label}</p>
                  <p className="font-[family-name:var(--font-plus-jakarta)] text-base font-bold text-[#1A1A1A] sm:text-right">
                    {r.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/investment"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] underline underline-offset-4 hover:text-[#EAA820] transition-colors"
              data-cta="view_investment"
              data-cta-location="who_its_for_requirements"
            >
              See full investment &amp; fees
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/training-and-support"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] underline underline-offset-4 hover:text-[#EAA820] transition-colors"
              data-cta="view_training_support"
              data-cta-location="who_its_for_requirements"
            >
              How training &amp; support works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Internal-link bridge */}
      <Section variant="white" id="next-steps">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[520px]">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                Still weighing it up?
              </h2>
              <p className="mt-3 text-[#74726D] leading-relaxed">
                Understand the model and the market before you commit. These pages cover what you
                get, the numbers, and why the Muze approach is different.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-model"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_model"
                data-cta-location="who_its_for_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">What you get</p>
                  <p className="text-xs text-[#74726D] mt-0.5">The full model breakdown</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/investment"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_investment"
                data-cta-location="who_its_for_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment &amp; fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Costs, royalties, what&apos;s included</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/why-muze"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-[#FAFAF7] px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_why_muze"
                data-cta-location="who_its_for_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Why Muze</p>
                  <p className="text-xs text-[#74726D] mt-0.5">What makes this different</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Think you might be a fit?"
        subtitle="Book a no-pressure discovery call. We'll talk through your goals, your market, and whether the Muze Office model is right for you."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="who_its_for_bottom"
        showPhone
      />
    </>
  );
}
