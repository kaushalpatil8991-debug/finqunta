import { z } from "zod";
import { CaseStudyMetaSchema, type CaseStudyMeta } from "@/lib/schema";
import { proof } from "@/content/proof";

import { meta as nashikDistribution } from "./nashik-distribution.mdx";
import { meta as punePharma } from "./pune-pharma.mdx";
import { meta as nagpurManufacturer } from "./nagpur-manufacturer.mdx";
import { meta as mumbaiNgo } from "./mumbai-ngo.mdx";

/**
 * All case studies — each .mdx file exports `meta` typed against
 * CaseStudyMetaSchema. Validated at module load; sorted newest-first
 * for the /case-study index.
 */
/** Every written case study, confirmed or not. Do not render this list. */
export const allCaseStudies: readonly CaseStudyMeta[] = z
  .array(CaseStudyMetaSchema)
  .parse([nashikDistribution, punePharma, nagpurManufacturer, mumbaiNgo])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

/**
 * Published case studies: only slugs listed in proof.confirmedCaseStudies
 * (real story, client agreed to be named). Everything on the site reads this.
 */
export const caseStudies: readonly CaseStudyMeta[] = allCaseStudies.filter((c) =>
  proof.confirmedCaseStudies.includes(c.slug)
);

export const caseStudyBySlug: Record<string, CaseStudyMeta> =
  Object.fromEntries(caseStudies.map((c) => [c.slug, c]));

export const caseStudySlugs: readonly string[] = caseStudies.map((c) => c.slug);
