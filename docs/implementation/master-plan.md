# Velarro Estate — Master Implementation Plan

Status: **INGESTION COMPLETE — DOCUMENTATION CORRECTED — READY FOR M00**

Last updated: 2026-07-01 (documentation correction run)

## Inputs

| Input | Status |
| --- | --- |
| Screen manifest (116 frames) | Complete |
| Design tokens (colors, type, spacing, radii, shadows) | Complete — shadows from design context |
| Component inventory | **106 total, 59 shared** |
| Asset inventory | Partial — pending external assets documented |
| Prototype flow map | Partial — 58 edges; all 33 modals covered (documented or explicitly unresolved) |
| Module queue | Complete — canonical order applied |
| Route map | Complete — 52 page routes + route-backed modal plan |

## Inventory summary

| Category | Count |
| --- | ---: |
| Top-level candidates | 116 |
| Confirmed screens | 53 |
| Modals/overlays | 33 |
| Interaction states | 8 |
| Duplicates/near-duplicates | 22 |
| Responsive variants (Figma) | 0 |

## Canonical module sequence

| Order | Module | Depends on | Primary deliverable |
| --- | --- | --- | --- |
| 1 | **M00-foundations** | — | Tokens, font variable + fallback, layout shell, shared UI scaffolding |
| 2 | **M01-home** | M00 | `/` guest home (`13148:15012`) |
| 3 | **M02-auth** | M01 | Route-backed auth overlays |
| 4 | **M03-estate** | M01 | Estate routes incl. house/roastery tabs |
| 5 | **M04-house** | M01 | House shop routes |
| 6 | **M05-vault** | M01 | `/the-vault` |
| 7 | **M08-editorial** | M01 | Chronicle + pairing guide |
| 8 | **M09-engagement** | M01 | Membership, careers, contact |
| 9 | **M10-legal-info** | M01 | Privacy, FAQ, `/press`, legal pages |
| 10 | **M06-cart-checkout** | M03, M04 | Cart → shipping → payment → review |
| 11 | **M07-profile** | M02 | Profile, orders, settings, account flows |

This sequence is identical in `module-queue.json` and this document.

## M00 — Foundations (first implementation module)

**Readiness:** READY WITH CONDITIONS (see final report)

M00 may proceed using the approved Arial/Helvetica fallback via `--font-family-primary`. Licensed Gotham files remain pending (U-05/U-16).

### M00 scope

- Map Figma-verified tokens + shadows to `app/globals.css` `@theme`
- Configure `--font-family-primary` with approved fallback; structure for Gotham swap
- Scaffold `components/ui/` and `components/layout/` including `RouteBackedModalShell`
- Define engineering breakpoint CSS variables (768 tablet, 390 mobile — not Figma verified)
- Replace create-next-app metadata placeholders
- Install approved testing stack when implementation begins

### M00 blockers

- Licensed Gotham webfont files not procured (interim fallback approved)
- `START VELARRO IMPLEMENTATION` not yet given

## Project decisions applied (correction run)

| Decision | Value |
| --- | --- |
| Typography | Gotham target; Arial/Helvetica interim fallback via CSS variable |
| Responsive | Engineering-derived from desktop; UI/UX review per module |
| Accessibility | WCAG 2.2 AA |
| Modals | Hybrid route-backed intercepting overlays |
| Press | `/press` = M10 page; M09 submission = in-page overlay |
| Testing | Vitest + RTL + Playwright |
| Deployment | Vercel |
| Inferred flows | Implement later; must stay labeled inferred; QA required |

## Definition of done (every module)

1. Desktop 1440px wireframe fidelity (FAQ 1459px anomaly → implement at 1440)
2. Documented interactions implemented or explicitly deferred with unresolved item
3. WCAG 2.2 AA per `acceptance-criteria.md`
4. `npm run lint` + `npm run build` clean
5. Visual verification vs `docs/figma/screenshots/` where mapped
6. Responsive behavior reviewed by UI/UX before final acceptance

## Repository compatibility

- Next.js **16.2.10** App Router, React **19.2.4**, TypeScript strict, Tailwind **v4** CSS-first
- Available scripts: `npm run dev`, `build`, `start`, `lint` — no test script until implementation
- No assumptions about packages beyond those listed in `package.json`
