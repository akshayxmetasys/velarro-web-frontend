# Cursor / Codex Execution Plan

> **SUPERSEDED FOR CURRENT EXECUTION (2026-07-16)**
> This document is retained as historical PR-0 planning evidence.
> Authoritative current sequencing:
> - `docs/implementation/current-main-route-fidelity-tracker.md`
> - `docs/implementation/vishnu-v01-v09-fidelity-sequence.md`
> Do not treat the PR sequence below as the live implementation queue.
> Merged since this plan: PR #39, #43, #44 (M00.5), #45 (Under-21). PR #40 closed unmerged.

Status: PR-0 planning only (**historical**)
Last updated: 2026-07-09

This plan is for sequencing work after PR-0. It must not be used as authorization to write production UI code.

## Global Guardrails

- Follow `AGENTS.md` before every implementation run.
- Confirm the repo root is `velarro-web-frontend`.
- Confirm the active branch is a Velarro branch.
- Identify uncommitted changes before editing.
- Do not create or modify TAIRC pages, routes, components, styles, assets, content, or configuration.
- Do not write production code until the user provides `START VELARRO IMPLEMENTATION`.
- Work module by module.
- Use only explicitly provided Velarro Figma sources.
- Clearly label verified Figma facts separately from assumptions.

## PR Sequence

### PR-0 - Planning and extraction readiness

Scope:

- Create dual-flow prototype map.
- Create dual-flow route visibility map.
- Create implementation readiness audit.
- Create Cursor/Codex execution plan.
- Create reusable module Figma spec template.

Code policy:

- Docs only.
- No production UI code.
- No app pages.
- No components.
- No security, SEO, AEO, GEO, SXO, or AIO code.

Verification:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e -- --list`

### PR-1 - Age-state foundation and platform guardrails

Scope:

- Implement age-state model: `unknown`, `over21`, `under21`.
- Implement route/content guardrails for under-21 blocking.
- Implement approved security foundations.
- Implement approved SEO, AEO, GEO, SXO, and AIO foundations.
- Establish tests for age-state routing and content blocking.

Prerequisites:

- Product/legal approval for under-21 route visibility.
- Approved age-state persistence model.
- Approved crawler/indexing behavior.
- Implementation approval phrase received.

### PR-2 - Over-21 home extraction and implementation

Scope:

- Extract over-21 home section-by-section.
- Use `13148:15012` as the primary home reference and `15967:43304` as the prototype entry reference.
- Do not depend on full-page metadata/context for over-21 nodes because PR-0 probes timed out.
- Start from readable section nodes such as MAIN NAVBAR `14279:30062`.

Prerequisites:

- PR-1 age-state guardrails merged.
- Required section Figma specs complete.

### PR-3 - Under-21 flow implementation

Scope:

- Implement under-21 denial/safety flow from node `14735:63837`.
- Use MCP-readable metadata/design context/screenshot/variables.
- Verify no cigar-commerce content is exposed.

Prerequisites:

- PR-1 guardrails merged.
- Under-21 UI/UX questions resolved.

### PR-4 - Auth and route-backed modal alignment

Scope:

- Implement or align M02 auth modal routes.
- Ensure auth cannot bypass age gates.
- Preserve route-backed modal accessibility and focus-lock requirements from M00.

Prerequisites:

- PR-1 guardrails.
- PR-2/PR-3 route decisions.

### PR-5 - Commerce and cigar-content hardening

Scope:

- Harden product, cart, checkout, and tobacco editorial access under age-state rules.
- Add regression tests for under-21 blocked routes and hidden commerce CTAs.

Prerequisites:

- PR-1 guardrails.
- Product/legal approval for all route categories.

### PR-6+ - Remaining modules

Scope:

- Continue one module at a time using `docs/implementation/module-queue.json`.
- Current canonical order after foundations:
  - M01-home
  - M02-auth
  - M03-estate
  - M04-house
  - M05-vault
  - M08-editorial
  - M09-engagement
  - M10-legal-info
  - M06-cart-checkout
  - M07-profile

## Figma Extraction Workflow For Implementation Runs

1. Read the module spec and this plan.
2. Read the relevant Next.js docs from `node_modules/next/dist/docs/` before code changes.
3. Identify the exact Figma node IDs for the module.
4. For under-21 node `14735:63837`, use full-frame MCP extraction.
5. For over-21 full pages `15967:43304` and `13148:15012`, avoid full metadata/context extraction and extract section-by-section.
6. Run metadata, design context, screenshot, and variable extraction for each section node.
7. Fill the module Figma spec template before implementation.
8. If MCP times out, manually copy fallback fields and mark them as manual.
9. Only then implement the module after approval.

## Required Manual Fallback Fields

- Node IDs and parent page IDs
- Layer hierarchy
- Text content
- Typography values
- Colors, fills, borders, effects, opacity, blur
- Frame and child dimensions
- Spacing and layout rules
- Component instances and variants
- Image assets and crop/fit behavior
- Prototype interactions and destinations
- Accessibility and keyboard/focus expectations

## Implementation Acceptance Gates

- The module has a completed Figma spec or approved fallback data.
- The age-state route rules remain intact.
- Under-21 cannot access cigar/tobacco content.
- Accessibility criteria in `acceptance-criteria.md` pass.
- `npm run lint`, `npm run test`, `npm run build`, and relevant Playwright checks pass.
- Visual verification is completed against screenshots or section screenshots.

## Open Coordination Questions

- Which over-21 home sections should PR-2 extract first after MAIN NAVBAR?
- Should under-21 be a root-state view or a dedicated route?
- Which non-commerce brand routes are allowed for under-21?
- What exact security and SEO/AEO/GEO/SXO/AIO requirements must PR-1 implement?
