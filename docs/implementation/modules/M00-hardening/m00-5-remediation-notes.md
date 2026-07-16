# M00.5 Design-system foundation remediation notes

Branch: `feature/m00-5-design-system-foundation-remediation`
Baseline SHA: `00fbb317b3f10a762912170acd3de8e7386817aa`

## Completed in this batch

1. Six-layer engineering working model documented (pending UI/UX confirmation).
2. Token gaps: `radius-sm`, navbar overlay, form error/success roles.
3. Typography readiness documented; no unlicensed fonts added.
4. Shared shell moved to `components/layout/` (navbar, menu, footer).
5. Partner submitted copy made truthful (UI-only).
6. Membership overflow: bounded scroll regions + document clip.
7. `app/not-found.tsx` and `app/error.tsx` added; `loading.tsx` deferred with notes.

## Explicitly out of scope

- Homepage pixel-fidelity remediation (next batch).
- CSP nonce migration.
- npm audit force-fix / Next downgrade.
- Prettier introduction.

## Cursor guard findings (M00.5 finalize)

Guard heuristics emit LOW `observability.review` / `testing.review` for substantial production diffs. Resolution below is evidence-based; fake OpenTelemetry or `console.log` would violate repository security and coding rules.

### Observability — justified N/A until approved client telemetry exists

Repo evidence (unchanged by this batch):

- `package.json` has no OpenTelemetry, Sentry, analytics, or structured logger dependency.
- Audit finding `FE-016` (`docs/audits/frontend-findings.json`): no approved third-party telemetry; production CSP `connect-src` is `'self'` only.
- `docs/audits/frontend-stack-matrix.md`: Observability = **Gap — add when approved**.
- Project rules forbid production `console.log` / debug prints and forbid logging PII.

| Path | Operation boundary? | Decision |
|------|---------------------|----------|
| `components/m09-partner/partner-form.tsx` | No — UI-only local state; submit does not leave the browser (`data-submission-endpoint="none"`). Partner tests assert no `fetch`, storage, cookies, or console logging of form values. | **N/A** — inventing spans/logs would either no-op or risk PII. Wire when an approved telemetry sink + CSP allowlist land. |
| `components/m09-membership/membership-page.tsx` | No — presentational page assembly / layout clip. | **N/A** — not a network, auth, or persistence boundary. |
| `components/m09-membership/membership-benefits-table.tsx` | No — static comparison markup + scroll region. | **N/A** |
| `components/m09-membership/membership-document-overflow-lock.tsx` | No — DOM style side-effect only; returns `null`. | **N/A** |
| `app/not-found.tsx` | Soft — unknown route UX; no backend call. | **N/A** — no approved 404 metric exporter. Revisit with approved RUM/OTel. |
| `app/error.tsx` | Soft — client error UI. Digest is reserved in `useEffect` without payload/stack logging. | **Deferred hook only** — must not emit stack traces or secrets; full instrumentation waits on approved SDK + CSP. |

### Testing — resolved with repository tests

| Path | Coverage evidence |
|------|-------------------|
| `partner-form.tsx` | `tests/m09-partner/partner-form.test.tsx` (validation + UI-only honesty); `tests/e2e/m09-partner.spec.ts` |
| `membership-page.tsx` | `tests/m09-membership/membership-page.test.tsx`; `tests/m09-membership/membership-overflow.test.tsx`; `tests/e2e/m09-membership.spec.ts` |
| `membership-benefits-table.tsx` | `tests/m09-membership/membership-benefits-table.test.tsx`; overflow unit + e2e scroll regions |
| `membership-document-overflow-lock.tsx` | `tests/m09-membership/membership-document-overflow-lock.test.tsx`; e2e overflow-x lock assertions |
| `app/not-found.tsx` | `tests/app/not-found.test.tsx` |
| `app/error.tsx` | `tests/app/error.test.tsx` (recovery controls; no stack exposure) |
