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

### Card images (permanent local)

Downloaded from Figma MCP raster layers (not screenshots). No temporary Figma URLs remain in production source.

| Card | Figma image node | Local path | Content-Type | Binary | Natural size | Crop (W / L / T / H) |
| --- | --- | --- | --- | --- | --- | --- |
| International Cigar Day | `14284:63217` | `public/images/m08-chronicle/international-cigar-day.png` | `image/png` | PNG `89 50 4E 47` | `2172 × 724` | `263.48%` / `-21.67%` / `0.09%` / `100%` |
| International Tea Day | `14284:63225` | `public/images/m08-chronicle/international-tea-day.png` | `image/png` | PNG `89 50 4E 47` | `2171 × 724` | `268.98%` / `-10.66%` / `0.18%` / `100%` |
| Founder’s Reserve Month | `14284:63233` | `public/images/m08-chronicle/founders-reserve-month.png` | `image/png` | PNG `89 50 4E 47` | `2172 × 724` | `269.1%` / `-164.98%` / `-0.04%` / `100%` |
| Velarro Estate Day | `14284:63241` | `public/images/m08-chronicle/velarro-estate-day.png` | `image/png` | PNG `89 50 4E 47` | `2172 × 724` | `269.1%` / `-21.59%` / `0` / `100%` |

- Overlay on each card image region: `rgba(21,20,20,0.4)`
- Image region sizes: first `534 × 469`; cards 2–4 `534 × 479`
- Paths live in `CHRONICLE_CARD_IMAGES` and are **not** passed through `assertApprovedImageUrl`
- Placeholders (gradient, diagonal cross lines, deferred status markers) removed

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
| `components/m08-chronicle/chronicle-assets.ts` | No — static approved hero URL + local path constants | **N/A** |
| `components/m08-chronicle/chronicle-data.ts` | No — static copy/crop data model | **N/A** |
| `components/m08-chronicle/chronicle-page.tsx` | No — presentational page assembly; no network, auth, persistence, or queue boundary | **N/A** |

Wire tracing/metrics only when an approved client telemetry sink and CSP allowlist exist.

### Testing — resolved with repository tests

| Path | Coverage evidence |
| --- | --- |
| `chronicle-assets.ts` | `tests/assets/approved-image-hosts.test.ts` (hero approved URL; four local card paths exist, distinct, non-remote); unit age-state hero/card image assertions |
| `chronicle-data.ts` | `tests/m08-chronicle/chronicle-page-age-state.test.tsx` (copy, punctuation, crops, geometry markers, deferred controls) |
| `chronicle-page.tsx` | Same unit suite + `tests/e2e/m08-chronicle-fidelity.spec.ts` (desktop geometry, age states, disabled controls, viewport containment) |
| Temp `%TEMP%` capture scripts | Not production code; deleted; no tests required |