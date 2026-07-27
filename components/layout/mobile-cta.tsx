"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/utils/button-variants";
import { BRAND } from "@/lib/utils/constants";

const DEFAULT_CTA = {
  href: BRAND.booking.tourUrl,
  label: "Book a Tour",
  trackingName: "book_tour",
} as const;

const CTA_BY_PATH: Record<
  string,
  { href: string; label: string; trackingName: string }
> = {
  "/las-vegas-day-pass": {
    href: "#book-online",
    label: "Book Day Pass",
    trackingName: "book_online",
  },
  "/las-vegas-meeting-rooms": {
    href: "#book-online",
    label: "Check Rooms",
    trackingName: "book_online",
  },
  "/las-vegas-virtual-office": {
    href: BRAND.booking.signupUrl,
    label: "Choose a Plan",
    trackingName: "signup_online",
  },
  "/las-vegas-event-space": {
    href: "/contact?interest=event-space",
    label: "Check Your Date",
    trackingName: "event_space_inquiry",
  },
  "/las-vegas-private-office": {
    href: "/contact?interest=private-office",
    label: "Tour Offices",
    trackingName: "contact_us",
  },
  "/las-vegas-coworking": {
    href: BRAND.booking.signupUrl,
    label: "Join Coworking",
    trackingName: "signup_online",
  },
  "/las-vegas-hot-desk": {
    href: BRAND.booking.signupUrl,
    label: "Choose Hot Desk",
    trackingName: "signup_online",
  },
  "/las-vegas-dedicated-desk": {
    href: BRAND.booking.signupUrl,
    label: "Choose Your Desk",
    trackingName: "signup_online",
  },
};

export function MobileCTA() {
  const pathname = usePathname();
  const cta = CTA_BY_PATH[pathname] ?? DEFAULT_CTA;

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
          href={cta.href}
          data-cta={cta.trackingName}
          data-cta-location="mobile_sticky"
          className={cn(
            buttonVariants({ size: "lg" }),
            "flex-1 rounded-xl bg-[#1A1A1A] h-11 text-sm hover:bg-[#333]"
          )}
        >
          {cta.label}
        </a>
      </div>
    </div>
  );
}
