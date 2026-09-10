import { z } from "zod";
import {
  FeatureSchema,
  PageHeroSchema,
  ProcessStepSchema,
  type Feature,
  type PageHero,
  type ProcessStep,
} from "@/lib/schema";

export const aboutHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Who we are",
  title: "A Tally partnership built on trust, delivered with craft.",
  sub: "Finquanta Solutions is a Tally Partner for Indian SMEs — handling implementation, customisation, cloud, and long-term support so you never have to think about accounting tooling again.",
  gradient: "plum",
});

export const aboutMission =
  "To take the accounting plumbing off every SME's plate — so founders and finance teams can spend their energy on the work that actually compounds. We do that by pairing deep Tally expertise with patient, transparent support.";

export const aboutPillars: readonly Feature[] = z.array(FeatureSchema).parse([
  {
    id: "pillar-1",
    title: "Tally-first, every time",
    body: "We are a Tally Partner across Sales, Support, and Solutions Development. No side loyalties, no 'also-platform' distractions.",
    icon: "ShieldCheck",
  },
  {
    id: "pillar-2",
    title: "Indian SMEs are our home",
    body: "From Mumbai chemists to Nashik distributors, we have wired Tally into the daily rhythm of hundreds of family-run and mid-sized businesses.",
    icon: "Building2",
  },
  {
    id: "pillar-3",
    title: "Transparent by default",
    body: "Clear quotes, written scope, and weekly updates. You always know what is shipping next and what it will cost.",
    icon: "Eye",
  },
  {
    id: "pillar-4",
    title: "Long-horizon support",
    body: "Most of our oldest clients have been with us since 2018. When your Tally breaks on a Saturday, you still have a person to call.",
    icon: "Headphones",
  },
]);

export const aboutTimeline: readonly ProcessStep[] = z
  .array(ProcessStepSchema)
  .parse([
    {
      step: 1,
      title: "2018 — Finquanta founded",
      body: "Sandip Utekar launches Finquanta Solutions as a Tally Partner, starting with SMEs across Maharashtra.",
    },
    {
      step: 2,
      title: "2020 — Cloud practice",
      body: "Tally on Cloud practice spun up during lockdown; remote Tally access became the default for our new engagements.",
    },
    {
      step: 3,
      title: "2023 — 200-client milestone",
      body: "Crossed 200 active clients across distribution, pharma, manufacturing, and services sectors.",
    },
    {
      step: 4,
      title: "2025 — Integrations & TDL team",
      body: "Dedicated add-ons, custom TDL, and integrations practice formalised. 90+ TDLs deployed in the wild.",
    },
  ]);

export const aboutLeadership = [
  {
    id: "director",
    name: "Sandip Utekar",
    role: "Founder & Director",
    bio: "Two decades of Tally work — from single-user shops to 50-seat distribution houses. Sandip still joins every first-call.",
  },
] as const;
