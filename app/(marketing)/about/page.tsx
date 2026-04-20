import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Users,
  Briefcase,
  DoorOpen,
  MapPin,
  CalendarCheck,
  Clock,
  Plane,
} from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "About Muze Office — Modern Workspaces That Inspire",
  description:
    "Muze Office provides flexible coworking, virtual offices, private offices, and meeting rooms in Las Vegas and Houston. No long-term leases. Month-to-month memberships designed for modern professionals.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Flexibility",
    description:
      "Month-to-month memberships with no long-term commitments. Scale up, scale down, or cancel anytime.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community",
    description:
      "A curated environment where freelancers, startups, and established businesses connect and collaborate.",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Professionalism",
    description:
      "Clean, modern spaces with premium amenities — not a hotel lobby, not a coffee shop. A real workspace.",
  },
  {
    icon: <DoorOpen className="h-6 w-6" />,
    title: "Accessibility",
    description:
      "Free parking, convenient location near the airport, and plans that fit every budget and work style.",
  },
];

// Every stat here is verifiable from services.ts or locations.ts. Earlier
// versions of this page quoted an unverified "500+ professionals" and "2
// locations" (misleading while Houston is coming-soon); those were replaced
// with pricing and location facts that can be checked directly.
const stats = [
  { value: "From $25", label: "Day pass — no membership" },
  { value: "From $39", label: "Virtual office per month" },
  { value: "Month-to-month", label: "No long-term leases" },
  { value: "10 min", label: "From LAS airport" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end bg-[#1A1A1A] px-6 pb-16 pt-32">
        <Image
          src="/images/hero/coworking-space.jpg"
          alt="Inside Muze Office Las Vegas — open coworking area with desks, natural light, and members working alongside the on-site cafe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <div className="max-w-[640px]">
            <FadeIn delay={0.1}>
              <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold leading-tight text-white md:text-5xl">
                About Muze Office
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 max-w-[560px] text-base leading-relaxed text-gray-300 md:text-lg">
                Modern workspaces built for the way people actually work — flexible,
                professional, and community-driven.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold md:text-3xl">
              Why we started Muze Office
            </h2>
          </FadeIn>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-[#74726D]">
            <FadeIn delay={0.1}>
              <p>
                Traditional office leases were built for a different era — multi-year
                commitments, hidden costs, and rigid terms that don&apos;t match how
                modern professionals work. We founded Muze Office to change that.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p>
                Our mission is simple: provide flexible, high-quality workspace that
                adapts to you. Whether you&apos;re a freelancer who needs a desk for
                the day, a startup that needs a private office for three months, or a
                remote worker who needs a professional address and meeting space, Muze
                Office is designed for your rhythm.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>
                We started in Las Vegas with a space on Bermuda Road — 10 minutes from
                the airport, free parking, and a full-service cafe on-site.
                Houston is next, near the Galleria and Texas Medical Center. Both
                locations share the same commitment: no long-term leases, no hidden
                fees, and a workspace you actually enjoy walking into.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section variant="gray">
        <FadeIn>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
              What we believe
            </h2>
            <p className="mt-3 max-w-[560px] text-base text-[#74726D]">
              Four principles that guide everything we build, from floor plans to
              membership pricing.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#EAA820]">
                  {v.icon}
                </div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#74726D]">
                  {v.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Stats */}
      <Section>
        <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-[#1A1A1A] sm:text-3xl md:text-4xl">
                  {s.value}
                </span>
                <span className="text-sm text-[#74726D]">{s.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* CTA */}
      <CTASection
        heading="See the space for yourself"
        subtitle="Book a tour of Muze Office Las Vegas. Walk through the coworking area, private offices, meeting rooms, and cafe."
        primaryLabel="Book a Tour"
        primaryHref={BRAND.booking.tourUrl}
      />
    </>
  );
}
