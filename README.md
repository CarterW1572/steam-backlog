# Video Game Finder

Click-through prototype for finding a game to play. The categories and labels come from our card sort (8 participants, 25 cards); the site now has 75 games, with 50 popular titles added to balance the categories.

## Two views of the same 75 games

| View | Categories | Filters (checkboxes) | Leaf |
|---|---|---|---|
| By Genre | Competitive Multiplayer, Racing, Action & Adventure, Build & Strategize | Console; Game Type; Price; Players (Singleplayer, Multiplayer); Audience (Family-Friendly, Mature) | Game page |
| By How You Play | Singleplayer, Online Multiplayer, Couch & Local | Console; Genre (the four genres); Game Type; Price; Audience (Family-Friendly, Mature) | Game page |

The home page shows both views as sections. Breadcrumbs appear once you leave the home page and list only the pages you clicked through (Home › Racing › Mario Kart 8 Deluxe); the view, "By Genre" or "By How You Play", is shown above the category's title instead. Each category opens a list of its games, with filters on the left. Within a group, checked filters are combined with OR; across groups, with AND. Each group's heading says "any of" to make the OR visible: checking PC and PlayStation 5 shows games you can play on either one. Above the games, the checked filters are written out the same way ("Console: PC or PlayStation 5 and Price: Under $20"), each with an × that unchecks it. Each group's heading works like a dropdown: all groups start open, and clicking a heading folds that group away (and back) so the others are easier to see. A closed group with filters checked shows how many, as in "Console · any of (1)", and stays closed while you filter. Each option shows how many games checking it would leave, counting the other groups' filters. Options that no game in the list has are hidden, and options the other filters rule out are greyed out, so a filter never leads to an empty list. "Clear all" unchecks every filter. The Price filter goes by a game's lowest current price on any platform: Free to play, Under $20, $20 to $40, or $40 and up. The Sort menu above the list (a button that drops down a list of orders) sorts by Featured (the list's own order), Name ↑/↓ (A to Z or Z to A), Price ↑/↓ (low to high or high to low) or Release date ↑/↓ (oldest or newest first). Filters and sort order are saved in the URL, so Back from a game page keeps them, and opening a different category starts with no filters. All 75 games can be reached in both views.

| Category | Games |
|---|---|
| Competitive Multiplayer | 18 |
| Racing | 18 |
| Action & Adventure | 21 |
| Build & Strategize | 21 |
| Singleplayer | 64 |
| Online Multiplayer | 58 |
| Couch & Local | 20 |

A game can be in more than one How You Play category. The three fighting games (Super Smash Bros. Ultimate, Street Fighter 6, Tekken 8) are in both Competitive Multiplayer and Action & Adventure, because talk-aloud participants looked for them in both places. 46 games are Family-Friendly and 29 are Mature.

## Game Type

The store tags in `game-details.js` (129 different ones, half of them used by only one game) are too many and too uneven to filter by directly, so the Game Type filter groups them into 15 kinds of game: Shooter, Fighting, Battle Arena (MOBA), Sports, Party, Arcade & Kart Racing, Racing Sim, RPG, Open World, Platformer, Story-Rich, Strategy, City & Base Building, Sandbox & Survival, and Cozy & Life Sim. A game can be more than one type. Which tags make up each type is set in `GAME_TYPE` in `index.html`; a new game gets its types from its tags.

## Consoles

The talk-aloud study's top request was to see only games for your console. The Console filter (first in every filter panel, and on the search results page) has PC, PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One, Nintendo Switch 2, Nintendo Switch and Mobile. A game counts for a console when it's sold today on that platform, or on one the console plays through backward compatibility: PS4 games show under PlayStation 5, Xbox One games under Xbox Series X|S, and Switch games under Switch 2. Platforms marked "No longer sold" don't count. The mapping is `CONSOLES` in `index.html`, worked out from the platforms in `game-details.js`.

## Game cards

Each card shows the kind of game (its first store tag, such as Fighting, FPS or Kart Racing, outlined in purple), its genre and audience, the consoles it plays on, how you can play it (Solo, Online, Couch & local), and its price ("From" when it costs different amounts on different platforms).

## Game pages

Each game page shows the game's cover art, a short description, its tags, and the platforms it's on with a price for each. These details are in `game-details.js`, keyed by game id, and merged into the game list in `index.html`, so each fact is stored once.

- **At a glance** sums up the game's type, genre, players, the consoles it plays on, audience, price and release date, next to the platform list.
- **Tags** at the top and under About are links: clicking one opens a search for that tag (Kart Racing, Open World, Couch & Local...). During a tree test, when the search box is hidden, they're plain text.
- **Release dates** are in `game-details.js` (`released`). For a game that replaced an earlier version (Counter-Strike 2, Overwatch) it's that version's date; for one that began in early access, its 1.0 release.
- **Cover art** is linked from the official stores (Steam, Nintendo, PlayStation, Epic, Xbox), not stored in the repo. If an image doesn't load, the game's initials show instead.
- **Tags** on the page are every category the game belongs to (genre, players, how you play, audience), plus store-style tags such as Open World, Souls-like or Battle Royale.
- **Related games** sit at the bottom, in two rows of small cards (cover, name, kind of game, price) that scroll sideways four at a time with arrows, or by swiping on a phone:
  - **More like this**: the 8 games that share the most with this one. Shared Game Types count most, then shared store tags, then genre, how you play and audience (`similarity` in `index.html`).
  - **More [category] games** (such as "More Racing games"): the rest of the category the user came from, with their filters and sort order, starting after this game. When filters are checked, the row says so ("Filtered to PC, Under $20"). From search, it's **More results for "..."** instead. "See all" opens the whole list. A game already shown in More like this isn't repeated, and a row with no games is left out.
  - A game in the list the user came from opens there, so Back and the breadcrumbs keep the user's path. Any other game opens under its first genre.
  - Tree test participants don't see these rows unless `RELATED_IN_TEST` in `tree-test.js` is set to true, since they'd let participants jump between games without using the categories.
- **Platforms** include every platform the game came out on. Prices are US list prices for the standard edition on each platform's official store, not sale prices, checked in October 2026. Platforms where it can't be bought anymore say "No longer sold". Update `PRICES_CHECKED` in `game-details.js` when you recheck them.

## Search

The search box in the header searches the same 75 games; nothing is copied. A game matches on its name, a nickname (`gta`, `civ 7`, `totk`), its store tags (`souls like`, `moba`, `cozy`), the consoles it plays on (`ps4`, `switch`, `pc`, `xbox`), or the labels of its genre, players, play style and audience, plus synonyms for those labels and tags (`kids` for Family-Friendly, `couch` for Couch & Local, `shooter` for FPS). Misspellings after the first letter are allowed (`zelad`, `minecarft`), and unfinished words match as you type. Every word has to match; words that match no game are ignored and listed on the results page. If no game matches every word, the page shows games that match some of them.

The results page has the same filters as a category (Console, Genre, Game Type, Price, How You Play, Audience) and the same Sort menu, with Best match as the default, so results can be narrowed without going back to the home page. A new search starts with no filters.

Suggestions appear under the box as you type (arrow keys and Enter, or click). Enter or Search opens the results page at `#/search?q=...`, and a game opened from there keeps the query, so Back returns to the results. Synonyms, console and tag synonyms, and nicknames are at the top of the search section in `index.html`. Tree test participants don't see the search box unless `SEARCH_IN_TEST` in `tree-test.js` is set to true.

## Visual design

Dark, rounded cards on a purple color scheme, set in Inter (loaded from Google Fonts). The colors are defined once as CSS variables at the top of the stylesheet in `index.html`:

| Token | Value | Used for |
|---|---|---|
| `--shade` | `hsl(265 40% 17%)` | Surfaces: cards, panels, search box, suggestion list |
| `--base` | `hsl(265 70% 58%)` | Things you act on: hover and focus borders, checkboxes, the logo mark, selected suggestion, cover art |
| `--tint` | `hsl(265 90% 84%)` | Links and highlights on purple: breadcrumbs, card arrows, cover initials |
| `--accent` | `hsl(45 100% 55%)` | Only where the eye goes first: the Search button, the home page's section headings, and each page's title |

The other colors are neutral grays (background, text, muted text, lines). Cards and panels use a 16px radius; buttons, the search box and tags are pill-shaped. Header, breadcrumbs and page content share one 1120px column, and the home page's category cards sit in a four-column grid so both views' cards line up.

Each home-page category card has a background collage of four covers from that category, spread through its list. The collage is blurred and dimmed until you hover over the card (or tab to it), when it comes into focus.

The tree test's participant pop-ups, task bar and results page keep the plain black-and-white wireframe look.

## Tree test

- `test/` (or `index.html?test`) starts a session for the next participant. They enter their name, then get 10 tasks one at a time, in random order. Each task starts on the home page with the task shown in a bar at the bottom. Clicking the target game ends the task and moves on to the next one. "I give up" skips it.
- `results/` (or `index.html?results`) is the moderator's page: success, direct success, give-up, first-click and time numbers per task; a table of participants; each participant's click paths; CSV downloads (one row per task, or one row per click), a JSON download, and a button to clear everything.

Every navigation click, filter change, sort change and browser Back/Forward during a task is recorded. A first click is counted correct when it's a home-page category, in either view, whose list holds the target. Results are saved in the browser's localStorage, so run every session in the same browser and download the CSVs before clearing it. The tasks and the `SHUFFLE` setting are at the top of `tree-test.js`.

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
