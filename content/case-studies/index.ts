import { z } from "zod";
import { CaseStudyMetaSchema, type CaseStudyMeta } from "@/lib/schema";

import { meta as nashikDistribution } from "./nashik-distribution.mdx";
import { meta as punePharma } from "./pune-pharma.mdx";
import { meta as nagpurManufacturer } from "./nagpur-manufacturer.mdx";
import { meta as mumbaiNgo } from "./mumbai-ngo.mdx";

/**
 * All case studies — each .mdx file exports `meta` typed against
 * CaseStudyMetaSchema. Validated at module load; sorted newest-first
 * for the /case-study index.
 */
export const caseStudies: readonly CaseStudyMeta[] = z
  .array(CaseStudyMetaSchema)
  .parse([nashikDistribution, punePharma, nagpurManufacturer, mumbaiNgo])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const caseStudyBySlug: Record<string, CaseStudyMeta> =
  Object.fromEntries(caseStudies.map((c) => [c.slug, c]));

export const caseStudySlugs: readonly string[] = caseStudies.map((c) => c.slug);
