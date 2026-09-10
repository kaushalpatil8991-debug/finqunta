import { z } from "zod";
import {
  BoosterPackDetailSchema,
  type BoosterPackDetail,
} from "@/lib/schema";

const raw: BoosterPackDetail[] = [
  {
    slug: "daily-desk",
    title: "Daily Desk Booster",
    tagline: "Keyboard shortcuts and entry accelerators for the daily driver.",
    summary:
      "The booster pack for accounts teams that live in Tally. Keyboard shortcuts, voucher duplication, quick ledger search, auto-narration.",
    icon: "Keyboard",
    hero: {
      eyebrow: "Daily Desk Booster",
      title: "Shave minutes off every voucher — add up to hours per week.",
      sub: "Keyboard shortcuts, voucher duplication, quick-search for ledgers and items, auto-narration, and the 'last-used ledgers' shortcut strip. Installs in 15 minutes; time savings immediate.",
      gradient: "mist",
    },
    contents: [
      "Keyboard shortcut pack (50+ shortcuts)",
      "Voucher duplicator (copy + edit any past voucher)",
      "Quick ledger / item search across all companies",
      "Auto-narration with recent narrations dropdown",
      "Last-used-ledgers shortcut strip",
    ],
    features: [
      {
        id: "dd-f1",
        title: "Shortcut pack",
        body: "50+ keyboard shortcuts for common flows. Cheat-sheet included; team training session included.",
        icon: "Command",
      },
      {
        id: "dd-f2",
        title: "Voucher duplicator",
        body: "Duplicate any past voucher (sale, purchase, journal) with one shortcut. Edit amount + date; save.",
        icon: "Copy",
      },
      {
        id: "dd-f3",
        title: "Fuzzy ledger + item search",
        body: "Type a few characters from anywhere — all matching ledgers and items appear. No more alphabet-scrolling.",
        icon: "SearchCode",
      },
      {
        id: "dd-f4",
        title: "Auto-narration",
        body: "Recent narrations appear as a dropdown on every voucher. No more re-typing 'Being payment to supplier...' every day.",
        icon: "Type",
      },
    ],
    relatedSlugs: ["reconciliation", "reporting"],
  },

  {
    slug: "reconciliation",
    title: "Reconciliation Booster",
    tagline: "Bank, debtor, creditor, 2A/2B — one matcher.",
    summary:
      "Bank reconciliation, debtor / creditor reconciliation, and GSTR-2A/2B matching — all with one-click exception reports.",
    icon: "GitCompare",
    hero: {
      eyebrow: "Reconciliation Booster",
      title: "Monthly reconciliation in a morning — not a week.",
      sub: "Bank statement reco, debtor-supplier reco, and GSTR-2A/2B matcher bundled into one booster. Exception reports email themselves to you every Monday morning.",
      gradient: "violet",
    },
    contents: [
      "Bank statement reconciliation (20+ bank formats)",
      "Debtor / creditor statement reconciliation",
      "GSTR-2A / 2B matcher with exception report",
      "Scheduled auto-run — weekly / monthly",
      "Exception email digest",
    ],
    features: [
      {
        id: "rc-f1",
        title: "Bank reco",
        body: "Import bank statement (20+ bank formats); auto-match by UTR / cheque / amount / date. Unmatched lines flagged.",
        icon: "Landmark",
      },
      {
        id: "rc-f2",
        title: "Debtor / creditor reco",
        body: "Customer or supplier statement vs Tally ledger; discrepancy report with variance causes.",
        icon: "FileDiff",
      },
      {
        id: "rc-f3",
        title: "GSTR-2A/2B matcher",
        body: "Download 2A/2B JSON; match line-by-line against your purchase register. Mismatches classified (missing, mismatched, excess).",
        icon: "FileCheck2",
      },
      {
        id: "rc-f4",
        title: "Scheduled runs + digest",
        body: "Reco runs every Monday 07:00. Finance team arrives to a one-page digest in their inbox.",
        icon: "CalendarClock",
      },
    ],
    relatedSlugs: ["reporting", "compliance"],
  },

  {
    slug: "reporting",
    title: "Reporting Booster",
    tagline: "20+ management reports — ready to run.",
    summary:
      "Twenty-plus ready-to-run management reports — ageing, branch profitability, SKU velocity, customer concentration, and more.",
    icon: "BarChart3",
    hero: {
      eyebrow: "Reporting Booster",
      title: "The management reports that get asked for every month — generated every day.",
      sub: "A catalogue of 20+ management reports tuned over a decade of SME work. Open Tally, pick a report, choose a period — done. No TDL to write, no Excel to format.",
      gradient: "plum",
    },
    contents: [
      "Customer ageing — by bucket, by branch, by sales-rep",
      "Branch profitability — revenue, direct cost, overhead",
      "SKU velocity — fastest / slowest movers by period",
      "Customer concentration — top-N revenue contributors",
      "Supplier concentration — top-N cost concentrations",
      "Credit-limit utilisation heatmap",
      "Cash-flow waterfall (weekly, monthly)",
      "13 more specific reports — full list in booster brochure",
    ],
    features: [
      {
        id: "rp-f1",
        title: "Pre-built reports",
        body: "20+ reports, tuned for the questions managers actually ask. No TDL expertise needed.",
        icon: "FileBarChart",
      },
      {
        id: "rp-f2",
        title: "Tabular + chart views",
        body: "Every report has a tabular view and a ready-to-paste chart view. Both export to Excel + PDF.",
        icon: "PieChart",
      },
      {
        id: "rp-f3",
        title: "Scheduled email delivery",
        body: "Schedule any report to email on a cadence. The CFO gets the Monday-morning digest without asking.",
        icon: "Mails",
      },
      {
        id: "rp-f4",
        title: "Customisable filters",
        body: "Every report has filters — branch, period, ledger group, customer segment. Save filter presets.",
        icon: "Filter",
      },
    ],
    relatedSlugs: ["mis", "reconciliation"],
  },

  {
    slug: "mis",
    title: "MIS Booster",
    tagline: "CFO-ready monthly packs, automated.",
    summary:
      "Dashboard-friendly exports + preconfigured pivot tables. The monthly MIS pack a CFO actually reads — generated without manual work.",
    icon: "LayoutDashboard",
    hero: {
      eyebrow: "MIS Booster",
      title: "The 30-page monthly MIS that used to take two days — in 15 minutes.",
      sub: "Preconfigured Excel pivot tables + PowerPoint templates wired to Tally. Every month: refresh, review, send. No more recreating the deck from scratch.",
      gradient: "cream-gold",
    },
    contents: [
      "30-page monthly MIS Excel workbook (pivot-ready)",
      "10-slide PowerPoint deck (auto-filling from Tally)",
      "KPI dashboard — revenue, margin, DSO, DPO, CCC",
      "Variance analysis — actual vs budget / prior-period",
      "Segment cuts — branch, product-group, customer-segment",
    ],
    features: [
      {
        id: "mi-f1",
        title: "Monthly MIS workbook",
        body: "30-page Excel with every cut managers ask for. Opens, refreshes from Tally, done.",
        icon: "FileSpreadsheet",
      },
      {
        id: "mi-f2",
        title: "Board deck template",
        body: "10-slide PowerPoint with charts that auto-fill from the Tally data. Brand-customisable.",
        icon: "Presentation",
      },
      {
        id: "mi-f3",
        title: "Variance analysis",
        body: "Actual vs budget vs prior-period / prior-year. Variance > threshold flagged automatically with a short narrative.",
        icon: "TrendingUp",
      },
      {
        id: "mi-f4",
        title: "KPI dashboard",
        body: "A one-pager of the KPIs that matter — revenue, gross margin, DSO, DPO, cash-conversion cycle.",
        icon: "Gauge",
      },
    ],
    relatedSlugs: ["reporting", "operations"],
  },

  {
    slug: "operations",
    title: "Operations Booster",
    tagline: "Stock ageing, credit-limit monitor, overdue alerts.",
    summary:
      "Shop-floor-ready operational tools — stock ageing, slow-mover alerts, credit-limit monitor, overdue-invoice tracking.",
    icon: "Activity",
    hero: {
      eyebrow: "Operations Booster",
      title: "The day-to-day operational cockpit for SMEs.",
      sub: "Stock ageing dashboards, slow-mover alerts, credit-limit monitors, and overdue-invoice tracking — all live from your Tally. Built for operational managers, not accountants.",
      gradient: "sand",
    },
    contents: [
      "Stock-ageing dashboard with bucket alerts",
      "Slow-mover + fast-mover report",
      "Credit-limit utilisation by customer",
      "Overdue invoice monitor",
      "Daily operations email digest",
    ],
    features: [
      {
        id: "op-f1",
        title: "Stock ageing",
        body: "Stock grouped into ageing buckets (0–30 / 31–60 / 61+ days). Near-expiry and slow-mover alerts.",
        icon: "CalendarRange",
      },
      {
        id: "op-f2",
        title: "Credit-limit monitor",
        body: "Live view of every customer's limit vs used. Breach alerts (configurable thresholds: 80/90/100%).",
        icon: "Gauge",
      },
      {
        id: "op-f3",
        title: "Overdue invoices",
        body: "Dashboard of overdue invoices by rep, by branch, by customer. One-click escalation to Reminder Bot.",
        icon: "ClockAlert",
      },
      {
        id: "op-f4",
        title: "Daily ops digest",
        body: "Morning email: overnight sales, new overdue invoices, credit-limit breaches, stock-outs. One page.",
        icon: "Mails",
      },
    ],
    relatedSlugs: ["mis", "reporting"],
  },

  {
    slug: "compliance",
    title: "Compliance Booster",
    tagline: "TDS, GST working, advance-tax, 26AS — in Tally.",
    summary:
      "Compliance tooling — TDS calculator, GST working sheets, advance-tax planner, 26AS reconciliation, all inside Tally.",
    icon: "ShieldCheck",
    hero: {
      eyebrow: "Compliance Booster",
      title: "The compliance boring-but-critical pack.",
      sub: "TDS deduction calculator, monthly GST working sheets, advance-tax planner, and Form-26AS reconciliation. Less 'oh no the due date is tomorrow' — more 'it's been ready for a week'.",
      gradient: "plum",
    },
    contents: [
      "TDS deduction calculator (all sections)",
      "GST monthly working sheet (GSTR-1 / 3B prep)",
      "Advance-tax planner with quarterly reminders",
      "Form-26AS reconciliation with Tally TDS receivable",
      "Statutory calendar with email + WhatsApp reminders",
    ],
    features: [
      {
        id: "cm-f1",
        title: "TDS calculator",
        body: "All applicable sections (194A/C/J/Q/etc.) with threshold tracking per deductee, per financial year.",
        icon: "Calculator",
      },
      {
        id: "cm-f2",
        title: "GST working sheet",
        body: "Monthly working sheet pre-filled from Tally vouchers. Reconciliation against Tally's GSTR-1/3B generator.",
        icon: "FileCheck2",
      },
      {
        id: "cm-f3",
        title: "Advance-tax planner",
        body: "Quarterly advance-tax projections based on YTD performance. Reminder 7 days before each due date.",
        icon: "Calendar",
      },
      {
        id: "cm-f4",
        title: "26AS reconciliation",
        body: "Upload Form-26AS PDF/Excel; auto-match against Tally TDS receivable. Mismatch report with action items.",
        icon: "FileDiff",
      },
    ],
    relatedSlugs: ["reconciliation", "reporting"],
  },
];

export const boosterDetails = z
  .array(BoosterPackDetailSchema)
  .parse(raw);

export const boosterDetailBySlug: Record<string, BoosterPackDetail> =
  Object.fromEntries(boosterDetails.map((b) => [b.slug, b]));

export const boosterSlugs: readonly string[] = boosterDetails.map((b) => b.slug);
