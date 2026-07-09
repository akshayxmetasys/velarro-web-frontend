import { describe, expect, it } from "vitest";
import { getSecurityHeaders, PERMISSIONS_POLICY } from "@/lib/security/headers";
import { getAgeStateCookieOptions } from "@/lib/security/cookie-options";

function headersToRecord(environment = "production") {
  return Object.fromEntries(
    getSecurityHeaders({ environment }).map((header) => [
      header.key,
      header.value,
    ]),
  );
}

describe("security headers", () => {
  it("returns baseline browser hardening headers", () => {
    const headers = headersToRecord();

    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Permissions-Policy"]).toBe(PERMISSIONS_POLICY);
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Cross-Origin-Opener-Policy"]).toBe("same-origin");
  });

  it("keeps HSTS opt-in for production HTTPS deployments", () => {
    expect(headersToRecord()["Strict-Transport-Security"]).toBeUndefined();

    const headers = Object.fromEntries(
      getSecurityHeaders({
        environment: "production",
        enableStrictTransportSecurity: true,
      }).map((header) => [header.key, header.value]),
    );

    expect(headers["Strict-Transport-Security"]).toContain("max-age=63072000");
  });

  it("uses secure age-state cookie settings only in production", () => {
    expect(getAgeStateCookieOptions("development").secure).toBe(false);
    expect(getAgeStateCookieOptions("production").secure).toBe(true);
    expect(getAgeStateCookieOptions("production")).toMatchObject({
      sameSite: "lax",
      path: "/",
    });
  });
});
