"use client";

import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/utils/button-variants";
import { BRAND } from "@/lib/utils/constants";

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E6E4DF] bg-[#FAFAF7]/95 backdrop-blur p-3 md:hidden">
      <div className="flex items-center gap-2">
        <a
          href="tel:+17023707515"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "flex-1 rounded-xl h-11 text-sm"
          )}
        >
          <Phone className="h-4 w-4 mr-1.5" />
          Call Now
        </a>
        <a
          href={BRAND.booking.tourUrl}
          className={cn(
            buttonVariants({ size: "lg" }),
            "flex-1 rounded-xl bg-[#1A1A1A] h-11 text-sm hover:bg-[#333]"
          )}
        >
          Book a Tour
        </a>
      </div>
    </div>
  );
}
