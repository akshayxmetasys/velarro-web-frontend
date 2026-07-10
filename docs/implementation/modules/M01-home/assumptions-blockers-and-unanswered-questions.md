# Assumptions, Blockers, And Unanswered Questions

Status: BLOCKED
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata on `13148:15012` returned HTTP 504.
- Source assumptions: all items below remain unresolved unless explicitly marked verified.
- Unresolved blockers: listed below.

## Verified Assumptions

- Repository is `velarro-web-frontend`.
- Current branch is `feature/over21-homepage-figma-implementation`.
- Current planning work concerns Velarro Estate.
- PR-2 is documentation/planning only.
- Full homepage metadata can time out; section-level extraction is required.
- M01 has no verified responsive Figma variants.

## Hard Blockers

- No production UI code may be written without `START VELARRO IMPLEMENTATION`.
- Permanent approved image assets are missing.
- Full layer-by-layer specs are now stronger for nested cards, carousel initial states, and footer copy/assets, but states/interactions remain unresolved.
- `/` age-state rendering behavior is not approved for `unknown`, `over21`, `under21`, and crawlers.
- Under-21 and unknown content/metadata/schema behavior is unresolved.
- CTA destinations are not fully approved.
- Remote image domains are not approved and are incompatible with current CSP.
- Gotham and script/logo assets are pending licensing/export approval.

## Unanswered Questions For Vishnu

1. Should `/` render an age gate for `unknown` users before any over-21 content is sent?
2. What exactly should crawlers and social preview bots receive for `/`?
3. Is the root homepage allowed to be indexable while over-21 content is age-gated?
4. Are all hero/card product names and category names visible in Figma approved final copy, including `Vintage no. 88`, `The cabinet`, and the Clothier product copy?
5. What are the permanent assets for every hero, card, feature panel, logo, icon, and footer visual?
6. What are the approved destinations for `SHOP NOW`, `EXPLORE`, carousel cards, search, cart, login, and newsletter actions?
7. Is `Find a store & lounge` an approved physical-location claim, and what route should it use?
8. Is `/the-house` available to under-21 users or review-gated like the dual-flow docs suggest?
9. Is the 180-day client-readable age-state cookie approved for PR-2 behavior?
10. Should newsletter form submission exist in PR-2, or should it be static/deferred?
11. Should footer social icons link out to approved official social profiles, and what are those URLs?
12. Are `Top Gift`, `Highest level of Encryption, Security and Trust`, and the footer Surgeon General warning approved legal/marketing copy?
13. Should the accessibility icon open a third-party widget, a first-party accessibility page, or be deferred? Third-party widgets require security approval.
14. Should `Ascend` scroll to top, route somewhere, or be removed/deferred?
15. Should the Clothier third card copy be corrected from the extracted source text, which includes a leading space in the title and an apparently truncated description?

## Extraction Gaps Closed On 2026-07-10

- Cigar carousel `13148:15033`: six card labels, initial active/dimmed state, arrow nodes, and Figma image hashes extracted.
- Cigar knowledge `13148:15081`: three card titles, subtitles, descriptions, image dimensions, button copy, and temporary asset markers extracted.
- Clothier `13148:15120`: three product cards, `Top Gift` badge, descriptions, swatches, image dimensions, button copy, and temporary asset markers extracted.
- Estate collection `13148:15145`: six carousel card labels, initial active/dimmed state, arrow asset, and temporary asset markers extracted.
- Footer `14468:34842`: social icons, newsletter copy/fields, footer links, warning, trust line, legal links, copyright, accessibility icon, and `Ascend` control extracted.

## Remaining Extraction Or Source Failures

- Full parent frame metadata for `13148:15012` still fails with HTTP 504 and should not be retried repeatedly.
- `use_figma` read-only traversal failed on `13148:15081` with Debug UUID `83ac4aa0-0cf9-49e7-930d-993a670cc9ce`.
- `use_figma` read-only traversal failed on knowledge card instances with Debug UUID `daa9140f-4a68-4a27-9935-c24b41d88e5a`.
- Full design-context output for large section batches exceeded context limits; future reads should stay node-specific.
- Hover, focus, pressed, disabled, slider, carousel transition, newsletter validation, search/cart/login, mobile/tablet, and age-state UI variants are not fully extracted.

## Decisions Required Before Implementation

- Age-state/root route rendering.
- Crawler/indexability/metadata policy.
- Permanent asset source approval.
- CTA and route destination approval.
- Product/legal approval for tobacco product and marketing content.
- Security approval for any remote domains or third-party integrations.
- Footer newsletter, social, legal, trust-claim, accessibility, and Ascend behavior approval.
- Catalog approval for Clothier product names, descriptions, swatches, and `Top Gift` badges.

## Readiness Verdict

READY FOR ASSET COLLECTION with a precise asset-and-decision checklist.

BLOCKED for implementation.
