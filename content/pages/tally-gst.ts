import { z } from "zod";
import {
  FaqSchema,
  FeatureSchema,
  PageHeroSchema,
  type Faq,
  type Feature,
  type PageHero,
} from "@/lib/schema";

export const gstHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Tally GST",
  title: "GST, e-invoice, e-way bill — all inside your Tally.",
  sub: "End-to-end GST workflow configured and monitored. From tax-aware vouchers to GSTR-1/3B filing, e-invoice generation, and 2A/2B reconciliation — everything runs from one place.",
  gradient: "cream-gold",
});

export const gstFeatures: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "gst-1",
      title: "GST-ready vouchers",
      body: "Every sale, purchase, and service voucher auto-calculates CGST / SGST / IGST based on place-of-supply and HSN code.",
      icon: "FileCheck2",
    },
    {
      id: "gst-2",
      title: "E-invoice generation",
      body: "Generate e-invoices and IRN from inside Tally — mandatory for businesses above the current turnover threshold.",
      icon: "FileSignature",
    },
    {
      id: "gst-3",
      title: "E-way bill automation",
      body: "E-way bill raised automatically on every qualifying sale, with transporter and vehicle details captured once.",
      icon: "Truck",
    },
    {
      id: "gst-4",
      title: "GSTR-1 / 3B preparation",
      body: "Auto-generated return drafts from your Tally data. Review, tweak, and file — or export JSON straight to the portal.",
      icon: "FileOutput",
    },
    {
      id: "gst-5",
      title: "2A / 2B reconciliation",
      body: "Download GSTR-2A / 2B from the portal and match line-by-line against your Tally purchase register. Mismatches flagged.",
      icon: "GitCompare",
    },
    {
      id: "gst-6",
      title: "HSN & SAC master cleanup",
      body: "We audit your existing item masters for HSN/SAC errors, fix them in bulk, and set up validations to prevent future drift.",
      icon: "ListChecks",
    },
  ]);

export const gstFaqs: readonly Faq[] = z.array(FaqSchema).parse([
  {
    q: "Is e-invoicing mandatory for my business?",
    a: "If your aggregate turnover crossed the current e-invoice threshold (₹5 crore at the time of writing) in any year from FY 2017–18 onwards, yes. Thresholds change; we track and alert.",
  },
  {
    q: "Can you help with past GST filing mistakes?",
    a: "Yes. We offer a reconciliation + corrective-filing service that compares your filed returns against your Tally data and prepares amendment returns where needed.",
  },
  {
    q: "Do you file returns for us directly?",
    a: "We prepare and validate returns in Tally. Filing is done by you or your CA — we coordinate with your CA if you prefer.",
  },
  {
    q: "What happens when GST law changes?",
    a: "TSS-covered TallyPrime installations pick up statutory updates automatically. We send a one-page change note every time the law moves, with action items.",
  },
]);
