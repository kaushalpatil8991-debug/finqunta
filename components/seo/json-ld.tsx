interface JsonLdProps {
  /** Any JSON-serialisable schema.org object (or array of them). */
  data: object | object[];
}

/**
 * Renders a <script type="application/ld+json"> with the given schema.
 * React's JSON.stringify escapes `</script>` safely in strings; we also
 * strip stray `</` occurrences defensively.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
