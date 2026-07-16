# Current Main Route and Figma Fidelity Tracker (V-00)

| Field | Value |
| --- | --- |
| Audit title | V-00 — Current Main Route and Figma Fidelity Planning Audit |
| Audit date | 2026-07-16 |
| Current branch | `docs/current-main-route-fidelity-plan` |
| Baseline SHA | `3f40c01f441455a3e0a3875da4187e8e0ad35bc6` |
| `origin/main` at audit start | `3f40c01f441455a3e0a3875da4187e8e0ad35bc6` |
| Latest merged PR | **#45** — Under-21 route, dedicated navbar, Roastery hero |
| Latest closed stale PR | **#40** — closed without merge (stale / duplicated PR #39 work) |
| Future CI-only reference | Commit `35e2bca` (`fix(ci): keep Cursor config syntax check bytecode-free`) — **do not merge or cherry-pick PR #40** |
| Repository state | Documentation-only planning on clean baseline |
| Unit/component baseline (verified on baseline) | PASS — 63 files, 378 tests |
| Build baseline | PASS |
| E2E baseline | PASS — 11 of 11 Playwright tests |
| Cursor pack | PASS (re-validated during V-00) |
| Anisha | Paused from implementation until Vishnu completes V-00 through V-09 |

## Source-of-truth hierarchy

1. Current repository code at SHA `3f40c01…`
2. Current executable behavior
3. Current tests
4. Current route manifest (`lib/seo/route-manifest.ts`)
5. Current route-access policy (`lib/age/route-access.ts`)
6. App Router route tree (`app/**/page.tsx`)
7. Merged GitHub PR history through #45
8. Connected Figma Design System (`119:26710`) and Wireframes (`85:10`), file `92rhH51aErpYQWRrlJqMhn`
9. Current architecture and implementation documents
10. Historical planning documents (**labeled stale when superseded**)

Where sources conflict: document the conflict; do not silently choose; **do not modify production code in V-00**.

## Six-layer engineering model

Authoritative working model: `docs/architecture/velarro-six-layer-design-system.md`
Status: **Engineering working model pending explicit UI/UX confirmation**

```text
L1 Foundations → L2 Primitives → L3 Composites → L4 Sections → L5 Pages → L6 Behavior
```

Global shell ownership: `components/layout/` (navbar, footer, menu).
Homepage sections: `components/m01-home/`.
Under-21: `components/m01-under21/` (isolated).
Do not create a second design system or move shell back into M01.

## Merged work that must NOT be planned as new implementation

| Work | PR / source | Classification for V-series |
| --- | --- | --- |
| Enterprise Cursor controls | #39 | Preserve |
| Package script update | #43 | Preserve |
| M00.5 foundations (tokens, shell move, partner honesty, membership overflow, error/not-found) | #44 | Preserve + fidelity remediation only |
| Under-21 root, navbar, Roastery | #45 | Preserve + fidelity remediation for implemented U21 surfaces |
| Over-21 homepage + marketing routes listed below | Prior merges | Preserve + fidelity remediation |

## Figma inventory (verified in V-00)

File key: `92rhH51aErpYQWRrlJqMhn`
MCP auth: View seat (`vishnu@metasysglobal.com`)
Top-level pages verified via `get_metadata` (no nodeId): `119:26710` Design System; `85:10` Velarro Wireframes.

| Surface | Node | Verified name | Verified size (MCP) | Confidence |
| --- | --- | --- | --- | --- |
| Over-21 home | `13148:15012` | `home` | 1440 × 7624.16 | High |
| Collector hero | `15081:25289` | `MAIN HERO SECTION` | 1441 × 851 | High |
| Cigar carousel | `13148:15033` | `section 1` | 1314 × 645 | High |
| Over-21 Roastery | `15451:37609` | `MAIN THE HOUSE SECTION` | 1441 × 851 | High |
| Cigar Knowledge | `13148:15081` | `section3` | 1340 × 719 | High (from home subtree) |
| Gifting | `13148:15113` | `section 2` | 1338 × 696 | High (from home subtree) |
| Clothier | `13148:15120` | `section 6` | 1340 × 708.43 | High (from home subtree) |
| Estate Collection | `13148:15145` | (section 5 in inventory) | 1340 × 688 | High (docs + home subtree) |
| Store/Lounge | `13148:15176` | (section4 area) | 1236 × 1065 | High (docs + home subtree) |
| Shared footer | `14468:34842` | `MAIN FOOTER` | 1440 × 697.16 | High |
| Under-21 home | `14735:62828` | `home` | 1440 × 5199.16 | High |
| Under-21 navbar | `15694:43347` | `MAIN NAVBAR UNDER 21` | 1440 × 73 | High |
| Under-21 Roastery | `15694:45979` | `MAIN THE HOUSE SECTION` | 1441 × 851 | High |
| Our Story | `15934:43007` | `home/our story` | 1440 × 4586 | High |

Section-level home inventory also documented in `docs/implementation/modules/M01-home/figma-section-inventory.md` (historical extraction; dimensions re-verified against MCP where called in V-00).

**Responsive Figma:** No verified tablet/mobile frames for M01 or most marketing routes. Responsive = **engineering-derived** until UI/UX provides frames.

## Route inventory (App Router + manifest)

### Implemented App Router pages

| Route | Route file | Principal component | Manifest module | Audience | Indexable | Figma node | Age policy (runtime) | Unit tests | E2E | Fidelity classifications | V-PR | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` (over21) | `app/page.tsx` | `Over21HomePage` | M01-home | public | **true** (only indexable implemented route) | `13148:15012` | unknown→AgeGate; under21→U21 shell; over21→full home | `tests/m01-home/*` | foundations + headers | Material fidelity + Font-blocked + Asset-blocked + Responsive correction | V-01–V-05 | High |
| `/` (under21) | same | `Under21HomePage` via shell | M01-home | public | same | `14735:62828` (partial impl) | allow U21 safe home | `tests/m01-under21/*` | none dedicated | Preserve implemented slice; Asset-blocked remaining U21 sections | Later U21 PRs (not V-01–V-09 primary) | High |
| `/our-story` | `app/our-story/page.tsx` | `OurStoryPage` / age wrapper | **M10-legal-info** (naming mismatch vs folder `m02-our-story`) | age-gated | false | `15934:43007` | gate/block tobacco content | age-state tests | none | Material fidelity + Font-blocked | V-06 | High |
| `/the-estate` | `app/the-estate/page.tsx` | `TheEstatePage` | M03-estate | age-gated | false | `16576:98447` | gate/block | age-state | none | Material fidelity + Asset-blocked | V-07a | Med–High |
| `/the-estate/the-house` | `app/the-estate/the-house/page.tsx` | `TheHousePage` | M03-estate | age-gated | false | `16576:96095` | gate/block | age-state | none | Material fidelity | V-07b | Med–High |
| `/the-vault` | `app/the-vault/page.tsx` | `TheVaultPage` | M05-vault | age-gated | false | `14240:78024` | gate/block | age-state | none | Material fidelity + Asset-blocked | V-07c | Med |
| `/the-chronicle` | `app/the-chronicle/page.tsx` | `ChroniclePage` | M08-editorial | age-gated | false | `14284:63187` | gate/block | age-state | none | Material fidelity + Asset-blocked | V-08a | Med |
| `/pairing-guide` | `app/pairing-guide/page.tsx` | `PairingGuidePage` | M08-editorial | age-gated | false | `14406:85066` | gate/block | age-state | none | Material fidelity + Asset-blocked | V-08b | Med |
| `/membership` | `app/membership/page.tsx` | `MembershipPage` | M09-engagement | review | false | `15008:38309` | review for U21 | page + overflow + benefits | m09-membership | Material fidelity; Preserve overflow lock | V-09a | High |
| `/partner` | `app/partner/page.tsx` | `PartnerPage` | M09-engagement | review | false | `14670:42180` | review | form + page | m09-partner | Material fidelity; Preserve UI-only honesty | V-09b | High |
| `/get-in-touch` | `app/get-in-touch/page.tsx` | `GetInTouchPage` | M09-engagement | review | false | `14644:34661` | review | form + page | m09-get-in-touch | Material fidelity; Preserve UI-only | V-09b | High |
| `/careers` | `app/careers/page.tsx` | `CareersPage` | M09-engagement | review | false | `13148:15771` | review | age + visual | m09-careers-hero | Material fidelity | V-09c | High |
| `/careers/positions` | `…/positions/page.tsx` | positions page | M09-engagement | review | false | `13148:15855` | review | search + page | m09-careers-positions | Material fidelity | V-09c | High |
| `/careers/positions/[jobId]` | detail | detail page | M09-engagement | review | false | `13148:15939` | review | detail tests | detail E2E | Material fidelity | V-09c | High |
| `/careers/positions/[jobId]/apply` | apply | application page | M09-engagement | review | false | `13563:29858` | review | form + page | application E2E | Preserve UI-only; fidelity | V-09c | High |
| `/_not-found` | `app/not-found.tsx` | NotFound | n/a | n/a | noindex | n/a | n/a | `tests/app/not-found.test.tsx` | via bad career slugs | Preserve | — | High |
| error UI | `app/error.tsx` | ErrorPage | n/a | n/a | n/a | n/a | n/a | `tests/app/error.test.tsx` | none dedicated | Preserve | — | High |

### Manifested but unimplemented (one row per `ROUTE_MANIFEST` entry)

Source: `lib/seo/route-manifest.ts` at baseline `3f40c01`. `implemented: false` for every row. No App Router `page.tsx` exists. Figma nodes listed here are **from the route manifest only** unless noted; they were **not** directly inspected via Figma MCP during V-00 and **must be re-verified at implementation start**.

| Route | Module | Figma node | Public | Indexable | Audience | Implemented | Route entry | Principal component | Current dependency or decision | Planned owner / phase | Verification confidence | Figma node inspection in V-00 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/coming-soon` | M01-home | `12339:55472` | true | false | review | false | N/A | N/A | Product review surface; not in App Router | Product / later (post V-09) | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/login` | M02-auth | `14991:70094` | false | false | age-gated | false | N/A | N/A | Deferred by approved auth dependency | Post V-09 / M02-auth | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/signup` | M02-auth | `14991:70051` | false | false | age-gated | false | N/A | N/A | Deferred by approved auth dependency | Post V-09 / M02-auth | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/forgot-password` | M02-auth | `14991:70134` | false | false | age-gated | false | N/A | N/A | Deferred by approved auth dependency | Post V-09 / M02-auth | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/reset-password` | M02-auth | `14991:70162` | false | false | age-gated | false | N/A | N/A | Deferred by approved auth dependency | Post V-09 / M02-auth | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/the-estate/the-house/the-roastery` | M03-estate | `15451:39198` | true | false | age-gated | false | N/A | N/A | Estate child route; Over-21 homepage Roastery section is separate (`15451:37609`) | Later estate family (after V-07) | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/the-estate/the-humidor` | M03-estate | `13148:16189` | true | false | age-gated | false | N/A | N/A | Estate humidor family not started | Later estate family | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/the-estate/the-humidor/heritage` | M03-estate | `14670:35568` | true | false | age-gated | false | N/A | N/A | Estate humidor child | Later estate family | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/the-estate/the-humidor/royal-leaf` | M03-estate | `14670:37727` | true | false | age-gated | false | N/A | N/A | Estate humidor child | Later estate family | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/the-house` | M04-house | `14670:40233` | true | false | review | false | N/A | N/A | Competing canonical with implemented `/the-estate/the-house` — do not activate in V-01–V-09 | **V-10 route-decision** | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/the-house/the-clothier` | M04-house | `14670:39985` | true | false | review | false | N/A | N/A | Depends on `/the-house` canonical decision; Clothier homepage section is separate (`13148:15120`) | **V-10** then later house family | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/cart` | M06-cart-checkout | `14712:33219` | false | false | age-gated | false | N/A | N/A | Deferred by commerce backend; navbar Cart remains deferred control | Post V-09 / M06 | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/checkout/shipping` | M06-cart-checkout | `15127:24015` | false | false | age-gated | false | N/A | N/A | Deferred by commerce backend | Post V-09 / M06 | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/checkout/payment` | M06-cart-checkout | `15127:23850` | false | false | age-gated | false | N/A | N/A | Deferred by commerce backend; do not fabricate payment success | Post V-09 / M06 | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/checkout/review` | M06-cart-checkout | `15127:24193` | false | false | age-gated | false | N/A | N/A | Deferred by commerce backend | Post V-09 / M06 | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/my-profile` | M07-profile | `13148:18311` | false | false | auth | false | N/A | N/A | Deferred by auth dependency | Post V-09 / M07 | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/accessibility` | M10-legal-info | `14703:32598` | true | false | public | false | N/A | N/A | Legal copy + product approval required | Later / legal | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/cookie-policy` | M10-legal-info | `14703:32859` | true | false | public | false | N/A | N/A | Legal copy + product approval required | Later / legal | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/faq` | M10-legal-info | `14670:48590` | true | false | public | false | N/A | N/A | Content + product approval required | Later / legal | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/privacy-policy` | M10-legal-info | `14670:48780` | true | false | public | false | N/A | N/A | Legal copy + product approval required | Later / legal | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/terms-of-service` | M10-legal-info | `14703:33048` | true | false | public | false | N/A | N/A | Legal copy + product approval required | Later / legal | Manifest-only | Present in current route manifest — not yet verified via MCP |
| `/press` | M10-legal-info | `14670:48497` | true | false | review | false | N/A | N/A | Review audience; content not started | Later / press | Manifest-only | Present in current route manifest — not yet verified via MCP |

### Route / naming mismatches (document only — do not fix in V-00)

| Conflict | Evidence | Authoritative for runtime | Assign |
| --- | --- | --- | --- |
| Our Story folder `m02-our-story` vs manifest module `M10-legal-info` vs historical M02=auth | Code + `route-manifest.ts` | **Code path + App Router** | V-06 note only; rename = separate decision |
| Manifest `/the-house` unimplemented while `/the-estate/the-house` implemented | Manifest + App Router | **Implemented nested route** | V-10 |
| Site-header / site-footer scaffolds vs MainNavbar / MainFooter | `components/layout/*` | **MainNavbar / MainFooter** used by pages | Avoid dual shell; V-01 must not revive scaffolds |
| shared-component-plan still lists some paths not present (`main-nav.tsx`, product card paths) | `shared-component-plan.json` | **Filesystem + imports** | Treat plan as partially stale |

### Indexability

- Sitemap uses `getSitemapEntries()` → only routes with `implemented && public && indexable`.
- **Only `/` is indexable** among implemented routes.
- All other implemented marketing routes: `indexable: false` — intentional review posture; product may later open indexing (**product decision**).

## Shared shell and foundations (preserve)

| Asset | Location | Status |
| --- | --- | --- |
| MainNavbar | `components/layout/main-navbar.tsx` | Preserve; geometry fidelity in V-01 when required |
| MainFooter | `components/layout/main-footer.tsx` | Preserve; **exclusive internal geometry owner = V-05** (V-01 must not edit this file) |
| Main menu sidebar | `components/layout/main-menu-sidebar.tsx` | Preserve |
| Tokens / radius-sm / overflow tokens | `app/globals.css` | Preserve; avoid broad edits in V-01–V-09 |
| Partner / Get-in-touch UI-only honesty | forms + data | Preserve — regression-locked |
| Membership overflow lock | membership components | Preserve |
| Gotham fonts | missing | Font-blocked sitewide |

## Blockers (sitewide)

1. **Gotham / OneSignature licensed webfonts missing** — see typography readiness doc.
2. **Many permanent images still deferred / placeholders** — module asset inventories.
3. **No mobile/tablet Figma** for most routes — engineering-derived responsive.
4. **No approved analytics/telemetry stack** — do not invent.
5. **UI/UX has not formally approved six-layer taxonomy** — engineering model only.
6. **Auth / cart / checkout backends absent** — do not fabricate success.

## Unresolved decisions

| Decision | Owner | Blocks |
| --- | --- | --- |
| Canonical house route (`/the-house` vs `/the-estate/the-house`) | Product + eng | V-10 |
| When to flip marketing routes to indexable | Product / SEO | Post V-09 |
| Newsletter / partner / contact backends | Backend | Honesty already correct; live submit later |
| Remaining Under-21 sections after navbar+roastery | Product + Anisha pause | Separate U21 PRs |
| Official six-layer confirmation | UI/UX | Documentation language only |

## Verification confidence

| Area | Confidence | Notes |
| --- | --- | --- |
| Route tree vs manifest implemented flags | High | Direct file + manifest inspection |
| Figma node IDs for home + Our Story + U21 | High | MCP `get_metadata` in V-00 |
| Pixel difference magnitudes vs Figma | Medium | Prior audit artifacts; not re-scored in V-00 |
| Non-home marketing Figma full geometry | Medium | Manifest nodes + module notes; not all re-fetched in V-00 |
| Responsive Figma | N/A | No frames |

## V-series ownership map

| PR | Owner | Primary routes / sections |
| --- | --- | --- |
| V-00 | Vishnu | This documentation set |
| V-01 | Vishnu | Over-21 shell rhythm / geometry |
| V-02 | Vishnu | Collector + Cigar carousel |
| V-03 | Vishnu | Roastery + Knowledge |
| V-04 | Vishnu | Gifting + Clothier |
| V-05 | Vishnu | Estate collection + Store/Lounge + footer + home regression |
| V-06 | Vishnu | Our Story |
| V-07 | Vishnu | Estate / House / Vault (split PRs) |
| V-08 | Vishnu | Chronicle / Pairing Guide |
| V-09 | Vishnu | Membership / Partner+Contact / Careers (split) |
| V-10+ | TBD | Route decisions, auth, legal, commerce |
