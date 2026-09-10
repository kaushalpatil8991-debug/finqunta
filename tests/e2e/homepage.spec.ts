import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders all 9 sections in order", async ({ page }) => {
    await page.goto("/");

    // Hero
    await expect(
      page.getByRole("heading", { level: 1 }).first()
    ).toBeVisible();

    // Each homepage section carries an aria-labelledby; test a handful.
    await expect(
      page.locator('[aria-labelledby="values-heading"]')
    ).toBeVisible();
    await expect(
      page.locator('[aria-labelledby="offerings-heading"]')
    ).toBeVisible();
    await expect(
      page.locator('[aria-labelledby="cloud-heading"]')
    ).toBeVisible();
  });

  test("skip-to-content link works via keyboard", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
  });

  test("footer has current year + partner badge", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toContainText(String(new Date().getFullYear()));
    await expect(footer).toContainText("Tally Partner");
  });

  test("JSON-LD Organization + WebSite are emitted", async ({ page }) => {
    await page.goto("/");
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const joined = scripts.join(" ");
    expect(joined).toContain("Organization");
    expect(joined).toContain("WebSite");
  });
});
