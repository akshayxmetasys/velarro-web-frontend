# Cigar Knowledge Implementation Notes

## Figma Source

- Node used: `13148:15081`
- Figma node name: `section3`
- Extracted copy: `Cigar Knowledge`, `Expand your horizons`, `Limited Compendium`, `Reserve`, `Night Series`, `The Perfect Whiskey & Cigar Pairing`, `Core Portfolio`, `Nocturne`, and the Figma card descriptions.

## Approved Images

- Limited Compendium: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/limited-compendium-cigar-product-main-20260709-014923-product-main.webp`
- Reserve: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/reserve-cigar-product-main-20260709-000729-product-main.webp`
- Night Series: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/nocturne-cigar-product-main-20260709-021239-product-main.webp`

## Layout Decisions

- Implemented as `CigarKnowledgeSection` after `RoasteryHeroSection` in the over-21 homepage only.
- Matched the Figma section treatment with the `#f6f2eb` background, `19px` vertical padding, a centered heading stack, and a `40px` gap between heading and cards.
- Used the Figma card order and dimensions: three card layout, `30px` card gap, `16px` horizontal card padding, `20px` vertical card padding, `12px` card radius, and `356px x 309px` image frames with `8px` radius.
- The card row establishes the shared M01 contained-section width: `1236px`. Contained homepage sections should use this centered width unless a future Figma node is clearly full-bleed or explicitly documents a different contained rhythm.
- Preserved the Figma image overlay color `rgba(21,20,20,0.4)`.
- Rendered Supabase images through `next/image` with `unoptimized` to match the safe direct-image behavior used by the Roastery Hero and Cigar Carousel.

## Contained Width Rule

- Cigar Knowledge, Gifting, Clothier, and future contained M01 homepage sections use the shared `1236px` centered contained width.
- Full-bleed hero sections remain the exception and should not be forced into this width.
- Future sections such as Estate Collection must first check Figma, then either use the shared contained width or document why the section is intentionally different.

## Deferred Behavior

- Each `EXPLORE` CTA is a disabled deferred control because approved route destinations and backend behavior are not in scope.
- No cart, checkout, product schema, offer schema, prices, ratings, or availability behavior was added.

## Scope Confirmation

- No future homepage sections were implemented.
- Age gate, server-side age state, navbar, Collector Hero, Cigar Carousel, Roastery Hero, CSP, image host allowlist behavior, and under-21 shell were not modified.
