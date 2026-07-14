# M09 Partner Implementation Notes

Status: implemented for visual review

Route: `/partner`

Figma full frame: `14670:42180`

Submitted-state frame: `15640:24481`

## Implemented

- Public review Partner page with shared Velarro `MainNavbar` and approved shared footer.
- Main desktop layout from Figma: centered `1279px x 885px` container, `638px x 885px` left image slot, `564px` form column, `32px` column gap, `30px` container radius, `31px` image radius, and `36px` right padding.
- Breadcrumb `Home | Partner` with `Home` linking to `/`.
- Top navbar `Partner` item is now a real Next.js link to `/partner`; navbar dimensions, logo, menu button, search, cart, and login controls were otherwise preserved.
- Route manifest marks `/partner` as implemented, public, noindex, and audience `review`.

## Figma Extraction

Extracted nodes:

- Full page: `14670:42180`
- Submitted state: `15640:24481`
- Main content container: `14670:42189`
- Image panel: `14670:42191`
- Form column: `14670:42192`
- Form screen: `15640:27178`

Desktop inventory at `1440px`:

- Page frame: `1440px x 1806px`
- Main content starts at about `139px` from page top
- Main container: `1279px x 885px`
- Image panel: `638px x 885px`
- Form column: `564px`
- Form panel target: `564px x 669px`
- Submit button: `500px x 43px`

## Deferred Asset

Vishnu approved proceeding without the final Partner image.

Centralized slot:

- `partner_main_image`
- Status: `deferred`
- URL: `null`
- Figma node: `14670:42191`
- Reason: awaiting final UI/UX production asset

The runtime renders a decorative neutral/dark-brown deferred surface with:

- `data-asset-status="deferred"`
- `data-asset-slot="partner_main_image"`
- no visible placeholder label
- no `<img>` element
- no temporary Figma URL
- no local M09 image file
- no substitute stock, generated, screenshot, random, or unrelated product image

Replacement later should require updating `components/m09-partner/partner-assets.ts` from the deferred slot to an approved production URL, then updating the focused Partner asset tests and crop documentation.

## Form

The Figma form rendered fake controls as nested button/div structures. Production uses semantic controls:

- `Email Address`, `type="email"`, required
- `Full name`, `type="text"`, required
- `Phone number`, `type="tel"`, required
- `Business name`, `type="text"`, required
- `Country`, `type="text"`, required
- `Your message`, `textarea`, required

Corrected Figma typo:

- Figma copy: `Emaill Address`
- Runtime copy: `Email Address`

Frontend validation behavior:

- Prevents default browser submission.
- Validates required fields.
- Validates email format.
- Shows inline errors with `aria-describedby`.
- Moves focus to the first invalid field.
- Uses `aria-live` for form state.

## Submitted State

The submitted state is UI-only and pending backend integration.

- No network request is sent.
- No cookies, localStorage, sessionStorage, database, analytics, or console logging are used for form values.
- Sensitive form values are cleared before showing the submitted state.
- Submitted-state visual copy follows Figma node `15640:24481`, including the static application ID and date shown in the design.

Known limitation: The submitted state copy says a confirmation email was sent because that is visible in Figma, but the implementation does not send email or create a backend record. This is documented as a frontend-only visual state until backend integration is approved.

## Route Policy

- `/partner` remains review/public and noindex.
- Unknown visitors can view it as a review route.
- Under-21 visitors can view it as a review route.
- Over-21 visitors are allowed.
- `/partner` was not added to unknown-gated or under-21-blocked route prefixes.

## Responsive Behavior

- Desktop `1440px` matches the primary Figma frame.
- Below desktop, the image slot and form stack vertically.
- The form and submit button become full-width within the available container.
- The deferred image keeps its `638 / 885` aspect ratio and rounded treatment.
- Horizontal overflow is prevented.

## Not Implemented

- `/membership`
- `/get-in-touch`
- `/press`
- additional Careers routes
- M08 nested routes
- backend form submission
- email delivery
- CRM integration
- database storage
- analytics
- file uploads
- CAPTCHA
- authentication
- real partner onboarding
- external APIs

## Validation

- `npm.cmd run lint`: passed
- `npm.cmd run test`: passed, 44 test files and 260 tests
- `npm.cmd run build`: passed
- `npm.cmd run test:e2e -- --list`: passed, 4 Playwright tests listed
- Focused local geometry check: `npm.cmd run test:e2e -- tests/e2e/m09-partner.spec.ts` passed

Local `1440px` geometry verification:

- Navbar: `1440px x 74px`
- Breadcrumb: `1440px x 29px`, top `86px`
- Main container: `1279px x 885px`, x `81px`, top `139px`
- Deferred image panel: `638px x 885px`
- Form column: `564px` wide
- Submit button: `500px x 43px`
- Footer starts at y `1104px`
- Document scroll width equals viewport width: `1440px`
- Partner navbar link resolves to `/partner`
- Deferred image panel contains zero images
- No temporary Figma asset URL appears in the runtime HTML
