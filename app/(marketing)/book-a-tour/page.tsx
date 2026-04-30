import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  MapPin,
  Handshake,
  Phone,
  Clock,
  Star,
} from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CTASection } from "@/components/marketing/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/marketing/animate";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Book a Tour — Muze Office Las Vegas & Houston",
  description:
    "Free tour of Muze Office Las Vegas (6860 Bermuda Rd) or Houston (1800 Augusta Dr). See coworking desks, private offices, meeting rooms. Call (702) 370-7515.",
  alternates: { canonical: "/book-a-tour" },
};

const steps = [
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    title: "1. Pick a time",
    description:
      "Choose an available tour time in our Optix scheduler, or call us if you need a custom visit. Tours typically take 20-30 minutes.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "2. Visit the space",
    description:
      "Walk through the coworking floor, private offices, meeting rooms, and our on-site cafe. Ask anything.",
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: "3. Choose your plan",
    description:
      "Find the membership that fits. Day passes, dedicated desks, private offices — all month-to-month, no long-term lease.",
  },
];

const testimonials = [
  {
    quote:
      "I toured on a Tuesday and was working from my desk by Thursday. The team made everything effortless.",
    name: "Kevin M.",
    role: "Freelance developer",
    rating: "5.0",
  },
  {
    quote:
      "The space is clean, professional, and way better than any coffee shop. Free parking sealed the deal.",
    name: "Sarah T.",
    role: "Real estate agent",
    rating: "4.9",
  },
  {
    quote:
      "I came in for a virtual office and ended up upgrading to a dedicated desk. It just felt right.",
    name: "Daniel P.",
    role: "Startup founder",
    rating: "5.0",
  },
];

export default function BookATourPage() {
  return (
    <>
      <LocalBusinessSchema locationId="las-vegas" />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Book a Tour", href: "/book-a-tour" },
        ]}
      />
      {/* Hero */}
      <Section>
        <div className="mx-auto max-w-[800px] text-center">
          <FadeIn>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold md:text-5xl">
              Book a Tour &mdash; Visit Muze Office Las Vegas
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-base text-[#74726D] md:text-lg">
              See the space in person. Walk through coworking desks, private offices,
              meeting rooms, and our on-site cafe at 6860 Bermuda Rd, Suite 200, Las Vegas.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-[#74726D]">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#EAA820]" />
                20-30 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#EAA820]" />
                6860 Bermuda Rd, Suite 200
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-[#EAA820]" />
                (702) 370-7515
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={BRAND.booking.tourUrl}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-xl bg-[#EAA820] px-8 text-white hover:bg-[#C17A28] h-14 text-base font-semibold"
                )}
              >
                Schedule Instantly
              </a>
              <a
                href="tel:+17023707515"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-xl h-14 px-8 text-base"
                )}
              >
                Call (702) 370-7515
              </a>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* What to Expect */}
      <Section variant="gray">
        <FadeIn>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
              What to expect
            </h2>
            <p className="mt-3 max-w-[560px] text-base text-[#74726D]">
              Three simple steps from scheduling to your first day.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.title}>
              <div className="flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#EAA820]">
                  {step.icon}
                </div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#74726D]">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Tour Form */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
          <div>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold md:text-3xl">
              Need a custom time?
            </h2>
            <p className="mt-3 text-base text-[#74726D]">
              Use the instant scheduler above for the fastest booking. If you need
              an after-hours visit, a group tour, or want to talk with us first,
              fill out the form and our team will follow up within one business
              day. You can also call us directly at{" "}
              <a
                href="tel:+17023707515"
                className="font-medium text-[#1A1A1A] hover:underline"
              >
                (702) 370-7515
              </a>
              .
            </p>
            <ContactForm className="mt-8" />
          </div>
          </FadeIn>

          {/* Sidebar info */}
          <FadeIn delay={0.2}>
          <div className="flex flex-col gap-6">
            <Card className="border-[#E6E4DF] bg-[#F2F1ED]">
              <CardContent className="flex flex-col gap-4 p-6">
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold">
                  Las Vegas Location
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-[#74726D]">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-[#EAA820]" />
                    Mon&ndash;Fri, 10 am &ndash; 7 pm
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-[#EAA820]" />
                    <a href="tel:+17023707515" className="hover:text-[#1A1A1A]">
                      (702) 370-7515
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="rounded-xl border border-[#E6E4DF] bg-[#F2F1ED] p-6">
              <p className="text-sm leading-relaxed text-[#74726D]">
                <strong className="text-[#1A1A1A]">Free parking</strong>{" "}
                is available on-site. The building is off I-215, away from Strip
                traffic, and just 10 minutes from Harry Reid International Airport.
              </p>
            </div>
          </div>
          </FadeIn>
        </div>
      </Section>

      {/* Testimonials */}
      <Section variant="gray">
        <FadeIn>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
              What members say
            </h2>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <Card className="border-[#E6E4DF] bg-white">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#EAA820] text-[#EAA820]"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-sm italic text-[#1A1A1A]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-[#74726D]">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* CTA */}
      <CTASection
        heading="Ready to find your workspace?"
        subtitle="Month-to-month memberships, no long-term leases, free parking. Let us show you around."
        primaryLabel="Call (702) 370-7515"
        primaryHref="tel:+17023707515"
        showPhone={false}
        ctaLocation="book_a_tour_bottom"
      />
    </>
  );
}
