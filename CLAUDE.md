# Family Recipes cookbook

This repo is the family cookbook, published by GitHub Pages from `main`:
https://adamevelynlcsw-hash.github.io/dads-cookbook/

The audience is an advanced, self-taught home cook and the next generation of the family. Write for an experienced cook with no formal training: clear, practical, no jargon without a reason.

## Storage rule (strict)

The book is exactly two things:

1. **`index.html`** is the master copy. Every recipe lives as plain text (markdown) inside its `<script type="text/plain" id="book">` block. Chapters and the menu are built from the `@@` header lines, in the order they appear. Don't touch the CSS or JavaScript unless asked.
2. **`recipes-pending.md`** is the one transition file. It holds finished recipes that aren't on the site yet. After they're published, clear its Pending section back to "None".

No per-recipe pages, logs, draft copies, changelogs or "addendum" files. `notes/` holds reference models (like the oil and vinegar pairing model), not recipes.

Never commit copyrighted book content (PDFs, EPUBs, photos of pages, quoted text). Those stay in the local `reference/` folder, which `.gitignore` excludes. The repo is public.

## Workflow: scout → document → add

1. **Scout.** When asked for ideas, suggest recipes that fit the house style and are not already in the book. Check `index.html` first. Only recipes the cook picks from the suggestions, or brings in, go any further. Don't track the ones that get passed on.
2. **Document.** Research first, then write the recipe in the house format below.
3. **Add.** "Add" or "update the book" means add it directly. Don't double-check or ask for confirmation.
   - Insert the block into `index.html` in its chapter, in chapter order (replace the old block if it's a change).
   - Mark it `| final` unless told it's still being tested (`| draft`).
   - Commit with a clear message (e.g. `Add Barbacoa to Tacos`) and push to `main`. Pages publishes it; there's no manual upload.
   - Confirm the Pages deploy succeeded and the recipe count went up.
   - If something is documented but not ready to publish, it goes in `recipes-pending.md` instead.

The navigation menu is fine as it is. Don't redesign the page unless asked.

## Recipe block format

```
@@ Chapter › Sub-chapter | final
# Title
### One-line description

**Serves:** 4 | **Active:** 15 min | **Total:** 45 min
**Equipment:** ...

## Ingredients
## Steps
### Option: ... (variants)
## Why This Works (Five Pillars)
## Troubleshooting        (a Problem | Fix table)
## Salt, Fat, Acid, Heat Tips
*Principles from Samin Nosrat's* Salt, Fat, Acid, Heat, *in our own words.*
## Notes for the Kids
```

Mains also get a **Serve With** (side pairings) section. Sub-recipes (sauces, salsas, pickles, slaws) get their own block so they're findable on their own, and parent recipes point to them by name and chapter.

Current chapters: Breakfast; Quick Dinners › Asian Noodles & Rice; Pasta & Mains; Sauces & Salsas; Tacos; Fire › Smoker / Grill / Burgers / Dutch Oven; Seafood; Salads & Dressings; Sides; Desserts. The `INTRO` and `PRINCIPLES` blocks are not recipes.

## Recipe conventions

- **US measures only:** cups, Tbsp, tsp. Weigh only when necessary, and then in oz and lb. Never metric. Temperatures in °F.
- **Salt is Morton kosher.** Write every salt amount for Morton.
- **Ingredients in prep order.**
- **Pat meat and fish dry** in every recipe that uses them.
- **Cook to temperature** and give the internal temp (a probe thermometer is assumed).
- Store-bought seasonings: Kinder's. Note that most Kinder's blends already contain salt.
- **Nosrat:** the five pillars extend *Salt, Fat, Acid, Heat*. Paraphrase her ideas in our own words and credit her. Never quote the book.
- Flavor-science cheat sheets belong in the Basic Principles section of the book, not in a separate file.

## Five-pillar framework

Every recipe explains itself through five pillars plus heat: **Salt, Fat, Acid, Sweet, Umami**, and **Heat (temperature)**.

House ratios and rules:

- **Salt:** 1% by weight (about 1 tsp Morton kosher per lb of meat). Brine at 2%. Salt early (dry brine ahead when there's time).
- **Fat:** match the fat to the heat (smoke points); oil in waves for high-heat cooking.
- **Acid:** acid late, to finish. In braises, acid twice: once in the braise, once fresh at the end.
- **Dressings:** 3:1 oil to vinegar is the house rule (see `notes/oil-and-vinegar.md` for flavored vinegars).
- **Sweet:** sugar comes off high heat; glazes go on at the end.
- **Heat:** sear first, then finish gently when the cut is thick.
- **Umami:** layer glutamates (soy, fish sauce, parm, tomato) with nucleotides (meat, mushrooms, fish) for synergy.

## Equipment available

Pressure cooker, slow cooker, pellet smoker (competition-blend pellets), charcoal grill, oven, stovetop, cast iron (bare iron only on the smoker and charcoal grill; enameled cast iron indoors), 24 oz Ninja Creami, CHEF iQ probe thermometer.

## Oil and vinegar pairing answers

Use the model in `notes/oil-and-vinegar.md`.

- Lead with **dressing** pairings, then glazes.
- At the store, keep it efficient: a short pick list (dark, white, wildcard), no essay.
- For a "make" request, give the full build: ratio, salt, pepper, herbs, add-ins, uses.
- Bottles on hand (Oct 2026): **oils** white truffle, rosemary, chipotle, spicy EVOO, black garlic, cilantro garlic, lemon, blood orange; **vinegars** hot honey, apple, fig, sweet onion white, espresso, cinnamon pear. Prefer these when suggesting pairings.

## Ninja Creami (Desserts)

- The machine shaves a frozen block. Casein-heavy bases freeze hard and almost always need a re-spin (re-spin with 1 Tbsp heavy cream is standard).
- Use the **Lite Ice Cream** program for high-protein bases.
- Tested base (24 oz): 1 Premier Protein shake (11 oz) + ½ cup nonfat Greek yogurt + 1 Tbsp sugar-free pudding mix + ¼ tsp guar gum + 1 Tbsp monk fruit + ⅛ tsp salt. Freeze 24–48 hr. Add dry ingredients carefully so the guar doesn't clump.
- **No banana, ever.**
