# M00 Hardening - Discovery Foundation

Status: PR-1 implementation note
Last updated: 2026-07-09

## Scope

PR-1 creates the SEO/discovery foundation without inventing product content, legal claims, prices, locations, policies, or marketing copy.

## Implemented Files

- `lib/seo/route-manifest.ts`
- `lib/seo/indexability.ts`
- `lib/seo/discovery-manifest.ts`
- `lib/seo/metadata.ts`
- `lib/seo/schema.ts`
- `app/robots.ts`
- `app/sitemap.ts`

## Route Indexability Decisions

Only currently implemented, public, indexable routes enter the sitemap.

Current sitemap:

- `/`

Planned routes remain in the typed route manifest but are marked `implemented: false` and `indexable: false` until their real pages exist.

This prevents:

- Noindex or unimplemented routes entering the sitemap
- Invisible or placeholder content being exposed to crawlers
- Tobacco product routes being indexed before age-state and content rules are implemented

## Robots Directives

`app/robots.ts` allows `/`, points to `/sitemap.xml`, and disallows routes that are not currently indexable.

These directives are a foundation, not final SEO policy. PR-2+ must revisit robots/indexability once actual public pages exist.

## Schema Helpers

`lib/seo/schema.ts` provides JSON-LD builders for:

- Organization
- WebSite
- BreadcrumbList
- ItemList
- Product
- FAQPage
- Article
- LocalBusiness

Helpers reject placeholder or fake values such as `TBD`, `placeholder`, `example`, `fake`, or `unknown`. Product schema is available as a helper only; PR-1 does not add product schema to any page.

## AEO, GEO, SXO, AIO Notes

PR-1 establishes guardrails for future answer/search surfaces:

- Do not expose invisible content.
- Do not emit fake schema.
- Do not emit tobacco product structured data before age-state rules are implemented.
- Do not create answer-engine snippets for under-21 users that market cigars or tobacco.

Detailed AEO/GEO/SXO/AIO behavior remains a PR-2+ product/legal decision.
