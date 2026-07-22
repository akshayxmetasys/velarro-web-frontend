import { expect, test } from "@playwright/test";
import { CAREER_POSITIONS } from "../../components/m09-careers/careers-positions-data";

test.describe("M09 Careers positions page", () => {
  test("renders search, deferred filters, and keyword filtering at 1440px", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const networkUrls: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("request", (request) => {
      networkUrls.push(request.url());
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/careers/positions");

    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(breadcrumb.getByRole("link", { name: "Careers" })).toHaveAttribute(
      "href",
      "/careers",
    );
    await expect(breadcrumb.getByText("Positions")).toBeVisible();

    await expect(page.getByRole("searchbox", { name: "Search by keywords" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Search Jobs" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Filter" })).toBeVisible();

    for (const filterKey of [
      "company",
      "employment",
      "position",
      "country",
      "state-or-province",
    ]) {
      await expect(
        page.locator(`[data-filter-key="${filterKey}"][data-filter-status="deferred"]`),
      ).toBeVisible();
    }

    const cards = page.locator("[data-careers-position-card]");
    await expect(cards).toHaveCount(6);
    for (let index = 0; index < CAREER_POSITIONS.length; index += 1) {
      const position = CAREER_POSITIONS[index];
      await expect(cards.nth(index)).toHaveAttribute(
        "data-position-slug",
        position.slug,
      );

      const expectedDetailStatus =
        position.slug === "area-sales-manager" ? "implemented" : "deferred";
      await expect(cards.nth(index)).toHaveAttribute(
        "data-position-detail-status",
        expectedDetailStatus,
      );

      if (position.slug === "area-sales-manager") {
        await expect(cards.nth(index).locator("a")).toHaveAttribute(
          "href",
          "/careers/positions/area-sales-manager",
        );
      } else {
        await expect(cards.nth(index).locator("a")).toHaveCount(0);
      }
    }

    await page.getByRole("searchbox", { name: "Search by keywords" }).fill(
      "Production Manager",
    );
    await page.getByRole("button", { name: "Search Jobs" }).click();
    await expect(cards).toHaveCount(1);

    await page.getByRole("searchbox", { name: "Search by keywords" }).fill("");
    await page.getByRole("button", { name: "Search Jobs" }).click();
    await expect(cards).toHaveCount(6);

    await page.getByRole("searchbox", { name: "Search by keywords" }).fill(
      "nonexistent role",
    );
    await page.getByRole("button", { name: "Search Jobs" }).click();
    await expect(page.locator("[data-careers-positions-empty]")).toBeVisible();
    await expect(cards).toHaveCount(0);

    const pageMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      figmaAssets: Array.from(document.querySelectorAll("*"))
        .map((node) => node.outerHTML)
        .join(" ")
        .includes("figma.com/api/mcp/asset"),
      routeImages: document.querySelectorAll(
        "[data-careers-position-card] img",
      ).length,
    }));

    expect(pageMetrics.scrollWidth).toBeLessThanOrEqual(pageMetrics.clientWidth);
    expect(pageMetrics.figmaAssets).toBe(false);
    expect(pageMetrics.routeImages).toBe(0);
    expect(networkUrls.some((url) => url.includes("/api/"))).toBe(false);
    expect(consoleErrors).toEqual([]);

    await page.screenshot({
      path: "test-results/m09-careers-positions-1440-review.png",
      fullPage: true,
    });
  });
});
