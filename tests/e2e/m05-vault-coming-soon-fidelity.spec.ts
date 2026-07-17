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

const BOUNDARY_TOLERANCE_PX = 4;
const GEOMETRY_TOLERANCE_PX = 10;
const CONTENT_TOLERANCE_PX = 12;
const FIGMA_PAGE_HEIGHT_PX = 1481;
/**
 * Shared MainFooter is locked and taller than Figma ≈697; Gotham unavailable.
 * Cap absolute page-height delta at 220px.
 */
const PAGE_HEIGHT_TOLERANCE_PX = 220;

const LOCAL_OVERFLOW_EXEMPT_SELECTORS = [
  '[data-slot="the-vault-visual"]',
] as const;

async function gotoVault(page: Page) {
  await page.goto("/the-vault", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await expect(page.locator('[data-slot="the-vault-page"]')).toBeVisible();
}

test.describe("M05 Vault Coming Soon fidelity", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("aligns Coming Soon desktop geometry at 1440", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoVault(page);

    const visual = page.locator('[data-slot="the-vault-visual"]');
    const oops = page.locator('[data-slot="the-vault-oops"]');
    const content = page.locator('[data-slot="the-vault-content"]');
    const title = page.locator('[data-slot="the-vault-title"]');
    const description = page.locator('[data-slot="the-vault-description"]');
    const actions = page.locator('[data-slot="the-vault-actions"]');
    const homepage = page.locator('[data-slot="the-vault-homepage-link"]');
    const products = page.locator('[data-slot="the-vault-products-deferred"]');
    const footer = page.getByRole("contentinfo");
    const navbar = page.getByRole("navigation", { name: "Main navigation" });

    await expect(visual).toBeVisible();
    await expect(content).toBeVisible();
    await expect(footer).toBeVisible();
    await expect(navbar).toBeVisible();

    const visualBox = await visual.boundingBox();
    const oopsBox = await oops.boundingBox();
    const contentBox = await content.boundingBox();
    const titleBox = await title.boundingBox();
    const descriptionBox = await description.boundingBox();
    const actionsBox = await actions.boundingBox();
    const homepageBox = await homepage.boundingBox();
    const productsBox = await products.boundingBox();
    const footerBox = await footer.boundingBox();
    const navbarBox = await navbar.boundingBox();

    expect(visualBox).not.toBeNull();
    expect(oopsBox).not.toBeNull();
    expect(contentBox).not.toBeNull();
    expect(titleBox).not.toBeNull();
    expect(descriptionBox).not.toBeNull();
    expect(actionsBox).not.toBeNull();
    expect(homepageBox).not.toBeNull();
    expect(productsBox).not.toBeNull();
    expect(footerBox).not.toBeNull();
    expect(navbarBox).not.toBeNull();

    expect(Math.abs(visualBox!.height - 772)).toBeLessThanOrEqual(
      BOUNDARY_TOLERANCE_PX,
    );
    expect(Math.abs(visualBox!.width - 1440)).toBeLessThanOrEqual(
      BOUNDARY_TOLERANCE_PX,
    );
    expect(Math.abs(navbarBox!.y - 0)).toBeLessThanOrEqual(
      BOUNDARY_TOLERANCE_PX,
    );
    expect(Math.abs(navbarBox!.height - 73)).toBeLessThanOrEqual(
      GEOMETRY_TOLERANCE_PX,
    );

    expect(Math.abs(oopsBox!.width - 1330)).toBeLessThanOrEqual(80);
    expect(oopsBox!.height).toBeGreaterThan(200);
    // Clipped by the visual region; full Figma top is ≈-177.
    const oopsTop = await oops.evaluate(
      (el) => el.getBoundingClientRect().top + window.scrollY,
    );
    expect(oopsTop).toBeLessThan(8);
    expect(Math.abs(oopsTop - -177)).toBeLessThanOrEqual(40);

    expect(Math.abs(contentBox!.y - 469)).toBeLessThanOrEqual(
      CONTENT_TOLERANCE_PX,
    );
    expect(Math.abs(descriptionBox!.width - 588)).toBeLessThanOrEqual(
      GEOMETRY_TOLERANCE_PX,
    );
    expect(Math.abs(homepageBox!.width - 108)).toBeLessThanOrEqual(
      GEOMETRY_TOLERANCE_PX,
    );
    expect(
      Math.abs(productsBox!.x - homepageBox!.x - homepageBox!.width - 41),
    ).toBeLessThanOrEqual(GEOMETRY_TOLERANCE_PX);

    expect(Math.abs(footerBox!.y - 772)).toBeLessThanOrEqual(
      BOUNDARY_TOLERANCE_PX,
    );

    const background = page.locator(
      '[data-slot="the-vault-background-image"] img',
    );
    await expect
      .poll(
        async () =>
          background.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        { timeout: 15_000 },
      )
      .toBe(true);

    await expect(
      page.getByRole("heading", { level: 1, name: /Unveiling\s*soon/i }),
    ).toBeVisible();
    await expect(page.getByText("Oops")).toBeVisible();
    await expect(page.getByText("Offer 01")).toHaveCount(0);
    await expect(page.getByText("Build Your Collection")).toHaveCount(0);

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

  test("protects Coming Soon content across age states", async ({
    page,
    context,
  }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto("/the-vault", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Unveiling/i }),
    ).not.toBeVisible();
    await expect(page.locator('[data-slot="the-vault-page"]')).toHaveCount(0);

    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "under21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await page.goto("/the-vault", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("navigation", { name: "Under-21 navigation" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: "THE ROASTERY" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Unveiling/i }),
    ).not.toBeVisible();
    await expect(page.locator('[data-slot="the-vault-page"]')).toHaveCount(0);

    await context.clearCookies();
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
    await page.goto("/the-vault", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-slot="the-vault-page"]')).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: /Unveiling\s*soon/i }),
    ).toBeVisible();
  });

  test("keeps Homepage and deferred Products behavior truthful", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoVault(page);

    const homepage = page.getByRole("link", { name: "HOMEPAGE", exact: true });
    await expect(homepage).toHaveAttribute("href", "/");
    await homepage.click();
    await expect(page).toHaveURL(/\/$/);

    await page.goto("/the-vault", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-slot="the-vault-page"]')).toBeVisible();

    const products = page.getByRole("button", {
      name: /Products \(deferred/,
    });
    await expect(products).toBeDisabled();

    const hrefs = await page
      .locator('[data-slot="the-vault-visual"] a[href]')
      .evaluateAll((anchors) =>
        anchors
          .map((anchor) => anchor.getAttribute("href"))
          .filter((href): href is string => Boolean(href)),
      );
    expect(hrefs).toEqual(["/"]);
    expect(hrefs.some((href) => href.includes("/coming-soon"))).toBe(false);

    expect(page.url()).toMatch(/\/the-vault\/?$/);
  });

  test("remains contained across required viewports without root overflow masking", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoVault(page);

      const background = page.locator(
        '[data-slot="the-vault-background-image"] img',
      );
      await expect(background).toHaveCount(1);
      await expect
        .poll(
          async () =>
            background.evaluate((img: HTMLImageElement) => {
              if (img.complete && img.naturalWidth > 0) {
                return true;
              }
              if (!img.complete) {
                img.decode?.().catch(() => undefined);
              }
              return img.complete && img.naturalWidth > 0;
            }),
          { timeout: 15_000 },
        )
        .toBe(true);

      const metrics = await page.evaluate(
        ({ viewportWidth, exemptSelectors }) => {
          const root = document.documentElement;
          const body = document.body;
          const pageRoot = document.querySelector(
            '[data-slot="the-vault-page"]',
          );
          const main = document.querySelector('[data-slot="the-vault-main"]');
          const visual = document.querySelector(
            '[data-slot="the-vault-visual"]',
          );
          const content = document.querySelector(
            '[data-slot="the-vault-content"]',
          );
          const footer = document.querySelector(
            "footer, [role='contentinfo']",
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
            });
          }

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
            visualInside: inside(visual),
            contentInside: inside(content),
            footerInside: inside(footer),
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
      expect(metrics.visualInside, `${viewport.width} visual`).toBe(true);
      expect(metrics.contentInside, `${viewport.width} content`).toBe(true);
      expect(metrics.footerInside, `${viewport.width} footer`).toBe(true);
      expect(
        metrics.offenderCount,
        `crossing elements at ${viewport.width}px: ${JSON.stringify(metrics.offenders)}`,
      ).toBe(0);

      await expect(
        page.getByRole("heading", { level: 1, name: /Unveiling\s*soon/i }),
      ).toBeVisible();
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    }
  });
});
