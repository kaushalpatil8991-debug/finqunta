import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { productSlugs } from "@/content/details/products";
import { serviceSlugs } from "@/content/details/services";
import { addonSlugs } from "@/content/details/addons";
import { mobileAppSlugs } from "@/content/details/mobile-apps";
import { verticalSlugs } from "@/content/details/verticals";
import { boosterSlugs } from "@/content/details/boosters";
import { blogPosts } from "@/content/blog";
import { caseStudies } from "@/content/case-studies";
import { policies } from "@/content/policies";

const SITE = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

/**
 * Static + SSG sitemap for every indexable route on the site.
 * Dynamic API routes (`/api/*`) are excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const top = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about-us", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/events", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/career", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/tallyprime-pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/download-tally-latest-release", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tally-erp-9-products", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/tally-services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/tally-customization", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tally-mobile-apps", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tally-integration", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tally-erp-9-vertical-solutions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tally-gst", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tally-erp-9-solution-boosters", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tally-erp-9-add-ons-modules", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/policies", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/case-study", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const products = productSlugs.map((s) => ({
    path: `/tally-erp-9-products/${s}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));
  const services = serviceSlugs.map((s) => ({
    path: `/tally-services/${s}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));
  const addons = addonSlugs.map((s) => ({
    path: `/tally-erp-9-add-ons-modules/${s}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));
  const apps = mobileAppSlugs.map((s) => ({
    path: `/tally-mobile-apps/${s}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));
  const verticals = verticalSlugs.map((s) => ({
    path: `/tally-erp-9-vertical-solutions/${s}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));
  const boosters = boosterSlugs.map((s) => ({
    path: `/tally-erp-9-solution-boosters/${s}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const blog = blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.75,
    changeFrequency: "yearly" as const,
    lastModified: new Date(p.date),
  }));

  const caseStudyRoutes = caseStudies.map((c) => ({
    path: `/case-study/${c.slug}`,
    priority: 0.75,
    changeFrequency: "yearly" as const,
    lastModified: new Date(c.date),
  }));

  const policyRoutes = policies.map((p) => ({
    path: `/${p.slug}`,
    priority: 0.3,
    changeFrequency: "yearly" as const,
    lastModified: new Date(p.lastUpdated),
  }));

  type Row = {
    path: string;
    priority: number;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    lastModified?: Date;
  };

  const rows: Row[] = [
    ...top,
    ...products,
    ...services,
    ...addons,
    ...apps,
    ...verticals,
    ...boosters,
    ...blog,
    ...caseStudyRoutes,
    ...policyRoutes,
  ];

  return rows.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: r.lastModified ?? now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
