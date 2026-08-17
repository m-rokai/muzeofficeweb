import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { PersonSchema } from "@/components/seo/person-schema";
import { FadeIn } from "@/components/marketing/animate";
import { BRAND, OG_DEFAULTS } from "@/lib/utils/constants";
import {
  people,
  getPersonBySlug,
  getPersonByName,
} from "@/lib/data/people";
import { getAllPosts, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return {};
  const profileTitle = `${person.name} — ${person.jobTitle}`;
  return {
    title: { absolute: profileTitle },
    description: person.shortBio,
    alternates: { canonical: `/authors/${person.slug}` },
    openGraph: {
      ...OG_DEFAULTS,
      title: profileTitle,
      description: person.shortBio,
      type: "profile",
      url: `${BRAND.url}/authors/${person.slug}`,
    },
  };
}

export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const authoredPosts = getAllPosts().filter((p) => {
    if (p.noindex) return false;
    const matched = getPersonByName(p.author);
    return matched?.slug === person.slug;
  });

  const profileUrl = `${BRAND.url}/authors/${person.slug}`;
  const profilePageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${profileUrl}#profilepage`,
    url: profileUrl,
    name: `${person.name} — ${person.jobTitle}`,
    description: person.shortBio,
    mainEntity: { "@type": "Person", "@id": person.schemaId, name: person.name },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${BRAND.url}/#website`,
      name: BRAND.name,
      url: BRAND.url,
    },
  };

  return (
    <>
      <PersonSchema person={person} />
      <JsonLd data={profilePageSchema} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Authors", href: "/blog" },
          { label: person.name, href: `/authors/${person.slug}` },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-[760px]">
          <FadeIn>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#EAA820]">
              {person.jobTitle}
            </p>
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-3xl font-semibold leading-tight text-[#1A1A1A] md:text-4xl lg:text-5xl">
              {person.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#74726D] md:text-lg">
              {person.shortBio}
            </p>
          </FadeIn>

          <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-[#1A1A1A]">
            {person.bio.map((paragraph, i) => (
              <FadeIn key={i} delay={0.05 + i * 0.05}>
                <p>{paragraph}</p>
              </FadeIn>
            ))}
          </div>

          {person.sameAs.length > 0 && (
            <FadeIn delay={0.3}>
              <div className="mt-10 border-t border-[#E6E4DF] pt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-[#74726D]">
                  Elsewhere
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {person.sameAs.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        rel="me noopener noreferrer"
                        target="_blank"
                        className="text-sm text-[#EAA820] hover:underline"
                      >
                        {prettyProfileLabel(url)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}
        </div>
      </Section>

      {authoredPosts.length > 0 && (
        <Section variant="gray">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-8 font-[family-name:var(--font-plus-jakarta)] text-2xl font-semibold md:text-3xl">
              Posts by {person.shortName}
            </h2>
            <ul className="flex flex-col divide-y divide-[#E6E4DF]">
              {authoredPosts.map((post) => (
                <li key={post.slug} className="py-5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-semibold leading-tight text-[#1A1A1A] group-hover:text-[#EAA820]">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="mt-1 text-sm text-[#74726D]">
                        {post.description}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-[#74726D]">
                      {formatDate(post.date)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </>
  );
}

function prettyProfileLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("instagram.com")) return "Instagram";
    if (host.includes("linkedin.com")) return "LinkedIn";
    if (host.includes("x.com") || host.includes("twitter.com")) return "X";
    if (host.includes("facebook.com")) return "Facebook";
    if (host.includes("tiktok.com")) return "TikTok";
    return host;
  } catch {
    return url;
  }
}
