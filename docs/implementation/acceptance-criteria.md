# Velarro Estate — Acceptance Criteria

Status: **global criteria only** (2026-07-01). Per-screen criteria require the screen manifest and prototype flow map, which are blocked by the Figma rate limit (U-01). The continuation run appends a criteria section per module.

## Global criteria (apply to every module and screen)

### Fidelity

- G-01: Screen layout matches the corresponding Figma frame at each wireframe breakpoint; spacing, hierarchy, and component placement follow the frame, with values taken from `docs/figma/design-tokens.json` — never hardcoded approximations when a token exists.
- G-02: All text content matches the wireframes exactly; no invented copy, images, states, or interactions (repository Figma rule).
- G-03: Every interaction present in the prototype flow map for the screen works: navigation targets, overlay open/close, back behavior, and transitions of equivalent intent.

### Responsiveness

- G-04: Every screen renders correctly at its wireframe breakpoints (exact widths pending `design-tokens.json`), with no horizontal overflow between them.
- G-05: Images use `next/image` with explicit dimensions or fill; no layout shift on load.

### Accessibility (working target WCAG 2.1 AA — U-08 pending confirmation)

- G-06: All interactive elements are keyboard reachable and operable in a logical order; focus is always visible.
- G-07: Modal/drawer/overlay surfaces trap focus while open, restore focus on close, close on Escape, and are announced via appropriate ARIA roles.
- G-08: Text and interactive-element contrast meets AA against the design-token palette.
- G-09: Images carry meaningful `alt` text (or empty `alt` when decorative); pages use semantic landmarks and a correct heading hierarchy.
- G-10: `npm run lint` passes, including the bundled `jsx-a11y` rules, with no suppressions added to bypass accessibility findings.

### Code quality

- G-11: TypeScript strict passes with no `any` escapes introduced; `npm run build` completes without errors or warnings introduced by the module.
- G-12: Server Components by default; `"use client"` only where interactivity requires it, at the smallest practical subtree.
- G-13: Next 16 conventions respected: awaited `params`/`searchParams`, `proxy.ts` (not `middleware.ts`) if interception is ever needed, bundled docs consulted per feature.
- G-14: Components follow `docs/implementation/shared-component-plan.json` conventions; no duplicated one-off variants of shared components.
- G-15: No TAIRC pages, routes, components, styles, assets, content, or configuration anywhere in the repository.

### Verification and process

- G-16: Visual verification evidence (rendered screen vs. Figma frame) recorded per module before it is marked complete.
- G-17: Tests required by `docs/implementation/testing-plan.md` for the module pass.
- G-18: Changes stay within the module's declared scope in `module-queue.json`.

## Per-module criteria

| Module | Criteria | Status |
| --- | --- | --- |
| M00-foundations | Tokens in `@theme` match `design-tokens.json` exactly; fonts load via `next/font` with no Arial fallback override; branding metadata replaced; G-10/G-11 pass | Blocked on token values (U-01) |
| M01+ | To be appended by the continuation run, one section per module, derived from screen manifest + flow map | Blocked (U-01) |
