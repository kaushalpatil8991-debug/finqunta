import { z } from "zod";
import {
  FaqSchema,
  FeatureSchema,
  PageHeroSchema,
  type Faq,
  type Feature,
  type PageHero,
} from "@/lib/schema";

export const productsHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Tally software",
  title: "The full TallyPrime product line — bought and supported in one place.",
  sub: "TallyPrime · TallyPrime Server · TallyPrime Auditor's Edition · Tally Software Services · Tally Virtual User · Tally ERP 9. Finquanta sources, activates, and supports every variant.",
  gradient: "plum",
});

export const productsIntro =
  "TallyPrime is India's most widely deployed business accounting software, with over 2 million licensees. Finquanta sells the full product line at Tally's published MRP, activates your licence the same day, and wraps it in implementation, training, and ongoing support.";

export const productsFeatures: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "pf-1",
      title: "TallyPrime",
      body: "The flagship desktop accounting product. Single-user (Silver) and multi-user (Gold) editions, on-prem or cloud-hosted.",
      icon: "Box",
    },
    {
      id: "pf-2",
      title: "TallyPrime Server",
      body: "High-concurrency server edition for teams of 10+ users. Role-based access, administrative controls, heavy-load tolerance.",
      icon: "Server",
    },
    {
      id: "pf-3",
      title: "Tally Virtual User (TVU)",
      body: "Pay-per-user virtual access to TallyPrime hosted on Tally's cloud. Right for distributed teams and remote branches.",
      icon: "CloudCog",
    },
    {
      id: "pf-4",
      title: "TallyPrime Auditor's Edition",
      body: "Read-only edition for chartered accountants — analyse client data with audit-trail, without risking accidental edits.",
      icon: "BookOpen",
    },
    {
      id: "pf-5",
      title: "Tally Software Services (TSS)",
      body: "The subscription that keeps your Tally current — statutory updates, new features, priority Tally support. Annual renewal.",
      icon: "RefreshCcw",
    },
    {
      id: "pf-6",
      title: "Tally ERP 9 (legacy support)",
      body: "For clients still on Tally ERP 9: we provide upgrade-to-TallyPrime migration, data validation, and user training.",
      icon: "ArchiveRestore",
    },
  ]);

export const productsBullets = [
  {
    title: "Same-day activation",
    body: "Quote to installed-and-activated usually within 24 hours. Often sooner.",
  },
  {
    title: "Original licences",
    body: "Every licence is sourced directly from Tally Solutions. No re-sellers of re-sellers.",
  },
  {
    title: "Hand-held installation",
    body: "We do not email you an installer and wish you luck. Our engineer installs and activates with you on call.",
  },
  {
    title: "Training included",
    body: "Every new licence ships with role-based training for your team. Top-ups any time after.",
  },
] as const;

export const productsFaqs: readonly Faq[] = z.array(FaqSchema).parse([
  {
    q: "Which TallyPrime edition is right for my business?",
    a: "For 1–2 users on one machine, Silver is enough. For concurrent multi-user access, Gold. For 10+ concurrent users or branches, TallyPrime Server or Tally on Cloud. We recommend based on a 15-minute scoping call.",
  },
  {
    q: "Can I upgrade from Silver to Gold later?",
    a: "Yes. Tally allows in-place upgrade by paying the differential. We handle the reconfiguration at no extra charge for active-cover clients.",
  },
  {
    q: "Do you support existing Tally ERP 9 installations?",
    a: "Yes — both as-is and as an upgrade path to TallyPrime. We do data validation, TDL compatibility checks, and user training on the TallyPrime UI changes.",
  },
]);
