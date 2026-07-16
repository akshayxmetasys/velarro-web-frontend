import { expect, test } from "@playwright/test";

test.describe("security headers", () => {
  test("home route responds with foundation security headers", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();

    expect(response.ok()).toBe(true);
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  });
});
