# M09 Membership — Implementation Notes

## Route and branch

- Route: `/membership`
- Branch: `feature/m09-membership-page`
- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Full frame: `15008:38309` — `home/membership`

## Figma section node IDs

| Section | Node ID |
| --- | --- |
| Full page | `15008:38309` |
| Tier section | `15008:38310` |
| Tier container | `15008:38311` |
| House group / emblem | `15008:38392` / `15008:38411` |
| Reserve group / emblem | `15008:38312` / `15008:38331` |
| Estate group / emblem | `15008:38332` / `15008:38351` |
| Atelier group / emblem | `15008:38352` / `15008:38371` |
| Private Circle group / emblem | `15008:38372` / `15008:38391` |
| Breadcrumb | `15087:39647` |
| Benefits section / title / table | `15008:38412` / `15008:38413` / `15008:38417` |
| CTA section / background | `15008:38590` / `15008:38591` |

## Desktop measurements

- Frame: approximately `1440 × 3184`
- Tier section: approximately `1440 × 625`
- Tier container: approximately `1272px` wide
- Cards: `248 × 624`, `8px` gap, five in one row
- Deferred emblem area: `124 × 206` within `222px` top panel
- Benefits panel: approximately `1350px` centered
- CTA: approximately `1328 × 339`, `24px` radius

## Route policy

- `public: true`
- `indexable: false`
- `audience: review`
- Not age-gated on `/membership`
- Unknown, under-21, and over-21 visitors all render the full Membership page
- No `AgeGate`, blocked page, or restricted-access shell on `/membership`
- Broader tobacco route policy unchanged

## Five-tier inventory

1. **House** — Your entry into the estate — Account created. Your journey begins. — `$0` / Entry
2. **Reserve** — Your relationship begins — First purchase completed. Welcome to Velarro Reserve. — `$1 – $499` / Lifetime spend
3. **Estate** — Estate membership granted — Unlock early access to limited releases and priority privileges. — `$500 – $2,499` / Lifetime spend
4. **Atelier** — A curated circle of collectors — Extended access. Reserved for a select few. — `$2,500 – $9,999` / Lifetime spend
5. **Private** (`Velarro Private Circle`) — By invitation only — Private allocations and ultra-limited access. — `$10,000+` / Lifetime spend

## Benefits matrix

Nine benefit rows across House, Reserve, Estate, Atelier, and Private Circle with the approved availability matrix implemented in `membership-data.ts`.

## Semantic table strategy

- `<table>`, `<caption>`, `<thead>`, `<tbody>`, `scope="col"`, `scope="row"`
- Included/unavailable communicated with icon plus visually hidden text
- Contained horizontal scroll on smaller viewports

## Deferred asset slots (Vishnu-approved)

All six Membership-specific images are deferred with `url: null`, `status: "deferred"`, and no substitute imagery.

| Slot | Figma node |
| --- | --- |
| `membership_tier_house` | `15008:38411` |
| `membership_tier_reserve` | `15008:38331` |
| `membership_tier_estate` | `15008:38351` |
| `membership_tier_atelier` | `15008:38371` |
| `membership_tier_private_circle` | `15008:38391` |
| `membership_cta_banner` | `15008:38591` |

## CTA age-state behavior

- Over-21 and unknown: link to `/the-estate` (established gate occurs on destination for unknown)
- Under-21: disabled accessible control; does not enter blocked Estate route

## Corrected Figma spelling/grammar

- `TIER BENEFITS COMPARISON`
- `BENEFITS`
- `ATELIER`
- `Explore the full Velarro collection`
- `Invitation-Only Events`

## Static informational behavior

No membership enrollment, account state, spend calculation, backend calls, browser storage, cookies, analytics, or payment behavior.

## Validation

- `npm run test -- tests/m09-membership` — 18 passed
- `npm run test -- tests/m01-home/main-navbar.test.tsx` — passed
- `npm run test -- tests/routes/route-access.test.ts` — passed
- `npm run test -- tests/seo/route-manifest.test.ts` — passed
- `npm run lint` — passed (0 errors)
- `npm run test` — 297 passed (48 files)
- `npm run build` — passed (`/membership` dynamic route)
- `npm run test:e2e -- --list` — 6 tests discovered
- `npx playwright test tests/e2e/m09-membership.spec.ts --project=chromium` — passed

## Reviewer sign-off

| Reviewer | Verdict | Notes |
| --- | --- | --- |
| [Security Auditor](59e7fe2b-2905-45e6-8a49-e1f66c4daafa) | PASS | No secrets, storage, fetch, or CSP changes; under-21 CTA blocks Estate navigation |
| [Visibility Architect](c9f40377-1ba2-4552-82d9-a930e439c7b2) | PASS (review/noindex) | Add `h1`, normalize headings, and set `indexable: true` only at launch |
| [Implementation Reviewer](0aab6ea6-4341-489b-82f2-4afbebd3e77e) | Functional pass | Procedural blockers (validation + visibility) resolved on this branch |
| [Figma Extractor](1ac9f662-5d5f-468b-a1af-cc610a6657a1) | Structurally sound | Tier cards strong; benefits table emblems, sparkle separators, and CTA branding are open gaps |
| [QA Gatekeeper](4a5f22c1-9eb0-4b5a-8699-dff626fb8718) | Visual gate READY | Technical validation pass; PR blocked until visual sign-off + commit |

## Post-approval test hardening (optional, before PR)

- Assert all tier subtitles, descriptions, and threshold ranges
- Extend E2E for all nine benefit rows, CTA body, and cookie-based age states
- Add responsive overflow checks at 768px / 390px

## Figma fidelity gaps (deferred artwork excluded)

- Benefits table header emblems (`15008:38424`–`38436`, 62×90) not rendered
- Tier-card sparkle separators not rendered
- CTA right-side “Velarro Estate / SINCE 1919” branding not rendered
- Minor spacing/typography deltas in benefits title and table row rhythm

## Open questions for Vishnu

1. Should benefits-table header emblems wait for the same six approved assets, or render deferred 62×90 slots now?
2. Is the tier-card sparkle separator required for visual approval?
3. Is CTA right-side branding required now, or deferred with the banner image?
4. Confirm copy authority: grammar/casing fixes vs literal Figma strings

## Visual review

- Localhost: `http://localhost:3000/membership`
- Viewport: `1440 × 900`
- Temporary screenshot: `test-results/m09-membership-1440-review.png` (not committed)

## Known visual differences

All tier emblems and the CTA banner are intentionally deferred neutral surfaces until approved production artwork is supplied.
