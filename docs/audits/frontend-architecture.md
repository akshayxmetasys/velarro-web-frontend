# Frontend Architecture

Generated: 2026-07-15 · Evidence-only relationships from the current codebase.

## High-level module architecture

```mermaid
flowchart TB
  subgraph appRouter["app/ App Router"]
    layout["layout.tsx\nmetadata + Noto Sans"]
    pages["page.tsx routes\n15 implemented"]
    robots["robots.ts"]
    sitemap["sitemap.ts"]
  end

  subgraph components["components/"]
    age["age/\nAgeGate"]
    ui["ui/\nButton Input Drawer…"]
    layoutComp["layout/\nSiteShell Navbar Footer"]
    modules["m01–m09 feature modules\n*-page + *-data + *-assets"]
  end

  subgraph lib["lib/"]
    ageLib["age/\ncookie actions route-access"]
    seo["seo/\nmanifest metadata discovery schema"]
    security["security/\nheaders CSP cookie-options"]
    assets["assets/\napproved-image-hosts"]
    a11y["a11y/\nfocus trap"]
  end

  pages --> modules
  modules --> age
  modules --> ui
  modules --> layoutComp
  pages --> ageLib
  pages --> seo
  layout --> security
  appRouter -->|"next.config headers()"| security
  age --> ageLib
  modules --> assets
  robots --> seo
  sitemap --> seo
```

## Route-to-data flow

```mermaid
sequenceDiagram
  participant Browser
  participant Page as RSC page.tsx
  participant Cookies as next/headers cookies()
  participant Branch as *PageByAgeState
  participant Data as *-data.ts static module
  participant Gate as AgeGate

  Browser->>Page: GET /route
  Page->>Cookies: getInitialAgeStateFromCookies()
  Cookies-->>Page: unknown | over21 | under21
  Page->>Branch: ageState
  alt unknown + gated route
    Branch->>Gate: render AgeGate
    Gate->>Cookies: confirmAgeStateAction (httpOnly set)
  else over21 / review audience
    Branch->>Data: import static approved content
    Data-->>Browser: HTML + next/image CDN URLs
  else under21 blocked
    Branch-->>Browser: Under21HomeShell or equivalent safe shell
  end
```

## State ownership

```mermaid
flowchart LR
  subgraph server["Server authority"]
    httpOnly["Cookie velarro_age_state\nhttpOnly SameSite=lax"]
    action["confirmAgeStateAction"]
    action --> httpOnly
  end

  subgraph rsc["RSC request"]
    read["getInitialAgeStateFromCookies"]
    httpOnly --> read
    read --> props["ageState prop into page branch"]
  end

  subgraph client["Client islands"]
    local["useState forms carousels search"]
    provider["AgeStateProvider\nReact state only\nNOT mounted in layout"]
  end

  props -.->|"initialAgeState if wired"| provider
```

## API request path

```mermaid
flowchart TB
  ui["UI components / forms"] --> static["Static typed data modules"]
  ui -->|"preventDefault UI-only submit"| none["No fetch / axios / route handlers"]
  ageGate["AgeGate forms"] --> sa["Server Action only\nconfirmAgeStateAction"]
  sa --> cookie["Set httpOnly cookie + revalidatePath('/')"]
```

**Verified:** Zero `fetch(`/`axios`/`XMLHttpRequest` call sites in `app/`, `components/`, `lib/`.

## Authentication path

```mermaid
flowchart LR
  navbar["MainNavbar Login control"] --> deferred["Deferred — route not approved"]
  manifest["ROUTE_MANIFEST M02\n/login /signup /forgot /reset"] --> unimplemented["implemented: false"]
  unimplemented --> notFound["Default Next 404 if visited"]
```

No session tokens, no auth cookies, no protected API calls.

## Cart / checkout flow

```mermaid
flowchart LR
  navbarCart["Navbar Cart"] --> deferredCart["Deferred control"]
  manifestCart["M06 routes in manifest"] --> unimplemented["implemented: false"]
  routeAccess["route-access.ts"] -->|"under21 block / unknown gate"| prefixes["/cart /checkout prefixes"]
```

No cart state, pricing math, payment SDK, or order APIs exist.

## Build and deployment path

```mermaid
flowchart LR
  ci["GitHub Actions CI\nNode 22 npm ci"] --> lint["npm run lint"]
  lint --> test["npm run test"]
  test --> build["npm run build"]
  build --> e2elist["playwright --list"]
  build --> artifact[".next output"]
  artifact --> start["npm run start\nPlaywright webServer"]
  headers["next.config.ts headers()"] --> csp["getSecurityHeaders"]
```

Hosting provider is not pinned in-repo (no `vercel.json`). Production HSTS requires `VELARRO_ENABLE_HSTS=true`.
