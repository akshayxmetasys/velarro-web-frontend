# Velarro Estate — Master Implementation Plan

Status: **READY FOR MODULE IMPLEMENTATION** (planning complete; code gated on `START VELARRO IMPLEMENTATION`)

Last updated: 2026-07-01 (Run 3)

## Inputs (all populated)

| Input | Status |
| --- | --- |
| Screen manifest (116 frames) | Complete — `docs/figma/screen-manifest.json` |
| Design tokens (Gotham + color system) | Complete — `docs/figma/design-tokens.json` |
| Component inventory (40+ components) | Complete — `docs/figma/component-inventory.json` |
| Asset inventory | Partial — fonts/icons identified; bulk imagery at implementation |
| Prototype flow map | Partial — 32 edges; deletion steps Figma-verified; nav inferred |
| Module queue (11 modules) | Complete — `docs/implementation/module-queue.json` |
| Route map (50 planned routes) | Complete — `docs/implementation/route-map.json` |

## Inventory summary

- **116** top-level frame candidates in section Over 21
- **53** confirmed application screens (after reclassifying estate tab frames)
- **33** modals/overlays
- **8** interaction states (empty cart, empty orders, etc.)
- **22** duplicates/near-duplicates (prototype viewport home, repeated checkout modals)
- **0** tablet/mobile wireframes — desktop 1440px only (U-10)

## Module sequence

| Order | Module | Depends on | Primary deliverable |
| --- | --- | --- | --- |
| 1 | **M00-foundations** | — | Gotham fonts, `@theme` tokens, UI/layout scaffolding |
| 2 | **M01-home** | M00 | `/` guest home (frame `13148:15012`) |
| 3 | **M02-auth** | M01 | Login/signup/forgot-password modals |
| 4 | **M03-estate** | M01 | Estate/humidor/PDP routes |
| 5 | **M04-house** | M01 | House shop routes |
| 6 | **M05-vault** | M01 | `/the-vault` |
| 7 | **M08-editorial** | M01 | Chronicle + pairing guide |
| 8 | **M09-engagement** | M01 | Membership, careers, contact |
| 9 | **M10-legal-info** | M01 | Privacy, FAQ, legal pages |
| 10 | **M06-cart-checkout** | M03, M04 | Cart → shipping → payment → review |
| 11 | **M07-profile** | M02 | Profile, orders, settings, deletion/deactivation flows |

## M00 — Foundations (first implementation module)

Confirmed Figma evidence now supports M00:

- **Tokens:** 18 colors, 4 spacing values, 2 radii, 15+ typography styles — all from `get_variable_defs` (Figma verified)
- **Fonts:** Gotham primary; Noto Sans secondary — requires `next/font/local`
- **Shared components to scaffold first:** MAIN NAVBAR, MAIN FOOTER, MAIN EXPLORE, MAIN BREADCRUMBS, form inputs, buttons (see `shared-component-plan.json`)

Blockers: U-07 (testing stack), `START VELARRO IMPLEMENTATION`

## Definition of done (every module)

1. All module screens at 1440px wireframe fidelity
2. Documented interactions from `prototype-flow-map.json` implemented or explicitly deferred
3. Accessibility per `acceptance-criteria.md`
4. `npm run lint` + `npm run build` clean
5. Visual verification vs. `docs/figma/screenshots/` where captures exist

## Risks

| Risk | Mitigation |
| --- | --- |
| No mobile/tablet wireframes (U-10) | Implement desktop-first; responsive pass requires new design |
| Inferred prototype links (U-03) | Validate during module QA; update flow map when confirmed |
| Gotham licensing (U-05) | Procure font files before M00 |
| Modal vs route strategy (U-11) | Default overlays; add routes only if product requires deep links |
