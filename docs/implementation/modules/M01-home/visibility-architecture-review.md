# Visibility Architecture Review

Status: BLOCKED
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata on `13148:15012` returned HTTP 504.
- Source assumptions: review uses `.cursor/agents/velarro-visibility-architect.md` and `.cursor/skills/velarro-visibility-coding`.
- Unresolved blockers: age/crawler policy, metadata copy, schema eligibility, permanent social images, link destinations, product/legal approvals, and implementation tests.

## Pages / Components Reviewed

- `/` M01 over-21 homepage plan.
- Current `app/page.tsx`, `app/layout.tsx`, `components/layout/*`, `components/layout/navigation-data.ts`.
- `lib/seo/*`, `lib/age/route-access.ts`, route docs, screen and asset manifests.

## Visibility Improvements Required

- REQUIRED: full section-level Figma specs are now complete enough for asset collection for the card bands and footer, but implementation still requires permanent assets, approved copy, approved destinations, and interaction behavior.
- BLOCKER: current `/` is marked implemented/public/indexable while rendering create-next-app starter content.
- BLOCKER: crawler/social-preview behavior for `unknown`, `over21`, and `under21` is unresolved.
- Primary homepage content must render as semantic, crawlable HTML rather than image-only text.

## Visibility Architect Update - 2026-07-10

The Velarro Visibility Architect returned a split verdict:

- Planning/docs can move to `READY FOR ASSET COLLECTION`.
- Implementation remains `BLOCKED` until permanent assets, age/crawler policy, under-21/unknown behavior, CTA routes, legal/product approvals, and deeper behavior specs are approved.
- Metadata remains blocked pending approved page title, description, canonical, robots behavior, OG/Twitter image policy, and social preview behavior.
- Structured data remains blocked for Product, ItemList, FAQPage, Article, LocalBusiness, Offer, price, availability, review, or rating schema until matching visible approved content exists.
- Repeated CTA labels such as `SHOP NOW` and `EXPLORE` require destination-specific accessible names.
- Do not add hreflang, geo pages, fake localized pages, or city/country targeting.

## Metadata Requirements

- Use `buildPageMetadata()` for `/` only after approved visible homepage copy exists.
- Canonical must be `https://velarroestate.com`.
- Robots/indexability must match approved age and crawler behavior.
- OG/Twitter images must be production assets, never Figma URLs.
- Current root layout description mentioning cigars requires product/legal approval for unknown and under-21 treatment.

## Structured Data Requirements

- Organization and WebSite schema may be appropriate with approved brand fields.
- WebPage schema may be appropriate for `/` only if fields map to visible approved copy.
- No Product, ItemList, FAQPage, Article, LocalBusiness, Offer, price, availability, review, or rating schema until exact visible approved content exists.
- Under-21 and unknown states must not emit tobacco product JSON-LD or tobacco marketing schema.

## Internal Linking Requirements

- Header, footer, and CTAs must point to real Velarro routes.
- Repeated CTA labels such as `SHOP NOW` and `EXPLORE` need accessible destination-specific labels.
- Links to future module routes must not create broken paths; route handling, gates, or deferrals must be explicit.
- Footer legal/accessibility links must use approved route map entries.
- `navigation-data.ts` requires review because `/the-house` is pending/review-gated in route planning but currently appears in over-21 navigation as not requiring over-21.
- Footer links now extracted for approval: `Our Story`, `The Humidor`, `The House`, `Craftsmanship`, `Limited Editions`, `Track Order`, `Sustainability`, `Press`, `Contact Us`, `FAQ`, `Privacy Policy`, `Terms of Service`, `Cookie Policy`, and `Accessibility`.
- Footer social links now extracted for approval: Instagram, YouTube, Facebook, Twitter, and LinkedIn.

## International / Hreflang Requirements

- Current `html lang="en"` is sufficient.
- Do not add hreflang until real localized variants exist.
- Do not create geo pages, fake locations, or city/country keyword targeting.

## SXO / Accessibility / Performance Notes

- One visible page-level `h1` is required.
- Section headings should descend logically.
- Hero and feature imagery needs stable dimensions, production URLs, `next/image`, and no CLS.
- Carousel controls need keyboard behavior, accessible names, focus states, and reduced-motion behavior.
- Text over images needs contrast verification at 1440px and responsive widths.
- Age gate must be accessible and must not expose blocked tobacco content to under-21 users.

## Spam Or Policy Risks

| Risk | Status | Notes |
| --- | --- | --- |
| Tobacco metadata/schema leakage | High | Must resolve unknown/under-21 crawler behavior. |
| Figma URLs in metadata/schema | High | Hard block. |
| Duplicate homepage | Medium | `15967:43304` is a prototype entry duplicate; canonical should remain root only. |
| Product/offer/review schema | Medium | Do not add without approved visible data. |
| Geo stuffing | Low | Avoid location claims unless approved. |
| Claim-like footer/product copy | Medium | `Top Gift`, `Highest level of Encryption, Security and Trust`, store/lounge claims, and warning text need approval. |

## Final Verdict

READY FOR ASSET COLLECTION.

BLOCKED for implementation.
