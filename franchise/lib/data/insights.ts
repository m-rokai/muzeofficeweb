// Insights / blog index. Each published post is a static route under
// app/insights/<slug>/page.tsx. Add a post here and create its page to publish.

export interface InsightPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // human display, e.g. "June 30, 2026"
  dateIso: string; // machine, e.g. "2026-06-30"
  readMinutes: number;
  published: boolean;
}

export const insights: InsightPost[] = [
  {
    slug: "coworking-franchise-cost",
    title: "How much does a coworking franchise cost?",
    excerpt:
      "A plain-English breakdown of what actually goes into the cost of a coworking franchise — franchise fee, build-out, FF&E, technology, working capital, and the ongoing royalty and marketing fees.",
    category: "Investment",
    date: "June 30, 2026",
    dateIso: "2026-06-30",
    readMinutes: 7,
    published: true,
  },
];

export const publishedInsights = insights.filter((p) => p.published);
