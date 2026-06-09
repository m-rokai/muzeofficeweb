export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Virtual Office", href: "/las-vegas-virtual-office" },
  { label: "Memberships", href: "/workspace-memberships" },
  { label: "Events", href: "/las-vegas-event-space" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const footerNav = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations" },
    { label: "Memberships", href: "/workspace-memberships" },
    { label: "Events", href: "/las-vegas-event-space" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  socials: [
    { label: "Twitter (X)", href: "https://x.com/muzeoffice" },
    { label: "Instagram", href: "https://instagram.com/muzeoffice" },
    { label: "LinkedIn", href: "https://linkedin.com/company/muzeoffice" },
    { label: "Facebook", href: "https://facebook.com/muzeoffice" },
    { label: "TikTok", href: "https://tiktok.com/@muzeoffice" },
  ],
};
