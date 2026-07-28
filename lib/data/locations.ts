export interface LocationAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Location {
  id: string;
  name: string;
  nickname: string;
  slug: string;
  status: "active" | "coming-soon";
  address: LocationAddress;
  geo: { lat: number; lng: number };
  phone: string;
  phoneRaw: string;
  email: string;
  hours: {
    is24Hours: boolean;
    weekdays: { open: string; close: string };
    weekends: null;
  };
  localCues: string[];
  /** Primary neighborhoods this location is physically in. */
  neighborhoods: string[];
  /** Wider service-area cities/neighborhoods used for `areaServed` markup. */
  areaServed: string[];
  nearbyLandmarks: { name: string; distance: string }[];
  services: string[];
  taxAdvantage: string;
  /** Verified Google Business Profile rating + review count. Set ONLY when
   *  confirmed against the live GBP — drives review stars and aggregateRating. */
  rating?: number;
  reviewCount?: number;
  /** External profile URLs for this specific location, used in JSON-LD `sameAs`. */
  externalProfiles?: {
    yelp?: string;
    bbb?: string;
    gbp?: string;
  };
}

export const locations: Location[] = [
  {
    id: "las-vegas",
    name: "Las Vegas",
    nickname: "Muze Office Paradise",
    slug: "las-vegas",
    status: "active",
    address: {
      street: "6860 Bermuda Rd, Suite 200",
      city: "Las Vegas",
      state: "NV",
      zip: "89119",
      country: "US",
    },
    // Approximate (~building-level) pin. schema.org GeoCoordinates is a weak
    // ranking signal — Google uses the GBP pin + geocoded street address for
    // map placement. Replace with the exact @lat,lng from the GBP listing URL
    // when available rather than a geocoder guess.
    geo: { lat: 36.065, lng: -115.17 },
    phone: "(702) 370-7515",
    phoneRaw: "+17023707515",
    email: "access@muzeoffice.com",
    hours: {
      is24Hours: true,
      weekdays: { open: "00:00", close: "23:59" },
      weekends: null,
    },
    localCues: [
      "Open 24/7",
      "10 minutes from Harry Reid International Airport",
      "Free parking",
      "Off I-215, away from Strip traffic",
      "South Las Vegas corridor, 89119",
      "Not a casino, not a hotel lobby — a real workspace",
    ],
    neighborhoods: ["Paradise", "South Las Vegas"],
    areaServed: [
      "Las Vegas",
      "Paradise",
      "Enterprise",
      "Spring Valley",
      "Henderson",
      "Summerlin",
      "Green Valley",
      "Sunrise Manor",
      "Whitney",
      "Winchester",
      "North Las Vegas",
    ],
    nearbyLandmarks: [
      { name: "Harry Reid International Airport", distance: "10 min" },
      { name: "I-15", distance: "5 min" },
      { name: "I-215", distance: "2 min" },
      { name: "Las Vegas Blvd", distance: "10 min" },
    ],
    services: [
      "virtual-office",
      "coworking",
      "day-pass",
      "hot-desk",
      "dedicated-desk",
      "flexible-workspaces",
      "private-office",
      "meeting-rooms",
      "conference-rooms",
      "event-space",
      "airport-coworking",
      "convention-coworking",
    ],
    taxAdvantage:
      "Nevada has no state income tax, no corporate income tax, and no franchise tax.",
    rating: 4.6,
    reviewCount: 11,
    externalProfiles: {
      yelp: "https://www.yelp.com/biz/muze-office-bermuda-las-vegas",
      gbp: "https://www.google.com/search?q=Muze+Office+Las+Vegas&kgmid=/g/11x2wpzbg_",
    },
  },
  {
    id: "houston",
    name: "Houston",
    nickname: "Muze Office Houston",
    slug: "houston",
    status: "coming-soon",
    address: {
      street: "1800 Augusta Dr",
      city: "Houston",
      state: "TX",
      zip: "77057",
      country: "US",
    },
    geo: { lat: 29.7573, lng: -95.4868 },
    phone: "TBD",
    phoneRaw: "TBD",
    email: "access@muzeoffice.com",
    hours: {
      is24Hours: false,
      weekdays: { open: "10:00", close: "19:00" },
      weekends: null,
    },
    localCues: [
      "Planned for the Galleria / Tanglewood area inside the 610 Loop",
      "Near Post Oak Blvd and the Houston Galleria",
      "Access from I-610 West Loop and Woodway Dr",
      "On-site parking is planned; final details will be confirmed before opening",
      "Flexible workspace options are planned; final terms are not active yet",
    ],
    neighborhoods: ["Galleria", "Tanglewood", "Uptown"],
    areaServed: [
      "Houston",
      "Galleria",
      "Tanglewood",
      "Uptown",
      "Memorial",
      "River Oaks",
      "Briargrove",
      "Bellaire",
      "Westchase",
      "Energy Corridor",
      "Inner Loop",
      "West Houston",
    ],
    nearbyLandmarks: [
      { name: "The Galleria", distance: "Nearby" },
      { name: "Post Oak Blvd", distance: "Nearby" },
      { name: "I-610 West Loop", distance: "Nearby" },
      { name: "Texas Medical Center", distance: "Check live traffic" },
      { name: "Downtown Houston", distance: "Check live traffic" },
      { name: "George Bush Intercontinental (IAH)", distance: "Check live traffic" },
      { name: "William P. Hobby (HOU)", distance: "Check live traffic" },
    ],
    services: [
      "virtual-office",
      "coworking",
      "day-pass",
      "hot-desk",
      "dedicated-desk",
      "flexible-workspaces",
      "private-office",
      "meeting-rooms",
      "conference-rooms",
      "event-space",
      "galleria-coworking",
      "medical-center-coworking",
    ],
    taxAdvantage: "Texas has no state personal income tax.",
    // Do not attach legacy Houston profiles until their old Kirby Dr NAP is
    // updated to the new Augusta Dr opening. Conflicting sameAs data would
    // blur the new location entity.
  },
];

export function getLocation(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}

export function getActiveLocations(): Location[] {
  return locations.filter((l) => l.status === "active");
}

export function getAllLocations(): Location[] {
  return locations;
}
