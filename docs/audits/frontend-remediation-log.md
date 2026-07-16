# Frontend Remediation Log (continuation)

Branch (actual working tree): `chore/install-cursor-enterprise-engineering`  
Note: Prior audit notes referenced `feature/u21-shell-navbar-roastery-reintegration` @ `24b14b2…`; the preserved uncommitted audit work is on this branch @ `055b5160…`.  
Date: 2026-07-15

## Toolchain recovery

Cursor `beforeShellExecution` was denying all Shell tool calls because stdin was non-JSON noise. `guard.py` now recovers:

- first JSON object via `raw_decode`
- `"command"` field via regex
- plain-text command payloads

Invalid JSON that cannot be recovered still fails closed. Empty events allow with audit. Hook tests expanded.

## Phase B — Security

| Change | Status |
| --- | --- |
| Deleted unused `AgeStateProvider` | Kept / verified |
| CSP removed unused Google Fonts CDN | Kept / verified |
| HttpOnly cookie contract tests | Kept / verified |
| F-009 GHSA-qx2v-qp2m-jg93 | Accepted temporary risk (see findings) |

## Phase C/D — Age access centralization (F-007)

Introduced `AgeAccessBoundary` consuming `getRouteAccess` and migrated all `*PageByAgeState` modules to it. Presentation enforcement is now single-sourced from the policy table. Middleware was not added because:

- every implemented page already SSR-reads the age cookie
- no cart/checkout/auth backends exist yet to authorize
- middleware becomes required when protected API/route handlers or commerce mutations ship

## Phase E — Focus trap (F-008)

Overlay focus lock now targets the dialog/panel. Backdrop controls use `tabIndex={-1}` (pointer dismiss retained). Drawer and route-backed modal tests assert backdrop exclusion from Tab order.

## Phase F — SEO / F-003

ADR written: `docs/decisions/ADR-age-gate-indexability.md`. No crawler bypass implemented.

## Accessibility

Skip link + unique `#main-content` landmarks retained; new skip-link tests added.

## Validation

Recorded in `frontend-tech-stack-validation.md` after final gate execution.
