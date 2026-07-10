# Localhost Visual Comparison Plan

Status: planning only
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full metadata on `13148:15012` returned HTTP 504.
- Source assumptions: visual QA starts only after implementation approval and implementation work.
- Unresolved blockers: assets, section specs, interactions, and responsive rules.

## Procedure

1. Start the app locally with the approved dev command.
2. Record the final local URL and port.
3. Set viewport to 1440px desktop first.
4. Capture the full local homepage screenshot.
5. Compare against `docs/figma/screenshots/M01-home-full-13148-15012.png` and the latest Figma screenshot for `13148:15012`.
6. Compare each section independently:
   - navbar;
   - collector hero;
   - cigar carousel;
   - roastery hero;
   - cigar knowledge cards;
   - gifting feature;
   - clothier cards;
   - estate collection carousel;
   - store and lounge feature;
   - footer.
7. Inspect spacing, dimensions, typography, image crop, overlays, colors, borders, shadows, opacity, alignment, layering, navigation, and interactions.
8. Verify extracted desktop initial states:
   - cigar carousel active card is `Verde Classico`, with `Ashtrays` and `Lighters` visible as dimmed side cards;
   - estate collection active card is `Founder's Boxy hoodie`, with `Estate Espresso` and `Roastery` visible as dimmed side cards;
   - footer includes extracted social row, newsletter fields, nav links, warning, trust line, legal links, accessibility control, and `Ascend`.
9. Record every difference in module notes.
10. Fix differences section by section.
11. Repeat screenshot comparison until approved tolerance is reached.
12. Only then test responsive widths.

## Required Viewports

- 1440px desktop, primary acceptance target.
- 1024px tablet/desktop transition.
- 768px tablet, engineering-derived.
- 390px mobile, engineering-derived.

## Important Rules

- A successful build is not proof of visual fidelity.
- Do not evaluate mobile until 1440px desktop is understood.
- Do not use temporary Figma URLs as image sources.
- Do not silently approximate missing Figma values.
- Any unresolved visual ambiguity must be documented with the exact node ID.
