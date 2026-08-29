"use client";

import { useState } from "react";
import { Mail, MessageCircle, Phone, X } from "lucide-react";
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
  "/las-vegas-conference-rooms": {
    href: "#book-online",
    label: "Check Rooms",
    trackingName: "book_online",
  },
  "/las-vegas-virtual-office": {
    href: "#book-online",
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
    href: "#book-online",
    label: "Join Coworking",
    trackingName: "signup_online",
  },
  "/las-vegas-hot-desk": {
    href: "#book-online",
    label: "Choose Hot Desk",
    trackingName: "signup_online",
  },
  "/las-vegas-dedicated-desk": {
    href: "#book-online",
    label: "Choose Your Desk",
    trackingName: "signup_online",
  },
};

export function MobileCTA() {
  const pathname = usePathname();
  const cta = CTA_BY_PATH[pathname] ?? DEFAULT_CTA;
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E6E4DF] bg-[#FAFAF7]/95 backdrop-blur p-3 md:hidden">
      {contactOpen && (
        <div
          id="mobile-contact-options"
          role="dialog"
          aria-label="Contact Muze Office"
          className="absolute bottom-full left-3 right-3 mb-2 rounded-2xl border border-[#E6E4DF] bg-white p-3 shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-sm font-semibold text-[#1A1A1A]">Contact Muze Office</p>
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              aria-label="Close contact options"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#74726D] hover:bg-[#F2F1ED]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <a
              href="tel:+17023707515"
              data-cta="call"
              data-cta-location="mobile_contact_popover"
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-[#F2F1ED] px-2 text-xs font-semibold text-[#1A1A1A]"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call
            </a>
            <a
              href="https://wa.me/17023707515"
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-cta-location="mobile_contact_popover"
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-[#F2F1ED] px-2 text-xs font-semibold text-[#1A1A1A]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              data-cta="email"
              data-cta-location="mobile_contact_popover"
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl bg-[#F2F1ED] px-2 text-xs font-semibold text-[#1A1A1A]"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setContactOpen((open) => !open)}
          aria-expanded={contactOpen}
          aria-controls="mobile-contact-options"
          data-cta="contact_options"
          data-cta-location="mobile_sticky"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "flex-1 rounded-xl h-11 text-sm"
          )}
        >
          <Phone className="h-4 w-4 mr-1.5" />
          Contact
        </button>
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
