# Asset And Permanent Image Requirement Inventory

Status: planning inventory
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata failed with HTTP 504; section-level and card-level design context was used for nested assets.
- Source assumptions: Figma image hashes identify design fills only, not permanent production files.
- Unresolved blockers: no permanent product/hero image files or remote image domains are approved for implementation.

## Asset Policy

Figma MCP asset URLs are temporary and must not be used as production URLs. PR-2 implementation must use approved local files under `public/` or explicitly approved permanent remote URLs with matching `next.config.ts`, CSP, and tests.

Temporary Figma asset IDs listed below are extraction markers only. They are not approved URLs, source-of-truth filenames, or implementation inputs.

## Required Assets

| Asset ID | Figma node | Section | Purpose | Type | Source/display dimensions | Crop | Priority | Alt-text intent | Blocking |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `asset-home-navbar-logo-script` | `14406:85640` / `14279:30062` | Navbar | Velarro Estate wordmark | Text/logo asset or approved font | 173 x 54 text layer | N/A | Above fold | Brand text if image; otherwise real text | Yes, if OneSignature font/logo not licensed/approved |
| `asset-home-navbar-icons` | `14279:30062` nested vectors | Navbar | Menu, search, cart, login icons | SVG/vector | Various 15-24px icons | N/A | Above fold | Decorative where adjacent text exists | No if implemented as local vector/icons |
| `asset-home-hero-collector` | `15081:25289` | Collector hero | Background product/lifestyle image | JPG/WebP/AVIF | 1441 x 851 displayed | Crop mode | Above fold, priority | Meaningful product/lifestyle alt if image conveys content | Yes |
| `asset-home-hero-roastery` | `15451:37609` | Roastery hero | Background product/lifestyle image | JPG/WebP/AVIF | 1441 x 851 displayed | Fill/crop | High | Roastery product/lifestyle alt | Yes |
| `asset-home-cigar-carousel-cards` | `13148:15033` nested cards | Cigar carousel | Six category/product cards | JPG/WebP/AVIF | Side cards approx. 339 x 298-305; active approx. 381 x 335 | Crop/fill with 40% dark overlay | High | Product/category-specific alt | Yes |
| `asset-home-cigar-knowledge-cards` | `13148:15081` nested cards | Cigar knowledge | Three editorial/product card images | JPG/WebP/AVIF | 356 x 309 displayed | Crop with 40% dark overlay | Medium | Descriptive; no keyword stuffing | Yes |
| `asset-home-gifting-background` | `13148:15113` | Gifting feature | Feature background | JPG/WebP/AVIF | 1338 x 696 displayed | Fill | Medium | Gift collection image or decorative depending content approval | Yes |
| `asset-home-clothier-cards` | `13148:15120` nested cards | Clothier | Three product cards | JPG/WebP/AVIF | 264 x 264 displayed | Cover with 40% dark overlay | Medium | Product-specific alt only after approved catalog data | Yes |
| `asset-home-estate-collection-cards` | `13148:15145` nested cards | Estate collection | Six carousel cards | JPG/WebP/AVIF | Side image frame 323.58 x 286.18; active 360.48 x 318.81 | Crop/fill with 40% dark overlay | Medium | Item-specific alt | Yes |
| `asset-home-store-lounge-background` | `13148:15176` | Store and lounge | Feature background | JPG/WebP/AVIF | 1236 x 1065 displayed | Crop | Medium | Store/lounge image alt only if location claim approved | Yes |
| `asset-home-footer-social-icons` | `14468:34842` | Footer | Instagram, YouTube, Facebook, Twitter, LinkedIn links | SVG/vector | 28-35px displayed | N/A | Low | Decorative icons with accessible link labels | Yes |
| `asset-home-footer-brand-mark` | `14468:34842` | Footer | Estate icon/wordmark and lower trust/logo asset | SVG/vector or approved raster | 265 x 90 and 128 x 35 displayed | N/A | Low | Brand/trust text only if image conveys content | Yes |
| `asset-home-footer-utility-icons` | `14468:34842` | Footer | Accessibility and arrow-up controls | SVG/vector | 24px icons in 40px buttons | N/A | Low | Button labels required | Yes |
| `asset-font-gotham` | global | All sections | Primary typography | Licensed webfont | Gotham Light, Book, Medium | N/A | Site-wide | N/A | Yes for exact typography |
| `asset-font-onesignature-or-logo` | navbar/footer | Brand | Logo script treatment | Licensed font or exported logo | Needs approval | N/A | Above fold | Brand text if image | Yes |

## Next.js Image Requirements

- Above-the-fold hero image should use `next/image`, fixed dimensions or `fill` with stable parent dimensions, and `priority`.
- Card images should use `next/image` with known dimensions and no layout shift.
- Decorative background images must be marked decorative only if equivalent text is visible and approved.
- No `ImagePlaceholder` with arbitrary remote URLs.

## CSP And Remote Domain Notes

Current CSP allows `img-src 'self' data: blob:` only. No runtime remote image domain is approved. Local `public/` assets are the safest PR-2 path.

## Required From Vishnu

1. Permanent approved image files or production URLs for every hero, card, feature, footer, logo, and icon asset.
2. Confirmation that logo/script font usage is licensed or supplied as an approved export.
3. Approval of alt-text intent for product/category/location images.
4. Approval of any remote CDN domains before code begins.

See `vishnu-required-decisions-and-assets.md` for the consolidated intake checklist.

## Precise Extracted Asset Checklist - 2026-07-10

### Cigar Carousel Card Images

| Required file | Figma node | Visible label | Display/crop | Extraction marker | Approval needed |
| --- | --- | --- | --- | --- | --- |
| Permanent image 1 | `I14831:62911;14838:34292` | Ashtrays | Side card, crop, 40% overlay | image hash `c61b8e8422adc0f1ef1fd7742d828ce77c142689` | Asset, alt, destination |
| Permanent image 2 | `I14831:62911;14838:34298` | Verde Classico | Active card, crop, 40% overlay | image hash `37cb046192ab4b0c35f428982c7a26cfbf50d247` | Asset, alt, destination |
| Permanent image 3 | `I14831:62911;14838:34304` | Lighters | Side card, crop, 40% overlay | image hash `f3c049c3e0d3126a2c9bd6be358861352bfa2f42` | Asset, alt, destination |
| Permanent image 4 | `I14831:62911;14838:34310` | Vintage no. 88 | Off-canvas card, crop, 40% overlay | image hash `64c20b5b8b99eeb7affd689ca84c018650e29610` | Asset, alt, destination |
| Permanent image 5 | `I14831:62911;14838:34316` | Pipes | Off-canvas card, fill, 40% overlay | image hash `591ce12bd3cefdc577a09e531f3c8c9e7a2c2804` | Asset, alt, destination |
| Permanent image 6 | `I14831:62911;14838:34322` | Nocturne | Off-canvas card, fill, 40% overlay | image hash `44e8663d17569364ab05fd21cd74b82eca9d1b93` | Asset, alt, destination |

### Cigar Knowledge Images

| Required file | Figma node | Visible card | Display/crop | Temporary marker | Approval needed |
| --- | --- | --- | --- | --- | --- |
| Permanent image 1 | `14585:38786` image child | Limited Compendium | 356 x 309, crop, 40% overlay | `f048cea8-d96b-4f82-b56e-5f30a46fca0d` | Asset, alt, destination |
| Permanent image 2 | `14585:38795` image child | Reserve | 356 x 309, crop, 40% overlay | `d64cff4b-32fc-477b-8701-e79f20c25d29` | Asset, alt, destination |
| Permanent image 3 | `14585:38813` image child | Night Series | 356 x 309, crop, 40% overlay | `f762b9f2-3722-4c5e-a180-af4fb6a8123d` | Asset, alt, destination |

### Clothier Product Images

| Required file | Figma node | Visible card | Display/crop | Temporary marker | Approval needed |
| --- | --- | --- | --- | --- | --- |
| Permanent image 1 | `16604:97181` image child | Estate Oversized T-shirt | 264 x 264, cover, 40% overlay | `95a5fc4a-3b2b-4d98-92a2-c0c56622bd49` | Asset, alt, product data, destination |
| Permanent image 2 | `16604:97239` image child | Heritage Dad Cap | 264 x 264, cover, 40% overlay | `162df3f0-5f07-4ae2-b8e3-c1e6dd70cf6d` | Asset, alt, product data, destination |
| Permanent image 3 | `16604:97240` image child | Estate Weekender Jacket | 264 x 264, cover, 40% overlay | `4286baf4-86ca-4677-9245-8a601629a8af` | Asset, alt, product data, destination, copy cleanup |

### Estate Collection Images And Arrows

| Required file | Figma node | Visible card | Display/crop | Temporary marker | Approval needed |
| --- | --- | --- | --- | --- | --- |
| Permanent arrow icon | `14214:47102` via `14852:36641` | Carousel arrows | 44 x 44 | `c76c0f67-a12f-4340-a453-9bd8c80c492f` | Local SVG/icon and labels |
| Permanent image 1 | `I14852:36641;14852:35923` | Estate Espresso | Side card, crop, 40% overlay | `9c94928b-0325-4839-91be-37dadcbb5e5c` | Asset, alt, destination |
| Permanent image 2 | `I14852:36641;14852:35929` | Founder's Boxy hoodie | Active card, crop, 40% overlay | `671a194d-ba0b-418c-860b-44e9d3448512` | Asset, alt, destination |
| Permanent image 3 | `I14852:36641;14852:35935` | Roastery | Side card, crop, 40% overlay | `ad89c480-3bd0-4dde-bd7a-32b3fb7359ef` | Asset, alt, destination |
| Permanent image 4 | `I14852:36641;14852:35941` | The cabinet | Off-canvas card, crop, 40% overlay | `c977fb63-9d31-4c76-8b3e-295a852ad92d` | Asset, alt, destination |
| Permanent image 5 | `I14852:36641;14852:35947` | Estate oversized T-shirt | Off-canvas card, fill, 40% overlay | `36971ad4-aa9e-4d7a-bca4-261eaec6c09f` | Asset, alt, destination |
| Permanent image 6 | `I14852:36641;14852:35953` | Humidors | Off-canvas card, fill, 40% overlay | `e82dbd60-0c9b-4dab-a6d9-1b03c8c0a2d7` | Asset, alt, destination |

### Footer Icons And Marks

| Required file | Figma node | Purpose | Temporary marker | Approval needed |
| --- | --- | --- | --- | --- |
| Instagram icon | `I14468:34842;13964:58899` | Social link | `74d10fc8-abbf-41c8-b741-ae1b30cb232a` | URL and label |
| YouTube icon | `I14468:34842;13964:58903` | Social link | `a05d2e48-ac64-41a9-aa24-67a9816d0a15` | URL and label |
| Facebook icon | `I14468:34842;13964:58906` | Social link | `cd3151c1-653f-4881-b303-8f684dd5eb76` | URL and label |
| Twitter icon | `I14468:34842;13964:58908` | Social link | `159eae47-601d-4dc2-b59f-d578d0e0c3f5` | URL and label |
| LinkedIn icon | `I14468:34842;13964:58910` | Social link | `6bb1154a-8dbc-49e9-b8de-d0a9f5bd0776` | URL and label |
| Footer brand mark | `I14468:34842;13964:58930` | Estate icon | `1da1f839-c380-4528-87b7-4b5362a7abe1` | Approved logo export |
| Lower trust/logo mark | `I14468:34842;13964:58966` | 128 x 35 asset | `b13d73e5-688e-4d2f-9612-f9f9ba127c6e` | Identify and approve purpose |
| Accessibility icon | `I14468:34842;13964:58988` | Utility control | `8adbe858-ebf4-4812-8470-aaf9a4037263` | Behavior and label |
| Arrow-up icon | `I14468:34842;13964:58993` | Ascend control | `a5a7f7ee-4c50-46ff-8877-c8a1138a4380` | Scroll behavior and label |
