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
const FIGMA_PAGE_HEIGHT_PX = 3884;
/**
 * Shared MainFooter is locked and taller than Figma ≈697; Gotham unavailable.
 * Cap absolute page-height delta at 280px.
 */
const PAGE_HEIGHT_TOLERANCE_PX = 280;

async function gotoChronicle(page: Page) {
  await page.goto("/the-chronicle", { waitUntil: "domcontentloaded" });
}

test.describe("V-08a The Chronicle fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Chronicle desktop geometry at 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoChronicle(page);

    const pageRoot = page.locator("[data-route='/the-chronicle']");
    const hero = page.locator("[data-section='chronicle-hero']");
    const heroContent = page.locator("[data-section='chronicle-hero-content']");
    const breadcrumbs = page.locator("[data-section='chronicle-breadcrumbs']");
    const ticker = page.locator("[data-section='chronicle-news-ticker']");
    const cardStack = page.locator("[data-chronicle-card-stack]");
    const footer = page.getByRole("contentinfo");
    const navbar = page.getByRole("navigation", { name: "Main navigation" });

    await expect(pageRoot).toBeVisible();
    await expect(hero).toBeVisible();
    await expect(navbar).toBeVisible();
    await expect(footer).toBeVisible();
    await expect(page.locator("[data-section='chronicle-cards']")).toBeVisible();

    const heroBox = await hero.boundingBox();
    const heroContentBox = await heroContent.boundingBox();
    const crumbBox = await breadcrumbs.boundingBox();
    const tickerBox = await ticker.boundingBox();
    const navbarBox = await navbar.boundingBox();
    const footerBox = await footer.boundingBox();

    expect(heroBox).not.toBeNull();
    expect(heroContentBox).not.toBeNull();
    expect(crumbBox).not.toBeNull();
    expect(tickerBox).not.toBeNull();
    expect(navbarBox).not.toBeNull();
    expect(footerBox).not.toBeNull();

    expect(Math.abs(heroBox!.height - 655)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(heroBox!.width - 1440)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(navbarBox!.y - 0)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(heroContentBox!.y - 264)).toBeLessThanOrEqual(CONTENT_TOLERANCE_PX);
    expect(Math.abs(heroContentBox!.width - 777)).toBeLessThanOrEqual(CONTENT_TOLERANCE_PX);
    expect(Math.abs(crumbBox!.y - (heroBox!.y + heroBox!.height + 12))).toBeLessThanOrEqual(
      CONTENT_TOLERANCE_PX,
    );
    expect(Math.abs(crumbBox!.width - 1374)).toBeLessThanOrEqual(40);
    expect(Math.abs(tickerBox!.y - (crumbBox!.y + crumbBox!.height + 48))).toBeLessThanOrEqual(
      CONTENT_TOLERANCE_PX,
    );
    expect(Math.abs(tickerBox!.height - 39)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);

    const firstCard = page.locator("[data-chronicle-card]").first();
    const firstCardBox = await firstCard.boundingBox();
    expect(firstCardBox).not.toBeNull();
    expect(
      Math.abs(firstCardBox!.y - (tickerBox!.y + tickerBox!.height + 48)),
    ).toBeLessThanOrEqual(CONTENT_TOLERANCE_PX);
    expect(Math.abs(firstCardBox!.width - 1054)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);

    const firstPadding = await firstCard.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        paddingLeft: Number.parseFloat(style.paddingLeft),
        gap: Number.parseFloat(style.columnGap || style.gap),
      };
    });
    expect(Math.abs(firstPadding.paddingLeft - 40)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(firstPadding.gap - 80)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);

    const content = firstCard.locator("[data-chronicle-card-content]");
    const contentBox = await content.boundingBox();
    expect(contentBox).not.toBeNull();
    expect(Math.abs(contentBox!.width - 360)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);

    const imageRegions = page.locator("[data-chronicle-card-image]");
    await expect(imageRegions).toHaveCount(4);

    const firstImageRegion = imageRegions.first();
    const firstImageBox = await firstImageRegion.boundingBox();
    expect(firstImageBox).not.toBeNull();
    expect(Math.abs(firstImageBox!.width - 534)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(firstImageBox!.height - 469)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);

    for (let i = 1; i < 4; i += 1) {
      const box = await imageRegions.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(Math.abs(box!.width - 534)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
      expect(Math.abs(box!.height - 479)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    }

    for (let i = 0; i < 4; i += 1) {
      const region = imageRegions.nth(i);
      await expect(region).toHaveAttribute(
        "data-chronicle-card-image-status",
        "deferred",
      );
      await expect(region.locator("img")).toHaveCount(0);
    }

    const cardsList = page.locator("[data-chronicle-card]");
    await expect(cardsList).toHaveCount(4);
    const first = await cardsList.nth(0).boundingBox();
    const second = await cardsList.nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(Math.abs(second!.y - (first!.y + first!.height) - 80)).toBeLessThanOrEqual(
      FIXED_TOLERANCE_PX,
    );

    const stackBox = await cardStack.boundingBox();
    expect(stackBox).not.toBeNull();
    expect(
      Math.abs(footerBox!.y - (stackBox!.y + stackBox!.height + 48)),
    ).toBeLessThanOrEqual(CONTENT_TOLERANCE_PX);

    const pageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    expect(Math.abs(pageHeight - FIGMA_PAGE_HEIGHT_PX)).toBeLessThanOrEqual(
      PAGE_HEIGHT_TOLERANCE_PX,
    );

    await expect(page.getByRole("heading", { level: 1, name: "THE CHRONICLE" })).toBeVisible();
    await expect(cardStack).toHaveAttribute("class", /gap-\[80px\]/);
  });

  test("protects Chronicle content across age states", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: 1440, height: 900 });

    const cardImageRequests: string[] = [];
    page.on("request", (request) => {
      const url = request.url();
      if (
        url.includes("/images/m08-chronicle/") ||
        /founders-reserve-month|international-cigar-day|international-tea-day|velarro-estate-day/.test(
          url,
        )
      ) {
        cardImageRequests.push(url);
      }
    });

    await gotoChronicle(page);

    await expect(
      page.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "THE CHRONICLE" }),
    ).toHaveCount(0);
    await expect(page.locator("[data-chronicle-card]")).toHaveCount(0);

    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "under21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await gotoChronicle(page);

    await expect(
      page.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "THE CHRONICLE" }),
    ).toHaveCount(0);
    await expect(page.locator("[data-chronicle-card]")).toHaveCount(0);

    await context.clearCookies();
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await gotoChronicle(page);

    await expect(
      page.getByRole("heading", { level: 1, name: "THE CHRONICLE" }),
    ).toBeVisible();
    await expect(page.locator("[data-chronicle-card]")).toHaveCount(4);
    await expect(
      page.locator("[data-chronicle-card-image-status='deferred']"),
    ).toHaveCount(4);
    await expect(page.locator("[data-chronicle-card-image] img")).toHaveCount(0);
    expect(cardImageRequests).toEqual([]);
  });

  test("keeps event-detail controls truthful and disabled", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoChronicle(page);

    const buttons = page.locator(
      "button[data-chronicle-event-details='deferred']",
    );
    await expect(buttons).toHaveCount(4);

    const urlBefore = page.url();
    const requests: string[] = [];
    page.on("request", (request) => {
      const url = request.url();
      if (!url.includes("127.0.0.1:3000") && !url.includes("localhost")) {
        return;
      }
      if (request.method() !== "GET") {
        requests.push(`${request.method()} ${url}`);
      }
    });

    for (let i = 0; i < 4; i += 1) {
      const button = buttons.nth(i);
      await expect(button).toBeDisabled();
      await expect(button).not.toHaveAttribute("href");
      await button.focus();
      await page.keyboard.press("Enter");
      await page.keyboard.press("Space");
    }

    expect(page.url()).toBe(urlBefore);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(requests).toEqual([]);
  });

  test("remains contained across required viewports without root overflow masking", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoChronicle(page);

      await expect(
        page.getByRole("heading", { level: 1, name: "THE CHRONICLE" }),
      ).toBeVisible();
      await expect(page.locator("[data-chronicle-card]")).toHaveCount(4);

      const metrics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const pageRoot = document.querySelector("[data-route='/the-chronicle']");
        const main = document.querySelector("main");

        return {
          documentScrollWidth: root.scrollWidth,
          documentClientWidth: root.clientWidth,
          bodyScrollWidth: body.scrollWidth,
          bodyClientWidth: body.clientWidth,
          rootOverflowX: getComputedStyle(root).overflowX,
          bodyOverflowX: getComputedStyle(body).overflowX,
          pageRootClass: pageRoot?.className ?? "",
          mainClass: main?.className ?? "",
          pageRootOverflowX: pageRoot
            ? getComputedStyle(pageRoot).overflowX
            : null,
          mainOverflowX: main ? getComputedStyle(main).overflowX : null,
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
      expect(["visible", "auto", ""]).toContain(
        metrics.pageRootOverflowX ?? "visible",
      );
      expect(["visible", "auto", ""]).toContain(
        metrics.mainOverflowX ?? "visible",
      );
      expect(["visible", "auto"]).toContain(metrics.rootOverflowX);
      expect(["visible", "auto"]).toContain(metrics.bodyOverflowX);

      const firstCard = page.locator("[data-chronicle-card]").first();
      const content = firstCard.locator("[data-chronicle-card-content]");
      const image = firstCard.locator("[data-chronicle-card-image]");
      const contentBox = await content.boundingBox();
      const imageBox = await image.boundingBox();
      expect(contentBox).not.toBeNull();
      expect(imageBox).not.toBeNull();
      if (viewport.width < 1280) {
        expect(imageBox!.y).toBeGreaterThan(contentBox!.y);
      }

      await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
      await expect(
        page.getByRole("heading", { level: 2, name: "Stay in Know" }),
      ).toBeVisible();
    }
  });
});
