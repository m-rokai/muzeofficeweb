export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  {
    label: "Workspaces",
    href: "/workspace-memberships",
    children: [
      { label: "Coworking", href: "/las-vegas-coworking" },
      { label: "Day Pass", href: "/las-vegas-day-pass" },
      { label: "Private Offices", href: "/las-vegas-private-office" },
      { label: "Meeting Rooms", href: "/las-vegas-meeting-rooms" },
      { label: "Virtual Office", href: "/las-vegas-virtual-office" },
      { label: "Event Space", href: "/las-vegas-event-space" },
    ],
  },
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
    { label: "Muze + Cube World", href: "/muze-cube-world" },
    { label: "FAQ", href: "/#faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  socials: [
    { label: "Twitter (X)", href: "https://x.com/muzeoffice" },
    { label: "Instagram", href: "https://www.instagram.com/muzeoffice" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/muzeoffice" },
    { label: "Facebook", href: "https://www.facebook.com/muzeoffice" },
    { label: "TikTok", href: "https://www.tiktok.com/@muzeoffice" },
  ],
};
