import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { locations } from "@/lib/data/locations";
import { getFAQsForPage } from "@/lib/data/faqs";
import { FadeIn, ScaleIn } from "@/components/marketing/animate";
import { BRAND, OG_DEFAULTS } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Muze Office Locations — Las Vegas (Open) & Houston 2026",
  },
  description:
    "Muze Office locations: Las Vegas (open) at 6860 Bermuda Rd and Houston (2026) in the Galleria. Free parking, month-to-month memberships. Book a tour.",
  alternates: { canonical: "/locations" },
  openGraph: { ...OG_DEFAULTS, type: "website", url: "/locations" },
};

const locationImages: Record<string, string> = {
  "las-vegas": "/images/spaces/las-vegas.jpg",
};

const locationServices: Record<string, string[]> = {
  "las-vegas": [
    "Virtual Office",
    "Coworking",
    "Private Office",
    "Meeting Rooms",
    "Event Space",
  ],
};

export default function LocationsPage() {
  const faqs = getFAQsForPage("locations");

  return (
    <>
      {/* Hero */}
      <Section>
        <FadeIn>
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold md:text-5xl">
              Our Locations
            </h1>
            <p className="mt-4 text-base text-[#74726D] md:text-lg">
              Open in Las Vegas at 6860 Bermuda Rd, Suite 200, with free
              parking and flexible month-to-month workspace options.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Location Cards */}
      <Section variant="gray">
        <div className="grid max-w-[760px] gap-8">
          {locations.filter((loc) => loc.status === "active").map((loc, i) => (
            <ScaleIn key={loc.id} delay={i * 0.15}>
            <Card
              className="overflow-hidden border-[#E6E4DF] bg-white"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={locationImages[loc.slug] ?? "/images/spaces/las-vegas.jpg"}
                  alt={`Muze Office ${loc.name} coworking and private office building at 6860 Bermuda Rd, Suite 200, 10 minutes from Harry Reid International Airport`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="flex items-center gap-2">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold">
                    Muze Office {loc.name}
                  </h2>
                  <Badge className="bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]">
                    Open
                  </Badge>
                </div>

                <div className="flex items-start gap-2 text-sm text-[#74726D]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                  <span>
                    {loc.address.street}, {loc.address.city},{" "}
                    {loc.address.state} {loc.address.zip}
                  </span>
                </div>

                {loc.phone !== "TBD" && (
                  <div className="flex items-center gap-2 text-sm text-[#74726D]">
                    <Phone className="h-4 w-4 shrink-0 text-[#EAA820]" />
                    <a
                      href={`tel:${loc.phoneRaw}`}
                      className="hover:text-[#1A1A1A]"
                    >
                      {loc.phone}
                    </a>
                  </div>
                )}

                {/* Services */}
                <div className="mt-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#74726D]">
                    Services
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {(locationServices[loc.slug] ?? []).map((svc) => (
                      <span
                        key={svc}
                        className="rounded-md bg-[#F2F1ED] px-2 py-1 text-xs text-[#74726D]"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/locations/${loc.slug}`}
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "mt-4 w-fit rounded-lg bg-[#1A1A1A]"
                  )}
                >
                  Explore {loc.name}
                </Link>
              </CardContent>
            </Card>
            </ScaleIn>
          ))}
        </div>
        <Link
          href="/locations/houston"
          data-cta="houston_location"
          data-cta-location="locations_index_row"
          className="mt-8 flex max-w-[760px] items-center justify-between rounded-2xl border border-[#E6E4DF] bg-white px-5 py-4 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-[#EAA820]"
        >
          <span>Muze Office Houston</span>
          <span className="text-[#8A6000]">Coming 2026 →</span>
        </Link>
      </Section>

      {/* FAQ */}
      <FAQSection
        heading="Muze Office locations — FAQ"
        description="Answers to common questions about visiting our Las Vegas workspace."
        faqs={faqs}
      />

      {/* CTA */}
      <CTASection
        heading="Ready to see the space?"
        subtitle="Book a tour of our Las Vegas location. Free parking, 10 minutes from the airport."
        primaryLabel="Book a Tour"
        primaryHref={BRAND.booking.tourUrl}
        ctaLocation="locations_index_bottom"
      />
    </>
  );
}
