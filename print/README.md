# Printable cookbook

`build.mjs` turns the recipes in `../index.html` into a book-style PDF: cover, contents with page numbers, an illustrated opener for each chapter, and every recipe starting on its own page. US Letter, with a wider inside margin for two-sided printing and binding.

- `family-cookbook.pdf` is the main download on the website.
- `family-cookbook-alt-cover.pdf` is the same book with the other cover.
- Covers live in `covers/`: `cover-cartoon.jpg` (AI cartoon made in Canva from the Thanksgiving 2025 photo, everyone in chef's hats; `cover-cartoon-web.jpg` is the smaller copy shown on the home page) and `cover-photo.jpg` (the real photo, lightly color-corrected from `thanksgiving-2025-original.jpg`, location data removed). Change `DEFAULT_COVER` in `build.mjs` to swap which one is the main download.
- Chapter pictures are simple drawings in `illustrations.mjs`. A new chapter gets a generic picture until one is added there.

The GitHub Action in `.github/workflows/printable-cookbook.yml` rebuilds both PDFs whenever `index.html` changes on `main`, so nobody has to run this by hand. To build locally:

```
cd print
npm install
npx playwright install chromium
npm run build
```
