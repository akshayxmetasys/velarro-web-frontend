# Velarro Schema Reference

Quick reference for `lib/seo/schema.ts` builders. All string fields reject placeholders: empty, `tbd`, `todo`, `placeholder`, `lorem ipsum`, `example`, `fake`, `unknown`, `null`, `undefined`.

## Available builders

| Builder | Schema type | Minimum required fields |
|---------|-------------|-------------------------|
| `buildOrganizationSchema` | Organization | `name` |
| `buildWebSiteSchema` | WebSite | `name` |
| `buildBreadcrumbListSchema` | BreadcrumbList | ≥1 item with `name`, `item` (URL) |
| `buildItemListSchema` | ItemList | `name`, ≥1 item |
| `buildProductSchema` | Product | `name`, `description`, `url` |
| `buildFaqPageSchema` | FAQPage | ≥1 Q&A pair visible on page |
| `buildArticleSchema` | Article | `headline`, `url` |
| `buildLocalBusinessSchema` | LocalBusiness | `name`, `url` — address/phone only if verified |

## When to use each type

- **Organization / WebSite** — root layout or site-wide JSON-LD block
- **BreadcrumbList** — nested pages with visible breadcrumb UI
- **Product** — product detail pages with approved catalog data
- **ItemList / CollectionPage** — category or collection pages listing real items
- **FAQPage** — `/faq` or pages with an on-page FAQ section
- **Article** — `/the-chronicle`, `/pairing-guide`, or editorial entries
- **LocalBusiness** — only when a verified physical location is part of approved content

## Image URL rules

- Use production CDN or `/public` asset paths
- Reject `figma.com`, `figma-alpha`, and other temporary design-tool URLs
- Image must be the same asset shown to users on the page

## Fields to avoid unless explicitly approved

- `aggregateRating`, `review`, `ratingValue`, `reviewCount`
- `offers`, `price`, `priceCurrency`, `availability`
- `geo`, `areaServed` for invented location targeting
- `sameAs` social URLs not verified in approved content
