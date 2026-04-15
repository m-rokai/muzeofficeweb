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
      "We offer three options: Day Pass ($25/day) for drop-in access, Hot Desk ($350/mo) for shared desk access with meeting room credits and mail handling, and Dedicated Desk ($399/mo) for a reserved desk with personal storage and 24/7 access.",
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
      "You can book online through our website or the Muze Office app. Select your room size, date, and time, and you'll receive an instant confirmation. Walk-in bookings are available based on availability.",
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
      "We recommend booking at least 2 weeks in advance for half-day and full-day events. Hourly bookings can often be accommodated on shorter notice. Contact us for availability.",
  },
  {
    question: "What are the pricing options?",
    answer:
      "Hourly ($50/hr) for short meetings and workshops, Half-Day ($175) for 4-hour blocks ideal for training sessions, and Full-Day ($300) for 8-hour blocks suited for conferences and retreats. All include full AV equipment.",
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
    question: "Will parking be included?",
    answer:
      "Yes. Parking will be included for all members and day pass visitors, just like our Las Vegas location.",
  },
  {
    question: "When is the Houston location opening?",
    answer:
      "Our Houston Galleria location is coming soon. Join our waitlist to be the first to know about opening dates and early-bird pricing.",
  },
  {
    question: "Will meeting rooms be available?",
    answer:
      "Yes. The Houston location will include huddle rooms, conference rooms, and a boardroom — all equipped with AV and video conferencing.",
  },
  {
    question: "Can I use my Las Vegas membership in Houston?",
    answer:
      "We plan to offer multi-city membership options. Stay tuned for details as we get closer to the Houston opening.",
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
    question: "When is this location opening?",
    answer:
      "Our Houston Medical Center-area coworking is coming soon. Join our waitlist to be notified about opening dates and early access.",
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

/** Map service IDs to their FAQ arrays */
export const faqsByService: FAQsByService = {
  "virtual-office": virtualOfficeFAQs,
  coworking: coworkingFAQs,
  "private-office": privateOfficeFAQs,
  "meeting-rooms": meetingRoomFAQs,
  "event-space": eventSpaceFAQs,
  "airport-coworking": airportCoworkingFAQs,
  "convention-coworking": conventionCoworkingFAQs,
  "galleria-coworking": galleriaCoworkingFAQs,
  "medical-center-coworking": medicalCenterCoworkingFAQs,
};

/** Get FAQs for a given service ID */
export function getFAQsForService(serviceId: string): FAQ[] {
  return faqsByService[serviceId] ?? [];
}
