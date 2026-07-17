# M05 The Vault Implementation Notes

## Product decision

The full Vault offer page (Figma `14240:78024`, offer cards / Build Your
Collection) was an earlier UI/UX concept. It is **no longer** the active
approved presentation for `/the-vault`.

## Figma Source (approved)

- Figma file: `92rhH51aErpYQWRrlJqMhn`
- Canonical frame node: `12339:55472`
- Frame name: `Coming soon`
- Frame size: `1440 × 1481`
- Implemented route: `/the-vault` (unchanged URL; not `/coming-soon`)
- Visual region: `12339:55474` (1440 × 772)
- Decorative Oops: `12339:55473`
- Content group: `12379:13365`–`12379:13370`
- Shared navbar/footer references: `14915:40667`, `12339:55478`

The separate manifest route `/coming-soon` remains unimplemented and must not
be activated by this module.

## Section Inventory

1. Shared `MainNavbar` overlaid at the top (~73px)
2. 772px Coming Soon visual region (local Mystique background + overlay)
3. Decorative “Oops” typography (`aria-hidden`)
4. “Unveiling soon” content group (h1 + description + actions)
5. Shared `FooterSection` / `MainFooter` beginning at y ≈ 772

Removed from the runtime over-21 page:

- Breadcrumbs
- Vault offer cards / five-card list
- Offer 01 / ENROLLMENT OPEN / Build Your Collection / VIEW DETAILS
- Deferred Vault hero markers and Verde Classico offer imagery

## Copy

- Decorative: `Oops`
- Title: `Unveiling` / subtitle: `soon`
- Description: `We're creating an experience worthy of the Velarro name. Thank you for your patience while we prepare its arrival.`
- Actions: `HOMEPAGE` (link to `/`), `PRODUCTS` (deferred, no href)

## Assets

- Exact Figma Mystique raster downloaded from node `12339:55472` design context
- Stored locally as:
  `public/images/m05-vault/the-vault-coming-soon-background.jpg`
- Content-Type at download: `image/jpeg`
- Natural dimensions: `640 × 800`
- Module constant: `THE_VAULT_COMING_SOON_BACKGROUND`
- No temporary `figma.com/api/mcp/asset` URL in source
- Local path is not passed through `assertApprovedImageUrl`

## Route Visibility

- `/the-vault` remains age-gated and noindex
- unknown → AgeGate
- under21 → Under21HomeShell
- over21 → Coming Soon page
- Route-manifest `/the-vault` `figmaNodeId` corrected to `12339:55472`
- All other `/the-vault` manifest fields preserved
- `/coming-soon` manifest entry unchanged (`implemented: false`)

## Metadata

- title: `The Vault`
- path: `/the-vault`
- indexable: false
- description updated to reflect Coming Soon / unveiling copy

## Known differences

- Gotham and OneSignature remain unavailable (fallback fonts)
- Shared MainFooter is locked; production height may exceed Figma ≈697
- Responsive layouts are engineering-derived (no mobile/tablet Figma frames)
- Decorative Oops oversized type is clipped only inside the 772px visual region
- Do not claim pixel-perfect fidelity
