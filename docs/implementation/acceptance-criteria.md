# Velarro Estate — Acceptance Criteria

Last updated: 2026-07-01 (documentation correction run)

## Global criteria (all modules)

- **G-01 Fidelity:** Layout matches Figma at 1440px using tokens from `design-tokens.json`.
- **G-02 Content:** Copy matches wireframes; no invented text, images, or interactions.
- **G-03 Interactions:** Documented flows in `prototype-flow-map.json` work; inferred edges validated during QA before final acceptance.
- **G-04 Desktop scope:** 1440px wireframe parity required; FAQ frame (1459px) implemented at 1440.
- **G-05 Responsive:** Tablet/mobile layouts engineering-derived; UI/UX review required before module acceptance (U-10).
- **G-06 Images:** `next/image` with dimensions; no CLS.
- **G-07–G-12 Accessibility (WCAG 2.2 AA):** Keyboard operability, visible focus, semantic HTML, accessible names, contrast, `prefers-reduced-motion`, form error association, modal focus trap and restore.
- **G-13–G-17 Code quality:** TypeScript strict, Server Components default, Next 16 conventions, no TAIRC content.

## M00-foundations

- All Figma-verified color, spacing, radius, and shadow tokens mapped to `@theme`
- `--font-family-primary` uses approved `Arial, Helvetica, sans-serif` fallback; Gotham swap path documented
- `RouteBackedModalShell`, base Button, Input, Navbar shell, Footer shell scaffolded
- Engineering breakpoint variables defined (not claimed as Figma verified)
- Visual verification via token swatch page (no M00 screenshot required)

## M02-auth

- Route-backed overlays at `/login`, `/signup`, `/forgot-password`, `/reset-password`
- Close, Sign Up ↔ Sign In, forgot-password chain
- OAuth icons from asset inventory
- Screenshot: `M02-auth-login-14991-70094.png`

## M03-estate

- Routes include `/the-estate/the-house` and `/the-estate/the-house/the-roastery` (estate tab correction)
- PDP and listing pages per route-map
- Screenshots: estate tab and PDP captures in `docs/figma/screenshots/`

## M07-profile

- Settings-hosted deactivation (4 steps) and deletion (6 frames) flows
- Keep Account exits documented; deletion6 terminal behavior per product decision (U-15)
- Sign-out confirmation with cancel + sign out
- Screenshot: `M07-profile-settings-14762-96902.png`, `M07-deactivation-15253-40306.png`

## M10-legal-info

- `/press` canonical page (M10); press form success is in-page overlay only (M09 frame hosted on `/press`)
