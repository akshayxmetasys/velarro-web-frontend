# Estate Collection Implementation Notes

## Figma Source

- Node used: `13148:15145`
- Figma node name: `section 5`
- Extracted copy: `Discover Timeless Luxury`, `Velarro Estate collection`, `EXPLORE`
- Extracted card order: `Estate Espresso`, `Founder’s Boxy hoodie`, `Roastery`, `The cabinet`, `Estate oversized T-shirt`, `Humidors`
- Initial active card in Figma: `Founder’s Boxy hoodie` (center card)

## Approved Images

- Estate Espresso: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-espresso-20260711-013345-product-main.webp`
- Founder’s Boxy hoodie: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-hoodies-20260711-013309-product-main.webp`
- Roastery: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-roastery-hero-20260709-023755-desktop-hero.webp`
- The cabinet: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/the-cabinet-hero-home-20260709-025631-desktop-hero.webp`
- Estate oversized T-shirt: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-oversized-t-shirt-20260709-045207-product-main.webp`
- Humidors: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-humidor-20260709-212816-product-main.webp`
- Arrow left: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/property-1arrow-left-circle-20260711-004505-svg-logo-icon.svg`

## Layout Decisions

- Implemented as `EstateCollectionSection` directly after `ClothierSection` in the over-21 homepage only.
- Matched the Figma section background `#f6f2eb`, `32px` vertical padding, `64px` heading-to-carousel gap, and centered `1314px` section frame.
- Reused the existing M01 carousel card treatment from `CigarCategoryCard` because Figma node `14852:36641` uses the same active/inactive card scale, border, overlay, and deferred CTA treatment as the cigar carousel.
- Preserved the Figma carousel viewport (`1135px` wide, `455px` tall) and arrow row (`1303px` total with `44px` arrows and `40px` gaps).
- Used approved Supabase images through `next/image` with `unoptimized`, matching the safe direct-image approach used by earlier M01 sections.

## Contained Width Rule

- Figma shows this section as a carousel with external arrow controls and a `1135px` card viewport, not a static `1236px` card row.
- Therefore this section intentionally follows the cigar-carousel width pattern (`1314px` section frame, `1303px` carousel row) rather than the `1236px` contained card-row width used by Clothier, Gifting, and Cigar Knowledge.
- Full-bleed hero sections remain the exception.

## Arrow Behavior

- Left arrow uses the approved `estate_collection_arrow_left` Supabase SVG asset.
- No separate right-arrow URL was supplied.
- Right arrow reuses the approved left-arrow asset rotated `180deg`, matching the cigar carousel implementation.

## Deferred Behavior

- Each `EXPLORE` CTA is a disabled deferred control because no route destination, cart, or backend behavior is approved for this scope.
- No product schema, offer schema, prices, ratings, reviews, availability, cart, checkout, or backend behavior was added.

## Scope Confirmation

- No future sections were implemented.
- Store/lounge and Footer remain unimplemented.
- Age gate, server-side age state, navbar, Collector Hero, Cigar Carousel, Roastery Hero, Cigar Knowledge, Gifting, Clothier, CSP, image host allowlist behavior, and under-21 shell were not modified beyond adding the approved Estate Collection image constants and over-21 section insertion.
