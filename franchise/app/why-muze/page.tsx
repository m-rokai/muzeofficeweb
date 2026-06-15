import type { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  Layers,
  Smartphone,
  Building2,
  HeartHandshake,
  Users,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Why Choose the Muze Office Franchise",
  description:
    "Why operators choose the Muze Office coworking franchise: transparent pricing, multi-revenue model, modern tech stack, proven flagship, hands-on support, and member-first design. Plus a neutral checklist for evaluating any coworking franchise.",
  alternates: { canonical: "/why-muze" },
};

const differentiators = [
  {
    icon: DollarSign,
    title: "Transparent pricing model",
    body: "Muze publishes its membership pricing openly — members know exactly what they pay, operators know exactly what they earn per seat. No hidden add-on fees, no opaque rack rates that erode member trust. Transparent pricing makes your sales process faster and your retention stronger.",
    highlight: "Pricing members can find before they call you",
  },
  {
    icon: Layers,
    title: "Multi-revenue product mix",
    body: "A Muze Office location doesn't rely on a single revenue line. From day one, you sell coworking memberships, virtual office plans, private offices, meeting-room hours, and event-space hire. Each product line serves a different member need — which means a slow month in one area doesn't crater your total revenue.",
    highlight: "Five revenue streams from one location",
  },
  {
    icon: Smartphone,
    title: "Modern technology stack",
    body: "The Optix platform handles member management, online booking, billing, payment processing, and real-time reporting. Members use a white-labeled mobile app; operators see occupancy and revenue on a live dashboard. The technology removes friction from the member experience and reduces the manual overhead of running a location.",
    highlight: "Optix-powered — the coworking industry standard",
  },
  {
    icon: Building2,
    title: "Proven flagship and established brand",
    body: "Muze Office operates a flagship location in Las Vegas — a live proof of the model, not a concept deck. The brand, operations playbook, and member-experience standards have been refined through real operations, with a Houston location opening in 2026. Franchisees inherit a brand that has been tested in the market, not invented on paper.",
    highlight: "Real operations, not a startup concept",
  },
  {
    icon: HeartHandshake,
    title: "Hands-on support",
    body: "The Muze team stays involved after the agreements are signed. Pre-opening training covers brand, technology, operations, sales, and marketing. After opening, you have access to operational check-ins, marketing reviews, and direct support when real-world questions come up. This isn't a mail-order franchise — it's an ongoing working relationship.",
    highlight: "Support that continues after opening day",
  },
  {
    icon: Users,
    title: "Member-first design",
    body: "Every standard in the Muze model — from space design to pricing to the onboarding sequence — is built around what makes members stay, not just sign up. Low churn is how a coworking business becomes profitable. The Muze playbook encodes that member-centric thinking into daily operations.",
    highlight: "Retention-focused from the first interaction",
  },
];

const evaluationChecklist = [
  {
    category: "Proof of concept",
    items: [
      "Does the franchisor operate a live location, or is this pre-revenue?",
      "Can you visit the flagship or speak with existing franchisees?",
      "How long has the model been operating — months or years?",
    ],
  },
  {
    category: "Technology",
    items: [
      "What member-management platform does the franchise use?",
      "Do members get a mobile app for bookings and billing?",
      "Can operators see real-time revenue and occupancy data?",
    ],
  },
  {
    category: "Revenue model",
    items: [
      "How many distinct revenue lines does the model support from day one?",
      "Is pricing set by the franchisor, or are you free to undercut and erode margins?",
      "What is the virtual-office offering — high-margin, low-space-cost revenue?",
    ],
  },
  {
    category: "Support structure",
    items: [
      "What does pre-opening training cover, and how long does it last?",
      "Who do you call when you have an operational question post-opening?",
      "How often are franchisees in active contact with the corporate team?",
    ],
  },
  {
    category: "Transparency",
    items: [
      "Are membership prices published openly or obscured behind a quote form?",
      "Are financial projections presented as ranges with clear assumptions, or as guarantees?",
      "Does the FDD disclose material relationships, fees, and litigation history?",
    ],
  },
  {
    category: "Member experience",
    items: [
      "Is the space designed for members who work there daily, or for photo shoots?",
      "What does the member onboarding sequence look like?",
      "How does the franchise measure and improve member retention?",
    ],
  },
];

export default function WhyMuzePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Why Muze", path: "/why-muze" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              Why Muze
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Why operators choose the Muze Office model
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              There are more coworking franchise options than there were five years ago. What
              follows is an honest account of what Muze Office does well — and a neutral checklist
              to help you evaluate any coworking franchise, including ours.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/discovery-call"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="book_discovery_call"
                data-cta-location="why_muze_hero"
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/the-model"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_the_model"
                data-cta-location="why_muze_hero"
              >
                See the model
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Differentiators overview strip */}
      <Section variant="gray" id="differentiators-overview">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-6">
            Six reasons operators choose Muze
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => {
            const Icon = d.icon;
            return (
              <StaggerItem key={d.title}>
                <a
                  href={`#${d.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="flex items-center gap-4 rounded-xl border border-[#E6E4DF] bg-white p-4 hover:border-[#EAA820] hover:shadow-sm transition-all group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAA820]/10 group-hover:bg-[#EAA820]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#EAA820]" />
                  </div>
                  <span className="text-sm font-semibold text-[#1A1A1A] leading-snug">
                    {d.title}
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Differentiators in full */}
      {differentiators.map((d, idx) => {
        const Icon = d.icon;
        const isEven = idx % 2 === 0;
        const anchorId = d.title.toLowerCase().replace(/[^a-z]+/g, "-");
        return (
          <Section key={d.title} id={anchorId} variant={isEven ? "white" : "gray"}>
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
              <FadeIn>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                      <Icon className="h-6 w-6 text-[#EAA820]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#74726D]">
                      {String(idx + 1).padStart(2, "0")} — {d.title}
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl leading-snug">
                    {d.title}
                  </h2>
                  <p className="text-[#74726D] leading-relaxed">{d.body}</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-xl border border-[#E6E4DF] bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#74726D] mb-4">
                    What this means for you
                  </p>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#EAA820]" />
                    <p className="text-sm text-[#1A1A1A] leading-relaxed font-medium">{d.highlight}</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Section>
        );
      })}

      {/* Evaluation checklist */}
      <Section variant="dark" id="evaluation-checklist">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-2">
            Neutral evaluation framework
          </p>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl mb-3 max-w-[620px]">
            How to evaluate any coworking franchise
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-[620px] mb-10">
            Use these questions when evaluating Muze Office or any coworking franchise. The right
            model for you should answer most of them clearly — and be willing to put the answers
            in writing.
          </p>
        </FadeIn>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {evaluationChecklist.map((section) => (
            <StaggerItem key={section.category}>
              <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820]">
                  {section.category}
                </p>
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Circle className="mt-1 h-3 w-3 shrink-0 text-[#EAA820] fill-[#EAA820]" />
                      <span className="text-xs text-gray-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn>
          <p className="mt-8 text-xs text-gray-500 leading-relaxed max-w-[560px]">
            We encourage you to bring these questions to a Muze discovery call. If we can&apos;t
            answer them directly, that&apos;s useful information too.
          </p>
        </FadeIn>
      </Section>

      {/* Internal links */}
      <Section variant="gray" id="next-steps">
        <FadeIn>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[520px]">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                Go deeper on the model
              </h2>
              <p className="mt-3 text-[#74726D] leading-relaxed">
                The model page details every component of what Muze provides. The investment page
                covers the cost picture. The franchisees page is for operators ready to explore
                running a location.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-model"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_the_model"
                data-cta-location="why_muze_links"
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
                data-cta-location="why_muze_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment &amp; fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">What it costs to open a location</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/franchisees"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_franchisees"
                data-cta-location="why_muze_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">For franchisees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Run your own location</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Ready to ask us the hard questions?"
        subtitle="Book a discovery call. We'll walk through the model, answer your evaluation checklist directly, and see whether there's a fit — with no pressure either way."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="why_muze_bottom"
        showPhone
      />
    </>
  );
}
