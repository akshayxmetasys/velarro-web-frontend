<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from older Next.js releases. Read the relevant guide in `node_modules/next/dist/docs/` before writing application code and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Velarro Repository Boundary

This repository is exclusively for the Velarro Estate website. Never create or modify TAIRC pages, routes, components, styles, assets, content, or configuration here, and never implement Velarro inside the TAIRC repository.

## Required Preflight

Before modifying files, confirm:

1. The repository root is `velarro-web-frontend`.
2. The active branch is a Velarro branch or a dedicated branch created from one.
3. The requested task concerns Velarro Estate or Velarro repository governance.
4. Existing uncommitted changes have been identified and preserved.

If the repository root is `tairc-platform`, stop immediately and make no changes.

## Implementation Approval

Do not write production application code until the user provides this exact phrase:

`START VELARRO IMPLEMENTATION`

Repository governance, validation, documentation, hooks, and CI changes may proceed only when they are explicitly requested and do not alter production behavior.

## Repository Commands

- Install/bootstrap: `npm ci`
- Format check: no repository formatter is currently configured.
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Focused tests: `npm run test -- <path-or-pattern>`
- Complete unit/component tests: `npm run test`
- E2E list/smoke discovery: `npm run test:e2e:list`
- Production build: `npm run build`
- Cursor skill sync: `npm run agent-skills:sync`
- Cursor skill drift check: `npm run agent-skills:check`
- Cursor configuration validation: `npm run cursor:validate`
- Cursor hook tests: `npm run cursor:hooks:test`
- Full Cursor/agent config check: `npm run cursor:check`

Do not claim any command, test, build, hook, scan, push, pull request, or deployment succeeded unless you actually executed it and inspected its output.

## Engineering Contract

- Preserve architecture boundaries, strict TypeScript, deterministic behavior, security, observability, testability, accessibility, and rollback safety.
- Prefer existing Velarro utilities and patterns in `components/`, `lib/`, `app/`, and `tests/` before adding new abstractions.
- Do not invent images, copy, products, prices, legal text, policies, routes, metadata, schema, auth, payment, admin, backend, session, privacy, or compliance behavior.
- Keep implementation module by module. Do not modify unrelated modules or bypass failing checks.
- Preserve CSP, security headers, approved image hosts, age-state privacy, semantic HTML, metadata, structured data, and accessible UI behavior.
- Use relevant Cursor skills in `.cursor/skills/` and mirrored Codex skills in `.agents/skills/`. Delegate specialist review to the installed Cursor subagents when performance, security, or test coverage risk is material; the parent agent remains accountable for the final integrated change.
- Keep modern Cursor rules in `.cursor/rules/` authoritative. `.cursorrules` is only a legacy compatibility mirror.

## Figma Requirements

- Use only explicitly provided Velarro Figma links.
- Prefer links to individual frames, sections, or prototype flows.
- Clearly distinguish verified Figma information from assumptions.
- Do not invent missing images, content, states, or interactions.
- Work module by module and do not process all screens as one implementation request.
- Do not write code while in planning mode.

Nested `AGENTS.md` or `AGENTS.override.md` files, if added later, apply to their subtrees and must not weaken these root requirements.
