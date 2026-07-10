# Vishnu Required Decisions And Assets

Status: READY FOR ASSET COLLECTION
Extraction date: 2026-07-10

## Required Source Context

- Figma file key: `92rhH51aErpYQWRrlJqMhn`
- Figma page ID: `85:10`
- Parent frame/node IDs: `15967:43304`, `13148:15012`, `13148:15014`
- Section node IDs: `14406:85640`, `15081:25289`, `13148:15033`, `15451:37609`, `13148:15081`, `13148:15113`, `13148:15120`, `13148:15145`, `13148:15176`, `14468:34842`
- Temporary Figma MCP asset URLs and IDs are extraction markers only. They must not be used in runtime, metadata, schema, source constants, tests, or snapshots.
- Production implementation remains blocked until Vishnu provides `START VELARRO IMPLEMENTATION`.

## Asset Summary

| Area | Assets required | Count | Status |
| --- | --- | ---: | --- |
| Navbar | Logo/script treatment, nav/search/cart/login icons | TBD | Missing |
| Collector hero | Permanent hero image | 1 | Missing |
| Cigar carousel | Card images plus arrow controls | 6 images + arrows | Missing |
| Roastery hero | Permanent hero image | 1 | Missing |
| Cigar knowledge | Card images | 3 | Missing |
| Gifting | Permanent feature background | 1 | Missing |
| Clothier | Product images | 3 | Missing |
| Estate collection | Card images plus arrow controls | 6 images + arrows | Missing |
| Store/lounge | Permanent feature background | 1 | Missing |
| Footer | Social icons, brand marks, utility icons | 9+ | Missing |
| Fonts | Gotham and script/logo font/export | TBD | Missing approval |

## Cigar Carousel Assets

| Needed | Visible label | Figma source | Display notes | Vishnu decision |
| --- | --- | --- | --- | --- |
| Permanent image | Ashtrays | `I14831:62911;14838:34292` | Side card, dimmed, cropped image with 40% dark overlay | Supply image, alt text, destination |
| Permanent image | Verde Classico | `I14831:62911;14838:34298` | Active center card, cropped image with 40% dark overlay | Supply image, alt text, destination |
| Permanent image | Lighters | `I14831:62911;14838:34304` | Side card, dimmed, cropped image with 40% dark overlay | Supply image, alt text, destination |
| Permanent image | Vintage no. 88 | `I14831:62911;14838:34310` | Off-canvas card | Supply image, alt text, destination, copy approval |
| Permanent image | Pipes | `I14831:62911;14838:34316` | Off-canvas card | Supply image, alt text, destination |
| Permanent image | Nocturne | `I14831:62911;14838:34322` | Off-canvas card | Supply image, alt text, destination |
| Local icon/SVG | Left/right arrows | `I14831:62911;14838:34288`, `I14831:62911;14838:34326` | 44 x 44 controls | Approve icon and behavior |

## Cigar Knowledge Assets And Copy

| Needed | Card | Extracted copy | Vishnu decision |
| --- | --- | --- | --- |
| Permanent image | Limited Compendium | `The Perfect Whiskey & Cigar Pairing`; `Discover how to match profiles for an unforgettable experience` | Supply image, approve copy, alt text, destination |
| Permanent image | Reserve | `Core Portfolio`; `Discover how to match profiles for an unforgettable experience` | Supply image, approve copy, alt text, destination |
| Permanent image | Night Series | `Nocturne`; `Rich and sophisticated selections designed for evenings of quiet luxury.` | Supply image, approve copy, alt text, destination |

## Clothier Assets And Product Decisions

| Needed | Product | Extracted details | Vishnu decision |
| --- | --- | --- | --- |
| Permanent product image | Estate Oversized T-shirt | Badge `Top Gift`; `Heavyweight organic cotton`; swatches `#0b0b0b`, `#7e8b53`, `#8c7865` | Supply image, approve product data, swatches, badge, destination |
| Permanent product image | Heritage Dad Cap | Badge `Top Gift`; `Washed cotton`; swatches `#f5f5f5`, `#b0a197`, `#0b0b0b` | Supply image, approve product data, swatches, badge, destination |
| Permanent product image | Estate Weekender Jacket | Badge `Top Gift`; source title has leading space; description appears truncated as `Cotton canvas, technical cotton, or lightweight`; swatches `#7e8b53`, `#0b0b0b`, `#b0a197` | Supply image, approve corrected copy, swatches, badge, destination |

## Estate Collection Assets

| Needed | Visible label | Figma source | Display notes | Vishnu decision |
| --- | --- | --- | --- | --- |
| Permanent image | Estate Espresso | `I14852:36641;14852:35923` | Side card, dimmed | Supply image, alt text, destination |
| Permanent image | Founder's Boxy hoodie | `I14852:36641;14852:35929` | Active center card | Supply image, alt text, destination, apostrophe/casing approval |
| Permanent image | Roastery | `I14852:36641;14852:35935` | Side card, dimmed | Supply image, alt text, destination |
| Permanent image | The cabinet | `I14852:36641;14852:35941` | Off-canvas card | Supply image, alt text, destination, casing approval |
| Permanent image | Estate oversized T-shirt | `I14852:36641;14852:35947` | Off-canvas card | Supply image, alt text, destination, casing approval |
| Permanent image | Humidors | `I14852:36641;14852:35953` | Off-canvas card | Supply image, alt text, destination |
| Local icon/SVG | Carousel arrows | `14214:47102` via `14852:36641` | 44 x 44 controls | Approve icon and behavior |

## Footer Assets And Decisions

| Area | Extracted item | Vishnu decision |
| --- | --- | --- |
| Social links | Instagram, YouTube, Facebook, Twitter, LinkedIn | Supply approved URLs, external-link policy, and labels |
| Newsletter | `Stay in Know`, `Receive the latest news in your inbox`, `Your name`, `Your email`, `SUBMIT` | Decide static/deferred vs approved endpoint/provider |
| Footer nav | `Our Story`, `The Humidor`, `The House`, `Craftsmanship`, `Limited Editions`, `Track Order`, `Sustainability`, `Press`, `Contact Us`, `FAQ` | Approve route destinations and under-21 access |
| Warning | `Surgeon General Warning:` plus cigar warning sentence | Legal approval |
| Trust line | `Highest level of Encryption, Security and Trust` | Security/legal approval or replacement copy |
| Legal links | `Privacy Policy`, `Terms of Service`, `Cookie Policy`, `Accessibility` | Approve route map entries |
| Utility controls | Accessibility icon, `Ascend` arrow-up button | Decide behavior, labels, and whether any third-party widget is allowed |
| Brand marks | Estate icon and lower 128 x 35 mark | Supply approved exports and identify lower mark purpose |

## Global Decisions Required

| Decision | Required answer |
| --- | --- |
| Age-state behavior | What `/` renders for `unknown`, `over21`, `under21`, and crawlers |
| Metadata/indexability | Title, description, canonical, robots, OG/Twitter image, social preview policy |
| Schema | Whether Organization/WebSite/WebPage are allowed; product/schema types remain blocked until approved visible content exists |
| CTA destinations | Routes for every `SHOP NOW`, `EXPLORE`, card click, search, cart, login, newsletter, footer, social, accessibility, and Ascend action |
| Asset source | Local `public/` files preferred; exact remote domains require CSP, Next config, and tests |
| Legal/product approval | Tobacco copy, product names, badges, warning text, store/lounge claim, trust/security claim |
| Typography | Gotham webfont and script/logo treatment licensing or approved exported assets |

## Implementation Blockers

- Do not write production UI code until `START VELARRO IMPLEMENTATION`.
- Do not render over-21 tobacco content on `/` before approved age-state/crawler behavior exists.
- Do not use temporary Figma URLs, Figma asset IDs, or Figma image hashes as production assets.
- Do not add remote image domains, newsletter providers, accessibility widgets, analytics, payment marks, or third-party scripts without explicit approval and security tests.
- Do not add Product, Offer, Review, AggregateRating, price, availability, LocalBusiness, FAQ, or Article schema until matching visible approved content exists.

## Verdict

READY FOR ASSET COLLECTION.

BLOCKED for implementation.
