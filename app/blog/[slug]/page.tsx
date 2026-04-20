import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { buttonVariants } from "@/lib/utils/button-variants";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import {
  getAllSlugs,
  getAllPosts,
  getPostBySlug,
  formatDate,
  getReadingTime,
} from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND } from "@/lib/utils/constants";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle || `${post.title} | Muze Office Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    ...(post.noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Related posts: same first category, excluding self and noindexed posts, max 3
  const relatedPosts = getAllPosts()
    .filter(
      (p) =>
        p.slug !== post.slug &&
        !p.noindex &&
        post.categories[0] &&
        p.categories.includes(post.categories[0])
    )
    .slice(0, 3);

  const canonicalUrl = `${BRAND.url}/blog/${post.slug}`;
  const blogPostingSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? `${BRAND.url}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: {
        "@type": "ImageObject",
        url: `${BRAND.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    articleSection: post.categories[0],
    keywords: post.categories.join(", "),
    url: canonicalUrl,
  };

  return (
    <article>
      <JsonLd data={blogPostingSchema} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "mb-8 rounded-lg"
            )}
          >
            &larr; Back to Blog
          </Link>

          <header className="mb-10">
            {post.categories[0] && (
              <span className="mb-4 inline-block text-xs font-medium uppercase tracking-wider text-[#EAA820]">
                {post.categories[0]}
              </span>
            )}
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold leading-tight text-[#1A1A1A] md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#74726D]">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{getReadingTime(post.content)}</span>
            </div>
          </header>

          {post.image && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-[#F2F1ED]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 760px) 760px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-plus-jakarta)] prose-headings:font-semibold prose-headings:text-[#1A1A1A] prose-p:text-[#1A1A1A] prose-p:leading-relaxed prose-a:text-[#EAA820] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1A1A1A] prose-ul:text-[#1A1A1A] prose-ol:text-[#1A1A1A] prose-li:text-[#1A1A1A] prose-blockquote:border-l-[#EAA820] prose-blockquote:text-[#74726D] prose-img:rounded-xl">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </div>
      </Section>

      {relatedPosts.length > 0 && (
        <Section variant="gray">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-8 font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold md:text-3xl">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#E6E4DF] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {rp.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F1ED]">
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-base font-semibold leading-tight text-[#1A1A1A]">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-[#74726D]">
                      {formatDate(rp.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </article>
  );
}
