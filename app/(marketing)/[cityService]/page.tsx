import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Users,
  CheckCircle2,
  Clock3,
  Zap,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PricingCard } from "@/components/marketing/pricing-card";
import { FAQSection } from "@/components/marketing/faq-section";
import { CTASection } from "@/components/marketing/cta-section";
import { GoogleReviewsBadge } from "@/components/marketing/google-reviews-badge";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { ServiceSchema } from "@/components/seo/service-schema";
import { OptixBookingWidget } from "@/components/marketing/optix-booking-widget";
import { RelatedReading } from "@/components/marketing/related-reading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";

import { locations } from "@/lib/data/locations";
import { getCityServiceData } from "@/lib/data/city-services";
import { getFAQsForService } from "@/lib/data/faqs";
import { getRelatedBlogSlugsForService } from "@/lib/data/blog-links";
import { OG_DEFAULTS } from "@/lib/utils/constants";
import {
  generateAllCityServiceParams,
  parseCityServiceSlug,
  getServiceForCity,
} from "@/lib/utils/generate-city-service-slugs";

/* ── Static generation ─────────────────────────────────────── */

export function generateStaticParams() {
  return generateAllCityServiceParams();
}

/* ── Metadata ──────────────────────────────────────────────── */

type PageProps = {
  params: Promise<{ cityService: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { cityService } = await params;
  const data = getCityServiceData(cityService);

  if (!data) {
    return { title: "Not Found" };
  }

  // Look up the parent location to check status. Coming-soon city-service
  // pages get noindex so Google does not rank unfinished content, but
  // Googlebot can still follow links out (internal nav, waitlist CTAs).
  const ctx = parseCityServiceSlug(cityService);
  const location = ctx
    ? locations.find((l) => l.id === ctx.locationId)
    : undefined;
  const isComingSoon = location?.status !== "active";

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/${cityService}` },
    openGraph: {
      ...OG_DEFAULTS,
      title: data.metaTitle,
      description: data.metaDescription,
      type: "website",
      url: `/${cityService}`,
      images: [{ url: data.heroImage, width: 1200, height: 630, alt: data.metaTitle }],
    },
    robots: isComingSoon ? { index: false, follow: true } : undefined,
  };
}

/* ── Amenity icon map ──────────────────────────────────────── */

const amenityLabels: Record<string, string> = {
  "business-address": "Professional Business Address",
  "mail-handling": "Mail Handling & Forwarding",
  "meeting-rooms": "Meeting Room Access",
  coworking: "Coworking Hours",
  receptionist: "On-Site Receptionist",
  "llc-ready": "Commercial Address for Permitted Uses",
  wifi: "High-Speed WiFi",
  "gigabit-wifi": "Gigabit Fiber WiFi",
  "quiet-workspace": "Quiet Coworking Area",
  "bottled-water-coffee": "Free Bottled Water & Coffee",
  "ergonomic-chairs": "Ergonomic Herman Miller Chairs",
  "height-adjustable-desks": "Herman Miller Height-Adjustable Desks",
  parking: "Free Parking",
  coffee: "Unlimited Coffee & Water",
  cafe: "On-Site Muze Cafe",
  "phone-booths": "Private Phone Booths",
  printing: "Printing & Scanning",
  biometric: "Biometric 24/7 Access",
  furnished: "Fully Furnished",
  utilities: "All Utilities Included",
  address: "Professional Business Address",
  cleaning: "Daily Cleaning",
  events: "Community Events",
  "av-equipment": "AV Equipment",
  "video-conferencing": "Video Conferencing",
  whiteboards: "Whiteboards",
  "flexible-setup": "Flexible Room Setup",
  projector: "Projector & Screen",
  "sound-system": "Sound System",
  "flexible-seating": "Flexible Seating Layouts",
  catering: "Catering Available",
  climate: "Climate Controlled",
  coordinator: "Event Coordinator",
  hipaa: "HIPAA-Aware Private Offices",
};

/** Inclusions that hold at any Muze Office location. Brand-specific or
 *  building-specific ones (furniture brands, 24/7 biometric entry, free
 *  parking, the cafe) only show where the standard catalog applies. */
const LOCATION_NEUTRAL_AMENITIES = new Set([
  "business-address",
  "mail-handling",
  "meeting-rooms",
  "wifi",
  "phone-booths",
  "av-equipment",
  "video-conferencing",
  "whiteboards",
  "flexible-setup",
  "furnished",
  "address",
]);

/* ── Page ──────────────────────────────────────────────────── */

export default async function CityServicePage({ params }: PageProps) {
  const { cityService } = await params;

  const ctx = parseCityServiceSlug(cityService);
  if (!ctx) notFound();

  const result = getServiceForCity(ctx.locationId, ctx.serviceId);
  if (!result) notFound();

  const { location, service } = result;
  const pageData = getCityServiceData(cityService);
  if (!pageData) notFound();

  // Generic service FAQs, blurbs, and amenity lists describe the standard
  // (Las Vegas) catalog. A location with its own catalog only shows FAQs
  // written for it and generic, location-neutral inclusions.
  const standardCatalog = result.location.usesStandardCatalog;
  const faqs = standardCatalog
    ? getFAQsForService(ctx.serviceId, ctx.locationId)
    : getFAQsForService(`${ctx.locationId}-${ctx.serviceId}`);
  const isComingSoon = location.status === "coming-soon";
  if (isComingSoon) {
    // Temporary (307), not permanent: these URLs become real, indexable
    // pages the day the location opens. A 308 would be cached by browsers
    // and tell Google the hub is the permanent home of these URLs.
    redirect(`/locations/${location.slug}#waitlist`);
  }
  // Booking links and prices are per location. A location without its own
  // booking portal or confirmed price sheet falls back to the contact form —
  // never to another city's portal or prices.
  const signupUrl = location.booking?.signupUrl;
  const tourUrl = location.booking?.tourUrl;
  const hasPhone = location.phone !== "TBD";
  const hasOnlineBooking =
    location.slug === "las-vegas" &&
    (service.id === "meeting-rooms" || service.id === "day-pass");
  const isDayPass = service.id === "day-pass";
  // Virtual-office shoppers want the address, not a tour of an empty desk.
  // Route them to /contact so the lead arrives via the contact form.
  const isVirtualOffice = service.id === "virtual-office";
  const isEventSpace = service.id === "event-space";
  // Contact links carry ?interest=… so the form arrives preselected and the
  // lead email is segmented by service.
  const CONTACT_INTEREST_BY_SERVICE: Record<string, string> = {
    "virtual-office": "virtual-office",
    "private-office": "private-office",
    "meeting-rooms": "meeting-rooms",
    "conference-rooms": "meeting-rooms",
    "event-space": "event-space",
  };
  const contactHref = `/contact?interest=${CONTACT_INTEREST_BY_SERVICE[service.id] ?? "coworking"}`;
  // Coming-soon services consolidate into the substantive Houston launch hub
  // rather than fragmenting demand across noindexed service pages.
  const primaryCtaHref = hasOnlineBooking
    ? "#book-online"
    : isVirtualOffice || isEventSpace
      ? contactHref
      : (tourUrl ?? contactHref);
  const primaryCtaLabel = hasOnlineBooking
    ? "Book Online"
    : isVirtualOffice
      ? `Get My ${location.name} Address`
      : isEventSpace
        ? "Check Date & Availability"
        : "Book a Tour";
  const pageSections = [
    { href: "#pricing", label: "Pricing", show: true },
    { href: "#book-online", label: "Book online", show: hasOnlineBooking },
    { href: "#amenities", label: "What’s included", show: true },
    {
      href: pageData.longFormBody?.bestFor?.length
        ? "#best-for"
        : "#use-cases",
      label: "Best for",
      show: true,
    },
    {
      href: "#details",
      label: "Details",
      show: Boolean(pageData.longFormBody),
    },
    { href: "#location", label: "Location", show: true },
    { href: "#faq", label: "FAQ", show: faqs.length > 0 },
  ].filter((item) => item.show);

  return (
    <>
      <LocalBusinessSchema locationId={ctx.locationId} />
      <ServiceSchema serviceId={ctx.serviceId} cityId={ctx.locationId} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: location.name, href: `/locations/${location.slug}` },
          { label: service.name, href: `/${cityService}` },
        ]}
      />
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0">
          <Image
            src={pageData.heroImage}
            alt={`${pageData.h1} at Muze Office ${location.name} — ${location.address.street !== "TBD" ? `${location.address.street}, ${location.address.city}, ${location.address.state}` : location.address.city}`}
            fill
            className="object-cover opacity-40"
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 sm:px-6 py-20 sm:py-32 text-center md:py-40">
          <h1 className="text-balance font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {pageData.h1}
          </h1>
          <p className="max-w-[640px] text-pretty text-lg text-gray-300">
            {pageData.heroSubtitle}
          </p>
          {isDayPass && location.hours.is24Hours ? (
            <div className="grid w-full max-w-[680px] gap-2 rounded-2xl bg-black/45 p-2 text-left shadow-[0_12px_36px_rgba(0,0,0,0.28)] ring-1 ring-white/20 backdrop-blur-sm sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <Clock3
                  className="h-5 w-5 shrink-0 text-[#EAA820]"
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#EAA820]">
                    {location.name} access
                  </span>
                  <span className="block font-semibold text-white">
                    Open 24 hours, 7 days a week
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <Zap
                  className="h-5 w-5 shrink-0 text-[#EAA820]"
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#EAA820]">
                    Need a desk today?
                  </span>
                  <span className="block font-semibold text-white">
                    Activate today and work until midnight
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={primaryCtaHref}
              data-cta="hero_primary"
              data-cta-location={`city_service_${cityService}_hero`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]"
              )}
            >
              {primaryCtaLabel}
            </Link>
            {isVirtualOffice && signupUrl && (
              <a
                href={signupUrl}
                data-cta="signup_online"
                data-cta-location={`city_service_${cityService}_hero`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-lg bg-white text-[#1A1A1A] hover:bg-gray-200"
                )}
              >
                Sign Up Online
              </a>
            )}
            {hasPhone && (
              <a
                href={`tel:${location.phoneRaw}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-lg border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <Phone className="h-4 w-4" />
                {location.phone}
              </a>
            )}
          </div>
          {location.rating && (
            <div className="flex justify-center">
              <GoogleReviewsBadge
                rating={location.rating}
                reviewCount={location.reviewCount}
                href={location.externalProfiles?.gbp}
              />
            </div>
          )}
        </div>
      </section>

      {/* Compact wayfinding keeps the buying information scannable without
          hiding or duplicating any of the page's substantive content. */}
      <nav
        aria-label={`${service.name} page sections`}
        className="border-b border-[#E6E4DF] bg-white"
      >
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-wider text-[#74726D]">
            On this page
          </span>
          {pageSections.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[#E6E4DF] bg-[#FAFAF7] px-3 py-1.5 text-sm font-medium text-[#1A1A1A] transition-colors hover:border-[#EAA820] hover:text-[#8A6000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA820] focus-visible:ring-offset-2"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Pricing ───────────────────────────────────────── */}
      <Section variant="white" id="pricing">
        <FadeIn>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
              {service.name} {standardCatalog ? "Pricing" : "Plans"} in{" "}
              {location.name}
            </h2>
            <p className="max-w-[560px] text-lg text-[#74726D]">
              {standardCatalog ? service.shortDescription : pageData.heroSubtitle}
            </p>
          </div>
        </FadeIn>
        {standardCatalog ? (
          <StaggerContainer
            className={cn(
              "mt-12 grid gap-6 md:grid-cols-2",
              service.tiers.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            )}
          >
            {service.tiers.map((tier) => {
              const tierSignupUrl =
                tier.price !== null ? signupUrl : undefined;
              return (
                <StaggerItem key={tier.name}>
                  <PricingCard
                    name={tier.name}
                    price={tier.price}
                    priceUnit={tier.priceUnit}
                    features={tier.features}
                    highlighted={tier.highlighted}
                    ctaLabel={
                      isEventSpace
                        ? "Check Date & Availability"
                        : hasOnlineBooking
                          ? "Book Online"
                          : tierSignupUrl
                            ? "Sign Up Online"
                            : "Contact Us"
                    }
                    ctaHref={
                      isEventSpace
                        ? contactHref
                        : hasOnlineBooking
                          ? "#book-online"
                          : (tierSignupUrl ?? contactHref)
                    }
                    trackingName={
                      isEventSpace
                        ? "event_space_inquiry"
                        : hasOnlineBooking
                          ? "book_online"
                          : tierSignupUrl
                            ? "signup_online"
                            : "contact_us"
                    }
                    trackingLocation={`city_service_${cityService}_pricing`}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          // Prices not yet confirmed for this location: never show another
          // city's price sheet. Route the buyer to a quote instead.
          <FadeIn>
            <div className="mx-auto mt-10 flex max-w-[640px] flex-col items-center gap-5 rounded-2xl border border-[#E6E4DF] bg-[#FAFAF7] p-8 text-center">
              <p className="text-base leading-relaxed text-[#74726D]">
                {location.name} rates for {service.name.toLowerCase()} are
                quoted directly by the Muze Office {location.name} team. Tell
                us how you plan to use the space and we&apos;ll send current
                pricing and availability for {location.address.street}.
              </p>
              <Link
                href={contactHref}
                data-cta="contact_us"
                data-cta-location={`city_service_${cityService}_pricing`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]"
                )}
              >
                Get {location.name} Pricing
              </Link>
            </div>
          </FadeIn>
        )}
      </Section>

      {/* ── First-month cost comparison (transparency wedge) ── */}
      {standardCatalog && pageData.longFormBody?.costComparison && (
        <Section variant="gray" id="cost-comparison">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
                {pageData.longFormBody.costComparison.heading}
              </h2>
              <p className="max-w-[640px] text-lg text-[#74726D]">
                {pageData.longFormBody.costComparison.intro}
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="mx-auto mt-10 max-w-[860px]">
              <div className="overflow-x-auto rounded-xl border border-[#E6E4DF] bg-white">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr>
                      {[
                        "Provider",
                        "Monthly",
                        "One-time setup",
                        "First month all-in",
                      ].map((header) => (
                        <th
                          key={header}
                          className="border-b border-[#E6E4DF] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#74726D]"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.longFormBody.costComparison.rows.map((row) => (
                      <tr
                        key={row.provider}
                        className={row.highlight ? "bg-[#F2F1ED]" : undefined}
                      >
                        <td className="border-b border-[#E6E4DF] px-4 py-3 text-base font-medium text-[#1A1A1A]">
                          {row.provider}
                          {row.note && (
                            <span className="block text-sm font-normal text-[#74726D]">
                              {row.note}
                            </span>
                          )}
                        </td>
                        <td className="border-b border-[#E6E4DF] px-4 py-3 text-base text-[#1A1A1A]">
                          {row.monthly}
                        </td>
                        <td className="border-b border-[#E6E4DF] px-4 py-3 text-base text-[#1A1A1A]">
                          {row.setup}
                        </td>
                        <td
                          className={cn(
                            "border-b border-[#E6E4DF] px-4 py-3 text-base text-[#1A1A1A]",
                            row.highlight && "font-semibold"
                          )}
                        >
                          {row.firstMonth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-[#74726D]">
                {pageData.longFormBody.costComparison.disclaimer}
              </p>
            </div>
          </FadeIn>
        </Section>
      )}

      {hasOnlineBooking && (
        <Section variant="gray" id="book-online">
          <div className="mx-auto max-w-[1100px]">
            <FadeIn>
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
                  {isDayPass
                    ? "Get Your Day Pass Online"
                    : "Book Your Meeting Room Online"}
                </h2>
                <p className="max-w-[640px] text-lg text-[#74726D]">
                  {isDayPass
                    ? "Buy and activate your $25 pass online in minutes, even same-day. Work in our quiet coworking area until midnight with gigabit fiber WiFi, bottled water, coffee, ergonomic Herman Miller furniture, and free parking."
                    : "Choose your room, time, and duration below. The live Optix calendar shows current availability for Muze Office meeting rooms in Las Vegas."}
                </p>
              </div>
            </FadeIn>
            <div className="mt-10">
              <OptixBookingWidget
                venue="muzeoffice"
                widgetType={isDayPass ? "member" : "booking"}
                helpText={
                  isDayPass
                    ? "Questions before your first visit, or booking for a group? Call"
                    : undefined
                }
              />
            </div>
          </div>
        </Section>
      )}

      {/* ── Amenities / Features ──────────────────────────── */}
      <Section variant="gray" id="amenities">
        <FadeIn>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
              {service.name} Amenities in {location.name}
            </h2>
            <p className="max-w-[560px] text-lg text-[#74726D]">
              {standardCatalog
                ? "Everything you need is included. No hidden fees."
                : `Confirm current inclusions with the Muze Office ${location.name} team.`}
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.includedAmenities
            .filter(
              (amenityId) =>
                standardCatalog || LOCATION_NEUTRAL_AMENITIES.has(amenityId)
            )
            .map((amenityId) => (
            <StaggerItem key={amenityId}>
              <div className="flex items-start gap-3 rounded-xl border border-[#E6E4DF] bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#EAA820]" />
                <span className="text-base font-medium text-[#1A1A1A]">
                  {amenityLabels[amenityId] ?? amenityId}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ── Who it's best for ─────────────────────────────── */}
      {pageData.longFormBody?.bestFor &&
      pageData.longFormBody.bestFor.length > 0 ? (
        // Rich persona cards — used on active LV pages with longFormBody
        <Section variant="white" id="best-for">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
                Who {service.name.toLowerCase()} at Muze Office {location.name} is best for
              </h2>
              <p className="max-w-[620px] text-lg text-[#74726D]">
                Specific situations where Muze Office is the right fit — not
                generic personas.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2">
            {pageData.longFormBody.bestFor.map((item) => (
              <StaggerItem key={item.persona}>
                <div className="flex h-full flex-col gap-4 rounded-xl border border-[#E6E4DF] bg-[#F2F1ED] p-6">
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#EAA820]" />
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold leading-snug text-[#1A1A1A]">
                      {item.persona}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#74726D]">
                    {item.scenario}
                  </p>
                  <ul className="mt-auto flex flex-col gap-2 border-t border-[#E6E4DF] pt-4">
                    {item.fit.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#1A1A1A]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      ) : (
        // Simple bullet grid — Houston coming-soon fallback
        <Section variant="white" id="use-cases">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
                Who Uses {service.name} in {location.name}?
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pageData.useCases.map((useCase) => (
              <StaggerItem key={useCase}>
                <div className="flex items-start gap-3 rounded-xl border border-[#E6E4DF] bg-[#F2F1ED] p-5">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#EAA820]" />
                  <span className="text-base text-[#1A1A1A]">{useCase}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}

      {/* ── Long-form commercial content (SEO) ────────────── */}
      {pageData.longFormBody && (
        <Section variant="gray" id="details">
          <div className="mx-auto max-w-[760px]">
            <FadeIn>
              <div className="flex flex-col gap-8 text-[#1A1A1A]">
                <div className="flex flex-col gap-4">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold md:text-3xl">
                    {pageData.longFormBody.whyChoose.heading}
                  </h2>
                  {pageData.longFormBody.whyChoose.paragraphs.map((p, i) => (
                    <p
                      key={`why-${i}`}
                      className="text-base leading-relaxed text-[#1A1A1A] md:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold md:text-3xl">
                    {pageData.longFormBody.comparison.heading}
                  </h2>
                  {pageData.longFormBody.comparison.paragraphs.map((p, i) => (
                    <p
                      key={`cmp-${i}`}
                      className="text-base leading-relaxed text-[#1A1A1A] md:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold md:text-3xl">
                    {pageData.longFormBody.howToGetStarted.heading}
                  </h2>
                  {pageData.longFormBody.howToGetStarted.paragraphs.map(
                    (p, i) => (
                      <p
                        key={`how-${i}`}
                        className="text-base leading-relaxed text-[#1A1A1A] md:text-lg"
                      >
                        {p}
                      </p>
                    )
                  )}
                </div>
                {pageData.longFormBody.relatedServices.length > 0 && (
                  <div className="mt-4 rounded-xl border border-[#E6E4DF] bg-white p-6">
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold uppercase tracking-wider text-[#74726D]">
                      Related services at Muze Office {location.name}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                      {pageData.longFormBody.relatedServices.map((rel) => (
                        <li key={rel.slug}>
                          <Link
                            href={`/${rel.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E4DF] bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:border-[#EAA820] hover:text-[#EAA820]"
                          >
                            {rel.label}
                            <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {(isEventSpace || signupUrl) && (
                    <Link
                      href={isEventSpace ? contactHref : signupUrl!}
                      data-cta={isEventSpace ? "event_space_inquiry" : "signup_online"}
                      data-cta-location={`city_service_${cityService}_details`}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]"
                      )}
                    >
                      {isEventSpace ? "Check Date & Availability" : "Sign Up Online"}
                    </Link>
                  )}
                  <Link
                    href={contactHref}
                    data-cta="contact_us"
                    data-cta-location={`city_service_${cityService}_details`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "rounded-lg"
                    )}
                  >
                    Ask a Question First
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>
      )}

      {/* ── Location Callout ──────────────────────────────── */}
      <Section variant="gray" id="location">
        <FadeIn>
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-6 text-center">
            <MapPin className="h-10 w-10 text-[#EAA820]" />
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
              {service.name} Location in {location.name}
            </h2>
            <p className="text-lg text-[#74726D]">
              {pageData.locationCallout}
            </p>
            <address className="not-italic text-sm text-gray-700">
              <span className="font-semibold">{location.nickname}</span>
              <br />
              {location.address.street}, {location.address.city},{" "}
              {location.address.state} {location.address.zip}
              {hasPhone && (
                <>
                  <br />
                  {location.phone}
                </>
              )}
            </address>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              {location.localCues.map((cue) => (
                <div key={cue} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#EAA820]" />
                  {cue}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <FAQSection
          faqs={faqs}
          heading={`${service.name} in ${location.name} — FAQ`}
          description={`Common questions about ${service.name.toLowerCase()} at Muze Office ${location.name}.`}
        />
      )}

      {/* ── Related Reading ───────────────────────────────── */}
      <RelatedReading
        slugs={getRelatedBlogSlugsForService(service.id, location.id)}
        heading={`More on ${service.name.toLowerCase()}`}
        subtitle={`Long-form reading from the Muze Office team on ${service.name.toLowerCase()} in ${location.name}.`}
      />

      {/* ── CTA ───────────────────────────────────────────── */}
      <CTASection
        heading={
          isDayPass
              ? `Ready to Try a Day Pass in ${location.name}?`
            : hasOnlineBooking
              ? `Ready to Book ${service.name} in ${location.name}?`
            : isVirtualOffice
              ? `Ready for a Real ${location.name} Business Address?`
            : isEventSpace
              ? `Ready to Host Your Event in ${location.name}?`
            : `Ready to Get Started with ${service.name}?`
        }
        subtitle={
          isDayPass && hasOnlineBooking
              ? `Buy and activate online today, then work until midnight — gigabit fiber WiFi, bottled water, coffee, Herman Miller furniture, and free parking included. Bring your laptop; monitors are not provided.`
            : hasOnlineBooking
              ? `Reserve your room online now, or call us if you need catering, AV help, or a custom setup for your meeting.`
            : isVirtualOffice
              ? `Pick a tier, complete USPS Form 1583, and use the address where the receiving agency, bank, or platform permits a commercial mail-receiving address. Registered-agent and Google Business Profile requirements are separate.`
            : isEventSpace
              ? `Tell us your preferred date, guest count, and room setup. We will confirm availability and the right space for your event.`
            : isDayPass
              ? `Tell us the day you need a desk and we will confirm day pass availability at ${location.address.street}.`
            : `Book a tour today or contact us to learn more about ${service.name.toLowerCase()} at Muze Office ${location.name}.`
        }
        primaryLabel={primaryCtaLabel}
        primaryHref={primaryCtaHref}
        showPhone={hasPhone}
        ctaLocation={`city_service_${cityService}_bottom`}
        phone={location.phone}
      />
    </>
  );
}
