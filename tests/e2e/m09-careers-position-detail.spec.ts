import { expect, test } from "@playwright/test";

test.describe("M09 Careers position detail page", () => {
  test("navigates from listing to the approved detail page at 1440px", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/careers/positions");

    const implementedLinks = page.locator(
      '[data-position-detail-status="implemented"] a',
    );
    await expect(implementedLinks).toHaveCount(1);
    await expect(
      page.locator('[data-position-slug="area-sales-manager"] a'),
    ).toHaveAttribute("href", "/careers/positions/area-sales-manager");

    await page.locator('[data-position-slug="area-sales-manager"] a').click();
    await expect(page).toHaveURL(/\/careers\/positions\/area-sales-manager$/);

    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Positions" })).toHaveAttribute(
      "href",
      "/careers/positions",
    );
    await expect(breadcrumb.getByText("Job description")).toBeVisible();

    await expect(page.getByRole("searchbox", { name: "Search by keywords" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Search Jobs" })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "Area Sales Manager" }),
    ).toBeVisible();
    await expect(page.getByText("01-06-2026")).toBeVisible();
    await expect(page.getByText("Hyderabad, India")).toBeVisible();
    await expect(page.getByText("Permanent Position")).toBeVisible();
    await expect(page.getByText("100%")).toBeVisible();
    await expect(page.getByText(/world-class handcrafted cigars/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Responsibilities" })).toBeVisible();
    await expect(page.getByText("Manage regional distributor and retail relationships.")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Qualification and Experience" }),
    ).toBeVisible();
    await expect(page.getByText(/Bachelor.?s degree in Business/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "What We Offer" })).toBeVisible();
    await expect(page.getByText(/growing luxury lifestyle brand/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "HR Contact" })).toBeVisible();
    await expect(page.getByText("hr@velarroestate.gmail.com")).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);

    const applyLink = page.getByRole("link", { name: "Apply for this job" });
    await expect(applyLink).toHaveAttribute(
      "href",
      "/careers/positions/area-sales-manager/apply",
    );
    await expect(applyLink).toHaveAttribute("data-application-status", "implemented");

    const pageMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      figmaAssets: Array.from(document.querySelectorAll("*"))
        .map((node) => node.outerHTML)
        .join(" ")
        .includes("figma.com/api/mcp/asset"),
      detailImages: document.querySelectorAll(
        "[data-section='careers-position-detail'] img",
      ).length,
    }));
    expect(pageMetrics.scrollWidth).toBeLessThanOrEqual(pageMetrics.clientWidth);
    expect(pageMetrics.figmaAssets).toBe(false);
    expect(pageMetrics.detailImages).toBe(0);
    expect(consoleErrors).toEqual([]);

    await page.screenshot({
      path: "test-results/m09-careers-position-detail-1440-review.png",
      fullPage: true,
    });
  });

  test("returns not found for unsupported detail slugs", async ({ page }) => {
    const response = await page.goto(
      "/careers/positions/production-manager",
    );
    expect(response?.status()).toBe(404);
  });
});
