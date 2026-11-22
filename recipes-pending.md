# Family Recipes — Pending Recipes

This is the one transition file for the cookbook. It holds recipes that are finished but not yet on the live page. The live page itself is the master copy of the book:

**Live cookbook:** https://adamevelynlcsw-hash.github.io/dads-cookbook/ (repo `dads-cookbook`, single file `index.html`)

## How updates work

1. A new or changed recipe goes below, as a block that starts with a header line: `@@ Chapter › Sub-chapter | final` (or `| draft`), then `# Title`, `### one-line description`, then the recipe in the book's usual format (see `CLAUDE.md`).
2. At update time, each block is pasted into the `<script id="book">` section of `index.html` in chapter order (replacing the old block if it's a change), committed and pushed to `main`. GitHub Pages publishes it automatically.
3. Then this section is cleared back to "None". No logs, old copies, or recipes that were passed on.

## Pending

None
