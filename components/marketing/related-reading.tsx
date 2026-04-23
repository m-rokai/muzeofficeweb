import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/marketing/animate";
import { getPostBySlug, formatDate, getReadingTime } from "@/lib/blog";

interface RelatedReadingProps {
  slugs: string[];
  heading?: string;
  subtitle?: string;
  /** Render at most this many cards. Defaults to 3. */
  limit?: number;
}

export function RelatedReading({
  slugs,
  heading = "Keep reading",
  subtitle,
  limit = 3,
}: RelatedReadingProps) {
  // Silently drop missing or noindexed posts so a blog deletion never breaks
  // the calling page at build time.
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && !p.noindex))
    .slice(0, limit);

  if (posts.length === 0) return null;

  return (
    <Section variant="white" id="related-reading">
      <FadeIn>
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold text-[#1A1A1A] md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {subtitle && (
            <p className="max-w-[560px] text-lg text-[#74726D]">{subtitle}</p>
          )}
        </div>
      </FadeIn>

      <StaggerContainer>
        <div className="mx-auto mt-12 grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E6E4DF] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAA820] focus-visible:ring-offset-2"
              >
                {post.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F1ED]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  {post.categories[0] && (
                    <span className="text-xs font-medium uppercase tracking-wider text-[#EAA820]">
                      {post.categories[0]}
                    </span>
                  )}
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold leading-tight text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#EAA820]">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="line-clamp-3 text-sm text-[#74726D]">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2 text-xs text-[#74726D]">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span>{getReadingTime(post.content)}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#EAA820]">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </Section>
  );
}
