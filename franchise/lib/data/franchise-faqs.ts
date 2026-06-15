export interface FAQ {
  question: string;
  answer: string;
}

export const franchiseFAQs: FAQ[] = [
  {
    question: "What is the Muze Office franchise opportunity?",
    answer:
      "Muze Office licenses its flexible-workspace model — coworking, virtual offices, private offices, meeting rooms, and event space — to independent operators, investors, and real-estate partners. You get the brand, the Optix-powered technology stack, an operations playbook, site-selection and buildout support, training, and ongoing marketing support.",
  },
  {
    question: "How much does it cost to open a Muze Office location?",
    answer:
      "The total estimated initial investment is {{INVESTMENT_RANGE}}, which varies with market, square footage, and buildout condition. This is an illustrative range, not a guarantee — exact figures and a full cost breakdown are provided during the discovery process and in the disclosure documents.",
  },
  {
    question: "What is the franchise fee and what does it include?",
    answer:
      "The initial fee is {{FRANCHISE_FEE}} and covers {{FRANCHISE_FEE_INCLUDES}} (brand license, training, launch support, and access to the technology stack and playbook). Ongoing royalties are {{ROYALTY}}.",
  },
  {
    question: "Do I need prior coworking or real-estate experience?",
    answer:
      "No. Many successful operators come from hospitality, services, or general business backgrounds. What matters most is local market knowledge, available capital, and a commitment to running a member-first space. Muze provides the operating system and training.",
  },
  {
    question: "What support does Muze provide?",
    answer:
      "Brand and marketing assets, the Optix member-management and booking technology, an operations and pricing playbook, site-selection guidance, buildout and design standards, pre-opening training, and ongoing operational support.",
  },
  {
    question: "What markets are available?",
    answer:
      "Muze is expanding from its Las Vegas flagship (with Houston opening in 2026) into new U.S. markets. Territory availability is confirmed during the discovery call — book one to check your market.",
  },
  {
    question: "How long does it take to open?",
    answer:
      "Typical time from signed agreement to opening is {{TIME_TO_OPEN}}, depending on site selection, permitting, and buildout. The discovery process maps a realistic timeline for your specific market and space.",
  },
  {
    question: "Can I invest without running the location day-to-day?",
    answer:
      "Yes. Our investor track is built for capital partners who want exposure to the flexible-workspace model while an experienced operator handles operations. See the Investors page and book a discovery call to discuss structures.",
  },
  {
    question: "I own commercial space — can I convert it?",
    answer:
      "Often, yes. If you control office or retail square footage, our partner track helps you evaluate converting it into a branded Muze Office. We assess the space's fit on the discovery call.",
  },
  {
    question: "Is this a registered franchise?",
    answer:
      "{{LEGAL_STRUCTURE}} This website is informational only and is not a franchise offering; a franchise is offered solely through the applicable disclosure documents where required by law.",
  },
];

/** Short subset used in the homepage FAQ excerpt. */
export const homepageFranchiseFAQs: FAQ[] = franchiseFAQs.slice(0, 5);
