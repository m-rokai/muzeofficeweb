#!/usr/bin/env node
/**
 * WordPress WXR → MDX migration script
 *
 * Usage: node scripts/migrate-wxr.mjs <path-to-wxr.xml>
 *
 * Reads a WordPress eXtended RSS export, extracts all published blog posts,
 * converts Visual Composer + HTML content to Markdown, and writes MDX files
 * to content/blog/ with YAML frontmatter.
 *
 * Also writes scripts/blog-image-manifest.json listing every image URL
 * referenced by any post so the download step can fetch them.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "content", "blog");
const MANIFEST_PATH = path.join(__dirname, "blog-image-manifest.json");

const wxrPath = process.argv[2];
if (!wxrPath) {
  console.error("Usage: node scripts/migrate-wxr.mjs <path-to-wxr.xml>");
  process.exit(1);
}

const xml = fs.readFileSync(wxrPath, "utf8");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "__cdata",
  textNodeName: "#text",
  parseTagValue: false,
  trimValues: true,
  isArray: (name) => ["item", "category", "wp:postmeta"].includes(name),
});

const parsed = parser.parse(xml);
const channel = parsed.rss.channel;
const items = channel.item || [];

// Build author lookup: login → display name
const authorEls = Array.isArray(channel["wp:author"])
  ? channel["wp:author"]
  : channel["wp:author"]
  ? [channel["wp:author"]]
  : [];
const authors = {};
for (const a of authorEls) {
  const login = extractCdata(a["wp:author_login"]);
  const name = extractCdata(a["wp:author_display_name"]);
  if (login) authors[login] = name || login;
}

// Build attachment lookup: post_id → url
const attachments = {};
for (const it of items) {
  const postType = extractCdata(it["wp:post_type"]);
  if (postType === "attachment") {
    const id = extractCdata(it["wp:post_id"]);
    const url = extractCdata(it["wp:attachment_url"]);
    if (id && url) attachments[id] = url;
  }
}

// Turndown configured for blog content
const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
});

// Drop empty paragraphs
turndown.addRule("stripEmptyParagraphs", {
  filter: (node) =>
    node.nodeName === "P" && !node.textContent.trim() && !node.querySelector("img"),
  replacement: () => "",
});

// Gather all image URLs referenced anywhere
const imageManifest = new Set();

function extractCdata(node) {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (node.__cdata != null) return String(node.__cdata);
  if (node["#text"] != null) return String(node["#text"]);
  return "";
}

function getMeta(item, key) {
  const metas = item["wp:postmeta"] || [];
  const arr = Array.isArray(metas) ? metas : [metas];
  const m = arr.find((x) => extractCdata(x["wp:meta_key"]) === key);
  return m ? extractCdata(m["wp:meta_value"]) : "";
}

function getCategories(item) {
  const cats = item.category;
  if (!cats) return { categories: [], tags: [] };
  const arr = Array.isArray(cats) ? cats : [cats];
  const categories = [];
  const tags = [];
  for (const c of arr) {
    const domain = c["@_domain"];
    const value = extractCdata(c) || c["#text"] || "";
    if (domain === "category") categories.push(value);
    else if (domain === "post_tag") tags.push(value);
  }
  return { categories, tags };
}

/**
 * Strip WPBakery / Visual Composer shortcodes.
 * They look like [vc_row], [vc_column width="1/2"], [vc_column_text], etc.
 */
function stripShortcodes(html) {
  const vcTags = [
    "vc_row",
    "vc_column",
    "vc_column_text",
    "vc_row_inner",
    "vc_column_inner",
    "vc_empty_space",
    "vc_separator",
    "vc_single_image",
    "vc_btn",
    "vc_cta",
    "vc_tta_tabs",
    "vc_tta_section",
    "vc_custom_heading",
    "vc_toggle",
    "vc_raw_html",
  ];
  let out = html;
  for (const tag of vcTags) {
    out = out.replace(new RegExp(`\\[${tag}(?:\\s[^\\]]*)?\\]`, "gi"), "");
    out = out.replace(new RegExp(`\\[\\/${tag}\\]`, "gi"), "");
  }
  // [caption ...]...[/caption] → keep inner content (image + caption)
  out = out.replace(/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi, "$1");
  // Generic leftover shortcodes
  out = out.replace(/\[\/?[a-z_][a-z0-9_]*(?:\s[^\]]*)?\]/gi, "");
  return out;
}

/**
 * Extract image URLs from HTML content and record them in the manifest.
 */
function collectImageUrls(html) {
  const matches = html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  for (const m of matches) {
    imageManifest.add(m[1]);
  }
}

/**
 * Rewrite image URLs from WordPress uploads to local blog images path.
 * https://muzeoffice.com/wp-content/uploads/2024/05/photo.jpg
 *   → /images/blog/photo.jpg
 *
 * WordPress often includes responsive versions (-300x200) — we strip those
 * so multiple references all point to the same local file.
 */
function localizeImageUrl(url) {
  try {
    const u = new URL(url);
    if (!u.pathname.includes("/wp-content/uploads/")) return url;
    let filename = path.basename(u.pathname);
    filename = filename.replace(/-\d+x\d+(?=\.[a-z]+$)/i, "");
    return `/images/blog/${filename}`;
  } catch {
    return url;
  }
}

function htmlToMarkdown(html) {
  // 1. Strip Visual Composer shortcodes
  let cleaned = stripShortcodes(html);

  // 2. Collect image URLs BEFORE rewriting (we need the originals to download)
  collectImageUrls(cleaned);

  // 3. Rewrite image src to local paths
  cleaned = cleaned.replace(/<img([^>]+)src=["']([^"']+)["']([^>]*)>/gi, (_, pre, src, post) => {
    return `<img${pre}src="${localizeImageUrl(src)}"${post}>`;
  });

  // 4. Convert to markdown
  let md = turndown.turndown(cleaned);

  // 5. Cleanup: collapse 3+ newlines to 2
  md = md.replace(/\n{3,}/g, "\n\n").trim();

  return md;
}

/**
 * YAML-escape a string value for frontmatter.
 */
function yamlString(s) {
  if (s == null) return '""';
  const str = String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${str}"`;
}

function yamlArray(arr) {
  if (!arr || arr.length === 0) return "[]";
  return "[" + arr.map(yamlString).join(", ") + "]";
}

function excerptFromContent(md, maxLen = 200) {
  const plain = md
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_`>]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

// Process posts
let writtenCount = 0;
let skippedCount = 0;
const slugs = new Set();

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const item of items) {
  const postType = extractCdata(item["wp:post_type"]);
  const status = extractCdata(item["wp:status"]);
  if (postType !== "post" || status !== "publish") continue;

  const title = extractCdata(item.title) || "Untitled";
  let slug = extractCdata(item["wp:post_name"]);
  if (!slug) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  if (slugs.has(slug)) {
    let i = 2;
    while (slugs.has(`${slug}-${i}`)) i++;
    slug = `${slug}-${i}`;
  }
  slugs.add(slug);

  const pubDate = extractCdata(item["wp:post_date"]);
  const date = pubDate ? pubDate.split(" ")[0] : "";
  const creator = extractCdata(item["dc:creator"]);
  const author = authors[creator] || creator || "Muze Office";

  const { categories, tags } = getCategories(item);

  const contentHtml = extractCdata(item["content:encoded"]) || "";
  const markdown = htmlToMarkdown(contentHtml);

  if (!markdown.trim()) {
    skippedCount++;
    continue;
  }

  const yoastTitle = getMeta(item, "_yoast_wpseo_title");
  const yoastDesc = getMeta(item, "_yoast_wpseo_metadesc");
  const description = yoastDesc || excerptFromContent(markdown);

  // Featured image
  const thumbId = getMeta(item, "_thumbnail_id");
  let featuredImage = "";
  if (thumbId && attachments[thumbId]) {
    const originalUrl = attachments[thumbId];
    imageManifest.add(originalUrl);
    featuredImage = localizeImageUrl(originalUrl);
  }

  const frontmatter = [
    "---",
    `title: ${yamlString(title)}`,
    `slug: ${yamlString(slug)}`,
    `date: ${yamlString(date)}`,
    `author: ${yamlString(author)}`,
    `description: ${yamlString(description)}`,
    featuredImage ? `image: ${yamlString(featuredImage)}` : null,
    `categories: ${yamlArray(categories)}`,
    tags.length ? `tags: ${yamlArray(tags)}` : null,
    yoastTitle ? `seoTitle: ${yamlString(yoastTitle)}` : null,
    "---",
    "",
    markdown,
    "",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const outPath = path.join(OUT_DIR, `${slug}.mdx`);
  fs.writeFileSync(outPath, frontmatter);
  writtenCount++;
}

// Write image manifest for download step
const manifest = [...imageManifest]
  .filter((u) => u.startsWith("http"))
  .map((url) => ({
    source: url,
    local: localizeImageUrl(url),
  }))
  .reduce((acc, entry) => {
    if (!acc.some((e) => e.local === entry.local)) acc.push(entry);
    return acc;
  }, []);

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

console.log(`Wrote ${writtenCount} MDX posts to ${OUT_DIR}`);
console.log(`Skipped ${skippedCount} items`);
console.log(`Image manifest: ${manifest.length} unique images → ${MANIFEST_PATH}`);
