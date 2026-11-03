import { ScrollHome } from "@/components/home/scroll-home";

/**
 * Home — 2026-10-30 redesign. One client component carries the whole page:
 * two scroll-scrubbed Blender animations with the copy from
 * home_page_content.md around them (components/home/).
 *
 * Removed from the home page on purpose (home_page_content.md "Never print"):
 * the hero carousel, client logos, testimonials, trust stats and awards — all
 * of them invented or unprovable placeholder content. Their components are
 * still in components/sections/ for when real, permitted content exists.
 */
export default function HomePage() {
  return <ScrollHome />;
}
