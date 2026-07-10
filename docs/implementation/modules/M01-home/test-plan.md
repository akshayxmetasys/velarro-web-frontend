# PR-2 Test Plan

Status: planning only
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata on `13148:15012` returned HTTP 504.
- Source assumptions: tests below are planned only and must not be added until implementation approval.
- Unresolved blockers: exact interaction behavior, assets, age/crawler policy, and route destinations.

## Required Unit And Component Tests

- Homepage renders correct state for `unknown`, `over21`, and `under21`.
- `unknown` state does not render over-21 tobacco/product content before age confirmation.
- `under21` state does not render product cards, cart/checkout links, tobacco editorial links, product schema, or tobacco metadata.
- Over-21 homepage sections render approved headings and CTAs.
- Navbar links use approved route list and accessible labels.
- Carousel controls expose accessible names and keyboard behavior.
- Feature panel CTA labels are unique to their destination.
- Footer newsletter fields have labels and do not imply backend submission unless approved.
- Image components render stable dimensions and fallback/alt behavior.
- Cigar carousel renders six extracted labels in the approved order and exposes previous/next controls with labels.
- Cigar knowledge renders the three extracted cards and descriptions exactly after copy approval.
- Clothier renders approved product names, descriptions, swatches, and `Top Gift` badges only after catalog/legal approval.
- Estate collection renders six extracted labels in the approved order and the initial active card state.
- Footer renders the extracted social, navigation, legal, warning, trust, copyright, accessibility, and Ascend elements only after route/behavior approvals.

## Route And Navigation Tests

- `/` decision behavior by age state.
- Links to `/the-estate`, `/the-house`, `/the-vault`, `/the-chronicle`, `/cart`, `/login`, and legal/footer routes align with route access decisions.
- Unimplemented routes are gated, blocked, or intentionally nonindexable; no accidental 404 paths from homepage CTAs.
- Extracted footer links requiring route assertions: `Our Story`, `The Humidor`, `The House`, `Craftsmanship`, `Limited Editions`, `Track Order`, `Sustainability`, `Press`, `Contact Us`, `FAQ`, `Privacy Policy`, `Terms of Service`, `Cookie Policy`, `Accessibility`.
- Extracted social links requiring URL and `rel` assertions if external: Instagram, YouTube, Facebook, Twitter, LinkedIn.

## Accessibility Tests

- One `h1` on over-21 homepage.
- Logical heading hierarchy.
- Landmark structure: header/nav/main/footer.
- Keyboard tab order through nav, CTA links, carousel controls, search, login/cart triggers, and footer form.
- Visible focus states.
- Contrast checks for text over image sections.
- Reduced-motion behavior for sliders/carousels.
- Repeated `EXPLORE` and `SHOP NOW` controls require accessible names that distinguish the destination or card label.
- Footer `SUBMIT`, accessibility icon, and `Ascend` controls need explicit labels and keyboard behavior.

## Metadata And Structured Data Tests

- `/` metadata uses approved visible copy only.
- Canonical is `https://velarroestate.com`.
- Robots/indexability matches approved age/crawler policy.
- No Figma asset URL appears in metadata or JSON-LD.
- No Product, Offer, Review, AggregateRating, price, availability, LocalBusiness, or FAQ schema unless visibly present and approved.
- Non-over21 states do not emit tobacco product schema.

## Security Tests

- CSP and security headers remain preserved.
- Any approved remote image domain is represented in CSP/Next config tests.
- No `unsafe-eval` in production.
- No broad wildcard CSP relaxation.
- Age-state cookie values remain limited to `over21` and `under21`.
- No PII in cookies or client storage.
- Newsletter tests must assert no network submission, endpoint, provider, or stored personal data unless explicitly approved.
- No temporary `figma.com/api/mcp/asset` URL or Figma image hash appears in runtime markup, metadata, JSON-LD, source constants, tests, or snapshots.
- External social links use `target="_blank"` only with `rel="noopener noreferrer"`.

## E2E And Visual Checks

- Homepage smoke test at `/`.
- 1440px desktop screenshot capture.
- Section-by-section visual comparison against Figma screenshot.
- Card-order checks for the extracted desktop initial states:
  - cigar carousel: Ashtrays, Verde Classico active, Lighters, then Vintage no. 88, Pipes, Nocturne off-canvas;
  - estate collection: Estate Espresso, Founder's Boxy hoodie active, Roastery, then The cabinet, Estate oversized T-shirt, Humidors off-canvas.
- Keyboard navigation through interactive controls.
- Responsive viewport checks after desktop fidelity: 390, 768, 1024, 1440.
- `npm run test:e2e -- --list` after implementation.

## Final Validation Commands After Implementation

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e -- --list`

Do not run these as PR-2 implementation validation during this planning-only phase unless documentation-only changes require a docs-specific check.
