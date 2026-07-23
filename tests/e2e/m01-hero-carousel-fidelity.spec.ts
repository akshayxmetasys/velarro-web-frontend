import {
  activeCarouselCard,
  expect,
  expectCarouselActiveCardReady,
  test,
  waitForClientClickHandler,
  type Page,
} from "./support/e2e-test";

const VIEWPORTS = [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

const GAP_TOLERANCE_PX = 4;
const EXPECTED_SECTION_GAP_PX = 80;
const SIZE_TOLERANCE_PX = 1;

const LOCAL_OVERFLOW_EXEMPT_SELECTORS = [
  '[data-slot="cigar-carousel-viewport"]',
  '[data-slot="cigar-carousel-track"]',
  '[data-slot="estate-carousel-viewport"]',
  '[data-slot="estate-carousel-track"]',
] as const;
const CIGAR_VIEWPORT_SELECTOR = '[data-slot="cigar-carousel-viewport"]';

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

test.describe("V-02 Collector Hero + Cigar Carousel fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Collector Hero and Cigar Carousel desktop geometry at 1440", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOver21Home(page);

    const hero = page.locator('[data-figma-node="15081:25289"]');
    const carousel = page.locator('[data-figma-node="13148:15033"]');
    const cigarViewport = page.locator(CIGAR_VIEWPORT_SELECTOR);
    const roastery = page.locator('[data-figma-node="15451:37609"]');

    await expect(hero).toBeVisible();
    await expect(carousel).toBeVisible();

    const heroBox = await hero.boundingBox();
    const carouselBox = await carousel.boundingBox();
    const roasteryBox = await roastery.boundingBox();
    expect(heroBox).not.toBeNull();
    expect(carouselBox).not.toBeNull();
    expect(roasteryBox).not.toBeNull();

    expect(Math.abs(heroBox!.width - 1440)).toBeLessThanOrEqual(SIZE_TOLERANCE_PX);
    expect(Math.abs(heroBox!.height - 851)).toBeLessThanOrEqual(SIZE_TOLERANCE_PX);

    expect(Math.abs(carouselBox!.x - 63)).toBeLessThanOrEqual(2);
    expect(Math.abs(carouselBox!.width - 1314)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(carouselBox!.height - 645)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );

    const heroToCarouselGap = carouselBox!.y - (heroBox!.y + heroBox!.height);
    expect(
      Math.abs(heroToCarouselGap - EXPECTED_SECTION_GAP_PX),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);

    const carouselToRoasteryGap =
      roasteryBox!.y - (carouselBox!.y + carouselBox!.height);
    expect(
      Math.abs(carouselToRoasteryGap - EXPECTED_SECTION_GAP_PX),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);

    await expect(
      page.getByRole("heading", { level: 1, name: "COLLECTOR SERIES" }),
    ).toBeVisible();
    await expect(
      hero.getByRole("button", {
        name: "Shop now (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();

    const heroImage = hero.locator('img[alt="Collector Series lifestyle imagery"]');
    await expect(heroImage).toBeVisible();
    await expect
      .poll(async () => heroImage.evaluate((img: HTMLImageElement) => img.complete))
      .toBe(true);

    const dots = hero.locator('[data-slot="hero-slider-dots-static"]');
    await expect(dots).toBeVisible();
    expect(await dots.locator(":scope > *").count()).toBe(5);
    await expect(hero.locator('[data-slot="hero-cta-arrow"]')).toBeVisible();

    await expect(
      carousel.getByText("DISCOVER TIMELESS LUXURY", { exact: true }),
    ).toBeVisible();
    await expect(
      carousel.getByRole("heading", { level: 2, name: "Velarro cigars" }),
    ).toBeVisible();
    await expect(
      activeCarouselCard(cigarViewport, "Verde Classico"),
    ).toBeVisible();
    await expect(
      carousel.getByRole("heading", { level: 3, name: "Ashtrays" }),
    ).toBeVisible();
    await expect(
      carousel.getByRole("heading", { level: 3, name: "Lighters" }),
    ).toBeVisible();

    await expect(
      cigarViewport,
    ).toBeVisible();
    await expect(
      page.locator('[data-slot="cigar-carousel-track"]'),
    ).toBeVisible();

    const previous = page.getByRole("button", {
      name: "Previous cigar category",
    });
    const next = page.getByRole("button", { name: "Next cigar category" });
    await expect(previous).toBeVisible();
    await expect(next).toBeVisible();

    const previousBox = await previous.boundingBox();
    const nextBox = await next.boundingBox();
    expect(previousBox).not.toBeNull();
    expect(nextBox).not.toBeNull();
    expect(previousBox!.x).toBeGreaterThanOrEqual(carouselBox!.x - 1);
    expect(nextBox!.x + nextBox!.width).toBeLessThanOrEqual(
      carouselBox!.x + carouselBox!.width + 1,
    );

    await expectCarouselActiveCardReady(page, {
      activeCardName: "Verde Classico",
      label: "Cigar Carousel initial desktop",
      viewportSelector: CIGAR_VIEWPORT_SELECTOR,
    });
    const activeCard = activeCarouselCard(cigarViewport, "Verde Classico");
    const inactiveCard = cigarViewport.getByRole("article", { name: "Ashtrays" });
    const activeBox = await activeCard.boundingBox();
    const inactiveBox = await inactiveCard.boundingBox();
    expect(activeBox).not.toBeNull();
    expect(inactiveBox).not.toBeNull();
    expect(activeBox!.width).toBeGreaterThan(inactiveBox!.width);
    expect(activeBox!.height).toBeGreaterThan(inactiveBox!.height);

    const activeOpacity = await activeCard.evaluate(
      (el) => getComputedStyle(el).opacity,
    );
    const inactiveOpacity = await inactiveCard.evaluate(
      (el) => getComputedStyle(el).opacity,
    );
    expect(Number(activeOpacity)).toBeCloseTo(1, 1);
    expect(Number(inactiveOpacity)).toBeCloseTo(0.75, 2);
  });

  test("supports previous/next boundaries and keyboard activation", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOver21Home(page);

    const previous = page.getByRole("button", {
      name: "Previous cigar category",
    });
    const next = page.getByRole("button", { name: "Next cigar category" });
    const cigarViewport = page.locator(CIGAR_VIEWPORT_SELECTOR);

    await expectCarouselActiveCardReady(page, {
      activeCardName: "Verde Classico",
      label: "Cigar Carousel initial state",
      viewportSelector: CIGAR_VIEWPORT_SELECTOR,
    });
    await waitForClientClickHandler(next, "Cigar Carousel next");
    await waitForClientClickHandler(previous, "Cigar Carousel previous");

    await next.click();
    await expect(
      activeCarouselCard(cigarViewport, "Lighters"),
    ).toBeVisible();

    await previous.click();
    await expect(
      activeCarouselCard(cigarViewport, "Verde Classico"),
    ).toBeVisible();

    await previous.click();
    await expect(
      activeCarouselCard(cigarViewport, "Ashtrays"),
    ).toBeVisible();
    await expect(previous).toBeDisabled();

    for (let step = 0; step < 5; step += 1) {
      await next.click();
    }
    await expect(
      activeCarouselCard(cigarViewport, "Nocturne"),
    ).toBeVisible();
    await expect(next).toBeDisabled();

    await previous.focus();
    await expect(previous).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(
      activeCarouselCard(cigarViewport, "Pipes"),
    ).toBeVisible();
    await expect(previous).toBeFocused();

    await page.keyboard.press("Space");
    await expect(
      activeCarouselCard(cigarViewport, "Vintage no. 88"),
    ).toBeVisible();
    await expect(previous).toBeFocused();

    expect(consoleErrors).toEqual([]);
  });

  test("centers the active Cigar Carousel card after navigation at desktop and narrow widths", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 375, height: 812 },
    ] as const) {
      await page.setViewportSize(viewport);
      await gotoOver21Home(page);
      const nextButton = page.getByRole("button", { name: "Next cigar category" });

      await expectCarouselActiveCardReady(page, {
        activeCardName: "Verde Classico",
        label: `${viewport.width}px Cigar Carousel initial`,
        viewportSelector: CIGAR_VIEWPORT_SELECTOR,
      });
      await waitForClientClickHandler(nextButton, "Cigar Carousel next");

      await nextButton.click();
      await expectCarouselActiveCardReady(page, {
        activeCardName: "Lighters",
        label: `${viewport.width}px Cigar Carousel after next`,
        viewportSelector: CIGAR_VIEWPORT_SELECTOR,
      });

      await expect
        .poll(
          async () =>
            Math.abs(
              (
                await getCarouselCenteringMetrics(
                  page,
                  CIGAR_VIEWPORT_SELECTOR,
                  "Lighters",
                )
              ).centerDelta,
            ),
          { message: `${viewport.width}px Cigar Carousel active card centering` },
        )
        .toBeLessThanOrEqual(4);

      const metrics = await getCarouselCenteringMetrics(
        page,
        CIGAR_VIEWPORT_SELECTOR,
        "Lighters",
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

  test("keeps hero and carousel usable across required viewports without root overflow masking", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoOver21Home(page);
      await expectCarouselActiveCardReady(page, {
        activeCardName: "Verde Classico",
        label: `${viewport.width}px Cigar Carousel usable state`,
        viewportSelector: CIGAR_VIEWPORT_SELECTOR,
      });

      const metrics = await page.evaluate(
        ({ exemptSelectors, viewportWidth }) => {
          const root = document.documentElement;
          const body = document.body;
          const shell = document.querySelector('[data-m01-shell="over21"]');
          const hero = document.querySelector('[data-figma-node="15081:25289"]');
          const carousel = document.querySelector(
            '[data-figma-node="13148:15033"]',
          );
          const cta = hero?.querySelector('button[aria-disabled="true"]');
          const dots = hero?.querySelector(
            '[data-slot="hero-slider-dots-static"]',
          );
          const previous = document.querySelector(
            'button[aria-label="Previous cigar category"]',
          );
          const next = document.querySelector(
            'button[aria-label="Next cigar category"]',
          );
          const cigarViewport = document.querySelector(
            '[data-slot="cigar-carousel-viewport"]',
          );
          const active = cigarViewport?.querySelector('article[aria-current="true"]');

          const isExempt = (el: Element) =>
            exemptSelectors.some((selector) => {
              try {
                return Boolean(el.closest(selector));
              } catch {
                return false;
              }
            });

          const crossesViewport = (el: Element) => {
            if (isExempt(el)) {
              return false;
            }
            const rect = el.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) {
              return false;
            }
            return rect.right > viewportWidth + 1 || rect.left < -1;
          };

          const candidates = Array.from(
            document.querySelectorAll("section, article, button, img, h1, h2, h3"),
          );
          const crossing = candidates.filter(crossesViewport).length;

          const inside = (el: Element | null | undefined) => {
            if (!el) {
              return false;
            }
            const rect = el.getBoundingClientRect();
            return rect.left >= -1 && rect.right <= viewportWidth + 1;
          };

          const activeUsable = (() => {
            if (!active) {
              return false;
            }
            const rect = active.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) {
              return false;
            }
            const carouselViewport = active.closest(
              '[data-slot="cigar-carousel-viewport"]',
            );
            if (!(carouselViewport instanceof HTMLElement)) {
              return false;
            }
            const clip = carouselViewport.getBoundingClientRect();
            const overlapWidth =
              Math.min(rect.right, clip.right) - Math.max(rect.left, clip.left);
            const overlapHeight =
              Math.min(rect.bottom, clip.bottom) - Math.max(rect.top, clip.top);
            return overlapWidth > 40 && overlapHeight > 40;
          })();

          return {
            documentScrollWidth: root.scrollWidth,
            documentClientWidth: root.clientWidth,
            bodyScrollWidth: body.scrollWidth,
            bodyClientWidth: body.clientWidth,
            rootOverflowX: getComputedStyle(root).overflowX,
            bodyOverflowX: getComputedStyle(body).overflowX,
            shellOverflowX: shell
              ? getComputedStyle(shell).overflowX
              : null,
            heroInside: inside(hero),
            ctaInside: inside(cta),
            dotsInside: inside(dots),
            carouselInside: inside(carousel),
            previousInside: inside(previous),
            nextInside: inside(next),
            activeUsable,
            crossing,
            footerVisible: Boolean(document.querySelector("footer")),
          };
        },
        {
          exemptSelectors: [...LOCAL_OVERFLOW_EXEMPT_SELECTORS],
          viewportWidth: viewport.width,
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
      expect(metrics.heroInside, `${viewport.width} hero`).toBe(true);
      expect(metrics.ctaInside, `${viewport.width} cta`).toBe(true);
      expect(metrics.dotsInside, `${viewport.width} dots`).toBe(true);
      expect(metrics.carouselInside, `${viewport.width} carousel`).toBe(true);
      expect(metrics.previousInside, `${viewport.width} previous`).toBe(true);
      expect(metrics.nextInside, `${viewport.width} next`).toBe(true);
      expect(metrics.activeUsable, `${viewport.width} active`).toBe(true);
      expect(metrics.crossing, `${viewport.width} crossing`).toBe(0);
      expect(metrics.footerVisible).toBe(true);
    }
  });
});
