import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import { site } from "@/lib/site";
import { env } from "@/lib/env";
import { ModalProvider } from "@/components/modals/modal-context";
import { ModalRoot } from "@/components/modals/modal-root";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Gtm } from "@/components/analytics/gtm";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";
import "@/components/layout/chrome.css";

// 2026-10-30 redesign: one family for every voice — headings, sentences,
// numbers and controls. Exposed as --font-jakarta and mapped in
// styles/tokens.css to --font-sans, --font-serif and --font-serif-italic, so
// existing `font-serif` call sites keep compiling and simply switch face.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

// Plus Jakarta Sans has no Devanagari coverage, so the Marathi and Hindi testimonial
// quotes fall back to a system font. Not preloaded: it is needed by one band,
// and preloading two extra faces on every route is a cost the rest of the site
// does not pay for. Mapped in styles/tokens.css to --font-devanagari.
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600"],
  variable: "--font-noto-devanagari",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${site.shortName} — Tally Partner for Indian SMEs`,
    template: `%s — ${site.shortName}`,
  },
  description: site.tagline,
  applicationName: site.shortName,
  generator: "Next.js",
  keywords: [
    "Tally Partner",
    "Tally Prime",
    "Tally ERP 9",
    "Tally customization",
    "GST compliance",
    "SME accounting",
    "Finquanta",
    "Tally on Cloud",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.shortName} — Tally Partner for Indian SMEs`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} — Tally Partner for Indian SMEs`,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#C7BCD5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // globals.css sets `scroll-behavior: smooth` on <html>, which Next warns
      // about because it also animates route transitions. The smooth scroll is
      // deliberate — it serves the in-page anchors (#cloud, #testimonials, the
      // policy TOC) — so declare the intent and silence the warning.
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${notoSansDevanagari.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-ink font-sans flex flex-col">
        <Gtm />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />

        <a
          href="#main"
          className="sr-only absolute left-4 top-4 z-toast rounded-md bg-primary px-3 py-2 text-body-sm font-semibold text-white focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Skip to content
        </a>

        <ModalProvider>
          {/* The utility bar stays off until the partner category, phone and
              domain email are confirmed (home_page_content.md §1). */}
          <Header />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer />

          <FloatingActions />
          {/* StickyCloudPromo is off: the Tally on Cloud offer is unconfirmed
              (home_page_content.md §8). */}
          <ModalRoot />
        </ModalProvider>
      </body>
    </html>
  );
}
