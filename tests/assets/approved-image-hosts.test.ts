import { describe, expect, it } from "vitest";
import {
  APPROVED_IMAGE_HOST,
  APPROVED_IMAGE_ORIGIN,
  M01_HOME_APPROVED_IMAGES,
  isApprovedImageHost,
  isApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";

describe("approved image hosts", () => {
  it("allows only the approved Supabase host", () => {
    expect(APPROVED_IMAGE_HOST).toBe("lpnrhpvmrnoqkzoxukov.supabase.co");
    expect(APPROVED_IMAGE_ORIGIN).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co",
    );
    expect(isApprovedImageHost(APPROVED_IMAGE_HOST)).toBe(true);
    expect(isApprovedImageHost("figma.com")).toBe(false);
    expect(isApprovedImageHost("*.supabase.co")).toBe(false);
  });

  it("accepts approved M01 homepage image URLs", () => {
    for (const url of Object.values(M01_HOME_APPROVED_IMAGES)) {
      expect(isApprovedImageUrl(url)).toBe(true);
    }

    expect(M01_HOME_APPROVED_IMAGES.giftingBackground).toBe(
      "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/gift-hero-home-20260709-041311-desktop-hero.webp",
    );
  });

  it("rejects temporary Figma URLs and arbitrary remote hosts", () => {
    expect(
      isApprovedImageUrl(
        "https://www.figma.com/api/mcp/asset/f048cea8-d96b-4f82-b56e-5f30a46fca0d",
      ),
    ).toBe(false);
    expect(isApprovedImageUrl("https://example.com/image.webp")).toBe(false);
    expect(isApprovedImageUrl("http://lpnrhpvmrnoqkzoxukov.supabase.co/x")).toBe(
      false,
    );
  });

  it("does not include Figma MCP markers in approved constants", () => {
    const serialized = JSON.stringify(M01_HOME_APPROVED_IMAGES);

    expect(serialized).not.toContain("figma.com");
    expect(serialized).not.toContain("mcp/asset");
  });
});
