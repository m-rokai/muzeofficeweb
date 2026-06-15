import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sofa,
  Mic,
  Presentation,
  CalendarRange,
  Wifi,
  Coffee,
  ShieldCheck,
  Car,
  MapPin,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CTASection } from "@/components/marketing/cta-section";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animate";
import { BRAND, OG_DEFAULTS } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Muze + Cube World — Coworking Furniture Showroom",
  description:
    "Muze Office Las Vegas is a working coworking space and live Cube World furniture showroom at 6860 Bermuda Rd. Work, host events, and shop the pieces around you.",
  alternates: { canonical: "/muze-cube-world" },
  openGraph: { ...OG_DEFAULTS, type: "website", url: "/muze-cube-world" },
};

const amenities = [
  { icon: <CalendarRange className="h-5 w-5" />, label: "Flexible event spaces" },
  { icon: <Wifi className="h-5 w-5" />, label: "High-speed Wi-Fi throughout" },
  { icon: <Coffee className="h-5 w-5" />, label: "Complimentary coffee, tea & snacks" },
  { icon: <ShieldCheck className="h-5 w-5" />, label: "Secure 24/7 member access" },
  { icon: <Presentation className="h-5 w-5" />, label: "Modern meeting & conference rooms" },
  { icon: <Car className="h-5 w-5" />, label: "Free on-site parking" },
];

const showroomZones = [
  {
    title: "Lounge zones",
    description:
      "Soft seating, low tables, and warm lighting — designed for thinking out loud or unwinding between meetings.",
  },
  {
    title: "Collaborative desks",
    description:
      "Open coworking benches and dedicated desks furnished with ergonomic chairs you can actually feel in your back at 5pm.",
  },
  {
    title: "Conference setups",
    description:
      "Boardroom tables, executive chairs, and media-ready seating for client meetings, pitches, and team off-sites.",
  },
  {
    title: "Creative corners",
    description:
      "Modular pieces and accent furniture for podcast sets, content shoots, and breakout brainstorms.",
  },
];

export default function MuzeCubeWorldPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Muze + Cube World", href: "/muze-cube-world" },
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end bg-[#1A1A1A] px-6 pb-16 pt-32">
        <Image
          src="/images/spaces/las-vegas.jpg"
          alt="Inside Muze Office Las Vegas at 6860 Bermuda Rd — coworking and event space furnished by Cube World USA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <FadeIn>
            <div className="max-w-[680px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EAA820]">
                A Muze Office × Cube World USA collaboration
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold leading-tight text-white md:text-5xl">
                Workspace meets showroom meets stage.
              </h1>
              <p className="mt-4 max-w-[560px] text-base leading-relaxed text-gray-300 md:text-lg">
                Muze Office and Cube World come together at 6860 Bermuda Rd to
                create a one-of-a-kind space in Las Vegas where design meets
                productivity. Premium coworking, event hosting, and a fully
                functional furniture showroom — under one roof.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={BRAND.booking.tourUrl}
                  className="inline-flex items-center justify-center rounded-lg bg-[#EAA820] px-6 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-[#C17A28]"
                >
                  Book a Tour
                </a>
                <Link
                  href="/locations/las-vegas"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  See the Las Vegas Location
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Address strip */}
      <Section variant="gray" className="py-10 md:py-12">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3 text-sm text-[#1A1A1A]">
              <MapPin className="h-4 w-4 shrink-0 text-[#EAA820]" />
              <span className="font-medium">
                6860 Bermuda Rd, Las Vegas, NV 89119
              </span>
            </div>
            <p className="max-w-[520px] text-sm text-[#74726D]">
              A movement, not a co-working chain. A hybrid model fusing
              workspace, showroom, and stage to grow bold ideas into lasting
              impact.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Memberships */}
      <Section>
        <FadeIn>
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
              Memberships that flex with how you work
            </h2>
            <p className="mt-4 text-base text-[#74726D]">
              Finding a workspace that&apos;s both inspiring and functional
              just got easier. Flexible options without hidden fees — whether
              you&apos;re getting started or scaling up, the space adapts to
              you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/las-vegas-virtual-office"
                className="inline-flex items-center rounded-full border border-[#E6E4DF] bg-white px-5 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:border-[#EAA820] hover:text-[#EAA820]"
              >
                Virtual Office
              </Link>
              <Link
                href="/las-vegas-coworking"
                className="inline-flex items-center rounded-full border border-[#E6E4DF] bg-white px-5 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:border-[#EAA820] hover:text-[#EAA820]"
              >
                Coworking
              </Link>
              <Link
                href="/las-vegas-private-office"
                className="inline-flex items-center rounded-full border border-[#E6E4DF] bg-white px-5 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:border-[#EAA820] hover:text-[#EAA820]"
              >
                Private Office
              </Link>
              <Link
                href="/las-vegas-meeting-rooms"
                className="inline-flex items-center rounded-full border border-[#E6E4DF] bg-white px-5 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:border-[#EAA820] hover:text-[#EAA820]"
              >
                Meeting Rooms
              </Link>
              <Link
                href="/las-vegas-event-space"
                className="inline-flex items-center rounded-full border border-[#E6E4DF] bg-white px-5 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:border-[#EAA820] hover:text-[#EAA820]"
              >
                Event Space
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Amenities */}
      <Section variant="gray">
        <FadeIn>
          <div className="mb-12 max-w-[640px]">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
              Everything you need to do the work
            </h2>
            <p className="mt-3 text-base text-[#74726D]">
              We go beyond the basics. The space is built so the only thing
              you have to bring is the idea.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item) => (
            <StaggerItem key={item.label}>
              <div className="flex items-start gap-3 rounded-xl border border-[#E6E4DF] bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FAFAF7] text-[#EAA820]">
                  {item.icon}
                </div>
                <p className="pt-2 text-sm font-medium text-[#1A1A1A]">
                  {item.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Podcast + Presentation rooms */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-[#E6E4DF] bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAFAF7] text-[#EAA820]">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold">
                Podcast room
              </h3>
              <p className="text-sm leading-relaxed text-[#74726D]">
                Whether you&apos;re launching a new show, recording branded
                content, or hosting interviews, our fully equipped podcast
                room is here to support your voice. Record, produce, and
                share — all in one place.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-[#E6E4DF] bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAFAF7] text-[#EAA820]">
                <Presentation className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold">
                Presentation room
              </h3>
              <p className="text-sm leading-relaxed text-[#74726D]">
                Pitch. Stream. Inspire. A multi-functional room built for
                workshops, webinars, pitch nights, and team training — with
                professional A/V at your fingertips.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Cube World showroom */}
      <Section variant="dark">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EAA820]">
                Furnished by Cube World USA
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
                A working coworking space and a live furniture showroom.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-300">
                Every chair, table, sofa, and lamp in the building is supplied
                by Cube World USA, our official furniture provider. Muze Las
                Vegas isn&apos;t a sterile showroom — you don&apos;t just see
                the furniture, you live with it. Use it for a day pass, a
                deal, or a year-long membership. If you love something you sit
                on, ask us how to furnish your own space.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={BRAND.booking.tourUrl}
                  className="inline-flex items-center justify-center rounded-lg bg-[#EAA820] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:bg-white"
                >
                  Tour the showroom
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ask about furnishing your space
                </Link>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {showroomZones.map((zone) => (
                <StaggerItem key={zone.title}>
                  <div className="flex h-full flex-col gap-2 rounded-xl border border-white/15 bg-white/5 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAA820]/15 text-[#EAA820]">
                      <Sofa className="h-5 w-5" />
                    </div>
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold text-white">
                      {zone.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {zone.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </div>
      </Section>

      {/* Events */}
      <Section>
        <FadeIn>
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold md:text-4xl">
              A space that works with you — not just for you
            </h2>
            <p className="mt-4 text-base text-[#74726D]">
              From networking nights to product launches, the Muze + Cube
              World floor adapts. Turnkey event support means you bring the
              guest list and we handle the rest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/las-vegas-event-space"
                className="inline-flex items-center justify-center rounded-lg bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EAA820] hover:text-[#1A1A1A]"
              >
                Plan an Event
              </Link>
              <Link
                href="/book-a-tour"
                className="inline-flex items-center justify-center rounded-lg border border-[#E6E4DF] bg-white px-6 py-3 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-[#EAA820] hover:text-[#EAA820]"
              >
                Book a Tour Instead
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Your journey starts here"
        subtitle="Whether you're a solopreneur, startup, content creator, or small team — Muze + Cube World is where bold ideas grow into lasting impact. Come see it for yourself."
        primaryLabel="Book a Tour"
        primaryHref={BRAND.booking.tourUrl}
        showPhone
        ctaLocation="muze_cube_world_bottom"
      />
    </>
  );
}
