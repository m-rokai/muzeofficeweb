export interface FAQ {
  question: string;
  answer: string;
}

export type FAQsByService = Record<string, FAQ[]>;

const virtualOfficeFAQs: FAQ[] = [
  {
    question: "Do I get a real street address or a PO Box?",
    answer:
      "You get a real street address with a suite number — not a PO Box. You can use it on your website, business cards, contracts, and filings that accept a commercial mail-receiving address. Our address is 6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119.",
  },
  {
    question: "Can I use this address to register my LLC?",
    answer:
      "A commercial mail-receiving address can be used for LLC filings, business licensing, and contracts when the relevant agency accepts it. A Nevada registered agent (the person or service authorized to receive legal service of process for your LLC) is a separate role; Muze Office does not provide that service. Confirm the address requirements for your filing with the agency or a Nevada attorney.",
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
      "Mail Holding ($39/mo): professional Las Vegas business address with suite number and USPS letter mail pickup — letters only, no packages. Sandstone ($69/mo): adds package receiving from UPS, FedEx, and Amazon plus signature-required mail. Opal ($149/mo): adds mail forwarding, 4 coworking hours, and 2 meeting room hours. Diamond ($249/mo): adds 20 coworking hours, 6 meeting room hours, and a dedicated local phone line.",
  },
  {
    question: "What's the difference between a virtual office and a PO Box?",
    answer:
      "A PO Box gives you a box number at the post office — it can't be used for LLC registration, and it looks unprofessional on a business card. A virtual office gives you a real street address with a suite number, plus access to meeting rooms, coworking, and a receptionist. It's a professional business presence without renting a full office.",
  },
  {
    question: "How much does a virtual office cost in Las Vegas?",
    answer:
      "At Muze Office, virtual office plans run $39 to $249 per month with a one-time $25 setup fee: Mail Holding ($39), Sandstone ($69, adds package receiving), Opal ($149, adds mail forwarding plus coworking and meeting room hours), and Diamond ($249, adds 20 coworking hours and a dedicated local phone line). Many Las Vegas providers charge $59–$99 a month plus a $50–$75 setup fee, so compare the all-in first-month cost, not just the sticker price.",
  },
  {
    question: "Can I use a virtual office address to open a business bank account?",
    answer:
      "Banks set their own address and identity-verification rules. A commercial mail-receiving address may be accepted as a mailing address, but some institutions also require a separate physical address. Check with your bank before applying; Muze Office cannot guarantee approval.",
  },
  {
    question: "Is a virtual office legal in Nevada?",
    answer:
      "Yes. Virtual offices operate under USPS Commercial Mail Receiving Agency (CMRA) rules. Before mail service begins, you complete USPS Form 1583 and present the required identification; the current form permits verification in the physical or live virtual presence of the CMRA, or acknowledgment before a notary. Whether an address is accepted for a particular filing depends on that agency's rules. A virtual office does not replace a registered agent, which is a separate legal role.",
  },
  {
    question: "Can I get a Las Vegas virtual office if I don't live in Nevada?",
    answer:
      "Yes. USPS Form 1583 can be completed remotely using the CMRA's live virtual identity-verification process or, where available, acknowledgment before an online notary. Plans from Opal ($149/mo) include mail forwarding so your mail can reach you outside Nevada.",
  },
  {
    question: "Do you offer a virtual mailbox in Las Vegas?",
    answer:
      "Yes — every virtual office plan works as a virtual mailbox at a real street address: we notify you when mail arrives and you pick it up at the suite during business hours. Sandstone ($69/mo) adds package receiving from UPS, FedEx, and Amazon, and Opal ($149/mo) adds scheduled mail forwarding to any address you choose.",
  },
  {
    question: "Can I use this address for a Google Business Profile?",
    answer:
      "A virtual-office address alone does not make a business eligible for a Google Business Profile. Google requires the business itself to operate here, receive customers during stated hours, be staffed by its own team, and maintain permanent signage. If you meet those requirements, review Google's current guidelines before applying; Muze Office cannot guarantee verification or listing eligibility.",
  },
];

const coworkingFAQs: FAQ[] = [
  {
    question: "What are the coworking hours?",
    answer:
      "Muze Office Las Vegas is open 24 hours a day, seven days a week. A $25 Day Pass can be bought and activated online the same day and remains valid until midnight. Monthly members have ongoing 24/7 access.",
  },
  {
    question: "Is parking free?",
    answer:
      "Yes. We provide free parking for all coworking members and day pass visitors. No garage fees, no meters, no hassle.",
  },
  {
    question: "What memberships are available?",
    answer:
      "We offer three options: Day Pass ($25/day), which you can buy and activate online the same day and use until midnight; Hot Desk ($350/mo) for ongoing any-desk 24/7 access with meeting room credits and mail handling; and Dedicated Desk ($399/mo), which adds a reserved desk, personal storage, and a business address with mail.",
  },
  {
    question: "Can I book a meeting room as a coworking member?",
    answer:
      "Yes. Hot Desk and Dedicated Desk members receive meeting room credits each month. You can also book additional hours at our standard hourly rate. Rooms include AV equipment and video conferencing.",
  },
  {
    question: "Do you offer day passes?",
    answer:
      "Yes. A Day Pass is $25 and includes a quiet coworking area, gigabit fiber WiFi, free bottled water and coffee, an ergonomic Herman Miller chair, a Herman Miller height-adjustable desk, phone booths, printing, and free parking. Buy and activate it online the same day and work until midnight. Bring your laptop; monitors are not provided.",
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
      "Meeting rooms include a display or monitor, video conferencing capability, high-speed WiFi, and whiteboards. Contact us if your classroom or event requires a specific AV setup.",
  },
  {
    question: "How do I book a meeting room?",
    answer:
      "For Las Vegas meeting rooms, book online directly from the Las Vegas Meeting Rooms page — select room size, date, and time for instant confirmation. Houston is not accepting meeting-room reservations yet; join Houston early access for opening and availability updates.",
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
      "We offer a Huddle Room for 2-4 people at $39/hr, two Conference Rooms that each fit up to 16 people at $69/hr, and a Classroom that fits up to 50 people at $99/hr.",
  },
  {
    question: "Is parking included?",
    answer:
      "Yes. Free parking is included for you and all your meeting attendees. No validation needed — just pull in and park.",
  },
];

const conferenceRoomFAQs: FAQ[] = [
  {
    question: "What is the difference between a Conference Room and the Classroom at Muze Office?",
    answer:
      "Each of our two Conference Rooms is $69/hr and accommodates up to 16 people for client pitches, sales meetings, team presentations, and depositions. The Classroom is $99/hr and accommodates up to 50 people for training, workshops, seminars, and larger presentations.",
  },
  {
    question: "What AV equipment is included in every conference room?",
    answer:
      "Conference rooms include a large display, video conferencing capability, high-speed WiFi, and whiteboards. Contact us before booking if your meeting requires a specific connection or AV configuration.",
  },
  {
    question: "Can I host a legal deposition or mediation in a conference room?",
    answer:
      "Yes. Each Conference Room accommodates up to 16 people and can host depositions, mediations, and sworn testimony. Free parking is available for witnesses, counsel, and the court reporter. Confirm any specialized recording or exhibit-review requirements before booking.",
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
    question: "What capacities are available for classes and events?",
    answer:
      "The Classroom accommodates up to 50 people. Event-space capacity depends on the layout and event format, so contact us with your headcount before booking.",
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
      "The Classroom is $99/hr and the Event Space is $199/hr. Bookings of 8 hours or more automatically get a flat 10% discount. There are no separate half-day or full-day packages — you pay for the hours you need.",
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
      "Muze Office Las Vegas is open 24/7. Buy and activate a $25 Day Pass online the same day and use the space until midnight — no membership required.",
  },
  {
    question: "Is parking free?",
    answer:
      "Yes. Free parking is included for all visitors. No meters, no garage fees. Much better than paying $40+ at a hotel parking garage.",
  },
  {
    question: "Do I need a membership?",
    answer:
      "No. Our Day Pass ($25) gives you full access for the day — desk, WiFi, coffee, and parking. No membership, no commitment. Book online, even same-day.",
  },
  {
    question: "Can I book a meeting room?",
    answer:
      "Yes. Meeting rooms are available from $39/hr with AV equipment included. Book online, even same-day, based on availability. Great for meeting a client before your flight.",
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
      "Yes — everything is self-serve through the Muze Office app or online booking. Reserve your day pass or meeting room (even same-day) and it's ready when you arrive; only first-time tours need an appointment. During major convention weeks we recommend booking a day or two ahead since demand is high.",
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
      "The planned location is 1800 Augusta Dr, Houston, TX 77057, in the Galleria / Tanglewood area with access from I-610 West Loop and Woodway Dr. The location is not open yet.",
  },
  {
    question: "What memberships will be available?",
    answer:
      "We'll offer Day Passes, Hot Desk monthly memberships, and Dedicated Desk monthly memberships — the same flexible options as our Las Vegas location. Pricing will be announced closer to opening.",
  },
  {
    question: "Is parking included?",
    answer:
      "On-site parking is planned for the Houston location. Final access details will be confirmed before opening.",
  },
  {
    question: "Where is the Houston location?",
    answer:
      "1800 Augusta Dr, Houston, TX 77057 — inside the 610 Loop in the Galleria / Tanglewood area, minutes from Post Oak Blvd and the Houston Galleria.",
  },
  {
    question: "Are meeting rooms available?",
    answer:
      "Meeting rooms are part of the planned Houston workspace mix, but reservations are not open yet. Join early access for confirmed room types, pricing, and booking dates.",
  },
  {
    question: "Can I use my Las Vegas membership in Houston?",
    answer:
      "Multi-city access has not been finalized. Join Houston early access and tell us what membership you need so we can share confirmed options before opening.",
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
      "A Day Pass is $25. That covers a quiet coworking area, gigabit fiber WiFi, free bottled water and coffee, an ergonomic Herman Miller chair, a Herman Miller height-adjustable desk, free parking, phone-booth access, printing, and the on-site Muze Cafe. Bring your laptop; monitors are not provided. Meeting rooms are a separate booking from $39 to $99 per hour.",
  },
  {
    question: "Do I need a membership or reservation to use a Day Pass?",
    answer:
      "No membership is required. Buy and activate your $25 Day Pass online, even the same day you need it. Activation takes only a few minutes, and your pass remains valid until midnight that day.",
  },
  {
    question: "What are the Day Pass hours?",
    answer:
      "Muze Office Las Vegas is open 24 hours a day, seven days a week. You can buy and activate a Day Pass online the same day and use the workspace until midnight. A Day Pass expires at midnight on its activation day; monthly memberships provide ongoing 24/7 access.",
  },
  {
    question: "Is parking free with a Day Pass?",
    answer:
      "Yes. Free parking is included for every Day Pass visitor — no meters, no valet, no garage fees.",
  },
  {
    question: "What's the difference between a Day Pass and a Hot Desk membership?",
    answer:
      "A Day Pass is $25 with no commitment. Buy and activate it online the same day and use the workspace until midnight. A Hot Desk is $350/month for continuing any-desk 24/7 access, plus meeting room credits, mail handling, and community events. The math flips in Hot Desk's favor around the 14th or 15th day per month.",
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
      "Yes. Hot Desk members get ongoing 24/7 access just like every other monthly coworking tier. The Las Vegas workspace itself is open 24/7; a Day Pass is limited to its activation day and expires at midnight, while a Hot Desk membership continues all month. The upgrade to Dedicated Desk at $399/month is about a reserved desk, personal storage, and a business address — not hours.",
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
      "Hot Desk includes monthly meeting room credits that you can apply to the Huddle Room ($39/hr), either Conference Room ($69/hr), or the Classroom ($99/hr). Additional hours beyond the credits are available at standard hourly rates. Credits don't roll over month-to-month.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Hot Desk is month-to-month with 30 days' notice to cancel. There's a one-time $25 setup fee, but no personal guaranty and no 12-month commitment. You can pause a month if you're traveling — just let the team know in advance.",
  },
];

const dedicatedDeskFAQs: FAQ[] = [
  {
    question: "What's included with a Dedicated Desk membership?",
    answer:
      "A Dedicated Desk at $399/month includes everything in Hot Desk — 24/7 biometric access, meeting room credits, mail handling, phone booths, WiFi, coffee, parking, community events — plus a reserved desk that's yours every day, personal storage, and a business address with mail for contracts and filings that accept a commercial mail-receiving address.",
  },
  {
    question: "How is the 24/7 access provided?",
    answer:
      "Monthly coworking members (Hot Desk, Dedicated Desk, or Private Office) are enrolled for ongoing 24/7 entry on their first day. Day Pass users buy and activate access online for a single calendar day; the pass expires at midnight.",
  },
  {
    question: "Is the business address real, or a PO Box?",
    answer:
      "It's a real commercial suite address at your Muze Office location — not a PO Box. It can be used on contracts and on filings that accept a commercial mail-receiving address. A registered-agent address and Google Business Profile eligibility have separate legal and policy requirements. Some members drop a separate Virtual Office subscription when they move up to Dedicated Desk because the mail-and-address piece is already bundled in.",
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
      "Yes. Month-to-month with 30 days' notice to cancel. There's a one-time $25 setup fee, but no personal guaranty and no long-term lease. If you outgrow the shared area and need walls, the upgrade path to Private Office is clean.",
  },
];

const houstonVirtualOfficeFAQs: FAQ[] = [
  {
    question: "Do I get a real street address or a PO Box?",
    answer:
      "You get a real street address with a suite number — not a PO Box. You can use it on your website, business cards, contracts, and filings that accept a commercial mail-receiving address. Our Houston address is 1800 Augusta Dr, Houston, TX 77057 — inside the 610 Loop in the Galleria / Tanglewood area.",
  },
  {
    question: "Can I use this address to register my Texas LLC?",
    answer:
      "A commercial mail-receiving address can be used for Texas LLC filings, business licensing, and contracts when the relevant agency accepts it. A Texas registered agent (the person or service authorized to receive legal service of process for your LLC) is a separate role; Muze Office does not provide that service. Confirm the address requirements for your filing with the agency or a Texas attorney.",
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
      "Mail Holding ($39/mo): professional Houston business address with suite number and USPS letter mail pickup — letters only, no packages. Sandstone ($69/mo): adds package receiving from UPS, FedEx, and Amazon plus signature-required mail. Opal ($149/mo): adds mail forwarding, 4 coworking hours, and 2 meeting room hours. Diamond ($249/mo): adds 20 coworking hours, 6 meeting room hours, and a dedicated local phone line.",
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
      "Muze Office offers five workspace types in Las Vegas: Virtual Office (from $39/mo) for a business address and mail, Coworking (Day Pass $25, Hot Desk $350/mo, Dedicated Desk $399/mo), Private Office (contact for pricing) for 1–5+ person teams, Meeting Rooms (from $39/hr), a Classroom ($99/hr), and Event Space ($199/hr). All memberships are month-to-month.",
  },
  {
    question: "Which membership is right for me?",
    answer:
      "If you need an address only, start with Virtual Office. If you need desk space for the day, get a Day Pass. If you're in the space regularly, Hot Desk or Dedicated Desk. If you need a private, lockable room for your team, book a tour of the Private Offices. If you're hosting clients or meetings occasionally, book Meeting Rooms by the hour.",
  },
  {
    question: "Are memberships month-to-month, or is there a contract?",
    answer:
      "Virtual Office, Coworking, and Private Office memberships are month-to-month — a one-time $25 setup fee, no long-term lease, and no personal guaranty — cancellable with 30 days' notice. Meeting Rooms and Event Space are booked hourly or by package; see those pages for cancellation windows.",
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
      "Open in Las Vegas at 6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119 (10 minutes from Harry Reid International Airport, off I-215). An independently operated Muze Office franchise location is planned for Houston in 2026 at 1800 Augusta Dr, Houston, TX 77057 in the Galleria / Tanglewood area.",
  },
  {
    question: "Which cities are open?",
    answer:
      "Las Vegas is open now and accepting members, day pass visitors, and meeting room bookings at 6860 Bermuda Rd, Suite 200. Houston is planned to open in 2026; join early access for confirmed timing and availability updates.",
  },
  {
    question: "How do I find the Houston location?",
    answer:
      "1800 Augusta Dr, Houston, TX 77057 — inside the 610 Loop in the Galleria / Tanglewood area, minutes from Post Oak Blvd, 15 minutes from the Texas Medical Center, and 25 minutes from George Bush Intercontinental (IAH) and William P. Hobby (HOU).",
  },
  {
    question: "Will multi-city memberships be available?",
    answer:
      "Multi-city access has not been finalized for Houston. Las Vegas memberships are available now; join Houston early access for confirmed launch options.",
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
      "The Las Vegas workspace is open 24/7. A Day Pass can be bought and activated online the same day and used until midnight. The front desk is staffed Monday through Friday, 10 AM to 7 PM, and phones are answered Monday through Friday, 10 AM to 5 PM.",
  },
  {
    question: "Is there free parking at the Las Vegas location?",
    answer:
      "Yes. Parking is free for every member, day pass visitor, meeting room guest, and event attendee. No meters, no valet, no garage fees.",
  },
  {
    question: "What services are available at Muze Office Las Vegas?",
    answer:
      "Virtual Office (from $39/mo), Coworking (Day Pass $25, Hot Desk $350/mo, Dedicated Desk $399/mo), Private Office (contact for pricing), Meeting Rooms (from $39/hr), a Classroom ($99/hr), and Event Space ($199/hr). All memberships are month-to-month.",
  },
  {
    question: "Does Nevada have state income tax?",
    answer:
      "No. Nevada has no state income tax, no corporate income tax, and no franchise tax. This is one reason many out-of-state founders register their LLC at a Nevada address like Muze Office Las Vegas.",
  },
  {
    question: "Can I use the Las Vegas address for my LLC?",
    answer:
      "6860 Bermuda Rd, Suite 200 is a real commercial address for contracts and filings that accept a commercial mail-receiving address. A registered agent is a separate role, and Google Business Profile eligibility depends on Google's operating-location, customer-access, staffing, and signage requirements.",
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
      "Travel time varies significantly with Houston traffic. The planned Galleria / Tanglewood location is accessible from I-610; check live directions from George Bush Intercontinental (IAH) or William P. Hobby (HOU) before traveling.",
  },
  {
    question: "What are your hours in Houston?",
    answer:
      "Houston is not open yet, so it does not have customer or front-desk hours. Opening timing and operating hours will be announced to the early-access list when confirmed.",
  },
  {
    question: "Is there free parking at the Houston location?",
    answer:
      "On-site parking is planned at 1800 Augusta Dr. Final member and visitor parking details will be confirmed before the location opens.",
  },
  {
    question: "What services are available at Muze Office Houston?",
    answer:
      "No Houston services are active yet. The planned mix includes virtual office services, coworking, private offices, meeting rooms, and event space. Join early access and select the workspace type you need; availability and Houston pricing will be confirmed before sales open.",
  },
  {
    question: "Does Texas have state income tax?",
    answer:
      "No. Texas has no state personal income tax. This is one reason many out-of-state founders form Texas LLCs and use a real Houston address like Muze Office Houston for their business filings.",
  },
  {
    question: "Can I use the Houston address for my Texas LLC?",
    answer:
      "Not yet. Muze Office is not currently offering address or mail-receiving service at 1800 Augusta Dr. After launch, acceptance will depend on each agency's rules; a Texas registered agent remains a separate legal role, and Google Business Profile eligibility depends on how the tenant actually operates at the location.",
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
