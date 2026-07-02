# Velarro Estate — Testing Plan

Last updated: 2026-07-01 (Run 3)

## Current state

No test infrastructure (Repository verified). Planning complete; installation deferred to M00 after U-07 approval.

## Recommended stack

| Layer | Tool | Scope |
| --- | --- | --- |
| Static | `npm run lint`, `npm run build` | Every module |
| Unit/component | Vitest + RTL | Shared UI: MAIN NAVBAR, buttons, inputs, modals |
| E2E | Playwright | Flows from `prototype-flow-map.json` |
| Visual | Playwright screenshots @ 1440px | Compare to `docs/figma/screenshots/` |
| A11y | `@axe-core/playwright` | WCAG 2.1 AA (U-08) |

## Module test matrix

| Module | Unit | E2E | Visual |
| --- | --- | --- | --- |
| M00 | Token smoke test | — | Typography/color sample |
| M01 | Navbar, footer | Home load | `M01-home-13148-15012.png` |
| M02 | Login form validation | Auth modal open/close chain | `M02-auth-login-14991-70094.png` |
| M03–M05 | Product card | PDP → add to cart | Estate/vault screenshots |
| M06 | Checkout form fields | cart→shipping→payment→review | Cart screenshot |
| M07 | Deletion stepper | Settings→deactivation→deletion steps; sign-out confirm | Settings/deactivation screenshots |
| M08–M10 | — | Primary route smoke | Where screenshots exist |

## Priority E2E flows (from prototype-flow-map.json)

1. Guest home → login modal → sign up ↔ login
2. PDP → cart → shipping → payment → review
3. Settings → deactivation&deletion → deletion1–6 (Keep Account exits)
4. Settings → sign out confirmation → cancel / sign out
5. Temporary disable branch (deactivation1–4)

## CI (recommended, not configured)

PR: `npm ci` → lint → build → unit → Playwright (chromium)
