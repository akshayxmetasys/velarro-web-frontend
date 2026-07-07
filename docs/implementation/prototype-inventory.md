# Velarro — Full Prototype Inventory (Merged Scope)

Status: **PLANNING — NO PRODUCTION CODE** (implementation gated behind `START VELARRO IMPLEMENTATION`)

Generated: 2026-07-07 · Figma file `92rhH51aErpYQWRrlJqMhn` ("Velarro")

## Sources

| Source | Page / node | Coverage |
| --- | --- | --- |
| Over-21 wireframes | Page `85:10` "Velarro Wireframes", section "Over 21" (`14366:82579`) | 116 frames — previously inventoried in [docs/figma/screen-manifest.json](../figma/screen-manifest.json); merged here by reference |
| Under-21 + catalog prototype | Page `119:26710` (link: `node-id=14735-62828`, starting point `14735:63837`) | Section "Under 21" (`14735:62827`) + section "non cigar catalog" (`16599:38119`) + component library sections — enumerated 2026-07-07 via Figma MCP `get_metadata` |
| Prototype interactions | Prototype player links | **Not exposed by Figma MCP tools.** All navigation wiring below is labeled per `AGENTS.md`: "Figma verified" only when the triggering element visibly exists; wiring itself is "Assumption requiring confirmation" |

Verification labels used: `Figma verified` · `Metadata verified` (name/id/size/position from metadata XML) · `Repository verified` · `Assumption requiring confirmation`.

Reachability note: the Figma prototype player only reaches frames on its own page. The provided link therefore covers page `119:26710`; page `85:10` screens are merged from the existing manifest because the two pages are parallel iterations of one product (merged scope approved 2026-07-07).

## Totals

| Category | Page 85:10 | Page 119:26710 |
| --- | ---: | ---: |
| Confirmed page screens | 53 | ~75 (incl. 61 PDPs, 9 category listings) |
| Modals / overlays | 33 | ~30 |
| Interaction states / duplicates | 30 | ~12 |
| Component / library sheets | 0 (separate sections) | ~45 |
| Excluded (design-system / TAIRC / annotation) | 0 | ~15 |

## Global policies (apply to every module below)

### Image placeholder policy (hard rule)
- No image URLs are invented. Every image slot renders a neutral placeholder bound to `--color-background-card` with the slot name + fixed Figma dimensions, so server URLs can be pasted later without layout shift.
- Slot naming: `<module>/<route>/<slot>` (e.g. `m01/home/hero-primary`). Known slot types: hero backgrounds, product gallery (primary + thumbnails), category card imagery, editorial teasers, footer brand mark, QR code, OAuth icons, coming-soon backdrop (`Mystique ___ #photography…` rounded-rectangle, `1440×772`).
- All placeholders carry explicit `width`/`height` (CLS protection) and empty-string-safe `alt` handling.

### Typography & tokens
- All styling binds to `app/globals.css` variables sourced from [docs/figma/design-tokens.json](../figma/design-tokens.json). Gotham is the verified family; interim fallback stays behind `--font-family-primary` (U-05). No hardcoded hex values, no ad-hoc px spacing; radii from `--radius-md`/`--radius-none` only.
- Single-line rule: sidebar/utility/marquee link labels must not wrap (whitespace-nowrap + track spacing per tokens).

### Responsive
- Figma is desktop-only at 1440px (FAQ frame `14735:71264` is 1459px — layout anomaly, implement at 1440). Tablet 768 / mobile 390 are engineering-defined (`Assumption requiring confirmation`, U-10); UI/UX review gate per module.

### SEO / AEO / GEO / SXO / AIO defaults by page type
| Page type | Index | Structured data | Notes |
| --- | --- | --- | --- |
| marketing / category / listing | yes | `Organization`, `BreadcrumbList`, `ItemList` | Metadata API per route; canonical; OG/Twitter; descriptive H1 from Figma-verified copy |
| product detail | yes | `Product` + `Offer` + `BreadcrumbList` | Prices/copy only from Figma; no invented specs; answer-ready summary block (AEO/AIO) from verified copy only |
| editorial | yes | `Article`, `BreadcrumbList` | Author/date only if Figma-verified, else omitted |
| legal/static | yes | `WebPage` | FAQ page adds `FAQPage` schema from verified Q/A copy |
| auth / profile / cart / checkout UI | **noindex, nofollow** | none | Excluded from sitemap |
| error/empty/coming-soon | noindex | none | Correct status codes where applicable |

GEO note: no geo-personalization is shown in Figma — none is planned (assumption avoided). SXO: CWV budgets (image dimensions fixed, no layout shift from font swap — `font-display` handled by `next/font`), descriptive anchors, single H1 per page. AIO/AEO: semantic landmarks + concise verified summaries; never fabricated Q&A.

### Security / privacy / accessibility baseline
- WCAG 2.2 AA (U-08): keyboard paths, visible focus (`:focus-visible` tokens), semantic landmarks, accessible names, contrast via token pairs, `prefers-reduced-motion` honored, focus trap via `lib/a11y` for every overlay, `aria-modal` + labelled dialogs, error text bound to inputs via `aria-describedby`.
- **No `dangerouslySetInnerHTML` anywhere** (hard rule). Legal copy is typed structured data rendered as JSX.
- No real user data: all account/order/address values are Figma-verified sample copy (e.g. `doe234@gmail.com`) rendered from typed fixtures; no analytics/tracking beyond consent-gated stubs; cookie consent overlay before any non-essential storage; forms validate client-side only and never transmit (no backend in scope); OTP/password/payment fields are display-only UI (checkout processing explicitly out of scope); `noindex` on all account/checkout surfaces.

### Test baseline (per module, expanded in module sections)
- Vitest + RTL: render, a11y roles/names, keyboard behavior of module components.
- Playwright at 1440px: route renders, navigation between module routes, overlay open/close + focus return.
- `npm run lint` + `npm run build` clean; no new packages.

---

## M01 — Home, age gate, coming soon

| Frame | Node ID | Page | Route | Type |
| --- | --- | --- | --- | --- |
| home (prototype entry dup, #1) | `15967:43304` | 85:10 | `/` | marketing (duplicate) |
| home (canonical over-21, #2) | `13148:15012` | 85:10 | `/` | marketing |
| home login (state, #3) | `15148:40087` | 85:10 | `/` | interaction state |
| Coming soon (#4) | `12339:55472` | 85:10 | `/coming-soon` | error/empty |
| **age verification** | `14735:63837` | 119 | `/age-verification` | form (gate) — **prototype starting point** |
| **home (under-21 variant)** | `14735:62828` | 119 | `/` (under-21 state) | marketing |
| under 21 (near-dup of above) | `15670:14481` | 119 | `/` (under-21 state) | duplicate |
| Coming soon (under-21) | `14735:62905` | 119 | `/coming-soon` | error/empty (supersedes #4 visual) |
| Coming soon (dup) | `14735:62922` | 119 | `/coming-soon` | duplicate |
| MAIN COMING SOON | `15670:14891` | 119 | `/coming-soon` | duplicate/master |

- Shared components: MAIN NAVBAR / MAIN NAVBAR UNDER 21 (`15006:36650`), main nav, MAIN FOOTER / `MAIN FOOTER/Footer - under 21`, MAIN HERO SECTION (`14991:76612`), MAIN THE HOUSE SECTION (`15518:67223`), HOME SECTION 1/2 rails, MAIN PRODUCT CARD (`14991:76092`), MAIN EXPLORE, homescreen section 3 cards.
- Repeated patterns: `h1+h2` eyebrow-heading block (eyebrow + rule + section title); 3-card rail (`cards sec3`); hero → alternating section rhythm; identical section scaffold reused across home variants.
- Figma-verified copy: `DISCOVER TIMELESS LUXURY`, `Velarro cigars` (over-21 home); `Discover Timeless Luxury`, `Velarro Estate collection`, `Curated for the Exceptional`, `The Clothier`, `Cigar Knowledge`, `Expand your horizons` (section heads); age gate: `Discover Timeless Luxury`, `Velarro cigars & accessories`; coming soon: `Oops`, `Unveiling soon`, `We're creating an experience worthy of the Velarro name. Thank you for your patience while we prepare its arrival.`, `HOMEPAGE`, `PRODUCTS`.
- Assumptions: age-gate pass/fail wiring (over-21 → full home; under-21 → restricted home) — element exists, destinations inferred; under-21 state persistence mechanism engineering-defined; `home login` nav-state trigger.
- Image slots: hero backgrounds (over/under-21), house-section backdrop, 3× knowledge-card images, product-rail imagery, coming-soon backdrop.
- Interactions shown: hero CTA, section "explore" CTAs, product-card hover (`color/background/surface-hover`), navbar menus, footer links, age-gate confirm buttons, coming-soon `HOMEPAGE`/`PRODUCTS` links.
- SEO: `/` and `/coming-soon` per marketing/error defaults; age gate `noindex`.
- Security/a11y: age gate is UI-only (no real verification claim), keyboard-completable, no data stored beyond client state.
- Tests: home renders both chrome states; age-gate keyboard path; rails don't overflow at 1440.

## M02 — Auth

| Frame | Node ID | Page | Route | Type |
| --- | --- | --- | --- | --- |
| sign up (#5) | `14991:70051` | 85:10 | `/signup` (route-backed modal) | auth modal |
| Login (#6) | `14991:70094` | 85:10 | `/login` | auth modal |
| forgot password (#7) | `14991:70134` | 85:10 | `/forgot-password` | auth modal |
| new password (#8) | `14991:70162` | 85:10 | `/reset-password` | auth modal |
| sign up (iteration) | `14898:95982` | 119 | `/signup` | auth modal (supersedes #5) |
| Login (iteration) | `14735:64027` | 119 | `/login` | auth modal (supersedes #6) |
| Forgot Password (iteration) | `14735:64087` | 119 | `/forgot-password` | auth modal (supersedes #7) |
| New Password (iteration) | `14735:64135` | 119 | `/reset-password` | auth modal (supersedes #8) |
| Login (full page) | `15017:74618` | 119 | `/login` (full-page presentation) | auth |

- Shared: RouteBackedModalShell (repo, `components/ui/route-backed-modal-shell.tsx`), Input, Button, OAuth button (shadow token `--shadow-button`), auth modal shadow `--shadow-auth-modal`.
- Patterns: 563×1024 auth panel; OAuth row; inline links between auth surfaces.
- Verified copy: field placeholders `Your name`, `Your email` (tokens doc); frame-level copy extraction deferred to module implementation via `get_design_context`.
- Assumptions: login↔signup↔forgot↔reset link wiring; close-overlay return target; relationship between modal Login and full-page Login (dual presentation via intercepting route — engineering decision).
- Image slots: OAuth provider icon, brand mark.
- Interactions: open from navbar triggers, close, submit (UI-only — no auth backend, hard rule).
- SEO: noindex. Security: password fields `type=password`, no persistence, no real OAuth calls. Tests: focus trap, ESC/close focus return, field labeling.

## M03 — The Estate

| Frame | Node ID | Page | Route | Type |
| --- | --- | --- | --- | --- |
| home/the estate (#13) | `14888:53493` | 85:10 | `/the-estate` | marketing/category |
| home/the estate/the house (#9) | `14670:34051` | 85:10 | `/the-estate/the-house` | category (tab) |
| estate/the house/the roastery (#10) | `15451:39198` | 85:10 | `/the-estate/the-house/the-roastery` | category (tab) |
| home/the estate/the humidor (#11) | `13148:16189` | 85:10 | `/the-estate/the-humidor` | product listing |
| humidor/heritage (#12) | `14670:35568` | 85:10 | `/the-estate/the-humidor/heritage` | marketing |
| humidor/royal leaf (#14) | `14670:37727` | 85:10 | `/the-estate/the-humidor/royal-leaf` | product detail (cigar) |
| home/the estate/the house (iteration) | `16599:37822` | 119 | `/the-estate/the-house` | category (supersedes #9 visual) |

- Shared: MAIN NAVBAR, MAIN BREADCRUMBS (`14991:75137`), 2/3/6 TABS (`14991:76257/76293/76364`), MAIN PRODUCT CARD, PRICING CARDS, The House cards (`14991:75738`).
- Patterns: estate tab band (estate ↔ house ↔ roastery), listing grid + `all filters` sidebar (`14991:75257`).
- Assumptions: tab-switch interaction (open U-13); cigar content hidden entirely for under-21 state (visibility rule inferred from catalog split — flag for product confirmation).
- Image slots: estate hero, tab band imagery, humidor listing product images, royal-leaf gallery.
- SEO: category/PDP defaults; cigar PDPs indexable (age-gating is client UX, not cloaking — flagged for legal review).
- Tests: tabs keyboard-operable; listing grid integrity; breadcrumbs.

## M04 — The House (largest module; includes non-cigar catalog)

Category/listing screens:

| Frame | Node ID | Page | Route | Type |
| --- | --- | --- | --- | --- |
| home/the house (#16, dup #15 `14670:46376`) | `14670:40233` | 85:10 | `/the-house` | category hub |
| the house landing (under-21) | `14735:71136` | 119 | `/the-house` | category hub (under-21 state) |
| home/the house (under-21) | `14735:71191` | 119 | `/the-house` | duplicate/state |
| the roastery (#18) | `14670:39860` | 85:10 | `/the-house/the-roastery` | category |
| roastery/products | `16599:33038` | 119 | `/the-house/the-roastery` | product listing (supersedes) |
| the apothecary (#19) | `14670:39923` | 85:10 | `/the-house/the-apothecary` | category — **relationship to t-hub unresolved** |
| the t-hub/products | `16599:33008` | 119 | `/the-house/the-t-hub` | product listing (**new**) |
| the clothier (#20) | `14670:39985` | 85:10 | `/the-house/the-clothier` | category |
| clothier/the sartorial collection | `16599:32943` | 119 | `/the-house/the-clothier/the-sartorial-collection` | product listing (**new**) |
| clothier/the sartorial collection 2 | `16599:32920` | 119 | same route | listing view variant |
| clothier/the sporting collection | `16599:32976` | 119 | `/the-house/the-clothier/the-sporting-collection` | product listing (**new**) |
| the saddlery (#21) | `14670:40071` | 85:10 | `/the-house/the-saddlery` | category |
| saddlery/products | `16599:32887` | 119 | `/the-house/the-saddlery` | product listing (supersedes) |
| saddlery/products2 | `16599:32859` | 119 | same route | listing view variant |
| the cabinet (#22) | `14670:40152` | 85:10 | `/the-house/the-cabinet` | category |
| cabinet/products | `16599:32828` | 119 | `/the-house/the-cabinet` | product listing (supersedes) |
| cabinet/products2 | `16599:32802` | 119 | same route | listing view variant |

Product detail frames — all 1440-wide PDPs on page 119 section `16599:38119` (plus page-85 PDP predecessors). **Implemented as one PDP template + typed data maps** (`lib/catalog/*`), never 61 JSX copies. Slugs are engineering-derived kebab-case of Figma names (assumption).

Cabinet (`/the-house/the-cabinet/[productSlug]`): estate humidor `16599:38391`, travel humidor `16599:38540`, estate guillotine cutter `16599:38692` (supersedes #25 `15008:37893`), heritage v-cutter `16599:38842`, estate torch lighter `16599:40534`, founder's soft flame lighter `16599:40684`, estate ashtray `16599:40834`, crystal ashtray `16599:40983`, estate cigar case `16599:41132`, estate briar pipe `16599:41282`, churchwarden pipe `16599:41431`, cigar stand `16599:41581`, aficionado starter set `16599:41731`, collector's collection `16599:41879`.

Roastery (`/the-house/the-roastery/[productSlug]`): estate espresso `16599:38140` (supersedes #26 `15008:37073`), heritage medium roast `16599:38265`, Añejo dark roast `16599:38992`, Grand Cru cappuccino blend `16599:39116`, Nicaragua reserve `16599:39238`, founder's barrel-aged coffee `16599:39362`, midnight cold brew `16599:39487`.

T-hub (`/the-house/the-t-hub/[productSlug]`): estate breakfast `16599:39612`, earl grey reserve `16599:39737`, assam heritage `16599:39864`, vanilla rooibos estate `16599:39994`, darjeeling first flush reserve `16599:40121`, estate espresso `16599:40248` (**anomaly: espresso frame filed under t-hub — do not invent tea copy; flagged**), cacao chai reserve `16599:40373`.

Saddlery (`/the-house/the-saddlery/[productSlug]`): estate bifold wallet `16599:42618`, reserve card holder `16599:42799` (supersedes #24 `15008:37483`), executive travel wallet `16599:42977`, heritage weekender `16599:43155`, founder's duffle `16599:43337`, passport holder `16599:43514`, executive briefcase `16599:43694`, leather laptop sleeve `16599:43868`, watch roll `16599:44235`, valet tray `16599:44415`, leather cigar case `16599:44593`, cigar accessory roll `16599:44771`.

Clothier — sporting (`/the-house/the-clothier/the-sporting-collection/[productSlug]`): founder's boxy hoodie `16599:42062` (supersedes #23 `14695:54494` and dup #17 `14670:35095`; old flat route retired), estate weekender jacket `16599:42249`, estate chinio `16599:46431` (**name anomaly, kept verbatim**), estate cap `16599:46618`, heritage dad cap `16599:46794`, estate polo `16599:47519`, heritage quarter zip `16599:47706`, linen camp shirt `16599:47895`, estate oversized t-shirt `16599:48086`.

Clothier — sartorial (`/the-house/the-clothier/the-sartorial-collection/[productSlug]`): signature dress shirt `16599:42433`, heritage oxford shirt `16599:44948`, estate blazer `16599:45136`, Reserve Sport Coat `16599:45320`, tailored trousers `16599:45503` (frame path says "the sartorial" — filed under sartorial collection), merino crewneck `16599:45688`, cashmere quarter-zip `16599:45874`, estate overcoat `16599:46061`, silk tie `16599:46248`, pocket square `16599:46973`, cufflinks `16599:47155`, dress belt `16599:47337`.

Apothecary (page 85 only): wuyi oolong reserve (#27) `15008:36663` → `/the-house/the-apothecary/wuyi-oolong-reserve` pending the apothecary/t-hub resolution.

Overlay: Founder's Hoodie Size Chart `16599:48276` (500×683) — size-chart overlay on clothier PDPs. Unresolved small frame: `16599:48281`.

- Shared: MAIN PRODUCT CARD, MAIN PRODUCT HERO (`14991:77160`), PRICING CARDS, MAIN WISHLIST, ADD TO CART, MOVE TO CART, breadcrumbs, pagination (`14991:76204`), all-filters sidebar, CATEGORY non cigar nav (`16613:85385`), tabs.
- Patterns: PDP = breadcrumb → gallery + purchase panel → description/accordion → related-products rail; listing = filter sidebar + card grid + pagination; `products` vs `products2` = two listing view states of one route.
- Verified copy: every product name above is Figma-verified (frame names + text nodes). Descriptions/prices/spec copy extracted per frame during module implementation — never invented.
- Assumptions: slugs; products/products2 toggle semantics; size-chart trigger; related-products contents.
- Image slots: per PDP — gallery primary + thumbnails; per listing — card images; category heroes.
- Interactions: add to cart, wishlist toggle, size selection (clothier), filters, pagination, view toggle, size-chart overlay.
- SEO: `Product`+`Offer`+`BreadcrumbList` schema from data maps; indexable; canonical per slug.
- Tests: data-map integrity (every slug renders; no 404 in `generateStaticParams`), PDP template render with placeholder gallery, filter/pagination keyboard support, size-chart focus trap.

## M05 — The Vault

| Frame | Node ID | Page | Route | Type |
| --- | --- | --- | --- | --- |
| home/the vault (#28) | `14240:78024` | 85:10 | `/the-vault` | marketing/curated listing |

Page-85 only (no page-119 iteration). Details per manifest; defaults apply; under-21 visibility of vault (cigar-adjacent) flagged for product decision.

## M08 — Editorial

| Frame | Node ID | Page | Route | Type |
| --- | --- | --- | --- | --- |
| the chronicle (#90) | `14284:63187` | 85:10 | `/the-chronicle` | editorial index |
| chronicle (iteration) | `14991:73869` | 119 | `/the-chronicle` | supersedes #90 |
| international cigar day (#92) | `14585:38918` | 85:10 | `/the-chronicle/international-cigar-day` | article |
| intl cigar day (iteration) | `14991:73917` | 119 | same route | supersedes #92 |
| pairing guide (#91) | `14406:85066` | 85:10 | `/pairing-guide` | editorial |
| find your pairing (#93) | `14406:85132` | 85:10 | `/pairing-guide/find-your-pairing` | form/quiz |
| rum and cigars (#94) | `14644:32880` | 85:10 | `/pairing-guide/rum-and-cigars` | article |

- Shared: PAIRING CARD (`14991:76191`), article layout, breadcrumbs. Assumptions: quiz result routing (open item). Under-21: chronicle cigar articles' visibility flagged. `Article` schema; images placeholder-only.

## M09 — Engagement

| Frame | Node ID | Page | Route | Type |
| --- | --- | --- | --- | --- |
| membership (#102) | `15008:38309` | 85:10 | `/membership` | marketing/form |
| membership (iteration) | `15694:43984` | 119 | `/membership` | supersedes #102 |
| partner (#95) | `14670:42180` | 85:10 | `/partner` | marketing/form |
| Home/ Partner (iteration ×2) | `14735:64944`, `15742:47685` | 119 | `/partner` | supersedes #95 (+dup) |
| partner application submitted (#98) | `15640:24481` | 85:10 | `/partner` | form success state |
| get in touch (#100, dup #96 `14670:49691`) | `14644:34661` | 85:10 | `/get-in-touch` | form |
| get in touch (iterations ×2) | `14735:64245`, `14735:71454` | 119 | `/get-in-touch` | supersede #100 (+dup) |
| get in touch submission (#101) | `15663:38140` | 85:10 | `/get-in-touch` | success overlay |
| get in touch submission (iteration) | `15739:43395` | 119 | `/get-in-touch` | supersedes #101 |
| careers (#99) | `13148:15771` | 85:10 | `/careers` | marketing |
| positions (#103) | `13148:15855` | 85:10 | `/careers/positions` | listing |
| job detail (#104) | `13148:15939` | 85:10 | `/careers/positions/[jobId]` | detail |
| apply (#105) | `13563:29858` | 85:10 | `/careers/positions/[jobId]/apply` | form |
| submit newsletter | `15684:17973` | 119 | global footer overlay | success overlay (**new**) |

- Patterns: long-form form + success overlay pair; PRICING CARDS on membership. Forms validate client-side only; submissions are UI-only. Careers uses `[jobId]` data map. Success overlays are in-page (no route). `noindex` on success states; form pages indexable.

## M10 — Legal / info

| Frame | Node ID | Page | Route | Type |
| --- | --- | --- | --- | --- |
| our story (#106, dup #115 `14670:45497`) | `15934:43007` | 85:10 | `/our-story` | static |
| Our Story (iterations) | `14735:65002`, `14897:62858` | 119 | `/our-story` | supersede #106 |
| craftsmanship (#114) | `14703:33971` | 85:10 | `/craftsmanship` | static |
| craftsmanship & heritage (iteration) | `14735:68716` | 119 | `/craftsmanship` | supersedes #114 |
| sustainability (#110) | `13148:20719` | 85:10 | `/sustainability` | static |
| sustainability (iteration) | `14735:71637` | 119 | `/sustainability` | supersedes #110 |
| accessibility (#108) | `14703:32598` | 85:10 | `/accessibility` | static |
| accessibility (iteration) | `14735:68782` | 119 | `/accessibility` | supersedes #108 |
| press (#111) | `14670:48497` | 85:10 | `/press` | static + form |
| press (iteration) | `14735:68990` | 119 | `/press` | supersedes #111 |
| PRESS FORM SUBMISSION (#97) | `15640:27501` | 85:10 | `/press` | success overlay |
| privacy policy (#109) | `14670:48780` | 85:10 | `/privacy-policy` | legal |
| privacy policy (iteration) | `14735:69083` | 119 | `/privacy-policy` | supersedes #109 |
| terms (#113) | `14703:33048` | 85:10 | `/terms-of-service` | legal |
| terms & conditions (iteration) | `14735:69197` | 119 | `/terms-of-service` | supersedes #113 |
| cookie policy (#107) | `14703:32859` | 85:10 | `/cookie-policy` | legal |
| cookie policy (iteration) | `14735:69304` | 119 | `/cookie-policy` | supersedes #107 |
| final cookie popup (#116) | `14703:32888` | 85:10 | global overlay | consent overlay |
| final cookie popup (iteration) | `14735:69333` | 119 | global overlay | supersedes #116 |
| faq (#112) | `14670:48590` | 85:10 | `/faq` | static (1459px anomaly) |
| faq (iteration) | `14735:71264` | 119 | `/faq` | supersedes #112 (1459px anomaly persists) |

- Legal copy is long Figma text — extracted verbatim per frame at implementation; rendered as typed JSX sections (no `dangerouslySetInnerHTML`). FAQ accordion uses repo `Accordion` with `FAQPage` schema. Cookie popup gates non-essential storage; keyboard reachable; not focus-stealing on load.

## M06 — Cart & checkout (UI only — no payment processing)

Pages (page 85 flow + three page-119 flow iterations):

| Frame | Node ID | Page | Route |
| --- | --- | --- | --- |
| home/cart (#31; dups #29 `14712:33219`, #32 `15274:39176`, #36 `14803:100778`, #50 `15451:39778`) | `14670:45135` | 85:10 | `/cart` |
| cart (hoodie flow, iteration; dup `15742:49793`) | `14991:67392` | 119 | `/cart` (canonical iteration) |
| cart (espresso flow) | `15877:42588` | 119 | `/cart` (duplicate) |
| home/cart empty (#30) | `14670:43110` | 85:10 | `/cart` empty state |
| home/cart empty (iteration) | `14735:65097` | 119 | `/cart` empty state (supersedes #30) |
| home/cart/buy again list | `15764:46150` | 119 | `/cart/buy-again` (**new**, list view) |
| home/cart/buy again grid view | `15764:46226` | 119 | `/cart/buy-again` (grid view state) |
| checkout shipping (#33; variants #34, dups #38, #39, #51 `15451:37998`) | `15127:24015` | 85:10 | `/checkout/shipping` |
| shipping (iterations: hoodie `14991:66550`, royal leaf `15764:41858`, espresso `15877:42242`) | — | 119 | `/checkout/shipping` (supersede) |
| checkout payment (#35; QR state #42 `15694:41162`, dups #41, #52 `15451:37833`) | `15127:23850` | 85:10 | `/checkout/payment` |
| payment (iterations: hoodie `14991:66387`, royal leaf `15764:41719`, espresso `15877:42078`) | — | 119 | `/checkout/payment` (supersede) |
| checkout review (#37; dups #45, #53 `15451:38230`) | `15127:24193` | 85:10 | `/checkout/review` |
| review (iterations: hoodie `14991:66690`, royal leaf `15764:42051`, espresso `15877:42384`) | — | 119 | `/checkout/review` (supersede) |

Overlays (hosted on checkout routes): order-placed `15127:24308` (#40; dups #48, #54, #57 `14670:50857`, #58 `14670:51019`; iterations `15296:42835`, `15764:42161`, `15877:42498`) · OTP `15916:42914` (#44; dup #56 `15640:24401`; iterations `15670:14276`, `15296:42862`, `15764:42188`, `15877:42525`) · create password `15127:24336` (#46; dups #49, #55; iterations `15296:42863`, `15764:42189`, `15877:42526`) · welcome `15127:24381` (#47; iterations `15296:42908`, `15764:42234`, `15877:42571`) · QR code `15694:41226` (#43).

- Patterns: three product flows are one checkout template + cart-line data; progress indicator (repo `ProgressIndicator`); CART ITEM (`14991:76724`), MAIN CHECKOUT CTA (`14991:75366`), Save-for-later block, VIEW BUTTON CART.
- Assumptions: step wiring cart→shipping→payment→review (elements verified, wiring inferred); buy-again list/grid toggle semantics.
- Security: **no payment processing** — card/UPI/OTP fields are display-only, never stored/transmitted; `noindex`; no real order data (fixtures only).
- Tests: e2e walk of all four steps with UI state passed via client store; overlay focus traps; empty-cart state render; buy-again view toggle.

## M07 — Profile & account

Pages:

| Frame | Node ID | Page | Route |
| --- | --- | --- | --- |
| my profile (#59) | `13148:18311` | 85:10 | `/my-profile` |
| my profile (iteration) | `14897:53438` | 119 | `/my-profile` (supersedes) |
| complete profile (#64) | `13148:18414` | 85:10 | `/my-profile/complete` |
| complete profile (iteration) | `14897:53478` | 119 | supersedes #64 |
| final profile complete (#71) | `13148:18728` | 85:10 | `/my-profile/complete` success state |
| final profile complete (iteration) | `14897:53690` | 119 | supersedes #71 |
| addresses (#63) | `13148:18794` | 85:10 | `/my-profile/addresses` |
| address (iteration) | `14897:53754` | 119 | supersedes #63 |
| my orders (#66; cancel-state #67 `14852:34676`) | `14852:34754` | 85:10 | `/my-profile/orders` |
| my orders (iteration) | `14897:56041` | 119 | supersedes #66 |
| my orders empty | `14897:56118` | 119 | `/my-profile/orders` empty state (**new**) |
| order detail (#74) | `13148:19312` | 85:10 | `/my-profile/orders/[orderId]` |
| order detail (iteration) | `14897:54167` | 119 | supersedes #74 |
| wishlist (#68; delete-state #69 `14852:34765`) | `15640:25349` | 85:10 | `/my-profile/wishlist` |
| wishlist (iteration) | `14897:56128` | 119 | supersedes #68 |
| wishlist item removed | `15708:42060` | 119 | `/my-profile/wishlist` state (supersedes #69) |
| settings (#61) | `14762:96902` | 85:10 | `/my-profile/settings` |
| settings (iteration) | `14897:54444` | 119 | supersedes #61 |

Overlays (host routes per route map): edit profile form #60 `15397:39748` → iteration `15739:44291` · profile completed #65 `14323:56798` (trigger unresolved) · PROFILE COMPLETION sheet `15488:39642` (component reference) · sign out #62 `15661:38017` → iteration `15708:41998` · delete from wishlist #70 `15640:25119` → iteration `15708:42011` · add address #73 `15397:40009` → iteration `15700:15599` · edit address #72 `15397:40144` → iteration `15700:15614` · deactivation & deletion chooser #75 `15253:40306`; deletion steps #76/#78/#81/#83/#84/#88 (`15253:40372`, `15253:40494`, `15253:40571`, `14771:98658`, `15631:66346`, `15631:66398`) → iterations `15554:67145`, `15554:67175` (+dup `15554:67245`), `15554:67315`, `15554:67384` · deactivation steps #77/#79/#80/#82 (`15253:40433`, `15253:40549`, `15631:66323`, `15631:66439`) → iterations incl. 90-day frames `15554:67124`/`15554:67365` · confirmed/cancelled deactivation `15739:43443`/`15739:43460` (**new**) · confirmed/cancelled deletion `15739:43477`/`15739:43494` (**new**) · CHATBOT POP UP #85 `14888:44021` → iteration `15566:68743` (trigger unresolved) · order CANCELLATION POP UP #86 `13148:19561` → iteration `15566:68819` · See all updates #87 `14894:81468` → iteration `16671:29562` · order overlay #89 `14894:79892` → iteration `15566:68788` · misc profile overlay `14897:53360`.

- Verified copy (settings, from metadata): `Settings`, `Account`, `Profile information`, `Email address`, `doe234@gmail.com`, `Security`, `Password`, `Change Password`, `Two-factor authentication`, `Active sessions`, `Trusted devices`, `Preferences`, `Push notifications`, `Language`, `Currency`, `Orders & Membership`, `Order history`, `Saved address`, `Payment methods`.
- Patterns: MAIN SIDEDBAR (`14991:74633`) profile shell; settings row cards (`Component 9`) with hover token; Switch rows; step-flow confirmation modals (500-wide).
- Known inconsistency (U-14): step copy says "of 5", six deletion frames exist. New confirmed/cancelled frames don't resolve U-15 exit behavior — still open.
- Security/privacy: all data is fixture copy; destructive flows are UI-only with explicit confirm steps; `noindex`; sign-out returns to `/`  (assumption).
- Tests: sidebar nav a11y; settings toggles (repo `Switch`); every step modal focus-trapped; deletion/deactivation step sequences walkable by keyboard; empty states render.

## Component / library sheets (page 119 — build once in M00/M04, consume everywhere)

Navbar & Footer section `14991:74404`: MAIN NAVBAR UNDER 21 master `15006:36650`, MAIN SEARCH BAR `14991:74525`. Sidebar & search `14991:74632`: MAIN SIDEDBAR `14991:74633`, MENU SIDEBAR `14991:74872` (+instance `15694:43947`), MAIN BREADCRUMBS `14991:75137`, MAIN CIGARS/THE CABINET `14991:75194`, MAIN /SAVE FOR LATER `14991:75215`, MAIN /CLOTHIER COLLECTIONS `14991:75236`, all filters `14991:75257`. Icons & secondary `14991:75259`: Save for later `14991:75260`, MAIN DELETE/ADD `14991:75273`, SAVE BUTTON `14991:75299`, CHECKBOX `14991:75306`, RADIO BUTTON `14991:75312`, slider `14991:75316`, arrow `14991:75347`, ARROW HERO `14991:75356`. BUTTONS `14991:75365`: MAIN CHECKOUT CTA `14991:75366`, MAIN WISHLIST `14991:75371`, ADD TO CART `14991:75381`, EDIT profile `14991:75386`, MAIN EXPLORE `14991:75395`, estate icon `14991:75406`, ascend button `14991:75410`, MOVE TO CART BUTTON `14991:75411`. CARDS `14991:75416`: Category cards `14991:75417`, profile card `14991:75502`, PRICING CARDS `14991:75503`, The House `14991:75738`, The Clothier `14991:75915`, MAIN PRODUCT CARD `14991:76092`, PAIRING CARD `14991:76191`, pagination `14991:76204`, Saved for later `14991:76205`, homescreen section 3 `14991:76223`, whislist cart under 21 `14991:76236`, CART ITEM `14991:76724`, VIEW BUTTON CART `14991:76725`. Standalone: 2/3/6 TABS `14991:76257`/`14991:76293`/`14991:76364`, MAIN HERO SECTION `14991:76612`, MAIN PRODUCT HERO `14991:77160`, MAIN THE HOUSE SECTION `15518:67223`, HOME SECTION 2 `15536:38165`, CATEGORY non cigar `16613:85385`, sidebar instance `14735:63944`.

## Excluded frames (not product screens)

- Design-system sheets: `119:26711`, `155:30268` (Velarro), `234:3095` ("Design System of Metasys").
- **TAIRC-branded assets on the shared canvas** (`803:*`, `804:*`, `805:18426`, `813:18452` logo groups): explicitly out of scope per repository boundary — never implemented here.
- Brand/sticker exploration: `9488:*`, `9546:2`, `9555:*`, `843:20035`, `842:*`, `1688:*`; annotation vectors/arrows; tiny utility frames (`14735:71245`).

## Anomalies & open items (do not invent — carried into build plan)

1. Prototype wiring unverifiable via MCP → all navigation labeled assumption (existing U-03).
2. Apothecary (85:10) vs T-hub (119) relationship — product decision needed.
3. `estate espresso` frame filed under t-hub (`16599:40248`); `estate chinio` spelling; `products` vs `products2` semantics.
4. Deletion "Step X of 5" vs six frames (U-14); post-deletion exit (U-15) — new confirmed/cancelled overlays don't close these.
5. Under-21 visibility of the Vault, Chronicle cigar articles, and cigar PDP indexability — product/legal review.
6. Gotham webfonts, logo/favicon, product photography pending (U-16); all image slots placeholder-only.
7. FAQ frames are 1459px wide on both pages — implement at 1440.
8. Full-page Login (`15017:74618`) vs modal login — dual presentation decision documented in route map.
