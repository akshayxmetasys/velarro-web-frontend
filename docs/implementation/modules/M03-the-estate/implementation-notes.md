# M03 The Estate / Humidor Implementation Notes

## Scope

- Implemented route: `/the-estate`.
- Implemented Figma frame: `16576:98447` (`home/the estate/the humidor`).
- Previous manifest/Figma reference `14888:53493` was checked live and no longer exists in the provided Figma file.
- Adjacent frame `16576:96095` (`home/the estate/the house`) was identified but not implemented in this scope.

## Section Inventory

1. Shared `MainNavbar`.
2. Collector Series hero.
3. Filter rail with deferred filter controls.
4. Breadcrumbs: `Home | The Estate | The Humidor`.
5. Humidor/House tab row with The Humidor selected.
6. Category carousel row with deferred image areas.
7. Six Collector Series product cards.
8. Deferred pagination controls.
9. Shared `FooterSection`.

## Copy Implemented

- Hero: `COLLECTOR SERIES`.
- Tabs: `THE HUMIDOR`, `THE HOUSE`.
- Categories: `ALL SERIES`, `AFTER DARK`, `CELEBRATION`, `COLLECTOR`, `DARK`, `ESTATE`, `HERITAGE`, `PLATINUM`, `PRESTIGE`, `TERRIOR`.
- Products:
  - `Limited Compendium`, `Salomones`, `57 RG`, `7.2 in`, `120-130 min`, `Dark chocolate, prune, vintage leather, cedar wood, roasted nuts`.
  - `Grand Cru`, `Toro`, `54 RG`, `6.0 in`, `70-80 min`, `Hazelnut, dark chocolate, oak wood, brioche, caramel`.
  - `Black Label Reserve`, `Churchill`, `50 RG`, `7.0 in`, `90-100 min`, `Roasted nuts, cacao, cedar, pepper, molasses`.
  - `Platinum Celebration`, `Gran Churchill`, `52 RG`, `7.5 in`, `100-120 min`, `Vanilla, brioche, roasted coffee, cream, honey`.
  - `Centennial Reserve`, `Toro Gordo`, `56 RG`, `6.5 in`, `90-100 min`, `Black pepper, roasted almonds, cacao, oak wood, vintage leather`.
  - `Primera Cosecha`, `Petit Corona`, `42 RG`, `4.5 in`, `35-45 min`, `Floral spice, cedar wood, almonds, brioche, honey`.

## Approved Assets Used

- Hero: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/collection-series-the-estate-hero-20260709-032805-desktop-hero.webp`
- Limited Compendium: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/limited-compendium-cigar-product-main-20260709-014923-product-main.webp`
- Grand Cru: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/grand-cru-cigar-product-main-20260709-003453-product-main.webp`
- Black Label Reserve: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/black-label-reserve-cigar-product-main-20260709-013311-product-main.webp`
- Platinum Celebration: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/platinum-celebration-cigar-product-main-20260709-013103-product-main.webp`
- Centennial Reserve: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/centennial-reserve-cigar-product-main-20260709-032610-product-main.webp`
- Primera Cosecha: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/primera-cosecha-box-of-1020-cigar-product-20260709-014818-product-main.webp`

No temporary Figma MCP URLs, unapproved hosts, local M03 image files, CSP changes, or Next image config changes were added.

## Category Image Deferral

Category thumbnail images are intentionally deferred for:

- `ALL SERIES`
- `AFTER DARK`
- `CELEBRATION`
- `COLLECTOR`
- `DARK`
- `ESTATE`
- `HERITAGE`
- `PLATINUM`
- `PRESTIGE`
- `TERRIOR`

Each category tile renders the Figma label, dimensions, border, spacing, and neutral placeholder surface with `data-image-status="deferred"` for test coverage. The live Figma label is spelled `TERRIOR`; the implementation preserves that exact spelling.

## Route Visibility

- `/the-estate` is marked `implemented: true`, `public: true`, `indexable: false`, `audience: "age-gated"` in the route manifest.
- Unknown visitors render the existing age gate.
- Under-21 visitors render the existing restricted shell.
- Over-21 visitors render The Estate / Humidor content.

## Known Mismatches

- Category thumbnails are neutral deferred placeholders until Vishnu provides approved Supabase URLs.
- The House tab is displayed as a deferred/nonfunctional tab; frame `16576:96095` is out of scope.
- Filter, pagination, and product `EXPLORE` interactions are disabled/deferred because backend, PDP, and ecommerce behavior are out of scope.

## Validation Results

- `npm run lint`: passed.
- `npm run test`: passed, 37 files and 171 tests.
- `npm run build`: passed. Next reports `/the-estate` as dynamic, expected because it reads the age cookie.
- `npm run test:e2e -- --list`: passed, listing 2 existing Playwright tests.
- `npm run dev`: an existing Next dev server was already running for this repo at `http://localhost:3000`; `/the-estate` returned HTTP 200.
