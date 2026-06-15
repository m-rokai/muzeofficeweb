import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  CheckCircle2,
  ArrowRight,
  Clock,
  Building2,
  Briefcase,
  Lightbulb,
  HeartHandshake,
  CalendarCheck,
  MapPin,
  Laptop,
  BadgeCheck,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Operate a Muze Office (Franchise)",
  description:
    "Run your own flexible-workspace business as a Muze Office franchisee. Get the brand, technology, playbook, and hands-on support to open and operate a coworking location in your market.",
  alternates: { canonical: "/franchisees" },
};

const whoItIsFor = [
  {
    icon: Briefcase,
    headline: "Entrepreneurs with local market knowledge",
    body: "You know your city — the neighborhoods, the business community, the demand. Muze gives you the operating system; you bring the on-the-ground presence that national operators can't replicate.",
  },
  {
    icon: Building2,
    headline: "Existing business owners ready to diversify",
    body: "If you already run a service business, a multi-unit operation, or a real-estate investment, adding a Muze Office location fits naturally — it's another business with recurring revenue, not a departure from what you know.",
  },
  {
    icon: User,
    headline: "Hospitality and service professionals",
    body: "Coworking is fundamentally a hospitality business. If you've run a hotel, restaurant, gym, or any member-facing operation, your instincts map directly to running a flexible-workspace location members love.",
  },
  {
    icon: Lightbulb,
    headline: "Operators who want a proven model, not a blank page",
    body: "You don't want to spend two years figuring out pricing, technology, and marketing. You want a tested framework, clear standards, and a team you can call when you hit a real-world problem.",
  },
];

const dayInTheLife = [
  {
    time: "8:30 AM",
    activity: "Morning walkthrough",
    detail:
      "Check the space before members arrive — coffee station stocked, meeting rooms clean, tech working. Your Optix dashboard shows today's bookings and any new inquiries.",
  },
  {
    time: "10:00 AM",
    activity: "Member onboarding",
    detail:
      "A new virtual-office member is signing up. You walk them through their plan benefits, show them the app, and add them to the Optix platform. The whole process takes about 20 minutes.",
  },
  {
    time: "12:00 PM",
    activity: "Sales and outreach",
    detail:
      "You follow up on a corporate account inquiry from a company that needs six private-office desks. The Muze playbook gives you the outreach sequence and pricing framework — you personalize it for your market.",
  },
  {
    time: "2:30 PM",
    activity: "Operations and vendor coordination",
    detail:
      "A vendor quote for a conference-room AV upgrade. You review it against the Muze buildout standards and approve the work. Most vendor decisions are guided by the playbook — fewer second-guesses.",
  },
  {
    time: "4:00 PM",
    activity: "Review your numbers",
    detail:
      "You check the Optix revenue dashboard: occupancy rate, upcoming renewals, and month-to-date billing. You flag two expiring memberships to follow up on tomorrow.",
  },
  {
    time: "5:30 PM",
    activity: "Community moment",
    detail:
      "A member stops by to ask about hosting a workshop in the event space next month. You check availability in Optix, confirm the booking, and add a note to follow up with catering options.",
  },
];

const pathToOpen = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Discovery call",
    detail:
      "A 30–45 minute conversation with the Muze franchise team. You share your market, your background, and your goals. We share what the model requires and whether your market has availability. No pressure — this is a mutual evaluation.",
  },
  {
    step: "02",
    icon: MapPin,
    title: "Qualification and territory confirmation",
    detail:
      "If there's mutual fit, we confirm territory availability for your target market and move into the formal qualification process. You receive the disclosure documents and have time to review them with your advisors.",
  },
  {
    step: "03",
    icon: Laptop,
    title: "Signing and training",
    detail:
      "Once agreements are signed, you start the Muze training program: brand, technology (Optix), operations, sales, and marketing. We also begin site-selection work with you if you don't already have a space identified.",
  },
  {
    step: "04",
    icon: BadgeCheck,
    title: "Buildout and launch",
    detail:
      "With a space under lease, buildout begins against Muze's design standards. We provide launch support through opening day — and stay close in the first months while you build your member base.",
  },
];

const youBring = [
  "Capital to invest (see /investment for range)",
  "Local market knowledge and community relationships",
  "A commitment to running a member-first operation",
  "Management bandwidth — or a small on-site team",
  "Willingness to follow the model and give feedback",
];

const muzeProvides = [
  "The Muze Office brand, visual identity, and marketing assets",
  "Optix technology platform (bookings, billing, member app)",
  "Operations and pricing playbook — tested at the flagship",
  "Site-selection framework and buildout design standards",
  "Pre-opening training program",
  "Ongoing operational support and check-ins",
  "Network of Muze operators as the franchise grows",
];

export default function FranchiseesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Franchisees", path: "/franchisees" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              For Franchisees
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Run your own flexible-workspace business
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              A Muze Office franchise puts you in charge of a coworking business in your own market
              — with the brand, technology, playbook, and support that let you compete from day one
              instead of spending years figuring it out alone.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/discovery-call"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="book_discovery_call"
                data-cta-location="franchisees_hero"
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/the-model"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_the_model"
                data-cta-location="franchisees_hero"
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
            The operator behind a great coworking space
          </h2>
          <p className="text-[#74726D] leading-relaxed max-w-[600px] mb-10">
            No prior coworking experience is required. What matters is local presence, operating
            discipline, and a genuine interest in building a community-centered workspace business.
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

      {/* Day in the life */}
      <Section variant="white" id="day-in-the-life">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            A day in the life
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl mb-3 max-w-[580px]">
            What running a Muze Office actually looks like
          </h2>
          <p className="text-[#74726D] leading-relaxed max-w-[600px] mb-10">
            Every location is different, but most operators spend their days across three areas:
            member relationships, sales, and operations. Here&apos;s what a typical day looks like
            at a mid-stage location.
          </p>
        </FadeIn>
        <div className="flex flex-col gap-0 rounded-xl overflow-hidden border border-[#E6E4DF]">
          {dayInTheLife.map((item, i) => (
            <FadeIn key={item.time} delay={i * 0.05}>
              <div
                className={`flex flex-col sm:flex-row gap-4 sm:gap-8 px-6 py-5 border-b last:border-b-0 border-[#E6E4DF] ${
                  i % 2 === 0 ? "bg-white" : "bg-[#FAFAF7]"
                }`}
              >
                <div className="flex items-center gap-3 sm:w-[110px] shrink-0">
                  <Clock className="h-4 w-4 text-[#EAA820] shrink-0" />
                  <span className="text-xs font-semibold text-[#74726D] whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <p className="font-semibold text-[#1A1A1A] text-sm">{item.activity}</p>
                  <p className="text-xs text-[#74726D] leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Image break */}
      <div className="relative w-full h-[260px] sm:h-[340px] overflow-hidden">
        <Image
          src="/images/spaces/hot-desk.jpg"
          alt="Muze Office coworking hot-desk area"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
      </div>

      {/* Path inquiry → open */}
      <Section variant="dark" id="path-to-open">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            The process
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl mb-3 max-w-[580px]">
            From first inquiry to opening day
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-[580px] mb-10">
            The path from discovery call to open location follows four clear steps. No ambiguity
            about what happens next.
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pathToOpen.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.step}>
                <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 h-full">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAA820]/20">
                      <Icon className="h-5 w-5 text-[#EAA820]" />
                    </div>
                    <span className="text-xs font-semibold text-[#EAA820]">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* What you bring vs. Muze provides */}
      <Section variant="gray" id="what-you-bring">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            The partnership
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl mb-10 max-w-[560px]">
            What you bring — and what Muze provides
          </h2>
        </FadeIn>
        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-xl border border-[#E6E4DF] bg-white p-6 h-full">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D] mb-5">
                You bring
              </p>
              <ul className="flex flex-col gap-3">
                {youBring.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    <span className="text-sm text-[#1A1A1A] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-[#E6E4DF] bg-white p-6 h-full">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D] mb-5">
                Muze provides
              </p>
              <ul className="flex flex-col gap-3">
                {muzeProvides.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    <span className="text-sm text-[#1A1A1A] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Internal links */}
      <Section variant="white" id="next-steps">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[520px]">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                Ready to go deeper?
              </h2>
              <p className="mt-3 text-[#74726D] leading-relaxed">
                The model page explains what&apos;s included in the franchise. The investment page
                covers costs, fees, and what to budget. Both are worth reading before a discovery
                call.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-model"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_the_model"
                data-cta-location="franchisees_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">The Muze model</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Brand, tech, playbook, support</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/investment"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_investment"
                data-cta-location="franchisees_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment &amp; fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">What it costs to open a location</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Ready to explore running a Muze Office?"
        subtitle="Book a discovery call and we'll cover your market, the model, and what to expect at each step — with no pressure and no commitment."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="franchisees_bottom"
        showPhone
      />
    </>
  );
}
