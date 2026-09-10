import { z } from "zod";
import {
  FeatureSchema,
  PageHeroSchema,
  ProcessStepSchema,
  type Feature,
  type PageHero,
  type ProcessStep,
} from "@/lib/schema";

export const customizationHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Tally customisation",
  title: "Shape Tally to your SOPs — not the other way round.",
  sub: "Custom vouchers, invoice formats, reports, validations, and end-to-end workflow automations. Built on Tally's own TDL so they upgrade cleanly with every Tally release.",
  gradient: "violet",
});

export const customizationFeatures: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "cu-1",
      title: "Custom invoice formats",
      body: "Branded, multi-language, signature-ready invoice templates. GST-compliant; e-invoice-ready.",
      icon: "FileText",
    },
    {
      id: "cu-2",
      title: "Custom voucher types",
      body: "New voucher types, field-level validations, auto-generated narrations, and approval flows.",
      icon: "FilePlus",
    },
    {
      id: "cu-3",
      title: "Custom reports",
      body: "Any cut of your Tally data — by branch, item, customer, sales-person — formatted how your team reads it.",
      icon: "BarChart3",
    },
    {
      id: "cu-4",
      title: "Approval workflows",
      body: "Credit-note approvals, large-order hand-offs, discount authorisations — all routed via role-based permissions.",
      icon: "CheckSquare",
    },
    {
      id: "cu-5",
      title: "Data validations",
      body: "Enforce field rules — mandatory GSTIN, valid HSN codes, credit-limit checks, date-range sanity. Errors caught at entry, not at month-end.",
      icon: "ShieldAlert",
    },
    {
      id: "cu-6",
      title: "Batch utilities",
      body: "One-click imports, bulk price updates, period-end journal posting, year-end rollovers — we build the utility once, you run it forever.",
      icon: "Zap",
    },
  ]);

export const customizationProcess: readonly ProcessStep[] = z
  .array(ProcessStepSchema)
  .parse([
    {
      step: 1,
      title: "Workflow study",
      body: "We sit with your accounts team for a session to map the current process — voucher by voucher, field by field.",
    },
    {
      step: 2,
      title: "Written spec",
      body: "A short, plain-English spec with screen mockups. You approve it before we start coding.",
    },
    {
      step: 3,
      title: "Build & UAT",
      body: "We build on a staging copy of your Tally data. Two UAT cycles included; revisions until it is right.",
    },
    {
      step: 4,
      title: "Rollout & training",
      body: "Cutover on a date you pick — with user training, documentation, and a warranty window for any bugs.",
    },
  ]);

export const customizationNote =
  "All customisations are TDL-based and version-tracked. When you upgrade to the next TallyPrime release, we port the TDL in the same sprint — included in active-cover AMCs.";
