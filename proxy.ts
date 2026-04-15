import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "muzeoffice.com";
const LEGACY_WWW_HOST = "www.muzeoffice.com";

/**
 * Enforce a single canonical host so crawlers do not see both www and apex
 * variants as separate 200 URLs while our metadata points to the apex domain.
 */
export function proxy(request: NextRequest) {
  if (request.headers.get("host") === LEGACY_WWW_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}
