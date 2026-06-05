export interface FAQ {
  question: string;
  answer: string;
}

export type FAQsByService = Record<string, FAQ[]>;

const virtualOfficeFAQs: FAQ[] = [
  {
    question: "Do I get a real street address or a PO Box?",
    answer:
      "You get a real street address with a suite number — not a PO Box. You can use it on your website, business cards, LLC filings, and Google Business Profile. Our address is 6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119.",
  },
  {
    question: "Can I use this address to register my LLC?",
    answer:
      "Yes. Our address works for LLC registration, business licensing, Google Business Profile verification, and contracts. Note that a Nevada registered agent (the person or service authorized to receive legal service of process for your LLC) is a separate role — if you need one, you can pair a registered agent service with your Muze Office virtual office.",
  },
  {
    question: "How does mail handling work?",
    answer:
      "We receive your mail at your suite address. You get a notification when mail arrives, and you can pick it up during business hours. Our Opal and Diamond plans also include mail forwarding to any address you choose.",
  },
  {
    question: "Do virtual office plans include meeting room access?",
    answer:
      "Yes. The Opal plan includes 2 meeting room hours per month, and the Diamond plan includes 6 hours per month. Additional hours can be booked at our standard hourly rate. All rooms include AV equipment and video conferencing.",
  },
  {
    question: "Are there long-term contracts?",
    answer:
      "No. All virtual office plans are month-to-month with no long-term commitment required. You can upgrade, downgrade, or cancel with 30 days' notice.",
  },
  {
    question: "What's included in each virtual office package?",
    answer:
      "Mail Holding ($39/mo): professional Las Vegas business address with suite number, USPS letter mail pickup, and LLC/Google Business registration — letters only, no packages. Sandstone ($69/mo): adds package receiving from UPS, FedEx, and Amazon plus signature-required mail. Opal ($149/mo): adds mail forwarding, 4 coworking hours, and 2 meeting room hours. Diamond ($249/mo): adds 20 coworking hours, 6 meeting room hours, and a dedicated local phone line.",
  },
  {
    question: "What's the difference between a virtual office and a PO Box?",
    answer:
      "A PO Box gives you a box number at the post office — it can't be used for LLC registration, and it looks unprofessional on a business card. A virtual office gives you a real street address with a suite number, plus access to meeting rooms, coworking, and a receptionist. It's a professional business presence without renting a full office.",
  },
];

const coworkingFAQs: FAQ[] = [
  {
    question: "What are the coworking hours?",
    answer:
      "Our coworking space is open Monday through Friday, 10 AM to 7 PM. Dedicated desk members with 24/7 access can use the space anytime via biometric entry.",
  },
  {
    question: "Is parking free?",
    answer:
      "Yes. We provide free parking for all coworking members and day pass visitors. No garage fees, no meters, no hassle.",
  },
  {
    question: "What memberships are available?",
    answer:
      "We offer three options: Day Pass ($25/day) for drop-in walk-in access during front-desk hours, Hot Desk ($350/mo) for any-desk 24/7 biometric access with meeting room credits and mail handling, and Dedicated Desk ($399/mo) which adds a reserved desk, personal storage, and a business address with mail.",
  },
  {
    question: "Can I book a meeting room as a coworking member?",
    answer:
      "Yes. Hot Desk and Dedicated Desk members receive meeting room credits each month. You can also book additional hours at our standard hourly rate. Rooms include AV equipment and video conferencing.",
  },
  {
    question: "Do you offer day passes?",
    answer:
      "Yes. A Day Pass is $25 and includes an open desk in the shared workspace, high-speed WiFi, unlimited coffee and water, and free parking. No membership or commitment required.",
  },
  {
    question: "What amenities are included?",
    answer:
      "All coworking plans include high-speed WiFi, unlimited coffee and water, free parking, access to phone booths, printing, and our on-site cafe. Hot Desk and Dedicated Desk plans also include meeting room credits and mail handling.",
  },
];

const meetingRoomFAQs: FAQ[] = [
  {
    question: "What AV equipment is included?",
    answer:
      "Every meeting room includes a large display or monitor, video conferencing capability, high-speed WiFi, and whiteboards. The Boardroom adds dual screens and a sound system. No need to bring your own equipment.",
  },
  {
    question: "How do I book a meeting room?",
    answer:
      "For Las Vegas meeting rooms, book online directly from the Las Vegas Meeting Rooms page — select room size, date, and time for instant confirmation. For Houston meeting rooms, use our contact form or call us to reserve. Walk-in bookings are available based on availability at both locations.",
  },
  {
    question: "Is catering available for meetings?",
    answer:
      "Yes. Our on-site Muze Cafe can provide coffee service, snacks, and catered lunch for your meetings. Let us know when you book and we'll coordinate the details.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "You can cancel or reschedule your meeting room booking up to 24 hours in advance at no charge. Cancellations within 24 hours may be subject to a fee.",
  },
  {
    question: "What room sizes and capacities are available?",
    answer:
      "We offer three sizes: Huddle Room (2-4 people, $25/hr) for quick syncs and 1-on-1s, Conference Room (6-8 people, $50/hr) for client meetings and presentations, and Boardroom (10-14 people, $75/hr) for board meetings, workshops, and depositions.",
  },
  {
    question: "Is parking included?",
    answer:
      "Yes. Free parking is included for you and all your meeting attendees. No validation needed — just pull in and park.",
  },
];

const conferenceRoomFAQs: FAQ[] = [
  {
    question: "What is the difference between a Conference Room and a Boardroom at Muze Office?",
    answer:
      "The Conference Room ($50/hr) seats 6-8 around a single table with a large display and video conferencing — the right fit for client pitches, sales meetings, and team presentations. The Boardroom ($75/hr) seats 10-14 with dual screens and a sound system — built for board meetings, workshops, and legal depositions where the formality matters.",
  },
  {
    question: "What AV equipment is included in every conference room?",
    answer:
      "Every conference room includes a large display, video conferencing capability, high-speed WiFi, and whiteboards. The Boardroom adds dual screens and a sound system. You do not need to bring your own equipment.",
  },
  {
    question: "Can I host a legal deposition or mediation in a conference room?",
    answer:
      "Yes. The Boardroom is sized for depositions, mediations, and sworn testimony with up to 14 seats, dual screens for exhibit review, and a sound system that handles recorded testimony. Free parking is available for witnesses, counsel, and the court reporter.",
  },
  {
    question: "How do I book a conference room?",
    answer:
      "Reserve a conference room by the hour through our contact form or by calling (702) 370-7515. Same-day bookings are usually possible outside of peak hours. Virtual office and coworking members already have monthly meeting room credits that can cover part or all of a booking.",
  },
  {
    question: "Is catering available for conference-room meetings?",
    answer:
      "Yes. Our on-site Muze Cafe provides coffee service, pastries, sandwich trays, and full lunch — coordinated with your booking so setup is handled before your attendees arrive.",
  },
  {
    question: "Is parking included for attendees?",
    answer:
      "Yes. Free parking is included for you and every attendee — no validation needed, no valet fees. This is a common differentiator from hotel conference rooms on the Strip or in the Galleria that charge attendees to park.",
  },
];

const eventSpaceFAQs: FAQ[] = [
  {
    question: "What is the capacity of the event space?",
    answer:
      "Our event space accommodates up to 50 people in a theater-style layout, or 30-40 in a classroom or banquet configuration. We offer flexible layouts to match your event format.",
  },
  {
    question: "Is catering available?",
    answer:
      "Yes. Our on-site Muze Cafe provides full catering services — from coffee and pastries for morning workshops to full lunch spreads for all-day events. Custom menus available upon request.",
  },
  {
    question: "Is parking included for event guests?",
    answer:
      "Yes. Free parking is available for all event attendees. No valet fees or garage charges. Easy in, easy out.",
  },
  {
    question: "What AV equipment is provided?",
    answer:
      "The event space includes a projector, sound system, high-speed WiFi, and microphones. We also provide flexible seating configurations and an on-site event coordinator to help with setup.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2 weeks in advance for longer events (workshops, training sessions, retreats, all-day sessions). Shorter hourly bookings can often be accommodated on shorter notice. Contact us for availability.",
  },
  {
    question: "What are the pricing options?",
    answer:
      "Event space is billed hourly, with rates starting at $99/hr — the exact rate depends on which room you book. Bookings of 8 hours or more automatically get a flat 10% discount. There are no separate half-day or full-day packages — you pay for the hours you need. All rates include full AV (projector, sound system, wireless mics) and flexible seating layouts.",
  },
];

const airportCoworkingFAQs: FAQ[] = [
  {
    question: "How far is Muze Office from the airport?",
    answer:
      "Muze Office is approximately 10 minutes by car from Harry Reid International Airport (LAS). We're located at 6860 Bermuda Rd, Suite 200, just off I-215.",
  },
  {
    question: "Can I store my luggage while I work?",
    answer:
      "Yes. We have a secure area where day pass visitors can store luggage while they work. Your belongings stay safe while you get things done.",
  },
  {
    question: "What are the hours?",
    answer:
      "Our coworking space is open Monday through Friday, 10 AM to 7 PM. Just drop in with a day pass — no membership or reservation required.",
  },
  {
    question: "Is parking free?",
    answer:
      "Yes. Free parking is included for all visitors. No meters, no garage fees. Much better than paying $40+ at a hotel parking garage.",
  },
  {
    question: "Do I need a membership?",
    answer:
      "No. Our Day Pass ($25) gives you full access for the day — desk, WiFi, coffee, and parking. No membership, no commitment. Just walk in or book ahead.",
  },
  {
    question: "Can I book a meeting room?",
    answer:
      "Yes. Meeting rooms are available from $25/hr with AV equipment included. Book online or walk in based on availability. Great for meeting a client before your flight.",
  },
];

const conventionCoworkingFAQs: FAQ[] = [
  {
    question: "Can I book during major conventions like CES?",
    answer:
      "Yes. We stay open and available during major Las Vegas conventions including CES, SEMA, NAB, and MAGIC. We recommend booking ahead during peak convention weeks as demand is high.",
  },
  {
    question: "How far are you from the Las Vegas Convention Center?",
    answer:
      "We're approximately 15-20 minutes from the Las Vegas Convention Center via I-15 or I-215. Away from Strip traffic, with free parking when you arrive.",
  },
  {
    question: "Do you offer weekly passes for convention attendees?",
    answer:
      "Yes. Our Weekly Pass gives you unlimited access Monday through Friday — better value than buying daily passes. Pricing is available upon request. Contact us for convention-week rates.",
  },
  {
    question: "What makes this better than a hotel business center?",
    answer:
      "Real desks with ergonomic chairs, high-speed dedicated WiFi (not shared with hotel guests), free parking, phone booths for calls, and actual meeting rooms with AV equipment. Not a cramped corner of a lobby.",
  },
  {
    question: "Do I need to reserve in advance?",
    answer:
      "Walk-ins are welcome, but we recommend booking ahead during major convention weeks. Day passes and meeting rooms can be reserved online or through the Muze Office app.",
  },
  {
    question: "Is there parking?",
    answer:
      "Yes. Free parking for all visitors. While convention hotels charge $30-50 for parking, ours is complimentary.",
  },
];

const galleriaCoworkingFAQs: FAQ[] = [
  {
    question: "Where exactly is the Houston Galleria location?",
    answer:
      "Our Houston location will be near the Galleria / Uptown district, accessible from I-610 West Loop and close to Post Oak Blvd. Exact address to be announced.",
  },
  {
    question: "What memberships will be available?",
    answer:
      "We'll offer Day Passes, Hot Desk monthly memberships, and Dedicated Desk monthly memberships — the same flexible options as our Las Vegas location. Pricing will be announced closer to opening.",
  },
  {
    question: "Is parking included?",
    answer:
      "Yes. Free parking is included for all members and day pass visitors at our Houston Galleria location — no Post Oak garage fees.",
  },
  {
    question: "Where is the Houston location?",
    answer:
      "1800 Augusta Dr, Houston, TX 77057 — inside the 610 Loop in the Galleria / Tanglewood area, minutes from Post Oak Blvd and the Houston Galleria.",
  },
  {
    question: "Are meeting rooms available?",
    answer:
      "Yes. Our Houston location offers huddle rooms, conference rooms, and a boardroom — all equipped with AV and video conferencing and bookable by the hour.",
  },
  {
    question: "Can I use my Las Vegas membership in Houston?",
    answer:
      "We offer multi-city membership options so members can work from either Las Vegas or Houston. Contact us for details.",
  },
];

const medicalCenterCoworkingFAQs: FAQ[] = [
  {
    question: "How close is the space to the Texas Medical Center?",
    answer:
      "Our Houston location will be approximately 15 minutes from the Texas Medical Center, accessible via I-610 West Loop.",
  },
  {
    question: "Are HIPAA-aware private offices available?",
    answer:
      "Yes. We'll offer private offices suitable for telehealth consultations and other healthcare-related work that requires additional privacy considerations.",
  },
  {
    question: "Is this space designed for medical professionals?",
    answer:
      "While our space is open to all professionals, we've designed it with medical professionals, health-tech startups, and researchers in mind. Features include private phone booths, quiet work areas, and HIPAA-aware office options.",
  },
  {
    question: "Will there be day passes available?",
    answer:
      "Yes. Day passes will be available for medical professionals who need flexible workspace near the Medical Center without a monthly commitment.",
  },
  {
    question: "Where is this Houston location?",
    answer:
      "1800 Augusta Dr, Houston, TX 77057 — inside the 610 Loop, approximately 15 minutes from the Texas Medical Center via I-610 West Loop.",
  },
  {
    question: "What amenities will be included?",
    answer:
      "High-speed WiFi, parking, coffee, phone booths, meeting rooms, biometric access, and an on-site cafe. Dedicated desk members will also get mail handling and personal storage.",
  },
];

const privateOfficeFAQs: FAQ[] = [
  {
    question: "Are private offices furnished?",
    answer:
      "Yes. Every private office comes fully furnished with desks, ergonomic chairs, and storage. Just bring your laptop and you're ready to work on day one.",
  },
  {
    question: "What's included in the monthly rate?",
    answer:
      "Everything. WiFi, utilities, cleaning, mail handling, a professional business address, meeting room credits, free parking, access to the on-site cafe, and community events. No hidden fees.",
  },
  {
    question: "Are there long-term lease requirements?",
    answer:
      "No. All private offices are month-to-month. No long-term lease, no penalty for leaving. Upgrade, downgrade, or cancel anytime.",
  },
  {
    question: "What sizes are available?",
    answer:
      "Solo Office (1 person) for independent professionals, Team Office (2-4 people) for small teams and startups, and Custom Suite (5+ people) with flexible layouts for growing companies. Contact us for pricing and availability.",
  },
  {
    question: "Is 24/7 access available?",
    answer:
      "Yes. All private office members have 24/7 access via biometric entry. Work on your own schedule — early mornings, late nights, weekends.",
  },
  {
    question: "Can I bring clients to the office?",
    answer:
      "Absolutely. Your clients check in with our receptionist and meet you in a professional environment. Meeting room credits are included with your plan for larger groups.",
  },
];

const dayPassFAQs: FAQ[] = [
  {
    question: "How much does a Day Pass cost at Muze Office?",
    answer:
      "A Day Pass is $25. That covers a desk in the shared coworking area, high-speed WiFi, unlimited coffee and water, free parking, phone-booth access, printing, and access to the on-site Muze Cafe. Meeting rooms are a separate booking at $25-$75/hour.",
  },
  {
    question: "Do I need a membership or reservation to use a Day Pass?",
    answer:
      "No. Day Passes are walk-in. Show up Monday through Friday between 10am and 7pm at your Muze Office location, show your ID at the front desk, pay $25, and you're at a working desk within five minutes. Contact the front desk if you want to lock in a spot during a particularly busy week.",
  },
  {
    question: "What are the Day Pass hours?",
    answer:
      "Day Pass walk-ins are Monday through Friday, 10am to 7pm — that's when the front desk is staffed to check you in and process your $25. Any monthly coworking membership (Hot Desk, Dedicated Desk, or Private Office) includes 24/7 biometric access; the limited hours apply only to walk-in Day Passes.",
  },
  {
    question: "Is parking free with a Day Pass?",
    answer:
      "Yes. Free parking is included for every Day Pass visitor — no meters, no valet, no garage fees.",
  },
  {
    question: "What's the difference between a Day Pass and a Hot Desk membership?",
    answer:
      "A Day Pass is $25 per day with no commitment — right for drop-in use during front-desk hours. A Hot Desk is $350/month for any-desk 24/7 biometric access, plus meeting room credits, mail handling, and community events. The math flips in Hot Desk's favor around the 14th-15th day per month. If you're in the space more than about a week a month, Hot Desk is usually the better deal — and you also get late-night and weekend access that Day Pass doesn't include.",
  },
];

const hotDeskFAQs: FAQ[] = [
  {
    question: "What's included with a Hot Desk membership?",
    answer:
      "A Hot Desk at $350/month includes any-desk 24/7 biometric access in the coworking area, monthly meeting room credits, mail handling, community-event access, phone booths, printing, unlimited coffee, on-site Muze Cafe, and free parking. Month-to-month with 30 days' notice to cancel.",
  },
  {
    question: "Is a Hot Desk 24/7?",
    answer:
      "Yes. Hot Desk members get 24/7 biometric access just like every other monthly coworking tier. The front desk is staffed Monday through Friday, 10am to 7pm for walk-ins and day passes, but Hot Desk members come and go anytime via biometric entry. The upgrade to Dedicated Desk at $399/month is about a reserved desk, personal storage, and a business address — not hours.",
  },
  {
    question: "Do I get my own reserved desk with a Hot Desk?",
    answer:
      "No. Hot Desk is any-desk access — you sit wherever is open in the shared coworking area each day. If you want a reserved desk you can leave a monitor and keyboard on, plus personal storage and a business address with mail, upgrade to Dedicated Desk at $399/month.",
  },
  {
    question: "Do Hot Desk members get a business address?",
    answer:
      "Hot Desk includes mail handling at your Muze Office location — you can receive LLC, tax, and business correspondence there and pick it up while the front desk is staffed (Mon–Fri 10am–7pm). A formal business-address-only product (with package receiving and mail forwarding) is the Virtual Office tier. Dedicated Desk ($399/mo) bundles a business address as part of the tier.",
  },
  {
    question: "How many meeting room hours come with Hot Desk?",
    answer:
      "Hot Desk includes monthly meeting room credits that you can apply to any room type — Huddle Room ($25/hr), Conference Room ($50/hr), or Boardroom ($75/hr). Additional hours beyond the credits are available at standard hourly rates. Credits don't roll over month-to-month.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Hot Desk is month-to-month with 30 days' notice to cancel. No setup fees, no personal guaranty, no 12-month commitment. You can pause a month if you're traveling — just let the team know in advance.",
  },
];

const dedicatedDeskFAQs: FAQ[] = [
  {
    question: "What's included with a Dedicated Desk membership?",
    answer:
      "A Dedicated Desk at $399/month includes everything in Hot Desk — 24/7 biometric access, meeting room credits, mail handling, phone booths, WiFi, coffee, parking, community events — plus a reserved desk that's yours every day, personal storage, and a business address with mail you can use for LLC filings, Google Business Profile, and contracts.",
  },
  {
    question: "How is the 24/7 access provided?",
    answer:
      "Via biometric entry — every monthly coworking member (Hot Desk, Dedicated Desk, or Private Office) is enrolled on their first day, and once that's set up you have 24/7 access to the building via the side entrance. Day Pass walk-ins use the front entrance during staffed hours (Mon–Fri 10am–7pm).",
  },
  {
    question: "Is the business address real, or a PO Box?",
    answer:
      "It's a real commercial suite address at your Muze Office location — not a PO Box. Accepted by the Secretary of State for LLC filings, usable on Google Business Profile, and usable on contracts. Some members drop a separate Virtual Office subscription when they move up to Dedicated Desk because the mail-and-address piece is already bundled in.",
  },
  {
    question: "What's the difference between Dedicated Desk and a Private Office?",
    answer:
      "A Dedicated Desk is a reserved seat in the open coworking area — community, shared noise level, no walls. A Private Office is a furnished, lockable room with walls and a door — right for members who need wall privacy for confidential client calls or regulatory reasons. Most members who don't close a door for more than an hour or two a week stay on Dedicated Desk; those who need wall privacy most days move to a Private Office.",
  },
  {
    question: "Can I leave equipment on my desk overnight?",
    answer:
      "Yes. That's the point of a Dedicated Desk — leave a monitor, keyboard, headphones, and personal items between sessions. Personal storage is included for anything that doesn't fit on the desk surface.",
  },
  {
    question: "Is Dedicated Desk month-to-month?",
    answer:
      "Yes. Month-to-month with 30 days' notice to cancel. No setup fees, no personal guaranty, no long-term lease. If you outgrow the shared area and need walls, the upgrade path to Private Office is clean.",
  },
];

const houstonVirtualOfficeFAQs: FAQ[] = [
  {
    question: "Do I get a real street address or a PO Box?",
    answer:
      "You get a real street address with a suite number — not a PO Box. You can use it on your website, business cards, LLC filings, and Google Business Profile. Our Houston address is 1800 Augusta Dr, Houston, TX 77057 — inside the 610 Loop in the Galleria / Tanglewood area.",
  },
  {
    question: "Can I use this address to register my Texas LLC?",
    answer:
      "Yes. Our Houston address works for Texas LLC registration with the Secretary of State, business licensing, Google Business Profile verification, and contracts. Note that a Texas registered agent (the person or service authorized to receive legal service of process for your LLC) is a separate role — if you need one, you can pair a registered agent service with your Muze Office Houston virtual office.",
  },
  {
    question: "How does mail handling work?",
    answer:
      "We receive your mail at your suite address. You get a notification when mail arrives, and you can pick it up during business hours. Our Opal and Diamond plans also include mail forwarding to any address you choose.",
  },
  {
    question: "Do virtual office plans include meeting room access?",
    answer:
      "Yes. The Opal plan includes 2 meeting room hours per month, and the Diamond plan includes 6 hours per month. Additional hours can be booked at our standard hourly rate. All rooms include AV equipment and video conferencing.",
  },
  {
    question: "Are there long-term contracts?",
    answer:
      "No. All virtual office plans are month-to-month with no long-term commitment required. You can upgrade, downgrade, or cancel with 30 days' notice.",
  },
  {
    question: "What's included in each virtual office package?",
    answer:
      "Mail Holding ($39/mo): professional Houston business address with suite number, USPS letter mail pickup, and LLC/Google Business registration — letters only, no packages. Sandstone ($69/mo): adds package receiving from UPS, FedEx, and Amazon plus signature-required mail. Opal ($149/mo): adds mail forwarding, 4 coworking hours, and 2 meeting room hours. Diamond ($249/mo): adds 20 coworking hours, 6 meeting room hours, and a dedicated local phone line.",
  },
  {
    question: "What's the difference between a virtual office and a PO Box?",
    answer:
      "A PO Box gives you a box number at the post office — it can't be used for LLC registration, and it looks unprofessional on a business card. A virtual office gives you a real street address with a suite number, plus access to meeting rooms, coworking, and a receptionist. It's a professional business presence without renting a full office.",
  },
  {
    question: "How close is Muze Office to Houston airports?",
    answer:
      "About 25 minutes by car from George Bush Intercontinental (IAH) and 25 minutes from William P. Hobby (HOU). The 1800 Augusta Dr location sits inside the 610 Loop in the Galleria area, making fly-in client meetings practical from either airport.",
  },
];

/** Map service IDs to their FAQ arrays. Keys can be either a bare service ID
 *  (default for that service across all cities) or a city-prefixed key
 *  ("<locationId>-<serviceId>") for a city-specific override. */
export const faqsByService: FAQsByService = {
  "virtual-office": virtualOfficeFAQs,
  "houston-virtual-office": houstonVirtualOfficeFAQs,
  coworking: coworkingFAQs,
  "day-pass": dayPassFAQs,
  "hot-desk": hotDeskFAQs,
  "dedicated-desk": dedicatedDeskFAQs,
  "private-office": privateOfficeFAQs,
  "meeting-rooms": meetingRoomFAQs,
  "conference-rooms": conferenceRoomFAQs,
  "event-space": eventSpaceFAQs,
  "airport-coworking": airportCoworkingFAQs,
  "convention-coworking": conventionCoworkingFAQs,
  "galleria-coworking": galleriaCoworkingFAQs,
  "medical-center-coworking": medicalCenterCoworkingFAQs,
};

/** Get FAQs for a given service ID, with optional city-specific override.
 *  Looks up "<cityId>-<serviceId>" first; falls back to "<serviceId>". */
export function getFAQsForService(
  serviceId: string,
  cityId?: string,
): FAQ[] {
  if (cityId) {
    const cityServiceKey = `${cityId}-${serviceId}`;
    const cityOverride = faqsByService[cityServiceKey];
    if (cityOverride) return cityOverride;
  }
  return faqsByService[serviceId] ?? [];
}

/* ── Page-scoped FAQs (for pages that aren't a single service) ─────────
 *
 * The city-service dynamic route already surfaces FAQs via
 * `faqsByService`. These arrays cover other top pages that previously
 * had no FAQPage schema — the /workspace-memberships comparison page,
 * the /locations overview, and the /locations/las-vegas city page.
 * Each answer below is grounded in lib/data/services.ts or
 * lib/data/locations.ts — no fabrication.
 */

const workspaceMembershipsFAQs: FAQ[] = [
  {
    question: "What workspace memberships does Muze Office offer?",
    answer:
      "Muze Office offers five workspace types in Las Vegas: Virtual Office (from $39/mo) for a business address and mail, Coworking (Day Pass $25, Hot Desk $350/mo, Dedicated Desk $399/mo), Private Office (contact for pricing) for 1–5+ person teams, Meeting Rooms (from $25/hr), and Event Space (from $99/hr). All memberships are month-to-month.",
  },
  {
    question: "Which membership is right for me?",
    answer:
      "If you need an address only, start with Virtual Office. If you need desk space for the day, get a Day Pass. If you're in the space regularly, Hot Desk or Dedicated Desk. If you need a private, lockable room for your team, book a tour of the Private Offices. If you're hosting clients or meetings occasionally, book Meeting Rooms by the hour.",
  },
  {
    question: "Are memberships month-to-month, or is there a contract?",
    answer:
      "Virtual Office, Coworking, and Private Office memberships are month-to-month — no long-term lease, no personal guaranty, no setup fees — cancellable with 30 days' notice. Meeting Rooms and Event Space are booked hourly or by package; see those pages for cancellation windows.",
  },
  {
    question: "What's included with every membership?",
    answer:
      "In-space plans (Coworking and Private Office) include free parking and high-speed WiFi; Coworking adds unlimited coffee, Muze Cafe access, and meeting room credits, and Dedicated Desk adds 24/7 biometric entry and a business address. Private Office bundles all of the above plus utilities, cleaning, and receptionist. Virtual Office centers on address and mail handling — see each service page for the per-tier breakdown.",
  },
  {
    question: "Is there free parking for members and visitors?",
    answer:
      "Yes. Parking is free for all members, day pass holders, meeting room guests, and event attendees. No meters, no valet fees, no garage charges.",
  },
  {
    question: "Can I try the space before committing to a membership?",
    answer:
      "Yes. Book a free tour or grab a $25 Day Pass — no membership required. You'll get full access to the coworking area, WiFi, coffee, and free parking for the day.",
  },
];

const locationsOverviewFAQs: FAQ[] = [
  {
    question: "Where is Muze Office located?",
    answer:
      "Open in Las Vegas at 6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119 (10 minutes from Harry Reid International Airport, off I-215). A second flagship is opening in Houston in 2026 at 1800 Augusta Dr, Houston, TX 77057 (inside the 610 Loop in the Galleria / Tanglewood area).",
  },
  {
    question: "Which cities are open?",
    answer:
      "Las Vegas is open now and accepting members, day pass visitors, and meeting room bookings at 6860 Bermuda Rd, Suite 200. Houston opens in 2026 — join the waitlist for early access and founding-member pricing.",
  },
  {
    question: "How do I find the Houston location?",
    answer:
      "1800 Augusta Dr, Houston, TX 77057 — inside the 610 Loop in the Galleria / Tanglewood area, minutes from Post Oak Blvd, 15 minutes from the Texas Medical Center, and 25 minutes from George Bush Intercontinental (IAH) and William P. Hobby (HOU).",
  },
  {
    question: "Do you offer multi-city memberships?",
    answer:
      "Yes. Multi-city membership options are available so members can work from either Las Vegas or Houston. Contact us for details.",
  },
  {
    question: "Is parking available at each location?",
    answer:
      "Yes. Free parking is included at our Las Vegas location for all members, day pass visitors, meeting room guests, and event attendees. Houston will also include parking when it opens.",
  },
  {
    question: "How do I schedule a tour?",
    answer:
      "For Las Vegas, book a free tour through our booking page or call (702) 370-7515. For Houston, reach out via our contact page to join the waitlist and get notified about pre-opening tours.",
  },
];

const lasVegasLocationFAQs: FAQ[] = [
  {
    question: "What is the address for Muze Office Las Vegas?",
    answer:
      "6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119. It's a real commercial suite — not a PO Box or mail-drop storefront — off I-215 in the South Las Vegas corridor.",
  },
  {
    question: "How far is Muze Office from Harry Reid International Airport?",
    answer:
      "About 10 minutes by car from Harry Reid International Airport (LAS), just off I-215. Easy for fly-in client meetings and same-day business trips.",
  },
  {
    question: "What are your hours in Las Vegas?",
    answer:
      "The space is staffed Monday through Friday, 10 AM to 7 PM. Dedicated Desk and Private Office members have 24/7 access via biometric entry.",
  },
  {
    question: "Is there free parking at the Las Vegas location?",
    answer:
      "Yes. Parking is free for every member, day pass visitor, meeting room guest, and event attendee. No meters, no valet, no garage fees.",
  },
  {
    question: "What services are available at Muze Office Las Vegas?",
    answer:
      "Virtual Office (from $39/mo), Coworking (Day Pass $25, Hot Desk $350/mo, Dedicated Desk $399/mo), Private Office (contact for pricing), Meeting Rooms (from $25/hr), and Event Space (from $99/hr). All month-to-month.",
  },
  {
    question: "Does Nevada have state income tax?",
    answer:
      "No. Nevada has no state income tax, no corporate income tax, and no franchise tax. This is one reason many out-of-state founders register their LLC at a Nevada address like Muze Office Las Vegas.",
  },
  {
    question: "Can I use the Las Vegas address for my LLC?",
    answer:
      "Yes. 6860 Bermuda Rd, Suite 200 is a real commercial address you can use for LLC registration, Google Business Profile, contracts, and business licensing. A registered agent is a separate role — pair a registered agent service with the virtual office if you need one.",
  },
];

const houstonLocationFAQs: FAQ[] = [
  {
    question: "What is the address for Muze Office Houston?",
    answer:
      "1800 Augusta Dr, Houston, TX 77057. It's a real commercial suite in the Galleria / Tanglewood area inside the 610 Loop — not a PO Box or mail-drop storefront — minutes from Post Oak Blvd.",
  },
  {
    question: "How far is Muze Office Houston from IAH and Hobby airports?",
    answer:
      "About 25 minutes by car from George Bush Intercontinental (IAH) and 25 minutes from William P. Hobby (HOU). The Galleria location makes fly-in client meetings practical from either airport.",
  },
  {
    question: "What are your hours in Houston?",
    answer:
      "The space is staffed Monday through Friday, 10 AM to 7 PM. Dedicated Desk and Private Office members have 24/7 access via biometric entry.",
  },
  {
    question: "Is there free parking at the Houston location?",
    answer:
      "Yes. Parking is free for every member, day pass visitor, meeting room guest, and event attendee at 1800 Augusta Dr. No meters, no valet, no garage fees.",
  },
  {
    question: "What services are available at Muze Office Houston?",
    answer:
      "Virtual Office (from $39/mo), Coworking (Day Pass $25, Hot Desk $350/mo, Dedicated Desk $399/mo), Private Office (contact for pricing), Meeting Rooms (from $25/hr), and Event Space (from $99/hr). All month-to-month.",
  },
  {
    question: "Does Texas have state income tax?",
    answer:
      "No. Texas has no state personal income tax. This is one reason many out-of-state founders form Texas LLCs and use a real Houston address like Muze Office Houston for their business filings.",
  },
  {
    question: "Can I use the Houston address for my Texas LLC?",
    answer:
      "Yes. 1800 Augusta Dr, Houston, TX 77057 is a real commercial address you can use for Texas LLC registration, Google Business Profile, contracts, and business licensing. A Texas registered agent is a separate role — pair a registered agent service with the virtual office if you need one.",
  },
];

/** Map page keys (typically route paths or identifiers) to FAQ arrays for
 *  pages that aren't a single service under the city-service route. */
export const faqsByPage: Record<string, FAQ[]> = {
  "workspace-memberships": workspaceMembershipsFAQs,
  locations: locationsOverviewFAQs,
  "locations/las-vegas": lasVegasLocationFAQs,
  "locations/houston": houstonLocationFAQs,
};

/** Get FAQs for a given page key. Returns [] if none are defined. */
export function getFAQsForPage(pageKey: string): FAQ[] {
  return faqsByPage[pageKey] ?? [];
}
