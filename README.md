# Treasured Twice LLC

Mobile-first website and business platform for **Treasured Twice LLC** at **shoptreasuredtwice.com**.

Tagline: **Once Loved, Treasured Again.**

## What already exists

This repo contains a beginner-friendly static site with HTML pages, CSS, public page copy, a manifest, and a static QA script. It does not contain a backend application.

## Included pages

The customer-facing navigation uses exactly three retail collections: Women’s Collection, Men’s Collection, and Little Gems Children’s Collection. Supporting pages include About, Contact, and Policies. The repository also retains its collections overview and existing specialty URLs for link stability.

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
