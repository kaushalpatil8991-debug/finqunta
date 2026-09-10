import { test, expect } from "@playwright/test";

test.describe("Newsletter subscribe", () => {
  test("valid email → success modal", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer newsletter form.
    await page.getByLabel("Email address").scrollIntoViewIfNeeded();

    await page.getByLabel("Email address").fill("reader@example.com");
    await page.getByRole("button", { name: /Subscribe/i }).click();

    await expect(
      page.getByRole("heading", { name: /please check your inbox/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("invalid email → client-side validation blocks submit", async ({ page }) => {
    await page.goto("/");
    const input = page.getByLabel("Email address");
    await input.scrollIntoViewIfNeeded();
    await input.fill("not-an-email");
    await page.getByRole("button", { name: /Subscribe/i }).click();

    // react-hook-form should surface the inline error rather than open the success modal.
    await expect(page.getByText(/valid email/i).first()).toBeVisible();
  });
});
