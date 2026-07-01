# Velarro Estate — Master Implementation Plan

Status: **PARTIAL — blocked on Figma ingestion** (2026-07-01)

The Figma MCP monthly rate limit (View seat) was reached before any design data was retrieved, so the screen inventory, prototype flow map, component inventory, asset inventory, and design tokens are all empty (see `docs/figma/ingestion-log.md`). This plan therefore contains:

1. Everything that can be planned from repository evidence alone — complete.
2. The module framework and sequencing rules that screen-derived modules will slot into — complete.
3. Screen-derived modules — **deliberately absent.** Inventing modules for screens that were never seen would poison the plan with fabrications. They are added by the continuation run (`docs/figma/continuation-prompt.md`).

Production implementation is additionally gated on the user sending `START VELARRO IMPLEMENTATION` (repository rule in `AGENTS.md`).

## Plan inputs and their status

| Input | Source | Status |
| --- | --- | --- |
| Repository assessment | `docs/implementation/repository-assessment.md` | Complete (Repository verified) |
| Screen manifest | `docs/figma/screen-manifest.json` | Blocked — 0 screens enumerated |
| Prototype flow map | `docs/figma/prototype-flow-map.json` | Blocked |
| Component inventory | `docs/figma/component-inventory.json` | Blocked |
| Asset inventory | `docs/figma/asset-inventory.json` | Blocked |
| Design tokens | `docs/figma/design-tokens.json` | Blocked |
| Unresolved items | `docs/figma/unresolved-items.md` | 9 items, U-01 is the blocker |

## Module framework

Modules live in `docs/implementation/module-queue.json` and are executed strictly in dependency order, one module per implementation run (repository rule: work module by module). Every module carries: module ID, name, related Figma nodes, related screens, routes, shared components, module-specific components, required assets, responsive requirements, interactions, accessibility requirements, implementation steps, test requirements, visual verification requirements, blockers, and status.

Sequencing rules for when screen modules are added:

1. `M00-foundations` always runs first — tokens, fonts, layout shell, component scaffolding.
2. Modules that own shared navigation surfaces (header/footer/shells) precede content modules that render inside them.
3. Modules follow the prototype's primary click path from the entry screen (`15967:43304`) outward, so every implemented screen is reachable when merged.
4. Overlay/modal/drawer surfaces are implemented with their host screen's module, not as separate modules.
5. Desktop, tablet, and mobile variants of a screen belong to one module (one screen, three breakpoints — not three screens).

## M00 — Foundations (fully definable now, still blocked on token/font values)

- **Module ID:** `M00-foundations`
- **Related Figma nodes:** `14366:82579` (token/style source — values pending), page `85:10`
- **Related screens:** none directly; unblocks all
- **Routes:** none new; adjusts `app/layout.tsx` and `app/globals.css`
- **Shared components:** initial `components/ui` and `components/layout` scaffolding per `shared-component-plan.json` conventions
- **Steps:** (1) map Figma tokens to `@theme` CSS variables in `globals.css`; (2) implement font strategy per U-05; (3) fix the `body` Arial override; (4) replace "Create Next App" metadata and favicon with Velarro branding; (5) create `components/` structure; (6) add `not-found.tsx` / `error.tsx`; (7) establish `public/images` + `public/icons` structure
- **Test requirements:** `npm run lint` clean; `npm run build` clean; token variables resolve in a rendered smoke page
- **Visual verification:** rendered typography/color sample compared against Figma token values
- **Blockers:** U-01 (token and font values unknown), `START VELARRO IMPLEMENTATION` not yet given
- **Status:** pending

## M01+ — Screen modules

**Not defined in this run.** The continuation run derives them from the completed screen manifest and flow map, using the framework above. Expected shape for an estate platform (Assumption requiring confirmation, recorded only as a sanity guide, not as modules): entry/landing, property discovery, property detail, and any account/transaction flows the wireframes actually contain.

## Definition of done (applies to every module)

1. All module screens implemented at all wireframe breakpoints.
2. All prototype interactions of those screens work (navigation, overlays, states).
3. Accessibility criteria met (`docs/implementation/acceptance-criteria.md`).
4. `npm run lint` and `npm run build` pass with zero errors.
5. Tests per `docs/implementation/testing-plan.md` pass.
6. Visual verification against the Figma frames recorded.
7. No TAIRC content anywhere (repository boundary rule).

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Figma quota stays exhausted (U-01) | Plan cannot be completed | Seat upgrade decision — top priority |
| 6-calls/month seat even after reset | Ingestion impossible at any careful ordering | Full/Dev seat required; do not attempt ingestion on a View seat |
| Next 16 API drift vs. habit (async params, proxy.ts, cacheComponents) | Broken implementation patterns | Read `node_modules/next/dist/docs/` guide per feature before coding (repo rule) |
| Wireframes reference licensed fonts | Font loading rework | Resolve U-05 during ingestion, before M00 executes |
| No testing infra (U-07) | Modules unverifiable | Approve and install Vitest + Playwright at M00 time |
