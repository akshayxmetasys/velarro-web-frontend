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

export const test = base.extend({
  page: async ({ page }, runPage) => {
    await page.route("**/*", async (route) => {
      const request = route.request();
      const url = request.url();

      if (
        request.resourceType() === "image" &&
        (isApprovedRemoteImageUrl(url) || isApprovedNextImageProxyUrl(url))
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
