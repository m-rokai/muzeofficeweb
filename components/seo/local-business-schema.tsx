import { getLocation } from "@/lib/data/locations";
import { BRAND } from "@/lib/utils/constants";
import { JsonLd } from "@/components/seo/json-ld";

interface LocalBusinessSchemaProps {
  locationId: string;
}

export function LocalBusinessSchema({ locationId }: LocalBusinessSchemaProps) {
  const location = getLocation(locationId);
  if (!location) return null;

  const { address, geo, hours } = location;

  const openingHours: string[] = [];
  if (hours.weekdays) {
    openingHours.push(`Mo-Fr ${hours.weekdays.open}-${hours.weekdays.close}`);
  }

  // Build a location-rich description using the nearest landmark and a local cue
  const primaryLandmark = location.nearbyLandmarks[0];
  const landmarkPhrase = primaryLandmark
    ? ` ${primaryLandmark.distance} from ${primaryLandmark.name}.`
    : "";
  const localCue = location.localCues[0] ? ` ${location.localCues[0]}.` : "";

  const locationUrl = `${BRAND.url}/locations/${location.slug}`;
  const externalProfiles = location.externalProfiles ?? {};
  const sameAs = [
    BRAND.social.twitter,
    BRAND.social.facebook,
    BRAND.social.instagram,
    BRAND.social.linkedin,
    BRAND.social.tiktok,
    externalProfiles.yelp,
    externalProfiles.bbb,
    externalProfiles.gbp,
  ].filter((url): url is string => Boolean(url));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CoworkingSpace",
    "@id": `${locationUrl}#coworkingspace`,
    name: location.nickname,
    description: `Flexible coworking, virtual offices, private offices, meeting rooms, and event space in ${address.city}, ${address.state}.${landmarkPhrase}${localCue} Free parking, high-speed WiFi, on-site cafe, and month-to-month memberships with no long-term leases.`,
    image: `${BRAND.url}/images/spaces/${location.slug}.jpg`,
    url: locationUrl,
    telephone: location.phone !== "TBD" ? location.phone : undefined,
    email: location.email,
    parentOrganization: { "@id": `${BRAND.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street !== "TBD" ? address.street : undefined,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip !== "TBD" ? address.zip : undefined,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    areaServed: location.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    openingHoursSpecification: openingHours.length > 0
      ? {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: hours.weekdays?.open,
          closes: hours.weekdays?.close,
        }
      : undefined,
    priceRange: "$25-$899",
    sameAs,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "High-Speed WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Unlimited Coffee & Tea", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-Site Cafe", value: true },
      { "@type": "LocationFeatureSpecification", name: "Phone Booths", value: true },
      { "@type": "LocationFeatureSpecification", name: "Printing & Scanning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Biometric Access", value: true },
      { "@type": "LocationFeatureSpecification", name: "Conference Rooms", value: true },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Workspace Plans",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Day Pass",
            description: "Hot desk access for the day with WiFi, coffee, and free parking.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dedicated Desk",
            description: "Your own reserved desk with 24/7 access, storage, and mail handling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Office",
            description: "Enclosed, lockable office for 1-10 people, fully furnished.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Virtual Office",
            description: "Professional business address with mail handling and meeting room access.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Meeting Rooms",
            description: "Professional meeting spaces by the hour with AV equipment.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Event Space",
            description: "Host corporate events, workshops, and gatherings with full AV and catering.",
          },
        },
      ],
    },
  };

  return <JsonLd data={data} />;
}
