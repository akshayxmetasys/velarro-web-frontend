# M05 The Vault Implementation Notes

## Figma Source

- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Figma page: `Velarro Wireframes`
- Frame node: `14240:78024`
- Frame name: `home/the vault`
- Frame size: `1440 x 3900`
- Implemented route: `/the-vault`
- Vault offer card node: `14581:35996`
- Main menu sidebar component set node: `14351:51939`
- Main menu sidebar active Vault variant node: `14351:51937`

## Section Inventory

- Shared main navbar.
- Deferred hero image surface with the Figma hero title and body copy.
- Breadcrumb: `Home | The Vault`.
- Offers section: `RARE OPPORTUNITIES` / `Distinguished Selections`.
- Five repeated offer cards with alternating image/text layout.
- Shared main menu sidebar from Figma, opened from the existing navbar hamburger.
- Shared M01 footer.

## Copy Implemented

- Hero title: `THE VAULT`
- Hero body: `Discover curated collections, limited releases, and exclusive opportunities crafted for those who appreciate exceptional cigars and timeless craftsmanship.`
- Section eyebrow: `RARE OPPORTUNITIES`
- Section title: `Distinguished Selections`
- Offer eyebrow/status/date: `Offer 01`, `ENROLLMENT OPEN`, `February 27`
- Offer title: `Build Your Collection`
- Offer body: `Experience preferred pricing when selecting multiple boxes from the Velarro Collection. Designed for collectors and enthusiasts seeking to explore a broader range of Velarro's finest selections.`
- Benefits: `Preferred collection pricing`, `Premium presentation`, `Priority fulfillment`
- Deferred offer control: `VIEW DETAILS`
- Sidebar links: `Estate Index`, `The House`, `The Vault`, `Careers`, `News & Events`, `Pairing Guide`, `Membership`, `Get in touch`

## Assets

- Approved offer/product image URL:
  `https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/verde-classico-cigar-product-main-20260709-014847-product-main.webp`
- The approved offer/product image is reused for all repeated Vault offer cards.
- No temporary Figma URLs are used.
- No local M05 image files were added.

## Deferred Hero

- The final Vault hero image is deferred by Vishnu approval.
- The runtime hero does not render a real image asset.
- The hero placeholder is marked with:
  - `data-image-status="deferred"`
  - `data-vault-hero="deferred"`
- The final hero image should be replaced later only after Vishnu provides an approved production Supabase URL.

## Route Visibility

- `/the-vault` is over-21 restricted.
- Unknown visitors see the existing age gate.
- Under-21 visitors see the existing restricted under-21 shell and do not see Vault content.
- Over-21 visitors see The Vault page.
- Route manifest marks `/the-vault` as implemented, public, noindex, and `age-gated`.

## Final Remediation

- Removed hover transform and hover shadow animation classes from the M05 Vault offer cards only.
- Implemented the shared main navbar sidebar using the confirmed Figma active Vault sidebar variant.
- The navbar hamburger now opens a `220px` sidebar with the Figma menu labels and The Vault active state.
- The Vault is reachable from the sidebar at `/the-vault`.
- Sidebar route map:
  - `Estate Index` -> `/the-estate`
  - `The House` -> `/the-estate/the-house`
  - `The Vault` -> `/the-vault`
  - `Careers` -> `/careers`
  - `News & Events` -> `/the-chronicle`
  - `Pairing Guide` -> `/pairing-guide`
  - `Membership` -> `/membership`
  - `Get in touch` -> `/get-in-touch`
- Deferred sidebar destinations remain route links only; no page content, backend behavior, ecommerce behavior, or fake workflows were added.
- No Vault layout rewrite was done beyond removing the forbidden card hover animation classes.
- Homepage, Our Story, Estate, and House visual sections were not modified.

## Visual Fidelity Remediation

- Completed the `/the-vault` typography audit against confirmed Figma node `14240:78024`.
- Figma connector calls for the full Vault frame timed out with HTTP 504 during this pass, so the remediation used Vishnu's provided extracted node specs for `14240:78024` plus the existing Velarro typography tokens in `app/globals.css`.
- Gotham files are absent from the repo. No font files were fabricated or added.
- The page still uses the approved M00 fallback path: `--font-family-primary: Arial, Helvetica, sans-serif`, with the component wired through Velarro token variables so Gotham can replace the fallback centrally later.
- Hero title now uses the display-light token at desktop `72px`, weight `300`, uppercase, line-height `100%`, white.
- Hero body now uses the body-default token at `20px`, weight `300`, `28px` line-height, white.
- Breadcrumb typography was adjusted to `14px`, with `Home` at weight `300` and current label at weight `400`.
- Section eyebrow/title now use the `20px` section-small and `32px` section heading tokens.
- Offer cards now use the requested scale:
  - offer label: `24px`, weight `400`
  - status: `16px`, weight `400`, uppercase
  - card title: `30px`, weight `500`
  - date/body/benefits: body-default `20px`, weight `300`, `28px` line-height
  - button text: `16px`, weight `400`, uppercase
- VIEW DETAILS buttons remain corrected to `VIEW DETAILS`; Figma's `VIEW DETTAILS` typo was not copied.
- VIEW DETAILS buttons now sit inside the text/content column in normal document flow directly below the Benefits list.
- Button width is constrained to the Figma text/content column on desktop and does not stretch across the full card.
- Offer cards retain alternating image/text order, the Verde Classico image, card count, copy, and age-gate behavior.
- No hover animation was added.

## Card Width Remediation

- Completed the Vault offer card desktop-width fix against confirmed Figma card node `14581:35996`.
- Final desktop card/grid max width: `1314px`.
- The offer section now keeps page gutters outside the card-width constraint, and the inner offer grid is centered with `max-w-[1314px]`.
- This avoids the prior issue where `px-[24px]` lived inside the `max-w-[1314px]` container and reduced actual card width to about `1266px`.
- Final desktop card decisions:
  - width: full width of the centered `1314px` grid
  - padding: `24px`
  - gap: `80px`
  - border: `1.5px solid #d8c9b4`
  - radius: `12px`
  - background: `#f6f2eb`
- Final desktop image sizing:
  - image region: `390px` wide by `398px` high
  - image content: `390px x 390px`
- Final desktop text/content column sizing:
  - outer content column: `796px`
  - button remains inside the text/content column and uses column width, not full card width.
- Desktop row layout begins at the project `desktop` breakpoint so smaller viewports keep a column fallback and avoid horizontal overflow.
- The Vault hero image remains deferred.
- No hover animation was added.

## Known Mismatches

- Final Vault hero photography is deferred.
- Offer detail, enrollment, backend, ecommerce, cart, checkout, and product detail behavior are deferred.
- Responsive behavior is engineering-derived because the Figma source is desktop-only.
- Sidebar close behavior uses the existing Velarro overlay focus-lock pattern for Escape/focus restoration.
- Exact Gotham rendering remains unavailable until licensed Gotham webfont files are provided.

## Validation Results

- `npm run lint`: passed.
- `npm run test`: passed, 39 files / 204 tests.
- `npm run build`: passed; Next route output includes `/the-vault`.
- `npm run test:e2e -- --list`: passed; 2 Playwright tests listed.
- `npm run dev`: an existing Next dev server was already running for this repo on port `3000`; verified `http://localhost:3000/the-vault` returns HTTP 200.
