# Video Game Finder

Click-through prototype for organizing a game backlog. The categories and labels come from our card sort (8 participants, 25 cards).

## Two views of the same 25 blocks

| View | Categories | Filters (checkboxes) | Leaf |
|---|---|---|---|
| By Genre | Competitive Multiplayer, Racing, Action & Adventure, Build & Strategize | Players (Singleplayer, Multiplayer); Audience (Family-Friendly, Mature) | Game page |
| By How You Play | Singleplayer, Online Multiplayer, Couch & Local | Genre (the four genres); Audience (Family-Friendly, Mature) | Game page |

The home page shows both views as sections. Each category opens a list of its games, with filters on the left. Within a group, checked filters are combined with OR; across groups, with AND. Filters are saved in the URL, so Back from a game page keeps them, and opening a different category starts with no filters. All 25 games can be reached in both views.

## Game pages

Each game page shows the game's cover art, a short description, its tags, and the platforms it's on with a price for each. These details are in `game-details.js`, keyed by game id, and merged into the game list in `index.html`, so each fact is stored once.

- **Cover art** is linked from the official stores (Steam, Nintendo, PlayStation, Epic, Xbox), not stored in the repo. If an image doesn't load, the game's initials show instead.
- **Tags** on the page are every category the game belongs to (genre, players, how you play, audience), plus store-style tags such as Open World, Souls-like or Battle Royale.
- **Platforms** include every platform the game came out on. Prices are US list prices for the standard edition on each platform's official store, not sale prices, checked in October 2026. Platforms where it can't be bought anymore say "No longer sold". Update `PRICES_CHECKED` in `game-details.js` when you recheck them.

## Search

The search box in the header searches the same 25 games; nothing is copied. A game matches on its name, a nickname (`gta`, `civ 7`, `totk`), its store tags (`souls like`, `moba`, `cozy`), or the labels of its genre, players, play style and audience, plus synonyms for those labels and tags (`kids` for Family-Friendly, `couch` for Couch & Local, `shooter` for FPS). Misspellings after the first letter are allowed (`zelad`, `minecarft`), and unfinished words match as you type. Every word has to match; words that match no game are ignored and listed on the results page. If no game matches every word, the page shows games that match some of them.

Suggestions appear under the box as you type (arrow keys and Enter, or click). Enter or Search opens the results page at `#/search?q=...`, and a game opened from there keeps the query, so Back returns to the results. Synonyms, tag synonyms and nicknames are at the top of the search section in `index.html`. Tree test participants don't see the search box unless `SEARCH_IN_TEST` in `tree-test.js` is set to true.

## Visual design

Dark, rounded cards on a purple color scheme, set in Inter (loaded from Google Fonts). The colors are defined once as CSS variables at the top of the stylesheet in `index.html`:

| Token | Value | Used for |
|---|---|---|
| `--shade` | `hsl(265 40% 17%)` | Surfaces: cards, panels, search box, suggestion list |
| `--base` | `hsl(265 70% 58%)` | Things you act on: hover and focus borders, checkboxes, the logo mark, selected suggestion, cover art |
| `--tint` | `hsl(265 90% 84%)` | Links and highlights on purple: breadcrumbs, card arrows, cover initials |
| `--accent` | `hsl(45 100% 55%)` | Only where the eye goes first: the Search button, the home page's section headings, and each page's title |

The other colors are neutral grays (background, text, muted text, lines). Cards and panels use a 16px radius; buttons, the search box and tags are pill-shaped. Header, breadcrumbs and page content share one 1120px column, and the home page's category cards sit in a four-column grid so both views' cards line up.

The tree test's participant pop-ups, task bar and results page keep the plain black-and-white wireframe look.

## Tree test

- `test/` (or `index.html?test`) starts a session for the next participant. They enter their name, then get 10 tasks one at a time, in random order. Each task starts on the home page with the task shown in a bar at the bottom. Clicking the target game ends the task and moves on to the next one. "I give up" skips it.
- `results/` (or `index.html?results`) is the moderator's page: success, direct success, give-up, first-click and time numbers per task; a table of participants; each participant's click paths; CSV downloads (one row per task, or one row per click), a JSON download, and a button to clear everything.

Every navigation click, filter change and browser Back/Forward during a task is recorded. A first click is counted correct when it's a home-page category, in either view, whose list holds the target. Results are saved in the browser's localStorage, so run every session in the same browser and download the CSVs before clearing it. The tasks and the `SHUFFLE` setting are at the top of `tree-test.js`.

## Run locally

```
python -m http.server 8356
```

Then open http://localhost:8356.

## Run online

https://carterw1572.github.io/steam-backlog/

## Tree Test links

Test: https://carterw1572.github.io/steam-backlog/test/
Results: https://carterw1572.github.io/steam-backlog/results/
