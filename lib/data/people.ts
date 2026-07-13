import { BRAND } from "@/lib/utils/constants";

export interface Person {
  /** URL slug used at /authors/{slug} */
  slug: string;
  /** Canonical full name used in Person schema and bylines */
  name: string;
  /** Short display name for compact UI (e.g. blog byline) */
  shortName: string;
  /** Alternate names this person is also known as (for entity matching) */
  alternateNames: string[];
  /** Job title used in Person schema and on-page */
  jobTitle: string;
  /** One-line bio for cards and meta descriptions */
  shortBio: string;
  /** Multi-paragraph bio for About + author profile */
  bio: string[];
  /** Public profile URLs used as sameAs entity links */
  sameAs: string[];
  /** Schema.org @id — stable, used to link Person across pages */
  schemaId: string;
}

export const ZACHARY_DEVON_DUONG: Person = {
  slug: "zachary-devon-duong",
  name: "Zachary Devon Duong",
  shortName: "Zac",
  alternateNames: ["Zac Young", "Zachary Devon", "Zac Duong"],
  jobTitle: "Founder, Muze Office",
  shortBio:
    "Founder of Muze Office. Building flexible workspaces in Las Vegas and Houston that people actually want to walk into.",
  bio: [
    "Zachary Devon Duong is the founder of Muze Office and leads Muze International Corporation, the company behind the brand.",
    "He built Muze around a single conviction: flexible workspace shouldn't feel like a casino floor or a hotel lobby — it should feel like a place you actually want to work. That principle shapes every decision at Muze, from the layout of the coworking floor to the way memberships are priced.",
    "Today Muze operates a flagship coworking, virtual office, private office, meeting room, and event space at 6860 Bermuda Rd in Las Vegas. An independently operated Muze Office franchise location is planned for Houston in 2026. Zachary also leads the Muze Office Franchise program, licensing the model to independent operators.",
  ],
  sameAs: ["https://www.instagram.com/iamzacharydevon/"],
  schemaId: `${BRAND.url}/#zachary-devon-duong`,
};

export const ROBERT_MAI: Person = {
  slug: "robert-mai",
  name: "Robert Mai",
  shortName: "Robert",
  alternateNames: ["Rob Mai"],
  jobTitle: "Director of Strategic Initiatives, Muze Office",
  shortBio:
    "Director of Strategic Initiatives at Muze Office, leading growth, partnerships, and the expansion into Houston and new franchise markets.",
  bio: [
    "Robert Mai is Director of Strategic Initiatives at Muze Office, where he leads growth strategy, partnerships, and the rollout of new flagship and franchise locations.",
    "He focuses on the systems that let a flexible-workspace brand scale without losing what makes each location feel local — from how new cities are launched to how members experience the space on day one.",
    "Robert works across the Las Vegas flagship and the upcoming Houston location, and supports the independent operators joining through the Muze Office Franchise program.",
  ],
  sameAs: [],
  schemaId: `${BRAND.url}/#robert-mai`,
};

export const ASHLEY_LACY: Person = {
  slug: "ashley-lacy",
  name: "Ashley Lacy",
  shortName: "Ashley",
  alternateNames: [],
  jobTitle: "Community Manager, Muze Office Las Vegas",
  shortBio:
    "Community Manager at the Muze Office Las Vegas flagship, focused on member experience, events, and day-to-day life on the coworking floor.",
  bio: [
    "Ashley Lacy is the Community Manager at Muze Office's Las Vegas flagship at 6860 Bermuda Rd, where she runs member experience, onboarding, and the day-to-day rhythm of the coworking community.",
    "She's the person most members meet first — handling tours, move-ins, and the small details that make a workspace feel like somewhere you belong rather than just a desk you rent.",
    "Ashley curates the community events and networking that connect founders, freelancers, and remote teams across the Las Vegas location.",
  ],
  sameAs: [],
  schemaId: `${BRAND.url}/#ashley-lacy`,
};

export const people: Person[] = [
  ZACHARY_DEVON_DUONG,
  ROBERT_MAI,
  ASHLEY_LACY,
];

export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}

/**
 * Resolve a free-form byline string (from blog frontmatter or normalizeAuthor)
 * to a Person record when it matches a known author or alternate name.
 * Returns null for legacy / team bylines so they keep their existing display.
 */
export function getPersonByName(name: string): Person | null {
  const lower = name.trim().toLowerCase();
  for (const p of people) {
    if (p.name.toLowerCase() === lower) return p;
    if (p.alternateNames.some((alt) => alt.toLowerCase() === lower)) return p;
  }
  return null;
}
