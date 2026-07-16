# Velarro Estate — Web Frontend

Private Next.js App Router frontend for [Velarro Estate](https://velarroestate.com).

## Stack (verified)

| Layer | Technology |
| --- | --- |
| Framework | Next.js **16.2.10** (App Router, Turbopack) |
| UI | React **19.2.4**, Server Components by default |
| Language | TypeScript **5.9** (`strict: true`) |
| Styling | Tailwind CSS **v4** + design tokens in `app/globals.css` |
| Unit tests | Vitest **3** + Testing Library |
| E2E | Playwright **1.61** (Chromium) |
| Package manager | npm (`package-lock.json`) |

There is **no** Redux/Zustand store, no Axios/`fetch` API layer, no React Hook Form/Zod, and no auth/cart/checkout implementation yet. Content is static module data; age state uses an httpOnly cookie via a server action.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run test
npm run build
npm run start
npm run test:e2e -- --list
```

CI (`.github/workflows/ci.yml`) runs lint → unit tests → production build → Playwright `--list`.

## Repository layout

```text
app/           App Router pages, layout, robots, sitemap
components/    UI primitives, layout, age gate, M0x feature modules
lib/           Age, SEO, security, a11y, assets helpers
tests/         Vitest unit/component tests + Playwright e2e
docs/          Implementation notes and audits
```

## Engineering guardrails

See `AGENTS.md`. Do not write production UI until the user provides:

`START VELARRO IMPLEMENTATION`

## Audit artifacts

Latest forensic tech-stack validation lives under `docs/audits/`.
