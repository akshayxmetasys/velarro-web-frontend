import { describe, expect, it } from "vitest";
import {
  isExactLocalImageUrl,
  STORE_LOUNGE_E2E_IMAGE_PATH,
} from "@/tests/e2e/support/e2e-test";

describe("E2E image URL matching", () => {
  it("matches the exact approved local Store/Lounge image path", () => {
    expect(
      isExactLocalImageUrl(
        `http://127.0.0.1:3000${STORE_LOUNGE_E2E_IMAGE_PATH}`,
        STORE_LOUNGE_E2E_IMAGE_PATH,
      ),
    ).toBe(true);
    expect(
      isExactLocalImageUrl(
        `http://127.0.0.1:3000/_next/image?url=${encodeURIComponent(STORE_LOUNGE_E2E_IMAGE_PATH)}&w=3840&q=75`,
        STORE_LOUNGE_E2E_IMAGE_PATH,
      ),
    ).toBe(true);
  });

  it("rejects broader local image paths and remote URLs", () => {
    expect(
      isExactLocalImageUrl(
        "http://127.0.0.1:3000/images/m01-home/other.png",
        STORE_LOUNGE_E2E_IMAGE_PATH,
      ),
    ).toBe(false);
    expect(
      isExactLocalImageUrl(
        "http://127.0.0.1:3000/_next/image?url=%2Fimages%2Fm01-home%2Fother.png&w=3840&q=75",
        STORE_LOUNGE_E2E_IMAGE_PATH,
      ),
    ).toBe(false);
    expect(
      isExactLocalImageUrl(
        "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/example.webp",
        STORE_LOUNGE_E2E_IMAGE_PATH,
      ),
    ).toBe(false);
  });
});
