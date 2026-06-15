import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

export function FranchiseServiceSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BRAND.url}/#franchise-offer`,
    serviceType: "Coworking & flexible-workspace franchise opportunity",
    provider: { "@id": `${BRAND.url}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    description:
      "Franchise, investment, and partnership opportunities to operate a Muze Office flexible-workspace location — coworking, virtual offices, private offices, meeting rooms, and event space.",
    audience: { "@type": "BusinessAudience", name: "Prospective franchisees, investors, and real-estate partners" },
    url: `${BRAND.url}/`,
  };
  return <JsonLd data={data} />;
}
