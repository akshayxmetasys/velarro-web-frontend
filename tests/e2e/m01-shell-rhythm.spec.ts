import { expect, test, type Page } from "@playwright/test";

const VIEWPORTS = [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
] as const;

const SECTION_ORDER = [
  { node: "15081:25289", name: "Collector Hero" },
  { node: "13148:15033", name: "Cigar Carousel" },
  { node: "15451:37609", name: "Roastery" },
  { node: "13148:15081", name: "Cigar Knowledge" },
  { node: "13148:15113", name: "Gifting" },
  { node: "13148:15120", name: "Clothier" },
  { node: "13148:15145", name: "Estate Collection" },
  { node: "13148:15176", name: "Store/Lounge" },
] as const;

const GAP_TOLERANCE_PX = 4;
const EXPECTED_SECTION_GAP_PX = 80;

/**
 * Explicit intentional local carousel overflow only.
 * Descendants of these viewports/tracks may extend past the viewport while
 * remaining clipped by the carousel overflow-hidden container; they must not
 * expand document scrollWidth.
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

async function expectDocumentContained(page: Page, label: string) {
  const metrics = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;

    return {
      bodyClientWidth: body.clientWidth,
      bodyScrollWidth: body.scrollWidth,
      clientWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
    };
  });

  expect(metrics.scrollWidth, `${label} document overflow`).toBeLessThanOrEqual(
    metrics.clientWidth + 1,
  );
  expect(metrics.bodyScrollWidth, `${label} body overflow`).toBeLessThanOrEqual(
    metrics.bodyClientWidth + 1,
  );
}

async function openMainMenu(page: Page) {
  const trigger = page.getByRole("button", { name: "Open main menu" });
  await expect(trigger).toBeVisible();
  await expect(trigger).toBeEnabled();
  await trigger.focus();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  const dialog = page.getByRole("dialog", { name: "Estate Index" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toBeFocused();

  return { dialog, trigger };
}

async function expectMenuLinkVisibleAndContained(
  page: Page,
  label: string,
  href: string,
) {
  const link = page.getByRole("dialog", { name: "Estate Index" }).getByRole(
    "link",
    { name: label },
  );
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", href);

  const box = await link.boundingBox();
  const viewport = page.viewportSize();
  expect(box, label).not.toBeNull();
  expect(viewport, label).not.toBeNull();
  expect(box!.x, label).toBeGreaterThanOrEqual(-1);
  expect(box!.x + box!.width, label).toBeLessThanOrEqual(viewport!.width + 1);
}

async function focusSidebarPrimaryLinksWithKeyboard(page: Page) {
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Dismiss main menu backdrop" }),
  ).toBeFocused();

  await page.keyboard.press("Tab");
  const dialog = page.getByRole("dialog", { name: "Estate Index" });

  await expect(dialog.getByRole("link", { name: "Estate Index" })).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("link", { name: "Partner" })).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("link", { name: "Our Story" })).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Partner" })).toBeFocused();
}

test.describe("V-01 Over-21 homepage shell rhythm", () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      {
        name: "velarro_age_state",
        value: "over21",
        url: "http://127.0.0.1:3000",
      },
    ]);
  });

  test("keeps Figma section DOM order and 80px geometric rhythm at 1440", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOver21Home(page);

    const stack = page.locator('[data-m01-section-stack="over21"]');
    await expect(stack).toHaveClass(/gap-\[80px\]/);

    const sectionNodes = await stack.evaluate((main) =>
      Array.from(main.children).map((child) =>
        child.getAttribute("data-figma-node"),
      ),
    );
    expect(sectionNodes).toEqual(SECTION_ORDER.map((section) => section.node));

    let previousBottom = Number.NEGATIVE_INFINITY;
    for (const section of SECTION_ORDER) {
      const locator = page.locator(
        `[data-m01-section-stack="over21"] > [data-figma-node="${section.node}"]`,
      );
      await expect(locator).toBeVisible();
      const box = await locator.boundingBox();
      expect(box, section.name).not.toBeNull();
      if (previousBottom !== Number.NEGATIVE_INFINITY) {
        const gap = box!.y - previousBottom;
        expect(
          Math.abs(gap - EXPECTED_SECTION_GAP_PX),
          `${section.name} gap`,
        ).toBeLessThanOrEqual(GAP_TOLERANCE_PX);
      }
      previousBottom = box!.y + box!.height;
    }

    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("avoids document overflow and root masking across required viewports", async ({
    page,
  }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await gotoOver21Home(page);

      const metrics = await page.evaluate(
        ({ exemptSelectors }) => {
          const root = document.documentElement;
          const body = document.body;
          const shell = document.querySelector('[data-m01-shell="over21"]');
          const rootOverflowX = getComputedStyle(root).overflowX;
          const bodyOverflowX = getComputedStyle(body).overflowX;
          const shellOverflowX = shell
            ? getComputedStyle(shell).overflowX
            : null;

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
              rect.right > window.innerWidth + 1 ||
              rect.width > window.innerWidth + 1;
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
            clientWidth: root.clientWidth,
            scrollWidth: root.scrollWidth,
            bodyClientWidth: body.clientWidth,
            bodyScrollWidth: body.scrollWidth,
            rootOverflowX,
            bodyOverflowX,
            shellOverflowX,
            shellClassName: shell ? String(shell.className) : "",
            exemptions: exemptSelectors,
            offenders: offenders.slice(0, 12),
            offenderCount: offenders.length,
          };
        },
        { exemptSelectors: [...LOCAL_OVERFLOW_EXEMPT_SELECTORS] },
      );

      expect(
        metrics.scrollWidth,
        `document overflow at ${viewport.width}px`,
      ).toBeLessThanOrEqual(metrics.clientWidth + 1);
      expect(
        metrics.bodyScrollWidth,
        `body overflow at ${viewport.width}px`,
      ).toBeLessThanOrEqual(metrics.bodyClientWidth + 1);
      expect(metrics.rootOverflowX).not.toMatch(/hidden|clip/);
      expect(metrics.bodyOverflowX).not.toMatch(/hidden|clip/);
      expect(metrics.shellOverflowX).not.toMatch(/hidden|clip/);
      expect(metrics.shellClassName).not.toMatch(/overflow-x-(clip|hidden)/);
      expect(
        metrics.offenderCount,
        `crossing elements at ${viewport.width}px: ${JSON.stringify(metrics.offenders)}`,
      ).toBe(0);

      const nav = page.getByRole("navigation", { name: "Main navigation" });
      const navBox = await nav.boundingBox();
      expect(navBox).not.toBeNull();
      expect(navBox!.x).toBeGreaterThanOrEqual(-1);
      expect(navBox!.x + navBox!.width).toBeLessThanOrEqual(viewport.width + 1);

      const menu = page.getByRole("button", { name: "Open main menu" });
      await expect(menu).toBeVisible();
      const menuBox = await menu.boundingBox();
      expect(menuBox).not.toBeNull();
      expect(menuBox!.x).toBeGreaterThanOrEqual(-1);
      expect(menuBox!.x + menuBox!.width).toBeLessThanOrEqual(
        viewport.width + 1,
      );

      const logo = page.getByRole("link", { name: "Go to Velarro homepage" });
      await expect(logo).toBeVisible();
      const logoBox = await logo.boundingBox();
      expect(logoBox).not.toBeNull();
      expect(logoBox!.x).toBeGreaterThanOrEqual(-1);
      expect(logoBox!.x + logoBox!.width).toBeLessThanOrEqual(
        viewport.width + 1,
      );

      for (const section of SECTION_ORDER) {
        const sectionBox = await page
          .locator(
            `[data-m01-section-stack="over21"] > [data-figma-node="${section.node}"]`,
          )
          .boundingBox();
        expect(sectionBox, section.name).not.toBeNull();
        expect(sectionBox!.x).toBeGreaterThanOrEqual(-1);
        expect(sectionBox!.x + sectionBox!.width).toBeLessThanOrEqual(
          viewport.width + 1,
        );
      }

      await expect(page.getByRole("contentinfo")).toBeVisible();
    }
  });

  test("exposes full desktop navbar chrome at 1440px", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOver21Home(page);

    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(
      nav.getByRole("button", { name: "Open main menu" }),
    ).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Go to Velarro homepage" }),
    ).toBeVisible();
    await expect(nav.getByRole("link", { name: "The Estate" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Partner" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Our Story" })).toBeVisible();
    await expect(page.getByRole("dialog", { name: "Estate Index" })).toHaveCount(
      0,
    );
    await expect(nav.getByRole("link", { name: "Partner" })).toHaveCount(1);
    await expect(nav.getByRole("link", { name: "Our Story" })).toHaveCount(1);
    await expect(
      nav.getByRole("button", { name: /Search \(deferred/i }),
    ).toBeVisible();
    await expect(
      nav.getByRole("button", { name: /Cart \(deferred/i }),
    ).toBeVisible();
    await expect(
      nav.getByRole("button", { name: /Login \(deferred/i }),
    ).toBeVisible();
  });

  test("opens MainMenuSidebar from the mobile navbar shell", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 320, height: 800 },
      { width: 375, height: 812 },
    ] as const) {
      await page.setViewportSize(viewport);
      await gotoOver21Home(page);

      const trigger = page.getByRole("button", { name: "Open main menu" });
      await expect(trigger).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Go to Velarro homepage" }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "The Estate" }),
      ).toBeHidden();

      await trigger.click();
      const dialog = page.getByRole("dialog", { name: "Estate Index" });
      await expect(dialog).toBeVisible();
      await expect(dialog).toBeFocused();
      await expectMenuLinkVisibleAndContained(page, "Partner", "/partner");
      await expectMenuLinkVisibleAndContained(page, "Our Story", "/our-story");
      await expectDocumentContained(page, `open mobile menu ${viewport.width}px`);

      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }
  });

  test("restores Partner and Our Story in tablet and mobile keyboard navigation", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 768, height: 1024 },
      { width: 375, height: 812 },
    ] as const) {
      await page.setViewportSize(viewport);
      await gotoOver21Home(page);

      const { dialog, trigger } = await openMainMenu(page);
      await expectMenuLinkVisibleAndContained(page, "Partner", "/partner");
      await expectMenuLinkVisibleAndContained(page, "Our Story", "/our-story");

      await focusSidebarPrimaryLinksWithKeyboard(page);

      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      await expectDocumentContained(page, `${viewport.width}px after Escape`);
    }
  });

  test("navigates to Partner and Our Story from the drawer at tablet and mobile widths", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 768, height: 1024 },
      { width: 375, height: 812 },
    ] as const) {
      for (const destination of [
        {
          heading: "Partner with Velarro",
          href: "/partner",
          label: "Partner",
        },
        {
          heading: "OUR STORY",
          href: "/our-story",
          label: "Our Story",
        },
      ] as const) {
        await page.setViewportSize(viewport);
        await gotoOver21Home(page);
        await openMainMenu(page);

        const link = page
          .getByRole("dialog", { name: "Estate Index" })
          .getByRole("link", { name: destination.label });
        await expect(link).toBeVisible();
        await link.focus();
        await page.keyboard.press("Enter");

        await expect(page).toHaveURL(new RegExp(`${destination.href}$`));
        await expect(
          page.getByRole("heading", { name: destination.heading }),
        ).toBeVisible();
        await expect(page.getByRole("dialog", { name: "Estate Index" })).toHaveCount(
          0,
        );
        await page.keyboard.press("Tab");
        await expectDocumentContained(
          page,
          `${viewport.width}px ${destination.label} navigation`,
        );
      }
    }
  });

  test("keeps restored drawer links visible and contained at 320px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await gotoOver21Home(page);

    await openMainMenu(page);
    await expectMenuLinkVisibleAndContained(page, "Partner", "/partner");
    await expectMenuLinkVisibleAndContained(page, "Our Story", "/our-story");
    await expectDocumentContained(page, "320px restored drawer links");
  });
});
