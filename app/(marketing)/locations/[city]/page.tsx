import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  Landmark,
  CheckCircle,
} from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CTASection } from "@/components/marketing/cta-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { Badge } from "@/components/ui/badge";
import { locations, type Location } from "@/lib/data/locations";
import { services as allServices } from "@/lib/data/services";
import { getFAQsForPage } from "@/lib/data/faqs";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { FadeIn } from "@/components/marketing/animate";
import { BRAND } from "@/lib/utils/constants";

const coreServiceIds = [
  "virtual-office",
  "coworking",
  "private-office",
  "meeting-rooms",
  "event-space",
];

export function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);
  if (!location) {
    return { title: "Location Not Found | Muze Office" };
  }

  const addressStr =
    location.address.street !== "TBD"
      ? `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`
      : `${location.address.city}, ${location.address.state}`;

  const isComingSoon = location.status !== "active";

  return {
    title: `Muze Office ${location.name} — Coworking & Virtual Office`,
    description: `Visit Muze Office ${location.name} at ${addressStr}. Flexible coworking, virtual offices, private offices, meeting rooms, and event space. Month-to-month. ${location.phone !== "TBD" ? `Call ${location.phone}.` : "Coming soon."}`,
    alternates: { canonical: `/locations/${city}` },
    // Prevent Google from indexing coming-soon pages with TBD addresses,
    // but allow crawlers to follow outbound links (internal navigation,
    // waitlist CTAs). The page stays accessible to real visitors.
    robots: isComingSoon ? { index: false, follow: true } : undefined,
  };
}

function getLocationServices(location: Location) {
  return location.services
    .filter((sid) => coreServiceIds.includes(sid))
    .map((sid) => allServices.find((s) => s.id === sid))
    .filter(Boolean);
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);

  if (!location) {
    notFound();
  }

  const locationServices = getLocationServices(location);
  const isActive = location.status === "active";
  const imageSlug = location.slug === "las-vegas" ? "las-vegas" : "houston";
  // Page-scoped FAQs live per city slug (e.g. "locations/las-vegas").
  // Coming-soon cities (Houston) intentionally have no FAQ set — the page
  // is noindexed and the info hasn't been finalized.
  const faqs = getFAQsForPage(`locations/${location.slug}`);

  return (
    <>
      {isActive && <LocalBusinessSchema locationId={location.id} />}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: location.name, href: `/locations/${location.slug}` },
        ]}
      />
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end bg-[#1A1A1A] px-6 pb-16 pt-32">
        <Image
          src={`/images/spaces/${imageSlug}.jpg`}
          alt={
            location.slug === "las-vegas"
              ? `Muze Office ${location.name} at ${location.address.street}, ${location.address.city}, ${location.address.state} — coworking and private office building near Harry Reid International Airport`
              : `Muze Office ${location.name} — upcoming coworking location near the Galleria and Uptown district`
          }
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <FadeIn>
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3">
              <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold text-white md:text-5xl">
                Muze Office {location.name}
              </h1>
              {!isActive && (
                <Badge variant="secondary" className="text-xs">
                  Coming Soon
                </Badge>
              )}
            </div>
            <p className="mt-4 max-w-[560px] text-base leading-relaxed text-gray-300 md:text-lg">
              {isActive
                ? `Flexible workspace at ${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}. Month-to-month memberships with free parking.`
                : `Our ${location.name} location is coming soon. Join the waitlist for early access and updates.`}
            </p>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* NAP + Details */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <FadeIn>
          <div className="flex flex-col gap-6">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold">
              Contact &amp; Hours
            </h2>
            <ul className="flex flex-col gap-4">
              {location.address.street !== "TBD" && (
                <li className="flex items-start gap-3 text-sm text-[#74726D]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                  <span>
                    {location.address.street}
                    <br />
                    {location.address.city}, {location.address.state}{" "}
                    {location.address.zip}
                  </span>
                </li>
              )}
              {location.phone !== "TBD" && (
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 shrink-0 text-[#EAA820]" />
                  <a
                    href={`tel:${location.phoneRaw}`}
                    className="text-[#74726D] hover:text-[#1A1A1A]"
                  >
                    {location.phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-[#EAA820]" />
                <a
                  href={`mailto:${location.email}`}
                  className="text-[#74726D] hover:text-[#1A1A1A]"
                >
                  {location.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#74726D]">
                <Clock className="h-4 w-4 shrink-0 text-[#EAA820]" />
                Mon&ndash;Fri, 10 am &ndash; 7 pm
              </li>
            </ul>

            {isActive && (
              <a
                href={BRAND.booking.tourUrl}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-fit rounded-lg bg-[#1A1A1A]"
                )}
              >
                Book a Tour
              </a>
            )}
          </div>
          </FadeIn>

          {/* Services */}
          <FadeIn delay={0.15}>
          <div className="flex flex-col gap-6">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold">
              Available Services
            </h2>
            <ul className="flex flex-col gap-3">
              {locationServices.map((service) => (
                <li key={service!.id}>
                  <Link
                    href={
                      isActive
                        ? `/${location.slug}-${service!.id}`
                        : `/workspace-memberships`
                    }
                    className="group flex items-center gap-3 text-sm text-[#74726D] transition-colors hover:text-[#1A1A1A]"
                  >
                    <CheckCircle className="h-4 w-4 text-[#EAA820]" />
                    <span>{service!.name}</span>
                    {service!.tiers[0]?.price && (
                      <span className="ml-auto text-xs text-[#EAA820]">
                        From ${service!.tiers[0].price}/{service!.tiers[0].priceUnit}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </FadeIn>

          {/* Neighborhood */}
          <FadeIn delay={0.3}>
          <div className="flex flex-col gap-6">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold">
              Neighborhood
            </h2>

            {/* Local Cues */}
            <ul className="flex flex-col gap-2">
              {location.localCues.map((cue) => (
                <li
                  key={cue}
                  className="flex items-start gap-2 text-sm text-[#74726D]"
                >
                  <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#EAA820]" />
                  {cue}
                </li>
              ))}
            </ul>

            {/* Nearby Landmarks */}
            <div>
              <h3 className="text-sm font-semibold text-[#1A1A1A]">
                Nearby Landmarks
              </h3>
              <ul className="mt-2 flex flex-col gap-2">
                {location.nearbyLandmarks.map((lm) => (
                  <li
                    key={lm.name}
                    className="flex items-center justify-between text-sm text-[#74726D]"
                  >
                    <span className="flex items-center gap-2">
                      <Landmark className="h-3.5 w-3.5 text-[#EAA820]" />
                      {lm.name}
                    </span>
                    <span className="text-xs">{lm.distance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tax Advantage */}
            <div className="rounded-lg bg-[#F2F1ED] p-4">
              <p className="text-xs font-medium text-[#EAA820]">Tax Advantage</p>
              <p className="mt-1 text-sm text-[#74726D]">
                {location.taxAdvantage}
              </p>
            </div>
          </div>
          </FadeIn>
        </div>
      </Section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          heading={`Muze Office ${location.name} — FAQ`}
          description={`Answers to common questions about Muze Office ${location.name}, including address, hours, parking, and services.`}
          faqs={faqs}
        />
      )}

      {/* Map Placeholder */}
      {isActive && (
        <Section variant="gray">
          <FadeIn>
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex aspect-video w-full max-w-[800px] items-center justify-center overflow-hidden rounded-xl border border-[#E6E4DF] bg-white">
              <div className="flex flex-col items-center gap-2 text-center">
                <MapPin className="h-8 w-8 text-[#EAA820]" />
                <p className="text-sm font-medium text-[#1A1A1A]">
                  {location.address.street}, {location.address.city},{" "}
                  {location.address.state} {location.address.zip}
                </p>
                <a
                  href={`https://www.google.com/maps/place/${encodeURIComponent(`${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-[#EAA820] hover:underline"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
          </FadeIn>
        </Section>
      )}

      {/* CTA */}
      <CTASection
        heading={
          isActive
            ? `Visit Muze Office ${location.name}`
            : `${location.name} is coming soon`
        }
        subtitle={
          isActive
            ? "Book a tour today. Walk through the space, meet the community, and find the plan that fits."
            : "Get notified when our Houston location opens. Reach out with questions or early interest."
        }
        primaryLabel={isActive ? "Book a Tour" : "Contact Us"}
        primaryHref={isActive ? BRAND.booking.tourUrl : "/contact"}
        showPhone={isActive}
      />
    </>
  );
}
