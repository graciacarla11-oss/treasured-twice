# Collection organization

The redesign uses six main collections consistently in the homepage, Shop overview, and primary navigation.

| Main collection | Page | Sections |
| --- | --- | --- |
| Women's Collection | `women.html` | `#clothing`, `#shoes`, `#accessories` |
| Men's Collection | `men.html` | `#clothing`, `#shoes`, `#accessories` |
| Little Gems Children's Collection | `little-gems.html` | `#clothing`, `#shoes`, `#accessories` |
| Home Décor | `home-treasures.html` | Existing home collection |
| Electronics | `electronics.html` | Availability enquiry |
| Pets | `pets.html` | Availability enquiry |

Children's sections stay within Little Gems. Shoes and Accessories are not main collections. Bags belong in the relevant Accessories section. The previous `shoes.html`, `accessories.html`, and `bags.html` addresses remain useful collection choosers, with direct links to the corresponding section in each clothing collection.

This draft has no product catalogue, inventory data, or checkout to migrate. No product availability, inspection result, price, or purchasable stock has been invented. Electronics and Pets have working local pages and email enquiry links. Product entry and payments remain separate work.

## Existing artwork reused

Four existing optimized images were copied byte-for-byte from the saved Treasured Twice Site source checkout (commit `a45c4b3`):

- `assets/storefront/electronics-white.webp` → `assets/collections/electronics-white.webp`
- `assets/storefront/pets-paw-heart.webp` → `assets/collections/pets-paw-heart.webp`
- `assets/storefront/womens-three-rows-updated.webp` → `assets/collections/womens-three-rows-updated.webp`
- `assets/storefront/mens-diamond.webp` → `assets/collections/mens-diamond.webp`

The existing Site uses the white Electronics photo and paw-and-heart Pets artwork; its source history added the corresponding originals on October 9. No replacement images were generated. The official Treasured Twice and Little Gems image files, existing Home Décor artwork, teal color, iridescent frames, and homepage layout remain intact. Collection images use `object-fit: contain` to display the entire supplied image.

## Verification

Run `npm run build` and `git diff --check` before updating the draft. Build checks cover all 19 public pages, the six ordered collection links/cards, consistent collection artwork, old bookmark destinations, all local link/asset references, fragment targets, duplicate IDs, accessible label targets, and the existing Treasure List tests.

The responsive CSS preserves the existing three/two/one-column homepage grid and uses two/one columns for collection introductions, wrapping section links, and 44-pixel minimum navigation targets. The mobile primary navigation keeps Home, Shop, Home Décor, Electronics, Pets, About, and Contact; its existing bottom navigation provides the three clothing collections and Contact. New section anchors account for the sticky header.

Browser visual verification was unavailable in the editing session. Do not interpret static validation as a passed desktop/mobile visual check. Before merge, review at 320, 390, 768, 1024, and 1440 CSS pixels: check all collection navigation, artwork loading/full-image visibility, header wrapping, section anchors, absence of horizontal overflow, keyboard focus, and reduced-motion behavior.

Keep PR #24 in draft. No merge or deployment is part of this update. Existing Treasure List configuration remains unchanged and inactive.
