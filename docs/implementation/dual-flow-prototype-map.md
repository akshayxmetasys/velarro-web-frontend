# Velarro Estate Dual-Flow Prototype Map

Status: PR-0 planning only
Last updated: 2026-07-09

This document maps the over-21 and under-21 prototype sources before implementation. It is not an implementation spec for production UI code.

## Source Documents

- `AGENTS.md`
- `docs/implementation/master-plan.md`
- `docs/implementation/acceptance-criteria.md`
- `docs/implementation/route-map.json`
- `docs/implementation/module-queue.json`
- `docs/figma/screen-manifest.json`
- `docs/figma/prototype-flow-map.json`
- `docs/figma/component-inventory.json`

## Prototype Sources

| Flow | Figma file key | Page ID | Node ID | Name / purpose | MCP status |
| --- | --- | --- | --- | --- | --- |
| Over-21 prototype entry | `92rhH51aErpYQWRrlJqMhn` | `85:10` | `15967:43304` | Viewport-height home duplicate; prototype start | Screenshot and tokens readable; full metadata/context timed out during PR-0 MCP probes |
| Over-21 primary home | `92rhH51aErpYQWRrlJqMhn` | `85:10` | `13148:15012` | Primary full home page, screen 2, route `/` | Screenshot and tokens readable; full metadata/context timed out during PR-0 MCP probes |
| Under-21 prototype entry | `92rhH51aErpYQWRrlJqMhn` | `119:26710` | `14735:63837` | Age verification / under-21 state | Metadata, design context, screenshot, variables readable |
| Verified over-21 section example | `92rhH51aErpYQWRrlJqMhn` | `85:10` | `14279:30062` | MAIN NAVBAR section/component | Section-level metadata and design context readable |

## Age States

| State | Meaning | Initial route behavior | Content visibility |
| --- | --- | --- | --- |
| `unknown` | Visitor has not confirmed age in this browser/session | Show age verification entry before cigar/tobacco content is available | Do not expose actionable cigar routes, product details, cart, checkout, or unblocked tobacco editorial |
| `over21` | Visitor confirms legal tobacco age | Use over-21 flow and the existing planned route map | Full Velarro over-21 content may be available, subject to normal auth/cart rules |
| `under21` | Visitor indicates they are not 21+ | Use under-21 denial/safety flow | Block cigar/tobacco commerce, product, humidor, cart, checkout, and tobacco editorial content |

## Route Visibility Rules

The detailed planning matrix lives in `dual-flow-route-map.json`. At PR-0 level:

- Age state must be evaluated before rendering cigar or tobacco-related route content.
- `unknown` visitors should see the age-gate state first.
- `over21` visitors may use the existing over-21 planned routes from `docs/implementation/route-map.json`.
- `under21` visitors must be prevented from reaching cigar/tobacco commerce and editorial destinations.
- Legal and accessibility routes can remain available when they do not market tobacco products.
- Auth, profile, cart, checkout, and product routes require product/legal confirmation for under-21 behavior before implementation.

## Cigar-Content Blocking Rules For Under-21

Under-21 blocking must cover more than page routing:

- Do not render unblocked cigar product listings, PDPs, prices, purchase CTAs, humidor content, cart, checkout, or tobacco pairing/editorial content.
- Do not expose cigar-commerce route-backed modals from under-21 state.
- Do not show tobacco product structured data to under-21 visitors.
- Do not include tobacco marketing copy in under-21 metadata, Open Graph images, JSON-LD, AEO/GEO/AIO answer surfaces, or search snippets.
- Do not preload or reveal full-resolution cigar imagery behind an under-21 gate unless legal/product approves the exact treatment. The readable under-21 frame shows blurred background content, but production handling still needs legal confirmation.

## Figma MCP Extraction Strategy

Use MCP in this order for every module or section:

1. `get_metadata` on the specific frame or section node to capture hierarchy, node IDs, names, positions, dimensions, and instances.
2. `get_design_context` on the same node to capture text, typography, fills, strokes, shadows/effects, images/assets, and generated reference code for inspection only.
3. `get_screenshot` on the same node for visual verification.
4. `get_variable_defs` on the same node for tokens used by the target surface.
5. Record every successful call, timeout, and manual fallback field in the module Figma spec.

## Over-21 Timeout Note

The over-21 full-page nodes `15967:43304` and `13148:15012` returned screenshot and token data, but full metadata/context calls timed out with HTTP 504 during PR-0 MCP probes. Do not rely on full-page MCP extraction for over-21 implementation planning.

The over-21 flow must be extracted section-by-section. The verified section-level example is MAIN NAVBAR `14279:30062`, which is usable as the pattern for subsequent section extraction.

## Section-Level Extraction Workflow

For each over-21 implementation module:

1. Identify the smallest useful section/component node in Figma, not the full page.
2. Run MCP metadata, design context, screenshot, and variable extraction on that section node.
3. Record the section node ID, parent page, route, intended component ownership, and verification status.
4. Compare section output against the full-page screenshot for placement and continuity.
5. If a section times out, split again into smaller child nodes.
6. If MCP still times out, use the manual fallback fields below and mark each value as manually copied.
7. Do not implement a module until all required section specs are complete or explicitly approved as deferred.

## Manual-Copy Fallback Fields

When MCP times out for a node, manually copy:

- Frame/node ID, page ID, frame name, and route/module owner
- Width, height, x/y position when relevant
- Layer hierarchy and child ordering
- All visible text, including capitalization and punctuation
- Typography: family, style, weight, size, line height, letter spacing, text transform
- Colors/fills, strokes, gradients, opacity, shadows, blur, backdrop blur, and effects
- Spacing: padding, gaps, margins, section offsets, card dimensions
- Component instances and variant/state labels
- Image asset names, crop/fit behavior, and required export dimensions
- Prototype interactions, triggers, destination nodes, transitions, and unresolved links
- Accessibility notes: headings, labels, landmarks, focus order, keyboard behavior, reduced-motion expectations

## PR Sequence

| PR | Scope | Code allowed? |
| --- | --- | --- |
| PR-0 | Planning docs, extraction strategy, route visibility map, readiness audit, execution plan | Docs only |
| PR-1 | Age-state foundation, dual-flow routing guardrails, security, SEO, AEO, GEO, SXO, and AIO foundations | Yes, after implementation approval |
| PR-2 | Over-21 home section extraction and M01 implementation using section-level specs | Yes, after PR-1 |
| PR-3 | Under-21 denial/safety flow implementation and verification | Yes, after PR-1 |
| PR-4 | Auth and route-backed modal flow alignment | Yes, after PR-2/PR-3 gates |
| PR-5 | Commerce and cigar-content route hardening for product/cart/checkout | Yes, after age gates are stable |
| PR-6+ | Remaining modules in canonical order from `module-queue.json` | Yes, one module at a time |

Security, SEO, AEO, GEO, SXO, and AIO are PR-1 code deliverables only. PR-0 only documents their required scope and acceptance gates.

## Acceptance Gates Before Implementation

- User provides implementation approval in the form required by `AGENTS.md`.
- PR-0 docs are reviewed and accepted.
- Figma section specs exist for the first implementation target or missing fields are manually copied and marked.
- Age-state route rules are approved by product/legal.
- Under-21 cigar-content blocking expectations are approved by product/legal.
- Open UI/UX questions below are resolved or explicitly deferred.
- Required repo checks pass on the planning branch.

## Open Assumptions And UI/UX Questions

- Should `under21` visitors remain on `/` with denial content, redirect to a dedicated safe route, or exit to an external destination?
- Should under-21 users see any brand-only pages, or only legal/accessibility pages?
- Is the blurred cigar background in the under-21 Figma frame legally acceptable in production?
- What persistence model is approved for age state: session-only, local storage, cookie, server-set cookie, or consent-aware hybrid?
- What is the copy and destination for the under-21 negative action?
- Should search engines index under-21 pages, over-21 pages, both, or only legal/brand-safe surfaces?
- Which over-21 sections after MAIN NAVBAR should be extracted first for PR-2?
