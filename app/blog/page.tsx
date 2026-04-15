import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/marketing/animate";
import { ArrowRight } from "lucide-react";
import { getAllPosts, formatDate, getReadingTime } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Muze Office Blog — Coworking & Virtual Office Insights",
  description:
    "Tips, guides, and insights on coworking, virtual offices, remote work, and flexible workspace in Las Vegas from the Muze Office team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Muze Office Blog — Coworking & Virtual Office Insights",
    description:
      "Tips, guides, and insights on coworking, virtual offices, remote work, and flexible workspace in Las Vegas.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts().filter((post) => !post.noindex);

  return (
    <>
      <Section>
        <FadeIn>
          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl font-semibold md:text-5xl">
              Muze Office Blog
            </h1>
            <p className="mt-4 text-base text-[#74726D] md:text-lg">
              Coworking tips, virtual office guides, and workspace insights
              from Las Vegas.
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section variant="gray">
        {posts.length === 0 ? (
          <FadeIn>
            <div className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center">
              <h2 className="text-2xl font-semibold md:text-3xl">
                No posts yet
              </h2>
              <p className="text-base text-[#74726D]">
                New articles coming soon.
              </p>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                    <h2 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-semibold leading-tight text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#EAA820]">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#74726D] line-clamp-3">
                      {post.description}
                    </p>
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
          </StaggerContainer>
        )}
      </Section>
    </>
  );
}
