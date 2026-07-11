# Clothier Implementation Notes

## Figma Source

- Node used: `13148:15120`
- Figma node name: `section 6`
- Extracted copy: `Curated for the Exceptional`, `The Clothier`, `Top Gift`, `EXPLORE`
- Extracted card order: `Estate Oversized T-shirt`, `Heritage Dad Cap`, `Estate Weekender Jacket`
- Extracted descriptions: `Heavyweight organic cotton`, `Washed cotton`, `Cotton canvas, technical cotton, or lightweight`

## Approved Images

- Estate Oversized T-shirt: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-oversized-t-shirt-20260709-045207-product-main.webp`
- Heritage Dad Cap: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/heritage-dad-cap-20260709-160620-product-main.webp`
- Estate Weekender Jacket: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/estate-weekender-jacket-closeup-20260709-154553-product-main.webp`

## Layout Decisions

- Implemented as `ClothierSection` directly after `GiftingSection` in the over-21 homepage only.
- Matched the Figma section background `#f6f2eb`, `32px` vertical padding, `40px` heading-to-cards gap, and centered `1340px` section frame.
- Preserved the extracted Figma card sizes while placing the card row in the shared `1236px` M01 contained-section width so its visible left/right edges align with Cigar Knowledge and Gifting.
- Preserved the Figma card treatment: `8px` radius, light border, `17px` padding, `14.6px` internal gap, square `321px` image frame, `8px` image radius, and `rgba(21,20,20,0.4)` image overlay.
- Used the approved Supabase product images through `next/image` with `unoptimized`, matching the safe direct-image approach used by earlier M01 sections.
- Kept swatches semantic with accessible labels and Figma color order per card.

## Contained Width Rule

- Cigar Knowledge, Gifting, Clothier, and future contained M01 homepage sections use the shared `1236px` centered contained width.
- Full-bleed hero sections remain the exception and should not be forced into this width.
- Future sections such as Estate Collection must first check Figma, then either use the shared contained width or document why the section is intentionally different.

## Badge Behavior

- The Figma node renders `Top Gift` on all three Clothier cards.
- `Top Gift` is implemented on all three cards and no additional badges were invented.

## Deferred Behavior

- Each `EXPLORE` CTA is a disabled deferred control because no route destination, cart, or backend behavior is approved for this scope.
- No product schema, offer schema, prices, ratings, reviews, availability, cart, checkout, or backend behavior was added.

## Scope Confirmation

- No future sections were implemented.
- Estate Collection, Store/lounge, and Footer remain unimplemented.
- Age gate, server-side age state, navbar, Collector Hero, Cigar Carousel, Roastery Hero, Cigar Knowledge, Gifting, CSP, image host allowlist behavior, and under-21 shell were not modified beyond adding the approved Clothier image constants and over-21 section insertion.
