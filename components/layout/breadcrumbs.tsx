import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND } from "@/lib/utils/constants";

export interface BreadcrumbItem {
  /** The human-readable label shown in the visible breadcrumb trail. */
  label: string;
  /** Absolute path (beginning with "/"). The final crumb should still provide
   *  its own canonical path so the BreadcrumbList JSON-LD resolves every item. */
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Optional className applied to the outer <nav>. Defaults to a padded
   *  light-background strip that sits above page content. */
  className?: string;
}

/**
 * Renders a visible breadcrumb navigation and a matching schema.org
 * BreadcrumbList JSON-LD block. Server component — no state, no effects.
 *
 * `items` should include every ancestor in order starting from Home. The
 * final item represents the current page and is rendered as plain text.
 *
 * Example:
 *   <Breadcrumbs items={[
 *     { label: "Home", href: "/" },
 *     { label: "Las Vegas", href: "/locations/las-vegas" },
 *     { label: "Virtual Office", href: "/las-vegas-virtual-office" },
 *   ]} />
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${BRAND.url}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label="Breadcrumb"
        className={
          className ??
          "w-full border-b border-[#E6E4DF] bg-[#FAFAF7] px-4 py-3 sm:px-6"
        }
      >
        <ol className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-1.5 text-sm text-[#74726D]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-[#B8B5AD]"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="font-medium text-[#1A1A1A]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#EAA820]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
