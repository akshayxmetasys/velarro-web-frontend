# M02 Our Story Implementation Notes

## Figma Source

- Canonical frame: `15934:43007`
- Frame name: `home/our story`
- Frame size: `1440 x 4586`
- Duplicate frame noted in manifest: `14670:45497`
- Full-frame metadata may timeout with Figma `504`; section-level `get_design_context` succeeded for the page and key content sections.

## Section Inventory

1. Main nav: reused existing `MainNavbar`.
2. Hero: node `15934:43010`, `OUR STORY`, subtitle `Crafted with purpose, aged with time`, approved hero image.
3. Breadcrumbs: node `15934:43017`, `Home | Our story`.
4. Brand Story: node `15934:43019`, long-form origin copy plus approved side image.
5. Our Mission: node `15934:43031`, mission copy plus `5%`, `12+`, and `200+` stat stack.
6. Why Connoisseurs: node `15934:43048`, four cards.
7. Brand Values: node `15934:43069`, six cards.
8. Footer: reused existing `FooterSection`.

## Copy Implemented

- Hero: `OUR STORY`; `Crafted with purpose, aged with time`.
- Brand Story, Our Mission, Why Connoisseurs cards, and Brand Values cards were transcribed from Figma `get_design_context`.
- The Figma generated text for `Origin-Led Blending` duplicated `Origin character guides every blend decision`; implementation keeps the sentence once to match the screenshot.

## Approved Images

- Hero background: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/ourstory-hero-20260709-024102-desktop-hero.webp`
- Brand Story side image: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/ourstory-product-20260713-232448-product-main.webp`
- Both approved URLs returned `HTTP/1.1 200 OK` and `Content-Type: image/webp` during pre-implementation validation.
- No local M02 image files were added.
- No temporary Figma MCP asset URLs were used in runtime code.

## Route Visibility Policy

- `/our-story` is implemented and over-21 restricted.
- Route manifest audience is `age-gated`.
- `/our-story` remains non-indexable.

## Age-State Behavior

- `unknown`: renders the existing `AgeGate`; restricted Our Story content is hidden.
- `under21`: renders the existing restricted under-21 shell; restricted Our Story content is hidden.
- `over21`: renders the full Our Story page.
- Existing M01 homepage age-state behavior is unchanged.

## Known Mismatches

- The page reuses the approved existing `MainNavbar` and `FooterSection`; footer active-link behavior remains deferred to avoid changing approved footer visuals.
- Remediation added the approved `MainNavbar` Our Story link to `/our-story` without changing navbar spacing, logo, search, cart, login, or other deferred destinations.
- Remediation added hover-device-only subtle lift and shadow transitions to Why Connoisseurs and Brand Values cards. No page layout rewrite was done.
- Final remediation added an accessible `MainNavbar` logo homepage link to `/` without changing the logo image, dimensions, navbar layout, or page sections.
- Our Story visual implementation was already approved before the final logo-link remediation.
- Gotham webfont files are still unavailable, so the existing Arial/Helvetica fallback remains in use through shared tokens.
- Responsive behavior is engineering-derived because the Figma source is desktop-only.
- Age-state behavior remains preserved: unknown visitors see the age gate, under-21 visitors see the restricted shell, and over-21 visitors see Our Story.

## Validation Results

- Initial M02 validation:
  - `npm run lint`: passed.
  - `npm run test`: passed, 36 files and 158 tests.
  - `npm run build`: passed. Next reported `/our-story` as a dynamic route, expected because it reads the age cookie.
  - `npm run test:e2e -- --list`: passed, 2 Playwright tests listed.
  - `npm run dev`: started successfully at `http://localhost:3000`.
- Remediation validation:
  - `npm run lint`: passed.
  - `npm run test`: passed, 36 files and 160 tests.
  - `npm run build`: passed. Next reported `/our-story` as a dynamic route, expected because it reads the age cookie.
  - `npm run test:e2e -- --list`: passed, 2 Playwright tests listed.
- Final logo-link remediation validation:
  - `npm run lint`: passed.
  - `npm run test`: passed, 36 files and 160 tests.
  - `npm run build`: passed. Next reported `/our-story` as a dynamic route, expected because it reads the age cookie.
  - `npm run test:e2e -- --list`: passed, 2 Playwright tests listed.
