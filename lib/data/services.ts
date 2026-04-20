export interface ServiceTier {
  name: string;
  price: number | null;
  priceUnit: "month" | "hour" | "day" | "week";
  features: string[];
  highlighted?: boolean;
}

export interface Service {
  id: string;
  name: string;
  shortName: string;
  shortDescription: string;
  icon: string;
  tiers: ServiceTier[];
  includedAmenities: string[];
}

export const services: Service[] = [
  {
    id: "virtual-office",
    name: "Virtual Office",
    shortName: "Virtual Office",
    shortDescription:
      "A real business address for your LLC with mail handling, mail forwarding on upper tiers, and meeting room access. No lease required.",
    icon: "Mail",
    tiers: [
      {
        name: "Mail Holding",
        price: 39,
        priceUnit: "month",
        features: [
          "Professional business address with suite number",
          "USPS letter mail notification and pickup",
          "Use for LLC, Google Business, contracts",
          "No package receiving",
        ],
      },
      {
        name: "Sandstone",
        price: 69,
        priceUnit: "month",
        features: [
          "Everything in Mail Holding",
          "Package receiving (UPS, FedEx, Amazon)",
          "Signature-required mail accepted",
        ],
      },
      {
        name: "Opal",
        price: 149,
        priceUnit: "month",
        features: [
          "Everything in Sandstone",
          "Mail forwarding included",
          "4 coworking hours/month",
          "2 meeting room hours/month",
        ],
        highlighted: true,
      },
      {
        name: "Diamond",
        price: 249,
        priceUnit: "month",
        features: [
          "Everything in Opal",
          "20 coworking hours/month",
          "6 meeting room hours/month",
          "Dedicated local phone line",
        ],
      },
    ],
    includedAmenities: [
      "business-address",
      "mail-handling",
      "meeting-rooms",
      "coworking",
      "receptionist",
      "llc-ready",
    ],
  },
  {
    id: "coworking",
    name: "Coworking",
    shortName: "Coworking",
    shortDescription:
      "Flexible shared workspace with hot desks and dedicated desks. WiFi, coffee, parking, and community included.",
    icon: "Users",
    tiers: [
      {
        name: "Day Pass",
        price: 25,
        priceUnit: "day",
        features: [
          "Open desk in shared workspace",
          "High-speed WiFi",
          "Unlimited coffee and water",
          "Free parking",
        ],
      },
      {
        name: "Hot Desk",
        price: 350,
        priceUnit: "month",
        features: [
          "Shared desk access anytime",
          "Meeting room credits",
          "Mail handling",
          "Community events access",
        ],
        highlighted: true,
      },
      {
        name: "Dedicated Desk",
        price: 399,
        priceUnit: "month",
        features: [
          "Your own reserved desk",
          "Personal storage",
          "24/7 access",
          "Meeting room credits",
          "Business address and mail",
        ],
      },
    ],
    includedAmenities: [
      "wifi",
      "parking",
      "coffee",
      "cafe",
      "phone-booths",
      "printing",
      "biometric",
      "meeting-rooms",
    ],
  },
  {
    id: "private-office",
    name: "Private Office",
    shortName: "Private Office",
    shortDescription:
      "Furnished private offices with month-to-month terms. All utilities, WiFi, conference rooms, and parking included.",
    icon: "Lock",
    tiers: [
      {
        name: "Solo Office",
        price: null,
        priceUnit: "month",
        features: [
          "1 person",
          "Furnished desk, chair, storage",
          "Best for solo professionals and consultants",
        ],
      },
      {
        name: "Team Office",
        price: null,
        priceUnit: "month",
        features: [
          "2-4 people",
          "Furnished for small teams",
          "Best for startups and agencies",
        ],
        highlighted: true,
      },
      {
        name: "Custom Suite",
        price: null,
        priceUnit: "month",
        features: [
          "5+ people",
          "Flexible layout",
          "Best for growing companies",
        ],
      },
    ],
    includedAmenities: [
      "furnished",
      "wifi",
      "utilities",
      "mail-handling",
      "address",
      "cleaning",
      "meeting-rooms",
      "parking",
      "cafe",
      "biometric",
      "receptionist",
      "events",
    ],
  },
  {
    id: "meeting-rooms",
    name: "Meeting Rooms",
    shortName: "Meeting Rooms",
    shortDescription:
      "Professional meeting spaces available by the hour. AV equipment, video conferencing, and free parking included.",
    icon: "Presentation",
    tiers: [
      {
        name: "Huddle Room",
        price: 25,
        priceUnit: "hour",
        features: [
          "2-4 people",
          "Monitor, whiteboard, WiFi",
          "Quick syncs, 1-on-1 meetings",
        ],
      },
      {
        name: "Conference Room",
        price: 50,
        priceUnit: "hour",
        features: [
          "6-8 people",
          "Large display, video conferencing",
          "Client meetings, presentations",
        ],
        highlighted: true,
      },
      {
        name: "Boardroom",
        price: 75,
        priceUnit: "hour",
        features: [
          "10-14 people",
          "Dual screens, sound system",
          "Board meetings, workshops, depositions",
        ],
      },
    ],
    includedAmenities: [
      "av-equipment",
      "video-conferencing",
      "wifi",
      "parking",
      "whiteboards",
      "coffee",
      "receptionist",
      "flexible-setup",
    ],
  },
  {
    id: "event-space",
    name: "Event Space",
    shortName: "Event Space",
    shortDescription:
      "Host corporate events, workshops, and private gatherings. Full AV, flexible layouts, and on-site catering available.",
    icon: "CalendarDays",
    tiers: [
      {
        name: "Hourly",
        price: 50,
        priceUnit: "hour",
        features: [
          "Short meetings, workshops",
          "Full AV included",
          "Flexible layout",
        ],
      },
      {
        name: "Half-Day",
        price: 175,
        priceUnit: "day",
        features: [
          "4-hour block",
          "Workshops, training sessions",
          "Catering available",
        ],
        highlighted: true,
      },
      {
        name: "Full-Day",
        price: 300,
        priceUnit: "day",
        features: [
          "8-hour block",
          "Conferences, retreats",
          "Custom layout and catering",
        ],
      },
    ],
    includedAmenities: [
      "projector",
      "sound-system",
      "wifi",
      "parking",
      "flexible-seating",
      "catering",
      "climate",
      "coordinator",
    ],
  },
  {
    id: "airport-coworking",
    name: "Airport Coworking",
    shortName: "Airport Coworking",
    shortDescription:
      "Just 10 minutes from Harry Reid International. Day passes available — no membership required.",
    icon: "Plane",
    tiers: [
      {
        name: "Day Pass",
        price: 25,
        priceUnit: "day",
        features: [
          "Open desk, WiFi, coffee",
          "Free parking",
          "No membership required",
        ],
      },
      {
        name: "Meeting Room",
        price: 25,
        priceUnit: "hour",
        features: [
          "AV equipment included",
          "Book by the hour",
          "Professional setting",
        ],
        highlighted: true,
      },
    ],
    includedAmenities: [
      "wifi",
      "parking",
      "coffee",
      "cafe",
      "phone-booths",
      "printing",
      "biometric",
      "meeting-rooms",
    ],
  },
  {
    id: "convention-coworking",
    name: "Convention Coworking",
    shortName: "Convention Coworking",
    shortDescription:
      "In town for CES, SEMA, or NAB? Skip the hotel lobby — get a real workspace with fast WiFi and free parking.",
    icon: "Ticket",
    tiers: [
      {
        name: "Day Pass",
        price: 25,
        priceUnit: "day",
        features: [
          "Desk, WiFi, coffee, parking",
          "Walk in or book ahead",
          "No membership required",
        ],
      },
      {
        name: "Weekly Pass",
        price: null,
        priceUnit: "week",
        features: [
          "Unlimited access Mon-Fri",
          "Better value than daily",
          "In town for the full convention",
        ],
        highlighted: true,
      },
      {
        name: "Meeting Room",
        price: 25,
        priceUnit: "hour",
        features: [
          "Impress clients in a real conference room",
          "AV equipment included",
          "Not a hotel business center",
        ],
      },
    ],
    includedAmenities: [
      "wifi",
      "parking",
      "coffee",
      "cafe",
      "phone-booths",
      "meeting-rooms",
    ],
  },
  {
    id: "galleria-coworking",
    name: "Galleria Coworking",
    shortName: "Galleria Coworking",
    shortDescription:
      "Modern flexible workspace in Houston's Uptown district. Steps from Post Oak Blvd and the Galleria.",
    icon: "Building2",
    tiers: [
      {
        name: "Day Pass",
        price: null,
        priceUnit: "day",
        features: ["Desk, WiFi, coffee, parking"],
      },
      {
        name: "Hot Desk",
        price: null,
        priceUnit: "month",
        features: [
          "Shared desk, WiFi, coffee",
          "Meeting room credits",
          "Mail handling",
        ],
        highlighted: true,
      },
      {
        name: "Dedicated Desk",
        price: null,
        priceUnit: "month",
        features: [
          "Reserved desk, storage",
          "WiFi, coffee, meeting room credits",
          "Mail handling",
        ],
      },
    ],
    includedAmenities: [
      "wifi",
      "parking",
      "coffee",
      "cafe",
      "phone-booths",
      "meeting-rooms",
      "biometric",
      "events",
    ],
  },
  {
    id: "medical-center-coworking",
    name: "Medical Center Coworking",
    shortName: "Medical Center Coworking",
    shortDescription:
      "Flexible workspace for medical professionals, health tech startups, and researchers near the Texas Medical Center.",
    icon: "Stethoscope",
    tiers: [
      {
        name: "Day Pass",
        price: null,
        priceUnit: "day",
        features: ["Desk, WiFi, coffee, parking"],
      },
      {
        name: "Hot Desk",
        price: null,
        priceUnit: "month",
        features: [
          "Shared desk, WiFi, coffee",
          "Meeting room credits",
          "Mail handling",
        ],
        highlighted: true,
      },
      {
        name: "Dedicated Desk",
        price: null,
        priceUnit: "month",
        features: [
          "Reserved desk, storage",
          "HIPAA-aware private offices available",
          "Meeting room credits",
        ],
      },
    ],
    includedAmenities: [
      "wifi",
      "parking",
      "phone-booths",
      "meeting-rooms",
      "coffee",
      "cafe",
      "biometric",
      "hipaa",
    ],
  },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
