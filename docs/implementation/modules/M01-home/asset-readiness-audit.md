# M01 Homepage Asset Readiness Audit

Status: audit complete
Audit date: 2026-07-10
Branch: `feature/m01-homepage-asset-readiness`

## 1. Current Branch And Git Status

| Item | Value |
| --- | --- |
| Branch | `feature/m01-homepage-asset-readiness` |
| Working tree | Clean at audit time (no staged or unstaged changes before this doc was added) |
| Commit/push/PR | None created as part of this task |
| Production UI code | Not modified |

## 2. Directories And Files Inspected

### Repository asset locations

| Path | Result |
| --- | --- |
| `public/` | Inspected — contains only create-next-app starter SVGs |
| `public/assets/m01-home/` | Does not exist |
| `public/icons/` | Does not exist |
| `public/fonts/` | Does not exist |
| `public/images/` | Does not exist |
| `app/` | Inspected — `page.tsx` references starter assets; `favicon.ico` is default Next.js icon |
| `app/favicon.ico` | Present (25,931 bytes) — starter/default, not Velarro-approved |
| `components/` | Inspected — no image, icon, font, or logo file references |
| `components/layout/` | Inspected — no asset imports |
| `components/ui/image-placeholder.tsx` | Inspected — placeholder contract only; not a production asset source |
| `docs/implementation/modules/M01-home/` | All 13 planning docs read for this audit |
| `docs/figma/asset-inventory.json` | Inspected — planning inventory only |
| `docs/figma/screenshots/` | Inspected — 26 PNG reference screenshots exist; not production assets |
| `lib/security/content-security-policy.ts` | Inspected — `img-src 'self' data: blob:` only |
| `next.config.ts` | Inspected — no `images.remotePatterns` or remote domain approval |
| `app/globals.css` | Inspected — Gotham falls back to Arial/Helvetica |
| `app/layout.tsx` | Inspected — Noto Sans via Google Fonts; no Gotham or OneSignature files |

### Planning docs read

- `vishnu-required-decisions-and-assets.md`
- `asset-and-permanent-image-inventory.md`
- `figma-section-inventory.md`
- `layer-by-layer-visual-specification.md`
- `implementation-sequence.md`
- `security-architecture-review.md`
- `visibility-architecture-review.md`
- `definition-of-done.md`

## 3. Assets Found

### Production-usable local assets

| File | Type | Notes |
| --- | --- | --- |
| — | — | No Velarro M01 production assets found in `public/` or elsewhere |

### Starter / non-production assets present

| File | Type | M01 relevance |
| --- | --- | --- |
| `public/file.svg` | Starter SVG | Not Velarro; must be removed during implementation |
| `public/globe.svg` | Starter SVG | Not Velarro |
| `public/next.svg` | Starter SVG | Referenced by `app/page.tsx`; not Velarro |
| `public/vercel.svg` | Starter SVG | Referenced by `app/page.tsx`; not Velarro |
| `public/window.svg` | Starter SVG | Not Velarro |
| `app/favicon.ico` | Default favicon | Not Velarro-approved brand favicon |

### Reference-only assets (docs / Figma extraction)

| Location | Count | Status |
| --- | ---: | --- |
| `docs/figma/screenshots/M01-home-*.png` | 3 M01 screenshots | Visual comparison references only |
| `docs/figma/screenshots/` (all modules) | 26 PNG files | Planning references only |
| Figma MCP asset URLs / hashes / IDs in planning docs | Many | Extraction markers only; hard-blocked for runtime |

### Runtime typography currently available

| Asset | Source | M01 fidelity |
| --- | --- | --- |
| Noto Sans (weight 500) | `next/font/google` in `app/layout.tsx` | Partial — Title/title-2 token only |
| Arial / Helvetica fallback | `--font-family-primary` in `globals.css` | Interim fallback only; not Figma Gotham match |

## 4. Assets Missing

All M01 homepage permanent assets under the approved target path `public/assets/m01-home/` are missing.

### Summary by category

| Category | Required count | Found | Missing |
| --- | ---: | ---: | ---: |
| Hero / feature backgrounds | 4 | 0 | 4 |
| Cigar carousel card images | 6 | 0 | 6 |
| Cigar knowledge card images | 3 | 0 | 3 |
| Clothier product images | 3 | 0 | 3 |
| Estate collection card images | 6 | 0 | 6 |
| Navbar logo / script treatment | 1 | 0 | 1 |
| Navbar utility icons (menu, search, cart, login) | 4+ | 0 | 4+ |
| Carousel arrow controls | 2 sets (cigar + estate) | 0 | 2 |
| Footer social icons | 5 | 0 | 5 |
| Footer brand marks | 2 | 0 | 2 |
| Footer utility icons (accessibility, ascend) | 2 | 0 | 2 |
| Licensed Gotham webfont files | TBD | 0 | All weights needed |
| OneSignature / logo script font or export | 1 | 0 | 1 |
| Velarro favicon | 1 | 0 | 1 (starter `app/favicon.ico` is not approved) |
| OG/Twitter social preview image | 1 (if approved) | 0 | 1 |

**Total permanent M01 image/icon/logo slots: 39+ files missing.**

## 5. Exact Match Table

Target implementation path convention: `public/assets/m01-home/<section>/<filename>` unless Vishnu supplies an alternate approved naming map.

| Required asset | Matching local file | Confidence | Reason | Blocking |
| --- | --- | --- | --- | --- |
| `asset-home-navbar-logo-script` — Velarro Estate wordmark / OneSignature script | None | none | No logo SVG/PNG or licensed script font in repo | Yes |
| `asset-home-navbar-icons` — menu, search, cart, login | None | none | No `public/icons/` or inline approved SVG exports | Yes |
| `asset-home-hero-collector` — Collector Series hero (1441×851) | None | none | `public/assets/m01-home/` does not exist | Yes |
| `asset-home-hero-roastery` — Roastery hero (1441×851) | None | none | No permanent hero file | Yes |
| Cigar carousel — Ashtrays | None | none | No card image | Yes |
| Cigar carousel — Verde Classico | None | none | No card image | Yes |
| Cigar carousel — Lighters | None | none | No card image | Yes |
| Cigar carousel — Vintage no. 88 | None | none | No card image | Yes |
| Cigar carousel — Pipes | None | none | No card image | Yes |
| Cigar carousel — Nocturne | None | none | No card image | Yes |
| Cigar carousel — left/right arrow controls (44×44) | None | none | No local SVG/icon exports | Yes |
| Cigar knowledge — Limited Compendium (356×309) | None | none | No card image | Yes |
| Cigar knowledge — Reserve (356×309) | None | none | No card image | Yes |
| Cigar knowledge — Night Series (356×309) | None | none | No card image | Yes |
| `asset-home-gifting-background` — Gifting feature (1338×696) | None | none | No feature background | Yes |
| Clothier — Estate Oversized T-shirt (264×264) | None | none | No product image | Yes |
| Clothier — Heritage Dad Cap (264×264) | None | none | No product image | Yes |
| Clothier — Estate Weekender Jacket (264×264) | None | none | No product image | Yes |
| Estate collection — Estate Espresso | None | none | No card image | Yes |
| Estate collection — Founder's Boxy hoodie | None | none | No card image | Yes |
| Estate collection — Roastery | None | none | No card image | Yes |
| Estate collection — The cabinet | None | none | No card image | Yes |
| Estate collection — Estate oversized T-shirt | None | none | No card image | Yes |
| Estate collection — Humidors | None | none | No card image | Yes |
| Estate collection — carousel arrows (44×44) | None | none | No local SVG/icon exports | Yes |
| `asset-home-store-lounge-background` — Store & lounge (1236×1065) | None | none | No feature background; location claim also unapproved | Yes |
| Footer — Instagram icon | None | none | No social icon export | Yes |
| Footer — YouTube icon | None | none | No social icon export | Yes |
| Footer — Facebook icon | None | none | No social icon export | Yes |
| Footer — Twitter icon | None | none | No social icon export | Yes |
| Footer — LinkedIn icon | None | none | No social icon export | Yes |
| Footer — Estate brand mark (265×90) | None | none | No approved logo export | Yes |
| Footer — Lower trust/logo mark (128×35) | None | none | No approved export; purpose unidentified | Yes |
| Footer — accessibility icon (24px) | None | none | No utility icon; widget deferred per safe default | Yes |
| Footer — Ascend arrow-up icon (24px) | None | none | No utility icon export | Yes |
| `asset-font-gotham` — Light, Book, Medium (+ variants) | None | none | Licensed files not in `public/fonts/`; CSS uses Arial fallback | Yes |
| `asset-font-onesignature-or-logo` | None | none | No licensed font or approved logo raster/SVG | Yes |
| Velarro favicon | `app/favicon.ico` | weak | File exists but is default Next.js favicon, not Velarro brand | Yes |
| OG/Twitter social preview image | None | none | No production social image; metadata policy unresolved | Yes |
| Docs screenshot `M01-home-13148-15012.png` | `docs/figma/screenshots/M01-home-13148-15012.png` | weak | Reference screenshot for visual comparison only | No for planning; Yes if mistaken for production |
| Docs screenshot `M01-home-full-13148-15012.png` | `docs/figma/screenshots/M01-home-full-13148-15012.png` | weak | Reference only | No for planning; Yes if mistaken for production |
| Starter `next.svg` | `public/next.svg` | none | Create-next-app default; unrelated to M01 design | No (must be removed at implementation) |
| Starter `vercel.svg` | `public/vercel.svg` | none | Create-next-app default | No (must be removed at implementation) |

## 6. Font And Logo Readiness

| Item | Status | Detail |
| --- | --- | --- |
| Gotham Light / Book / Medium | **Missing** | `globals.css` documents Gotham as production target but resolves to `Arial, Helvetica, sans-serif` |
| OneSignature / script logo treatment | **Missing** | No licensed font files and no approved logo export |
| Velarro wordmark (navbar/footer) | **Missing** | `docs/figma/asset-inventory.json` lists `asset-logo-velarro` as `pending-external-export` |
| Noto Sans (secondary) | **Available** | Loaded via Google Fonts; sufficient only for limited heading token |
| Favicon | **Not ready** | `app/favicon.ico` is starter/default, not brand-approved |

**Font/logo verdict:** Not ready. Exact Figma typography cannot be achieved without licensed Gotham files or Vishnu-approved logo exports.

## 7. Icon Readiness

| Icon set | Required | Found | Notes |
| --- | ---: | ---: | --- |
| Navbar — menu, search, cart, login | 4+ | 0 | No `public/icons/` directory |
| Cigar carousel arrows | 2 | 0 | Must be local SVG or approved export |
| Estate collection arrows | 2 | 0 | Same arrow treatment per Figma |
| Footer social — Instagram, YouTube, Facebook, Twitter, LinkedIn | 5 | 0 | URLs also unapproved |
| Footer utility — accessibility, ascend | 2 | 0 | Accessibility widget deferred; icons still needed for static button UI |
| OAuth icons (M02, not M01) | 3 | 0 | Listed in `asset-inventory.json`; out of M01 scope but confirms no icon library exists |

**Icon verdict:** Not ready. Icons may be implementable as hand-authored SVGs during approved implementation, but no approved exports or repo files exist today.

## 8. Image Readiness

| Section | Images required | Images found | Readiness |
| --- | ---: | ---: | --- |
| Collector hero | 1 | 0 | Blocked |
| Roastery hero | 1 | 0 | Blocked |
| Cigar carousel cards | 6 | 0 | Blocked |
| Cigar knowledge cards | 3 | 0 | Blocked |
| Gifting feature background | 1 | 0 | Blocked |
| Clothier product cards | 3 | 0 | Blocked |
| Estate collection cards | 6 | 0 | Blocked |
| Store/lounge feature background | 1 | 0 | Blocked |
| Footer brand marks | 2 | 0 | Blocked |
| OG/Twitter preview | 1 | 0 | Blocked |

**Image verdict:** Not ready. Zero permanent M01 photography or approved raster/SVG image files are present under `public/`.

## 9. CSP And Security Impact

| Control | Current state | M01 impact |
| --- | --- | --- |
| `img-src` | `'self' data: blob:` only | Local `public/assets/m01-home/` files are the only safe path without CSP changes |
| Remote image domains | None approved in `next.config.ts` | Figma MCP URLs, CDN URLs, and arbitrary remotes are blocked |
| `font-src` | `'self'` + `fonts.gstatic.com` | Gotham should be self-hosted when licensed; OneSignature cannot use unapproved remotes |
| Third-party scripts/widgets | None present | Newsletter provider, accessibility widget, analytics remain blocked |
| `ImagePlaceholder` with `imageUrl` | Supports remote URLs when passed | Must not be used with Figma or unapproved URLs in PR-2 |
| Age-state | Helpers exist; homepage not gated | Over-21 imagery must not render before approved gating |
| Starter homepage | External Vercel/Next.js links in `app/page.tsx` | Must be removed during implementation |

**Security verdict:** Local-only assets are compatible with current CSP. Implementation remains blocked because permanent local assets do not exist and age/crawler behavior is not yet approved on `/`.

## 10. Visibility And Metadata Impact

| Item | Current state | M01 impact |
| --- | --- | --- |
| Root metadata | `app/layout.tsx` sets indexable brand metadata mentioning cigars | Requires legal/product approval for unknown and under-21 crawler treatment |
| Page-level metadata for `/` | Not implemented | Blocked until approved visible copy and social image exist |
| OG/Twitter image | None | Cannot use Figma URLs or docs screenshots |
| Structured data | No M01 schema wired | Organization/WebSite/WebPage may be allowed later; Product/Offer/Review/FAQ/Article/LocalBusiness remain blocked per safe defaults |
| Alt text | Not applicable — no production images | Vishnu must approve alt intent per image slot |
| Internal links / CTAs | Draft `navigation-data.ts` only | All `SHOP NOW`, `EXPLORE`, footer, and social destinations unapproved |
| Crawler behavior | Unresolved | Safe default: brand-level metadata only for crawlers/social previews |
| Docs screenshots | 26 reference PNGs | Useful for localhost visual comparison only |

**Visibility verdict:** Planning is visibility-aware, but metadata and schema cannot be finalized without approved assets, copy, destinations, and age/crawler policy.

## 11. Are Local-Only Assets Enough For Implementation?

**Yes, in principle — but only after Vishnu supplies them.**

Current CSP and `next.config.ts` support self-hosted assets under `public/` with no remote domain changes. The approved target folder `public/assets/m01-home/` does not exist and contains zero files.

Local-only is the correct and preferred path. It is not sufficient today because the required files have not been collected, named, cropped, or approved.

## 12. Remaining Assets Vishnu Must Provide

### Priority 1 — above the fold

1. Navbar Velarro Estate logo/script treatment (licensed font or approved SVG/PNG export)
2. Navbar utility icons or approval to derive from Figma exports
3. Collector Series hero image (permanent, cropped for 1441×851 display)
4. Velarro brand favicon

### Priority 2 — primary content bands

5. Six cigar carousel card images (Ashtrays, Verde Classico, Lighters, Vintage no. 88, Pipes, Nocturne)
6. Cigar carousel left/right arrow icons (or approved SVG spec)
7. Roastery hero image
8. Three cigar knowledge card images with approved alt text

### Priority 3 — feature and product bands

9. Gifting feature background image
10. Three Clothier product images with approved catalog data
11. Six Estate collection carousel images
12. Estate collection arrow icons
13. Store/lounge feature background (only if location claim is approved)

### Priority 4 — footer and system assets

14. Five footer social icons
15. Footer Estate brand mark and lower 128×35 mark (with purpose identification)
16. Footer accessibility and Ascend arrow-up icons
17. Licensed Gotham webfont files (Light, Book, Medium at minimum)
18. OneSignature font license or approved logo export alternative
19. Production OG/Twitter social preview image (if social previews are approved)

### Delivery format

- Place files under `public/assets/m01-home/` using a consistent naming map Vishnu approves
- Provide alt-text intent and CTA destination per image/card
- Confirm crop/display dimensions match Figma slots documented in `asset-and-permanent-image-inventory.md`

## 13. Remaining Decisions Vishnu Must Approve

### Implementation gate

| Decision | Safe default applied in planning | Approval still required |
| --- | --- | --- |
| Implementation phrase | — | `START VELARRO IMPLEMENTATION` |

### Age, crawler, and route behavior

| Decision | Safe default | Approval required |
| --- | --- | --- |
| Unknown users on `/` | Age gate before over-21 content | Yes — confirm UX and persistence |
| Over-21 users | Figma-matched homepage | Yes |
| Under-21 users | No tobacco/product content, cart/checkout, or tobacco metadata | Yes |
| Crawlers / social previews | Safe brand-level metadata only | Yes — title, description, robots, canonical |
| Root metadata and indexability | Deferred until copy approved | Yes |

### Content, legal, and product

| Decision | Safe default | Approval required |
| --- | --- | --- |
| All CTA destinations (`SHOP NOW`, `EXPLORE`, cards, nav, footer) | — | Yes |
| Cigar/carousel/knowledge copy and destinations | Extracted from Figma | Yes |
| Clothier product names, descriptions, `Top Gift` badge, swatches | — | Yes |
| Surgeon General warning text | Extracted from Figma | Legal approval |
| Trust line `Highest level of Encryption, Security and Trust` | — | Security/legal approval or replacement |
| Store/lounge physical location claim | Blocked unless approved | Yes |
| Footer nav routes and under-21 access | — | Yes |
| Footer legal links (Privacy, Terms, Cookie, Accessibility) | — | Yes |
| Footer social URLs and accessible labels | — | Yes |

### Interaction and deferred features

| Decision | Safe default | Approval required |
| --- | --- | --- |
| Newsletter | Static/deferred — no endpoint | Yes — confirm static UI only |
| Accessibility widget | Deferred — no third-party widget | Yes — static icon/button behavior |
| Ascend control | Scroll to top | Yes — label and focus behavior |
| Carousel controls | Accessible previous/next per Figma initial state | Yes — keyboard and aria labels |
| Hero slider dots | Visible in Figma | Behavior not fully extracted — approval required |
| Schema | No Product/Offer/Review/FAQ/Article/LocalBusiness | Organization/WebSite/WebPage only if later approved |

## 14. Final Verdict

### **BLOCKED FOR M01 IMPLEMENTATION**

**Reasons:**

1. `public/assets/m01-home/` does not exist; zero permanent Velarro homepage assets are present.
2. Only create-next-app starter SVGs and a default `favicon.ico` exist in production paths.
3. All 22+ hero/card/feature images, logo treatment, favicon, and social preview image are missing.
4. All navbar, carousel, footer social, and utility icons are missing.
5. Licensed Gotham and OneSignature/logo assets are not available.
6. Docs screenshots and Figma extraction markers are reference-only and must not be used at runtime.
7. Blocking decisions (age/crawler policy, CTA routes, legal/product copy, newsletter, social URLs, store/lounge claim) remain unresolved.
8. `START VELARRO IMPLEMENTATION` has not been provided.

**Planning status:** READY FOR ASSET COLLECTION (consistent with `definition-of-done.md` and prior reviews).

**Next step for Vishnu:** Supply Priority 1 assets and confirm decisions in Section 13, then re-run this audit before requesting implementation.

---

## Audit Method

- Read all eight specified M01 planning documents.
- Enumerated `public/`, `app/`, `components/`, `docs/figma/`, and config/security files.
- Cross-referenced required asset IDs from `asset-and-permanent-image-inventory.md` and `vishnu-required-decisions-and-assets.md`.
- Applied user-specified safe defaults for age-state, CSP, schema, newsletter, accessibility, Ascend, carousel controls, social URLs, and store/lounge claim.
- Did not use Figma MCP asset URLs, hashes, or docs screenshots as production asset matches.
