import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { FadeIn } from "@/components/marketing/animate";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  heading: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  showPhone?: boolean;
  phone?: string;
  /** Optional override for the CTA event name. Defaults are derived from primaryHref. */
  ctaName?: string;
  /** Page-level identifier so events can be attributed to the source page. */
  ctaLocation?: string;
}

function deriveCtaName(href: string): string {
  if (href.includes("book-a-tour") || href.includes("/tour")) return "book_tour";
  if (href.includes("/contact")) return "contact_us";
  if (href.includes("workspace-memberships")) return "view_memberships";
  return "primary_cta";
}

export function CTASection({
  heading,
  subtitle,
  primaryLabel,
  primaryHref,
  showPhone = true,
  phone = "(702) 370-7515",
  ctaName,
  ctaLocation = "cta_section",
}: CTASectionProps) {
  const cta = ctaName ?? deriveCtaName(primaryHref);
  return (
    <section className="w-full bg-[#1A1A1A] py-16 px-4 sm:px-6 md:py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 text-center">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="max-w-[540px] text-lg text-gray-400">{subtitle}</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href={primaryHref}
              data-cta={cta}
              data-cta-location={ctaLocation}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-xl bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28] h-14 px-8 text-base font-semibold"
              )}
            >
              {primaryLabel}
            </Link>
            {showPhone && (
              <a
                href="tel:+17023707515"
                data-cta="call"
                data-cta-location={`${ctaLocation}_phone`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-xl border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white h-14 px-8 text-base"
                )}
              >
                <Phone className="h-5 w-5" />
                {phone}
              </a>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
