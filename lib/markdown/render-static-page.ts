import { BRAND } from "@/lib/utils/constants";
import { locations } from "@/lib/data/locations";
import { services } from "@/lib/data/services";
import { getAllPosts } from "@/lib/blog";
import { ZACHARY_DEVON_DUONG } from "@/lib/data/people";

type StaticPageRenderer = () => string;

function renderHome(): string {
  const activeLocations = locations.filter((l) => l.status === "active");
  const coreServiceIds = [
    "virtual-office",
    "coworking",
    "private-office",
    "meeting-rooms",
    "conference-rooms",
    "event-space",
  ];
  const lines: string[] = [];
  lines.push("# Muze Office");
  lines.push("");
  lines.push(
    "> Flexible workspace in Las Vegas and Houston — coworking, virtual offices, private offices, meeting rooms, and event space. Month-to-month. Free parking. No long-term leases."
  );
  lines.push("");
  lines.push(`**Canonical URL:** ${BRAND.url}/`);
  lines.push("");
  lines.push("## Locations");
  lines.push("");
  for (const loc of activeLocations) {
    lines.push(
      `- **${loc.name}** — ${loc.address.street}, ${loc.address.city}, ${loc.address.state} ${loc.address.zip}` +
        (loc.phone !== "TBD" ? ` · ${loc.phone}` : "") +
        `  \n  ${BRAND.url}/locations/${loc.slug}`
    );
  }
  lines.push("");
  lines.push("## Services");
  lines.push("");
  for (const serviceId of coreServiceIds) {
    const service = services.find((s) => s.id === serviceId);
    if (!service) continue;
    lines.push(`- **${service.name}** — ${service.shortDescription}`);
  }
  lines.push("");
  lines.push("## Primary Pages");
  lines.push("");
  lines.push(`- [About](${BRAND.url}/about)`);
  lines.push(`- [Contact](${BRAND.url}/contact)`);
  lines.push(`- [Book a Tour](${BRAND.url}/book-a-tour)`);
  lines.push(`- [Workspace Memberships](${BRAND.url}/workspace-memberships)`);
  lines.push(`- [Locations Overview](${BRAND.url}/locations)`);
  lines.push(`- [Blog](${BRAND.url}/blog)`);
  lines.push("");
  return lines.join("\n");
}

function renderAbout(): string {
  const founder = ZACHARY_DEVON_DUONG;
  return [
    "# About Muze Office",
    "",
    "> Muze Office provides flexible coworking, virtual offices, private offices, meeting rooms, and event space in Las Vegas and Houston. No long-term leases. Month-to-month memberships designed for modern professionals.",
    "",
    `**Canonical URL:** ${BRAND.url}/about`,
    "",
    "## Company",
    "",
    "- Legal entity: Muze International Corporation",
    `- Founder: [${founder.name}](${BRAND.url}/authors/${founder.slug}) — ${founder.jobTitle}`,
    "- Sister brand: https://muzeofficefranchise.com",
    "",
    "## Positioning",
    "",
    "Professional, warm, specific. Not a casino, not a hotel lobby — a real workspace with free parking, free coffee, flexible month-to-month terms.",
    "",
    "## Locations",
    "",
    "- Las Vegas — 6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119. 10 minutes from Harry Reid International Airport via I-215.",
    "- Houston — 1800 Augusta Dr, Houston, TX 77057. Inside the 610 Loop in the Galleria / Tanglewood area.",
    "",
  ].join("\n");
}

function renderContact(): string {
  const lv = locations.find((l) => l.id === "las-vegas");
  const hou = locations.find((l) => l.id === "houston");
  const lines: string[] = [
    "# Contact Muze Office",
    "",
    `**Canonical URL:** ${BRAND.url}/contact`,
    "",
    "## Las Vegas",
    "",
  ];
  if (lv) {
    lines.push(`- **Address:** ${lv.address.street}, ${lv.address.city}, ${lv.address.state} ${lv.address.zip}`);
    lines.push(`- **Phone:** ${lv.phone}`);
    lines.push(`- **Email:** ${lv.email}`);
    lines.push(
      `- **Hours:** ${
        lv.hours.is24Hours
          ? "Open 24/7"
          : `Monday–Friday, ${lv.hours.weekdays.open}–${lv.hours.weekdays.close}`
      }`
    );
  }
  lines.push("");
  lines.push("## Houston");
  lines.push("");
  if (hou) {
    lines.push(`- **Address:** ${hou.address.street}, ${hou.address.city}, ${hou.address.state} ${hou.address.zip}`);
    if (hou.phone !== "TBD") lines.push(`- **Phone:** ${hou.phone}`);
    lines.push(`- **Email:** ${hou.email}`);
    lines.push(
      `- **Hours:** ${
        hou.hours.is24Hours
          ? "Open 24/7"
          : `Monday–Friday, ${hou.hours.weekdays.open}–${hou.hours.weekdays.close}`
      }`
    );
  }
  lines.push("");
  lines.push("## Book a Tour");
  lines.push("");
  lines.push(`- ${BRAND.url}/book-a-tour`);
  lines.push("");
  return lines.join("\n");
}

function renderBookATour(): string {
  return [
    "# Book a Free Tour at Muze Office",
    "",
    `**Canonical URL:** ${BRAND.url}/book-a-tour`,
    "",
    "Schedule a 20–30 minute walkthrough of the Las Vegas coworking floor, private offices, meeting rooms, and on-site cafe. Houston is not open for tours yet; join early access for launch updates.",
    "",
    "## Las Vegas",
    "",
    "- 6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119",
    "- (702) 370-7515",
    "- 10 minutes from Harry Reid International Airport",
    "",
    "## Houston",
    "",
    "- 1800 Augusta Dr, Houston, TX 77057",
    "- Inside the 610 Loop in the Galleria / Tanglewood area",
    "",
    "Email access@muzeoffice.com to book a tour at either location.",
    "",
  ].join("\n");
}

function renderMemberships(): string {
  const lines: string[] = [
    "# Workspace Memberships at Muze Office",
    "",
    `**Canonical URL:** ${BRAND.url}/workspace-memberships`,
    "",
    "> Compare Virtual Office, Coworking, Private Office, Meeting Rooms, Conference Rooms, and Event Space. All memberships month-to-month.",
    "",
    "## Services",
    "",
  ];
  for (const service of services) {
    if (
      ![
        "virtual-office",
        "coworking",
        "private-office",
        "meeting-rooms",
        "conference-rooms",
        "event-space",
      ].includes(service.id)
    )
      continue;
    lines.push(`### ${service.name}`);
    lines.push("");
    lines.push(service.shortDescription);
    lines.push("");
    if (service.tiers.length > 0) {
      for (const tier of service.tiers) {
        const price =
          tier.price === null
            ? "Contact for pricing"
            : `$${tier.price}/${tier.priceUnit}`;
        lines.push(`- **${tier.name}** — ${price}`);
      }
      lines.push("");
    }
  }
  return lines.join("\n");
}

function renderLocationsIndex(): string {
  const lines: string[] = [
    "# Muze Office Locations",
    "",
    `**Canonical URL:** ${BRAND.url}/locations`,
    "",
  ];
  for (const loc of locations.filter((l) => l.status === "active")) {
    lines.push(`## ${loc.name}`);
    lines.push("");
    lines.push(
      `- **Address:** ${loc.address.street}, ${loc.address.city}, ${loc.address.state} ${loc.address.zip}`
    );
    if (loc.phone !== "TBD") lines.push(`- **Phone:** ${loc.phone}`);
    lines.push(`- **Email:** ${loc.email}`);
    lines.push(
      `- **Hours:** ${
        loc.hours.is24Hours
          ? "Open 24/7"
          : `Monday–Friday, ${loc.hours.weekdays.open}–${loc.hours.weekdays.close}`
      }`
    );
    lines.push(`- **Page:** ${BRAND.url}/locations/${loc.slug}`);
    lines.push(`- **Markdown:** ${BRAND.url}/locations/${loc.slug}.md`);
    lines.push("");
  }
  return lines.join("\n");
}

function renderBlogIndex(): string {
  const posts = getAllPosts().filter((p) => !p.noindex);
  const lines: string[] = [
    "# Muze Office Blog",
    "",
    `**Canonical URL:** ${BRAND.url}/blog`,
    "",
    `${posts.length} published posts on coworking, virtual offices, Nevada LLCs, Las Vegas / Houston business, and flexible workspace strategy.`,
    "",
    "## All Posts",
    "",
  ];
  for (const post of posts) {
    lines.push(
      `- [${post.title}](${BRAND.url}/blog/${post.slug}) · ${post.date}` +
        (post.description ? `  \n  ${post.description}` : "")
    );
  }
  lines.push("");
  return lines.join("\n");
}

function renderPrivacyPolicy(): string {
  // Full policy text mirrors app/(marketing)/privacy-policy/page.tsx so
  // /privacy-policy.md and /llms-full.txt expose the real terms, not a
  // pointer. Keep the two in sync if either changes.
  return [
    "# Privacy Policy",
    "",
    `**Canonical URL:** ${BRAND.url}/privacy-policy`,
    "",
    "_Last updated: March 30, 2026_",
    "",
    "## 1. Introduction",
    "",
    'Muze International Corporation ("Muze Office," "we," "us," or "our") operates the website **muzeoffice.com** and provides coworking, virtual office, private office, meeting room, and event space services. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website or use our services.',
    "",
    "## 2. Information We Collect",
    "",
    "We may collect the following types of information:",
    "",
    "- **Personal Information:** Name, email address, phone number, company name, and mailing address provided through contact forms, tour bookings, or membership sign-ups.",
    "- **Usage Data:** Information about how you interact with our website, including pages visited, time spent, browser type, and referring URLs.",
    "- **Cookies and Tracking:** We use cookies and similar technologies to improve your experience, analyze traffic, and serve relevant content.",
    "- **Payment Information:** If you purchase a membership or service, payment details are processed by our third-party payment processor and are not stored on our servers.",
    "",
    "## 3. How We Use Your Information",
    "",
    "- To respond to inquiries and process tour bookings.",
    "- To provide and manage workspace memberships and services.",
    "- To send transactional emails (confirmations, receipts).",
    "- To send marketing communications (only with your consent; you can unsubscribe at any time).",
    "- To improve our website and services through analytics.",
    "- To comply with legal obligations.",
    "",
    "## 4. Information Sharing",
    "",
    "We do not sell your personal information. We may share information with:",
    "",
    "- **Service Providers:** Third-party vendors who help us operate our website, process payments, and deliver services (e.g., email providers, analytics tools, payment processors).",
    "- **Legal Requirements:** When required by law, court order, or governmental authority.",
    "- **Business Transfers:** In connection with a merger, acquisition, or sale of assets.",
    "",
    "## 5. Data Retention",
    "",
    "We retain personal information only for as long as necessary to fulfill the purposes described in this policy or as required by law. You may request deletion of your data at any time by contacting us.",
    "",
    "## 6. Your Rights",
    "",
    "Depending on your jurisdiction, you may have the right to:",
    "",
    "- Access the personal information we hold about you.",
    "- Request correction of inaccurate data.",
    "- Request deletion of your data.",
    "- Opt out of marketing communications.",
    "- Withdraw consent where processing is based on consent.",
    "",
    "To exercise any of these rights, please contact us at access@muzeoffice.com.",
    "",
    "## 7. Cookies",
    "",
    "Our website uses cookies to enhance functionality and analyze traffic. You can control cookie preferences through your browser settings. Disabling cookies may affect your experience on our website.",
    "",
    "## 8. Third-Party Links",
    "",
    "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.",
    "",
    "## 9. Security",
    "",
    "We use reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.",
    "",
    "## 10. Children's Privacy",
    "",
    "Our services are not directed at individuals under 18. We do not knowingly collect personal information from children.",
    "",
    "## 11. Changes to This Policy",
    "",
    'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our website after changes constitutes acceptance.',
    "",
    "## 12. Contact Us",
    "",
    "If you have questions about this Privacy Policy or your personal information, contact us at:",
    "",
    "**Muze International Corporation**  ",
    "6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119  ",
    "Email: access@muzeoffice.com  ",
    "Phone: (702) 370-7515",
    "",
  ].join("\n");
}

export const staticPageRenderers: Record<string, StaticPageRenderer> = {
  "": renderHome,
  home: renderHome,
  about: renderAbout,
  contact: renderContact,
  "book-a-tour": renderBookATour,
  "workspace-memberships": renderMemberships,
  locations: renderLocationsIndex,
  blog: renderBlogIndex,
  "privacy-policy": renderPrivacyPolicy,
};

export function renderStaticPageMarkdown(slug: string): string | null {
  const renderer = staticPageRenderers[slug];
  if (!renderer) return null;
  return renderer();
}

export function listStaticPageSlugs(): string[] {
  return Object.keys(staticPageRenderers).filter((s) => s !== "" && s !== "home");
}
