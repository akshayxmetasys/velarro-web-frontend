# M09 Careers Position Application â€” Implementation Notes

## Route family and approved slug

- Route family: `/careers/positions/[jobId]/apply`
- Approved implemented slug: `area-sales-manager`
- Branch: `feature/m09-careers-position-application`
- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Figma frame: `13563:29858`

## Architecture

- Dynamic route: `app/careers/positions/[jobId]/apply/page.tsx`
- Requires position summary, position detail, and application config
- Unsupported slugs call `notFound()`
- `generateStaticParams()` returns only `area-sales-manager`
- Form is client-side only with `formMode: "ui-only-not-connected"`

## Detail integration

- Area Sales Manager detail Apply control is now a Link to `/careers/positions/area-sales-manager/apply`
- `applicationStatus: "implemented"` in detail data
- Other positions remain without application routes

## Submission boundary

Valid submit displays:

`Application submission is not connected in this review build. No personal information or files were sent.`

No fetch, storage, FileReader, Base64, server actions, mailto, or fake success state.

## Field inventory

Required: first name, last name, email, phone, city, resume, cover letter
Optional: country

Calling codes: `+91` only (approved for Hyderabad role)
Countries: `India` only (optional select)

Files: PDF, DOC, DOCX up to 10 MB each. Filenames display locally; contents are not read or transmitted.

## Route policy

Inherits `/careers` review prefix â€” visible to unknown, under-21, and over-21 visitors without AgeGate.

## Assets and security

- No route-specific images or Figma MCP URLs
- CSP, Next image config, and package files unchanged
- Under-21 module files untouched

## Visual review

- Localhost: `http://localhost:3000/careers/positions/area-sales-manager/apply`
- Screenshot: `test-results/m09-careers-position-application-1440-review.png` (not committed)
- Reviewed at 1440px, 1024px, 768px, and 390px via Playwright E2E and localhost
- Detail Apply link verified at `http://localhost:3000/careers/positions/area-sales-manager`
- `/careers` and `/careers/positions` remain unchanged

## Validation results

- `npm run test -- tests/m09-careers`: 72/72 passed
- `npm run test -- tests/routes/route-access.test.ts`: 3/3 passed
- `npm run test -- tests/seo/route-manifest.test.ts`: 15/15 passed
- `npm run lint`: 0 errors, 0 warnings
- `npm run test`: 360/360 passed (re-run after initial parallel-load timeouts)
- `npm run build`: succeeded; `/careers/positions/[jobId]/apply` present
- `npm run test:e2e -- --list`: 11 tests discovered
- Application Playwright: 2/2 passed
- Careers regression Playwright (hero, positions, detail): 4/4 passed
- Unsupported slug `production-manager/apply`: HTTP 404 on localhost

## Reviewer subagents

- Security: PASS (ui-only-not-connected; noscript GET noted as pre-connection hardening)
- Visibility: PASS (noindex/nofollow, manifest aligned, no JobPosting schema)
- Accessibility: findings documented (file focus, error contrast, alert noise â€” non-blocking for review build)
