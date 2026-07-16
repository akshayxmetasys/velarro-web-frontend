# Frontend File Coverage Ledger

> Companion machine-readable ledger: `frontend-file-coverage.json`  
> Audit report: `frontend-tech-stack-validation.md`  
> Regenerator: `scripts/generate-audit-coverage.mjs`

## Review methodology

- **Handwritten runtime** (`app/`, `components/`, `lib/`): semantic review via architecture extract, security pattern scan, targeted file reads, and automated greps (`any`, `fetch`, storage, CSP, inline styles).
- **Tests**: inventory + execution of Vitest suite (pre-remediation) and Playwright `--list`.
- **Configuration / CI / lockfile**: direct review.
- **Docs**: sampled for intended-stack claims; not treated as runtime.
- **Binaries**: excluded from line-by-line review with reason.

Remediation touched: `components/age/age-state-provider.tsx`, `components/m09-partner/partner-form.tsx`, `tests/seo/robots.test.ts`, `tests/age/age-state-provider.test.tsx`, `tests/m09-partner/partner-form.test.tsx`, `README.md`, plus this `docs/audits/` set.

Generated: 2026-07-15T20:22:07.595Z
Branch: `chore-install-cursor-enterprise-engineering`
Commit: `dbfee56d159cddac9d230646d310ed05345f0a8a`
Tracked files: **309**
Manually/semantically reviewed (non-binary runtime/config/test): **217**

Coverage denominator = all git-tracked files. node_modules and .next are untracked and excluded.

## By classification

| Classification | Count |
| --- | ---: |
| handwritten | 138 |
| test | 65 |
| documentation | 60 |
| asset | 33 |
| configuration | 12 |
| generated | 1 |

## By architectural role

| Role | Count |
| --- | ---: |
| component | 99 |
| docs | 86 |
| unit-test | 56 |
| library | 21 |
| route | 18 |
| tooling | 10 |
| e2e-test | 9 |
| public-asset | 6 |
| agent-config | 2 |
| ci | 1 |
| image | 1 |

## File inventory

| Path | Type | Lines | Class | Role | Context | Reviewed | Exclusion |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| `.github/workflows/ci.yml` | .yml | 37 | configuration | ci | n/a | yes |  |
| `.gitignore` | (none) | 43 | configuration | tooling | n/a | yes |  |
| `AGENTS.md` | .md | 54 | configuration | agent-config | n/a | yes |  |
| `CLAUDE.md` | .md | 2 | configuration | agent-config | n/a | yes |  |
| `README.md` | .md | 37 | documentation | docs | n/a | yes |  |
| `app/careers/page.tsx` | .tsx | 18 | handwritten | route | server-or-shared | yes |  |
| `app/careers/positions/[jobId]/apply/page.tsx` | .tsx | 70 | handwritten | route | server-or-shared | yes |  |
| `app/careers/positions/[jobId]/page.tsx` | .tsx | 65 | handwritten | route | server-or-shared | yes |  |
| `app/careers/positions/page.tsx` | .tsx | 47 | handwritten | route | server-or-shared | yes |  |
| `app/favicon.ico` | .ico | 0 | asset | image | server-or-shared | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `app/get-in-touch/page.tsx` | .tsx | 18 | handwritten | route | server-or-shared | yes |  |
| `app/globals.css` | .css | 265 | handwritten | route | server-or-shared | yes |  |
| `app/layout.tsx` | .tsx | 45 | handwritten | route | server-or-shared | yes |  |
| `app/membership/page.tsx` | .tsx | 18 | handwritten | route | server-or-shared | yes |  |
| `app/our-story/page.tsx` | .tsx | 17 | handwritten | route | server-or-shared | yes |  |
| `app/page.tsx` | .tsx | 9 | handwritten | route | server-or-shared | yes |  |
| `app/pairing-guide/page.tsx` | .tsx | 18 | handwritten | route | server-or-shared | yes |  |
| `app/partner/page.tsx` | .tsx | 17 | handwritten | route | server-or-shared | yes |  |
| `app/robots.ts` | .ts | 15 | handwritten | route | server-or-shared | yes |  |
| `app/sitemap.ts` | .ts | 7 | handwritten | route | server-or-shared | yes |  |
| `app/the-chronicle/page.tsx` | .tsx | 18 | handwritten | route | server-or-shared | yes |  |
| `app/the-estate/page.tsx` | .tsx | 17 | handwritten | route | server-or-shared | yes |  |
| `app/the-estate/the-house/page.tsx` | .tsx | 17 | handwritten | route | server-or-shared | yes |  |
| `app/the-vault/page.tsx` | .tsx | 18 | handwritten | route | server-or-shared | yes |  |
| `components/age/age-gate.tsx` | .tsx | 102 | handwritten | component | server-component-default | yes |  |
| `components/age/age-state-provider.tsx` | .tsx | 72 | handwritten | component | client | yes |  |
| `components/layout/container.tsx` | .tsx | 27 | handwritten | component | server-component-default | yes |  |
| `components/layout/index.ts` | .ts | 13 | handwritten | component | server-component-default | yes |  |
| `components/layout/main-explore.tsx` | .tsx | 38 | handwritten | component | server-component-default | yes |  |
| `components/layout/navigation-data.ts` | .ts | 35 | handwritten | component | server-component-default | yes |  |
| `components/layout/section.tsx` | .tsx | 15 | handwritten | component | server-component-default | yes |  |
| `components/layout/site-footer.tsx` | .tsx | 28 | handwritten | component | server-component-default | yes |  |
| `components/layout/site-header.tsx` | .tsx | 28 | handwritten | component | server-component-default | yes |  |
| `components/layout/site-shell.tsx` | .tsx | 30 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/cigar-carousel-section.tsx` | .tsx | 141 | handwritten | component | client | yes |  |
| `components/m01-home/cigar-category-card.tsx` | .tsx | 88 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/cigar-knowledge-section.tsx` | .tsx | 102 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/clothier-section.tsx` | .tsx | 114 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/collector-hero-section.tsx` | .tsx | 99 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/estate-collection-section.tsx` | .tsx | 142 | handwritten | component | client | yes |  |
| `components/m01-home/footer-section.tsx` | .tsx | 346 | handwritten | component | client | yes |  |
| `components/m01-home/gifting-section.tsx` | .tsx | 69 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/home-page-by-age-state.tsx` | .tsx | 21 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/m01-section-layout.ts` | .ts | 8 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/main-menu-sidebar.tsx` | .tsx | 126 | handwritten | component | client | yes |  |
| `components/m01-home/main-navbar.tsx` | .tsx | 201 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/over21-home-page.tsx` | .tsx | 30 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/roastery-hero-section.tsx` | .tsx | 103 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/store-lounge-section.tsx` | .tsx | 57 | handwritten | component | server-component-default | yes |  |
| `components/m01-home/under21-home-shell.tsx` | .tsx | 47 | handwritten | component | server-component-default | yes |  |
| `components/m02-our-story/our-story-assets.ts` | .ts | 11 | handwritten | component | server-component-default | yes |  |
| `components/m02-our-story/our-story-data.ts` | .ts | 63 | handwritten | component | server-component-default | yes |  |
| `components/m02-our-story/our-story-page-by-age-state.tsx` | .tsx | 23 | handwritten | component | server-component-default | yes |  |
| `components/m02-our-story/our-story-page.tsx` | .tsx | 305 | handwritten | component | server-component-default | yes |  |
| `components/m03-estate/the-estate-assets.ts` | .ts | 26 | handwritten | component | server-component-default | yes |  |
| `components/m03-estate/the-estate-data.ts` | .ts | 126 | handwritten | component | server-component-default | yes |  |
| `components/m03-estate/the-estate-page-by-age-state.tsx` | .tsx | 23 | handwritten | component | server-component-default | yes |  |
| `components/m03-estate/the-estate-page.tsx` | .tsx | 335 | handwritten | component | server-component-default | yes |  |
| `components/m04-house/the-house-assets.ts` | .ts | 42 | handwritten | component | server-component-default | yes |  |
| `components/m04-house/the-house-data.ts` | .ts | 117 | handwritten | component | server-component-default | yes |  |
| `components/m04-house/the-house-page-by-age-state.tsx` | .tsx | 23 | handwritten | component | server-component-default | yes |  |
| `components/m04-house/the-house-page.tsx` | .tsx | 298 | handwritten | component | server-component-default | yes |  |
| `components/m05-vault/the-vault-assets.ts` | .ts | 13 | handwritten | component | server-component-default | yes |  |
| `components/m05-vault/the-vault-data.ts` | .ts | 69 | handwritten | component | server-component-default | yes |  |
| `components/m05-vault/the-vault-page-by-age-state.tsx` | .tsx | 23 | handwritten | component | server-component-default | yes |  |
| `components/m05-vault/the-vault-page.tsx` | .tsx | 213 | handwritten | component | server-component-default | yes |  |
| `components/m08-chronicle/chronicle-assets.ts` | .ts | 10 | handwritten | component | server-component-default | yes |  |
| `components/m08-chronicle/chronicle-data.ts` | .ts | 77 | handwritten | component | server-component-default | yes |  |
| `components/m08-chronicle/chronicle-page-by-age-state.tsx` | .tsx | 23 | handwritten | component | server-component-default | yes |  |
| `components/m08-chronicle/chronicle-page.tsx` | .tsx | 256 | handwritten | component | server-component-default | yes |  |
| `components/m08-pairing-guide/pairing-guide-assets.ts` | .ts | 10 | handwritten | component | server-component-default | yes |  |
| `components/m08-pairing-guide/pairing-guide-data.ts` | .ts | 71 | handwritten | component | server-component-default | yes |  |
| `components/m08-pairing-guide/pairing-guide-page-by-age-state.tsx` | .tsx | 23 | handwritten | component | server-component-default | yes |  |
| `components/m08-pairing-guide/pairing-guide-page.tsx` | .tsx | 261 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-assets.ts` | .ts | 10 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-data.ts` | .ts | 109 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-page-by-age-state.tsx` | .tsx | 13 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-page.tsx` | .tsx | 457 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-application-data.ts` | .ts | 288 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-application-form.tsx` | .tsx | 468 | handwritten | component | client | yes |  |
| `components/m09-careers/careers-position-application-page-by-age-state.tsx` | .tsx | 25 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-application-page.tsx` | .tsx | 143 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-application-upload-field.tsx` | .tsx | 123 | handwritten | component | client | yes |  |
| `components/m09-careers/careers-position-card.tsx` | .tsx | 55 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-detail-page-by-age-state.tsx` | .tsx | 25 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-detail-page.tsx` | .tsx | 198 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-detail-search.tsx` | .tsx | 44 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-detail-sections.tsx` | .tsx | 84 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-details-data.ts` | .ts | 172 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-position-filter-panel.tsx` | .tsx | 66 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-positions-data.ts` | .ts | 170 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-positions-page-by-age-state.tsx` | .tsx | 15 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-positions-page.tsx` | .tsx | 82 | handwritten | component | server-component-default | yes |  |
| `components/m09-careers/careers-positions-search.tsx` | .tsx | 112 | handwritten | component | client | yes |  |
| `components/m09-get-in-touch/get-in-touch-assets.ts` | .ts | 48 | handwritten | component | server-component-default | yes |  |
| `components/m09-get-in-touch/get-in-touch-data.ts` | .ts | 105 | handwritten | component | server-component-default | yes |  |
| `components/m09-get-in-touch/get-in-touch-form.tsx` | .tsx | 385 | handwritten | component | client | yes |  |
| `components/m09-get-in-touch/get-in-touch-page-by-age-state.tsx` | .tsx | 13 | handwritten | component | server-component-default | yes |  |
| `components/m09-get-in-touch/get-in-touch-page.tsx` | .tsx | 387 | handwritten | component | server-component-default | yes |  |
| `components/m09-membership/membership-assets.ts` | .ts | 68 | handwritten | component | server-component-default | yes |  |
| `components/m09-membership/membership-benefits-table.tsx` | .tsx | 148 | handwritten | component | server-component-default | yes |  |
| `components/m09-membership/membership-cta.tsx` | .tsx | 62 | handwritten | component | server-component-default | yes |  |
| `components/m09-membership/membership-data.ts` | .ts | 278 | handwritten | component | server-component-default | yes |  |
| `components/m09-membership/membership-page-by-age-state.tsx` | .tsx | 13 | handwritten | component | server-component-default | yes |  |
| `components/m09-membership/membership-page.tsx` | .tsx | 87 | handwritten | component | server-component-default | yes |  |
| `components/m09-membership/membership-tier-card.tsx` | .tsx | 106 | handwritten | component | server-component-default | yes |  |
| `components/m09-partner/partner-assets.ts` | .ts | 20 | handwritten | component | server-component-default | yes |  |
| `components/m09-partner/partner-data.ts` | .ts | 67 | handwritten | component | server-component-default | yes |  |
| `components/m09-partner/partner-form.tsx` | .tsx | 273 | handwritten | component | client | yes |  |
| `components/m09-partner/partner-page-by-age-state.tsx` | .tsx | 13 | handwritten | component | server-component-default | yes |  |
| `components/m09-partner/partner-page.tsx` | .tsx | 111 | handwritten | component | server-component-default | yes |  |
| `components/ui/accordion.tsx` | .tsx | 75 | handwritten | component | server-component-default | yes |  |
| `components/ui/button.tsx` | .tsx | 54 | handwritten | component | server-component-default | yes |  |
| `components/ui/checkbox.tsx` | .tsx | 47 | handwritten | component | server-component-default | yes |  |
| `components/ui/drawer.tsx` | .tsx | 85 | handwritten | component | client | yes |  |
| `components/ui/image-placeholder.tsx` | .tsx | 49 | handwritten | component | server-component-default | yes |  |
| `components/ui/index.ts` | .ts | 23 | handwritten | component | server-component-default | yes |  |
| `components/ui/input.tsx` | .tsx | 60 | handwritten | component | server-component-default | yes |  |
| `components/ui/progress-indicator.tsx` | .tsx | 43 | handwritten | component | server-component-default | yes |  |
| `components/ui/radio.tsx` | .tsx | 68 | handwritten | component | server-component-default | yes |  |
| `components/ui/route-backed-modal-shell.tsx` | .tsx | 98 | handwritten | component | client | yes |  |
| `components/ui/switch.tsx` | .tsx | 106 | handwritten | component | client | yes |  |
| `components/ui/textarea.tsx` | .tsx | 62 | handwritten | component | server-component-default | yes |  |
| `docs/figma/asset-inventory.json` | .json | 214 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/figma/component-inventory.json` | .json | 1649 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/figma/continuation-prompt.md` | .md | 27 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/figma/design-tokens.json` | .json | 546 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/figma/ingestion-log.md` | .md | 112 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/figma/prototype-flow-map.json` | .json | 1066 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/figma/screen-manifest.json` | .json | 4225 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/figma/screenshots/M01-home-13148-15012.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M01-home-15967-43304.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M01-home-full-13148-15012.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M02-auth-login-14991-70094.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M02-signup-14991-70051.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M03-estate-14888-53493.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M03-estate-house-tab-14670-34051.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M03-estate-pdp-14670-37727.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M03-estate-roastery-tab-15451-39198.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M03-pdp-royal-leaf-14670-37727.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M04-house-14670-40233.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M05-vault-14240-78024.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M06-cart-14670-45135.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M06-checkout-payment-15127-23850.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M06-checkout-shipping-15127-24015.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M07-deactivation-15253-40306.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M07-deactivation-chooser-15253-40306.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M07-order-detail-13148-19312.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M07-profile-13148-18311.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M07-profile-settings-14762-96902.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M07-settings-14762-96902.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M08-chronicle-14284-63187.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M08-pairing-guide-14406-85066.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M09-careers-13148-15771.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M09-membership-15008-38309.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/screenshots/M10-our-story-15934-43007.png` | .png | 0 | asset | docs | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `docs/figma/unresolved-items.md` | .md | 105 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/acceptance-criteria.md` | .md | 47 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/cursor-codex-execution-plan.md` | .md | 174 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/dual-flow-prototype-map.md` | .md | 134 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/dual-flow-route-map.json` | .json | 244 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/implementation-readiness-audit.md` | .md | 91 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/master-plan.md` | .md | 96 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/module-queue.json` | .json | 1036 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M00-hardening/discovery-implementation.md` | .md | 67 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M00-hardening/implementation-notes.md` | .md | 68 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M00-hardening/security-discovery.md` | .md | 52 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/asset-and-permanent-image-inventory.md` | .md | 116 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/asset-readiness-audit.md` | .md | 350 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/assumptions-blockers-and-unanswered-questions.md` | .md | 86 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/cigar-carousel-implementation-notes.md` | .md | 77 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/cigar-knowledge-implementation-notes.md` | .md | 39 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/clothier-implementation-notes.md` | .md | 47 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/definition-of-done.md` | .md | 67 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/estate-collection-implementation-notes.md` | .md | 51 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/figma-section-inventory.md` | .md | 130 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/first-scope-implementation-notes.md` | .md | 109 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/footer-implementation-notes.md` | .md | 90 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/gifting-implementation-notes.md` | .md | 41 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/implementation-sequence.md` | .md | 64 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/layer-by-layer-visual-specification.md` | .md | 138 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/localhost-visual-comparison-plan.md` | .md | 58 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/pr-2-scope-and-execution-plan.md` | .md | 104 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/repository-to-figma-component-mapping.md` | .md | 74 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/roastery-hero-implementation-notes.md` | .md | 31 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/security-architecture-review.md` | .md | 97 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/store-lounge-implementation-notes.md` | .md | 43 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/test-plan.md` | .md | 94 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/vishnu-required-decisions-and-assets.md` | .md | 109 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M01-home/visibility-architecture-review.md` | .md | 96 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M02-our-story/implementation-notes.md` | .md | 78 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M03-the-estate/implementation-notes.md` | .md | 84 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M04-the-house/implementation-notes.md` | .md | 90 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M05-vault/implementation-notes.md` | .md | 142 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M08-chronicle/implementation-notes.md` | .md | 123 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M08-pairing-guide/implementation-notes.md` | .md | 109 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M09-careers/careers-position-application-implementation-notes.md` | .md | 79 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M09-careers/careers-position-detail-implementation-notes.md` | .md | 77 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M09-careers/careers-positions-implementation-notes.md` | .md | 98 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M09-careers/implementation-notes.md` | .md | 124 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M09-get-in-touch/implementation-notes.md` | .md | 135 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M09-membership/implementation-notes.md` | .md | 145 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/M09-partner/implementation-notes.md` | .md | 155 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/modules/_template/figma-spec-template.md` | .md | 139 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/repository-assessment.md` | .md | 109 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/route-map.json` | .json | 681 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/shared-component-plan.json` | .json | 288 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `docs/implementation/testing-plan.md` | .md | 52 | documentation | docs | n/a | no | Historical/planning documentation — sampled for intended stack claims; not production runtime |
| `eslint.config.mjs` | .mjs | 19 | configuration | tooling | n/a | yes |  |
| `lib/a11y/focus-trap.ts` | .ts | 56 | handwritten | library | server-or-shared | yes |  |
| `lib/a11y/use-overlay-focus-lock.ts` | .ts | 111 | handwritten | library | client | yes |  |
| `lib/age/age-actions.ts` | .ts | 25 | handwritten | library | server | yes |  |
| `lib/age/age-cookie.ts` | .ts | 38 | handwritten | library | server-or-shared | yes |  |
| `lib/age/age-state.ts` | .ts | 19 | handwritten | library | server-or-shared | yes |  |
| `lib/age/get-initial-age-state.ts` | .ts | 14 | handwritten | library | server-or-shared | yes |  |
| `lib/age/route-access.ts` | .ts | 143 | handwritten | library | server-or-shared | yes |  |
| `lib/assets/approved-image-hosts.ts` | .ts | 86 | handwritten | library | server-or-shared | yes |  |
| `lib/cn.ts` | .ts | 6 | handwritten | library | server-or-shared | yes |  |
| `lib/m01-home/cigar-carousel-data.ts` | .ts | 61 | handwritten | library | server-or-shared | yes |  |
| `lib/m01-home/cigar-knowledge-data.ts` | .ts | 50 | handwritten | library | server-or-shared | yes |  |
| `lib/m01-home/clothier-data.ts` | .ts | 67 | handwritten | library | server-or-shared | yes |  |
| `lib/m01-home/estate-collection-data.ts` | .ts | 69 | handwritten | library | server-or-shared | yes |  |
| `lib/security/content-security-policy.ts` | .ts | 68 | handwritten | library | server-or-shared | yes |  |
| `lib/security/cookie-options.ts` | .ts | 22 | handwritten | library | server-or-shared | yes |  |
| `lib/security/headers.ts` | .ts | 63 | handwritten | library | server-or-shared | yes |  |
| `lib/seo/discovery-manifest.ts` | .ts | 26 | handwritten | library | server-or-shared | yes |  |
| `lib/seo/indexability.ts` | .ts | 38 | handwritten | library | server-or-shared | yes |  |
| `lib/seo/metadata.ts` | .ts | 38 | handwritten | library | server-or-shared | yes |  |
| `lib/seo/route-manifest.ts` | .ts | 363 | handwritten | library | server-or-shared | yes |  |
| `lib/seo/schema.ts` | .ts | 191 | handwritten | library | server-or-shared | yes |  |
| `next.config.ts` | .ts | 34 | configuration | tooling | n/a | yes |  |
| `package-lock.json` | .json | 9258 | generated | tooling | n/a | yes |  |
| `package.json` | .json | 43 | configuration | tooling | n/a | yes |  |
| `playwright.config.ts` | .ts | 26 | configuration | tooling | n/a | yes |  |
| `postcss.config.mjs` | .mjs | 8 | configuration | tooling | n/a | yes |  |
| `public/file.svg` | .svg | 1 | asset | public-asset | n/a | no |  |
| `public/globe.svg` | .svg | 1 | asset | public-asset | n/a | no |  |
| `public/images/m01-home/store-lounge-background.png` | .png | 0 | asset | public-asset | n/a | no | Binary asset — size/naming/privacy reviewed at inventory level; no line-by-line semantic review |
| `public/next.svg` | .svg | 1 | asset | public-asset | n/a | no |  |
| `public/vercel.svg` | .svg | 1 | asset | public-asset | n/a | no |  |
| `public/window.svg` | .svg | 1 | asset | public-asset | n/a | no |  |
| `tests/age/age-gate.test.tsx` | .tsx | 71 | test | unit-test | n/a | yes |  |
| `tests/age/age-state.test.ts` | .ts | 38 | test | unit-test | n/a | yes |  |
| `tests/assets/approved-image-hosts.test.ts` | .ts | 256 | test | unit-test | n/a | yes |  |
| `tests/config/next-image-config.test.ts` | .ts | 19 | test | unit-test | n/a | yes |  |
| `tests/e2e/foundations.spec.ts` | .ts | 13 | test | e2e-test | n/a | yes |  |
| `tests/e2e/m09-careers-hero.spec.ts` | .ts | 84 | test | e2e-test | n/a | yes |  |
| `tests/e2e/m09-careers-position-application.spec.ts` | .ts | 130 | test | e2e-test | n/a | yes |  |
| `tests/e2e/m09-careers-position-detail.spec.ts` | .ts | 97 | test | e2e-test | n/a | yes |  |
| `tests/e2e/m09-careers-positions.spec.ts` | .ts | 120 | test | e2e-test | n/a | yes |  |
| `tests/e2e/m09-get-in-touch.spec.ts` | .ts | 81 | test | e2e-test | n/a | yes |  |
| `tests/e2e/m09-membership.spec.ts` | .ts | 85 | test | e2e-test | n/a | yes |  |
| `tests/e2e/m09-partner.spec.ts` | .ts | 55 | test | e2e-test | n/a | yes |  |
| `tests/e2e/security-headers.spec.ts` | .ts | 17 | test | e2e-test | n/a | yes |  |
| `tests/layout/navigation-data.test.ts` | .ts | 32 | test | unit-test | n/a | yes |  |
| `tests/layout/site-shell.test.tsx` | .tsx | 18 | test | unit-test | n/a | yes |  |
| `tests/m01-home/cigar-carousel-section.test.tsx` | .tsx | 249 | test | unit-test | n/a | yes |  |
| `tests/m01-home/cigar-knowledge-section.test.tsx` | .tsx | 154 | test | unit-test | n/a | yes |  |
| `tests/m01-home/clothier-section.test.tsx` | .tsx | 141 | test | unit-test | n/a | yes |  |
| `tests/m01-home/collector-hero.test.tsx` | .tsx | 49 | test | unit-test | n/a | yes |  |
| `tests/m01-home/estate-collection-section.test.tsx` | .tsx | 226 | test | unit-test | n/a | yes |  |
| `tests/m01-home/footer-section.test.tsx` | .tsx | 228 | test | unit-test | n/a | yes |  |
| `tests/m01-home/gifting-section.test.tsx` | .tsx | 98 | test | unit-test | n/a | yes |  |
| `tests/m01-home/home-page-age-state.test.tsx` | .tsx | 411 | test | unit-test | n/a | yes |  |
| `tests/m01-home/m01-section-layout.test.ts` | .ts | 17 | test | unit-test | n/a | yes |  |
| `tests/m01-home/main-navbar.test.tsx` | .tsx | 166 | test | unit-test | n/a | yes |  |
| `tests/m01-home/roastery-hero.test.tsx` | .tsx | 66 | test | unit-test | n/a | yes |  |
| `tests/m01-home/store-lounge-section.test.tsx` | .tsx | 126 | test | unit-test | n/a | yes |  |
| `tests/m02-our-story/our-story-page-age-state.test.tsx` | .tsx | 202 | test | unit-test | n/a | yes |  |
| `tests/m03-estate/the-estate-page-age-state.test.tsx` | .tsx | 192 | test | unit-test | n/a | yes |  |
| `tests/m04-house/the-house-page-age-state.test.tsx` | .tsx | 214 | test | unit-test | n/a | yes |  |
| `tests/m05-vault/the-vault-page-age-state.test.tsx` | .tsx | 429 | test | unit-test | n/a | yes |  |
| `tests/m08-chronicle/chronicle-page-age-state.test.tsx` | .tsx | 347 | test | unit-test | n/a | yes |  |
| `tests/m08-pairing-guide/pairing-guide-page-age-state.test.tsx` | .tsx | 385 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-page-age-state.test.tsx` | .tsx | 366 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-position-application-data.test.ts` | .ts | 130 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-position-application-form.test.tsx` | .tsx | 136 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-position-application-page.test.tsx` | .tsx | 209 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-position-detail-data.test.ts` | .ts | 52 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-position-detail-page.test.tsx` | .tsx | 253 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-positions-page.test.tsx` | .tsx | 219 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-positions-search.test.tsx` | .tsx | 114 | test | unit-test | n/a | yes |  |
| `tests/m09-careers/careers-visual-fidelity.test.tsx` | .tsx | 148 | test | unit-test | n/a | yes |  |
| `tests/m09-get-in-touch/get-in-touch-form.test.tsx` | .tsx | 119 | test | unit-test | n/a | yes |  |
| `tests/m09-get-in-touch/get-in-touch-page.test.tsx` | .tsx | 264 | test | unit-test | n/a | yes |  |
| `tests/m09-membership/membership-benefits-table.test.tsx` | .tsx | 57 | test | unit-test | n/a | yes |  |
| `tests/m09-membership/membership-page.test.tsx` | .tsx | 269 | test | unit-test | n/a | yes |  |
| `tests/m09-partner/partner-form.test.tsx` | .tsx | 105 | test | unit-test | n/a | yes |  |
| `tests/m09-partner/partner-page.test.tsx` | .tsx | 186 | test | unit-test | n/a | yes |  |
| `tests/routes/route-access.test.ts` | .ts | 133 | test | unit-test | n/a | yes |  |
| `tests/security/csp.test.ts` | .ts | 34 | test | unit-test | n/a | yes |  |
| `tests/security/headers.test.ts` | .ts | 47 | test | unit-test | n/a | yes |  |
| `tests/seo/metadata.test.ts` | .ts | 24 | test | unit-test | n/a | yes |  |
| `tests/seo/robots.test.ts` | .ts | 17 | test | unit-test | n/a | yes |  |
| `tests/seo/route-manifest.test.ts` | .ts | 201 | test | unit-test | n/a | yes |  |
| `tests/seo/schema.test.ts` | .ts | 71 | test | unit-test | n/a | yes |  |
| `tests/seo/sitemap.test.ts` | .ts | 26 | test | unit-test | n/a | yes |  |
| `tests/ui/accordion.test.tsx` | .tsx | 33 | test | unit-test | n/a | yes |  |
| `tests/ui/button.test.tsx` | .tsx | 37 | test | unit-test | n/a | yes |  |
| `tests/ui/drawer.test.tsx` | .tsx | 136 | test | unit-test | n/a | yes |  |
| `tests/ui/image-placeholder.test.tsx` | .tsx | 24 | test | unit-test | n/a | yes |  |
| `tests/ui/input.test.tsx` | .tsx | 44 | test | unit-test | n/a | yes |  |
| `tests/ui/progress-indicator.test.tsx` | .tsx | 15 | test | unit-test | n/a | yes |  |
| `tests/ui/route-backed-modal-shell.test.tsx` | .tsx | 128 | test | unit-test | n/a | yes |  |
| `tests/ui/switch.test.tsx` | .tsx | 74 | test | unit-test | n/a | yes |  |
| `tests/ui/textarea.test.tsx` | .tsx | 44 | test | unit-test | n/a | yes |  |
| `tsconfig.json` | .json | 35 | configuration | tooling | n/a | yes |  |
| `vitest.config.ts` | .ts | 19 | configuration | tooling | n/a | yes |  |
| `vitest.setup.ts` | .ts | 12 | configuration | tooling | n/a | yes |  |
