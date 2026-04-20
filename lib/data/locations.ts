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
  hours: { weekdays: { open: string; close: string }; weekends: null };
  localCues: string[];
  neighborhoods: string[];
  nearbyLandmarks: { name: string; distance: string }[];
  services: string[];
  taxAdvantage: string;
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
    geo: { lat: 36.065, lng: -115.17 },
    phone: "(702) 370-7515",
    phoneRaw: "+17023707515",
    email: "access@muzeoffice.com",
    hours: {
      weekdays: { open: "10:00", close: "19:00" },
      weekends: null,
    },
    localCues: [
      "10 minutes from Harry Reid International Airport",
      "Free parking",
      "Off I-215, away from Strip traffic",
      "South Las Vegas corridor, 89119",
      "Not a casino, not a hotel lobby — a real workspace",
    ],
    neighborhoods: ["Paradise", "South Las Vegas"],
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
  },
  {
    id: "houston",
    name: "Houston",
    nickname: "Muze Office Houston",
    slug: "houston",
    status: "active",
    address: {
      street: "1800 Augusta Dr",
      city: "Houston",
      state: "TX",
      zip: "77057",
      country: "US",
    },
    geo: { lat: 29.7573, lng: -95.4868 },
    phone: "(702) 370-7515",
    phoneRaw: "+17023707515",
    email: "access@muzeoffice.com",
    hours: {
      weekdays: { open: "10:00", close: "19:00" },
      weekends: null,
    },
    localCues: [
      "Inside the 610 Loop in the Galleria / Tanglewood area",
      "Minutes from Post Oak Blvd and the Houston Galleria",
      "Easy access from I-610 West Loop and Woodway Dr",
      "Free parking on-site — no Post Oak garage fees",
      "Month-to-month flexibility in a market dominated by long leases",
    ],
    neighborhoods: ["Galleria", "Tanglewood", "Uptown"],
    nearbyLandmarks: [
      { name: "The Galleria", distance: "10 min" },
      { name: "Post Oak Blvd", distance: "5 min" },
      { name: "I-610 West Loop", distance: "3 min" },
      { name: "Texas Medical Center", distance: "15 min" },
      { name: "Downtown Houston", distance: "15 min" },
      { name: "George Bush Intercontinental (IAH)", distance: "25 min" },
      { name: "William P. Hobby (HOU)", distance: "25 min" },
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
