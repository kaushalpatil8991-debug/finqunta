import type { Metadata, Viewport } from "next";
import { Manrope, Lora, Noto_Sans_Devanagari } from "next/font/google";
import { site } from "@/lib/site";
import { env } from "@/lib/env";
import { ModalProvider } from "@/components/modals/modal-context";
import { ModalRoot } from "@/components/modals/modal-root";
import { UtilityBar } from "@/components/layout/utility-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { StickyCloudPromo } from "@/components/layout/sticky-cloud-promo";
import { Gtm } from "@/components/analytics/gtm";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// S19 type-voice law: Lora carries every human sentence — headings, the footer
// wordmark, credentials. It previously loaded `style: ["italic"]` only, which
// rendered every one of those in italic. Roman weights are the primary faces;
// italic stays loaded so the existing `font-serif-italic` call sites are
// unchanged. Exposed to CSS as --font-lora, mapped in styles/tokens.css to
// both --font-serif (roman) and --font-serif-italic.
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

// Manrope has no Devanagari coverage, so the Marathi and Hindi testimonial
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
  themeColor: "#FBF7F0",
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
      className={`${manrope.variable} ${lora.variable} ${notoSansDevanagari.variable} antialiased`}
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
          <UtilityBar />
          <Header />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer />

          <FloatingActions />
          <StickyCloudPromo />
          <ModalRoot />
        </ModalProvider>
      </body>
    </html>
  );
}
