# steam-backlog

Low-fidelity, click-through wireframe for organizing a game backlog. The categories and labels come from our card sort (8 participants, 25 cards).

## Two views of the same 25 blocks

| View | Categories | Filters (checkboxes) | Leaf |
|---|---|---|---|
| By Genre | Competitive Multiplayer, Racing, Action & Adventure, Build & Strategize | Players (Singleplayer, Multiplayer); Audience (Family-Friendly, Mature) | Game placeholder page |
| By How You Play | Singleplayer, Online Multiplayer, Couch & Local | Genre (the four genres); Audience (Family-Friendly, Mature) | Game placeholder page |

The home page shows both views as sections. Each category opens a list of its games, with filters on the left. Within a group, checked filters are combined with OR; across groups, with AND. Filters are saved in the URL, so Back from a game page keeps them, and opening a different category starts with no filters. All 25 games can be reached in both views.

## Click log

Navigation clicks (home, breadcrumbs, categories, games, back) and filter checkbox changes (logged as on/off) are recorded in the browser's localStorage for tree testing. Clicks on the log controls themselves are not recorded. Use the footer buttons to download the log as JSON or CSV, copy it as JSON, show it, or clear it.

## Run locally

```
python -m http.server 8356
```

Then open http://localhost:8356.
