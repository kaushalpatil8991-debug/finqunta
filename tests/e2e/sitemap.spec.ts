import { test, expect } from "@playwright/test";

test.describe("Sitemap + robots", () => {
  test("/sitemap.xml returns 200 with expected entries", async ({
    request,
  }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    // Spot-check key URLs by path suffix.
    for (const path of [
      "/tally-erp-9-products/tallyprime",
      "/blog/gst-workflow-essentials",
      "/case-study/pune-pharma",
      "/privacy-policy",
      "/tallyprime-pricing",
    ]) {
      expect(body, `${path} missing from sitemap`).toContain(path);
    }
    // At least 70 URLs.
    const urlCount = (body.match(/<url>/g) ?? []).length;
    expect(urlCount).toBeGreaterThan(70);
  });

  test("/robots.txt allows all + references sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-agent:\s*\*/i);
    expect(body).toContain("Disallow: /api/");
    expect(body.toLowerCase()).toContain("sitemap:");
  });
});
