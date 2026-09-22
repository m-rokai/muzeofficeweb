import { getLocation } from "@/lib/data/locations";
import { BRAND } from "@/lib/utils/constants";

export interface PathContact {
  /** Display phone, or null when this path's location has no phone yet. */
  phone: string | null;
  phoneRaw: string | null;
  primary: { href: string; label: string; trackingName: string };
  /** Online signup link, or null when this path's location has none. */
  signupHref: string | null;
}

const LAS_VEGAS_CONTACT: PathContact = {
  phone: "(702) 370-7515",
  phoneRaw: "+17023707515",
  primary: {
    href: BRAND.booking.tourUrl,
    label: "Book a Tour",
    trackingName: "book_tour",
  },
  signupHref: BRAND.booking.signupUrl,
};

export function isHoustonPath(pathname: string): boolean {
  return pathname.startsWith("/houston-") || pathname === "/locations/houston";
}

/**
 * Site-wide header / sticky-bar contact actions for a path. Houston pages
 * must never dial the Las Vegas line or open the Las Vegas booking portal:
 * pre-opening they point to early access, once live to Houston's own
 * phone and booking links (falling back to the contact form).
 */
export function getPathContact(pathname: string): PathContact {
  if (!isHoustonPath(pathname)) return LAS_VEGAS_CONTACT;

  const houston = getLocation("houston");
  if (!houston || houston.status !== "active") {
    return {
      phone: null,
      phoneRaw: null,
      primary: {
        href: "/locations/houston#waitlist",
        label: "Join Early Access",
        trackingName: "houston_waitlist",
      },
      signupHref: null,
    };
  }

  const hasPhone = houston.phoneRaw !== "TBD";
  return {
    phone: hasPhone ? houston.phone : null,
    phoneRaw: hasPhone ? houston.phoneRaw : null,
    primary: houston.booking?.tourUrl
      ? {
          href: houston.booking.tourUrl,
          label: "Book a Tour",
          trackingName: "book_tour",
        }
      : {
          href: "/contact?interest=coworking",
          label: "Contact Us",
          trackingName: "contact_us",
        },
    signupHref: houston.booking?.signupUrl ?? null,
  };
}
