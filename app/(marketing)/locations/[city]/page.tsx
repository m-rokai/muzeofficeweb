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
import {
  locations,
  formatOpeningDate,
  formatOpeningMonth,
  type Location,
} from "@/lib/data/locations";
import { cityServiceData } from "@/lib/data/city-services";
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

const houstonPlannedServices = [
  {
    title: "Coworking and day passes near the Galleria",
    description:
      "Drop-in and monthly desks for remote employees, consultants, and visiting teams who need reliable WiFi and a quiet place to take calls, not a table at a coffee shop on Westheimer.",
  },
  {
    title: "Virtual office and Houston business address",
    description:
      "A commercial mail-receiving address at 1800 Augusta Dr, Houston, TX 77057 with mail handling. Service starts after USPS Form 1583 and identification are accepted.",
  },
  {
    title: "Private offices",
    description:
      "Furnished, lockable offices for solo professionals and small teams who need a door that closes for confidential client work, month to month instead of a long-term lease.",
  },
  {
    title: "Meeting and conference rooms by the hour",
    description:
      "Rooms with screens for client meetings, interviews, and team sessions, a short drive from Post Oak Blvd, the I-610 West Loop, and the Energy Corridor.",
  },
  {
    title: "Event and training space",
    description:
      "Room for workshops, trainings, and small company events in Uptown Houston, with layouts planned for presentations and group sessions.",
  },
  {
    title: "Easy access from across Houston",
    description:
      "Off Woodway Dr near the I-610 West Loop, with routes to River Oaks, Bellaire, Westchase, downtown, and the Texas Medical Center. Parking details will be confirmed before opening.",
  },
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
  // Keyed on status (not address) so the pre-opening title disappears the
  // moment Houston is switched to active.
  const isHoustonLaunchPage = location.slug === "houston" && isComingSoon;
  const phoneCta =
    location.phone !== "TBD" ? `Call ${location.phone}.` : "";

  if (isHoustonLaunchPage) {
    const opening = formatOpeningMonth(location) ?? "2026";
    const openingDay = formatOpeningDate(location);
    // Pre-opening hub: target the service + neighborhood terms Houston
    // searchers use, stay explicit that the location is not open yet.
    const title = `Muze Office Houston — Galleria Coworking, Opening ${opening}`;
    const description = `Coworking, private offices, virtual office addresses, and meeting rooms planned at 1800 Augusta Dr near the Galleria and Uptown${openingDay ? `, opening ${openingDay}` : ""}. Join early access for launch pricing.`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `/locations/${city}` },
      openGraph: {
        ...OG_DEFAULTS,
        type: "website",
        url: `/locations/${city}`,
        title,
        description,
      },
    };
  }

  return {
    title: {
      absolute:
        location.slug === "las-vegas"
          ? "Muze Office Las Vegas — 24/7 Coworking, Hours & Directions"
          : `Muze Office ${location.name} — Coworking, Hours & Directions`,
    },
    description: `Visit Muze Office ${location.name} at ${shortAddress}. Hours, parking, directions, and amenities. Month-to-month memberships available. ${phoneCta}`.trim(),
    alternates: { canonical: `/locations/${city}` },
    openGraph: { ...OG_DEFAULTS, type: "website", url: `/locations/${city}` },
    // Generic future locations stay out of search until their address and
    // launch information are confirmed. Houston is handled above as the one
    // substantive, transparent pre-opening hub.
    robots: isComingSoon ? { index: false, follow: true } : undefined,
  };
}

/** Every live service page for an active location (hub → spoke links). */
function getLocationServicePages(location: Location) {
  return location.services
    .map((sid) => cityServiceData[`${location.slug}-${sid}`])
    .filter(Boolean);
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
  const servicePages = isActive ? getLocationServicePages(location) : [];
  const hasPhone = location.phone !== "TBD";
  const tourHref =
    location.booking?.tourUrl ?? "/contact?interest=coworking";
  const openingMonth = formatOpeningMonth(location);
  const openingDay = formatOpeningDate(location);
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
                  ? `Muze Office Houston, Opening ${openingDay ?? openingMonth ?? "in 2026"}`
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
                ? location.slug === "las-vegas"
                  ? `Open 24/7 at ${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}. Same-day Day Passes and month-to-month memberships with free parking.`
                  : `Coworking, private offices, virtual office addresses, and meeting rooms at ${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}. Month-to-month memberships.`
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
              {hasPhone && (
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
                {location.hours.display ? (
                  <span>
                    {location.hours.display.map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span>
                    {isActive
                      ? "Opening day"
                      : `Planned opening: ${openingDay ?? openingMonth ?? "2026"}`}
                    <br />
                    Hours: to be announced
                  </span>
                )}
              </li>
            </ul>

            {isActive && (
              <a
                href={tourHref}
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
              {isActive
                ? servicePages.map((page) => {
                    const service = allServices.find(
                      (s) => s.id === page.serviceId
                    );
                    const firstTier = service?.tiers[0];
                    return (
                      <li key={page.slug}>
                        <Link
                          href={`/${page.slug}`}
                          className="group flex items-center gap-3 text-sm text-[#74726D] transition-colors hover:text-[#1A1A1A]"
                        >
                          <CheckCircle className="h-4 w-4 shrink-0 text-[#EAA820]" />
                          <span>{page.h1}</span>
                          {location.usesStandardCatalog && firstTier?.price && (
                            <span className="ml-auto shrink-0 text-xs text-[#EAA820]">
                              From ${firstTier.price}/{firstTier.priceUnit}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })
                : locationServices.map((service) => (
                    <li key={service!.id}>
                      <Link
                        href="#waitlist"
                        className="group flex items-center gap-3 text-sm text-[#74726D] transition-colors hover:text-[#1A1A1A]"
                      >
                        <CheckCircle className="h-4 w-4 text-[#EAA820]" />
                        <span>{service!.name}</span>
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

      {/* On-site Amenities (LV only) */}
      {isActive && location.slug === "las-vegas" && (
        <Section variant="gray">
          <FadeIn>
            <div className="mx-auto flex max-w-[800px] flex-col gap-6">
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold">
                  On-site Amenities
                </h2>
                <p className="mt-2 text-sm text-[#74726D]">
                  Partner businesses operating inside the building. Members and
                  guests can book directly.
                </p>
              </div>
              <a
                href="https://beauty-booking-three.vercel.app"
                target="_blank"
                rel="noopener"
                className="group flex flex-col gap-2 rounded-xl border border-[#E6E4DF] bg-white p-6 transition-colors hover:border-[#EAA820]"
              >
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                  Ashley Lacy Esthetics
                </h3>
                <p className="text-sm text-[#74726D]">
                  On-site esthetician booth &mdash; facials, waxing, lash, and
                  body treatments. Open 7 days a week. Book online with a
                  deposit.
                </p>
                <span className="text-sm font-medium text-[#EAA820] group-hover:underline">
                  Book a facial &rarr;
                </span>
              </a>
            </div>
          </FadeIn>
        </Section>
      )}

      {/* Pre-opening service overview: gives the one indexable Houston URL
          real coverage of the service + neighborhood terms until the
          individual service pages go live at opening. */}
      {isHoustonLaunchPage && (
        <Section>
          <FadeIn>
            <div className="mb-8 max-w-[720px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6000]">
                Planned at 1800 Augusta Dr
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A]">
                Coworking, offices, and meeting space in the Galleria area
              </h2>
              <p className="mt-3 leading-relaxed text-[#74726D]">
                Muze Office Houston is being built for people who work in and
                around Uptown, Tanglewood, Briargrove, and Memorial and want a
                professional base near Post Oak without signing a
                multi-year lease. Here is what is planned. Pricing and
                availability will be confirmed before opening, and early-access
                members hear first.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {houstonPlannedServices.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#E6E4DF] bg-white p-6"
              >
                <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#74726D]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a
              href="#waitlist"
              data-cta="houston_waitlist"
              data-cta-location="houston_planned_services"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-lg bg-[#1A1A1A]"
              )}
            >
              Get opening pricing
            </a>
          </div>
        </Section>
      )}

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
                {location.externalProfiles?.gbp && (
                  <GoogleReviewsBadge
                    rating={location.rating}
                    reviewCount={location.reviewCount}
                    href={location.externalProfiles.gbp}
                  />
                )}
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
        primaryHref={isActive ? tourHref : "#waitlist"}
        showPhone={isActive && hasPhone}
        phone={location.phone}
        ctaLocation={`location_${location.slug}_bottom`}
      />
    </>
  );
}
