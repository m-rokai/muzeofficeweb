import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tracks } from "@/lib/data/tracks";
import { Card, CardContent } from "@/components/ui/card";

export function TrackCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {tracks.map((t) => {
        const Icon = t.icon;
        return (
          <Link
            key={t.id}
            href={`/${t.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA820] focus-visible:ring-offset-2 rounded-xl"
          >
            <Card className="h-full bg-white transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:ring-[#EAA820]/40">
              <CardContent className="flex flex-col gap-4 pt-6 pb-6">
                {/* Icon tile */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAA820]/10">
                  <Icon className="h-7 w-7 text-[#EAA820]" />
                </div>

                {/* Label + audience */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">{t.label}</h3>
                  <p className="text-sm font-medium text-[#74726D]">{t.audience}</p>
                </div>

                {/* Summary */}
                <p className="text-sm leading-relaxed text-[#74726D]">{t.summary}</p>

                {/* CTA */}
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#EAA820] group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
