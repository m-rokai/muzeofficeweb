import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { PersonSchema } from "@/components/seo/person-schema";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { people } from "@/lib/data/people";
import { BRAND } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "About Muze Office",
  description:
    "Meet the team behind Muze Office. From our Las Vegas flagship to Houston and beyond, we're building flexible workspaces worth franchising.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Render Person schema for each leadership team member */}
      {people.map((p) => (
        <PersonSchema key={p.slug} person={p} />
      ))}

      {/* Hero */}
      <Section variant="white">
        <FadeIn>
          <div className="max-w-[760px]">
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
              The team behind Muze Office
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#74726D]">
              Muze Office started with a simple conviction: flexible workspace
              shouldn&apos;t feel like a hotel lobby or an afterthought. It should feel
              like somewhere you actually want to work. That idea became a Las Vegas
              flagship — coworking, virtual offices, private offices, meeting rooms, and
              event space under one roof — and is now growing into Houston and new
              markets through the Muze Office franchise program.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Brand origin */}
      <Section variant="gray">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <div>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
                Built from the ground up in Las Vegas
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-[#74726D]">
                <p>
                  The Muze Office flagship at 6860 Bermuda Rd, Suite 200 in Las Vegas
                  opened as a proof of concept for a better kind of flexible workspace —
                  one that combines coworking, virtual office services, private offices,
                  meeting rooms, and event space with honest pricing and a design that
                  doesn&apos;t feel clinical.
                </p>
                <p>
                  After building out the technology stack (powered by Optix), the
                  operations playbook, and the member experience, we validated the model
                  over multiple years in an intensely competitive market. That validation
                  is the foundation of the franchise program.
                </p>
                <p>
                  Today, a second flagship is opening in Houston in 2026 — and we&apos;re
                  licensing the Muze model to independent operators, investors, and
                  real-estate partners who want to bring flexible workspace to their own
                  markets.
                </p>
              </div>
              <div className="mt-6">
                <a
                  href={BRAND.mainSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#EAA820] hover:underline"
                >
                  See the live flagship at muzeoffice.com
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-5">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold text-[#1A1A1A]">
                Why franchise?
              </h3>
              <p className="text-base leading-relaxed text-[#74726D]">
                We built something that works — a brand, a technology platform, an
                operating playbook, and a member experience that converts first-time
                visitors into long-term members. Franchising is how we extend that model
                to operators who want to run their own location without starting from
                scratch.
              </p>
              <p className="text-base leading-relaxed text-[#74726D]">
                The Muze Office franchise program is not about selling a name. It&apos;s
                about transferring a complete operating system: brand standards, the
                Optix-powered technology stack, site-selection and buildout guidance,
                pre-opening training, and ongoing support.
              </p>
              <div className="mt-2">
                <Link
                  href="/the-model"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#EAA820] hover:underline"
                >
                  Explore the full franchise model →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Leadership */}
      <Section variant="white">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
            Leadership
          </h2>
          <p className="mt-3 max-w-[580px] text-base text-[#74726D]">
            The people who built and run Muze Office, and who support every franchise
            partner.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p) => (
            <StaggerItem
              key={p.slug}
              className="flex flex-col gap-4 rounded-2xl border border-[#E6E4DF] bg-[#FAFAF7] p-7"
            >
              <div id={p.slug} className="scroll-mt-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#EAA820]">
                  {p.jobTitle}
                </p>
                <h3 className="mt-1.5 font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold text-[#1A1A1A]">
                  {p.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[#74726D]">{p.shortBio}</p>
              {p.bio.length > 1 && (
                <div className="mt-1 flex flex-col gap-3 border-t border-[#E6E4DF] pt-4">
                  {p.bio.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-[#74726D]">
                      {para}
                    </p>
                  ))}
                </div>
              )}
              {p.sameAs.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  {p.sameAs.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#74726D] hover:text-[#EAA820]"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Profile
                    </a>
                  ))}
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Proof point */}
      <Section variant="gray">
        <FadeIn>
          <div className="flex flex-col gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#EAA820]">
              Proven in market
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
              See the model in action
            </h2>
            <p className="mx-auto max-w-[560px] text-base leading-relaxed text-[#74726D]">
              The best way to understand what you&apos;d be licensing is to see the
              live product. Visit the Muze Office flagship site or tour the Las Vegas
              location.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <a
                href={BRAND.mainSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#E6E4DF] bg-white px-6 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#F2F1ED]"
              >
                Visit muzeoffice.com
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2 rounded-xl bg-[#EAA820] px-6 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#C17A28]"
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <CTASection
        heading="Interested in bringing Muze Office to your market?"
        subtitle="Start with a 30-minute discovery call. We'll talk through your market, your goals, and whether the Muze model is a fit."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="about_bottom"
        showPhone
      />
    </>
  );
}
