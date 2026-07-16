# Frontend Stack Matrix

Generated: 2026-07-15  
Repository: `velarro-web-frontend`  
Branch: `chore-install-cursor-enterprise-engineering`  
Starting commit: `dbfee56d159cddac9d230646d310ed05345f0a8a`

Status values: **Declared** · **Installed** · **Imported** · **Configured** · **Executed** · **Tested** · **Recommended**

| Capability | Declared | Installed | Imported | Configured | Executed | Tested | Recommended status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Next.js App Router | README (stale) + AGENTS.md + docs | next@16.2.10 | `app/**`, `next/image`, `next/font`, `next/headers` | `next.config.ts` | `npm run build` succeeded | CI + Vitest route/SEO tests | **Match — keep** | Build route table lists 15 app routes; no `pages/` |
| React 19 RSC default | Docs + package.json | react@19.2.4, react-dom@19.2.4 | All components | N/A | Build/runtime | Component tests | **Match — keep** | 14 `"use client"` files; default server components |
| TypeScript strict | Standards + tsconfig | typescript@5.9.3 | All `.ts`/`.tsx` | `strict: true`, `allowJs: true`, `skipLibCheck: true` | `next build` typecheck PASS; standalone `tsc` had robots test typing issue (fixed) | Unit tests | **Match — keep** | `tsconfig.json`; zero `: any` / `@ts-ignore` in source |
| Tailwind CSS v4 | Standards say Tailwind | tailwindcss@4.3.2, `@tailwindcss/postcss` | `app/globals.css` `@import "tailwindcss"` | `postcss.config.mjs` CSS-first (no `tailwind.config`) | Build | Visual/component tests | **Match — keep** | Tokens in `globals.css` `@theme` |
| Design tokens | Project rules / Figma | CSS variables in globals | Widespread `var(--*)` classes | `app/globals.css` | Runtime | Section tests | **Partial** | Some hardcoded hex/rgba/px remain in heroes/forms |
| Vitest + RTL | Docs testing plan | vitest@3.2.6, Testing Library | `tests/**/*.test.*` | `vitest.config.ts` | `npm run test` → 360 passed | Self | **Match — keep** | 56 test files |
| Playwright E2E | Docs | @playwright/test@1.61.1 | `tests/e2e/*.spec.ts` | `playwright.config.ts` | `--list` → 11 tests; CI lists only | Partial (list in CI, not full run) | **Partial — run full e2e in CI when stable** | Chromium only |
| ESLint flat | Standards | eslint@9.39.4, eslint-config-next@16.2.10 | Config imports | `eslint.config.mjs` | `npm run lint` PASS | CI | **Match — keep** | core-web-vitals + typescript |
| Prettier | Coding standards §9 | **Not installed** | None | None | N/A | N/A | **Gap — add pinned Prettier + format script** | No prettier config/dependency |
| Redux/Zustand | Standards allow when shared | **Not installed** | None | N/A | N/A | N/A | **N/A — local state + cookie sufficient today** | package.json deps |
| React Context | Implied for shared UI | Built-in | `AgeStateProvider` | N/A | Provider unused in tree | New provider test | **Partial — unused provider** | Only age context; not mounted in layout |
| Services / API layer | Standards §6 | None | No `fetch`/`axios` in app | N/A | N/A | Forms assert no network | **N/A until backends** | Static `*-data.ts` modules |
| React Hook Form / Zod | Standards §11 | **Not installed** | None | N/A | Custom validators | Form tests | **Partial — custom OK for UI-only; adopt Zod at API boundary** | get-in-touch/partner/careers forms |
| Auth (NextAuth etc.) | Route manifest M02 | **Not installed** | Deferred Login control | N/A | N/A | N/A | **Not implemented — correct** | `implemented: false` routes |
| Cart/checkout | Route manifest M06 | None | Deferred Cart control | Route-access prefixes | N/A | Route-access tests | **Not implemented — correct** | No money/cart logic |
| Security headers / CSP | Security skill + docs | Custom `lib/security/*` | `next.config.ts` headers() | CSP builder + HSTS flag | E2E security-headers | `tests/security/*` | **Match — keep** | production CSP has `'unsafe-inline'` scripts |
| SEO metadata / sitemap | Visibility skill | Custom `lib/seo/*` | Pages + `robots.ts`/`sitemap.ts` | Route manifest | Build emits robots/sitemap | `tests/seo/*` | **Partial — schema builders unused on pages** | Only `/` indexable |
| Observability | Implied production | None | No Sentry/analytics | N/A | N/A | N/A | **Gap — add when approved** | No client telemetry |
| Deployment | create-next-app README Vercel | Node 22 CI / Node 24 local | N/A | GitHub Actions CI | `next build` | CI workflow | **Partial — hosting env not locked** | No vercel.json; HSTS opt-in |
| Age gating | Domain docs | Cookie + server action | AgeGate + RSC branching | httpOnly cookie options | Manual/unit | Age tests | **Match for review build** | Not legal authorization; no middleware |
| Image CDN | Asset docs | next/image remotePatterns | Approved host helper | Supabase public path only | Build | `approved-image-hosts` tests | **Match — keep** | `lpnrhpvmrnoqkzoxukov.supabase.co` |

## Intended vs actual summary

| Category | Intended / Declared | Actually Implemented | Verdict |
| --- | --- | --- | --- |
| Framework | Next.js App Router | Next.js 16.2.10 App Router at repo root | **Match** |
| Rendering | RSC + selective client | RSC-first; 14 client islands; cookie-dynamic pages | **Match** |
| Type system | Strict TypeScript, no `any` | Strict; zero `any`/`@ts-ignore` in source | **Match** |
| Styling | Tailwind + tokens | Tailwind v4 + tokens; some inline/hardcoded | **Partial** |
| State | Local vs shared appropriately | Local + server cookie; unused client age provider | **Partial** |
| Data access | Services layer | Static data modules; no HTTP client | **N/A (no APIs)** |
| Forms | RHF + Zod recommended | Custom validation; UI-only submit | **Partial** |
| Authentication | Planned M02 | Not implemented | **Not applicable yet** |
| Testing | Unit + E2E | Strong unit; E2E listed not fully CI-enforced | **Partial** |
| Accessibility | WCAG-oriented | Semantic forms/overlays; gaps remain | **Partial** |
| Performance | Controlled client surface | Thin client; dynamic cookie pages | **Acceptable for stage** |
| Security | Headers/CSP/no secrets | Strong foundations; CSP unsafe-inline; review-copy risk | **Partial** |
| Deployment | Node CI build | CI validate; hosting TBD | **Partial** |
| Observability | Unspecified | None | **Gap** |
| SEO | Manifest-driven | Manifest + robots/sitemap; JSON-LD unwired | **Partial** |
