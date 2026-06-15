import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

export function OrganizationSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    alternateName: ["Muze Office Franchise", "Muze Franchise", "Muze Office Franchising"],
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: `${BRAND.url}/images/logo.png`,
    email: BRAND.email,
    description: BRAND.tagline,
    parentOrganization: { "@type": "Organization", name: "Muze Office", url: BRAND.mainSiteUrl },
    sameAs: [
      BRAND.social.twitter, BRAND.social.facebook, BRAND.social.instagram,
      BRAND.social.linkedin, BRAND.social.tiktok,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BRAND.phoneTel,
      contactType: "franchise sales",
      areaServed: ["US"],
      availableLanguage: ["English"],
    },
  };
  return <JsonLd data={data} />;
}
