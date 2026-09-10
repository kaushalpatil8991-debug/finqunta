import { z } from "zod";
import {
  FeatureSchema,
  JobOpeningSchema,
  PageHeroSchema,
  type Feature,
  type JobOpening,
  type PageHero,
} from "@/lib/schema";

export const careerHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Careers at Finquanta",
  title: "We are hiring engineers, consultants, and support leads.",
  sub: "Help Indian SMEs run better. We look for people who care about craft, ship steadily, and treat customer problems as their own.",
  gradient: "violet",
});

export const cultureNote =
  "Finquanta is a small, calm team. We default to clear written scope, real lunch breaks, and Saturday being Saturday. Most engineering work is project-based with predictable timelines; support work is rostered so nights and weekends stay rare.";

export const perks: readonly Feature[] = z.array(FeatureSchema).parse([
  {
    id: "perk-1",
    title: "Paid certifications",
    body: "Tally, GST, and any adjacent certification — all covered, including repeats. We reimburse the day you pass.",
    icon: "Award",
  },
  {
    id: "perk-2",
    title: "Calm hours",
    body: "Core hours 10:00–18:00, Mon–Fri. Weekend rotations for support are rare, predictable, and compensated.",
    icon: "Clock",
  },
  {
    id: "perk-3",
    title: "Hybrid by default",
    body: "Office-optional for most roles. Onsite is reserved for engagement visits and the Tuesday team lunch.",
    icon: "Home",
  },
  {
    id: "perk-4",
    title: "Health insurance",
    body: "Family-floater cover for you, spouse, and two children. Dependent parents covered at 50% subsidy.",
    icon: "HeartPulse",
  },
  {
    id: "perk-5",
    title: "Learning days",
    body: "One paid learning day per month — use it on a course, a book, a side project, or a long walk.",
    icon: "BookOpen",
  },
  {
    id: "perk-6",
    title: "Shared success",
    body: "Annual profit-share pool distributed across the whole team. We all win when Finquanta does.",
    icon: "Gem",
  },
]);

export const openings: readonly JobOpening[] = z.array(JobOpeningSchema).parse([
  {
    id: "j-1",
    role: "Tally Consultant — Implementation",
    location: "Mumbai / Hybrid",
    employment: "full-time",
    experience: "2–5 years",
    summary:
      "Own end-to-end Tally Prime rollouts for SMEs. Gather requirements, structure chart of accounts, migrate data, train users, and hand off to support.",
  },
  {
    id: "j-2",
    role: "TDL Developer",
    location: "Remote (India)",
    employment: "full-time",
    experience: "1–4 years",
    summary:
      "Write and maintain TDL for custom vouchers, reports, and integrations. Work directly with consultants and, occasionally, clients.",
  },
  {
    id: "j-3",
    role: "Integrations Engineer",
    location: "Mumbai / Hybrid",
    employment: "full-time",
    experience: "3–6 years",
    summary:
      "Wire Tally into e-commerce, banking, CRM, and payment-gateway systems. Node/Python stack; comfortable reading API docs and bad XML.",
  },
  {
    id: "j-4",
    role: "Support Engineer (L1)",
    location: "Mumbai (on-site)",
    employment: "full-time",
    experience: "0–2 years",
    summary:
      "First-line response on phone/email/remote for active-cover clients. Diagnose issues, escalate cleanly, and document every resolution.",
  },
  {
    id: "j-5",
    role: "Business Development Associate",
    location: "Mumbai / Hybrid",
    employment: "full-time",
    experience: "1–3 years",
    summary:
      "Inbound-first BD — qualify enquiries, run demos, put together written proposals. No cold calling, no quota theatre.",
  },
]);
