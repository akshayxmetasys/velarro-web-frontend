import { expect, test, type Page } from "@playwright/test";

const VIEWPORTS = [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

const FIXED_TOLERANCE_PX = 4;
const CONTENT_TOLERANCE_PX = 14;
const FIGMA_PAGE_HEIGHT_PX = 3332;
/**
 * Shared MainFooter is locked and taller than Figma ≈697; Gotham unavailable.
 * Cap absolute page-height delta at 280px.
 */
const PAGE_HEIGHT_TOLERANCE_PX = 280;

const CARD_ORDER = [
  "rum-and-cigars",
  "whisky-and-cigars",
  "cocktails-and-cigars",
  "wine-and-cigars",
  "sparkling-and-cigars",
  "coffee-and-cigars",
] as const;

async function gotoPairingGuide(page: Page) {
  await page.goto("/pairing-guide", { waitUntil: "domcontentloaded" });
}

test.describe("V-08b Pairing Guide fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Pairing Guide desktop geometry at 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoPairingGuide(page);

    const pageRoot = page.locator("[data-route='/pairing-guide']");
    const hero = page.locator("[data-section='pairing-guide-hero']");
    const heroContent = page.locator("[data-section='pairing-guide-hero-content']");
    const breadcrumbs = page.locator("[data-section='pairing-guide-breadcrumbs']");
    const heading = page.locator("[data-section='pairing-guide-heading']");
    const grid = page.locator("[data-pairing-guide-card-grid]");
    const cta = page.locator("[data-section='pairing-guide-cta']");
    const footer = page.getByRole("contentinfo");
    const navbar = page.getByRole("navigation", { name: "Main navigation" });

    await expect(pageRoot).toBeVisible();
    await expect(hero).toBeVisible();
    await expect(navbar).toBeVisible();
    await expect(footer).toBeVisible();

    const heroBox = await hero.boundingBox();
    const heroContentBox = await heroContent.boundingBox();
    const crumbBox = await breadcrumbs.boundingBox();
    const headingBox = await heading.boundingBox();
    const gridBox = await grid.boundingBox();
    const ctaBox = await cta.boundingBox();
    const navbarBox = await navbar.boundingBox();
    const footerBox = await footer.boundingBox();

    expect(heroBox).not.toBeNull();
    expect(heroContentBox).not.toBeNull();
    expect(crumbBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    expect(gridBox).not.toBeNull();
    expect(ctaBox).not.toBeNull();
    expect(navbarBox).not.toBeNull();
    expect(footerBox).not.toBeNull();

    expect(Math.abs(heroBox!.height - 655)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(heroBox!.width - 1440)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(navbarBox!.y - 0)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(heroContentBox!.y - 281)).toBeLessThanOrEqual(CONTENT_TOLERANCE_PX);
    expect(Math.abs(heroContentBox!.width - 777)).toBeLessThanOrEqual(CONTENT_TOLERANCE_PX);
    expect(Math.abs(crumbBox!.y - (heroBox!.y + heroBox!.height + 12))).toBeLessThanOrEqual(
      CONTENT_TOLERANCE_PX,
    );
    expect(Math.abs(crumbBox!.width - 1356)).toBeLessThanOrEqual(40);
    expect(
      Math.abs(headingBox!.y - (crumbBox!.y + crumbBox!.height + 48)),
    ).toBeLessThanOrEqual(CONTENT_TOLERANCE_PX);
    expect(Math.abs(gridBox!.width - 1282)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);

    const cards = page.locator("[data-pairing-guide-card]");
    await expect(cards).toHaveCount(6);
    const ids = await cards.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-pairing-guide-card-id")),
    );
    expect(ids).toEqual([...CARD_ORDER]);

    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    const third = await cards.nth(2).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(third).not.toBeNull();
    expect(Math.abs(first!.width - 626)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(first!.height - 398)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(second!.x - (first!.x + first!.width) - 28)).toBeLessThanOrEqual(
      FIXED_TOLERANCE_PX,
    );
    expect(Math.abs(third!.y - (first!.y + first!.height) - 80)).toBeLessThanOrEqual(
      FIXED_TOLERANCE_PX,
    );

    const content = cards.first().locator("[data-pairing-guide-card-content]");
    const contentBox = await content.boundingBox();
    expect(contentBox).not.toBeNull();
    expect(Math.abs(contentBox!.x - (first!.x + 55))).toBeLessThanOrEqual(
      CONTENT_TOLERANCE_PX,
    );
    expect(Math.abs(contentBox!.y - (first!.y + 88))).toBeLessThanOrEqual(
      CONTENT_TOLERANCE_PX,
    );

    const body = cards.first().locator("[data-pairing-guide-typography='card-body']");
    const bodyBox = await body.boundingBox();
    expect(bodyBox).not.toBeNull();
    expect(Math.abs(bodyBox!.width - 489)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);

    const sources = new Set<string>();
    for (let i = 0; i < 6; i += 1) {
      const img = cards.nth(i).locator("[data-pairing-guide-card-image] img");
      await expect
        .poll(
          async () =>
            img.evaluate(
              (node: HTMLImageElement) =>
                node.complete && node.naturalWidth > 0,
            ),
          { timeout: 15_000 },
        )
        .toBe(true);

      const metrics = await img.evaluate((node: HTMLImageElement) => ({
        src: node.getAttribute("src") ?? "",
        naturalWidth: node.naturalWidth,
        naturalHeight: node.naturalHeight,
        objectFit: getComputedStyle(node).objectFit,
        objectPosition: getComputedStyle(node).objectPosition,
        filter: getComputedStyle(node).filter,
      }));
      expect(metrics.src).toContain("/images/m08-pairing-guide/");
      expect(metrics.src).not.toContain("figma.com");
      expect(metrics.naturalWidth).toBeGreaterThan(400);
      expect(metrics.naturalHeight).toBeGreaterThan(300);
      expect(metrics.objectFit).toBe("cover");
      expect(metrics.objectPosition).toBe("50% 50%");
      expect(metrics.filter).toContain("blur(3px)");
      sources.add(metrics.src);
    }
    expect(sources.size).toBe(6);

    expect(Math.abs(ctaBox!.width - 1282)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(ctaBox!.y - (gridBox!.y + gridBox!.height) - 80)).toBeLessThanOrEqual(
      CONTENT_TOLERANCE_PX,
    );
    expect(footerBox!.y).toBeGreaterThan(ctaBox!.y + ctaBox!.height);

    const pageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    expect(Math.abs(pageHeight - FIGMA_PAGE_HEIGHT_PX)).toBeLessThanOrEqual(
      PAGE_HEIGHT_TOLERANCE_PX,
    );
  });

  test("protects Pairing Guide content across age states", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoPairingGuide(page);

    await expect(
      page.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "PERFECT PAIRINGS" }),
    ).toHaveCount(0);
    await expect(page.locator("[data-pairing-guide-card]")).toHaveCount(0);

    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "under21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await gotoPairingGuide(page);

    await expect(
      page.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "PERFECT PAIRINGS" }),
    ).toHaveCount(0);

    await context.clearCookies();
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await gotoPairingGuide(page);

    await expect(
      page.getByRole("heading", { level: 1, name: "PERFECT PAIRINGS" }),
    ).toBeVisible();
    await expect(page.locator("[data-pairing-guide-card]")).toHaveCount(6);
  });

  test("keeps pairing controls truthful and disabled", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoPairingGuide(page);

    const explores = page.locator("button[data-pairing-guide-explore='deferred']");
    const findPairing = page.locator(
      "button[data-pairing-guide-find-pairing='deferred']",
    );
    await expect(explores).toHaveCount(6);
    await expect(findPairing).toHaveCount(1);

    const urlBefore = page.url();
    const sideEffects: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") {
        sideEffects.push(`${request.method()} ${request.url()}`);
      }
    });
    page.on("dialog", () => {
      sideEffects.push("dialog");
    });

    for (let i = 0; i < 6; i += 1) {
      const button = explores.nth(i);
      await expect(button).toBeDisabled();
      await expect(button).not.toHaveAttribute("href");
      await button.focus();
      await page.keyboard.press("Enter");
      await page.keyboard.press("Space");
    }

    await expect(findPairing).toBeDisabled();
    await expect(findPairing).not.toHaveAttribute("href");
    await findPairing.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Space");

    expect(page.url()).toBe(urlBefore);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(sideEffects).toEqual([]);

    const storageDelta = await page.evaluate(() => ({
      local: window.localStorage.length,
      session: window.sessionStorage.length,
    }));
    expect(storageDelta.local).toBe(0);
    expect(storageDelta.session).toBe(0);
  });

  test("remains contained across required viewports without root overflow masking", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoPairingGuide(page);

      await expect(
        page.getByRole("heading", { level: 1, name: "PERFECT PAIRINGS" }),
      ).toBeVisible();
      await expect(page.locator("[data-pairing-guide-card]")).toHaveCount(6);

      const metrics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const pageRoot = document.querySelector("[data-route='/pairing-guide']");
        const main = document.querySelector("main");
        return {
          documentScrollWidth: root.scrollWidth,
          documentClientWidth: root.clientWidth,
          bodyScrollWidth: body.scrollWidth,
          bodyClientWidth: body.clientWidth,
          pageRootClass: pageRoot?.className ?? "",
          mainClass: main?.className ?? "",
        };
      });

      expect(
        metrics.documentScrollWidth,
        `${viewport.width} document scrollWidth`,
      ).toBe(metrics.documentClientWidth);
      expect(
        metrics.bodyScrollWidth,
        `${viewport.width} body scrollWidth`,
      ).toBe(metrics.bodyClientWidth);
      expect(metrics.pageRootClass).not.toMatch(
        /overflow-x-hidden|overflow-x-clip|overflow-hidden|overflow-clip/,
      );
      expect(metrics.mainClass).not.toMatch(
        /overflow-x-hidden|overflow-x-clip|overflow-hidden|overflow-clip/,
      );

      if (viewport.width < 1280) {
        const first = await page.locator("[data-pairing-guide-card]").nth(0).boundingBox();
        const second = await page.locator("[data-pairing-guide-card]").nth(1).boundingBox();
        expect(first).not.toBeNull();
        expect(second).not.toBeNull();
        expect(second!.y).toBeGreaterThan(first!.y);
      }

      await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
      await expect(
        page.getByRole("heading", { level: 2, name: "Stay in Know" }),
      ).toBeVisible();
    }
  });
});
