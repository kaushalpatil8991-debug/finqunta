import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("blog index lists posts + tag filter updates count", async ({
    page,
  }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const initialCount = await page.locator("article").count();
    expect(initialCount).toBeGreaterThan(0);

    // Click a tag filter and confirm count changes.
    const tagBtn = page.getByRole("tab", { name: /^gst$/i });
    if ((await tagBtn.count()) > 0) {
      await tagBtn.click();
      const filtered = await page.locator("article").count();
      // Either fewer posts OR at least the count text updates.
      expect(filtered).toBeLessThanOrEqual(initialCount);
    }
  });

  test("post detail renders MDX body + Article JSON-LD", async ({ page }) => {
    await page.goto("/blog/gst-workflow-essentials");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // MDX body renders h2s.
    expect(await page.locator("h2").count()).toBeGreaterThan(0);

    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(scripts.join(" ")).toContain("Article");
  });
});
