import { z } from "zod";
import { ServiceDetailSchema, type ServiceDetail } from "@/lib/schema";

const raw: ServiceDetail[] = [
  {
    slug: "amc-annual-support",
    title: "AMC — Annual Support Cover",
    tagline: "Predictable yearly Tally cover, in writing.",
    summary:
      "A yearly support contract with written SLAs — onsite + remote engineers, quarterly health checks, and priority response for outages.",
    hero: {
      eyebrow: "AMC — Annual Support Cover",
      title: "The support contract customers call when Tally breaks — or when they want it to stop breaking.",
      sub: "Written SLAs, named account engineer, and a rhythm of quarterly reviews. Starts with an onboarding audit so you know exactly what we are taking over.",
      gradient: "plum",
    },
    features: [
      {
        id: "amc-f1",
        title: "Written SLAs",
        body: "Response targets in hours, not 'we will get back'. Measured every month, reported every quarter.",
        icon: "FileText",
      },
      {
        id: "amc-f2",
        title: "Named engineer",
        body: "One person owns your account. They know your chart of accounts, your TDLs, and your team's names.",
        icon: "User",
      },
      {
        id: "amc-f3",
        title: "Quarterly health checks",
        body: "On-site or remote audit of your Tally every quarter — backups, user list, TDL versions, pending tickets.",
        icon: "Stethoscope",
      },
      {
        id: "amc-f4",
        title: "Onboarding audit",
        body: "Before cover starts, we audit your existing Tally and flag issues. Critical fixes included in the first month.",
        icon: "ClipboardCheck",
      },
      {
        id: "amc-f5",
        title: "Emergency escalation",
        body: "A single phone number for urgent issues — answered by a human, routed to an engineer, tracked to resolution.",
        icon: "PhoneCall",
      },
    ],
    process: [
      {
        step: 1,
        title: "Scoping call",
        body: "30 minutes to map your setup, tickets-per-month baseline, and the SLA level you need.",
      },
      {
        step: 2,
        title: "Written quote + SoW",
        body: "A line-item quote and Service Agreement with SLAs, escalation path, and renewal terms. Same-day.",
      },
      {
        step: 3,
        title: "Onboarding audit",
        body: "Senior engineer audits your Tally, flags issues, and fixes critical ones — all in the first month.",
      },
      {
        step: 4,
        title: "Steady-state support",
        body: "Phone, email, WhatsApp, and remote-session channels active. Quarterly reviews on a fixed schedule.",
      },
    ],
    deliverables: [
      "Signed Service Agreement with SLA matrix",
      "Onboarding audit report + remediation plan",
      "Named account engineer with contact details",
      "Ticket log with open/closed counts and response times",
      "Quarterly review report (emailed PDF + in-person walkthrough)",
    ],
    faqs: [
      {
        q: "What is the typical AMC response time?",
        a: "Growth-tier AMC: same business day for critical issues, next day for non-critical. Enterprise: sub-hour for critical. All SLAs are in writing on your contract.",
      },
      {
        q: "What happens outside business hours?",
        a: "Critical-severity issues route to a roster engineer with a 2-hour response SLA. Non-critical issues queue for the next business morning.",
      },
      {
        q: "Can we cancel mid-term?",
        a: "Yes. 30 days' written notice. Unused cover is refunded pro-rata less a 15% admin charge (waived for our breach).",
      },
    ],
    relatedSlugs: ["onsite-remote-support", "priority-support", "data-synchronisation"],
  },

  {
    slug: "onsite-remote-support",
    title: "Onsite & Remote Support",
    tagline: "Two channels, one ticket.",
    summary:
      "Regional engineers for onsite visits; secure remote sessions for everything else. All under one ticket number, one invoice.",
    hero: {
      eyebrow: "Onsite & Remote Support",
      title: "When something needs hands on the keyboard, we are there — with or without the travel.",
      sub: "Onsite visits within 48 hours in Mumbai, Thane, and Navi Mumbai; encrypted remote sessions anywhere else. Same engineer tracks the ticket across both.",
      gradient: "mist",
    },
    features: [
      {
        id: "osr-f1",
        title: "48-hour onsite SLA",
        body: "Within the Mumbai metropolitan region, AMC clients get an engineer onsite within 48 business hours.",
        icon: "MapPin",
      },
      {
        id: "osr-f2",
        title: "Encrypted remote sessions",
        body: "One-time permission links, end-to-end encryption, and session recording on request for compliance.",
        icon: "LockKeyhole",
      },
      {
        id: "osr-f3",
        title: "One ticket, one engineer",
        body: "The same engineer owns the ticket whether it is onsite or remote. No handoffs, no re-explaining.",
        icon: "Route",
      },
      {
        id: "osr-f4",
        title: "Ticket log + audit trail",
        body: "Every interaction logged — call summary, remote-session duration, onsite arrival time. Monthly digest.",
        icon: "History",
      },
    ],
    deliverables: [
      "Onsite visit reports with work performed + time log",
      "Remote session recordings (on request)",
      "Monthly ticket digest — opens, closes, response-time averages",
    ],
    faqs: [
      {
        q: "What about outside Mumbai?",
        a: "Outside MMR, we default to remote-first. Onsite visits can be arranged with travel costs quoted in advance — typically 24-hour notice.",
      },
      {
        q: "Do you work evenings and weekends?",
        a: "AMC cover is business-hours by default. Extended-hours cover is a separate add-on with its own SLA schedule.",
      },
    ],
    relatedSlugs: ["amc-annual-support", "priority-support"],
  },

  {
    slug: "data-synchronisation",
    title: "Data Synchronisation",
    tagline: "Keep branches and HQ Tally in sync — without the drama.",
    summary:
      "Configured and monitored branch-to-HQ Tally sync — daily, hourly, or near-real-time depending on your needs. Conflict-free reconciliation.",
    hero: {
      eyebrow: "Data Synchronisation",
      title: "Multi-branch Tally, one trustworthy consolidated view.",
      sub: "We configure, monitor, and reconcile Tally data sync between branches and HQ. Works with Tally's own sync engine or Finquanta's managed replication service for larger setups.",
      gradient: "violet",
    },
    features: [
      {
        id: "ds-f1",
        title: "Branch-to-HQ sync",
        body: "Sales, purchases, stock, and receipts flow from branch Tally to HQ Tally on schedule. Configurable frequency per voucher type.",
        icon: "RefreshCw",
      },
      {
        id: "ds-f2",
        title: "Conflict-free merge",
        body: "Parallel data entry at branch and HQ? Automatic conflict detection with a documented resolution process.",
        icon: "GitMerge",
      },
      {
        id: "ds-f3",
        title: "Sync monitoring",
        body: "Dashboard showing last-sync time per branch, pending voucher counts, and error alerts via email/WhatsApp.",
        icon: "Activity",
      },
      {
        id: "ds-f4",
        title: "Reconciliation reports",
        body: "Monthly reconciliation reports — branch-vs-HQ totals, anomaly call-outs, and action items.",
        icon: "FileBarChart",
      },
    ],
    process: [
      { step: 1, title: "Branch audit", body: "Survey each branch — network, data volume, user count, current sync state." },
      { step: 2, title: "Sync design", body: "Write the sync topology with frequency, conflict-resolution rules, and fallback paths." },
      { step: 3, title: "Configure + UAT", body: "Configure Tally sync endpoints, run a two-week parallel UAT, and sign off go-live." },
      { step: 4, title: "Monitor + tune", body: "Ongoing monitoring + monthly tune-up of sync schedule and conflict rules." },
    ],
    faqs: [
      {
        q: "How frequent can the sync run?",
        a: "From once-daily batch to every-15-minutes near-real-time. The right frequency depends on voucher volume and network stability at each branch.",
      },
      {
        q: "What happens if a branch loses connectivity?",
        a: "Branch Tally queues changes locally; sync resumes when connectivity returns. Zero data loss.",
      },
    ],
    relatedSlugs: ["amc-annual-support", "priority-support"],
  },

  {
    slug: "training",
    title: "Tally Training",
    tagline: "Role-based training that sticks.",
    summary:
      "Training programs for accounts, sales, and management teams — onsite or virtual, with certificates and post-training support.",
    hero: {
      eyebrow: "Tally Training",
      title: "Get your team comfortable in TallyPrime — in two weeks, not two months.",
      sub: "Role-based curriculum: 4 hours per role for foundations, 8 hours for advanced. Onsite or virtual. Every attendee gets a written certificate and 30 days of post-training support.",
      gradient: "sand",
    },
    features: [
      {
        id: "tr-f1",
        title: "Role-based curriculum",
        body: "Separate tracks for accounts, sales, purchase, inventory, and management. Content tailored to each role's daily workflow.",
        icon: "GraduationCap",
      },
      {
        id: "tr-f2",
        title: "Hands-on practice",
        body: "Every session includes a sandbox Tally with realistic data. Attendees build real vouchers, not watch screencasts.",
        icon: "Laptop",
      },
      {
        id: "tr-f3",
        title: "Written certificate",
        body: "Post-training assessment; passing attendees get a written Finquanta certificate with scope covered.",
        icon: "Award",
      },
      {
        id: "tr-f4",
        title: "30-day post-training support",
        body: "Dedicated WhatsApp group for 30 days after training — fastest path to answers during the 'remembering' window.",
        icon: "MessageCircle",
      },
      {
        id: "tr-f5",
        title: "Train-the-trainer",
        body: "For large organisations: we train your internal team to train their peers, with our curriculum and materials.",
        icon: "Users",
      },
    ],
    deliverables: [
      "Printed and PDF training manual per role",
      "Sandbox Tally company with realistic scenarios",
      "Attendance register + assessment scores",
      "Individual certificates (PDF + optional hardcopy)",
    ],
    faqs: [
      {
        q: "Can training run in Marathi or Hindi?",
        a: "Yes. We deliver training in English, Hindi, or Marathi — or a mix — based on audience preference. Materials remain in English for consistency.",
      },
      {
        q: "What is the minimum batch size?",
        a: "Public workshops: from 1 attendee. Private onsite training: 4 attendees minimum. Virtual private training: 2 minimum.",
      },
    ],
    relatedSlugs: ["amc-annual-support", "onsite-remote-support"],
  },

  {
    slug: "priority-support",
    title: "Priority Support",
    tagline: "Sub-hour response for businesses where Tally cannot stop.",
    summary:
      "Top-tier AMC for businesses where Tally downtime shuts the shop floor. Sub-hour SLAs, dedicated engineer, direct escalation line.",
    hero: {
      eyebrow: "Priority Support",
      title: "For customers where downtime costs more than the contract.",
      sub: "The highest-tier AMC — sub-hour response, dedicated engineer, and a direct escalation path to senior engineering. Right for distribution houses, manufacturing with shift-pattern Tally usage, and retail at month-end rush.",
      gradient: "plum",
    },
    features: [
      {
        id: "ps-f1",
        title: "Sub-hour SLA",
        body: "Critical-severity tickets get a human in under 60 minutes, 12x6 (Mon–Sat, 08:00–20:00). Written into the contract.",
        icon: "Timer",
      },
      {
        id: "ps-f2",
        title: "Dedicated engineer",
        body: "A senior engineer assigned exclusively to your account — same person every call, every quarter.",
        icon: "UserCheck",
      },
      {
        id: "ps-f3",
        title: "Direct escalation line",
        body: "A phone number that bypasses the queue and rings the on-call senior directly. Quarterly review with engineering leadership.",
        icon: "PhoneCall",
      },
      {
        id: "ps-f4",
        title: "Proactive monitoring",
        body: "Tally health-check agent runs on your server — disk, memory, sync lag, backup status — alerts us before you see a symptom.",
        icon: "Gauge",
      },
    ],
    deliverables: [
      "Dedicated engineer's contact card + backup",
      "Monthly SLA report — every ticket, every response time",
      "Quarterly review with engineering leadership",
      "Health-check agent installed on your Tally server",
    ],
    faqs: [
      {
        q: "What counts as 'critical-severity'?",
        a: "Tally not launching, data corruption, sync failure, e-invoice generation failure, or any blocker preventing billing. All other issues route to standard-priority.",
      },
      {
        q: "Is Priority Support available without AMC?",
        a: "No. It is an upgrade on top of Growth or Enterprise AMC — we need the baseline familiarity with your setup to deliver sub-hour responses safely.",
      },
    ],
    relatedSlugs: ["amc-annual-support", "onsite-remote-support"],
  },
];

export const serviceDetails = z
  .array(ServiceDetailSchema)
  .parse(raw);

export const serviceDetailBySlug: Record<string, ServiceDetail> =
  Object.fromEntries(serviceDetails.map((s) => [s.slug, s]));

export const serviceSlugs: readonly string[] = serviceDetails.map((s) => s.slug);
