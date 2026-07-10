# Layer-By-Layer Visual Specification

Status: planning spec with implementation blockers
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`, `13148:15014`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Timeout limitation: full-page metadata timed out with HTTP 504.
- Source assumptions: this document records verified layer facts where extracted and marks missing fields explicitly.
- Unresolved blockers: permanent assets, CTA destinations, carousel behavior, hover/focus states, responsive specs, age/crawler policy, and legal/product approvals.

## Global Frame

| Property | Verified value |
| --- | --- |
| Frame | `13148:15012`, `home` |
| Desktop dimensions | 1440 x 7624.1646 |
| Layout wrapper | `13148:15013` and `13148:15014`, vertical layout |
| Desktop target | 1440px first |
| Background | Mostly `#fcfbf8` page with alternating `#f6f2eb` section bands and image-led feature sections |

## Navbar

| Property | Verified value |
| --- | --- |
| Node | `14406:85640`; source component `14279:30062` |
| Size | 1440 x 73 |
| Layout | Horizontal auto layout, fixed width, auto height, gap 195, padding left/right 40, top/bottom 8 |
| Background | `rgba(29,28,26,0.6)` with background blur |
| Stroke | Bottom border `#c6b49d`, 0.5px from design context |
| Text | Gotham Book 18 for nav items; OneSignature Regular 54 logo; Gotham Medium 8 for `SINCE  1919` |
| Links/buttons | The Estate, Partner, Our Story, Search, Cart, Login |
| Blocking notes | Permanent logo/script-font treatment must be approved; search/cart/login interactions need route decisions. |

## Hero Sections

| Section | Node | Visual facts | Blockers |
| --- | --- | --- | --- |
| Collector hero | `15081:25289` | 1441 x 851 image fill, crop mode, `COLLECTOR SERIES` Gotham Light 72, `SHOP NOW` Gotham Book 24, slider instance 201 x 22. | Permanent hero image, crop, slider behavior, CTA destination. |
| Roastery hero | `15451:37609` | 1441 x 851 image fill plus 40% dark solid overlay, `THE ROASTERY` Gotham Light 72, `SHOP NOW` Gotham Book 24, slider instance 201 x 22. | Permanent image, crop, route target, slider behavior. |

## Product/Card Bands

| Section | Node | Verified facts | Missing layer facts |
| --- | --- | --- | --- |
| Cigar carousel | `13148:15033` | 1314 x 645, vertical layout, `#f6f2eb`, 32 top/bottom padding, gap 64, heading copy, six cards, image hashes, active/dimmed card state, and arrow nodes verified. | Permanent assets, CTA destinations, final carousel behavior. |
| Cigar knowledge | `13148:15081` | 1340 x 719, vertical layout, `#f6f2eb`, heading copy verified, divider vector 344px, three 392 x 555 cards with copy and temporary image asset markers extracted. | Permanent assets, CTA destinations, product/editorial approval. |
| Clothier | `13148:15120` | 1340 x 708.43, vertical layout, `#f6f2eb`, heading copy, three product cards, swatches, badge, copy, image dimensions, and temporary image asset markers extracted. | Permanent assets, destinations, catalog/product/legal approval, copy cleanup. |
| Estate collection | `13148:15145` | 1340 x 688, vertical layout, heading copy, nested carousel viewport, arrows, six labels, active/dimmed state, and temporary image asset markers extracted. | Permanent assets, route targets, product approval, carousel behavior. |

## Feature Panels

| Section | Node | Verified facts | Missing layer facts |
| --- | --- | --- | --- |
| Gifting | `13148:15113` | 1338 x 696, image fill plus 60% gray overlay, radius 20, padding 253/252/196, `Find the perfect gifts` Gotham Light 72. | Permanent image, CTA node/destination, contrast verification. |
| Store and lounge | `13148:15176` | 1236 x 1065, image crop plus 40% dark overlay, radius 12, padding 250/249/470/76, `Find a store & lounge` Gotham Light 72. | Whether physical location/lounges are approved claims, CTA destination, permanent image. |

## Footer

| Property | Verified value |
| --- | --- |
| Node | `14468:34842` |
| Size | 1440 x 697.1647 |
| Layout | Vertical auto layout, padding top 20, gap 20 |
| Background | `#fcfbf8` |
| Border | `#d8c9b4` |
| Visible copy | `Stay in Know`, `Receive the latest news in your inbox`, `Your name`, `Your email`, `SUBMIT`, `Crafted. Refined. Velarro.`, all footer/legal links, warning text, trust line, `Ascend` |
| Blocking notes | Newsletter behavior, form handling, link destinations, social URLs, legal copy, warning text, trust claim, accessibility control, and ascend behavior must be approved. |

## Deep Card And Footer Specs - 2026-07-10

### Cigar Carousel

| Layer | Visual spec |
| --- | --- |
| Section frame | `13148:15033`, 1314 x 645, background `#f6f2eb`, vertical auto layout, top/bottom padding 32, gap 64. |
| Heading stack | Eyebrow `DISCOVER TIMELESS LUXURY`, Gotham Light 20, `#1f1a17`; heading `Velarro cigars`, Gotham Light 32, `#2f2924`. |
| Initial viewport | Card 2 is the active center card. Cards 1 and 3 are visible side cards at 0.75 opacity. Cards 4-6 are off-canvas to the right in extracted state. |
| Card style, side | 351.42 x 408.72, padding 13.92, gap 13.92, radius 10.44, stroke `#c6b49d` 1.30, card opacity 0.75, disabled-style EXPLORE button opacity 0.80. |
| Card style, active | 395.07 x 455.78, padding 15.65, gap 15.65, radius 11.73, stroke `#c6b49d` 1.47, active EXPLORE button border `#d8c9b4`. |
| Card labels | Ashtrays, Verde Classico, Lighters, Vintage no. 88, Pipes, Nocturne. |
| Image treatment | Cropped/fill images with 40% `#151414` overlay. |
| Controls | Left and right 44 x 44 arrow controls; behavior and accessible names not approved. |

### Cigar Knowledge Cards

| Card | Visual spec |
| --- | --- |
| Shared card | 392 x 555, background `#f6f2eb`, border `#d8c9b4`, radius 12, padding 16 x 20, gap 14. Image 356 x 309, radius 8, 40% dark overlay. |
| Card 1 | `Limited Compendium`; `The Perfect Whiskey & Cigar Pairing`; `Discover how to match profiles for an unforgettable experience`; EXPLORE. |
| Card 2 | `Reserve`; `Core Portfolio`; `Discover how to match profiles for an unforgettable experience`; EXPLORE. |
| Card 3 | `Night Series`; `Nocturne`; `Rich and sophisticated selections designed for evenings of quiet luxury.`; EXPLORE. |
| Type | Card title Gotham Book 24; body heading Gotham Light 20/28; body copy Gotham Book 16/24; button Gotham Book 16. |

### Clothier Cards

| Card | Visual spec |
| --- | --- |
| Shared card | Approx. 355 x 518, background `#f6f2eb`, border `#e6d9c9`, radius 8, padding 14, gap 12, product image 264 x 264 with 40% dark overlay. |
| Card 1 | Badge `Top Gift`; `Estate Oversized T-shirt`; `Heavyweight organic cotton`; swatches `#0b0b0b`, `#7e8b53`, `#8c7865`; EXPLORE. |
| Card 2 | Badge `Top Gift`; `Heritage Dad Cap`; `Washed cotton`; swatches `#f5f5f5`, `#b0a197`, `#0b0b0b`; EXPLORE. |
| Card 3 | Badge `Top Gift`; Figma copy has leading space before `Estate Weekender Jacket`; description appears truncated as `Cotton canvas, technical cotton, or lightweight`; swatches `#7e8b53`, `#0b0b0b`, `#b0a197`; EXPLORE. |
| Decision note | `Top Gift` is a claim-like badge and all product names/descriptions/swatches require catalog/legal approval before implementation. |

### Estate Collection Carousel

| Layer | Visual spec |
| --- | --- |
| Carousel instance | `14852:36641`, 1303 x 469, horizontal layout gap 40, arrow controls at both ends, internal card viewport 1135 x 455. |
| Initial viewport | Card 2 is active. Cards 1 and 3 are visible dimmed side cards. Cards 4-6 are off-canvas to the right. |
| Card labels | Estate Espresso, Founder's Boxy hoodie, Roastery, The cabinet, Estate oversized T-shirt, Humidors. Figma source used a curly apostrophe in Founder's. |
| Side cards | Approx. 351 x 409, opacity 0.75, image frame 323.58 x 286.18, disabled-style EXPLORE. |
| Active card | Approx. 391 x 455, image frame 360.48 x 318.81, active EXPLORE. |
| Image treatment | Cropped/fill images with 40% `#151414` overlay. |

### Footer

| Area | Visual spec |
| --- | --- |
| Social row | Icons: Instagram, YouTube, Facebook, Twitter, LinkedIn, 28-35px, row gap 60. |
| Newsletter band | 1436px wide `#f6f2eb` rounded 12 band, `Stay in Know`, divider, `Receive the latest news in your inbox`, fields `Your name` and `Your email`, `SUBMIT` button. |
| Footer nav | Logo/mark area, `Crafted. Refined. Velarro.`, links `Our Story`, `The Humidor`, `The House`, `Craftsmanship`, `Limited Editions`, `Track Order`, `Sustainability`, `Press`, `Contact Us`, `FAQ`. |
| Warning | `Surgeon General Warning:` followed by `Cigar smoking can cause cancers of the mouth and throat, even if you do not inhale.` |
| Trust/legal | `Highest level of Encryption, Security and Trust`; logo/payment-style asset; legal links `Privacy Policy`, `Terms of Service`, `Cookie Policy`, `Accessibility`; copyright `2026 Velarro Estate - All rights reserved`. |
| Utility controls | Left accessibility icon button; right `Ascend` button with arrow-up icon. |

## State And Interaction Gaps

- Carousel previous/next controls are visible but not behavior-verified.
- Hero sliders are visible but not behavior-verified.
- Hover, focus, active, selected, disabled, and pressed states are not fully extracted.
- Login, cart, search, newsletter, and CTA actions need route/backend/product decisions.
- No responsive state exists in Figma; mobile/tablet must be derived after desktop fidelity.
