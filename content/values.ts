import { ValueItemSchema, type ValueItem } from "@/lib/schema";
import { z } from "zod";

/**
 * 6 values — straight from the spec. Lucide icon names verified at render time
 * by the Values component.
 */
const raw: ValueItem[] = [
  {
    id: "v-trust",
    title: "Trust",
    icon: "ShieldCheck",
    summary: "Hard-earned, never assumed. Confidentiality and reliability come first.",
  },
  {
    id: "v-honesty",
    title: "Honesty & Integrity",
    icon: "HeartHandshake",
    summary: "Straight talk on scope, timelines, and pricing — even when it costs us a deal.",
  },
  {
    id: "v-transparency",
    title: "Transparency",
    icon: "Eye",
    summary: "Clear quotes, open communication, no hidden fees, no last-minute surprises.",
  },
  {
    id: "v-ethics",
    title: "Ethical Framework",
    icon: "Scale",
    summary: "Decisions guided by what is right for the customer's business, not the quickest sale.",
  },
  {
    id: "v-customer",
    title: "Customer Satisfaction",
    icon: "Users",
    summary: "Measured per project. We do not consider work done until the customer says it is.",
  },
  {
    id: "v-quality",
    title: "Quality",
    icon: "Gem",
    summary: "Code review, testing, documentation — the boring fundamentals that prevent fire-fights.",
  },
];

export const values = z.array(ValueItemSchema).parse(raw);
