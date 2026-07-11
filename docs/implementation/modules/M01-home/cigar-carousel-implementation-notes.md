# M01 Home — Cigar Carousel Implementation Notes

## Scope

Implemented only the **Cigar Carousel** section for over-21 homepage visitors on branch `feature/m01-homepage-cigar-carousel`.

## Figma source

- Section node: `13148:15033`
- Frame size: 1314 × 645
- Background: `#f6f2eb` (`bg-background-section`)
- Vertical layout: 32px top/bottom padding, 64px section gap
- Eyebrow: `DISCOVER TIMELESS LUXURY` — Gotham Light 20px, `#1f1a17`
- Heading: `Velarro cigars` — Gotham Light 32px, `#2f2924`
- Initial carousel state: card 2 **Verde Classico** active center; **Ashtrays** dimmed left; **Lighters** dimmed right; cards 4–6 in sequence but off-canvas until navigated

## Files added/updated

| File | Purpose |
| --- | --- |
| `components/m01-home/cigar-carousel-section.tsx` | Section shell, carousel state, arrow controls |
| `components/m01-home/cigar-category-card.tsx` | Active/side card presentation |
| `lib/m01-home/cigar-carousel-data.ts` | Typed card sequence and approved image URLs |
| `lib/assets/approved-image-hosts.ts` | Carousel image + arrow constants |
| `components/m01-home/over21-home-page.tsx` | Renders carousel after collector hero |
| `tests/m01-home/cigar-carousel-section.test.tsx` | Carousel unit/integration tests |
| `tests/m01-home/home-page-age-state.test.tsx` | Age-gating coverage for carousel |

## Approved image URLs used

| Card / asset | URL |
| --- | --- |
| Ashtrays | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-velarro-hand-cigar-20260711-012846-product-main.webp` |
| Verde Classico | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/verde-classico-cigar-product-main-20260709-014847-product-main.webp` |
| Lighters | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-velarro-lighter-20260711-012856-product-main.webp` |
| Vintage no. 88 | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/vintage-no-88-cigar-product-main-20260709-011600-product-main.webp` |
| Pipes | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/home-pipes-20260711-014521-product-main.webp` |
| Nocturne | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/nocturne-cigar-product-main-20260709-021239-product-main.webp` |
| Carousel arrow (left) | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/property-1arrow-left-circle-20260711-004505-svg-logo-icon.svg` |

## Arrow control decision

No separate right-arrow URL was approved. The **next** control reuses the approved left-arrow SVG with `rotate-180` via Tailwind (`className="rotate-180"`). No additional remote domains or unapproved assets were added.

## Behavior notes

- Carousel is **interactive** for this pass: previous/next update the active card index.
- Initial active index is `1` (Verde Classico).
- Up to three cards render in the viewport (previous, active, next) with side-card opacity `0.75`.
- EXPLORE buttons are **visual only / deferred** — disabled with card-specific accessible names.
- No product schema, routes, cart, or backend behavior was invented.
- Reduced-motion: transition classes respect `motion-reduce:transition-none` on the card track.

## Accessibility

- Section uses `aria-labelledby` pointing to the `h2` **Velarro cigars**.
- Carousel region uses `aria-roledescription="carousel"`.
- Previous/next controls: `Previous cigar category`, `Next cigar category`.
- Active card uses `aria-current="true"` on the article.
- EXPLORE controls include card label in `aria-label`.

## Remaining blocked sections (not implemented)

- Roastery hero
- Cigar knowledge
- Gifting
- Clothier
- Estate collection
- Store / lounge
- Footer

## Open assumptions for visual QA

- Figma uses fractional pixel radii/borders; implementation mirrors supplied values at 1440px desktop first.
- Cards 4–6 are present in data and reachable via next navigation; they are not all visible in the initial Figma viewport state.
- Dedicated right-arrow asset may be supplied later; rotation decision should be revisited if a distinct approved asset is provided.
