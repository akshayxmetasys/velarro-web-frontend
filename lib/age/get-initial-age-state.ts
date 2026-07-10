import { cookies } from "next/headers";
import { parseAgeStateCookieValue } from "@/lib/age/age-cookie";
import { DEFAULT_AGE_STATE, type AgeState } from "@/lib/age/age-state";
import { AGE_STATE_COOKIE_NAME } from "@/lib/security/cookie-options";

export async function getInitialAgeStateFromCookies(): Promise<AgeState> {
  const cookieStore = await cookies();
  const persisted = parseAgeStateCookieValue(
    cookieStore.get(AGE_STATE_COOKIE_NAME)?.value,
  );

  return persisted ?? DEFAULT_AGE_STATE;
}
