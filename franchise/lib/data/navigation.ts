export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { label: "The Opportunity", href: "/the-opportunity" },
  { label: "The Model", href: "/the-model" },
  { label: "Investment", href: "/investment" },
  { label: "Who It's For", href: "/franchisees" },
  { label: "Why Muze", href: "/why-muze" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  opportunity: [
    { label: "The Opportunity", href: "/the-opportunity" },
    { label: "The Muze Model", href: "/the-model" },
    { label: "Investment & Fees", href: "/investment" },
    { label: "Why Muze", href: "/why-muze" },
  ],
  audiences: [
    { label: "Franchisees", href: "/franchisees" },
    { label: "Investors", href: "/investors" },
    { label: "Real-Estate Partners", href: "/partners" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Discovery Call", href: "/discovery-call" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/muzeoffice" },
    { label: "LinkedIn", href: "https://linkedin.com/company/muzeoffice" },
    { label: "Twitter (X)", href: "https://x.com/muzeoffice" },
    { label: "Facebook", href: "https://facebook.com/muzeoffice" },
  ],
};
