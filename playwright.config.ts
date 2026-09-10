import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — exercises the production build against Chromium,
 * Firefox, and WebKit plus one mobile viewport. Run with:
 *
 *   pnpm build && pnpm start &   # start the prod server
 *   pnpm test                    # runs all specs across all projects
 *
 * Or for fast dev-iteration:
 *
 *   pnpm dev
 *   BASE_URL=http://localhost:3000 pnpm test -- --project=chromium
 *
 * The config auto-starts `pnpm dev` when BASE_URL is unset (CI-friendly).
 */
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "pnpm dev",
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
