import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

/**
 * Site-wide WebSite entity, linked to the Organization as publisher.
 * No `potentialAction`/SearchAction is included — the site has no on-site
 * search endpoint, and declaring one without a real search URL is invalid.
 */
export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BRAND.url}/#website`,
        url: `${BRAND.url}/`,
        name: BRAND.name,
        description:
          "Coworking and flexible-workspace franchise opportunities with Muze Office.",
        publisher: { "@id": `${BRAND.url}/#organization` },
        inLanguage: "en-US",
      }}
    />
  );
}
