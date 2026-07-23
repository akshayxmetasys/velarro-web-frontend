# M08 The Chronicle Implementation Notes

## Figma Source

- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Frame node: `14284:63187`
- Frame name: `home/the chronicle`
- Frame size: `1440 × 3884`
- Implemented route: `/the-chronicle`

## Inspected Nodes

- `14284:63187` — full page
- `14585:38740` — Main Navbar reference
- `14284:63242` — Main Footer reference
- `14284:63192` — hero
- `14284:63193` / `14284:63194` / `14284:63196` / `14284:63197` — hero content
- `14284:63198` / `14284:63199` — breadcrumb
- `13505:52708` — Live News and Events ticker
- `14284:63208` — card stack
- Card/image pairs: `14284:63209`/`14284:63217`, `14284:63218`/`14284:63225`, `14284:63226`/`14284:63233`, `14284:63234`/`14284:63241`

## Section Order (over-21)

1. Shared `MainNavbar` overlay
2. Chronicle hero
3. Breadcrumb
4. Live News and Events ticker
5. Four Chronicle event cards
6. Shared `FooterSection` / `MainFooter`

## Assets

### Hero (approved external)

- URL:
  `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/thechronicle-hero-20260709-023616-desktop-hero.webp`
- Asserted through `assertApprovedImageUrl`
- Crop retained from Figma hero node `14284:63192`:
  - width `99.99%`
  - height `141.04%`
  - left `0`
  - top `-22.29%`
- Intrinsic dimensions: `1440 × 924`
- Overlay: `linear-gradient(0deg, rgba(21,20,20,0.5), rgba(123,117,117,0.5))`
- Not duplicated locally; CSP / Next image / approved-host config unchanged

### Card artwork (deferred — REM-001)

The four previously published local card PNGs were removed because binary
forensics identified C2PA / OpenAI Media Service / `gpt-image` /
`trainedAlgorithmicMedia` markers. `AGENTS.md` prohibits generated, stock,
temporary Figma, or unrelated substitutes for missing production imagery. No
explicit production approval for those binaries was found.

| Card | Figma image node | Asset state | Production URL |
| --- | --- | --- | --- |
| International Cigar Day | `14284:63217` | `deferred` (`chronicle_card_1`) | `null` |
| International Tea Day | `14284:63225` | `deferred` (`chronicle_card_2`) | `null` |
| Founder’s Reserve Month | `14284:63233` | `deferred` (`chronicle_card_3`) | `null` |
| Velarro Estate Day | `14284:63241` | `deferred` (`chronicle_card_4`) | `null` |

- Slots live in `CHRONICLE_CARD_ASSETS` with `status: "deferred"` and `url: null`
- No replacement imagery was invented (no stock, generated, temporary Figma MCP, remote placeholder, data URL, or synthetic gradient “fake art”)
- Card image regions keep intentional design-system surface styling (`bg-background-section` + `border-border-default`) and dimensions: first `534 × 469`; cards 2–4 `534 × 479`
- Screen readers receive a single sr-only deferred-artwork statement per card; the surface itself is decorative (`aria-hidden`)
- Approved replacement imagery remains an owner/design dependency and must pass provenance, optimization, responsive, accessibility, and pre-merge review before production use
- The Chronicle page is **not** claimed pixel-perfect while required card artwork is deferred
- The approved hero remains unchanged

## Card Geometry

- Stack width `1054px`, vertical gap `80px`
- Card padding `40px`, internal gap `80px`, radius `24px`, border default
- Content column `360px`
- Outer heights: first ≈`549px`; later ≈`559px`
- Desktop body region min-heights: `236` / `242` / `264` / `317`

## Deferred Event Detail

- All four controls remain disabled buttons labeled `VIEW EVENT DETAILS`
- Accessible names include deferred scope language
- No `href`, click handlers, modals, or article-detail routes

## Route And Age Contract

- Unknown → `AgeGate`
- Under-21 → `Under21HomeShell`
- Over-21 → `ChroniclePage`
- Metadata remains `noindex`
- Canonical remains `/the-chronicle`
- Route manifest entry unchanged (`age-gated`, `indexable: false`, figma `14284:63187`)

## Overflow

- Removed route-root `overflow-x-hidden`
- No root/main/html/body overflow masking for this page
- Local crop containers may use `overflow-hidden` (hero crop + card image regions)

## Shared Shell

- `MainNavbar` and `FooterSection` reused and untouched
- Figma footer is reference only; production shared footer height may differ

## Responsive Behavior

- Engineering-derived (no verified mobile/tablet Chronicle Figma frames)
- Required viewports: 320, 375, 390, 768, 1024, 1280, 1440
- Cards stack; image follows copy on narrow widths; document must not scroll horizontally

## Known Differences

- Gotham / OneSignature unavailable (FONT-BLOCKED)
- Shared footer height differs from Figma ≈697px footer
- Measured page height after V-08a: `4138px` vs Figma `3884px` (delta `+254px`), within the documented E2E tolerance driven mainly by the locked shared footer and fallback fonts
- Responsive layouts are not claimed as exact Figma matches

## Validation

- `git diff HEAD --check`: pass
- `npm.cmd run cursor:check`: pass
- `npm.cmd run lint`: pass
- `npm.cmd run typecheck`: pass
- Focused unit: chronicle age-state + approved-image-hosts + route-access + seo: pass
- `npm.cmd run build`: pass
- Focused E2E `tests/e2e/m08-chronicle-fidelity.spec.ts`: 4 passed
- Full unit: 417 passed
- E2E list: 43 tests
- Full E2E: 43 passed
- Prohibited-pattern scan on Chronicle tests: no matches
- Production temporary Figma URL scan: no matches

## Cursor Guard Findings (V-08a finalize)

Guard heuristics emitted medium/low policy reviews for temporary evidence helpers and presentational diffs. Resolution below is evidence-based; inventing OpenTelemetry or ad hoc browser console printing would violate repository rules.

### Debug-style output — resolved by removal

Temporary evidence-capture scripts under `%TEMP%` (`velarro-v08a-capture-before.mjs`, `velarro-v08a-capture-after.mjs`) wrote one-shot measurement dumps to the process stdout path. They were never part of the repository and have been deleted. No production Chronicle source contains debug-style output.

### Observability — justified N/A

Repo evidence (unchanged by V-08a):

- `package.json` has no OpenTelemetry, Sentry, analytics, or structured logger dependency.
- Audit finding `FE-016`: no approved third-party telemetry; production CSP `connect-src` is `'self'` only.
- Project rules forbid production ad hoc console printing / debug prints.

| Path | Operation boundary? | Decision |
| --- | --- | --- |
| `components/m08-chronicle/chronicle-assets.ts` | No — static approved hero URL + deferred card slots (`url: null`) | **N/A** |
| `components/m08-chronicle/chronicle-data.ts` | No — static copy/layout data model | **N/A** |
| `components/m08-chronicle/chronicle-page.tsx` | No — presentational page assembly; no network, auth, persistence, or queue boundary | **N/A** |

Wire tracing/metrics only when an approved client telemetry sink and CSP allowlist exist.

### Testing — resolved with repository tests

| Path | Coverage evidence |
| --- | --- |
| `chronicle-assets.ts` | `tests/assets/approved-image-hosts.test.ts` (hero approved URL; card slots deferred with `url: null`; prohibited PNGs absent); `tests/m08-chronicle/chronicle-card-artwork-policy.test.ts` |
| `chronicle-data.ts` | `tests/m08-chronicle/chronicle-page-age-state.test.tsx` (copy, punctuation, deferred artwork, geometry markers, deferred controls) |
| `chronicle-page.tsx` | Same unit suite + `tests/e2e/m08-chronicle-fidelity.spec.ts` (desktop geometry, age states, deferred artwork, disabled controls, viewport containment) |
| Temp `%TEMP%` capture scripts | Not production code; deleted; no tests required |
## REM-001 Cursor Guard Findings

Guard heuristics re-emitted LOW `observability.review` and LOW `testing.review` for the REM-001 deferred-artwork remediation. Resolutions below are evidence-based for this branch.

### Observability — justified N/A (no operation boundary)

These modules remain static asset constants, static copy/layout data, and presentational React assembly. They do not perform network I/O, authz decisions, persistence, queue/job work, or external integrations. Adding tracing/metrics/logging here would invent an unapproved telemetry sink and conflict with CSP `connect-src 'self'` plus the ban on production console/debug prints.

| Path | Guard item | Operation boundary? | Decision |
| --- | --- | --- | --- |
| `chronicle-assets.ts` | LOW observability.review | No — compile-time constants (`CHRONICLE_APPROVED_IMAGES`, `CHRONICLE_CARD_ASSETS` with `url: null`) | **N/A — no telemetry required** |
| `chronicle-data.ts` | LOW observability.review | No — static `CHRONICLE_CARDS` copy/geometry model | **N/A — no telemetry required** |
| `chronicle-page.tsx` | (same boundary analysis) | No — presentational page; hero uses approved Image URL only; card slots render deferred surfaces with no card-image fetch | **N/A — no telemetry required** |

Repo evidence re-checked:

- `package.json` has no OpenTelemetry, Sentry, analytics, or structured logger dependency
- No architecture suite script is present
- No formatter script is present

### Testing — resolved with repository tests

| Path | Guard item | Repository tests covering behavior |
| --- | --- | --- |
| `chronicle-assets.ts` | LOW testing.review | `tests/assets/approved-image-hosts.test.ts`; `tests/m08-chronicle/chronicle-card-artwork-policy.test.ts` |
| `chronicle-data.ts` | LOW testing.review | `tests/m08-chronicle/chronicle-page-age-state.test.tsx` (copy, deferredImageKey, geometry, no card `<img>`) |
| `chronicle-page.tsx` | LOW testing.review | Same age-state units + `tests/e2e/m08-chronicle-fidelity.spec.ts` (deferred regions, age gates, disabled controls, containment, no card-image requests) |

### REM-001 guard-finalize validation (executed)

| Check | Result |
| --- | --- |
| Formatter | Not configured |
| Architecture suite | Not present |
| `npm.cmd run cursor:check` | exit 0 |
| `npm.cmd run lint` | exit 0 |
| `npm.cmd run typecheck` | exit 0 |
| Focused Chronicle units | exit 0 (29 passed) |
| `npm.cmd run test` | exit 0 (425 passed) |
| `npm.cmd run build` | exit 0 |
| `npm.cmd run test:e2e -- --list` | exit 0 (50 tests) |
| Focused Chronicle E2E | exit 0 (4 passed) |
| `npm.cmd run test:e2e` | exit 0 (50 passed) |
| `npm.cmd run test -- tests/security` | exit 0 (6 passed) |
| `npm.cmd audit --omit=dev` | exit 1 (2 moderate postcss via next; no fix applied) |
| `git diff HEAD --check` | exit 0 |

Evidence directory: `%TEMP%\velarro-remediation-m08-chronicle-evidence\guard-finalize\`
