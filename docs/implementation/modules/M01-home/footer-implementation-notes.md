# Footer Implementation Notes

## Scope

Implemented only the M01 over-21 homepage footer after Store/Lounge. No final homepage polish pass, Store locator backend, newsletter backend, social tracking, account/auth/cart behavior, or other route/page work was performed.

Remediation restored the accidental previous changes to:

- `lib/assets/approved-image-hosts.ts`
- `tests/assets/approved-image-hosts.test.ts`

Those files are no longer part of the footer diff.

## Figma Source

- File: `92rhH51aErpYQWRrlJqMhn`
- Node: `14468:34842`
- Node name: `MAIN FOOTER`
- Verified extraction: footer instance is `1440 x 697.1646728515625`, with a page background, top border, centered social icons, rounded newsletter panel, footer brand/navigation rows, Surgeon General warning, trust copy, Metasys mark, legal links, accessibility icon, and Ascend control.

## Layout Decisions

The footer is implemented as an M01-specific over-21 footer component and is inserted after Store/Lounge. The existing global layout footer placeholder was not changed, which keeps the under-21 shell and other routes out of scope.

Figma divider assets were implemented with CSS borders. The Ascend arrow was implemented as inline SVG so no unapproved arrow asset was needed.

The footer root is intentionally full viewport width. It uses a viewport-width breakout so the #fcfbf8 footer background and top border span from page edge to page edge even if an ancestor is constrained. Inner footer content remains centered and constrained to the Figma measurements: the newsletter panel uses `max-width: 1436px` inside a 2px side gutter, and the main footer content row uses `max-width: 1216px`.

The earlier styled-text footer logo was replaced because final feedback required the same approved production logo image used by the main navbar. The footer now reuses `M01_HOME_APPROVED_IMAGES.navbarLogoScript`, guarded by `assertApprovedImageUrl`, and renders it as a `next/image` inside the Figma brand block. The brand block preserves the Figma measurements from node `14468:34842`: a `265px` wide by `134px` high block with a `265px` by `90px` logo visual area, followed directly by the tagline `Crafted. Refined. Velarro.`

The approved footer SVG URLs are declared inside `components/m01-home/footer-section.tsx` and guarded with `assertApprovedImageUrl`. This keeps the existing approved homepage image registry, CSP, and Next image configuration unchanged.

## Approved Asset URLs Used

- Footer and navbar logo: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/1781557831962-frame-1000005296-(1).webp`
- Instagram: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/instagram-20260626-190912-svg-logo-icon.svg`
- YouTube: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/youtube-20260626-191022-svg-logo-icon.svg`
- Facebook: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/facebook-20260626-190843-svg-logo-icon.svg`
- X: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/pajamas_twitter-20260626-190952-svg-logo-icon.svg`
- LinkedIn: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/linkedin-20260626-190918-svg-logo-icon.svg`
- Metasys brand/trust mark: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/metasys-20260626-191149-svg-logo-icon.svg`
- Accessibility icon: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/oui_accessibility-20260626-190950-svg-logo-icon.svg`

No temporary Figma asset URLs, new remote hosts, uploads, or unapproved external images were added.

## Preserved Areas

No existing approved homepage section component was edited:

- Age gate
- Main Navbar
- Collector Hero
- Roastery Hero
- Cigar Knowledge
- Gifting
- Clothier
- Estate Collection
- Store/Lounge

`components/m01-home/cigar-carousel-section.tsx` and `components/m01-home/estate-collection-section.tsx` were edited only to add narrow `suppressHydrationWarning` guards to their carousel arrow `<button>` elements. No carousel layout, assets, labels, state, or visual behavior were changed.

No CSP, security header, Next image config, global CSS/token, navbar, logo, Collector Hero, or approved image host configuration changes remain in the diff.

`git ls-files` found no breadcrumb component or breadcrumb route files in this repository, so there was no breadcrumb implementation to modify or add a direct regression test for. No breadcrumbs were added above the homepage footer.

## Deferred Behavior

Newsletter signup is static/deferred. The name and email fields and submit button are disabled because newsletter backend behavior is not approved.

Social profile URLs are deferred. Social controls render as disabled buttons with accessible labels instead of invented profile links.

Footer navigation and legal destinations are deferred and non-navigating.

The Ascend control scrolls to the top of the page with client-side `window.scrollTo`.

## Hydration Investigation

The reported dev overlay showed a client-only `fdprocessedid` attribute on interactive controls. Repository searches found no `fdprocessedid`, `Date.now`, `Math.random`, `crypto.randomUUID`, `typeof window`, or `suppressHydrationWarning` in the M01 home components. The only `new Date` match is the fixed SEO discovery timestamp in `lib/seo/discovery-manifest.ts`.

`components/m01-home/cigar-carousel-section.tsx` and `components/m01-home/estate-collection-section.tsx` render deterministic markup: the arrow buttons use constant labels, state-derived disabled flags, and approved static arrow images. No app-side server/client markup divergence was found there.

Because `fdprocessedid` is commonly injected by form fillers, password managers, or browser extensions, and because dev output showed that same injected attribute on unrelated buttons and inputs across the page, the mismatch is treated as browser-extension-caused rather than application-caused. Narrowly scoped `suppressHydrationWarning` guards were added only to the `CarouselArrowButton` `<button>` elements in `components/m01-home/cigar-carousel-section.tsx` and `components/m01-home/estate-collection-section.tsx` because the reported overlays pointed there. No global suppression was added to `html`, `body`, root app components, the footer, or unrelated controls. If the same browser profile continues injecting `fdprocessedid` into other controls, a clean profile or Incognito window with extensions disabled remains the correct visual-review environment.

## Validation Results

- `npm.cmd run lint`: passed.
- `npm.cmd run test`: passed, 35 test files and 149 tests.
- `npm.cmd run build`: passed on Next.js 16.2.10 with Turbopack.
- `npm.cmd run test:e2e -- --list`: passed, 2 Playwright tests listed.
