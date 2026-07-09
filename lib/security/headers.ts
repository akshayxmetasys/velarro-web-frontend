import { buildContentSecurityPolicy } from "./content-security-policy";

export interface SecurityHeader {
  key: string;
  value: string;
}

export interface SecurityHeadersOptions {
  environment?: string;
  enableStrictTransportSecurity?: boolean;
}

export const PERMISSIONS_POLICY = [
  "camera=()",
  "microphone=()",
  "geolocation=()",
  "accelerometer=()",
  "gyroscope=()",
  "usb=()",
  "payment=()",
].join(", ");

export function getSecurityHeaders({
  environment,
  enableStrictTransportSecurity = false,
}: SecurityHeadersOptions = {}): SecurityHeader[] {
  const headers: SecurityHeader[] = [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy({ environment }),
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: PERMISSIONS_POLICY,
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin",
    },
  ];

  if (environment === "production" && enableStrictTransportSecurity) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}
