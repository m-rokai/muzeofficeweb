import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

export function OrganizationSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: `${BRAND.url}/images/logo.png`,
    email: BRAND.email,
    description: BRAND.tagline,
    sameAs: [
      BRAND.social.twitter,
      BRAND.social.facebook,
      BRAND.social.instagram,
      BRAND.social.linkedin,
      BRAND.social.tiktok,
    ],
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
