<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->





# Velarro Repository Boundary

This repository is exclusively for Velarro Estate.

## Product separation

Do not create or modify:

- TAIRC pages
- TAIRC routes
- TAIRC components
- TAIRC styles
- TAIRC assets
- TAIRC content
- TAIRC configuration

Never implement Velarro inside the TAIRC repository.

## Required preflight

Before modifying files, confirm:

1. The repository root is `velarro-web-frontend`.
2. The active branch is a Velarro branch.
3. The requested task concerns Velarro Estate.
4. Existing uncommitted changes have been identified.

If the repository root is `tairc-platform`, stop immediately and make no changes.

## Figma requirements

- Use only explicitly provided Velarro Figma links.
- Prefer links to individual frames, sections, or prototype flows.
- Clearly distinguish verified Figma information from assumptions.
- Do not invent missing images, content, states, or interactions.
- Work module by module.
- Do not process all screens as one implementation request.
- Do not write code while in planning mode.

## Implementation approval

Do not write production code until the user provides this exact phrase:

`START VELARRO IMPLEMENTATION`