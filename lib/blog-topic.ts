export type BlogTopic =
  | "virtual-office"
  | "meeting-rooms"
  | "coworking"
  | "day-pass"
  | "private-office"
  | "event-space"
  | "conventions"
  | "general";

const GEOGRAPHY_CATEGORIES = new Set([
  "las vegas",
  "houston",
  "nevada",
  "texas",
  "uncategorized",
]);

/** Give inconsistent legacy slugs and categories one comparison vocabulary. */
export function normalizeBlogText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function isHoustonBlog(slug: string, categories: string[]): boolean {
  return /\bhouston\b/.test(
    normalizeBlogText(`${slug} ${categories.join(" ")}`)
  );
}

function classifyText(text: string): BlogTopic | null {
  if (/virtual office|virtual mailbox|business address|mail forwarding/.test(text)) {
    return "virtual-office";
  }
  if (/day pass|daily pass/.test(text)) return "day-pass";
  if (
    /meeting room|meeting space|conference room|conference space|podcast|deposition/.test(
      text
    )
  ) {
    return "meeting-rooms";
  }
  if (/event space|event venue|party venue|team retreat|corporate event/.test(text)) {
    return "event-space";
  }
  if (/private off|office space rent|executive office/.test(text)) {
    return "private-office";
  }
  if (
    /convention|where to work during|black hat|def con|ces las vegas|sema show|nab show|magic las vegas|mjbizcon|hlth las vegas|kbis las vegas|conexpo|asd market|infocomm|imex|icsc/.test(
      text
    )
  ) {
    return "conventions";
  }
  if (
    /cowork|hot desk|dedicated desk|shared office|flexible workspace|remote work|freelancer/.test(
      text
    )
  ) {
    return "coworking";
  }
  return null;
}

/**
 * Classify editorial intent from the slug first, then categories. Geography
 * labels such as "Las Vegas" are deliberately not treated as topics.
 */
export function classifyBlogTopic(
  slug: string,
  categories: string[]
): BlogTopic {
  const slugText = normalizeBlogText(slug);
  const categoryText = normalizeBlogText(categories.join(" "));
  return classifyText(slugText) ?? classifyText(categoryText) ?? "general";
}

/** Categories used only as a relevance tie-breaker within a normalized topic. */
export function getEditorialCategories(categories: string[]): Set<string> {
  return new Set(
    categories
      .map(normalizeBlogText)
      .filter((category) => category && !GEOGRAPHY_CATEGORIES.has(category))
  );
}
