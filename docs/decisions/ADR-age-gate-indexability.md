# ADR: Age-gate indexability for `/`

Status: **Proposed — awaiting product/legal decision**  
Date: 2026-07-15  
Related finding: F-003

## Context

`/` is the only route currently marked `indexable: true` in `lib/seo/route-manifest.ts` and therefore the only URL emitted by `app/sitemap.ts`. The homepage is also age-gated: anonymous visitors (no `velarro_age_state` cookie) receive the AgeGate UI via `HomePageByAgeState` / `AgeAccessBoundary`.

## Current technical behavior

| Actor | Cookie | HTML received | Metadata |
| --- | --- | --- | --- |
| Anonymous browser | absent → `unknown` | AgeGate SSR (`Age Verification Required`) | Page metadata from `app/page.tsx` via `buildPageMetadata({ path: "/", indexable: true })` including canonical `https://velarroestate.com` |
| Confirmed over-21 | `over21` | Full over-21 homepage | Same `/` metadata |
| Confirmed under-21 | `under21` | Under-21 shell (roastery) | Same `/` metadata |
| Typical crawler | no age cookie | Same as anonymous: AgeGate HTML | Indexable robots + sitemap entry for `/` |

Evidence:

- `lib/age/get-initial-age-state.ts` defaults missing/invalid cookies to `unknown`.
- `getRouteAccess("/", "unknown")` returns `gate`.
- `components/age/age-access-boundary.tsx` renders `AgeGate` for `gate`.
- No user-agent sniffing or crawler bypass exists (by design).

## SEO implications

- Search engines that crawl `/` without cookies will index AgeGate copy, not Collector Series / marketing homepage content.
- Canonical and Open Graph tags now correctly describe the `/` URL, but the visible SSR body for first visits is the gate.
- Changing crawler behavior via user-agent cloaking would create a cloaking risk and is rejected.

## Accessibility implications

- AgeGate is a real `<main id="main-content">` with keyboard-operable native submit controls.
- Skip link targets that landmark for all age states.

## Compliance considerations (require product/legal)

- Whether an indexable URL may show age-verification chrome to crawlers.
- Whether tobacco-adjacent gate copy is acceptable in search snippets.
- Whether `/` should remain indexable while gated, or become `noindex` until a non-tobacco brand landing is approved.

## Viable options

1. **Keep current behavior** — indexable `/` + AgeGate for unknown; accept gate snippets in SERPs.
2. **`noindex` `/` until post-gate content strategy** — remove from sitemap; keep gate for humans.
3. **Approved non-tobacco brand landing for unknown** — still no tobacco catalog; requires approved copy/design and legal review.
4. **Separate brand URL** — e.g. marketing microsite; out of current frontend scope.

## Tradeoffs

| Option | Pros | Cons |
| --- | --- | --- |
| 1 | Simple; honest SSR | Weak brand SERP presence |
| 2 | Avoids gate-in-SERP | Loses organic discovery of `/` |
| 3 | Better discovery without tobacco leakage | Needs approved content |
| 4 | Clean separation | New product surface |

## Recommended engineering option

Until product/legal decides: **keep option 1 technically**, with accurate metadata (done), no crawler bypass (done), and this ADR documenting the external decision boundary.

Do **not** implement user-agent-specific HTML.

## Decision required

Product + legal must choose option 1, 2, 3, or 4 and record the decision here. Engineering will implement only after that explicit approval and any required Figma/copy assets.
