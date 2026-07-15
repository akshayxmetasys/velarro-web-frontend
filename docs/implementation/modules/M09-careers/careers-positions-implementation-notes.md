# M09 Careers Positions — Implementation Notes

## Route and branch

- Route: `/careers/positions`
- Branch: `feature/m09-careers-positions`
- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Full frame: `13148:15855` — `home/careers/view position`

## Figma child nodes

- Main content: `13148:15859`
- Search section / row / field / button: `13148:15860`–`13148:15865`
- Content columns: `13148:15866`
- Filter panel / heading / controls: `14585:37387`, `13148:15868`, `13148:15870`
- Job list and cards: `13148:15893`–`13148:15929`
- Breadcrumb: `15057:23236`

## Relationship to `/careers`

- Existing Careers landing page remains visually unchanged.
- Only `VIEW ALL POSITIONS` was activated to link to `/careers/positions`.
- `JOIN OUR TEAM` and `LEARN MORE` remain deferred.

## Route policy

- `public: true`, `indexable: false`, `audience: review`
- Unknown, under-21, and over-21 visitors render the full positions page
- No AgeGate, blocked page, or redirect
- Inherited from `/careers` review prefix; `lib/age/route-access.ts` unchanged

## Six-position inventory

1. Production Manager — Manufacturing & Operations — Estelí, Nicaragua — Full-time
2. Area Sales Manager — Sales & Distribution — Regional — Full-time
3. Sales Head — Commercial Leadership — Global — Full-time (`sales-head-global`)
4. Torcedor — Product & Heritage — Regional — Full-time
5. Tobacco Blender — Product & Heritage — Estelí, Nicaragua — Full-time
6. Sales Head — Commercial Leadership — Global — Full-time (`sales-head-global-secondary`)

## Corrected Figma copy

- `Reginonal` → `Regional`
- `Full - time` → `Full-time`
- Em dash between department and location
- `Estelí` normalized

## Architecture

- Centralized typed data in `careers-positions-data.ts`
- One `CareersPositionCard` component
- One `CareersPositionFilterPanel` with data-driven deferred filter rows
- Client-only `CareersPositionsSearch` for keyword filtering on submit

## Search behavior

- Frontend-only filter over static data
- Matches title, department, location, employment type
- Case-insensitive, trims whitespace
- Empty query restores all six positions
- `aria-live="polite"` announces result status

## Deferred filters

Five collapsed filter headings (Company, Employment, Position, Country, State/Province) are disabled with `data-filter-status="deferred"`. No filter options were invented because Figma does not provide approved expanded states.

## Job-detail deferral

- No `/careers/positions/[jobId]` route
- Cards use `data-position-detail-status="deferred"` and stable slugs for a later PR

## Assets and security

- No route-specific production images
- No Figma MCP URLs
- No fetch, storage, cookies, server actions, or backend integration
- CSP and Next image configuration unchanged

## Under-21 module

- No edits to `components/m01-under21/*`, `under21-home-shell.tsx`, or related tests/docs

## Validation

- `npm run test -- tests/m09-careers` — 31 passed
- `npm run test -- tests/routes/route-access.test.ts` — passed
- `npm run test -- tests/seo/route-manifest.test.ts` — passed
- `npm run lint` — passed (0 errors)
- `npm run test` — 317 passed (50 files)
- `npm run build` — passed (`/careers/positions` listed)
- `npx playwright test tests/e2e/m09-careers-positions.spec.ts --project=chromium` — passed

## Visual review

- Localhost: `http://localhost:3000/careers/positions`
- Viewport: `1440 × 900`
- Screenshot: `test-results/m09-careers-positions-1440-review.png` (not committed)
