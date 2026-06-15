import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  TrendingUp,
  Users,
  Layers,
  Zap,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Laptop,
  BookOpen,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { TrackCards } from "@/components/marketing/track-cards";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { FranchiseServiceSchema } from "@/components/seo/service-schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { homepageFranchiseFAQs } from "@/lib/data/franchise-faqs";

export const metadata: Metadata = {
  title: {
    absolute:
      "Coworking & Flexible Workspace Franchise Opportunities | Muze Office Franchise",
  },
  description:
    "Own a flexible-workspace business with Muze Office. Franchise, invest, or partner on coworking, virtual office, and private-office locations. Book a discovery call.",
  alternates: { canonical: "/" },
};

// ─── Why coworking now ───────────────────────────────────────────────────────

const whyNowCards = [
  {
    icon: TrendingUp,
    heading: "A market that keeps growing",
    body: "Flexible workspace is one of the fastest-growing segments in commercial real estate. Hybrid work has made month-to-month office access a permanent preference — not a pandemic artifact. {{MARKET_STAT}}",
  },
  {
    icon: Users,
    heading: "Demand from every direction",
    body: "Remote employees, solo entrepreneurs, startups, distributed enterprise teams, and small businesses all need professional space on their terms. Coworking serves every segment from a single location.",
  },
  {
    icon: Layers,
    heading: "Multiple revenue lines from one roof",
    body: "A well-run flexible-workspace location earns from coworking memberships, virtual offices, private offices, meeting-room bookings, event space, and day passes — reducing dependence on any single revenue source.",
  },
  {
    icon: MapPin,
    heading: "Local advantage, national brand",
    body: "The strongest operators combine community-level relationships with the credibility of a recognized brand and a modern technology stack — exactly what the Muze model delivers.",
  },
];

// ─── Muze model pillars ──────────────────────────────────────────────────────

const modelPillars = [
  {
    icon: Sparkles,
    heading: "Brand",
    body: "A professionally built identity — logo, signage, photography, copy, and digital presence — so your location opens looking established from day one.",
  },
  {
    icon: Laptop,
    heading: "Technology (Optix)",
    body: "The Optix platform powers member management, bookings, payments, and the member app. You get a proven tech stack without building or maintaining it.",
  },
  {
    icon: BookOpen,
    heading: "Playbook",
    body: "A tested operations and pricing playbook covering membership tiers, day-pass rates, event pricing, staffing guidance, and member-experience standards.",
  },
  {
    icon: HeartHandshake,
    heading: "Support",
    body: "Hands-on launch support: site selection, buildout standards, pre-opening training, and ongoing operational guidance as your membership grows.",
  },
];

// ─── Why Muze differentiators ────────────────────────────────────────────────

const differentiators = [
  {
    icon: ShieldCheck,
    heading: "Transparent pricing model",
    body: "No hidden fees or surprise royalty tiers. The fee structure is straightforward and fully disclosed before you sign anything.",
  },
  {
    icon: Layers,
    heading: "Multi-revenue product mix",
    body: "Coworking, virtual offices, private offices, meeting rooms, and events — six revenue lines from one location means you're not dependent on a single membership category.",
  },
  {
    icon: Zap,
    heading: "Modern technology stack",
    body: "Optix-powered management and a clean digital presence put you ahead of legacy operators still running on spreadsheets and paper membership forms.",
  },
  {
    icon: MapPin,
    heading: "Proven Las Vegas flagship",
    body: "The model isn't theoretical — it runs live at Muze Office in Las Vegas. You can see the real product, pricing, and member experience before you commit.",
  },
];

// ─── Investment bullets ──────────────────────────────────────────────────────

const investmentIncludes = [
  "Brand license and marketing asset library",
  "Optix technology platform access",
  "Pre-opening training and launch support",
  "Operations and pricing playbook",
  "Site-selection and buildout standards",
  "Ongoing operational guidance",
];

// ────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <FranchiseServiceSchema />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[600px] w-full items-center overflow-hidden md:min-h-[680px]">
        {/* Background image */}
        <Image
          src="/images/hero/coworking-space.jpg"
          alt="Muze Office flexible coworking space"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/70 to-[#111111]/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-6 border-[#EAA820]/60 bg-[#EAA820]/10 text-[#EAA820] text-xs font-semibold tracking-wide uppercase"
            >
              Now expanding beyond Las Vegas &amp; Houston
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] max-w-[660px] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Own a Coworking &amp; Flexible-Workspace Franchise — the Muze Office Model
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-gray-300">
              Three ways to get in: operate your own location, invest as a capital partner, or
              convert your commercial real estate. All built on a month-to-month model with
              multiple revenue lines.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/discovery-call"
                data-cta="book_discovery_call"
                data-cta-location="homepage_hero"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-14 rounded-xl bg-[#EAA820] px-8 text-base font-semibold text-[#1A1A1A] hover:bg-[#C17A28]"
                )}
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/the-opportunity"
                data-cta="see_opportunity"
                data-cta-location="homepage_hero"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-14 rounded-xl border-white/50 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
                )}
              >
                See the Opportunity
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 2. THREE TRACKS ──────────────────────────────────────────────── */}
      <Section variant="gray" id="tracks">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
              Three ways to get into flexible workspace
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] text-lg text-[#74726D]">
              Whether you want to run a location, back one, or convert your existing space —
              there&apos;s a Muze path built for you.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <TrackCards />
        </FadeIn>
      </Section>

      {/* ── 3. WHY COWORKING NOW ─────────────────────────────────────────── */}
      <Section variant="white" id="why-coworking">
        <FadeIn>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
              Why coworking is one of the best business opportunities right now
            </h2>
            <p className="mt-4 max-w-[560px] text-lg text-[#74726D]">
              Structural shifts in how people work have permanently expanded demand for
              flexible professional space.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyNowCards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.heading}>
                <Card className="h-full bg-white">
                  <CardContent className="flex flex-col gap-4 pt-6 pb-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                      <Icon className="h-6 w-6 text-[#EAA820]" />
                    </div>
                    <h3 className="text-base font-semibold text-[#1A1A1A]">{card.heading}</h3>
                    <p className="text-sm leading-relaxed text-[#74726D]">{card.body}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <FadeIn delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/the-opportunity"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
              )}
            >
              Explore the opportunity <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* ── 4. THE MUZE MODEL IN BRIEF ───────────────────────────────────── */}
      <Section variant="dark" id="the-model">
        <FadeIn>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-white md:text-4xl">
              What you get with the Muze model
            </h2>
            <p className="mt-4 max-w-[540px] text-lg text-gray-400">
              Four pillars that give you everything you need to open and run a profitable
              flexible-workspace location — without building it from scratch.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modelPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={pillar.heading}>
                <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/15">
                    <Icon className="h-6 w-6 text-[#EAA820]" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{pillar.heading}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{pillar.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <FadeIn delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/the-model"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
              )}
            >
              See the full model <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* ── 5. INVESTMENT AT A GLANCE ────────────────────────────────────── */}
      <Section variant="gray" id="investment-glance">
        <div className="mx-auto max-w-[760px]">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
              Investment at a glance
            </h2>
            <p className="mt-4 text-lg text-[#74726D]">
              A transparent starting point — exact figures are provided during the discovery
              process and in the disclosure documents.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 rounded-2xl border border-[#E6E4DF] bg-white p-8">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium uppercase tracking-wider text-[#74726D]">
                  Estimated total investment range
                </p>
                <p className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold text-[#1A1A1A]">
                  {"{{INVESTMENT_RANGE}}"}
                </p>
                <p className="text-sm text-[#74726D]">
                  Varies by market, square footage, and buildout condition. This is an
                  illustrative range, not a financial guarantee.
                </p>
              </div>

              <div className="mt-8 border-t border-[#E6E4DF] pt-6">
                <p className="mb-4 text-sm font-semibold text-[#1A1A1A]">
                  Included in the franchise investment:
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {investmentIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#74726D]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/investment"
                  data-cta="view_investment"
                  data-cta-location="homepage_investment_teaser"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-xl bg-[#1A1A1A] px-8 text-white hover:bg-[#333]"
                  )}
                >
                  See full investment details
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── 6. WHY MUZE ─────────────────────────────────────────────────── */}
      <Section variant="white" id="why-muze">
        <FadeIn>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
              Why operators choose Muze
            </h2>
            <p className="mt-4 max-w-[540px] text-lg text-[#74726D]">
              Four reasons the Muze model stands apart from building a coworking space
              independently or with a legacy franchisor.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {differentiators.map((d) => {
            const Icon = d.icon;
            return (
              <StaggerItem key={d.heading}>
                <div className="flex gap-4 rounded-xl border border-[#E6E4DF] bg-white p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAA820]/10">
                    <Icon className="h-6 w-6 text-[#EAA820]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-[#1A1A1A]">{d.heading}</h3>
                    <p className="text-sm leading-relaxed text-[#74726D]">{d.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <FadeIn delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/why-muze"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
              )}
            >
              Why Muze — full comparison <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* ── 7. FAQ EXCERPT ───────────────────────────────────────────────── */}
      <FAQSection
        heading="Franchise FAQs"
        description="Common questions about the Muze Office franchise opportunity. See all answers on the FAQ page."
        faqs={homepageFranchiseFAQs}
      />

      {/* ── 8. FINAL CTA ─────────────────────────────────────────────────── */}
      <CTASection
        heading="Ready to explore the Muze Office franchise?"
        subtitle="Book a no-pressure discovery call and find out if your market and goals are a fit."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="homepage_bottom"
        showPhone
      />
    </>
  );
}
