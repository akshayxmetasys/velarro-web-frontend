import { describe, expect, it } from "vitest";
import { APPROVED_IMAGE_HOST } from "@/lib/assets/approved-image-hosts";
import nextConfig from "../../next.config";

describe("next image remotePatterns", () => {
  it("allows the approved Supabase host for public storage images", () => {
    const patterns = nextConfig.images?.remotePatterns ?? [];

    expect(
      patterns.some(
        (pattern) =>
          pattern.protocol === "https" &&
          pattern.hostname === APPROVED_IMAGE_HOST &&
          pattern.pathname === "/storage/v1/object/public/**",
      ),
    ).toBe(true);
  });
});
