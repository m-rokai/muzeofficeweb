#!/usr/bin/env node
/**
 * Download all blog images from the old WordPress server via direct IP.
 *
 * DNS now points at Vercel, so we can't resolve muzeoffice.com to the old
 * server. Instead we connect to the old LiteSpeed server directly at its
 * IP and send the Host header so it serves the correct virtual host.
 *
 * Usage: node scripts/download-blog-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.join(__dirname, "blog-image-manifest.json");
const OUT_DIR = path.join(ROOT, "public", "images", "blog");
const OLD_WP_IP = "82.180.138.231";
const CONCURRENCY = 8;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

console.log(`Downloading ${manifest.length} images from ${OLD_WP_IP}…`);

let done = 0;
let failed = 0;
let skipped = 0;
const failures = [];

async function downloadOne({ source, local }) {
  const filename = path.basename(local);
  const outPath = path.join(OUT_DIR, filename);

  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
    skipped++;
    return;
  }

  // Rewrite the URL to strip any responsive size suffix (we want the original)
  // e.g., photo-300x200.jpg → photo.jpg at the source too
  let sourceUrl = source;
  try {
    const u = new URL(source);
    const basename = path.basename(u.pathname);
    const originalBasename = basename.replace(/-\d+x\d+(?=\.[a-z]+$)/i, "");
    if (basename !== originalBasename) {
      u.pathname = u.pathname.replace(basename, originalBasename);
      sourceUrl = u.toString();
    }
  } catch {
    // keep original
  }

  return new Promise((resolve) => {
    const args = [
      "-sS",
      "-L",
      "--max-time",
      "30",
      "--resolve",
      `muzeoffice.com:443:${OLD_WP_IP}`,
      "--resolve",
      `muzeoffice.com:80:${OLD_WP_IP}`,
      "-o",
      outPath,
      "-w",
      "%{http_code}",
      sourceUrl,
    ];
    const proc = spawn("curl", args);
    let httpCode = "";
    proc.stdout.on("data", (d) => {
      httpCode += d.toString();
    });
    let stderr = "";
    proc.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    proc.on("close", (code) => {
      const success = code === 0 && httpCode.trim().startsWith("2");
      if (success && fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
        done++;
      } else {
        failed++;
        failures.push({ source: sourceUrl, httpCode: httpCode.trim(), stderr: stderr.slice(0, 200) });
        if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
      }
      const total = done + failed + skipped;
      if (total % 10 === 0 || total === manifest.length) {
        console.log(`[${total}/${manifest.length}] done=${done} failed=${failed} skipped=${skipped}`);
      }
      resolve();
    });
  });
}

// Process in batches for concurrency
async function run() {
  for (let i = 0; i < manifest.length; i += CONCURRENCY) {
    const batch = manifest.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(downloadOne));
  }

  console.log(`\nResult: ${done} downloaded, ${skipped} already existed, ${failed} failed`);
  if (failures.length) {
    console.log(`\nFirst 10 failures:`);
    failures.slice(0, 10).forEach((f) => {
      console.log(`  ${f.source} → HTTP ${f.httpCode}`);
    });
  }
}

run();
