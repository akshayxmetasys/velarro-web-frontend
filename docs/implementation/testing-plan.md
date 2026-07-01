# Velarro Estate — Testing Plan

Status: framework plan complete from repository evidence; per-screen test matrices blocked on the screen manifest (U-01). 2026-07-01.

## Current state (Repository verified)

There is **no testing infrastructure**: no test runner, no assertion libraries, no E2E tooling, no `test` script, no CI workflows. The only verification available today is `npm run lint` (ESLint 9 + eslint-config-next incl. `jsx-a11y`) and `npm run build`.

## Proposed stack (Assumption requiring confirmation — U-07; nothing installed in this run)

| Layer | Tool | Rationale |
| --- | --- | --- |
| Unit / component | **Vitest** + React Testing Library + jsdom | First-class ESM/TS support matching Next 16 + React 19; fast; no Babel config |
| E2E / flows | **Playwright** | Multi-browser, first-party Next.js guidance, can assert prototype click paths end-to-end |
| Visual regression | Playwright screenshot assertions per breakpoint | Reuses E2E infra; per-breakpoint screenshots map 1:1 to wireframe variants |
| Static | Existing `npm run lint` + `npm run build` in CI | Already available, zero setup |

Installation happens at M00 execution time, only after the stack is approved and `START VELARRO IMPLEMENTATION` has been given.

## Test layers and what they cover

1. **Static checks (available now):** lint (including `jsx-a11y`) and production build must pass for every module (acceptance criteria G-10/G-11).
2. **Unit/component tests:** shared `components/ui` primitives — variant rendering, keyboard behavior, ARIA attributes, controlled/uncontrolled behavior. One spec per shared component listed in `shared-component-plan.json` (list pending Figma).
3. **Integration tests:** module screens rendered with route context — data/state wiring, overlay open/close and focus management, conditional states (empty/error/loading) that exist as wireframe states.
4. **E2E flow tests:** one Playwright spec per prototype path in `prototype-flow-map.json` (pending). Each spec follows the click path from the flow map's entry point and asserts navigation targets and overlay behavior.
5. **Visual verification:** Playwright screenshots at each wireframe breakpoint per screen, compared against Figma frame exports; results recorded per module (G-16).
6. **Accessibility checks:** keyboard walk-through per screen, plus automated axe scan (via `@axe-core/playwright`) as part of E2E — target WCAG 2.1 AA (U-08).

## Per-module test requirements

- **M00-foundations:** lint + build green; token smoke test (CSS variables present and correctly valued on a rendered page); font-loading assertion (no Arial fallback in computed styles).
- **M01+ (blocked):** the continuation run appends a test matrix per module: unit specs for its components, integration specs for its screens, E2E specs for its flow-map paths, and visual baselines per breakpoint.

## CI (recommendation, pending approval)

GitHub Actions workflow on PRs to the Velarro branches: `npm ci` → `npm run lint` → `npm run build` → unit tests → Playwright E2E (chromium at minimum). Out of scope for this run; noted for M00.
