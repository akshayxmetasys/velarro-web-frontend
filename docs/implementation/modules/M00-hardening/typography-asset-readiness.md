# Typography asset readiness — Gotham and script logo

Status: **BLOCKED — approved production font files not present**
Module: M00.5 / foundations
Related: `app/layout.tsx`, `app/globals.css`, Figma typography tokens

## Required fonts

| Family | Role | Required weights | Required formats | License status | Availability |
| --- | --- | --- | --- | --- | --- |
| Gotham | Primary UI / Figma body and display composites via `--font-family-primary` | Light 300, Book/Regular 400, Medium 500 (as used in Figma composites) | Prefer `woff2` (+ `woff` fallback) | **Not available in repo** | No `.woff`/`.woff2`/`.ttf`/`.otf` in repository |
| OneSignature (or approved script) | Logo wordmark in Figma navbar | Regular | Vector preferred; webfont only if licensed | **Not available as webfont** | Production logo currently served as approved SVG/PNG image URL |

## Integration status

| Item | Status |
| --- | --- |
| Token swap path | Ready — change `--font-family-primary` only when licensed files arrive |
| Next.js font loading | Interim: Arial/Helvetica stack; Noto Sans for Title/title-2 via `next/font/google` |
| Fake / substitute Gotham | **Not introduced** (would falsify fidelity) |
| Unofficial downloads | **Not performed** |

## Fallback behavior

```css
--font-family-primary: Arial, Helvetica, sans-serif;
--font-family-headings: var(--font-noto-sans), var(--font-family-primary);
```

Navbar brand uses approved image asset (`M01_HOME_APPROVED_IMAGES.navbarLogoScript`), not a live script font.

## Fidelity impact

Exact Figma typography metrics (glyph width, line wraps, optical sizing) remain **blocked** until licensed Gotham (and any required script treatment) are supplied under an approved license and integrated through the token path above.

## When assets arrive

1. Confirm license allows web embedding.
2. Commit only licensed files under an agreed assets path.
3. Wire via Next.js local font API.
4. Point `--font-family-primary` at the loaded family.
5. Re-measure homepage and shared shell at 1440px.
6. Update this document to `READY`.
