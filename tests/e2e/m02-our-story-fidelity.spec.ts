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

const GAP_TOLERANCE_PX = 6;
const SIZE_TOLERANCE_PX = 2;
/** Figma frame 15934:43007 is 4586. Shared footer + FONT-BLOCKED growth inflate height. */
const FIGMA_PAGE_HEIGHT_PX = 4586;
const PAGE_HEIGHT_MIN_PX = 4400;
const PAGE_HEIGHT_MAX_PX = 5200;
const EXPECTED_CONTENT_GAP_PX = 48;

async function gotoOurStory(page: Page) {
  await page.goto("/our-story", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.locator('[data-slot="our-story-page"]')).toBeVisible();
}

test.describe("V-06 Our Story fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Our Story desktop geometry at 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOurStory(page);

    const hero = page.locator('[data-slot="our-story-hero"]');
    const breadcrumbs = page.locator('[data-slot="our-story-breadcrumbs"]');
    const brandStory = page.locator('[data-slot="our-story-brand-story"]');
    const mission = page.locator('[data-slot="our-story-mission"]');
    const why = page.locator('[data-slot="our-story-why-connoisseurs"]');
    const values = page.locator('[data-slot="our-story-brand-values"]');
    const footer = page.getByRole("contentinfo");

    await expect(hero).toBeVisible();
    await expect(breadcrumbs).toBeVisible();
    await expect(brandStory).toBeVisible();
    await expect(mission).toBeVisible();
    await expect(why).toBeVisible();
    await expect(values).toBeVisible();
    await expect(footer).toBeVisible();

    const heroBox = await hero.boundingBox();
    const crumbBox = await breadcrumbs.boundingBox();
    const brandBox = await brandStory.boundingBox();
    const missionBox = await mission.boundingBox();
    const whyBox = await why.boundingBox();
    const valuesBox = await values.boundingBox();
    const footerBox = await footer.boundingBox();

    expect(heroBox).not.toBeNull();
    expect(crumbBox).not.toBeNull();
    expect(brandBox).not.toBeNull();
    expect(missionBox).not.toBeNull();
    expect(whyBox).not.toBeNull();
    expect(valuesBox).not.toBeNull();
    expect(footerBox).not.toBeNull();

    expect(Math.abs(heroBox!.height - 808)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(heroBox!.width - 1440)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );

    // Nav is full-bleed; Figma x≈55 is the Home control inset (15934:43017).
    const homeLink = breadcrumbs.getByRole("link", { name: "Home" });
    const homeBox = await homeLink.boundingBox();
    expect(homeBox).not.toBeNull();
    expect(Math.abs(homeBox!.x - 55)).toBeLessThanOrEqual(4);
    expect(crumbBox!.height).toBeGreaterThanOrEqual(28);
    expect(crumbBox!.height).toBeLessThanOrEqual(48);

    const brandImage = brandStory.locator(
      '[data-slot="our-story-brand-story-image"]',
    );
    const brandImageBox = await brandImage.boundingBox();
    expect(brandImageBox).not.toBeNull();
    expect(Math.abs(brandImageBox!.width - 507)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(brandImageBox!.height - 696)).toBeLessThanOrEqual(24);

    expect(
      Math.abs(
        brandBox!.y - (crumbBox!.y + crumbBox!.height) - EXPECTED_CONTENT_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        missionBox!.y -
          (brandBox!.y + brandBox!.height) -
          EXPECTED_CONTENT_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        whyBox!.y - (missionBox!.y + missionBox!.height) - EXPECTED_CONTENT_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        valuesBox!.y - (whyBox!.y + whyBox!.height) - EXPECTED_CONTENT_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        footerBox!.y -
          (valuesBox!.y + valuesBox!.height) -
          EXPECTED_CONTENT_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);

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

    const heroOverlay = hero.locator('[data-slot="our-story-hero-overlay"]');
    expect(
      await heroOverlay.evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe("rgba(21, 20, 20, 0.4)");

    const sideImage = brandImage.locator("img").first();
    await brandImage.scrollIntoViewIfNeeded();
    await expect
      .poll(
        async () =>
          sideImage.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        { timeout: 15_000 },
      )
      .toBe(true);

    await expect(
      page.getByRole("heading", { level: 1, name: "OUR STORY" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Brand Story" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Our Mission" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Why Connoisseurs" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Brand Values" }),
    ).toBeVisible();

    const whyCards = why.locator('[data-slot="our-story-why-connoisseurs-card"]');
    const valueCards = values.locator(
      '[data-slot="our-story-brand-values-card"]',
    );
    await expect(whyCards).toHaveCount(4);
    await expect(valueCards).toHaveCount(6);

    const missionStats = mission.locator(
      '[data-slot="our-story-mission-stat"]',
    );
    await expect(missionStats).toHaveCount(3);
    await expect(mission.getByText("5%")).toBeVisible();
    await expect(mission.getByText("12+")).toBeVisible();
    await expect(mission.getByText("200+")).toBeVisible();

    await footer.scrollIntoViewIfNeeded();
    await expect(
      footer.getByRole("heading", { level: 2, name: "Stay in Know" }),
    ).toBeVisible();

    const pageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    expect(pageHeight).toBeGreaterThanOrEqual(PAGE_HEIGHT_MIN_PX);
    expect(pageHeight).toBeLessThanOrEqual(PAGE_HEIGHT_MAX_PX);

    // Capture delta from Figma for evidence; FONT-BLOCKED height growth expected.
    const heightDelta = pageHeight - FIGMA_PAGE_HEIGHT_PX;
    expect(Math.abs(heightDelta)).toBeLessThan(700);
  });

  test("protects restricted Our Story content across age states", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/our-story", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "OUR STORY" }),
    ).not.toBeVisible();
    await expect(page.getByText("Brand Story")).not.toBeVisible();
    await expect(
      page.locator('[data-slot="our-story-page"]'),
    ).toHaveCount(0);

    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "under21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await page.goto("/our-story", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "OUR STORY" }),
    ).not.toBeVisible();
    await expect(
      page.locator('[data-slot="our-story-page"]'),
    ).toHaveCount(0);

    await context.clearCookies();
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await page.goto("/our-story", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-slot="our-story-page"]')).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "OUR STORY" }),
    ).toBeVisible();
  });

  test("keeps Our Story contained across required viewports without root overflow masking", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoOurStory(page);

      const heroImage = page.locator('[data-slot="our-story-hero"] img').first();
      const sideImage = page
        .locator('[data-slot="our-story-brand-story-image"] img')
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
      await sideImage.scrollIntoViewIfNeeded();
      await expect
        .poll(
          async () =>
            sideImage.evaluate(
              (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
            ),
          { timeout: 15_000 },
        )
        .toBe(true);

      const metrics = await page.evaluate(({ viewportWidth }) => {
        const root = document.documentElement;
        const body = document.body;
        const pageRoot = document.querySelector('[data-slot="our-story-page"]');
        const main = document.querySelector('[data-slot="our-story-main"]');
        const sections = [
          "our-story-hero",
          "our-story-breadcrumbs",
          "our-story-brand-story",
          "our-story-mission",
          "our-story-why-connoisseurs",
          "our-story-brand-values",
        ].map((slot) => document.querySelector(`[data-slot="${slot}"]`));
        const footer = document.querySelector("footer, [role='contentinfo']");
        const brandCopy = document.querySelector(
          '[data-slot="our-story-brand-story-copy"]',
        );
        const brandImage = document.querySelector(
          '[data-slot="our-story-brand-story-image"]',
        );
        const whyCards = Array.from(
          document.querySelectorAll(
            '[data-slot="our-story-why-connoisseurs-card"]',
          ),
        );
        const valueCards = Array.from(
          document.querySelectorAll(
            '[data-slot="our-story-brand-values-card"]',
          ),
        );

        const isExempt = (el: Element) => {
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

        const imagesLoaded = [
          document.querySelector(
            '[data-slot="our-story-hero"] img',
          ) as HTMLImageElement | null,
          document.querySelector(
            '[data-slot="our-story-brand-story-image"] img',
          ) as HTMLImageElement | null,
        ].every((img) => Boolean(img && img.complete && img.naturalWidth > 0));

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
          sectionsInside: sections.every((section) => inside(section)),
          breadcrumbsInside: inside(sections[1]),
          brandCopyInside: inside(brandCopy),
          brandImageInside: inside(brandImage),
          whyCardsReachable: whyCards.every((card) => {
            const rect = card.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          }),
          valueCardsReachable: valueCards.every((card) => {
            const rect = card.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          }),
          footerInside: inside(footer),
          imagesLoaded,
          offenders: offenders.slice(0, 12),
          offenderCount: offenders.length,
        };
      }, { viewportWidth: viewport.width });

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
      expect(metrics.sectionsInside, `${viewport.width} sections`).toBe(true);
      expect(metrics.breadcrumbsInside, `${viewport.width} breadcrumbs`).toBe(
        true,
      );
      expect(metrics.brandCopyInside, `${viewport.width} brand copy`).toBe(
        true,
      );
      expect(metrics.brandImageInside, `${viewport.width} brand image`).toBe(
        true,
      );
      expect(metrics.whyCardsReachable, `${viewport.width} why cards`).toBe(
        true,
      );
      expect(
        metrics.valueCardsReachable,
        `${viewport.width} value cards`,
      ).toBe(true);
      expect(metrics.footerInside, `${viewport.width} footer`).toBe(true);
      expect(metrics.imagesLoaded, `${viewport.width} images`).toBe(true);
      expect(
        metrics.offenderCount,
        `crossing elements at ${viewport.width}px: ${JSON.stringify(metrics.offenders)}`,
      ).toBe(0);

      await expect(
        page.getByRole("heading", { level: 1, name: "OUR STORY" }),
      ).toBeVisible();
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    }
  });
});
