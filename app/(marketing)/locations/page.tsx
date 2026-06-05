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
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Las Vegas Coworking & Office Location — Book a Tour",
  description:
    "Visit Muze Office in Las Vegas at 6860 Bermuda Rd, Suite 200. Houston coming soon at 1800 Augusta Dr in the Galleria. Free parking, month-to-month memberships. Book a tour.",
  alternates: { canonical: "/locations" },
};

const locationImages: Record<string, string> = {
  "las-vegas": "/images/spaces/las-vegas.jpg",
  houston: "/images/spaces/houston.jpg",
};

const locationServices: Record<string, string[]> = {
  "las-vegas": [
    "Virtual Office",
    "Coworking",
    "Private Office",
    "Meeting Rooms",
    "Event Space",
  ],
  houston: [
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
              Open in Las Vegas (6860 Bermuda Rd, Suite 200), with a second
              flagship opening in Houston in 2026 (1800 Augusta Dr in the
              Galleria / Tanglewood area). Free parking.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Location Cards */}
      <Section variant="gray">
        <div className="grid gap-8 md:grid-cols-2">
          {locations.map((loc, i) => (
            <ScaleIn key={loc.id} delay={i * 0.15}>
            <Card
              className="overflow-hidden border-[#E6E4DF] bg-white"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={locationImages[loc.slug] ?? "/images/spaces/las-vegas.jpg"}
                  alt={
                    loc.slug === "las-vegas"
                      ? `Muze Office ${loc.name} coworking and private office building at 6860 Bermuda Rd, Suite 200, 10 minutes from Harry Reid International Airport`
                      : `Muze Office ${loc.name} coworking and private office building at 1800 Augusta Dr inside the 610 Loop in the Galleria / Tanglewood area`
                  }
                  fill
                  className="object-cover"
                />
                {loc.status === "coming-soon" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Badge className="bg-white text-[#1A1A1A]">Coming Soon</Badge>
                  </div>
                )}
              </div>
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="flex items-center gap-2">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold">
                    Muze Office {loc.name}
                  </h2>
                  {loc.status === "active" && (
                    <Badge className="bg-[#EAA820] text-white hover:bg-[#C17A28]">
                      Open
                    </Badge>
                  )}
                </div>

                <div className="flex items-start gap-2 text-sm text-[#74726D]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                  {loc.address.street !== "TBD" ? (
                    <span>
                      {loc.address.street}, {loc.address.city},{" "}
                      {loc.address.state} {loc.address.zip}
                    </span>
                  ) : (
                    <span>
                      {loc.address.city}, {loc.address.state} &mdash; Address TBD
                    </span>
                  )}
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
                  {loc.status === "active" ? `Explore ${loc.name}` : `${loc.name} Waitlist`}
                </Link>
              </CardContent>
            </Card>
            </ScaleIn>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        heading="Muze Office locations — FAQ"
        description="Answers to common questions about our Las Vegas location and upcoming Houston opening."
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
