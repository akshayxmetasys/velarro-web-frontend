# Frontend Architecture

Evidence-backed architecture of `velarro-web-frontend` as of the 2026-07-15 forensic audit.

## High-level modules

```mermaid
flowchart TB
  subgraph appLayer [App Router]
    Pages["app/**/page.tsx<br/>Server Components"]
    Layout["app/layout.tsx<br/>metadata + fonts + skip link"]
    Robots["app/robots.ts"]
    Sitemap["app/sitemap.ts"]
  end

  subgraph ageLayer [Age access]
    Cookies["next/headers cookies"]
    GetAge["getInitialAgeStateFromCookies"]
    Action["confirmAgeStateAction<br/>HttpOnly cookie"]
    Policy["getRouteAccess policy table"]
    Boundary["AgeAccessBoundary"]
    Gate["AgeGate"]
    U21["Under21HomeShell"]
  end

  subgraph uiLayer [UI]
    Modules["components/m0x-* module pages"]
    SharedUI["components/ui primitives"]
    ClientIslands["client islands: forms, drawers, carousels"]
  end

  subgraph crossCutting [Cross-cutting]
    Security["lib/security headers + CSP"]
    SEO["lib/seo metadata + discovery"]
    Assets["lib/assets approved hosts"]
  end

  Layout --> Pages
  Pages --> GetAge
  GetAge --> Cookies
  Pages --> Boundary
  Boundary --> Policy
  Boundary -->|gate| Gate
  Boundary -->|block| U21
  Boundary -->|allow/review| Modules
  Gate --> Action
  Modules --> SharedUI
  Modules --> ClientIslands
  Security --> Layout
  SEO --> Pages
  Assets --> Modules
  Robots --> SEO
  Sitemap --> SEO
```

## Route to data flow

```mermaid
flowchart LR
  Request["HTTP request"] --> Page["Server page.tsx"]
  Page --> Age["Read velarro_age_state"]
  Age --> Boundary["AgeAccessBoundary + getRouteAccess"]
  Boundary -->|"gate"| GateUI["AgeGate SSR HTML"]
  Boundary -->|"block"| U21UI["Under-21 shell"]
  Boundary -->|"allow/review"| Content["Module page content<br/>static TS data modules"]
  GateUI --> Submit["Server action confirmAgeStateAction"]
  Submit --> CookieSet["Set HttpOnly cookie"]
  CookieSet --> Revalidate["revalidatePath('/')"]
```

There is **no** runtime `fetch`/axios product API layer. Catalog, careers, and editorial copy are static TypeScript modules.

Middleware is intentionally deferred until protected API/commerce mutations exist; UI age presentation is centralized via `AgeAccessBoundary`.


## State ownership

```mermaid
flowchart TB
  ServerCookie["Server HttpOnly age cookie<br/>source of truth"] --> SSR["SSR page branch"]
  LocalUI["React useState<br/>forms, drawers, carousels"] --> ClientOnly["Client islands only"]
  URLState["searchParams on careers positions"] --> Filter["In-memory filter"]
  Unused["AgeStateProvider<br/>REMOVED in remediation"] -.->|"was unused"| Dead["document.cookie path eliminated"]
```

## API request path

```mermaid
flowchart LR
  Forms["Contact / Partner / Careers forms"] --> Validate["Local validation"]
  Validate --> UIOnly["UI success / deferred status"]
  UIOnly --> NoNet["No network submission"]
  AgeGate["AgeGate forms"] --> SA["Server Action only"]
```

## Authentication path

Not implemented. Manifest lists `/login`, `/signup`, password reset as `implemented: false`. Navbar Login control is disabled/deferred.

## Cart / checkout flow

Not implemented. Manifest lists `/cart` and `/checkout/*` as planned. No payment SDKs, cart persistence, or price authority on the client.

## Build and deployment path

```mermaid
flowchart LR
  Dev["npm run dev"] --> NextDev["next dev"]
  CI["GitHub Actions CI"] --> Install["npm ci"]
  Install --> Lint["eslint"]
  Lint --> Test["vitest run"]
  Test --> Build["next build"]
  Build --> E2EList["playwright --list"]
  Build --> Host["Intended: Vercel"]
  Host --> Headers["next.config headers()<br/>CSP + security headers"]
```

## Folder structure (actual)

```text
app/                 App Router pages, layout, robots, sitemap
components/
  age/               Age gate UI
  layout/            M00 shell primitives (lightly used vs module navbars)
  m01-home/ … m09-*/ Module feature UI
  ui/                Shared primitives
lib/
  a11y/ age/ assets/ security/ seo/ m01-home/
tests/               Vitest + Playwright mirroring modules
docs/                Figma + implementation + audits
```

This intentionally diverges from the attached standards’ `src/components/common/services/store` tutorial tree.
