import { BRAND } from "@/lib/utils/constants";
import { getPersonBySlug, type Person } from "@/lib/data/people";
import { getAllPosts } from "@/lib/blog";
import { getPersonByName } from "@/lib/data/people";

function getPostsByPerson(person: Person) {
  return getAllPosts().filter((p) => {
    if (p.noindex) return false;
    const matched = getPersonByName(p.author);
    return matched?.slug === person.slug;
  });
}

export function renderAuthorMarkdown(slug: string): string | null {
  const person = getPersonBySlug(slug);
  if (!person) return null;

  const lines: string[] = [];
  lines.push(`# ${person.name}`);
  lines.push("");
  lines.push(`> ${person.shortBio}`);
  lines.push("");
  lines.push(`**Canonical URL:** ${BRAND.url}/authors/${person.slug}`);
  lines.push("");
  lines.push(`**Role:** ${person.jobTitle}`);
  lines.push("");
  if (person.sameAs.length > 0) {
    lines.push("## Profiles");
    lines.push("");
    for (const url of person.sameAs) {
      lines.push(`- ${url}`);
    }
    lines.push("");
  }

  lines.push("## About");
  lines.push("");
  for (const paragraph of person.bio) {
    lines.push(paragraph);
    lines.push("");
  }

  const posts = getPostsByPerson(person);
  if (posts.length > 0) {
    lines.push(`## Posts by ${person.name}`);
    lines.push("");
    for (const post of posts) {
      lines.push(
        `- [${post.title}](${BRAND.url}/blog/${post.slug}) · ${post.date}` +
          (post.description ? `  \n  ${post.description}` : "")
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}
