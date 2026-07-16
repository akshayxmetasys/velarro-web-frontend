# M00.5 deferred app loading UI

`app/loading.tsx` is **intentionally not added** in M00.5.

## Rationale

- Most marketing routes are already request-dynamic via the age cookie.
- A global full-page loading shell would add visual noise without improving
  measured route transitions for the current UI-only review build.
- Shared shell and not-found/error coverage are higher priority for this batch.

## Revisit when

- Streaming/Suspense boundaries are introduced for data-backed routes, or
- Product requests an approved branded loading treatment from Figma.
