# Section-By-Section Implementation Sequence

Status: planning only
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`, `13148:15014`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata on `13148:15012` returned HTTP 504.
- Source assumptions: files listed are expected future files, not files to create now.
- Unresolved blockers: assets, age-state policy, route destinations, interaction behavior, responsive behavior, and approvals.

## Implementation Units

| Unit | Scope | Figma source | Required assets | Expected files | Acceptance focus | Dependencies / decisions |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Root age-state shell | `13148:15012`, under-21 sources from PR-1/PR-3 docs | None beyond age UI assets | `app/page.tsx`, age helpers if approved | Unknown gated, under21 safe, over21 allowed | Root/crawler policy approval |
| 2 | Navbar | `14406:85640`, `14279:30062` | Logo/script, icons | `components/layout/main-navbar.tsx`, nav tests | 1440px match, accessible nav | Route/link approval |
| 3 | Collector hero | `15081:25289` | Hero image | `home-hero-section.tsx` | H1, image crop, slider dots, CTA | Asset and CTA approval |
| 4 | Cigar carousel | `13148:15033` | Six card images plus arrow icons | `home-card-carousel.tsx`, `home-category-card.tsx` | Six extracted labels, active center card, dimmed side cards, controls, keyboard behavior | Permanent assets, destinations, product approval |
| 5 | Roastery hero | `15451:37609` | Roastery image | Reuse hero variant | Image overlay, CTA | Asset/route approval |
| 6 | Cigar knowledge cards | `13148:15081` | Three 356 x 309 card images | Card section variant | Heading, three extracted cards, copy, links | Permanent assets, destinations, editorial/product approval |
| 7 | Gifting feature | `13148:15113` | Feature image | `home-feature-panel.tsx` | Overlay, contrast, CTA | Asset/route approval |
| 8 | Clothier cards | `13148:15120` | Three 264 x 264 product images | Card section variant | Product card fidelity, swatches, badge | Product/catalog/legal approval, copy cleanup |
| 9 | Estate collection carousel | `13148:15145` | Six card images plus arrow icon | Carousel variant | Extracted labels, active center card, dimmed side cards, controls | Permanent assets, destinations, carousel behavior approval |
| 10 | Store/lounge feature | `13148:15176` | Store/lounge image | Feature panel variant | Claim accuracy, crop, CTA | Location claim approval |
| 11 | Footer | `14468:34842` | Social icons, logo/marks, utility icons | `components/layout/main-footer.tsx` | Legal links, warning, newsletter a11y, social links, utility controls | Footer copy/form/social/legal/trust approval |
| 12 | Metadata/schema/tests | All | Production social image if approved | `app/page.tsx`, `lib/seo/*` tests | Truthful metadata/schema, no blocked content leakage | Crawler/age policy approval |

## Per-Unit Acceptance Criteria

Each unit needs:

- Scope confined to M01/home or shared layout only when justified.
- Figma node IDs recorded in comments/docs, not exposed as user-facing UI.
- 1440px visual match before responsive work.
- Accessible names and keyboard behavior for every interactive element.
- Visibility review alignment with visible approved content.
- Security review alignment with CSP, age-state, and no unapproved remotes.
- Unit/component tests where behavior exists.
- E2E checks for route and keyboard flows.
- Localhost viewport checks.

## Blocking Decisions Required From Vishnu

- Implementation approval phrase.
- Asset approval.
- Age/crawler/root route behavior.
- CTA destinations.
- Product/legal approval for visible tobacco content.
- Remote domain approval if local assets are not supplied.

## Asset Collection Order

1. Above-the-fold assets: navbar brand/logo treatment, collector hero image, hero CTA destination, root age-gate policy.
2. Cigar carousel assets: six card images and left/right arrow treatment.
3. Roastery and Gifting feature assets: permanent background images, crops, overlay/contrast approval, CTA destinations.
4. Cigar knowledge and Clothier assets: three images per row, card copy, product/catalog approval, swatches, badges, destinations.
5. Estate collection assets: six carousel images, arrow treatment, active initial state, destinations.
6. Store/lounge and Footer assets: store/lounge image and claim approval, social icons/URLs, footer logo/marks, accessibility icon, arrow-up icon, newsletter behavior.
