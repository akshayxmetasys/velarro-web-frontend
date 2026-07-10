"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { PersistedAgeState } from "@/lib/age/age-state";
import { AGE_STATE_COOKIE_NAME } from "@/lib/security/cookie-options";
import { getAgeStateCookieOptions } from "@/lib/security/cookie-options";

export async function confirmAgeStateAction(
  ageState: PersistedAgeState,
): Promise<void> {
  const cookieStore = await cookies();
  const options = getAgeStateCookieOptions(process.env.NODE_ENV);

  cookieStore.set(AGE_STATE_COOKIE_NAME, ageState, {
    maxAge: options.maxAge,
    path: options.path,
    sameSite: options.sameSite,
    secure: options.secure,
    httpOnly: options.httpOnly,
  });

  revalidatePath("/");
}
