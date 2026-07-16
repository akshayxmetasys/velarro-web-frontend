import { expect, test } from "@playwright/test";

const CAREERS_HERO_URL =
  "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/carrer-horo-20260709-034631-desktop-hero.webp";

test.describe("M09 Careers hero", () => {
  test("renders the approved production hero with explicit final crop positioning", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/careers");

    const hero = page.locator("[data-section='careers-hero']");
    await expect(hero).toBeVisible();

    const heroBox = await hero.boundingBox();
    expect(heroBox?.width).toBeCloseTo(1440, 0);
    expect(heroBox?.height).toBeCloseTo(655, 0);

    const heroLayer = page.locator("[data-careers-hero-image='approved']");
    await expect(heroLayer).toHaveCount(1);
    await expect(heroLayer).toHaveAttribute(
      "data-figma-crop",
      "careers-hero-final-13148-15771",
    );

    const heroImage = hero.locator("img");
    await expect(heroImage).toHaveCount(1);

    const imageMetrics = await heroImage.evaluate((image) => {
      const img = image as HTMLImageElement;
      const style = window.getComputedStyle(img);
      const box = img.getBoundingClientRect();

      return {
        src: img.currentSrc || img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        width: box.width,
        height: box.height,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition,
        transform: style.transform,
      };
    });

    expect(imageMetrics.src).toContain(encodeURIComponent(CAREERS_HERO_URL));
    expect(imageMetrics.complete).toBe(true);
    expect(imageMetrics.naturalWidth).toBe(1440);
    expect(imageMetrics.naturalHeight).toBe(810);
    expect(imageMetrics.width).toBeCloseTo(1440, 0);
    expect(imageMetrics.height).toBeCloseTo(655, 0);
    expect(imageMetrics.objectFit).toBe("fill");
    expect(imageMetrics.objectPosition).toBe("50% 50%");
    expect(imageMetrics.transform).toBe("none");

    const overlay = page.locator("[data-careers-hero-overlay='preserved']");
    await expect(overlay).toHaveCount(1);
    const overlayMetrics = await overlay.evaluate((element) => {
      const style = window.getComputedStyle(element);
      const box = element.getBoundingClientRect();

      return {
        width: box.width,
        height: box.height,
        backgroundColor: style.backgroundColor,
      };
    });

    expect(overlayMetrics.width).toBeCloseTo(1440, 0);
    expect(overlayMetrics.height).toBeCloseTo(655, 0);
    expect(overlayMetrics.backgroundColor).toBe("rgba(21, 20, 20, 0.5)");

    const deferredImages = page.locator(
      "[data-careers-image-status='deferred']",
    );
    await expect(deferredImages).toHaveCount(4);
    await expect(
      page.locator("[data-careers-image-status='deferred'] img"),
    ).toHaveCount(0);
  });
});
