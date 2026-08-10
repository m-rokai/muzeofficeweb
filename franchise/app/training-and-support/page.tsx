import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Handshake,
  Ruler,
  Smartphone,
  UserPlus,
  Rocket,
  BookOpen,
  TrendingUp,
  LayoutDashboard,
  Heart,
  CalendarCheck,
  Megaphone,
  RefreshCw,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Franchise Training & Support",
  description:
    "Pre-opening and ongoing operational support for every Muze Office franchisee — a proven playbook, hands-on launch help, and guidance even with no coworking experience.",
  alternates: { canonical: "/training-and-support" },
};

const preOpeningSupport = [
  {
    icon: MapPin,
    title: "Site selection & scoring",
    body: "We help you evaluate markets and individual spaces against the criteria that actually predict a strong location. You score candidate sites with a tested framework instead of guessing.",
  },
  {
    icon: Handshake,
    title: "Lease negotiation guidance",
    body: "Before you sign, we walk you through the terms that matter most for a coworking buildout. You go into negotiations knowing exactly what to ask for and what to avoid.",
  },
  {
    icon: Ruler,
    title: "Buildout standards & FF&E specs",
    body: "Detailed layout, finish, and furniture specifications translate the Muze Office look and feel into your space. You build to a proven standard rather than designing from a blank page.",
  },
  {
    icon: Smartphone,
    title: "Optix technology setup & onboarding",
    body: "We configure and onboard your Optix platform so bookings, billing, and member management work from day one. Your team learns the system before the first member ever walks in.",
  },
  {
    icon: UserPlus,
    title: "Hiring & staffing guidance",
    body: "Role descriptions, interview guides, and staffing models help you build the right team for your location's size. You hire with a playbook, not a hunch.",
  },
  {
    icon: Rocket,
    title: "Pre-opening marketing & launch plan",
    body: "A structured launch plan fills your pipeline with members before the doors open. You inherit campaign templates, local SEO guidance, and a week-by-week countdown to opening day.",
  },
];

const operatorTraining = [
  {
    number: "01",
    icon: BookOpen,
    title: "Operations & daily playbook",
    body: "Learn to run the location day to day, from opening procedures to member policies. The daily playbook turns operations into a repeatable routine you can hand to your team.",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Sales & membership growth",
    body: "Master the tours, follow-ups, and outreach that turn inquiries into members. You practice the same sales motion that built the Las Vegas flagship.",
  },
  {
    number: "03",
    icon: LayoutDashboard,
    title: "The Optix platform",
    body: "Get hands-on with the platform that powers bookings, billing, and reporting. You finish training able to run the system confidently without leaning on support.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Member experience & retention",
    body: "Understand what keeps members renewing month after month. You learn the community-building and service habits that make a location sticky.",
  },
];

const ongoingSupport = [
  {
    icon: CalendarCheck,
    title: "Regular operational check-ins",
    body: "Scheduled check-ins keep you accountable and surface issues early. You always have a direct line to the Muze team for questions that come up in real operations.",
  },
  {
    icon: Megaphone,
    title: "Marketing & national brand support",
    body: "Your location benefits from brand-level marketing and refreshed campaign assets. As the Muze Office brand grows, your local marketing grows with it.",
  },
  {
    icon: RefreshCw,
    title: "Technology & platform updates",
    body: "When the Optix platform and our operating tools improve, those updates flow to your location. You run on a stack that keeps getting better with no extra work on your end.",
  },
  {
    icon: Users,
    title: "Operator peer network",
    body: "You join a network of fellow Muze Office operators solving the same problems you are. Wins and lessons travel fast across the system.",
  },
  {
    icon: Target,
    title: "Performance reviews & goal-setting",
    body: "Regular reviews help you set goals and track progress against them. You get an outside perspective focused entirely on helping your location improve.",
  },
];

export default function TrainingAndSupportPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Training & Support", path: "/training-and-support" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              Training & Support
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              You&apos;re never building a Muze Office alone
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              Even with no prior coworking experience, you step in with a proven playbook, hands-on
              launch support, and ongoing guidance from a team that stays in your corner long after
              opening day.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/discovery-call"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#EAA820] px-7 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28] transition-colors"
                data-cta="book_discovery_call"
                data-cta-location="training_support_hero"
              >
                Book a discovery call
              </Link>
              <Link
                href="/the-model"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                data-cta="view_model"
                data-cta-location="training_support_hero"
              >
                See the full model
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Pre-opening support */}
      <Section variant="white" id="pre-opening">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Before you open
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Pre-opening support that gets you to launch
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              The hardest part of opening a coworking location is everything that happens before the
              doors open. We work alongside you through every one of those steps.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preOpeningSupport.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <Card className="h-full border-[#E6E4DF] bg-[#FAFAF7] shadow-none hover:shadow-sm transition-shadow">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                      <Icon className="h-6 w-6 text-[#EAA820]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#74726D]">{s.body}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Initial operator training */}
      <Section variant="gray" id="operator-training">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              Initial operator training
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              A structured program — even if you&apos;ve never run a workspace
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              Before you open, you complete a structured training program built around the four
              disciplines that run a successful location. You finish ready to operate, not just
              informed.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {operatorTraining.map((t) => {
            const Icon = t.icon;
            return (
              <StaggerItem key={t.number}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-[#E6E4DF] bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A1A1A]">
                      <Icon className="h-5 w-5 text-[#EAA820]" />
                    </div>
                    <span className="text-xs font-semibold text-[#74726D]">{t.number}</span>
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

      {/* Ongoing support */}
      <Section variant="white" id="ongoing-support">
        <FadeIn>
          <div className="mb-12 max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820] mb-3">
              After you open
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
              Ongoing support after you open
            </h2>
            <p className="mt-4 text-[#74726D] leading-relaxed">
              Launch day is the start, not the finish line. The support continues for as long as you
              operate a Muze Office location.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ongoingSupport.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <Card className="h-full border-[#E6E4DF] bg-[#FAFAF7] shadow-none hover:shadow-sm transition-shadow">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAA820]/10">
                      <Icon className="h-6 w-6 text-[#EAA820]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#74726D]">{s.body}</p>
                  </CardContent>
                </Card>
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
                Training and support are only part of the picture. The next step is understanding
                what you get, what it costs, and whether the franchise path is right for you.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:w-[280px]">
              <Link
                href="/the-model"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_model"
                data-cta-location="training_support_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">What you get</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Brand, tech, playbook, support</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/investment"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_investment"
                data-cta-location="training_support_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Investment & fees</p>
                  <p className="text-xs text-[#74726D] mt-0.5">What it costs to open a location</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
              <Link
                href="/who-its-for"
                className="group flex items-center justify-between rounded-xl border border-[#E6E4DF] bg-white px-6 py-5 hover:border-[#EAA820] hover:shadow-sm transition-all"
                data-cta="view_who_its_for"
                data-cta-location="training_support_links"
              >
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm">Is this right for you?</p>
                  <p className="text-xs text-[#74726D] mt-0.5">Who the franchise path fits</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#74726D] group-hover:text-[#EAA820] transition-colors" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Still have questions? Let's answer them."
        subtitle="Book a no-pressure discovery call. We'll walk through exactly how training and support work at every stage of opening — and answer every question you have."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="training_support_bottom"
        showPhone
      />
    </>
  );
}
