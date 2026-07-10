# PR-2 Scope And Execution Plan

Status: planning only
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Over-21 prototype entry: `15967:43304`
- Over-21 primary homepage: `13148:15012`
- Known navbar source: `14279:30062`
- Homepage instance navbar: `14406:85640`
- Timeout limitation: `get_metadata` on `13148:15012` returned HTTP 504 on 2026-07-10. Full-page section work must use section-level nodes or manual fallback data.
- Source assumptions: this plan uses Figma MCP reads, local screenshots, existing PR-0 docs, and repository source inspection. It does not authorize production UI code.
- Unresolved blockers: permanent assets, crawler/age-state behavior, CTA destinations, interaction behavior, responsive behavior, and product/legal/security approvals.

## Preflight Result

| Check | Result |
| --- | --- |
| Repository root | `C:\Users\vishn\OneDrive\Desktop\velarro-web-frontend` |
| Product scope | Velarro Estate |
| Active branch | `feature/over21-homepage-figma-implementation` |
| Branch is not main | Yes |
| `git status --short` before docs | Clean |

## Continuation Preflight - 2026-07-10

| Check | Result |
| --- | --- |
| Repository root | `C:\Users\vishn\OneDrive\Desktop\velarro-web-frontend` |
| Product scope | Velarro Estate |
| Active branch | `feature/over21-homepage-figma-implementation` |
| Existing uncommitted changes | `docs/implementation/modules/M01-home/` untracked/modified docs only |
| Production UI code touched | No |

## PR-2 Scope

PR-2 is the planning and documentation phase for the over-21 M01 homepage. It may create or update module documentation only.

Allowed now:

- Record Figma extraction results.
- Inventory required sections, layers, assets, blockers, and implementation units.
- Review visibility, security, accessibility, tests, and visual QA strategy.

Not allowed now:

- Production UI code.
- App pages, components, styles, tests, config, routes, dependencies, or runtime behavior.
- Temporary Figma asset URLs as production assets.
- Commits, pushes, merges, or PR creation.

## Repository Guidance Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `.cursor/rules/velarro-project-rule.mdc`
- `.cursor/rules/velarro-security-rule.mdc`
- `.cursor/rules/velarro-visibility-rule.mdc`
- `.cursor/agents/velarro-figma-extractor.md`
- `.cursor/agents/velarro-visibility-architect.md`
- `.cursor/agents/velarro-security-auditor.md`
- `.cursor/skills/velarro-visibility-coding/SKILL.md`
- `.cursor/skills/velarro-visibility-coding/schema-reference.md`
- `.cursor/skills/velarro-security-coding/SKILL.md`
- `.cursor/skills/velarro-security-coding/security-reference.md`
- `docs/implementation/cursor-codex-execution-plan.md`
- `docs/implementation/dual-flow-prototype-map.md`
- `docs/implementation/dual-flow-route-map.json`
- `docs/implementation/implementation-readiness-audit.md`
- Existing module docs and Figma spec template.

## Existing Architecture Summary

| Area | Current state |
| --- | --- |
| App router | Next.js 16 App Router with `app/layout.tsx` and `app/page.tsx`. |
| Current homepage | `app/page.tsx` still renders create-next-app starter content and external Next/Vercel links. |
| Styling | Tailwind v4 CSS-first tokens in `app/globals.css`; Gotham target is represented by `--font-family-primary` fallback. |
| Layout shells | `components/layout/site-shell.tsx`, `site-header.tsx`, `site-footer.tsx`, `container.tsx`, and `section.tsx` exist as structural scaffolds. |
| UI primitives | Buttons, inputs, drawer, accordion, route-backed modal shell, image placeholder, and related tests exist. |
| Age state | `unknown`, `over21`, `under21`; route access helpers exist but `/` is not yet server-render-gated. |
| SEO utilities | Route manifest, metadata helper, indexability, sitemap/robots, and schema builders exist. |
| Security utilities | CSP/header/cookie helpers are wired through `next.config.ts`; CSP only allows local images plus `data:`/`blob:`. |
| Tests | Foundation tests cover UI primitives, SEO helpers, age-state helpers, route access, CSP, headers, and basic E2E route response. |

## Execution Plan

1. Use the precise asset-and-decision checklist to collect or approve every blocking permanent asset.
2. Resolve remaining behavior and policy decisions: root age-state, crawlers, metadata, schema, CTAs, newsletter, footer legal/trust copy, and routes.
3. Resolve root route age-state, crawler, metadata, and under-21 behavior.
4. Resolve CTA destinations and links to unimplemented routes.
5. Only after Vishnu provides `START VELARRO IMPLEMENTATION`, implement one section at a time from top to bottom.
6. Validate 1440px desktop fidelity before responsive behavior.
7. Run the full PR-2 validation command set after implementation.

## Readiness Verdict

READY FOR ASSET COLLECTION.

PR-2 planning now has a precise asset-and-decision checklist for the extracted card bands and footer. It is not ready for implementation.
