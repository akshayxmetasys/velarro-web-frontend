# Vishnu V-01 through V-09 Fidelity Execution Sequence

| Field | Value |
| --- | --- |
| Companion tracker | `docs/implementation/current-main-route-fidelity-tracker.md` |
| Shared-file locks | `docs/implementation/v00-v09-shared-file-lock-forecast.md` |
| Evidence index | `docs/implementation/v00-fidelity-evidence-index.md` |
| Baseline SHA | `3f40c01f441455a3e0a3875da4187e8e0ad35bc6` |
| Figma file | `92rhH51aErpYQWRrlJqMhn` |
| Wireframes page | `85:10` |
| Design System page | `119:26710` |
| Execution owner | Vishnu (Anisha paused) |
| Rule | One tightly scoped PR per branch; no dependency updates; no Cursor-control changes; no fabricated backends |

**Exact order:** V-01 → V-02 → V-03 → V-04 → V-05 → V-06 → V-07a → V-07b → V-07c → V-08a → V-08b → V-09a → V-09b → V-09c.

Do **not** schedule already-shipped foundations (#39/#43/#44/#45) as new work — only fidelity remediation and preservation.

## Footer ownership (V-01 vs V-05)

| Concern | Owner |
| --- | --- |
| Homepage container, shell placement, navbar (when required), section rhythm, spacing before footer, page-height baseline, horizontal-overflow baseline | **V-01** |
| Internal `MainFooter` geometry (`components/layout/main-footer.tsx`), footer grid, newsletter geometry, footer typography geometry, footer spacing, footer links layout, final footer height, final homepage/footer integration | **V-05 exclusively** |

V-01 must **not** change internal `MainFooter` geometry and must **not** list `main-footer.tsx` as an expected source file.

## Language for completion claims

Use: geometry complete / interaction complete / asset-blocked / font-blocked / responsive derived. Never claim pixel-perfect while Gotham fonts or final images are missing.

## Complete validation gates (every V-PR)

1. `git diff --check`
2. `npm.cmd run cursor:check`
3. `npm.cmd run lint`
4. `npm.cmd run typecheck`
5. `npm.cmd run test`
6. `npm.cmd run build`
7. Focused E2E for the changed route/section, then `npm.cmd run test:e2e` as applicable
8. Visual evidence package (before/after) for changed surfaces

---

## V-01 — Over-21 shell rhythm and page geometry

| Field | Content |
| --- | --- |
| Branch | `feature/m01-fidelity-shell-rhythm` |
| Purpose | Align Over-21 homepage container width, shell/header placement, section vertical rhythm, spacing before the footer, total page-height baseline, and horizontal-overflow baseline at desktop 1440 |
| Route or section | `/` Over-21 page composition (`Over21HomePage`); global homepage container and section rhythm — not individual section card redesign |
| Exact Figma node | Parent `13148:15012`; navbar instance/source references `14406:85640` / `14279:30062`; footer frame `14468:34842` used only as **external** height/placement reference (do not edit footer component) |
| Verified dimensions | Parent frame directly verified in V-00 MCP: 1440 × 7624.16. Footer instance directly verified: 1440 × 697.16. Re-verify navbar source through Figma MCP at PR start if navbar file is touched |
| Six-layer impact | L3 shell placement (navbar only if required); L4 section spacing; L5 page wrapper (`over21-home-page.tsx`); L1 tokens only if a repeated approved value is proven — prefer local spacing |
| Existing components to reuse | `MainNavbar`, `FooterSection`/`MainFooter` (consume only), existing M01 section components, `Over21HomePage` |
| Repository search required before new code | Search `components/layout/`, `components/m01-home/over21-home-page.tsx`, existing spacing utilities, `site-header`/`site-footer` (must remain unused) |
| Duplication risks | Do not recreate shell under `m01-home`; do not activate `site-header`/`site-footer`; do not fork footer |
| Expected source files | `components/m01-home/over21-home-page.tsx`; section wrappers only for outer spacing; `components/layout/main-navbar.tsx` only if header placement cannot be fixed on the page wrapper |
| Shared-file locks | Possible exclusive lock on `main-navbar.tsx` during V-01. **Forbidden:** `components/layout/main-footer.tsx` |
| Asset requirements | No broad image replacement; keep approved hosts |
| Typography blockers | Gotham missing — font-blocked for exact type match; do not install fonts |
| Responsive source status | No verified mobile/tablet Figma for M01 |
| Engineering-derived responsive requirements | No document-level horizontal overflow at 320, 375, 390, 768, 1024, 1440; preserve `overflow-x` containment on page wrapper |
| Interactions and states | Preserve menu/drawer open/close, deferred Search/Cart/Login, focus restore |
| Accessibility requirements | Landmarks unchanged; focus-visible; no broken heading order; reduced-motion respected where motion exists |
| Security requirements | No CSP, cookie, or route-access changes; no secrets in docs/screenshots |
| Visibility/SEO requirements | Keep `/` indexable; do not flip other routes |
| Analytics/telemetry status | N/A — no approved telemetry stack; do not invent |
| Targeted unit/component tests | `tests/m01-home/main-navbar.test.tsx`; `tests/m01-home/home-page-age-state.test.tsx`; footer unit must still pass without footer source edits |
| Targeted E2E tests | `tests/e2e/foundations.spec.ts`; `tests/e2e/security-headers.spec.ts` |
| Complete validation gates | Full gate list above |
| Required before screenshot | `/` over-21 at 1440 full page |
| Required after screenshot | `/` over-21 at 1440 full page |
| Visual comparison requirement | Compare page height/rhythm to `13148:15012`; list known differences |
| Horizontal-overflow checks | Document-level at 320–1440 listed widths |
| Acceptance criteria | No document H-overflow at 1440 baseline; rhythm measurably closer to Figma; shell ownership unchanged; `main-footer.tsx` untouched |
| Explicit out-of-scope items | Internal MainFooter redesign; final fonts; permanent image swap; section-internal card redesign; Under-21; auth/cart |
| Rollback boundary | Revert V-01 PR/merge only |
| Known blockers | Font metrics; final imagery; footer internal geometry deferred to V-05 |

---

## V-02 — Collector hero + Cigar carousel

| Field | Content |
| --- | --- |
| Branch | `feature/m01-fidelity-hero-carousel` |
| Purpose | Geometry, crop, overlay, alignment, carousel controls, active card state, keyboard behavior, reduced motion for Collector hero and Cigar carousel |
| Route or section | `/` sections: Collector hero; Cigar carousel |
| Exact Figma node | `15081:25289`; `13148:15033` |
| Verified dimensions | Directly verified in V-00 MCP: Collector 1441 × 851; Carousel section 1314 × 645. Re-verify through Figma MCP at PR start |
| Six-layer impact | L4 sections; L2 shared controls if buttons reused; L6 carousel interaction state |
| Existing components to reuse | `CollectorHeroSection`, `CigarCarouselSection`, `Button`, approved image maps, `ImagePlaceholder` where deferred |
| Repository search required before new code | Search `collector-hero*`, `cigar-carousel*`, `components/ui/button`, approved image hosts, existing carousel keyboard patterns |
| Duplication risks | Do not create a second generic carousel without two concrete consumers; do not duplicate hero overlays |
| Expected source files | `components/m01-home/collector-hero-section.tsx`; `components/m01-home/cigar-carousel-section.tsx`; related data/assets maps under `m01-home` |
| Shared-file locks | Avoid layout shell and `globals.css` |
| Asset requirements | Approved hosts only; document deferred placeholders honestly; no temporary Figma MCP URLs in production |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | No verified mobile/tablet Figma |
| Engineering-derived responsive requirements | No document H-overflow; carousel must remain operable without requiring body scroll sideways |
| Interactions and states | Arrow controls; active vs dimmed cards; keyboard; reduced-motion; disabled/deferred CTAs remain honest |
| Accessibility requirements | Accessible names for controls; focus order; not keyboard traps |
| Security requirements | No host allowlist expansion without approval; no secrets |
| Visibility/SEO requirements | No metadata/sitemap changes |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m01-home/collector-hero.test.tsx`; `tests/m01-home/cigar-carousel-section.test.tsx`; expand keyboard/reduced-motion as needed |
| Targeted E2E tests | Foundations smoke; add focused home section assertions if valuable |
| Complete validation gates | Full gate list above |
| Required before screenshot | Collector + carousel at 1440 |
| Required after screenshot | Collector + carousel at 1440 |
| Visual comparison requirement | Compare to `15081:25289` and `13148:15033`; list differences |
| Horizontal-overflow checks | 320–1440 listed widths on `/` |
| Acceptance criteria | Desktop geometry closer to nodes; active/dimmed behavior matches Figma initial-state intent; no H-overflow |
| Explicit out-of-scope items | Roastery; Knowledge; fonts; footer; Under-21 |
| Rollback boundary | Revert V-02 PR/merge only |
| Known blockers | Permanent carousel images if still temporary; Gotham |

---

## V-03 — Over-21 Roastery + Cigar Knowledge

| Field | Content |
| --- | --- |
| Branch | `feature/m01-fidelity-roastery-knowledge` |
| Purpose | Crop, object-position, overlay, typography geometry, section spacing, and knowledge card layout for Over-21 Roastery and Cigar Knowledge |
| Route or section | `/` sections: Over-21 Roastery; Cigar Knowledge |
| Exact Figma node | `15451:37609`; `13148:15081`; knowledge cards `14585:38786`, `14585:38795`, `14585:38813` |
| Verified dimensions | Roastery directly verified in V-00 MCP: 1441 × 851. Knowledge section verified through inspected parent subtree in V-00: 1340 × 719. Card nodes present in repository documentation — re-verify all through Figma MCP at PR start |
| Six-layer impact | L4 sections; L6 image crop/object-position behavior |
| Existing components to reuse | `RoasteryHeroSection`, `CigarKnowledgeSection`, `ImagePlaceholder`, approved assets maps |
| Repository search required before new code | Search `roastery-hero*`, `cigar-knowledge*`, object-position patterns in M01, Under-21 roastery (do not mix modules) |
| Duplication risks | Do not merge Over-21 and Under-21 roastery implementations; do not invent a second knowledge card system |
| Expected source files | `components/m01-home/roastery-hero-section.tsx`; `components/m01-home/cigar-knowledge-section.tsx`; related assets/data under `m01-home` |
| Shared-file locks | None expected beyond module files |
| Asset requirements | Keep approved Roastery URL; permanent knowledge images required for fidelity claims |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | No verified mobile/tablet Figma |
| Engineering-derived responsive requirements | No document H-overflow; cards reflow without unreadable text |
| Interactions and states | Deferred CTAs remain non-fabricated; hover only where already approved patterns exist |
| Accessibility requirements | Alt text / decorative marking; heading hierarchy; focusable controls named |
| Security requirements | Approved image hosts only |
| Visibility/SEO requirements | No indexability changes |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m01-home/roastery-hero.test.tsx`; `tests/m01-home/cigar-knowledge-section.test.tsx` |
| Targeted E2E tests | Foundations smoke |
| Complete validation gates | Full gate list above |
| Required before screenshot | Roastery + Knowledge at 1440 |
| Required after screenshot | Roastery + Knowledge at 1440 |
| Visual comparison requirement | Compare to listed nodes; list differences |
| Horizontal-overflow checks | 320–1440 on `/` |
| Acceptance criteria | Crop/object-position closer to Figma; card layout improved; no H-overflow |
| Explicit out-of-scope items | Under-21 roastery (`m01-under21`); fonts; commerce destinations |
| Rollback boundary | Revert V-03 PR/merge only |
| Known blockers | Permanent knowledge images; CTA destinations; Gotham |

---

## V-04 — Gifting + Clothier

| Field | Content |
| --- | --- |
| Branch | `feature/m01-fidelity-gifting-clothier` |
| Purpose | Card sizing, image geometry, content alignment, spacing; record approved asset requirements for Gifting and Clothier |
| Route or section | `/` sections: Gifting; Clothier |
| Exact Figma node | `13148:15113`; `13148:15120`; clothier cards `16604:97181`, `16604:97239`, `16604:97240` |
| Verified dimensions | Verified through inspected parent subtree in V-00: Gifting 1338 × 696; Clothier 1340 × 708.43. Card nodes present in repository documentation — re-verify through Figma MCP at PR start |
| Six-layer impact | L4 sections; avoid premature L2/L3 product-card extraction unless a second consumer already exists |
| Existing components to reuse | `GiftingSection`, `ClothierSection`, UI Button, ImagePlaceholder |
| Repository search required before new code | Search `gifting*`, `clothier*`, any existing product-card component paths, shared-component-plan claims vs filesystem |
| Duplication risks | Do not invent global `MainProductCard` without justified repeated consumers; do not activate unimplemented `/the-house/the-clothier` |
| Expected source files | `components/m01-home/gifting-section.tsx`; `components/m01-home/clothier-section.tsx`; related data/assets |
| Shared-file locks | Avoid layout shell and globals |
| Asset requirements | Catalog/legal approval; permanent product images; no temporary Figma URLs |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | No verified mobile/tablet Figma |
| Engineering-derived responsive requirements | Card wrapping without H-overflow; touch targets remain usable |
| Interactions and states | Deferred EXPLORE destinations remain honest; swatches non-operable unless approved |
| Accessibility requirements | Product names accessible; color not sole information for swatches |
| Security requirements | No pricing authority invented; approved hosts only |
| Visibility/SEO requirements | No sitemap changes |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m01-home/gifting-section.test.tsx`; `tests/m01-home/clothier-section.test.tsx` |
| Targeted E2E tests | Foundations smoke |
| Complete validation gates | Full gate list above |
| Required before screenshot | Gifting + Clothier at 1440 |
| Required after screenshot | Gifting + Clothier at 1440 |
| Visual comparison requirement | Compare to listed nodes; list differences |
| Horizontal-overflow checks | 320–1440 on `/` |
| Acceptance criteria | Geometry closer to Figma; assets requirements documented; no H-overflow |
| Explicit out-of-scope items | Catalog/commerce backends; `/the-house/the-clothier` route activation; fonts |
| Rollback boundary | Revert V-04 PR/merge only |
| Known blockers | Catalog/legal approval; permanent images; Gotham |

---

## V-05 — Estate Collection + Store/Lounge + footer + home regression

| Field | Content |
| --- | --- |
| Branch | `feature/m01-fidelity-estate-store-footer` |
| Purpose | Estate Collection and Store/Lounge fidelity; exclusive MainFooter internal geometry; final homepage/footer integration; final desktop regression; responsive derivation; no document-level horizontal overflow |
| Route or section | `/` sections: Estate Collection; Store/Lounge; shared footer integration on homepage |
| Exact Figma node | `13148:15145`; `13148:15176`; footer `14468:34842` |
| Verified dimensions | Footer directly verified in V-00 MCP: 1440 × 697.16. Estate/Store sizes from parent subtree / docs — re-verify all through Figma MCP at PR start. Parent home 1440 × 7624.16 for regression |
| Six-layer impact | L4 Estate/Store sections; L3 MainFooter exclusive; L5 homepage integration; L6 newsletter deferred honesty |
| Existing components to reuse | `EstateCollectionSection`, `StoreLoungeSection`, `MainFooter`/`FooterSection`, carousel patterns already in M01 |
| Repository search required before new code | Search estate-collection, store-lounge, main-footer, newsletter deferred patterns, legal/social link maps |
| Duplication risks | Do not create a second footer; do not reintroduce `site-footer`; do not rebuild carousel from scratch |
| Expected source files | `components/m01-home/estate-collection-section.tsx`; `components/m01-home/store-lounge-section.tsx`; **`components/layout/main-footer.tsx` (exclusive)**; `over21-home-page.tsx` only for final integration spacing |
| Shared-file locks | **Exclusive lock on `components/layout/main-footer.tsx` for V-05** |
| Asset requirements | Deferred estate cards documented; Store destination approval; social/legal URLs approved or remain deferred honestly |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | No verified mobile/tablet Figma |
| Engineering-derived responsive requirements | No document H-overflow 320–1440; footer stacks without clipping critical legal text |
| Interactions and states | Newsletter remains UI-only/deferred unless backend exists; Ascend behavior preserved; deferred links stay honest |
| Accessibility requirements | Footer nav names; form labels; Ascend accessible name; focus order |
| Security requirements | No fabricated encryption/trust claims beyond existing approved copy; no PII logging |
| Visibility/SEO requirements | Legal routes remain unimplemented/non-indexable until later; do not invent pages |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m01-home/estate-collection-section.test.tsx`; `tests/m01-home/store-lounge-section.test.tsx`; `tests/m01-home/footer-section.test.tsx`; home age-state |
| Targeted E2E tests | Foundations; overflow checks on `/` at listed widths |
| Complete validation gates | Full gate list above |
| Required before screenshot | Estate + Store + footer + full home 1440 |
| Required after screenshot | Same surfaces + full home 1440 |
| Visual comparison requirement | Compare to listed nodes and parent height band; list differences |
| Horizontal-overflow checks | 320, 375, 390, 768, 1024, 1440 on `/` |
| Acceptance criteria | Footer internal geometry owned only here; home closer to 7624 height band; no H-overflow; newsletter honesty preserved |
| Explicit out-of-scope items | Newsletter backend; inventing legal routes; fonts; V-01 shell rework |
| Rollback boundary | Revert V-05 PR/merge only |
| Known blockers | Store destination approval; social/legal URL approval; Gotham; deferred estate imagery |

---

## V-06 — Our Story fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m02-our-story-fidelity` |
| Purpose | Existing `/our-story` hero, section geometry, media layout, typography roles, vertical rhythm, responsive derivation; preserve route policy |
| Route or section | `/our-story` |
| Exact Figma node | `15934:43007` |
| Verified dimensions | Directly verified in V-00 MCP: 1440 × 4586. Re-verify through Figma MCP at PR start |
| Six-layer impact | L4/L5 module-local Our Story; L3 shell reuse only |
| Existing components to reuse | `MainNavbar`, `MainFooter`/`FooterSection`, existing Our Story page/sections under `components/m02-our-story` |
| Repository search required before new code | Search `m02-our-story`, age wrappers, approved Our Story images, naming mismatch notes (do not rename module) |
| Duplication risks | Do not duplicate navbar/footer; do not broad-rename `m02-our-story` vs manifest `M10-legal-info` |
| Expected source files | `components/m02-our-story/**`; `app/our-story/page.tsx` only if metadata/composition requires; avoid shell files unless active-nav proof requires navbar |
| Shared-file locks | Avoid; navbar only if active-link styling proven necessary |
| Asset requirements | Keep approved hero/story images; no temporary Figma URLs |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Desktop-only Figma; engineering-derived responsive |
| Engineering-derived responsive requirements | No document H-overflow; media stacks readably on small widths |
| Interactions and states | Preserve unknown→AgeGate; under21 restricted shell; over21 full page |
| Accessibility requirements | Heading hierarchy; image alts; focusable links |
| Security requirements | Preserve age-gated policy; no policy weakening |
| Visibility/SEO requirements | Keep non-indexable unless product decides later |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m02-our-story/our-story-page-age-state.test.tsx`; add geometry assertions as needed |
| Targeted E2E tests | Add `/our-story` smoke E2E in this PR if not present |
| Complete validation gates | Full gate list above |
| Required before screenshot | `/our-story` at 1440 |
| Required after screenshot | `/our-story` at 1440 |
| Visual comparison requirement | Compare to `15934:43007`; list differences |
| Horizontal-overflow checks | 320–1440 on `/our-story` |
| Acceptance criteria | Geometry closer to Figma; age policy preserved; naming mismatch documented only |
| Explicit out-of-scope items | Module rename; indexability flip; fonts |
| Rollback boundary | Revert V-06 PR/merge only |
| Known blockers | Gotham; any remaining deferred media |

---

## V-07a — The Estate fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m03-estate-fidelity` |
| Purpose | Desktop fidelity remediation for existing `/the-estate` without activating unimplemented estate children |
| Route or section | `/the-estate` |
| Exact Figma node | `16576:98447` |
| Verified dimensions | Present in current route manifest — **not** directly inspected in V-00. Verify through Figma MCP at PR start |
| Six-layer impact | L4/L5 `m03-estate`; L3 shell reuse; L6 age-gate behavior |
| Existing components to reuse | Estate page components, MainNavbar, MainFooter, ImagePlaceholder for deferred categories |
| Repository search required before new code | Search `m03-estate`, age wrappers, deferred category markers, humidor routes (do not implement) |
| Duplication risks | Do not implement `/the-estate/the-humidor*` here; do not invent second estate shell |
| Expected source files | `components/m03-estate/**`; `app/the-estate/page.tsx` if needed |
| Shared-file locks | None expected |
| Asset requirements | Deferred category imagery documented; approved hosts only |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Assume no mobile Figma until verified at PR start |
| Engineering-derived responsive requirements | No document H-overflow; placeholders remain explicit deferred |
| Interactions and states | Preserve unknown gate / under21 block / over21 content |
| Accessibility requirements | Deferred image areas announced honestly; headings |
| Security requirements | Preserve route-access decisions |
| Visibility/SEO requirements | Keep non-indexable |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m03-estate/the-estate-page-age-state.test.tsx` |
| Targeted E2E tests | Add `/the-estate` smoke E2E |
| Complete validation gates | Full gate list above |
| Required before screenshot | `/the-estate` at 1440 |
| Required after screenshot | `/the-estate` at 1440 |
| Visual comparison requirement | Compare after MCP verification of `16576:98447` |
| Horizontal-overflow checks | 320–1440 |
| Acceptance criteria | Geometry improved; age policy preserved; children routes untouched |
| Explicit out-of-scope items | Humidor routes; roastery child route; house nested route (V-07b) |
| Rollback boundary | Revert V-07a PR/merge only |
| Known blockers | Node not MCP-verified in V-00; assets; Gotham |

---

## V-07b — The House (nested) fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m03-house-route-fidelity` |
| Purpose | Desktop fidelity for implemented `/the-estate/the-house` |
| Route or section | `/the-estate/the-house` |
| Exact Figma node | `16576:96095` |
| Verified dimensions | Present in current route manifest — **not** directly inspected in V-00. Verify through Figma MCP at PR start |
| Six-layer impact | L4/L5 `m04-house` components on nested estate route; L3 shell reuse; L6 age policy |
| Existing components to reuse | House page components, MainNavbar, MainFooter |
| Repository search required before new code | Search `m04-house`, nested page, competing `/the-house` manifest entry (do not activate) |
| Duplication risks | Do not activate top-level `/the-house`; do not duplicate house page under two routes |
| Expected source files | `components/m04-house/**`; `app/the-estate/the-house/page.tsx` |
| Shared-file locks | None expected |
| Asset requirements | Module notes; approved hosts only |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Verify at PR start; likely engineering-derived |
| Engineering-derived responsive requirements | No document H-overflow |
| Interactions and states | Preserve age-gate/block behavior |
| Accessibility requirements | Landmarks, headings, media alts |
| Security requirements | Preserve route-access |
| Visibility/SEO requirements | Keep non-indexable; do not change canonical without V-10 |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m04-house/the-house-page-age-state.test.tsx` |
| Targeted E2E tests | Add nested house smoke E2E |
| Complete validation gates | Full gate list above |
| Required before screenshot | `/the-estate/the-house` at 1440 |
| Required after screenshot | `/the-estate/the-house` at 1440 |
| Visual comparison requirement | Compare after MCP verification of `16576:96095` |
| Horizontal-overflow checks | 320–1440 |
| Acceptance criteria | Geometry improved; `/the-house` remains unimplemented |
| Explicit out-of-scope items | Top-level `/the-house` activation; clothier house child route; V-10 decisions |
| Rollback boundary | Revert V-07b PR/merge only |
| Known blockers | Node not MCP-verified in V-00; Gotham |

---

## V-07c — The Vault fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m05-vault-fidelity` |
| Purpose | Desktop fidelity for `/the-vault` |
| Route or section | `/the-vault` |
| Exact Figma node | `14240:78024` |
| Verified dimensions | Present in current route manifest; prior audit compare artifacts exist locally untracked — **not** directly inspected in V-00 MCP. Verify through Figma MCP at PR start |
| Six-layer impact | L4/L5 `m05-vault`; L3 shell; L6 age-gate |
| Existing components to reuse | Vault page components, MainNavbar, MainFooter, ImagePlaceholder |
| Repository search required before new code | Search `m05-vault`, deferred assets, age wrappers |
| Duplication risks | Do not invent second vault layout system |
| Expected source files | `components/m05-vault/**`; `app/the-vault/page.tsx` |
| Shared-file locks | None expected |
| Asset requirements | Asset-heavy; many deferred — document blockers |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Verify at PR start; likely engineering-derived |
| Engineering-derived responsive requirements | No document H-overflow; grids wrap safely |
| Interactions and states | Preserve age policy; deferred CTAs honest |
| Accessibility requirements | Media, headings, focus |
| Security requirements | Preserve route-access |
| Visibility/SEO requirements | Keep non-indexable |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m05-vault/the-vault-page-age-state.test.tsx` |
| Targeted E2E tests | Add `/the-vault` smoke E2E |
| Complete validation gates | Full gate list above |
| Required before screenshot | `/the-vault` at 1440 |
| Required after screenshot | `/the-vault` at 1440 |
| Visual comparison requirement | Compare after MCP verification of `14240:78024` |
| Horizontal-overflow checks | 320–1440 |
| Acceptance criteria | Geometry improved; deferred assets explicit; age policy preserved |
| Explicit out-of-scope items | Commerce; fonts package install |
| Rollback boundary | Revert V-07c PR/merge only |
| Known blockers | Assets; node MCP re-verify; Gotham |

---

## V-08a — Chronicle fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m08-chronicle-fidelity` |
| Purpose | Desktop fidelity for `/the-chronicle` editorial layout |
| Route or section | `/the-chronicle` |
| Exact Figma node | `14284:63187` |
| Verified dimensions | Present in current route manifest — **not** directly inspected in V-00. Verify through Figma MCP at PR start |
| Six-layer impact | L4/L5 `m08-chronicle`; L3 shell; L6 age-gate |
| Existing components to reuse | Chronicle page components; shared UI; MainNavbar/MainFooter; extract editorial card only if Pairing Guide already shares identical structure with two consumers |
| Repository search required before new code | Search `m08-chronicle`, `m08-pairing-guide` for shared card patterns before extracting |
| Duplication risks | Do not copy-paste cards blindly; do not create unused shared abstraction for one consumer |
| Expected source files | `components/m08-chronicle/**`; `app/the-chronicle/page.tsx` |
| Shared-file locks | None expected |
| Asset requirements | Editorial imagery likely deferred — document |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Verify at PR start; likely engineering-derived |
| Engineering-derived responsive requirements | No document H-overflow; card grids wrap |
| Interactions and states | Keyboard focus for cards/links; age policy preserved |
| Accessibility requirements | Link names; headings; focus order |
| Security requirements | Preserve under21 block / unknown gate |
| Visibility/SEO requirements | Keep non-indexable |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m08-chronicle/chronicle-page-age-state.test.tsx` |
| Targeted E2E tests | Add `/the-chronicle` smoke E2E |
| Complete validation gates | Full gate list above |
| Required before screenshot | `/the-chronicle` at 1440 |
| Required after screenshot | `/the-chronicle` at 1440 |
| Visual comparison requirement | Compare after MCP verification of `14284:63187` |
| Horizontal-overflow checks | 320–1440 |
| Acceptance criteria | Geometry improved; asset blockers listed; age policy preserved |
| Explicit out-of-scope items | Pairing Guide (V-08b); indexability flip |
| Rollback boundary | Revert V-08a PR/merge only |
| Known blockers | Assets; MCP re-verify; Gotham |

---

## V-08b — Pairing Guide fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m08-pairing-guide-fidelity` |
| Purpose | Desktop fidelity for `/pairing-guide` editorial layout |
| Route or section | `/pairing-guide` |
| Exact Figma node | `14406:85066` |
| Verified dimensions | Present in current route manifest — **not** directly inspected in V-00. Verify through Figma MCP at PR start |
| Six-layer impact | L4/L5 `m08-pairing-guide`; L3 shell; L6 age-gate |
| Existing components to reuse | Pairing Guide page components; MainNavbar/MainFooter; reuse Chronicle card extraction only if already justified by V-08a with two consumers |
| Repository search required before new code | Search `m08-pairing-guide`, chronicle components, shared editorial patterns |
| Duplication risks | Do not duplicate Chronicle markup; prefer reuse or keep module-local if structures differ |
| Expected source files | `components/m08-pairing-guide/**`; `app/pairing-guide/page.tsx` |
| Shared-file locks | None expected |
| Asset requirements | Editorial imagery likely deferred — document |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Verify at PR start; likely engineering-derived |
| Engineering-derived responsive requirements | No document H-overflow; readable stacking |
| Interactions and states | Keyboard requirements for interactive cards/links; age policy preserved |
| Accessibility requirements | Focus order; accessible names; headings |
| Security requirements | Preserve under21 block / unknown gate |
| Visibility/SEO requirements | Keep non-indexable; metadata unchanged unless proven wrong |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | `tests/m08-pairing-guide/pairing-guide-page-age-state.test.tsx` |
| Targeted E2E tests | Add `/pairing-guide` smoke E2E |
| Complete validation gates | Full gate list above |
| Required before screenshot | `/pairing-guide` at 1440 |
| Required after screenshot | `/pairing-guide` at 1440 |
| Visual comparison requirement | Compare after MCP verification of `14406:85066` |
| Horizontal-overflow checks | 320–1440 |
| Acceptance criteria | Geometry improved; asset blockers listed; age policy preserved |
| Explicit out-of-scope items | Chronicle (V-08a); commerce pairing purchase flows |
| Rollback boundary | Revert V-08b PR/merge only |
| Known blockers | Assets; MCP re-verify; Gotham |

---

## V-09a — Membership fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m09-membership-fidelity` |
| Purpose | Visual fidelity for `/membership` while preserving overflow lock, deferred markers, and review audience behavior |
| Route or section | `/membership` |
| Exact Figma node | `15008:38309` |
| Verified dimensions | Present in current route manifest; strong E2E overflow coverage exists — **not** directly inspected in V-00 MCP. Verify through Figma MCP at PR start |
| Six-layer impact | L4/L5 membership sections; L6 overflow lock, scroll regions, deferred states |
| Existing components to reuse | `MembershipPage`, benefits table, `MembershipDocumentOverflowLock`, MainNavbar/MainFooter |
| Repository search required before new code | Search membership overflow tests/E2E, deferred markers, tier rows |
| Duplication risks | Do not remove overflow lock; do not invent second comparison table |
| Expected source files | `components/m09-membership/**`; `app/membership/page.tsx` if needed |
| Shared-file locks | Lock against deletion of overflow lock; avoid shared shell |
| Asset requirements | Deferred tier art documented |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Engineering-derived with existing overflow protection |
| Engineering-derived responsive requirements | No document H-overflow; bounded scroll regions remain keyboard accessible |
| Interactions and states | Deferred CTAs; review audience; scroll regions |
| Accessibility requirements | Table semantics; region labels; keyboard scroll |
| Security requirements | No fabricated membership enrollment backend |
| Visibility/SEO requirements | Keep non-indexable |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | membership-page, benefits-table, overflow, overflow-lock tests |
| Targeted E2E tests | `tests/e2e/m09-membership.spec.ts` (must stay green) |
| Complete validation gates | Full gate list above |
| Required before screenshot | `/membership` at 1440 and one mobile width |
| Required after screenshot | Same |
| Visual comparison requirement | Compare after MCP verification of `15008:38309` |
| Horizontal-overflow checks | 320, 375, 390, 768, 1024, 1440 |
| Acceptance criteria | Visual closer to Figma; overflow lock preserved; honesty of deferred states preserved |
| Explicit out-of-scope items | Real membership backend; removing overflow protections |
| Rollback boundary | Revert V-09a PR/merge only |
| Known blockers | Deferred art; MCP re-verify; Gotham |

---

## V-09b — Partner + Get in Touch fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m09-partner-contact-fidelity` |
| Purpose | Visual fidelity for `/partner` and `/get-in-touch` while preserving UI-only submitted honesty |
| Route or section | `/partner`; `/get-in-touch` |
| Exact Figma node | `14670:42180`; `14644:34661` |
| Verified dimensions | Present in current route manifest; E2E exists — **not** directly inspected in V-00 MCP. Verify through Figma MCP at PR start |
| Six-layer impact | L4/L5 pages; L2 form controls; L6 UI-only success/error states |
| Existing components to reuse | Partner/Get-in-touch pages and forms, UI Input/Textarea/Button, MainNavbar/MainFooter |
| Repository search required before new code | Search partner-data honesty strings, get-in-touch submitted state, E2E honesty assertions |
| Duplication risks | Do not reintroduce false Application ID / email / SLA claims; do not duplicate form stacks unnecessarily |
| Expected source files | `components/m09-partner/**`; `components/m09-get-in-touch/**`; related app pages |
| Shared-file locks | Coordinate if touching shared form primitives; avoid shell |
| Asset requirements | Partner deferred images; Get-in-touch map deferred; hero approved where documented |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Engineering-derived; verify at PR start |
| Engineering-derived responsive requirements | Forms usable on small screens; no document H-overflow |
| Interactions and states | Validation; UI-only submitted; back-to-form; live regions truthful |
| Accessibility requirements | Labels; error association; focus on invalid; announcements |
| Security requirements | No PII logging/storage; no fetch unless real endpoint exists |
| Visibility/SEO requirements | Keep non-indexable |
| Analytics/telemetry status | N/A — do not log form payloads |
| Targeted unit/component tests | partner-form/page; get-in-touch form/page |
| Targeted E2E tests | `tests/e2e/m09-partner.spec.ts`; `tests/e2e/m09-get-in-touch.spec.ts` |
| Complete validation gates | Full gate list above |
| Required before screenshot | Both routes at 1440; submitted state shots |
| Required after screenshot | Same |
| Visual comparison requirement | Compare after MCP verification of both nodes |
| Horizontal-overflow checks | 320–1440 on both routes |
| Acceptance criteria | Visual improved; honesty regression tests still reject false backend claims |
| Explicit out-of-scope items | Real submission backends; inventing email delivery |
| Rollback boundary | Revert V-09b PR/merge only |
| Known blockers | Deferred images/map; MCP re-verify; Gotham |

Split further into two PRs if visual + form scope exceeds review capacity.

---

## V-09c — Careers family fidelity

| Field | Content |
| --- | --- |
| Branch | `feature/m09-careers-fidelity` |
| Purpose | Visual fidelity across careers landing, positions, detail, and application while preserving unsupported-slug not-found and UI-only application honesty |
| Route or section | `/careers`; `/careers/positions`; `/careers/positions/[jobId]`; `/careers/positions/[jobId]/apply` |
| Exact Figma node | `13148:15771`; `13148:15855`; `13148:15939`; `13563:29858` |
| Verified dimensions | Present in current route manifest; strong E2E suite exists — **not** directly inspected as a set in V-00 MCP. Verify each node through Figma MCP at PR start |
| Six-layer impact | L4/L5 careers modules; L2 forms; L6 search/filter deferred, UI-only apply, not-found |
| Existing components to reuse | Careers pages/forms/search, MainNavbar/MainFooter, not-found behavior |
| Repository search required before new code | Search careers visual fidelity tests, application honesty, unsupported slug handling |
| Duplication risks | Do not invent second application form stack; do not weaken unsupported slug → not-found |
| Expected source files | `components/m09-careers/**`; related `app/careers/**` pages |
| Shared-file locks | Avoid shell; avoid globals |
| Asset requirements | Landing hero approved where documented; other imagery per module notes |
| Typography blockers | Gotham missing — font-blocked |
| Responsive source status | Engineering-derived; verify at PR start |
| Engineering-derived responsive requirements | Listing/search usable on small screens; no document H-overflow |
| Interactions and states | Search; deferred filters non-operable; UI-only apply; unsupported slugs |
| Accessibility requirements | Form labels/errors; search announcements; focus management |
| Security requirements | No fabricated hiring backend success; no PII storage |
| Visibility/SEO requirements | Keep non-indexable |
| Analytics/telemetry status | N/A |
| Targeted unit/component tests | careers age-state, positions, detail, application, visual fidelity, search tests |
| Targeted E2E tests | Existing `tests/e2e/m09-careers-*.spec.ts` suite must remain green |
| Complete validation gates | Full gate list above |
| Required before screenshot | Landing + positions + one detail + apply at 1440 |
| Required after screenshot | Same |
| Visual comparison requirement | Compare after MCP verification of each careers node |
| Horizontal-overflow checks | 320–1440 on each careers route touched |
| Acceptance criteria | Visual improved; unsupported slug not-found preserved; UI-only apply preserved |
| Explicit out-of-scope items | Real ATS/backend; enabling deferred filters without product approval |
| Rollback boundary | Revert V-09c PR/merge only |
| Known blockers | MCP re-verify; Gotham; any deferred imagery |

Prefer splitting (landing first, then listing/detail/apply) if scope is too large.

---

## Post V-09 (not in this sequence)

| Item | Assign |
| --- | --- |
| Canonical `/the-house` vs nested house | V-10 route-decision |
| Auth / cart / checkout / profile / legal / press / coming-soon / humidor children | Later modules per expanded unimplemented table |
| Remaining Under-21 sections | Separate U21 fidelity series |
| Font integration | Dedicated foundations PR when licensed files arrive |
| PR #40 / `35e2bca` | CI-only reference — do **not** merge PR #40 |
