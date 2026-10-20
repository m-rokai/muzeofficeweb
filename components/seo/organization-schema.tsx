import { BRAND } from "@/lib/utils/constants";
import { getLocation } from "@/lib/data/locations";
import { JsonLd } from "@/components/seo/json-ld";

// Site-wide Organization entity. Mirrors the Las Vegas LocalBusiness record so
// the address, phone and third-party profiles are identical everywhere an AI
// assistant or search engine looks (entity consistency).
export function OrganizationSchema() {
  const hq = getLocation("las-vegas");
  const profiles = hq?.externalProfiles ?? {};
  const sameAs = [
    BRAND.social.twitter,
    BRAND.social.facebook,
    BRAND.social.instagram,
    BRAND.social.linkedin,
    BRAND.social.tiktok,
    profiles.yelp,
    profiles.gbp,
    ...(profiles.directories ?? []),
  ].filter((url): url is string => Boolean(url));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: ["Muze", "Muze Coworking", "Muze Office Las Vegas"],
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: `${BRAND.url}/images/logo.png`,
    email: BRAND.email,
    telephone: hq && hq.phoneRaw !== "TBD" ? hq.phoneRaw : "+17023707515",
    description: BRAND.tagline,
    ...(hq && {
      address: {
        "@type": "PostalAddress",
        streetAddress: hq.address.street,
        addressLocality: hq.address.city,
        addressRegion: hq.address.state,
        postalCode: hq.address.zip,
        addressCountry: "US",
      },
      location: { "@id": `${BRAND.url}/locations/${hq.slug}#localbusiness` },
    }),
    areaServed: [
      { "@type": "City", name: "Las Vegas", containedInPlace: { "@type": "State", name: "Nevada" } },
    ],
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+17023707515",
      contactType: "customer service",
      areaServed: ["US"],
      availableLanguage: ["English"],
    },
  };

  return <JsonLd data={data} />;
}
