import { z } from "zod";
import { BlogPostMetaSchema, type BlogPostMeta } from "@/lib/schema";

import { meta as migrationGuide } from "./tallyprime-migration-guide.mdx";
import { meta as gstWorkflow } from "./gst-workflow-essentials.mdx";
import { meta as misDashboards } from "./mis-dashboards-that-stick.mdx";
import { meta as cloudReality } from "./tally-on-cloud-reality-check.mdx";
import { meta as pickingAddons } from "./picking-tally-addons.mdx";
import { meta as choosingAmc } from "./choosing-an-amc-partner.mdx";

/**
 * All blog posts — each .mdx file exports `meta` typed against
 * BlogPostMetaSchema. Validated at module load; sorted newest-first
 * for the /blog index.
 */
export const blogPosts: readonly BlogPostMeta[] = z
  .array(BlogPostMetaSchema)
  .parse([
    migrationGuide,
    gstWorkflow,
    misDashboards,
    cloudReality,
    pickingAddons,
    choosingAmc,
  ])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const blogPostBySlug: Record<string, BlogPostMeta> = Object.fromEntries(
  blogPosts.map((p) => [p.slug, p])
);

export const blogSlugs: readonly string[] = blogPosts.map((p) => p.slug);

/** Unique list of tags across all posts, sorted alphabetically. */
export const blogTags: readonly string[] = Array.from(
  new Set(blogPosts.flatMap((p) => p.tags))
).sort();
