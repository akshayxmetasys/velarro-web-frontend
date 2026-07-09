# M00 Hardening - Security Foundation

Status: PR-1 implementation note
Last updated: 2026-07-09

## Scope

PR-1 adds security and discovery foundations only. It does not implement PR-2 age-gate visuals, the over-21 homepage, under-21 visual pages, product pages, or full marketing pages.

## Implemented Security Policy

Security headers are generated from `lib/security/headers.ts` and wired through `next.config.ts`.

Headers:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone, geolocation, accelerometer, gyroscope, USB, and payment
- `X-Frame-Options: DENY`
- `Cross-Origin-Opener-Policy: same-origin`
- `Strict-Transport-Security` only when production HTTPS deployment explicitly enables `VELARRO_ENABLE_HSTS=true`

## CSP Behavior

The CSP helper lives in `lib/security/content-security-policy.ts`.

- Development allows `unsafe-eval` for local tooling.
- Production removes `unsafe-eval`.
- Both environments restrict `default-src` to self, block object/embed usage, block framing through `frame-ancestors 'none'`, and keep `form-action` on self.
- The policy is intentionally conservative and can be tightened with nonces once production rendering requirements are known.

## Age-State Cookie Policy

The age-state cookie helper lives in `lib/security/cookie-options.ts` and `lib/age/age-cookie.ts`.

- Cookie name: `velarro_age_state`
- Allowed persisted values: `over21`, `under21`
- Not persisted: `unknown`
- No date of birth, timestamp, name, email, IP address, or other PII
- `SameSite=lax`
- `Path=/`
- `Secure=true` only in production
- Client-readable for PR-1 foundation; product/security can decide whether a future server-only implementation is required

## Remaining Assumptions

- Production HSTS must be enabled only after HTTPS deployment is confirmed.
- CSP may need nonce/hash hardening once final page scripts and analytics requirements exist.
- Payment and geolocation remain disabled until real product requirements are approved.
- Age-state persistence still needs product/legal approval before PR-2 visual flow implementation.
