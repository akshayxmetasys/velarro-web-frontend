import { expect, test } from "@playwright/test";

const DEFERRED_MARKERS = [
  "membership-tier-house-deferred",
  "membership-tier-reserve-deferred",
  "membership-tier-estate-deferred",
  "membership-tier-atelier-deferred",
  "membership-tier-private-circle-deferred",
  "membership-cta-banner-deferred",
] as const;

test.describe("M09 Membership page", () => {
  test("renders deferred membership layout at 1440px for all age states", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/membership");

    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    for (const tierId of [
      "house",
      "reserve",
      "estate",
      "atelier",
      "private-circle",
    ] as const) {
      await expect(
        page.locator(`[data-membership-tier-id="${tierId}"]`),
      ).toBeVisible();
    }

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(breadcrumb.getByText("Membership")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "TIER BENEFITS COMPARISON" }),
    ).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByText("Browse & Shop")).toBeVisible();
    await expect(page.getByText("Invitation-Only Events")).toBeVisible();

    await expect(
      page.getByText("THIS IS MORE THAN MEMBERSHIP. THIS IS VELARRO ESTATE."),
    ).toBeVisible();

    for (const marker of DEFERRED_MARKERS) {
      await expect(page.getByTestId(marker)).toHaveAttribute(
        "data-asset-status",
        "deferred",
      );
      await expect(page.getByTestId(marker).locator("img")).toHaveCount(0);
    }

    const pageMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      figmaAssets: Array.from(document.querySelectorAll("*"))
        .map((node) => node.outerHTML)
        .join(" ")
        .includes("figma.com/api/mcp/asset"),
    }));
    expect(pageMetrics.scrollWidth).toBeLessThanOrEqual(pageMetrics.clientWidth);
    expect(pageMetrics.figmaAssets).toBe(false);
    expect(consoleErrors).toEqual([]);

    await page.screenshot({
      path: "test-results/m09-membership-1440-review.png",
      fullPage: true,
    });
  });
});
