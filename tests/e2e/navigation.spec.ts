import { test, expect } from "@playwright/test";

/**
 * Smoke-tests every major navigation destination returns 200 + renders.
 * Deliberately small list — just enough to confirm routing + data loading
 * is intact on every route family. Exhaustive route coverage is handled
 * by the sitemap test.
 */
const pages: Array<{ path: string; heading: RegExp }> = [
  { path: "/about-us", heading: /trust/i },
  { path: "/events", heading: /Events/i },
  { path: "/career", heading: /hiring|careers/i },
  { path: "/tallyprime-pricing", heading: /pricing/i },
  { path: "/download-tally-latest-release", heading: /download/i },
  { path: "/tally-erp-9-products", heading: /Tally/i },
  { path: "/tally-erp-9-products/tallyprime", heading: /TallyPrime/i },
  { path: "/tally-services", heading: /services/i },
  { path: "/tally-services/amc-annual-support", heading: /AMC|support/i },
  { path: "/tally-erp-9-add-ons-modules", heading: /add-on/i },
  { path: "/tally-erp-9-add-ons-modules/smart-backup", heading: /backup/i },
  { path: "/tally-mobile-apps", heading: /mobile|apps/i },
  { path: "/tally-erp-9-vertical-solutions", heading: /vertical|industry/i },
  { path: "/tally-erp-9-solution-boosters", heading: /booster/i },
  { path: "/tally-gst", heading: /GST/i },
  { path: "/tally-integration", heading: /Integrations?/i },
  { path: "/policies", heading: /Policies/i },
  { path: "/privacy-policy", heading: /Privacy/i },
  { path: "/blog", heading: /blog/i },
  { path: "/case-study", heading: /case stud/i },
];

for (const { path, heading } of pages) {
  test(`route ${path} renders with a matching H1`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status(), `status for ${path}`).toBe(200);
    const h1 = await page.locator("h1").first().textContent();
    expect(h1 ?? "").toMatch(heading);
  });
}

test("404 page renders for unknown route", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
});

test("mega-menu item deep-links to a product slug", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  // Hover the "Product & Services" trigger then click "TallyPrime".
  const menu = page.getByRole("button", { name: /Product & Services/i });
  await menu.hover();

  const link = page
    .getByRole("link", { name: /^TallyPrime$/ })
    .first();
  await link.click();

  await expect(page).toHaveURL(/\/tally-erp-9-products\/tallyprime/);
});
