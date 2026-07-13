# M04 The House Implementation Notes

## Figma Source

- Node used: `16576:96095`
- Frame name: `home/the estate/the house`
- Implemented route: `/the-estate/the-house`

## Route Decision

- This scope implements the Estate tab route `/the-estate/the-house`.
- Standalone `/the-house` was not used because the approved frame is named `home/the estate/the house`, the route manifest already contained `/the-estate/the-house`, and the approved M03 Estate page exposes `THE HOUSE` as the sibling tab to `THE HUMIDOR`.
- The standalone `/the-house` route remains unimplemented and reserved for the separate House landing frame.

## Section Inventory

- Shared main navbar
- Hero with `THE HOUSE`
- Breadcrumbs: `Home`, `The Estate`, `The House`
- Estate tabs: `THE HUMIDOR`, `THE HOUSE`
- Category strip: `ALL HOUSE`, `THE ROASTERY`, `THE T-HUB`, `THE CLOTHIER`, `THE SADDLERY`, `THE CABINET`
- Product grid with six cards
- Deferred pagination
- Shared footer

## Copy Implemented

- `THE HOUSE`
- `THE HUMIDOR`
- `THE HOUSE`
- `ALL HOUSE`
- `THE ROASTERY`
- `THE T-HUB`
- `THE CLOTHIER`
- `THE SADDLERY`
- `THE CABINET`
- `Founder’s Boxy hoodie`
- `Heavyweight French terry cotton`
- `Estate Espresso`
- `Dark chocolate, roasted almond, cacao, cedar, espresso crema.`
- `Estate Oversized T-shirt`
- `Heavyweight organic cotton`
- `Estate Torch Lighter`
- `A premium torch lighter for reliable cigar lighting.`
- `Founder’s Duffel`
- `A luxury leather duffel for travel and estate lifestyle.`
- `Cacao Chai Reserve`
- `Cacao, cinnamon, black pepper, clove, warm spice`
- `Top Gift`
- `EXPLORE`

## Approved Assets

- House hero / All House: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-house-hero-20260709-023807-desktop-hero.webp`
- T-Hub category: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-thub-hero-home-20260709-025436-desktop-hero.webp`
- Saddlery category: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-saddlery-hero-home-20260709-025547-desktop-hero.webp`
- Clothier category / Founder’s Boxy hoodie product: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-hoodies-20260711-013309-product-main.webp`
- Cabinet category: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-the-cabinet-20260711-015026-product-main.webp`
- Estate Espresso product: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-espresso-20260711-013345-product-main.webp`
- Estate Oversized T-shirt product: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-oversized-t-shirt-20260709-045207-product-main.webp`
- Estate Torch Lighter product: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-torch-lighter-20260710-005343-product-main.webp`
- Founder’s Duffel product: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/founders-duffel-20260709-190202-product-main.webp`
- Cacao Chai Reserve product: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/cacao-chai-reserve-20260709-044022-product-main.webp`

## Roastery Asset Verification

- The Roastery category reuses the current homepage Roastery source of truth: `M01_HOME_APPROVED_IMAGES.roasteryHero`.
- Verified current value: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/homeu21-hero-20260709-024151-desktop-hero.webp`

## Route Visibility Policy

- `/the-estate/the-house` is over-21 restricted.
- Unknown visitors receive the existing age gate through the page age-state switch.
- Under-21 visitors receive the existing restricted under-21 shell.
- Over-21 visitors can view the House content.
- No changes were made to CSP, Next image config, or the approved image host config.

## Known Mismatches

- Product detail, pagination, filtering, cart, and ecommerce behavior remain deferred because those flows are not approved for this scope.
- The Estate route manifest keeps `/the-estate/the-house` under the Estate tab route family while this implementation is documented under the M04 The House workstream.

## Validation Results

- `npm run lint`: passed
- `npm run test`: passed, 38 test files and 182 tests
- `npm run build`: passed; Next route output includes `/the-estate/the-house`
- `npm run test:e2e -- --list`: passed, 2 Playwright tests listed
- `npm run dev`: existing Next dev server was already running for this repo on port `3000`; verified `http://localhost:3000/the-estate/the-house` returns HTTP 200
