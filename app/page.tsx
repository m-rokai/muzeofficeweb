import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Users,
  Lock,
  Presentation,
  CalendarDays,
  Wifi,
  Car,
  Coffee,
  UtensilsCrossed,
  Phone as PhoneIcon,
  Printer,
  Fingerprint,
  MonitorSmartphone,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FAQSection } from "@/components/marketing/faq-section";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/marketing/animate";
import { GoogleReviewsBadge } from "@/components/marketing/google-reviews-badge";
import { LogoCarousel } from "@/components/marketing/logo-carousel";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { RelatedReading } from "@/components/marketing/related-reading";
import { services } from "@/lib/data/services";
import { locations } from "@/lib/data/locations";
import { BRAND } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Muze Office — Flexible Workspace in Las Vegas & Houston",
  description:
    "Flexible workspace in Las Vegas (6860 Bermuda Rd) and Houston (1800 Augusta Dr). Coworking, virtual offices, private offices, meeting rooms. Day pass $25, virtual office $39/mo. Month-to-month, free parking.",
  alternates: { canonical: "/" },
};

const serviceIcons: Record<string, React.ReactNode> = {
  "virtual-office": <Mail className="h-7 w-7" />,
  coworking: <Users className="h-7 w-7" />,
  "private-office": <Lock className="h-7 w-7" />,
  "meeting-rooms": <Presentation className="h-7 w-7" />,
  "event-space": <CalendarDays className="h-7 w-7" />,
};

const amenities = [
  { icon: <Wifi className="h-7 w-7" />, label: "High-Speed WiFi", desc: "Blazing fast for video calls" },
  { icon: <Car className="h-7 w-7" />, label: "Free Parking", desc: "No meters, no valet" },
  { icon: <Coffee className="h-7 w-7" />, label: "Unlimited Coffee", desc: "Drip, espresso, and tea" },
  { icon: <UtensilsCrossed className="h-7 w-7" />, label: "On-Site Cafe", desc: "Hot meals, not just snacks" },
  { icon: <PhoneIcon className="h-7 w-7" />, label: "Phone Booths", desc: "Private calls, no noise" },
  { icon: <Printer className="h-7 w-7" />, label: "Printing & Scanning", desc: "Color and B&W" },
  { icon: <Fingerprint className="h-7 w-7" />, label: "Biometric Access", desc: "24/7 for members" },
  { icon: <MonitorSmartphone className="h-7 w-7" />, label: "Conference Rooms", desc: "AV and video ready" },
];

const coreServices = services.filter((s) =>
  ["virtual-office", "coworking", "private-office", "meeting-rooms", "conference-rooms", "event-space"].includes(s.id)
);

const homepageFAQs = [
  { question: "What is Muze Office?", answer: "Muze Office is a flexible workspace provider in Las Vegas and Houston offering coworking, virtual offices, private offices, meeting rooms, and event space. All memberships are month-to-month with no long-term leases." },
  { question: "Do I need a membership to use the space?", answer: "No. Day passes are available for anyone — no membership or commitment required. Walk in or book ahead. We also offer monthly memberships for hot desks, dedicated desks, and private offices." },
  { question: "Where is Muze Office located?", answer: "Two active locations: Las Vegas at 6860 Bermuda Rd, Suite 200 (10 minutes from Harry Reid International Airport via I-215 W), and Houston at 1800 Augusta Dr, 77057 (inside the 610 Loop in the Galleria / Tanglewood area). Free parking included at both." },
  { question: "What are your hours?", answer: "Monday through Friday, 10am to 7pm. Members with dedicated desks and private offices have 24/7 access via biometric entry." },
  { question: "Is there parking?", answer: "Yes — free parking for all members, day pass holders, meeting room guests, and event attendees. No meters, no valet fees, no parking garage charges." },
  { question: "Can I book a meeting room without a membership?", answer: "Yes. Meeting rooms are available by the hour to anyone — no membership required. All rooms include AV equipment, video conferencing, whiteboards, and WiFi. Huddle rooms start at $25/hr." },
  { question: "Do you offer a virtual office in Las Vegas?", answer: "Yes. A virtual office in Las Vegas at Muze Office starts at $39/month (Mail Holding) for a professional business address at 6860 Bermuda Rd, Suite 200 with USPS letter mail pickup. Sandstone ($69/mo) adds package receiving from UPS, FedEx, and Amazon. Higher tiers add mail forwarding, coworking hours, and meeting room access. You can use any plan for LLC registration, Google Business Profile, and contracts. Full details and pricing at /las-vegas-virtual-office." },
  { question: "Do you offer a virtual office in Houston?", answer: "Yes. A virtual office in Houston at Muze Office starts at $39/month (Mail Holding) for a professional Galleria business address at 1800 Augusta Dr with USPS letter mail pickup. Sandstone ($69/mo) adds UPS, FedEx, and Amazon package receiving. Higher tiers add mail forwarding, coworking hours, and meeting room access. The address satisfies Texas LLC filings, Google Business Profile, and most banks. Full details and pricing at /houston-virtual-office." },
  { question: "Are there long-term contracts?", answer: "No. All Muze Office memberships are month-to-month. Cancel anytime with 30 days' notice. No long-term lease required." },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema locationId="las-vegas" />
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-end overflow-hidden bg-[#1A1A1A] px-6 pb-20 pt-32">
        <Image
          src="/images/hero/coworking-space.jpg"
          alt="Muze Office coworking lounge at 6860 Bermuda Rd, Suite 200 in Las Vegas, with open desks, natural light, and a view toward the on-site cafe"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <FadeIn delay={0.1}>
            <Badge className="mb-6 bg-[#EAA820]/20 text-[#EAA820] border border-[#EAA820]/30 hover:bg-[#EAA820]/30 text-sm px-3 py-1">
              <MapPin className="mr-1.5 h-3.5 w-3.5" /> 10 min from Harry Reid Airport
            </Badge>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="max-w-[780px] text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
              Flexible Workspace in Las Vegas — Coworking, Private Offices &amp; Meeting Rooms
            </h1>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="mt-6 max-w-[580px] text-lg leading-relaxed text-gray-300 md:text-xl">
              Muze Office is month-to-month coworking, virtual offices, private offices, meeting rooms, and event space in Las Vegas (6860 Bermuda Rd, Suite 200) and Houston (1800 Augusta Dr, Galleria / Tanglewood). No long-term leases. Free parking. Two active locations.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={BRAND.booking.tourUrl} className={cn(buttonVariants({ size: "lg" }), "rounded-xl bg-[#EAA820] px-8 text-white hover:bg-[#C17A28] h-14 text-base font-semibold")}>
                Book a Free Tour
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link href="/locations" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-xl border-white/50 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white h-14 text-base")}>
                Find Your Desk
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.65}>
            <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-6 text-base text-gray-400">
              <span>Month-to-month, no leases</span>
              <Separator orientation="vertical" className="h-4 bg-gray-600" />
              <span>Free parking</span>
              <Separator orientation="vertical" className="h-4 bg-gray-600" />
              <span className="hidden sm:inline">Mon&ndash;Fri, 10am&ndash;7pm</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="w-full bg-[#FAFAF7] py-6 px-6">
        <div className="mx-auto max-w-[1200px] flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <GoogleReviewsBadge />
          <div className="flex items-center gap-4 text-base text-[#74726D]">
            <span>Mon–Fri, 10am–7pm</span>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+17023707515" className="font-semibold text-[#1A1A1A] hover:text-[#EAA820] transition-colors">(702) 370-7515</a>
          </div>
        </div>
      </section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Stats Bar — every value here is verifiable from services.ts /
          locations.ts. Don't add unverified social-proof counts. */}
      <section className="w-full border-b border-[#E6E4DF] bg-[#FAFAF7]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
          {[
            { value: "$25", label: "Day Pass", icon: <Coffee className="h-6 w-6" /> },
            { value: "$39", label: "Virtual Office", icon: <Mail className="h-6 w-6" /> },
            { value: "10 min", label: "From LAS Airport", icon: <MapPin className="h-6 w-6" /> },
            { value: "24/7", label: "Member Access", icon: <Clock className="h-6 w-6" /> },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} direction="up">
              <div className="flex flex-col items-center gap-1.5 border-r border-[#E6E4DF] py-10 last:border-r-0">
                <div className="text-[#EAA820]">{stat.icon}</div>
                <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
                <span className="text-sm text-[#74726D] uppercase tracking-wider">{stat.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Intro */}
      <Section>
        <FadeIn>
          <div className="mx-auto max-w-[840px] text-center">
            <h2 className="text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
              Work solo, meet others, or build your team — all in one flexible space designed for comfort, community, and deep focus.
            </h2>
            <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2">
              {["Hot Desks", "Private Offices", "Dedicated Desks", "Meeting Rooms", "Event Space", "Virtual Office", "Phone Booths", "On-Site Cafe"].map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full px-4 py-1.5 text-sm font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Services — Las Vegas */}
      <Section variant="gray">
        <FadeIn>
          <div className="mb-14">
            <Badge className="mb-4 bg-[#EAA820]/10 text-[#EAA820] border border-[#EAA820]/20 text-sm px-3 py-1">
              <MapPin className="mr-1.5 h-3.5 w-3.5" /> Las Vegas
            </Badge>
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
              Workspace in Las Vegas
            </h2>
            <p className="mt-4 max-w-[600px] text-lg text-[#74726D]">
              6860 Bermuda Rd, Suite 200 — 10 minutes from the airport. Free parking, fast WiFi, month-to-month. No long-term leases.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <StaggerItem key={`lv-${service.id}`}>
              <Link href={`/las-vegas-${service.id}`} className="group block h-full">
                <Card className="h-full border-[#E6E4DF] bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="flex flex-col gap-5 p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F2F1ED] text-[#EAA820] transition-colors group-hover:bg-[#EAA820] group-hover:text-white">
                      {serviceIcons[service.id]}
                    </div>
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <p className="text-base text-[#74726D] leading-relaxed">{service.shortDescription}</p>
                    {service.tiers[0]?.price && (
                      <p className="text-base font-semibold text-[#EAA820]">From ${service.tiers[0].price}/{service.tiers[0].priceUnit}</p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 text-base font-medium text-[#1A1A1A] group-hover:text-[#EAA820] transition-colors">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Services — Houston */}
      <Section variant="white">
        <FadeIn>
          <div className="mb-14">
            <Badge className="mb-4 bg-[#EAA820]/10 text-[#EAA820] border border-[#EAA820]/20 text-sm px-3 py-1">
              <MapPin className="mr-1.5 h-3.5 w-3.5" /> Houston
            </Badge>
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
              Workspace in Houston
            </h2>
            <p className="mt-4 max-w-[600px] text-lg text-[#74726D]">
              1800 Augusta Dr — inside the 610 Loop in the Galleria / Tanglewood area. Free parking, fast WiFi, month-to-month. No long-term leases.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <StaggerItem key={`hou-${service.id}`}>
              <Link href={`/houston-${service.id}`} className="group block h-full">
                <Card className="h-full border-[#E6E4DF] bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="flex flex-col gap-5 p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F2F1ED] text-[#EAA820] transition-colors group-hover:bg-[#EAA820] group-hover:text-white">
                      {serviceIcons[service.id]}
                    </div>
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <p className="text-base text-[#74726D] leading-relaxed">{service.shortDescription}</p>
                    {service.tiers[0]?.price && (
                      <p className="text-base font-semibold text-[#EAA820]">From ${service.tiers[0].price}/{service.tiers[0].priceUnit}</p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 text-base font-medium text-[#1A1A1A] group-hover:text-[#EAA820] transition-colors">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Locations */}
      <Section>
        <FadeIn>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                Coworking in Las Vegas &amp; Houston
              </h2>
              <p className="mt-4 max-w-[600px] text-lg text-[#74726D]">
                Two active locations: 6860 Bermuda Rd in Las Vegas (10 minutes from Harry Reid International Airport) and 1800 Augusta Dr in Houston (inside the 610 Loop in the Galleria / Tanglewood area). Free parking at both.
              </p>
            </div>
            <Link href="/locations" className={cn(buttonVariants({ variant: "outline" }), "w-fit rounded-xl h-12 px-6 text-base")}>
              View All Locations
            </Link>
          </div>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          {locations.map((loc, i) => (
            <ScaleIn key={loc.id} delay={i * 0.15}>
              <Card className="group overflow-hidden border-[#E6E4DF] transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={`/images/spaces/${loc.slug === "las-vegas" ? "las-vegas" : "houston"}.jpg`}
                    alt={
                      loc.slug === "las-vegas"
                        ? "Muze Office Las Vegas exterior at 6860 Bermuda Rd, Suite 200 near Harry Reid International Airport"
                        : "Muze Office Houston at 1800 Augusta Dr inside the 610 Loop in the Galleria / Tanglewood area"
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {loc.status === "coming-soon" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Badge className="bg-white/90 text-[#1A1A1A] text-base px-5 py-2">Coming Soon</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="flex flex-col p-7 min-h-[200px]">
                  <h3 className="text-2xl font-semibold">{loc.name}</h3>
                  <p className="mt-2 text-base text-[#74726D]">
                    {loc.address.street !== "TBD" ? `${loc.address.street}, ${loc.address.city}, ${loc.address.state} ${loc.address.zip}` : `${loc.address.city}, ${loc.address.state}`}
                  </p>
                  {loc.phone !== "TBD" ? (
                    <p className="mt-1 text-base text-[#74726D]">{loc.phone}</p>
                  ) : (
                    <p className="mt-1 text-base text-[#74726D]">Location details coming soon</p>
                  )}
                  <Link href={`/locations/${loc.slug}`} className={cn(buttonVariants(), "mt-auto rounded-xl bg-[#1A1A1A] hover:bg-[#333] h-12 px-6 text-base w-fit")}>
                    {loc.status === "coming-soon" ? "Learn More" : "Explore"} <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </ScaleIn>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section variant="gray">
        <FadeIn>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
              Coworking &amp; virtual office plans — no long-term leases
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-lg text-[#74726D]">
              <Link href="/las-vegas-day-pass" className="underline decoration-[#EAA820]/50 underline-offset-4 hover:text-[#1A1A1A]">Day Pass $25</Link>, <Link href="/las-vegas-hot-desk" className="underline decoration-[#EAA820]/50 underline-offset-4 hover:text-[#1A1A1A]">Hot Desk $350/mo</Link>, <Link href="/las-vegas-dedicated-desk" className="underline decoration-[#EAA820]/50 underline-offset-4 hover:text-[#1A1A1A]">Dedicated Desk $399/mo</Link>, a <Link href="/las-vegas-virtual-office" className="underline decoration-[#EAA820]/50 underline-offset-4 hover:text-[#1A1A1A]">virtual office in Las Vegas</Link> from $39/mo, and a <Link href="/houston-virtual-office" className="underline decoration-[#EAA820]/50 underline-offset-4 hover:text-[#1A1A1A]">virtual office in Houston</Link> from $39/mo. All memberships are month-to-month with free parking, WiFi, coffee, and meeting room access.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3 mt-4">
          {[
            { name: "Day Pass", price: "$25", unit: "/day", description: "Drop-in for a single day — no membership, no setup, no commitment. Walk in with a laptop and go.", features: ["Hot desk access", "High-speed WiFi", "Unlimited coffee & tea", "Free parking"], cta: "See Day Pass Details", href: "/las-vegas-day-pass", highlighted: false },
            { name: "Dedicated Desk", price: "$399", unit: "/month", description: "Your own reserved desk, personal storage, 24/7 biometric access, and a business address with mail.", features: ["24/7 access", "Reserved desk & storage", "Meeting room credits", "Business address & mail"], cta: "See Dedicated Desk Details", href: "/las-vegas-dedicated-desk", highlighted: true },
            { name: "Private Office", price: "Custom", unit: "", description: "Enclosed, lockable offices for 2-10 people. Fully furnished and customizable.", features: ["24/7 access", "Furnished & customizable", "All utilities included", "Conference room credits"], cta: "Book a Tour", href: BRAND.booking.tourUrl, highlighted: false },
          ].map((plan) => (
            <StaggerItem key={plan.name} className={plan.highlighted ? "pt-3" : ""}>
              <Card className={cn("h-full border-[#E6E4DF] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-visible", plan.highlighted && "ring-2 ring-[#EAA820] relative")}>
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-[#EAA820] text-white hover:bg-[#C17A28] px-5 text-sm shadow-sm">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="flex flex-col gap-5 p-7 pt-9">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-base text-[#74726D]">{plan.unit}</span>
                  </div>
                  <p className="text-base text-[#74726D]">{plan.description}</p>
                  <Separator className="my-1" />
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-base">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAA820]/10 text-[#EAA820] text-sm">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href} className={cn(buttonVariants(), "mt-auto rounded-xl h-13 text-base font-semibold", plan.highlighted ? "bg-[#EAA820] text-white hover:bg-[#C17A28]" : "bg-[#1A1A1A] hover:bg-[#333]")}>
                    {plan.cta}
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Amenities */}
      <Section>
        <FadeIn>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">Everything you need to work</h2>
            <p className="mt-4 text-lg text-[#74726D]">Premium amenities included with every membership and day pass.</p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
          {amenities.map((a) => (
            <StaggerItem key={a.label}>
              <div className="group flex flex-col items-center gap-3 rounded-2xl border border-transparent p-4 sm:p-6 text-center transition-all duration-300 hover:border-[#E6E4DF] hover:bg-[#F2F1ED] hover:shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2F1ED] text-[#EAA820] transition-colors group-hover:bg-[#EAA820] group-hover:text-white">
                  {a.icon}
                </div>
                <span className="text-base font-semibold">{a.label}</span>
                <span className="text-sm text-[#74726D]">{a.desc}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Why members choose Muze — every bullet here is verifiable from
          services.ts / locations.ts. Previously this section held four
          first-name-last-initial testimonials that read as fabricated; they
          were removed in favor of concrete, checkable facts. The Google
          reviews link below points members at the real listing. */}
      <Section variant="gray">
        <FadeIn>
          <div className="mb-14">
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">Why members choose Muze Office</h2>
            <p className="mt-4 max-w-[640px] text-lg text-[#74726D]">
              Concrete, checkable reasons — not slogans. Every claim below is
              something you can verify on a tour or on our pricing pages.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Users className="h-6 w-6" />,
              title: "No long-term leases",
              body: "Every plan is month-to-month with 30 days' notice to cancel. No setup fees, no personal guaranty, no multi-year contracts.",
            },
            {
              icon: <Car className="h-6 w-6" />,
              title: "Free on-site parking",
              body: "No meters, no valet, no garage fees for members, day pass holders, meeting room guests, or event attendees.",
            },
            {
              icon: <MapPin className="h-6 w-6" />,
              title: "10 minutes from LAS",
              body: "6860 Bermuda Rd, Suite 200 is off I-215, away from Strip traffic — practical for fly-in client meetings and same-day trips.",
            },
            {
              icon: <Clock className="h-6 w-6" />,
              title: "Transparent pricing",
              body: "Day passes from $25, virtual offices from $39/mo, meeting rooms from $25/hr. No hidden fees, no F&B minimums on meeting rooms.",
            },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full border-[#E6E4DF] bg-white transition-all duration-300 hover:shadow-md">
                <CardContent className="flex flex-col gap-4 p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F1ED] text-[#EAA820]">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#74726D]">{item.body}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn delay={0.3}>
          <div className="mx-auto mt-12 flex max-w-[560px] flex-col items-center gap-3 text-center">
            <p className="text-sm text-[#74726D]">
              Want to hear from real members?
            </p>
            <GoogleReviewsBadge />
          </div>
        </FadeIn>
      </Section>

      {/* Featured posts — surfaces specific blog URLs from the homepage so
          unindexed posts get a strong internal-link signal from the highest
          authority page on the site. */}
      <RelatedReading
        slugs={[
          "how-to-set-up-a-virtual-office-in-las-vegas",
          "how-to-set-up-a-virtual-office-in-houston",
          "virtual-office-vs-po-box-in-nevada",
          "6-advantages-of-a-virtual-office-in-las-vegas",
          "5-benefits-of-private-office-space-in-las-vegas",
          "meeting-space-near-las-vegas-airport",
        ]}
        heading="From the Muze Office blog"
        subtitle="Practical guides on virtual offices, coworking, and flexible workspace in Las Vegas and Houston."
        limit={6}
      />

      {/* FAQ */}
      <FAQSection
        heading="Frequently asked questions about Muze Office"
        description="Everything you need to know about coworking, virtual offices, meeting rooms, and memberships at Muze Office in Las Vegas."
        faqs={homepageFAQs}
      />

      {/* Final CTA */}
      <CTASection
        heading="Ready to find your workspace?"
        subtitle="Coworking, virtual offices, and private offices in Las Vegas. Month-to-month. No commitment. Book a tour today."
        primaryLabel="Book a Free Tour"
        primaryHref={BRAND.booking.tourUrl}
      />
    </>
  );
}
