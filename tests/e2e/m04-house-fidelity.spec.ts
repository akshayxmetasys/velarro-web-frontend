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

const SIZE_TOLERANCE_PX = 2;
const LAYOUT_TOLERANCE_PX = 8;
const FIGMA_PAGE_HEIGHT_PX = 2479;
/**
 * Gotham unavailable; locked shared footer taller than Figma ≈697.
 * Cap absolute page-height delta at 220px.
 */
const PAGE_HEIGHT_TOLERANCE_PX = 220;
/** Footer top Figma ≈1764; allow modest layout drift. */
const FOOTER_TOP_TOLERANCE_PX = 48;
/** Card heights vary by content; typography may add a few px vs Figma. */
const CARD_HEIGHT_TOLERANCE_PX = 40;

/** Explicit local exemption: category rail may scroll horizontally when narrow. */
const LOCAL_OVERFLOW_EXEMPT_SELECTORS = [
  '[data-slot="the-house-category-rail"]',
] as const;

async function gotoHouse(page: Page) {
  await page.goto("/the-estate/the-house", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.locator('[data-slot="the-house-page"]')).toBeVisible();
}

test.describe("V-07b The House fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns House desktop geometry at 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHouse(page);

    const hero = page.locator('[data-slot="the-house-hero"]');
    const breadcrumbs = page.locator('[data-slot="the-house-breadcrumbs"]');
    const categories = page.locator('[data-slot="the-house-categories"]');
    const categoryRail = page.locator('[data-slot="the-house-category-rail"]');
    const grid = page.locator('[data-slot="the-house-product-grid"]');
    const pagination = page.locator('[data-slot="the-house-pagination"]');
    const footer = page.getByRole("contentinfo");

    await expect(hero).toBeVisible();
    await expect(breadcrumbs).toBeVisible();
    await expect(categories).toBeVisible();
    await expect(grid).toBeVisible();
    await expect(pagination).toBeVisible();
    await expect(footer).toBeVisible();

    const heroBox = await hero.boundingBox();
    const crumbBox = await breadcrumbs.boundingBox();
    const categoryBox = await categories.boundingBox();
    const railBox = await categoryRail.boundingBox();
    const gridBox = await grid.boundingBox();
    const cards = grid.locator('[data-slot="the-house-product-card"]');
    const firstCard = cards.first();
    const cardBox = await firstCard.boundingBox();
    const paginationBox = await pagination.boundingBox();
    const footerBox = await footer.boundingBox();

    expect(heroBox).not.toBeNull();
    expect(crumbBox).not.toBeNull();
    expect(categoryBox).not.toBeNull();
    expect(railBox).not.toBeNull();
    expect(gridBox).not.toBeNull();
    expect(cardBox).not.toBeNull();
    expect(paginationBox).not.toBeNull();
    expect(footerBox).not.toBeNull();

    expect(Math.abs(heroBox!.height - 471)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(heroBox!.width - 1440)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(crumbBox!.y - 483)).toBeLessThanOrEqual(LAYOUT_TOLERANCE_PX);

    const homeLink = breadcrumbs.getByRole("link", { name: "Home" });
    const homeBox = await homeLink.boundingBox();
    expect(homeBox).not.toBeNull();
    expect(Math.abs(homeBox!.x - 25)).toBeLessThanOrEqual(LAYOUT_TOLERANCE_PX);

    expect(Math.abs(railBox!.width - 930)).toBeLessThanOrEqual(
      LAYOUT_TOLERANCE_PX,
    );
    expect(Math.abs(gridBox!.width - 966)).toBeLessThanOrEqual(
      LAYOUT_TOLERANCE_PX,
    );
    expect(Math.abs(cardBox!.width - 292)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );

    const imageFrame = firstCard.locator(
      '[data-slot="the-house-product-image-frame"]',
    );
    const imageFrameBox = await imageFrame.boundingBox();
    expect(imageFrameBox).not.toBeNull();
    expect(Math.abs(imageFrameBox!.width - 262)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(imageFrameBox!.x).toBeGreaterThanOrEqual(
      cardBox!.x - SIZE_TOLERANCE_PX,
    );
    expect(imageFrameBox!.x + imageFrameBox!.width).toBeLessThanOrEqual(
      cardBox!.x + cardBox!.width + SIZE_TOLERANCE_PX,
    );

    const row1Tops: number[] = [];
    const row1Bottoms: number[] = [];
    const row2Tops: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      const box = await cards.nth(i).boundingBox();
      expect(box).not.toBeNull();
      if (i < 3) {
        row1Tops.push(box!.y);
        row1Bottoms.push(box!.y + box!.height);
        expect(Math.abs(box!.height - [426, 415, 426][i]!)).toBeLessThanOrEqual(
          CARD_HEIGHT_TOLERANCE_PX,
        );
      } else {
        row2Tops.push(box!.y);
        expect(Math.abs(box!.height - [398, 415, 398][i - 3]!)).toBeLessThanOrEqual(
          CARD_HEIGHT_TOLERANCE_PX,
        );
      }
    }

    const row1Top = Math.min(...row1Tops);
    const row1Bottom = Math.max(...row1Bottoms);
    const row2Top = Math.min(...row2Tops);
    expect(Math.abs(row1Top - 779)).toBeLessThanOrEqual(24);
    expect(Math.abs(row2Top - 1239)).toBeLessThanOrEqual(24);
    expect(Math.abs(row2Top - row1Bottom - 34)).toBeLessThanOrEqual(
      LAYOUT_TOLERANCE_PX,
    );

    expect(Math.abs(paginationBox!.y - 1688)).toBeLessThanOrEqual(32);
    expect(Math.abs(footerBox!.y - 1764)).toBeLessThanOrEqual(
      FOOTER_TOP_TOLERANCE_PX,
    );

    const heroImage = hero.locator("img").first();
    await expect
      .poll(
        async () =>
          heroImage.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        { timeout: 15_000 },
      )
      .toBe(true);

    const heroTreatment = await heroImage.evaluate((img) => ({
      objectFit: getComputedStyle(img).objectFit,
      objectPosition: getComputedStyle(img).objectPosition,
    }));
    expect(heroTreatment.objectFit).toBe("cover");
    expect(heroTreatment.objectPosition).toBe("50% 50%");

    expect(
      await hero
        .locator('[data-slot="the-house-hero-overlay"]')
        .evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe("rgba(21, 20, 20, 0.4)");

    await expect(
      page.getByRole("heading", { level: 1, name: "THE HOUSE" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "THE HUMIDOR", exact: true }),
    ).toHaveAttribute("href", "/the-estate");
    await expect(
      page.locator('[data-slot="the-house-category-tile"]'),
    ).toHaveCount(6);
    await expect(cards).toHaveCount(6);

    await footer.scrollIntoViewIfNeeded();
    await expect(
      footer.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeVisible();

    const pageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    expect(
      Math.abs(pageHeight - FIGMA_PAGE_HEIGHT_PX),
    ).toBeLessThanOrEqual(PAGE_HEIGHT_TOLERANCE_PX);
  });

  test("protects restricted House content across age states", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/the-estate/the-house", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "THE HOUSE" }),
    ).not.toBeVisible();
    await expect(page.locator('[data-slot="the-house-page"]')).toHaveCount(0);

    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "under21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await page.goto("/the-estate/the-house", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "THE HOUSE" }),
    ).not.toBeVisible();
    await expect(page.getByText("Founder\u2019s Boxy hoodie")).not.toBeVisible();
    await expect(page.locator('[data-slot="the-house-page"]')).toHaveCount(0);

    await context.clearCookies();
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await page.goto("/the-estate/the-house", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-slot="the-house-page"]')).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "THE HOUSE" }),
    ).toBeVisible();
  });

  test("keeps deferred controls truthful and non-operable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoHouse(page);

    const exploreButtons = page.locator(
      '[data-slot="the-house-product-card"] button',
    );
    await expect(exploreButtons).toHaveCount(6);
    for (let i = 0; i < 6; i += 1) {
      await expect(exploreButtons.nth(i)).toBeDisabled();
    }

    for (const pageNumber of [1, 2, 3, 4, 5, 6, 7]) {
      await expect(
        page.getByRole("button", {
          name: `Page ${pageNumber} (deferred: pagination is not approved for this scope)`,
        }),
      ).toBeDisabled();
    }
    await expect(
      page.getByRole("button", {
        name: "Next page (deferred: pagination is not approved for this scope)",
      }),
    ).toBeDisabled();

    await expect(
      page.getByRole("link", { name: "THE HUMIDOR", exact: true }),
    ).toHaveAttribute("href", "/the-estate");
    await expect(
      page
        .getByRole("navigation", { name: "Breadcrumb" })
        .getByRole("link", { name: "The Estate" }),
    ).toHaveAttribute("href", "/the-estate");

    const houseHrefs = await page
      .locator('[data-slot="the-house-page"] a[href]')
      .evaluateAll((anchors) =>
        anchors
          .map((anchor) => anchor.getAttribute("href"))
          .filter((href): href is string => Boolean(href)),
      );
    expect(houseHrefs).not.toContain("/cart");
    expect(houseHrefs).not.toContain("/checkout");
    expect(
      houseHrefs.some((href) => href.includes("/the-estate/the-humidor/")),
    ).toBe(false);
    expect(houseHrefs.some((href) => href.includes("/the-house/"))).toBe(
      false,
    );

    expect(page.url()).toMatch(/\/the-estate\/the-house\/?$/);
  });

  test("keeps House contained across required viewports without root overflow masking", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoHouse(page);

      const heroImage = page
        .locator('[data-slot="the-house-hero"] img')
        .first();
      await expect
        .poll(
          async () =>
            heroImage.evaluate(
              (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
            ),
          { timeout: 15_000 },
        )
        .toBe(true);

      const productImages = page.locator(
        '[data-slot="the-house-product-card"] img',
      );
      const productCount = await productImages.count();
      for (let i = 0; i < productCount; i += 1) {
        const img = productImages.nth(i);
        await img.scrollIntoViewIfNeeded();
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
      }

      const metrics = await page.evaluate(
        ({ viewportWidth, exemptSelectors }) => {
          const root = document.documentElement;
          const body = document.body;
          const pageRoot = document.querySelector(
            '[data-slot="the-house-page"]',
          );
          const main = document.querySelector('[data-slot="the-house-main"]');
          const hero = document.querySelector('[data-slot="the-house-hero"]');
          const breadcrumbs = document.querySelector(
            '[data-slot="the-house-breadcrumbs"]',
          );
          const categories = document.querySelector(
            '[data-slot="the-house-categories"]',
          );
          const categoryRail = document.querySelector(
            '[data-slot="the-house-category-rail"]',
          );
          const grid = document.querySelector(
            '[data-slot="the-house-product-grid"]',
          );
          const pagination = document.querySelector(
            '[data-slot="the-house-pagination"]',
          );
          const footer = document.querySelector(
            "footer, [role='contentinfo']",
          );
          const cards = Array.from(
            document.querySelectorAll('[data-slot="the-house-product-card"]'),
          );

          const isExempt = (el: Element) => {
            if (
              exemptSelectors.some((selector) => {
                try {
                  return Boolean(el.closest(selector));
                } catch {
                  return false;
                }
              })
            ) {
              return true;
            }
            const style = getComputedStyle(el);
            if (style.visibility === "hidden" || style.display === "none") {
              return true;
            }
            if (Number(style.opacity) === 0) {
              return true;
            }
            if (el.getAttribute("aria-hidden") === "true") {
              return true;
            }
            if (style.position === "fixed") {
              const rect = el.getBoundingClientRect();
              if (
                rect.width >= window.innerWidth - 2 &&
                rect.height >= window.innerHeight - 2
              ) {
                return true;
              }
            }
            return false;
          };

          const inside = (el: Element | null | undefined) => {
            if (!el) {
              return false;
            }
            const rect = el.getBoundingClientRect();
            return rect.left >= -1 && rect.right <= viewportWidth + 1;
          };

          const offenders: Array<{
            tag: string;
            className: string;
            left: number;
            right: number;
            width: number;
          }> = [];

          for (const el of Array.from(document.querySelectorAll("*"))) {
            if (isExempt(el)) {
              continue;
            }
            const rect = el.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) {
              continue;
            }
            const crosses =
              rect.left < -1 ||
              rect.right > viewportWidth + 1 ||
              rect.width > viewportWidth + 1;
            if (!crosses) {
              continue;
            }
            offenders.push({
              tag: el.tagName,
              className: String((el as HTMLElement).className ?? "").slice(
                0,
                120,
              ),
              left: Number(rect.left.toFixed(2)),
              right: Number(rect.right.toFixed(2)),
              width: Number(rect.width.toFixed(2)),
            });
          }

          const heroImg = document.querySelector(
            '[data-slot="the-house-hero"] img',
          ) as HTMLImageElement | null;
          const productImgs = Array.from(
            document.querySelectorAll(
              '[data-slot="the-house-product-card"] img',
            ),
          ) as HTMLImageElement[];

          return {
            documentScrollWidth: root.scrollWidth,
            documentClientWidth: root.clientWidth,
            bodyScrollWidth: body.scrollWidth,
            bodyClientWidth: body.clientWidth,
            rootOverflowX: getComputedStyle(root).overflowX,
            bodyOverflowX: getComputedStyle(body).overflowX,
            pageOverflowX: pageRoot
              ? getComputedStyle(pageRoot).overflowX
              : null,
            mainOverflowX: main ? getComputedStyle(main).overflowX : null,
            heroInside: inside(hero),
            breadcrumbsInside: inside(breadcrumbs),
            categoriesInside: inside(categories),
            categoryRailInside: inside(categoryRail),
            gridInside: inside(grid),
            paginationInside: inside(pagination),
            footerInside: inside(footer),
            cardsReachable: cards.every((card) => {
              const rect = card.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0;
            }),
            imagesLoaded:
              Boolean(
                heroImg && heroImg.complete && heroImg.naturalWidth > 0,
              ) &&
              productImgs.every((img) => img.complete && img.naturalWidth > 0),
            offenders: offenders.slice(0, 12),
            offenderCount: offenders.length,
          };
        },
        {
          viewportWidth: viewport.width,
          exemptSelectors: [...LOCAL_OVERFLOW_EXEMPT_SELECTORS],
        },
      );

      expect(
        metrics.documentScrollWidth,
        `${viewport.width} document scrollWidth`,
      ).toBeLessThanOrEqual(metrics.documentClientWidth + 1);
      expect(
        metrics.bodyScrollWidth,
        `${viewport.width} body scrollWidth`,
      ).toBeLessThanOrEqual(metrics.bodyClientWidth + 1);
      expect(metrics.rootOverflowX).not.toMatch(/hidden|clip/);
      expect(metrics.bodyOverflowX).not.toMatch(/hidden|clip/);
      expect(metrics.pageOverflowX).not.toMatch(/hidden|clip/);
      expect(metrics.mainOverflowX).not.toMatch(/hidden|clip/);
      expect(metrics.heroInside, `${viewport.width} hero`).toBe(true);
      expect(metrics.breadcrumbsInside, `${viewport.width} breadcrumbs`).toBe(
        true,
      );
      expect(metrics.categoriesInside, `${viewport.width} categories`).toBe(
        true,
      );
      expect(
        metrics.categoryRailInside,
        `${viewport.width} category rail box`,
      ).toBe(true);
      expect(metrics.gridInside, `${viewport.width} grid`).toBe(true);
      expect(metrics.paginationInside, `${viewport.width} pagination`).toBe(
        true,
      );
      expect(metrics.footerInside, `${viewport.width} footer`).toBe(true);
      expect(metrics.cardsReachable, `${viewport.width} cards`).toBe(true);
      expect(metrics.imagesLoaded, `${viewport.width} images`).toBe(true);
      expect(
        metrics.offenderCount,
        `crossing elements at ${viewport.width}px: ${JSON.stringify(metrics.offenders)}`,
      ).toBe(0);

      await expect(
        page.getByRole("heading", { level: 1, name: "THE HOUSE" }),
      ).toBeVisible();
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    }
  });
});
