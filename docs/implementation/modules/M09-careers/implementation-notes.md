# M09 Careers Implementation Notes

Status: implemented for visual review

Route: `/careers`

Figma full frame: `13148:15771`

Figma hero node: `13148:15775`

## Implemented

- Standalone Careers landing page with shared Velarro navbar, sidebar, and footer.
- Review/public route policy preserved: `/careers` is public, noindex, implemented, and audience `review`.
- Hero, breadcrumb, Careers at Velarro value cards, Working at Velarro, Find Your Place jobs, testimonial, and final CTA sections.
- Careers sidebar link now points to `/careers` and is marked implemented.

## Approved Images

Vishnu approved the production Careers hero image:

- `careers_hero`: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/carrer-horo-20260709-034631-desktop-hero.webp`

Figma hero dimensions:

- frame width `1440px`
- frame height `655px`

Figma source image transform from hero node `13148:15775`:

- width `113.75%`
- height `160.46%`
- top `-0.04%`
- left `0`

Production asset inspection:

- browser-reported natural width `1440px`
- browser-reported natural height `810px`
- production asset aspect ratio `1.7778`
- target hero aspect ratio `2.1985`
- classified as an already-cropped desktop hero export, not the raw uncropped Figma source image

Final focused hero crop implementation:

- The approved Supabase image has a different intrinsic crop from the temporary Figma MCP asset.
- Applying the Figma temporary-asset transform directly rendered the approved image at `1638px x 1051px` in a `1440px x 655px` hero, which over-zoomed the worker and cropped the hands/table.
- The previous centered `object-fit: cover` production export crop remained too zoomed against Vishnu's latest localhost screenshot.
- Rechecked the Figma hero frame `13148:15771` and hero image node `13148:15775`, then tested explicit image-layer candidates against the approved Supabase asset.
- Kept one explicit absolute image layer with `width: 100%`, `height: 100%`, `top: 0`, `left: 0`, `max-width: none`, `object-fit: fill`, and `object-position: 50% 50%`.
- Added the media-layer marker `data-figma-crop="careers-hero-final-13148-15771"`.
- The `146%` image-height candidate from the Figma raw-image transform over-zoomed the approved production export further, so it was not kept.
- The hero overlay is the exact Figma color `rgba(21,20,20,0.5)`.

Visual landmarks used during comparison:

- worker upper torso and apron visible in the upper half
- both sleeves visible
- both hands fully visible near the center-lower composition
- tobacco leaves visible at lower-left and lower-right
- striped rolling table visible across the bottom
- title and body copy centered over the hands/apron composition

Localhost visual check:

- Checked `/careers` at `1440px` wide with a `900px` high browser viewport.
- Confirmed the hero height remained `655px`.
- Confirmed the approved production hero image loaded with `naturalWidth > 0`, no CSS transform, `object-fit: fill`, and a single hero image layer.
- Captured temporary comparison screenshots under `test-results/`.
- Confirmed the explicit fill crop shows more lower work surface and hand context than centered cover while preserving the navbar, overlay, title, subtitle, and breadcrumb placements.

## Deferred Images

Vishnu approved proceeding while the remaining route-specific Careers images stay deferred until UI/UX provides approved production assets:

- `careers_value_card_1`
- `careers_value_card_2`
- `careers_value_card_3`
- `careers_working_at_velarro`

Each image region renders a neutral Figma-matched placeholder surface and is marked with:

- `data-careers-image-status="deferred"`
- `data-deferred-image-key="[image_key]"`

No temporary Figma MCP asset URLs, local M09 images, random placeholders, Unsplash images, CSP changes, Next image config changes, or approved host config changes were added.

Known mismatch: the approved Supabase hero approximates the Figma crop because it is an already-cropped production export, and the value-card images plus the Working at Velarro image will be replaced later when UI/UX provides approved Supabase URLs.

## Deferred Interactions

- `LEARN MORE` is a disabled deferred control because no destination is approved in this scope.
- `VIEW ALL POSITIONS` is disabled because nested `/careers/positions` is not approved in this scope.
- `JOIN OUR TEAM` is disabled because job application flow is not approved in this scope.
- No backend form submission, fake API, dynamic job backend, job detail, apply page, membership page, partner page, get-in-touch page, or press overlay was implemented.

## Policy

- `lib/seo/route-manifest.ts` marks `/careers` as `implemented: true`, `public: true`, `indexable: false`, and `audience: "review"`.
- `lib/age/route-access.ts` already classifies `/careers` as a review route for unknown and under-21 visitors, while over-21 visitors are allowed by the global policy. No route-access code change was needed.

## Future Image-Led Hero Workflow

For every future Figma image-led hero:

1. Read the exact hero node, not only the full page.
2. Classify the approved production asset as a raw source image or an already-cropped production export.
3. Inspect and record the production asset natural dimensions and aspect ratio.
4. Record the hero frame width and height.
5. Record Figma image width, height, top, and left transform as source evidence, not automatic production CSS.
6. Record visible subject landmarks.
7. For already-cropped production exports, test whether `cover` over-zooms; use explicit image-layer sizing such as `100%` width/height and `object-fit: fill` only when it better matches the approved visual crop.
8. Use explicit Figma transforms only when the runtime image is confirmed to be the same raw source file used by Figma.
9. Capture localhost at the Figma desktop width.
10. Compare before asking Vishnu for approval.
11. Do not call the hero complete until the Figma composition is visually verified.

## Validation

- `npm.cmd run lint`: passed
- `npm.cmd run test`: passed, 42 test files and 246 tests
- `npm.cmd run build`: passed
- `npm.cmd run test:e2e -- --list`: passed, 3 Playwright tests listed
