<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Velarro Repository Boundary

This repository is exclusively for Velarro Estate. Do not create or modify TAIRC pages, routes, components, styles, assets, content, or configuration. Never implement Velarro inside the TAIRC repository.

Before modifying files, confirm the repository root is `velarro-web-frontend`, the active branch is for Velarro work, the task concerns Velarro Estate or this Velarro repository's engineering controls, and existing uncommitted changes have been identified. If the repository root is `tairc-platform`, stop immediately.

Do not write production UI code until the user provides this exact phrase:

`START VELARRO IMPLEMENTATION`

Configuration, documentation, validation, and repository-governance changes may proceed when they are scoped to this Velarro repository and preserve product separation.

# Operating Contract

- Do not report a command, test, scan, build, hook, commit, push, PR, or deployment as passing unless it was actually executed and the output was inspected.
- Preserve user work. Never reset, clean, overwrite, or reformat unrelated changes.
- Prefer existing repository patterns, commands, helpers, and boundaries over new abstractions or dependencies.
- Preserve architecture boundaries, strict typing, deterministic behavior, security, observability, testability, accessibility, and rollback safety.
- Do not weaken linting, type checks, tests, security controls, accessibility checks, CI, or branch protections.
- Do not invent images, copy, products, prices, legal text, policies, routes, auth, payment, admin, privacy, compliance, or backend behavior.
- Use relevant Cursor/Codex skills from `.cursor/skills/` and `.agents/skills/`. Delegate to security, performance, or coverage subagents when their scope applies; the parent agent remains accountable for the integrated result.

# Repository Commands

Use `npm.cmd` from Windows PowerShell if `npm` is blocked by execution policy.

- Install/bootstrap: `npm ci`
- Format: no formatter script is currently configured
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Focused tests: `npm run test -- <pattern>`
- Complete tests: `npm run test`
- E2E inventory: `npm run test:e2e -- --list`
- Build: `npm run build`
- Skill sync: `npm run agent-skills:sync`
- Skill sync check: `npm run agent-skills:check`
- Cursor validation: `npm run cursor:validate`
- Cursor hook tests: `npm run cursor:hooks:test`
- Cursor full check: `npm run cursor:check`
- Security checks: `npm run test -- tests/security tests/e2e/security-headers.spec.ts`

# Figma And Visual Work

Use only explicitly provided Velarro Figma links, preferably individual frames, sections, or prototype flows. Clearly distinguish verified Figma information from assumptions. Work module by module and do not process all screens as one implementation request.

Before visual implementation, extract the relevant Figma data, ask for required production image URLs, and record assumptions in the module docs. Match approved Figma at 1440px first, then verify responsive behavior. Do not substitute generated, stock, temporary Figma, or unrelated assets for missing production imagery.

# Nested Instructions

Honor nested `AGENTS.md` and `AGENTS.override.md` files when present. Keep root instructions concise; specialized workflows belong in `.cursor/rules/`, `.cursor/skills/`, `.agents/skills/`, subagents, and `docs/engineering/`.
