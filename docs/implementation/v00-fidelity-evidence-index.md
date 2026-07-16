# V-00 Fidelity Evidence Index

| Field | Value |
| --- | --- |
| Audit date | 2026-07-16 |
| Correction pass | 2026-07-16 (evidence wording + verification classes) |
| Baseline SHA | `3f40c01f441455a3e0a3875da4187e8e0ad35bc6` |
| Figma file | `92rhH51aErpYQWRrlJqMhn` |
| MCP seat | View |
| Binary screenshots in repo | **None committed in V-00** (policy) |
| Temporary analysis screenshots | Must be deleted if created; none retained at V-00 completion |

Evidence locations (untracked / historical — do not commit unless later approved):

- Prior audit: `.audit-artifacts/` (if present locally; **must stay untracked**)
- Module notes under `docs/implementation/modules/**`
- Figma MCP live calls during V-00

## Verification class legend (required)

For every Figma node, use exactly one:

1. **Directly verified through Figma MCP during V-00**
2. **Verified through the inspected parent subtree during V-00**
3. **Present in current route manifest**
4. **Present only in repository documentation**
5. **Not yet verified**

Do **not** assign “High confidence” solely because a node exists in the route manifest.

When class is 3, 4, or 5: **exact node re-verification through Figma MCP is required at the beginning of the corresponding implementation PR**.

---

## Homepage Over-21 (`/`)

Parent frame: `13148:15012` — **Directly verified through Figma MCP during V-00** — 1440 × 7624.16 — page `85:10` — name `home`

| Section | Figma node | Verification class | Figma screenshot | Design context | Variables | Localhost shot | Viewport | Target dims | Material differences (known) | Asset blockers | Font blockers | Evidence location | Missing evidence | V-PR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Full page | `13148:15012` | Directly verified through Figma MCP during V-00 | Prior audit scaled captures exist untracked | V-00 metadata OK; full design_context not re-run | Partial / historical | Prior audit `home__1440-full` if present locally | 1440 | 1440×7624.16 | Prior audit reported a 47.619% visual-difference result. This result was not recalculated during V-00 and must not be treated as a current post-remediation score. Height drift and type/font differences also noted historically. | Many deferred images | Gotham | MCP V-00; `figma-section-inventory.md` | Fresh post-#44/#45 pixel score | V-01–V-05 |
| Navbar | `14406:85640` / src `14279:30062` | Present only in repository documentation for deep vars; instance seen under parent subtree | Historical | Historical | Historical | Via page | 1440 | 1440×73 | Geometry drift possible | Logo image OK | Script webfont N/A (image logo) | inventory | Re-verify source component at V-01 if navbar edited | V-01 |
| Collector hero | `15081:25289` | Directly verified through Figma MCP during V-00 | Missing fresh | Instance metadata only in V-00 | Not fetched in V-00 | Prior if present | 1440 | 1441×851 | Crop/overlay | Hero readiness | Gotham | MCP size | Full design_context | V-02 |
| Cigar carousel | `13148:15033` | Directly verified through Figma MCP during V-00 | Historical | Historical deep extraction | Partial historical | Prior if present | 1440 | 1314×645 | Active card / spacing | Some approved; some deferred | Gotham | MCP + inventory | — | V-02 |
| Roastery | `15451:37609` | Directly verified through Figma MCP during V-00 | Historical | Partial | Not fetched in V-00 | Prior if present | 1440 | 1441×851 | Crop/object-position | Approved URL in module notes | Gotham | MCP size | design_context depth | V-03 |
| Knowledge | `13148:15081` | Verified through the inspected parent subtree during V-00 | Historical | Card contexts in docs | Partial historical | Prior if present | 1440 | 1340×719 | Card geometry | Permanent assets | Gotham | Parent subtree + inventory | Direct MCP node call at V-03 start | V-03 |
| Gifting | `13148:15113` | Verified through the inspected parent subtree during V-00 | Historical | Summary in docs | Not fetched | Prior if present | 1440 | 1338×696 | Layout | Destination + image | Gotham | Parent subtree + inventory | Direct MCP at V-04 start | V-04 |
| Clothier | `13148:15120` | Verified through the inspected parent subtree during V-00 | Historical | Card contexts in docs | Partial | Prior if present | 1440 | 1340×708.43 | Cards/swatches | Catalog approval | Gotham | Parent subtree + inventory | Direct MCP at V-04 start | V-04 |
| Estate collection | `13148:15145` | Verified through the inspected parent subtree during V-00 and/or present only in repository documentation | Historical | Deep carousel in docs | Partial | Prior if present | 1440 | 1340×688 | Carousel states | Deferred cards | Gotham | inventory | Direct MCP at V-05 start | V-05 |
| Store/Lounge | `13148:15176` | Verified through the inspected parent subtree during V-00 and/or present only in repository documentation | Historical | Summary in docs | Not fetched | Prior if present | 1440 | 1236×1065 | Feature band | Destination claim | Gotham | inventory | Direct MCP at V-05 start | V-05 |
| Footer | `14468:34842` | Directly verified through Figma MCP during V-00 | Historical | Full extraction in docs | Partial | Prior if present | 1440 | 1440×697.16 | Height; newsletter deferred | Social/legal URLs | Gotham | MCP + inventory | Backend newsletter | V-05 |

**Responsive Figma for home:** Not yet verified (no mobile/tablet frames found) → engineering-derived in each V-PR.

---

## Under-21 home (`/` under21)

| Section | Node | Verification class | Dims | Notes | V-PR |
| --- | --- | --- | --- | --- | --- |
| Full U21 frame | `14735:62828` | Directly verified through Figma MCP during V-00 | 1440×5199.16 | Only navbar + Roastery implemented | Later U21 series |
| U21 navbar | `15694:43347` | Directly verified through Figma MCP during V-00 | 1440×73 | Implemented | Preserve / later polish |
| U21 Roastery | `15694:45979` | Directly verified through Figma MCP during V-00 | 1441×851 | Implemented; approved hero URL | Preserve / later polish |

---

## Marketing routes

| Route | Node | Verification class | Localhost / test evidence | Target | Known gaps | Assets | Fonts | V-PR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/our-story` | `15934:43007` | Directly verified through Figma MCP during V-00 | Module notes + age tests | 1440×4586 | Type/rhythm; responsive derived | Approved hero + story image | Gotham | V-06 |
| `/the-estate` | `16576:98447` | Present in current route manifest | Age tests; prior audit shots if local | Verify at PR start | Geometry + placeholders | Deferred categories | Gotham | V-07a |
| `/the-estate/the-house` | `16576:96095` | Present in current route manifest | Age tests | Verify at PR start | Geometry | Module notes | Gotham | V-07b |
| `/the-vault` | `14240:78024` | Present in current route manifest | Age tests; prior compare artifacts if local | Verify at PR start | Asset-heavy | Deferred | Gotham | V-07c |
| `/the-chronicle` | `14284:63187` | Present in current route manifest | Age tests | Verify at PR start | Editorial assets | Deferred | Gotham | V-08a |
| `/pairing-guide` | `14406:85066` | Present in current route manifest | Age tests | Verify at PR start | Editorial assets | Deferred | Gotham | V-08b |
| `/membership` | `15008:38309` | Present in current route manifest | Strong E2E overflow | Verify at PR start | Visual fidelity beyond overflow | Deferred tier art | Gotham | V-09a |
| `/partner` | `14670:42180` | Present in current route manifest | E2E UI-only | Verify at PR start | Visual; honesty preserved | Deferred images | Gotham | V-09b |
| `/get-in-touch` | `14644:34661` | Present in current route manifest | E2E hero metrics | Verify at PR start | Map deferred | Hero approved | Gotham | V-09b |
| `/careers` | `13148:15771` | Present in current route manifest | Strong E2E | Verify at PR start | Visual polish | Hero approved on landing | Gotham | V-09c |
| `/careers/positions` | `13148:15855` | Present in current route manifest | E2E | Verify at PR start | Visual polish | Per module notes | Gotham | V-09c |
| `/careers/positions/[jobId]` | `13148:15939` | Present in current route manifest | E2E | Verify at PR start | Visual polish | Per module notes | Gotham | V-09c |
| `/careers/positions/[jobId]/apply` | `13563:29858` | Present in current route manifest | E2E | Verify at PR start | Visual polish; UI-only apply | Per module notes | Gotham | V-09c |

Manifested-but-unimplemented route nodes (auth, cart, legal, `/the-house`, humidor children, etc.) are **Present in current route manifest** only — see expanded table in `current-main-route-fidelity-tracker.md`. None of those were MCP-inspected in V-00.

---

## App chrome states

| Surface | Figma | Verification class | Evidence | Notes | V-PR |
| --- | --- | --- | --- | --- | --- |
| `not-found` | None official | Not yet verified (no Figma frame identified) | Unit test | Branded with shell; noindex | Preserve |
| `error` | None official | Not yet verified (no Figma frame identified) | Unit test | No stack exposure | Preserve |
| `loading` | Deferred | Present only in repository documentation | `loading-ui-deferred.md` | Intentionally not shipped | — |

---

## How future V-PRs must update this index

For each changed section, append: exact node, verification class after re-check, viewport, before path, after path, difference list, font/asset blockers, overflow check result.
