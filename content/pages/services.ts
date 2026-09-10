import { z } from "zod";
import {
  FaqSchema,
  FeatureSchema,
  PageHeroSchema,
  ProcessStepSchema,
  type Faq,
  type Feature,
  type PageHero,
  type ProcessStep,
} from "@/lib/schema";

export const servicesHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Tally services",
  title: "Support, training, and day-to-day care for your Tally setup.",
  sub: "AMC cover, onsite and remote support, data synchronisation, training — Finquanta is the partner you call when something breaks, and the partner you call when you want it to stop breaking.",
  gradient: "mist",
});

export const servicesFeatures: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "sv-1",
      title: "Annual Maintenance Cover (AMC)",
      body: "Predictable yearly support — onsite plus remote — with priority response, quarterly health checks, and a dedicated engineer.",
      icon: "ShieldCheck",
    },
    {
      id: "sv-2",
      title: "Onsite & Remote Support",
      body: "Regional engineers visit for hands-on work; secure remote sessions handle everything else. Weekday business hours included.",
      icon: "Wrench",
    },
    {
      id: "sv-3",
      title: "Data Synchronisation",
      body: "Branch-to-HQ Tally sync configured, monitored, and reconciled. Conflict-free merging across multiple locations.",
      icon: "RefreshCw",
    },
    {
      id: "sv-4",
      title: "Tally Training",
      body: "Role-based training for accounts, sales, and management teams — onsite or virtual, with written certificates for every attendee.",
      icon: "GraduationCap",
    },
    {
      id: "sv-5",
      title: "Invoice & voucher customisation",
      body: "Small formatting tweaks, bigger TDL-based custom vouchers, and everything between — with a fast quote on every request.",
      icon: "FileCog",
    },
    {
      id: "sv-6",
      title: "Priority Support",
      body: "Sub-hour response SLAs and a named account engineer, for businesses where Tally downtime would stop the shop floor.",
      icon: "Headphones",
    },
  ]);

export const servicesProcess: readonly ProcessStep[] = z
  .array(ProcessStepSchema)
  .parse([
    {
      step: 1,
      title: "Scope & quote",
      body: "A 30-minute call to understand your setup, current pain points, and desired SLA. We send a written quote the same day.",
    },
    {
      step: 2,
      title: "Onboarding audit",
      body: "A senior engineer audits your Tally installation, masters, and data. We flag issues and fix the critical ones before cover starts.",
    },
    {
      step: 3,
      title: "Day-to-day support",
      body: "Phone, email, WhatsApp, and remote-session channels live. Every ticket is logged, assigned, and tracked to resolution.",
    },
    {
      step: 4,
      title: "Quarterly reviews",
      body: "A written report every quarter with tickets resolved, response-time averages, and recommendations for the quarter ahead.",
    },
  ]);

export const servicesFaqs: readonly Faq[] = z.array(FaqSchema).parse([
  {
    q: "What is the typical AMC response time?",
    a: "Growth-tier AMC: same business day for critical issues, next day for non-critical. Enterprise: sub-hour for critical. All SLAs are in writing on your contract.",
  },
  {
    q: "Do you cover our existing TDL and customisations?",
    a: "Yes, after a onboarding audit. We document what we take over and flag any items that need a rewrite for clarity or upgrade-compatibility.",
  },
  {
    q: "Is remote support secure?",
    a: "Yes. We use AnyDesk with one-time permissions, end-to-end encrypted sessions, and every session is logged with consent and duration.",
  },
  {
    q: "Can I buy standalone training without an AMC?",
    a: "Yes — training is a separate flat-rate offering. You can buy a fixed number of sessions or a monthly retainer.",
  },
]);
