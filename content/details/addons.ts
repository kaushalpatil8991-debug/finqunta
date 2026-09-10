import { z } from "zod";
import { AddonDetailSchema, type AddonDetail } from "@/lib/schema";

const raw: AddonDetail[] = [
  {
    slug: "smart-backup",
    title: "Smart Backup++",
    tagline: "Sleep through the night. Your Tally backups just work.",
    summary:
      "Scheduled, encrypted, off-site Tally backups with one-click restore. Triple redundancy and 30-day restore window.",
    icon: "Database",
    hero: {
      eyebrow: "Smart Backup++",
      title: "Backups that run on their own, to places that do not burn down.",
      sub: "Scheduled nightly backups, encrypted end-to-end, stored locally + on NAS + on Finquanta's cloud. 30-day point-in-time restore. Alerts if a backup misses.",
      gradient: "mist",
    },
    features: [
      {
        id: "sb-f1",
        title: "Scheduled + automatic",
        body: "Nightly, weekly, or on-demand schedules. Runs as a Windows service; survives reboots and user logouts.",
        icon: "CalendarClock",
      },
      {
        id: "sb-f2",
        title: "Triple redundancy",
        body: "Each backup written to local disk, your NAS or file server, and Finquanta's encrypted cloud. Any one can restore.",
        icon: "CopyPlus",
      },
      {
        id: "sb-f3",
        title: "Point-in-time restore",
        body: "Rewind to any backup snapshot in the last 30 days. Preview before restoring. Two-click flow.",
        icon: "History",
      },
      {
        id: "sb-f4",
        title: "Missed-backup alerts",
        body: "Email + WhatsApp if a scheduled backup fails or a drive is full. No silent failures.",
        icon: "BellRing",
      },
      {
        id: "sb-f5",
        title: "End-to-end encryption",
        body: "Backup files encrypted before leaving your server; the key is held by you. Cloud storage cannot read your data.",
        icon: "Lock",
      },
    ],
    specs: [
      { label: "Category", value: "Backup & recovery add-on" },
      { label: "Platform", value: "TallyPrime on Windows 10+ / Server 2019+" },
      { label: "Storage targets", value: "Local · NAS · Finquanta cloud" },
      { label: "Encryption", value: "AES-256; client-held key" },
      { label: "Restore window", value: "30 days point-in-time" },
    ],
    benefits: [
      "Never explain to an auditor why you lost a week of vouchers",
      "Recover from ransomware: off-site, read-only, key-controlled",
      "Backups outlive your current server hardware",
      "Monthly restore-test report for compliance-minded businesses",
    ],
    faqs: [
      {
        q: "What happens if the cloud storage is unreachable?",
        a: "Local + NAS copies are always written first; cloud uploads retry for 24 hours. You get alerted if all retries fail — but your backup is never at risk.",
      },
      {
        q: "Can I store backups only locally?",
        a: "Yes, as a configuration option. We recommend at least local + NAS so a single disk failure does not take everything.",
      },
    ],
    relatedSlugs: ["audit-trail", "sheet-magic"],
  },

  {
    slug: "multi-file-attachment",
    title: "Multi File Attachment",
    tagline: "Attach POs, invoices, and emails to any Tally voucher.",
    summary:
      "Attach any document (PDF, image, email) to vouchers, ledgers, or customers. Full-text searchable and audit-ready.",
    icon: "Paperclip",
    hero: {
      eyebrow: "Multi File Attachment",
      title: "The paper trail — in Tally, searchable, audit-friendly.",
      sub: "Attach purchase orders, invoices, delivery challans, and emails directly to vouchers. Full-text search across attachments; export with the voucher for audit packs.",
      gradient: "violet",
    },
    features: [
      {
        id: "mf-f1",
        title: "Multiple file types",
        body: "PDFs, Word, Excel, images, emails (.msg/.eml), and plain text. No type restrictions; size cap per file configurable.",
        icon: "Files",
      },
      {
        id: "mf-f2",
        title: "Full-text search",
        body: "OCR on images and PDFs at attach time, so 'find me the PO with ref number ABC-123' works even for scanned paper.",
        icon: "ScanSearch",
      },
      {
        id: "mf-f3",
        title: "Voucher + ledger attachments",
        body: "Attach at voucher level (per transaction) or ledger level (per customer/supplier). Both appear in the same preview.",
        icon: "Link",
      },
      {
        id: "mf-f4",
        title: "Audit export bundle",
        body: "Export any voucher + all its attachments as a single PDF bundle. Useful for statutory audits and customer disputes.",
        icon: "FileArchive",
      },
    ],
    benefits: [
      "Never hunt through email for the original PO again",
      "Hand the auditor a USB with vouchers + supporting docs in one folder",
      "Customers disputing an invoice? Send them the voucher + signed delivery note in one click",
    ],
    faqs: [
      {
        q: "Where are attachments stored?",
        a: "Next to your Tally data, in a structured folder. Your backup strategy covers attachments automatically.",
      },
      {
        q: "Is there a file size limit?",
        a: "Default 25 MB per file, configurable up to 200 MB. Larger files (video) should be kept in a DMS and linked via URL.",
      },
    ],
    relatedSlugs: ["audit-trail", "bulk-invoice-mailer"],
  },

  {
    slug: "sheet-magic",
    title: "Sheet Magic",
    tagline: "Tally reports, live, in Excel.",
    summary:
      "Pull any Tally report into Excel with a refresh button. Pivot, format, email — same as before, but with live data.",
    icon: "Sheet",
    hero: {
      eyebrow: "Sheet Magic",
      title: "If your team lives in Excel, Tally can live there too.",
      sub: "Connect Excel to Tally; run any Tally report with a refresh button. Apply your own formatting, pivots, and conditional rules — they survive every refresh.",
      gradient: "sand",
    },
    features: [
      {
        id: "sm-f1",
        title: "Live Tally data",
        body: "Every Tally report is available in Excel via our add-in. Refresh at any time; filters are preserved.",
        icon: "RefreshCw",
      },
      {
        id: "sm-f2",
        title: "Formatting survives refresh",
        body: "Conditional formatting, pivot tables, charts, and formulas all stay intact. Only the data underneath updates.",
        icon: "Wand2",
      },
      {
        id: "sm-f3",
        title: "Multi-company reports",
        body: "Combine reports across multiple Tally companies in one Excel view — for group-level consolidation.",
        icon: "Layers",
      },
      {
        id: "sm-f4",
        title: "Scheduled email delivery",
        body: "Schedule a refresh + email to stakeholders — daily, weekly, monthly. The CFO gets the digest at 08:00 every day.",
        icon: "Mails",
      },
    ],
    benefits: [
      "Your team keeps using Excel; the data just gets smarter",
      "No more copy-paste from Tally to Excel — live link ends that forever",
      "One consolidated view for multi-company groups",
    ],
    faqs: [
      {
        q: "Does this work with Excel for Mac?",
        a: "Yes. Same add-in, same features. Requires Microsoft 365 subscription Excel.",
      },
      {
        q: "Does the add-in slow down Tally?",
        a: "No. Queries run through Tally's ODBC interface; the add-in is read-only and caches aggressively.",
      },
    ],
    relatedSlugs: ["audit-trail", "bulk-invoice-mailer"],
  },

  {
    slug: "audit-trail",
    title: "Audit Trail with Voucher History",
    tagline: "Every edit, every voucher, forever.",
    summary:
      "Track every voucher edit — who, when, what changed. Export-ready audit reports for statutory compliance.",
    icon: "History",
    hero: {
      eyebrow: "Audit Trail",
      title: "Who edited that voucher, when, and what did they change?",
      sub: "Full voucher-edit history with user, timestamp, and before/after diff. Required for statutory compliance for companies under MCA audit-trail rules.",
      gradient: "plum",
    },
    features: [
      {
        id: "at-f1",
        title: "Immutable edit log",
        body: "Every voucher edit, deletion, and insertion captured. Log cannot be edited, cleared, or tampered with — even by admins.",
        icon: "ShieldCheck",
      },
      {
        id: "at-f2",
        title: "Diff view",
        body: "Side-by-side before/after for every field. Clear visual of exactly what changed in the voucher.",
        icon: "GitCompare",
      },
      {
        id: "at-f3",
        title: "User session log",
        body: "Every login, every company switch, every voucher opened — with IP and workstation name.",
        icon: "User",
      },
      {
        id: "at-f4",
        title: "Audit report export",
        body: "Export period-specific audit reports in PDF, Excel, or CSV. Pre-formatted for statutory auditor review.",
        icon: "FileBarChart",
      },
    ],
    benefits: [
      "Statutory audit trail compliance (MCA rules effective April 2023)",
      "Faster audit cycles — auditors self-serve the log",
      "Internal-control: spot unusual edit patterns early",
    ],
    faqs: [
      {
        q: "Is this required by MCA?",
        a: "Yes, for companies covered under the MCA audit-trail notification from 1 April 2023. TallyPrime supports native audit trail; our add-on adds diff view, user sessions, and richer reporting.",
      },
      {
        q: "Where is the log stored?",
        a: "In a write-once file beside your Tally data, cryptographically signed. Your backup strategy covers it automatically.",
      },
    ],
    relatedSlugs: ["smart-backup", "digital-signature"],
  },

  {
    slug: "bulk-invoice-mailer",
    title: "Bulk Invoice Mailer",
    tagline: "Email every pending invoice in one click.",
    summary:
      "Select a date range or customer set, and email all pending invoices in one batch — with per-customer templates.",
    icon: "Mails",
    hero: {
      eyebrow: "Bulk Invoice Mailer",
      title: "Month-end invoice run — in 5 minutes, not a day.",
      sub: "Select a date range, a customer group, or a voucher filter — bulk-email every invoice with a per-customer template. Track opens, resend failures, archive proof of delivery.",
      gradient: "cream-gold",
    },
    features: [
      {
        id: "bim-f1",
        title: "Customer-segment templates",
        body: "Different email template per customer segment — retail vs. distribution vs. government — with mail-merge fields.",
        icon: "FileEdit",
      },
      {
        id: "bim-f2",
        title: "Delivery + open tracking",
        body: "See which emails delivered, which bounced, which were opened. Resend failures one-click.",
        icon: "MailCheck",
      },
      {
        id: "bim-f3",
        title: "Scheduled runs",
        body: "Schedule the monthly invoice run for the 1st at 09:00. Runs automatically; summary email to you.",
        icon: "CalendarClock",
      },
      {
        id: "bim-f4",
        title: "Proof of delivery",
        body: "Every email + attachment archived with timestamp. Useful for disputes ('we emailed it on the 3rd — here is the log').",
        icon: "Archive",
      },
    ],
    benefits: [
      "Month-end invoice cycle reduced from a day to 15 minutes",
      "Fewer 'I did not get the invoice' disputes — you have proof of send",
      "Proper customer-segment communication, not one-size-fits-all",
    ],
    relatedSlugs: ["whatsapp-voucher-share", "outstanding-reminder-bot"],
  },

  {
    slug: "whatsapp-voucher-share",
    title: "WhatsApp Voucher Share",
    tagline: "Send invoices on WhatsApp, straight from Tally.",
    summary:
      "Share invoices, statements, and payment reminders on WhatsApp directly from the voucher screen in Tally.",
    icon: "MessageCircle",
    hero: {
      eyebrow: "WhatsApp Voucher Share",
      title: "Your customers already live on WhatsApp. Meet them there.",
      sub: "Send invoices, statements, ledger extracts, and payment reminders on WhatsApp in one click from any voucher. Delivery receipts logged in Tally.",
      gradient: "violet",
    },
    features: [
      {
        id: "ws-f1",
        title: "One-click send",
        body: "From any voucher press a shortcut — WhatsApp opens with invoice PDF attached to the customer's number.",
        icon: "Send",
      },
      {
        id: "ws-f2",
        title: "Customer phone on file",
        body: "Reads customer phone from Tally ledger. Prompts on first send to confirm the number.",
        icon: "BookUser",
      },
      {
        id: "ws-f3",
        title: "Template messages",
        body: "Short message templates per use case — new invoice, payment reminder, statement — with mail-merge fields.",
        icon: "MessageSquareText",
      },
      {
        id: "ws-f4",
        title: "Send log in Tally",
        body: "Every send attempt logged inside the voucher — date, recipient, delivery status.",
        icon: "ClipboardList",
      },
    ],
    benefits: [
      "Higher invoice-read rates — WhatsApp beats email for SME customers",
      "Faster payment — payment reminders that get seen",
      "One more channel without another app to babysit",
    ],
    faqs: [
      {
        q: "Does this use WhatsApp Business API?",
        a: "For low volumes: WhatsApp Web via Tally. For bulk campaigns (100+/day): WhatsApp Business API — we help you onboard.",
      },
      {
        q: "Can customers reply to these messages?",
        a: "Yes — replies land in your WhatsApp account as usual. For audit-trail, the Business API path captures every reply in Tally.",
      },
    ],
    relatedSlugs: ["bulk-invoice-mailer", "outstanding-reminder-bot"],
  },

  {
    slug: "barcode-voucher-entry",
    title: "Barcode Voucher Entry",
    tagline: "Scan, not type. 10× faster counter billing.",
    summary:
      "Scan barcodes to add items to vouchers — right for retail, warehousing, and high-volume counters.",
    icon: "ScanLine",
    hero: {
      eyebrow: "Barcode Voucher Entry",
      title: "Counter billing in Tally — as fast as a dedicated POS.",
      sub: "Plug in any USB or bluetooth barcode scanner; scan item barcodes directly into TallyPrime sale vouchers. Batch, expiry, and MRP pulled in automatically.",
      gradient: "mist",
    },
    features: [
      {
        id: "bv-f1",
        title: "Any USB/BT scanner",
        body: "Works with any barcode scanner that presents as HID keyboard. Zero scanner-specific driver installations.",
        icon: "Keyboard",
      },
      {
        id: "bv-f2",
        title: "Batch + expiry autofill",
        body: "For pharma and FMCG, the batch and expiry date pull from item master based on scanned barcode.",
        icon: "CalendarRange",
      },
      {
        id: "bv-f3",
        title: "Scan-to-print flow",
        body: "Scan items → payment mode → scan next customer. Thermal printer integration; invoice prints as customer walks out.",
        icon: "Printer",
      },
      {
        id: "bv-f4",
        title: "Weighing-scale input",
        body: "For deli/groceries: capture weight from electronic weighing scales directly into voucher quantity.",
        icon: "Scale",
      },
    ],
    benefits: [
      "Counter throughput: 30 seconds per sale instead of 3 minutes",
      "Eliminate wrong-SKU errors on manual entry",
      "No POS subscription; TallyPrime is the POS",
    ],
    relatedSlugs: ["smart-backup", "bulk-invoice-mailer"],
  },

  {
    slug: "digital-signature",
    title: "Digital Signature for Invoices",
    tagline: "Apply DSC on any document from inside Tally.",
    summary:
      "Apply digital signature (DSC) on invoices, statements, and vouchers — with visible signature block and PDF-A export.",
    icon: "PenTool",
    hero: {
      eyebrow: "Digital Signature for Invoices",
      title: "Signed invoices in Tally — legal, tamper-evident, archive-ready.",
      sub: "Apply Class 3 DSC on outbound invoices, statements, purchase orders, and any voucher. Signed PDFs are tamper-evident and archive-ready (PDF-A/3).",
      gradient: "cream-gold",
    },
    features: [
      {
        id: "ds-f1",
        title: "DSC from inside Tally",
        body: "Plug in your DSC USB token; sign any voucher or report directly from the print preview screen.",
        icon: "KeyRound",
      },
      {
        id: "ds-f2",
        title: "Visible signature block",
        body: "Signed documents carry a visible signature block with signer name, organisation, and timestamp. No 'is this real?' moment for recipients.",
        icon: "Stamp",
      },
      {
        id: "ds-f3",
        title: "Bulk sign + send",
        body: "Combine with Bulk Invoice Mailer: sign 500 invoices and email them in a single batch run.",
        icon: "Layers",
      },
      {
        id: "ds-f4",
        title: "Archive-ready PDF-A/3",
        body: "Exports as PDF-A/3 — the statutory-archive format. Long-term readable and legally valid.",
        icon: "FileArchive",
      },
    ],
    benefits: [
      "Legally-binding invoices without printing",
      "Tamper evidence — recipients can verify the signature independently",
      "Faster AR — signed invoices get paid sooner",
    ],
    relatedSlugs: ["bulk-invoice-mailer", "audit-trail"],
  },

  {
    slug: "outstanding-reminder-bot",
    title: "Outstanding Reminder Bot",
    tagline: "Automated, polite payment reminders.",
    summary:
      "Schedule polite payment reminders to debtors via email, SMS, or WhatsApp — based on ageing buckets.",
    icon: "BellRing",
    hero: {
      eyebrow: "Outstanding Reminder Bot",
      title: "Nudge your debtors on a schedule — without the awkwardness.",
      sub: "Automated reminders to debtors based on invoice ageing. Polite-first, firmer over time; fully templated per customer segment. Pauses automatically on part-payments.",
      gradient: "sand",
    },
    features: [
      {
        id: "rb-f1",
        title: "Ageing-bucket schedule",
        body: "Different reminder cadence per bucket: 0–30 days (polite), 31–60 (firm), 61+ (final). Fully configurable.",
        icon: "CalendarRange",
      },
      {
        id: "rb-f2",
        title: "Multi-channel",
        body: "Email, SMS, and WhatsApp from the same reminder run. Customer-preference honoured; fallback rules per channel.",
        icon: "Send",
      },
      {
        id: "rb-f3",
        title: "Part-payment aware",
        body: "Partial payments logged in Tally automatically pause the next reminder — no awkward 'we just paid yesterday' moments.",
        icon: "Pause",
      },
      {
        id: "rb-f4",
        title: "Stop-list + exceptions",
        body: "Skip reminders for specific customers (disputes, legal hold) or specific invoices. Auto-resume when unflagged.",
        icon: "Filter",
      },
    ],
    benefits: [
      "DSO reduction — customers who get reminded, pay faster",
      "Accounts team reclaims the time spent on manual follow-ups",
      "Consistent, professional tone across every customer",
    ],
    relatedSlugs: ["bulk-invoice-mailer", "whatsapp-voucher-share"],
  },
];

export const addonDetails = z
  .array(AddonDetailSchema)
  .parse(raw);

export const addonDetailBySlug: Record<string, AddonDetail> =
  Object.fromEntries(addonDetails.map((a) => [a.slug, a]));

export const addonSlugs: readonly string[] = addonDetails.map((a) => a.slug);
