import {
  expect,
  test as base,
  type Locator,
  type Page,
} from "@playwright/test";

const APPROVED_IMAGE_ORIGIN =
  "https://lpnrhpvmrnoqkzoxukov.supabase.co" as const;
const APPROVED_IMAGE_PATH_PREFIX = "/storage/v1/object/public/" as const;

const APPROVED_IMAGE_FIXTURE = Buffer.from(
  [
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">',
    '<rect width="64" height="64" fill="#151414"/>',
    '<path d="M12 44 27 24l10 12 7-8 8 16H12Z" fill="#726158"/>',
    '<circle cx="44" cy="20" r="6" fill="#F2E9DF"/>',
    "</svg>",
  ].join(""),
);
export const STORE_LOUNGE_E2E_IMAGE_PATH =
  "/images/m01-home/store-lounge-background.png" as const;

export interface ImageNetworkEvent {
  contentType?: string | null;
  failureText?: string | null;
  resourceType: string;
  status?: number;
  type: "request" | "response" | "requestfailed";
  url: string;
}

export interface ImageReadinessMetrics {
  boundingBox: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  complete: boolean;
  currentSrc: string;
  expectedSourceMatched: boolean;
  loading: string;
  naturalHeight: number;
  naturalWidth: number;
  nextImageUrlParam: string | null;
  src: string | null;
  usesNextImage: boolean;
}

export interface ImageReadinessOptions {
  expectedSourcePath: string;
  label: string;
  networkEvents?: () => readonly ImageNetworkEvent[];
  timeout?: number;
}

function isLocalhostE2EOrigin(origin: string) {
  return origin === "http://127.0.0.1:3000" || origin === "http://localhost:3000";
}

function isApprovedRemoteImageUrl(value: string | null): boolean {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return (
      url.origin === APPROVED_IMAGE_ORIGIN &&
      url.pathname.startsWith(APPROVED_IMAGE_PATH_PREFIX)
    );
  } catch {
    return false;
  }
}

function isApprovedNextImageProxyUrl(value: string): boolean {
  try {
    const url = new URL(value);
    if (
      url.origin !== "http://127.0.0.1:3000" ||
      url.pathname !== "/_next/image"
    ) {
      return false;
    }

    return isApprovedRemoteImageUrl(url.searchParams.get("url"));
  } catch {
    return false;
  }
}

export function isExactLocalImageUrl(value: string, expectedPath: string): boolean {
  try {
    const url = new URL(value, "http://127.0.0.1:3000");
    if (!isLocalhostE2EOrigin(url.origin)) {
      return false;
    }

    if (url.pathname === expectedPath) {
      return true;
    }

    return (
      url.pathname === "/_next/image" &&
      url.searchParams.get("url") === expectedPath
    );
  } catch {
    return false;
  }
}

function isApprovedStoreLoungeImageUrl(value: string) {
  return isExactLocalImageUrl(value, STORE_LOUNGE_E2E_IMAGE_PATH);
}

export const test = base.extend({
  page: async ({ page }, runPage) => {
    await page.route("**/*", async (route) => {
      const request = route.request();
      const url = request.url();

      if (
        request.resourceType() === "image" &&
        (isApprovedRemoteImageUrl(url) ||
          isApprovedNextImageProxyUrl(url) ||
          isApprovedStoreLoungeImageUrl(url))
      ) {
        await route.fulfill({
          body: APPROVED_IMAGE_FIXTURE,
          contentType: "image/svg+xml",
          headers: {
            "cache-control": "public, max-age=31536000, immutable",
          },
          status: 200,
        });
        return;
      }

      await route.continue();
    });

    await runPage(page);
  },
});

export { expect };
export type { Locator, Page };

export interface CarouselReadinessOptions {
  activeCardName: string;
  label: string;
  minOverlapPx?: number;
  viewportSelector: string;
}

export interface CarouselReadinessMetrics {
  activeCard: {
    bottom: number;
    height: number;
    label: string | null;
    left: number;
    right: number;
    top: number;
    width: number;
  };
  centerDelta: number;
  clientWidth: number;
  overlapHeight: number;
  overlapWidth: number;
  scrollLeft: number;
  scrollWidth: number;
  viewport: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  };
}

export function activeCarouselCard(viewport: Locator, name: string) {
  return viewport
    .getByRole("article", { name })
    .and(viewport.locator('[aria-current="true"]'));
}

export function trackImageNetworkEvents(
  page: Page,
  expectedSourcePath: string,
) {
  const events: ImageNetworkEvent[] = [];
  const matchesExpectedImage = (url: string) =>
    isExactLocalImageUrl(url, expectedSourcePath);

  page.on("request", (request) => {
    const url = request.url();
    if (!matchesExpectedImage(url)) {
      return;
    }

    events.push({
      resourceType: request.resourceType(),
      type: "request",
      url,
    });
  });

  page.on("response", (response) => {
    const url = response.url();
    if (!matchesExpectedImage(url)) {
      return;
    }

    events.push({
      contentType: response.headers()["content-type"] ?? null,
      resourceType: response.request().resourceType(),
      status: response.status(),
      type: "response",
      url,
    });
  });

  page.on("requestfailed", (request) => {
    const url = request.url();
    if (!matchesExpectedImage(url)) {
      return;
    }

    events.push({
      failureText: request.failure()?.errorText ?? null,
      resourceType: request.resourceType(),
      type: "requestfailed",
      url,
    });
  });

  return () => [...events];
}

export async function expectImageReady(
  locator: Locator,
  {
    expectedSourcePath,
    label,
    networkEvents,
    timeout = 15_000,
  }: ImageReadinessOptions,
): Promise<ImageReadinessMetrics> {
  await expect(locator, label).toBeVisible();

  let lastMetrics: ImageReadinessMetrics | null = null;
  try {
    await expect
      .poll(
        async () => {
          lastMetrics = await locator.evaluate((img, expectedPath) => {
            if (!(img instanceof HTMLImageElement)) {
              throw new Error("Target element is not an HTMLImageElement");
            }

            const rect = img.getBoundingClientRect();
            const currentUrl = new URL(img.currentSrc || img.src, location.href);
            const sourcePath =
              currentUrl.pathname === "/_next/image"
                ? currentUrl.searchParams.get("url")
                : currentUrl.pathname;
            const expectedSourceMatched = sourcePath === expectedPath;

            return {
              boundingBox: {
                height: rect.height,
                width: rect.width,
                x: rect.x,
                y: rect.y,
              },
              complete: img.complete,
              currentSrc: img.currentSrc,
              expectedSourceMatched,
              loading: img.loading,
              naturalHeight: img.naturalHeight,
              naturalWidth: img.naturalWidth,
              nextImageUrlParam:
                currentUrl.pathname === "/_next/image"
                  ? currentUrl.searchParams.get("url")
                  : null,
              src: img.getAttribute("src"),
              usesNextImage: currentUrl.pathname === "/_next/image",
            } satisfies ImageReadinessMetrics;
          }, expectedSourcePath);

          return (
            lastMetrics.expectedSourceMatched &&
            lastMetrics.complete &&
            lastMetrics.naturalWidth > 0 &&
            lastMetrics.naturalHeight > 0 &&
            lastMetrics.boundingBox.width > 0 &&
            lastMetrics.boundingBox.height > 0
          );
        },
        {
          message: `${label} image has expected source, decoded dimensions, and rendered geometry`,
          timeout,
        },
      )
      .toBe(true);
  } catch (error) {
    throw new Error(
      [
        `${label} image readiness failed`,
        `lastMetrics=${JSON.stringify(lastMetrics, null, 2)}`,
        `networkEvents=${JSON.stringify(networkEvents?.() ?? [], null, 2)}`,
        error instanceof Error ? error.message : String(error),
      ].join("\n"),
    );
  }

  if (!lastMetrics) {
    throw new Error(`${label} image readiness did not collect metrics`);
  }

  return lastMetrics;
}

export async function expectCarouselActiveCardReady(
  page: Page,
  {
    activeCardName,
    label,
    minOverlapPx = 40,
    viewportSelector,
  }: CarouselReadinessOptions,
): Promise<CarouselReadinessMetrics> {
  const viewport = page.locator(viewportSelector);
  await expect(viewport, `${label} viewport`).toBeVisible();

  await expect
    .poll(
      async () =>
        viewport.evaluate(
          (element, options) => {
            if (!(element instanceof HTMLElement)) {
              return null;
            }

            const activeCard = Array.from(
              element.querySelectorAll("article"),
            ).find(
              (card) =>
                card.getAttribute("aria-current") === "true" &&
                card.querySelector("h3")?.textContent?.trim() ===
                  options.activeCardName,
            );

            if (!(activeCard instanceof HTMLElement)) {
              return null;
            }

            const viewportRect = element.getBoundingClientRect();
            const activeRect = activeCard.getBoundingClientRect();
            if (
              viewportRect.width <= 0 ||
              viewportRect.height <= 0 ||
              activeRect.width <= 0 ||
              activeRect.height <= 0
            ) {
              return null;
            }

            const overlapWidth =
              Math.min(activeRect.right, viewportRect.right) -
              Math.max(activeRect.left, viewportRect.left);
            const overlapHeight =
              Math.min(activeRect.bottom, viewportRect.bottom) -
              Math.max(activeRect.top, viewportRect.top);
            if (
              overlapWidth <= options.minOverlapPx ||
              overlapHeight <= options.minOverlapPx
            ) {
              return null;
            }

            const viewportCenter =
              viewportRect.left + element.clientLeft + element.clientWidth / 2;
            const activeCenter = activeRect.left + activeRect.width / 2;

            return {
              activeCard: {
                bottom: activeRect.bottom,
                height: activeRect.height,
                label: activeCard.querySelector("h3")?.textContent?.trim() ?? null,
                left: activeRect.left,
                right: activeRect.right,
                top: activeRect.top,
                width: activeRect.width,
              },
              centerDelta: activeCenter - viewportCenter,
              clientWidth: element.clientWidth,
              overlapHeight,
              overlapWidth,
              scrollLeft: element.scrollLeft,
              scrollWidth: element.scrollWidth,
              viewport: {
                bottom: viewportRect.bottom,
                height: viewportRect.height,
                left: viewportRect.left,
                right: viewportRect.right,
                top: viewportRect.top,
                width: viewportRect.width,
              },
            } satisfies CarouselReadinessMetrics;
          },
          { activeCardName, minOverlapPx },
        ),
      { message: `${label} active card is ready in its viewport` },
    )
    .toBeTruthy();

  const metrics = await viewport.evaluate(
    (element, options) => {
      if (!(element instanceof HTMLElement)) {
        throw new Error(`${options.label} viewport is not an HTMLElement`);
      }

      const activeCard = Array.from(element.querySelectorAll("article")).find(
        (card) =>
          card.getAttribute("aria-current") === "true" &&
          card.querySelector("h3")?.textContent?.trim() ===
            options.activeCardName,
      );

      if (!(activeCard instanceof HTMLElement)) {
        throw new Error(`${options.label} active card was not found`);
      }

      const viewportRect = element.getBoundingClientRect();
      const activeRect = activeCard.getBoundingClientRect();
      const overlapWidth =
        Math.min(activeRect.right, viewportRect.right) -
        Math.max(activeRect.left, viewportRect.left);
      const overlapHeight =
        Math.min(activeRect.bottom, viewportRect.bottom) -
        Math.max(activeRect.top, viewportRect.top);
      const viewportCenter =
        viewportRect.left + element.clientLeft + element.clientWidth / 2;
      const activeCenter = activeRect.left + activeRect.width / 2;

      return {
        activeCard: {
          bottom: activeRect.bottom,
          height: activeRect.height,
          label: activeCard.querySelector("h3")?.textContent?.trim() ?? null,
          left: activeRect.left,
          right: activeRect.right,
          top: activeRect.top,
          width: activeRect.width,
        },
        centerDelta: activeCenter - viewportCenter,
        clientWidth: element.clientWidth,
        overlapHeight,
        overlapWidth,
        scrollLeft: element.scrollLeft,
        scrollWidth: element.scrollWidth,
        viewport: {
          bottom: viewportRect.bottom,
          height: viewportRect.height,
          left: viewportRect.left,
          right: viewportRect.right,
          top: viewportRect.top,
          width: viewportRect.width,
        },
      } satisfies CarouselReadinessMetrics;
    },
    { activeCardName, label },
  );

  expect(
    metrics.overlapWidth,
    `${label} active card horizontal overlap`,
  ).toBeGreaterThan(minOverlapPx);
  expect(
    metrics.overlapHeight,
    `${label} active card vertical overlap`,
  ).toBeGreaterThan(minOverlapPx);

  return metrics;
}

export async function waitForClientClickHandler(
  locator: Locator,
  label: string,
) {
  await expect(locator, label).toBeVisible();
  await expect(locator, label).toBeEnabled();
  await expect
    .poll(
      async () =>
        locator.evaluate((element) => {
          const reactPropsKey = Object.getOwnPropertyNames(element).find((key) =>
            key.startsWith("__reactProps$"),
          );
          const props = reactPropsKey
            ? (element as unknown as Record<string, { onClick?: unknown }>)[
                reactPropsKey
              ]
            : null;

          return typeof props?.onClick === "function";
        }),
      { message: `${label} has hydrated client click handler` },
    )
    .toBe(true);
}

export async function waitForNextPaint(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      }),
  );
}

export async function expectStableBoundingBox(
  page: Page,
  locator: Locator,
  label: string,
) {
  await expect(locator, label).toBeVisible();

  let previousBox: Awaited<ReturnType<Locator["boundingBox"]>> = null;
  let stableBox: Awaited<ReturnType<Locator["boundingBox"]>> = null;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const box = await locator.boundingBox();
    if (box && previousBox) {
      const stable =
        Math.abs(box.x - previousBox.x) <= 0.25 &&
        Math.abs(box.y - previousBox.y) <= 0.25 &&
        Math.abs(box.width - previousBox.width) <= 0.25 &&
        Math.abs(box.height - previousBox.height) <= 0.25;

      if (stable) {
        stableBox = box;
        break;
      }
    }

    previousBox = box;
    await waitForNextPaint(page);
  }

  expect(stableBox, `${label} stable bounding box`).not.toBeNull();
  return stableBox!;
}
