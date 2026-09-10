import { z } from "zod";
import {
  FaqSchema,
  PageHeroSchema,
  PricingTierSchema,
  type Faq,
  type PageHero,
  type PricingTier,
} from "@/lib/schema";

export const pricingHero: PageHero = PageHeroSchema.parse({
  eyebrow: "TallyPrime pricing",
  title: "Transparent pricing for every stage of your Tally journey.",
  sub: "Finquanta resells TallyPrime at MRP, and bundles implementation, training, and support at flat rates you can see before you commit.",
  gradient: "mist",
});

export const tiers: readonly PricingTier[] = z
  .array(PricingTierSchema)
  .parse([
    {
      id: "tier-silver",
      name: "Starter",
      priceNote: "From ₹22,500 (single-user)",
      blurb:
        "TallyPrime licence + essentials — right for the first-time buyer who wants Tally set up and their team trained.",
      features: [
        "TallyPrime single-user licence",
        "1 year Tally Software Services (TSS)",
        "Company creation + chart of accounts setup",
        "Two user training sessions (remote)",
        "Remote support — business hours",
      ],
      recommended: false,
      ctaLabel: "Get Starter quote",
    },
    {
      id: "tier-gold",
      name: "Growth",
      priceNote: "From ₹62,500 (multi-user)",
      blurb:
        "For small teams of 5–15 users who need multi-user access, GST workflow, and proactive support.",
      features: [
        "TallyPrime multi-user (Gold) licence",
        "1 year TSS renewal included",
        "GST + e-invoice + e-way bill configuration",
        "Four user training sessions (onsite + remote)",
        "AMC — priority response SLA (same day)",
        "Quarterly health check with written report",
      ],
      recommended: true,
      ctaLabel: "Get Growth quote",
    },
    {
      id: "tier-enterprise",
      name: "Enterprise",
      priceNote: "Contact sales",
      blurb:
        "For 25+ user teams with branches, custom workflows, integrations, and the need for a dedicated engineer.",
      features: [
        "TallyPrime Server licence or Tally on Cloud",
        "Multi-branch data synchronisation",
        "Custom TDL, reports, and add-ons",
        "Integrations with ERP/CRM/banking",
        "Dedicated account engineer",
        "Sub-hour response SLAs",
      ],
      recommended: false,
      ctaLabel: "Talk to sales",
    },
  ]);

export const pricingFaqs: readonly Faq[] = z.array(FaqSchema).parse([
  {
    q: "Do I pay Finquanta extra for TallyPrime licences?",
    a: "No. We resell TallyPrime licences at Tally's published MRP. Finquanta's fee is for implementation, training, add-ons, and support — all listed separately on every quote.",
  },
  {
    q: "What is TSS and do I have to renew it?",
    a: "TSS (Tally Software Services) is a yearly subscription from Tally that keeps your product current with statutory updates, new features, and priority Tally support. It is strongly recommended for GST-registered businesses; we handle the renewal for you.",
  },
  {
    q: "Can I upgrade later from Starter to Growth?",
    a: "Yes. Tally licences are upgrade-in-place — you pay the differential to Tally, and we handle the reconfiguration. No data loss.",
  },
  {
    q: "Do the prices on this page include GST?",
    a: "Pricing shown is before 18% GST. Your quote will itemise the licence, services, and GST separately.",
  },
  {
    q: "What is the typical implementation timeline?",
    a: "Starter: 1–2 weeks. Growth: 3–5 weeks including training. Enterprise and multi-branch: 6–12 weeks depending on scope and integrations.",
  },
  {
    q: "Do you offer a refund if we are not satisfied?",
    a: "Tally licences are non-refundable once activated (Tally's policy). Finquanta's own services carry a pro-rata refund under our Refund Policy — see the policy page for details.",
  },
]);
