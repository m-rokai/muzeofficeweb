import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Megaphone,
  Smartphone,
  BookOpen,
  MapPin,
  GraduationCap,
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "How the Muze Office Model Works",
  description:
    "What a Muze Office franchise includes: brand & marketing, Optix technology, operations playbook, site selection, buildout standards, training, and ongoing support — everything you need to launch and run a location.",
  alternates: { canonical: "/the-model" },
};

const pillars = [
  {
    id: "brand",
    icon: Megaphone,
    number: "01",
    title: "Brand & marketing",
    headline: "A recognized brand that converts traffic you didn't have to earn",
    body: "Muze Office's visual identity, voice, and positioning have been built and refined at our Las Vegas flagship. Franchisees inherit a complete marketing system — logo, photography standards, social templates, Google Business Profile playbook, SEO-ready copy, and digital ad frameworks — so you launch with brand authority on day one, not after years of building it.",
    bullets: [
      "Full brand standards guide and asset library",
      "Launch marketing campaign templates",
      "Local SEO and Google Business Profile setup playbook",
      "Social media content frameworks",
      "Referral and corporate account outreach scripts",
    ],
  },
  {
    id: "technology",
    icon: Smartphone,
    number: "02",
    title: "Technology stack (powered by Optix)",
    headline: "The operating system for your location — bookings, billing, and members in one place",
    body: "Every Muze Office location runs on Optix, the industry-leading coworking management platform. Members use the white-labeled Optix mobile app to book meeting rooms, manage their membership, and pay invoices — all without involving your staff. On the operator side, you get a real-time dashboard for occupancy, revenue, and member activity.",
    bullets: [
      "Optix member management platform (bookings, billing, check-in)",
      "White-labeled member mobile app (iOS & Android)",
      "Online booking engine for hot desks, private offices, and meeting rooms",
      "Automated billing, invoicing, and payment processing",
      "Real-time occupancy and revenue reporting dashboard",
    ],
  },
  {
    id: "playbook",
    icon: BookOpen,
    number: "03",
    title: "Operations playbook",
    headline: "Pricing, staffing, and member experience — the decisions already made for you",
    body: "Our operations playbook codifies everything we learned running the Las Vegas flagship: how to price each product tier, how to staff for different occupancy levels, how to onboard and retain members, and how to run daily operations without burning out. You get a tested system, not a blank page.",
    bullets: [
      "Product and pricing frameworks for every revenue line",
      "Member onboarding and retention sequences",
      "Daily, weekly, and monthly operations checklists",
      "Staffing guide by location size and occupancy stage",
      "Member experience and community-building playbook",
      "Conflict resolution and member policy templates",
    ],
  },
  {
    id: "site-selection",
    icon: MapPin,
    number: "04",
    title: "Site selection & buildout standards",
    headline: "How to find, evaluate, and build out a location that works",
    body: "Where you open matters as much as how you run it. Muze provides a site-selection framework covering demographics, traffic patterns, competitive density, and square-footage minimums. Once you've selected a space, our buildout standards define the layout, finishes, furniture, and wayfinding that create a consistent Muze Office member experience.",
    bullets: [
      "Market and submarket evaluation criteria",
      "Site assessment scorecard and minimum sq ft requirements",
      "Lease negotiation guidance (what to ask for, what to avoid)",
      "Space-planning and layout standards",
      "Finishes, furniture, and fixture specifications",
      "Signage and wayfinding standards",
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    number: "05",
    title: "Training & ongoing support",
    headline: "You're not handed a manual and left alone — we train alongside you",
    body: "Before opening, franchisees complete a structured training program covering brand, technology, operations, sales, and marketing. After opening, you have access to ongoing support: operational check-ins, marketing reviews, and direct access to the Muze team for questions that come up in real operations.",
    bullets: [
      "Pre-opening training program (brand, ops, technology, sales)",
      "On-site or virtual launch support",
      "Ongoing operational check-ins",
      "Marketing and campaign reviews",
      "Access to updated playbook as the model evolves",
      "Network of fellow Muze franchisees",
    ],
  },
];

const memberProduct = [
  { label: "Coworking (hot desks & dedicated desks)", detail: "Day passes and monthly memberships for individuals and small teams" },
  { label: "Virtual office plans", detail: "Business address, mail handling, and phone answering — high margin, no incremental space" },
  { label: "Private offices", detail: "Enclosed suites for teams of 1–10+ on rolling or longer-term agreements" },
  { label: "Meeting & conference rooms", detail: "Hourly bookings for interviews, client meetings, workshops, and presentations" },
  { label: "Event space", detail: "After-hours and weekend venue hire for corporate events, workshops, and community gatherings" },
];

export default function TheModelPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "The Model", path: "/the-model" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              The Model
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              The Muze Office model: everything you get to launch and run a location
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              Franchisees don&apos;t start from scratch. You inherit a brand, a technology stack, an
              operations playbook, site-selection guidance, training, and ongoing support — so you
              can focus on building your member community, not reinventing every process.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/investment"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="view_investment"
                data-cta-location="model_hero"
              >
                Review investment details
              </Link>
              <Link
                href="/franchisees"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_franchisees"
                data-cta-location="model_hero"
              >
                Who it&apos;s for
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Pillar overview strip */}
      <Section variant="gray" id="pillars-overview">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-6">
            Five pillars of the model
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.id}>
                <a
                  href={`#${p.id}`}
                  className="flex flex-col gap-3 rounded-xl border border-[#E6E4DF] bg-white p-5 hover:border-[#EAA820] hover:shadow-sm transition-all group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAA820]/10 group-hover:bg-[#EAA820]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#EAA820]" />
                  </div>
                  <span className="text-xs font-semibold text-[#74726D]">{p.number}</span>
                  <span className="text-sm font-semibold text-[#1A1A1A] leading-snug">
                    {p.title}
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Each pillar in detail */}
      {pillars.map((pillar, idx) => {
        const Icon = pillar.icon;
        const isEven = idx % 2 === 0;
        return (
          <Section
            key={pillar.id}
            id={pillar.id}
            variant={isEven ? "white" : "gray"}
          >
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
              <FadeIn>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                      <Icon className="h-6 w-6 text-[#EAA820]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#74726D]">
                      {pillar.number} — {pillar.title}
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl leading-snug">
                    {pillar.headline}
                  </h2>
                  <p className="text-[#74726D] leading-relaxed">{pillar.body}</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-xl border border-[#E6E4DF] bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D] mb-4">
                    What&apos;s included
                  </p>
                  <ul className="flex flex-col gap-3">
                    {pillar.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                        <span className="text-sm text-[#1A1A1A] leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </Section>
        );
      })}

      {/* The member-facing product */}
      <Section variant="dark" id="member-product">
        <FadeIn>
          <div className="flex flex-col gap-3 mb-10 max-w-[620px]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAA820]/20">
                <LayoutGrid className="h-5 w-5 text-[#EAA820]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820]">
                The member-facing product
              </p>
            </div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl">
              What your members actually buy
            </h2>
            <p className="text-gray-400 leading-relaxed">
              A Muze Office location sells five products from day one. Each serves a distinct member
              need — which means you&apos;re not dependent on any single revenue line.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="flex flex-col gap-0 rounded-xl overflow-hidden border border-white/10">
          {memberProduct.map((item, i) => (
            <StaggerItem key={item.label}>
              <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-5 ${i % 2 === 0 ? "bg-white/5" : "bg-white/[0.03]"}`}>
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#EAA820]" />
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-gray-400 text-sm">
              See this product mix live at the Las Vegas flagship:
            </p>
            <a
              href={BRAND.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#EAA820] hover:text-[#C17A28] transition-colors"
              data-cta="view_main_site"
              data-cta-location="model_product"
            >
              muzeoffice.com
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </FadeIn>
      </Section>

      {/* Image break */}
      <div className="relative w-full h-[280px] sm:h-[360px] overflow-hidden">
        <Image
          src="/images/spaces/conference-room.jpg"
          alt="Muze Office conference room"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
      </div>

      {/* Internal links */}
      <Section variant="gray" id="next-steps">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[520px]">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                Understand the full picture
              </h2>
              <p className="mt-3 text-[#74726D] leading-relaxed">
                Now that you know what the model includes, the next questions are usually about cost
                and fit. Both are answered on their own pages.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/investment"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_investment"
                data-cta-location="model_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment & fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">What it costs to open a location</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/franchisees"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_franchisees"
                data-cta-location="model_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Who it&apos;s for</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Is the franchise path right for you?</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Want to walk through the model on a call?"
        subtitle="Book a discovery call and we'll show you exactly how the model works, what's provided, and what to expect at each stage of opening."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="model_bottom"
        showPhone
      />
    </>
  );
}
