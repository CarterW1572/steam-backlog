# steam-backlog

Low-fidelity, click-through wireframe for organizing a game backlog. The categories and labels come from our card sort (8 participants, 25 cards).

## Two views of the same 25 blocks

| View | Level 1 | Level 2 | Leaf |
|---|---|---|---|
| By Genre | Competitive Multiplayer, Racing, Action & Adventure, Build & Strategize | Singleplayer, Multiplayer | Game placeholder page |
| By How You Play | Singleplayer, Online Multiplayer, Couch & Local | Family-Friendly, Mature | Game placeholder page |

All 25 games can be reached in both views. Subcategories with no games are hidden.

## Click log

Every click on the site is recorded in the browser's localStorage. Use the footer buttons to download the log as JSON or CSV, copy it as JSON, show it, or clear it.

## Run locally

```
python -m http.server 8356
```

Then open http://localhost:8356.
