---
name: velarro-visibility-coding
description: >-
  Enforces SEO, AEO, GEO, SXO, AIO, accessibility, and discoverability while
  building or reviewing Velarro pages, layouts, components, cards, buttons,
  headers, footers, route metadata, structured data, internal links, responsive
  UX, or content sections. Use when implementing or reviewing Velarro UI,
  routes, metadata, schema.org JSON-LD, hreflang, breadcrumbs, alt text,
  canonical URLs, sitemaps, or search visibility.
---
<!-- codex-skill-mirror: generated-from=.cursor/skills/velarro-visibility-coding/SKILL.md; do-not-edit -->


# Velarro Visibility Coding Skill

Apply this skill during Velarro implementation and review. Maximize visibility through legitimate technical architecture, helpful content, structured data, accessibility, performance, clean semantics, and real localization only.

## Repository boundary

- Work only in `velarro-web-frontend` on Velarro Estate routes and components.
- Do not invent copy, products, prices, reviews, locations, translations, routes, or schema.
- Use approved visible content only. Report gaps as blockers — do not fill them.

## Project SEO utilities

Prefer existing helpers before adding new SEO logic:

| Utility | Path | Use for |
|---------|------|---------|
| Page metadata | `lib/seo/metadata.ts` → `buildPageMetadata()` | title, description, canonical, OG, robots |
| Canonical URLs | `lib/seo/indexability.ts` → `buildCanonicalUrl()` | absolute canonical paths |
| Route indexability | `lib/seo/route-manifest.ts`, `lib/seo/indexability.ts` | `implemented`, `public`, `indexable` flags |
| Sitemap / robots | `lib/seo/discovery-manifest.ts` | indexable routes only in sitemap |
| JSON-LD builders | `lib/seo/schema.ts` | Organization, WebSite, BreadcrumbList, Product, FAQPage, Article, LocalBusiness |

Default indexability rule: unimplemented routes stay `noindex` until `implemented && public && indexable` in the route manifest.

Site base: `https://velarroestate.com` (`SITE_URL` in `lib/seo/route-manifest.ts`).

## Core enforcement rules

### Semantic HTML first

- Use semantic elements (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `h1`–`h6`, `figure`, `figcaption`, `button`, `a`) before generic `div`/`span`.
- One `h1` per page/view; descending heading levels without skips.
- Landmarks and headings must reflect visible structure, not SEO-only blocks.

### Metadata

- Every route gets page-specific `title` and `description` via `buildPageMetadata()` or equivalent.
- Set canonical URL for every indexable page; match the rendered route.
- Open Graph and Twitter metadata must align with visible page content.
- `robots` index/follow must match route manifest indexability — never index unfinished or private routes.
- `metadataBase` stays `https://velarroestate.com`.

### Structured data

- JSON-LD must be truthful and based only on visible, approved content.
- Use builders in `lib/seo/schema.ts`; never pass placeholder, TBD, or Figma CDN URLs.
- Schema types — use only when appropriate and content exists:
  - `Organization`, `WebSite` — site-wide
  - `WebPage` — page context when useful
  - `BreadcrumbList` — when breadcrumbs are shown
  - `Product` — only for real products with approved name, description, URL, crawlable image
  - `CollectionPage` / `ItemList` — real curated lists only
  - `FAQPage` — only when FAQ content is visibly on the page
  - `Article` — editorial with approved headline and URL
  - `LocalBusiness` — only with verified address/phone; never invent locations
- Image URLs in schema must be production crawlable URLs, not temporary Figma assets.
- No `AggregateRating`, review, offer, price, or availability schema unless explicitly approved and visible.

### Images and alt text

- Every meaningful image: descriptive `alt` reflecting visible content.
- Decorative images: `alt=""` or `role="presentation"`.
- No keyword stuffing in alt text.

### Internal linking

- Links use real Velarro routes from the route manifest.
- Anchor text describes the destination; avoid generic "click here".
- Breadcrumbs on nested pages when they aid users and crawlers.
- Header, footer, and in-content links should reinforce page hierarchy.
- No doorway-style cross-linking or geo-stuffed anchor text.

### International / hreflang

- `hreflang` only for real localized page variants with unique approved content.
- Do not create fake city/country landing pages or keyword-stuffed location pages.

### SXO, accessibility, performance

- Fast, responsive layout; avoid layout shift from images and fonts.
- Keyboard-accessible interactive elements; visible focus states.
- Sufficient color contrast; form labels tied to inputs.
- CTAs clear and non-deceptive; no hidden interactive traps.
- Crawlable HTML for primary content — do not hide indexable text in client-only shells without SSR/SSG equivalent.

### Hard blocks (must fix before merge)

- City/country keyword stuffing
- Doorway pages
- Hidden SEO text (`display:none`, off-screen, same-color text, aria-hidden indexable copy)
- Fake reviews, ratings, locations, products, pricing, or availability
- Temporary Figma image URLs in metadata or schema
- Structured data describing content not visible to users
- Bulk AI pages without unique user value

## Workflow

### When building a page or component

1. Confirm route exists in `lib/seo/route-manifest.ts` with correct `implemented`, `public`, `indexable`.
2. Implement semantic HTML structure and heading hierarchy first.
3. Add page-specific metadata through `buildPageMetadata()`.
4. Add JSON-LD only for visible approved content using `lib/seo/schema.ts` builders.
5. Add breadcrumbs and internal links where hierarchy warrants them.
6. Set descriptive alt text on images; use production image URLs.
7. Verify responsive UX, keyboard access, and focus behavior.
8. Run visibility self-check (below) and fix hard blocks before claiming done.

### When reviewing code

1. Identify in-scope routes, layouts, and components from the diff or user prompt.
2. Cross-check metadata, schema, links, and semantics against visible/approved content.
3. Verify route manifest indexability matches robots and sitemap inclusion.
4. Flag spam risks and hard blocks.
5. Return the required output format below.

## Required output format

After every visibility review or pre-completion check, return these seven sections:

```markdown
## 1. Visibility checklist
- [ ] Route has clear user purpose and search purpose
- [ ] Semantic HTML landmarks present
- [ ] Single h1; logical heading hierarchy
- [ ] Primary content crawlable in HTML
- [ ] Route manifest flags correct (implemented / public / indexable)
- [ ] Page-specific metadata present
- [ ] Canonical URL set and correct
- [ ] Robots/indexability aligned with manifest
- [ ] Internal links and breadcrumbs support hierarchy
- [ ] Images use production URLs with appropriate alt text
- [ ] No hard-block violations

## 2. Metadata checklist
- [ ] Unique title (fits template: `%s | Velarro Estate`)
- [ ] Unique description from approved copy
- [ ] Canonical via buildCanonicalUrl / alternates.canonical
- [ ] Open Graph title, description, url, siteName
- [ ] Robots index/follow matches indexability
- [ ] No placeholder or invented copy
- [ ] No Figma URLs in OG/Twitter images

## 3. Structured data checklist
- [ ] JSON-LD uses lib/seo/schema.ts builders
- [ ] Every field maps to visible approved content
- [ ] Schema type appropriate for page (no over-marking)
- [ ] Image URLs crawlable and production-hosted
- [ ] No fake ratings, offers, prices, or availability
- [ ] FAQ schema only when FAQ is on-page
- [ ] BreadcrumbList matches visible breadcrumbs

## 4. Internal linking checklist
- [ ] Links point to real manifest routes
- [ ] Descriptive anchor text
- [ ] Parent/child hierarchy reinforced
- [ ] Footer/nav links consistent with site structure
- [ ] No doorway or geo-stuffed link patterns

## 5. SXO / accessibility checklist
- [ ] Responsive layout without horizontal overflow
- [ ] Keyboard navigable; visible focus
- [ ] Buttons/links have accessible names
- [ ] Form inputs labeled
- [ ] Color contrast sufficient
- [ ] Images sized to reduce CLS
- [ ] CTAs clear; no deceptive UX

## 6. Spam-risk check
| Risk | Status (None / Low / High) | Notes |
|------|---------------------------|-------|
| Keyword stuffing | | |
| Doorway pages | | |
| Hidden SEO text | | |
| Fake schema / reviews / locations | | |
| Fake localized / hreflang pages | | |
| Thin or duplicate content | | |
| Figma URLs in metadata/schema | | |

## 7. Required fixes
List concrete file-level fixes. Use severity:
- **BLOCKER** — hard-block violation; must fix before merge
- **REQUIRED** — visibility gap that should be fixed in this PR
- **FOLLOW-UP** — acceptable deferral with explicit reason

If no fixes: "None — visibility requirements met for in-scope changes."
```

Mark each checklist item `[x]` or `[ ]` with a brief note when failing.

## Implementation patterns

### Page metadata (Next.js App Router)

```typescript
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isRouteIndexable } from "@/lib/seo/indexability";
import { findRouteManifestEntry } from "@/lib/seo/route-manifest";

const route = findRouteManifestEntry("/approved-route");

export const metadata = buildPageMetadata({
  title: "Approved Page Title",
  description: "Approved description from content source.",
  path: "/approved-route",
  indexable: route ? isRouteIndexable(route) : false,
});
```

### JSON-LD injection

```tsx
import { buildBreadcrumbListSchema } from "@/lib/seo/schema";

const schema = buildBreadcrumbListSchema([
  { name: "Home", item: "https://velarroestate.com" },
  { name: "The Estate", item: "https://velarroestate.com/the-estate" },
]);

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

### Breadcrumbs

Add visible breadcrumb navigation and matching `BreadcrumbList` schema when page depth > 1. Breadcrumb labels must match visible link text.

## Coordination with other agents

- **velarro-visibility-architect** — use for plan-level or PR-level PASS/BLOCKED verdicts before/after major route work.
- This skill — apply during active coding and component-level review; produce the seven-section checklist output.

## Additional reference

For schema builder field requirements and placeholder rejection rules, see [schema-reference.md](schema-reference.md).
