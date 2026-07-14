# M08 Pairing Guide Implementation Notes

## Figma Source

- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Figma page: `Velarro Wireframes`
- Frame node: `14406:85066`
- Frame name: `home/pairing guide`
- Frame size: `1440 x 3332`
- Implemented route: `/pairing-guide`

## Section Inventory

- Shared main navbar.
- Hero section with approved Pairing Guide hero image, overlay, title, and body copy.
- Breadcrumb: `Home | Pairing guide`.
- Pairing cards section with `PAIRING GUIDE` eyebrow and `Six Ways to Savour` heading.
- Six pairing cards with deferred card background regions.
- `Discover Your Perfect Pairing` CTA section with deferred pairing-flow control.
- Shared M01 footer.

## Copy Implemented

- Hero title: `PERFECT PAIRINGS`
- Hero body: `Explore the latest stories, product unveilings, special events, and lifestyle experiences that define the world of Velarro.`
- Section eyebrow: `PAIRING GUIDE`
- Section title: `Six Ways to Savour`
- Cards:
  - `Rum & Cigars`
  - `Whisky & Cigars`
  - `Cocktails & Cigars`
  - `Wine & Cigars`
  - `Sparkling & Cigars`
  - `Coffee & Cigars`
- Card body: `The rich, smoky notes of Paul John expressions complement the depth and complexity of Velarro's full-bodied blends, creating a harmonious sensory experience.`
- Card controls: `EXPLORE`
- CTA title: `Discover Your Perfect Pairing`
- CTA body: `Explore pairings thoughtfully selected to complement the character, complexity, and craftsmanship of Velarro cigars.`
- CTA control: `FIND MY PAIRING`

## Assets

- Approved hero URL:
  `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/perfect-pairing-hero-20260709-034623-desktop-hero.webp`
- The previous background-position crop attempt worsened the visual by pushing the bowl/cigar lower and cropping the bottom more.
- Final hero crop uses exact Figma numeric placement from image node `14406:85076`:
  - image position: `absolute`
  - image top: `-72px`
  - image height: `960px`
  - image width: `100%`
  - image left: `0`
  - image max-width: `none`
  - marker: `data-figma-crop="pairing-guide-hero-exact-14406-85076"`
- No temporary Figma URLs are used.
- No local M08 image files were added.
- CSP, Next image config, and approved image host config were not modified.
- No card, layout, footer, navbar, sidebar, or route-policy changes were made for this final crop pass.

## Deferred Card Backgrounds

Final card background images are deferred until Vishnu provides approved production Supabase URLs:

- `pairing_rum_and_cigars`
- `pairing_whisky_and_cigars`
- `pairing_cocktails_and_cigars`
- `pairing_wine_and_cigars`
- `pairing_sparkling_and_cigars`
- `pairing_coffee_and_cigars`

Each card background region renders a neutral Figma-matched deferred surface and is marked with:

- `data-pairing-guide-card-background-status="deferred"`
- `data-deferred-image-key="[pairing_key]"`

## Typography Fidelity

- Hero title uses the Velarro display-light token at the Figma desktop size.
- Hero body uses the Velarro body-default token and keeps the Figma copy width.
- Pairing card titles use the Velarro display-light token at `24px`, weight `300`, and normal line-height.
- Pairing card body copy uses the Velarro product-card/body token at `16px`, weight `400`, `24px` line-height, and `489px` desktop copy width.
- Pairing card `EXPLORE` buttons use the Velarro primary UI token at `16px`, weight `400`, uppercase.
- Exact Gotham rendering remains unavailable until licensed Gotham webfont files are provided.

## Route Visibility

- `/pairing-guide` is age-gated.
- Unknown visitors see the existing age gate.
- Under-21 visitors see the existing restricted under-21 shell and do not see Pairing Guide content.
- Over-21 visitors see the Pairing Guide page.
- Route manifest marks `/pairing-guide` as implemented, public, noindex, and `age-gated`.

## Known Mismatches

- Six final Pairing Guide card background images are deferred.
- Interactive pairing flow is deferred.
- Pairing detail pages are deferred.
- `EXPLORE` and `FIND MY PAIRING` controls are disabled because destination/flow behavior is not approved for this scope.
- Responsive behavior is engineering-derived because the Figma source is desktop-only.

## Validation Results

- `npm.cmd run lint`: passed.
- `npm.cmd run test -- tests\m08-pairing-guide\pairing-guide-page-age-state.test.tsx`: passed, 1 file / 11 tests.
- `npm.cmd run test`: passed, 41 files / 232 tests.
- `npm.cmd run build`: passed; Next route output includes `/pairing-guide`.
- `npm.cmd run test:e2e -- --list`: passed; 2 Playwright tests listed.
- Existing localhost server reused on `http://localhost:3000`.
- `http://localhost:3000/pairing-guide`: returned HTTP 200.
