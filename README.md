# Aston Green Heating Ltd — Website

Final, readable and editable website files for Aston Green Heating Ltd.

## Project structure

- `index.html` — Home page
- `plumbing.html` — Plumbing services
- `heating.html` — Heating and boiler services
- `drains.html` — Drain services
- `bathrooms.html` — Bathroom plumbing
- `emergency.html` — Emergency plumbing
- `about.html` — About the company
- `contact.html` — Contact page
- `styles.css` — Shared stylesheet used by every page
- `script.js` — Shared business settings and site interactions
- `assets/` — Local logo, favicon and image assets
- `robots.txt` — Search-engine crawling instructions
- `SEO-SETUP.md` — SEO notes and launch checklist

## Main business details

All frequently changed business details are kept in the `SITE_CONFIG` object at the top of `script.js`.

Current details:

- Company: Aston Green Heating Ltd
- Company number: 17015324
- Phone: 07418 354976
- Email: info@agheatingandplumbing.co.uk
- Address: 171 Albert Road, Birmingham, England, B6 5ND

## How to update the business details

Open `script.js` and edit only the values inside `SITE_CONFIG`.

The JavaScript updates matching `data-site-*` elements throughout all pages automatically when the page loads.

The page-specific SEO title, description and social metadata are kept directly inside each HTML file near the top of the `<head>` section so they are easy to find and edit.

## Editing the website

The HTML files are intentionally formatted with indentation, section comments and readable markup. The CSS is shared rather than duplicated between pages, and the JavaScript is kept as normal, unminified source code.

No build process is required. The site can be opened locally or uploaded to a normal web host.
