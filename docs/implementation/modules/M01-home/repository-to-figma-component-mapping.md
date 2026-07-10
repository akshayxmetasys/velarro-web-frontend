# Repository-To-Figma Component Mapping

Status: planning mapping
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata on `13148:15012` returned HTTP 504.
- Source assumptions: existing components are evaluated by actual behavior, not by similar names alone.
- Unresolved blockers: permanent assets, approved destinations, behavior states, responsive behavior, and age/crawler policy are incomplete.

## Existing Files Relevant To M01

| File | Current role | M01 implication |
| --- | --- | --- |
| `app/page.tsx` | Starter placeholder page | Must be replaced only after implementation approval. |
| `app/layout.tsx` | Global metadata, font, body shell | Metadata may need route-specific replacement or helper usage after age/crawler policy is approved. |
| `app/globals.css` | Figma token baseline | Reuse existing tokens; add section-only values locally unless a global token is proven wrong. |
| `components/layout/site-header.tsx` | Structural placeholder header | Likely not enough for Figma navbar fidelity; should be extended or replaced by `MainNavbar` implementation. |
| `components/layout/site-footer.tsx` | Structural footer placeholder | Needs Figma footer implementation later. |
| `components/layout/navigation-data.ts` | Draft age-aware navigation lists | Needs route/legal review; `/the-house` conflict must be resolved. |
| `components/ui/button.tsx` | Base button primitive | Reuse if exact Figma button states can be achieved without reducing fidelity. |
| `components/ui/route-backed-modal-shell.tsx` | Modal shell | Relevant later for login/signup; homepage should link to M02 route-backed modals only after approval. |
| `lib/age/*` | Age-state helpers | Required before rendering over-21 homepage. |
| `lib/seo/*` | Metadata, schema, sitemap, robots | Required for truthful metadata and indexability. |
| `lib/security/*` | CSP, headers, cookie options | Required for image/domain and age-cookie security decisions. |

## Section Mapping

| Section | Existing tokens/components to reuse | Extension/new component needed | Server/client boundary | Accessibility/test needs |
| --- | --- | --- | --- | --- |
| Navbar | Color tokens, focus ring, route data, layout shell | `MainNavbar` or extended `SiteHeader`; local icons/logo | Mostly Server Component; search/menu may need client behavior | Nav landmark, accessible labels, keyboard focus, route tests |
| Collector hero | Typography tokens, button primitive maybe | `HomeHeroSection`, `HeroSliderDots` | Server unless slider becomes interactive | One `h1`, CTA accessible name, image priority test |
| Cigar carousel | Card tokens, button primitive | `HomeCardCarousel`, `HomeCategoryCard` | Client if carousel scroll/controls are interactive | Keyboard carousel controls, image alt, no CLS, six extracted labels |
| Roastery hero | Same as hero | Reusable hero variant | Server/client depends on slider behavior | Heading hierarchy, CTA destination |
| Cigar knowledge | Card/button primitives | Editorial/category card section | Server unless carousel | Three extracted cards, card link names, heading hierarchy |
| Gifting feature | Button primitive | `HomeFeaturePanel` | Server | Text contrast over image, CTA name |
| Clothier cards | Card/button primitives | Product/category card section | Server unless carousel | Product claims, swatches, badges only after approval |
| Estate collection | Card carousel primitives | Reusable carousel variant | Client if carousel | Controls, visible item count, active/dimmed state, route checks |
| Store/lounge feature | Button primitive | Feature panel variant | Server | Avoid unapproved physical location claims |
| Footer | Input/button primitives, footer shell | `MainFooter`, newsletter form shell | Client only if form behavior exists; otherwise static | Form labels, social links, legal links, warning text, utility controls |

## Extracted Component Data Now Available

| Planned component | Data available for future implementation | Still blocked by |
| --- | --- | --- |
| `HomeCardCarousel` | Cigar carousel six-card order, active center state, dimmed side card state, arrow node sizes. | Permanent images, destinations, carousel behavior, keyboard/focus states. |
| `HomeCategoryCard` | Cigar carousel and Estate collection card typography, borders, radii, image overlay, EXPLORE button state. | Approved asset files, alt text, destinations. |
| `HomeKnowledgeCard` or card variant | Cigar knowledge three-card copy and shared dimensions. | Permanent images, destinations, copy approval. |
| `HomeProductCard` | Clothier names, descriptions, `Top Gift` badge, swatches, image dimensions. | Catalog/legal approval, copy cleanup, destinations. |
| `MainFooter` | Full footer link text, newsletter copy/fields, warning, trust line, copyright, social/utility controls. | Routes, URLs, legal approval, newsletter behavior, accessibility/Ascend behavior. |

## Components Not Ready For Blind Reuse

- Existing `SiteHeader` and `SiteFooter` are structural placeholders, not Figma-matched components.
- `ImagePlaceholder` is not suitable for production remote images or Figma temporary URLs.
- Existing navigation data is a draft and conflicts with unresolved under-21 review decisions for some routes.

## New Component Boundaries To Plan

- `components/m01-home/home-page.tsx`
- `components/m01-home/home-hero-section.tsx`
- `components/m01-home/home-card-carousel.tsx`
- `components/m01-home/home-category-card.tsx`
- `components/m01-home/home-feature-panel.tsx`
- `components/layout/main-navbar.tsx`
- `components/layout/main-footer.tsx`

These are planned only. Do not create them until implementation is approved.
