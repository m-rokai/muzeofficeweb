interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Generic JSON-LD injector for structured data / schema.org markup.
 *
 * The `dangerouslySetInnerHTML` usage here is safe because the `data` prop
 * is always developer-controlled schema.org objects — never user input.
 * This is the standard React pattern for rendering JSON-LD script tags.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
