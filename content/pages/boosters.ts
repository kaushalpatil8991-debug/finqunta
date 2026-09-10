import { z } from "zod";
import {
  FeatureSchema,
  PageHeroSchema,
  type Feature,
  type PageHero,
} from "@/lib/schema";

export const boostersHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Solution boosters",
  title: "Productivity packs that make Tally feel lighter every day.",
  sub: "Curated bundles of our most-installed TDLs and utilities — auto-entry tools, reconciliation helpers, report generators, and workflow shortcuts.",
  gradient: "violet",
});

export const boosters: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "bo-daily",
      title: "Daily Desk Booster",
      body: "Keyboard shortcuts, auto-narration, voucher-duplication, quick-search for ledgers — the daily-use pack for accounts teams.",
      icon: "Keyboard",
    },
    {
      id: "bo-reco",
      title: "Reconciliation Booster",
      body: "Bank reco, debtor/creditor reconciliation, and 2A/2B matcher — all with one-click exception reports.",
      icon: "GitCompare",
    },
    {
      id: "bo-reports",
      title: "Reporting Booster",
      body: "20+ ready-to-run management reports — ageing, profitability by branch, fastest-moving SKUs, and more.",
      icon: "BarChart3",
    },
    {
      id: "bo-mis",
      title: "MIS Booster",
      body: "Dashboard-friendly exports + preconfigured pivot tables. Right for CFOs who want a monthly pack without any manual prep.",
      icon: "LayoutDashboard",
    },
    {
      id: "bo-ops",
      title: "Operations Booster",
      body: "Stock ageing, slow-moving inventory alerts, credit-limit monitor, overdue-invoice trackers — shop-floor-ready tools.",
      icon: "Activity",
    },
    {
      id: "bo-compliance",
      title: "Compliance Booster",
      body: "TDS calculator, GST working sheets, advance-tax planner, 26AS reconciliation — all runs from inside Tally.",
      icon: "ShieldCheck",
    },
  ]);

export const boostersPromise =
  "Every booster pack is a bundle of our own TDLs. Installs in 15 minutes, works on TallyPrime and above. Pay per pack or subscribe to the full set.";
