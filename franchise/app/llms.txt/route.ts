import { BRAND } from "@/lib/utils/constants";

export const dynamic = "force-static";

export function GET() {
  const u = BRAND.url;
  const text = `# Muze Office Franchise

> Franchise, investment, and partnership opportunities to operate a Muze Office flexible-workspace location (coworking, virtual offices, private offices, meeting rooms, event space).

## Key pages
- [The Opportunity](${u}/the-opportunity): why coworking is a strong business opportunity
- [The Model](${u}/the-model): what a Muze Office franchise includes
- [Investment & Fees](${u}/investment): costs, fees, and what's included
- [Franchisees](${u}/franchisees): operate a location
- [Investors](${u}/investors): invest as a capital partner
- [Partners](${u}/partners): convert your real estate
- [Why Muze](${u}/why-muze): how Muze compares
- [FAQ](${u}/faq)
- [Book a Discovery Call](${u}/discovery-call)

## Contact
- Email: ${BRAND.email}
- Phone: ${BRAND.phoneDisplay}
- Main brand: ${BRAND.mainSiteUrl}
`;
  return new Response(text, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
