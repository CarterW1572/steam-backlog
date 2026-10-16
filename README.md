# Video Game Finder

Low-fidelity, click-through wireframe for organizing a game backlog. The categories and labels come from our card sort (8 participants, 25 cards).

## Two views of the same 25 blocks

| View | Categories | Filters (checkboxes) | Leaf |
|---|---|---|---|
| By Genre | Competitive Multiplayer, Racing, Action & Adventure, Build & Strategize | Players (Singleplayer, Multiplayer); Audience (Family-Friendly, Mature) | Game placeholder page |
| By How You Play | Singleplayer, Online Multiplayer, Couch & Local | Genre (the four genres); Audience (Family-Friendly, Mature) | Game placeholder page |

The home page shows both views as sections. Each category opens a list of its games, with filters on the left. Within a group, checked filters are combined with OR; across groups, with AND. Filters are saved in the URL, so Back from a game page keeps them, and opening a different category starts with no filters. All 25 games can be reached in both views.

## Search

The search box in the header searches the same 25 games; nothing is copied. A game matches on its name, a nickname (`gta`, `civ 7`, `totk`), or the labels of its genre, players, play style and audience, plus synonyms for those labels (`kids` for Family-Friendly, `couch` for Couch & Local, `shooter` for Competitive Multiplayer). Misspellings after the first letter are allowed (`zelad`, `minecarft`), and unfinished words match as you type. Every word has to match; words that match no game are ignored and listed on the results page. If no game matches every word, the page shows games that match some of them.

Suggestions appear under the box as you type (arrow keys and Enter, or click). Enter or Search opens the results page at `#/search?q=...`, and a game opened from there keeps the query, so Back returns to the results. Synonyms and nicknames are at the top of the search section in `index.html`. Searches and suggestion clicks are recorded in the click log; typing isn't. Tree test participants don't see the search box unless `SEARCH_IN_TEST` in `tree-test.js` is set to true.

## Click log

Navigation clicks (home, breadcrumbs, categories, games, back) and filter checkbox changes (logged as on/off) are recorded in the browser's localStorage for tree testing. Clicks on the log controls themselves are not recorded. Use the footer buttons to download the log as JSON or CSV, copy it as JSON, show it, or clear it.

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
