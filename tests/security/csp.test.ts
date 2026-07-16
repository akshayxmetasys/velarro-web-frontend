import { describe, expect, it } from "vitest";
import { APPROVED_IMAGE_ORIGIN } from "@/lib/assets/approved-image-hosts";
import { buildContentSecurityPolicy } from "@/lib/security/content-security-policy";

describe("content security policy", () => {
  it("sets anti-framing and object restrictions", () => {
    const csp = buildContentSecurityPolicy({ environment: "production" });

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("base-uri 'self'");
  });

  it("allows only self, data, blob, and the approved Supabase image origin", () => {
    const csp = buildContentSecurityPolicy({ environment: "production" });

    expect(csp).toContain(
      `img-src 'self' data: blob: ${APPROVED_IMAGE_ORIGIN}`,
    );
    expect(csp).not.toContain("figma.com");
    expect(csp).not.toContain("*.supabase.co");
  });

  it("does not allow Google Fonts CDN origins because next/font self-hosts", () => {
    const csp = buildContentSecurityPolicy({ environment: "production" });

    expect(csp).toContain("font-src 'self'");
    expect(csp).not.toContain("fonts.googleapis.com");
    expect(csp).not.toContain("fonts.gstatic.com");
  });

  it("allows dev eval only outside production", () => {
    expect(buildContentSecurityPolicy({ environment: "development" })).toContain(
      "'unsafe-eval'",
    );
    expect(buildContentSecurityPolicy({ environment: "production" })).not.toContain(
      "'unsafe-eval'",
    );
  });
});
