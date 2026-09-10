import { site } from "@/lib/site";
import { env } from "@/lib/env";
import type {
  BlogPostMeta,
  CaseStudyMeta,
  ProductDetail,
  Faq,
} from "@/lib/schema";

/**
 * Structured-data builders. Each returns a plain JSON-serialisable object
 * that matches a schema.org type. Consumed by <JsonLd /> on the relevant
 * page.
 *
 * Designing each as a pure function (no React context, no hooks) means
 * they work in Server Components and can be unit-tested if we ever add
 * a test harness.
 */

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

export function absUrl(path: string): string {
  if (!path) return SITE_URL;
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: SITE_URL,
    logo: absUrl("/favicon.ico"),
    description: site.tagline,
    slogan: site.tagline,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.director.name },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone.tel,
        contactType: "customer support",
        email: site.email,
        areaServed: "IN",
        availableLanguage: ["en", "hi", "mr"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      addressCountry: site.address.country,
    },
    knowsAbout: [
      "Tally Partner",
      "TallyPrime",
      "GST compliance",
      "Tally on Cloud",
      "TDL customisation",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.shortName,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: site.name },
  };
}

interface Crumb {
  label: string;
  href?: string;
}

export function breadcrumbSchema(items: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absUrl(c.href) } : {}),
    })),
  };
}

export function faqSchema(items: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(params: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  url: string;
  tags?: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.excerpt,
    datePublished: params.date,
    author: { "@type": "Person", name: params.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absUrl("/favicon.ico") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(params.url) },
    ...(params.tags && params.tags.length > 0
      ? { keywords: params.tags.join(", ") }
      : {}),
  };
}

export function blogPostSchema(post: BlogPostMeta) {
  return articleSchema({
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    url: `/blog/${post.slug}`,
    tags: post.tags,
  });
}

export function caseStudySchema(study: CaseStudyMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.excerpt,
    datePublished: study.date,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absUrl("/favicon.ico") },
    },
    about: { "@type": "Organization", name: study.customer },
    articleSection: study.sector,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absUrl(`/case-study/${study.slug}`),
    },
  };
}

export function productSchema(product: ProductDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    brand: { "@type": "Brand", name: "Tally Solutions" },
    seller: { "@type": "Organization", name: site.name },
    category: "Accounting software",
    url: absUrl(`/tally-erp-9-products/${product.slug}`),
    ...(product.editions && product.editions.length > 0
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            offerCount: product.editions.length,
            offers: product.editions.map((e) => ({
              "@type": "Offer",
              name: e.name,
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "INR",
                price: e.priceNote,
              },
              availability: "https://schema.org/InStock",
              url: absUrl(`/tally-erp-9-products/${product.slug}`),
            })),
          },
        }
      : {}),
  };
}
