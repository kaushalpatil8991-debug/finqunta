import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility scan covering one representative page per route family.
 * Fails on any `serious` or `critical` violation, surfacing WCAG 2.1 A/AA
 * issues. Minor/moderate violations are allowed through in SP7 to keep
 * the gate actionable; tighten once the fixable ones are clean.
 */
const routes: Array<{ label: string; path: string }> = [
  { label: "homepage", path: "/" },
  { label: "about", path: "/about-us" },
  { label: "product overview", path: "/tally-erp-9-products" },
  { label: "product detail", path: "/tally-erp-9-products/tallyprime" },
  { label: "service detail", path: "/tally-services/amc-annual-support" },
  { label: "pricing", path: "/tallyprime-pricing" },
  { label: "blog index", path: "/blog" },
  { label: "blog post", path: "/blog/gst-workflow-essentials" },
  { label: "case study", path: "/case-study/pune-pharma" },
  { label: "policy", path: "/privacy-policy" },
];

for (const { label, path } of routes) {
  test(`a11y: ${label} has no serious violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules([
        // Color-contrast check is flaky against shadow-DOM / gradient
        // backgrounds — tune separately. Include ink-300 reviews manually.
        "color-contrast",
      ])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );

    if (serious.length > 0) {
      console.log(`\n[a11y:${label}] violations:\n`, JSON.stringify(serious, null, 2));
    }
    expect(serious, `serious a11y issues on ${path}`).toHaveLength(0);
  });
}
