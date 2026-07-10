import { APPROVED_IMAGE_ORIGIN } from "../assets/approved-image-hosts";

export type CspEnvironment = "development" | "production" | "test";

export interface ContentSecurityPolicyOptions {
  environment?: string;
}

const DIRECTIVE_SEPARATOR = "; ";

function normalizeEnvironment(environment: string | undefined): CspEnvironment {
  if (environment === "production" || environment === "test") {
    return environment;
  }

  return "development";
}

function serializeDirective(name: string, values: string[]): string {
  if (values.length === 0) {
    return name;
  }

  return `${name} ${values.join(" ")}`;
}

export function buildContentSecurityPolicy({
  environment,
}: ContentSecurityPolicyOptions = {}): string {
  const normalizedEnvironment = normalizeEnvironment(environment);
  const isDevelopment = normalizedEnvironment === "development";

  const directives = [
    serializeDirective("default-src", ["'self'"]),
    serializeDirective("base-uri", ["'self'"]),
    serializeDirective("object-src", ["'none'"]),
    serializeDirective("frame-ancestors", ["'none'"]),
    serializeDirective("form-action", ["'self'"]),
    serializeDirective("img-src", [
      "'self'",
      "data:",
      "blob:",
      APPROVED_IMAGE_ORIGIN,
    ]),
    serializeDirective("font-src", ["'self'", "https://fonts.gstatic.com"]),
    serializeDirective("style-src", [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
    ]),
    serializeDirective(
      "script-src",
      isDevelopment
        ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
        : ["'self'", "'unsafe-inline'"],
    ),
    serializeDirective(
      "connect-src",
      isDevelopment ? ["'self'", "ws:", "wss:"] : ["'self'"],
    ),
    serializeDirective("frame-src", ["'none'"]),
    serializeDirective("worker-src", ["'self'", "blob:"]),
    serializeDirective("upgrade-insecure-requests", []),
  ];

  return directives.join(DIRECTIVE_SEPARATOR);
}
