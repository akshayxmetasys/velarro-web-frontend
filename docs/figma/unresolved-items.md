# Velarro — Unresolved Items

Run date: 2026-07-01. Items are ordered by blocking severity.

## U-01 — BLOCKER: Figma MCP quota exhausted (decision required)

- The authenticated account (`accounts@metasysglobal.com`) holds a **View seat** on the "Metasys" **Professional** team and a View seat on the "Internal" Starter team.
- View/Collab seats get **up to 6 Figma MCP tool calls per month**. The quota was already consumed before this run; the first data-read call (`get_metadata` on `14366:82579`) was rejected.
- Zero Figma data was retrieved. All Figma-derived documents are schema-only skeletons.
- **Decision required (pick one):**
  1. Upgrade `accounts@metasysglobal.com` to a **Full or Dev seat** on the "Metasys" Professional team (raises limit to 200 calls/day, 15/min) — recommended.
  2. Authenticate the Figma MCP with a **different account** that already has a Full/Dev seat and access to file `92rhH51aErpYQWRrlJqMhn`.
  3. Wait for the monthly quota reset (reset date not exposed by Figma; up to a month away; 6 calls is in any case far too few to enumerate a wireframe set).
- Owner: user / Metasys admin.
- Status: OPEN.

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
