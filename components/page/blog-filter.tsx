"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { PostCard } from "@/components/page/post-card";
import type { BlogPostMeta } from "@/lib/schema";

interface BlogFilterProps {
  posts: readonly BlogPostMeta[];
  tags: readonly string[];
}

/* S16: every number on the site is Indian-grouped and tabular. Post counts are
 * single digits today, but the formatter is the law, not the current data. */
const numberFormat = new Intl.NumberFormat("en-IN");

/**
 * Slug → display name. `lib/schema.ts` owns the tag enum and is not editable
 * from here, so this mirrors it. Anything the enum grows later falls through
 * to the de-slugifier rather than shipping raw kebab-case — the defect the
 * design map flags on this row was `how-to` rendering as "HOW-TO" through an
 * `uppercase` utility, which is why the chips are no longer uppercased either.
 */
const TAG_LABEL: Record<string, string> = {
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

function tagLabel(slug: string): string {
  const known = TAG_LABEL[slug];
  if (known) return known;
  const spaced = slug.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

type Fade = "none" | "start" | "end" | "both";

/* ── Deep link: /blog?tag=tally ──────────────────────────────────────────
 * Read through useSyncExternalStore rather than an effect. The server has no
 * location, so `getServerSnapshot` returns null and the SSR/hydration pass
 * renders the unfiltered list; React then adopts the real URL after hydration
 * without a markup mismatch — and without the cascading render that a
 * setState-in-effect would cost. Snapshots are primitives, so there is nothing
 * to memoise. Module scope keeps all three references stable across renders. */
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}
function getUrlTag(): string | null {
  return new URLSearchParams(window.location.search).get("tag");
}
function getServerUrlTag(): string | null {
  return null;
}

/**
 * The rail hides its scrollbar, so without this there is nothing telling a
 * reader that more chips exist off-screen. Measured rather than assumed: a
 * static mask would fade a rail that fits, which is a defect of its own.
 *
 * Deliberately a local copy of the hook in `components/sections/offerings.tsx`
 * — that one is private to its module and this agent owns only this file, so
 * the alternative was importing across a boundary that does not exist. If a
 * third rail ever appears, lift both into `hooks/use-edge-fade.ts`.
 *
 * `key` re-measures when the chip set changes: a ResizeObserver on the rail
 * sees the *element* resize, never a change in its scrollWidth.
 */
function useEdgeFade(key: unknown) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [fade, setFade] = React.useState<Fade>("none");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const overflow = el.scrollWidth - el.clientWidth;
      if (overflow <= 1) {
        setFade("none");
        return;
      }
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft >= overflow - 1;
      setFade(atStart ? "end" : atEnd ? "start" : "both");
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [key]);

  return { ref, fade };
}

/**
 * Client-side filter strip for the /blog index.
 *
 * S13 segmented chip rail + S35 inverted active state: the selected chip
 * inverts to solid ink, it never takes a tint. Chips are derived from the
 * posts, so a chip can never resolve to zero results and a tag can never go
 * missing from the rail.
 *
 * ARIA rewritten. The previous markup put `role="tablist"` on a `<ul>` whose
 * `role="tab"` buttons were wrapped in `<li>` — an invalid owned-element
 * structure — with no `aria-controls`, no tabpanel, no roving tabindex and no
 * arrow keys, i.e. a tab widget that satisfied none of the tab contract. These
 * are filter toggles, not tabs, so they are now a labelled `role="group"` of
 * `aria-pressed` buttons: every chip is a natural tab stop, focus scrolls the
 * rail on its own, and no roving-tabindex trap can strand an off-screen chip.
 */
export function BlogFilter({ posts, tags }: BlogFilterProps) {
  // IDs law: never hardcode an id consumed by aria-labelledby / aria-controls.
  // /blog renders one BlogFilter today; a second instance must not collide.
  const labelId = React.useId();
  const resultsId = React.useId();

  /* `undefined` = the reader has not touched the rail yet, so the URL decides.
   * `null` = "All" was explicitly chosen. A string = that tag. */
  const [chosen, setChosen] = React.useState<string | null | undefined>(
    undefined
  );
  const [railFocused, setRailFocused] = React.useState(false);

  /* Counts come from the posts, never from the `tags` prop. This is the whole
   * point of the rewrite: the rail and the results are computed from one
   * source, so they cannot drift apart. */
  const counts = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) map.set(tag, (map.get(tag) ?? 0) + 1);
    }
    return map;
  }, [posts]);

  /* The `tags` prop stays in the signature (other call sites pass it) but is
   * demoted to an ORDERING HINT: it decides ties, it does not decide which
   * chips exist. Heaviest tag first, so the tags that actually segment the
   * archive lead the rail and the long tail scrolls — the design map asks for
   * the nine tags to collapse to the three or four resolving to >= 2 posts,
   * and only two do. That collapse is a content fix in the .mdx frontmatter,
   * not something to hardcode here as a threshold that would silently hide
   * posts; the per-chip count discloses a thin tag honestly instead. */
  const chipTags = React.useMemo(() => {
    const hint = new Map(tags.map((tag, i) => [tag, i] as const));
    const rank = (tag: string) => hint.get(tag) ?? Number.MAX_SAFE_INTEGER;
    return [...counts.keys()].sort(
      (a, b) =>
        (counts.get(b) ?? 0) - (counts.get(a) ?? 0) ||
        rank(a) - rank(b) ||
        a.localeCompare(b)
    );
  }, [counts, tags]);

  const { ref: railRef, fade } = useEdgeFade(chipTags.length);

  const urlTag = React.useSyncExternalStore(
    subscribeToUrl,
    getUrlTag,
    getServerUrlTag
  );

  /* A hand-typed or stale slug degrades to "All" rather than to an empty page,
   * because the URL is validated against the same derived counts the chips
   * come from. */
  const active =
    chosen !== undefined ? chosen : urlTag && counts.has(urlTag) ? urlTag : null;

  const filtered = React.useMemo(
    () =>
      active === null
        ? posts
        : posts.filter((post) =>
            (post.tags as readonly string[]).includes(active)
          ),
    [active, posts]
  );

  /* Keep the URL shareable — the one legitimate job for an effect here, which
   * is pushing React state out to an external system. `history.replaceState`
   * rather than the router: `useSearchParams()` would force /blog into a
   * Suspense boundary it does not have (and that file belongs to another
   * owner), and a router push would re-run a server render for a filter that
   * is purely client-side. Nothing is written until the reader has actually
   * chosen something, so an untouched page never rewrites its own URL. */
  React.useEffect(() => {
    if (chosen === undefined) return;
    const url = new URL(window.location.href);
    if (chosen) url.searchParams.set("tag", chosen);
    else url.searchParams.delete("tag");
    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) window.history.replaceState(null, "", next);
  }, [chosen]);

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        {/* S36 icon purge: the lucide funnel that used to sit here is gone, and
            the label is no longer plum — S16 allows exactly one accented
            element per view, and that budget is spent on the inverted chip. */}
        <p
          id={labelId}
          className="text-eyebrow font-bold uppercase tracking-[0.12em] text-ink-500"
        >
          Filter by tag
        </p>

        {/* Polite live region. A keyboard or screen-reader user changing the
            filter otherwise gets no feedback at all — the result of their
            action lands several hundred pixels further down the page. */}
        <p aria-live="polite" className="text-body-sm text-ink-500">
          <span className="tabular-nums-strict font-semibold text-ink">
            {numberFormat.format(filtered.length)}
          </span>{" "}
          {filtered.length === 1 ? "post" : "posts"}
          {active ? (
            <>
              {" "}
              tagged{" "}
              <span className="font-semibold text-ink">{tagLabel(active)}</span>
            </>
          ) : null}
        </p>
      </div>

      {/* S13 segmented rail. The ground, hairline and radius sit on the WRAPPER
          so the edge fade masks only the chips and never eats the container's
          own border. Putting the boundary on one container is also what keeps
          every chip free of a 1px low-opacity outline: the group reads as a
          single object, and selection is carried by a solid ink FILL — a far
          more than 3:1 change against the white ground — so WCAG 1.4.11 is met
          by fill, not by a hairline that would measure ~1.4:1.

          `hairline-strong` rather than `hairline` because this rail sits on
          cream (#FBF7F0), not on the cream-100 band the offerings rail uses:
          the 10% line is effectively invisible against a near-white ground.

          `w-max max-w-full` keeps the container hugging its chips instead of
          trailing an empty white tail when the set is short. */}
      <div className="mt-3 w-max max-w-full rounded-pill border border-hairline-strong bg-white">
        <div
          ref={railRef}
          role="group"
          aria-labelledby={labelId}
          /* The mask is suppressed while focus is inside: a chip focused at
             either edge would otherwise have its focus ring faded out by the
             very gradient that signals the overflow. */
          data-fade={railFocused ? "none" : fade}
          onFocus={() => setRailFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setRailFocused(false);
            }
          }}
          className={cn(
            // The 5px scrollport padding lives here, not on the wrapper, so the
            // focus ring (2px offset + 2px) has room before the overflow clip;
            // scroll-px-2 keeps a chip scrolled into view off the hard edge.
            "flex flex-nowrap gap-1.5 overflow-x-auto scroll-px-2 p-[5px]",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "data-[fade=start]:[mask-image:linear-gradient(to_right,transparent_0,black_28px)]",
            "data-[fade=end]:[mask-image:linear-gradient(to_right,black_calc(100%_-_28px),transparent_100%)]",
            "data-[fade=both]:[mask-image:linear-gradient(to_right,transparent_0,black_28px,black_calc(100%_-_28px),transparent_100%)]"
          )}
        >
          <TagChip
            label="All"
            count={posts.length}
            selected={active === null}
            controls={resultsId}
            onSelect={() => setChosen(null)}
          />
          {chipTags.map((tag) => (
            <TagChip
              key={tag}
              label={tagLabel(tag)}
              count={counts.get(tag) ?? 0}
              selected={active === tag}
              controls={resultsId}
              onSelect={() => setChosen(tag)}
            />
          ))}
        </div>
      </div>

      <div id={resultsId} className="mt-8 sm:mt-10">
        {filtered.length === 0 ? (
          /* S11 / S36: no box. The old empty state was a `border-cream-200`
             panel — cream-200 on cream measures ~1.2:1, the exact edge the
             design map calls out as invisible. A hairline, a sentence, and a
             real way out. The escape is a text link with an icon, never an
             outlined control. */
          <div className="border-t border-hairline pt-8 text-center">
            <p className="font-serif text-body-lg text-ink text-balance">
              {active ? (
                <>
                  Nothing tagged{" "}
                  <span className="font-semibold">{tagLabel(active)}</span> yet.
                </>
              ) : (
                <>No posts published yet.</>
              )}
            </p>
            {active ? (
              <button
                type="button"
                onClick={() => setChosen(null)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md text-body-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Show all {numberFormat.format(posts.length)} posts
              </button>
            ) : null}
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filtered.map((post) => (
              <li key={post.slug} className="relative">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function TagChip({
  label,
  count,
  selected,
  controls,
  onSelect,
}: {
  label: string;
  count: number;
  selected: boolean;
  controls: string;
  onSelect: () => void;
}) {
  const countLabel = count === 1 ? "1 post" : `${numberFormat.format(count)} posts`;
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-controls={controls}
      /* The visible text reads "Tally 4"; spoken, that is ambiguous. The
         accessible name still opens with the visible label, so Label-in-Name
         (2.5.3) holds and voice control can still say "click Tally". */
      aria-label={`${label}, ${countLabel}`}
      onClick={onSelect}
      className={cn(
        // S19: Manrope, inherited — a control never takes the serif.
        // S24: a pill is a tag or a filter toggle. It is never a submit
        // control, and nothing here submits.
        "flex flex-none items-center gap-2 rounded-pill px-[18px] py-[9px] text-[14px] font-semibold transition-colors",
        selected
          ? // S35: the active chip INVERTS. cream-200 on ink measures 12.18:1.
            "bg-ink text-cream-200"
          : "text-ink-700 hover:bg-cream-100 hover:text-ink"
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "tabular-nums-strict text-[12px] font-semibold",
          // on-ink-muted is 7.10:1 on ink; ink-500 is 6.4:1 on white. ink-500
          // is forbidden ON ink and is not used there.
          selected ? "text-on-ink-muted" : "text-ink-500"
        )}
      >
        {numberFormat.format(count)}
      </span>
    </button>
  );
}
