# Store/Lounge Implementation Notes

## Scope

Implemented only the M01 over-21 homepage Store/Lounge section after Estate Collection. Footer, route behavior, backend store locator behavior, schema, prices, ratings, reviews, availability, and other homepage sections were not implemented in this pass.

## Figma Source

- File: `92rhH51aErpYQWRrlJqMhn`
- Node: `13148:15176`
- Node name: `section4`
- Verified extraction: frame is `1236 x 1065`, rounded `12px`, with a background image, `rgba(21,20,20,0.4)` overlay, and a centered glass content panel.

## Local Approved Image

- Asset path used: `public/images/m01-home/store-lounge-background.png`
- Public `next/image` path: `/images/m01-home/store-lounge-background.png`

This section uses the local approved asset because Vishnu approved the Composer-provided Store/Lounge image for this one section only. It was not uploaded to Supabase in this task, and no temporary Figma asset URL or new remote URL was added.

## Layout Decisions

The Store/Lounge visual is a contained rounded section, not a full-bleed hero. The implementation uses the shared M01 contained-section width helper so it aligns with the approved Cigar Knowledge, Gifting, Clothier, and page rhythm.

Figma shows the background image as width `100%`, height about `174.34%`, top about `-5.82%`. The local portrait PNG is rendered with `object-cover` and a top-biased `object-position` so the crop stays close to the extracted Figma composition.

The content panel follows the Figma extraction:

- panel background: `rgba(29,28,26,0.6)`
- panel radius: `24px`
- vertical padding: `24px`
- gap: `20px`
- heading: `FIND A STORE & LOUNGE`, desktop `72px`, uppercase, display-light token
- CTA: `EXPLORE`, cream button, approximately `355px` wide

## Deferred Behavior

The CTA destination and backend/store-locator behavior are not approved. The CTA is rendered as an accessible disabled button with deferred copy in the accessible label.

## Footer

Footer was not implemented.
