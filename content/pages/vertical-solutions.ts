import { z } from "zod";
import {
  FeatureSchema,
  PageHeroSchema,
  type Feature,
  type PageHero,
} from "@/lib/schema";

export const verticalHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Vertical solutions",
  title: "Preconfigured Tally packs for every industry we serve.",
  sub: "Trading, manufacturing, distribution, services, retail, and more — each pack ships with the masters, vouchers, reports, and workflows that your industry needs on day one.",
  gradient: "sand",
});

export const verticalFeatures: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "vt-trading",
      title: "Trading & distribution",
      body: "Multi-godown, batch-wise stock, credit-days tracking, sales-commission, and scheme-based discounts preset.",
      icon: "Warehouse",
    },
    {
      id: "vt-manufacturing",
      title: "Manufacturing",
      body: "Bill of Materials, job-work vouchers, production orders, yield tracking, and scrap handling configured.",
      icon: "Factory",
    },
    {
      id: "vt-pharma",
      title: "Pharma & medical",
      body: "Batch + expiry tracking, statutory licence numbers on every invoice, drug-formulary compliance, narcotics register.",
      icon: "Pill",
    },
    {
      id: "vt-retail",
      title: "Retail",
      body: "POS integration, MRP / landed-cost tracking, schemes & loyalty, multi-branch consolidation.",
      icon: "Store",
    },
    {
      id: "vt-services",
      title: "Services & consulting",
      body: "Time-sheet based invoicing, project profitability, retainer tracking, and GST reverse-charge flow.",
      icon: "Briefcase",
    },
    {
      id: "vt-ngo",
      title: "NGO & trust",
      body: "Grants-in/grants-out, project-wise fund accounting, utilisation reports, 12A and 80G receipt generation.",
      icon: "HeartHandshake",
    },
  ]);

export const verticalNote =
  "Every vertical pack ships on top of your existing TallyPrime licence — no additional licence cost. Pack price covers configuration, training, and one year of pack-specific updates.";
