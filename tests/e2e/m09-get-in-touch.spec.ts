import { expect, test } from "@playwright/test";

test.describe("M09 Get in Touch page", () => {
  test("loads hero, deferred map, and UI-only submitted state at 1440px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/get-in-touch");

    const heroImage = page.getByTestId("get-in-touch-hero-image");

    await expect(heroImage).toBeVisible();
    await page.waitForFunction(() => {
      const image = document.querySelector(
        "[data-testid='get-in-touch-hero-image']",
      ) as HTMLImageElement | null;
      return Boolean(image && image.complete && image.naturalWidth > 0);
    });

    const metrics = await page.evaluate(() => {
      const heroElement = document.querySelector(
        "[data-testid='get-in-touch-hero']",
      ) as HTMLElement | null;
      const image = document.querySelector(
        "[data-testid='get-in-touch-hero-image']",
      ) as HTMLImageElement | null;
      const heroRect = heroElement?.getBoundingClientRect();
      const imageStyles = image ? window.getComputedStyle(image) : null;
      const heroStyles = heroElement ? window.getComputedStyle(heroElement) : null;

      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        heroWidth: heroRect?.width ?? 0,
        heroHeight: heroRect?.height ?? 0,
        naturalWidth: image?.naturalWidth ?? 0,
        naturalHeight: image?.naturalHeight ?? 0,
        imageTransform: imageStyles?.transform ?? "",
        objectFit: imageStyles?.objectFit ?? "",
        imageWidth: image?.getBoundingClientRect().width ?? 0,
        imageHeight: image?.getBoundingClientRect().height ?? 0,
        heroTransform: heroStyles?.transform ?? "",
        imageSrc: image?.currentSrc ?? image?.src ?? "",
      };
    });

    expect(metrics.naturalWidth).toBeGreaterThan(0);
    expect(metrics.naturalHeight).toBeGreaterThan(0);
    expect(metrics.heroWidth).toBeCloseTo(1440, -1);
    expect(metrics.heroHeight).toBeCloseTo(655, 0);
    expect(metrics.imageTransform).toBe("none");
    expect(metrics.heroTransform).toBe("none");
    expect(metrics.objectFit).toBe("cover");
    expect(metrics.imageWidth).toBeLessThanOrEqual(metrics.heroWidth + 1);
    expect(metrics.imageHeight).toBeLessThanOrEqual(metrics.heroHeight + 1);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.imageSrc).toContain("get-in-touch-hero-20260709-024211-desktop-hero.webp");

    await expect(page.getByTestId("get-in-touch-map-deferred")).toHaveAttribute(
      "data-asset-status",
      "deferred",
    );
    await expect(page.locator("iframe")).toHaveCount(0);

    await page.getByLabel("Name", { exact: true }).fill("John Doe");
    await page.getByLabel("Email address").fill("john@example.com");
    await page.getByLabel("Phone number").fill("000 0000 000");
    await page.getByLabel("Subject").fill("General support");
    await page.getByLabel("Message").fill("I have a product question.");
    await page.locator("[data-get-in-touch-form]").getByRole("button", { name: "SUBMIT" }).click();

    await expect(page.getByRole("heading", { name: "Thank you!" })).toBeVisible();
    await expect(page.getByText("john@example.com")).toHaveCount(0);

    await page.screenshot({
      path: "test-results/m09-get-in-touch-1440-review.png",
      fullPage: true,
    });
  });
});
