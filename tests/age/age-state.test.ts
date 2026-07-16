import { describe, expect, it } from "vitest";
import {
  isAgeState,
  isPersistedAgeState,
  parseAgeState,
} from "@/lib/age/age-state";
import {
  parseAgeStateCookieValue,
  serializeAgeStateCookie,
} from "@/lib/age/age-cookie";
import { getAgeStateCookieOptions } from "@/lib/security/cookie-options";

describe("age state", () => {
  it("parses known states and rejects unknown values", () => {
    expect(isAgeState("unknown")).toBe(true);
    expect(isAgeState("over21")).toBe(true);
    expect(isAgeState("under21")).toBe(true);
    expect(isAgeState("21")).toBe(false);
    expect(parseAgeState("not-real")).toBe("unknown");
  });

  it("persists only over21 or under21 cookie values", () => {
    expect(isPersistedAgeState("unknown")).toBe(false);
    expect(parseAgeStateCookieValue("over21")).toBe("over21");
    expect(parseAgeStateCookieValue("under21")).toBe("under21");
    expect(parseAgeStateCookieValue("2000-01-01")).toBeNull();
  });

  it("serializes no PII in the age-state cookie", () => {
    const cookie = serializeAgeStateCookie("over21", "production");

    expect(cookie).toContain("velarro_age_state=over21");
    expect(cookie).toContain("SameSite=lax");
    expect(cookie).toContain("Secure");
    expect(cookie).not.toContain("birth");
    expect(cookie).not.toContain("date");
  });

  it("requires HttpOnly age-state cookie options for server persistence", () => {
    expect(getAgeStateCookieOptions("production").httpOnly).toBe(true);
    expect(getAgeStateCookieOptions("development").httpOnly).toBe(true);
  });
});
