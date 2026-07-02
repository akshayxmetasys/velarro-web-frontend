# Velarro — Continuation Prompt (run after the Figma MCP connection is restored)

Preconditions (updated after Run 2, 2026-07-01):

1. Fix the MCP connection (U-01 in `docs/figma/unresolved-items.md`): in Cursor,
   reload/re-enable the Figma MCP server (`plugin-figma-figma`); complete any pending
   Figma OAuth consent as `akshay@metasysglobal.com`; ensure the Figma desktop app is
   signed in as the same account.
2. `whoami` must return: email `akshay@metasysglobal.com`, Professional plan,
   **Full or Dev seat**, with access to file `92rhH51aErpYQWRrlJqMhn`. If the server
   times out or the seat reads `View`, stop and report.

Copy everything below the line into a new agent run.

---

VELARRO FIGMA ANALYSIS — CONTINUATION RUN

This task belongs exclusively to the Velarro Estate frontend repository
(/Users/mac/Projects/velarro-web-frontend, branch feature/figma-wireframes).
This run is for analysis and documentation only. Do not write production code.
Only create or modify files inside docs/figma/** and docs/implementation/**.

CONTEXT FROM PREVIOUS RUNS (both 2026-07-01):

- Run 1: preflight passed; hit the Figma MCP monthly rate limit (View seat,
  accounts@metasysglobal.com) with ZERO successful data-read calls.
- Run 2: after reauthentication as akshay@metasysglobal.com, the MCP server was
  UNREACHABLE (connection timeouts on every whoami attempt); identity never
  verified; still ZERO Figma data retrieved. Fix connectivity before starting.
- Budget rule from Run 2 instructions: use at most 100 Figma read calls per run;
  at ~90 calls stop, checkpoint, and update this prompt.
- Log every call in docs/figma/ingestion-log.md with: sequential call number,
  tool, node ID, node name, purpose, result, node complete?, next action.
- Last completed node: NONE. Next unprocessed node: 14366:82579 (Approved
  Wireframes section). Then page 85:10 and prototype start node 15967:43304.
- Skeleton documents with schemas already exist and must be FILLED, not recreated:
  docs/figma/screen-manifest.json, prototype-flow-map.json, component-inventory.json,
  asset-inventory.json, design-tokens.json, unresolved-items.md, ingestion-log.md.
- Repository assessment is COMPLETE (docs/implementation/repository-assessment.md);
  do not redo it unless app/, package.json, or configs changed since commit d340c27.
- docs/implementation/module-queue.json contains only M00-foundations; add
  screen-derived modules after enumerating screens.

FIGMA SCOPE (only these two links, same file 92rhH51aErpYQWRrlJqMhn):

Prototype flow:
https://www.figma.com/proto/92rhH51aErpYQWRrlJqMhn/Velarro?node-id=15967-43304&t=HJe6XAvQNYwmEyvH-1&scaling=contain&content-scaling=fixed&page-id=85%3A10

Approved Wireframes section:
https://www.figma.com/design/92rhH51aErpYQWRrlJqMhn/Velarro?node-id=14366-82579&t=rwRvrRR07Ry1Sa8S-1

Do not inspect other files, other pages, archives, explorations, or rejected concepts.

RETRIEVAL ORDER (never retrieve the same node twice; log every call in
docs/figma/ingestion-log.md with timestamp, tool, nodeId, and outcome):

1. whoami — confirm seat is Full or Dev. If View, stop and report.
2. get_metadata on 14366:82579 — enumerate every wireframe frame: exact names,
   node IDs, sizes, positions. Record all frames in screen-manifest.json
   immediately (analysisStatus: metadata-only).
3. get_metadata on page 85:10 — prototype page structure; identify frames
   participating in the flow that starts at 15967:43304.
4. get_variable_defs on 14366:82579 — fill design-tokens.json.
5. get_design_context per screen frame, one call each, in manifest order —
   fill components, prototype reactions (flow-map edges), assets, states.
   Update analysisStatus per screen as you go.
6. get_screenshot ONLY for visually unique screens or states — skip responsive
   variants and near-duplicates. Record which screenshots were skipped and why.
7. Do not download assets unless required for planning.

RATE-LIMIT PROTOCOL (if it happens again): stop Figma calls immediately, save all
completed documentation, record last completed node and next unprocessed node in
ingestion-log.md, regenerate this continuation prompt with the new cursor position,
and end without implementing anything.

AFTER FIGMA INGESTION COMPLETES:

- Phase 2: complete all seven docs/figma/ documents. Set status fields from
  "blocked-rate-limit" to "complete". Record the ACTUAL screen count. Label every
  fact: Figma verified / Prototype verified / Repository verified / Metadata
  verified / Assumption requiring confirmation.
- Phase 4: rewrite docs/implementation/master-plan.md and module-queue.json with
  real modules in dependency order (every field required by the original prompt:
  module ID, name, Figma nodes, screens, routes, shared components,
  module-specific components, assets, responsive requirements, interactions,
  accessibility, implementation steps, test requirements, visual verification,
  blockers, status: pending). Update route-map.json (planned routes),
  shared-component-plan.json, acceptance-criteria.md, and testing-plan.md.
- Phase 5: verify every screen is in the manifest, belongs to a module, every
  route mapped, every reusable component and asset recorded, every unresolved
  question listed. Run git status --short and git diff --check. Confirm changes
  exist only under docs/figma/** and docs/implementation/**.

Finish by reporting: repository, branch, Figma account, plan and seat, total
screens, total modules, files created/updated, missing screenshots or assets,
rate-limit status, unresolved decisions, next recommended module, and
confirmation that no production code was modified.

Do not implement production code. Implementation starts only after the user
sends: START VELARRO IMPLEMENTATION
