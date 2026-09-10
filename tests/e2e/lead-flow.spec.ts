import { test, expect } from "@playwright/test";

/**
 * End-to-end lead capture flow using the SP5 dev-mock OTP (123456).
 * Prereq: run with no MSG91 env vars set so the backend falls back to
 * the mock flow. (Production runs would need a real phone.)
 */
test.describe("Lead capture flow", () => {
  test("Talk-to-expert → OTP 123456 → Success modal", async ({ page }) => {
    await page.goto("/");

    // Open the talk-to-expert modal via the header CTA.
    await page.getByRole("button", { name: /Talk to Expert/i }).first().click();

    // The modal's main heading should be visible.
    await expect(
      page.getByRole("heading", { name: /talk to a Tally expert|talk to an expert/i })
    ).toBeVisible();

    // Fill the form.
    await page.getByLabel(/Your name/i).fill("Test Buyer");
    await page.getByLabel(/Mobile number/i).fill("9876543210");
    await page.getByLabel(/Email/i).fill("test.buyer@example.com");
    await page
      .getByLabel(/What can we help with/i)
      .fill("Just testing the end-to-end form flow for SP7.");
    await page.getByLabel(/I agree to be contacted/i).check();

    await page.getByRole("button", { name: /Continue|Send/i }).click();

    // OTP modal opens — the dev-mock hint should be visible.
    await expect(
      page.getByRole("heading", { name: /Verify your mobile/i })
    ).toBeVisible();

    // Enter the mock OTP digit-by-digit. The inputs are aria-labelled
    // "Digit 1 of 6" … "Digit 6 of 6".
    const otp = "123456";
    for (let i = 0; i < 6; i += 1) {
      await page
        .getByLabel(new RegExp(`Digit ${i + 1} of 6`))
        .fill(otp[i]!);
    }

    // Auto-submit on the 6th digit should open the success modal.
    await expect(
      page.getByRole("heading", {
        name: /Thanks — we will reach out/i,
      })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("Wrong OTP shows error state", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Talk to Expert/i }).first().click();

    await page.getByLabel(/Your name/i).fill("Test Buyer");
    await page.getByLabel(/Mobile number/i).fill("9876543210");
    await page.getByLabel(/Email/i).fill("test.buyer@example.com");
    await page
      .getByLabel(/What can we help with/i)
      .fill("Testing the wrong-OTP error path.");
    await page.getByLabel(/I agree to be contacted/i).check();
    await page.getByRole("button", { name: /Continue|Send/i }).click();

    await expect(
      page.getByRole("heading", { name: /Verify your mobile/i })
    ).toBeVisible();

    const wrong = "000000";
    for (let i = 0; i < 6; i += 1) {
      await page
        .getByLabel(new RegExp(`Digit ${i + 1} of 6`))
        .fill(wrong[i]!);
    }

    await expect(page.getByRole("alert")).toContainText(/did not match/i);
  });
});
