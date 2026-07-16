# Velarro Security Reference

Supplement for `velarro-security-coding`. Read when reviewing CSP changes, cookies, third-party integrations, or OWASP classification.

## OWASP Top 10 quick mapping

| Risk | Velarro watch areas | Block examples |
|------|---------------------|----------------|
| A01 Broken access control | Age gates, admin routes, protected pages | Client-only `localStorage` auth; hidden admin URLs in client bundles |
| A02 Cryptographic failures | Env vars, tokens, session handling | `NEXT_PUBLIC_STRIPE_SECRET`; invented JWT validation client-side |
| A03 Injection | Forms, search, rich text, URL params | Unsanitized HTML in CMS fields; dynamic `eval` |
| A04 Insecure design | Payment, compliance, age verification | Fake checkout that appears real; DOB stored in cookies |
| A05 Security misconfiguration | `next.config.ts`, headers, CSP | Removing `frame-ancestors`; adding `*` to `script-src` |
| A06 Vulnerable components | npm deps, third-party scripts | Unpinned analytics SDK from unknown CDN |
| A07 Auth failures | Login, session, MFA (when implemented) | Mock login UI that sets `isAdmin=true` in cookie |
| A08 Software/data integrity | Remote scripts, SRI, CDN assets | Loading JS from unapproved domain without integrity hash |
| A09 Logging failures | Client console, error reporting | Logging email, DOB, or tokens in browser |
| A10 SSRF / redirects | External links, redirect routes | Open redirect via `?next=` query param |

## CSP directive reference (current baseline)

From `lib/security/content-security-policy.ts`:

| Directive | Development | Production |
|-----------|-------------|------------|
| `default-src` | `'self'` | `'self'` |
| `script-src` | `'self' 'unsafe-inline' 'unsafe-eval'` | `'self' 'unsafe-inline'` |
| `style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com` | same |
| `font-src` | `'self' https://fonts.gstatic.com` | same |
| `img-src` | `'self' data: blob:` | same |
| `connect-src` | `'self' ws: wss:` | `'self'` |
| `frame-src` | `'none'` | `'none'` |
| `object-src` | `'none'` | `'none'` |
| `frame-ancestors` | `'none'` | `'none'` |
| `form-action` | `'self'` | `'self'` |
| `base-uri` | `'self'` | `'self'` |
| `upgrade-insecure-requests` | enabled | enabled |

### Approved relaxations (require explicit approval + tests)

- Additional `img-src` hosts for production image CDN
- Analytics `script-src` / `connect-src` entries
- Embed `frame-src` for approved video or map providers
- Nonce/hash strategy replacing `'unsafe-inline'` for scripts

### Never approve without security review

- `unsafe-eval` in production
- `*` in any fetch directive
- `data:` in `script-src`
- Broad `https:` without host allowlist

## Age-state cookie contract

| Field | Rule |
|-------|------|
| Name | `velarro_age_state` |
| Allowed values | `over21`, `under21` |
| Not persisted | `unknown` |
| Forbidden in cookie | DOB, timestamp, name, email, IP, device ID, free-text |
| `SameSite` | `lax` |
| `Path` | `/` |
| `Secure` | `true` in production only |
| `httpOnly` | `false` (PR-1 foundation; revisit if server-only required) |
| `Max-Age` | 180 days via `getAgeStateCookieOptions()` |

## Third-party approval checklist

Before adding a third-party asset, confirm:

1. Business/product approval documented
2. Exact domains listed (no blanket `https:`)
3. CSP directives updated in `buildContentSecurityPolicy()`
4. Tests updated in `tests/security/csp.test.ts`
5. Privacy impact noted (tracking, cookies, PII)
6. Fallback when script blocked by CSP

## Secret scan patterns

Search changed files for:

- `api_key`, `apikey`, `secret`, `password`, `token`, `private_key`
- `Bearer `, `sk_live`, `sk_test`, `AKIA` (AWS)
- `NEXT_PUBLIC_` additions carrying sensitive values
- Hardcoded URLs with credentials (`://user:pass@`)
- `.env` files or real-looking placeholders in commits

## Rendering safety matrix

| Pattern | Default | Allowed when |
|---------|---------|--------------|
| `dangerouslySetInnerHTML` | Block | Static JSON-LD from `lib/seo/schema.ts` builders; sanitized HTML with approved sanitizer |
| `innerHTML` | Block | Never for user/external content |
| `eval` / `new Function` | Block | Never in production code |
| `target="_blank"` | Require `rel="noopener noreferrer"` | Always for external targets |
| User HTML in CMS | Block until sanitizer approved | Explicit threat model + tests |

## Security test expectations

| Change type | Expected test update |
|-------------|---------------------|
| CSP directive change | `tests/security/csp.test.ts` |
| Header change | `tests/security/headers.test.ts` |
| Cookie option change | `tests/security/headers.test.ts` (cookie section) |
| Global header wiring | `tests/e2e/security-headers.spec.ts` |
| New third-party domain | CSP unit test asserting host presence |

## Verdict rules

- **BLOCKED** if any hard block is present or any Required fix is unresolved BLOCKER severity
- **PASS** only when in-scope changes meet baseline and no hard blocks remain
- Missing third-party approval → **BLOCKED** if the asset is already integrated; otherwise **REQUIRED** fix before merge
