# M08 The Chronicle Implementation Notes

## Figma Source

- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Figma page: `Velarro Wireframes`
- Frame node: `14284:63187`
- Frame name: `home/the chronicle`
- Frame size: `1440 x 3884`
- Implemented route: `/the-chronicle`

## Section Inventory

- Shared main navbar.
- Hero section with approved Chronicle hero image, overlay, title, and body copy.
- Breadcrumb: `Home | The Chronicle`.
- Live news ticker.
- Four event/editorial cards with deferred image regions.
- Shared M01 footer.

## Copy Implemented

- Hero title: `THE CHRONICLE`
- Hero body: `Explore the latest stories, product unveilings, special events, and lifestyle experiences that define the world of Velarro.`
- Ticker:
  - `Live News and Events`
  - `*Velarro is Launching New Store in US*`
  - `*Velarro Royal Leaf Like by most user*`
  - `*Velarro is entering to switzerland Market*`
  - `*Velarro is Accessories is most uniquet*`
- Cards:
  - `February 27` / `International Cigar Day`
  - `May 21` / `International Tea Day`
  - `August 1 - August 31` / `Founder's Reserve Month`
  - `August 28` / `Velarro Estate Day`
- Card controls: `VIEW EVENT DETAILS`

## Assets

- Approved hero URL:
  `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/thechronicle-hero-20260709-023616-desktop-hero.webp`
- The hero URL is asserted through the existing approved Supabase host validator.
- Hero crop fix completed against Figma hero node `14284:63192`.
- The Chronicle hero keeps the approved Supabase URL and now uses the Figma image placement:
  - image width: `99.99%`
  - image height: `141.04%`
  - image top: `-22.29%`
  - image left: `0`
- This replaced the prior desktop scale-based crop so the cup/cigar area, journal, and vase/leaves remain visible like the Figma screenshot.
- The hero image uses explicit `1440 x 924` intrinsic dimensions rather than Next `Image` `fill`, because Next 16 does not allow `fill` images to override rendered width/height.
- No temporary Figma URLs are used.
- No local M08 image files were added.
- CSP, Next image config, and approved image host config were not modified.

## Visual Fidelity Audit

- Figma hero node used: `14284:63192`.
- Figma card stack node used: `14284:63208`.
- Figma card nodes used: `14284:63209`, `14284:63218`, `14284:63226`, `14284:63234`.
- Card width audit result:
  - Existing natural desktop card width matched Figma at `1054px`.
  - Existing content column width matched Figma at `360px`.
  - Existing desktop card padding matched Figma at `40px`.
  - Existing desktop card gap matched Figma at `80px`.
  - Existing desktop image width matched Figma at `534px`.
  - First card image region was corrected to `469px` tall; later image regions remain `479px` tall.
- Typography audit result:
  - Chronicle hero title/body, card date, card title, card body, and button text already used the existing Velarro token/fallback system.
  - Local data markers were added so tests can assert the expected Velarro typography token classes.
- Card images remain deferred.

## Deferred Card Images

The final card images are deferred until Vishnu provides approved production Supabase URLs:

- `chronicle_card_1`
- `chronicle_card_2`
- `chronicle_card_3`
- `chronicle_card_4`

Each card image region renders a neutral Figma-matched deferred surface and is marked with:

- `data-chronicle-card-image-status="deferred"`
- `data-deferred-image-key="[chronicle_card_n]"`
- `data-figma-node` matching the original Figma image node.

## Route Visibility

- `/the-chronicle` is age-gated.
- Unknown visitors see the existing age gate.
- Under-21 visitors see the existing restricted under-21 shell and do not see Chronicle content.
- Over-21 visitors see The Chronicle page.
- Route manifest marks `/the-chronicle` as implemented, public, noindex, and `age-gated`.

## Known Mismatches

- Four final Chronicle card images are deferred.
- Article/detail behavior is deferred.
- `VIEW EVENT DETAILS` controls are disabled because article detail behavior is not approved for this scope.
- Responsive behavior is engineering-derived because the Figma source is desktop-only.
- Exact Gotham rendering remains unavailable until licensed Gotham webfont files are provided.

## Validation Results

- Latest visual-fidelity pass:
  - `npm.cmd run lint`: passed.
  - `npm.cmd run test`: passed, 40 files / 219 tests.
  - `npm.cmd run build`: passed; Next route output includes `/the-chronicle`.
  - `npm.cmd run test:e2e -- --list`: passed; 2 Playwright tests listed.
  - Existing `npm.cmd run dev` server reused on `http://localhost:3000`.
  - `http://localhost:3000/the-chronicle`: returned HTTP 200.
- Runtime overlay fix:
  - `npm.cmd run lint`: passed.
  - `npm.cmd run test -- tests\m08-chronicle\chronicle-page-age-state.test.tsx`: passed, 13 tests.
  - `npm.cmd run build`: passed; Next route output includes `/the-chronicle`.
  - `http://localhost:3000/the-chronicle`: returned HTTP 200.
- Previous implementation pass:
  - `npm.cmd run lint`: passed.
  - `npm.cmd run test`: passed, 40 files / 216 tests.
  - `npm.cmd run build`: passed; Next route output includes `/the-chronicle`.
  - `npm.cmd run test:e2e -- --list`: passed; 2 Playwright tests listed.
  - `npm.cmd run dev`: started successfully on `http://localhost:3000`.
