import type { RelatedItem } from "@/lib/schema";

/**
 * Turn a list of slugs into RelatedItem cards, using a detail map from the
 * same category. Missing slugs are silently skipped so a related list
 * never breaks a page.
 */
export function toRelatedItems<
  T extends {
    slug: string;
    title: string;
    summary: string;
    icon?: string;
  },
>(
  base: string,
  map: Record<string, T>,
  slugs: readonly string[]
): RelatedItem[] {
  return slugs
    .map((s) => map[s])
    .filter((x): x is T => Boolean(x))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      blurb: item.summary,
      base,
      icon: item.icon,
    }));
}
