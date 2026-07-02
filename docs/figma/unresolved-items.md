# Velarro — Unresolved Items

Last updated: 2026-07-01 (Run 2). Items are ordered by blocking severity.

## U-01 — BLOCKER: Figma MCP access (updated in Run 2)

- **Run 1 state:** authenticated as `accounts@metasysglobal.com` (View seat, Professional team) — monthly quota of 6 MCP calls already exhausted; first data read rejected.
- **Run 2 action taken (user):** Figma MCP reauthenticated as `akshay@metasysglobal.com`, expected to hold a Professional **Full** seat.
- **Run 2 new failure:** the MCP server `plugin-figma-figma` is **unreachable** — all 7 `whoami` attempts over ~6 minutes returned `Timed out waiting for connection`. The required identity (email/plan/seat) could not be verified, so per the preflight rule no ingestion was attempted.
- This is a connectivity/session problem, not a rate limit. Likely cause: the MCP server process is stale after reauthentication, or the Figma OAuth flow was not completed.
- **User action required (in order):**
  1. In Cursor: Settings → MCP → reload/re-enable the Figma server (`plugin-figma-figma`), or disable and re-enable the Figma plugin.
  2. If a browser window is waiting on a Figma OAuth consent screen, complete it as `akshay@metasysglobal.com`.
  3. Confirm the Figma desktop app is running and signed in as the same account (some MCP tools proxy through it).
  4. Re-run the continuation prompt; its first step is `whoami`, which must return email `akshay@metasysglobal.com`, Professional plan, Full or Dev seat.
- Owner: user.
- Status: **OPEN — blocking all Figma ingestion.**

## U-02 — Screen inventory unknown

- Total screen count, frame names, node IDs, dimensions, and breakpoints in the Approved Wireframes section (`14366:82579`) are unknown.
- Blocked by U-01. Resolved automatically by continuation-run step 1.

## U-03 — Prototype flow unknown

- Navigation graph, entry point behavior, overlay/modal flows, and transitions starting at `15967:43304` on page `85:10` are unknown.
- Blocked by U-01. Resolved by continuation-run steps 2 and 4.

## U-04 — Design tokens unknown

- Brand colors, typography scale, spacing, radii, and any light/dark modes are unknown. The repository currently uses the default create-next-app Geist fonts and a two-variable color theme — almost certainly not the Velarro brand.
- Blocked by U-01. Resolved by continuation-run step 3.

## U-05 — Font strategy unconfirmed

- Repository loads Geist / Geist Mono via `next/font/google` (Repository verified).
- Whether the Velarro wireframes use these or brand fonts is an **Assumption requiring confirmation**; if brand fonts are licensed (non-Google), they will need `next/font/local` and font files — an asset dependency.

## U-06 — Module boundaries are assumptions

- The module decomposition in `docs/implementation/module-queue.json` beyond `M00-foundations` cannot be defined until screens are enumerated. Typical estate-platform modules (auth, listings, property detail, dashboard, etc.) were deliberately NOT pre-created to avoid inventing screens. Only the Figma-independent foundations module is defined.

## U-07 — No testing framework installed

- Repository verified: no test runner, no testing-library, no Playwright/Cypress, no `test` script in `package.json`.
- Decision required at implementation time (not now, and installation is out of scope for this run): unit runner (Vitest recommended for Next 16 + React 19) and E2E runner (Playwright recommended). Recorded in `docs/implementation/testing-plan.md`.

## U-08 — Accessibility target unconfirmed

- No explicit accessibility requirement was provided. `eslint-config-next` ships `jsx-a11y` rules (Repository verified). Target of WCAG 2.1 AA is an **Assumption requiring confirmation**.

## U-09 — Deployment target unconfirmed

- `.gitignore` includes `.vercel`, suggesting Vercel, but no CI/CD config exists in the repo. **Assumption requiring confirmation.**
