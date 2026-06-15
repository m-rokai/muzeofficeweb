import { Building2, TrendingUp, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Track {
  id: "franchisee" | "investor" | "partner";
  slug: string;            // route under /
  icon: LucideIcon;
  label: string;           // nav/card title
  audience: string;        // who it's for (one line)
  summary: string;         // card body
  /** Primary commercial-intent keyword the page targets. */
  keyword: string;
}

export const tracks: Track[] = [
  {
    id: "franchisee",
    slug: "franchisees",
    icon: Building2,
    label: "Operate a Location",
    audience: "Owner-operators who want to run a Muze Office",
    summary:
      "Open and run your own flexible-workspace location using Muze's brand, technology, playbook, and hands-on launch support.",
    keyword: "coworking franchise",
  },
  {
    id: "investor",
    slug: "investors",
    icon: TrendingUp,
    label: "Invest",
    audience: "Capital partners and JV investors",
    summary:
      "Put capital into new Muze Office locations while an experienced operator handles day-to-day management.",
    keyword: "invest in coworking",
  },
  {
    id: "partner",
    slug: "partners",
    icon: Handshake,
    label: "Partner Your Space",
    audience: "Landlords and operators with commercial real estate",
    summary:
      "Convert underused office or retail square footage into a branded Muze Office flexible-workspace business.",
    keyword: "convert office space to coworking",
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
