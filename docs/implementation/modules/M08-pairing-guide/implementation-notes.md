# M08 Pairing Guide Implementation Notes

## Figma Source

- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Frame node: `14406:85066`
- Frame name: `home/pairing guide`
- Frame size: `1440 × 3332`
- Implemented route: `/pairing-guide`

## Inspected Nodes

- `14406:85066` — full page
- `14585:39944` — Main Navbar reference
- `14585:40485` / `14406:85076` / `14585:40480`–`40483` — hero
- `14585:39985` / `14406:85128` — breadcrumb
- `14585:39988` / `14585:39987` / `14585:40486`–`40487` / `14406:85070` — pairing section heading
- `14406:85080` — card grid
- Rows `14406:85081`, `14628:41025`, `14628:41041`
- Cards `14628:40921`, `14628:40996`, `14628:41027`, `14628:41028`, `14628:41043`, `14628:41044`
- CTA `14406:85121`–`85126`
- Footer reference `14406:85127`

## Assets

### Hero (approved external)

- URL:
  `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/perfect-pairing-hero-20260709-034623-desktop-hero.webp`
- Asserted through `assertApprovedImageUrl`
- Verified crop vs Figma `14406:85076` (655px hero → 146.56% height ≈ 960px, top ≈ -10.99% ≈ -72px):
  - width `100%`
  - rendered height `960px`
  - top `-72px`
  - left `0`
- Overlay: `rgba(21,20,20,0.4)`
- Intrinsic dimensions: `1440 × 960`
- Not duplicated locally

### Card images (permanent local)

Downloaded from exact Figma card rasters (not page screenshots). No temporary Figma URLs remain in production source.

| Card | Figma node | Local path | Content-Type | Binary | Natural | Crop / treatment |
| --- | --- | --- | --- | --- | --- | --- |
| Rum & Cigars | `14628:40921` | `public/images/m08-pairing-guide/rum-and-cigars.png` | `image/png` | PNG `89 50 4E 47` | `1376 × 768` | `object-cover`, position `50% 50%`, blur `3px`, overlay `rgba(21,20,20,0.4)` |
| Whisky & Cigars | `14628:40996` | `…/whisky-and-cigars.png` | `image/png` | PNG | `638 × 410` | same shell treatment |
| Cocktails & Cigars | `14628:41027` | `…/cocktails-and-cigars.png` | `image/png` | PNG | `638 × 410` | same |
| Wine & Cigars | `14628:41028` | `…/wine-and-cigars.png` | `image/png` | PNG | `638 × 410` | same |
| Sparkling & Cigars | `14628:41043` | `…/sparkling-and-cigars.png` | `image/png` | PNG | `638 × 410` | same |
| Coffee & Cigars | `14628:41044` | `…/coffee-and-cigars.png` | `image/png` | PNG | `638 × 410` | same |

- Paths live in `PAIRING_GUIDE_CARD_IMAGES` and are **not** passed through `assertApprovedImageUrl`
- Placeholder gradients / decorative lines / deferred status markers removed

## Desktop Geometry

- Hero `1440 × 655`; content top ≈ `281px`; content width `777px`
- Breadcrumb ≈ `1356px` wide after `12px` gap
- `48px` to pairing section; heading group ≈ `414px`; eyebrow underline ≈ `362px`
- Grid `1282px`, two columns, cards `626 × 398`, column gap `28px`, row gap `80px`
- Card content left `55px`, top `88px`, body width `489px`
- CTA width `1282px`, content `874px`, padding `50 × 28`, button `368 × 35`
- Shared footer reused untouched

## Deferred Controls

- Six `EXPLORE` buttons and `FIND MY PAIRING` remain disabled, non-operable, without href/handlers/routes

## Route And Age Contract

- Unknown → AgeGate; under-21 → Under21HomeShell; over-21 → PairingGuidePage
- Metadata remains noindex; canonical `/pairing-guide`
- Route manifest unchanged (`age-gated`, `indexable: false`, figma `14406:85066`)

## Overflow

- Removed route-root `overflow-x-hidden`
- No root/main overflow masking
- Card/hero crop containers may use local `overflow-hidden`

## Responsive

- Engineering-derived (no verified mobile/tablet Pairing Guide Figma frames)
- Required viewports: 320, 375, 390, 768, 1024, 1280, 1440

## Known Differences

- Gotham / OneSignature unavailable (FONT-BLOCKED)
- Shared footer height differs from Figma ≈697px
- Measured page height after V-08b: `3355px` vs Figma `3332px` (delta `+23px`)

## Cursor Guard Findings (V-08b finalize)

Guard heuristics emitted medium/low policy reviews for a temporary evidence helper and presentational diffs. Resolution below is evidence-based; inventing OpenTelemetry or ad hoc browser console printing would violate repository rules.

### Debug-style output — resolved by removal

Temporary evidence-capture script `%TEMP%\velarro-v08b-capture-after.mjs` wrote one-shot measurement dumps to process stdout. It was never part of the repository and has been deleted (`Test-Path` → false). No production Pairing Guide source contains debug-style output.

### Observability — justified N/A

Repo evidence (unchanged by V-08b):

- `package.json` has no OpenTelemetry, Sentry, analytics, or structured logger dependency.
- Audit finding `FE-016`: no approved third-party telemetry; production CSP `connect-src` is `'self'` only.
- Project rules forbid production ad hoc console printing / debug prints.

| Path | Operation boundary? | Decision |
| --- | --- | --- |
| `components/m08-pairing-guide/pairing-guide-assets.ts` | No — static approved hero URL + local path constants | **N/A** |
| `components/m08-pairing-guide/pairing-guide-data.ts` | No — static copy/crop data model | **N/A** |
| `components/m08-pairing-guide/pairing-guide-page.tsx` | No — presentational page assembly; no network, auth, persistence, or queue boundary | **N/A** |

Wire tracing/metrics only when an approved client telemetry sink and CSP allowlist exist.

### Testing — resolved with repository tests

| Path | Coverage evidence |
| --- | --- |
| `pairing-guide-assets.ts` | `tests/assets/approved-image-hosts.test.ts` (hero approved URL; six local card paths exist, distinct, non-remote); unit hero/card image assertions |
| `pairing-guide-data.ts` | `tests/m08-pairing-guide/pairing-guide-page-age-state.test.tsx` (copy, order, crops, geometry markers, deferred controls) |
| `pairing-guide-page.tsx` | Same unit suite + `tests/e2e/m08-pairing-guide-fidelity.spec.ts` (desktop geometry, age states, disabled controls, viewport containment) |
| Temp `%TEMP%` capture script | Not production code; deleted; no tests required |

## Validation

- Formatter: not configured
- `git diff HEAD --check`: pass
- `npm.cmd run cursor:check`: pass
- `npm.cmd run lint`: pass
- `npm.cmd run typecheck`: pass
- `npm.cmd run test`: 418 passed
- `npm.cmd run test -- tests/security`: 6 passed
- `npm.cmd run build`: pass
- `npm.cmd run test:e2e`: 47 passed
- `npm.cmd run test:e2e -- tests/e2e/security-headers.spec.ts`: pass
- Temp capture script absent
- Evidence: `%TEMP%\velarro-v08b-pairing-guide-evidence\`
