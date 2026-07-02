# Velarro Web Frontend — Repository Assessment

Assessed: 2026-07-01 (read-only). Every statement in this document is **Repository verified** unless labeled otherwise.
State at assessment: branch `feature/figma-wireframes`, HEAD `d340c27` ("Add Velarro repository boundary"), clean tree. The app is an untouched `create-next-app` scaffold — no Velarro product code exists yet.

## Framework and architecture

| Item | Value |
| --- | --- |
| Framework | Next.js **16.2.10** |
| React | 19.2.4 (`react`, `react-dom`) |
| Router | **App Router**, `app/` at repository root (no `src/` directory) |
| Rendering default | Server Components; no `"use client"` usage yet |
| `next.config.ts` | Empty (`{}`) — no images config, no experimental flags, `cacheComponents` not enabled |
| Middleware/proxy | None. Note: Next 16 renamed `middleware.ts` to **`proxy.ts`** (per bundled docs `01-getting-started/16-proxy.md`) |
| Package manager | npm (`package-lock.json` present) |

Next 16 conventions that differ from older training data (verified against `node_modules/next/dist/docs/`):

- `params` and `searchParams` in pages/layouts are **Promises** and must be awaited (`03-file-conventions/page.md`).
- Caching is opt-in via `cacheComponents: true` + `"use cache"` directives; the old implicit model is legacy (`01-getting-started/08-caching.md`).
- Edge-of-app request interception lives in `proxy.ts`, not `middleware.ts`.
- Implementers must read the relevant guide in `node_modules/next/dist/docs/` before writing code (repo rule in `AGENTS.md`).

## App Router structure (current)

```text
app/
  favicon.ico
  globals.css      — Tailwind v4 entry + minimal theme
  layout.tsx       — root layout, Geist fonts, metadata "Create Next App"
  page.tsx         — default create-next-app landing page (to be replaced)
```

There are no route groups, no dynamic segments, no `loading.tsx` / `error.tsx` / `not-found.tsx`, no route handlers, no `proxy.ts`.

## TypeScript configuration

- `strict: true`, `noEmit`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, target ES2017.
- Path alias: **`@/*` → `./*`** (repo root). Imports like `@/components/ui/Button` will resolve once those folders exist.
- Next TS plugin enabled.

## Tailwind configuration

- **Tailwind CSS v4** via `@tailwindcss/postcss` (only PostCSS plugin). There is **no `tailwind.config.*` file** — v4 is CSS-first.
- `app/globals.css`: `@import "tailwindcss"`, a `:root` block with `--background`/`--foreground`, an inline `@theme` mapping those plus `--font-sans`/`--font-mono`, and a `prefers-color-scheme: dark` override.
- Design tokens from Figma should be added as CSS variables under `@theme` in `globals.css` (or a dedicated imported token stylesheet). Token values pending Figma ingestion (see `docs/figma/design-tokens.json` — blocked).
- One quirk to fix during foundations work: `body` sets `font-family: Arial, Helvetica, sans-serif`, overriding the Geist `--font-sans` variable that the layout loads.

## Global CSS structure

Single stylesheet `app/globals.css` imported by the root layout. No CSS modules, no CSS-in-JS, no other stylesheets.

## Current components

**None.** No `components/` directory exists. The only React code is the root layout and the default landing page.

## Current assets

`public/` contains only create-next-app defaults: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`. All are replaceable; none are Velarro assets. No `public/images` or `public/icons` structure yet.

## Routing conventions (established for this project)

- App Router file conventions: `app/<segment>/page.tsx`, shared UI in `layout.tsx`, dynamic segments `[param]` (awaited Promise params), route groups `(group)` for layout partitioning.
- Only `/` exists today. Planned routes: `docs/implementation/route-map.json` (blocked pending screen inventory).

## Commands

| Task | Command | Notes |
| --- | --- | --- |
| Dev server | `npm run dev` | Next dev (Turbopack is the Next 16 default) |
| Build | `npm run build` | |
| Start (prod) | `npm run start` | |
| Lint | `npm run lint` | ESLint 9 flat config: `eslint-config-next/core-web-vitals` + `/typescript`; ignores `.next/**`, `out/**`, `build/**`, `next-env.d.ts` |
| Test | **absent** | No test script, framework, or config exists |

## Testing setup

None installed — no Vitest/Jest, no Testing Library, no Playwright/Cypress, no CI workflows (`.github/` absent). Recommendation (Assumption requiring confirmation, install only during implementation after approval): Vitest + React Testing Library for units, Playwright for E2E/visual. See `docs/implementation/testing-plan.md`.

## Font strategy

- **Figma verified (Run 3):** Primary typeface is **Gotham** (Light, Book, Medium, Bold, Book Italic) across all wireframes. Secondary token uses **Noto Sans** for `Title/title-2` only.
- **Implementation:** `next/font/local` with licensed Gotham files under `public/fonts/` or `app/fonts/` — Geist (current scaffold) must be replaced in M00.
- Repository currently loads Geist via `next/font/google` and `globals.css` overrides with Arial — both must be removed in M00.

## Image strategy

- `next/image` is used by the default page and is the required approach for wireframe imagery (automatic optimization, explicit dimensions to prevent CLS).
- No remote image patterns configured in `next.config.ts`; if Figma assets are served remotely at runtime this needs `images.remotePatterns`. For exported static assets, use `public/` with organized subfolders. Formats: SVG for icons/logos, WebP/AVIF for photos (Next optimizes on demand).

## Accessibility requirements

- Enforced today only via `jsx-a11y` rules bundled in `eslint-config-next` (verified present in `node_modules/eslint-config-next/dist/index.js`).
- No explicit product accessibility target documented. Working target **WCAG 2.1 AA** — Assumption requiring confirmation (U-08). Implications for implementation: semantic landmarks, focus management for modal/drawer/overlay surfaces flagged in the prototype, visible focus states, color-contrast checks against Figma tokens, keyboard operability of all prototype interactions.

## Missing foundations (gap list for module M00)

1. Velarro design tokens in `globals.css` `@theme` (blocked on Figma — U-04).
2. Brand fonts decision and loading (U-05).
3. `components/` structure and shared UI primitives (blocked on component inventory).
4. Root layout metadata still says "Create Next App"; no favicon/OG branding.
5. Default landing `page.tsx` must be replaced with the real home screen.
6. Body font-family override conflicting with loaded fonts (see Tailwind section).
7. No `not-found.tsx`, `error.tsx`, or `loading.tsx` conventions.
8. No testing framework or CI (U-07).
9. No `public/` asset structure for Velarro imagery.
10. Repo guardrail: implementation may not begin until the user sends `START VELARRO IMPLEMENTATION` (per `AGENTS.md`).
