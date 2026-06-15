// Single source of truth for the qualification form selects. The client form
// renders these; the server action derives labels from them so the form and
// the lead notification can never drift apart.

export const TRACK_OPTIONS = [
  { value: "franchisee", label: "Operate a location (franchisee)" },
  { value: "investor", label: "Invest (capital partner / JV)" },
  { value: "partner", label: "Partner my real estate / convert a space" },
  { value: "not-sure", label: "Not sure yet — exploring" },
] as const;

export const CAPITAL_OPTIONS = [
  { value: "under-100k", label: "Under $100k" },
  { value: "100-250k", label: "$100k – $250k" },
  { value: "250-500k", label: "$250k – $500k" },
  { value: "500k-1m", label: "$500k – $1M" },
  { value: "over-1m", label: "$1M+" },
  { value: "prefer-not", label: "Prefer not to say" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "0-3", label: "0–3 months" },
  { value: "3-6", label: "3–6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

function toLabelMap(opts: ReadonlyArray<{ value: string; label: string }>) {
  return Object.fromEntries(opts.map((o) => [o.value, o.label])) as Record<string, string>;
}

export const trackLabels = toLabelMap(TRACK_OPTIONS);
export const capitalLabels = toLabelMap(CAPITAL_OPTIONS);
export const timelineLabels = toLabelMap(TIMELINE_OPTIONS);
