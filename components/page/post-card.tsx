import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "@/lib/schema";

interface PostCardProps {
  post: BlogPostMeta;
  className?: string;
}

/**
 * Derived from the zod enum rather than imported separately, so adding a tag to
 * `BlogTagSchema` turns TAG_LABEL into a compile error instead of a silent
 * `undefined` in the chip.
 */
type BlogTag = BlogPostMeta["tags"][number];

/**
 * Real display labels in the DOM, uppercased in CSS.
 *
 * The map flags "the chip prints the raw lowercase enum and relies on CSS
 * uppercase" as a defect (§3.22, and the same finding on the downloads OS
 * chip): `text-transform` is presentational, so a screen reader still announces
 * "how dash to" and "addons". Writing the label out fixes the announced string
 * while the chip keeps its uppercase letterform.
 */
const TAG_LABEL: Record<BlogTag, string> = {
  tally: "Tally",
  gst: "GST",
  cloud: "Cloud",
  mis: "MIS",
  addons: "Add-ons",
  amc: "AMC",
  integrations: "Integrations",
  compliance: "Compliance",
  product: "Product",
  "how-to": "How-to",
};

/**
 * `.mchip` — the outlined label chip that opens an S18 card. Byte-identical to
 * the constant in components/layout/mega-menu.tsx: S18's whole mechanism is
 * repetition, so the chip must not drift between the two call sites. Sans
 * (S19 — never serif inside a label), pill radius (S24 — this is a tag, not a
 * control), ink-500 on white = 6.4:1.
 */
const CHIP =
  "inline-block rounded-pill border border-hairline-strong px-[11px] py-1 " +
  "text-[10.5px] font-bold uppercase leading-[1.4] tracking-[0.09em] text-ink-500";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Blog post card used on /blog index and at the bottom of /blog/[slug].
 *
 * S18 card grammar, matched to RelatedCards and OfferingCard so the three
 * unrelated grids read as one family: an outlined label chip opens the card,
 * a circular ↗ in the same fixed corner closes it.
 *
 * WHY THE ARROW IS IN THE HEADER FLEX ROW, NOT `absolute right-5 top-5`:
 * this card is `p-5 sm:p-6`, so a fixed 20px offset would drift 4px off the
 * card's own padding at `sm`. Sitting the terminator opposite the chip in the
 * card's first row pins it to the padding box at every breakpoint — still the
 * same corner on every card, which is the only thing S18 actually requires.
 *
 * Link mechanics: stretched link (`after:inset-0`) rather than a `<Link>`
 * wrapping the card, per §3.22 "keep the stretched-link and focus-within
 * ring". Same clickable surface as a wrapping link, but the accessible name
 * stays the title alone instead of title + excerpt + date + read time.
 */
export function PostCard({ post, className }: PostCardProps) {
  // The first tag is the post's category. One chip, not two: S18's header is a
  // single label, and the map forbids per-card colour identity here (six posts,
  // five gradient tokens, arbitrary assignment — the colour would carry no
  // information). Every post's `tags[0]` is distinct across the current six.
  const category = post.tags[0];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-lg border border-hairline bg-white p-5 shadow-[var(--shadow-card)] sm:p-6",
        // cream-200 is ~1.2:1 on the cream band this grid sits on; ink/10
        // (border-hairline) is the sanctioned card edge.
        "transition-[transform,box-shadow,border-color] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
        "hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-[var(--shadow-card-hover)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        // S16: exactly one accented element. Hover accents the terminator only
        // — the border stays neutral so six hovering cards never bloom plum.
        // Outline (not `ring`) because a Tailwind ring is a box-shadow and
        // vanishes in Windows High Contrast; outline survives it.
        "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary",
        className
      )}
    >
      {/* S18 header: label chip left, terminator right, one row. */}
      <div className="flex items-start justify-between gap-3">
        <span className={CHIP}>{TAG_LABEL[category]}</span>
        <span
          aria-hidden
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-pill",
            "border border-hairline-strong text-ink-500",
            "transition-colors duration-[var(--motion-fast)] motion-reduce:transition-none",
            // group-focus-WITHIN, not group-focus-visible: the group is the
            // <article>, which is never itself focusable — the stretched <a>
            // inside it is. focus-visible on the group would never fire.
            "group-hover:border-transparent group-hover:bg-primary group-hover:text-white",
            "group-focus-within:border-transparent group-focus-within:bg-primary group-focus-within:text-white"
          )}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* S19: Lora roman for the human sentence. 20px/22px — safely above the
          16px serif floor even at the mobile step. */}
      <h3 className="mt-4 text-balance font-serif text-h3-mob font-semibold leading-snug text-ink sm:text-h3">
        <Link
          href={`/blog/${post.slug}`}
          // The card carries the focus indicator, so the link suppresses its
          // own; without this both fire and the card gets a double ring.
          className="focus-visible:outline-none after:absolute after:inset-0 after:rounded-lg"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-2 text-body-sm text-ink-500">{post.excerpt}</p>

      {/* Metadata: sans and tabular (S19 — every number is Manrope), demoted to
          caption on a hairline so it stops competing with the title (§3.22).
          Iconless (S11/S36): the Clock glyph restated the words beside it, and
          the faux "Read →" span is gone — the fixed-corner ↗ is the affordance,
          so the card no longer offers two terminators for one destination. */}
      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-hairline pt-5 font-sans text-caption text-ink-500 tabular-nums-strict">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readMinutes} min read</span>
      </div>
    </article>
  );
}
