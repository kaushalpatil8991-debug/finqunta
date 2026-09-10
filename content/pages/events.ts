import { z } from "zod";
import {
  EventSchema,
  PageHeroSchema,
  type Event,
  type PageHero,
} from "@/lib/schema";

export const eventsHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Events & workshops",
  title: "Where we meet our customers (and would-be customers).",
  sub: "Finquanta runs quarterly TallyPrime workshops, GST compliance clinics, and regional meetups for finance leaders. All sessions are free to attend.",
  gradient: "sand",
});

export const events: readonly Event[] = z.array(EventSchema).parse([
  {
    id: "e-1",
    title: "TallyPrime 5.0 — What is new and what to upgrade first",
    date: "2026-05-14",
    location: "Webinar · 11:00 AM IST",
    summary:
      "Walk through every TallyPrime 5.0 change — ledger upgrades, dashboard rework, connected banking — with live Q&A at the end.",
    kind: "webinar",
    status: "upcoming",
  },
  {
    id: "e-2",
    title: "GST Return Filing clinic for SMEs",
    date: "2026-05-28",
    location: "Mumbai · BKC",
    summary:
      "Half-day in-person session for accounts teams. Bring your GSTR-1/3B files; we work through edge cases and reconciliation together.",
    kind: "workshop",
    status: "upcoming",
  },
  {
    id: "e-3",
    title: "Tally on Cloud — Migration playbook",
    date: "2026-06-11",
    location: "Webinar · 4:00 PM IST",
    summary:
      "How to plan a zero-downtime migration from on-prem Tally to Tally on Cloud, including user training and rollback guidance.",
    kind: "webinar",
    status: "upcoming",
  },
  {
    id: "e-4",
    title: "Finance leaders' roundtable — MIS for growing SMEs",
    date: "2026-06-24",
    location: "Pune · Koregaon Park",
    summary:
      "Invite-only roundtable for CFOs and heads of finance. Structured discussion on MIS dashboards and cash-flow visibility.",
    kind: "meetup",
    status: "upcoming",
  },
  {
    id: "e-5",
    title: "E-invoice & E-way bill fundamentals",
    date: "2026-03-12",
    location: "Webinar · 11:00 AM IST",
    summary:
      "Recording available — a 90-minute walk-through of e-invoice generation, e-way bill workflow, and how Tally automates both.",
    kind: "webinar",
    status: "past",
  },
  {
    id: "e-6",
    title: "TDL & custom report deep-dive",
    date: "2026-02-08",
    location: "Mumbai · Andheri",
    summary:
      "Past workshop — how we build custom TDL and report formats that mirror your real-world SOPs.",
    kind: "workshop",
    status: "past",
  },
]);
