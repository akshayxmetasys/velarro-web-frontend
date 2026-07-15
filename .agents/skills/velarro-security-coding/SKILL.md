---
name: velarro-security-coding
description: >-
  Enforces OWASP-style secure coding, CSP/header preservation, secret hygiene,
  safe rendering, cookie/privacy rules, and client/server boundaries while
  building or reviewing Velarro routes, components, forms, modals, drawers,
  cookies, metadata helpers, image integrations, third-party integrations,
  headers, middleware, config files, or any code that touches user input or
  browser security.
---
<!-- codex-skill-mirror: generated-from=.cursor/skills/velarro-security-coding/SKILL.md; do-not-edit -->


# Velarro Security Coding Skill

Apply this skill during Velarro implementation and review. Security is required for every route, page, component, form, modal, drawer, API boundary, metadata helper, image integration, and third-party integration.

## Repository boundary

- Work only in `velarro-web-frontend` on Velarro Estate routes and components.
- Do not invent auth, session, payment, admin, compliance, or security behavior.
- Do not weaken security to satisfy Figma visuals or implementation convenience.
- Report missing approvals as blockers — do not fill gaps with unsafe defaults.

## Project security utilities

Prefer existing helpers before adding new security logic:

| Utility | Path | Use for |
|---------|------|---------|
| Security headers | `lib/security/headers.ts` → `getSecurityHeaders()` | CSP, HSTS, frame protections, permissions policy |
| CSP builder | `lib/security/content-security-policy.ts` → `buildContentSecurityPolicy()` | directive assembly; dev vs production behavior |
| Cookie options | `lib/security/cookie-options.ts` → `getAgeStateCookieOptions()` | age-state cookie flags |
| Age cookie helpers | `lib/age/age-cookie.ts` | parse/serialize `velarro_age_state` |
| Next config wiring | `next.config.ts` | global header application |
| Security tests | `tests/security/`, `tests/e2e/security-headers.spec.ts` | header/CSP/cookie regressions |

Baseline documented in `docs/implementation/modules/M00-hardening/security-discovery.md`.

## Core enforcement rules

### OWASP-style secure coding

Review against OWASP Top 10 and secure-by-default Next.js practices:

- **Injection** — validate and encode user input; no unsanitized HTML/SQL/command construction.
- **Broken access control** — do not trust client-only checks for protected decisions.
- **Cryptographic failures** — no secrets in client bundles; no weak or invented auth/session logic.
- **Insecure design** — no fake payment, admin, compliance, or security gates.
- **Security misconfiguration** — preserve headers/CSP; do not broaden allowlists without approval.
- **Vulnerable components** — third-party scripts/fonts/analytics/embeds require explicit approval.
- **Authentication failures** — do not invent login, session, or token flows without approved backend.
- **Software/data integrity** — no unsafe remote scripts or unverified CDN assets.
- **Logging/monitoring failures** — do not log PII or secrets in client code.
- **SSRF / open redirects** — validate external URLs and redirects; no user-controlled redirect targets without checks.

### Secure headers and CSP preservation

- Headers flow through `getSecurityHeaders()` in `next.config.ts` — do not bypass or duplicate inconsistently.
- CSP changes go through `buildContentSecurityPolicy()` only.
- Production CSP must not add `unsafe-eval`, broad wildcards, or unapproved remote `script-src` / `connect-src` / `img-src` / `font-src` / `frame-src`.
- Keep `default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'`.
- HSTS only when `VELARRO_ENABLE_HSTS=true` on confirmed production HTTPS.
- Do not remove `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, or `Cross-Origin-Opener-Policy`.

### No exposed secrets

- No API keys, tokens, credentials, private URLs, or signing secrets in source, tests, examples, or client bundles.
- Use environment variables server-side only; never expose server secrets via `NEXT_PUBLIC_*` without explicit approval.
- No secrets in git history, `.env.example` placeholders that look real, or committed config files.

### No unsafe third-party scripts or remote domains

- Every third-party script, font, analytics tag, embed, iframe, or remote image domain must be explicitly approved.
- CSP allowlist changes require justification and matching tests.
- Block unapproved CDNs, tracking pixels, chat widgets, payment SDKs, or social embeds.

### No unsafe HTML injection

- Avoid `dangerouslySetInnerHTML` unless output is static/trusted (e.g. `JSON.stringify` for JSON-LD) or explicitly sanitized.
- No raw `innerHTML`, `document.write`, `eval`, or `new Function` with user or external content.
- Sanitize rich text only with an approved library and documented threat model.

### No fake auth/session/payment/admin/security behavior

- Do not implement pretend login, checkout, admin panels, RBAC, MFA, or compliance gates.
- Do not simulate secure sessions with localStorage flags or client-only cookies for protected actions.
- Age gating uses approved age-state values only — not a substitute for real auth.

### Safe cookie behavior

- Age-state cookie: name `velarro_age_state`; allowed values `over21`, `under21` only.
- Never persist `unknown`, DOB, timestamps, names, email, IP, or other PII in cookies.
- Use `getAgeStateCookieOptions()` and `lib/age/age-cookie.ts` helpers.
- `SameSite=lax`, `Path=/`, `Secure=true` in production only.
- Do not add new cookies without documenting purpose, retention, and PII status.

### Client/server boundary awareness

- Treat all client code as attacker-visible.
- Protected decisions (access control, payment, admin, compliance) require server enforcement when implemented.
- Server Components and Route Handlers for sensitive operations; never expose internal APIs or admin paths in client bundles.
- Validate input on the server boundary even when client validation exists.

### Safe external link behavior

- `target="_blank"` links require `rel="noopener noreferrer"` (or `noopener` minimum).
- Do not use `javascript:` URLs.
- User-supplied URLs must be validated; block open redirects.

### Input validation where applicable

- Forms, search, filters, query params, and API payloads need validation and safe defaults.
- Reject unexpected types; encode output in the correct context (HTML, URL, JS).
- File uploads and image sources need allowlist/type checks when introduced.

### No weakening tests or bypassing security checks

- Do not skip, delete, or weaken `tests/security/` or `tests/e2e/security-headers.spec.ts` to pass CI.
- Security foundation changes require matching test updates.
- Do not use `--no-verify`, `@ts-ignore`, or lint disables to hide security regressions.

### No production security relaxation for visual convenience

- Do not disable CSP, headers, or cookie flags to make Figma assets or third-party widgets work faster.
- Request approval and update CSP/tests intentionally instead.

## Hard blocks (must fix before merge)

- Exposed secrets or credentials
- Unsafe CSP relaxations (wildcards, `unsafe-eval` in production, unapproved remote sources)
- Unapproved third-party scripts, fonts, analytics, or embeds
- Unsanitized `dangerouslySetInnerHTML` or raw HTML injection with external/user content
- Client-side-only enforcement of protected decisions
- Fake auth, payment, admin, or compliance logic
- PII or disallowed values in age-state or other cookies
- Bypassed or weakened security tests
- Direct push to main

## Workflow

### When building security-sensitive code

1. Read project baseline: `lib/security/headers.ts`, `lib/security/content-security-policy.ts`, `lib/security/cookie-options.ts`, `next.config.ts`.
2. Use existing helpers; do not inline duplicate header/CSP/cookie logic.
3. Validate and encode user input at boundaries.
4. Add approved third-party domains to CSP only with documented approval.
5. Use safe link attributes for external targets.
6. Add or update security tests when touching foundations.
7. Run security self-check (below) before claiming done.

### When reviewing code

1. Identify in-scope routes, components, config, and integrations from the diff or user prompt.
2. Scan for secrets, CSP/header weakening, unsafe rendering, third-party additions, cookie/PII risks, and fake security behavior.
3. Cross-check changes against project security utilities and tests.
4. Flag hard blocks.
5. Return the required output format below with final `PASS` or `BLOCKED`.

## Required output format

After every security review or pre-completion check, return these eight sections:

```markdown
## 1. Security checklist
- [ ] Repository scope is Velarro Estate only
- [ ] OWASP-relevant risks reviewed for in-scope changes
- [ ] Existing security helpers used (headers, CSP, cookies)
- [ ] No hard-block violations
- [ ] Security tests present or updated when foundations changed
- [ ] No tests or lint rules bypassed for security regressions
- [ ] No production security weakened for visual convenience

## 2. Header/CSP impact
| Control | Status (Preserved / Changed / Weakened / N/A) | Notes |
|---------|-----------------------------------------------|-------|
| Content-Security-Policy | | |
| X-Content-Type-Options | | |
| Referrer-Policy | | |
| Permissions-Policy | | |
| X-Frame-Options / frame-ancestors | | |
| Cross-Origin-Opener-Policy | | |
| Strict-Transport-Security | | |
| New remote allowlist entries | | |

## 3. Secret exposure check
| Check | Status (Pass / Fail / N/A) | Notes |
|-------|---------------------------|-------|
| No API keys or tokens in source | | |
| No credentials in client bundles | | |
| No `NEXT_PUBLIC_*` server secrets | | |
| No real secrets in examples or tests | | |
| No private URLs exposed | | |

## 4. Input and rendering safety check
| Check | Status (Pass / Fail / N/A) | Notes |
|-------|---------------------------|-------|
| User input validated at boundaries | | |
| Output encoded for correct context | | |
| No unsafe `dangerouslySetInnerHTML` | | |
| No `eval` / `new Function` / `document.write` | | |
| No client-only protected decisions | | |
| External links use safe `rel` for `_blank` | | |
| No open redirects or `javascript:` URLs | | |

## 5. Third-party risk check
| Asset / Domain | Approved (Yes / No / Unknown) | CSP impact | Notes |
|----------------|------------------------------|------------|-------|
| | | | |

If none: "No third-party scripts, fonts, analytics, embeds, or remote domains introduced."

## 6. Cookie/privacy check
| Check | Status (Pass / Fail / N/A) | Notes |
|-------|---------------------------|-------|
| Cookies use project helpers | | |
| Age-state values limited to `over21` / `under21` | | |
| No PII in cookies or client storage | | |
| `SameSite`, `Path`, `Secure` correct for environment | | |
| No invented auth/session cookies | | |

## 7. Required fixes
List concrete file-level fixes. Use severity:
- **BLOCKER** — hard-block violation; must fix before merge
- **REQUIRED** — security gap that should be fixed in this PR
- **FOLLOW-UP** — acceptable deferral with explicit reason

If no fixes: "None — security requirements met for in-scope changes."

## 8. Final verdict
**PASS** or **BLOCKED**

One-line rationale. Any hard block or unresolved BLOCKER fix means **BLOCKED**.
```

Mark each checklist item `[x]` or `[ ]` with a brief note when failing.

## Implementation patterns

### Security headers (do not duplicate)

Headers are applied globally in `next.config.ts`. Do not set conflicting headers in individual routes unless explicitly approved and tested.

```typescript
import { getSecurityHeaders } from "./lib/security/headers";

getSecurityHeaders({
  environment: process.env.NODE_ENV,
  enableStrictTransportSecurity: process.env.VELARRO_ENABLE_HSTS === "true",
});
```

### CSP changes

```typescript
import { buildContentSecurityPolicy } from "@/lib/security/content-security-policy";

// Extend only through the shared builder; add tests in tests/security/csp.test.ts
buildContentSecurityPolicy({ environment: "production" });
```

### Safe JSON-LD (approved dangerouslySetInnerHTML use)

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

`schema` must come from trusted builders (`lib/seo/schema.ts`), never user input.

### Age-state cookie

```typescript
import { serializeAgeStateCookie } from "@/lib/age/age-cookie";

// Only "over21" or "under21" — never PII
document.cookie = serializeAgeStateCookie("over21", process.env.NODE_ENV);
```

### External links

```tsx
<a href={approvedUrl} target="_blank" rel="noopener noreferrer">
  External resource
</a>
```

## Coordination with other agents

- **velarro-security-auditor** — use for PR-level or pre-merge PASS/BLOCKED audits; readonly subagent.
- This skill — apply during active coding and component-level review; produce the eight-section checklist output.

## Additional reference

For OWASP mapping details, CSP allowlist rules, and cookie policy specifics, see [security-reference.md](security-reference.md).
