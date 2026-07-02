# Velarro Estate — Testing Plan

Last updated: 2026-07-01 (documentation correction run)

## Approved stack

| Tool | Responsibility |
| --- | --- |
| **Vitest** | Unit tests, fast feedback on utilities, token helpers, pure functions |
| **React Testing Library** | Component rendering, user interactions, accessible queries, form behavior |
| **Playwright** | End-to-end flows, route-backed modal navigation, browser back/refresh, visual screenshots at 1440px |
| **ESLint** (`npm run lint`) | Static analysis including jsx-a11y on every module |
| **`npm run build`** | Production build gate on every module |

Installation deferred to implementation. Not installed during planning runs.

## Deployment

- **Target:** Vercel
- Recommended CI on PR: `npm ci` → lint → build → Vitest → Playwright (chromium)
- CI configuration deferred to implementation

## Module test matrix

| Module | Vitest/RTL | Playwright | Visual |
| --- | --- | --- | --- |
| M00 | Token + font variable smoke tests | — | Token swatch page |
| M01 | Navbar, footer | Home load | `M01-home-13148-15012.png` |
| M02 | Login form validation | Auth modal routes + close | `M02-auth-login-14991-70094.png` |
| M03–M05 | Product card | PDP → add to cart | Estate/vault screenshots |
| M06 | Checkout fields | cart→shipping→payment→review | Cart/checkout screenshots |
| M07 | Deletion stepper | Settings flows; sign-out | Settings/deactivation screenshots |
| M08–M10 | — | Primary route smoke | Where screenshots mapped |

## E2E priority flows

1. Guest home → `/login` intercepting modal → close/back
2. PDP → cart → shipping → payment → review
3. Settings → deactivation/deletion steps; Keep Account exits
4. Sign-out confirmation
5. `/press` form submit → in-page success overlay (no route change)

## Inferred flow policy

- Tests for inferred prototype edges are written as **pending QA approval**
- Do not mark inferred interactions as regression-stable until product signs off

## Accessibility testing

- RTL: accessible name and role assertions
- Playwright: keyboard walk-through + axe scan targeting WCAG 2.2 AA
