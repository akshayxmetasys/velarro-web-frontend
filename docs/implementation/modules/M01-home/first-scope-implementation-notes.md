# M01 First Scope Implementation Notes

Status: implemented — awaiting Vishnu visual approval
Implementation date: 2026-07-10
Branch: `feature/m01-homepage-section-implementation`

## Authorization

Implementation authorized by Vishnu with `START VELARRO IMPLEMENTATION` for first scope only.

## Approved Remote Image Host

| Item | Value |
| --- | --- |
| Host | `lpnrhpvmrnoqkzoxukov.supabase.co` |
| Origin | `https://lpnrhpvmrnoqkzoxukov.supabase.co` |
| Path prefix | `/storage/v1/object/public/` |
| Wildcards | None |
| Figma MCP URLs | Not allowed |

Configuration:

- `lib/assets/approved-image-hosts.ts` — approved host and M01 URL constants
- `lib/security/content-security-policy.ts` — `img-src` allowlist
- `next.config.ts` — `images.remotePatterns` for Supabase only

Rejected for this scope:

- `https://webp-image-deploy.vercel.app/` — not used by approved asset URLs

## Implemented In This Scope

| Unit | Figma node | Files | Status |
| --- | --- | --- | --- |
| Remote image/CSP readiness | N/A | `lib/assets/approved-image-hosts.ts`, CSP, `next.config.ts` | Done |
| Root age gate | `13148:15012` shell | `components/age/age-gate.tsx`, `components/m01-home/home-page-client.tsx`, `app/page.tsx` | Done |
| Navbar | `14406:85640` / `14279:30062` | `components/m01-home/main-navbar.tsx` | Done — visual QA pending |
| Collector hero | `15081:25289` | `components/m01-home/collector-hero-section.tsx` | Done — visual QA pending |

## Approved Image URLs Used

| Slot | URL |
| --- | --- |
| `navbar_logo_script` | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/1781557831962-frame-1000005296-(1).webp` |
| `collector_hero` | `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/collection-series-hero-home-20260709-034217-desktop-hero.webp` |

## Age-State Behavior Implemented

| State | `/` behavior |
| --- | --- |
| `unknown` | Accessible age gate only; no navbar, hero, or tobacco imagery |
| `over21` | Navbar + collector hero shell |
| `under21` | Safe restricted shell with legal/accessibility links only |

Notes:

- Cookie persistence uses server action `confirmAgeStateAction` with HttpOnly `velarro_age_state` cookie (`over21` / `under21` only).
- No DOB or PII stored.
- No invented backend compliance behavior.

## Deferred / Not In Scope

- Cigar carousel (`13148:15033`)
- Roastery hero (`15451:37609`)
- Cigar knowledge (`13148:15081`)
- Gifting (`13148:15113`)
- Clothier (`13148:15120`)
- Estate collection (`13148:15145`)
- Store/lounge (`13148:15176`)
- Footer (`14468:34842`)
- Navbar link destinations (The Estate, Partner, Our Story)
- Search, cart, login behavior
- `SHOP NOW` destination
- Hero slider interaction
- Footer, newsletter, social URLs, metadata/schema refinements for crawlers

## Localhost Visual QA Instructions

1. Start dev server: `npm run dev`
2. Open `http://localhost:3000/` at **1440px** viewport width
3. Confirm unknown state shows age gate with no tobacco imagery behind it
4. Click **I am 21 or older**
5. Compare navbar against Figma `14279:30062` / `14406:85640`:
   - 1440 × 73 bar
   - rgba(29,28,26,0.6) background with blur
   - `#c6b49d` border and nav text
   - Approved logo export centered with `SINCE 1919`
   - Left nav labels and right utility labels present
6. Compare collector hero against Figma `15081:25289`:
   - 1441 × 851 hero crop
   - `COLLECTOR SERIES` display type
   - `SHOP NOW` CTA present but deferred/disabled
   - Static slider dots visible without interaction
7. Reload, choose **I am under 21**, confirm no hero/navbar tobacco content renders
8. Reference screenshots: `docs/figma/screenshots/M01-home-13148-15012.png`

## Remaining Blocked Assets

All sections below first scope still require permanent assets and/or decisions per `asset-readiness-audit.md`.

## Visual Remediation — 2026-07-10 (pass 3)

- Age gate background pass 4: lighter `rgba(29,28,26,0.22)` overlay only; removed cream wash; `blur-lg` + `object-bottom` crop to match hero; `scale-105` for blur edges.
- Navbar menu icon: two-line hamburger at Figma `14279:29980` proportions (24×22, tighter line spacing, `#c6b49d`).
- Navbar background: inline `rgba(29, 28, 26, 0.6)` + `backdrop-blur-[10px]` to avoid Tailwind/class washout.
- Logo: raster only, no code-rendered `SINCE 1919`.

Awaiting Vishnu visual confirmation at 1440px.
