import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";
import type { Person } from "@/lib/data/people";

interface PersonSchemaProps {
  person: Person;
}

export function PersonSchema({ person }: PersonSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": person.schemaId,
    name: person.name,
    alternateName: person.alternateNames,
    jobTitle: person.jobTitle,
    description: person.shortBio,
    url: `${BRAND.url}/authors/${person.slug}`,
    sameAs: person.sameAs,
    worksFor: { "@id": `${BRAND.url}/#organization` },
    knowsAbout: [
      "Coworking",
      "Virtual office services",
      "Flexible workspace",
      "Private office leasing",
      "Las Vegas commercial real estate",
      "Houston commercial real estate",
      "Workspace franchising",
    ],
  };

  return <JsonLd data={data} />;
}
