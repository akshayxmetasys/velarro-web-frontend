# Velarro — Full Prototype Build Plan (Merged Scope)

Status: **PLANNING APPROVED SOURCE OF TRUTH — AWAITING `START VELARRO IMPLEMENTATION`**

Generated: 2026-07-07. Supersedes the sequencing in [master-plan.md](master-plan.md) by extending it with the page-119 scope (age gate, under-21 experience, non-cigar catalog). Companion docs: [prototype-inventory.md](prototype-inventory.md) (per-screen detail) and [prototype-route-map.json](prototype-route-map.json) (canonical routes).

## Global gates (block all modules)

1. **`START VELARRO IMPLEMENTATION`** — no production UI code before the user sends this exact phrase. One module per implementation run (`AGENTS.md`).
2. **Gotham webfonts** — swap only via `--font-family-primary`; approved Arial/Helvetica fallback until procured (U-05/U-16). Never fabricate font files.
3. **Imagery** — every image slot ships as a fixed-dimension placeholder; server URLs pasted later. No invented images or product data.
4. **Out of scope permanently for this plan**: backend, real auth, database, payment/checkout processing, order APIs. All flows are UI-only with typed fixtures.
5. **Hard rules**: no `dangerouslySetInnerHTML`; no new packages without approval; tokens-only styling (`app/globals.css` ← `docs/figma/design-tokens.json`); reusable components + data maps instead of repeated JSX; WCAG 2.2 AA; desktop 1440 fidelity with engineering-derived tablet(768)/mobile(390) pending UI/UX review per module.

## Cross-cutting foundations (M00 addendum — do first after gate lifts)

M00 is implemented and in review. Before M01 begins, extend it with:

- **Age-state provider** (client): `over21 | under21 | unknown`; swaps `SiteHeader`/`SiteFooter` variants (`MAIN NAVBAR UNDER 21` `15006:36650`, `MAIN FOOTER/Footer - under 21`) and drives cigar-content visibility flags from the route map. Mechanism (cookie vs storage) is engineering-defined — label as assumption in code comments.
- **Placeholder image component**: fixed dimensions, slot-name annotation, `--color-background-card` fill; used by every image slot.
- **Catalog data layer scaffolding**: `lib/catalog/` typed `Product` model + per-category maps (names/slugs/node IDs already enumerated in the route map; copy/prices filled per module from Figma only).
- **Structured-data helpers**: typed JSON-LD builders (`Organization`, `BreadcrumbList`, `Product`, `Article`, `FAQPage`) rendered via `<script type="application/ld+json">` with serialized literals from typed objects (no arbitrary HTML).
- **M00 review debt (repository verified)**: commit `26b3f09` reworked `lib/a11y/use-overlay-focus-lock.ts` and currently has a TS error (`'container' is possibly 'null'`, cleanup scope) and drops `inert` background isolation, body scroll lock, and `closeOnEscape` — `Drawer`/`RouteBackedModalShell` and their tests depend on the hook. Resolve before any overlay-bearing module (M02+).

## Module sequence

Order is dependency-driven; M06/M07 land last because they consume catalog, auth, and overlay foundations.

| # | Module | Depends on | Routes (canonical) | Key page-119 nodes |
| --- | --- | --- | --- | --- |
| 0 | M00-foundations (+addendum) | — | layout/globals only | navbar/footer/library sections |
| 1 | M01-home | M00 | `/`, `/age-verification`, `/coming-soon` | `13148:15012`·`14735:62828`·`14735:63837`·`14735:62905` |
| 2 | M02-auth | M01 | `/login`, `/signup`, `/forgot-password`, `/reset-password` | `14735:64027`·`14898:95982`·`14735:64087`·`14735:64135`·`15017:74618` |
| 3 | M03-estate | M01 | `/the-estate{,/the-house,/the-house/the-roastery,/the-humidor,/the-humidor/heritage,/the-humidor/royal-leaf}` | `16599:37822` + page-85 set |
| 4 | M04-house | M01 | `/the-house` hub + 7 listing routes + 7 `[productSlug]` routes (61 PDPs) | `16599:*` catalog section |
| 5 | M05-vault | M01 | `/the-vault` | page-85 `14240:78024` |
| 6 | M08-editorial | M01 | `/the-chronicle{,/international-cigar-day}`, `/pairing-guide{,/find-your-pairing,/rum-and-cigars}` | `14991:73869`·`14991:73917` |
| 7 | M09-engagement | M01 | `/membership`, `/partner`, `/get-in-touch`, `/careers{,/positions,/positions/[jobId],/positions/[jobId]/apply}` | `15694:43984`·`14735:64944`·`14735:64245` |
| 8 | M10-legal-info | M01 | `/our-story`, `/craftsmanship`, `/sustainability`, `/accessibility`, `/press`, `/privacy-policy`, `/terms-of-service`, `/cookie-policy`, `/faq` + global cookie popup | `14735:68716`…`14735:71264` |
| 9 | M06-cart-checkout | M03, M04 | `/cart`, `/cart/buy-again`, `/checkout/{shipping,payment,review}` | `14991:67392`·`15764:46150`·flow iterations |
| 10 | M07-profile | M02 | `/my-profile{,/complete,/addresses,/orders,/orders/[orderId],/wishlist,/settings}` | `14897:*`·`15554:*`·`15739:*` |

## Per-module scope

### M01 — Home & age gate
- Build: over-21 home (canonical `13148:15012`), under-21 home variant (`14735:62828`) rendered by age state on `/`; `/age-verification` gate; `/coming-soon` (page-119 visual `14735:62905`).
- Components: hero section, house section, `h1+h2` eyebrow heading, 3-card rail, knowledge cards; consumes navbar/footer variants from M00 addendum.
- Data maps: home rail contents typed from Figma copy only.
- Image slots: heroes, house backdrop, knowledge cards, rails, coming-soon backdrop.
- Deferred: `home login` nav state until M02 exists (then a chrome state, not a page).
- Tests: chrome swap by age state; gate keyboard path; rail overflow at 1440; Playwright: `/` renders both states, gate → home walk (wiring labeled assumption).

### M02 — Auth
- Build: four route-backed modals (page-119 iterations canonical) + full-page login presentation (`15017:74618`); RouteBackedModalShell hosts; OAuth button with `--shadow-button`.
- Gate-in: focus-lock hook debt resolved.
- Tests: trap/ESC/restore focus; link wiring between auth surfaces (assumption-labeled); noindex metadata.

### M03 — The Estate
- Build: estate hub, house/roastery tabs (2/3/6 TABS components), humidor listing, heritage marketing page, royal-leaf PDP (uses M04 PDP template if sequenced after M04 kickoff; otherwise ships template).
- Open: tab-switch interaction (U-13); under-21 hides estate routes (product decision logged).
- Tests: tabs keyboard; listing grid; breadcrumb schema.

### M04 — The House & catalog (largest)
- Build: hub (+under-21 landing variant), 7 listing routes with filter sidebar/pagination/view variants, **one PDP template** + 7 typed data maps covering 61 page-119 PDPs (+1 apothecary page-85 PDP), size-chart overlay, CATEGORY non-cigar nav.
- Copy/prices extracted per frame via `get_design_context` during this module; anomalies (`estate chinio`, t-hub `estate espresso`) kept verbatim + flagged.
- Suggested internal slicing (still one module, several runs if needed): (a) listings + template + cabinet/roastery, (b) t-hub/saddlery, (c) clothier collections + size chart.
- Tests: every slug renders via `generateStaticParams`; data-map completeness check equals route-map product lists; filters/pagination/view toggle; `Product` JSON-LD emitted.

### M05 — The Vault
- Build: `/the-vault` from page-85 frame; under-21 visibility decision pending (default hidden per route map).

### M08 — Editorial
- Build: chronicle index + article (page-119 canonical), pairing guide trio (page-85 only). Quiz result routing unresolved — implement UI, defer routing behind flagged stub.

### M09 — Engagement
- Build: membership (PRICING CARDS), partner (+submitted state), get-in-touch (+submission overlay `15739:43395`), careers set with `[jobId]` data map, newsletter overlay (`15684:17973`) wired to footer.
- Forms: client-side validation only; success overlays in-page.

### M10 — Legal & info
- Build: nine static/legal routes (page-119 iterations canonical — copy re-extracted verbatim per frame), FAQ accordion (+`FAQPage` schema, 1440 despite 1459 frames), global cookie consent popup (`14735:69333`) gating non-essential storage.

### M06 — Cart & checkout (UI only)
- Build: cart (+empty state), `/cart/buy-again` list/grid, three checkout steps from the page-119 iterations (three product flows = one template + cart fixtures), overlays: order-placed, OTP, create-password, welcome, QR.
- Progress indicator from repo `ProgressIndicator`; checkout state is a typed client store; **no processing**.
- Tests: full e2e step walk; overlay traps; empty cart; buy-again toggle.

### M07 — Profile & account
- Build: seven profile routes (page-119 iterations canonical) + sidebar shell; overlay suite: edit profile, sign-out, wishlist delete, address add/edit, deactivation (4 steps + 90-day) and deletion (6 frames vs "of 5" copy — implement frames verbatim, U-14 flagged), confirmed/cancelled result overlays, order cancellation, see-all-updates, chatbot (trigger unresolved — defer behind flag).
- Fixtures only (e.g. `doe234@gmail.com`); destructive flows UI-only.
- Tests: settings toggles; every step modal keyboard-walkable; empty states.

## Open decisions / risk register

| # | Item | Owner | Blocking |
| --- | --- | --- | --- |
| 1 | Apothecary vs T-hub IA | Product | M04 t-hub/apothecary routes |
| 2 | Under-21 visibility: estate, vault, cigar editorial, cabinet accessories, cigar PDP indexability | Product/Legal | M03/M05/M08 flags (defaults chosen in route map) |
| 3 | Deletion step count (U-14) + post-deletion exit (U-15) | Product | M07 final acceptance |
| 4 | Quiz result routing; chatbot/profile-completed/see-updates triggers | Design | M08/M07 flagged stubs |
| 5 | Focus-lock hook regression (commit `26b3f09`) | Engineering | M02+ overlays |
| 6 | Gotham files, logo/favicon, photography (U-16) | Procurement | Final visual fidelity only |
| 7 | Prototype wiring unverifiable via MCP | Design QA | Per-module QA of assumption-labeled navigation |

## Definition of done (every module)

1. Desktop 1440 fidelity vs canonical (page-119 where present) frames; screenshots where mapped.
2. Tokens-only styling; no hardcoded values; single-line utility labels.
3. WCAG 2.2 AA checks pass (keyboard, focus, names, contrast, reduced motion).
4. Assumption-labeled interactions implemented or explicitly deferred with flag + registry entry here.
5. `npm run lint`, `npm run build`, `npm run test` clean; module Playwright specs green at 1440.
6. UI/UX responsive review recorded before final acceptance.
