import { getService, type ServiceTier } from "@/lib/data/services";
import { getLocation } from "@/lib/data/locations";
import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

interface ServiceSchemaProps {
  serviceId: string;
  cityId: string;
}

// UN/CEFACT unit codes for schema.org PriceSpecification.unitCode.
// Keep this map tight — only the units that appear in services.ts tiers.
const unitCodeMap: Record<ServiceTier["priceUnit"], string> = {
  month: "MON",
  hour: "HUR",
  day: "DAY",
  week: "WEE",
};

// State name expansion for the `areaServed.containedInPlace` field.
// Only covers the states Muze operates in; matches locations.ts.
const stateNameMap: Record<string, string> = {
  NV: "Nevada",
  TX: "Texas",
};

function formatPrice(price: number): string {
  return price.toFixed(2);
}

function buildOffer(tier: ServiceTier): Record<string, unknown> | null {
  // Tiers with no public price (e.g. Private Office "Custom Suite") are
  // omitted rather than emitted with a placeholder — Google penalizes
  // placeholder prices and prefers missing fields over fabricated ones.
  if (tier.price === null) return null;

  const unitCode = unitCodeMap[tier.priceUnit];
  const priceString = formatPrice(tier.price);

  return {
    "@type": "Offer",
    name: tier.name,
    price: priceString,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: priceString,
      priceCurrency: "USD",
      unitCode,
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: 1,
        unitCode,
      },
    },
  };
}

export function ServiceSchema({ serviceId, cityId }: ServiceSchemaProps) {
  const service = getService(serviceId);
  const location = getLocation(cityId);
  if (!service || !location) return null;
  // Don't publish priced, "InStock" offers for locations that aren't live yet.
  // Mirrors LocalBusinessSchema gating so crawlers only see schema for
  // locations with a real address, phone, and operating status.
  if (location.status !== "active") return null;

  const offers = service.tiers
    .map(buildOffer)
    .filter((o): o is Record<string, unknown> => o !== null);

  const catalogItems = service.tiers
    .filter((tier) => tier.price !== null)
    .map((tier) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: tier.name,
        description: tier.features.join(". "),
      },
      price: formatPrice(tier.price as number),
      priceCurrency: "USD",
    }));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} in ${location.name}`,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: BRAND.name,
      url: BRAND.url,
    },
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "State",
        name: stateNameMap[location.address.state] ?? location.address.state,
      },
    },
    ...(offers.length > 0 ? { offers } : {}),
    ...(catalogItems.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.name} Plans`,
            itemListElement: catalogItems,
          },
        }
      : {}),
  };

  return <JsonLd data={data} />;
}
