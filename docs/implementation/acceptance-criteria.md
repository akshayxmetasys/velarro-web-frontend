# Velarro Estate — Acceptance Criteria

Last updated: 2026-07-01 (Run 3)

## Global criteria (all modules)

- **G-01 Fidelity:** Layout matches Figma at 1440px using tokens from `design-tokens.json` — no hardcoded hex when a token exists.
- **G-02 Content:** Copy matches wireframes; no invented text, images, or interactions.
- **G-03 Interactions:** Flows in `prototype-flow-map.json` work; inferred edges validated during QA.
- **G-04 Desktop scope:** 1440px wireframe parity required; sub-1440 behavior out of scope until U-10 resolved.
- **G-05 Images:** `next/image` with dimensions; no CLS.
- **G-06–G-10 Accessibility:** WCAG 2.1 AA working target (U-08); keyboard, focus, contrast, landmarks.
- **G-11–G-15 Code quality:** TypeScript strict, Server Components default, Next 16 conventions, no TAIRC content.

## Per-module criteria

### M00-foundations

- All `color/*` and spacing/radius tokens mapped to `app/globals.css` `@theme`
- Gotham loaded via `next/font/local`; body no longer overrides with Arial
- Shared primitives exist for MAIN NAVBAR, MAIN FOOTER, MAIN EXPLORE, button, input
- Metadata no longer says "Create Next App"

### M01-home

- Frame `13148:15012` at `/` — hero, category sections, footer
- Navbar/footer match component inventory
- Screenshot parity: `docs/figma/screenshots/M01-home-13148-15012.png`

### M02-auth

- Modals: Login (`14991:70094`), Sign up (`14991:70051`), Forgot password, New password
- OAuth button row (Google/Apple/Microsoft icons from asset inventory)
- Close, Sign Up ↔ Sign In, forgot-password chain
- Screenshot: `M02-auth-login-14991-70094.png`

### M03-estate / M04-house / M05-vault

- Representative PDP/listing pages per route-map.json
- Estate tab frames `14670:34051`, `15451:39198` render correct tab content
- Screenshot: `M03-estate-pdp-14670-37727.png`, `M05-vault-14240-78024.png`

### M06-cart-checkout

- Flow: cart → shipping → payment → review (frames in manifest)
- Empty-cart state (`14670:43110`) when cart has no items
- Screenshots: `M06-cart-14670-45135.png`, shipping/payment captures if added

### M07-profile

- Settings page `14762:96902`; orders, wishlist, addresses per manifest
- Deactivation 4-step and deletion 6-step flows with **Keep Account** / **CONTINUE** buttons
- Sign-out confirmation `15661:38017` with cancel + sign out
- Screenshot: `M07-profile-settings-14762-96902.png`, `M07-deactivation-15253-40306.png`

### M08-editorial / M09-engagement / M10-legal-info

- Routes in route-map.json implemented per module
- Screenshot: `M09-membership-15008-38309.png` for membership
