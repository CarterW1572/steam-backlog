/* Tree test for the Video Game Finder wireframe.
     index.html?test     (or test/)    starts a session for the next participant
     index.html?results  (or results/) moderator results: summary, CSV downloads, clear
   Every navigation click during a task is recorded. Results are kept in this
   browser's localStorage until cleared, so they survive reloads. A session belongs
   to the tab it was started in (sessionStorage); other tabs show the normal site.
   Loaded after the main script: uses its GAMES, VIEWS, parseRoute and render.   */
(function () {
  "use strict";

  const TASKS = [
    { id: 1,  target: "Counter-Strike 2",
      text: "You want a serious, tactical team shooter with realistic guns, not cartoony heroes or building.",
      checks: "Competitive Multiplayer, which 6 of 8 sorters grouped together" },
    { id: 2,  target: "Gran Turismo 7",
      text: "You’re looking for a game where you race cars on realistic tracks.",
      checks: "Racing, the strongest and most consistent category" },
    { id: 3,  target: "Super Smash Bros. Ultimate",
      text: "You and some friends want a party fighting game to play together on the same couch.",
      checks: "A card that moved between groups: tests the local-play path vs. Competitive Multiplayer" },
    { id: 4,  target: "Minecraft",
      text: "You want to build and survive in a blocky world you can shape however you like.",
      checks: "Build & Strategize, where only 2 cards sit" },
    { id: 5,  target: "Civilization VII",
      text: "You want a long turn-based game where you grow an empire.",
      checks: "Biggest splitter: does Build & Strategize or Competitive Multiplayer win" },
    { id: 6,  target: "Elden Ring",
      text: "You want a dark fantasy action game with tough boss fights.",
      checks: "Hardest label (“Souls-like” dropped): tests Action & Adventure" },
    { id: 7,  target: "Marvel's Spider-Man 2",
      text: "You want a story-driven superhero game you play alone.",
      checks: "Single-player path, plus Action & Adventure vs. Competitive Multiplayer confusion with Marvel Rivals" },
    { id: 8,  target: "League of Legends",
      text: "You want a 5-vs-5 arena game where teams fight to destroy a base.",
      checks: "Battle arena inside Competitive Multiplayer" },
    { id: 9,  target: "Animal Crossing",
      text: "You want a relaxed game to play alone where you develop and customize a community.",
      checks: "Another card that doesn't fit one category, in the chill / low-skill space" },
    { id: 10, target: "Grand Theft Auto V",
      text: "You want an open-world crime game set in a big modern city.",
      checks: "A card the sorters scattered, including into Racing and Creative" },
  ];
  // Each participant gets the tasks in a random order to spread out learning effects.
  // Set to false to always use the order above.
  const SHUFFLE = true;
  // A tree test checks the category structure, so participants don't get the
  // search box. Set to true to let them search (a game picked from the
  // suggestions or the results page still ends the task).
  const SEARCH_IN_TEST = false;

  const KEY = "video-game-finder-tree-test";
  const TAB_KEY = "video-game-finder-tree-test-tab";
  // Leaving the path by any of these counts as backtracking (not a direct success).
  const BACKTRACK = ["back", "breadcrumb", "home", "browser nav"];

  TASKS.forEach(t => {
    if (!GAMES.some(g => g.name === t.target)) console.warn(`Tree test: no game named "${t.target}"`);
  });

  /* ---------- helpers ---------- */

  function el(tag, attrs, text) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => node.setAttribute(k, v));
    if (text != null) node.textContent = text;
    return node;
  }

  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  const pad = n => String(n).padStart(2, "0");
  const formatDateTime = ms => {
    const d = new Date(ms);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  const secs = ms => (ms / 1000).toFixed(1);
  const pct = (n, d) => (d ? Math.round((100 * n) / d) + "%" : "–");
  function median(list) {
    if (!list.length) return null;
    const s = [...list].sort((a, b) => a - b), m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }

  // Readable name for a route, e.g. "By Genre > Racing", "Search: "kart"" or "Game: Elden Ring".
  function pageName(hash) {
    const [path, query = ""] = (hash || "").replace(/^#\/?/, "").split("?");
    const [viewId, catId, gameId] = path.split("/").filter(Boolean);
    if (viewId === "search") {
      const game = catId && GAMES.find(g => g.id === catId);
      return game ? `Game: ${game.name}` : `Search: "${new URLSearchParams(query).get("q") || ""}"`;
    }
    const V = VIEWS[viewId];
    const cat = V && V.categories.find(c => c.id === catId);
    if (!cat) return "Home";
    const game = gameId && GAMES.find(g => g.id === gameId);
    return game ? `Game: ${game.name}` : `${V.label} > ${cat.label}`;
  }

  // Home-page categories (in either view) whose list holds the target.
  function correctFirstClicks(target) {
    const game = GAMES.find(g => g.name === target);
    if (!game) return [];
    return Object.values(VIEWS).flatMap(V =>
      V.categories.filter(c => V.inCategory(game, c.id)).map(c => c.label));
  }

  /* ---------- saved state ---------- */

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { sessions: [] }; }
    catch (e) { return { sessions: [] }; }
  }

  // Merges this tab's session into what's stored, so another tab (say, the
  // results page) isn't overwritten.
  let storageOk = true;
  function save() {
    if (!session) return;
    try {
      const state = load();
      const i = state.sessions.findIndex(s => s.id === session.id);
      if (i === -1) state.sessions.push(session); else state.sessions[i] = session;
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { storageOk = false; }
  }

  // What this tab is doing: { pending: true } (name screen), { sessionId } (running),
  // { thanks: true } (finished), or null (normal site).
  function loadTab() {
    try { return JSON.parse(sessionStorage.getItem(TAB_KEY)); } catch (e) { return null; }
  }
  function saveTab() {
    try { tab ? sessionStorage.setItem(TAB_KEY, JSON.stringify(tab)) : sessionStorage.removeItem(TAB_KEY); }
    catch (e) { /* the tab just won't remember its session */ }
  }

  const params = new URLSearchParams(location.search);
  const mode = params.has("results") ? "results" : "site";
  let tab = loadTab();
  let session = null;
  if (tab && tab.sessionId) {
    session = load().sessions.find(s => s.id === tab.sessionId) || null;
    if (!session) { tab = null; saveTab(); } // results were cleared
  }

  // ?test sets this tab up for a new participant (an unfinished session stays saved
  // as incomplete). The ?test is dropped so a reload doesn't start another one.
  if (params.has("test") && mode !== "results") {
    session = null;
    tab = { pending: true };
    saveTab();
    history.replaceState(null, "", location.pathname + "#/");
    render();
  }

  function startSession(name) {
    const order = SHUFFLE ? shuffle(TASKS.slice()) : TASKS.slice();
    session = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      participant: name,
      start: Date.now(),
      status: "incomplete",
      phase: "intro",
      pos: 0,
      // Each session keeps its own copy of the tasks, so results still read
      // correctly if the task list above changes later.
      tasks: order.map(t => ({
        id: t.id, text: t.text, target: t.target, checks: t.checks,
        correctFirstClicks: correctFirstClicks(t.target),
        startedAt: null, endedAt: null, outcome: "", actions: [],
      })),
    };
    save();
    tab = { sessionId: session.id };
    saveTab();
  }

  const running = () => !!session && session.phase === "running";
  const currentTask = () => session.tasks[session.pos];

  /* ---------- recording ---------- */

  function track(type, label, to, from) {
    currentTask().actions.push({ type, label, page: from || pageName(location.hash), to: to || "", at: Date.now() });
    save();
  }

  // The game a click opens: a game card, or a search suggestion ("Suggestion: <name>").
  function gamePicked(type, label) {
    if (type === "game") return label;
    if (type === "suggestion") return label.replace(/^Suggestion: /, "");
    return null;
  }

  // Route the participant just clicked toward; a hashchange to anywhere else is
  // the browser's Back or Forward button.
  let expected = null;

  // Capture phase, so it runs before the site's own click handler and can stop
  // a successful card click from opening the game page.
  document.addEventListener("click", e => {
    if (!running() || e.target.closest(".tt-bar, .tt-modal")) return;
    const node = e.target.closest("[data-log]");
    if (!node) return;
    const type = node.dataset.type || "home"; // the header button has no type
    if (type === "filter") {
      track("filter", `${node.dataset.log} (${node.checked ? "on" : "off"})`);
      return;
    }
    expected = node.dataset.route;
    track(type, node.dataset.log, pageName(node.dataset.route));
    if (gamePicked(type, node.dataset.log) === currentTask().target) {
      e.stopPropagation();
      e.preventDefault();
      endTask("success");
    }
  }, true);

  window.addEventListener("hashchange", e => {
    const wasExpected = location.hash === expected;
    expected = null;
    if (!running() || wasExpected) return;
    track("browser nav", "Browser back/forward", pageName(location.hash), pageName(new URL(e.oldURL).hash));
  });

  function giveUp() {
    track("give up", "I give up");
    endTask("give up");
  }

  // Ends the task and returns to the home page for the next one (or the thank-you).
  function endTask(outcome) {
    const task = currentTask();
    task.outcome = outcome;
    task.endedAt = Date.now();
    session.pos += 1;
    const finished = session.pos >= session.tasks.length;
    session.phase = finished ? "done" : "intro";
    if (finished) session.status = "complete";
    save();
    if (finished) { session = null; tab = { thanks: true }; saveTab(); }
    goHome();
    showUI();
  }

  // Replaces the current entry, so the switch to the next task isn't a history step.
  function goHome() {
    history.replaceState(null, "", location.pathname + "#/");
    render();
  }

  /* ---------- participant screens ---------- */

  let shown = [];

  function clearUI() {
    shown.forEach(node => {
      if (node.tagName === "DIALOG") { node.dataset.closing = ""; if (node.open) node.close(); }
      node.remove();
    });
    shown = [];
    document.body.style.paddingBottom = "";
  }

  function modal(heading, paragraphs, extra) {
    const dialog = el("dialog", { class: "tt-modal", "aria-labelledby": "tt-modal-heading" });
    dialog.appendChild(el("h2", { id: "tt-modal-heading" }, heading));
    paragraphs.forEach(text => dialog.appendChild(el("p", null, text)));
    if (extra) dialog.appendChild(extra);
    // Escape doesn't dismiss it: the participant has to use the button.
    dialog.addEventListener("cancel", e => e.preventDefault());
    dialog.addEventListener("close", () => { if (!("closing" in dialog.dataset)) dialog.showModal(); });
    document.body.appendChild(dialog);
    dialog.showModal();
    shown.push(dialog);
    return dialog;
  }

  function showReady() {
    const form = el("form", { class: "tt-form" });
    const label = el("label", { for: "tt-name" }, "Your name");
    const input = el("input", { id: "tt-name", type: "text", autocomplete: "off", required: "" });
    const error = el("p", { class: "tt-error", role: "alert", hidden: "" }, "Please enter your name to start.");
    form.append(label, input, error, el("button", { type: "submit", class: "tt-primary" }, "Start"));
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = input.value.trim();
      if (!name) { error.hidden = false; input.focus(); return; }
      startSession(name);
      showUI();
    });
    modal("Before you start", [
      `You'll be asked to find ${TASKS.length} games on a website for browsing a video game backlog, one at a time.`,
      "Click around the way you normally would. When you find the game, click it.",
      "If you can't find it, click \"I give up\" at the bottom of the screen. That helps us too.",
      "We're testing the website, not you.",
    ], form);
    input.focus();
  }

  function showIntro() {
    const task = currentTask();
    const start = el("button", { type: "button", class: "tt-primary" }, "Start task");
    start.addEventListener("click", () => {
      goHome();
      task.startedAt = Date.now();
      session.phase = "running";
      save();
      showUI();
    });
    modal(`Task ${session.pos + 1} of ${session.tasks.length}`, [task.text, "When you find it, click the game."], start);
    start.focus();
  }

  function showThanks() {
    modal("Thank you, you're done", ["Please let the moderator know you've finished."]);
  }

  function showBar() {
    const task = currentTask();
    const bar = el("div", { class: "tt-bar", role: "region", "aria-label": "Your task" });
    const text = el("p", { class: "tt-task" }, `Task ${session.pos + 1} of ${session.tasks.length}: ${task.text}`);
    const giveUpButton = el("button", { type: "button" }, "I give up");
    giveUpButton.addEventListener("click", giveUp);
    bar.append(text, giveUpButton);
    document.body.appendChild(bar);
    shown.push(bar);
    // Room at the bottom of the page so the bar never covers games or filters.
    document.body.style.paddingBottom = bar.offsetHeight + 16 + "px";
  }

  function showUI() {
    clearUI();
    if (!SEARCH_IN_TEST) document.getElementById("search").hidden = true;
    if (!session) {
      if (tab && tab.pending) showReady();
      else if (tab && tab.thanks) showThanks();
      return;
    }
    if (session.phase === "intro") showIntro();
    else if (session.phase === "running") showBar();
  }

  /* ---------- results page (moderator) ---------- */

  function summarize(task) {
    const nav = task.actions.filter(a => a.type !== "give up");
    const first = nav[0];
    return {
      firstClick: first ? first.label : "",
      firstClickCorrect: !!first && first.type === "category" && task.correctFirstClicks.includes(first.label),
      firstClickSeconds: first ? (first.at - task.startedAt) / 1000 : null,
      seconds: task.endedAt ? (task.endedAt - task.startedAt) / 1000 : null,
      clicks: nav.length,
      backtracks: nav.filter(a => BACKTRACK.includes(a.type)).length,
      // Straight there: no backtracking and no wrong game opened on the way.
      direct: task.outcome === "success" &&
        !nav.some(a => BACKTRACK.includes(a.type) || ![null, task.target].includes(gamePicked(a.type, a.label))),
      path: nav.map(a => a.label).join(" > "),
    };
  }

  // Every finished task attempt, flattened with its session.
  function attempts(state) {
    return state.sessions.flatMap(s => s.tasks
      .map((t, i) => ({ s, t, position: i + 1 }))
      .filter(x => x.t.outcome)
      .map(x => ({ ...x, sum: summarize(x.t) })));
  }

  function csvCell(value) {
    const v = value == null ? "" : String(value);
    return /[",\r\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
  }
  const toCsv = (cols, rows) => [cols, ...rows].map(r => r.map(csvCell).join(",")).join("\r\n") + "\r\n";

  const yesNo = b => (b ? "yes" : "no");

  // One row per task attempt: the By task table's columns, grouped by participant
  // (in the order they took the test) and sorted by task number within each.
  function taskCsv(state) {
    const cols = ["participant", "task_id", "task_text", "target", "what_it_checks", "success", "direct_success",
      "gave_up", "first_click_correct", "first_click", "seconds",
      "session_start", "session_status", "order_shown", "first_click_seconds", "clicks", "backtracks", "click_path"];
    const order = new Map(state.sessions.map((s, i) => [s.id, i]));
    const rows = attempts(state).sort((a, b) => order.get(a.s.id) - order.get(b.s.id) || a.t.id - b.t.id);
    return toCsv(cols, rows.map(({ s, t, position, sum }) => [
      s.participant, t.id, t.text, t.target, t.checks, yesNo(t.outcome === "success"), yesNo(sum.direct),
      yesNo(t.outcome === "give up"), yesNo(sum.firstClickCorrect), sum.firstClick, sum.seconds.toFixed(1),
      formatDateTime(s.start), s.status, position,
      sum.firstClickSeconds == null ? "" : sum.firstClickSeconds.toFixed(1), sum.clicks, sum.backtracks, sum.path,
    ]));
  }

  // One row per recorded click, including tasks a participant didn't finish.
  function clickCsv(state) {
    const cols = ["participant", "session_id", "task_position", "task_id", "target", "outcome",
      "click_number", "type", "label", "page", "went_to", "seconds_since_task_start"];
    const rows = [];
    state.sessions.forEach(s => s.tasks.forEach((t, i) => t.actions.forEach((a, n) => rows.push([
      s.participant, s.id, i + 1, t.id, t.target, t.outcome, n + 1, a.type, a.label, a.page, a.to,
      secs(a.at - t.startedAt),
    ]))));
    return toCsv(cols, rows);
  }

  function download(name, text, mime) {
    const url = URL.createObjectURL(new Blob([text], { type: mime }));
    const now = new Date();
    const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
    const dot = name.lastIndexOf(".");
    const link = el("a", { href: url, download: `${name.slice(0, dot)}-${stamp}${name.slice(dot)}` });
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function table(headers, rows) {
    const t = el("table", { class: "tt-table" });
    const head = el("tr");
    headers.forEach(h => head.appendChild(el("th", { scope: "col" }, h)));
    t.appendChild(el("thead")).appendChild(head);
    const body = t.appendChild(el("tbody"));
    rows.forEach(r => {
      const tr = body.appendChild(el("tr", r.cls ? { class: r.cls } : null));
      r.forEach(v => tr.appendChild(el("td", null, v == null ? "" : String(v))));
    });
    const wrap = el("div", { class: "tt-scroll" });
    wrap.appendChild(t);
    return wrap;
  }

  function mostCommon(list) {
    const counts = {};
    list.forEach(x => (counts[x] = (counts[x] || 0) + 1));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return top ? `${top[0]} (${top[1]})` : "–";
  }

  function buildResults() {
    const state = load();
    const main = document.getElementById("main");
    document.title = "Tree test results | Video Game Finder";
    main.innerHTML = "";
    main.appendChild(el("h1", null, "Tree test results"));

    const intro = el("p");
    intro.append("Results are saved in this browser. To run a session, open ",
      el("a", { href: "index.html?test" }, "index.html?test"), ".");
    main.appendChild(intro);

    if (!storageOk) main.appendChild(el("p", { role: "alert" }, "This browser isn't letting the page save results."));
    if (!state.sessions.length) { main.appendChild(el("p", null, "No sessions saved yet.")); return; }

    const all = attempts(state);

    const actions = el("div", { class: "tt-actions" });
    [["Download task CSV", () => download("tree-test-tasks.csv", taskCsv(state), "text/csv")],
     ["Download click CSV", () => download("tree-test-clicks.csv", clickCsv(state), "text/csv")],
     ["Download JSON", () => download("tree-test.json", JSON.stringify(state, null, 2), "application/json")],
    ].forEach(([label, fn]) => {
      const b = el("button", { type: "button" }, label);
      b.addEventListener("click", fn);
      actions.appendChild(b);
    });
    const clearButton = el("button", { type: "button" }, "Clear all results");
    actions.appendChild(clearButton);
    main.appendChild(actions);

    const count = state.sessions.length;
    const confirmBox = el("div", { class: "tt-confirm", role: "alert", hidden: "" });
    confirmBox.appendChild(el("p", null, `Delete all ${count} ${count === 1 ? "session" : "sessions"}? ` +
      "Download the CSVs first if you need them. This can't be undone."));
    const yes = el("button", { type: "button" }, "Yes, delete all");
    const no = el("button", { type: "button" }, "Cancel");
    confirmBox.append(yes, no);
    main.appendChild(confirmBox);
    clearButton.addEventListener("click", () => { confirmBox.hidden = false; no.focus(); });
    no.addEventListener("click", () => { confirmBox.hidden = true; clearButton.focus(); });
    yes.addEventListener("click", () => {
      try { localStorage.removeItem(KEY); } catch (e) { storageOk = false; }
      buildResults();
    });

    main.appendChild(el("h2", null, "By task"));
    main.appendChild(el("p", null, "Direct = found without backtracking or opening a wrong game. " +
      "First click correct = a home-page category (either view) whose list holds the target."));
    main.appendChild(el("p", null, "Each task's first row covers all participants (first click is the " +
      "most common one, time is the median); the rows under it are each participant's attempt."));
    main.appendChild(table(
      ["#", "Task", "Target", "What it checks", "Participant", "Success", "Direct", "Gave up",
       "First click correct", "First click", "Time (s)"],
      TASKS.flatMap(task => {
        const rows = all.filter(a => a.t.id === task.id);
        const time = median(rows.map(a => a.sum.seconds));
        const summary = Object.assign([task.id, task.text, task.target, task.checks, `All participants (${rows.length})`,
          pct(rows.filter(a => a.t.outcome === "success").length, rows.length),
          pct(rows.filter(a => a.sum.direct).length, rows.length),
          pct(rows.filter(a => a.t.outcome === "give up").length, rows.length),
          pct(rows.filter(a => a.sum.firstClickCorrect).length, rows.length),
          mostCommon(rows.map(a => a.sum.firstClick).filter(Boolean)),
          time == null ? "–" : time.toFixed(1)], { cls: "tt-summary" });
        return [summary, ...rows.map(({ s, t, sum }) => ["", "", "", "", s.participant,
          yesNo(t.outcome === "success"), yesNo(sum.direct), yesNo(t.outcome === "give up"),
          yesNo(sum.firstClickCorrect), sum.firstClick || "–", sum.seconds.toFixed(1)])];
      })));

    main.appendChild(el("h2", null, "By participant"));
    main.appendChild(table(
      ["Participant", "Started", "Status", "Tasks completed", "Successes", "Gave up"],
      state.sessions.map(s => [s.participant, formatDateTime(s.start), s.status,
        `${s.tasks.filter(t => t.outcome).length} of ${s.tasks.length}`,
        s.tasks.filter(t => t.outcome === "success").length,
        s.tasks.filter(t => t.outcome === "give up").length])));

    main.appendChild(el("h2", null, "Click paths"));
    state.sessions.forEach(s => {
      const details = el("details", { class: "tt-details" });
      details.appendChild(el("summary", null, `${s.participant} (${formatDateTime(s.start)})`));
      details.appendChild(table(
        ["Order", "Task", "Target", "Outcome", "Time (s)", "First click", "Path"],
        s.tasks.map((t, i) => {
          const sum = summarize(t);
          return [i + 1, t.id, t.target, t.outcome || "not finished",
            sum.seconds == null ? "" : sum.seconds.toFixed(1), sum.firstClick, sum.path];
        })));
      main.appendChild(details);
    });
  }

  /* ---------- start ---------- */

  if (mode === "results") {
    // Opening the results page releases a tab that was showing the thank-you.
    if (tab && tab.thanks) { tab = null; saveTab(); }
    window.removeEventListener("hashchange", render);
    ["header", "#crumbs"].forEach(sel => (document.querySelector(sel).hidden = true));
    // The results page keeps the plain wireframe look, not the site's design.
    document.body.classList.add("tt-plain");
    buildResults();
  } else if (tab) {
    // Tasks always start on the home page.
    if (!running() && location.hash !== "#/") goHome();
    showUI();
  }
})();
