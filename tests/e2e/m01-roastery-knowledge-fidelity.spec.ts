import { expect, test, type Page } from "@playwright/test";

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
const CARD_SIZE_TOLERANCE_PX = 2;

/**
 * Existing V-01/V-02 local carousel overflow only. V-03 does not add exemptions.
 */
const LOCAL_OVERFLOW_EXEMPT_SELECTORS = [
  '[data-slot="cigar-carousel-viewport"]',
  '[data-slot="cigar-carousel-track"]',
  '[data-slot="estate-carousel-viewport"]',
  '[data-slot="estate-carousel-track"]',
] as const;

async function gotoOver21Home(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.locator('[data-m01-section-stack="over21"]')).toBeVisible();
}

test.describe("V-03 Roastery Hero + Cigar Knowledge fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Roastery and Knowledge desktop geometry at 1440", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOver21Home(page);

    const carousel = page.locator('[data-figma-node="13148:15033"]');
    const roastery = page.locator('[data-figma-node="15451:37609"]');
    const knowledge = page.locator('[data-figma-node="13148:15081"]');
    const gifting = page.locator('[data-figma-node="13148:15113"]');

    await expect(roastery).toBeVisible();
    await expect(knowledge).toBeVisible();

    const carouselBox = await carousel.boundingBox();
    const roasteryBox = await roastery.boundingBox();
    const knowledgeBox = await knowledge.boundingBox();
    const giftingBox = await gifting.boundingBox();
    expect(carouselBox).not.toBeNull();
    expect(roasteryBox).not.toBeNull();
    expect(knowledgeBox).not.toBeNull();
    expect(giftingBox).not.toBeNull();

    expect(Math.abs(roasteryBox!.width - 1440)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(roasteryBox!.height - 851)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );

    expect(Math.abs(knowledgeBox!.x - 50)).toBeLessThanOrEqual(2);
    expect(Math.abs(knowledgeBox!.width - 1340)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(knowledgeBox!.height - 719)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );

    expect(
      Math.abs(
        roasteryBox!.y -
          (carouselBox!.y + carouselBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        knowledgeBox!.y -
          (roasteryBox!.y + roasteryBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        giftingBox!.y -
          (knowledgeBox!.y + knowledgeBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);

    await expect(
      roastery.getByRole("heading", { level: 2, name: "THE ROASTERY" }),
    ).toBeVisible();
    await expect(
      roastery.getByRole("button", {
        name: "Shop now (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();

    const heroImage = roastery.locator('img[alt="Roastery hero imagery"]');
    await expect(heroImage).toBeVisible();
    await expect
      .poll(async () =>
        heroImage.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);

    const imageTreatment = await heroImage.evaluate((img) => ({
      objectFit: getComputedStyle(img).objectFit,
      objectPosition: getComputedStyle(img).objectPosition,
    }));
    expect(imageTreatment.objectFit).toBe("cover");
    expect(imageTreatment.objectPosition).toBe("50% 50%");

    const overlay = roastery.locator('[data-slot="roastery-hero-overlay"]');
    await expect(overlay).toBeVisible();
    const overlayBg = await overlay.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(overlayBg).toBe("rgba(21, 20, 20, 0.4)");

    const dots = roastery.locator('[data-slot="roastery-slider-dots-static"]');
    await expect(dots).toBeVisible();
    expect(await dots.locator(":scope > *").count()).toBe(5);
    await expect(
      roastery.locator('[data-slot="roastery-cta-arrow"]'),
    ).toBeVisible();

    await expect(knowledge.getByText("Cigar Knowledge")).toBeVisible();
    await expect(
      knowledge.getByRole("heading", {
        level: 2,
        name: "Expand your horizons",
      }),
    ).toBeVisible();
    await expect(
      knowledge.locator('[data-slot="cigar-knowledge-divider"]'),
    ).toBeVisible();

    const cards = knowledge.locator('[data-slot="cigar-knowledge-card"]');
    await expect(cards).toHaveCount(3);
    const titles = ["Limited Compendium", "Reserve", "Night Series"];
    for (let index = 0; index < titles.length; index += 1) {
      await expect(
        cards.nth(index).getByRole("heading", { level: 3, name: titles[index] }),
      ).toBeVisible();
      const box = await cards.nth(index).boundingBox();
      expect(box).not.toBeNull();
      expect(Math.abs(box!.width - 392)).toBeLessThanOrEqual(
        CARD_SIZE_TOLERANCE_PX,
      );
      expect(Math.abs(box!.height - 555)).toBeLessThanOrEqual(
        CARD_SIZE_TOLERANCE_PX,
      );

      const imageBox = await cards
        .nth(index)
        .locator("img")
        .boundingBox();
      expect(imageBox).not.toBeNull();
      expect(Math.abs(imageBox!.width - 356)).toBeLessThanOrEqual(
        CARD_SIZE_TOLERANCE_PX,
      );
      expect(Math.abs(imageBox!.height - 309)).toBeLessThanOrEqual(
        CARD_SIZE_TOLERANCE_PX,
      );

      await expect(
        cards.nth(index).getByRole("button", {
          name: `Explore ${titles[index]} (deferred: destination not approved for this scope)`,
        }),
      ).toBeDisabled();
    }
  });

  test("keeps Roastery and Knowledge usable across required viewports without root overflow masking", async ({
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
          const roastery = document.querySelector(
            '[data-figma-node="15451:37609"]',
          );
          const knowledge = document.querySelector(
            '[data-figma-node="13148:15081"]',
          );
          const cta = roastery?.querySelector('button[aria-disabled="true"]');
          const dots = roastery?.querySelector(
            '[data-slot="roastery-slider-dots-static"]',
          );
          const heading = knowledge?.querySelector("h2");
          const cards = knowledge
            ? Array.from(
                knowledge.querySelectorAll(
                  '[data-slot="cigar-knowledge-card"]',
                ),
              )
            : [];

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
            // Open menu overlay is fixed and may cover the viewport intentionally.
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

          return {
            documentScrollWidth: root.scrollWidth,
            documentClientWidth: root.clientWidth,
            bodyScrollWidth: body.scrollWidth,
            bodyClientWidth: body.clientWidth,
            rootOverflowX: getComputedStyle(root).overflowX,
            bodyOverflowX: getComputedStyle(body).overflowX,
            shellOverflowX: shell ? getComputedStyle(shell).overflowX : null,
            roasteryInside: inside(roastery),
            ctaInside: inside(cta),
            dotsInside: inside(dots),
            knowledgeHeadingInside: inside(heading),
            cardsInside: cards.every((card) => inside(card)),
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
      expect(metrics.roasteryInside, `${viewport.width} roastery`).toBe(true);
      expect(metrics.ctaInside, `${viewport.width} cta`).toBe(true);
      expect(metrics.dotsInside, `${viewport.width} dots`).toBe(true);
      expect(
        metrics.knowledgeHeadingInside,
        `${viewport.width} knowledge heading`,
      ).toBe(true);
      expect(metrics.cardsInside, `${viewport.width} cards`).toBe(true);
      expect(
        metrics.offenderCount,
        `crossing elements at ${viewport.width}px: ${JSON.stringify(metrics.offenders)}`,
      ).toBe(0);

      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    }
  });
});
