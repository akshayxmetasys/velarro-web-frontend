import { expect, test, type Page } from "./support/e2e-test";

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
const IMAGE_SIZE_TOLERANCE_PX = 2;

/**
 * Existing V-01/V-02 local carousel overflow only. V-04 does not add exemptions.
 */
const LOCAL_OVERFLOW_EXEMPT_SELECTORS = [
  '[data-slot="cigar-carousel-viewport"]',
  '[data-slot="cigar-carousel-track"]',
  '[data-slot="estate-carousel-viewport"]',
  '[data-slot="estate-carousel-track"]',
] as const;

const CLOTHIER_TITLES = [
  "Estate Oversized T-shirt",
  "Heritage Dad Cap",
  "Estate Weekender Jacket",
] as const;

async function gotoOver21Home(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.locator('[data-m01-section-stack="over21"]')).toBeVisible();
}

test.describe("V-04 Gifting + Clothier fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Gifting and Clothier desktop geometry at 1440", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOver21Home(page);

    const knowledge = page.locator('[data-figma-node="13148:15081"]');
    const gifting = page.locator('[data-figma-node="13148:15113"]');
    const clothier = page.locator('[data-figma-node="13148:15120"]');
    const estate = page.locator('[data-figma-node="13148:15145"]');

    await expect(gifting).toBeVisible();
    await expect(clothier).toBeVisible();

    const knowledgeBox = await knowledge.boundingBox();
    const giftingBox = await gifting.boundingBox();
    const band = gifting.locator('[data-slot="gifting-band"]');
    const bandBox = await band.boundingBox();
    const clothierBox = await clothier.boundingBox();
    const estateBox = await estate.boundingBox();

    expect(knowledgeBox).not.toBeNull();
    expect(giftingBox).not.toBeNull();
    expect(bandBox).not.toBeNull();
    expect(clothierBox).not.toBeNull();
    expect(estateBox).not.toBeNull();

    expect(Math.abs(bandBox!.x - 51)).toBeLessThanOrEqual(2);
    expect(Math.abs(bandBox!.width - 1338)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(bandBox!.height - 696)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    await expect(band).toHaveCSS("border-radius", "20px");

    expect(Math.abs(clothierBox!.x - 50)).toBeLessThanOrEqual(2);
    expect(Math.abs(clothierBox!.width - 1340)).toBeLessThanOrEqual(
      SIZE_TOLERANCE_PX,
    );
    expect(Math.abs(clothierBox!.height - 708.43)).toBeLessThanOrEqual(24);

    expect(
      Math.abs(
        giftingBox!.y -
          (knowledgeBox!.y + knowledgeBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        clothierBox!.y -
          (giftingBox!.y + giftingBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
    expect(
      Math.abs(
        estateBox!.y -
          (clothierBox!.y + clothierBox!.height) -
          EXPECTED_SECTION_GAP_PX,
      ),
    ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);

    const heroImage = gifting.locator(
      'img[alt="Velarro gifting collection imagery"]',
    );
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

    const overlay = gifting.locator('[data-slot="gifting-overlay"]');
    await expect(overlay).toBeVisible();
    const overlayBg = await overlay.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(overlayBg).toBe("rgba(71, 70, 70, 0.6)");

    await expect(gifting.getByText("Gifting")).toBeVisible();
    await expect(
      gifting.locator('[data-slot="gifting-divider"]'),
    ).toBeVisible();
    await expect(
      gifting.getByRole("heading", {
        level: 2,
        name: "Find the perfect gifts",
      }),
    ).toBeVisible();
    await expect(
      gifting.getByRole("button", {
        name: "Explore gifting (deferred: destination not approved for this scope)",
      }),
    ).toBeDisabled();

    const content = gifting.locator('[data-slot="gifting-content"]');
    const contentBox = await content.boundingBox();
    expect(contentBox).not.toBeNull();
    expect(contentBox!.x).toBeGreaterThanOrEqual(bandBox!.x - 1);
    expect(contentBox!.x + contentBox!.width).toBeLessThanOrEqual(
      bandBox!.x + bandBox!.width + 1,
    );

    await expect(clothier.getByText("Curated for the Exceptional")).toBeVisible();
    await expect(
      clothier.locator('[data-slot="clothier-divider"]'),
    ).toBeVisible();
    await expect(
      clothier.getByRole("heading", { level: 2, name: "The Clothier" }),
    ).toBeVisible();

    const cards = clothier.locator('[data-slot="clothier-card"]');
    await expect(cards).toHaveCount(3);

    for (let index = 0; index < CLOTHIER_TITLES.length; index += 1) {
      const card = cards.nth(index);
      await expect(
        card.getByRole("heading", {
          level: 3,
          name: CLOTHIER_TITLES[index],
        }),
      ).toBeVisible();

      const box = await card.boundingBox();
      expect(box).not.toBeNull();
      expect(Math.abs(box!.width - 355)).toBeLessThanOrEqual(
        CARD_SIZE_TOLERANCE_PX,
      );
      expect(Math.abs(box!.height - 518)).toBeLessThanOrEqual(24);

      const imageFrame = card.locator('[data-slot="clothier-card-image"]');
      const imageFrameBox = await imageFrame.boundingBox();
      expect(imageFrameBox).not.toBeNull();
      expect(Math.abs(imageFrameBox!.width - 321)).toBeLessThanOrEqual(
        IMAGE_SIZE_TOLERANCE_PX,
      );
      expect(Math.abs(imageFrameBox!.height - 321)).toBeLessThanOrEqual(
        IMAGE_SIZE_TOLERANCE_PX,
      );

      const productImage = card.locator("img").first();
      await card.scrollIntoViewIfNeeded();
      await expect(productImage).toBeVisible();
      await expect
        .poll(
          async () =>
            productImage.evaluate(
              (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
            ),
          { timeout: 15_000 },
        )
        .toBe(true);

      await expect(card.getByText("Top Gift")).toBeVisible();
      await expect(card.locator("p").first()).toBeVisible();
      await expect(
        card.getByRole("list", {
          name: `${CLOTHIER_TITLES[index]} color options`,
        }),
      ).toBeVisible();
      await expect(
        card.getByRole("button", {
          name: `Explore ${CLOTHIER_TITLES[index]} (deferred: destination not approved for this scope)`,
        }),
      ).toBeDisabled();
    }

    const row = clothier.locator('[data-slot="clothier-cards"]');
    const rowBox = await row.boundingBox();
    expect(rowBox).not.toBeNull();
    expect(rowBox!.x).toBeGreaterThanOrEqual(clothierBox!.x - 1);
    expect(rowBox!.x + rowBox!.width).toBeLessThanOrEqual(
      clothierBox!.x + clothierBox!.width + 1,
    );
  });

  test("keeps Gifting and Clothier usable across required viewports without root overflow masking", async ({
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
          const gifting = document.querySelector(
            '[data-figma-node="13148:15113"]',
          );
          const clothier = document.querySelector(
            '[data-figma-node="13148:15120"]',
          );
          const giftingContent = gifting?.querySelector(
            '[data-slot="gifting-content"]',
          );
          const clothierHeading = clothier?.querySelector("h2");
          const cards = clothier
            ? Array.from(
                clothier.querySelectorAll('[data-slot="clothier-card"]'),
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

          const textNotClipped = (el: Element | null | undefined) => {
            if (!el) {
              return false;
            }
            const style = getComputedStyle(el);
            return style.overflow !== "hidden" || el.scrollWidth <= el.clientWidth + 1;
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
            giftingInside: inside(gifting),
            giftingContentInside: inside(giftingContent),
            clothierHeadingInside: inside(clothierHeading),
            cardsInside: cards.every((card) => inside(card)),
            cardTextVisible: cards.every((card) => {
              const title = card.querySelector("h3");
              const desc = card.querySelector("p");
              const swatches = card.querySelector(
                '[data-slot="clothier-card-swatches"]',
              );
              const cta = card.querySelector('[data-slot="clothier-card-cta"]');
              return (
                Boolean(title && inside(title) && textNotClipped(title)) &&
                Boolean(desc && inside(desc)) &&
                Boolean(swatches && inside(swatches)) &&
                Boolean(cta && inside(cta))
              );
            }),
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
      expect(metrics.giftingInside, `${viewport.width} gifting`).toBe(true);
      expect(
        metrics.giftingContentInside,
        `${viewport.width} gifting content`,
      ).toBe(true);
      expect(
        metrics.clothierHeadingInside,
        `${viewport.width} clothier heading`,
      ).toBe(true);
      expect(metrics.cardsInside, `${viewport.width} cards`).toBe(true);
      expect(
        metrics.cardTextVisible,
        `${viewport.width} card contents`,
      ).toBe(true);
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
