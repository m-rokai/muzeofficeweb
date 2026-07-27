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
import { BlogCta } from "@/components/blog/blog-cta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND, OG_DEFAULTS } from "@/lib/utils/constants";
import { getPersonByName } from "@/lib/data/people";

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
    title: post.seoTitle || post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    ...(post.noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      ...OG_DEFAULTS,
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image ? { images: [post.image] } : {}),
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
  const authorPerson = getPersonByName(post.author);
  const authorNode: Record<string, unknown> = authorPerson
    ? {
        "@type": "Person",
        "@id": authorPerson.schemaId,
        name: authorPerson.name,
        url: `${BRAND.url}/authors/${authorPerson.slug}`,
      }
    : { "@type": "Person", name: post.author };
  const blogPostingSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? `${BRAND.url}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: authorNode,
    publisher: {
      "@type": "Organization",
      "@id": `${BRAND.url}/#organization`,
      name: BRAND.name,
      logo: {
        "@type": "ImageObject",
        url: `${BRAND.url}/images/logo.png`,
        width: 2048,
        height: 2048,
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
              <span className="mb-4 inline-block text-xs font-medium uppercase tracking-wider text-[#8A6000]">
                {post.categories[0]}
              </span>
            )}
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold leading-tight text-[#1A1A1A] md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#5F5D58] md:text-xl">
              {post.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#74726D]">
              {authorPerson ? (
                <Link
                  href={`/authors/${authorPerson.slug}`}
                  className="hover:text-[#1A1A1A] hover:underline"
                  rel="author"
                >
                  {authorPerson.name}
                </Link>
              ) : (
                <span>{post.author}</span>
              )}
              <span>·</span>
              <span>Published {formatDate(post.date)}</span>
              {post.dateModified && post.dateModified !== post.date && (
                <>
                  <span>·</span>
                  <span>Updated {formatDate(post.dateModified)}</span>
                </>
              )}
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

          <div className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-plus-jakarta)] prose-headings:font-semibold prose-headings:text-[#1A1A1A] prose-p:text-[#1A1A1A] prose-p:leading-relaxed prose-a:text-[#8A6000] prose-a:underline prose-a:underline-offset-2 prose-strong:text-[#1A1A1A] prose-ul:text-[#1A1A1A] prose-ol:text-[#1A1A1A] prose-li:text-[#1A1A1A] prose-blockquote:border-l-[#EAA820] prose-blockquote:text-[#74726D] prose-img:rounded-xl">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {/* Template-level conversion CTA — derived from the post's topic so
              every indexable post funnels its high-intent readers toward the
              matching money page / waitlist. Kept out of the MDX source so the
              raw-markdown mirrors stay clean. */}
          {!post.noindex && (
            <BlogCta categories={post.categories} slug={post.slug} />
          )}
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
