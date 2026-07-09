export interface AgeStateCookieOptions {
  httpOnly: boolean;
  maxAge: number;
  path: "/";
  sameSite: "lax";
  secure: boolean;
}

export const AGE_STATE_COOKIE_NAME = "velarro_age_state";

export function getAgeStateCookieOptions(
  environment: string | undefined = process.env.NODE_ENV,
): AgeStateCookieOptions {
  return {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 180,
    path: "/",
    sameSite: "lax",
    secure: environment === "production",
  };
}
