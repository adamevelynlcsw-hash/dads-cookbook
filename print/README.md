# Printable cookbook

`build.mjs` turns the recipes in `../index.html` into a book-style PDF: cover, contents with page numbers, an illustrated opener for each chapter, and every recipe starting on its own page. US Letter, with a wider inside margin for two-sided printing and binding.

- `family-cookbook.pdf` is the main download on the website.
- `family-cookbook-alt-cover.pdf` is the same book with the other cover.
- Pictures live in `covers/` (all from Thanksgiving 2025, cartoons made in Canva): `cover-cartoon.jpg` (the porch group, front cover and top of the home page), `table-cartoon.jpg` (around the table, a page after the welcome and on the home page), `kitchen-cartoon.jpg` (the kitchen chaos, back cover and home page), and `cover-photo.jpg` (the real photo, used on the alternate-cover PDF; `thanksgiving-2025-original.jpg` is its source with location data removed). The `-web.jpg` files are smaller copies for the website. Change `DEFAULT_COVER` in `build.mjs` to swap which cover is the main download.
- Chapter pictures are simple drawings in `illustrations.mjs`. A new chapter gets a generic picture until one is added there.
- Each recipe has a small outline icon under its title. The icons live in `index.html` between the `ICONS:START` and `ICONS:END` markers, so the site, the recipe card and the book share one set. A new recipe without its own icon gets its chapter's icon.

The GitHub Action in `.github/workflows/printable-cookbook.yml` rebuilds both PDFs whenever `index.html` changes on `main`, so nobody has to run this by hand. To build locally:

```
cd print
npm install
npx playwright install chromium
npm run build
```
