# Frontend Stack Matrix

Generated during the 2026-07-15 forensic audit of `velarro-web-frontend`.

| Capability | Declared / Intended | Installed | Imported | Configured | Executed | Tested | Verdict | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Framework | Next.js App Router | next@16.2.10 | yes | `next.config.ts` | yes | CI build + unit | **Match** | `package.json`, `app/**` |
| React | React 19 | react@19.2.4 / react-dom@19.2.4 | yes | — | yes | Vitest RTL | **Match** | `npm ls` |
| Routing | App Router | App Router only | yes | no Pages Router | yes | route tests | **Match** | no `pages/` |
| Rendering | Hybrid SSR + client islands | SSR pages + `"use client"` islands | yes | cookies() request-time | yes | age-state tests | **Match / hybrid** | every `page.tsx` async server |
| TypeScript | strict | typescript@5.9.3 | yes | `strict: true`, `allowJs: true`, `skipLibCheck: true` | yes | build | **Match with caveats** | `tsconfig.json` |
| Styling | Tailwind v4 + tokens | tailwindcss@4.3.2 | yes | `@theme` in `globals.css` | yes | visual modules | **Match** | `postcss.config.mjs` |
| Design tokens | Figma → CSS variables | present | yes | `app/globals.css` | yes | layout tests | **Match** | master-plan |
| State | Local + age cookie | no Redux/Zustand | yes | server cookie + useState | yes | age tests | **Match for current scope** | no store libs |
| Data access | Static module data; later services | no axios/fetch client | n/a | no API routes | server action only | form no-network tests | **Partial / intentional** | no runtime fetch |
| Forms | Standards suggest RHF+Zod | none installed | custom validation | local state | yes | form tests | **Partial vs attached standards** | custom OK for scope |
| Auth | M02 planned | none | deferred UI | manifest stubs | no | deferred labels | **Not implemented** | route-manifest |
| Cart/Checkout | M06 planned | none | deferred | manifest stubs | no | n/a | **Not implemented** | route-manifest |
| Testing | Vitest + RTL + Playwright | vitest@3.2.6, Playwright@1.61.1 | yes | vitest/playwright configs | unit yes; e2e list in CI | yes | **Match** | `package.json`, CI |
| Lint | ESLint flat + next | eslint@9.39.4 | yes | `eslint.config.mjs` | yes | CI | **Match** | scripts.lint |
| Format | Prettier (standards doc) | **not present** | no | no | no | no | **Mismatch** | no prettier config |
| Security headers | CSP + hardened headers | custom lib | yes | `next.config.ts` headers() | yes | unit + e2e | **Match** | `lib/security/*` |
| Images | Approved Supabase host only | next/image remotePatterns | yes | host allowlist | yes | asset tests | **Match** | `approved-image-hosts.ts` |
| SEO | metadata, robots, sitemap, schema | helpers present | metadata/robots/sitemap yes; schema unused | yes | yes | seo tests | **Partial** | schema unused |
| Observability | not declared | none | no | no | no | no | **Not implemented** | no Sentry/etc |
| Deployment | Vercel | inferred | CI on GitHub Actions | next build | build verified | CI | **Intended Match** | master-plan, `.github/workflows/ci.yml` |
| Fonts | Gotham target; interim fallback + Noto | next/font Noto_Sans | yes | CSS vars | yes | layout | **Partial** | Gotham files pending |

## Package manager

| Item | Value |
| --- | --- |
| Manager | npm |
| Lockfile | `package-lock.json` |
| Node (local audit) | v22.16.0 |
| CI Node | 22 |

## Attached Frontend Coding Standards fit

The attached standards assume a generic `src/` + services + RHF/Zod + Prettier ecommerce app. Velarro’s actual architecture is module-foldered Next App Router with static content modules, age gating, and deferred backends. Standards apply as a baseline quality bar; mechanical folder rename to `src/components/common` would be harmful without benefit.
