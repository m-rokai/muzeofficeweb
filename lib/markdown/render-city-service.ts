import type { CityServiceData } from "@/lib/data/city-services";
import { cityServiceData } from "@/lib/data/city-services";
import { getService, type Service } from "@/lib/data/services";
import { getLocation, type Location } from "@/lib/data/locations";
import { getFAQsForService } from "@/lib/data/faqs";
import { BRAND } from "@/lib/utils/constants";

function formatPrice(price: number | null, unit: string): string {
  if (price === null) return "Contact for pricing";
  return `$${price}/${unit}`;
}

function renderTiers(service: Service): string {
  if (service.tiers.length === 0) return "";
  const lines: string[] = [];
  lines.push("| Tier | Price | Features |");
  lines.push("| --- | --- | --- |");
  for (const tier of service.tiers) {
    const price = formatPrice(tier.price, tier.priceUnit);
    const features = tier.features.join("; ");
    lines.push(`| ${tier.name} | ${price} | ${features} |`);
  }
  return lines.join("\n");
}

function renderSection(heading: string, paragraphs: string[]): string {
  if (paragraphs.length === 0) return "";
  return [`## ${heading}`, "", ...paragraphs.map((p) => p), ""].join("\n");
}

export function renderCityServiceMarkdown(slug: string): string | null {
  const data: CityServiceData | undefined = cityServiceData[slug];
  if (!data) return null;

  const service = getService(data.serviceId);
  const location = getLocation(data.cityId);
  if (!service || !location) return null;

  const lines: string[] = [];
  const canonical = `${BRAND.url}/${slug}`;

  // Frontmatter-style header
  lines.push(`# ${data.h1}`);
  lines.push("");
  lines.push(`> ${data.metaDescription}`);
  lines.push("");
  lines.push(`**Canonical URL:** ${canonical}`);
  lines.push(
    `**Location:** ${location.name} — ${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`
  );
  if (location.phone !== "TBD") {
    lines.push(`**Phone:** ${location.phone}`);
  }
  lines.push(`**Email:** ${location.email}`);
  lines.push("");

  // Hero subtitle
  lines.push(data.heroSubtitle);
  lines.push("");

  if (data.locationCallout) {
    lines.push(`_${data.locationCallout}_`);
    lines.push("");
  }

  // Use cases
  if (data.useCases.length > 0) {
    lines.push("## Who It's For");
    lines.push("");
    for (const useCase of data.useCases) {
      lines.push(`- ${useCase}`);
    }
    lines.push("");
  }

  // Pricing
  const pricingTable = renderTiers(service);
  if (pricingTable) {
    lines.push("## Pricing");
    lines.push("");
    lines.push(pricingTable);
    lines.push("");
  }

  // Long-form sections
  if (data.longFormBody) {
    const { whyChoose, bestFor, comparison, howToGetStarted, relatedServices } =
      data.longFormBody;

    if (whyChoose) {
      lines.push(renderSection(whyChoose.heading, whyChoose.paragraphs));
    }

    if (bestFor && bestFor.length > 0) {
      lines.push("## Best For");
      lines.push("");
      for (const persona of bestFor) {
        lines.push(`### ${persona.persona}`);
        lines.push("");
        lines.push(persona.scenario);
        lines.push("");
        for (const fit of persona.fit) {
          lines.push(`- ${fit}`);
        }
        lines.push("");
      }
    }

    if (comparison) {
      lines.push(renderSection(comparison.heading, comparison.paragraphs));
    }

    if (howToGetStarted) {
      lines.push(
        renderSection(howToGetStarted.heading, howToGetStarted.paragraphs)
      );
    }

    if (relatedServices && relatedServices.length > 0) {
      lines.push("## Related Services");
      lines.push("");
      for (const related of relatedServices) {
        lines.push(`- [${related.label}](${BRAND.url}/${related.slug})`);
      }
      lines.push("");
    }
  }

  // FAQs
  const faqs = getFAQsForService(data.serviceId);
  if (faqs.length > 0) {
    lines.push("## Frequently Asked Questions");
    lines.push("");
    for (const faq of faqs) {
      lines.push(`### ${faq.question}`);
      lines.push("");
      lines.push(faq.answer);
      lines.push("");
    }
  }

  // Contact
  lines.push("## Contact");
  lines.push("");
  lines.push(`- **Web:** ${BRAND.url}`);
  lines.push(`- **Email:** ${location.email}`);
  if (location.phone !== "TBD") {
    lines.push(`- **Phone:** ${location.phone}`);
  }
  lines.push(
    `- **Address:** ${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`
  );
  lines.push("");

  return lines.join("\n");
}

export function renderCityMarkdown(locationId: string): string | null {
  const location: Location | undefined = getLocation(locationId);
  if (!location) return null;

  const lines: string[] = [];
  const canonical = `${BRAND.url}/locations/${location.slug}`;

  lines.push(`# Muze Office ${location.name}`);
  lines.push("");
  lines.push(
    `> Flexible workspace, coworking, virtual offices, private offices, meeting rooms, and event space at ${location.address.street}, ${location.address.city}.`
  );
  lines.push("");
  lines.push(`**Canonical URL:** ${canonical}`);
  lines.push(
    `**Address:** ${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`
  );
  if (location.phone !== "TBD") {
    lines.push(`**Phone:** ${location.phone}`);
  }
  lines.push(`**Email:** ${location.email}`);
  lines.push(
    `**Hours:** Monday–Friday, ${location.hours.weekdays.open}–${location.hours.weekdays.close}`
  );
  lines.push(`**Status:** ${location.status}`);
  lines.push("");

  lines.push("## Local Context");
  lines.push("");
  for (const cue of location.localCues) {
    lines.push(`- ${cue}`);
  }
  lines.push("");

  if (location.neighborhoods.length > 0) {
    lines.push(`**Neighborhoods:** ${location.neighborhoods.join(", ")}`);
    lines.push("");
  }

  if (location.nearbyLandmarks.length > 0) {
    lines.push("## Nearby Landmarks");
    lines.push("");
    for (const landmark of location.nearbyLandmarks) {
      lines.push(`- ${landmark.name} — ${landmark.distance}`);
    }
    lines.push("");
  }

  if (location.taxAdvantage) {
    lines.push("## Tax Advantage");
    lines.push("");
    lines.push(location.taxAdvantage);
    lines.push("");
  }

  // Services at this location
  const cityServiceSlugs = Object.values(cityServiceData)
    .filter((entry) => entry.cityId === location.id)
    .map((entry) => entry.slug);

  if (cityServiceSlugs.length > 0) {
    lines.push("## Services at This Location");
    lines.push("");
    for (const slug of cityServiceSlugs) {
      const entry = cityServiceData[slug];
      lines.push(`- [${entry.h1}](${BRAND.url}/${slug}) — ${entry.metaDescription}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
