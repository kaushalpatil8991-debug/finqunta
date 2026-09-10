import { z } from "zod";
import { indianMobileRegex } from "./utils";

/**
 * Shared base for "content" items — carries an id and a placeholder flag
 * so the dev-only banner can count items labeled isPlaceholder: true.
 */
const contentBase = z.object({
  id: z.string().min(1),
  isPlaceholder: z.boolean().default(true),
});

/* ——————————————————— Testimonials ——————————————————— */
export const SectorSchema = z.enum([
  "Pharma",
  "Media",
  "Chemicals",
  "Manufacturing",
  "Distribution",
  "Retail",
  "Services",
  "FinancialServices",
  "Exports",
  "Other",
]);
export type Sector = z.infer<typeof SectorSchema>;

export const LocaleSchema = z.enum(["en", "mr", "hi"]);
export type Locale = z.infer<typeof LocaleSchema>;

export const TestimonialSchema = contentBase.extend({
  quote: z.string().min(40).max(500),
  authorName: z.string().min(2),
  authorTitle: z.string().min(2),
  company: z.string().min(2),
  avatar: z.string().optional(),
  logo: z.string().optional(),
  sector: SectorSchema,
  locale: LocaleSchema.default("en"),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

/* ——————————————————— Clients ——————————————————— */
export const ClientSchema = contentBase.extend({
  name: z.string().min(2),
  logoSrc: z.string().optional(), // optional inline svg path; we fall back to wordmark
  sector: z.string(),
  href: z.string().optional(),
});
export type Client = z.infer<typeof ClientSchema>;

/* ——————————————————— Awards ——————————————————— */
export const AwardSchema = contentBase.extend({
  title: z.string().min(2),
  year: z.number().int().min(1990).max(2100),
  issuer: z.string().min(2),
  description: z.string().max(180),
});
export type Award = z.infer<typeof AwardSchema>;

/* ——————————————————— Values ——————————————————— */
export const ValueItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  icon: z.string(), // Lucide icon name (validated at render time)
  summary: z.string().max(140),
});
export type ValueItem = z.infer<typeof ValueItemSchema>;

/* ——————————————————— Hero Slides ——————————————————— */
export const HeroCtaSchema = z.object({
  label: z.string().min(2),
  href: z.string(),
  opensModal: z.enum(["enquiry", "talk", "callback"]).optional(),
});
export type HeroCta = z.infer<typeof HeroCtaSchema>;

export const HeroGradientSchema = z.enum([
  "plum",
  "mist",
  "sand",
  "violet",
  "cream-gold",
]);
export type HeroGradient = z.infer<typeof HeroGradientSchema>;

export const HeroArtSchema = z.enum(["arcs", "dots", "bars", "orbit", "grid"]);
export type HeroArt = z.infer<typeof HeroArtSchema>;

export const HeroSlideSchema = contentBase.extend({
  eyebrow: z.string().optional(),
  heading: z.string().min(4),
  sub: z.string().max(220),
  primaryCta: HeroCtaSchema,
  secondaryCta: HeroCtaSchema.optional(),
  gradient: HeroGradientSchema,
  art: HeroArtSchema,
});
export type HeroSlide = z.infer<typeof HeroSlideSchema>;

/* ——————————————————— Stats ——————————————————— */
export const StatSchema = z.object({
  id: z.string().min(1),
  value: z.number().nonnegative(),
  suffix: z.string().optional(),
  label: z.string().min(2),
  icon: z.string(),
});
export type Stat = z.infer<typeof StatSchema>;

/* ——————————————————— Offerings ——————————————————— */
export const OfferingSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  body: z.string().max(200),
  href: z.string(),
  ctaLabel: z.string().optional(),
  icon: z.string(),
  comingSoon: z.boolean().default(true),
});
export type Offering = z.infer<typeof OfferingSchema>;

export const OfferingTabSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(2),
  items: z.array(OfferingSchema).min(2).max(6),
});
export type OfferingTab = z.infer<typeof OfferingTabSchema>;

/* ——————————————————— Navigation (mega menu) ——————————————————— */
export const NavLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string(),
  external: z.boolean().default(false),
  comingSoon: z.boolean().default(false),
  opensModal: z.enum(["enquiry", "talk", "callback"]).optional(),
});
export type NavLink = z.infer<typeof NavLinkSchema>;

export const NavGroupSchema = z.object({
  label: z.string().min(1),
  children: z.array(NavLinkSchema),
});
export type NavGroup = z.infer<typeof NavGroupSchema>;

/**
 * MegaMenuItem is a top-level nav entry. Either it has `groups` (renders as a
 * multi-column dropdown panel) or `children` (renders as a single dropdown),
 * or it is a direct link (no groups/children — only label + href).
 */
export const MegaMenuItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().optional(),
  groups: z.array(NavGroupSchema).optional(),
  children: z.array(NavLinkSchema).optional(),
  comingSoon: z.boolean().default(false),
  opensModal: z.enum(["enquiry", "talk", "callback"]).optional(),
});
export type MegaMenuItem = z.infer<typeof MegaMenuItemSchema>;

/* ——————————————————— Cloud section bullets ——————————————————— */
export const CloudBulletSchema = z.object({
  title: z.string().min(2),
  body: z.string().max(180),
});
export type CloudBullet = z.infer<typeof CloudBulletSchema>;

/* ——————————————————— Form payloads ——————————————————— */
export const LeadSourceSchema = z.enum([
  "enquiry",
  "talk-to-expert",
  "callback",
  "hero",
  "cloud",
  "offerings",
  "footer",
]);
export type LeadSource = z.infer<typeof LeadSourceSchema>;

/** Standard UTM marketing parameters — captured server-side from the URL. */
export const UtmSchema = z
  .object({
    source: z.string().max(120).optional(),
    medium: z.string().max(120).optional(),
    campaign: z.string().max(120).optional(),
    term: z.string().max(120).optional(),
    content: z.string().max(120).optional(),
    referrer: z.string().max(240).optional(),
  })
  .partial();
export type Utm = z.infer<typeof UtmSchema>;

export const LeadPayloadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .regex(indianMobileRegex, "Enter a valid 10-digit Indian mobile number"),
  email: z.email("Enter a valid email address"),
  requirement: z
    .string()
    .min(10, "Tell us a bit more (at least 10 characters)")
    .max(500),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please accept the terms to continue"),
  source: LeadSourceSchema.optional(),
  /** reCAPTCHA v3 token — included on every real submission. */
  recaptchaToken: z.string().optional(),
  /** UTM / referrer attribution captured client-side. */
  utm: UtmSchema.optional(),
});
export type LeadPayload = z.infer<typeof LeadPayloadSchema>;

export const NewsletterPayloadSchema = z.object({
  email: z.email("Enter a valid email address"),
  recaptchaToken: z.string().optional(),
});
export type NewsletterPayload = z.infer<typeof NewsletterPayloadSchema>;

/**
 * Session token payload issued by `submitLead` and consumed by
 * /api/otp/verify — carries the validated lead so we don't need a
 * server-side session store. Signed with HMAC-SHA256 (lib/backend/signing).
 */
export const LeadSessionSchema = z.object({
  lead: LeadPayloadSchema,
  issuedAt: z.number().int().positive(),
});
export type LeadSession = z.infer<typeof LeadSessionSchema>;

/* ——————————————————— SP2: Inner-page content types ——————————————————— */

/** Page hero meta — reused by every inner page. */
export const PageHeroSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(4),
  sub: z.string().max(360),
  gradient: HeroGradientSchema.optional(),
});
export type PageHero = z.infer<typeof PageHeroSchema>;

/** Generic feature card item — used in product/service feature grids. */
export const FeatureSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  body: z.string().max(280),
  icon: z.string(),
});
export type Feature = z.infer<typeof FeatureSchema>;

/** FAQ row — pricing, services, policies. */
export const FaqSchema = z.object({
  q: z.string().min(5),
  a: z.string().min(10),
});
export type Faq = z.infer<typeof FaqSchema>;

/** Pricing tier for the TallyPrime pricing page. */
export const PricingTierSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  priceNote: z.string().min(1),
  blurb: z.string().max(200),
  features: z.array(z.string().min(2)).min(1),
  recommended: z.boolean().default(false),
  ctaLabel: z.string().min(2).default("Get a quote"),
});
export type PricingTier = z.infer<typeof PricingTierSchema>;

/** Download release row. */
export const DownloadSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  version: z.string().min(1),
  sizeMb: z.number().positive(),
  releaseDate: z.string().min(4),
  notes: z.string().max(300),
  os: z.enum(["windows", "mac", "linux", "android", "ios"]).default("windows"),
});
export type Download = z.infer<typeof DownloadSchema>;

/** Event / webinar row. */
export const EventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  date: z.string().min(4),
  location: z.string().min(2),
  summary: z.string().max(300),
  kind: z.enum(["webinar", "workshop", "meetup", "announcement"]),
  status: z.enum(["upcoming", "past"]),
});
export type Event = z.infer<typeof EventSchema>;

/** Career opening. */
export const JobOpeningSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(2),
  location: z.string().min(2),
  employment: z.enum(["full-time", "part-time", "contract", "intern"]),
  experience: z.string().min(1),
  summary: z.string().max(320),
});
export type JobOpening = z.infer<typeof JobOpeningSchema>;

/** Policy section — paragraphs grouped under a heading. */
/**
 * A block inside a policy section.
 *
 * `body` used to be `z.array(z.string())` rendered strictly as <p>, which meant
 * the refund, delivery and cancellation matrices — condition on the left,
 * consequence on the right — had to ship as prose, and Prose's list styles were
 * unreachable. These four block types are what unblocks the six legal docs.
 *
 * MIGRATION IS LOSSLESS AND OPT-IN. A bare string is still accepted and coerced
 * to a paragraph, so all six content files parse unchanged and not one word of
 * legal copy was rewritten to land this. Authors move a section to a `table` or
 * `list` when they choose to; nothing forces them.
 */
export const PolicyBlockSchema = z.union([
  z.object({
    type: z.literal("paragraph"),
    text: z.string().min(2),
  }),
  z.object({
    type: z.literal("list"),
    ordered: z.boolean().optional(),
    items: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    type: z.literal("table"),
    caption: z.string().optional(),
    /** Exactly two columns: the condition, then its consequence. */
    columns: z.array(z.string().min(1)).length(2),
    rows: z.array(z.array(z.string().min(1)).length(2)).min(1),
  }),
  z.object({
    type: z.literal("callout"),
    /** `warning` is for legally load-bearing terms — liability caps,
     *  jurisdiction, quote validity — that must not read as ordinary copy. */
    tone: z.enum(["note", "warning"]).optional(),
    title: z.string().optional(),
    text: z.string().min(2),
  }),
]);
export type PolicyBlock = z.infer<typeof PolicyBlockSchema>;

/** Accepts a legacy bare string and normalises it to a paragraph block. */
const PolicyBlockInput = z.union([
  z
    .string()
    .min(2)
    .transform((text): PolicyBlock => ({ type: "paragraph", text })),
  PolicyBlockSchema,
]);

export const PolicySectionSchema = z.object({
  heading: z.string().min(2),
  body: z.array(PolicyBlockInput).min(1),
});
export type PolicySection = z.infer<typeof PolicySectionSchema>;

/** Full policy document. */
export const PolicyDocSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().max(240),
  lastUpdated: z.string().min(4),
  intro: z.string().min(10),
  sections: z.array(PolicySectionSchema).min(1),
});
export type PolicyDoc = z.infer<typeof PolicyDocSchema>;

/** Numbered process step — "How we work" sections. */
export const ProcessStepSchema = z.object({
  step: z.number().int().positive(),
  title: z.string().min(2),
  body: z.string().max(260),
});
export type ProcessStep = z.infer<typeof ProcessStepSchema>;

/* ——————————————————— SP3: Detail-page content types ——————————————————— */

/** Spec-table row — label on the left, value on the right. */
export const SpecRowSchema = z.object({
  label: z.string().min(2),
  value: z.string().min(1),
});
export type SpecRow = z.infer<typeof SpecRowSchema>;

/** Related-card shape — compact cross-link between detail pages. */
export const RelatedItemSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(2),
  blurb: z.string().max(180),
  /** Category base path, e.g. "/tally-erp-9-products" */
  base: z.string().startsWith("/"),
  icon: z.string().optional(),
});
export type RelatedItem = z.infer<typeof RelatedItemSchema>;

/** Shared base for every detail document. */
const detailBase = z.object({
  slug: z.string().min(1),
  title: z.string().min(2),
  tagline: z.string().max(160),
  hero: PageHeroSchema,
  /** Short one-liner shown in cards + breadcrumb trail. */
  summary: z.string().max(200),
});

/** TallyPrime edition — single-user / multi-user / server / virtual. */
export const EditionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  priceNote: z.string().min(1),
  blurb: z.string().max(200),
  includes: z.array(z.string().min(2)).min(1),
});
export type Edition = z.infer<typeof EditionSchema>;

/** Tally product detail (TallyPrime, Server, TSS, etc.). */
export const ProductDetailSchema = detailBase.extend({
  features: z.array(FeatureSchema).min(2),
  specs: z.array(SpecRowSchema).min(2),
  editions: z.array(EditionSchema).optional(),
  faqs: z.array(FaqSchema).optional(),
  relatedSlugs: z.array(z.string().min(1)).default([]),
});
export type ProductDetail = z.infer<typeof ProductDetailSchema>;

/** Tally service detail (AMC, training, data sync, etc.). */
export const ServiceDetailSchema = detailBase.extend({
  features: z.array(FeatureSchema).min(2),
  process: z.array(ProcessStepSchema).optional(),
  deliverables: z.array(z.string().min(2)).optional(),
  faqs: z.array(FaqSchema).optional(),
  relatedSlugs: z.array(z.string().min(1)).default([]),
});
export type ServiceDetail = z.infer<typeof ServiceDetailSchema>;

/** Add-on module detail. */
export const AddonDetailSchema = detailBase.extend({
  icon: z.string(),
  features: z.array(FeatureSchema).min(2),
  specs: z.array(SpecRowSchema).optional(),
  benefits: z.array(z.string().min(2)).min(1),
  faqs: z.array(FaqSchema).optional(),
  relatedSlugs: z.array(z.string().min(1)).default([]),
});
export type AddonDetail = z.infer<typeof AddonDetailSchema>;

/** Mobile app detail. */
export const MobileAppDetailSchema = detailBase.extend({
  icon: z.string(),
  platforms: z.array(z.enum(["android", "ios"])).min(1),
  features: z.array(FeatureSchema).min(2),
  capabilities: z.array(z.string().min(2)).min(1),
  specs: z.array(SpecRowSchema).optional(),
  faqs: z.array(FaqSchema).optional(),
  relatedSlugs: z.array(z.string().min(1)).default([]),
});
export type MobileAppDetail = z.infer<typeof MobileAppDetailSchema>;

/** Vertical industry pack detail. */
export const VerticalPackDetailSchema = detailBase.extend({
  icon: z.string(),
  /** Short list of pain-points addressed. */
  painPoints: z.array(z.string().min(2)).min(1),
  features: z.array(FeatureSchema).min(2),
  outcomes: z.array(z.string().min(2)).min(1),
  faqs: z.array(FaqSchema).optional(),
  relatedSlugs: z.array(z.string().min(1)).default([]),
});
export type VerticalPackDetail = z.infer<typeof VerticalPackDetailSchema>;

/** Booster pack detail. */
export const BoosterPackDetailSchema = detailBase.extend({
  icon: z.string(),
  contents: z.array(z.string().min(2)).min(1),
  features: z.array(FeatureSchema).min(2),
  specs: z.array(SpecRowSchema).optional(),
  faqs: z.array(FaqSchema).optional(),
  relatedSlugs: z.array(z.string().min(1)).default([]),
});
export type BoosterPackDetail = z.infer<typeof BoosterPackDetailSchema>;

/* ——————————————————— SP4: Blog + case-study content ——————————————————— */

/** Blog post tag — a small set used across posts for filtering. */
export const BlogTagSchema = z.enum([
  "tally",
  "gst",
  "cloud",
  "mis",
  "addons",
  "amc",
  "integrations",
  "compliance",
  "product",
  "how-to",
]);
export type BlogTag = z.infer<typeof BlogTagSchema>;

/** Blog post frontmatter (exported from each .mdx as `meta`). */
export const BlogPostMetaSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(4).max(140),
  excerpt: z.string().min(10).max(240),
  date: z.string().min(4), // ISO
  author: z.string().min(2),
  tags: z.array(BlogTagSchema).min(1).max(4),
  readMinutes: z.number().int().positive().max(30),
  gradient: HeroGradientSchema.default("plum"),
});
export type BlogPostMeta = z.infer<typeof BlogPostMetaSchema>;

/** Case-study metric (compact numeric callout). */
export const CaseStudyMetricSchema = z.object({
  label: z.string().min(2),
  value: z.string().min(1),
});
export type CaseStudyMetric = z.infer<typeof CaseStudyMetricSchema>;

/** Case-study frontmatter (exported from each .mdx as `meta`). */
export const CaseStudyMetaSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(4).max(140),
  customer: z.string().min(2),
  sector: z.string().min(2),
  /** Short teaser line for index cards + search engines. */
  excerpt: z.string().min(10).max(240),
  /** Longer challenge/outcome summary, used above the MDX body. */
  summary: z.string().min(20).max(500),
  date: z.string().min(4),
  metrics: z.array(CaseStudyMetricSchema).min(2).max(4),
  gradient: HeroGradientSchema.default("sand"),
});
export type CaseStudyMeta = z.infer<typeof CaseStudyMetaSchema>;

export const OtpIssuePayloadSchema = z.object({
  phone: z.string().regex(indianMobileRegex),
});
export const OtpVerifyPayloadSchema = z.object({
  phone: z.string().regex(indianMobileRegex),
  code: z.string().length(6).regex(/^\d{6}$/, "OTP must be 6 digits"),
});
export type OtpIssuePayload = z.infer<typeof OtpIssuePayloadSchema>;
export type OtpVerifyPayload = z.infer<typeof OtpVerifyPayloadSchema>;
