# M09 Membership — Implementation Notes

## Route and branch

- Route: `/membership`
- Module: `M09-membership` (route-manifest module remains `M09-engagement`)
- Branch: `feature/m09-membership-fidelity`
- Baseline: `8d99c7df128ec23f78ceea4c829b739b01268f4f`
- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Full frame: `15008:38309` — `home/membership`
- Verified frame size (MCP screenshot metadata): **1440 × 3184**

## Inspected Figma nodes

| Section | Node ID |
| --- | --- |
| Full page | `15008:38309` |
| Tier section / container | `15008:38310` / `15008:38311` |
| House group / emblem | `15008:38392` / `15008:38411` |
| Reserve group / emblem | `15008:38312` / `15008:38331` |
| Estate group / emblem | `15008:38332` / `15008:38351` |
| Atelier group / emblem | `15008:38352` / `15008:38371` |
| Private Circle group / emblem | `15008:38372` / `15008:38391` |
| Breadcrumb | `15087:39647` |
| Benefits section / title / table | `15008:38412` / `15008:38413` / `15008:38417` |
| Table heading / emblems | `15008:38418`, `15008:38424`–`15008:38436` |
| Benefit rows | `15008:38438` |
| CTA section / background / copy / control / logo | `15008:38590`–`15008:38595` |
| Navbar / footer references | `15640:23662` / `15008:38600` |

## Permanent assets (V-09a)

All six Membership-specific images are permanent local PNGs under `public/images/m09-membership/`. Table headers reuse the same five emblem paths (no duplicate files).

| Asset | Source node | Path | Content-Type | Signature | Natural size | Crop notes |
| --- | --- | --- | --- | --- | --- | --- |
| House emblem | `15008:38411` | `/images/m09-membership/house-emblem.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` | 1024×1536 | Card absolute crop `151.59% / 130.05% / -23.97% / -12.3%`; top `82px`; height `205px` |
| Reserve emblem | `15008:38331` | `/images/m09-membership/reserve-emblem.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` | 683×1024 | `object-cover` + `50% 100%` (Figma `object-bottom`); top `81px`; height `206px` |
| Estate emblem | `15008:38351` | `/images/m09-membership/estate-emblem.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` | 1024×1536 | Card absolute crop `146.89% / 128.84% / -23.85% / -10.44%`; top `78px` |
| Atelier emblem | `15008:38371` | `/images/m09-membership/atelier-emblem.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` | 1024×1536 | Card absolute crop `138.77% / 125.91% / -19.15% / -9.3%`; top `81px` |
| Private Circle emblem | `15008:38391` | `/images/m09-membership/private-circle-emblem.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` | 1024×1536 | Card absolute crop `134.23% / 125.28% / -16.78% / -8.92%`; top `81px` |
| CTA banner | `15008:38591` | `/images/m09-membership/membership-cta-banner.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` | 2172×724 | `object-cover` `50% 50%` |

CTA right-side brand uses the existing approved navbar logo export (`M01_HOME_APPROVED_IMAGES.navbarLogoScript`) because OneSignature is unavailable. The large gold V on the CTA right is part of the banner raster.

## Desktop geometry

- Tier section: ~1440 wide, section background, `32px` top, `38px` desktop horizontal padding, `12px` radius
- Cards: `248 × 624`, `8px` gap, five in one row (~1272 total)
- Top panel `222px`; content card `418px` from `y=206`
- Emblem frame `124 × 205–206`
- Breadcrumb max `1328px` — Home | Membership
- Benefits panel ~`1350px`, radius `12px`, padding `40 × 24`
- Benefits comparison table: fixed layout with one `286px` BENEFITS description column and five equal-width tier columns (`table-fixed` + `<colgroup>`); emblems and check/minus cells share those column centers
- CTA panel `1328 × 339`, radius `24px`
- Production spelling retained: `TIER BENEFITS COMPARISON`, `BENEFITS`, `ATELIER`, `Explore the full Velarro collection`, `Invitation-Only Events`
- Shared navbar and footer reused without modification

### Benefits-table equal-column correction

Root cause: auto table layout sized the final tier column from the wider `PRIVATE CIRCLE` label, widening Atelier → Private Circle spacing.

Correction (preserved as approved): `table-fixed` + `<colgroup>` (286px BENEFITS col + five equal-share tier cols); labels `whitespace-nowrap` so Private Circle stays one line and centered. Measured emblem center-to-center gaps at 1440px ≈ **196.8px** each (spread ≈ 0.02px).

## Route policy

- `public: true`, `indexable: false`, `audience: review`
- Not age-gated: unknown / under21 / over21 all render `MembershipPage`
- No `AgeGate`, `Under21HomeShell`, redirect, or auth
- CTA: unknown + over21 → `/the-estate`; under21 → disabled accessible control

## Overflow contract (preserved)

- `MembershipDocumentOverflowLock` remains
- Bounded `overflow-x-auto` regions for tiers and benefits
- `role="region"`, `tabIndex={0}`, helper copy, `data-membership-scroll-region`
- Document must not horizontally scroll; regions may scroll internally

## Static / security

No membership enrollment, account state, spend calculation, API/fetch, storage, cookies, analytics, or payment behavior.

## Accessibility

- One main landmark; five tier articles; semantic benefits table with caption and scopes
- Emblems decorative (`alt=""`) with accessible tier names on articles / column headers
- Included/unavailable via icon + visually hidden text
- Age-aware CTA states announced
- Keyboard-accessible bounded scroll regions; breadcrumb semantics; visible focus

## Responsive

Engineering-derived: no mobile/tablet Figma frames. Required viewports 320–1440 with document containment and bounded region scrolling.

## Known differences

- Gotham and OneSignature unavailable (FONT-BLOCKED)
- Shared production footer geometry may differ from Figma footer
- CTA brand mark uses approved logo image fallback rather than OneSignature text layers
- Responsive layout is engineering-derived

## Visual approval

Approved V-09a Membership fidelity at 1440px.

## Evidence

`%TEMP%\velarro-v09a-membership-evidence\`

## Cursor guard findings (V-09a finalize prep)

Guard heuristics emit LOW `observability.review` / `testing.review` for substantial production diffs. Resolution below is evidence-based; inventing OpenTelemetry spans or production `console.log` would violate repository security and coding rules.

### Observability — justified N/A until approved client telemetry exists

Repo evidence (unchanged by V-09a):

- `package.json` has no OpenTelemetry, Sentry, analytics, or structured logger dependency.
- Audit finding `FE-016` (`docs/audits/frontend-findings.json`): no approved third-party telemetry; production CSP `connect-src` is `'self'` only.
- `docs/audits/frontend-stack-matrix.md`: Observability = **Gap — add when approved**.
- Project rules forbid production `console.log` / debug prints and forbid logging PII.
- Membership remains static informational UI: no enrollment, API/fetch, storage, cookies, analytics, or payment (`## Static / security` above).

| Path | Operation boundary? | Decision |
|------|---------------------|----------|
| `membership-assets.ts` | No — static asset registry / path constants. | **N/A** — not a network, auth, or persistence boundary. |
| `membership-data.ts` | No — static copy, tier, and matrix constants. | **N/A** |
| `membership-tier-card.tsx` | No — presentational tier card + local emblem image. | **N/A** |
| `membership-cta.tsx` | No — static CTA panel; age-aware link/button only navigates to `/the-estate` or is disabled. | **N/A** — no outbound telemetry-worthy side effect. |
| `membership-benefits-table.tsx` | No — static comparison markup + bounded scroll region. | **N/A** |
| `membership-page.tsx` | No — presentational page assembly / layout clip. | **N/A** |

Wire spans/metrics/logs only when an approved telemetry sink + CSP allowlist land.

### Testing — resolved with repository tests

| Path | Coverage evidence |
|------|-------------------|
| `membership-assets.ts` | `tests/m09-membership/membership-page.test.tsx` (permanent PNG existence, signature, status, paths); `tests/assets/approved-image-hosts.test.ts` (Membership local-path allowlist); E2E emblem/CTA `src` assertions |
| `membership-data.ts` | Page + benefits unit tests assert tier order, benefit rows, corrected spelling, CTA copy; E2E matrix + geometry |
| `membership-tier-card.tsx` | Page unit tests assert five cards, emblem testIds/paths; E2E card geometry `248×624`, emblem `124×205–206` |
| `membership-cta.tsx` | Page unit tests assert CTA banner permanent asset + age-aware CTA link/disabled states; E2E CTA panel geometry + banner load |
| `membership-benefits-table.tsx` | **Resolved:** `tests/m09-membership/membership-benefits-table.test.tsx` (semantic headers/caption, `table-fixed` + `colgroup` with 286px BENEFITS col + five tier cols, permanent header emblems, availability matrix + SR labels); page tests for header emblem reuse; `membership-overflow.test.tsx` + E2E benefits matrix / scroll regions |
| `membership-page.tsx` | `tests/m09-membership/membership-page.test.tsx`; `tests/m09-membership/membership-overflow.test.tsx`; `tests/e2e/m09-membership.spec.ts` (4 tests) |

## Validation (V-09a)

Finalization gates (executed before commit):

| Gate | Result |
|------|--------|
| Formatter | No `format` script in `package.json` |
| `npm run cursor:check` | Pass |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run test` | **64** files / **422** tests pass |
| `npm run build` | Pass |
| Security unit (`tests/security`) | **6/6** pass |
| E2E inventory | **50** tests in **20** files |
| `npm run test:e2e` | **50/50** pass |

Prohibited-pattern / Figma MCP URL / deferred Membership artwork scans: clean. Backend/storage/analytics scan: only pre-existing age cookie read and “Secure Checkout” benefit copy (not enrollment/payment). Shared navbar/footer/globals/package files: unchanged.
