import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/lib/utils/button-variants";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: number | null;
  priceUnit: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref: string;
}

export function PricingCard({
  name,
  price,
  priceUnit,
  features,
  highlighted = false,
  ctaLabel,
  ctaHref,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-between",
        highlighted
          ? "border-2 border-[#EAA820] ring-0 shadow-lg"
          : "border border-[#E6E4DF]"
      )}
      style={{ borderRadius: 12 }}
    >
      <div>
        <CardHeader>
          {highlighted && (
            <span className="mb-1 inline-block w-fit rounded-full bg-[#EAA820]/10 px-3 py-0.5 text-xs font-semibold text-[#EAA820]">
              Most Popular
            </span>
          )}
          <CardTitle className="text-lg font-semibold text-[#1A1A1A]">
            {name}
          </CardTitle>
          <div className="mt-2 flex items-baseline gap-1">
            {price !== null ? (
              <>
                <span className="text-3xl font-bold text-[#1A1A1A]">
                  ${price}
                </span>
                <span className="text-sm text-gray-500">/{priceUnit}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-[#1A1A1A]">
                Contact Us
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <ul className="flex flex-col gap-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#EAA820]" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>

      <div className="px-4 pb-4 pt-2">
        <Link
          href={ctaHref}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full rounded-[12px] text-center",
            highlighted
              ? "bg-[#EAA820] text-white hover:bg-[#C17A28]"
              : "bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]/80"
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </Card>
  );
}
