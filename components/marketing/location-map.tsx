interface LocationMapProps {
  /** Full address used as the map query, e.g. "6860 Bermuda Rd, Suite 200, Las Vegas, NV 89119". */
  address: string;
  /** Accessible title for the embedded map. */
  title?: string;
  className?: string;
}

/**
 * Keyless Google Maps embed. Uses the `output=embed` query form so no Maps
 * Embed API key is required; the iframe is lazy-loaded to keep it off the
 * critical path. For a real building pin we query by full street address.
 */
export function LocationMap({
  address,
  title = "Map",
  className,
}: LocationMapProps) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&z=15&output=embed`;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-[#E6E4DF] ${className ?? ""}`}
    >
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
        style={{ border: 0, minHeight: 320 }}
        allowFullScreen
      />
    </div>
  );
}
