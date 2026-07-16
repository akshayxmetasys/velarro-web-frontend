# Security Architecture Review

Status: BLOCKED
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata on `13148:15012` returned HTTP 504.
- Source assumptions: review uses `.cursor/agents/velarro-security-auditor.md` and `.cursor/skills/velarro-security-coding`.
- Unresolved blockers: age-state rendering, permanent assets, CSP/domain approvals, crawler behavior, newsletter behavior, footer trust/legal claims, and PR-2 security tests.

## Files Reviewed

- `next.config.ts`
- `lib/security/content-security-policy.ts`
- `lib/security/headers.ts`
- `lib/security/cookie-options.ts`
- `lib/age/age-state.ts`
- `lib/age/age-cookie.ts`
- `lib/age/route-access.ts`
- `app/layout.tsx`
- `app/page.tsx`
- Age acknowledgment uses the server action `confirmAgeStateAction` with an HttpOnly cookie. A former client `AgeStateProvider` path was removed during the frontend audit.
- relevant SEO/security/age tests and PR-0/PR-1 docs.

## Security Controls Present

- Global security headers are wired through `next.config.ts`.
- CSP preserves `default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'`, and `frame-src 'none'`.
- Production removes `unsafe-eval`.
- HSTS is opt-in with `VELARRO_ENABLE_HSTS=true`.
- Age-state cookie only persists `over21` or `under21`, not DOB or PII.
- No analytics, embeds, iframes, or third-party scripts are currently present.

## Security Risks Found

- BLOCKER: `/` must not render over-21 tobacco content before age-state-safe behavior is approved and implemented.
- BLOCKER: product/legal/security approval is required for root route behavior, age-state persistence, under-21 treatment, and crawler/indexing.
- Current starter homepage has external links and starter assets; these must be removed during implementation.
- Remote Figma/product images are not compatible with current CSP or `next.config.ts` unless domains are approved and tested.
- `ImagePlaceholder` must not be used with arbitrary remote/user-controlled URLs for PR-2.
- No PR-2 homepage guard/rendering tests exist yet.

## Security Auditor Update - 2026-07-10

The Velarro Security Auditor returned this split assessment:

- Current source security baseline is preserved: global headers remain wired in `next.config.ts`, CSP is conservative, production excludes `unsafe-eval`, and age-state cookies persist only `over21` or `under21`.
- Planning coverage is security-aware and suitable for asset collection.
- Implementation remains `BLOCKED` until `/` behavior is approved for `unknown`, `over21`, `under21`, crawlers, metadata, schema, and indexability.
- Remote images remain blocked unless permanent local assets are used or exact remote domains are approved with matching CSP, Next image config, and tests.
- Newsletter behavior must be approved as static/deferred or backed by an approved endpoint. No fake form submission or invented backend.
- Footer copy such as `Highest level of Encryption, Security and Trust`, social links, legal links, accessibility control, and `Ascend` require approval before implementation.

## CSP / Header Impact

| Control | Status | Notes |
| --- | --- | --- |
| Content-Security-Policy | Preserved now | Local assets work; remote image domains do not. |
| Image sources | Restricted | `img-src 'self' data: blob:` only. |
| Script sources | Preserved | Do not add third-party scripts or inline runtime scripts. |
| Frame sources | Blocked | No embeds allowed. |
| Fonts | Existing Google font domains | Gotham should be local licensed files if possible. |
| Headers | Preserved | No PR-2 header changes should be needed for local assets. |

## Data / Cookie / Privacy Risks

- `velarro_age_state` is client-readable and client-set; it is an age-attestation UI state, not auth/payment/compliance proof.
- 180-day persistence requires product/legal/security approval.
- Unknown and under-21 visitors must not receive full-resolution blocked tobacco imagery, product JSON-LD, purchase CTAs, cart/checkout links, or over-21 metadata.

## Third-Party / Asset Risks

- No remote image domain is approved.
- No analytics, chat, payment, social embeds, or external scripts are approved.
- Licensed Gotham, Velarro logo/script treatment, favicon, and product photography are pending.
- Temporary Figma asset URLs are hard-blocked for runtime and metadata.
- A third-party accessibility widget, analytics tag, newsletter provider, social embed, payment mark, or external icon CDN would require explicit approval, CSP review, and tests. Local SVG/icon assets are preferred.

## Required Fixes Before Implementation Can Pass

- BLOCKER: gate `/` before over-21 homepage content renders.
- BLOCKER: approve age-state persistence and under-21/crawler behavior.
- REQUIRED: use local permanent assets or approve exact remote domains with CSP/Next tests.
- REQUIRED: add tests for homepage age-state rendering, non-over21 content blocking, metadata behavior, and security header preservation.
- REQUIRED: remove create-next-app external links/assets in implementation.
- REQUIRED: decide newsletter behavior before wiring any form action, endpoint, external provider, or client storage.
- REQUIRED: approve or revise footer trust/security copy before rendering it as a claim.

## Final Verdict

BLOCKED.
