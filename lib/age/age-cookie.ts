import {
  AGE_STATE_COOKIE_NAME,
  getAgeStateCookieOptions,
} from "@/lib/security/cookie-options";
import {
  isPersistedAgeState,
  type PersistedAgeState,
} from "@/lib/age/age-state";

export { AGE_STATE_COOKIE_NAME };

export function parseAgeStateCookieValue(value: unknown): PersistedAgeState | null {
  return isPersistedAgeState(value) ? value : null;
}

/**
 * Serializes non-HttpOnly cookie attributes for tests and diagnostics.
 * Production persistence must use `confirmAgeStateAction` / `cookies().set`
 * so `HttpOnly` is applied. Never assign this string via `document.cookie`.
 */
export function serializeAgeStateCookie(
  ageState: PersistedAgeState,
  environment?: string,
): string {
  const options = getAgeStateCookieOptions(environment);
  const parts = [
    `${AGE_STATE_COOKIE_NAME}=${ageState}`,
    `Max-Age=${options.maxAge}`,
    `Path=${options.path}`,
    `SameSite=${options.sameSite}`,
  ];

  if (options.secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function serializeAgeStateCookieClear(): string {
  return `${AGE_STATE_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=lax`;
}
