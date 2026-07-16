# V-00 → V-09 Shared-File Lock Forecast

| Field | Value |
| --- | --- |
| Baseline | `3f40c01f441455a3e0a3875da4187e8e0ad35bc6` |
| Purpose | Prevent parallel edit conflicts while Vishnu executes V-01–V-09 |
| Rule | Prefer module-local edits; touch shared files only when geometry cannot be fixed locally |

## Lock policy

| Risk | Policy |
| --- | --- |
| High | Exclusive lock — only one open PR may modify the file |
| Medium | Coordinate; prefer sequential merges |
| Low / avoidable | Prefer not to edit; document alternative |

---

## Forecast table

| File / area | Layer | Default owner | Likely V-PR | Why edit might happen | Required? | Conflict risk | Lock | Test impact | Review | Safer alternative |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `app/globals.css` | L1 | Foundations | Rare; maybe V-01 if token gap | New repeated Figma value | Avoid | High | **Lock if edited** | design-tokens tests | Architecture + a11y | Keep section-local arbitrary values when one-off |
| `app/layout.tsx` | L5/L1 fonts | Foundations | Font PR only (post V-09) | Font wiring | Avoid in V-01–V-09 | High | Lock | layout/font tests | Security + perf | Do not load unlicensed fonts |
| `app/page.tsx` | L5 | M01 | Avoid | Age wiring already correct | Avoid | Medium | Avoid | home age-state | — | Change composition in `Over21HomePage` / U21 page |
| `components/layout/main-navbar.tsx` | L3 | Shared shell | V-01 (spacing); V-06 only if active link | Header placement / rhythm | Possible V-01 | **High** | **Lock during V-01** | `main-navbar.test.tsx` | A11y focus | Prefer CSS on page wrapper first |
| `components/layout/main-footer.tsx` | L3 | Shared shell | **V-05 only** | Internal footer grid, newsletter geometry, footer typography geometry, footer spacing, links layout, final footer height, homepage/footer integration | **Required for V-05; forbidden for V-01** | **High** | **Exclusive lock during V-05** | footer unit + home E2E | A11y + legal claims | V-01 may only adjust homepage composition spacing **around** the footer; must not edit this file |
| `components/layout/main-menu-sidebar.tsx` | L3 | Shared shell | Avoid unless V-01 keyboard | Menu geometry | Avoid | Medium | Coordinate | navbar/drawer tests | A11y | Leave deferred controls as-is |
| `components/layout/index.ts` | L3 | Shared shell | Avoid | Export churn | Avoid | Low | Avoid | import paths | — | Don’t add barrels casually |
| `components/layout/site-header.tsx` / `site-footer.tsx` | L3 scaffolds | Shared | **Never for fidelity** | Temptation to dual-shell | Forbidden | High | N/A | — | Architecture | Keep unused; do not wire |
| `components/m01-under21/*` | L4/L5 | U21 | Outside V-01–V-09 primary | U21 fidelity later | Avoid | Medium | Separate series | under21 tests | Age policy | Don’t mix into Over-21 PRs |
| `lib/seo/route-manifest.ts` | L6/SEO | SEO | Avoid in fidelity PRs | Indexability / node IDs | Avoid | High | Lock if must | route-manifest + sitemap tests | Visibility | V-10 for canonical decisions |
| `lib/age/route-access.ts` | L6 | Age policy | Avoid | Policy changes | Avoid | **High** | Lock | route-access tests | Security + product | Fidelity must not change decisions |
| `lib/age/**` | L6 | Age | Avoid | Cookie/state | Avoid | High | Lock | age tests | Security | — |
| `lib/assets/approved-image-hosts.ts` | L1/assets | Assets | Only when new host approved | Host allowlist | Rare | Medium | Coordinate | approved-image-hosts + CSP | Security | Prefer existing Supabase host |
| `next.config.ts` | Config | Platform | Avoid | Images/headers | Avoid | High | Lock | next-image-config | Security | — |
| `package.json` / lockfile | Supply chain | Platform | **Forbidden** in V-series fidelity | Deps | Forbidden | Critical | N/A | — | — | Separate chore PR only |
| `docs/figma/design-tokens.json` | L1 docs | Design ops | Avoid | Token doc drift | Avoid | Medium | Coordinate | — | — | Code tokens in `globals.css` are runtime SoT |
| Route unit tests under `tests/m0*` | Tests | Module owners | Matching V-PR | Assert geometry/honesty | Required with code | Low | Per-PR | Self | — | — |
| SEO tests `tests/seo/**` | Tests | SEO | Avoid | Manifest churn | Avoid | Medium | — | — | — | Don’t change unless manifest changes |
| Age tests `tests/age/**` / route-access | Tests | Age | Avoid | Policy | Avoid | High | — | — | — | — |
| Shared nav E2E (foundations/security) | E2E | Platform | Every V-PR smoke | Regressions | Run | Low | — | — | — | Keep green |
| `app/error.tsx` / `app/not-found.tsx` | L5/L6 | Foundations | Avoid | Branding | Avoid | Low | — | app tests | — | Preserve M00.5 behavior |
| Partner/get-in-touch form data honesty strings | L6 | M09 | V-09b visual only | Copy temptation | Preserve | High if edited | Coordinate | partner E2E/unit | Trust | Never reintroduce false backend claims |
| Membership overflow lock | L6 | M09 | V-09a preserve | Overflow regression | Preserve | High if removed | Lock against deletion | membership E2E | A11y | Keep |

---

## V-01 vs V-05 footer ownership (mandatory)

| Concern | V-01 | V-05 |
| --- | --- | --- |
| Homepage container / shell placement / section rhythm / spacing **before** footer | Owns | Consumes result |
| Page-height baseline / horizontal-overflow baseline | Owns | Re-measures after footer work |
| `components/layout/main-footer.tsx` | **Must not modify** | **Exclusive owner** |
| Internal footer grid, newsletter, footer type geometry, footer links, final footer height | Out of scope | Owns |
| Homepage composition spacing around `<FooterSection />` | Allowed in `over21-home-page.tsx` only | Final integration in V-05 |

This separation prevents repeated footer implementation and reduces PR churn.

## Recommended serialization

1. **V-01** may briefly lock navbar (if needed). **Must not** lock or edit `main-footer.tsx`. Merge before other homepage section PRs touch shell.
2. Homepage section PRs **V-02–V-04** should avoid layout shell entirely (including footer).
3. **V-05** takes the **exclusive** lock on `main-footer.tsx` until merged.
4. **V-06–V-09** stay module-local; do not open parallel PRs that edit the same shared shell file.
5. Never open fidelity PRs that also touch `package.json`, CSP, or Cursor hooks.

---

## Parallelism note

Anisha remains paused. If parallelism resumes later, this forecast is the conflict map; Under-21 work must not edit Over-21 section files and vice versa unless consuming shared L2/L3 only.
