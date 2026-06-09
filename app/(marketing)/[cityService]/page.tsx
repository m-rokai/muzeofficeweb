import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Clock,
  Car,
  Wifi,
  Coffee,
  Phone,
  Users,
  CheckCircle2,
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
import { services } from "@/lib/data/services";
import { getCityServiceData } from "@/lib/data/city-services";
import { getFAQsForService } from "@/lib/data/faqs";
import { getRelatedBlogSlugsForService } from "@/lib/data/blog-links";
import { BRAND } from "@/lib/utils/constants";
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
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: data.heroImage, width: 1200, height: 630 }],
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
  "llc-ready": "LLC & Business Registration Ready",
  wifi: "High-Speed WiFi",
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

  const faqs = getFAQsForService(ctx.serviceId, ctx.locationId);
  const isComingSoon = location.status === "coming-soon";
  const hasOnlineBooking =
    !isComingSoon &&
    location.slug === "las-vegas" &&
    service.id === "meeting-rooms";
  // Virtual-office shoppers want the address, not a tour of an empty desk.
  // Route them to /contact so the lead lands in access@muzeoffice.com.
  const isVirtualOffice = service.id === "virtual-office";
  // Coming-soon cities have no tours to book — waitlist leads go to /contact.
  const primaryCtaHref = isComingSoon
    ? "/contact"
    : hasOnlineBooking
      ? "#book-online"
      : isVirtualOffice
        ? "/contact"
        : BRAND.booking.tourUrl;
  const primaryCtaLabel = isComingSoon
    ? "Join Waitlist"
    : hasOnlineBooking
      ? "Book Online"
      : isVirtualOffice
        ? `Get My ${location.name} Address`
        : "Book a Tour";

  return (
    <>
      {!isComingSoon && <LocalBusinessSchema locationId={ctx.locationId} />}
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
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 sm:px-6 py-20 sm:py-32 text-center md:py-40">
          {isComingSoon && (
            <FadeIn delay={0.1}>
              <span className="inline-block rounded-full bg-[#EAA820]/20 px-4 py-1 text-sm font-semibold text-[#EAA820]">
                Coming Soon to {location.name}
              </span>
            </FadeIn>
          )}
          <FadeIn delay={0.2}>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {pageData.h1}
            </h1>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="max-w-[640px] text-lg text-gray-300">
              {pageData.heroSubtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={primaryCtaHref}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-lg bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28]"
                )}
              >
                {primaryCtaLabel}
              </Link>
              {!isComingSoon && location.phone !== "TBD" && (
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
          </FadeIn>
          {!isComingSoon && location.rating && (
            <FadeIn delay={0.6}>
              <div className="flex justify-center">
                <GoogleReviewsBadge
                  rating={location.rating}
                  reviewCount={location.reviewCount}
                  href={location.externalProfiles?.gbp}
                />
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────── */}
      <Section variant="white" id="pricing">
        <FadeIn>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
              {service.name} Pricing in {location.name}
            </h2>
            <p className="max-w-[560px] text-lg text-[#74726D]">
              {service.shortDescription}
            </p>
          </div>
        </FadeIn>
        <StaggerContainer
          className={cn(
            "mt-12 grid gap-6 md:grid-cols-2",
            service.tiers.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          )}
        >
          {service.tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <PricingCard
                name={tier.name}
                price={tier.price}
                priceUnit={tier.priceUnit}
                features={tier.features}
                highlighted={tier.highlighted}
                ctaLabel={
                  tier.price !== null
                    ? isComingSoon
                      ? "Join Waitlist"
                      : hasOnlineBooking
                        ? "Book Online"
                      : "Get Started"
                    : "Contact Us"
                }
                ctaHref={hasOnlineBooking ? "#book-online" : "/contact"}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {hasOnlineBooking && (
        <Section variant="gray" id="book-online">
          <div className="mx-auto max-w-[1100px]">
            <FadeIn>
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
                  Book Your Meeting Room Online
                </h2>
                <p className="max-w-[640px] text-lg text-[#74726D]">
                  Choose your room, time, and duration below. The live Optix
                  calendar shows current availability for Muze Office meeting
                  rooms in Las Vegas.
                </p>
              </div>
            </FadeIn>
            <div className="mt-10">
              <OptixBookingWidget venue="muzeoffice" />
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
              Everything you need is included. No hidden fees.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.includedAmenities.map((amenityId) => (
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
            {!isComingSoon && (
              <address className="not-italic text-sm text-gray-700">
                <span className="font-semibold">{location.nickname}</span>
                <br />
                {location.address.street}, {location.address.city},{" "}
                {location.address.state} {location.address.zip}
                <br />
                {location.phone}
              </address>
            )}
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
        <Section variant="white" id="faq">
          <FadeIn>
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
                {service.name} in {location.name} — FAQ
              </h2>
              <p className="max-w-[560px] text-lg text-[#74726D]">
                Common questions about {service.name.toLowerCase()} at Muze Office{" "}
                {location.name}.
              </p>
            </div>
          </FadeIn>
          <div className="mx-auto mt-12 max-w-[800px]">
            <FAQSection faqs={faqs} />
          </div>
        </Section>
      )}

      {/* ── Related Reading ───────────────────────────────── */}
      <RelatedReading
        slugs={getRelatedBlogSlugsForService(service.id)}
        heading={`More on ${service.name.toLowerCase()}`}
        subtitle={`Long-form reading from the Muze Office team on ${service.name.toLowerCase()} in ${location.name}.`}
      />

      {/* ── CTA ───────────────────────────────────────────── */}
      <CTASection
        heading={
          isComingSoon
            ? `Be First to Know About ${service.name} in ${location.name}`
            : hasOnlineBooking
              ? `Ready to Book ${service.name} in ${location.name}?`
            : isVirtualOffice
              ? `Ready for a Real ${location.name} Business Address?`
            : `Ready to Get Started with ${service.name}?`
        }
        subtitle={
          isComingSoon
            ? `Muze Office ${location.name} is coming soon. Join the waitlist for early access and special pricing.`
            : hasOnlineBooking
              ? `Reserve your room online now, or call us if you need catering, AV help, or a custom setup for your meeting.`
            : isVirtualOffice
              ? `Pick a tier, complete USPS Form 1583, and start using ${location.address.street}, ${location.address.city} ${location.address.state} on your LLC, GBP, and contracts. Most members are live within a week.`
            : `Book a tour today or call us to learn more about ${service.name.toLowerCase()} at Muze Office ${location.name}.`
        }
        primaryLabel={primaryCtaLabel}
        primaryHref={primaryCtaHref}
        showPhone={!isComingSoon && location.phone !== "TBD"}
        ctaLocation={`city_service_${cityService}_bottom`}
        phone={location.phone}
      />
    </>
  );
}
