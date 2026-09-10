import { z } from "zod";
import {
  FeatureSchema,
  PageHeroSchema,
  type Feature,
  type PageHero,
} from "@/lib/schema";

export const addonsHero: PageHero = PageHeroSchema.parse({
  eyebrow: "Add-on modules",
  title: "Small installs that solve specific problems.",
  sub: "Fifteen-plus standalone TDL modules — each one does a single job well. Pick and mix the ones you actually need; skip the rest.",
  gradient: "mist",
});

export const addons: readonly Feature[] = z
  .array(FeatureSchema)
  .parse([
    {
      id: "ad-backup",
      title: "Smart Backup++",
      body: "Scheduled, encrypted, off-site Tally backups with one-click restore. Never lose a day of data.",
      icon: "Database",
    },
    {
      id: "ad-attach",
      title: "Multi File Attachment",
      body: "Attach POs, invoices, and supporting docs to any Tally voucher. Searchable and audit-friendly.",
      icon: "Paperclip",
    },
    {
      id: "ad-sheet-magic",
      title: "Sheet Magic",
      body: "Pull any Tally report into Excel with a refresh button. Pivot, format, and email — same as before, faster.",
      icon: "Sheet",
    },
    {
      id: "ad-audit-trail",
      title: "Audit Trail with Voucher History",
      body: "Track every voucher edit — who, when, what changed. Export-ready audit reports for statutory compliance.",
      icon: "History",
    },
    {
      id: "ad-bulk-mailer",
      title: "Bulk Invoice Mailer",
      body: "Email all pending invoices for a date range in one shot. Custom subject/body templates per customer segment.",
      icon: "Mails",
    },
    {
      id: "ad-whatsapp",
      title: "WhatsApp Voucher Share",
      body: "Send invoices, statements, and payment reminders directly on WhatsApp from inside Tally.",
      icon: "MessageCircle",
    },
    {
      id: "ad-barcode",
      title: "Barcode Voucher Entry",
      body: "Scan barcodes to add items to vouchers — right for retail, warehousing, and high-volume counters.",
      icon: "ScanLine",
    },
    {
      id: "ad-esign",
      title: "Digital Signature for Invoices",
      body: "Apply DSC on invoices and other documents, with visible signature block and PDF-A export.",
      icon: "PenTool",
    },
    {
      id: "ad-reminder",
      title: "Outstanding Reminder Bot",
      body: "Auto-schedule polite payment reminders to debtors via email and SMS based on ageing buckets.",
      icon: "BellRing",
    },
  ]);

export const addonsPromise =
  "Every add-on is a single-purpose TDL. Under ₹7,500 per module; free trial on any add-on for active-cover clients. Upgrade-safe across TallyPrime releases.";
