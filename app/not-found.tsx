import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/marketing/animate";

export const metadata: Metadata = {
  title: "Page Not Found — Muze Office",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-widest text-[#EAA820]">
          404
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-[480px] text-base text-[#74726D]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-lg bg-[#1A1A1A] text-white hover:bg-[#333]"
            )}
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-lg"
            )}
          >
            Contact Us
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
