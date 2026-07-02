import { test, expect } from "@playwright/test";

/**
 * M00 placeholder — foundations E2E wiring only.
 * Module-specific flows are added in M01+.
 */
test.describe("M00 foundations", () => {
  test("home route responds", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Velarro Estate/);
  });
});
