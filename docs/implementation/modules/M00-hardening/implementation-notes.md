# M00 Hardening - Implementation Notes

Status: PR-1 implementation note
Last updated: 2026-07-09

## What Was Implemented

- Security header helpers and Next config integration
- Environment-aware CSP helper
- Age-state and route-access helpers
- Secure age-state cookie serialization helpers
- Age-state provider contract
- SEO/discovery route manifest, indexability helpers, metadata builder, schema builders, robots, and sitemap
- SiteShell contract, navigation data contract, and ImagePlaceholder contract
- GitHub Actions CI workflow
- Unit, component, and Playwright header tests

## What Was Not Implemented

- No full marketing pages
- No Figma visual pages
- No PR-2 age gate or homepage implementation
- No product data, prices, policies, legal claims, or fake assets
- No package installs
- No changes to `app/page.tsx`

## Route Indexability Decisions

The sitemap includes only implemented public indexable routes. At PR-1, that is only `/`.

Planned routes stay typed and visible to tests, but are excluded from the sitemap until implemented.

## Security Header Policy

The baseline policy is intentionally conservative:

- Deny framing with `X-Frame-Options` and CSP `frame-ancestors`.
- Disable unused browser capabilities through `Permissions-Policy`.
- Keep COOP at `same-origin`.
- Avoid local-dev HSTS assumptions.

## CSP Development vs Production

Development CSP allows `unsafe-eval` for tooling. Production CSP removes it. Both policies keep inline styles/scripts temporarily because Next and Tailwind runtime output still need a final nonce/hash strategy review.

## Age-State Policy

Age states:

- `unknown`
- `over21`
- `under21`

Only `over21` and `under21` are persisted. The cookie stores no PII and no date of birth.

## Remaining PR-2 Assumptions

- Exact under-21 visual behavior and route destination
- Product/legal approval for blurred background imagery
- Which brand/legal routes under-21 users can access
- Final persistence mechanism for age state
- Final crawler behavior for gated routes
- Section-by-section Figma extraction order for over-21 home

## Why No Visual Figma Pages Were Implemented

PR-1 is the foundation hardening layer. The PR-0 plan requires over-21 pages to be extracted section-by-section because full-page over-21 nodes time out in MCP metadata/context calls. PR-2 owns that visual extraction and implementation work.
