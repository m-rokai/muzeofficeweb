"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in Vercel runtime logs for debugging.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-[#8A6000]">
        Something went wrong
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
        This page hit a snag
      </h1>
      <p className="mt-4 max-w-[480px] text-base text-[#74726D]">
        Sorry about that — something broke on our end. Try again, or reach us
        directly and we&apos;ll help right away.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-lg bg-[#1A1A1A] text-white hover:bg-[#333]"
          )}
        >
          Try again
        </button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "rounded-lg"
          )}
        >
          Back to Home
        </Link>
      </div>
      <p className="mt-6 text-sm text-[#74726D]">
        Or reach us:{" "}
        <a
          href="tel:+17023707515"
          className="font-medium text-[#8A6000] hover:underline"
        >
          (702) 370-7515
        </a>{" "}
        ·{" "}
        <a
          href="mailto:access@muzeoffice.com"
          className="font-medium text-[#8A6000] hover:underline"
        >
          access@muzeoffice.com
        </a>
      </p>
    </div>
  );
}
