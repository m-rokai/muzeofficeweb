import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/section";
import { ReviewPrompt } from "@/components/marketing/review-prompt";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your Muze Office booking or signup is confirmed.",
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <Section>
      <div className="mx-auto max-w-[680px] rounded-2xl border border-[#E6E4DF] bg-white p-8 text-center shadow-sm md:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#EAA820]" aria-hidden="true" />
        <h1 className="mt-5 font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
          You’re all set
        </h1>
        <p className="mx-auto mt-4 max-w-[520px] leading-relaxed text-[#74726D]">
          Thanks for choosing Muze Office. If the booking experience was
          helpful, a short Google review helps other Las Vegas professionals
          find the right workspace.
        </p>
        <div className="mt-8">
          <ReviewPrompt />
        </div>
        <Link
          href="/"
          data-cta="return_home"
          data-cta-location="thanks_page"
          className="mt-6 inline-flex text-sm font-medium text-[#1A1A1A] underline underline-offset-4"
        >
          Return to Muze Office
        </Link>
      </div>
    </Section>
  );
}
