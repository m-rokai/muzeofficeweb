import Link from "next/link";
import { Star } from "lucide-react";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/utils/constants";
import { getLocation } from "@/lib/data/locations";
import {
  classifyBlogTopic,
  isHoustonBlog,
  type BlogTopic,
} from "@/lib/blog-topic";

/**
 * End-of-article conversion CTA for blog posts. Rendered TEMPLATE-LEVEL from
 * app/blog/[slug]/page.tsx — never embedded as JSX in the MDX source — so the
 * raw-markdown mirrors (/md/blog/*, llms.txt) stay clean and the funnel block
 * applies to every post automatically.
 *
 * The offer is derived from the post's categories: high-intent commercial
 * topics route to the matching money page (which carries the real booking
 * widgets), softer topics route to a tour, and any Houston post routes to the
 * waitlist (the only Houston monetization until it opens in 2026).
 */

type CtaLink = { label: string; href: string };

interface BlogCtaConfig {
  heading: string;
  subtitle: string;
  primary: CtaLink & { event: string };
  secondary?: CtaLink;
}

const TOUR_URL = BRAND.booking.tourUrl;

type CtaTopic = "vo" | "event" | "meeting" | "private" | "coworking" | "general";

const TOPIC_CTAS: Record<CtaTopic, BlogCtaConfig> = {
  vo: {
    heading: "Set up your Las Vegas virtual office",
    subtitle:
      "A real Bermuda Rd business address for mail, contracts, and qualifying filings — from $39/mo, month-to-month, no lease.",
    primary: {
      label: "See virtual office plans",
      href: "/las-vegas-virtual-office",
      event: "blog_cta_virtual_office",
    },
    secondary: { label: "Ask a question", href: "/contact?interest=virtual-office" },
  },
  event: {
    heading: "Host your event at Muze Office",
    subtitle:
      "Las Vegas event space for $199/hr, plus a 50-person classroom for $99/hr — with AV and catering available.",
    primary: {
      label: "See event space",
      href: "/las-vegas-event-space",
      event: "blog_cta_event_space",
    },
    secondary: { label: "Ask about your event", href: "/contact?interest=event-space" },
  },
  meeting: {
    heading: "Book a Las Vegas meeting room",
    subtitle:
      "Meeting and conference rooms by the hour from $39 — AV, video conferencing, whiteboards, and free parking.",
    primary: {
      label: "See meeting rooms",
      href: "/las-vegas-meeting-rooms",
      event: "blog_cta_meeting_rooms",
    },
    secondary: { label: "Check availability", href: "/contact?interest=meeting-rooms" },
  },
  private: {
    heading: "Get a private office in Las Vegas",
    subtitle:
      "Lockable, furnished private offices for 1–10 people — 24/7 access, free parking, month-to-month.",
    primary: {
      label: "See private offices",
      href: "/las-vegas-private-office",
      event: "blog_cta_private_office",
    },
    secondary: { label: "Book a tour", href: TOUR_URL },
  },
  coworking: {
    heading: "Work from Muze Office Las Vegas",
    subtitle:
      "Day passes, hot desks, and dedicated desks 10 minutes from the Strip — free parking, fast WiFi, and an on-site cafe.",
    primary: {
      label: "See coworking & day passes",
      href: "/las-vegas-coworking",
      event: "blog_cta_coworking",
    },
    secondary: { label: "Book a tour", href: TOUR_URL },
  },
  general: {
    heading: "Find your space at Muze Office Las Vegas",
    subtitle:
      "Coworking, private offices, virtual offices, and meeting rooms 10 minutes from the Strip — month-to-month, no long-term leases.",
    primary: {
      label: "Explore memberships",
      href: "/workspace-memberships",
      event: "blog_cta_general",
    },
    secondary: { label: "Book a tour", href: TOUR_URL },
  },
};

const HOUSTON_CTA: BlogCtaConfig = {
  heading: "Muze Office Houston opens in 2026",
  subtitle:
    "Join early access for verified opening updates and planned virtual office, coworking, and private office availability near the Galleria.",
  primary: {
    label: "Join Houston early access",
    href: "/locations/houston#waitlist",
    event: "blog_cta_houston_waitlist",
  },
};

const CTA_TOPIC_BY_BLOG_TOPIC: Record<BlogTopic, CtaTopic> = {
  "virtual-office": "vo",
  "meeting-rooms": "meeting",
  coworking: "coworking",
  "day-pass": "coworking",
  "private-office": "private",
  "event-space": "event",
  conventions: "coworking",
  general: "general",
};

/**
 * Pick the conversion offer for a post. The blog's categories are
 * inconsistent (mistags, typos, "Uncategorized"), so the SLUG — the most
 * reliable intent signal — is classified first, with categories as fallback.
 * Any Houston post is gated to the waitlist regardless of topic.
 */
export function getBlogCtaConfig(categories: string[], slug = ""): BlogCtaConfig {
  if (isHoustonBlog(slug, categories)) return HOUSTON_CTA;

  const topic = classifyBlogTopic(slug, categories);
  return TOPIC_CTAS[CTA_TOPIC_BY_BLOG_TOPIC[topic]];
}

function CtaButton({
  href,
  children,
  variant,
  event,
}: {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary";
  event?: string;
}) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const className =
    variant === "primary"
      ? cn(
          buttonVariants({ size: "lg" }),
          "rounded-xl bg-[#EAA820] text-[#1A1A1A] hover:bg-[#C17A28] h-12 px-7 text-base font-semibold"
        )
      : cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "rounded-xl border-[#1A1A1A]/15 bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A]/5 h-12 px-7 text-base"
        );
  const data = { "data-cta": event, "data-cta-location": "blog_cta" };

  if (isInternal) {
    return (
      <Link href={href} className={className} {...data}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...data}>
      {children}
    </a>
  );
}

export function BlogCta({ categories, slug }: { categories: string[]; slug: string }) {
  const config = getBlogCtaConfig(categories, slug);
  const lv = getLocation("las-vegas");
  const showRating = Boolean(lv?.rating && lv?.reviewCount);

  return (
    <aside className="not-prose my-14 rounded-2xl border border-[#E6E4DF] bg-[#F7F6F3] p-8 md:p-10">
      <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold leading-tight text-[#1A1A1A] md:text-[28px]">
        {config.heading}
      </h2>
      <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[#57554F] md:text-base">
        {config.subtitle}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <CtaButton href={config.primary.href} variant="primary" event={config.primary.event}>
          {config.primary.label}
        </CtaButton>
        {config.secondary && (
          <CtaButton href={config.secondary.href} variant="secondary">
            {config.secondary.label}
          </CtaButton>
        )}
      </div>
      {showRating && (
        <div className="mt-6 flex items-center gap-2 text-sm text-[#74726D]">
          <Star className="h-4 w-4 fill-[#EAA820] text-[#EAA820]" aria-hidden />
          <span>
            <strong className="font-semibold text-[#1A1A1A]">{lv!.rating}</strong> on Google
            {" "}· {lv!.reviewCount} reviews · 6860 Bermuda Rd, Las Vegas
          </span>
        </div>
      )}
    </aside>
  );
}
