# Treasured Twice LLC

Mobile-first website and business platform for **Treasured Twice LLC** at **shoptreasuredtwice.com**.

Tagline: **Once Loved, Treasured Again.**

## What already exists

This repo contains a beginner-friendly static site with HTML pages, CSS, public page copy, a manifest, and a static QA script. It does not contain a backend application.

## Included pages

The customer-facing navigation and collection overview use six main collections: Women’s Collection, Men’s Collection, Little Gems Children’s Collection, Home Décor, Electronics, and Pets. Clothing, Shoes, and Accessories are sections inside each of the three clothing collections. The old Shoes, Accessories, and Bags URLs remain collection choosers for existing bookmarks. Supporting pages include About, Contact, and Policies.

Electronics and Pets have dedicated pages with the previously supplied artwork and working email enquiry links. This branch has no product catalogue to migrate; category pages do not imply that any pictured item is in stock. See [collection organization and verification](docs/collection-organization.md).

## Official logos

The repository includes the exact approved Treasured Twice LLC heart logo and the separate Little Gems children's collection logo. Do not redraw, recolor, crop, or replace either supplied logo.

## Current limitations

This is a static website only. There are no real payments, checkout, login, authentication, backend database, customer database, private owner records, EIN, permit number, home address, bank information, or passwords.

Public item listings, admin tools, checkout, payments, login, backend storage, and private owner tools are not linked or exposed on the public site.

Treasured Twice LLC is not a nonprofit and does not issue tax-deductible donation receipts.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:4173>.

## Check the site

```bash
npm run build
```

The build command runs `scripts/check-site.mjs` to confirm required pages/content and catch broken internal links.

It also runs the Treasure List URL/activation tests and shipping-rule tests. Use `npm test` to run both suites.

## Treasure List subscriptions

The homepage invitation is restored; automated subscriptions are **not active**. The button remains disabled until an owner-controlled Mailchimp hosted form is configured and verified. See [Treasure List setup](docs/treasure-list-setup.md) for account configuration, testing, and activation. No API keys or subscriber records belong in this static repository.

## Shipping and delivery

The Policies page explains free shipping at a merchandise subtotal of **$50 or more**, including exactly $50, and customer-paid shipping below $50. Tax and shipping do not count toward the threshold. `src/shipping.mjs` supplies independently tested rules for the separate secure checkout implementation; it does not activate checkout. Unknown shipping charges stay unresolved.

See [shipping decisions and checkout handoff](docs/shipping-checkout-handoff.md) for unconfirmed rates, carriers, processing, coverage, discount treatment, and tracking, plus reconciliation of the separate saved cart’s older threshold. Keep this work draft-only.

## Edit the site

- Edit page copy directly in the matching `.html` file.
- Edit colors, spacing, cards, and mobile layout in `src/styles.css`.

## Publish with GitHub Pages

1. Commit and push changes to GitHub.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the current branch and the repository root (`/`) folder.
6. Save. GitHub will provide a Pages URL after the deployment finishes.
7. To connect `shoptreasuredtwice.com`, add the domain in GitHub Pages custom domain settings and update DNS with the records GitHub provides.
