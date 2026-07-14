# M09 Get in Touch — Implementation Notes

## Figma nodes

| Area | Node ID |
| --- | --- |
| Full page | `14644:34661` |
| Hero | `14644:34673` |
| Hero image layer | `14644:34674` |
| Hero overlay | `14644:34675` |
| Hero content | `14644:34676` |
| Intro section | `14644:34681` |
| Main contact section | `14644:34684` |
| Contact form card | `14644:34685` |
| Form screen | `15663:38072` |
| Contact-information column | `14644:34724` |
| Primary location section | `14644:34757` |
| Map region | `14644:34761` |
| Submitted state | `15663:38140` |

## Approved hero asset

- Slot: `get_in_touch_hero`
- URL: `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/get-in-touch-hero-20260709-024211-desktop-hero.webp`
- Figma raw image layer: `1452 × 1162` with `-309px` top offset — **not copied into runtime CSS**

### Measured runtime asset

- `naturalWidth`: `3840`
- `naturalHeight`: `2160`
- Aspect ratio: `1.77778` (`16:9`)
- Figma hero frame ratio: `2.19847` (`1440 / 655`)

### Classification

Despite the `desktop-hero` filename, measured dimensions differ significantly from the `1440 × 655` frame ratio. The asset is treated as a **raw source image** rendered with **one** approved image, wrapper `width: 100%`, desktop height `655px`, image `width/height: 100%`, `object-fit: cover`, `object-position: 50% 50%`.

### Final hero CSS

- No `transform`
- No `scale`
- No negative `top` / `left`
- No `1452px`, `1162px`, or `-309px` values
- CSS divider under title instead of temporary Figma divider asset
- Dark overlay recreated with CSS gradient only

### Visible hero landmarks targeted at `1440px`

- Coffee cup and saucer on the left
- Lamp base toward upper-left
- Dark cigar case on the right
- Metal clasp in upper-right quadrant
- Ashtray across lower center
- Tobacco leaves near lower-right
- Centered title and body copy

## Form field inventory (`15663:38072`)

| Label | Control | Required | Placeholder |
| --- | --- | --- | --- |
| Name | `input[type=text]` | yes | `JOHN DOE` |
| Email address | `input[type=email]` | yes | `example@gmail.com` |
| Phone number | `input[type=tel]` | yes | `000 0000 000` |
| Subject | `input[type=text]` | yes | `Select` |
| Message | `textarea` | yes | `How can we help you?` |

Figma renders Subject inside the shared `Text Field` component with placeholder `Select`. Closed dropdown options were not exposed by Figma MCP, so the implementation uses a semantic text input rather than inventing select options.

## Validation behavior

- Required field validation for all five fields
- Email format validation
- Accessible inline errors with `aria-describedby`
- Focus moves to first invalid field
- `aria-live` status region for form and submitted states
- `preventDefault()` on submit
- No `fetch`, server actions, cookies, storage, URL params, or console logging of values
- Sensitive values cleared after valid UI-only submission

## UI-only submitted state (`15663:38140`)

- Visual hierarchy preserved: success icon, `Thank you!`, body copy, footer strip
- Figma typo corrected: `inquery` → `inquiry` concept reflected in UI-only copy
- Copy adapted so it does not imply email delivery, storage, or staff receipt
- Keyboard-accessible `BACK TO FORM` control returns to the form

## Contact information

- `Contact Information`
- Visible email copy: `info@velarroestate.com` (text only; no `mailto` — destination not previously approved in repo)
- `FOLLOW VELARRO`, `Stay Connected`, supporting copy
- Instagram / Facebook / LinkedIn rendered as deferred disabled controls
- `FIND A STORE NEAR YOU` rendered as deferred disabled control

## Deferred map

- Slot: `get_in_touch_map`
- Status: `deferred`
- Region preserved at approximately `1280 × 550`, centered, responsive, no iframe/scripts/tiles/fake photography

## Navigation

- Main menu `Get in touch` → `/get-in-touch`, `implemented: true`
- Footer `Contact Us` → `/get-in-touch`
- Shared footer classes and structure preserved

## Route policy

- `/get-in-touch` remains `review` / `public`
- Not age-gated
- Visible to `unknown`, `under21`, and `over21`

## Validation results

Recorded after implementation in this branch:

- `npm run lint` — pass (no errors)
- `npm run test` — pass (`278` tests)
- `npm run build` — pass (`/get-in-touch` route generated)
- `npm run test:e2e -- --list` — pass (`m09-get-in-touch.spec.ts` listed)
- `npx playwright test tests/e2e/m09-get-in-touch.spec.ts` — pass at `1440 × 900`

## Known differences / open assumptions

- Subject field uses Figma `Text Field` semantics because enumerated dropdown options were not exposed in MCP extraction.
- Hero asset ratio differs from frame ratio; focal crop may need Vishnu approval at exactly `1440px`.
- Map, social URLs, store locator, and backend submission remain deferred by scope.

## Localhost review

- Primary URL: `http://localhost:3000/get-in-touch` (existing dev instance during e2e)
- Alternate dev instance from this session: `http://localhost:3001/get-in-touch`
- Viewport: `1440 × 900`
- Temporary screenshot: `test-results/m09-get-in-touch-1440-review.png` (not committed)
