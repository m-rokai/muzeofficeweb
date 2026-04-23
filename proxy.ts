import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "muzeoffice.com";
const LEGACY_WWW_HOST = "www.muzeoffice.com";

/**
 * Runs before `redirects` in next.config do NOT resolve:
 *   1. Enforce apex host so crawlers do not see both www and apex variants
 *      as separate 200 URLs while our metadata points to the apex domain.
 *   2. Strip trailing slashes — replaces Next's built-in behavior, which is
 *      disabled via `skipTrailingSlashRedirect: true` so legacy WordPress
 *      `/foo/ → /bar` rules in next.config.ts can match before the slash is
 *      stripped (otherwise: two-hop chain `/foo/ → /foo → /bar`).
 *
 * Both checks are folded into a single 308 when they both apply.
 */
export function proxy(request: NextRequest) {
  // Use a plain URL instead of request.nextUrl.clone(): NextURL reapplies
  // the incoming request's trailing-slash flag in its href serializer, which
  // silently undoes pathname edits made here.
  const destination = new URL(request.url);
  let changed = false;

  if (request.headers.get("host") === LEGACY_WWW_HOST) {
    destination.protocol = "https:";
    destination.host = CANONICAL_HOST;
    changed = true;
  }

  if (
    destination.pathname.length > 1 &&
    destination.pathname.endsWith("/") &&
    !destination.pathname.startsWith("/api/") &&
    !destination.pathname.startsWith("/_next/")
  ) {
    destination.pathname = destination.pathname.replace(/\/+$/, "");
    changed = true;
  }

  if (changed) return NextResponse.redirect(destination, 308);
  return NextResponse.next();
}
