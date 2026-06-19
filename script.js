// script.js — Logique applicative (UI, état, interactions)
// Les données (fiches, terminal, scénarios) sont dans data.js,
// chargé avant ce fichier dans index.html.


let seen = new Set();
let levels = {}; // id -> 1..5
let currentFilter = "all";
let filteredList = [];
let weakFilterOn = false;

// ─── Persistence ───
function saveSeen() {
  try { localStorage.setItem("revision_seen", JSON.stringify([...seen])); } catch(e){}
}
function loadSeen() {
  try {
    const s = localStorage.getItem("revision_seen");
    if (s) seen = new Set(JSON.parse(s));
  } catch(e){}
}
function saveLevels() {
  try { localStorage.setItem("revision_levels", JSON.stringify(levels)); } catch(e){}
}
function loadLevels() {
  try {
    const s = localStorage.getItem("revision_levels");
    if (s) levels = JSON.parse(s);
  } catch(e){}
}
function saveQuizBest(pct) {
  try {
    const prev = parseInt(localStorage.getItem("revision_quiz_best") || "0");
    if (pct > prev) localStorage.setItem("revision_quiz_best", pct);
  } catch(e){}
}
function loadQuizBest() {
  try { return localStorage.getItem("revision_quiz_best") || null; } catch(e){ return null; }
}

// ─── SRS (Spaced Repetition) ───
// Données par fiche : { interval, easeFactor, due, reps }
// interval : jours avant prochain rappel
// easeFactor : multiplicateur de difficulté (2.5 par défaut)
// due : timestamp (ms) de la prochaine révision
// reps : nombre de répétitions réussies consécutives

let srsData = {}; // id -> { interval, easeFactor, due, reps }

function saveSrs() {
  try { localStorage.setItem("revision_srs", JSON.stringify(srsData)); } catch(e){}
}
function loadSrs() {
  try {
    const s = localStorage.getItem("revision_srs");
    if (s) srsData = JSON.parse(s);
  } catch(e){}
}

// Qualité : 0=raté, 1=difficile, 2=bien, 3=parfait
// Retourne le nombre de jours avant le prochain rappel
function srsUpdate(id, quality) {
  const now = Date.now();
  const DAY = 86400000;
  let d = srsData[id] || { interval: 1, easeFactor: 2.5, due: now, reps: 0 };

  if (quality === 0) {
    // Raté : on remet à 1 jour, on perd les reps
    d.reps = 0;
    d.interval = 1;
  } else {
    // Calcul nouvel easeFactor (formule SM-2 simplifiée)
    const q = quality; // 1, 2, 3
    d.easeFactor = Math.max(1.3, d.easeFactor + 0.1 - (3 - q) * (0.08 + (3 - q) * 0.02));
    if (d.reps === 0) {
      d.interval = 1;
    } else if (d.reps === 1) {
      d.interval = 3;
    } else {
      d.interval = Math.round(d.interval * d.easeFactor);
    }
    d.reps++;
  }

  d.due = now + d.interval * DAY;
  srsData[id] = d;
  saveSrs();

  // Synchroniser le niveau de maîtrise (level) avec le SRS
  if (quality === 0) { levels[id] = Math.max(1, (levels[id] || 1)); }
  else if (quality === 1) { levels[id] = Math.max(2, (levels[id] || 2)); }
  else if (quality === 2) { levels[id] = Math.max(3, (levels[id] || 3)); }
  else { levels[id] = 5; }
  saveLevels();
  seen.add(id); saveSeen();
  updateProgress();

  return d.interval;
}

// Fiches dues maintenant (due <= now) ou jamais vues en SRS
function getSrsDue() {
  const now = Date.now();
  return FICHES.filter(f => !f.is_cmd).filter(f => {
    const d = srsData[f.id];
    return !d || d.due <= now;
  });
}

// ─── Reset modal ───
function openReset() {
  document.getElementById("reset-modal").classList.add("open");
}
function closeReset() {
  document.getElementById("reset-modal").classList.remove("open");
}
function confirmReset() {
  if (document.getElementById("reset-seen").checked) {
    seen = new Set();
    levels = {};
    srsData = {};
    try {
      localStorage.removeItem("revision_seen");
      localStorage.removeItem("revision_levels");
      localStorage.removeItem("revision_srs");
    } catch(e){}
  }
  if (document.getElementById("reset-quiz").checked) {
    try { localStorage.removeItem("revision_quiz_best"); } catch(e){}
    document.getElementById("stat-quiz").textContent = "—";
  }
  closeReset();
  updateProgress();
  renderCards();
  if (document.getElementById("stats-view").style.display !== "none") renderStats();
}

// ─── Export / Import progression ───
function exportProgress() {
  const data = {
    type: "revision-it-progress",
    version: 1,
    exportedAt: new Date().toISOString(),
    seen: [...seen],
    levels: levels,
    srsData: srsData,
    quizBest: loadQuizBest(),
    dark: (() => { try { return localStorage.getItem("revision_dark"); } catch(e){ return null; } })()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const date = new Date().toISOString().slice(0,10);
  a.download = "revision-it-progress-" + date + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function triggerImportProgress() {
  document.getElementById("import-progress-input").click();
}

function importProgress(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.type !== "revision-it-progress") {
        alert("⚠️ Fichier non reconnu — ce n'est pas un export de progression valide.");
        return;
      }
      if (Array.isArray(data.seen)) {
        seen = new Set(data.seen);
        saveSeen();
      }
      if (data.levels && typeof data.levels === "object") {
        levels = data.levels;
        saveLevels();
      }
      if (data.srsData && typeof data.srsData === "object") {
        srsData = data.srsData;
        saveSrs();
      }
      if (data.quizBest) {
        try { localStorage.setItem("revision_quiz_best", data.quizBest); } catch(err){}
        document.getElementById("stat-quiz").textContent = data.quizBest + "%";
      }
      if (data.dark === "1" || data.dark === "0") {
        try { localStorage.setItem("revision_dark", data.dark); } catch(err){}
        if (data.dark === "1") {
          document.documentElement.setAttribute("data-theme","dark");
          document.getElementById("dark-toggle").textContent = "☀️";
        } else {
          document.documentElement.setAttribute("data-theme","");
          document.getElementById("dark-toggle").textContent = "🌙";
        }
      }
      closeReset();
      updateProgress();
      renderCards();
      if (document.getElementById("stats-view").style.display !== "none") renderStats();
      alert("✅ Progression importée avec succès !");
    } catch(err) {
      alert("⚠️ Erreur lors de la lecture du fichier : " + err.message);
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}
function toggleDark() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "" : "dark");
  document.getElementById("dark-toggle").textContent = isDark ? "🌙" : "☀️";
  try { localStorage.setItem("revision_dark", isDark ? "0" : "1"); } catch(e){}
}
function loadDark() {
  try {
    if (localStorage.getItem("revision_dark") === "1") {
      document.documentElement.setAttribute("data-theme","dark");
      document.getElementById("dark-toggle").textContent = "☀️";
    }
  } catch(e){}
}

// ─── Keyboard shortcuts ───
document.addEventListener("keydown", e => {
  // Escape ferme les modals
  if (e.key === "Escape") {
    if (document.getElementById("reset-modal").classList.contains("open")) { closeReset(); return; }
    closeDetail();
  }
  // Navigation dans le panel fiche
  if (document.getElementById("overlay").classList.contains("open")) {
    if (e.key === "ArrowRight") {
      const nx = document.querySelector(".nav-btn:last-child:not(:disabled)");
      if (nx) nx.click();
    }
    if (e.key === "ArrowLeft") {
      const pv = document.querySelector(".nav-btn:first-child:not(:disabled)");
      if (pv) pv.click();
    }
    // Touches 1-5 pour le niveau de maîtrise
    if (["1","2","3","4","5"].includes(e.key)) {
      const lvl = parseInt(e.key);
      const lvBtn = document.querySelectorAll(".level-btn")[lvl-1];
      if (lvBtn) lvBtn.click();
    }
  }
  // Flashcards
  if (document.getElementById("flashcard-view").style.display !== "none") {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipCard(); }
    if (e.key === "ArrowRight") fcNavigate(1);
    if (e.key === "ArrowLeft") fcNavigate(-1);
  }
  // Mode Anki
  const ankiView = document.getElementById("anki-view");
  if (ankiView && ankiView.style.display !== "none") {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flipAnki(); }
    if (ankiFlipped) {
      if (e.key === "1") rateAnki(0);
      if (e.key === "2") rateAnki(1);
      if (e.key === "3") rateAnki(2);
      if (e.key === "4") rateAnki(3);
    }
  }
  // Quiz — touches 1-4 pour répondre, Enter pour suivant
  if (document.getElementById("quiz-view").style.display !== "none") {
    if (["1","2","3","4"].includes(e.key)) {
      const idx = parseInt(e.key) - 1;
      const opts = document.querySelectorAll(".quiz-opt:not(:disabled)");
      if (opts[idx]) opts[idx].click();
    }
    if (e.key === "Enter") {
      const nxt = document.getElementById("quiz-next");
      if (nxt && nxt.style.display !== "none") nxt.click();
    }
  }
});

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════

let currentShell = "linux";
let termHistory = [];
let termHistIdx = -1;
let termInitialized = false;

// ─── État scénario ───
let scenarioMode = false;
let currentScenario = null;
let scenarioStep = 0;

function initTerminal() {
  if (termInitialized) return;
  termInitialized = true;
  buildTermTabs();
  buildTermHelp();
  clearTerm();
  printIntro();
  const inp = document.getElementById("term-input");
  inp.addEventListener("keydown", onTermKey);
  inp.focus();
}

function buildTermTabs() {
  const tabsEl = document.getElementById("term-tabs");
  tabsEl.innerHTML = "";
  // Onglets shells
  Object.entries(TERM_SHELLS).forEach(([key, sh]) => {
    const btn = document.createElement("button");
    btn.className = "term-tab" + (key === currentShell && !scenarioMode ? " active" : "");
    btn.textContent = sh.label;
    btn.onclick = () => { scenarioMode = false; switchShell(key); };
    tabsEl.appendChild(btn);
  });
  // Onglet scénarios
  const sBtn = document.createElement("button");
  sBtn.className = "term-tab term-tab-scenario" + (scenarioMode ? " active" : "");
  sBtn.textContent = "🎯 Scénarios";
  sBtn.id = "term-tab-scenarios";
  sBtn.onclick = () => showScenarioMenu();
  tabsEl.appendChild(sBtn);

  // Mettre à jour prompt
  const sh = TERM_SHELLS[currentShell];
  const promptEl = document.getElementById("term-prompt");
  if (promptEl) {
    promptEl.textContent = scenarioMode ? ">" : sh.prompt;
    promptEl.style.color = scenarioMode ? "#e9d5ff" : sh.color;
  }
  document.getElementById("term-info").textContent =
    scenarioMode ? "🎯 Scénario guidé — suis les étapes" : "💡 Terminal simulé — tape 'help' ou Tab pour compléter";
}

function showScenarioMenu() {
  scenarioMode = true;
  currentScenario = null;
  scenarioStep = 0;
  buildTermTabs();
  clearTerm();
  addLine("head", "=== 🎯 SCÉNARIOS GUIDÉS ===");
  addLine("info", "Suis les étapes une par une. Tape la commande demandée (ou approchante).");
  addLine("dim", "");
  TERM_SCENARIOS.forEach((s, i) => {
    addLine("ok", (i+1) + ". " + s.label + " [" + TERM_SHELLS[s.shell].label + "]");
    addLine("dim", "   " + s.desc);
  });
  addLine("dim", "");
  addLine("info", "Tape le numéro du scénario (1-" + TERM_SCENARIOS.length + ") pour commencer.");
  document.getElementById("term-help").innerHTML = TERM_SCENARIOS.map((s,i) =>
    `<div class="term-help-item term-scenario-item" onclick="startScenario(${i})"><code>${s.label}</code>${s.desc}</div>`
  ).join("");
  document.getElementById("term-prompt").textContent = "scénario>";
  document.getElementById("term-prompt").style.color = "#e9d5ff";
  document.getElementById("term-input").focus();
}

function startScenario(idx) {
  const s = TERM_SCENARIOS[idx];
  currentScenario = s;
  scenarioStep = 0;
  scenarioMode = true;
  currentShell = s.shell;
  buildTermTabs();
  clearTerm();
  addLine("head", "=== " + s.label + " ===");
  addLine("info", s.desc);
  addLine("dim", "");
  renderScenarioStep();
  document.getElementById("term-help").innerHTML = `<div class="term-help-item" onclick="showScenarioMenu()">← Retour aux scénarios</div><div class="term-help-item" onclick="skipScenarioStep()">⏭ Passer cette étape</div>`;
}

function renderScenarioStep() {
  if (!currentScenario) return;
  const step = currentScenario.steps[scenarioStep];
  addLine("dim", "─────────────────────────────────────────");
  addLine("head", step.titre + "  (" + (scenarioStep+1) + "/" + currentScenario.steps.length + ")");
  addLine("info", step.contexte);
  addLine("warn", "💡 Indice : " + step.hint);
}

function skipScenarioStep() {
  if (!currentScenario) return;
  const step = currentScenario.steps[scenarioStep];
  addLine("dim", "[étape passée]");
  step.output.forEach(l => addLine(l.t, l.s));
  addLine("info", "📖 " + step.explication);
  scenarioStep++;
  if (scenarioStep >= currentScenario.steps.length) {
    endScenario();
  } else {
    setTimeout(() => renderScenarioStep(), 300);
  }
}

function endScenario() {
  addLine("dim", "─────────────────────────────────────────");
  addLine("head", "🎉 Scénario terminé ! Retourne au menu avec 'menu'.");
  document.getElementById("term-help").innerHTML = `<div class="term-help-item" onclick="showScenarioMenu()">← Retour aux scénarios</div>`;
}

function switchShell(key) {
  scenarioMode = false;
  currentShell = key;
  buildTermTabs();
  termHistory = [];
  termHistIdx = -1;
  clearTerm();
  printIntro();
  buildTermHelp();
}

function clearTerm() {
  document.getElementById("term-output").innerHTML = "";
}

function printIntro() {
  const sh = TERM_SHELLS[currentShell];
  sh.intro.forEach(l => addLine(l.t, l.s));
}

function addLine(type, text) {
  const out = document.getElementById("term-output");
  const div = document.createElement("div");
  div.className = "term-line " + type;
  div.innerHTML = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}

function onTermKey(e) {
  const inp = e.target;
  if (e.key === "Tab") {
    e.preventDefault();
    autoComplete(inp);
    return;
  }
  if (e.key === "Enter") {
    const cmd = inp.value.trim();
    inp.value = "";
    if (cmd) { termHistory.unshift(cmd); termHistIdx = -1; }
    if (cmd === "clear") { clearTerm(); return; }
    if (scenarioMode) {
      execScenarioCmd(cmd);
    } else {
      execTermCmd(cmd);
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (termHistIdx < termHistory.length - 1) { termHistIdx++; inp.value = termHistory[termHistIdx]; }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (termHistIdx > 0) { termHistIdx--; inp.value = termHistory[termHistIdx]; }
    else { termHistIdx = -1; inp.value = ""; }
  }
}

// ─── Auto-complétion Tab ───
function autoComplete(inp) {
  const val = inp.value;
  if (!val) return;
  const cmds = scenarioMode ? [] : Object.keys(TERM_SHELLS[currentShell].commands);
  const matches = cmds.filter(k => k.startsWith(val));
  if (matches.length === 1) {
    inp.value = matches[0];
  } else if (matches.length > 1) {
    addLine("dim", TERM_SHELLS[currentShell].prompt + " " + val);
    addLine("info", matches.join("   "));
  }
}

// ─── Exécution commande scénario ───
function execScenarioCmd(cmd) {
  const lc = cmd.toLowerCase().trim();

  // Commandes méta scénario
  if (lc === "menu" || lc === "scenarios" || lc === "scénarios") { showScenarioMenu(); return; }
  if (lc === "skip") { skipScenarioStep(); return; }

  // Mode menu — choisir un scénario par numéro
  if (!currentScenario) {
    const n = parseInt(cmd);
    if (n >= 1 && n <= TERM_SCENARIOS.length) {
      startScenario(n - 1);
    } else {
      addLine("err", "Tape un numéro entre 1 et " + TERM_SCENARIOS.length + ", ou 'skip'.");
    }
    return;
  }

  const step = currentScenario.steps[scenarioStep];
  const sh = TERM_SHELLS[currentScenario.shell];
  addLine("cmd", sh.prompt + " " + cmd);

  // Vérifier si la commande correspond à une attendue (exact ou préfixe)
  const matched = step.expected.some(e => cmd.startsWith(e) || cmd === e);

  if (matched) {
    step.output.forEach(l => addLine(l.t, l.s));
    addLine("info", "📖 " + step.explication);
    scenarioStep++;
    if (scenarioStep >= currentScenario.steps.length) {
      endScenario();
    } else {
      setTimeout(() => renderScenarioStep(), 400);
    }
  } else {
    addLine("warn", "⚠️  Pas tout à fait… Relire l'indice : " + step.hint);
    addLine("dim", "Tape 'skip' pour passer ou 'menu' pour revenir aux scénarios.");
  }
}

function execTermCmd(cmd) {
  const sh = TERM_SHELLS[currentShell];
  addLine("cmd", sh.prompt + " " + cmd);
  if (!cmd) return;
  const cmds = sh.commands;
  // Exact match
  if (cmds[cmd]) { cmds[cmd]().forEach(l => addLine(l.t, l.s)); return; }
  // Partial match — la commande tapée commence par le premier mot d'une clé connue
  const key = Object.keys(cmds).find(k => {
    const base = k.split(" ")[0];
    return cmd === base || cmd.startsWith(base + " ");
  });
  if (key) { cmds[key]().forEach(l => addLine(l.t, l.s)); return; }
  // Unknown
  addLine("err", "Commande non reconnue : '" + cmd + "'");
  addLine("dim", "Tape 'help' ou [Tab] pour compléter. Ou 'clear' pour vider l'écran.");
}

function buildTermHelp() {
  const sh = TERM_SHELLS[currentShell];
  const help = document.getElementById("term-help");
  const examples = Object.keys(sh.commands).filter(k => k !== "help").slice(0, 24);
  help.innerHTML = examples.map(cmd =>
    `<div class="term-help-item" onclick="document.getElementById('term-input').value='${escHtml(cmd)}';document.getElementById('term-input').focus()"><code>${escHtml(cmd)}</code>cliquer pour tester</div>`
  ).join("") + `<div class="term-help-item term-scenario-item" onclick="showScenarioMenu()"><code>🎯 Scénarios</code>exercices guidés</div>`;
}

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function init() {
  loadDark();
  loadSeen();
  loadLevels();
  loadSrs();

  // ── Injection de la vue Anki dans le DOM ──
  if (!document.getElementById("anki-view")) {
    const main = document.querySelector(".main") || document.body;
    const ankiView = document.createElement("div");
    ankiView.id = "anki-view";
    ankiView.style.display = "none";
    ankiView.innerHTML = `
      <div class="anki-header">
        <div class="anki-stats-row" id="anki-stats-row"></div>
        <div class="anki-cat-row">
          <select class="fc-cat-select" id="anki-cat-select" onchange="initAnki()">
            <option value="all">Toutes les catégories</option>
          </select>
          <label class="anki-only-due-label">
            <input type="checkbox" id="anki-only-due" checked onchange="initAnki()">
            Dues seulement
          </label>
        </div>
      </div>
      <div class="anki-card-wrap" id="anki-card-wrap">
        <div class="anki-card" id="anki-card">
          <div class="anki-face anki-front" id="anki-front">
            <span class="fc-hint">Retourne la carte quand tu as réfléchi</span>
            <div class="anki-main" id="anki-front-text">—</div>
            <div class="anki-sub" id="anki-front-sub"></div>
            <button class="anki-flip-btn" onclick="flipAnki()">↩ Voir la réponse</button>
          </div>
          <div class="anki-face anki-back" id="anki-back">
            <span class="fc-hint">Définition</span>
            <div class="anki-def" id="anki-back-def">—</div>
            <div class="anki-retenir" id="anki-back-retenir"></div>
            <div class="anki-btns" id="anki-btns">
              <button class="anki-btn anki-raté" onclick="rateAnki(0)">😰<span>Raté</span><small>1j</small></button>
              <button class="anki-btn anki-hard" onclick="rateAnki(1)">😕<span>Difficile</span><small id="anki-hint-1"></small></button>
              <button class="anki-btn anki-good" onclick="rateAnki(2)">😊<span>Bien</span><small id="anki-hint-2"></small></button>
              <button class="anki-btn anki-easy" onclick="rateAnki(3)">🎯<span>Parfait</span><small id="anki-hint-3"></small></button>
            </div>
          </div>
        </div>
      </div>
      <div class="anki-progress" id="anki-progress-row">
        <span id="anki-counter"></span>
        <div class="anki-dots" id="anki-dots"></div>
      </div>
      <div class="anki-done" id="anki-done" style="display:none">
        <div class="anki-done-icon">🎉</div>
        <div class="anki-done-title">Session terminée !</div>
        <div class="anki-done-sub" id="anki-done-sub"></div>
        <button class="anki-restart-btn" onclick="initAnki()">🔄 Recommencer</button>
      </div>
    `;
    main.appendChild(ankiView);

    const sel = document.getElementById("anki-cat-select");
    catOrder.forEach(cat => {
      const count = FICHES.filter(f => f.cat === cat && !f.is_cmd).length;
      if (count === 0) return;
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = catLabels[cat] + " (" + count + ")";
      sel.appendChild(opt);
    });
  }

  const total = FICHES.length;
  const statTotal = document.getElementById("stat-total");
  if (statTotal) statTotal.textContent = total;

  const best = loadQuizBest();
  const statQuiz = document.getElementById("stat-quiz");
  if (statQuiz && best) statQuiz.textContent = best + "%";

  buildFilters();
  buildQuizCatFilter();
  buildFcCatSelect();
  renderCards();
  updateProgress();

  const searchBox = document.getElementById("search-box");
  if (searchBox) searchBox.addEventListener("input", debounce(renderCards, 150));
}

function buildFilters() {
  const container = document.getElementById("filters");
  const total = FICHES.length;
  container.innerHTML = "";

  // Bouton "Tout"
  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn filter-all active";
  allBtn.id = "filter-btn-all";
  allBtn.textContent = "Tout (" + total + ")";
  allBtn.onclick = function() { filterCards("all", this); closeAllGroups(); };
  container.appendChild(allBtn);

  // Séparateur
  const sep = document.createElement("div");
  sep.className = "filter-sep";
  container.appendChild(sep);

  // Groupes
  catGroups.forEach((group, gi) => {
    const catsInGroup = group.cats.filter(c => FICHES.some(f => f.cat === c));
    if (catsInGroup.length === 0) return;
    const totalGroup = FICHES.filter(f => catsInGroup.includes(f.cat)).length;
    const doneGroup  = FICHES.filter(f => catsInGroup.includes(f.cat) && seen.has(f.id)).length;
    const pct = Math.round(doneGroup / totalGroup * 100);

    // Bouton groupe
    const groupBtn = document.createElement("button");
    groupBtn.className = "filter-group-btn";
    groupBtn.dataset.group = gi;
    groupBtn.innerHTML =
      `<span class="fg-label">${group.label}</span>` +
      `<span class="fg-count">${totalGroup}</span>` +
      `<span class="fg-pct" style="--p:${pct}%"></span>` +
      `<span class="fg-chevron">›</span>`;
    groupBtn.onclick = function() { toggleFilterGroup(gi, this); };
    container.appendChild(groupBtn);

    // Sous-catégories (cachées par défaut)
    const subRow = document.createElement("div");
    subRow.className = "filter-subrow";
    subRow.id = "filter-subrow-" + gi;
    catsInGroup.forEach(cat => {
      const count = FICHES.filter(f => f.cat === cat).length;
      const btn = document.createElement("button");
      btn.className = "filter-btn filter-sub";
      btn.dataset.cat = cat;
      btn.textContent = catLabels[cat] + " (" + count + ")";
      btn.onclick = function() { filterCards(cat, this); };
      subRow.appendChild(btn);
    });
    container.appendChild(subRow);
  });
}

let openGroupIdx = -1;
const collapsedGroups = new Set();

function toggleSectionCollapse(gi) {
  if (collapsedGroups.has(gi)) collapsedGroups.delete(gi);
  else collapsedGroups.add(gi);
  renderCards();
}

function closeAllGroups() {
  document.querySelectorAll(".filter-subrow").forEach(r => r.classList.remove("open"));
  document.querySelectorAll(".filter-group-btn").forEach(b => b.classList.remove("open"));
  openGroupIdx = -1;
}

function toggleFilterGroup(gi, btn) {
  const subRow = document.getElementById("filter-subrow-" + gi);
  const isOpen = subRow.classList.contains("open");

  // Fermer tous
  closeAllGroups();

  if (!isOpen) {
    subRow.classList.add("open");
    btn.classList.add("open");
    openGroupIdx = gi;
  }
}

function filterCards(cat, btn) {
  currentFilter = cat;
  // Désactiver tous les filter-btn et filter-all
  document.querySelectorAll(".filter-btn, .filter-all").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  // Si on filtre sur une sous-cat, mettre le groupe parent en surbrillance
  if (cat !== "all") {
    catGroups.forEach((g, gi) => {
      if (g.cats.includes(cat)) {
        const gBtn = document.querySelector(`.filter-group-btn[data-group="${gi}"]`);
        if (gBtn) gBtn.classList.add("active");
      }
    });
  }
  renderCards();
}

// Groupement des catégories par thème
const catGroups = [
  { label:"🌐 Réseau", cats:["reseau","reseauavance","proto","cisco","wifi"] },
  { label:"🛡️ Sécurité", cats:["secu","hacking","web","ad","crypto","wef"] },
  { label:"⚙️ Administration", cats:["admin","linux","windows","devops","cloud","proxmox","virt"] },
  { label:"📋 Méthodes & Normes", cats:["methodo","reglem","ebios","norme","superv","ia","bdd"] },
  { label:"🖥️ Général & SISR", cats:["general","sisr","auto"] }
];

function toggleWeakFilter(btn) {
  weakFilterOn = !weakFilterOn;
  btn.classList.toggle("active", weakFilterOn);
  renderCards();
}

function renderCards() {
  const search = (document.getElementById("search-box").value || "").toLowerCase().trim();
  const sortVal = document.getElementById("sort-select").value;
  const grid = document.getElementById("cards-grid");
  const noRes = document.getElementById("no-results");
  grid.innerHTML = "";

  let filtered = currentFilter === "all" ? FICHES : FICHES.filter(f => f.cat === currentFilter);
  if (search) {
    filtered = filtered.filter(f =>
      f.titre.toLowerCase().includes(search) ||
      (f.sub && f.sub.toLowerCase().includes(search)) ||
      (f.def && f.def.toLowerCase().includes(search)) ||
      (f.keywords && f.keywords.some(k => k.toLowerCase().includes(search)))
    );
  }
  if (weakFilterOn) {
    filtered = filtered.filter(f => !levels[f.id] || levels[f.id] <= 2);
  }

  // Tri
  if (sortVal === "level-asc") {
    filtered = [...filtered].sort((a,b) => (levels[a.id]||0) - (levels[b.id]||0));
  } else if (sortVal === "level-desc") {
    filtered = [...filtered].sort((a,b) => (levels[b.id]||0) - (levels[a.id]||0));
  } else if (sortVal === "alpha") {
    filtered = [...filtered].sort((a,b) => a.titre.localeCompare(b.titre));
  }

  filteredList = filtered;
  noRes.style.display = filtered.length === 0 ? "block" : "none";

  // Affichage avec ou sans regroupement
  const isGrouped = currentFilter === "all" && sortVal === "default" && !search && !weakFilterOn;

  if (isGrouped) {
    catGroups.forEach((group, gi) => {
      const groupItems = filtered.filter(f => group.cats.includes(f.cat));
      if (groupItems.length === 0) return;

      // Header de section cliquable
      const sep = document.createElement("div");
      sep.className = "section-header";
      sep.dataset.group = gi;
      const doneInGroup = groupItems.filter(f => seen.has(f.id)).length;
      const pct = Math.round(doneInGroup / groupItems.length * 100);
      const collapsed = collapsedGroups.has(gi);
      sep.innerHTML =
        `<button class="section-collapse-btn" onclick="toggleSectionCollapse(${gi})" title="${collapsed ? 'Développer' : 'Réduire'}">${collapsed ? '›' : '⌄'}</button>` +
        `<span class="section-header-title">${group.label}</span>` +
        `<div class="section-header-bar"><div class="section-header-bar-fill" style="width:${pct}%"></div></div>` +
        `<span class="section-header-count">${doneInGroup}/${groupItems.length}</span>`;
      grid.appendChild(sep);

      if (!collapsed) {
        // Sous-sections par catégorie dans le groupe
        const catsInGroup = [...new Set(groupItems.map(f => f.cat))];
        catsInGroup.forEach(cat => {
          const catItems = groupItems.filter(f => f.cat === cat);
          if (catItems.length === 0) return;
          const doneCat = catItems.filter(f => seen.has(f.id)).length;

          // Mini-header catégorie
          const catSep = document.createElement("div");
          catSep.className = "section-cat-header";
          catSep.innerHTML =
            `<span class="section-cat-badge badge-${cat}">${catLabels[cat]}</span>` +
            `<div class="section-cat-line"></div>` +
            `<span class="section-cat-count">${doneCat}/${catItems.length}</span>`;
          grid.appendChild(catSep);

          catItems.forEach(f => grid.appendChild(makeCard(f, filtered.indexOf(f))));
        });
      }
    });
  } else {
    filtered.forEach((f, i) => grid.appendChild(makeCard(f, i)));
  }
}

function makeCard(f, idx) {
  const div = document.createElement("div");
  const lv = levels[f.id] || 0;
  div.className = "card" + (seen.has(f.id) ? " done" : "") + (lv ? " level-" + lv : "");
  div.onclick = () => openDetail(f.id, idx);
  const stars = [1,2,3,4,5].map(i => `<span class="star${i<=lv?' on':''}">★</span>`).join("");
  div.innerHTML =
    (seen.has(f.id) ? '<span class="card-done-mark">✓</span>' : "") +
    '<span class="card-badge badge-' + f.cat + '">' + catLabels[f.cat] + '</span>' +
    '<div class="card-title">' + f.titre + '</div>' +
    '<div class="card-desc">' + (f.sub || "") + '</div>' +
    '<div class="card-level">' + stars + '</div>';
  return div;
}

function updateProgress() {
  const total = FICHES.length;
  const n = seen.size;
  const mastered = Object.values(levels).filter(v => v >= 4).length;
  const pct = total > 0 ? Math.round((n / total) * 100) : 0;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setW = (id, val) => { const el = document.getElementById(id); if (el) el.style.width = val; };
  setW("progress-fill", pct + "%");
  set("progress-label", n + " / " + total + " fiches vues");
  set("progress-pct", pct + "%");
  set("stat-seen", n);
  set("stat-mastered", mastered);
  set("stat-total", total);
  // Badge Anki dans nav
  const due = getSrsDue ? getSrsDue().length : 0;
  const navCount = document.getElementById("nav-count");
  if (navCount) navCount.textContent = n + "/" + total;
}

// ═══════════════════════════════════════════
// DÉTAIL
// ═══════════════════════════════════════════
function openDetail(id, indexInFiltered) {
  const f = FICHES.find(x => x.id === id);
  if (!f) return;
  const idx = (indexInFiltered !== undefined) ? indexInFiltered : filteredList.findIndex(x => x.id === id);
  seen.add(id);
  saveSeen();
  updateProgress();
  renderCards();

  let extraHTML = "";
  if (f.extra_table) {
    let thead = f.extra_table_headers ? "<thead><tr>" + f.extra_table_headers.map(h => "<th>" + h + "</th>").join("") + "</tr></thead>" : "";
    let tbody = "<tbody>" + f.extra_table.map(r => "<tr>" + r.map(c => "<td>" + c + "</td>").join("") + "</tr>").join("") + "</tbody>";
    extraHTML = '<div class="section"><div class="section-label">Tableau de référence</div><table class="table-mini">' + thead + tbody + '</table></div>';
  }

  function buildCmds(cmds) {
    return cmds.map(s =>
      '<div class="cmd-section"><div class="cmd-section-title">' + s.section + '</div>' +
      s.items.map(i => '<div class="cmd-block"><code>' + escHtml(i.cmd) + '</code><span class="cmd-comment">' + escHtml(i.comment) + '</span></div>').join("") +
      '</div>'
    ).join("");
  }

  let mainContent = "";
  const schemaHTML = f.schema ? '<div class="section"><div class="section-label">📊 Schéma</div><div class="schema-box">' + f.schema + '</div></div>' : "";
  if (f.is_cmd) {
    mainContent = '<div class="section"><div class="section-label">Définition</div><p class="def-text">' + f.def + '</p></div>' +
      schemaHTML +
      '<div class="section"><div class="section-label">Commandes essentielles</div>' + buildCmds(f.cmds) + '</div>';
  } else {
    mainContent = '<div class="section"><div class="section-label">Définition</div><p class="def-text">' + f.def + '</p></div>' +
      schemaHTML +
      extraHTML +
      '<div class="section"><div class="section-label">Points clés</div><ul class="key-list">' +
      f.points.map(p => '<li>' + p + '</li>').join("") + '</ul></div>';
  }

  const prevId = filteredList[idx - 1] ? filteredList[idx - 1].id : null;
  const nextId = filteredList[idx + 1] ? filteredList[idx + 1].id : null;
  const isDone = seen.has(id);
  const lv = levels[id] || 0;
  const levelEmojis = ["😰","😕","😐","🙂","🎯"];
  const levelLabels = ["Inconnu","À retravailler","Moyen","Bien","Maîtrisé"];
  const starsHtml = [1,2,3,4,5].map(i =>
    `<button class="level-btn${lv===i?' active':''}" onclick="setLevel(${id},${i})" title="${levelLabels[i-1]}">${i<=lv?'★':'☆'}</button>`
  ).join("");

  document.getElementById("detail-content").innerHTML =
    '<span class="detail-badge badge-' + f.cat + '">' + catLabels[f.cat] + '</span>' +
    '<h2 class="detail-title">' + f.titre + '</h2>' +
    '<p class="detail-sub">' + (f.sub || "") + '</p>' +
    mainContent +
    '<div class="section"><div class="section-label">⚠️ Piège classique</div><div class="piege-box">' + f.piege + '</div></div>' +
    '<div class="section"><div class="section-label">✅ À retenir</div><div class="retenir-box">' + f.retenir + '</div></div>' +
    '<div class="section"><div class="section-label">Mots-clés</div><div class="kw-grid">' +
    f.keywords.map(k => '<span class="kw">' + k + '</span>').join("") + '</div></div>' +
    '<div class="panel-level"><span class="panel-level-label">Niveau de maîtrise</span>' + starsHtml +
    (lv ? `<span style="font-size:12px;color:var(--text3);margin-left:4px">${levelEmojis[lv-1]} ${levelLabels[lv-1]}</span>` : '') +
    '</div>' +
    '<button class="btn-done' + (isDone ? ' marked' : '') + '" id="btn-done-' + id + '" onclick="toggleDone(' + id + ')">' +
    (isDone ? '✓ Vue !' : 'Marquer comme vue ✓') + '</button>' +
    '<div class="panel-nav">' +
    '<button class="nav-btn" onclick="openDetail(' + prevId + ',' + (idx-1) + ')"' + (!prevId ? ' disabled' : '') + '>← Précédente</button>' +
    '<button class="nav-btn" onclick="openDetail(' + nextId + ',' + (idx+1) + ')"' + (!nextId ? ' disabled' : '') + '>Suivante →</button>' +
    '</div>';

  const panel = document.getElementById("panel");
  if (panel) panel.scrollTop = 0;
  document.getElementById("overlay").classList.add("open");
}

function escHtml(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function toggleDone(id) {
  seen.add(id);
  saveSeen();
  updateProgress();
  renderCards();
  const btn = document.getElementById("btn-done-" + id);
  if (btn) { btn.classList.add("marked"); btn.textContent = "✓ Vue !"; }
}

function setLevel(id, lv) {
  levels[id] = lv;
  seen.add(id);
  saveLevels();
  saveSeen();
  updateProgress();
  renderCards();
  // Refresh les boutons dans le panel ouvert
  const currentLv = levels[id] || 0;
  const levelEmojis = ["😰","😕","😐","🙂","🎯"];
  const levelLabels = ["Inconnu","À retravailler","Moyen","Bien","Maîtrisé"];
  document.querySelectorAll(".level-btn").forEach((btn, i) => {
    const btnLv = i + 1;
    btn.classList.toggle("active", btnLv === lv);
    btn.textContent = btnLv <= lv ? "★" : "☆";
  });
  // Update the label next to stars
  const existing = document.querySelector(".panel-level span[style]");
  if (existing) {
    existing.textContent = levelEmojis[lv-1] + " " + levelLabels[lv-1];
  } else {
    const pl = document.querySelector(".panel-level");
    if (pl) {
      const sp = document.createElement("span");
      sp.style.cssText = "font-size:12px;color:var(--text3);margin-left:4px";
      sp.textContent = levelEmojis[lv-1] + " " + levelLabels[lv-1];
      pl.appendChild(sp);
    }
  }
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById("overlay")) closeDetail();
}
function closeDetail() {
  document.getElementById("overlay").classList.remove("open");
}

// ═══════════════════════════════════════════
// MODE
// ═══════════════════════════════════════════
function setMode(mode, btn) {
  // Sync sidebar pills
  document.querySelectorAll(".mode-pill").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  // Sync aussi si appelé sans btn (ex: depuis autre code)
  document.querySelectorAll("[data-mode='" + mode + "']").forEach(b => b.classList.add("active"));

  // Vues
  const views = ["fiche-view","quiz-view","flashcard-view","stats-view","terminal-view","anki-view"];
  views.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = "none"; });
  const map = {fiches:"fiche-view",quiz:"quiz-view",flashcard:"flashcard-view",stats:"stats-view",terminal:"terminal-view",anki:"anki-view"};
  const target = document.getElementById(map[mode]);
  if (target) target.style.display = "";

  if (mode === "quiz")      showQuizStart();
  if (mode === "flashcard") initFlashcards();
  if (mode === "stats")     renderStats();
  if (mode === "terminal")  initTerminal();
  if (mode === "anki")      initAnki();
}

// ═══════════════════════════════════════════
// FLASHCARDS
// ═══════════════════════════════════════════
let fcList = [];
let fcIndex = 0;
let fcFlipped = false;
let fcSeen = new Set();

function buildFcCatSelect() {
  const sel = document.getElementById("fc-cat-select");
  catOrder.forEach(cat => {
    const count = FICHES.filter(f => f.cat === cat && !f.is_cmd).length;
    if (count === 0) return;
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = catLabels[cat] + " (" + count + ")";
    sel.appendChild(opt);
  });
}

function initFlashcards() {
  const cat = document.getElementById("fc-cat-select").value;
  fcList = (cat === "all" ? FICHES : FICHES.filter(f => f.cat === cat)).filter(f => !f.is_cmd);
  fcIndex = 0;
  fcFlipped = false;
  fcSeen = new Set();
  renderFlashcard();
}

function shuffleFlashcards() {
  fcList = shuffle(fcList);
  fcIndex = 0;
  fcFlipped = false;
  fcSeen = new Set();
  renderFlashcard();
}

function renderFlashcard() {
  if (fcList.length === 0) return;
  const f = fcList[fcIndex];
  fcFlipped = false;
  document.getElementById("flashcard").classList.remove("flipped");
  document.getElementById("fc-front-text").textContent = f.titre;
  document.getElementById("fc-front-sub").textContent = f.sub || catLabels[f.cat];
  document.getElementById("fc-back-text").textContent = f.def;
  document.getElementById("fc-back-sub").textContent = "✅ " + f.retenir;
  document.getElementById("fc-counter").textContent = (fcIndex+1) + " / " + fcList.length;
  document.getElementById("fc-prev").disabled = fcIndex === 0;
  document.getElementById("fc-next").disabled = fcIndex === fcList.length - 1;
  fcSeen.add(fcIndex);
  renderFcDots();
}

function renderFcDots() {
  const max = Math.min(fcList.length, 30);
  const dots = document.getElementById("fc-dots");
  dots.innerHTML = "";
  for (let i = 0; i < max; i++) {
    const d = document.createElement("div");
    d.className = "fc-dot" + (i === fcIndex ? " current" : fcSeen.has(i) ? " seen" : "");
    dots.appendChild(d);
  }
}

function flipCard() {
  fcFlipped = !fcFlipped;
  document.getElementById("flashcard").classList.toggle("flipped", fcFlipped);
}

function fcNavigate(dir) {
  const newIdx = fcIndex + dir;
  if (newIdx < 0 || newIdx >= fcList.length) return;
  fcIndex = newIdx;
  renderFlashcard();
}

// ═══════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════
function renderStats() {
  const container = document.getElementById("cat-stats-container");
  container.innerHTML = "";

  if (seen.size === 0) {
    container.innerHTML = '<div style="text-align:center;padding:3rem 1rem;color:var(--text3);font-size:14px">' +
      '📚 Commence à consulter des fiches pour voir ta progression ici.</div>';
    return;
  }

  catOrder.forEach(cat => {
    const total = FICHES.filter(f => f.cat === cat).length;
    if (total === 0) return;
    const done = FICHES.filter(f => f.cat === cat && seen.has(f.id)).length;
    const mastered = FICHES.filter(f => f.cat === cat && (levels[f.id] || 0) >= 4).length;
    const pct = Math.round((done / total) * 100);
    const row = document.createElement("div");
    row.className = "cat-stat-row";
    row.innerHTML = `<span class="cat-stat-label">${catLabels[cat]}</span>` +
      `<div class="cat-stat-bar"><div class="cat-stat-fill" style="width:${pct}%"></div></div>` +
      `<span class="cat-stat-pct">${pct}%</span>` +
      `<span style="font-size:10px;color:var(--text3);width:54px;flex-shrink:0;text-align:right">${mastered}/${total} 🎯</span>`;
    container.appendChild(row);
  });
}

// ═══════════════════════════════════════════
// QUIZ
// ═══════════════════════════════════════════
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let quizCorrectIndex = -1;
let quizCatFilter = "all";
let quizTimerInterval = null;
let quizTimerLeft = 0;
let quizCatResults = {}; // { cat: { correct: N, total: N } }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuizCatFilter() {
  const container = document.getElementById("quiz-cat-filter");
  const allBtn = document.createElement("button");
  allBtn.className = "quiz-cat-btn active";
  allBtn.textContent = "Tout";
  allBtn.onclick = function() { quizCatFilter = "all"; setQuizCatActive(this); };
  container.appendChild(allBtn);
  catOrder.forEach(cat => {
    const count = FICHES.filter(f => f.cat === cat && !f.is_cmd).length;
    if (count < 2) return;
    const btn = document.createElement("button");
    btn.className = "quiz-cat-btn";
    btn.textContent = catLabels[cat];
    btn.onclick = function() { quizCatFilter = cat; setQuizCatActive(this); };
    container.appendChild(btn);
  });
}

function setQuizCatActive(btn) {
  document.querySelectorAll(".quiz-cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function buildQuestions() {
  const pool = [];
  let fichePool = FICHES.filter(f => !f.is_cmd);
  if (quizCatFilter !== "all") fichePool = fichePool.filter(f => f.cat === quizCatFilter);
  if (fichePool.length < 4) fichePool = FICHES.filter(f => !f.is_cmd);

  fichePool.forEach(f => {
    const wrongDefs = shuffle(FICHES.filter(x => x.id !== f.id && !x.is_cmd))
      .slice(0, 3).map(x => x.def.substring(0, 90) + "…");
    pool.push({
      question: "Quelle est la bonne définition de <strong>" + f.titre + "</strong> ?",
      correct: f.def.substring(0, 90) + "…",
      wrong: wrongDefs,
      explanation: f.retenir,
      cat: f.cat
    });
    const wrongPieges = shuffle(FICHES.filter(x => x.id !== f.id && !x.is_cmd))
      .slice(0, 3).map(x => x.piege);
    pool.push({
      question: "Quel est le piège classique concernant <strong>" + f.titre + "</strong> ?",
      correct: f.piege,
      wrong: wrongPieges,
      explanation: f.retenir,
      cat: f.cat
    });
    const wrongRetenir = shuffle(FICHES.filter(x => x.id !== f.id && !x.is_cmd))
      .slice(0, 3).map(x => x.retenir);
    pool.push({
      question: "Que faut-il retenir en priorité sur <strong>" + f.titre + "</strong> ?",
      correct: f.retenir,
      wrong: wrongRetenir,
      explanation: f.def.substring(0, 120) + "…",
      cat: f.cat
    });
  });

  // Questions à trous — générées depuis les fiches non-cmd
  fichePool.forEach(f => {
    if (!f.retenir) return;
    // Extraire les segments "terme = définition courte" dans retenir
    const segments = f.retenir.split(/[.\n]/).filter(s => s.includes("=") && s.trim().length > 8);
    segments.slice(0, 2).forEach(seg => {
      const parts = seg.split("=");
      if (parts.length < 2) return;
      const terme = parts[0].trim().replace(/^[^a-zA-ZÀ-ÿ0-9]+/, "").trim();
      const valeur = parts.slice(1).join("=").trim().split(/[,;(]/)[0].trim();
      if (!terme || terme.length < 2 || terme.length > 40 || !valeur || valeur.length < 3) return;
      const blankedRetenir = f.retenir.replace(
        new RegExp(terme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
        '<span class="blank-hint">___</span>'
      );
      pool.push({
        type: "trous",
        question: "Complète : dans le contexte de <strong>" + f.titre + "</strong>, que signifie <strong>___</strong> ?<br><small style='color:var(--text3)'>" + blankedRetenir + "</small>",
        correct: terme,
        acceptedAnswers: [terme.toLowerCase(), terme.toLowerCase().replace(/[^a-z0-9àâéèêëîïôùûüç]/g,"")],
        explanation: f.retenir,
        cat: f.cat
      });
    });
  });

  // ── Questions à trous ──────────────────────────────────────────
  // Générées depuis le champ "retenir" des fiches : "TERME = définition"
  fichePool.forEach(f => {
    if (!f.retenir) return;
    // Découper en segments sur les séparateurs courants
    const segments = f.retenir.split(/(?<=[.!])\s+|(?<=\))\.\s+/).filter(s =>
      s.includes("=") && s.trim().length > 8 && s.trim().length < 200
    );
    segments.slice(0, 2).forEach(seg => {
      const eqIdx = seg.indexOf("=");
      if (eqIdx < 1) return;
      const terme  = seg.substring(0, eqIdx).trim().replace(/^[^A-Za-zÀ-ÿ0-9]+/, "").trim();
      const valeur = seg.substring(eqIdx + 1).trim().split(/[,;(]/)[0].trim();
      if (!terme || terme.length < 2 || terme.length > 45 || !valeur || valeur.length < 3) return;
      // Masquer le terme dans la phrase "retenir" pour l'indice visuel
      const re = new RegExp(terme.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      const hint = f.retenir.replace(re, '<u>___</u>');
      pool.push({
        type: "trous",
        question: "✏️ Complète — <em>" + escHtml(f.titre) + "</em><br><br>" +
                  "<span style='font-size:13px;color:var(--text2)'>" + hint + "</span><br><br>" +
                  "Que désigne <strong>___</strong> dans ce contexte ?",
        correct: terme,
        // Variantes tolérées : casse, accents, tirets ignorés
        acceptedAnswers: [
          terme.toLowerCase(),
          terme.toLowerCase().replace(/[-_]/g, " "),
          terme.toLowerCase().replace(/[^a-z0-9àâéèêëîïôùûüç]/g, "")
        ],
        explanation: f.retenir,
        cat: f.cat
      });
    });
  });
  // ──────────────────────────────────────────────────────────────

  const countSel = parseInt(document.getElementById("quiz-count").value);
  const shuffled = shuffle(pool);
  return countSel === 0 ? shuffled : shuffled.slice(0, countSel);
}

function showQuizStart() {
  const area = document.getElementById("quiz-area");
  area.innerHTML = '<div style="text-align:center;padding:2rem 1rem">' +
    '<p style="color:var(--text2);font-size:14px;margin-bottom:1.25rem">Choisis une catégorie et les options ci-dessus, puis lance le quiz.</p>' +
    '<button class="quiz-restart" onclick="startQuiz()">▶ Démarrer le quiz</button></div>';
}

function startQuiz() {
  quizQuestions = buildQuestions();
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  quizCatResults = {};
  stopTimer();
  renderQuestion();
}

function stopTimer() {
  if (quizTimerInterval) { clearInterval(quizTimerInterval); quizTimerInterval = null; }
}

function startTimer(seconds) {
  stopTimer();
  if (seconds <= 0) return;
  quizTimerLeft = seconds;
  updateTimerBar(seconds, seconds);
  quizTimerInterval = setInterval(() => {
    quizTimerLeft--;
    updateTimerBar(quizTimerLeft, seconds);
    if (quizTimerLeft <= 0) {
      stopTimer();
      if (!quizAnswered) autoAnswerWrong();
    }
  }, 1000);
}

function updateTimerBar(left, total) {
  const fill = document.getElementById("quiz-timer-fill");
  if (!fill) return;
  const pct = (left / total) * 100;
  fill.style.width = pct + "%";
  fill.classList.toggle("urgent", pct < 30);
}

function autoAnswerWrong() {
  quizAnswered = true;
  const q = quizQuestions[quizIndex];
  if (q && q.type === "trous") {
    // Trous: show correct answer on timer expiry
    const inp = document.getElementById("quiz-trous-input");
    if (inp) inp.disabled = true;
    const btn = document.getElementById("quiz-trous-btn");
    if (btn) btn.disabled = true;
    const feedback = document.getElementById("quiz-trous-feedback");
    if (feedback) feedback.innerHTML = '<span class="trous-ko">⏱️ Temps écoulé ! Réponse : <strong>' + escHtml(q.correct) + '</strong></span>';
  } else {
    const opts = document.querySelectorAll(".quiz-opt");
    opts.forEach(o => {
      o.disabled = true;
      if (parseInt(o.getAttribute("data-idx")) === quizCorrectIndex) o.classList.add("reveal-correct");
    });
  }
  const expl = document.getElementById("quiz-expl");
  if (expl) expl.classList.add("show");
  const nxt = document.getElementById("quiz-next");
  if (nxt) nxt.style.display = "";
}

function renderQuestion() {
  const area = document.getElementById("quiz-area");
  if (quizIndex >= quizQuestions.length) {
    stopTimer();
    const pct = Math.round((quizScore / quizQuestions.length) * 100);
    saveQuizBest(pct);
    document.getElementById("stat-quiz").textContent = pct + "%";
    const emoji = pct >= 80 ? "🎉" : pct >= 60 ? "💪" : "📚";
    const msg = pct >= 80 ? "Excellent travail !" : pct >= 60 ? "Bon travail, continue !" : "Continue à réviser les fiches.";

    // Build per-category breakdown
    const cats = Object.keys(quizCatResults).sort((a,b) => {
      const pa = quizCatResults[a].correct/quizCatResults[a].total;
      const pb = quizCatResults[b].correct/quizCatResults[b].total;
      return pa - pb; // worst first
    });
    let breakdownHtml = '';
    if (cats.length > 1) {
      const rows = cats.map(cat => {
        const r = quizCatResults[cat];
        const p = Math.round((r.correct / r.total) * 100);
        const color = p >= 80 ? 'var(--green)' : p >= 50 ? '#f59e0b' : '#ef4444';
        const hint = p < 50 ? ' <span style="color:#ef4444;font-size:10px;font-weight:700">⚠️ à retravailler</span>' : '';
        const label = (catLabels[cat] || cat);
        return `<div class="quiz-cat-row">
          <span class="quiz-cat-row-label" title="${label}">${label}${hint}</span>
          <div class="quiz-cat-row-bar"><div class="quiz-cat-row-fill" style="width:${p}%;background:${color}"></div></div>
          <span class="quiz-cat-row-pct">${r.correct}/${r.total} · ${p}%</span>
        </div>`;
      }).join('');
      breakdownHtml = `<div class="quiz-cat-breakdown">
        <div class="quiz-cat-breakdown-title">📊 Résultats par catégorie</div>
        ${rows}
      </div>`;
    }

    area.innerHTML = '<div class="quiz-end">' +
      '<div class="big-score">' + pct + '%</div>' +
      '<div class="score-label">' + quizScore + ' / ' + quizQuestions.length + ' bonnes réponses<br>' + emoji + ' ' + msg + '</div>' +
      breakdownHtml +
      '<button class="quiz-restart" onclick="startQuiz()">🔄 Recommencer</button>' +
      '</div>';
    return;
  }

  const q = quizQuestions[quizIndex];
  quizAnswered = false;

  const timerSec = parseInt(document.getElementById("quiz-timer-sel").value);
  const timerBar = timerSec > 0 ? '<div class="quiz-timer-bar"><div class="quiz-timer-fill" id="quiz-timer-fill"></div></div>' : '';

  const header = '<span style="font-size:11px;color:var(--text3);font-weight:600">Q' + (quizIndex+1) + '/' + quizQuestions.length +
    ' &nbsp;·&nbsp; <span class="card-badge badge-' + q.cat + '">' + catLabels[q.cat] + '</span>' +
    (q.type === "trous" ? ' &nbsp;·&nbsp; <span style="color:var(--blue);font-weight:700">✏️ À trous</span>' : '') +
    '</span><br><br>';

  const footer = '<div class="quiz-footer">' +
    '<span class="quiz-score">Score : ' + quizScore + ' / ' + quizIndex + '</span>' +
    '<button class="quiz-next" id="quiz-next" style="display:none" onclick="nextQuestion()">Question suivante →</button>' +
    '</div>';

  const expl = '<div class="quiz-explanation" id="quiz-expl">💡 <strong>À retenir :</strong> ' + escHtml(q.explanation) + '</div>';

  if (q.type === "trous") {
    // Fill-in-the-blank rendering
    area.innerHTML = '<div class="quiz-container">' +
      '<div class="quiz-question">' + header + q.question + '</div>' +
      timerBar +
      '<div class="quiz-trous-wrap">' +
      '<input class="quiz-trous-input" id="quiz-trous-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Ta réponse…" oninput="this.value=this.value" onkeydown="if(event.key===\'Enter\')submitTrous()">' +
      '<button class="quiz-trous-btn" id="quiz-trous-btn" onclick="submitTrous()">Valider ✓</button>' +
      '</div>' +
      '<div class="quiz-trous-feedback" id="quiz-trous-feedback"></div>' +
      expl + footer + '</div>';
    // Focus input after render
    setTimeout(() => { const inp = document.getElementById("quiz-trous-input"); if (inp) inp.focus(); }, 50);
  } else {
    // Multiple-choice rendering
    const options = shuffle([q.correct, ...q.wrong]);
    quizCorrectIndex = options.indexOf(q.correct);
    let optsHtml = options.map((opt, i) =>
      '<button class="quiz-opt" data-idx="' + i + '" onclick="answerQuiz(this,' + i + ')">' + escHtml(opt) + '</button>'
    ).join("");
    area.innerHTML = '<div class="quiz-container">' +
      '<div class="quiz-question">' + header + q.question + '</div>' +
      timerBar +
      '<div class="quiz-options" id="quiz-options">' + optsHtml + '</div>' +
      expl + footer + '</div>';
  }

  if (timerSec > 0) startTimer(timerSec);
}

function submitTrous() {
  if (quizAnswered) return;
  const inp = document.getElementById("quiz-trous-input");
  if (!inp) return;
  const val = inp.value.trim();
  if (!val) return;

  quizAnswered = true;
  stopTimer();

  const q = quizQuestions[quizIndex];
  const normalize = s => s.toLowerCase().trim().replace(/[^a-z0-9àâéèêëîïôùûüç]/g, "");
  const normalVal = normalize(val);
  const isCorrect = (q.acceptedAnswers || [q.correct.toLowerCase()]).some(a => normalize(a) === normalVal);

  inp.disabled = true;
  const btn = document.getElementById("quiz-trous-btn");
  if (btn) btn.disabled = true;

  const feedback = document.getElementById("quiz-trous-feedback");
  if (feedback) {
    if (isCorrect) {
      feedback.innerHTML = '<span class="trous-ok">✅ Correct ! <strong>' + escHtml(q.correct) + '</strong></span>';
    } else {
      feedback.innerHTML = '<span class="trous-ko">❌ Faux. La bonne réponse était : <strong>' + escHtml(q.correct) + '</strong></span>';
    }
  }

  if (isCorrect) quizScore++;
  { if (!quizCatResults[q.cat]) quizCatResults[q.cat]={correct:0,total:0}; quizCatResults[q.cat].total++; if(isCorrect) quizCatResults[q.cat].correct++; }
  const expl = document.getElementById("quiz-expl");
  if (expl) expl.classList.add("show");
  const nxt = document.getElementById("quiz-next");
  if (nxt) nxt.style.display = "";
}

function answerQuiz(btn, idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  stopTimer();

  const isCorrect = (idx === quizCorrectIndex);
  document.querySelectorAll(".quiz-opt").forEach(o => {
    o.disabled = true;
    const oIdx = parseInt(o.getAttribute("data-idx"));
    if (oIdx === idx) o.classList.add(isCorrect ? "correct" : "wrong");
    if (!isCorrect && oIdx === quizCorrectIndex) o.classList.add("reveal-correct");
  });

  if (isCorrect) quizScore++;
  { const _q = quizQuestions[quizIndex]; if (_q) { if (!quizCatResults[_q.cat]) quizCatResults[_q.cat]={correct:0,total:0}; quizCatResults[_q.cat].total++; if(isCorrect) quizCatResults[_q.cat].correct++; } }
  const expl = document.getElementById("quiz-expl");
  if (expl) expl.classList.add("show");
  const nxt = document.getElementById("quiz-next");
  if (nxt) nxt.style.display = "";
}

function nextQuestion() {
  quizIndex++;
  renderQuestion();
}

// ═══════════════════════════════════════════
// MODE ANKI — RÉVISION ESPACÉE (SRS)
// ═══════════════════════════════════════════
let ankiQueue = [];
let ankiIdx = 0;
let ankiFlipped = false;
let ankiSessionStats = { done: 0, raté: 0, hard: 0, good: 0, easy: 0 };

function initAnki() {
  const cat = (document.getElementById("anki-cat-select") || {}).value || "all";
  const onlyDue = (document.getElementById("anki-only-due") || {}).checked !== false;

  let pool = (cat === "all" ? FICHES : FICHES.filter(f => f.cat === cat)).filter(f => !f.is_cmd);
  const now = Date.now();

  if (onlyDue) {
    pool = pool.filter(f => {
      const d = srsData[f.id];
      return !d || d.due <= now;
    });
  }

  // Trier : nouvelles cartes d'abord, puis par date due croissante
  pool = pool.sort((a, b) => {
    const da = srsData[a.id] ? srsData[a.id].due : 0;
    const db = srsData[b.id] ? srsData[b.id].due : 0;
    return da - db;
  });

  ankiQueue = pool;
  ankiIdx = 0;
  ankiFlipped = false;
  ankiSessionStats = { done: 0, raté: 0, hard: 0, good: 0, easy: 0 };

  updateAnkiStats();

  if (ankiQueue.length === 0) {
    showAnkiDone();
    return;
  }

  document.getElementById("anki-done").style.display = "none";
  document.getElementById("anki-card-wrap").style.display = "";
  document.getElementById("anki-progress-row").style.display = "";
  renderAnkiCard();
}

function renderAnkiCard() {
  if (ankiIdx >= ankiQueue.length) {
    showAnkiDone();
    return;
  }

  const f = ankiQueue[ankiIdx];
  ankiFlipped = false;

  const card = document.getElementById("anki-card");
  card.classList.remove("flipped");

  document.getElementById("anki-front-text").textContent = f.titre;
  document.getElementById("anki-front-sub").textContent = f.sub || catLabels[f.cat];
  document.getElementById("anki-back-def").textContent = f.def;
  document.getElementById("anki-back-retenir").textContent = "✅ " + f.retenir;

  // Prévisualisation des intervalles sur les boutons
  const d = srsData[f.id] || { interval: 1, easeFactor: 2.5, reps: 0 };
  const hints = [1, computePreview(d, 1), computePreview(d, 2), computePreview(d, 3)];
  ["anki-hint-1","anki-hint-2","anki-hint-3"].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = formatDays(hints[i+1]);
  });

  document.getElementById("anki-counter").textContent = (ankiIdx + 1) + " / " + ankiQueue.length + " fiches";
  renderAnkiDots();
}

// Prévisualise l'intervalle pour quality q sans modifier srsData
function computePreview(d, quality) {
  let ef = Math.max(1.3, d.easeFactor + 0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02));
  if (d.reps === 0) return 1;
  if (d.reps === 1) return 3;
  return Math.round(d.interval * ef);
}

function formatDays(n) {
  if (n === 1) return "1j";
  if (n < 7) return n + "j";
  if (n < 30) return Math.round(n/7) + "sem";
  return Math.round(n/30) + "mois";
}

function flipAnki() {
  ankiFlipped = !ankiFlipped;
  document.getElementById("anki-card").classList.toggle("flipped", ankiFlipped);
}

function rateAnki(quality) {
  if (!ankiFlipped) return; // sécurité — doit avoir retourné la carte
  const f = ankiQueue[ankiIdx];
  const interval = srsUpdate(f.id, quality);

  ankiSessionStats.done++;
  if (quality === 0) ankiSessionStats.raté++;
  else if (quality === 1) ankiSessionStats.hard++;
  else if (quality === 2) ankiSessionStats.good++;
  else ankiSessionStats.easy++;

  updateAnkiStats();

  // Animation de sortie
  const wrap = document.getElementById("anki-card-wrap");
  wrap.classList.add("anki-slide-out");
  setTimeout(() => {
    wrap.classList.remove("anki-slide-out");
    ankiIdx++;
    renderAnkiCard();
  }, 280);
}

function updateAnkiStats() {
  const due = getSrsDue().length;
  const totalSrs = Object.keys(srsData).length;
  const mastered = Object.values(srsData).filter(d => d.reps >= 3 && d.interval >= 7).length;
  const row = document.getElementById("anki-stats-row");
  if (!row) return;
  row.innerHTML =
    `<div class="anki-stat-chip ${due > 0 ? 'chip-due' : 'chip-ok'}">📬 ${due} due${due > 1 ? 's' : ''}</div>` +
    `<div class="anki-stat-chip">📚 ${totalSrs} vues</div>` +
    `<div class="anki-stat-chip chip-green">🎯 ${mastered} maîtrisées</div>` +
    (ankiSessionStats.done > 0 ? `<div class="anki-stat-chip">✅ Session : ${ankiSessionStats.done}</div>` : "");
}

function renderAnkiDots() {
  const max = Math.min(ankiQueue.length, 40);
  const dots = document.getElementById("anki-dots");
  if (!dots) return;
  dots.innerHTML = "";
  for (let i = 0; i < max; i++) {
    const d = document.createElement("div");
    const fid = ankiQueue[i] ? ankiQueue[i].id : null;
    const isNew = fid && !srsData[fid];
    d.className = "fc-dot" + (i === ankiIdx ? " current" : i < ankiIdx ? " seen" : isNew ? " new-dot" : "");
    dots.appendChild(d);
  }
}

function showAnkiDone() {
  document.getElementById("anki-card-wrap").style.display = "none";
  document.getElementById("anki-progress-row").style.display = "none";
  const done = document.getElementById("anki-done");
  done.style.display = "";
  const s = ankiSessionStats;
  const sub = document.getElementById("anki-done-sub");
  if (ankiQueue.length === 0) {
    sub.innerHTML = "Aucune fiche à réviser pour le moment. 🏖️<br><small>Reviens plus tard ou désactive le filtre « Dues seulement ».</small>";
  } else {
    sub.innerHTML =
      `${s.done} fiches révisées · ` +
      `<span style="color:var(--red)">😰 ${s.raté} raté${s.raté>1?'s':''}</span> · ` +
      `<span style="color:var(--yellow)">😕 ${s.hard}</span> · ` +
      `<span style="color:var(--green)">😊 ${s.good}</span> · ` +
      `<span style="color:var(--accent)">🎯 ${s.easy}</span>`;
  }
  updateAnkiStats();
}

init();

// Enregistrement du Service Worker (mode hors ligne / PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("Service Worker non enregistré :", err);
    });
  });
}
