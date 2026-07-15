# M09 Careers Position Detail — Implementation Notes

## Route family and approved slug

- Route family: `/careers/positions/[jobId]`
- Approved implemented slug: `area-sales-manager`
- Branch: `feature/m09-careers-position-detail`
- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Figma frame: `13148:15939`

## Dynamic-route architecture

- `app/careers/positions/[jobId]/page.tsx` resolves `params.jobId`
- Requires both listing summary and approved detail content
- Unsupported slugs call `notFound()`
- `generateStaticParams()` returns only `area-sales-manager`

## Route policy

- `public: true`, `indexable: false`, `audience: review`
- Unknown, under-21, and over-21 visitors render the approved detail page
- Inherited from `/careers` review prefix; `lib/age/route-access.ts` unchanged

## Detail data architecture

- Summary identity reused from `CAREER_POSITIONS`
- Approved detail content centralized in `careers-position-details-data.ts`
- Lists render via `.map()` from typed arrays

## Area Sales Manager content

- Overview (2 paragraphs), Responsibilities (8), Qualification and Experience (6), What We Offer (4)
- Editorial normalizations: world-class, performance-driven, India’s, typographic quotes, terminal punctuation

## HR contact safety

- Figma review text preserved as plain text
- No `mailto:` or `tel:` links
- `data-contact-verification-status="figma-review-unverified"`

## Apply button deferral

- `APPLY FOR THIS JOB` disabled with `data-application-status="deferred"`
- Next route: `/careers/positions/area-sales-manager/apply`

## Listing integration

- Only Area Sales Manager card links to detail (`data-position-detail-status="implemented"`)
- Other five cards remain deferred and non-navigable

## Search row

- Detail page uses GET form to `/careers/positions?q=`
- Listing initializes local search from `q` query parameter

## Assets and security

- No route-specific images, Figma MCP URLs, backend/API, storage, or JobPosting schema
- CSP, Next image config, and package files unchanged
- Under-21 module files untouched

## Validation

- `npm run test -- tests/m09-careers` — 66 passed
- `npm run test -- tests/routes/route-access.test.ts` — passed
- `npm run test -- tests/seo/route-manifest.test.ts` — passed
- `npm run lint` — passed
- `npm run test` — 336 passed (52 files)
- `npm run build` — passed (`/careers/positions/[jobId]` generated)
- `npm run test:e2e -- --list` — 9 tests discovered
- `npx playwright test tests/e2e/m09-careers-position-detail.spec.ts --project=chromium` — 2 passed

## Visual review

- Localhost: `http://localhost:3000/careers/positions/area-sales-manager`
- Screenshot: `test-results/m09-careers-position-detail-1440-review.png` (not committed)
