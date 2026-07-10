# PR-2 Definition Of Done

Status: planning only
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata on `13148:15012` returned HTTP 504.
- Source assumptions: this DoD covers PR-2 planning and later implementation gates separately.
- Unresolved blockers: implementation remains blocked.

## Planning DoD

- Repository preflight recorded.
- Guidance, rules, agents, and skills reviewed.
- Existing app architecture inspected.
- Figma extraction attempts recorded, including failures.
- Ordered homepage section inventory created.
- Asset and permanent-image requirements documented.
- Precise Vishnu-required asset and decision checklist documented.
- Repository-to-Figma mapping documented.
- Visibility Architect review documented.
- Security Auditor review documented.
- Test plan documented.
- Localhost visual comparison plan documented.
- Assumptions, blockers, and questions documented.
- Section-by-section implementation sequence documented.
- No production code changed.
- No commit, push, merge, or PR created.

## Asset Collection DoD

- Cigar carousel has six permanent card images, alt-text intent, and destinations approved.
- Cigar knowledge has three permanent card images, card copy, alt-text intent, and destinations approved.
- Clothier has three permanent product images, product names/descriptions, swatches, `Top Gift` badge policy, alt-text intent, and destinations approved.
- Estate collection has six permanent card images, arrow treatment, alt-text intent, destinations, and initial carousel state approved.
- Footer has social URLs, newsletter behavior, legal routes, warning text, trust claim, logo/marks, accessibility control, and Ascend behavior approved.
- Root age/crawler/metadata/schema policy is approved before any implementation starts.

## Implementation DoD For A Future Approved PR

- Vishnu provides `START VELARRO IMPLEMENTATION`.
- All blocking assets are supplied or approved.
- Root route age-state and crawler/indexability behavior is approved.
- All sections have complete layer-level Figma specs or approved manual fallback data.
- 1440px desktop matches Figma within approved tolerance.
- Responsive behavior is reviewed after desktop parity.
- Accessibility meets WCAG 2.2 AA expectations from `acceptance-criteria.md`.
- Security review passes.
- Visibility review passes.
- No temporary Figma URLs in runtime, metadata, or schema.
- Final validation passes:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - `npm run test:e2e -- --list`

## Current Verdict

READY FOR ASSET COLLECTION.

BLOCKED for implementation.
