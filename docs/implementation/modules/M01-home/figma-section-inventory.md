# Complete Figma Section Inventory

Status: planning inventory
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame: `13148:15012` (`home`, 1440 x 7624.1646)
- Prototype entry: `15967:43304`
- Known component source: `14279:30062`
- Timeout limitation: `get_metadata` on the full parent frame `13148:15012` returned HTTP 504. Shallow child IDs were recovered with read-only Figma Plugin API inspection.
- Source assumptions: section names below are verified Figma node names, while human-readable section labels are derived from visible screenshot/text and must be confirmed during implementation extraction.
- Unresolved blockers: prototype interactions, carousel transitions, hover/focus states, responsive variants, permanent assets, and approval decisions remain incomplete.

## Figma Calls Logged

| Tool | Node | Status | Notes |
| --- | --- | --- | --- |
| `get_metadata` | `13148:15012` | Failed | HTTP 504. Do not repeatedly retry full node. |
| `get_screenshot` | `13148:15012` | Succeeded | Rendered 774 x 4096 from original 1440 x 7624. |
| `get_metadata` | `14279:30062` | Succeeded | Source MAIN NAVBAR component, 1440 x 73. |
| `get_design_context` | `14279:30062` | Succeeded | Navbar text, layout, icons, temporary asset URLs returned. |
| `get_variable_defs` | `14279:30062` | Succeeded | Navbar color and type variables returned. |
| `get_screenshot` | `14279:30062` | Succeeded | Navbar section screenshot returned. |
| `use_figma` read-only | `13148:15012`, `13148:15013`, `13148:15014` | Succeeded | Shallow ordered child inventory recovered. |
| `use_figma` read-only | homepage sections | Partial | Condensed layer summary succeeded until output cap clipped later sections. |
| `use_figma` read-only | `13148:15033` | Succeeded | Deep cigar carousel card extraction returned card labels, image hashes, opacity state, and arrow nodes. |
| `use_figma` read-only | `13148:15081` | Failed | Read-only mode blocked the Plugin API card traversal. Debug UUID `83ac4aa0-0cf9-49e7-930d-993a670cc9ce`. |
| `use_figma` read-only | knowledge card instances | Failed | Read-only mode blocked direct instance traversal. Debug UUID `daa9140f-4a68-4a27-9935-c24b41d88e5a`. |
| `get_design_context` | `14585:38786`, `14585:38795`, `14585:38813` | Succeeded | Cigar knowledge card copy, layout, temporary asset URLs, and button structure returned. |
| `get_design_context` | `16604:97181`, `16604:97239`, `16604:97240` | Succeeded | Clothier product card copy, labels, swatches, layout, temporary asset URLs, and buttons returned. |
| `get_design_context` | `14852:36641` | Succeeded | Estate collection nested carousel card order, labels, image assets, active/dimmed state, and arrow assets returned. |
| `get_design_context` | `14468:34842` | Succeeded | Full footer copy, links, newsletter fields, warning text, social icons, legal links, and utility controls returned. |

## Ordered Homepage Sections

| Order | Section label | Figma node ID | Parent | Position / dimensions | Layout | Verified visible copy | Extraction status |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 0 | Main navbar | `14406:85640` | `13148:15012` | x -0.5, y 0, 1440 x 73 | Horizontal auto layout, gap 195, padding 40/8 | The Estate; Partner; Our Story; Velarro Estate; SINCE 1919; Search..; Cart; Login | Strong section-level data. Source component `14279:30062`. |
| 1 | Hero, collector series | `15081:25289` | `13148:15014` | x -0.5, y 0, 1441 x 851 | Fixed instance | COLLECTOR SERIES; SHOP NOW | Good summary. Needs full component-source extraction for image crop and slider states. |
| 2 | Cigar carousel | `13148:15033` | `13148:15014` | x 63, y 931, 1314 x 645 | Vertical auto layout, padding top/bottom 32, gap 64 | DISCOVER TIMELESS LUXURY; Velarro cigars; Ashtrays; Verde Classico; Lighters; Vintage no. 88; Pipes; Nocturne; EXPLORE | Deep card extraction complete for desktop initial state. Needs permanent assets and CTA destinations. |
| 3 | Roastery hero | `15451:37609` | `13148:15014` | x -0.5, y 1656, 1441 x 851 | Fixed instance | THE ROASTERY; SHOP NOW | Good summary. Needs full image/crop and slider source extraction. |
| 4 | Cigar knowledge cards | `13148:15081` | `13148:15014` | x 50, y 2587, 1340 x 719 | Vertical auto layout, padding top/bottom 19, gap 40 | Cigar Knowledge; Expand your horizons; Limited Compendium; Reserve; Night Series | Card copy and layout extracted through card instance design context. Needs permanent assets and destinations. |
| 5 | Gifting feature | `13148:15113` | `13148:15014` | x 51, y 3386, 1338 x 696 | Fixed vertical frame, padding 253/252/196, radius 20 | Gifting; Find the perfect gifts | Good summary. Needs CTA destination and image crop confirmation. |
| 6 | Clothier cards | `13148:15120` | `13148:15014` | x 50, y 4162, 1340 x 708.43 | Vertical auto layout, padding top/bottom 32, gap 40 | Curated for the Exceptional; The Clothier; Estate Oversized T-shirt; Heritage Dad Cap; Estate Weekender Jacket | Product card copy, swatches, badge, layout, and temporary asset URLs extracted. Needs catalog/legal approval and permanent assets. |
| 7 | Estate collection carousel | `13148:15145` | `13148:15014` | x 50, y 4950.43, 1340 x 688 | Vertical auto layout, padding top/bottom 32, gap 64 | Discover Timeless Luxury; Velarro Estate collection; Estate Espresso; Founder's Boxy hoodie; Roastery; The cabinet; Estate oversized T-shirt; Humidors; EXPLORE | Deep carousel extraction complete for desktop initial state. Needs permanent assets and destinations. |
| 8 | Store and lounge feature | `13148:15176` | `13148:15014` | x 102, y 5718.43, 1236 x 1065 | Fixed vertical frame, padding 250/249/470/76, radius 12 | Find a store & lounge; EXPLORE | Good summary. Needs destination approval and whether this implies physical location claims. |
| 9 | Main footer | `14468:34842` | `13148:15014` | x 0, y 6863.43, 1440 x 697.16 | Vertical auto layout, padding top 20, gap 20 | Stay in Know; Receive the latest news in your inbox; Your name; Your email; SUBMIT; Crafted. Refined. Velarro.; all footer/legal links; warning; trust line; Ascend | Full footer extraction complete for desktop. Needs link, newsletter, legal, and social URL approval. |

## Deep Extraction Update - 2026-07-10

### Cigar Carousel `13148:15033`

| Item | Node | Extracted facts | Asset marker |
| --- | --- | --- | --- |
| Section | `13148:15033` | `section 1`, x 63, y 931, 1314 x 645, background `#f6f2eb`, vertical layout, top/bottom padding 32, gap 64. | N/A |
| Heading eyebrow | `13148:15037` | `DISCOVER TIMELESS LUXURY`, Gotham Light 20, color `#1f1a17`. | N/A |
| Heading | `13148:15038` | `Velarro cigars`, Gotham Light 32, color `#2f2924`. | N/A |
| Card 1 | `I14831:62911;14838:34290` | `Ashtrays`, x 0, y 24.03, 351.42 x 408.72, opacity 0.75, image 339 x 305, 40% dark overlay, disabled-style EXPLORE. | image hash `c61b8e8422adc0f1ef1fd7742d828ce77c142689` |
| Card 2 | `I14831:62911;14838:34296` | `Verde Classico`, x 366.41, y -1, 395.07 x 455.78, active center card, image 381 x 335, 40% dark overlay, active EXPLORE. | image hash `37cb046192ab4b0c35f428982c7a26cfbf50d247` |
| Card 3 | `I14831:62911;14838:34302` | `Lighters`, x 776.48, y 24.03, 351.42 x 408.72, opacity 0.75, image 340 x 298, 40% dark overlay. | image hash `f3c049c3e0d3126a2c9bd6be358861352bfa2f42` |
| Card 4 | `I14831:62911;14838:34308` | `Vintage no. 88`, x 1142.90, y 24.03, off-canvas to the right in initial viewport. | image hash `64c20b5b8b99eeb7affd689ca84c018650e29610` |
| Card 5 | `I14831:62911;14838:34314` | `Pipes`, x 1509.31, y 24.03, off-canvas to the right. | image hash `591ce12bd3cefdc577a09e531f3c8c9e7a2c2804` |
| Card 6 | `I14831:62911;14838:34320` | `Nocturne`, x 1875.73, y 24.03, off-canvas to the right. | image hash `44e8663d17569364ab05fd21cd74b82eca9d1b93` |
| Controls | `I14831:62911;14838:34288`, `I14831:62911;14838:34326` | Left and right arrows, 44 x 44. | Local icon/SVG required. |

### Cigar Knowledge `13148:15081`

| Item | Node | Extracted facts | Temporary asset marker |
| --- | --- | --- | --- |
| Section | `13148:15081` | `section3`, x 50, y 2587, 1340 x 719. | N/A |
| Heading group | `13148:15083` to `13148:15087` | `Cigar Knowledge`; divider 344px; `Expand your horizons`. | N/A |
| Card 1 | `14585:38786` | 392 x 555 card; image 356 x 309; title `Limited Compendium`; body heading `The Perfect Whiskey & Cigar Pairing`; body `Discover how to match profiles for an unforgettable experience`; EXPLORE. | `f048cea8-d96b-4f82-b56e-5f30a46fca0d` |
| Card 2 | `14585:38795` | 392 x 555 card; image 356 x 309; title `Reserve`; body heading `Core Portfolio`; body `Discover how to match profiles for an unforgettable experience`; EXPLORE. | `d64cff4b-32fc-477b-8701-e79f20c25d29` |
| Card 3 | `14585:38813` | 392 x 555 card; image 356 x 309; title `Night Series`; body heading `Nocturne`; body `Rich and sophisticated selections designed for evenings of quiet luxury.`; EXPLORE. | `f762b9f2-3722-4c5e-a180-af4fb6a8123d` |

### Clothier `13148:15120`

| Item | Node | Extracted facts | Temporary asset marker |
| --- | --- | --- | --- |
| Section | `13148:15120` | `section 6`, x 50, y 4162, 1340 x 708.43. | N/A |
| Heading group | `13148:15121` to `13148:15125` | `Curated for the Exceptional`; `The Clothier`. | N/A |
| Product card 1 | `16604:97181` | 354.65 x 517.67; badge `Top Gift`; product `Estate Oversized T-shirt`; description `Heavyweight organic cotton`; swatches `#0b0b0b`, `#7e8b53`, `#8c7865`; EXPLORE. | `95a5fc4a-3b2b-4d98-92a2-c0c56622bd49` |
| Product card 2 | `16604:97239` | 355.21 x 518.43; badge `Top Gift`; product `Heritage Dad Cap`; description `Washed cotton`; swatches `#f5f5f5`, `#b0a197`, `#0b0b0b`; EXPLORE. | `162df3f0-5f07-4ae2-b8e3-c1e6dd70cf6d` |
| Product card 3 | `16604:97240` | 355.21 x 518.22; badge `Top Gift`; product source contains a leading space before `Estate Weekender Jacket`; description source ends after `Cotton canvas, technical cotton, or lightweight`; swatches `#7e8b53`, `#0b0b0b`, `#b0a197`; EXPLORE. | `4286baf4-86ca-4677-9245-8a601629a8af` |

### Estate Collection `13148:15145`

| Item | Node | Extracted facts | Temporary asset marker |
| --- | --- | --- | --- |
| Section | `13148:15145` | `section 5`, x 50, y 4950.43, 1340 x 688. | N/A |
| Heading group | `13148:15146` to `13148:15150` | `Discover Timeless Luxury`; `Velarro Estate collection`. | N/A |
| Carousel instance | `14852:36641` | 1303 x 469 nested `HOME SECTION 2`, gap 40, arrows at both ends, card viewport 1135 x 455. | arrow asset `c76c0f67-a12f-4340-a453-9bd8c80c492f` |
| Card 1 | `I14852:36641;14852:35921` | `Estate Espresso`, dimmed opacity 0.75, x 0, y 25.03, disabled-style EXPLORE. | `9c94928b-0325-4839-91be-37dadcbb5e5c` |
| Card 2 | `I14852:36641;14852:35927` | `Founder's Boxy hoodie`, active center card, x 370, y 0, active EXPLORE. Figma source used a curly apostrophe. | `671a194d-ba0b-418c-860b-44e9d3448512` |
| Card 3 | `I14852:36641;14852:35933` | `Roastery`, dimmed opacity 0.75, x 776.48, y 25.03. | `ad89c480-3bd0-4dde-bd7a-32b3fb7359ef` |
| Card 4 | `I14852:36641;14852:35939` | `The cabinet`, dimmed opacity 0.75, x 1142.90, off-canvas/right-edge. | `c977fb63-9d31-4c76-8b3e-295a852ad92d` |
| Card 5 | `I14852:36641;14852:35945` | `Estate oversized T-shirt`, dimmed opacity 0.75, off-canvas right. | `36971ad4-aa9e-4d7a-bca4-261eaec6c09f` |
| Card 6 | `I14852:36641;14852:35951` | `Humidors`, dimmed opacity 0.75, off-canvas right. | `e82dbd60-0c9b-4dab-a6d9-1b03c8c0a2d7` |

### Footer `14468:34842`

| Area | Node | Extracted facts | Decision needed |
| --- | --- | --- | --- |
| Social row | `I14468:34842;13964:58898` | Instagram, YouTube, Facebook, Twitter, LinkedIn icons, 28-35px. | Approved social URLs and accessible labels. |
| Newsletter | `I14468:34842;13964:58915` | `Stay in Know`; `Receive the latest news in your inbox`; fields `Your name`, `Your email`; button `SUBMIT`. | Real endpoint or static/deferred behavior. |
| Brand/footer nav | `I14468:34842;13964:58925` | `Crafted. Refined. Velarro.` plus links `Our Story`, `The Humidor`, `The House`, `Craftsmanship`, `Limited Editions`, `Track Order`, `Sustainability`, `Press`, `Contact Us`, `FAQ`. | Approved routes and under-21 access. |
| Warning | `I14468:34842;13964:58959` | `Surgeon General Warning:` and `Cigar smoking can cause cancers of the mouth and throat, even if you do not inhale.` | Legal approval. |
| Trust line | `I14468:34842;13964:58961` | `Highest level of Encryption, Security and Trust`. | Security/legal approval for claim. |
| Legal row | `I14468:34842;13964:58977` | `Privacy Policy`, `Terms of Service`, `Cookie Policy`, `Accessibility`. | Approved route map entries. |
| Copyright | `I14468:34842;13964:58982` | Copyright symbol, `2026 Velarro Estate - All rights reserved`. | Legal approval. |
| Utilities | `I14468:34842;13964:58987`, `I14468:34842;13964:58992` | Accessibility button; `Ascend` button with arrow-up icon. | Decide behavior and labels. |

## Responsive Evidence

No verified tablet or mobile variants were found for M01. Responsive behavior is engineering-derived only and requires UI/UX review after the 1440px desktop match.

## Failed Or Unclear Nodes

| Node | Issue | Required next action |
| --- | --- | --- |
| `13148:15012` | Full metadata HTTP 504. | Do not retry full node repeatedly. Use section nodes. |
| `13148:15033` | Nested card data now extracted; permanent assets and destinations still unresolved. | Collect assets and approve destinations. |
| `13148:15081` | Direct `use_figma` traversal failed in read-only mode; card design context succeeded. | Do not retry the failing Plugin API path unless file permissions change. |
| `13148:15120` | Product details now extracted; product claims and catalog data are not approved. | Vishnu/product/legal approval. |
| `14468:34842` | Full footer design context succeeded; behavior is not approved. | Approve links, newsletter, social URLs, warning, trust claim, and utility controls. |
| All sections | Hover/focus/active/selected/disabled states not fully verified. | Use prototype/context extraction per interactive node. |
