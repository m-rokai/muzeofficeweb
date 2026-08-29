import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { BRAND } from "@/lib/utils/constants";

const testimonials = [
  {
    quote: "Clean and friendly staff!",
    name: "Joanieve Cooper",
    role: "Google reviewer",
    plan: "Coworking visit",
  },
  {
    quote: "The biggest highlight is being open 24/7.",
    name: "Will",
    role: "Google reviewer",
    plan: "Day Pass",
  },
  {
    quote: "Convenient, accessible, and perfect for teams.",
    name: "Venus Manalac",
    role: "Google reviewer",
    plan: "Team meeting space",
  },
] as const;

export function Testimonials() {
  return (
    <Section variant="gray">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8A6000]">
            Verified feedback
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
            What workspace guests say
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[#74726D]">
            Short excerpts from public Google reviews of the Las Vegas
            workspace. Read the full reviews for complete context.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-2xl border border-[#E6E4DF] bg-white p-6 shadow-sm"
            >
              <div className="flex gap-1 text-[#EAA820]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-5 text-lg leading-relaxed text-[#1A1A1A]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-[#E6E4DF] pt-4 text-sm">
                <span className="block font-semibold text-[#1A1A1A]">
                  {testimonial.name}
                </span>
                <span className="text-[#74726D]">
                  {testimonial.role} · {testimonial.plan}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={BRAND.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="read_google_reviews"
            data-cta-location="testimonials"
            className="text-sm font-semibold text-[#1A1A1A] underline decoration-[#EAA820] underline-offset-4"
          >
            Read all Google reviews <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
