# Cursor Enterprise Engineering Pack Installation Report

## Installation

- Date: 2026-07-15
- Repository: `velarro-web-frontend`
- Branch: `chore/install-cursor-enterprise-engineering`
- Starting branch: `feature/u21-shell-navbar-roastery-reintegration`
- Starting commit: `24b14b2a21b313cc7826baa6450a742d79ab5704`
- Remote: `origin` on GitHub
- Working tree before install: clean
- Temporary backup: `system temp/velarro-cursor-install-backup-20260715-163515`
- Source used: safely extracted ZIP from `Downloads/cursor-enterprise-engineering-pack (1).zip`
- ZIP SHA-256: `907f0aa65fb8527b92b1c704e6c40887333eb47bbf3a3f22e9b9259e29b48076`

## Baseline

- OS/shell: Windows, PowerShell 5.1
- Python: 3.14.0
- Node.js: 22.16.0
- npm: 10.9.2
- Package manager and lockfile: npm with `package-lock.json`
- Stack: Next.js 16.2.10, React 19.2.4, TypeScript, ESLint, Vitest, Playwright, Tailwind CSS 4
- CI provider: GitHub Actions
- Existing CI: lint, unit/component tests, build, E2E test listing
- Existing Cursor config: Velarro-specific rules, skills, subagents, PowerShell hooks, and generated hook log

## Source Hash Inventory

The source ZIP was inspected before extraction. Archive integrity passed, no unsafe paths, no path traversal, no duplicate normalized paths, and no unsafe link/device entries were found.

| Source file | SHA-256 |
|---|---|
| `.cursor/.gitignore` | `134aff58f9917a05a93a9d5fd1fac49c5873af1fbef8815f11b02b7551e8f761` |
| `.cursor/agents/security-auditor-agent.md` | `6dc7b193026e7df3015e29b97d80f5192aa7d62a4dddf99faacf448122f8d714` |
| `.cursor/agents/senior-performance-agent.md` | `1cefe54128407355fe62b0a17a72ad0c1f599f88f07a605d2deb162b8a4e38e3` |
| `.cursor/agents/test-coverage-agent.md` | `bb7f9b37443259b846f9f4a03e33a5814f39f35756587e3163c655ff0c21ad8d` |
| `.cursor/hooks/guard.py` | `ef612a5e4bf25a5f39432d9a01266071593afb892c6bf602803046226bd7ef4d` |
| `.cursor/hooks/README.md` | `2384ce8f1c1116ed333b0c243ffda55e0ec05d127a09d71f179f491245a61849` |
| `.cursor/hooks/tests/test_guard.py` | `374cb675c2d4bacf63bbba0634c1b8338b174c8d8b97b756c957ba399f0574ab` |
| `.cursor/hooks.json` | `aaa5394359db9e7aee13964cedd91edc4c4f5a0a85c4d42b3aef1bc39ef5454a` |
| `.cursor/hooks.windows.json` | `7d5aea77b52c9e5c13c350d8087ad5ba4d3c6a8c9f97c45ab8c66c819792559f` |
| `.cursor/rules/00-core-operating-contract.mdc` | `3b87668c5a0dd1b69c9808c124b001966cba0468de2222588f46f5ab3f9ce82d` |
| `.cursor/rules/10-architecture-boundaries.mdc` | `54391461eb491da8c15fa476666b01632f886e7575e346e0ecb706f9fbcd9d05` |
| `.cursor/rules/20-types-contracts-determinism.mdc` | `5c68208f5a8f16cbf1d109cfe294a7b1a5033be72f14837bb8ebc1dceb205748` |
| `.cursor/rules/30-security-supply-chain.mdc` | `67c4bd88f3a1d07733cb8cbdd5269882cce9ae896125b877f98440aa23628dc9` |
| `.cursor/rules/40-performance-concurrency.mdc` | `713eb500a12a0ac5dfa70ca8e5c547384bb28ebfb8a59be310a38babdaef280b` |
| `.cursor/rules/50-observability-reliability.mdc` | `c89f635b2a41dc24bd8bc5ecd48cde273ce8f85220cb0aaa9ee481d394e0250d` |
| `.cursor/rules/60-testing-quality-gates.mdc` | `134ddad7e8a48b711ff057d6083bf17a65fa900445ccc52e1c07065457ca067f` |
| `.cursor/rules/70-frontend-standards.mdc` | `97a0d7474ed88f13b65ab69b6dc4c54ee4f268957cbeffea075590d2fdbc6aad` |
| `.cursor/rules/80-devops-delivery.mdc` | `939766a1a04fe2f011689952925fa74105fe653d235bf9726f63f786ad647c62` |
| `.cursor/rules/90-agent-execution-protocol.mdc` | `9cad07e44c15be37fd331700f5ae7f027e7734c8544848fa1cac3a70b34bdc4c` |
| `.cursor/rules/95-documentation-governance.mdc` | `9c89f655655a021599fb338007f41407fbfe5149bbbd3d04d6b2b08880d2ea02` |
| `.cursor/skills/architecture-conformance/SKILL.md` | `83260e0ca1c40ed38e5aa03950eaeb0031e000a7c0a2eb0643163fd4fde87aef` |
| `.cursor/skills/observability-instrumentation/SKILL.md` | `64f10dd00fbf7be210b0e9731f63af140dac8497bd586051af61575ce723dfd7` |
| `.cursor/skills/performance-engineering/SKILL.md` | `abb08d451f64a9734de597752d03b800b52e2b073ff7f09baede4f9959f61722` |
| `.cursor/skills/production-readiness-review/SKILL.md` | `de0c96446675709eb9b2509d17cab8a6a1be33d6f58399adf64ef783b33eb46f` |
| `.cursor/skills/secure-change-review/SKILL.md` | `f25dc730c8c61ba7b1aa745a0cbf87d6e17f7179f7a8bf32fe62b74d0d3db859` |
| `.cursor/skills/test-design-and-coverage/SKILL.md` | `54b04451b6f46b46df618d24ec915ad77038466dfd0ff5cbb3e6a8faa6c40c76` |
| `.cursorrules` | `299210b58bd4037ce8393675259d5472c89e8a84cd32a8a6d64571ae5ea2dcd4` |
| `AGENTS.md` | `3a51c94a8b2e29a9919e9b491d8011ca3ee170b745ff66d57bf81b59038b1a31` |
| `docs/engineering/adr-template.md` | `acfccf9ad1f6ee0cbef119d1fe131097979a9a1e5daebb7b1da389f9278bc9ae` |
| `docs/engineering/observability-checklist.md` | `d505d91dd12135200230ac5f92159f211bb10ff2cb21aa2c364fb41d1fc8d18c` |
| `docs/engineering/performance-budget-template.md` | `a2e557ac508b4a5154a897354d38c799313fb6f2ea7e757951028697250d3d63` |
| `docs/engineering/threat-model-template.md` | `283126b70465ed5e962fc3df088ddee96ba99b362723d0add6a69c176c885b6a` |
| `scripts/validate_cursor_pack.py` | `56a13188692b29d33e17fcb307dd68ebdf3279221e36f1367a4419b97d1143bf` |

Hashes identify the inspected source files only; they are not publisher signatures.

## Files Added

- Enterprise Cursor rules under `.cursor/rules/`
- Enterprise Cursor skills under `.cursor/skills/`
- Enterprise Cursor subagents under `.cursor/agents/`
- Portable hook guard, hook README, and hook tests under `.cursor/hooks/`
- `.cursor/hooks.windows.json`
- `.cursor/.gitignore`
- Legacy `.cursorrules`
- Generated Codex skill mirrors under `.agents/skills/`
- `scripts/sync_agent_skills.py`
- Extended `scripts/validate_cursor_pack.py`
- Engineering templates under `docs/engineering/`
- `docs/engineering/cursor-agent-system.md`
- `.github/workflows/cursor-agent-config.yml`

## Files Merged

- `AGENTS.md`: preserved Velarro repository boundary and implementation gate, added actual commands and agent-system expectations.
- `package.json`: added type-check and Cursor/agent validation scripts.
- `.github/workflows/ci.yml`: added type-check to existing app CI.
- `.cursor/hooks.json`: replaced non-portable active PowerShell commands with the Python guard.
- Existing Velarro rule files: kept content, added descriptions/globs, and made them conditional to maintain exactly one always-applied core rule.
- `tests/seo/robots.test.ts`: added a type narrowing so the newly exposed strict type-check command passes without changing production code.

## Conflicts and Resolutions

- Existing Velarro rules had three always-applied files. Resolution: keep `00-core-operating-contract.mdc` as the single always-applied rule and make Velarro project/security/visibility rules conditional with narrow globs.
- Existing hooks were PowerShell-only and wrote logs. Resolution: retain the legacy hook files as references, ignore generated logs, and use `.cursor/hooks.json` with the portable Python guard.
- Existing `.cursor/` and `.agents/` are hidden by local Git excludes. Resolution: force-add only the intended configuration files when staging.
- Existing Velarro skills use folded YAML frontmatter. Resolution: support multiline frontmatter in sync and validation scripts.

## Runtime and OS Strategy

The active hooks use dependency-free Python. The local environment provides Python 3.14.0; CI sets up Python 3.11. Hook tests use temporary state directories and `python -B` to avoid bytecode artifacts. `.cursor/hooks.windows.json` is retained for Windows launcher compatibility, but `.cursor/hooks.json` is the active portable configuration.

## CI Integration

- Existing CI still runs npm install, lint, type-check, tests, build, and E2E listing.
- New Cursor Agent Config workflow runs only on relevant path changes.
- Workflow permissions are least-privilege: `contents: read`.
- CI checks skill mirror drift, Cursor validation, hook tests, hook JSON parsing, script syntax, generated diff drift, and generated artifact absence.

## Commands Executed

| Command | Result |
|---|---|
| `python scripts/validate_cursor_pack.py` in extracted package | Passed: 11 rules, 3 agents, 6 skills |
| `python -m unittest discover -s .cursor/hooks/tests -p 'test_*.py'` in extracted package | Passed: 7 tests |
| `python -m py_compile .cursor/hooks/guard.py scripts/validate_cursor_pack.py` in extracted package | Passed |
| Hook JSON parse in extracted package | Passed |
| Same validator and hook tests in already-extracted source package | Passed |
| `npm run agent-skills:sync` | Initially failed on folded YAML; parser fixed; passed with 8 mirrors |
| `npm run agent-skills:check` | Passed: 8 mirrored, 0 drift |
| `npm run cursor:validate` | Initially found `.cursor/.state`; state removed; passed: 14 rules, 8 agents, 8 skills |
| `npm run cursor:hooks:test` | Passed: 16 tests |
| `npm run cursor:check` | Passed |
| Direct `before-shell` safe simulation | Passed: `allow` |
| Direct `before-shell` secret simulation | Passed: `deny`, no secret echoed |
| Direct `after-edit` plus `stop` simulation | Passed: finding consolidated |
| Direct malformed before-shell simulation | Passed: `deny` fail-closed |
| `npm run lint` | Passed |
| `npm run typecheck` | Initially failed in `tests/seo/robots.test.ts`; test type narrowing added; passed |
| `npm run test` | Passed: 57 files, 373 tests |
| `npm run build` | Passed |
| `npm run test:e2e -- --list` | Did not list in this Windows/npm shell; it executed E2E and failed 2 existing careers navigation tests |
| `npx playwright test --list` | Passed: 11 tests listed |
| `npm run test:e2e:list` | Passed: 11 tests listed |

## Pre-existing or External Failures

The full E2E execution surfaced two careers navigation failures:

- `tests/e2e/m09-careers-position-detail.spec.ts`: click stayed on `/careers/positions` instead of navigating to `/careers/positions/area-sales-manager`.
- `tests/e2e/m09-careers-position-application.spec.ts`: click stayed on `/careers/positions/area-sales-manager` instead of navigating to `/careers/positions/area-sales-manager/apply`.

The agent-system installation did not modify the careers implementation or E2E tests. Unit tests for those routes and the production build passed.

## Remaining Limitations

- Remote push and pull request creation depend on GitHub authentication and repository policy.
- Full E2E execution has the unrelated careers navigation failures listed above.
- No repository formatter, SAST, SCA, license check, architecture linter, or dedicated accessibility scanner is configured beyond the existing ESLint, TypeScript, Vitest, Playwright, security tests, and build.

## Acceptance Checklist

- [x] Correct Git root used.
- [x] Existing uncommitted work identified and preserved.
- [x] Package safely inspected and validated before installation.
- [x] `.cursor/rules/` installed and valid.
- [x] Exactly one intended always-applied core rule.
- [x] Six canonical Cursor skills installed.
- [x] Codex skill mirrors synchronized under `.agents/skills/`.
- [x] Three enterprise Cursor subagents installed.
- [x] `beforeShellExecution`, `afterFileEdit`, and `stop` hooks installed.
- [x] Existing hooks preserved as legacy references and deduplicated from active config.
- [x] Hook runtime works locally and is configured for CI.
- [x] Hook tests pass.
- [x] Malformed before-shell input fails safely.
- [x] Hook output redacts secrets.
- [x] `AGENTS.md` merged without losing project instructions.
- [x] Legacy `.cursorrules` retained only as a compatibility mirror.
- [x] Governance templates installed.
- [x] Operational documentation created.
- [x] Skill sync/check commands created.
- [x] Cursor validation commands created.
- [x] CI enforcement added.
- [x] CI uses least privilege.
- [x] Repository-native checks run.
- [x] Installation-caused failures repaired.
- [x] Temporary/generated artifacts excluded from staging.
- [x] No secrets introduced.
- [x] Atomic commit created.
- [ ] Branch pushed and PR created when credentials and policy allow.
- [x] No production deployment or governance bypass occurred.
