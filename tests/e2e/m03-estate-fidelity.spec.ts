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
const FIGMA_PAGE_HEIGHT_PX = 2683;
/**
 * Measured implementation ≈2747 (+64 vs Figma 2683). Shared footer ≈+85 vs Figma
 * footer height; Gotham unavailable. Cap absolute page-height delta at 220px.
 */
const PAGE_HEIGHT_TOLERANCE_PX = 220;
/** Measured card height ≈485 vs Figma 471. */
const CARD_HEIGHT_TOLERANCE_PX = 24;

const THE_ESTATE_FILTERS = [
  "AVAILABILITY",
  "ORIGIN",
  "SIZE",
  "INTENSITY",
  "TASTE NOTES",
  "PAIRINGS",
  "ENJOYMENT TIME",
] as const;

/** Intensity expectations mirrored from the-estate-data (do not hardcode one global). */
const THE_ESTATE_PRODUCT_INTENSITY = [
  {
    id: "limited-compendium-salomones",
    intensityLabel: "Intensity",
    intensityFilled: 5,
  },
  {
    id: "grand-cru-toro",
    intensityLabel: "Intensity",
    intensityFilled: 4,
  },
  {
    id: "black-label-reserve-churchill",
    intensityLabel: "Intensity",
    intensityFilled: 4,
  },
  {
    id: "platinum-celebration-gran-churchill",
    intensityLabel: "Intensity",
    intensityFilled: 4,
  },
  {
    id: "centennial-reserve-toro-gordo",
    intensityLabel: "Intensity",
    intensityFilled: 5,
  },
  {
    id: "primera-cosecha-petit-corona",
    intensityLabel: "Intensity",
    intensityFilled: 2,
  },
] as const;

/** Explicit local exemption: category rail may scroll horizontally when narrow. */
const LOCAL_OVERFLOW_EXEMPT_SELECTORS = [
  '[data-slot="the-estate-category-rail"]',
] as const;

async function gotoEstate(page: Page) {
  await page.goto("/the-estate", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.locator('[data-slot="the-estate-page"]')).toBeVisible();
}

test.describe("V-07a The Estate fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Estate desktop geometry at 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoEstate(page);

    const hero = page.locator('[data-slot="the-estate-hero"]');
    const filters = page.locator('[data-slot="the-estate-filters"]');
    const breadcrumbs = page.locator('[data-slot="the-estate-breadcrumbs"]');
    const categories = page.locator('[data-slot="the-estate-categories"]');
    const grid = page.locator('[data-slot="the-estate-product-grid"]');
    const pagination = page.locator('[data-slot="the-estate-pagination"]');
    const footer = page.getByRole("contentinfo");

    await expect(hero).toBeVisible();
    await expect(filters).toBeVisible();
    await expect(breadcrumbs).toBeVisible();
    await expect(categories).toBeVisible();
    await expect(grid).toBeVisible();
    await expect(pagination).toBeVisible();
    await expect(footer).toBeVisible();

    const heroBox = await hero.boundingBox();
    const filterBox = await filters.boundingBox();
    const crumbBox = await breadcrumbs.boundingBox();
    const gridBox = await grid.boundingBox();
    const card = grid.locator('[data-slot="the-estate-product-card"]').first();
    const cardBox = await card.boundingBox();

    expect(heroBox).not.toBeNull();
    expect(filterBox).not.toBeNull();
    expect(crumbBox).not.toBeNull();
    expect(gridBox).not.toBeNull();
    expect(cardBox).not.toBeNull();

    expect(Math.abs(heroBox!.height - 471)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(heroBox!.width - 1440)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(filterBox!.width - 350)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    // Figma breadcrumb inset is x≈375; nav is full-bleed in the content column (x≈350).
    const homeLink = breadcrumbs.getByRole("link", { name: "Home" });
    const homeBox = await homeLink.boundingBox();
    expect(homeBox).not.toBeNull();
    expect(Math.abs(homeBox!.x - 375)).toBeLessThanOrEqual(8);
    expect(Math.abs(gridBox!.width - 966)).toBeLessThanOrEqual(8);
    expect(Math.abs(cardBox!.width - 292)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(cardBox!.height - 471)).toBeLessThanOrEqual(
      CARD_HEIGHT_TOLERANCE_PX,
    );

    const imageFrame = card.locator(
      '[data-slot="the-estate-product-image-frame"]',
    );
    const imageFrameBox = await imageFrame.boundingBox();
    expect(imageFrameBox).not.toBeNull();
    expect(Math.abs(imageFrameBox!.width - 262)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(imageFrameBox!.x).toBeGreaterThanOrEqual(cardBox!.x - SIZE_TOLERANCE_PX);
    expect(imageFrameBox!.x + imageFrameBox!.width).toBeLessThanOrEqual(
      cardBox!.x + cardBox!.width + SIZE_TOLERANCE_PX,
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
        .locator('[data-slot="the-estate-hero-overlay"]')
        .evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe("rgba(21, 20, 20, 0.4)");

    await expect(
      page.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" }),
    ).toBeVisible();
    await expect(page.getByText("THE HUMIDOR", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "THE HOUSE", exact: true }),
    ).toHaveAttribute("href", "/the-estate/the-house");

    await expect(
      page.locator('[data-slot="the-estate-category-tile"]'),
    ).toHaveCount(10);
    await expect(
      page.locator('[data-slot="the-estate-product-card"]'),
    ).toHaveCount(6);

    const productImages = page.locator(
      '[data-slot="the-estate-product-card"] img',
    );
    await expect(productImages).toHaveCount(6);
    for (let i = 0; i < 6; i += 1) {
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

  test("protects restricted Estate content across age states", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/the-estate", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeVisible();
    await expect(page.locator('[data-slot="the-estate-page"]')).toHaveCount(0);

    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "under21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await page.goto("/the-estate", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeVisible();
    await expect(page.getByText("Limited Compendium")).not.toBeVisible();
    await expect(page.locator('[data-slot="the-estate-page"]')).toHaveCount(0);

    await context.clearCookies();
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await page.goto("/the-estate", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-slot="the-estate-page"]')).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" }),
    ).toBeVisible();
  });

  test("keeps deferred controls truthful and non-operable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoEstate(page);

    await expect(
      page.getByRole("button", {
        name: "Clear filter (deferred: filtering is not approved for this scope)",
      }),
    ).toBeDisabled();

    for (const filter of THE_ESTATE_FILTERS) {
      await expect(
        page.getByRole("button", {
          name: `${filter} filter (deferred: filtering is not approved for this scope)`,
        }),
      ).toBeDisabled();
    }

    await expect(
      page.getByRole("button", {
        name: "Next category set (deferred: category navigation is not approved for this scope)",
      }),
    ).toBeDisabled();

    const exploreButtons = page.locator(
      '[data-slot="the-estate-product-card"] button',
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
      page.getByRole("link", { name: "THE HOUSE", exact: true }),
    ).toHaveAttribute("href", "/the-estate/the-house");

    const estateHrefs = await page
      .locator('[data-slot="the-estate-page"] a[href]')
      .evaluateAll((anchors) =>
        anchors
          .map((anchor) => anchor.getAttribute("href"))
          .filter((href): href is string => Boolean(href)),
      );
    expect(estateHrefs).not.toContain("/cart");
    expect(estateHrefs).not.toContain("/checkout");
    expect(
      estateHrefs.some((href) => href.includes("/the-estate/the-humidor/")),
    ).toBe(false);

    expect(page.url()).toMatch(/\/the-estate\/?$/);
  });

  test("keeps Estate contained across required viewports without root overflow masking", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoEstate(page);

      const heroImage = page.locator('[data-slot="the-estate-hero"] img').first();
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
        '[data-slot="the-estate-product-card"] img',
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
            '[data-slot="the-estate-page"]',
          );
          const main = document.querySelector('[data-slot="the-estate-main"]');
          const hero = document.querySelector('[data-slot="the-estate-hero"]');
          const filters = document.querySelector(
            '[data-slot="the-estate-filters"]',
          );
          const breadcrumbs = document.querySelector(
            '[data-slot="the-estate-breadcrumbs"]',
          );
          const categories = document.querySelector(
            '[data-slot="the-estate-categories"]',
          );
          const categoryRail = document.querySelector(
            '[data-slot="the-estate-category-rail"]',
          );
          const grid = document.querySelector(
            '[data-slot="the-estate-product-grid"]',
          );
          const pagination = document.querySelector(
            '[data-slot="the-estate-pagination"]',
          );
          const footer = document.querySelector(
            "footer, [role='contentinfo']",
          );
          const cards = Array.from(
            document.querySelectorAll(
              '[data-slot="the-estate-product-card"]',
            ),
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
            '[data-slot="the-estate-hero"] img',
          ) as HTMLImageElement | null;
          const productImgs = Array.from(
            document.querySelectorAll(
              '[data-slot="the-estate-product-card"] img',
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
            filtersInside: inside(filters),
            breadcrumbsInside: inside(breadcrumbs),
            categoriesInside: inside(categories),
            categoryRailInside: inside(categoryRail),
            categoryRailScrolls:
              categoryRail !== null &&
              categoryRail.scrollWidth > categoryRail.clientWidth + 1,
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
              productImgs.every(
                (img) => img.complete && img.naturalWidth > 0,
              ),
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
      expect(metrics.filtersInside, `${viewport.width} filters`).toBe(true);
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
        page.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" }),
      ).toBeVisible();
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    }
  });

  test("keeps the selected Estate category fully visible and semantically current", async ({
    page,
  }) => {
    const requiredViewports = [
      { width: 320, height: 800 },
      { width: 375, height: 812 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ] as const;

    for (const viewport of requiredViewports) {
      await page.setViewportSize(viewport);
      await gotoEstate(page);

      const categoryRail = page.locator(
        '[data-slot="the-estate-category-rail"]',
      );
      await expect(categoryRail).toBeVisible();

      await expect
        .poll(async () => categoryRail.evaluate((el) => el.scrollLeft))
        .toBe(0);

      const tiles = page.locator('[data-slot="the-estate-category-tile"]');
      await expect(tiles).toHaveCount(10);

      const selectedTile = tiles.first();
      await expect(selectedTile).toHaveAttribute("aria-current", "true");
      await expect(selectedTile).toHaveAttribute(
        "data-category-selected",
        "true",
      );
      await expect(selectedTile.getByRole("heading", { level: 3 })).toHaveText(
        "ALL SERIES",
      );

      for (let i = 1; i < 10; i += 1) {
        await expect(tiles.nth(i)).not.toHaveAttribute("aria-current");
        await expect(tiles.nth(i)).toHaveAttribute(
          "data-category-selected",
          "false",
        );
      }

      await expect(categoryRail).toHaveAttribute("role", "list");
      await expect(selectedTile).toHaveAttribute("role", "listitem");

      const geometry = await page.evaluate(() => {
        const rail = document.querySelector(
          '[data-slot="the-estate-category-rail"]',
        ) as HTMLElement | null;
        const selected = document.querySelector(
          '[data-slot="the-estate-category-tile"][data-category-selected="true"]',
        ) as HTMLElement | null;
        const surface = selected?.querySelector(
          '[data-image-status="deferred"]',
        ) as HTMLElement | null;
        const label = selected?.querySelector("h3") as HTMLElement | null;
        if (!rail || !selected || !surface || !label) {
          return null;
        }

        const railRect = rail.getBoundingClientRect();
        const surfaceRect = surface.getBoundingClientRect();
        const labelRect = label.getBoundingClientRect();
        const style = getComputedStyle(rail);
        const padL = parseFloat(style.paddingLeft);
        const padR = parseFloat(style.paddingRight);
        const contentLeft = railRect.left + padL;
        const contentRight = railRect.right - padR;

        return {
          scrollLeft: rail.scrollLeft,
          surfaceWidth: Number(surfaceRect.width.toFixed(2)),
          surfaceHeight: Number(surfaceRect.height.toFixed(2)),
          leftInside: surfaceRect.left >= contentLeft - 0.5,
          rightInside: surfaceRect.right <= contentRight + 0.5,
          labelVisible:
            labelRect.width > 0 &&
            labelRect.left >= contentLeft - 0.5 &&
            labelRect.right <= contentRight + 0.5,
          railScrollable: rail.scrollWidth > rail.clientWidth + 1,
          documentScrollWidth: document.documentElement.scrollWidth,
          documentClientWidth: document.documentElement.clientWidth,
          bodyScrollWidth: document.body.scrollWidth,
          bodyClientWidth: document.body.clientWidth,
          rootOverflowX: getComputedStyle(document.documentElement).overflowX,
          bodyOverflowX: getComputedStyle(document.body).overflowX,
          pageOverflowX: getComputedStyle(
            document.querySelector('[data-slot="the-estate-page"]')!,
          ).overflowX,
          mainOverflowX: getComputedStyle(
            document.querySelector('[data-slot="the-estate-main"]')!,
          ).overflowX,
          railOverflowX: style.overflowX,
          selectedHasEnabledControl: Boolean(
            selected.querySelector("a, button:not([disabled])"),
          ),
          ariaSelectedPresent: Boolean(
            document.querySelector(
              '[data-slot="the-estate-category-tile"][aria-selected]',
            ),
          ),
        };
      });

      expect(geometry, `${viewport.width} geometry`).not.toBeNull();
      expect(geometry!.scrollLeft).toBe(0);
      expect(Math.abs(geometry!.surfaceWidth - 136)).toBeLessThanOrEqual(
        SIZE_TOLERANCE_PX,
      );
      expect(Math.abs(geometry!.surfaceHeight - 136)).toBeLessThanOrEqual(
        SIZE_TOLERANCE_PX,
      );
      expect(geometry!.leftInside, `${viewport.width} left border`).toBe(true);
      expect(geometry!.rightInside, `${viewport.width} right border`).toBe(
        true,
      );
      expect(geometry!.labelVisible, `${viewport.width} label`).toBe(true);
      expect(geometry!.documentScrollWidth).toBeLessThanOrEqual(
        geometry!.documentClientWidth + 1,
      );
      expect(geometry!.bodyScrollWidth).toBeLessThanOrEqual(
        geometry!.bodyClientWidth + 1,
      );
      expect(geometry!.rootOverflowX).not.toMatch(/hidden|clip/);
      expect(geometry!.bodyOverflowX).not.toMatch(/hidden|clip/);
      expect(geometry!.pageOverflowX).not.toMatch(/hidden|clip/);
      expect(geometry!.mainOverflowX).not.toMatch(/hidden|clip/);
      expect(geometry!.railOverflowX).toBe("auto");
      expect(geometry!.selectedHasEnabledControl).toBe(false);
      expect(geometry!.ariaSelectedPresent).toBe(false);
      if (viewport.width <= 768) {
        expect(geometry!.railScrollable).toBe(true);
      }

      await expect(
        page.getByRole("button", {
          name: "Next category set (deferred: category navigation is not approved for this scope)",
        }),
      ).toBeDisabled();

      for (const product of THE_ESTATE_PRODUCT_INTENSITY) {
        const card = page.locator(
          `[data-slot="the-estate-product-card"][data-product-id="${product.id}"]`,
        );
        await expect(
          card.locator('[data-slot="the-estate-intensity-value"]'),
        ).toHaveText(
          `Intensity: ${product.intensityLabel}, ${product.intensityFilled} out of 5`,
        );
        await expect(
          card.locator('[data-slot="the-estate-intensity-dots"]'),
        ).toHaveAttribute("aria-hidden", "true");
        await expect(
          card.locator('[data-slot="the-estate-intensity-dots"] > span'),
        ).toHaveCount(5);
      }
    }
  });
});
