import { TestimonialSchema, type Testimonial } from "@/lib/schema";
import { z } from "zod";

/**
 * 10 sector-diverse testimonials. One Marathi (locale: 'mr') and one Hindi
 * (locale: 'hi'). All flagged isPlaceholder. Replace with real customer voices
 * before launch.
 */
const raw: Testimonial[] = [
  {
    id: "t-pharma-sahyadri",
    isPlaceholder: true,
    quote:
      "Finquanta's MIS dashboards gave us visibility into our distribution margins that we did not know Tally could deliver. Decisions we used to make on hunches are now backed by numbers.",
    authorName: "Anita Deshpande",
    authorTitle: "Head of Finance",
    company: "Sahyadri Pharma",
    sector: "Pharma",
    locale: "en",
  },
  {
    id: "t-distribution-mahalaxmi",
    isPlaceholder: true,
    quote:
      "Multi-branch sync across our 14 locations just works. Stock counts reconcile in real time, and the support team picks up the phone within minutes.",
    authorName: "Rahul Joshi",
    authorTitle: "Operations Director",
    company: "Mahalaxmi Distributors",
    sector: "Distribution",
    locale: "en",
  },
  {
    id: "t-manufacturing-sai",
    isPlaceholder: true,
    quote:
      "Their barcode and rack management add-on cut our monthly stock-reconciliation time by seventy percent. The team understood our shop floor before writing a line of TDL.",
    authorName: "Vikrant Patil",
    authorTitle: "Plant Manager",
    company: "Sai Industries",
    sector: "Manufacturing",
    locale: "en",
  },
  {
    id: "t-retail-marathi",
    isPlaceholder: true,
    quote:
      "आमच्या हिशोबाच्या समस्या Finquanta ने एका आठवड्यात सोडवल्या. त्यांची टीम खूप व्यावसायिक आणि मदतगार आहे — आम्ही पूर्णपणे समाधानी आहोत.",
    authorName: "Sneha Kulkarni",
    authorTitle: "Owner",
    company: "Aarambh Retail",
    sector: "Retail",
    locale: "mr",
  },
  {
    id: "t-services-hindi",
    isPlaceholder: true,
    quote:
      "Finquanta की टीम ने हमारी GST compliance को बहुत आसान बना दिया है। अब हर महीने रिटर्न फाइल करने में कोई दिक्कत नहीं होती और रिकॉर्ड्स हमेशा अप टू डेट रहते हैं।",
    authorName: "Manoj Gupta",
    authorTitle: "Founder",
    company: "Vikram Enterprises",
    sector: "Services",
    locale: "hi",
  },
  {
    id: "t-chemicals-deccan",
    isPlaceholder: true,
    quote:
      "Custom voucher formats they built matched our SOP exactly. We did not have to retrain a single person in the accounts team — the new layouts already looked like what they were used to.",
    authorName: "Priya Menon",
    authorTitle: "Finance Controller",
    company: "Deccan Polymers",
    sector: "Chemicals",
    locale: "en",
  },
  {
    id: "t-financial-konkan",
    isPlaceholder: true,
    quote:
      "AMC support response is always under an hour. When the e-invoicing portal changed last quarter, they had us patched and tested before our internal team even noticed.",
    authorName: "Suresh Naidu",
    authorTitle: "CFO",
    company: "Konkan Traders",
    sector: "FinancialServices",
    locale: "en",
  },
  {
    id: "t-media-rangoli",
    isPlaceholder: true,
    quote:
      "Training our finance team took two sessions — that is it. The team picked up custom reports and shortcuts they had been missing for years.",
    authorName: "Kavya Iyer",
    authorTitle: "Head of HR",
    company: "Rangoli Textiles",
    sector: "Media",
    locale: "en",
  },
  {
    id: "t-exports-pranay",
    isPlaceholder: true,
    quote:
      "API integration with our shipment tracker was live in ten working days. End-to-end status flowing into Tally without a single CSV upload anymore.",
    authorName: "Nilesh Shah",
    authorTitle: "Director",
    company: "Pranay Exports",
    sector: "Exports",
    locale: "en",
  },
  {
    id: "t-distribution-shreeji",
    isPlaceholder: true,
    quote:
      "Switching from a competitor felt seamless. We expected at least a day of downtime — there was none, and zero data was lost. Highly recommend their migration team.",
    authorName: "Ramesh Bhatt",
    authorTitle: "Managing Partner",
    company: "Shreeji Packaging",
    sector: "Distribution",
    locale: "en",
  },
];

export const testimonials = z.array(TestimonialSchema).parse(raw);
