# Gifting Implementation Notes

## Figma Source

- Node used: `13148:15113`
- Figma node name: `section 2`
- Extracted copy: `Gifting`, `Find the perfect gifts`, `EXPLORE`
- Extracted standalone dimensions: `1338px x 696px`, `20px` radius, `196px` top/bottom padding, `253px/252px` horizontal padding, `64px` content gap.

## Approved Image

- Gifting background: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/gift-hero-home-20260709-041311-desktop-hero.webp`

## Layout Decisions

- Implemented as `GiftingSection` directly after `CigarKnowledgeSection` in the over-21 homepage only.
- Vishnu's localhost visual review confirmed the page rhythm should key off the approved Cigar Knowledge visible card row, not the standalone Gifting extraction width.
- Set the Gifting rounded outer block to the same centered `1236px` max-width as the Cigar Knowledge card row, while preserving `696px` height and `20px` rounded corners.
- Gifting now uses the shared M01 contained-section width constant so it aligns with Cigar Knowledge, Clothier, and future contained homepage sections.
- Kept the Gifting internal content centered after narrowing the outer block.
- Used the approved Supabase image as a full-cover background through `next/image` with `unoptimized`, matching the safe direct-image approach used by Roastery and product cards.
- Preserved the Figma overlay color `rgba(71,70,70,0.6)`.
- Matched the heading stack: `Gifting` eyebrow, `157px` divider, `64px` vertical content gap, `72px` desktop display heading, and a `217px x 43px` filled CTA.

## Contained Width Rule

- Cigar Knowledge, Gifting, Clothier, and future contained M01 homepage sections use the shared `1236px` centered contained width.
- Full-bleed hero sections remain the exception and should not be forced into this width.
- Future sections such as Estate Collection must first check Figma, then either use the shared contained width or document why the section is intentionally different.

## Deferred Behavior

- The `EXPLORE` CTA is a disabled deferred control because no route destination or backend behavior is approved for this scope.
- No cart, checkout, backend, product schema, offer schema, prices, ratings, or availability behavior was added.

## Scope Confirmation

- No future sections were implemented.
- Estate Collection, Store/lounge, and Footer remain unimplemented.
- Age gate, server-side age state, navbar, Collector Hero, Cigar Carousel, Roastery Hero, Cigar Knowledge, CSP, image host allowlist behavior, and under-21 shell were not modified beyond adding the approved Gifting image constant and over-21 section insertion.
