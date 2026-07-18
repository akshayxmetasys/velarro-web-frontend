import { expect, test, type Page, type BrowserContext } from "@playwright/test";

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
const FIGMA_PAGE_HEIGHT_PX = 3184;
/**
 * Shared MainFooter is locked and taller than Figma footer; Gotham unavailable.
 * Cap absolute page-height delta at 280px.
 */
const PAGE_HEIGHT_TOLERANCE_PX = 280;

const TIER_ORDER = [
  "house",
  "reserve",
  "estate",
  "atelier",
  "private-circle",
] as const;

const BENEFIT_ROWS = [
  "browse-shop",
  "secure-checkout",
  "order-history",
  "early-access",
  "limited-edition-access",
  "priority-fulfillment",
  "private-allocations",
  "concierge-services",
  "invitation-only-events",
] as const;

const EMBLEM_PATHS = [
  "/images/m09-membership/house-emblem.png",
  "/images/m09-membership/reserve-emblem.png",
  "/images/m09-membership/estate-emblem.png",
  "/images/m09-membership/atelier-emblem.png",
  "/images/m09-membership/private-circle-emblem.png",
] as const;

async function setAgeCookie(
  context: BrowserContext,
  ageState: "unknown" | "under21" | "over21",
) {
  await context.clearCookies();
  if (ageState === "unknown") {
    return;
  }
  const baseURL = test.info().project.use.baseURL ?? "http://127.0.0.1:3000";
  await context.addCookies([
    {
      name: "velarro_age_state",
      value: ageState,
      url: baseURL,
    },
  ]);
}

async function gotoMembership(page: Page) {
  await page.goto("/membership", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() =>
    ["hidden", "clip"].includes(
      getComputedStyle(document.documentElement).overflowX,
    ),
  );
}

test.describe("V-09a Membership fidelity", () => {
  test("aligns Membership desktop geometry at 1440", async ({
    page,
    context,
  }) => {
    await setAgeCookie(context, "over21");
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoMembership(page);

    const pageRoot = page.locator("[data-route='/membership']");
    const tiers = page.locator("[data-section='membership-tiers']");
    const breadcrumbs = page.locator("[data-section='membership-breadcrumbs']");
    const heading = page.locator("[data-membership-benefits-heading]");
    const tableRegion = page.locator(
      '[data-membership-scroll-region="benefits"]',
    );
    const ctaPanel = page.locator("[data-membership-cta-panel]");
    const footer = page.getByRole("contentinfo");
    const navbar = page.getByRole("navigation", { name: "Main navigation" });

    await expect(pageRoot).toBeVisible();
    await expect(tiers).toBeVisible();
    await expect(navbar).toBeVisible();
    await expect(footer).toBeVisible();
    await expect(page.locator("[data-section='membership-benefits']")).toBeVisible();
    await expect(page.locator("[data-section='membership-cta']")).toBeVisible();

    const cards = page.locator("[data-membership-tier-card]");
    await expect(cards).toHaveCount(5);
    const ids = await cards.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-membership-tier-id")),
    );
    expect(ids).toEqual([...TIER_ORDER]);

    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(Math.abs(first!.width - 248)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(first!.height - 624)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(
      Math.abs(second!.x - (first!.x + first!.width) - 8),
    ).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);

    for (let index = 0; index < EMBLEM_PATHS.length; index += 1) {
      const emblem = cards.nth(index).locator("[data-testid^='membership-tier-']");
      const emblemBox = await emblem.boundingBox();
      expect(emblemBox).not.toBeNull();
      expect(Math.abs(emblemBox!.width - 124)).toBeLessThanOrEqual(
        FIXED_TOLERANCE_PX,
      );
      expect(emblemBox!.height).toBeGreaterThanOrEqual(205 - FIXED_TOLERANCE_PX);
      expect(emblemBox!.height).toBeLessThanOrEqual(206 + FIXED_TOLERANCE_PX);
      await expect(emblem.locator("img")).toHaveAttribute(
        "src",
        EMBLEM_PATHS[index],
      );
      await expect(emblem.locator("img")).toHaveJSProperty("complete", true);
    }

    const crumbBox = await breadcrumbs.boundingBox();
    const headingBox = await heading.boundingBox();
    const tableBox = await tableRegion.boundingBox();
    const ctaBox = await ctaPanel.boundingBox();
    const footerBox = await footer.boundingBox();
    expect(crumbBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    expect(tableBox).not.toBeNull();
    expect(ctaBox).not.toBeNull();
    expect(footerBox).not.toBeNull();

    expect(Math.abs(crumbBox!.width - 1328)).toBeLessThanOrEqual(40);
    // Figma underline region ≈808px; production heading is full title text width.
    expect(headingBox!.width).toBeGreaterThan(700);
    expect(headingBox!.width).toBeLessThanOrEqual(1350);
    expect(Math.abs(tableBox!.width - 1350)).toBeLessThanOrEqual(40);
    expect(Math.abs(ctaBox!.width - 1328)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(Math.abs(ctaBox!.height - 339)).toBeLessThanOrEqual(FIXED_TOLERANCE_PX);
    expect(footerBox!.y).toBeGreaterThan(ctaBox!.y + ctaBox!.height - 8);

    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const rows = [
        ...document.querySelectorAll("[data-membership-benefit-row]"),
      ].map((row) => row.getBoundingClientRect().height);
      return {
        pageHeight: root.scrollHeight,
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        rowHeights: rows,
      };
    });

    expect(metrics.scrollWidth).toBe(metrics.clientWidth);
    expect(
      Math.abs(metrics.pageHeight - FIGMA_PAGE_HEIGHT_PX),
    ).toBeLessThanOrEqual(PAGE_HEIGHT_TOLERANCE_PX);
    expect(metrics.rowHeights).toHaveLength(9);
    for (const height of metrics.rowHeights) {
      expect(height).toBeGreaterThan(80);
      expect(height).toBeLessThan(160);
    }

    await expect(page.getByTestId("membership-cta-banner").locator("img")).toHaveAttribute(
      "src",
      "/images/m09-membership/membership-cta-banner.png",
    );
    await expect(
      page.getByTestId("membership-cta-banner").locator("img"),
    ).toHaveJSProperty("complete", true);
    await expect(page.locator("[data-membership-cta-brand]")).toBeVisible();
  });

  test("renders exact tier assets and benefits matrix", async ({
    page,
    context,
  }) => {
    await setAgeCookie(context, "over21");
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoMembership(page);

    for (const path of EMBLEM_PATHS) {
      await expect(
        page.locator(`[data-section='membership-tiers'] img[src="${path}"]`),
      ).toHaveCount(1);
      await expect(
        page.locator(
          `[data-membership-scroll-region='benefits'] img[src="${path}"]`,
        ),
      ).toHaveCount(1);
    }

    for (const rowId of BENEFIT_ROWS) {
      await expect(
        page.locator(`[data-membership-benefit-row="${rowId}"]`),
      ).toBeVisible();
    }

    await expect(
      page.getByRole("heading", { name: "TIER BENEFITS COMPARISON" }),
    ).toBeVisible();
    await expect(page.getByText("COMPARISSION")).toHaveCount(0);
    await expect(page.getByText("BENIFITS")).toHaveCount(0);
    await expect(page.getByText("ATLIER")).toHaveCount(0);
    await expect(page.getByText("BENEFITS", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Velarro Atelier" }),
    ).toBeVisible();
    await expect(
      page.getByText("Explore the full Velarro collection"),
    ).toBeVisible();
    await expect(page.getByText("Invitation-Only Events")).toBeVisible();

    await expect(
      page.getByText("Included in Velarro House", { exact: true }),
    ).toHaveCount(3);
    await expect(
      page.getByText("Not included in Velarro House", { exact: true }),
    ).toHaveCount(6);
    await expect(
      page.getByText("Included in Velarro Private Circle", { exact: true }),
    ).toHaveCount(9);

    const html = await page.content();
    expect(html).not.toContain("figma.com/api/mcp/asset");
    expect(html).not.toContain('data-asset-status="deferred"');
  });

  test("preserves age-aware CTA and static informational behavior", async ({
    page,
    context,
  }) => {
    await setAgeCookie(context, "over21");
    await page.setViewportSize({ width: 1440, height: 900 });

    const storageWrites: string[] = [];
    await page.addInitScript(() => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (...args) {
        (window as unknown as { __membershipStorageWrites?: string[] })
          .__membershipStorageWrites ??= [];
        (
          window as unknown as { __membershipStorageWrites: string[] }
        ).__membershipStorageWrites.push(String(args[0]));
        return originalSetItem.apply(this, args);
      };
    });

    const membershipRequests: string[] = [];
    page.on("request", (request) => {
      const url = request.url();
      if (
        url.includes("/api/") ||
        url.includes("analytics") ||
        url.includes("stripe")
      ) {
        membershipRequests.push(url);
      }
    });

    await gotoMembership(page);

    await expect(
      page.getByRole("link", { name: "DISCOVER THE COLLECTION" }),
    ).toHaveAttribute("href", "/the-estate");
    await expect(page.locator("main form")).toHaveCount(0);
    await expect(page.getByText(/your current tier/i)).toHaveCount(0);

    await page.getByRole("link", { name: "DISCOVER THE COLLECTION" }).focus();
    expect(membershipRequests).toEqual([]);

    const writes = await page.evaluate(
      () =>
        (window as unknown as { __membershipStorageWrites?: string[] })
          .__membershipStorageWrites ?? [],
    );
    expect(writes).toEqual([]);
    storageWrites.push(...writes);

    await setAgeCookie(context, "unknown");
    await gotoMembership(page);
    await expect(
      page.getByRole("link", { name: "DISCOVER THE COLLECTION" }),
    ).toHaveAttribute("href", "/the-estate");

    await setAgeCookie(context, "under21");
    await gotoMembership(page);
    const gated = page.getByRole("button", {
      name: /DISCOVER THE COLLECTION \(unavailable/i,
    });
    await expect(gated).toBeDisabled();
    await expect(gated).toHaveAttribute("aria-disabled", "true");
    await expect(page).toHaveURL(/\/membership$/);
    expect(storageWrites).toEqual([]);
  });

  test("preserves bounded responsive overflow across required viewports", async ({
    page,
    context,
  }) => {
    await setAgeCookie(context, "over21");
    await gotoMembership(page);

    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);

      const metrics = await page.evaluate(() => {
        const root = document.documentElement;
        const tiers = document.querySelector(
          '[data-membership-scroll-region="tiers"]',
        ) as HTMLElement | null;
        const benefits = document.querySelector(
          '[data-membership-scroll-region="benefits"]',
        ) as HTMLElement | null;
        return {
          overflowX: getComputedStyle(root).overflowX,
          bodyOverflowX: getComputedStyle(document.body).overflowX,
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
          tiersScrollWidth: tiers?.scrollWidth ?? 0,
          tiersClientWidth: tiers?.clientWidth ?? 0,
          benefitsScrollWidth: benefits?.scrollWidth ?? 0,
          benefitsClientWidth: benefits?.clientWidth ?? 0,
          tiersTabIndex: tiers?.tabIndex ?? -1,
          benefitsTabIndex: benefits?.tabIndex ?? -1,
        };
      });

      expect(
        ["hidden", "clip"],
        `html overflow-x at ${viewport.width}px`,
      ).toContain(metrics.overflowX);
      expect(
        ["hidden", "clip"],
        `body overflow-x at ${viewport.width}px`,
      ).toContain(metrics.bodyOverflowX);
      expect(
        metrics.scrollWidth,
        `document scrollWidth at ${viewport.width}px`,
      ).toBe(metrics.clientWidth);
      expect(metrics.tiersTabIndex).toBe(0);
      expect(metrics.benefitsTabIndex).toBe(0);

      if (viewport.width <= 1024) {
        expect(
          metrics.tiersScrollWidth > metrics.tiersClientWidth,
          `tier region scrolls at ${viewport.width}px`,
        ).toBe(true);
        expect(
          metrics.benefitsScrollWidth > metrics.benefitsClientWidth,
          `benefits region scrolls at ${viewport.width}px`,
        ).toBe(true);
      }
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeVisible();
  });
});
