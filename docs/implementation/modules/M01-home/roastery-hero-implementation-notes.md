# Roastery Hero Implementation Notes

## Figma Source

- Node used: `15451:37609`
- Figma node name: `MAIN THE HOUSE SECTION`

## Approved Image

- `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/homeu21-hero-20260709-024151-desktop-hero.webp`

## Layout Decisions

- Implemented as `RoasteryHeroSection` after the Cigar Carousel in the over-21 homepage only.
- Matched Figma hero dimensions with a `851px` desktop section height.
- Used a full-bleed `next/image` background with `object-cover object-center`.
- Added the Figma overlay color `rgba(21,20,20,0.4)`.
- Centered the content group responsively with `left-1/2`, `-translate-x-1/2`, `w-[998px]`, and `max-w-[calc(100vw-80px)]`.
- Preserved Figma text and control positions: content top `319px`, content gap `37px`, slider top `546px`.
- Used Figma text content `THE ROASTERY` and CTA text `SHOP NOW`.

## Deferred Behavior

- The CTA is rendered as a disabled deferred control because a destination route and backend/product behavior are not approved for this scope.
- No cart, checkout, product schema, offer schema, prices, ratings, or availability behavior was added.

## Scope Confirmation

- No future homepage sections were implemented.
- Age gate, server-side age state, navbar, Collector Hero, Cigar Carousel, CSP, image host allowlist, and under-21 shell were not modified for behavior.
