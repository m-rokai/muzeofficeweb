import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Badge } from "@/components/ui/badge";
import { publishedInsights } from "@/lib/data/insights";

export const metadata: Metadata = {
  title: "Insights — Coworking Franchise Guides & Resources",
  description:
    "Guides and resources for prospective coworking franchisees — costs, the business model, due diligence, and what to look for before you buy a flexible-workspace franchise.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ]}
      />

      {/* Hero */}
      <Section variant="dark" id="hero">
        <FadeIn>
          <div className="flex flex-col gap-6 max-w-[780px]">
            <Badge className="w-fit bg-[#EAA820]/20 text-[#EAA820] border-[#EAA820]/30 hover:bg-[#EAA820]/20">
              Insights
            </Badge>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Coworking franchise insights
            </h1>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[640px]">
              Straight answers on what it takes to own a coworking franchise — costs, the business
              model, and how to do your due diligence before you commit. No hype, no hidden numbers.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Articles */}
      <Section variant="white" id="articles">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedInsights.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/insights/${post.slug}`}
                className="group flex h-full flex-col gap-4 rounded-xl border border-[#E6E4DF] bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
                data-cta="read_insight"
                data-cta-location="insights_index"
              >
                <Badge className="w-fit bg-[#EAA820]/10 text-[#EAA820] border border-[#EAA820]/20 text-sm">
                  {post.category}
                </Badge>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold text-[#1A1A1A]">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-[#74726D]">{post.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="flex items-center gap-1.5 text-xs text-[#74726D]">
                    <Clock className="h-3.5 w-3.5" />
                    {post.date} · {post.readMinutes} min read
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#74726D] transition-colors group-hover:text-[#EAA820]" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <CTASection
        heading="Ready to talk specifics?"
        subtitle="Reading is a good start. A discovery call is where you get real numbers and answers for your market."
        primaryLabel="Book a Discovery Call"
        primaryHref="/discovery-call"
        ctaName="book_discovery_call"
        ctaLocation="insights_bottom"
        showPhone
      />
    </>
  );
}
