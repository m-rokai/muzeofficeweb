import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Users,
  Lock,
  Presentation,
  CalendarDays,
  Check,
} from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/data/services";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/marketing/animate";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Workspace Memberships at Muze Office",
  description:
    "Explore flexible workspace memberships at Muze Office: virtual offices from $39/mo, coworking from $25/day, private offices, meeting rooms, and event space. All month-to-month in Las Vegas.",
  alternates: { canonical: "/workspace-memberships" },
};

const serviceIcons: Record<string, React.ReactNode> = {
  "virtual-office": <Mail className="h-6 w-6" />,
  coworking: <Users className="h-6 w-6" />,
  "private-office": <Lock className="h-6 w-6" />,
  "meeting-rooms": <Presentation className="h-6 w-6" />,
  "event-space": <CalendarDays className="h-6 w-6" />,
};

const coreServiceIds = [
  "virtual-office",
  "coworking",
  "private-office",
  "meeting-rooms",
  "event-space",
];

const coreServices = services.filter((s) => coreServiceIds.includes(s.id));

const comparisonFeatures = [
  { feature: "Business address", virtual: true, coworking: true, privateOffice: true, meetingRooms: false, eventSpace: false },
  { feature: "Mail handling", virtual: true, coworking: true, privateOffice: true, meetingRooms: false, eventSpace: false },
  { feature: "Desk access", virtual: false, coworking: true, privateOffice: true, meetingRooms: false, eventSpace: false },
  { feature: "24/7 access", virtual: false, coworking: true, privateOffice: true, meetingRooms: false, eventSpace: false },
  { feature: "Private lockable space", virtual: false, coworking: false, privateOffice: true, meetingRooms: false, eventSpace: false },
  { feature: "Meeting room credits", virtual: true, coworking: true, privateOffice: true, meetingRooms: true, eventSpace: false },
  { feature: "AV equipment", virtual: false, coworking: false, privateOffice: false, meetingRooms: true, eventSpace: true },
  { feature: "Catering available", virtual: false, coworking: false, privateOffice: false, meetingRooms: false, eventSpace: true },
  { feature: "Free parking", virtual: true, coworking: true, privateOffice: true, meetingRooms: true, eventSpace: true },
  { feature: "WiFi included", virtual: false, coworking: true, privateOffice: true, meetingRooms: true, eventSpace: true },
];

const columnKeys = [
  { key: "virtual" as const, label: "Virtual Office" },
  { key: "coworking" as const, label: "Coworking" },
  { key: "privateOffice" as const, label: "Private Office" },
  { key: "meetingRooms" as const, label: "Meeting Rooms" },
  { key: "eventSpace" as const, label: "Event Space" },
];

export default function WorkspaceMembershipsPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <FadeIn>
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold md:text-5xl">
              Workspace Memberships at Muze Office
            </h1>
            <p className="mt-4 text-base text-[#74726D] md:text-lg">
              From virtual offices to private suites, every membership is
              month-to-month with no long-term lease. Find the plan that fits your
              work style.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Service Cards */}
      <Section variant="gray">
        <FadeIn>
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
              Choose your workspace
            </h2>
            <p className="mt-3 max-w-[560px] text-base text-[#74726D]">
              Five flexible options in Las Vegas. All plans include free parking and
              are available month-to-month.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <StaggerItem key={service.id}>
            <Card
              className="group border-[#E6E4DF] bg-white transition-shadow hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F1ED] text-[#EAA820]">
                  {serviceIcons[service.id]}
                </div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold">
                  {service.name}
                </h3>
                <p className="text-sm text-[#74726D]">
                  {service.shortDescription}
                </p>
                {service.tiers[0]?.price && (
                  <p className="text-sm font-medium text-[#EAA820]">
                    From ${service.tiers[0].price}/{service.tiers[0].priceUnit}
                  </p>
                )}
                <Link
                  href={`/las-vegas-${service.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-auto w-fit rounded-lg"
                  )}
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Comparison Table */}
      <Section>
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
              Compare memberships
            </h2>
            <p className="mt-3 text-base text-[#74726D]">
              See which features are included with each workspace type.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E6E4DF]">
                <th className="py-3 pr-4 font-semibold text-[#1A1A1A]">
                  Feature
                </th>
                {columnKeys.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 py-3 text-center font-semibold text-[#1A1A1A]"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row) => (
                <tr key={row.feature} className="border-b border-[#E6E4DF]">
                  <td className="py-3 pr-4 text-[#74726D]">{row.feature}</td>
                  {columnKeys.map((col) => (
                    <td key={col.key} className="px-3 py-3 text-center">
                      {row[col.key] ? (
                        <Check className="mx-auto h-4 w-4 text-[#EAA820]" />
                      ) : (
                        <span className="text-[#E6E4DF]">&mdash;</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </FadeIn>
      </Section>

      {/* CTA */}
      <CTASection
        heading="Not sure which plan is right for you?"
        subtitle="Book a tour and our team will walk you through the options. No pressure, no commitment."
        primaryLabel="Book a Tour"
        primaryHref={BRAND.booking.tourUrl}
      />
    </>
  );
}
