# Velarro — Unresolved Items

Last updated: 2026-07-01 (Run 3). Ordered by severity.

## U-01 — RESOLVED: Figma MCP access

- Run 3 authenticated as `akshay@metasysglobal.com`, Metasys Professional **Full** seat.
- 27 additional read calls succeeded; ingestion proceeded.
- Status: **CLOSED**

## U-02 — RESOLVED: Screen inventory

- 116 top-level frames enumerated and classified in `screen-manifest.json`.
- Status: **CLOSED**

## U-03 — PARTIAL: Prototype flow

- `prototype-flow-map.json` documents 32 edges; step copy on deletion/deactivation modals is **Figma verified**.
- MCP `get_design_context` did **not** return prototype reaction metadata; most navigation edges are **inferred** from frame naming and UX sequence.
- Unresolved: exact navbar link → destination for all editorial/legal items; wishlist delete; order cancellation popup wiring.
- Status: **OPEN (non-blocking for M00/M01 planning)**

## U-04 — RESOLVED: Design tokens

- `design-tokens.json` populated from `get_variable_defs` on `13148:15012` (Figma verified).
- Primary brand font confirmed as **Gotham** (not Geist).
- Status: **CLOSED**

## U-05 — RESOLVED: Font strategy

- Wireframes use **Gotham** (Light, Book, Medium, Bold, Italic) and secondary **Noto Sans** for one title token.
- Implementation requires `next/font/local` with licensed Gotham files — not Google Fonts.
- Status: **CLOSED (pending font file procurement at implementation time)**

## U-06 — RESOLVED: Module boundaries

- 11 modules defined in `module-queue.json` (M00–M10) mapped to all 116 frames.
- Status: **CLOSED**

## U-07 — OPEN: No testing framework

- Repository has no test runner (Repository verified).
- Recommendation unchanged: Vitest + Playwright at M00 if approved.
- Status: **OPEN**

## U-08 — OPEN: Accessibility target

- Working target WCAG 2.1 AA — not explicitly confirmed by product owner.
- Status: **OPEN**

## U-09 — OPEN: Deployment target

- `.gitignore` suggests Vercel; no CI config exists.
- Status: **OPEN**

## U-10 — OPEN: Responsive behavior below 1440px

- Approved section contains **only 1440px desktop frames** (one at 1459px). No tablet/mobile wireframes.
- Implementation must not invent breakpoints without design approval.
- Status: **OPEN — blocking pixel-perfect mobile/tablet claims**

## U-11 — OPEN: Modal routing strategy

- Auth and account flows are modal overlays in Figma, not separate pages.
- Decision needed: overlay-only vs. deep-linkable routes (`/login`, etc.).
- Status: **OPEN**

## U-12 — OPEN: “Requires inspection” estate tab frames

- `14670:34051` and `15451:39198` matched dimensions (1440×2683) — design context confirms estate **house tab** and **roastery tab** layouts respectively.
- Reclassified from “requires inspection” to confirmed tab content in manifest enrichment.
- Remaining question: exact tab-switch interaction (prototype not verified).
- Status: **OPEN (minor)**
