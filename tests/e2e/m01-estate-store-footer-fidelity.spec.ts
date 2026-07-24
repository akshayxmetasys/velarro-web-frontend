import {
  activeCarouselCard,
  expect,
  expectStableBoundingBox,
  expectCarouselActiveCardReady,
  expectImageReady,
  STORE_LOUNGE_E2E_IMAGE_PATH,
  test,
  trackImageNetworkEvents,
  waitForClientClickHandler,
  type Page,
} from "./support/e2e-test";

const VIEWPORTS = [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

const GAP_TOLERANCE_PX = 4;
const EXPECTED_SECTION_GAP_PX = 80;
const SIZE_TOLERANCE_PX = 1;
const STORE_LOUNGE_CONTENT_WIDTH_PX = 1159;
const STORE_LOUNGE_CONTENT_TOP_PX = 470;
const STORE_LOUNGE_CENTER_TOLERANCE_PX = 2;

/**
 * Existing V-01/V-02 local carousel overflow only. V-05 does not add exemptions.
 */
const LOCAL_OVERFLOW_EXEMPT_SELECTORS = [
  '[data-slot="cigar-carousel-viewport"]',
  '[data-slot="cigar-carousel-track"]',
  '[data-slot="estate-carousel-viewport"]',
  '[data-slot="estate-carousel-track"]',
] as const;
const ESTATE_VIEWPORT_SELECTOR = '[data-slot="estate-carousel-viewport"]';

async function gotoOver21Home(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.locator('[data-m01-section-stack="over21"]')).toBeVisible();
}

async function getCarouselCenteringMetrics(
  page: Page,
  viewportSelector: string,
  activeCardName: string,
) {
  return page.locator(viewportSelector).evaluate((viewport, cardName) => {
    if (!(viewport instanceof HTMLElement)) {
      throw new Error("Carousel viewport is not an HTMLElement");
    }

    const activeCard = Array.from(viewport.querySelectorAll("article")).find(
      (card) =>
        card.getAttribute("aria-current") === "true" &&
        card.querySelector("h3")?.textContent?.trim() === cardName,
    );

    if (!(activeCard instanceof HTMLElement)) {
      throw new Error(`Active card ${cardName} was not found`);
    }

    const viewportRect = viewport.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();
    const viewportCenter =
      viewportRect.left + viewport.clientLeft + viewport.clientWidth / 2;
    const cardCenter = cardRect.left + cardRect.width / 2;
    const cardScrollLeft =
      cardRect.left - viewportRect.left - viewport.clientLeft + viewport.scrollLeft;
    const target =
      cardScrollLeft - (viewport.clientWidth - cardRect.width) / 2;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    return {
      centerDelta: cardCenter - viewportCenter,
      maxScroll,
      scrollLeft: viewport.scrollLeft,
      target,
    };
  }, activeCardName);
}

test.describe("V-05 Estate + Store/Lounge + Footer fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Estate, Store/Lounge, and Footer desktop geometry at 1440", async ({
    page,
  }) => {
    const storeImageNetworkEvents = trackImageNetworkEvents(
      page,
      STORE_LOUNGE_E2E_IMAGE_PATH,
    );
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOver21Home(page);

    const clothier = page.locator('[data-figma-node="13148:15120"]');
    const estate = page.locator('[data-figma-node="13148:15145"]');
    const store = page.locator('[data-figma-node="13148:15176"]');
    const footer = page.locator('[data-figma-node="14468:34842"]');

    await expect(estate).toBeVisible();
    await expect(store).toBeVisible();
    await expect(footer).toBeVisible();

    const clothierBox = await expectStableBoundingBox(page, clothier, "Clothier");
    const estateBox = await expectStableBoundingBox(page, estate, "Estate");
    const storeBand = store.locator(
      '[data-slot="store-lounge-contained-section"]',
    );
    const storeBandBox = await expectStableBoundingBox(
      page,
      storeBand,
      "Store/Lounge contained section",
    );
    const storeBox = await expectStableBoundingBox(page, store, "Store/Lounge");
    const footerBox = await expectStableBoundingBox(page, footer, "Footer");

    expect(clothierBox).not.toBeNull();
    expect(estateBox).not.toBeNull();
    expect(storeBandBox).not.toBeNull();
    expect(storeBox).not.toBeNull();
    expect(footerBox).not.toBeNull();

    expect(Math.abs(estateBox!.x - 50)).toBeLessThanOrEqual(2);
    expect(Math.abs(estateBox!.width - 1340)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(estateBox!.height - 688)).toBeLessThanOrEqual(24);

    expect(Math.abs(storeBandBox!.x - 102)).toBeLessThanOrEqual(2);
    expect(Math.abs(storeBandBox!.width - 1236)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(storeBandBox!.height - 1065)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );

    expect(Math.abs(footerBox!.width - 1440)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(footerBox!.height - 697)).toBeLessThanOrEqual(100);

    expect(
      Math.abs(
        estateBox!.y -
          (clothierBox!.y + clothierBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        storeBox!.y -
          (estateBox!.y + estateBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        footerBox!.y -
          (storeBox!.y + storeBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);

    await expect(
      estate.getByRole("heading", {
        level: 2,
        name: "Velarro Estate collection",
      }),
    ).toBeVisible();
    await expect(
      estate.getByRole("button", { name: "Previous estate collection item" }),
    ).toBeVisible();
    await expect(
      estate.getByRole("button", { name: "Next estate collection item" }),
    ).toBeVisible();
    await expect(
      estate.locator(ESTATE_VIEWPORT_SELECTOR),
    ).toBeVisible();

    const storeImage = store.locator("img").first();
    await store.scrollIntoViewIfNeeded();
    const storeImageMetrics = await expectImageReady(storeImage, {
      expectedSourcePath: STORE_LOUNGE_E2E_IMAGE_PATH,
      label: "Store/Lounge background",
      networkEvents: storeImageNetworkEvents,
    });
    expect(storeImageMetrics.expectedSourceMatched).toBe(true);
    const storeImageTreatment = await storeImage.evaluate((img) => ({
      objectFit: getComputedStyle(img).objectFit,
      objectPosition: getComputedStyle(img).objectPosition,
    }));
    expect(storeImageTreatment.objectFit).toBe("cover");
    expect(storeImageTreatment.objectPosition).toBe("50% 32%");

    const overlay = store.locator('[data-slot="store-lounge-overlay"]');
    await expect(overlay).toBeVisible();
    expect(
      await overlay.evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe("rgba(21, 20, 20, 0.4)");

    await expect(
      store.getByRole("heading", {
        level: 2,
        name: "FIND A STORE & LOUNGE",
      }),
    ).toBeVisible();
    await expect(
      store.getByRole("button", {
        name: "Explore Store/Lounge (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();

    const storeLayout = await store.evaluate(() => {
      const contained = document.querySelector(
        '[data-slot="store-lounge-contained-section"]',
      );
      const panel = document.querySelector('[data-slot="store-lounge-content"]');
      const heading = document.querySelector("#store-lounge-heading");
      const cta = document.querySelector('[data-slot="store-lounge-cta"]');
      if (!contained || !panel || !heading || !cta) {
        throw new Error("Store/Lounge layout elements were not found");
      }

      const rect = (element: Element) => {
        const box = element.getBoundingClientRect();
        return {
          bottom: box.bottom,
          height: box.height,
          left: box.left,
          right: box.right,
          top: box.top,
          width: box.width,
          x: box.x,
          y: box.y,
        };
      };
      const center = (box: { left: number; width: number }) =>
        box.left + box.width / 2;
      const range = document.createRange();
      range.selectNodeContents(heading);
      const lineRects = Array.from(range.getClientRects()).filter(
        (box) => box.width > 0 && box.height > 0,
      );
      range.detach();

      const containedBox = rect(contained);
      const panelBox = rect(panel);
      const headingBox = rect(heading);
      const ctaBox = rect(cta);

      return {
        ctaBox,
        ctaCenterDeltaFromPanel: center(ctaBox) - center(panelBox),
        headingBox,
        headingCenterDeltaFromPanel: center(headingBox) - center(panelBox),
        headingInsidePanel:
          headingBox.left >= panelBox.left - 0.5 &&
          headingBox.right <= panelBox.right + 0.5,
        headingInsideOwnBox: heading.scrollWidth <= heading.clientWidth + 1,
        lineCount: lineRects.length,
        panelBox,
        panelCenterDeltaFromContained: center(panelBox) - center(containedBox),
        panelTopWithinContained: panelBox.top - containedBox.top,
      };
    });

    expect(storeLayout.lineCount).toBe(1);
    expect(storeLayout.headingInsidePanel).toBe(true);
    expect(storeLayout.headingInsideOwnBox).toBe(true);
    expect(Math.abs(storeLayout.panelBox.width - STORE_LOUNGE_CONTENT_WIDTH_PX))
      .toBeLessThanOrEqual(SIZE_TOLERANCE_PX);
    expect(Math.abs(storeLayout.headingBox.width - STORE_LOUNGE_CONTENT_WIDTH_PX))
      .toBeLessThanOrEqual(SIZE_TOLERANCE_PX);
    expect(Math.abs(storeLayout.ctaBox.width - 355)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(
      Math.abs(storeLayout.panelTopWithinContained - STORE_LOUNGE_CONTENT_TOP_PX),
    ).toBeLessThanOrEqual(STORE_LOUNGE_CENTER_TOLERANCE_PX);
    expect(Math.abs(storeLayout.panelCenterDeltaFromContained))
      .toBeLessThanOrEqual(STORE_LOUNGE_CENTER_TOLERANCE_PX);
    expect(Math.abs(storeLayout.headingCenterDeltaFromPanel))
      .toBeLessThanOrEqual(STORE_LOUNGE_CENTER_TOLERANCE_PX);
    expect(Math.abs(storeLayout.ctaCenterDeltaFromPanel)).toBeLessThanOrEqual(
      STORE_LOUNGE_CENTER_TOLERANCE_PX,
    );

    await expect(
      footer.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeVisible();
    await expect(
      footer.getByRole("navigation", { name: "Footer navigation" }),
    ).toBeVisible();
    await expect(
      footer.getByRole("navigation", { name: "Footer legal" }),
    ).toBeVisible();
    await expect(
      footer.getByRole("button", { name: "Ascend to top" }),
    ).toBeVisible();

    const pageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    expect(pageHeight).toBeGreaterThan(7400);
    expect(pageHeight).toBeLessThan(7900);
  });

  test("centers the active Estate Collection card after navigation at desktop and narrow widths", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 375, height: 812 },
    ] as const) {
      await page.setViewportSize(viewport);
      await gotoOver21Home(page);
      const estateViewport = page.locator(ESTATE_VIEWPORT_SELECTOR);
      const nextButton = page.getByRole("button", {
        name: "Next estate collection item",
      });

      await expectCarouselActiveCardReady(page, {
        activeCardName: "Founder’s Boxy hoodie",
        label: `${viewport.width}px Estate Collection initial`,
        viewportSelector: ESTATE_VIEWPORT_SELECTOR,
      });
      await waitForClientClickHandler(nextButton, "Estate Collection next");

      await nextButton.click();
      await expect(
        activeCarouselCard(estateViewport, "Roastery"),
      ).toBeVisible();
      await expectCarouselActiveCardReady(page, {
        activeCardName: "Roastery",
        label: `${viewport.width}px Estate Collection after next`,
        viewportSelector: ESTATE_VIEWPORT_SELECTOR,
      });

      await expect
        .poll(
          async () =>
            Math.abs(
              (
                await getCarouselCenteringMetrics(
                  page,
                  ESTATE_VIEWPORT_SELECTOR,
                  "Roastery",
                )
              ).centerDelta,
            ),
          {
            message: `${viewport.width}px Estate Collection active card centering`,
          },
        )
        .toBeLessThanOrEqual(4);

      const metrics = await getCarouselCenteringMetrics(
        page,
        ESTATE_VIEWPORT_SELECTOR,
        "Roastery",
      );
      expect(Math.abs(metrics.centerDelta)).toBeLessThanOrEqual(4);

      if (viewport.width === 375) {
        expect(metrics.target).toBeGreaterThan(0);
        expect(metrics.target).toBeLessThan(metrics.maxScroll);
        expect(Math.abs(metrics.scrollLeft - metrics.target)).toBeLessThanOrEqual(
          4,
        );
      }
    }
  });

  test("keeps Estate, Store/Lounge, and Footer usable across required viewports without root overflow masking", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoOver21Home(page);

      const metrics = await page.evaluate(
        ({ viewportWidth, exemptSelectors }) => {
          const root = document.documentElement;
          const body = document.body;
          const shell = document.querySelector('[data-m01-shell="over21"]');
          const estate = document.querySelector(
            '[data-figma-node="13148:15145"]',
          );
          const store = document.querySelector(
            '[data-figma-node="13148:15176"]',
          );
          const storeContent = store?.querySelector(
            '[data-slot="store-lounge-content"]',
          );
          const storeHeading = store?.querySelector("#store-lounge-heading");
          const storeCta = store?.querySelector(
            '[data-slot="store-lounge-cta"]',
          );
          const footer = document.querySelector(
            '[data-figma-node="14468:34842"]',
          );
          const estateCards = estate
            ? Array.from(estate.querySelectorAll("article"))
            : [];
          const estateViewport = estate?.querySelector(
            '[data-slot="estate-carousel-viewport"]',
          );
          const newsletter = footer?.querySelector(
            '[data-slot="footer-newsletter-form"]',
          );
          const legal = footer?.querySelector('[data-slot="footer-legal"]');

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
          const containedBy = (
            child: Element | null | undefined,
            parent: Element | null | undefined,
          ) => {
            if (!child || !parent) {
              return false;
            }
            const childRect = child.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();
            return (
              childRect.left >= parentRect.left - 1 &&
              childRect.right <= parentRect.right + 1 &&
              childRect.top >= parentRect.top - 1 &&
              childRect.bottom <= parentRect.bottom + 1
            );
          };
          const textLineCount = (element: Element | null | undefined) => {
            if (!element) {
              return 0;
            }
            const range = document.createRange();
            range.selectNodeContents(element);
            const count = Array.from(range.getClientRects()).filter(
              (rect) => rect.width > 0 && rect.height > 0,
            ).length;
            range.detach();
            return count;
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

          return {
            documentScrollWidth: root.scrollWidth,
            documentClientWidth: root.clientWidth,
            bodyScrollWidth: body.scrollWidth,
            bodyClientWidth: body.clientWidth,
            rootOverflowX: getComputedStyle(root).overflowX,
            bodyOverflowX: getComputedStyle(body).overflowX,
            shellOverflowX: shell ? getComputedStyle(shell).overflowX : null,
            estateInside: inside(estate),
            estateViewportInside: inside(estateViewport),
            estateCardsReachable: estateCards.every((card) => {
              const rect = card.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0;
            }),
            storeInside: inside(store),
            storeContentInside: inside(storeContent),
            storeHeadingInsideContent: containedBy(storeHeading, storeContent),
            storeHeadingInsideOwnBox:
              storeHeading instanceof HTMLElement &&
              storeHeading.scrollWidth <= storeHeading.clientWidth + 1,
            storeHeadingLineCount: textLineCount(storeHeading),
            storeCtaInsideContent: containedBy(storeCta, storeContent),
            footerInside: inside(footer),
            newsletterInside: inside(newsletter),
            legalInside: inside(legal),
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
      expect(metrics.shellOverflowX).not.toMatch(/hidden|clip/);
      expect(metrics.estateInside, `${viewport.width} estate`).toBe(true);
      expect(
        metrics.estateViewportInside,
        `${viewport.width} estate viewport`,
      ).toBe(true);
      expect(
        metrics.estateCardsReachable,
        `${viewport.width} estate cards`,
      ).toBe(true);
      expect(metrics.storeInside, `${viewport.width} store`).toBe(true);
      expect(
        metrics.storeContentInside,
        `${viewport.width} store content`,
      ).toBe(true);
      expect(
        metrics.storeHeadingInsideContent,
        `${viewport.width} store heading inside content`,
      ).toBe(true);
      expect(
        metrics.storeHeadingInsideOwnBox,
        `${viewport.width} store heading not clipped`,
      ).toBe(true);
      expect(
        metrics.storeHeadingLineCount,
        `${viewport.width} store heading readable lines`,
      ).toBeGreaterThan(0);
      expect(
        metrics.storeCtaInsideContent,
        `${viewport.width} store CTA inside content`,
      ).toBe(true);
      expect(metrics.footerInside, `${viewport.width} footer`).toBe(true);
      expect(
        metrics.newsletterInside,
        `${viewport.width} newsletter`,
      ).toBe(true);
      expect(metrics.legalInside, `${viewport.width} legal`).toBe(true);
      expect(
        metrics.offenderCount,
        `crossing elements at ${viewport.width}px: ${JSON.stringify(metrics.offenders)}`,
      ).toBe(0);

      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
      await expect(
        footer.getByText("2026 Velarro Estate - All rights reserved", {
          exact: false,
        }),
      ).toBeVisible();
      await expect(
        footer.getByRole("button", {
          name: "Submit newsletter signup (deferred: backend not approved for this scope)",
        }),
      ).toBeVisible();
    }
  });
});
