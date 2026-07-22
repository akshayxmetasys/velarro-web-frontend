import { expect, test } from "@playwright/test";

test.describe("M09 Partner page", () => {
  test("loads the deferred-image layout and UI-only submitted state at 1440px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/partner");

    await expect(page.getByRole("link", { name: "Partner" })).toHaveAttribute(
      "href",
      "/partner",
    );

    const content = page.locator("[data-section='partner-content'] > div");
    const imagePanel = page.locator("[data-asset-slot='partner_main_image']");
    const formColumn = page.locator("[data-figma-node='14670:42192']");

    await expect(content).toBeVisible();
    await expect(imagePanel).toHaveAttribute("data-asset-status", "deferred");
    await expect(imagePanel.locator("img")).toHaveCount(0);

    const pageMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(pageMetrics.scrollWidth).toBeLessThanOrEqual(pageMetrics.clientWidth);

    const contentBox = await content.boundingBox();
    const imageBox = await imagePanel.boundingBox();
    const formBox = await formColumn.boundingBox();

    expect(contentBox?.width).toBeCloseTo(1279, 0);
    expect(imageBox?.width).toBeCloseTo(638, 0);
    expect(imageBox?.height).toBeCloseTo(885, 0);
    expect(formBox?.width).toBeCloseTo(564, 0);

    await page.getByLabel("Email Address").fill("partner@example.com");
    await page.getByLabel("Full name").fill("Avery Stone");
    await page.getByLabel("Phone number").fill("+1 555 0100");
    await page.getByLabel("Business name").fill("Stone Retail");
    await page.getByLabel("Country").fill("United States");
    await page.getByLabel("Your message").fill("Partnership message.");
    await page
      .locator("[data-partner-form]")
      .getByRole("button", { name: "SUBMIT" })
      .click();

    await expect(
      page.getByRole("heading", { name: "Preview recorded" }),
    ).toBeVisible();
    await expect(
      page
        .locator("[data-partner-submitted-state] p")
        .filter({ hasText: /No application has been submitted, stored, or delivered/i }),
    ).toBeVisible();
    await expect(page.getByText(/Application ID #/i)).toHaveCount(0);
    await expect(page.getByText(/confirmation has been sent/i)).toHaveCount(0);
    await expect(page.getByText("partner@example.com")).toHaveCount(0);
  });
});
