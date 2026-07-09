import { describe, expect, it } from "vitest";
import { buildContentSecurityPolicy } from "@/lib/security/content-security-policy";

describe("content security policy", () => {
  it("sets anti-framing and object restrictions", () => {
    const csp = buildContentSecurityPolicy({ environment: "production" });

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("base-uri 'self'");
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
