# Module Figma Spec Template

Status: template
Use for: one implementation module or one section-level extraction unit

## Module

- Module ID:
- Module name:
- PR:
- Route(s):
- Owner:
- Date:

## Source References

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Page ID:
- Parent frame/node ID:
- Section/node ID:
- Source type: full frame / section / component / modal / overlay
- Related source docs:
  - `docs/implementation/dual-flow-prototype-map.md`
  - `docs/implementation/dual-flow-route-map.json`
  - `docs/figma/screen-manifest.json`
  - `docs/figma/prototype-flow-map.json`
  - `docs/figma/component-inventory.json`

## MCP Extraction Log

| Call | Status | Date | Notes |
| --- | --- | --- | --- |
| `get_metadata` | pending |  |  |
| `get_design_context` | pending |  |  |
| `get_screenshot` | pending |  |  |
| `get_variable_defs` | pending |  |  |

If a call times out, record the exact error and complete the manual fallback section.

## Verified Figma Data

### Frame

- Name:
- Node ID:
- Width:
- Height:
- X/Y:
- Route:
- Age state: unknown / over21 / under21 / shared

### Layer Hierarchy

Paste or summarize MCP metadata hierarchy here.

### Text Layers

| Node ID | Text | Notes |
| --- | --- | --- |
|  |  |  |

### Typography

| Node ID / token | Family | Style | Weight | Size | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

### Colors, Fills, Borders, Effects

| Node ID / token | Property | Value | Notes |
| --- | --- | --- | --- |
|  |  |  |  |

### Spacing And Dimensions

| Node ID | Width | Height | Padding | Gap | Other layout notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

### Component Instances

| Instance node ID | Figma component name | Variant/state | Intended code component |
| --- | --- | --- | --- |
|  |  |  |  |

### Assets

| Asset / node ID | Type | MCP URL or export path | Dimensions | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

### Prototype Interactions

| Trigger node | Trigger | Action | Destination node/route | Verification |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Age-State And Route Rules

- `unknown` behavior:
- `over21` behavior:
- `under21` behavior:
- Under-21 blocked content:
- Open product/legal decisions:

## Accessibility Notes

- Landmarks:
- Heading order:
- Accessible names:
- Keyboard order:
- Focus behavior:
- Reduced motion:
- Contrast notes:

## Manual Fallback Data

Complete this section only when MCP cannot return required data.

- Manually copied layer hierarchy:
- Manually copied text:
- Manually copied typography:
- Manually copied colors/fills/effects:
- Manually copied spacing/dimensions:
- Manually copied component instances:
- Manually copied prototype destinations:
- Screenshots or visual references used:

## Acceptance Checklist Before Code

- [ ] Figma source identifiers are complete.
- [ ] MCP extraction status is recorded.
- [ ] Manual fallback fields are complete where needed.
- [ ] Age-state behavior is documented.
- [ ] Under-21 blocking requirements are documented.
- [ ] Open UI/UX questions are listed.
- [ ] Product/legal questions are resolved or explicitly deferred.
- [ ] Implementation approval has been provided before code begins.
