import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BRAND.url}${it.path}`,
    })),
  };
  return <JsonLd data={data} />;
}
