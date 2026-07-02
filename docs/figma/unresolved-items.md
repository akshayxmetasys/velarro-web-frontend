# Velarro — Unresolved Items

Last updated: 2026-07-01 (documentation correction run). Ordered by severity.

## U-01 — RESOLVED: Figma MCP access

- Status: **CLOSED**

## U-02 — RESOLVED: Screen inventory

- 116 frames enumerated in `screen-manifest.json`.
- Status: **CLOSED**

## U-03 — PARTIAL: Prototype flow

- `prototype-flow-map.json` documents 54 edges with separate counts for purely verified, mixed, and inferred connections.
- All 33 modals have `modalCoverage` records (edges-documented or unresolved).
- Remaining gaps: navbar editorial/legal wiring, order cancellation confirm, wishlist delete confirm, pairing quiz routing, membership CTA, chatbot, address forms, profile-completed trigger, post-deletion6 terminal exit.
- Status: **OPEN (non-blocking for M00; inferred edges require QA per module)**

## U-04 — RESOLVED: Design tokens

- Colors, typography, spacing, radii populated from Figma variables.
- Shadow elevations added from local design-context records (correction run).
- Status: **CLOSED**

## U-05 — RESOLVED WITH CONDITIONS: Font strategy

- **Figma verified:** Gotham primary; Noto Sans secondary (one title token).
- **Implementation target:** `next/font/local` when licensed Gotham webfont files are procured.
- **Approved interim fallback:** `Arial, Helvetica, sans-serif` via central CSS variable `--font-family-primary`.
- **M00 may complete** using the fallback; final visual typography remains pending until Gotham files are provided.
- Do not fabricate Gotham font files in the repository.
- Status: **CLOSED (procurement pending)**

## U-06 — RESOLVED: Module boundaries

- 11 modules (M00–M10) in canonical order; 116 frames assigned across M01–M10.
- Status: **CLOSED**

## U-07 — RESOLVED: Testing stack

- **Approved:** Vitest (unit/component), React Testing Library (component behavior/a11y), Playwright (E2E + visual verification).
- Installation deferred to implementation; not installed during planning runs.
- Status: **CLOSED**

## U-08 — RESOLVED: Accessibility target

- **Project target:** WCAG 2.2 AA.
- Includes keyboard support, visible focus, semantic HTML, accessible names, contrast checks, reduced-motion support, form errors, and modal focus management.
- Status: **CLOSED**

## U-09 — RESOLVED: Deployment target

- **Target platform:** Vercel.
- CI/CD configuration deferred to implementation.
- Status: **CLOSED**

## U-10 — RESOLVED WITH CONDITIONS: Responsive behavior

- Figma source: desktop wireframes only (1440px; FAQ frame 1459px is a layout anomaly).
- **Engineering approach:** Derive tablet/mobile layouts from the desktop design system.
- **Review gate:** UI/UX review required before final acceptance per module.
- M00 may define breakpoint CSS variables and container foundations only.
- Do not classify inferred responsive behavior as Figma verified.
- Status: **CLOSED (review gate remains per module)**

## U-11 — RESOLVED: Modal routing strategy

- **Decision:** Hybrid route-backed modals via Next.js App Router parallel/intercepting routes.
- Auth, account, checkout, and destructive flows use stable URLs with overlay presentation.
- Simple confirmation/success states stay on the parent page (no separate URL).
- Press submission success is an in-page overlay on `/press` (M10), not a second route.
- Documented in `route-map.json` (`routeBackedModals`, `inPageOverlays`).
- Status: **CLOSED**

## U-12 — RESOLVED: Estate tab frame classification

- `14670:34051` and `15451:39198` reclassified as confirmed estate tab screens.
- **Remaining minor item:** exact tab-switch interaction (prototype not verified) — see U-13.
- Status: **CLOSED**

## U-13 — OPEN: Estate tab-switch interaction

- Tab switch behavior between `/the-estate`, `/the-estate/the-house`, and `/the-estate/the-house/the-roastery` is not prototype-verified.
- Status: **OPEN (minor)**

## U-14 — OPEN: Deletion step count inconsistency

- Chooser and early deletion frames display "Step X of **5**" but the manifest contains **six** `deletionN` frames (`deletion1`–`deletion6`) after the chooser.
- Recorded in `prototype-flow-map.json` `deletionStepInconsistency`.
- Requires product/design decision; do not invent step copy.
- Status: **OPEN**

## U-15 — OPEN: Post-deletion6 terminal exit

- Final deletion frame (`15631:66398`) has no documented outgoing prototype edge.
- Exit behavior (return home, sign out, confirmation page) requires product approval.
- Status: **OPEN**

## U-16 — OPEN: Licensed asset procurement

- Gotham webfont files, Velarro logo, favicon, and bulk product photography are pending external export/procurement.
- Status: **OPEN (blocks final visual fidelity, not M00 scaffolding)**
