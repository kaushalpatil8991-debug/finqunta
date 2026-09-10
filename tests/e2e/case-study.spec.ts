import { test, expect } from "@playwright/test";

test.describe("Case studies", () => {
  test("case-study index lists 4 studies", async ({ page }) => {
    await page.goto("/case-study");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const count = await page.locator("article").count();
    expect(count).toBe(4);
  });

  test("detail renders metrics band + Article JSON-LD", async ({ page }) => {
    await page.goto("/case-study/pune-pharma");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Metrics band — 4 boxes.
    const metrics = await page.locator("li >> text=/%|/").count();
    expect(metrics).toBeGreaterThan(0);

    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(scripts.join(" ")).toContain("Article");
  });
});
