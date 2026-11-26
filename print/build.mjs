// Builds the printable, book-style PDF of the family cookbook straight from index.html,
// so the PDF always matches the website. Run from this folder:
//
//   npm install
//   npm run build            (builds both covers)
//
// Output (committed so GitHub Pages can serve it):
//   family-cookbook.pdf            the book with the DEFAULT_COVER
//   family-cookbook-alt-cover.pdf  the same book with the other cover
//
// To switch which cover is the main download, change DEFAULT_COVER and rebuild.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";
import { chromium } from "playwright";
import { ART, DEFAULT, FLOURISH } from "./illustrations.mjs";

const DEFAULT_COVER = "cartoon";           // "photo" or "cartoon"
const COVERS = {
  photo: "covers/cover-photo.jpg",
  cartoon: "covers/cover-cartoon.jpg",
};
const COVER_CAPTION = "Thanksgiving 2025";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const PAGED = join(HERE, "node_modules/pagedjs/dist/paged.polyfill.js");
const FONTS = join(HERE, "node_modules/@fontsource/playfair-display/files");
const SANS = join(HERE, "node_modules/@fontsource/source-sans-3/files");

// ---------- parse the book exactly the way index.html does ----------
const html = readFileSync(join(ROOT, "index.html"), "utf8");
const m = html.match(/<script type="text\/plain" id="book">([\s\S]*?)<\/script>/);
if (!m) throw new Error("Could not find the book block in index.html");
const RAW = m[1];

const slug = s => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
marked.setOptions({ gfm: true, breaks: false });

const ITEMS = RAW.split(/^@@ /m).slice(1).map(block => {
  const nl = block.indexOf("\n");
  const [chapter, status = "final"] = block.slice(0, nl).split("|").map(s => s.trim());
  let body = block.slice(nl + 1);
  let x = body.match(/^\s*# (.+)\n/); const title = x ? x[1].trim() : "Untitled"; if (x) body = body.slice(x[0].length);
  let sub = ""; x = body.match(/^\s*### (.+)\n/); if (x) { sub = x[1].trim(); body = body.slice(x[0].length); }
  let meta = "";
  if (chapter !== "INTRO" && chapter !== "PRINCIPLES") {
    const cut = body.search(/^## /m), head = cut < 0 ? body : body.slice(0, cut);
    x = head.match(/^((?:\*\*[^*\n]+:\*\*.*\n)+)/m);
    if (x) { meta = x[1]; body = body.slice(0, x.index) + body.slice(x.index + x[0].length); }
  }
  let draft = ""; x = body.match(/^## Draft Notes\n([\s\S]*)$/m); if (x) { draft = x[1].trim(); body = body.slice(0, x.index); }
  return { chapter, status, title, sub, meta, body: body.trim(), draft, slug: slug(title) };
});
const INTRO = ITEMS.find(i => i.chapter === "INTRO");
const PRIN = ITEMS.find(i => i.chapter === "PRINCIPLES");
const RECIPES = ITEMS.filter(i => i !== INTRO && i !== PRIN);

const TOPS = [];
RECIPES.forEach(r => {
  const [top, sub = ""] = r.chapter.split(" › ");
  let t = TOPS.find(y => y.name === top); if (!t) { t = { name: top, subs: [] }; TOPS.push(t); }
  let s = t.subs.find(y => y.name === sub); if (!s) { s = { name: sub, recipes: [] }; t.subs.push(s); }
  s.recipes.push(r);
});

// ---------- pieces ----------
function metaHtml(meta) {
  if (!meta) return "";
  const parts = [];
  meta.trim().split("\n").forEach(line => line.split(" | ").forEach(seg => {
    const y = seg.trim().match(/^\*\*(.+?):\*\*\s*(.*)$/);
    if (y) parts.push(`<div class="m"><span>${esc(y[1])}</span>${marked.parseInline(y[2])}</div>`);
  }));
  return `<div class="meta">${parts.join("")}</div>`;
}

const recipeHtml = (r, top) => `
  <section class="recipe" id="r-${r.slug}" data-chapter="${esc(top)}">
    <div class="crumb">${esc(r.chapter)}${r.status === "draft" ? ' <span class="badge">Draft, still testing</span>' : ""}</div>
    <h1 class="rtitle">${esc(r.title)}</h1>
    ${r.sub ? `<p class="sub">${esc(r.sub)}</p>` : ""}
    ${metaHtml(r.meta)}
    <div class="prose">${marked.parse(r.body)}</div>
    ${r.draft ? `<aside class="draft-box"><h3>Draft notes</h3>${marked.parse(r.draft)}</aside>` : ""}
    <div class="end">${FLOURISH}</div>
  </section>`;

const chapterHtml = t => {
  const n = t.subs.reduce((a, s) => a + s.recipes.length, 0);
  const list = t.subs.map(s => (s.name ? `<h4>${esc(s.name)}</h4>` : "") +
    `<ul>${s.recipes.map(r => `<li><a href="#r-${r.slug}">${esc(r.title)}</a></li>`).join("")}</ul>`).join("");
  return `
  <section class="opener" id="ch-${slug(t.name)}">
    <div class="art">${ART[t.name] || DEFAULT}</div>
    <p class="eyebrow">${n} recipe${n === 1 ? "" : "s"}</p>
    <h1 class="chapter-title">${esc(t.name)}</h1>
    ${FLOURISH}
    <div class="opener-list">${list}</div>
  </section>
  ${t.subs.flatMap(s => s.recipes).map(r => recipeHtml(r, t.name)).join("")}`;
};

const tocHtml = () => `
  <section class="toc" id="contents">
    <h1 class="front-title">Contents</h1>
    <ol class="toc-list">
      <li class="toc-top"><a href="#principles">Basic Principles</a></li>
      ${TOPS.map(t => `<li class="toc-top"><a href="#ch-${slug(t.name)}">${esc(t.name)}</a>
        <ol>${t.subs.map(s => (s.name ? `<li class="toc-sub">${esc(s.name)}</li>` : "") +
          s.recipes.map(r => `<li class="toc-r"><a href="#r-${r.slug}">${esc(r.title)}</a></li>`).join("")).join("")}</ol></li>`).join("")}
    </ol>
  </section>`;

const today = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "America/New_York" });

function bookHtml(coverKey) {
  const cover = pathToFileURL(join(HERE, COVERS[coverKey])).href;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Family Recipes</title>
<style>
@font-face{font-family:"Playfair Display";font-weight:600;src:url("${pathToFileURL(FONTS)}/playfair-display-latin-600-normal.woff2")}
@font-face{font-family:"Playfair Display";font-weight:700;src:url("${pathToFileURL(FONTS)}/playfair-display-latin-700-normal.woff2")}
@font-face{font-family:"Playfair Display";font-weight:600;font-style:italic;src:url("${pathToFileURL(FONTS)}/playfair-display-latin-600-italic.woff2")}
@font-face{font-family:"Source Sans 3";font-weight:400;src:url("${pathToFileURL(SANS)}/source-sans-3-latin-400-normal.woff2")}
@font-face{font-family:"Source Sans 3";font-weight:400;font-style:italic;src:url("${pathToFileURL(SANS)}/source-sans-3-latin-400-italic.woff2")}
@font-face{font-family:"Source Sans 3";font-weight:600;src:url("${pathToFileURL(SANS)}/source-sans-3-latin-600-normal.woff2")}
@font-face{font-family:"Source Sans 3";font-weight:700;src:url("${pathToFileURL(SANS)}/source-sans-3-latin-700-normal.woff2")}
${readFileSync(join(HERE, "book.css"), "utf8")}
.cover-pic{background-image:url("${cover}");background-position:${coverKey === "photo" ? "center 78%" : "center top"}}
</style>
<script>window.PagedConfig={auto:true,after:()=>{window.__pagedDone=true}};</script>
<script src="${pathToFileURL(PAGED).href}"></script>
</head><body>

<section class="cover">
  <div class="cover-band">
    <p class="cover-eyebrow">From our kitchen to yours</p>
    <h1 class="cover-title">Family Recipes</h1>
    <p class="cover-sub">Made with love, seasoned to taste, and always better shared.</p>
  </div>
  <div class="cover-pic"><p class="cover-caption">${esc(COVER_CAPTION)}</p></div>
</section>

<section class="front" id="welcome">
  <p class="eyebrow">From our kitchen to yours</p>
  <h1 class="front-title">${esc(INTRO.title)}</h1>
  ${INTRO.sub ? `<p class="sub">${esc(INTRO.sub)}</p>` : ""}
  ${FLOURISH}
  <div class="prose">${marked.parse(INTRO.body)}</div>
  <p class="edition">${RECIPES.length} recipes · Printed ${esc(today)}<br>Always current online at adamevelynlcsw-hash.github.io/dads-cookbook</p>
</section>

${tocHtml()}

<section class="principles" id="principles" data-chapter="Basic Principles">
  <p class="eyebrow">Start here</p>
  <h1 class="front-title">${esc(PRIN.title)}</h1>
  ${PRIN.sub ? `<p class="sub">${esc(PRIN.sub)}</p>` : ""}
  <div class="prose">${marked.parse(PRIN.body)}</div>
</section>

${TOPS.map(chapterHtml).join("")}

<section class="back">
  <div class="art">${DEFAULT}</div>
  <p class="back-line">Made with love <span class="heart">♥</span> seasoned to taste</p>
  <p class="edition">Have a recipe to add? Send it to Dad.</p>
</section>
</body></html>`;
}

// ---------- render ----------
const OUT = HERE;
mkdirSync(join(HERE, ".build"), { recursive: true });
const launchOpts = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {};
const browser = await chromium.launch(launchOpts);
const order = [DEFAULT_COVER, ...Object.keys(COVERS).filter(k => k !== DEFAULT_COVER)];
for (const [i, key] of order.entries()) {
  const tmp = join(HERE, ".build", `book-${key}.html`);
  writeFileSync(tmp, bookHtml(key));
  const page = await browser.newPage();
  page.on("pageerror", e => console.error("page error:", e.message));
  await page.goto(pathToFileURL(tmp).href);
  await page.waitForFunction(() => window.__pagedDone === true, null, { timeout: 180000 });
  const pages = await page.evaluate(() => document.querySelectorAll(".pagedjs_page").length);
  const name = i === 0 ? "family-cookbook.pdf" : "family-cookbook-alt-cover.pdf";
  await page.pdf({ path: join(OUT, name), preferCSSPageSize: true, printBackground: true, outline: true, tagged: true });
  console.log(`${name}: ${key} cover, ${RECIPES.length} recipes, ${pages} pages`);
  await page.close();
}
await browser.close();
