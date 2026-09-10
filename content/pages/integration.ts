import { z } from "zod";
import {
  FeatureSchema,
  PageHeroSchema,
  type Feature,
  type PageHero,
} from "@/lib/schema";

export const integrationHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Integrations & APIs",
  title: "Connect Tally to every other system in your business.",
  sub: "E-commerce, payment gateways, CRMs, banking portals, logistics partners, custom in-house applications — we wire them into Tally cleanly, with monitoring and alerts on every sync.",
  gradient: "plum",
});

export const integrationFeatures: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "in-1",
      title: "E-commerce",
      body: "Shopify, WooCommerce, Magento, Flipkart, Meesho, Myntra — sales orders and payouts land in Tally with SKU-level reconciliation.",
      icon: "ShoppingBag",
    },
    {
      id: "in-2",
      title: "Payment gateways",
      body: "Razorpay, PayU, CCAvenue, Cashfree — settled payments auto-post to the right bank ledger with gateway fees tracked separately.",
      icon: "CreditCard",
    },
    {
      id: "in-3",
      title: "CRM & sales tools",
      body: "Zoho CRM, HubSpot, Salesforce — customer records, quotations, and won deals flow to Tally as sales orders and invoices.",
      icon: "Users",
    },
    {
      id: "in-4",
      title: "Banking & UPI",
      body: "HDFC, ICICI, Axis, SBI corporate banking — statement imports, payment initiation, and bulk NEFT/RTGS runs from inside Tally.",
      icon: "Landmark",
    },
    {
      id: "in-5",
      title: "Logistics & dispatch",
      body: "Delhivery, Shiprocket, BlueDart — e-way bill generation, AWB tracking, and POD attachments tied to each Tally sale.",
      icon: "Truck",
    },
    {
      id: "in-6",
      title: "Custom APIs",
      body: "Got a home-grown ERP or an industry-specific SaaS? We build a two-way sync via webhooks, REST APIs, or file drops.",
      icon: "Link2",
    },
  ]);

export const integrationPromise =
  "Every integration we build carries written failure-mode documentation, monitoring dashboards, and an escalation runbook for your IT team. No black boxes.";
