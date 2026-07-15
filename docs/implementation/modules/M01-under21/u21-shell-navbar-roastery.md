# U21-1 Shell, Navbar, and Roastery Hero

Branch: `feature/u21-shell-navbar-roastery-reintegration`

Scope: Under-21 homepage shell, dedicated Under-21 navbar, and Roastery hero only. Estate Collection, Gifting, Clothier, Store/Lounge, and Footer remain deferred.

## Figma Node IDs

| Surface | Node ID | Notes |
| --- | --- | --- |
| Full Under-21 page | `14735:62828` | Shell reference only; sections beyond navbar + roastery hero are not implemented |
| Dedicated Under-21 navbar | `15694:43347` | Implemented as `Under21Navbar` |
| Roastery hero | `15694:45979` | Implemented as `Under21RoasteryHero` |
| Excluded | `14735:63837` | Not used per scope |

Figma file key: `92rhH51aErpYQWRrlJqMhn`

## Files Changed

### Added

- `components/m01-under21/under21-home-page.tsx`
- `components/m01-under21/under21-navbar.tsx`
- `components/m01-under21/under21-roastery-hero.tsx`
- `components/m01-under21/under21-assets.ts`
- `components/m01-under21/under21-data.ts`
- `tests/m01-under21/under21-shell-navbar-roastery.test.tsx`
- `docs/implementation/modules/M01-under21/u21-shell-navbar-roastery.md`

### Updated

- `components/m01-home/under21-home-shell.tsx` - renders `Under21HomePage`
- `tests/m01-home/home-page-age-state.test.tsx` - under-21 expectations updated
- Blocked-route age-state tests that consume `Under21HomeShell` (estate, our story, house, vault, chronicle, pairing guide)

### Unchanged

- `components/m01-home/home-page-by-age-state.tsx` routing (`unknown` -> AgeGate, `under21` -> Under21HomeShell, `over21` -> Over21HomePage)
- `components/m01-home/over21-home-page.tsx` and all approved over-21 homepage sections

## Approved Asset

Roastery hero background:

- Key: `M01_HOME_APPROVED_IMAGES.roasteryHero`
- URL: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/homeu21-hero-20260709-024151-desktop-hero.webp`

Navbar logo:

- Key: `M01_HOME_APPROVED_IMAGES.navbarLogoScript`

No temporary Figma MCP asset URLs are used in production code.

## Route Policy Decisions

| Control | Policy | Implementation |
| --- | --- | --- |
| The Estate | Blocked for under-21 | Non-navigable disabled span with `aria-disabled` |
| Our Story | Blocked for under-21 | Non-navigable disabled span with `aria-disabled` |
| Partner | Review route (`getRouteAccess("/partner", "under21").decision === "review"`) | Active link to `/partner` |
| Cart | Blocked + deferred | Disabled button |
| Login | Deferred until M02 Auth | Disabled button |
| Search | Deferred | Disabled pill button |
| Main menu | Deferred | Disabled menu button |
| SHOP NOW | Deferred | Disabled button; no approved destination |

Under-21 DOM excludes cigar/tobacco commerce content, Vault, Chronicle, Pairing Guide, and restricted purchase CTAs.

## Deferred Controls

- Main menu sidebar behavior
- Search behavior
- Cart route activation
- Login / M02 Auth
- SHOP NOW destination
- Estate Collection, Gifting, Clothier, Store/Lounge, Footer sections

## Layout Notes

- Roastery hero desktop height: `851px`
- Heading: `THE ROASTERY` (page `h1` on under-21 homepage)
- Decorative slider dots only; no carousel behavior
- Single approved image layer with `object-cover object-center`
- Navbar matches over-21 grid structure (`73px` height, centered logo, left nav + right utilities) with under-21-specific disabled states

## Tests and Validation

Focused tests:

```bash
npm run test -- tests/m01-under21
```

Full validation (required before completion):

```bash
npm run lint
npm run test -- tests/m01-under21
npm run test
npm run build
npm run test:e2e -- --list
git diff --check
```

## Open Assumptions

- Blocked under-21 routes that previously showed the access-restricted card now render the shared under-21 homepage shell via `Under21HomeShell`.
- Partner remains the only active primary nav link for under-21 visitors in this scope.
- Roastery hero reuses the same approved Supabase asset and layout tokens as the over-21 `RoasteryHeroSection`, adapted for the under-21 page shell.
