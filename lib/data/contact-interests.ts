// Single source of truth for the contact form's interest select. The client
// form renders CONTACT_INTERESTS; the server action derives labels from it,
// so the dropdown and the lead-notification email can never drift apart.
export const CONTACT_INTERESTS = [
  { value: "virtual-office", label: "Virtual Office" },
  { value: "coworking", label: "Coworking" },
  { value: "private-office", label: "Private Office" },
  { value: "meeting-rooms", label: "Meeting Rooms" },
  { value: "event-space", label: "Event Space" },
  { value: "houston-waitlist", label: "Houston Waitlist (opening 2026)" },
  { value: "general", label: "General Inquiry" },
] as const;

export const interestLabels: Record<string, string> = Object.fromEntries(
  CONTACT_INTERESTS.map((i) => [i.value, i.label])
);
