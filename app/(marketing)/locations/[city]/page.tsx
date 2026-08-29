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
import { LocationMap } from "@/components/marketing/location-map";
import { GoogleReviewsBadge } from "@/components/marketing/google-reviews-badge";
import { HoustonWaitlistForm } from "@/components/forms/houston-waitlist-form";
import { FadeIn } from "@/components/marketing/animate";
import { Star } from "lucide-react";
import { BRAND, OG_DEFAULTS } from "@/lib/utils/constants";

const coreServiceIds = [
  "virtual-office",
  "coworking",
  "private-office",
  "meeting-rooms",
  "conference-rooms",
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

  const shortAddress =
    location.address.street !== "TBD"
      ? location.address.street
      : `${location.address.city}, ${location.address.state}`;

  const isComingSoon = location.status !== "active";
  const isHoustonLaunchPage =
    location.slug === "houston" && location.address.street !== "TBD";
  const phoneCta =
    location.phone !== "TBD" ? `Call ${location.phone}.` : "Coming soon.";

  if (isHoustonLaunchPage) {
    return {
      title: "Muze Office Houston — Galleria Opening 2026",
      description:
        "Join Muze Office Houston early access for planned virtual office, coworking, private offices, and meeting rooms at 1800 Augusta Dr. Services are not active yet.",
      alternates: { canonical: `/locations/${city}` },
      openGraph: {
        ...OG_DEFAULTS,
        type: "website",
        url: `/locations/${city}`,
        title: "Muze Office Houston — Galleria Opening 2026",
        description:
          "Join early access for Houston opening updates, planned coworking, virtual office, private office, and meeting space availability.",
      },
    };
  }

  return {
    title: `Muze Office ${location.name} — Hours & Directions`,
    description: `Visit Muze Office ${location.name} at ${shortAddress}. Hours, parking, directions, and amenities. Month-to-month memberships available. ${phoneCta}`,
    alternates: { canonical: `/locations/${city}` },
    openGraph: { ...OG_DEFAULTS, type: "website", url: `/locations/${city}` },
    // Generic future locations stay out of search until their address and
    // launch information are confirmed. Houston is handled above as the one
    // substantive, transparent pre-opening hub.
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
  const isHoustonLaunchPage = location.slug === "houston" && !isActive;
  const imageSlug = location.slug === "las-vegas" ? "las-vegas" : "houston";
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
          sizes="100vw"
          className="object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <FadeIn>
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3">
              <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold text-white md:text-5xl">
                {isHoustonLaunchPage
                  ? "Muze Office Houston, Opening in 2026"
                  : `Muze Office ${location.name}`}
              </h1>
              {!isActive && (
                <Badge variant="secondary" className="text-xs">
                  Coming Soon
                </Badge>
              )}
            </div>
            <p className="mt-4 max-w-[560px] text-base leading-relaxed text-gray-300 md:text-lg">
              {isActive
                ? `Open 24/7 for members at ${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}. Same-day Day Passes and month-to-month memberships with free parking.`
                : `An independently operated Muze Office franchise location is planned at ${location.address.street} in Houston's Galleria / Tanglewood area. Join early access for verified opening updates; no Houston memberships or address services are active yet.`}
            </p>
            {isHoustonLaunchPage && (
              <a
                href="#waitlist"
                data-cta="houston_waitlist"
                data-cta-location="houston_hero"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-6 w-fit rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]",
                )}
              >
                Join Houston early access
              </a>
            )}
          </div>
          </FadeIn>
        </div>
      </section>

      {isHoustonLaunchPage && (
        <Section variant="gray">
          <div
            id="waitlist"
            className="grid scroll-mt-24 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
          >
            <FadeIn>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6000]">
                  Houston early access
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A]">
                  Tell us what workspace you need
                </h2>
                <p className="mt-4 max-w-[560px] leading-relaxed text-[#74726D]">
                  Join the opening list for updates about planned coworking,
                  private offices, virtual office services, and meeting space
                  near the Galleria. We&apos;ll use your response to prioritize
                  demand and contact you when availability is confirmed.
                </p>
                <ul className="mt-6 flex flex-col gap-3 text-sm text-[#74726D]">
                  <li className="flex gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    Opening updates tied to the 1800 Augusta Dr location
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    No payment or membership commitment
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                    Direct follow-up from the Muze Office team
                  </li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="rounded-2xl border border-[#E6E4DF] bg-white p-6 shadow-sm md:p-8">
                <HoustonWaitlistForm />
              </div>
            </FadeIn>
          </div>
        </Section>
      )}

      {/* NAP + Details */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <FadeIn>
          <div className="flex flex-col gap-6">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold">
              {isActive ? "Contact & Hours" : "Opening location"}
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
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-[#EAA820]" />
                <a
                  href={`mailto:${location.email}`}
                  className="text-[#74726D] hover:text-[#1A1A1A]"
                >
                  {location.email}
                </a>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#EAA820]">
                  Preferred
                </span>
              </li>
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
              <li className="flex items-start gap-3 text-sm text-[#74726D]">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                {isActive ? (
                  <span>
                    Open 24/7 for members
                    <br />
                    Phone Mon&ndash;Fri, 10am&ndash;5pm
                    <br />
                    Staffed Mon&ndash;Fri, 10am&ndash;7pm
                  </span>
                ) : (
                  <span>
                    Planned opening: 2026
                    <br />
                    Hours and opening date: to be announced
                  </span>
                )}
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
              {isActive ? "Available Services" : "Planned workspace options"}
            </h2>
            <ul className="flex flex-col gap-3">
              {locationServices.map((service) => (
                <li key={service!.id}>
                  <Link
                    href={
                      isActive
                        ? `/${location.slug}-${service!.id}`
                        : "#waitlist"
                    }
                    className="group flex items-center gap-3 text-sm text-[#74726D] transition-colors hover:text-[#1A1A1A]"
                  >
                    <CheckCircle className="h-4 w-4 text-[#EAA820]" />
                    <span>{service!.name}</span>
                    {isActive && service!.tiers[0]?.price && (
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

      {isHoustonLaunchPage && (
        <Section variant="gray">
          <FadeIn>
            <div className="mb-8 max-w-[720px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6000]">
                Houston planning guides
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A]">
                Research the address before you choose a provider
              </h2>
              <p className="mt-3 leading-relaxed text-[#74726D]">
                These guides explain provider comparisons, USPS mail-receiving
                requirements, and the difference between a virtual office and
                a PO Box. Muze Office Houston remains pre-opening.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/blog/best-virtual-office-providers-in-houston",
                title: "How to compare Houston virtual office providers",
                description: "A checklist for staffing, mail handling, contracts, and address rules.",
              },
              {
                href: "/blog/how-to-set-up-a-virtual-office-in-houston",
                title: "Houston virtual office setup guide",
                description: "Understand PS Form 1583, identity documents, and provider onboarding.",
              },
              {
                href: "/blog/virtual-office-vs-po-box-in-texas",
                title: "Texas virtual office vs. PO Box",
                description: "Compare mail, packages, registered-agent rules, and practical use cases.",
              },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-xl border border-[#E6E4DF] bg-white p-6 transition-colors hover:border-[#EAA820]"
              >
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#74726D]">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          heading={`Muze Office ${location.name} — FAQ`}
          description={
            isHoustonLaunchPage
              ? "Confirmed answers about the planned Houston address, opening status, parking, services, and early access."
              : `Answers to common questions about Muze Office ${location.name}, including address, hours, parking, and services.`
          }
          faqs={faqs}
        />
      )}

      {/* Map + reviews */}
      {isActive && (
        <Section variant="gray">
          <FadeIn>
            <div className="mx-auto flex max-w-[800px] flex-col items-center gap-6">
              <LocationMap
                address={`${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`}
                title={`Map of Muze Office ${location.name}`}
                className="aspect-video w-full bg-white"
              />
              <div className="flex flex-col items-center gap-4 text-center">
                <GoogleReviewsBadge
                  rating={location.rating}
                  reviewCount={location.reviewCount}
                  href={location.externalProfiles?.gbp}
                />
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://www.google.com/maps/place/${encodeURIComponent(`${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[#74726D] hover:text-[#1A1A1A] hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {location.id === "las-vegas" && (
                    <a
                      href={BRAND.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="leave_review"
                      data-cta-location="location_page"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "rounded-lg"
                      )}
                    >
                      <Star className="h-4 w-4 text-[#EAA820]" />
                      Leave a Google review
                    </a>
                  )}
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
        primaryLabel={isActive ? "Book a Tour" : "Join Houston early access"}
        primaryHref={isActive ? BRAND.booking.tourUrl : "#waitlist"}
        showPhone={isActive}
        ctaLocation={`location_${location.slug}_bottom`}
      />
    </>
  );
}
