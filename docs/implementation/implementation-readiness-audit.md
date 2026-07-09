# Velarro Estate Implementation Readiness Audit

Status: PR-0 planning only
Last updated: 2026-07-09

## Audit Scope

This audit checks whether the repository and Figma inputs are ready for dual-flow implementation. It does not authorize production UI, security, SEO, AEO, GEO, SXO, or AIO code changes.

## Repository Readiness

| Area | Status | Notes |
| --- | --- | --- |
| Repository boundary | Ready | `AGENTS.md` confirms this repo is exclusively for Velarro Estate. |
| Branch | Ready for PR-0 | Planning branch: `feature/dual-flow-prototype-plan`. |
| M00 foundation | Ready baseline | User states main is green after M00 focus-trap repair. |
| Production code scope | Blocked until approval | `AGENTS.md` requires `START VELARRO IMPLEMENTATION` before production code. |
| Current task type | Ready | Docs-only PR-0 planning. |
| Existing source docs | Ready | Master plan, acceptance criteria, route map, module queue, screen manifest, prototype flow map, and component inventory exist. |

## Figma Readiness

| Target | Node | Readiness | Notes |
| --- | --- | --- | --- |
| File | `92rhH51aErpYQWRrlJqMhn` | Ready | MCP can list top-level pages. |
| Over-21 prototype entry | `15967:43304` | Partial | Screenshot and tokens work; full metadata/context timed out. |
| Over-21 primary home | `13148:15012` | Partial | Screenshot and tokens work; full metadata/context timed out. |
| Under-21 prototype entry | `14735:63837` | Ready | Metadata, hierarchy, design context, screenshot, and variables work. |
| Over-21 section example | `14279:30062` | Ready | MAIN NAVBAR section-level extraction works. |

## MCP Extraction Risk

Full over-21 home nodes are too heavy for reliable metadata/context extraction through MCP in PR-0 probes. Implementation planning must not depend on full-page extraction for those nodes.

Mitigation:

- Extract over-21 one section at a time.
- Start with known readable section node `14279:30062`.
- Split any timing-out section into smaller child nodes.
- Use manual-copy fallback fields when MCP still times out.
- Record extraction status in each module Figma spec.

## Route And Age-State Readiness

| Item | Status | Required before code |
| --- | --- | --- |
| Age states | Drafted | `unknown`, `over21`, and `under21` are defined in PR-0 docs. |
| Root route behavior | Needs approval | `/` is the dual-flow decision point. |
| Under-21 cigar blocking | Needs product/legal approval | Blocking rules drafted in `dual-flow-route-map.json`. |
| Auth/account visibility for under-21 | Open | Must decide whether account-only access can exist without tobacco content. |
| Brand/legal page visibility for under-21 | Open | Must classify brand-safe versus tobacco-marketing content. |

## Security, SEO, AEO, GEO, SXO, AIO Readiness

These are not PR-0 code tasks.

PR-1 must own the first code implementation for:

- Security guardrails for age-state route/content access
- SEO metadata and indexability rules
- AEO answer-surface copy constraints
- GEO/geographic or jurisdiction-aware policy hooks if required
- SXO search-experience behavior for gated routes
- AIO AI-overview-safe metadata/schema behavior

PR-0 only records that these must be planned and accepted before implementation.

## Acceptance Gates Before Implementation

- PR-0 docs are reviewed and accepted.
- The user provides implementation approval exactly as required by `AGENTS.md`.
- Under-21 route visibility is approved by product/legal.
- Age-state persistence is approved by product/legal/security.
- Section-level Figma specs exist for the first target module.
- Manual fallback fields are complete for any MCP timeout.
- Required verification commands pass on PR-0.
- Open UI/UX assumptions are resolved or explicitly deferred.

## Open Assumptions And Questions

- Whether the under-21 state should live on `/`, a dedicated route, or an external destination.
- Whether under-21 visitors may access legal, accessibility, careers, partner, or brand story pages.
- Whether blurred cigar imagery behind the age gate is acceptable.
- Whether age state persists in session storage, local storage, cookies, server cookies, or another consent-aware mechanism.
- Whether crawler/indexing behavior should differ by age state.
- Whether search, cart, auth, and account entry points should be hidden or disabled before age confirmation.

## Readiness Conclusion

PR-0 is ready as a planning and extraction PR. Implementation is not ready until route visibility, age persistence, under-21 content blocking, and section-level Figma extraction gates are accepted.
